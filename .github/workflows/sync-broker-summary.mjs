#!/usr/bin/env node
// ==========================================================
// sync-broker-summary.mjs
//
// Versi headless/cron dari tombol "⬇️ Tarik Otomatis Broker Summary" di
// app.js (fungsi fetchAndSaveBrokerSummaryBulk / stockbitFetchMarketDetector
// / parseStockbitMarketDetector) — logikanya SENGAJA diporting hampir
// verbatim dari sana supaya perilakunya identik dengan yang sudah teruji
// di browser, cuma tanpa DOM/render().
//
// BEDA PENTING dari versi browser:
// 1. TIDAK BUTUH Proxy URL. state.stockbitProxyUrl di app.js ada khusus
//    buat akalin CORS browser -- script Node ini tidak kena CORS sama
//    sekali, jadi selalu request LANGSUNG ke exodus.stockbit.com.
// 2. Token TIDAK diisi manual -- selalu dibaca dari tabel Supabase
//    `stockbit_session` (yang sama, yang diisi extension Chrome
//    stockbit-token-extension di browser kamu). Kalau extension itu tidak
//    pernah "menyegarkan" token (browser+sesi Stockbit login aktif secara
//    berkala), token di tabel itu lama-lama expired dan run cron mulai
//    gagal 401 sampai kamu buka lagi tab Stockbit.
// 3. Default TICKER SOURCE = semua baris di tabel `stocks` (bukan cuma
//    yang dicentang di Screener) -- override dengan --tickers=file.txt
//    kalau perlu daftar spesifik (format sama seperti upload .txt di app).
// 4. Default TANGGAL = hari bursa TERBARU (hari ini kalau hari bursa,
//    kalau bukan mundur ke hari bursa sebelumnya) -- override dengan
//    --from=YYYY-MM-DD --to=YYYY-MM-DD untuk backfill rentang tanggal.
//
// ENV VARS WAJIB (isi lewat GitHub Actions secrets / .env lokal):
//   SUPABASE_URL              -- https://xxxx.supabase.co/rest/v1
//   SUPABASE_SERVICE_KEY      -- service_role key (BUKAN anon key -- cron
//                                 butuh bypass RLS, jangan reuse anon key
//                                 yang dipakai browser)
//   STOCKBIT_BROKER_ENDPOINT  -- opsional, default = STOCKBIT_DEFAULT_BROKER_EP
//                                 di bawah (sama seperti default app.js)
//
// CONTOH PAKAI:
//   node sync-broker-summary.mjs                     # hari bursa terbaru, semua saham
//   node sync-broker-summary.mjs --from=2026-09-01 --to=2026-09-23   # backfill rentang
//   node sync-broker-summary.mjs --tickers=my-list.txt               # daftar sendiri
//   node sync-broker-summary.mjs --dry-run            # tes tarik tanpa tulis ke DB
// ==========================================================

import { readFileSync } from "node:fs";

const SUPABASE_URL = (process.env.SUPABASE_URL || "").replace(/\/+$/, "");
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || "";
const STOCKBIT_BROKER_EP = process.env.STOCKBIT_BROKER_ENDPOINT
  || "https://exodus.stockbit.com/marketdetectors/{ticker}?from={date}&to={date}&transaction_type=TRANSACTION_TYPE_NET&market_board=MARKET_BOARD_REGULER&investor_type=INVESTOR_TYPE_ALL&limit={limit}";
const STOCKBIT_MARKETDETECTOR_DEFAULT_LIMIT = 5;
const STOCKBIT_MAX_RETRIES = 3;
const REQUEST_DELAY_MS = 350; // jeda antar-ticker, sama seperti di app.js (jaga rate limit)

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("❌ SUPABASE_URL dan SUPABASE_SERVICE_KEY wajib diisi lewat env var.");
  process.exit(1);
}

const args = process.argv.slice(2);
const flag = (name) => {
  const hit = args.find(a => a === `--${name}` || a.startsWith(`--${name}=`));
  if (!hit) return null;
  return hit.includes("=") ? hit.slice(hit.indexOf("=") + 1) : true;
};
const dryRun = !!flag("dry-run");
const fromArg = flag("from");
const toArg = flag("to");
const tickersFileArg = flag("tickers");

// ---------- Kalender libur bursa (SAMA PERSIS dengan BURSA_HOLIDAYS di app.js) ----------
// PENTING: update tiap tahun sama seperti di app.js -- kalau tahunnya tidak
// terdaftar, fallback ke exclude-weekend-saja.
const BURSA_HOLIDAYS = new Set([
  "2026-01-01", "2026-01-16", "2026-02-16", "2026-02-17", "2026-03-18",
  "2026-03-19", "2026-03-20", "2026-03-23", "2026-03-24", "2026-04-03",
  "2026-05-01", "2026-05-14", "2026-05-27", "2026-05-28", "2026-06-01",
  "2026-06-16", "2026-08-17", "2026-08-25", "2026-12-24", "2026-12-25",
  "2026-12-31",
]);

function toLocalISODate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function isTradingDay(d) {
  const dow = d.getDay();
  return dow !== 0 && dow !== 6 && !BURSA_HOLIDAYS.has(toLocalISODate(d));
}
function latestTradingDate(fromDate = new Date()) {
  const d = new Date(fromDate);
  while (!isTradingDay(d)) d.setDate(d.getDate() - 1);
  return toLocalISODate(d);
}
function tradingDaysInRange(fromStr, toStr) {
  const days = [];
  let d = new Date(fromStr + "T00:00:00");
  const end = new Date(toStr + "T00:00:00");
  if (d > end) return days;
  while (d <= end) {
    if (isTradingDay(d)) days.push(toLocalISODate(d));
    d.setDate(d.getDate() + 1);
  }
  return days;
}

// ---------- Supabase helpers ----------
function supaHeaders(extra = {}) {
  return { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", ...extra };
}
async function supaGet(path) {
  const res = await fetch(`${SUPABASE_URL}${path}`, { headers: supaHeaders() });
  if (!res.ok) throw new Error(`[GET ${path}] HTTP ${res.status} ${await res.text().catch(()=> "")}`);
  return res.json();
}
async function supaUpsert(table, rows, onConflict) {
  if (!rows.length) return;
  const res = await fetch(`${SUPABASE_URL}/${table}?on_conflict=${onConflict}`, {
    method: "POST",
    headers: supaHeaders({ Prefer: "resolution=merge-duplicates,return=minimal" }),
    body: JSON.stringify(rows),
  });
  if (!res.ok) throw new Error(`[POST ${table}] HTTP ${res.status} ${await res.text().catch(()=> "")}`);
}

// ---------- Token (dibaca dari stockbit_session, diisi extension Chrome) ----------
async function fetchStockbitToken() {
  const rows = await supaGet(`/stockbit_session?id=eq.1&select=token,expires_at,updated_at`);
  const row = Array.isArray(rows) ? rows[0] : null;
  if (!row || !row.token) {
    throw new Error("Tabel stockbit_session kosong / belum ada token -- buka app.js di browser dulu dengan extension aktif supaya token ikut tersinkron ke Supabase.");
  }
  const token = String(row.token).trim().replace(/^bearer\s+/i, "");
  if (row.expires_at) {
    const ageMs = Date.now() - new Date(row.updated_at || Date.now()).getTime();
    console.log(`ℹ️ Token disinkron terakhir ${Math.round(ageMs / 60000)} menit lalu, expires_at=${row.expires_at}`);
  }
  return token;
}

// ---------- Request ke Stockbit (langsung, TANPA proxy -- lihat catatan di atas) ----------
async function stockbitRawRequest(url, token, attempt = 0) {
  try {
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (res.status === 429 && attempt < STOCKBIT_MAX_RETRIES) {
      const retryAfter = Number(res.headers.get("Retry-After"));
      const waitMs = Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : 1000 * Math.pow(2, attempt);
      await new Promise(r => setTimeout(r, waitMs));
      return stockbitRawRequest(url, token, attempt + 1);
    }
    const text = await res.text();
    let json = null;
    try { json = JSON.parse(text); } catch { /* bukan JSON */ }
    if (!res.ok) {
      return { error: `HTTP ${res.status}${json && json.message ? " — " + json.message : ""}`, raw: json ?? text };
    }
    return { raw: json ?? text };
  } catch (e) {
    return { error: e.message };
  }
}

// ---------- Parsing (porting hampir verbatim dari parseStockbitMarketDetector/buildBrokerByDate di app.js) ----------
function pickAny(obj, keys) {
  for (const k of keys) if (obj?.[k] != null && obj[k] !== "") return obj[k];
  return null;
}
function buildBrokerByDate(buyRows, sellRows, fetchDate) {
  const byDate = {};
  const ensure = (date) => (byDate[date] ||= { buy: [], sell: [] });
  const dateStr = fetchDate;
  const pick = (r, keys) => { for (const k of keys) if (r?.[k] != null && r[k] !== "") return r[k]; return null; };
  const mapRows = (rows, side) => rows.forEach(r => {
    const broker = pick(r, ["broker", "broker_code", "brokerCode", "broker_id", "brokerId", "code", "broker_name", "netbs_broker_code"]);
    const lot = Math.abs(Number(pick(r, side === "buy" ? ["lot", "blot", "buy_lot", "quantity", "qty"] : ["lot", "slot", "sell_lot", "quantity", "qty"]))) || null;
    const value = Math.abs(Number(pick(r, side === "buy" ? ["value", "bval", "buy_value", "value_idr", "net_value", "amount"] : ["value", "sval", "sell_value", "value_idr", "net_value", "amount"]))) || 0;
    const investorType = pick(r, ["type", "investor_type", "investorType"]);
    if (broker != null) ensure(dateStr)[side].push({ broker_code: String(broker).toUpperCase(), lot, value_idr: value, investor_type: investorType || null });
  });
  mapRows(buyRows, "buy"); mapRows(sellRows, "sell");
  Object.values(byDate).forEach(d => {
    d.buy.sort((a, b) => b.value_idr - a.value_idr);
    d.sell.sort((a, b) => b.value_idr - a.value_idr);
    d.buy = d.buy.slice(0, 5).map((r, i) => ({ ...r, rank: i + 1 }));
    d.sell = d.sell.slice(0, 5).map((r, i) => ({ ...r, rank: i + 1 }));
  });
  return byDate;
}
function parseStockbitMarketDetector(raw, fetchDate) {
  if (!raw || typeof raw !== "object") return null;
  let candidates = [raw, raw.data, raw.result, raw.data?.data, raw.data?.result, raw.result?.data, raw.result?.result].filter(v => v && typeof v === "object");
  candidates = candidates.concat(candidates.map(c => c.broker_summary).filter(v => v && typeof v === "object"));

  const candidateWithByValOrVol = candidates.find(v => v && typeof v === "object" && ((v.by_value && (Array.isArray(v.by_value.top_broker_buy) || Array.isArray(v.by_value.top_broker_sell))) || (v.by_volume && (Array.isArray(v.by_volume.top_broker_buy) || Array.isArray(v.by_volume.top_broker_sell)))));
  if (candidateWithByValOrVol) {
    const byValue = candidateWithByValOrVol.by_value;
    const byVolume = candidateWithByValOrVol.by_volume;
    const flatten = (rows) => (rows || []).map(r => {
      if (!r || typeof r !== "object") return null;
      const d = (r.detail && typeof r.detail === "object") ? r.detail : r;
      if (Array.isArray(r.distribute_to) && r.distribute_to.length) return { ...d, _distributeTo: r.distribute_to };
      return d;
    }).filter(Boolean);
    const mergeByCode = (valueRows, volumeRows) => {
      const byCode = {};
      const codeOf = (r) => String(pickAny(r, ["code", "broker_code", "broker", "brokerCode"]) ?? "").toUpperCase();
      (valueRows || []).forEach(r => {
        const code = codeOf(r); if (!code) return;
        const row = (byCode[code] ||= { broker_code: code });
        row.value_idr = Number(pickAny(r, ["amount", "value", "value_idr"])) || 0;
      });
      (volumeRows || []).forEach(r => {
        const code = codeOf(r); if (!code) return;
        const row = (byCode[code] ||= { broker_code: code });
        row.lot = Number(pickAny(r, ["amount", "lot", "volume", "qty"])) || null;
      });
      return Object.values(byCode);
    };
    const buyRows = mergeByCode(flatten(byValue?.top_broker_buy), flatten(byVolume?.top_broker_buy));
    const sellRows = mergeByCode(flatten(byValue?.top_broker_sell), flatten(byVolume?.top_broker_sell));
    return buildBrokerByDate(buyRows, sellRows, fetchDate);
  }

  const bs = candidates.find(v => ["brokers_buy", "brokers_sell", "buy", "sell", "buy_rows", "sell_rows", "distribution_buy", "distribution_sell"].some(k => Array.isArray(v[k]))) || raw;
  const buyRows = ["brokers_buy", "buy", "buy_rows", "distribution_buy", "buy_data", "buyer", "buyers"].map(k => (Array.isArray(bs[k]) ? bs[k] : null)).find(Boolean) || [];
  const sellRows = ["brokers_sell", "sell", "sell_rows", "distribution_sell", "sell_data", "seller", "sellers"].map(k => (Array.isArray(bs[k]) ? bs[k] : null)).find(Boolean) || [];
  if (!buyRows.length && !sellRows.length) return null;
  return buildBrokerByDate(buyRows, sellRows, fetchDate);
}
function calcAvgPrice(value_idr, lot) {
  const v = Number(value_idr), l = Number(lot);
  if (!Number.isFinite(v) || !Number.isFinite(l) || l <= 0) return null;
  return Math.round(v / (l * 100));
}

// ---------- Tickers ----------
function parseTickerListTxt(text) {
  const seen = new Set(); const out = [];
  String(text || "").split(/[\r\n,;\t ]+/).map(t => t.trim().toUpperCase())
    .filter(t => t && !t.startsWith("#") && !t.startsWith("//"))
    .filter(t => /^[A-Z0-9]{2,6}$/.test(t))
    .forEach(t => { if (!seen.has(t)) { seen.add(t); out.push(t); } });
  return out;
}
async function resolveTickers() {
  if (tickersFileArg) return parseTickerListTxt(readFileSync(tickersFileArg, "utf8"));
  const rows = await supaGet(`/stocks?select=ticker&order=ticker.asc`);
  return rows.map(r => r.ticker).filter(Boolean);
}

async function fetchExistingBrokerDates(ticker, dates) {
  if (!dates.length) return new Set();
  const qs = new URLSearchParams({ stock_code: `eq.${ticker}`, trade_date: `in.(${dates.join(",")})`, select: "trade_date" });
  try {
    const rows = await supaGet(`/broker_summary?${qs}`);
    return new Set(rows.map(r => r.trade_date));
  } catch { return new Set(); }
}

// ---------- Main ----------
async function main() {
  const token = await fetchStockbitToken();
  const tickers = await resolveTickers();
  const tradingDates = fromArg && toArg ? tradingDaysInRange(fromArg, toArg) : [latestTradingDate()];
  if (!tradingDates.length) { console.error("❌ Tidak ada hari bursa di rentang yang diminta."); process.exit(1); }
  const latestDate = tradingDates[tradingDates.length - 1]; // selalu ditarik ulang meski sudah ada, sama seperti app.js

  console.log(`🚀 sync-broker-summary: ${tickers.length} ticker × ${tradingDates.length} hari bursa (${tradingDates[0]}..${latestDate})${dryRun ? " [DRY RUN]" : ""}`);

  let okCount = 0, failCount = 0;
  for (const ticker of tickers) {
    const existingDates = await fetchExistingBrokerDates(ticker, tradingDates);
    const datesToFetch = tradingDates.filter(d => !existingDates.has(d) || d === latestDate);
    if (!datesToFetch.length) { console.log(`⏭️  ${ticker}: semua hari sudah ada di DB, dilewati`); continue; }

    let byDate = {};
    let anyOk = false, lastError = null;
    for (const date of datesToFetch) {
      const url = STOCKBIT_BROKER_EP
        .replaceAll("{ticker}", encodeURIComponent(ticker))
        .replaceAll("{date}", date)
        .replaceAll("{limit}", encodeURIComponent(STOCKBIT_MARKETDETECTOR_DEFAULT_LIMIT));
      const res = await stockbitRawRequest(url, token);
      if (res.error) { lastError = res.error; }
      else {
        const parsed = parseStockbitMarketDetector(res.raw, date);
        if (parsed && Object.keys(parsed).length) { Object.assign(byDate, parsed); anyOk = true; }
        else lastError = "Skema respons tidak dikenali / kosong";
      }
      if (datesToFetch.length > 1) await new Promise(r => setTimeout(r, 300));
    }

    if (!anyOk) {
      failCount++;
      console.log(`❌ ${ticker}: ${lastError || "gagal tanpa pesan"}`);
    } else {
      const rows = [];
      Object.entries(byDate).forEach(([d, dd]) => {
        dd.buy.forEach(r => rows.push({ stock_code: ticker, trade_date: d, side: "buy", rank: r.rank, broker_code: r.broker_code, lot: r.lot, value_idr: r.value_idr, avg_price: calcAvgPrice(r.value_idr, r.lot), investor_type: r.investor_type ?? null }));
        dd.sell.forEach(r => rows.push({ stock_code: ticker, trade_date: d, side: "sell", rank: r.rank, broker_code: r.broker_code, lot: r.lot, value_idr: r.value_idr, avg_price: calcAvgPrice(r.value_idr, r.lot), investor_type: r.investor_type ?? null }));
      });
      if (!dryRun && rows.length) {
        try {
          await supaUpsert("broker_summary", rows, "stock_code,trade_date,side,rank");
          okCount++;
          console.log(`✅ ${ticker}: ${rows.length} baris tersimpan (${Object.keys(byDate).length}/${datesToFetch.length} hari)`);
        } catch (e) {
          failCount++;
          console.log(`❌ ${ticker}: gagal simpan ke DB -- ${e.message}`);
        }
      } else {
        okCount++;
        console.log(`✅ ${ticker}: ${rows.length} baris ${dryRun ? "(dry-run, tidak ditulis)" : "tersimpan"}`);
      }
    }
    await new Promise(r => setTimeout(r, REQUEST_DELAY_MS));
  }

  console.log(`\n🏁 Selesai. ${okCount} ticker sukses, ${failCount} gagal, dari ${tickers.length} total.`);
  if (failCount > tickers.length * 0.5) {
    console.error("⚠️ Lebih dari separuh ticker gagal -- kemungkinan besar token expired atau IP runner ini diblokir Stockbit, BUKAN masalah per-ticker. Cek pesan error di atas.");
    process.exit(1);
  }
}

main().catch(e => { console.error("💥 Fatal:", e.message); process.exit(1); });
