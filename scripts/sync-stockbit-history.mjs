// =============================================================
// sync-stockbit-history.mjs
//
// TUJUAN: tambal `price_history_stockbit` secara OTOMATIS & TERJADWAL
// (lewat GitHub Actions, bukan dari laptop/PC rumah) supaya tab Kraken
// Flow (ORCA) & view `flow_summary` punya data terbaru walau
// sync-idx-full.mjs (yang WAJIB jalan dari PC rumah karena Cloudflare
// IDX) sedang tidak sempat/gagal jalan.
//
// SUMBER TOKEN: TIDAK butuh secret token baru. Token Stockbit dibaca
// dari tabel `stockbit_session` (diisi otomatis oleh extension Chrome
// `stockbit-token-extension` milikmu tiap kali kamu buka stockbit.com
// dalam kondisi login -- lihat sql/05_stockbit_token_sync.sql). Kalau
// token itu kosong/kedaluwarsa (mis. sudah lama tidak buka stockbit.com),
// script ini akan berhenti dengan pesan jelas, BUKAN diam-diam gagal.
//
// ENDPOINT: sama seperti STOCKBIT_DEFAULT_HISTORICAL_EP di app.js --
// endpoint tidak resmi (hasil pengamatan komunitas), bisa berubah/rusak
// kapan saja, dan skema respons di-parse defensif (lihat parseHistorical
// di bawah, port dari parseStockbitHistorical() di app.js).
//
// CATATAN RISIKO: Stockbit bisa saja membatasi/menandai request dari IP
// datacenter (GitHub Actions runner) berbeda dari IP rumahmu -- ini tidak
// bisa dipastikan lebih dulu tanpa dicoba jalan. Kalau ternyata banyak
// gagal 403/429 terus-menerus meski token valid, kemungkinan besar itu
// penyebabnya (bukan bug script) -- opsi fallback: tetap pakai tombol
// manual "Tarik Otomatis (bulk)" di app dari browser rumah.
//
// Pakai:
//   node sync-stockbit-history.mjs                  -> semua ticker di `stocks`, 10 hari kalender terakhir
//   node sync-stockbit-history.mjs --days=20         -> ubah jendela hari kalender ke belakang
//   node sync-stockbit-history.mjs --tickers=BBCA,TLKM -> batasi ke ticker tertentu (uji coba)
//   node sync-stockbit-history.mjs --dry-run         -> tarik & parse saja, tanpa menulis ke Supabase
// =============================================================

import { readFileSync } from "node:fs";

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
      "Buat berkas .env.local di root project atau isi GitHub Secrets:\n\n" +
      "  SUPABASE_URL=https://xxxx.supabase.co\n" +
      "  SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...\n",
  );
  process.exit(1);
}

// Sama seperti STOCKBIT_DEFAULT_HISTORICAL_EP di app.js -- kalau di
// Pengaturan aplikasi kamu sudah ganti endpoint ini (karena Stockbit
// mengubah skemanya), ubah juga baris ini supaya tetap konsisten.
const STOCKBIT_HISTORICAL_EP =
  env.STOCKBIT_HISTORICAL_EP ||
  "https://exodus.stockbit.com/company-price-feed/historical/summary/{ticker}?period={period}&start_date={start_date}&end_date={end_date}&limit={limit}&page={page}";

const STOCKBIT_MAX_RETRIES = 3;
const REQUEST_DELAY_MS = 350; // jeda antar-ticker, sopan ke rate limit Stockbit

// -------------------------------------------------------------
// Argumen
// -------------------------------------------------------------
const argv = process.argv.slice(2);
const arg = (name, fallback) => {
  const hit = argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
};
const dryRun = argv.includes("--dry-run");
const calendarDaysBack = Math.max(1, Math.floor(Number(arg("days", 10))) || 10);
const tickerFilter = arg("tickers", null);
const onlyTickers = tickerFilter ? new Set(tickerFilter.split(",").map((t) => t.trim().toUpperCase())) : null;

// -------------------------------------------------------------
// Util tanggal -- WAJIB pakai zona WIB (UTC+7) secara eksplisit, bukan
// Date lokal runner (GitHub Actions jalan di UTC), supaya tanggal hari
// bursa tidak geser (bug yang sama pernah terjadi di app.js, lihat
// catatan toLocalISODate() di sana).
// -------------------------------------------------------------
function wibDate(d = new Date()) {
  return new Date(d.getTime() + 7 * 3600_000);
}
function toISODate(d) {
  return d.toISOString().slice(0, 10);
}
function todayWibISO() {
  return toISODate(wibDate());
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// -------------------------------------------------------------
// Supabase lewat REST (pola sama persis seperti sync-idx-full.mjs)
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
// Token Stockbit -- dibaca dari tabel `stockbit_session`, BUKAN dari
// secret. Lihat catatan di kepala berkas.
// -------------------------------------------------------------
async function loadStockbitToken() {
  const rows = await sb("stockbit_session?id=eq.1&select=token,expires_at,updated_at");
  const row = rows?.[0];
  if (!row?.token) {
    throw new Error(
      "Tabel `stockbit_session` kosong -- belum pernah tersinkron dari extension Chrome. " +
        "Buka stockbit.com sambil login minimal sekali (dengan extension terpasang) supaya token tersinkron ke Supabase.",
    );
  }
  if (row.expires_at && row.expires_at * 1000 < Date.now()) {
    throw new Error(
      `Token Stockbit di \`stockbit_session\` sudah kedaluwarsa sejak ${new Date(row.expires_at * 1000).toISOString()}. ` +
        "Buka stockbit.com sambil login lagi supaya extension menyinkronkan token baru.",
    );
  }
  return row.token;
}

// -------------------------------------------------------------
// Request ke Stockbit -- port dari stockbitRawRequest() di app.js,
// tanpa jalur proxy (Node tidak kena CORS, jadi selalu request langsung).
// -------------------------------------------------------------
async function stockbitRequest(url, token, attempt = 0) {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}`, "x-platform": "web" },
  });
  if (res.status === 429 && attempt < STOCKBIT_MAX_RETRIES) {
    const retryAfterHeader = Number(res.headers.get("Retry-After"));
    const waitMs = Number.isFinite(retryAfterHeader) && retryAfterHeader > 0
      ? retryAfterHeader * 1000
      : 1000 * Math.pow(2, attempt); // 1s, 2s, 4s
    await sleep(waitMs);
    return stockbitRequest(url, token, attempt + 1);
  }
  const text = await res.text();
  let json = null;
  try { json = JSON.parse(text); } catch { /* bukan JSON */ }
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}${json?.message ? " — " + json.message : ""}`);
  }
  return json ?? text;
}

// -------------------------------------------------------------
// Parser respons histori -- port dari parseStockbitHistorical() di
// app.js (sengaja dijaga identik supaya hasil parsing konsisten dengan
// yang dilihat user di tab Historical Data).
// -------------------------------------------------------------
function pick(row, ...keys) {
  for (const k of keys) { if (row && row[k] != null && row[k] !== "") return row[k]; }
  return null;
}
function normDate(v) {
  if (v == null) return null;
  if (typeof v === "number") return toISODate(wibDate(new Date(v > 2e10 ? v : v * 1000)));
  const s = String(v).trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
  if (/^\d{8}$/.test(s)) return `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}`;
  const m = s.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
  if (m) return `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`;
  const parsed = new Date(s);
  return isNaN(parsed) ? s : toISODate(parsed);
}
function parseHistorical(raw) {
  if (!raw || typeof raw !== "object") return null;
  const container = raw.data || raw.result || raw;
  const list = Array.isArray(container) ? container
    : Array.isArray(container?.result) ? container.result
    : Array.isArray(container?.rows) ? container.rows
    : Array.isArray(container?.chartbit) ? container.chartbit
    : Array.isArray(container?.data) ? container.data
    : Array.isArray(container?.historical) ? container.historical
    : null;
  if (!list || !list.length) return null;

  return list.map((row) => ({
    date: normDate(pick(row, "date", "trade_date", "netbs_date", "period", "chart_date")),
    close: Number(pick(row, "close", "close_price", "last", "c")) || null,
    change: Number(pick(row, "change", "chg", "price_change")) || null,
    changePct: Number(pick(row, "change_percentage", "change_percent", "changePercent", "pct")) || null,
    value: Number(pick(row, "value", "value_idr", "val", "trade_value")) || null,
    volume: Number(pick(row, "volume", "vol", "trade_volume")) || null,
    open: Number(pick(row, "open")) || null,
    high: Number(pick(row, "high")) || null,
    low: Number(pick(row, "low")) || null,
    frequency: Number(pick(row, "frequency")) || null,
    foreignBuy: Number(pick(row, "foreign_buy")) || null,
    foreignSell: Number(pick(row, "foreign_sell")) || null,
    netForeign: pick(row, "net_foreign") != null ? Number(pick(row, "net_foreign")) : null,
  })).filter((r) => r.date);
}

// -------------------------------------------------------------
// Utama
// -------------------------------------------------------------
async function main() {
  console.log(`Sync histori Stockbit -> price_history_stockbit (jendela ${calendarDaysBack} hari kalender)${dryRun ? " (dry-run)" : ""}...`);

  const token = await loadStockbitToken();

  const stocksRows = await sb("stocks?select=ticker");
  let tickers = stocksRows.map((r) => r.ticker);
  if (onlyTickers) tickers = tickers.filter((t) => onlyTickers.has(t));
  if (!tickers.length) throw new Error("Tidak ada ticker untuk diproses (cek tabel `stocks` / --tickers).");
  console.log(`${tickers.length} ticker akan diproses.`);

  const endDate = todayWibISO();
  const startDate = toISODate(new Date(wibDate().getTime() - calendarDaysBack * 86400_000));

  let okCount = 0, failCount = 0, skippedCount = 0, totalRowsSaved = 0;
  const failures = [];

  for (const ticker of tickers) {
    const url = STOCKBIT_HISTORICAL_EP
      .replace("{ticker}", encodeURIComponent(ticker))
      .replace("{period}", "HS_PERIOD_DAILY") // sama seperti mode "Daily" di app.js (stockbitHistoricalPeriodParam)
      .replace("{start_date}", encodeURIComponent(startDate))
      .replace("{end_date}", encodeURIComponent(endDate))
      .replace("{limit}", String(calendarDaysBack + 10))
      .replace("{page}", "1");

    try {
      const raw = await stockbitRequest(url, token);
      const parsed = parseHistorical(raw);
      if (!parsed) {
        skippedCount++;
        failures.push(`${ticker}: response diterima tapi format tidak dikenali`);
      } else {
        const inRange = parsed.filter((r) => r.date >= startDate && r.date <= endDate);
        if (inRange.length) {
          const payload = inRange.map((r) => ({
            stock_code: ticker, trade_date: r.date, period: "daily",
            close: r.close, change: r.change, change_pct: r.changePct, value_idr: r.value, volume: r.volume,
            open: r.open, high: r.high, low: r.low, frequency: r.frequency,
            foreign_buy: r.foreignBuy, foreign_sell: r.foreignSell, net_foreign: r.netForeign,
          }));
          if (!dryRun) await upsert("price_history_stockbit", payload, "stock_code,trade_date,period");
          totalRowsSaved += payload.length;
          okCount++;
        } else {
          skippedCount++;
        }
      }
    } catch (e) {
      failCount++;
      failures.push(`${ticker}: ${e.message}`);
    }
    await sleep(REQUEST_DELAY_MS);
  }

  console.log(`\nSelesai: ${okCount} ticker berhasil (${totalRowsSaved} baris disimpan), ${skippedCount} dilewati (tidak ada data baru di rentang), ${failCount} gagal.`);
  if (failures.length) {
    console.log("\nDaftar gagal/dilewati (maks 20 ditampilkan):");
    failures.slice(0, 20).forEach((f) => console.log(`  - ${f}`));
  }

  if (!dryRun) {
    await sb("sync_log", {
      method: "POST",
      body: {
        status: failCount === 0 ? "success" : "partial",
        source: "stockbit_history",
        ok_count: okCount,
        fail_count: failCount,
        finished_at: new Date().toISOString(),
        message: `stockbit_history: ${okCount} ok / ${failCount} gagal / ${skippedCount} dilewati dari ${tickers.length} ticker, ${totalRowsSaved} baris disimpan`,
      },
      headers: { Prefer: "return=minimal" },
    });
  }

  process.exit(failCount > tickers.length / 2 ? 1 : 0); // exit non-zero kalau lebih dari separuh gagal (biar GH Actions kelihatan merah)
}

main().catch((e) => {
  console.error("FATAL:", e.message);
  process.exit(1);
});
