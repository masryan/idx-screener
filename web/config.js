// =============================================================
// Kredensial default — project Supabase GABUNGAN (idx-screener).
// Ini "anon key" (bukan service_role): hanya boleh SELECT di
// stocks/flows/stocks_screener, dan boleh baca-tulis penuh di
// portfolios/watchlists/backtest_sessions/backtest_items — sesuai
// RLS di 04_integrasi_teknikal_personal.sql. Aman ditaruh di kode
// client karena dibatasi RLS, bukan disembunyikan.
//
// Pengguna tetap bisa mengganti ke project Supabase-nya sendiri
// lewat tombol "⚙️ Pengaturan" di aplikasi — nilai di bawah ini
// hanya dipakai kalau localStorage belum diisi.
// =============================================================
window.APP_CONFIG = {
  SUPABASE_URL: "https://vditwqgiqlvkpdxhocuh.supabase.co/rest/v1",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkaXR3cWdpcWx2a3BkeGhvY3VoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczMzI5NzgsImV4cCI6MjEwMjkwODk3OH0.LziR9ku7DltiChp4HMeTMu1btw00Du4RORhxMH29oso",
};
