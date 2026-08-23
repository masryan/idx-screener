# IDX Screener

Screener saham IDX: sinkronisasi data harga/teknikal/fundamental ke Supabase,
plus dashboard web statis buat screening/watchlist/portofolio/backtest.

## Struktur folder

```
scripts/sync-idx-full.mjs   Skrip Node.js: tarik data IDX, hitung indikator
                             teknikal, ambil fundamental Yahoo, upsert ke
                             Supabase. Lihat komentar di kepala berkas untuk
                             semua opsi (--days, --offset, --start/--end,
                             --skip-fetch, --skip-technical, --live-price, dst).
web/                         Dashboard statis (vanilla JS, tanpa build step).
                             Buka web/index.html langsung di browser, atau
                             deploy ke GitHub Pages / static hosting apa pun.
.github/workflows/           GitHub Actions: live-price.yml menjalankan
                             `--live-price` berkala saat jam bursa.
```

## Setup skrip sync (lokal)

Buat `.env.local` di root repo (JANGAN di-commit, sudah ada di `.gitignore`):

```
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
```

Lalu jalankan sesuai kebutuhan, contoh:

```
node scripts/sync-idx-full.mjs                 # sync harian (default 1 hari)
node scripts/sync-idx-full.mjs --days=260       # backfill riwayat 260 hari
node scripts/sync-idx-full.mjs --live-price     # cuma harga live dari Yahoo
```

**Catatan jaringan:** penarikan data IDX (`idx.co.id`) rawan diblokir Cloudflare
kalau dijalankan dari IP datacenter/cloud (VPS, GitHub Actions, dll) — jalankan
dari koneksi rumah/non-datacenter. `--live-price` (target: Yahoo) relatif lebih
aman dijalankan dari cloud, makanya dijadwalkan lewat GitHub Actions.

## Setup GitHub Actions (`--live-price`)

1. Repo → Settings → Secrets and variables → Actions → New repository secret:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
2. Workflow `live-price.yml` otomatis jalan tiap 5 menit selama jam bursa
   (Senin-Jumat), atau trigger manual lewat tab Actions → "Run workflow".

## Setup dashboard web

`web/config.js` isi kredensial Supabase **anon key** (bukan service role) —
sudah dibatasi lewat RLS jadi aman ditaruh di kode client. Pengguna juga bisa
override lewat tombol "⚙️ Pengaturan" di aplikasi (disimpan di localStorage).
