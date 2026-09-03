// =============================================================
// Sinkronisasi PENUH: IDX (harga, OHLCV, foreign flow, teknikal)
// + Yahoo Finance (HANYA fundamental: PER/PBV/ROE/EPS/dst) -> Supabase
//
// Ini adalah gabungan dari:
//   - screener_appscript.txt (Google Apps Script, sumber Yahoo)
//   - sync-flow.mjs          (Node, sumber IDX, tabel `flows`)
//
// PEMBAGIAN SUMBER DATA (hasil keputusan bareng user):
//   IDX   -> harga OHLCV harian, volume, value, foreign buy/sell,
//            listed shares, DAN semua indikator teknikal turunannya
//            (RSI/MACD/MA/EMA/Bollinger/ATR/Stochastic/support-resistance/
//            fibonacci/pola candle/sinyal-sinyal, market cap, dst)
//   Yahoo -> HANYA rasio fundamental yang memang tidak tersedia lewat
//            API publik IDX: PER, Forward PER, PBV, EPS, Book Value,
//            PSR, PEG, ROE, ROA, NPM, OPM, Revenue/Earnings Growth,
//            Dividend Yield/Rate, Payout Ratio, Beta, DER, Current Ratio.
//
// CATATAN PENTING SOAL NAMA FIELD IDX:
//   Nama field mentah dari endpoint GetStockSummary (OpenPrice, High,
//   Low, Close, Value, Frequency, ForeignBuy, ForeignSell, ListedShares,
//   dst) TIDAK BISA saya verifikasi langsung dari sandbox ini (tidak ada
//   akses jaringan ke idx.co.id di lingkungan saya). Nama-nama di bawah
//   sudah dipakai luas di proyek-proyek scraper IDX publik dan konsisten
//   dengan field yang sudah dipakai sync-flow.mjs kamu (StockCode, Close,
//   Volume, Value, Frequency, ForeignBuy, ForeignSell, NonRegularVolume,
//   NonRegularValue). Field BARU yang ditambahkan (OpenPrice/High/Low/
//   ListedShares) ada di IDX_FIELDS di bawah -- kalau ternyata beda,
//   jalankan `node sync-idx-full.mjs --debug-fields` untuk melihat semua
//   nama kolom mentah dari 1 hari data, lalu sesuaikan IDX_FIELDS saja.
//
// DUA HAL YANG TIDAK BOLEH DIUBAH (sudah diuji, lihat sync-flow.mjs asli):
//   1. Panggilan ke IDX WAJIB lewat curl, bukan fetch()/https Node --
//      Cloudflare di depan idx.co.id menyaring berdasarkan sidik jari TLS.
//   2. HANYA jalan dari koneksi rumah/non-datacenter (bukan Edge Function).
//
// Pakai:
//   node sync-idx-full.mjs                    -> hari perdagangan terakhir saja
//   node sync-idx-full.mjs --days=260          -> isi riwayat 260 hari (perlu sekali di awal / backfill)
//   node sync-idx-full.mjs --skip-fundamentals -> lewati panggilan Yahoo, murni IDX
//   node sync-idx-full.mjs --dry-run           -> tarik & hitung saja, tanpa menulis ke Supabase
//   node sync-idx-full.mjs --debug-fields      -> print nama kolom mentah IDX untuk 1 hari, lalu keluar
//   node sync-idx-full.mjs --tickers=BBCA,TLKM -> batasi ke ticker tertentu (untuk uji coba)
//   node sync-idx-full.mjs --offset=N          -> mundurkan titik mulai N hari KALENDER
//                                                 sebelum hari ini, lalu tarik `--days` hari
//                                                 perdagangan dari titik itu ke belakang.
//   node sync-idx-full.mjs --skip-fetch        -> JANGAN tarik apa pun dari IDX. Pakai
//                                                 isi `flows` yang sudah ada di Supabase,
//                                                 langsung hitung indikator + fundamental
//                                                 Yahoo + upsert ke stocks/stock_indicators_ext.
//                                                 Cocok kalau `flows` sudah terisi backfill
//                                                 dan cuma `stocks`/`stock_indicators_ext`
//                                                 yang masih kosong. offer/bid di `stocks`
//                                                 akan null (tidak ada snapshot baru).
//   node sync-idx-full.mjs --start=2026-06-01     -> tarik dari tanggal itu s/d hari ini
//   node sync-idx-full.mjs --start=2026-06-01 \
//                           --end=2026-06-30      -> tarik periode tanggal spesifik (inklusif).
//                                                 Mengabaikan --days/--offset kalau dipasang
//                                                 bersamaan. Rentang dibatasi maks MAX_DAYS
//                                                 (320) hari kalender.
//   node sync-idx-full.mjs --skip-fetch \
//                           --skip-technical      -> paling cepat: JANGAN tarik IDX, JANGAN
//                                                 hitung indikator teknikal (stock_indicators_ext
//                                                 juga tidak disentuh). Cuma ambil fundamental
//                                                 Yahoo & upsert ke stocks. Kolom teknikal lama
//                                                 di `stocks` tetap seperti sebelumnya (tidak
//                                                 dihapus, cuma tidak diperbarui).
//   node sync-idx-full.mjs --live-price           -> paling ringan & tercepat: batch-fetch
//                                                 harga live dari Yahoo (banyak ticker per
//                                                 request) dan upsert kolom price/prev_close/
//                                                 change_abs/change_pct/volume ke `stocks` saja.
//                                                 TIDAK menyentuh IDX/flows/teknikal/fundamental.
//                                                 Cocok dijadwalkan sering (tiap beberapa menit
//                                                 saat jam bursa), independen dari sync harian.
//                                                 Catatan: harga dari Yahoo untuk saham .JK
//                                                 biasanya delay ~15-20 menit, bukan real-time
//                                                 tick-by-tick.
//
// BACKFILL BERTAHAP (biar tidak kena rate-limit/Cloudflare & tidak re-fetch
// hari yang sama tiap batch) -- naikkan --offset tiap kali, JANGAN --days:
//   node sync-idx-full.mjs --days=30                 (hari ke  1..30 dari hari ini)
//   node sync-idx-full.mjs --days=30 --offset=30      (hari ke 31..60)
//   node sync-idx-full.mjs --days=30 --offset=60      (hari ke 61..90)
//   ... lanjut sampai total mencakup 260 hari.
// Catatan: --offset dihitung hari KALENDER (bukan hari bursa), jadi batch
// bisa sedikit tumpang tindih di tepinya (misal beberapa hari re-fetch) --
// itu aman, upsert `flows` pakai on_conflict(ticker,date) jadi tidak dobel.
// Yang penting jangan sampai ADA CELAH (gap) antar batch; kalau ragu,
// lebih baik --offset sedikit lebih kecil (overlap) daripada kebesaran.
// =============================================================

import { readFileSync } from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

// -------------------------------------------------------------
// Konfigurasi
// -------------------------------------------------------------
const ENV_FILE = new URL("../.env.local", import.meta.url);

function loadEnv() {
  let text;
  try {
    text = readFileSync(ENV_FILE, "utf8");
  } catch {
    return {};
  }
  const out = {};
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return out;
}

const env = { ...loadEnv(), ...process.env };
const SUPABASE_URL = env.SUPABASE_URL;
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error(
    "SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY belum diisi.\n" +
      "Buat berkas .env.local di root project:\n\n" +
      "  SUPABASE_URL=https://xxxx.supabase.co\n" +
      "  SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...\n\n" +
      "Ambil service_role key di Project Settings -> API Keys.",
  );
  process.exit(1);
}

const IDX_BASE = "https://www.idx.co.id/primary/TradingSummary/GetStockSummary";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36";

// Butuh minimal ~260 hari bursa untuk 52w high/low (252) + MA200.
const MAX_DAYS = 320;
const DELAY_MS = 400;
const MAX_MISSES = 12;
const RETRIES = 3;
const MIN_BARS_FOR_CALC = 30; // sama seperti syarat di Apps Script

// Jeda antar-ticker saat memanggil Yahoo (hanya untuk fundamental)
const YAHOO_DELAY_MS = 250;

// curl bawaan Windows (ada sejak Win10 1803). WAJIB dipakai ke IDX --
// lihat catatan sidik jari TLS di kepala berkas.
const CURL = process.platform === "win32"
  ? `${process.env.SystemRoot ?? "C:\\Windows"}\\System32\\curl.exe`
  : "curl";

// Pemetaan nama field mentah IDX -> nama internal. Kalau --debug-fields
// menunjukkan nama berbeda, cukup ubah bagian kanan di sini.
const IDX_FIELDS = {
  code: "StockCode",
  open: "OpenPrice",
  high: "High",
  low: "Low",
  close: "Close",
  volume: "Volume",
  value: "Value",
  frequency: "Frequency",
  foreignBuy: "ForeignBuy",
  foreignSell: "ForeignSell",
  nonRegVolume: "NonRegularVolume",
  nonRegValue: "NonRegularValue",
  listedShares: "ListedShares",
  offer: "Offer",
  offerVolume: "OfferVolume",
  bid: "Bid",
  bidVolume: "BidVolume",
};

// -------------------------------------------------------------
// Argumen
// -------------------------------------------------------------
const argv = process.argv.slice(2);
const arg = (name, fallback) => {
  const hit = argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
};
const days = Math.min(MAX_DAYS, Math.max(1, Math.floor(Number(arg("days", 1))) || 1));
// --offset=N: mundurkan titik mulai N hari KALENDER dari hari ini sebelum
// mulai menghitung `days` hari perdagangan. Dipakai untuk backfill bertahap
// tanpa menarik ulang hari yang sudah pernah diambil di batch sebelumnya --
// lihat blok penjelasan & contoh di kepala berkas.
const offsetDays = Math.max(0, Math.floor(Number(arg("offset", 0))) || 0);
const dryRun = argv.includes("--dry-run");
const skipFundamentals = argv.includes("--skip-fundamentals");
// --skip-fetch: lewati SELURUH penarikan IDX (langkah 2) -- tidak menyentuh
// jaringan idx.co.id sama sekali. Langsung baca ulang tabel `flows` yang
// sudah ada di Supabase, hitung indikator teknikal, ambil fundamental
// Yahoo (kecuali --skip-fundamentals juga dipasang), lalu upsert ke
// `stocks` & `stock_indicators_ext`. Cocok kalau `flows` sudah terisi
// (mis. lewat backfill sebelumnya) dan kamu cuma mau isi/refresh `stocks`
// + `stock_indicators_ext` tanpa risiko kena block Cloudflare lagi.
const skipFetch = argv.includes("--skip-fetch");
// --skip-technical: lewati langkah 4a (baca `flows` per ticker + hitung
// semua indikator teknikal + `stock_indicators_ext`). Cuma ambil
// fundamental Yahoo dan upsert ke `stocks` (kolom teknikal yang sudah
// ada di baris lama TIDAK disentuh/dihapus, cuma tidak diperbarui).
// Jauh lebih cepat kalau tujuannya cuma isi/refresh data fundamental.
const skipTechnical = argv.includes("--skip-technical");
// --live-price: mode ringan & terpisah total dari IDX/flows. Cuma batch-fetch
// harga live dari Yahoo (v7/finance/quote, banyak ticker per request) dan
// upsert kolom price/prev_close/change_abs/change_pct/volume ke `stocks`.
// Tidak menyentuh flows, indikator teknikal, stock_indicators_ext, atau
// fundamental. Dibuat supaya bisa dijadwalkan sering (mis. tiap beberapa
// menit) tanpa bergantung pada penarikan IDX harian.
const livePrice = argv.includes("--live-price");
const debugFields = argv.includes("--debug-fields");
const tickerFilter = arg("tickers", null);
const onlyTickers = tickerFilter ? new Set(tickerFilter.split(",").map((t) => t.trim().toUpperCase())) : null;
// --start=YYYY-MM-DD / --end=YYYY-MM-DD: tarik periode tanggal EKSPLISIT,
// bukan hitung mundur dari hari ini. --end opsional (default: hari ini).
// Kalau dipasang, --days dan --offset diabaikan. Lihat blok penjelasan &
// contoh di kepala berkas.
const startArg = arg("start", null);
const endArg = arg("end", null);
const explicitDays = argv.some((a) => a.startsWith("--days="));
const explicitOffset = argv.some((a) => a.startsWith("--offset="));

// -------------------------------------------------------------
// Util umum
// -------------------------------------------------------------
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const chunkArr = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));
const num = (v) => (typeof v === "number" && Number.isFinite(v) ? v : null);
const average = (arr) => (!arr.length ? 0 : arr.reduce((a, b) => a + (b || 0), 0) / arr.length);
const round2 = (n) => (n == null || Number.isNaN(n) ? null : Math.round(n * 100) / 100);
const round1 = (n) => (n == null || Number.isNaN(n) ? null : Math.round(n * 10) / 10);

function todayWib() {
  const wib = new Date(Date.now() + 7 * 3600_000);
  return new Date(Date.UTC(wib.getUTCFullYear(), wib.getUTCMonth(), wib.getUTCDate()));
}
function parseYmd(s) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) throw new Error(`Tanggal tidak valid: "${s}" (format harus YYYY-MM-DD, mis. 2026-08-01)`);
  return new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
}
const ymd = (d) => d.toISOString().slice(0, 10);
const ymdCompact = (d) => ymd(d).replaceAll("-", "");
const isWeekend = (d) => d.getUTCDay() === 0 || d.getUTCDay() === 6;
const rupiah = (v) =>
  v == null ? "â€“"
  : Math.abs(v) >= 1e12 ? `${(v / 1e12).toFixed(1)} T`
  : Math.abs(v) >= 1e9  ? `${(v / 1e9).toFixed(1)} M`
  : `${(v / 1e6).toFixed(1)} jt`;

// -------------------------------------------------------------
// Supabase lewat REST (tanpa SDK)
// -------------------------------------------------------------
async function sb(path, { method = "GET", body, headers = {} } = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method,
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const detail = (await res.text()).slice(0, 300);
    if ((res.status === 401 || res.status === 403) && method !== "GET") {
      throw new Error(
        `Supabase menolak penulisan (${res.status}). Kemungkinan besar ` +
          `SUPABASE_SERVICE_ROLE_KEY yang diisi sebenarnya anon key.\n${detail}`,
      );
    }
    throw new Error(`Supabase ${res.status}: ${detail}`);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

const upsert = (table, rows, onConflict) =>
  sb(`${table}?on_conflict=${onConflict}`, {
    method: "POST",
    body: rows,
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
  });

// -------------------------------------------------------------
// IDX (lewat curl -- lihat catatan sidik jari TLS di kepala berkas)
// -------------------------------------------------------------
async function fetchDay(date) {
  const url = `${IDX_BASE}?date=${ymdCompact(date)}&start=0&length=1000`;

  let lastErr;
  for (let attempt = 1; attempt <= RETRIES; attempt++) {
    try {
      const { stdout } = await execFileAsync(CURL, [
        "-s",
        "--ssl-no-revoke",
        "--compressed",
        "-m", "60",
        "-w", "\n%{http_code}",
        url,
        "-H", `User-Agent: ${UA}`,
        "-H", "Accept: application/json",
      ], { maxBuffer: 64 * 1024 * 1024 });

      const cut = stdout.lastIndexOf("\n");
      const status = Number(stdout.slice(cut + 1).trim());
      const body = stdout.slice(0, cut);

      if (status === 403) {
        throw new Error(
          "IDX membalas 403 â€” Cloudflare menolak. Coba buka https://www.idx.co.id " +
            "sekali di browser (koneksi yang sama), atau ganti jaringan.",
        );
      }
      if (status !== 200) throw new Error(`IDX membalas ${status}`);
      if (body.trimStart().startsWith("<")) {
        throw new Error("IDX membalas HTML, bukan JSON (dihadang Cloudflare)");
      }

      return JSON.parse(body).data ?? [];
    } catch (err) {
      lastErr = err;
      if (attempt < RETRIES) await sleep(DELAY_MS * attempt * 2);
    }
  }
  throw lastErr;
}

// -------------------------------------------------------------
// Indikator teknikal â€” port langsung dari screener_appscript.txt
// (fungsi murni, tidak dipotong, hanya diganti sumber datanya)
// -------------------------------------------------------------
function calcEMA(data, period) {
  if (data.length < period) return data[data.length - 1] || 0;
  const k = 2 / (period + 1);
  let ema = average(data.slice(0, period));
  for (let i = period; i < data.length; i++) ema = (data[i] - ema) * k + ema;
  return ema;
}

function calcRSI(data, period) {
  if (data.length <= period) return 50;
  let gains = 0, losses = 0;
  for (let i = 1; i <= period; i++) {
    const c = data[i] - data[i - 1];
    if (c > 0) gains += c; else losses -= c;
  }
  let avgGain = gains / period, avgLoss = losses / period;
  for (let i = period + 1; i < data.length; i++) {
    const c = data[i] - data[i - 1];
    avgGain = (avgGain * (period - 1) + Math.max(c, 0)) / period;
    avgLoss = (avgLoss * (period - 1) + Math.max(-c, 0)) / period;
  }
  if (avgLoss === 0) return 100;
  return 100 - 100 / (1 + avgGain / avgLoss);
}

function calcEMASeries(data, period) {
  const arr = new Array(data.length).fill(null);
  if (data.length < period) return arr;
  const k = 2 / (period + 1);
  let ema = average(data.slice(0, period));
  arr[period - 1] = ema;
  for (let i = period; i < data.length; i++) {
    ema = (data[i] - ema) * k + ema;
    arr[i] = ema;
  }
  return arr;
}

function calcMACDFull(data) {
  const fastArr = calcEMASeries(data, 12);
  const slowArr = calcEMASeries(data, 26);
  const macdSeries = [];
  for (let i = 0; i < data.length; i++) {
    if (fastArr[i] != null && slowArr[i] != null) macdSeries.push(fastArr[i] - slowArr[i]);
  }
  if (macdSeries.length === 0) return { macd: 0, signal: 0, hist: 0, histPrev: 0 };

  const signalPeriod = 9;
  const signalSeries = new Array(macdSeries.length).fill(null);
  if (macdSeries.length < signalPeriod) {
    const avg = average(macdSeries);
    for (let i = 0; i < macdSeries.length; i++) signalSeries[i] = avg;
  } else {
    const k = 2 / (signalPeriod + 1);
    let signal = average(macdSeries.slice(0, signalPeriod));
    signalSeries[signalPeriod - 1] = signal;
    for (let i = signalPeriod; i < macdSeries.length; i++) {
      signal = (macdSeries[i] - signal) * k + signal;
      signalSeries[i] = signal;
    }
  }

  const histSeries = macdSeries.map((m, i) => (signalSeries[i] != null ? m - signalSeries[i] : null));

  const last = macdSeries.length - 1;
  const macd = macdSeries[last];
  const signal = signalSeries[last] != null ? signalSeries[last] : macd;
  const hist = histSeries[last] != null ? histSeries[last] : 0;
  const histPrev = (last > 0 && histSeries[last - 1] != null) ? histSeries[last - 1] : hist;

  return { macd, signal, hist, histPrev };
}

function calcSMA(data, period) {
  if (!data || data.length < period) return null;
  return average(data.slice(-period));
}

function calcStdDev(arr) {
  const m = average(arr);
  return Math.sqrt(arr.reduce((sq, n) => sq + Math.pow(n - m, 2), 0) / arr.length);
}

function calcATR(highs, lows, closes, period) {
  if (closes.length < period + 1) return null;
  const trs = [];
  for (let i = 1; i < closes.length; i++) {
    const h = highs[i] != null ? highs[i] : closes[i];
    const l = lows[i] != null ? lows[i] : closes[i];
    const pc = closes[i - 1];
    trs.push(Math.max(h - l, Math.abs(h - pc), Math.abs(l - pc)));
  }
  return average(trs.slice(-period));
}

function calcVWAP(closes, highs, lows, volumes, period) {
  const n = closes.length;
  if (!n) return null;
  const p = Math.min(period, n);
  let sumPV = 0, sumV = 0;
  for (let i = n - p; i < n; i++) {
    const h = highs[i] != null ? highs[i] : closes[i];
    const l = lows[i] != null ? lows[i] : closes[i];
    const typicalPrice = (h + l + closes[i]) / 3;
    const vol = volumes[i] || 0;
    sumPV += typicalPrice * vol;
    sumV += vol;
  }
  return sumV > 0 ? sumPV / sumV : null;
}

// -------------------------------------------------------------
// Perluasan indikator (filter tambahan screener) â€” fungsi berdiri
// sendiri, dipanggil 2x di step 4 (bars penuh & bars minus 1 hari
// terakhir) untuk dapat versi "current" dan "previous" sekaligus.
// Ditulis terpisah dari buildStockRowFromBars supaya tidak
// mengganggu logika lama yang sudah teruji.
// -------------------------------------------------------------
function computeExtendedIndicators(bars) {
  const closes = bars.map((b) => b.close);
  const highs = bars.map((b) => (b.high != null ? b.high : b.close));
  const lows = bars.map((b) => (b.low != null ? b.low : b.close));
  const volumes = bars.map((b) => b.volume || 0);
  const values = bars.map((b) => b.value ?? null);
const freqs  = bars.map((b) => b.frequency ?? null);
  const n = closes.length;

    // SMA & rata-rata yang mengabaikan null (untuk value/frequency dari sumber campuran IDX+Yahoo)
  const smaNullSafe = (arr, p) => {
    if (!arr || arr.length < p) return null;
    const slice = arr.slice(-p);
    const valid = slice.filter(v => v != null);
    return valid.length >= Math.ceil(p / 2)
      ? valid.reduce((a, b) => a + b, 0) / valid.length
      : null;
  };
  const sma = (arr, p) => calcSMA(arr, p);
  const smaRound = (arr, p) => (sma(arr, p) != null ? Math.round(sma(arr, p)) : null);
  const smaNullSafeRound = (arr, p) => (smaNullSafe(arr, p) != null ? Math.round(smaNullSafe(arr, p)) : null);

  const frequencyMa20 = smaNullSafeRound(freqs, 20);
  const frequencyMa50 = smaRound(freqs, 50);
  const curFreq = Math.round(freqs[n - 1] || 0);
  const freqRatio = frequencyMa20 > 0 ? curFreq / frequencyMa20 : null;

  const macdFull = calcMACDFull(closes);

  const bbPeriod = 20;
  let bbUpper = null, bbLower = null;
  if (closes.length >= bbPeriod) {
    const slice = closes.slice(-bbPeriod);
    const mid = average(slice);
    const std = calcStdDev(slice);
    bbUpper = round2(mid + 2 * std);
    bbLower = round2(mid - 2 * std);
  }

  const adrPeriod = Math.min(14, n);
  const ranges = [];
  for (let i = n - adrPeriod; i < n; i++) ranges.push(highs[i] - lows[i]);

  // Fibonacci pivot klasik dari HLC hari SEBELUMNYA (proyeksi level hari ini)
  let fib = { p: null, r1: null, r2: null, r3: null, s1: null, s2: null, s3: null };
  if (n >= 2) {
    const pH = highs[n - 2], pL = lows[n - 2], pC = closes[n - 2];
    const p = (pH + pL + pC) / 3;
    fib = {
      p: round2(p),
      r1: round2(2 * p - pL), s1: round2(2 * p - pH),
      r2: round2(p + (pH - pL)), s2: round2(p - (pH - pL)),
      r3: round2(pH + 2 * (p - pL)), s3: round2(pL - 2 * (pH - p)),
    };
  }

  return {
    priceMa5: round2(sma(closes, 5)), priceMa10: round2(sma(closes, 10)), priceMa20: round2(sma(closes, 20)),
    priceMa50: round2(sma(closes, 50)), priceMa100: round2(sma(closes, 100)), priceMa200: round2(sma(closes, 200)),
    volumeMa5: smaRound(volumes, 5), volumeMa10: smaRound(volumes, 10), volumeMa20: smaRound(volumes, 20),
    volumeMa50: smaRound(volumes, 50), volumeMa100: smaRound(volumes, 100), volumeMa200: smaRound(volumes, 200),
        valueMa5: round2(smaNullSafe(values, 5)), valueMa10: round2(smaNullSafe(values, 10)), valueMa20: round2(smaNullSafe(values, 20)),
    valueMa50: round2(smaNullSafe(values, 50)), valueMa100: round2(smaNullSafe(values, 100)), valueMa200: round2(smaNullSafe(values, 200)),
    frequencyMa20: smaNullSafeRound(freqs, 20), frequencyMa50: smaNullSafeRound(freqs, 50),
        freqSpike: freqRatio != null && freqRatio >= 1.5 ? "Ya" : "Tidak",
    rsi14: round1(calcRSI(closes, 14)),
	rsi14: round1(calcRSI(closes, 14)),
    macd: round2(macdFull.macd), signal: round2(macdFull.signal), macdHist: round2(macdFull.hist),
       bbUpper, bbLower,
        atr14: round2(calcATR(highs, lows, closes, 14)),
    adr14: round2(average(ranges)),
    vwap: round2(calcVWAP(closes, highs, lows, volumes, 20)),
    stoch: (() => { const s = calcStochastic(highs, lows, closes, 14, 3, 3); return s.k != null ? s : null; })(),
    ema5: round2(calcEMA(closes, 5)), ema10: round2(calcEMA(closes, 10)), ema20: round2(calcEMA(closes, 20)),
    ema50: round2(calcEMA(closes, 50)), ema100: round2(calcEMA(closes, 100)), ema200: round2(calcEMA(closes, 200)),
        stochK: null, stochD: null, prevStochK: null, prevStochD: null,
	fibP: fib.p, fibR1: fib.r1, fibR2: fib.r2, fibR3: fib.r3, fibS1: fib.s1, fibS2: fib.s2, fibS3: fib.s3,
  };
}

function calcStochastic(highs, lows, closes, periodK, smoothK, periodD) {
  if (closes.length < periodK + smoothK + periodD) return { k: null, d: null, prevK: null, prevD: null };
  const rawK = [];
  for (let i = periodK - 1; i < closes.length; i++) {
    // Loop manual: aman untuk array panjang (tidak pakai spread operator yang bisa Stack Overflow)
    let hh = -Infinity, ll = Infinity;
    for (let j = i - periodK + 1; j <= i; j++) {
      const hv = highs[j]; const lv = lows[j];
      if (hv != null && hv > hh) hh = hv;
      if (lv != null && lv < ll) ll = lv;
    }
    if (hh === -Infinity) hh = 0;
    if (ll === Infinity) ll = 0;
    rawK.push(hh - ll === 0 ? 50 : ((closes[i] - ll) / (hh - ll)) * 100);
  }
  const slowK = [];
  for (let i = smoothK - 1; i < rawK.length; i++) slowK.push(average(rawK.slice(i - smoothK + 1, i + 1)));
  const slowD = [];
  for (let i = periodD - 1; i < slowK.length; i++) slowD.push(average(slowK.slice(i - periodD + 1, i + 1)));
  return {
    k: round1(slowK[slowK.length - 1]),
    d: round1(slowD[slowD.length - 1]),
    prevK: round1(slowK.length >= 2 ? slowK[slowK.length - 2] : null),
    prevD: round1(slowD.length >= 2 ? slowD[slowD.length - 2] : null),
  };
}

function tentukanTrendHarga_(cClose, ma21, ma50, ma100, ma200) {
  const semuaMA = [ma21, ma50, ma100, ma200];
  const maTersedia = semuaMA.filter((m) => m != null);
  if (maTersedia.length === 0) return "Data MA Belum Cukup";

  const diatasSemua = maTersedia.every((m) => cClose > m);
  const dibawahSemua = maTersedia.every((m) => cClose < m);
  const lengkap = maTersedia.length === 4;

  if (diatasSemua) return lengkap ? "Bullish (diatas MA21/50/100/200)" : "Bullish (diatas MA yang tersedia)";
  if (dibawahSemua) return lengkap ? "Bearish (dibawah MA21/50/100/200)" : "Bearish (dibawah MA yang tersedia)";
  return "Sideways/Mixed";
}

function formatCandle_(open, high, low, close) {
  if (open == null || close == null) return "";
  const o = round2(open), h = round2(high), l = round2(low), c = round2(close);
  const arah = c >= o ? "Bullish" : "Bearish";
  return `O:${o} H:${h} L:${l} C:${c} (${arah})`;
}

function deteksiPolaCandle_(y, t) {
  const bodyY = Math.abs(y.c - y.o);
  const bodyT = Math.abs(t.c - t.o);
  const rangeT = t.h - t.l;
  const upperShadowT = t.h - Math.max(t.o, t.c);
  const lowerShadowT = Math.min(t.o, t.c) - t.l;
  const yBullish = y.c > y.o, yBearish = y.c < y.o;
  const tBullish = t.c > t.o, tBearish = t.c < t.o;

  if (yBearish && tBullish && t.o <= y.c && t.c >= y.o && bodyT > bodyY) return { text: "Bullish Engulfing (potensi reversal naik)", bias: "bullish" };
  if (yBullish && tBearish && t.o >= y.c && t.c <= y.o && bodyT > bodyY) return { text: "Bearish Engulfing (potensi reversal turun)", bias: "bearish" };
  if (yBearish && tBullish && t.o >= y.c && t.c <= y.o && bodyT < bodyY) return { text: "Bullish Harami (tekanan jual mulai melemah)", bias: "bullish" };
  if (yBullish && tBearish && t.o <= y.c && t.c >= y.o && bodyT < bodyY) return { text: "Bearish Harami (tekanan beli mulai melemah)", bias: "bearish" };
  if (rangeT > 0 && bodyT <= rangeT * 0.1) return { text: "Doji (keraguan pasar / potensi pembalikan)", bias: "netral" };
  if (rangeT > 0 && bodyT <= rangeT * 0.35 && lowerShadowT >= bodyT * 2 && upperShadowT <= bodyT * 0.5) {
    return tBullish
      ? { text: "Hammer (potensi reversal naik setelah downtrend)", bias: "bullish" }
      : { text: "Hanging Man (waspada reversal turun setelah uptrend)", bias: "bearish" };
  }
  if (rangeT > 0 && bodyT <= rangeT * 0.35 && upperShadowT >= bodyT * 2 && lowerShadowT <= bodyT * 0.5) {
    return tBearish
      ? { text: "Shooting Star (waspada reversal turun)", bias: "bearish" }
      : { text: "Inverted Hammer (potensi reversal naik, perlu konfirmasi)", bias: "bullish" };
  }
  return { text: "Tidak ada pola signifikan", bias: "netral" };
}

// -------------------------------------------------------------
// Hitung 1 baris `stocks` dari deretan bar harian IDX
// bars: [{date, open, high, low, close, volume, value}] terurut naik
// -------------------------------------------------------------
function buildStockRowFromBars(ticker, bars, listedShares) {
  if (bars.length < MIN_BARS_FOR_CALC) {
    throw new Error(`Data historis ${ticker} baru ${bars.length} bar (butuh >= ${MIN_BARS_FOR_CALC})`);
  }

  const closes = bars.map((b) => b.close);
  const opens = bars.map((b) => b.open);
  const highs = bars.map((b) => b.high);
  const lows = bars.map((b) => b.low);
  const volumes = bars.map((b) => b.volume || 0);
  const n = closes.length;

  const cClose = round2(closes[n - 1]);
  const prevClose = round2(closes[n - 2]);
  const cOpen = round2(opens[n - 1] != null ? opens[n - 1] : closes[n - 2]);
  const cHigh = round2(highs[n - 1] != null ? highs[n - 1] : Math.max(cOpen, cClose));
  const cLow = round2(lows[n - 1] != null ? lows[n - 1] : Math.min(cOpen, cClose));
  const cVol = Math.round(volumes[n - 1] || 0);

  const prevOpen = round2(opens[n - 2] != null ? opens[n - 2] : closes[n - 3]);
  const prevHigh = round2(highs[n - 2] != null ? highs[n - 2] : Math.max(prevOpen, prevClose));
  const prevLow = round2(lows[n - 2] != null ? lows[n - 2] : Math.min(prevOpen, prevClose));
  const prevVol = Math.round(volumes[n - 2] || 0);

  const volMA20 = Math.round(average(volumes.slice(-20)));
  const avgVolume3m = Math.round(average(volumes.slice(-63)));

  const ema89 = calcEMA(closes, 89);
  const stoch = calcStochastic(highs, lows, closes, 14, 3, 3);

  let clv = 0;
  if (cHigh !== cLow) clv = round2(((cClose - cLow) - (cHigh - cClose)) / (cHigh - cLow));

  const volRatio = volMA20 > 0 ? round2(cVol / volMA20) : 0;
  let uangGedeMasuk = "Normal";
  if (volRatio > 2.0 && clv > 0.7) uangGedeMasuk = "Akumulasi Kuat (RVOL>2 & CLV>0.7)";
  else if (volRatio > 2.0 && clv < 0) uangGedeMasuk = "Guyuran (RVOL>2 & CLV Negatif)";

  // Bollinger Bands width + squeeze 6 bulan
  const bbPeriod = 20;
  let currentBBWidth = null;
  let minBBWidth6M = Infinity;
  if (closes.length >= bbPeriod) {
    const startIdx = Math.max(bbPeriod, closes.length - 120);
    for (let i = startIdx; i <= closes.length; i++) {
      const slice = closes.slice(i - bbPeriod, i);
      const mid = average(slice);
      const std = calcStdDev(slice);
      const width = mid === 0 ? 0 : ((mid + 2 * std) - (mid - 2 * std)) / mid;
      if (i === closes.length) currentBBWidth = round2(width);
      if (width < minBBWidth6M) minBBWidth6M = width;
    }
  }
  let isBBSqueeze = "Tidak";
  if (currentBBWidth !== null && currentBBWidth <= minBBWidth6M * 1.05) isBBSqueeze = "Ya (Kompresi Siap Meledak)";

  const atr14 = round2(calcATR(highs, lows, closes, 14));

  const ma21 = calcSMA(closes, 21);
  const ma50 = calcSMA(closes, 50);
  const ma100 = calcSMA(closes, 100);
  const ma200 = calcSMA(closes, 200);
  const trendHarga = tentukanTrendHarga_(cClose, ma21, ma50, ma100, ma200);

  const yOpen = opens[n - 2], yHigh = highs[n - 2], yLow = lows[n - 2], yClose = closes[n - 2];
  const candleKemarin = formatCandle_(yOpen, yHigh, yLow, yClose);
  const candleHariIni = formatCandle_(cOpen, cHigh, cLow, cClose);
  let polaCandle = "Data candle kemarin tidak lengkap";
  let polaBias = "netral";
  if (yOpen != null && yHigh != null && yLow != null && yClose != null) {
    const polaResult = deteksiPolaCandle_({ o: yOpen, h: yHigh, l: yLow, c: yClose }, { o: cOpen, h: cHigh, l: cLow, c: cClose });
    polaCandle = polaResult.text;
    polaBias = polaResult.bias;
  }
  const isTrendBullish = trendHarga.startsWith("Bullish");
  const isTrendBearish = trendHarga.startsWith("Bearish");
  const isPolaBullish = polaBias === "bullish";
  const isPolaBearish = polaBias === "bearish";

  const changeAbs = round2(cClose - prevClose);
  const changePct = prevClose ? round2((changeAbs / prevClose) * 100) : 0;

  const window52w = closes.slice(-252);
  const high52w = round2(Math.max(...window52w));
  const low52w = round2(Math.min(...window52w));
  const closeAYearAgo = n > 252 ? closes[n - 252] : null;
  const week52ChangePct = closeAYearAgo ? round2(((cClose - closeAYearAgo) / closeAYearAgo) * 100) : null;

  const window20 = closes.slice(-20);
  const support = round2(Math.min(...window20));
  const resistance = round2(Math.max(...window20));

  const fibRange = resistance - support;
  const fib = {
    f0: resistance,
    f236: round2(resistance - fibRange * 0.236),
    f382: round2(resistance - fibRange * 0.382),
    f50: round2(resistance - fibRange * 0.5),
    f618: round2(resistance - fibRange * 0.618),
    f100: support,
  };

  const highsFilled = highs.map((h, i) => (h != null ? h : closes[i]));
  const lowsFilled = lows.map((l, i) => (l != null ? l : closes[i]));
  const ema21H = calcEMA(highsFilled, 21);
  const ema21L = calcEMA(lowsFilled, 21);
  const ema21HPrev = calcEMA(highsFilled.slice(0, -1), 21);
  const ema21LPrev = calcEMA(lowsFilled.slice(0, -1), 21);
  const rsi7 = calcRSI(closes, 7);
const rsi21 = calcRSI(closes, 21);

// Deteksi cross-up yang benar:
// RSI 7 kemarin <= RSI 21 kemarin, lalu RSI 7 hari ini > RSI 21 hari ini.
const previousCloses = closes.slice(0, -1);
const prevRsi7 = previousCloses.length > 21
  ? calcRSI(previousCloses, 7)
  : null;
const prevRsi21 = previousCloses.length > 21
  ? calcRSI(previousCloses, 21)
  : null;

const isRsiCrossUp =
  prevRsi7 != null &&
  prevRsi21 != null &&
  prevRsi7 <= prevRsi21 &&
  rsi7 > rsi21;

const macdFull = calcMACDFull(closes);
const { macd, signal, hist, histPrev } = macdFull;
    const diatasKeduaEma = cClose > ema21H && cClose > ema21L;
  const kemarinDiatasKeduaEma = prevClose > ema21HPrev && prevClose > ema21LPrev;
  let cekHarga = "harga belum cross up";    if (diatasKeduaEma && !kemarinDiatasKeduaEma) cekHarga = "harga crossup ema 21 H dan L";
  else if (diatasKeduaEma && kemarinDiatasKeduaEma) cekHarga = "harga diatas ema 21 H dan L";
  else if (cClose > ema21L && cClose <= ema21H) cekHarga = "harga diatas ema 21 L dibawah ema 21 H";

  const cekRsi = isRsiCrossUp
  ? "rsi 7 cross up rsi 21"
  : "rsi 7 belum cross up";
  let statusRsi = "over bought";
  if (rsi7 <= 30) statusRsi = "over sold";
  else if (rsi7 <= 45) statusRsi = "bearish";
  else if (rsi7 <= 55) statusRsi = "netral";
  else if (rsi7 <= 70) statusRsi = "bullish";

  const isGoldenCross = histPrev <= 0 && hist > 0;
  const isDeadCross = histPrev >= 0 && hist < 0;
  const histNaik = hist > histPrev;

  let cekMacd = "Wait & See / Bearish";
  if (hist > 0) cekMacd = "Bullish Menguat";
  if (isGoldenCross && cClose > ema21H) cekMacd = "Buy (Golden Cross)";
  if (hist < 0 && rsi7 <= 35 && histNaik) cekMacd = "Momentum Buy (Early)";
  if (isDeadCross) cekMacd = "Sell (Dead Cross)";

  let cekVolume = "Volume Normal";
  if (volRatio >= 3) cekVolume = "Volume Spike Ekstrem";
  else if (volRatio >= 2) cekVolume = "Volume Spike Kuat";
  else if (volRatio >= 1.5) cekVolume = "Volume Spike";
  else if (volRatio < 0.7) cekVolume = "Volume Sepi";

  const isVolumeSpike = volRatio >= 1.5;
  const isHargaNaik = changeAbs > 0;
  const isUangGedeMasuk = uangGedeMasuk.includes("Akumulasi Kuat");
  const isBreakoutSqueeze = isBBSqueeze.includes("Ya") && isHargaNaik && isVolumeSpike;
  const isRsiBullish = rsi7 > rsi21 && rsi7 >= 50;
  const isStochGoldenCross = stoch.prevK < stoch.prevD && stoch.k > stoch.d;
  const vwap20 = calcVWAP(closes, highs, lows, volumes, 20);
  const isDiatasVWAP = cClose > vwap20;

  let keyakinanNaik = "Rendah";
  if (cekMacd === "Buy (Golden Cross)" && isVolumeSpike && isHargaNaik && isTrendBullish && isPolaBullish && isUangGedeMasuk) {
    keyakinanNaik = "Sangat Tinggi++ (Perfect Setup: MACD + Trend + Uang Gede)";
  } else if (isBreakoutSqueeze && isDiatasVWAP && isRsiBullish) {
    keyakinanNaik = "Sangat Tinggi (Breakout BB Squeeze & Momentum Kuat)";
  } else if (cekMacd === "Buy (Golden Cross)" && isVolumeSpike && isHargaNaik && isTrendBullish && isPolaBullish) {
    keyakinanNaik = "Sangat Tinggi+ (MACD + Volume + Trend + Candle Bullish, Konfirmasi Penuh)";
  } else if (cekMacd === "Buy (Golden Cross)" && isVolumeSpike && isHargaNaik && (isRsiBullish || isStochGoldenCross)) {
    keyakinanNaik = "Sangat Tinggi (MACD + Volume + RSI/Stoch Konfirmasi)";
  } else if (isTrendBullish && isVolumeSpike && isPolaBullish && isDiatasVWAP) {
    keyakinanNaik = "Tinggi (Trend Bullish + Volume + Candle Bullish + Kuat Intraday)";
  } else if ((cekMacd === "Buy (Golden Cross)" || cekMacd === "Bullish Menguat") && isVolumeSpike) {
    keyakinanNaik = "Tinggi (Ada Konfirmasi Volume)";
  } else if (cekMacd === "Buy (Golden Cross)" || cekMacd === "Bullish Menguat" || cekMacd === "Momentum Buy (Early)") {
    keyakinanNaik = isPolaBullish ? "Sedang (Candle Bullish, Volume Belum Konfirmasi)" : "Sedang (Belum Ada Konfirmasi Volume)";
  } else if (isVolumeSpike && !isHargaNaik && clv < 0) {
    keyakinanNaik = "Sangat Waspada (Distribusi Masif / Guyuran Bandar)";
  } else if (isVolumeSpike && !isHargaNaik) {
    keyakinanNaik = "Waspada (Volume Tinggi tapi Harga Turun)";
  } else if (isTrendBearish && isPolaBearish) {
    keyakinanNaik = "Waspada (Trend Bearish + Candle Bearish)";
  }

  const turnover = Math.round(cClose * cVol);
  const marketCap = listedShares ? Math.round(cClose * listedShares) : null;

  return {
    ticker,
    c_open: cOpen, day_high: cHigh, day_low: cLow, price: cClose,
    prev_close: prevClose, change_abs: changeAbs, change_pct: changePct,
    week52_high: high52w, week52_low: low52w, week52_change_pct: week52ChangePct,
    support, resistance, fibonacci: fib,
    ema21h: round2(ema21H), ema21l: round2(ema21L), ema89: round2(ema89),
    rsi7: round1(rsi7), rsi21: round1(rsi21),
    macd: round2(macd), signal: round2(signal), macd_hist: round2(hist), prev_macd_hist: round2(histPrev),
    cek_harga: cekHarga, cek_rsi: cekRsi, status_rsi: statusRsi, cek_macd: cekMacd,
    volume: cVol, vol_ma20: volMA20, vol_ratio: volRatio, avg_volume_3m: avgVolume3m,
    cek_volume: cekVolume, keyakinan_naik: keyakinanNaik,
    vwap20: round2(vwap20), turnover, value_traded: bars[n - 1].value ?? null,
    ma21: round2(ma21), ma50: round2(ma50), ma100: round2(ma100), ma200: round2(ma200),
    trend_harga: trendHarga,
    candle_kemarin: candleKemarin, candle_hari_ini: candleHariIni, pola_candle: polaCandle,
    clv, uang_gede_masuk: uangGedeMasuk, bb_width: currentBBWidth, is_bb_squeeze: isBBSqueeze, atr14,
    prev_high: prevHigh, prev_low: prevLow, prev_vol: prevVol,
    stoch_k: stoch.k, stoch_d: stoch.d, prev_stoch_k: stoch.prevK, prev_stoch_d: stoch.prevD,
    shares_outstanding: listedShares ?? null, market_cap: marketCap,
  };
}

// -------------------------------------------------------------
// Yahoo Finance â€” HANYA untuk fundamental (PER/PBV/ROE/dst)
// Port dari fetchYahooFundamental / getYahooCrumb_ di Apps Script.
// Crumb + cookie di-cache sekali per proses (bukan per ticker).
// -------------------------------------------------------------
let yahooAuthCache = null;
let yahooDiagLogged = false; // supaya log diagnosis cuma muncul sekali, bukan per-ticker

async function getYahooCrumb() {
  if (yahooAuthCache) return yahooAuthCache;
  try {
    // Yahoo sering menolak (401/999) request tanpa User-Agent yang mirip
    // browser -- WAJIB dipasang, sama seperti UA yang dipakai ke IDX.
    const cookieRes = await fetch("https://fc.yahoo.com", {
      redirect: "manual",
      headers: { "User-Agent": UA },
    });
    const rawCookies = cookieRes.headers.getSetCookie?.() ?? [];
    const cookieHeader = rawCookies.map((c) => c.split(";")[0]).join("; ");

    const crumbRes = await fetch("https://query2.finance.yahoo.com/v1/test/getcrumb", {
      headers: { "User-Agent": UA, ...(cookieHeader ? { Cookie: cookieHeader } : {}) },
    });
    const crumbText = crumbRes.ok ? (await crumbRes.text()).trim() : "";
    // Kalau Yahoo balas halaman error/HTML alih-alih crumb polos, anggap gagal.
    const crumb = crumbText && !crumbText.startsWith("<") ? crumbText : "";

    if (!yahooDiagLogged && (!crumbRes.ok || !crumb)) {
      console.log(`  [yahoo] gagal ambil crumb (status cookie=${cookieRes.status}, status crumb=${crumbRes.status}, cookie=${cookieHeader ? "ada" : "KOSONG"}, crumb=${crumb ? "ada" : "KOSONG"}) â€” fundamental akan null untuk semua ticker.`);
      yahooDiagLogged = true;
    }

    yahooAuthCache = { crumb, cookie: cookieHeader };
  } catch (err) {
    if (!yahooDiagLogged) {
      console.log(`  [yahoo] error saat ambil crumb: ${err.message} â€” fundamental akan null untuk semua ticker.`);
      yahooDiagLogged = true;
    }
    yahooAuthCache = { crumb: "", cookie: "" };
  }
  return yahooAuthCache;
}

const pick = (field) => (field && field.raw != null ? field.raw : null);
const pctOr = (v) => (v != null ? round2(v * 100) : null);

async function fetchYahooFundamentals(ticker, priceHint) {
  const empty = {
    per: null, forward_per: null, pbv: null, eps: null, book_value: null,
    psr: null, peg: null, roe: null, roa: null, npm: null, opm: null,
    revenue_growth: null, earnings_growth: null, dividend_yield: 0,
    dividend_rate: null, payout_ratio: null, beta: null, der: null, current_ratio: null,
  };
  try {
    const auth = await getYahooCrumb();
    const symbol = `${ticker}.JK`;
    let url = `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${symbol}` +
      "?modules=defaultKeyStatistics,summaryDetail,financialData";
    if (auth.crumb) url += `&crumb=${encodeURIComponent(auth.crumb)}`;

    const res = await fetch(url, {
      headers: { "User-Agent": UA, ...(auth.cookie ? { Cookie: auth.cookie } : {}) },
    });
    if (!res.ok) {
      if (!yahooDiagLogged) {
        console.log(`  [yahoo] quoteSummary ${ticker} balas ${res.status} â€” cek apakah IP/jaringan diblok Yahoo juga (mirip kasus Cloudflare IDX).`);
        yahooDiagLogged = true;
      }
      return empty;
    }

    const json = await res.json();
    const result = json?.quoteSummary?.result?.[0];
    if (!result) {
      if (!yahooDiagLogged) {
        const errMsg = json?.quoteSummary?.error?.description;
        console.log(`  [yahoo] quoteSummary ${ticker} kosong/tanpa hasil` + (errMsg ? ` (${errMsg})` : "") + ".");
        yahooDiagLogged = true;
      }
      return empty;
    }

    const keyStats = result.defaultKeyStatistics || {};
    const summary = result.summaryDetail || {};
    const fin = result.financialData || {};

    const per = pick(summary.trailingPE) ?? pick(keyStats.forwardPE);
    const eps = pick(keyStats.trailingEps);
    const pbv = pick(keyStats.priceToBook);
    const rawBookValue = pick(keyStats.bookValue);

    // PERBAIKAN: field `bookValue` mentah dari Yahoo kadang korup/salah untuk
    // ticker tertentu (mis. AADI: balas 0.45 padahal BVPS asli ~7.157 --
    // selisih ~16.000x, bukan sekadar salah skala desimal). BVPS seharusnya
    // konsisten dengan PBV & harga (BVPS = harga / PBV), jadi kalau ada
    // priceHint & PBV yang valid, pakai itu sebagai patokan: kalau raw
    // bookValue kosong atau meleset >50% dari hasil turunan, pakai hasil
    // turunan -- lebih dipercaya karena "harga" & "PBV" sama-sama datang
    // dari sisi Yahoo yang konsisten satu sama lain.
    let bookValue = rawBookValue != null ? round2(rawBookValue) : null;
    if (priceHint != null && pbv != null && pbv > 0) {
      const derivedBookValue = round2(priceHint / pbv);
      const inconsistent = bookValue == null || bookValue <= 0 ||
        Math.abs(derivedBookValue - bookValue) / derivedBookValue > 0.5;
      if (inconsistent && derivedBookValue > 0) {
        console.log(`  [yahoo] book_value mentah ${ticker} tidak konsisten (raw=${bookValue ?? "null"}, harga/PBV=${derivedBookValue}) â€” pakai hasil turunan.`);
        bookValue = derivedBookValue;
      }
    }

    return {
      per: per != null ? round2(per) : null,
      forward_per: pick(keyStats.forwardPE) != null ? round2(pick(keyStats.forwardPE)) : null,
      pbv: pbv != null ? round2(pbv) : null,
      // PERBAIKAN: fallback lama "Math.round(1 / per)" salah total secara
      // matematis (EPS = harga / PER, bukan 1 / PER) -- itu menghasilkan
      // EPS palsu yang nyaris nol dan merusak turunan lain (mis. Graham
      // Number jadi ratusan kali lebih kecil dari nilai wajar sebenarnya).
      // Kalau Yahoo tidak kasih trailingEps, biarkan null apa adanya --
      // lebih baik "data belum lengkap" daripada angka ngawur yang
      // kelihatan valid.
      eps: eps != null ? round2(eps) : null,
      book_value: bookValue,
      psr: pick(summary.priceToSalesTrailing12Months) != null ? round2(pick(summary.priceToSalesTrailing12Months)) : null,
      peg: pick(keyStats.pegRatio) != null ? round2(pick(keyStats.pegRatio)) : null,
      roe: pctOr(pick(fin.returnOnEquity)),
      roa: pctOr(pick(fin.returnOnAssets)),
      npm: pctOr(pick(fin.profitMargins)),
      opm: pctOr(pick(fin.operatingMargins)),
      revenue_growth: pctOr(pick(fin.revenueGrowth)),
      earnings_growth: pctOr(pick(fin.earningsGrowth)),
      dividend_yield: pctOr(pick(summary.dividendYield)) ?? 0,
      dividend_rate: pick(summary.dividendRate) != null ? round2(pick(summary.dividendRate)) : null,
      payout_ratio: pctOr(pick(summary.payoutRatio)),
      beta: pick(summary.beta) != null ? round2(pick(summary.beta)) : null,
      der: pick(fin.debtToEquity) != null ? round2(pick(fin.debtToEquity)) : null,
      current_ratio: pick(fin.currentRatio) != null ? round2(pick(fin.currentRatio)) : null,
    };
  } catch (err) {
    if (!yahooDiagLogged) {
      console.log(`  [yahoo] error saat ambil fundamental ${ticker}: ${err.message}`);
      yahooDiagLogged = true;
    }
    return empty;
  }
}

// -------------------------------------------------------------
// Yahoo Finance â€” HARGA LIVE (batch, terpisah dari flows/IDX)
// Pakai v7/finance/quote: bisa ambil ratusan ticker sekaligus dalam
// SATU request (beda dengan quoteSummary di atas yang 1 request/ticker).
// Cocok dijalankan sering (mis. tiap beberapa menit saat jam bursa)
// TANPA perlu nunggu `flows` di-update dulu. Harga dari Yahoo untuk
// saham .JK biasanya delay ~15-20 menit dari real-time bursa, jadi
// "live" di sini bukan tick-by-tick, tapi jauh lebih sering diperbarui
// dibanding sekali sehari lewat IDX.
// -------------------------------------------------------------
const YAHOO_QUOTE_BATCH = 50; // aman di bawah limit URL & rate Yahoo

async function fetchYahooLiveQuotes(tickers) {
  const auth = await getYahooCrumb();
  const results = new Map();

  for (const chunk of chunkArr(tickers, YAHOO_QUOTE_BATCH)) {
    const symbols = chunk.map((t) => `${t}.JK`).join(",");
    let url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(symbols)}`;
    if (auth.crumb) url += `&crumb=${encodeURIComponent(auth.crumb)}`;

    try {
      const res = await fetch(url, {
        headers: { "User-Agent": UA, ...(auth.cookie ? { Cookie: auth.cookie } : {}) },
      });
      if (!res.ok) {
        console.log(`  [yahoo-live] batch ${chunk.length} ticker balas ${res.status}.`);
        await sleep(YAHOO_DELAY_MS);
        continue;
      }
      const json = await res.json();
      const rows = json?.quoteResponse?.result || [];
      for (const r of rows) {
        const ticker = String(r.symbol || "").replace(/\.JK$/, "");
        const price = num(r.regularMarketPrice);
        if (price == null) continue; // simbol dikenali tapi tanpa harga -> jangan timpa data lama
        results.set(ticker, {
          price,
          prev_close: num(r.regularMarketPreviousClose),
          change_abs: num(r.regularMarketChange),
          change_pct: num(r.regularMarketChangePercent),
          volume: num(r.regularMarketVolume),
        });
      }
      const err = json?.quoteResponse?.error;
      if (err) console.log(`  [yahoo-live] error dari Yahoo: ${err}`);
    } catch (e) {
      console.log(`  [yahoo-live] gagal fetch batch (${chunk.length} ticker): ${e.message}`);
    }
    await sleep(YAHOO_DELAY_MS);
  }
  return results;
}

function valuasiDari(per, pbv) {
  if (per == null || pbv == null) return "Data Tidak Lengkap";
  if (per < 15 && pbv < 1.5) return "Murah (Undervalued)";
  if (per > 25 || pbv > 3.0) return "Kemahalan (Overvalued)";
  return "Wajar (Fair)";
}

// -------------------------------------------------------------
// Utama
// -------------------------------------------------------------
const started = Date.now();
let logId;

async function finish(status, okCount, failCount, message) {
  if (logId === undefined || dryRun) return;
  await sb(`sync_log?id=eq.${logId}`, {
    method: "PATCH",
    body: { finished_at: new Date().toISOString(), duration_ms: Date.now() - started, ok_count: okCount, fail_count: failCount, status, message },
    headers: { Prefer: "return=minimal" },
  });
}

try {
  const periodLabel = livePrice
    ? ""
    : (startArg || endArg
        ? ` â€” periode ${startArg ?? "(awal data)"} s/d ${endArg ?? "hari ini"}`
        : ` â€” ${days} hari perdagangan` + (offsetDays > 0 ? ` (mundur ${offsetDays} hari kalender dari hari ini)` : ""));
  console.log(livePrice
    ? "Update harga live dari Yahoo (batch, tidak menyentuh IDX/flows/teknikal/fundamental)..."
    : `Sinkronisasi IDX penuh (harga+teknikal+flow) ${skipFundamentals ? "" : "+ fundamental Yahoo "}${periodLabel}` +
      (dryRun ? " (dry-run, tanpa menulis)" : ""));

  if (debugFields) {
    let cursor = todayWib();
    let rows = [];
    for (let i = 0; i < 10 && rows.length === 0; i++) {
      if (!isWeekend(cursor)) rows = await fetchDay(cursor);
      if (rows.length === 0) cursor.setUTCDate(cursor.getUTCDate() - 1);
    }
    console.log(`Contoh 1 baris mentah dari IDX GetStockSummary (tanggal ${ymd(cursor)}):`);
    console.log(JSON.stringify(rows[0] ?? {}, null, 2));
    if (rows.length === 0) console.log("\n(Tetap kosong sampai 10 hari mundur â€” cek IDX_BASE / koneksi, bukan soal tanggal.)");
    console.log("\nSesuaikan objek IDX_FIELDS di kepala berkas kalau nama field di atas berbeda.");
    process.exit(0);
  }

  // 1. Emiten yang diikuti
  const stocksRows = await sb("stocks?select=ticker");
  let followed = new Set(stocksRows.map((r) => r.ticker));
  if (followed.size === 0) throw new Error("Tabel stocks kosong â€” seed ticker dulu (mis. 02_seed_tickers.sql).");
  if (onlyTickers) followed = new Set([...followed].filter((t) => onlyTickers.has(t)));
  console.log(`${followed.size} emiten diikuti`);

  // Mode --live-price: batch-fetch harga dari Yahoo lalu langsung upsert,
  // TANPA menyentuh IDX/flows/teknikal/fundamental sama sekali, lalu keluar.
  if (livePrice) {
    const quotes = await fetchYahooLiveQuotes([...followed]);
    console.log(`  ${quotes.size} / ${followed.size} ticker dapat harga live dari Yahoo`);

    let okCount = 0, failCount = 0;
    const payload = [];
    for (const ticker of followed) {
      const q = quotes.get(ticker);
      if (!q) { failCount++; continue; }
      payload.push({ ticker, ...q, updated_at: new Date().toISOString() });
      okCount++;
    }

    if (!dryRun) {
      for (const part of chunkArr(payload, 200)) await upsert("stocks", part, "ticker");
    }

    const message = `live-price: ${okCount} ok / ${failCount} tanpa data dari ${followed.size} ticker`;
    console.log(`\n${message}`);
    if (!dryRun) await finish(failCount === 0 ? "success" : "partial", okCount, failCount, message);
    process.exit(0);
  }

  if (!dryRun) {
    const row = await sb("sync_log", { method: "POST", body: { status: "running", source: "idx_full" }, headers: { Prefer: "return=representation" } });
    logId = row?.[0]?.id;
  }

  // 2. Tarik hari perdagangan mundur dari IDX, upsert ke `flows`
  //    (flows dipakai juga sebagai riwayat bar OHLCV untuk indikator teknikal)
  //    -- dilewati sepenuhnya kalau --skip-fetch dipasang (pakai isi
  //    `flows` yang sudah ada di Supabase apa adanya).
  const tradingDays = [];
  const holidays = [];
  const latestQuotes = new Map();
  let totalRows = 0;

  if (skipFetch) {
    console.log("Melewati penarikan IDX (--skip-fetch) â€” memakai data `flows` yang sudah ada di Supabase.");
  } else {
    const rangeMode = Boolean(startArg || endArg);
    let cursor, cursorMin = null;

    if (rangeMode) {
      if (!startArg) throw new Error("--end dipasang tapi --start tidak ada. Pasang keduanya (mis. --start=2026-01-01 --end=2026-03-31), atau lepas --end untuk sampai hari ini.");
      cursorMin = parseYmd(startArg);
      cursor = endArg ? parseYmd(endArg) : todayWib();
      if (cursor < cursorMin) throw new Error(`--end (${ymd(cursor)}) lebih awal dari --start (${ymd(cursorMin)}).`);
      const spanDays = Math.round((cursor - cursorMin) / 86_400_000) + 1;
      if (spanDays > MAX_DAYS) {
        console.log(`  (rentang ${spanDays} hari kalender melebihi batas MAX_DAYS=${MAX_DAYS} -- dipotong ke ${MAX_DAYS} hari kalender terakhir sebelum ${ymd(cursor)})`);
        cursorMin = new Date(cursor);
        cursorMin.setUTCDate(cursorMin.getUTCDate() - (MAX_DAYS - 1));
      }
      if (explicitDays || explicitOffset) console.log("  (--days/--offset diabaikan karena --start/--end dipasang)");
    } else {
      cursor = todayWib();
      if (offsetDays > 0) cursor.setUTCDate(cursor.getUTCDate() - offsetDays);
    }

    let misses = 0, scanned = 0;
    const moreToFetch = () => (rangeMode ? cursor >= cursorMin : tradingDays.length < days);

    // Offer/Bid (harga & volume antrian jual-beli terbaik) cuma snapshot
    // akhir hari, bukan deret waktu -- jadi cuma diambil dari hari
    // perdagangan PALING BARU (iterasi pertama loop di bawah), lalu
    // ditempel ke payload `stocks`, bukan disimpan tiap hari di `flows`.
    // (Kalau --skip-fetch, latestQuotes tetap kosong -> offer/bid di
    // `stocks` akan null, karena memang tidak ada snapshot baru diambil.)
    while (moreToFetch() && misses < MAX_MISSES && scanned < MAX_DAYS * 2) {
      scanned++;
      if (isWeekend(cursor)) { cursor.setUTCDate(cursor.getUTCDate() - 1); continue; }

      const dateStr = ymd(cursor);
      const rows = await fetchDay(cursor);

      if (rows.length === 0) {
        holidays.push(dateStr);
        misses++;
        console.log(`  ${dateStr}  libur / belum terbit`);
        cursor.setUTCDate(cursor.getUTCDate() - 1);
        await sleep(DELAY_MS);
        continue;
      }
      misses = 0;

      if (tradingDays.length === 0) {
        // Hari perdagangan pertama yang berhasil diambil = paling baru.
        for (const r of rows) {
          const t = r[IDX_FIELDS.code];
          if (!followed.has(t)) continue;
          latestQuotes.set(t, {
            offer: num(r[IDX_FIELDS.offer]),
            offer_volume: num(r[IDX_FIELDS.offerVolume]),
            bid: num(r[IDX_FIELDS.bid]),
            bid_volume: num(r[IDX_FIELDS.bidVolume]),
          });
        }
      }

      const payload = rows
        .filter((r) => followed.has(r[IDX_FIELDS.code]))
        .map((r) => ({
          ticker: r[IDX_FIELDS.code],
          date: dateStr,
          open_price: num(r[IDX_FIELDS.open]),
          high: num(r[IDX_FIELDS.high]),
          low: num(r[IDX_FIELDS.low]),
          close: num(r[IDX_FIELDS.close]),
          volume: num(r[IDX_FIELDS.volume]),
          value: num(r[IDX_FIELDS.value]),
          frequency: num(r[IDX_FIELDS.frequency]),
          foreign_buy: num(r[IDX_FIELDS.foreignBuy]),
          foreign_sell: num(r[IDX_FIELDS.foreignSell]),
          nonreg_volume: num(r[IDX_FIELDS.nonRegVolume]),
          nonreg_value: num(r[IDX_FIELDS.nonRegValue]),
          listed_shares: num(r[IDX_FIELDS.listedShares]),
        }));

      if (!dryRun) {
        for (const part of chunkArr(payload, 200)) await upsert("flows", part, "ticker,date");
      }

      const net = payload.reduce((a, r) => a + ((r.foreign_buy ?? 0) - (r.foreign_sell ?? 0)) * (r.close ?? 0), 0);
      console.log(`  ${dateStr}  ${String(payload.length).padStart(3)} emiten   net asing ${rupiah(net).padStart(9)}`);

      tradingDays.push(dateStr);
      totalRows += payload.length;
      cursor.setUTCDate(cursor.getUTCDate() - 1);
      await sleep(DELAY_MS);
    }

    if (tradingDays.length === 0) throw new Error(`Tidak ada hari perdagangan dalam ${MAX_MISSES} hari terakhir.`);
    if (rangeMode && misses >= MAX_MISSES && cursor >= cursorMin) {
      console.log(`  (berhenti lebih awal: ${MAX_MISSES} hari libur berturut-turut -- data sebelum ${ymd(cursor)} sampai ${ymd(cursorMin)} belum tercakup)`);
    }

    // 3. Buang data lama di `flows` (di luar jendela MAX_DAYS) -- cuma
    //    relevan setelah baru saja menarik data baru, jadi dilewati juga
    //    kalau --skip-fetch (supaya tidak menghapus apa pun tanpa alasan).
    if (!dryRun) {
      const cutoff = todayWib();
      cutoff.setUTCDate(cutoff.getUTCDate() - MAX_DAYS);
      await sb(`flows?date=lt.${ymd(cutoff)}`, { method: "DELETE", headers: { Prefer: "return=minimal" } });
    }
  }

  // 4. Untuk tiap emiten: ambil riwayat bar dari `flows`, hitung semua
  //    indikator teknikal, gabung dengan fundamental Yahoo, upsert ke `stocks`
  //    -- bagian teknikal (baca `flows` + hitung indikator + stock_indicators_ext)
  //    dilewati kalau --skip-technical, supaya jauh lebih cepat kalau tujuannya
  //    cuma refresh fundamental.
  console.log(skipTechnical
    ? "\nMengambil fundamental Yahoo & menulis ke tabel stocks (--skip-technical, indikator teknikal dilewati)..."
    : "\nMenghitung indikator teknikal & menulis ke tabel stocks...");
  let okCount = 0, failCount = 0;
  const stocksPayload = [];
  const extPayload = [];

  for (const ticker of followed) {
    try {
      let technical = {};

      if (!skipTechnical) {
        const bars = await sb(
          `flows?ticker=eq.${ticker}&select=date,open_price,high,low,close,volume,value,frequency,listed_shares` +
          `&order=date.asc&limit=${MAX_DAYS}`,
        );
        const cleanBars = (bars || [])
          .filter((b) => b.close != null)
          .map((b) => ({
            date: b.date, open: b.open_price, high: b.high, low: b.low, close: b.close,
            volume: b.volume, value: b.value, frequency: b.frequency, listedShares: b.listed_shares,
          }));

        technical = buildStockRowFromBars(ticker, cleanBars, cleanBars.at(-1)?.listedShares);

        // Perluasan indikator (screener filter tambahan) â€” dihitung 2x:
        // sekali dengan semua bar (current), sekali dengan bar dikurangi
        // 1 hari terakhir (previous), lalu ditulis ke stock_indicators_ext.
        const ext = computeExtendedIndicators(cleanBars);
        const prevExt = cleanBars.length > 1 ? computeExtendedIndicators(cleanBars.slice(0, -1)) : {};
        extPayload.push({
          ticker,
          price_ma5: ext.priceMa5, price_ma10: ext.priceMa10, price_ma20: ext.priceMa20,
          prev_price_ma5: prevExt.priceMa5 ?? null, prev_price_ma10: prevExt.priceMa10 ?? null,
          prev_price_ma20: prevExt.priceMa20 ?? null, prev_price_ma50: prevExt.priceMa50 ?? null,
          prev_price_ma100: prevExt.priceMa100 ?? null, prev_price_ma200: prevExt.priceMa200 ?? null,
          volume_ma5: ext.volumeMa5, volume_ma10: ext.volumeMa10, volume_ma50: ext.volumeMa50,
          volume_ma100: ext.volumeMa100, volume_ma200: ext.volumeMa200,
          prev_volume_ma5: prevExt.volumeMa5 ?? null, prev_volume_ma10: prevExt.volumeMa10 ?? null,
          prev_volume_ma20: prevExt.volumeMa20 ?? null, prev_volume_ma50: prevExt.volumeMa50 ?? null,
          prev_volume_ma100: prevExt.volumeMa100 ?? null,
          value_ma5: ext.valueMa5, value_ma10: ext.valueMa10, value_ma20: ext.valueMa20,
          value_ma50: ext.valueMa50, value_ma100: ext.valueMa100, value_ma200: ext.valueMa200,
          frequency_ma20: ext.frequencyMa20, frequency_ma50: ext.frequencyMa50, freq_spike: ext.freqSpike,
          rsi14: ext.rsi14, prev_rsi14: prevExt.rsi14 ?? null,
          prev_macd: prevExt.macd ?? null, prev_signal: prevExt.signal ?? null, prev_macd_hist: prevExt.macdHist ?? null,
          bb_upper: ext.bbUpper, bb_lower: ext.bbLower,
          adr14: ext.adr14, prev_atr14: prevExt.atr14 ?? null, prev_adr14: prevExt.adr14 ?? null,
          vwap: ext.vwap,
          ema5: ext.ema5, ema10: ext.ema10, ema20: ext.ema20, ema50: ext.ema50, ema100: ext.ema100, ema200: ext.ema200,
          prev_ema200: prevExt.ema200 ?? null,
          fib_p: ext.fibP, fib_r1: ext.fibR1, fib_r2: ext.fibR2, fib_r3: ext.fibR3,
          fib_s1: ext.fibS1, fib_s2: ext.fibS2, fib_s3: ext.fibS3,
          updated_at: new Date().toISOString(),
        });
      }

      let fundamentals = {
        per: null, forward_per: null, pbv: null, eps: null, book_value: null,
        psr: null, peg: null, roe: null, roa: null, npm: null, opm: null,
        revenue_growth: null, earnings_growth: null, dividend_yield: 0,
        dividend_rate: null, payout_ratio: null, beta: null, der: null, current_ratio: null,
      };
      if (!skipFundamentals) {
        fundamentals = await fetchYahooFundamentals(ticker, technical.price);
        await sleep(YAHOO_DELAY_MS);
      }

      const quote = latestQuotes.get(ticker) ?? { offer: null, offer_volume: null, bid: null, bid_volume: null };

      const row = skipTechnical
        ? {
            ticker,
            ...fundamentals,
            valuasi: valuasiDari(fundamentals.per, fundamentals.pbv),
            updated_at: new Date().toISOString(),
          }
        : {
            ...technical,
            ...quote,
            ...fundamentals,
            valuasi: valuasiDari(fundamentals.per, fundamentals.pbv),
            updated_at: new Date().toISOString(),
          };
      stocksPayload.push(row);
      okCount++;
      console.log(skipTechnical
        ? `  OK  ${ticker.padEnd(6)} per=${row.per}  pbv=${row.pbv}  roe=${row.roe}`
        : `  OK  ${ticker.padEnd(6)} price=${row.price}  keyakinan_naik=${row.keyakinan_naik}`);
    } catch (err) {
      failCount++;
      console.log(`  SKIP ${ticker.padEnd(6)} ${err.message}`);
    }
  }

  if (!dryRun && stocksPayload.length > 0) {
    for (const part of chunkArr(stocksPayload, 25)) await upsert("stocks", part, "ticker");
  }
  if (!dryRun && extPayload.length > 0) {
    for (const part of chunkArr(extPayload, 25)) await upsert("stock_indicators_ext", part, "ticker");
  }

  const status = failCount === 0 ? "success" : "partial";
  const flowsSummary = skipFetch
    ? "flows tidak ditarik (--skip-fetch, pakai data lama)"
    : `${tradingDays.length} hari flows (${tradingDays.at(-1)} s/d ${tradingDays[0]}), ${totalRows} baris`;
  const message = `${flowsSummary}; ` +
    `stocks: ${okCount} ok / ${failCount} gagal` + (holidays.length ? `, ${holidays.length} hari libur dilewati` : "");

  if (!dryRun) await finish(status, okCount, failCount, message);

  console.log(`\n${message}`);
  console.log(`selesai dalam ${((Date.now() - started) / 1000).toFixed(1)} detik`);
} catch (err) {
  const message = err instanceof Error ? err.message : String(err);
  console.error(`\nGAGAL: ${message}`);
  await finish("error", 0, 0, message).catch(() => {});
  process.exit(1);
}

