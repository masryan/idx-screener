// =============================================================
// check-freshness.mjs — cek "kesegaran" data di tabel `stocks`.
//
// TUJUAN: mendeteksi kalau cron --live-price berhenti jalan diam-diam
// (mis. GitHub otomatis menonaktifkan scheduled workflow setelah repo
// tidak ada aktivitas ~60 hari, secret dihapus/expired, Yahoo mulai
// memblokir, dst) — BUKAN untuk membedakan delay wajar Yahoo (~15-20
// menit) dari masalah beneran. Delay wajar itu normal, script ini cuma
// menjaga supaya ticker BENAR-BENAR berhenti diperbarui tidak lolos
// tanpa disadari.
//
// CARA PAKAI (lokal):
//   SUPABASE_URL=https://xxxx.supabase.co \
//   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi... \
//   node scripts/check-freshness.mjs
//
// CARA PAKAI (GitHub Actions): lihat workflow contoh
// .github/workflows/check-freshness.yml — kalau data basi di jam bursa,
// step ini exit 1, job tampil FAILED di tab Actions, dan (kalau kamu
// aktifkan notifikasi email GitHub untuk failed workflow di Settings >
// Notifications) kamu otomatis dapat email peringatan tanpa perlu cek
// manual tiap hari.
//
// OPSI (lewat env, semua opsional):
//   STALE_THRESHOLD_MIN=20   -> berapa menit maksimum data boleh "diam"
//                               saat jam bursa sebelum dianggap basi
//                               (default 20 — cron jalan tiap 10 menit,
//                               jadi 20 menit = 2x run yang terlewat)
//   MARKET_START=09:00       -> jam mulai bursa WIB (default 09:00)
//   MARKET_END=16:15         -> jam akhir bursa WIB (termasuk pre-closing,
//                               default 16:15)
// =============================================================

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error(
    "GAGAL: SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY belum diisi.\n" +
      "Isi sebagai env var (lokal) atau repo secret (GitHub Actions) —\n" +
      "pakai secret yang SAMA dengan yang dipakai sync-idx-full.mjs.",
  );
  process.exit(2); // 2 = error setup, beda dari 1 (data basi) supaya gampang dibedakan di log
}

const STALE_THRESHOLD_MIN = Number(process.env.STALE_THRESHOLD_MIN || 20);
const MARKET_START = process.env.MARKET_START || "09:00";
const MARKET_END = process.env.MARKET_END || "16:15";

// -------------------------------------------------------------
// Jam bursa Jakarta (Senin-Jumat, MARKET_START..MARKET_END WIB).
// Tidak memperhitungkan hari libur nasional — kalau libur, cek ini
// mungkin false-positive "basi" di jam segitu, abaikan saja hasilnya
// hari itu (atau tambahkan daftar tanggal libur kalau mau lebih presisi).
// -------------------------------------------------------------
function isMarketHoursJakarta(now = new Date()) {
  const wib = new Date(now.getTime() + 7 * 60 * 60 * 1000); // UTC -> WIB (UTC+7)
  const day = wib.getUTCDay(); // pakai getUTCDay karena sudah digeser manual di atas
  if (day === 0 || day === 6) return false; // Minggu/Sabtu

  const [startH, startM] = MARKET_START.split(":").map(Number);
  const [endH, endM] = MARKET_END.split(":").map(Number);
  const minutesNow = wib.getUTCHours() * 60 + wib.getUTCMinutes();
  const minutesStart = startH * 60 + startM;
  const minutesEnd = endH * 60 + endM;
  return minutesNow >= minutesStart && minutesNow <= minutesEnd;
}

async function main() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/stocks?select=ticker,updated_at&order=updated_at.desc&limit=1`,
    {
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
      },
    },
  );

  if (!res.ok) {
    console.error(`GAGAL: Supabase membalas ${res.status}: ${(await res.text()).slice(0, 300)}`);
    process.exit(2);
  }

  const rows = await res.json();
  const latest = Array.isArray(rows) ? rows[0] : null;

  if (!latest || !latest.updated_at) {
    console.error("GAGAL: tabel `stocks` kosong atau kolom `updated_at` tidak ada isinya.");
    process.exit(2);
  }

  const now = new Date();
  const updatedAt = new Date(latest.updated_at);
  const staleMinutes = (now.getTime() - updatedAt.getTime()) / 60000;
  const marketOpen = isMarketHoursJakarta(now);

  console.log(`Ticker paling baru diperbarui : ${latest.ticker}`);
  console.log(`updated_at terakhir           : ${latest.updated_at}`);
  console.log(`Selisih dari sekarang         : ${staleMinutes.toFixed(1)} menit`);
  console.log(`Sedang jam bursa (WIB)?       : ${marketOpen ? "ya" : "tidak"}`);

  if (!marketOpen) {
    console.log(
      `\nDi luar jam bursa (${MARKET_START}-${MARKET_END} WIB, Senin-Jumat) — cron --live-price ` +
        `memang tidak dijadwalkan jalan sekarang. Tidak dianggap basi, keluar dengan status OK.`,
    );
    process.exit(0);
  }

  if (staleMinutes > STALE_THRESHOLD_MIN) {
    console.error(
      `\nPERINGATAN: data sudah diam ${staleMinutes.toFixed(1)} menit padahal sedang jam bursa ` +
        `(ambang batas ${STALE_THRESHOLD_MIN} menit). Kemungkinan cron --live-price berhenti jalan — ` +
        `cek tab Actions repo (workflow "IDX Live Price (Yahoo)") dan pastikan masih aktif & secret masih valid.`,
    );
    process.exit(1); // job Actions akan tampil FAILED
  }

  console.log(`\nOK — data masih segar (di bawah ambang batas ${STALE_THRESHOLD_MIN} menit).`);
  process.exit(0);
}

main().catch((e) => {
  console.error(`GAGAL tak terduga: ${e.message}`);
  process.exit(2);
});
