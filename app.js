// ==========================================
// VARIABEL KONEKSI LOKAL (DINAMIS)
//
// Kredensial default sekarang datang dari config.js (window.APP_CONFIG),
// bukan ditulis langsung di sini. INI SENGAJA: file ini boleh dibaca
// publik (view-source), jadi hanya anon key yang boleh muncul di sini —
// tidak pernah service_role. Isolasi lewat RLS di database, bukan lewat
// menyembunyikan kunci di kode client (itu tidak pernah benar-benar
// tersembunyi).
// ==========================================
const DEFAULT_SUPABASE_URL = (window.APP_CONFIG && window.APP_CONFIG.SUPABASE_URL) || "";
const DEFAULT_SUPABASE_KEY = (window.APP_CONFIG && window.APP_CONFIG.SUPABASE_ANON_KEY) || "";

let SUPABASE_URL = localStorage.getItem("ihsg_supa_url") || DEFAULT_SUPABASE_URL;
let SUPABASE_KEY = localStorage.getItem("ihsg_supa_key") || DEFAULT_SUPABASE_KEY;

// ==========================================
// DAFTAR SAHAM SYARIAH (fallback client-side)
//
// Kolom `syariah` di database (stocks_screener) sudah ada tapi belum
// diisi labelnya. Selama kolom itu masih kosong (null/undefined) untuk
// sebuah ticker, aplikasi menandai saham tsb sebagai syariah berdasarkan
// daftar statis ini (bisa diperbarui manual sesuai daftar resmi DES/ISSI
// terbaru). Begitu kolom `syariah` di database sudah diisi oleh backend,
// nilai dari database itu yang dipakai (daftar ini otomatis diabaikan).
// ==========================================
const SYARIAH_TICKERS = new Set([
  "BANK","BBMI","BRIS","BTPS","JMAS","PNBS","SPOT","AADI","ABMM","ADMR","ADRO","AKRA","ARII","ATLA","BBRM","BESS","BOAT","BSML","BSSR","BULL","BUMI","BYAN","CANI","CGAS","COAL","DEWA","DSSA","DWGL","ELSA","ENRG","FIRE","GEMS","HRUM","IATA","INDY","ITMA","ITMG","KKGI","KOPI","MAHA","MBAP","MCOL","MEDC","MKAP","MYOH","PGAS","PKPK","PSAT","PSSI","PTBA","PTIS","RAJA","RATU","RGAS","RMKE","RMKO","RUIS","SEMA","SGER","SICO","SMMT","SOCI","SUNI","TCPI","TEBE","TOBA","TPMA","UNIQ","WINS","WOWS","ADMG","AGII","AKPI","ALDO","ALKA","ANTM","APLI","ARCI","ASPR","AVIA","AYLS","BATR","BLES","BMSR","BRMS","BRNA","CHEM","CITA","CLPI","CTBN","DGWG","DKFT","EKAD","EPAC","ESIP","ESSA","FASW","FPNI","FWCT","GDST","GGRP","IFII","IFSH","IGAR","INCI","INKP","INTD","INTP","IPOL","ISSP","KDSI","KKES","LMSH","LTLS","MBMA","MDKA","MDKI","MINE","NICE","NICL","NIKL","OBMD","OKAS","PACK","PBID","PDPP","PICO","PPRI","PSAB","PTMR","SAMF","SBMA","SMBR","SMCB","SMGA","SMGR","SMKL","SMLE","SOLA","SPMA","SULI","TALF","TBMS","TINS","TIRT","TKIM","TPIA","TRST","UNIC","WTON","YPAS","AMFG","AMIN","APII","ARNA","ASGR","BINO","BLUE","CAKK","CCSI","CRSN","DYAN","FOLK","GPSO","HEXA","HOPE","HYGN","ICON","IKAI","IKBI","IMPC","JECC","JTPE","KBLI","KBLM","KIAS","KING","KOBX","KOIN","KONI","KUAS","LION","MARK","MFMI","MHKI","MLIA","MUTU","NAIK","NTBK","PADA","PTMP","SCCO","SKRN","SMIL","SOSS","SPTO","TIRA","TOTO","UNTR","VISI","VOKS","WIDI","AALI","ADES","AGAR","AISA","AMMS","ASHA","AYAM","BISI","BOBA","BRRC","BUAH","BUDI","BWPT","CAMP","CEKA","CLEO","CMRY","CPIN","CPRO","CSRA","DAYA","DEWI","DMND","DSFI","DSNG","EPMT","EURO","FISH","FLMC","FOOD","FORE","GOOD","GRPM","GULA","GUNA","GZCO","HERO","HOKI","ICBP","IKAN","INDF","JARR","JAWA","JPFA","KEJU","KINO","KMDS","LSIP","MAIN","MAXI","MBTO","MKTR","MLPL","MPPA","MRAT","MSJA","MYOR","NANO","NASI","NAYZ","NEST","NSSS","PCAR","PGUN","PNGO","PSDN","PSGO","PTPS","RANC","ROTI","SDPC","SGRO","SIMP","SIPD","SKBM","SKLT","SMAR","STAA","STTP","TAPG","TCID","TGKA","TGUK","TLDN","UCID","UDNG","ULTJ","UNVR","VICI","WAPO","YUPI","ACES","AEGS","ASLC","AUTO","BABY","BAIK","BAUT","BAYU","BELL","BIKE","BLTZ","BMBL","BMTR","BOGA","BOLT","BRAM","CINT","CNMA","CSAP","CSMI","DEPO","DOOH","DOSS","DRMA","EAST","ECII","ENAK","ERAA","ERAL","ERTX","ESTA","FAST","FILM","GDYR","GEMA","GJTL","GOLF","GRPH","GWSA","HAJJ","HRTA","IDEA","IIKP","INDR","INDS","IPTV","ISAP","JGLE","JIHD","KAQI","KICI","KLIN","KOTA","KPIG","LFLO","LIVE","LMAX","LMPI","LPIN","LPPF","MAPA","MAPB","MAPI","MDIA","MDIY","MEJA","MERI","MGLV","MICE","MKNT","MNCN","MPMX","MSIN","MSKY","OLIV","PANR","PART","PDES","PGLI","PJAA","PLAN","PMJS","PMUI","POLU","PSKT","PTSP","PZZA","RAAM","RALS","SCNP","SHID","SLIS","SMSM","SNLK","SOFA","SOTS","SPRE","SSTM","SWID","TFCO","TMPO","TOOL","TRIS","TYRE","UFOE","VERN","VKTR","WOOD","YELO","ZONE","BMHS","CARE","CHEK","DGNS","DVLA","HALO","HEAL","IKPM","IRRA","KLBF","LABS","MDLA","MEDS","MERK","MIKA","MMIX","MTMH","OBAT","OMED","PEHA","PEVE","PRAY","PRDA","PRIM","RSCH","RSGK","SAME","SCPI","SIDO","SILO","SOHO","SURI","TSPC","SRTG","PALM","DEFI","ADCP","AMAN","APLN","ASPI","ASRI","ATAP","BAPI","BBSS","BCIP","BEST","BIPP","BKDP","BKSL","BSBK","BSDE","CITY","CSIS","CTRA","DADA","DILD","DMAS","DUTI","ELTY","EMDE","FMII","GMTD","GPRA","GRIA","HBAT","HOMI","INPP","IPAC","JRPT","KBAG","KIJA","KOCI","LAND","LPCK","LPLI","MKPI","MMLP","MSIE","MTLA","MTSM","NZIA","PAMG","PLIN","POLI","PURI","RBMS","REAL","RELF","RISE","ROCK","RODA","SAGE","SATU","SMDM","SMRA","UANG","URBN","VAST","WINR","AREA","ATIC","AWAN","AXIO","BELI","CASH","CHIP","CYBR","DCII","DIVA","DMMX","ELIT","GLVA","HDIT","IOTF","IRSX","JATI","KIOS","KREN","LUCK","MCAS","MLPT","MPIX","MSTI","MTDL","NFCX","PGJO","PTSN","RUNS","TFAS","TOSK","TRON","UVCR","WGSH","WIFI","WIRG","ZYRX","ASLI","BALI","BDKR","CASS","CMNP","DATA","DGIK","EXCL","FIMP","GHON","GOLD","HADE","IBST","IDPR","INET","IPCM","ISAT","JAST","JKON","JSMR","KARW","KEEN","KETR","KOKA","MANG","META","MORA","MPOW","MTEL","MTPS","NRCA","PORT","POWR","PPRE","PTPP","PTPW","SMKM","SSIA","SUPR","TAMA","TLKM","TOTL","WEGE","AKSI","ASSA","BIRD","BLOG","BLTA","CMPP","ELPI","GIAA","GTRA","HAIS","HATM","HELI","JAYA","KJEN","KLAS","LAJU","LOPI","LRNA","MIRA","MITI","NELY","PJHB","PPGL","PURA","RCCC","SAFE","SAPX","SMDR","TAXI","TMAS","TNCA","TRJA","TRUK","WBSA","WEHA","GRHA"
]);
function isSyariah(ticker){ return SYARIAH_TICKERS.has(String(ticker||"").toUpperCase()); }

// ==========================================
// PETA KODE BROKER -> NAMA PERUSAHAAN SEKURITAS
//
// Dipakai fitur Broker Stalker supaya baris hasil menampilkan nama lengkap
// ("CLSA SEKURITAS INDONESIA") alih-alih cuma kode 2 huruf ("KZ"). Sumber:
// daftar Anggota Bursa (AB) BEI yang dipublikasikan ulang oleh media (per
// 2025/2026) — bukan hasil scraping API resmi, jadi kalau ada kode broker
// baru/berganti nama, tambahkan/perbarui manual di sini (sama semangatnya
// dengan SYARIAH_TICKERS & EPS_FOREIGN_BROKER_CODES di atas & di bawah).
// Kode yang tidak ada di peta ini tetap ditampilkan (fallback ke kode +
// "SEKURITAS" generik lewat brokerFullName()), tidak menyembunyikan data.
// ==========================================
const BROKER_NAME_MAP = {
  AF:"Harita Kencana Sekuritas", AG:"Kiwoom Sekuritas Indonesia", AH:"Shinhan Sekuritas Indonesia",
  AI:"UOB Kay Hian Sekuritas", AK:"UBS Sekuritas Indonesia", AN:"Wanteg Sekuritas",
  AO:"Erdikha Elit Sekuritas", AP:"Pacific Sekuritas Indonesia", AR:"Binaartha Sekuritas",
  AT:"Phintraco Sekuritas", AZ:"Sucor Sekuritas", BB:"Verdhana Sekuritas Indonesia",
  BF:"Inti Fikasa Sekuritas", BK:"J.P. Morgan Sekuritas Indonesia", BQ:"Korea Investment and Sekuritas Indonesia",
  BR:"Trust Sekuritas", BS:"Equity Sekuritas Indonesia", CC:"Mandiri Sekuritas",
  CD:"Mega Capital Sekuritas", CP:"KB Valbury Sekuritas", CS:"Credit Suisse Sekuritas Indonesia",
  DD:"Makindo Sekuritas", DH:"Sinarmas Sekuritas", DM:"Masindo Artha Sekuritas",
  DP:"DBS Vickers Sekuritas Indonesia", DR:"RHB Sekuritas Indonesia", DU:"KAF Sekuritas Indonesia",
  DX:"Bahana Sekuritas", EL:"Evergreen Sekuritas Indonesia", EP:"MNC Sekuritas",
  ES:"Ekokapital Sekuritas", FO:"Forte Global Sekuritas", FS:"Yuanta Sekuritas Indonesia",
  FZ:"Waterfront Sekuritas Indonesia", GA:"BNC Sekuritas Indonesia", GI:"Webull Sekuritas Indonesia",
  GR:"Panin Sekuritas Tbk.", GW:"HSBC Sekuritas Indonesia", HD:"KGI Sekuritas Indonesia",
  HP:"Henan Putihrai Sekuritas", ID:"Anugerah Sekuritas Indonesia", IF:"Samuel Sekuritas Indonesia",
  IH:"Pacific 2000 Sekuritas", II:"Danatama Makmur Sekuritas", IN:"Investindo Nusantara Sekuritas",
  IP:"Yugen Bertumbuh Sekuritas", IT:"Inti Teladan Sekuritas", IU:"Indo Capital Sekuritas",
  KI:"Ciptadana Sekuritas Asia", KK:"Phillip Sekuritas Indonesia", KZ:"CLSA Sekuritas Indonesia",
  LG:"Trimegah Sekuritas Indonesia Tbk.", LS:"Reliance Sekuritas Indonesia Tbk.", MG:"Semesta Indovest Sekuritas",
  MI:"Victoria Sekuritas Indonesia", MK:"Ekuator Swarna Sekuritas", MU:"Minna Padi Investama Sekuritas",
  NI:"BNI Sekuritas", OD:"BRI Danareksa Sekuritas", OK:"NET Sekuritas",
  PC:"FAC Sekuritas Indonesia", PD:"Indo Premier Sekuritas", PF:"Danasakti Sekuritas Indonesia",
  PG:"Panca Global Sekuritas", PO:"Pilarmas Investindo Sekuritas", PP:"Aldiracita Sekuritas Indonesia",
  PS:"Paramitra Alfa Sekuritas", QA:"Tuntun Sekuritas Indonesia", RB:"Nikko Sekuritas Indonesia",
  RF:"Buana Capital Sekuritas", RG:"Profindo Sekuritas Indonesia", RO:"Nilai Inti Sekuritas",
  RS:"Yulie Sekuritas Indonesia Tbk.", RX:"Macquarie Sekuritas Indonesia", SA:"Elit Sukses Sekuritas",
  SC:"IMG Sekuritas", SF:"Surya Fajar Sekuritas", SH:"Artha Sekuritas Indonesia",
  SQ:"BCA Sekuritas", SS:"Supra Sekuritas Indonesia", TF:"Universal Broker Indonesia Sekuritas",
  TP:"OCBC Sekuritas Indonesia", TS:"Dwidana Sakti Sekuritas", XA:"NH Korindo Sekuritas Indonesia",
  XC:"Ajaib Sekuritas Asia", XL:"Stockbit Sekuritas Digital", YB:"Jasa Utama Capital Sekuritas",
  YJ:"Lotus Andalan Sekuritas", YO:"Amantara Sekuritas Indonesia", YP:"Mirae Asset Sekuritas Indonesia",
  YU:"CGS International Sekuritas Indonesia", ZP:"Maybank Sekuritas Indonesia", ZR:"Bumiputera Sekuritas",
  // Kode lama/non-aktif — SPAB sudah dicabut BEI, tapi baris histori lama di
  // broker_summary bisa saja masih memakainya, jadi tetap dipetakan.
  MS:"Morgan Stanley Sekuritas Indonesia (non-aktif)", DB:"Deutsche Sekuritas Indonesia (non-aktif)",
  BW:"BNP Paribas Sekuritas Indonesia (non-aktif)"
};
function brokerFullName(code){
  const c = String(code||"").trim().toUpperCase();
  return BROKER_NAME_MAP[c] || (c ? `Sekuritas ${c}` : "-");
}

// ==========================================
// calcAvgPrice — harga rata-rata per baris broker_summary.
//
// value_idr = total nilai transaksi (Rp), lot = jumlah lot (1 lot = 100
// lembar di BEI). Kolom `avg_price` di tabel broker_summary sebelumnya
// selalu NULL karena tidak ada bagian aplikasi manapun yang menghitung
// & mengirimkannya saat insert — dipakai di 3 titik insert (bulk tarik
// Broker Stalker, form manual "Simpan" di halaman utama & detail;
// tempel CSV juga bermuara ke form manual yang sama jadi otomatis ikut
// terhitung). null kalau lot tidak ada/0 (avg price tidak bisa dihitung).
// ==========================================
function calcAvgPrice(value_idr, lot){
  const v = Number(value_idr), l = Number(lot);
  if(!Number.isFinite(v) || !Number.isFinite(l) || l <= 0) return null;
  return Math.round(v / (l * 100));
}

function escapeHtml(str){
  return String(str ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
}

function getSupaHeaders() {
  return {
    "apikey": SUPABASE_KEY,
    "Authorization": "Bearer " + SUPABASE_KEY,
    "Content-Type": "application/json"
  };
}

// ==========================================
// supaFetch — pengganti fetch() polos untuk semua request TULIS
// (POST/PATCH/DELETE) ke Supabase.
//
// KENAPA INI PERLU: fetch() browser TIDAK melempar error untuk respons
// HTTP 4xx/5xx — hanya melempar kalau koneksi jaringan benar-benar putus.
// Kalau Supabase menolak insert (RLS, kolom salah, atau "Prefer:
// resolution=merge-duplicates" tanpa unique constraint yang cocok di
// tabel), balasannya tetap berupa response yang valid (cuma dengan
// status 400/401/409/dst + body {message,...}). Kode lama membungkus
// fetch dengan try{...}catch(e){} kosong dan TIDAK PERNAH mengecek
// res.ok — jadi kalau Supabase menolak, tidak ada error yang pernah
// muncul: data kelihatan "tersimpan" (karena localStorage sudah lebih
// dulu diupdate) padahal sebenarnya gagal sinkron ke server.
//
// supaFetch melempar Error berisi pesan asli dari Supabase kalau
// res.ok === false, supaya pemanggil bisa menampilkannya ke user lewat
// showError()/alert() alih-alih diam-diam gagal.
// ==========================================
// ==========================================
// LIVE DATA STOCKBIT (tidak resmi, pakai token extension milik user)
//
// PENTING: exodus.stockbit.com/stream/v3/symbol/{ticker} adalah endpoint
// yang diamati dari traffic stockbit.com sendiri (bukan API publik
// terdokumentasi resmi) — jadi bisa berubah/rusak kapan saja, dan skema
// response-nya belum 100% terverifikasi. mapStockbitQuote() di bawah
// mencoba beberapa nama field yang umum (last/close/price, bid/offer,
// volume) secara defensif; kalau tidak cocok, JSON mentah tetap
// ditampilkan apa adanya di UI (lihat renderStockbitPanel) supaya tidak
// ada data yang salah tafsir atau hilang diam-diam.
//
// CORS: karena dipanggil langsung dari browser di origin lain (bukan
// stockbit.com), permintaan LANGSUNG ke exodus.stockbit.com kemungkinan
// besar diblokir browser. Kalau state.stockbitProxyUrl diisi (Supabase
// Edge Function dsb.), request dikirim ke situ sebagai POST {url, token}
// dan proxy itu yang meneruskan ke Stockbit dari sisi server (tidak kena
// CORS) — lihat contoh proxy terpisah yang disediakan.
// ==========================================
// ==========================================
// stockbitRawRequest — satu titik request HTTP ke Stockbit (langsung atau
// lewat proxy), dipakai bersama oleh stockbitFetch, stockbitFetchMarketDetector,
// dan stockbitFetchHistorical. Sebelumnya ketiga fungsi ini menduplikasi logika
// fetch yang sama persis (termasuk tidak ada retry sama sekali untuk 429).
//
// RETRY 429: kalau Stockbit membalas 429 (rate limit) — yang sangat mungkin
// terjadi di tengah bulk fetch banyak ticker/hari — tunggu sesuai header
// "Retry-After" (kalau proxy/Stockbit mengirimnya) atau exponential backoff
// (1s, 2s, 4s) lalu coba lagi, maksimal STOCKBIT_MAX_RETRIES kali. Status
// HTTP lain (401/403/5xx/dst) TIDAK diretry — itu bukan soal rate limit
// sementara, jadi mencoba ulang cuma buang waktu tanpa hasil.
//
// STATUS "TERAKHIR BERHASIL": tiap kali request ini sukses (res.ok), waktunya
// dicatat ke state.stockbitLastSuccessAt supaya UI (lihat
// stockbitLiveDataStatus() & updateStockbitLastSuccessStatusUI()) bisa
// menunjukkan dengan jelas kapan data live terakhir kali benar-benar
// berhasil ditarik, tanpa user perlu buka console untuk tahu data sedang basi.
// ==========================================
const STOCKBIT_MAX_RETRIES = 3;

// Bersihkan whitespace nyasar & prefix "Bearer " yang mungkin kebawa ikut
// tersimpan (baik dari copy-paste manual di Pengaturan, dari tabel Supabase,
// maupun dari extension) — soalnya getSupaHeaders()/stockbitRawRequest() SUDAH
// menambahkan "Bearer " sendiri di depan token saat mengirim request. Kalau
// token yang tersimpan sudah mengandung "Bearer " juga, hasilnya jadi
// "Bearer Bearer eyJ..." (atau ada \n/spasi di ujung) — dan itu 401 instan,
// terus-menerus, TIDAK ADA HUBUNGANNYA dengan token itu sendiri masih
// berlaku/tidak.
function sanitizeStockbitToken(raw){
  let t = String(raw || "").trim();
  if(/^bearer\s+/i.test(t)) t = t.replace(/^bearer\s+/i, "").trim();
  return t;
}

async function stockbitRawRequest(url, extraHeaders = {}, attempt = 0){
  try{
    let res;
    if(state.stockbitProxyUrl){
      res = await fetch(state.stockbitProxyUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, token: state.stockbitToken })
      });
    } else {
      res = await fetch(url, { headers: { "Authorization": `Bearer ${state.stockbitToken}`, ...extraHeaders } });
    }
    if(res.status === 429 && attempt < STOCKBIT_MAX_RETRIES){
      const retryAfterHeader = Number(res.headers.get("Retry-After"));
      const waitMs = Number.isFinite(retryAfterHeader) && retryAfterHeader > 0
        ? retryAfterHeader * 1000
        : 1000 * Math.pow(2, attempt); // 1s, 2s, 4s
      await new Promise(r => setTimeout(r, waitMs));
      return stockbitRawRequest(url, extraHeaders, attempt + 1);
    }
    const text = await res.text();
    let json = null;
    try{ json = JSON.parse(text); }catch(e){ /* bukan JSON, biarkan null */ }
    if(!res.ok){
      const retryNote = (res.status === 429 && attempt >= STOCKBIT_MAX_RETRIES)
        ? ` (sudah dicoba ulang ${STOCKBIT_MAX_RETRIES}x dengan backoff, tetap kena rate limit)` : "";
      // Token bisa diputar oleh Stockbit ketika sesi login diperbarui. Minta
      // token terbaru dari stockbit_session lalu ulangi SATU request ini,
      // agar bulk tidak langsung gagal 401 hanya karena state lokal terlambat.
      if(res.status === 401 && attempt === 0){
        maybeResyncStockbitTokenFromSupabase();
        await new Promise(r => setTimeout(r, 250));
        if(state.stockbitToken) return stockbitRawRequest(url, extraHeaders, 1);
      }
      return { error: `HTTP ${res.status}${json && json.message ? " — " + json.message : ""}${retryNote}`, raw: json ?? text };
    }
    state.stockbitLastSuccessAt = Date.now();
    return { raw: json ?? text };
  }catch(e){
    const hint = state.stockbitProxyUrl ? "" : " — kemungkinan diblokir CORS oleh browser karena dipanggil langsung tanpa Proxy URL. Coba isi \"Proxy URL\" di Pengaturan.";
    return { error: e.message + hint };
  }
}

async function stockbitFetch(endpointTemplate, ticker){
  if(!state.stockbitToken) return { error: 'Token Stockbit belum diisi. Buka "⚙️ Pengaturan" → Live Data Stockbit.' };
  if(!endpointTemplate) return { error: "Endpoint belum diisi di Pengaturan." };
  const url = endpointTemplate.replace("{ticker}", encodeURIComponent(ticker));
  return stockbitRawRequest(url);
}
// ==========================================================
// BROKER SUMMARY OTOMATIS DARI STOCKBIT (top 5 buy/sell per hari bursa)
//
// BEDA dari fitur live quote di atas: ini bisa memicu BANYAK request
// sekaligus (N ticker x M hari), jadi SENGAJA hanya jalan untuk ticker
// yang dicentang manual oleh user (state.selectedForBacktest) — tidak
// ada opsi "semua yang lolos filter" supaya tidak sengaja membombardir
// akun Stockbit sendiri dengan ratusan request.
//
// SKEMA RESPONS BELUM DIKETAHUI: endpoint broker summary Stockbit belum
// diverifikasi (field "Endpoint Broker Summary" di Pengaturan memang
// masih kosong by default, diisi sendiri oleh user dari tab Network).
// mapStockbitBrokerSummary() di bawah ini mencoba beberapa nama field
// yang umum secara defensif. Kalau skemanya tidak cocok, request itu
// ditandai gagal dengan JSON mentah tetap disimpan di
// state.stockbitBrokerBulkResults supaya user bisa lihat & laporkan
// balik nama field yang benar (baru mapping-nya disesuaikan).
// ==========================================================
// Kalender resmi Libur Bursa BEI 2026, dari pengumuman IDX No. Peng-00171/BEI.POP/09-2025
// (idx.co.id/id/berita/jadwal-libur-bursa) + berita yang mengutipnya. 21 tanggal di luar
// weekend, sudah dicocokkan dengan angka resmi "21 hari libur bursa 2026" yang diberitakan.
// PENTING: kalender ini WAJIB diupdate tiap tahun (IDX biasanya umumkan kalender tahun
// berikutnya sekitar September) — kalau BURSA_HOLIDAYS tidak ada entri untuk suatu tahun,
// tradingDaysBack() otomatis fallback ke exclude-weekend-saja untuk tahun itu (lihat di bawah).
const BURSA_HOLIDAYS = new Set([
  // 2026
  "2026-01-01", // Tahun Baru Masehi
  "2026-01-16", // Isra Mikraj Nabi Muhammad SAW
  "2026-02-16", // Cuti Bersama Tahun Baru Imlek 2577 Kongzili
  "2026-02-17", // Tahun Baru Imlek 2577 Kongzili
  "2026-03-18", // Cuti Bersama Hari Suci Nyepi
  "2026-03-19", // Hari Suci Nyepi Tahun Baru Saka 1948
  "2026-03-20", // Cuti Bersama Idul Fitri 1447 H
  "2026-03-23", // Cuti Bersama Idul Fitri 1447 H
  "2026-03-24", // Cuti Bersama Idul Fitri 1447 H
  "2026-04-03", // Wafat Yesus Kristus (Jumat Agung)
  "2026-05-01", // Hari Buruh Internasional
  "2026-05-14", // Kenaikan Yesus Kristus
  "2026-05-27", // Idul Adha 1447 H
  "2026-05-28", // Cuti Bersama Idul Adha 1447 H
  "2026-06-01", // Hari Lahir Pancasila
  "2026-06-16", // Tahun Baru Islam 1448 H (1 Muharram)
  "2026-08-17", // Hari Kemerdekaan RI ke-81
  "2026-08-25", // Maulid Nabi Muhammad SAW
  "2026-12-24", // Cuti Bersama Hari Raya Natal
  "2026-12-25", // Hari Raya Natal
  "2026-12-31", // Libur Bursa (penutup tahun)
]);

// Selalu pakai komponen tanggal LOKAL (getFullYear/getMonth/getDate), JANGAN
// toISOString() untuk merepresentasikan "tanggal kalender" — toISOString()
// mengonversi ke UTC, dan karena WIB = UTC+7, tengah malam lokal (mis. dari
// input <input type="date">, yang selalu diparse sebagai "T00:00:00" lokal)
// mundur jadi jam 17:00 UTC HARI SEBELUMNYA, sehingga tanggalnya salah (bug
// ini yang bikin rentang "28/08–29/08" kepetakan jadi 27/08). Semua tempat
// yang butuh "tanggal hari ini"/"tanggal dari Date object" WAJIB pakai
// helper ini, bukan .toISOString().slice(0,10).
function toLocalISODate(d){
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function todayLocalISO(){ return toLocalISODate(new Date()); }

function tradingDaysBack(n, fromDate = new Date()){
  // Hari bursa = Senin-Jumat DIKURANGI tanggal di BURSA_HOLIDAYS (kalau tahunnya terdaftar).
  // Untuk tahun yang belum ada di kalender di atas, otomatis fallback ke exclude-weekend-saja
  // (perilaku lama) — lebih baik sedikit kurang akurat daripada berhenti total.
  const days = [];
  let d = new Date(fromDate);
  while(days.length < n){
    d.setDate(d.getDate() - 1);
    const dow = d.getDay();
    const iso = toLocalISODate(d);
    if(dow !== 0 && dow !== 6 && !BURSA_HOLIDAYS.has(iso)) days.push(iso);
  }
  return days.reverse(); // urut lama -> baru
}

// Sama seperti tradingDaysBack, tapi rentangnya ditentukan lewat tanggal Dari–Sampai
// eksplisit (bukan "mundur N hari dari sekarang") — dipakai untuk Periode Tarik Otomatis
// yang sekarang bisa dipilih bebas lewat 2 input tanggal di UI.
function tradingDaysInRange(fromDateStr, toDateStr){
  const days = [];
  if(!fromDateStr || !toDateStr) return days;
  let d = new Date(fromDateStr + "T00:00:00");
  const end = new Date(toDateStr + "T00:00:00");
  if(d > end) return days; // Dari lebih baru dari Sampai — dianggap tidak valid, biar kelihatan kosong
  while(d <= end){
    const dow = d.getDay();
    const iso = toLocalISODate(d);
    if(dow !== 0 && dow !== 6 && !BURSA_HOLIDAYS.has(iso)) days.push(iso);
    d.setDate(d.getDate() + 1);
  }
  return days; // sudah urut lama -> baru
}

async function stockbitFetchMarketDetector(ticker, fromDate, toDate, days){
  if(!state.stockbitToken) return { error: 'Token Stockbit belum diisi. Buka "⚙️ Pengaturan" → Live Data Stockbit.' };
  if(!state.stockbitBrokerEndpoint) return { error: 'Endpoint Broker Summary belum diisi di Pengaturan.' };
  // Dipanggil SATU tanggal per request (STOCKBIT_BROKER_CHUNK_DAYS=1, lihat
  // catatan di dekat konstanta itu) — fromDate selalu == toDate di titik ini,
  // jadi aman dipakai untuk mengisi SEMUA placeholder {date} di URL sekaligus
  // (endpoint /marketdetectors butuh {date} DUA KALI, untuk from= dan to=).
  // PENTING: pakai replaceAll, bukan replace() — replace() dengan argumen
  // string cuma mengganti kemunculan PERTAMA, jadi kalau template-nya punya
  // {date} lebih dari sekali (mis. "from={date}&to={date}"), yang kedua akan
  // tertinggal literal "{date}" di URL dan request-nya gagal/salah tanggal.
  const url = state.stockbitBrokerEndpoint
    .replaceAll("{ticker}", encodeURIComponent(ticker))
    .replaceAll("{date}", fromDate);

  return stockbitRawRequest(url);
}

// Endpoint /order-trade/broker/distribution mengembalikan broker distribution
// untuk SATU tanggal ({date} di URL) — bukan rentang.
//
// SKEMA LAMA (diverifikasi manual dari DevTools 25 Agu 2026): data.brokers_buy /
// data.brokers_sell (alias kemungkinan buy/sell), tiap barisnya berisi broker
// FLAT + lot/value (alias blot/bval untuk buy, slot/sval untuk sell).
//
// SKEMA BARU (ketahuan berubah 08 Sep 2026 — endpoint sama, bentuk beda,
// balikan "message":"Successfully loaded Broker Distribution data"):
// data.by_value.top_broker_buy / data.by_value.top_broker_sell (kemungkinan
// juga ada data.by_volume.* paralel, dipakai sebagai fallback kalau by_value
// tidak ada). Tiap barisnya BUKAN flat lagi, tapi
// { detail:{code,type,amount}, distribute_to:[{code,type,amount},...] } —
// "detail" adalah broker top buy/sell itu sendiri (code+amount total),
// "distribute_to" adalah breakdown lawan transaksinya (di luar cakupan tabel
// Top 5 Buy/Sell yang dipakai app ini, jadi tidak diambil). Parser di bawah
// coba skema baru dulu, baru fallback ke skema lama — kalau Stockbit ganti
// skema lagi di masa depan, tambahkan cabang/alias baru di sini.
function pickAny(obj, keys){
  for(const k of keys){ if(obj?.[k] != null && obj[k] !== "") return obj[k]; }
  return null;
}

function parseStockbitMarketDetector(raw, fetchDate){
  if(!raw || typeof raw !== "object") return null;
  // Stockbit kadang membungkus payload beberapa tingkat (data.data,
  // data.result, result.data), jadi cari objek yang benar-benar memiliki
  // array distribution secara rekursif dangkal.
  let candidates = [raw, raw.data, raw.result, raw.data?.data, raw.data?.result, raw.result?.data, raw.result?.result].filter(v => v && typeof v === "object");
  // Endpoint /marketdetectors (beda dari /order-trade/broker/distribution)
  // membungkus SATU level lagi di ".broker_summary" — mis.
  // raw.data.broker_summary.{brokers_buy,brokers_sell} — yang tidak
  // tercakup kandidat di atas, jadi tanpa ini parser tidak pernah menemukan
  // baris broker sama sekali untuk skema ini (bukan cuma lot/type null,
  // TAPI seluruh baris gagal terbaca). Tambahkan varian ".broker_summary"
  // dari tiap kandidat yang sudah ada.
  candidates = candidates.concat(candidates.map(c => c.broker_summary).filter(v => v && typeof v === "object"));

  // --- Coba skema baru (by_value/by_volume.top_broker_buy/sell) dulu ---
  // PENTING: by_value (nilai transaksi) dan by_volume (jumlah lot) adalah DUA
  // cabang TERPISAH yang bisa muncul BERSAMAAN di payload yang sama — bukan
  // alternatif satu-atau-yang-lain. UI Stockbit sendiri menampilkan B.val DAN
  // B.lot sekaligus untuk broker yang sama, jadi kalau keduanya ada, keduanya
  // harus dibaca lalu digabung per kode broker (value dari by_value, lot dari
  // by_volume). Sebelumnya kode ini pakai `v.by_value || v.by_volume` yang
  // salah — begitu by_value ketemu, by_volume tidak pernah disentuh sama
  // sekali, sehingga lot selalu null walau datanya sebenarnya ada di
  // by_volume.
  const candidateWithByValOrVol = candidates.find(v => v && typeof v === "object" && ((v.by_value && (Array.isArray(v.by_value.top_broker_buy) || Array.isArray(v.by_value.top_broker_sell))) || (v.by_volume && (Array.isArray(v.by_volume.top_broker_buy) || Array.isArray(v.by_volume.top_broker_sell)))));
  if(candidateWithByValOrVol){
    const byValue = candidateWithByValOrVol.by_value;
    const byVolume = candidateWithByValOrVol.by_volume;
    // Tiap item { detail:{code,type,amount}, distribute_to:[...] } → ambil "detail"-nya
    // saja sebagai baris top-broker (code+amount), abaikan distribute_to.
    const flatten = (rows) => (rows || [])
      .map(r => (r && typeof r === "object") ? (r.detail && typeof r.detail === "object" ? r.detail : r) : null)
      .filter(Boolean);
    // Gabungkan baris value + volume per kode broker jadi satu baris
    // { broker_code, value_idr, lot }. Kalau salah satu cabang tidak ada,
    // tetap jalan dengan yang tersedia (value atau lot saja).
    const mergeByCode = (valueRows, volumeRows) => {
      const byCode = {};
      const codeOf = (r) => String(pickAny(r, ["code","broker_code","broker","brokerCode"]) ?? "").toUpperCase();
      (valueRows || []).forEach(r => {
        const code = codeOf(r); if(!code) return;
        (byCode[code] ||= { broker_code: code }).value_idr = Number(pickAny(r, ["amount","value","value_idr"])) || 0;
      });
      (volumeRows || []).forEach(r => {
        const code = codeOf(r); if(!code) return;
        (byCode[code] ||= { broker_code: code }).lot = Number(pickAny(r, ["amount","lot","volume","qty"])) || null;
      });
      return Object.values(byCode);
    };
    const buyRows = mergeByCode(flatten(byValue?.top_broker_buy), flatten(byVolume?.top_broker_buy));
    const sellRows = mergeByCode(flatten(byValue?.top_broker_sell), flatten(byVolume?.top_broker_sell));
    return buildBrokerByDate(buyRows, sellRows, fetchDate);
  }

  // --- Fallback skema lama (flat brokers_buy/brokers_sell dst.) ---
  const bs = candidates.find(v => ["brokers_buy","brokers_sell","buy","sell","buy_rows","sell_rows","distribution_buy","distribution_sell"].some(k => Array.isArray(v[k]))) || raw;
  const buyRows = ["brokers_buy", "buy", "buy_rows", "distribution_buy", "buy_data", "buyer", "buyers"]
    .map(k => (Array.isArray(bs[k]) ? bs[k] : null)).find(Boolean) || [];
  const sellRows = ["brokers_sell", "sell", "sell_rows", "distribution_sell", "sell_data", "seller", "sellers"]
    .map(k => (Array.isArray(bs[k]) ? bs[k] : null)).find(Boolean) || [];
  if(!buyRows.length && !sellRows.length) return null;
  return buildBrokerByDate(buyRows, sellRows, fetchDate);
}

// Diambil keluar dari parseStockbitMarketDetector supaya bisa dipakai baik
// oleh cabang skema baru (by_value.top_broker_buy/sell) maupun skema lama
// (brokers_buy/brokers_sell) tanpa duplikasi logika pick/sort/top-5.
function buildBrokerByDate(buyRows, sellRows, fetchDate){
  const byDate = {};
  const ensure = (date) => (byDate[date] ||= { buy: [], sell: [] });
  const dateStr = fetchDate || todayLocalISO();
  const pick = (r, keys) => { for(const k of keys){ if(r?.[k] != null && r[k] !== "") return r[k]; } return null; };
  const mapRows = (rows, side) => rows.forEach(r => {
    // "netbs_broker_code" adalah nama field kode broker di skema
    // /marketdetectors (brokers_buy/brokers_sell) — beda dari skema
    // /order-trade/broker/distribution yang pakai "broker"/"broker_code" polos.
    const broker = pick(r, ["broker","broker_code","brokerCode","broker_id","brokerId","code","broker_name","netbs_broker_code"]);
    // Math.abs() karena skema /marketdetectors mengirim lot & value SISI JUAL
    // dengan tanda negatif (mis. slot:"-387452", sval:"-2.44e+11") — tanda
    // minusnya cuma penanda arah (jual), bukan nilai riil yang mau ditampilkan.
    const lot = Math.abs(Number(pick(r, side === "buy" ? ["lot","blot","buy_lot","quantity","qty"] : ["lot","slot","sell_lot","quantity","qty"]))) || null;
    const value = Math.abs(Number(pick(r, side === "buy" ? ["value","bval","buy_value","value_idr","net_value","amount"] : ["value","sval","sell_value","value_idr","net_value","amount"]))) || 0;
    // Tipe investor per broker (Asing/Lokal/Pemerintah) — field "type" di
    // skema /marketdetectors. Disimpan apa adanya (string dari Stockbit),
    // null kalau memang tidak ada di skema yang sedang dibaca.
    const investorType = pick(r, ["type", "investor_type", "investorType"]);
    if(broker != null) ensure(dateStr)[side].push({ broker_code:String(broker).toUpperCase(), lot, value_idr:value, investor_type: investorType || null });
  });
  mapRows(buyRows, "buy"); mapRows(sellRows, "sell");
  Object.values(byDate).forEach(d => {
    d.buy.sort((a,b) => b.value_idr - a.value_idr);
    d.sell.sort((a,b) => b.value_idr - a.value_idr);
    d.buy = d.buy.slice(0,5).map((r,i) => ({...r, rank:i+1}));
    d.sell = d.sell.slice(0,5).map((r,i) => ({...r, rank:i+1}));
  });
  return byDate;
}

// ==========================================
// HISTORICAL DATA STOCKBIT (tabel Date/Close/Change/Value/Volume di tab
// "Historical Data" halaman detail saham — Daily/Weekly/Monthly).
// Endpoint belum diverifikasi (lihat catatan di STOCKBIT_DEFAULT_HISTORICAL_EP),
// jadi parseStockbitHistorical() di bawah mencoba banyak kemungkinan nama
// field secara defensif (mirip mapStockbitQuote) — kalau skema Stockbit
// ternyata beda, tinggal tambah alias nama field baru di pick(...) masing2
// kolom, tidak perlu ubah struktur lain.
// ==========================================
async function stockbitFetchHistorical(ticker, period, opts = {}){
  if(!state.stockbitToken) return { error: 'Token Stockbit belum diisi. Buka "⚙️ Pengaturan" → Live Data Stockbit.' };
  if(!state.stockbitHistoricalEndpoint) return { error: 'Endpoint Historical Data belum diisi di Pengaturan. Ambil dari DevTools → Network saat membuka tab "Historical Data" di stockbit.com (lihat komentar STOCKBIT_DEFAULT_HISTORICAL_EP di app.js untuk caranya).' };
  // startDate/endDate: ISO YYYY-MM-DD. Default kalau tidak dikasih: 1 tahun
  // terakhir sampai hari ini (cukup luas untuk isi awal chart/backtest).
  const endDate = opts.endDate || todayLocalISO();
  const startDate = opts.startDate || toLocalISODate(new Date(new Date(endDate).setFullYear(new Date(endDate).getFullYear() - 1)));
  const limit = opts.limit || 300;
  const page = opts.page || 1;
  const url = state.stockbitHistoricalEndpoint
    .replace("{ticker}", encodeURIComponent(ticker))
    .replace("{period}", encodeURIComponent(stockbitHistoricalPeriodParam(period)))
    .replace("{start_date}", encodeURIComponent(startDate))
    .replace("{end_date}", encodeURIComponent(endDate))
    .replace("{limit}", encodeURIComponent(limit))
    .replace("{page}", encodeURIComponent(page));
  return stockbitRawRequest(url, { "x-platform": "web" });
}

// Menerima response mentah dan mencoba menormalkannya jadi daftar baris
// { date, close, change, changePct, value, volume }. Mengembalikan null
// kalau tidak ditemukan array baris sama sekali (supaya UI bisa menampilkan
// JSON mentah apa adanya alih-alih data yang salah tafsir/hilang diam-diam).
function parseStockbitHistorical(raw){
  if(!raw || typeof raw !== "object") return null;
  const container = raw.data || raw.result || raw;
  const list = Array.isArray(container) ? container
    : Array.isArray(container?.result) ? container.result   // bentuk asli: { data: { result: [...] } }
    : Array.isArray(container?.rows) ? container.rows
    : Array.isArray(container?.chartbit) ? container.chartbit
    : Array.isArray(container?.data) ? container.data
    : Array.isArray(container?.historical) ? container.historical
    : null;
  if(!list || !list.length) return null;

  const pick = (row, ...keys) => { for(const k of keys){ if(row && row[k]!=null && row[k]!=="") return row[k]; } return null; };
  // Normalisasi berbagai kemungkinan format tanggal Stockbit (epoch ms/detik,
  // "20260828", "28-08-2026", dll.) jadi ISO YYYY-MM-DD lokal, supaya bisa
  // dibandingkan langsung dengan hasil tradingDaysInRange() saat Tarik Otomatis
  // bulk. Kalau gagal diparse, dikembalikan apa adanya (masih tampil di tabel,
  // cuma tidak akan ikut cocok di filter rentang tanggal bulk).
  const normDate = (v) => {
    if(v == null) return null;
    if(typeof v === "number") return toLocalISODate(new Date(v > 2e10 ? v : v * 1000));
    const s = String(v).trim();
    if(/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0,10);
    if(/^\d{8}$/.test(s)) return `${s.slice(0,4)}-${s.slice(4,6)}-${s.slice(6,8)}`;
    const m = s.match(/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/);
    if(m) return `${m[3]}-${m[2].padStart(2,"0")}-${m[1].padStart(2,"0")}`;
    const parsed = new Date(s);
    return isNaN(parsed) ? s : toLocalISODate(parsed);
  };

  return list.map(row => ({
    date: normDate(pick(row, "date", "trade_date", "netbs_date", "period", "chart_date")),
    close: Number(pick(row, "close", "close_price", "last", "c")) || null,
    change: Number(pick(row, "change", "chg", "price_change")) || null,
    changePct: Number(pick(row, "change_percentage", "change_percent", "changePercent", "pct")) || null,
    value: Number(pick(row, "value", "value_idr", "val", "trade_value")) || null,
    volume: Number(pick(row, "volume", "vol", "trade_volume")) || null,
    // Field bonus yang ternyata sudah disediakan endpoint ini sekalian —
    // termasuk FOREIGN FLOW HARIAN per ticker (foreign_buy/foreign_sell/
    // net_foreign), jadi tidak perlu endpoint marketdetectors terpisah untuk
    // data asing (lihat diskusi "Data foreign bisa diambil dari stockbit?").
    open: Number(pick(row, "open")) || null,
    high: Number(pick(row, "high")) || null,
    low: Number(pick(row, "low")) || null,
    frequency: Number(pick(row, "frequency")) || null,
    foreignBuy: Number(pick(row, "foreign_buy")) || null,
    foreignSell: Number(pick(row, "foreign_sell")) || null,
    netForeign: pick(row, "net_foreign") != null ? Number(pick(row, "net_foreign")) : null,
  })).filter(r => r.date);
}

// Endpoint /marketdetectors membatasi TOTAL baris gabungan lewat "limit" —
// tapi dari pengujian lapangan (25 Agu 2026), ada masalah yang LEBIH
// MENDASAR: endpoint ini kelihatannya TIDAK benar-benar mendukung rentang
// from–to. Waktu dicoba pecah jadi beberapa chunk beberapa hari (mis. 4
// hari per request), hasilnya PERSIS 1 hari data per chunk — cocok dengan
// pola "cuma mengembalikan data untuk tanggal `to`, mengabaikan `from`".
// Jadi satu-satunya cara yang terbukti dapat semua hari adalah: minta
// SATU hari per request (from = to = tanggal itu), bukan rentang.
// Ini artinya jumlah request ke Stockbit jadi = jumlah hari yang diminta
// (bukan lagi dibagi jadi beberapa chunk besar) — lebih banyak request,
// tapi ini yang terbukti benar-benar mengembalikan datanya.
const STOCKBIT_BROKER_CHUNK_DAYS = 1; // JANGAN naikkan kecuali endpoint terbukti mendukung rentang beneran — lihat catatan di atas

function chunkArray(arr, size){
  const out = [];
  for(let i=0; i<arr.length; i+=size) out.push(arr.slice(i, i+size));
  return out;
}

// Cek tanggal mana saja (dari kandidat `dates`) yang SUDAH ada baris
// broker_summary-nya di Supabase untuk ticker ini, supaya tidak perlu
// tarik ulang ke Stockbit untuk hari yang datanya sudah tersimpan.
async function fetchExistingBrokerDates(ticker, dates){
  if(!dates.length) return new Set();
  try{
    const qs = new URLSearchParams({
      stock_code: `eq.${ticker}`,
      trade_date: `in.(${dates.join(",")})`,
      select: "trade_date",
    });
    const res = await fetch(`${SUPABASE_URL}/broker_summary?${qs}`, { headers: getSupaHeaders(), cache: "no-store" });
    if(!res.ok) return new Set(); // gagal cek = anggap belum ada, biar tetap ditarik (aman, cuma jadi tidak optimal)
    const rows = await res.json();
    return new Set(rows.map(r => r.trade_date));
  }catch(e){
    return new Set();
  }
}

// Parse isi file .txt daftar ticker -- terima format bebas: satu ticker per
// baris, dipisah koma, titik-koma, atau spasi/tab, boleh campur. Kode saham
// IDX selalu huruf (kadang diikuti 1 digit untuk saham seri tertentu, mis.
// preferen), jadi validasinya longgar: 2-6 karakter alfanumerik, disaring
// dari baris komentar (diawali # atau //) supaya orang bisa kasih catatan di
// file-nya sendiri. Duplikat dibuang, urutan asli file dipertahankan.
function parseTickerListTxt(text){
  const seen = new Set();
  const out = [];
  String(text || "")
    .split(/[\r\n,;\t ]+/)
    .map(t => t.trim().toUpperCase())
    .filter(t => t && !t.startsWith("#") && !t.startsWith("//"))
    .filter(t => /^[A-Z0-9]{2,6}$/.test(t))
    .forEach(t => { if(!seen.has(t)){ seen.add(t); out.push(t); } });
  return out;
}

// Sumber ticker bersama untuk tombol-tombol bulk (Live Stockbit, Broker
// Summary, Historical Data): kalau ada daftar hasil upload .txt, itu yang
// dipakai (prioritas tertinggi, karena ini pilihan eksplisit paling
// spesifik) -- kalau tidak, fallback ke perilaku lama: baris yang dicentang
// di tabel Screener, atau kalau tidak ada yang dicentang, semua saham yang
// lolos filter saat ini.
function resolveBulkTickers(){
  if(state.uploadedBulkTickers.length) return [...state.uploadedBulkTickers];
  const checked = [...state.selectedForBacktest];
  return checked.length ? checked : getSorted(getFiltered()).map(s => s.ticker);
}

async function fetchAndSaveBrokerSummaryBulk(tickers, rangeFrom, rangeTo){
  if(state.stockbitBrokerBulkLoading) return;
  if(!tickers || !tickers.length){
    state.stockbitBrokerBulkResults = [{ ticker:"-", date:"-", ok:false, msg:"Centang minimal 1 saham di tab Screener dulu." }];
    render(); return;
  }
  if(!state.stockbitToken){ openSettings(); return; }
  if(!state.stockbitBrokerEndpoint){
    state.stockbitBrokerBulkResults = [{ ticker:"-", date:"-", ok:false, msg:'Isi dulu "Endpoint Broker Summary" di ⚙️ Pengaturan.' }];
    render(); return;
  }
  if(!SUPABASE_URL || !SUPABASE_KEY){ openSettings(); return; }

  const tradingDates = tradingDaysInRange(rangeFrom, rangeTo); // urut lama -> baru
  if(!tradingDates.length){
    state.stockbitBrokerBulkResults = [{ ticker:"-", date:"-", ok:false, msg:'Periode tanggal tidak valid atau tidak ada hari bursa di rentang itu — cek lagi tanggal "Dari" dan "Sampai".' }];
    render(); return;
  }
  const fromDate = tradingDates[0];
  const toDate = tradingDates[tradingDates.length - 1];
  const latestDate = toDate; // hari bursa paling baru dalam periode ini — SELALU ditarik ulang, lihat catatan di bawah

  state.stockbitBrokerBulkLoading = true;
  state.stockbitBrokerBulkProgress = { done: 0, total: tickers.length }; // progress tetap dihitung per SAHAM (tiap saham di dalamnya bisa beberapa request kecil)
  state.stockbitBrokerBulkResults = [];
  render();

  for(const ticker of tickers){
    // Skip hari yang datanya SUDAH ada di database (broker summary hari yang
    // sudah lewat itu final, tidak berubah lagi) — kecuali hari bursa paling
    // baru dalam periode ini, yang tetap ditarik ulang tiap kali karena
    // kemungkinan datanya masih berjalan/belum final saat sesi bursa berlangsung.
    const existingDates = await fetchExistingBrokerDates(ticker, tradingDates);
    const datesToFetch = tradingDates.filter(d => !existingDates.has(d) || d === latestDate);
    const skippedCount = tradingDates.length - datesToFetch.length;

    if(!datesToFetch.length){
      state.stockbitBrokerBulkResults.push({ ticker, date: `${fromDate}..${toDate}`, ok:true, msg: `Semua ${tradingDates.length} hari sudah ada di database, dilewati (tidak ada request ke Stockbit).` });
      state.stockbitBrokerBulkProgress.done++;
      render();
      continue; // tidak perlu jeda 350ms karena tidak ada request Stockbit sama sekali
    }

    // Ambil tiap potongan tanggal (yang belum ada) secara berurutan lalu
    // gabungkan byDate-nya, supaya satu request yang gagal/kepotong tidak
    // menghilangkan potongan lain.
    const dateChunks = chunkArray(datesToFetch, STOCKBIT_BROKER_CHUNK_DAYS); // pecah jadi beberapa request kecil, lihat catatan di atas
    let byDate = {};
    let lastError = null;
    let anyOk = false;
    for(const chunk of dateChunks){
      const chunkFrom = chunk[0], chunkTo = chunk[chunk.length - 1];
      const res = await stockbitFetchMarketDetector(ticker, chunkFrom, chunkTo, chunk.length);
      if(res.error){
        lastError = res.error;
      } else {
        const parsed = parseStockbitMarketDetector(res.raw, chunkFrom);
        if(parsed && Object.keys(parsed).length){
          Object.assign(byDate, parsed);
          anyOk = true;
        } else {
          // Endpoint menjawab 200 tetapi bentuk JSON berubah/tidak sesuai
          // parser. Simpan preview raw supaya diagnosis bisa dilakukan tanpa
          // menebak-nebak nama field dan jangan tampilkan pesan generik saja.
          try{
            const rawPreview = JSON.stringify(res.raw).slice(0, 1600);
            lastError = `Skema respons tidak dikenali. Raw JSON: ${rawPreview}`;
          }catch(e){ lastError = "Skema respons tidak dikenali / raw JSON tidak bisa dibaca."; }
        }
      }
      if(dateChunks.length > 1) await new Promise(r => setTimeout(r, 300)); // jeda antar-potongan tanggal, jaga rate limit
    }

    if(!anyOk){
      state.stockbitBrokerBulkResults.push({ ticker, date: `${fromDate}..${toDate}`, ok:false, msg: lastError || "Skema respons tidak dikenali / tidak ada data (cek raw JSON manual dulu)." });
    } else {
        const rows = [];
        datesToFetch.forEach(d => {
          const dd = byDate[d];
          if(!dd) return;
          dd.buy.forEach(r => rows.push({ stock_code:ticker, trade_date:d, side:"buy", rank:r.rank, broker_code:r.broker_code, lot:r.lot, value_idr:r.value_idr, avg_price:calcAvgPrice(r.value_idr, r.lot), investor_type:r.investor_type ?? null }));
          dd.sell.forEach(r => rows.push({ stock_code:ticker, trade_date:d, side:"sell", rank:r.rank, broker_code:r.broker_code, lot:r.lot, value_idr:r.value_idr, avg_price:calcAvgPrice(r.value_idr, r.lot), investor_type:r.investor_type ?? null }));
        });
        // "Hilang" di sini = hari yang sebelumnya belum ada di DB DAN gagal ditarik sekarang —
        // hari yang sudah ada di DB (di-skip) tidak dianggap hilang.
        const missingDates = datesToFetch.filter(d => !byDate[d]);
        if(!rows.length){
          state.stockbitBrokerBulkResults.push({ ticker, date: `${fromDate}..${toDate}`, ok:false, msg: "Tidak ada baris broker valid di respons ini." });
        } else {
          try{
            await supaFetch(`${SUPABASE_URL}/broker_summary?on_conflict=stock_code,trade_date,side,rank`, {
              method: "POST",
              headers: { ...getSupaHeaders(), "Prefer": "resolution=merge-duplicates,return=minimal" },
              body: JSON.stringify(rows)
            });
            let msg = `Tersimpan ${rows.length} baris untuk ${Object.keys(byDate).length}/${datesToFetch.length} hari yang ditarik.`;
            if(skippedCount) msg += ` (${skippedCount} hari lain dilewati, sudah ada di database.)`;
            // Sekarang tiap request cuma mencakup STOCKBIT_BROKER_CHUNK_DAYS hari
            // (lihat catatan di atas fetchAndSaveBrokerSummaryBulk), jadi kalau
            // masih ada hari kosong itu BUKAN lagi soal "limit" di URL — lebih
            // mungkin memang hari libur bursa, atau salah satu request chunk gagal.
            if(missingDates.length) msg += ` ⚠️ ${missingDates.length} hari tidak ada data: ${missingDates.join(", ")} (cek dulu apakah tanggal itu ada di BURSA_HOLIDAYS di app.js — kalau BUKAN hari libur bursa dan STOCKBIT_BROKER_CHUNK_DAYS sudah 1, kemungkinan besar Stockbit memang tidak punya data broker net untuk saham ini di hari itu, mis. saham tidak likuid / tidak ada transaksi signifikan)`;
            state.stockbitBrokerBulkResults.push({ ticker, date: `${fromDate}..${toDate}`, ok:true, msg });
          }catch(e){
            state.stockbitBrokerBulkResults.push({ ticker, date: `${fromDate}..${toDate}`, ok:false, msg: "Gagal simpan ke DB: " + e.message });
          }
        }
      }
    state.stockbitBrokerBulkProgress.done++;
    render();
    await new Promise(r => setTimeout(r, 350)); // tetap jaga jeda antar-SAHAM (bukan antar-hari lagi)
  }

  state.stockbitBrokerBulkLoading = false;
  render();
  if(state.bsStockCode && state.bsDate) loadBrokerSummary();
}

function mapStockbitQuote(raw){
  if(!raw || typeof raw !== "object") return null;
  const d = raw.data || raw.result || raw;
  const pick = (...keys) => { for(const k of keys){ if(d && d[k]!=null && d[k]!=="") return d[k]; } return null; };
  return {
    last: pick("last","close","price","c"),
    open: pick("open","open_price","previous_open","o"),
    high: pick("high","high_price","h"),
    low: pick("low","low_price","l"),
    prevClose: pick("previous","prev_close","previousClose","yesterday_price","prevclose"),
    change: pick("change","chg"),
    changePct: pick("change_percent","changePercent","percentage_change","pct"),
    bid: pick("bid","best_bid","bid_price"),
    offer: pick("offer","ask","best_offer","offer_price"),
    volume: pick("volume","vol"),
    frequency: pick("frequency","freq"),
    time: pick("timestamp","time","updated_at","last_update"),
  };
}
// ==========================================================
// AUTO-SYNC TOKEN dari tabel `stockbit_session` (diisi oleh extension
// Chrome stockbit-token-extension via sql/05_stockbit_token_sync.sql).
// Kalau tabelnya belum dibuat (migration SQL belum dijalankan), fetch ini
// gagal diam-diam — fitur live Stockbit tetap jalan dengan token manual.
// ==========================================================
// Throttle + util usia token untuk auto-resync (lihat syncStockbitTokenFromSupabase).
let lastStockbitAutoResyncAt = 0;
function tokenSyncedAtMs(){
  const v = state.stockbitTokenSyncedAt;
  if(v == null) return 0;
  if(typeof v === "number") return v;
  const parsed = Date.parse(v);
  return isNaN(parsed) ? 0 : parsed;
}
// Dipanggil otomatis saat request Stockbit kena 401 (token ditolak) —
// di-throttle 10 detik supaya bulk fetch yang gagal ratusan kali tidak
// membanjiri Supabase dengan request sync.
function maybeResyncStockbitTokenFromSupabase(){
  const now = Date.now();
  if(now - lastStockbitAutoResyncAt < 10000) return;
  lastStockbitAutoResyncAt = now;
  syncStockbitTokenFromSupabase();
}

async function syncStockbitTokenFromSupabase(){
  if(!SUPABASE_URL || !SUPABASE_KEY) return false;
  try{
    const res = await fetch(`${SUPABASE_URL}/stockbit_session?id=eq.1&select=token,expires_at,updated_at`, { headers: getSupaHeaders(), cache: "no-store" });
    if(!res.ok) return false;
    const rows = await res.json();
    const row = Array.isArray(rows) ? rows[0] : null;
    if(row && row.token){
      const newTok = sanitizeStockbitToken(row.token);
      if(!newTok) return false;
      // Token yang baru ditulis extension ke Supabase harus menjadi sumber
      // kebenaran, termasuk ketika token lokal sebelumnya bertanda extension.
      // Jangan memakai freshness gate berbasis waktu lokal: timestamp browser
      // dan timestamp server bisa berbeda beberapa detik.
      if(newTok === state.stockbitToken) return false;
      state.stockbitToken = newTok;
      state.stockbitTokenExpiresAt = row.expires_at || null;
      state.stockbitTokenSyncedAt = row.updated_at || Date.now();
      state.stockbitTokenSource = "auto";
      try{
        localStorage.setItem(LS_STOCKBIT_TOKEN, newTok);
        localStorage.setItem(LS_STOCKBIT_TOKEN_SOURCE, "auto");
      }catch(e){}
      updateStockbitTokenStatusUI();
      return true;
    }
  }catch(e){ /* tabel belum ada / offline — biarkan token manual yang dipakai */ }
  return false;
}

// ==========================================================
// AUTO-PICKUP TOKEN dari extension Chrome "WS Interceptor"
// (background.js + content_screener.js) — jalur INI TERPISAH TOTAL dari
// syncStockbitTokenFromSupabase() di atas. Extension itu menangkap header
// Authorization langsung dari request stockbit.com lalu menulisnya ke
// localStorage['ihsg_stockbit_token'] di tab aplikasi ini (lewat
// chrome.storage.local -> content_screener.js) — TIDAK PERNAH menyentuh
// tabel Supabase `stockbit_session`. Jadi badge "Auto-sync dari extension"
// yang sebelumnya cuma bersumber dari Supabase itu SAMA SEKALI TIDAK
// MEREFLEKSIKAN token yang ditulis extension ini.
//
// KENAPA HARUS DI-POLL (bukan cukup addEventListener('storage', ...)):
// event `storage` browser HANYA terpicu di tab/dokumen LAIN yang beda dari
// yang melakukan penulisan — dan content_screener.js menulis ke
// localStorage di DALAM tab aplikasi ini sendiri (document yang sama,
// cuma beda isolated world JS). Jadi event storage TIDAK PERNAH nyala di
// sini walau extension berhasil menulis token baru. Satu-satunya cara
// yang reliable untuk pick up perubahan itu tanpa reload manual adalah
// baca ulang localStorage secara berkala dan bandingkan.
//
// Kalau token yang ditemukan beda dari yang sedang dipakai, expires_at
// lama (kalau ada, dari sync Supabase sebelumnya) DIBUANG — itu milik
// token yang BEDA, jadi countdown lama yang ditampilkan ke user tidak lagi
// relevan/menyesatkan untuk token baru ini.
// ==========================================================
function pollExtensionStockbitToken(){
  let raw;
  try{ raw = localStorage.getItem(LS_STOCKBIT_TOKEN); }catch(e){ return; }
  const clean = sanitizeStockbitToken(raw);
  if(!clean || clean === state.stockbitToken) return;
  applyExtensionStockbitToken(clean, null);
}

function applyExtensionStockbitToken(token, expiresAt){
  const clean = sanitizeStockbitToken(token);
  if(!clean) return;
  state.stockbitToken = clean;
  state.stockbitTokenSource = "extension";
  state.stockbitTokenSyncedAt = Date.now();
  state.stockbitTokenExpiresAt = expiresAt || null;
  try{
    localStorage.setItem(LS_STOCKBIT_TOKEN, clean);
    localStorage.setItem(LS_STOCKBIT_TOKEN_SOURCE, "extension");
    localStorage.setItem(LS_STOCKBIT_TOKEN_SYNCED_AT, String(state.stockbitTokenSyncedAt));
  }catch(e){}
  const stbTokenEl = document.getElementById("setStockbitToken");
  if(stbTokenEl && document.activeElement !== stbTokenEl) stbTokenEl.value = clean;
  updateStockbitTokenStatusUI();
}

window.addEventListener("message", (event) => {
  if(event.source !== window || event.data?.type !== "STOCKBIT_TOKEN_UPDATED") return;
  applyExtensionStockbitToken(event.data.token, event.data.expiresAt);
});

// ==========================================================
// 🧪 WS DEBUG — terima traffic WebSocket Stockbit yang diteruskan ekstensi
// lewat window.postMessage (lihat content_screener.js: window.postMessage
// ({type:'FROM_EXTENSION_WS_TRAFFIC', payload:{type,direction,url,data,ts}})).
// HANYA disimpan ke buffer kalau user sedang aktif menekan "Mulai Rekam"
// (state.wsDebugRecording) -- traffic WS bisa puluhan pesan/detik saat tab
// Stockbit user terbuka, jadi kalau fitur ini tidak sedang dipakai, frame
// yang lewat dibuang begitu saja (tidak numpuk di memori percuma).
//
// scheduleWsDebugRender() SENGAJA tidak langsung memanggil render() tiap
// frame masuk -- render() di app ini mengganti innerHTML SELURUH tab aktif
// (lihat function render()), dan WS bisa jauh lebih cepat dari kecepatan
// re-render DOM yang wajar. Di-throttle maksimal 1x per 200ms, dan cuma
// kalau tab #wsdebug sedang aktif (kalau user di tab lain, buffer tetap
// terisi di state, tapi DOM tidak disentuh sampai user pindah ke tab ini).
// ==========================================================
window.addEventListener("message", (event) => {
  if(event.source !== window || event.data?.type !== "FROM_EXTENSION_WS_TRAFFIC") return;
  if(!state.wsDebugRecording) return;
  const f = event.data.payload;
  if(!f) return;
  state.wsDebugFrames.push({ ts: f.ts || Date.now(), direction: f.direction || "?", url: f.url || "", data: f.data ?? "" });
  if(state.wsDebugFrames.length > state.wsDebugMaxFrames){
    state.wsDebugFrames.splice(0, state.wsDebugFrames.length - state.wsDebugMaxFrames);
  }
  scheduleWsDebugRender();
});

let wsDebugRenderPending = false;
function scheduleWsDebugRender(){
  if(state.tab !== "wsdebug" || wsDebugRenderPending) return;
  wsDebugRenderPending = true;
  setTimeout(() => { wsDebugRenderPending = false; if(state.tab === "wsdebug") render(); }, 200);
}

// Format selisih waktu jadi teks singkat berbahasa Indonesia, dipakai untuk
// banner "terakhir berhasil ditarik" di bawah ini (dan bisa dipakai ulang di
// tempat lain kalau perlu format relatif serupa).
function fmtRelativeTimeID(ts){
  if(!ts) return null;
  const sec = Math.max(0, Math.round((Date.now() - ts) / 1000));
  if(sec < 5) return "baru saja";
  if(sec < 60) return `${sec} detik lalu`;
  const min = Math.round(sec / 60);
  if(min < 60) return `${min} menit lalu`;
  const hr = Math.round(min / 60);
  if(hr < 24) return `${hr} jam lalu`;
  return new Date(ts).toLocaleString("id-ID");
}

// ==========================================
// stockbitLiveDataStatus — status ringkas dipakai untuk banner "terakhir
// berhasil ditarik: [waktu]" (lihat catatan performa & keandalan data:
// endpoint Stockbit tidak resmi & rawan berhenti berfungsi tanpa
// pemberitahuan, jadi user perlu tahu dari UI kalau data live sedang basi
// tanpa perlu buka console). Dianggap "basi" (stale, warna kuning) kalau
// sudah lebih dari 5 menit sejak sukses terakhir — angka ini sengaja longgar
// karena live data di sini memang ditarik manual per klik, bukan auto-poll
// tiap detik.
// ==========================================
const STOCKBIT_STALE_AFTER_MS = 5 * 60 * 1000;
function stockbitLiveDataStatus(){
  if(!state.stockbitLastSuccessAt){
    return { text: "Belum pernah berhasil menarik data live dari Stockbit.", color: "var(--muted)" };
  }
  const rel = fmtRelativeTimeID(state.stockbitLastSuccessAt);
  const isStale = (Date.now() - state.stockbitLastSuccessAt) > STOCKBIT_STALE_AFTER_MS;
  return {
    text: `${isStale ? "⚠️ " : "✅ "}Terakhir berhasil ditarik: ${rel}${isStale ? " — mungkin sudah basi, coba tarik ulang" : ""}`,
    color: isStale ? "var(--gold)" : "var(--up)"
  };
}
function updateStockbitLastSuccessStatusUI(){
  const el = document.getElementById("stockbitLastSuccessStatus");
  if(!el) return;
  const st = stockbitLiveDataStatus();
  el.textContent = st.text;
  el.style.color = st.color;
}

function stockbitTokenStatus(){
  if(!state.stockbitToken) return { text: "Belum ada token.", color: "var(--muted)" };
  const nowSec = Date.now()/1000;
  // Sumber "extension" TIDAK punya info expires_at yang valid (extension WS
  // Interceptor cuma menangkap nilai token mentah, tidak tahu klaim `exp`
  // JWT-nya) — jadi jangan pernah tampilkan countdown untuk sumber ini,
  // supaya tidak menyesatkan seperti badge lama yang basi.
  if(state.stockbitTokenSource === "extension"){
    const rel = state.stockbitTokenSyncedAt ? fmtRelativeTimeID(state.stockbitTokenSyncedAt) : null;
    return { text: `🧩 Auto dari extension (WS Interceptor)${rel ? " · ditangkap " + rel : ""} — belum tentu masih valid di sisi server Stockbit, cek dari hasil tarik data.`, color: "var(--up)" };
  }
  let expiryTxt = "";
  if(state.stockbitTokenExpiresAt){
    if(state.stockbitTokenExpiresAt < nowSec){
      return { text: "⚠️ Token kadaluarsa — buka stockbit.com & login ulang supaya extension menyinkron token baru.", color: "var(--down)" };
    }
    const minsLeft = Math.round((state.stockbitTokenExpiresAt - nowSec)/60);
    expiryTxt = ` · berlaku ~${minsLeft} menit lagi`;
  }
  const src = state.stockbitTokenSource === "auto" ? "🔄 Auto-sync dari Supabase" : "✍️ Diisi manual";
  return { text: `${src}${expiryTxt}`, color: "var(--up)" };
}

async function fetchStockbitLive(ticker){
  state.stockbitLive[ticker] = { ...(state.stockbitLive[ticker]||{}), loading: true, error: null };
  render();
  const res = await stockbitFetch(state.stockbitQuoteEndpoint, ticker);
  const mapped = res.raw ? mapStockbitQuote(res.raw) : null;
  state.stockbitLive[ticker] = { loading: false, error: res.error || null, raw: res.raw ?? null, mapped, fetchedAt: Date.now() };
  render();
}
// Tarik live data berurutan (bukan paralel) dengan jeda antar-request,
// KHUSUS untuk ticker yang lolos filter Screener saat ini — supaya tidak
// membombardir Stockbit dengan puluhan request sekaligus pakai 1 token
// akun pribadi (rawan rate-limit/flag oleh sistem mereka).
async function fetchStockbitLiveBulk(tickers){
  if(state.stockbitBulkLoading) return;
  state.stockbitBulkLoading = true;
  state.stockbitBulkProgress = { done: 0, total: tickers.length };
  render();
  for(const t of tickers){
    await fetchStockbitLive(t);
    state.stockbitBulkProgress = { done: state.stockbitBulkProgress.done + 1, total: tickers.length };
    render();
    await new Promise(r => setTimeout(r, 350)); // jeda 350ms antar-request
  }
  state.stockbitBulkLoading = false;
  state.stockbitBulkProgress = null;
  render();
}

async function supaFetch(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    let msg = `HTTP ${res.status} ${res.statusText}`;
    try {
      const body = await res.json();
      if (body && body.message) {
        msg = body.message;
        if (body.hint) msg += ` (hint: ${body.hint})`;
      }
    } catch (e) { /* body bukan JSON, pakai status text saja */ }
    // Sertakan nama tabel/endpoint di pesan error — tanpa ini, error yang
    // sama persis bisa muncul dari beberapa request berbeda (mis.
    // backtest_sessions vs backtest_items) dan tidak mungkin dibedakan
    // dari pesan Postgrest saja.
    const table = url.replace(/^.*\/rest\/v1\//, "").split("?")[0];
    throw new Error(`[${table}] ${msg}`);
  }
  return res;
}

// ==========================================
// UJI ENDPOINT STOCKBIT (dipanggil tombol "🧪 Uji" di modal Pengaturan)
//
// Sengaja baca langsung dari INPUT field (bukan state yang sudah tersimpan),
// supaya user bisa coba-coba endpoint/token baru dulu sebelum klik "Simpan
// & Reload" — tidak perlu simpan dulu baru ketahuan salah.
//
// CATATAN: fungsi ini menimpa state.stockbitToken /
// state.stockbitHistoricalEndpoint SEMENTARA selama request berlangsung,
// lalu mengembalikannya. Kalau kebetulan auto-refresh Stockbit (lihat blok
// AUTO-REFRESH LIVE STOCKBIT di bagian akhir file) jalan tepat di detik yang
// sama, ada kemungkinan kecil 1 request nyasar pakai token/endpoint uji —
// bukan masalah serius untuk skala testing manual, tapi disebutkan di sini
// supaya tidak membingungkan kalau terlihat di Network tab.
// ==========================================
async function testStockbitQuoteEndpoint(){
  const resultEl = document.getElementById("testStockbitQuoteResult");
  const tickerEl = document.getElementById("testStockbitTicker");
  const epEl = document.getElementById("setStockbitQuoteEndpoint");
  const tokenEl = document.getElementById("setStockbitToken");
  if(!resultEl || !tickerEl || !epEl) return;
  const ticker = (tickerEl.value||"").trim().toUpperCase();
  if(!ticker){ resultEl.innerHTML = `<div style="font-size:11.5px;color:var(--down);">Isi ticker uji dulu (mis. BBCA).</div>`; return; }
  const endpointTemplate = (epEl.value||"").trim() || STOCKBIT_DEFAULT_QUOTE_EP;

  const prevToken = state.stockbitToken;
  if(tokenEl && tokenEl.value.trim()) state.stockbitToken = tokenEl.value.trim();
  resultEl.innerHTML = `<div style="font-size:11.5px;color:var(--muted);">Menguji ${escapeHtml(ticker)}...</div>`;
  const res = await stockbitFetch(endpointTemplate, ticker);
  state.stockbitToken = prevToken;

  if(res.error){
    resultEl.innerHTML = `<div style="font-size:11.5px;color:var(--down);">⚠️ ${escapeHtml(res.error)}</div>`;
    return;
  }
  const mapped = mapStockbitQuote(res.raw) || {};
  const foundFields = ["open","high","low","last"].filter(k => mapped[k]!=null);
  const verdict = foundFields.length
    ? `<span style="color:var(--up);">✅ Ketemu field: ${foundFields.join(", ")} (Last=${mapped.last}, O/H/L=${mapped.open}/${mapped.high}/${mapped.low}). Kalau angkanya masuk akal, endpoint ini kemungkinan besar BENAR — klik "Simpan &amp; Reload".</span>`
    : `<span style="color:var(--down);">❌ Open/High/Low/Last tidak ketemu — kemungkinan besar ini BUKAN endpoint harga (mis. masih endpoint stream/komentar). Cek struktur JSON mentah di bawah, cari nama field harga aslinya lalu beri tahu saya supaya mapStockbitQuote() disesuaikan.</span>`;
  resultEl.innerHTML = `
    <div style="font-size:11.5px;margin-bottom:6px;">${verdict}</div>
    <details><summary style="cursor:pointer;font-size:11px;color:var(--teal);">Lihat JSON mentah</summary>
      <pre style="font-size:10.5px;background:rgba(0,0,0,0.3);padding:8px;border-radius:6px;overflow-x:auto;max-height:200px;">${escapeHtml(JSON.stringify(res.raw, null, 2))}</pre>
    </details>`;
}

async function testStockbitHistoricalEndpoint(){
  const resultEl = document.getElementById("testStockbitHistResult");
  const tickerEl = document.getElementById("testStockbitHistTicker");
  const periodEl = document.getElementById("testStockbitHistPeriod");
  const epEl = document.getElementById("setStockbitHistoricalEndpoint");
  const tokenEl = document.getElementById("setStockbitToken");
  if(!resultEl || !tickerEl || !epEl) return;
  const ticker = (tickerEl.value||"").trim().toUpperCase();
  const period = periodEl ? periodEl.value : "daily";
  if(!ticker){ resultEl.innerHTML = `<div style="font-size:11.5px;color:var(--down);">Isi ticker uji dulu.</div>`; return; }

  const prevEndpoint = state.stockbitHistoricalEndpoint;
  const prevToken = state.stockbitToken;
  state.stockbitHistoricalEndpoint = (epEl.value||"").trim() || STOCKBIT_DEFAULT_HISTORICAL_EP;
  if(tokenEl && tokenEl.value.trim()) state.stockbitToken = tokenEl.value.trim();
  resultEl.innerHTML = `<div style="font-size:11.5px;color:var(--muted);">Menguji mode ${escapeHtml(period)}...</div>`;
  const res = await stockbitFetchHistorical(ticker, period, { limit: 10 });
  state.stockbitHistoricalEndpoint = prevEndpoint;
  state.stockbitToken = prevToken;

  if(res.error){
    resultEl.innerHTML = `<div style="font-size:11.5px;color:var(--down);">⚠️ ${escapeHtml(res.error)}</div>`;
    return;
  }
  const parsed = parseStockbitHistorical(res.raw);
  const verdict = (parsed && parsed.length)
    ? `<span style="color:var(--up);">✅ Terbaca ${parsed.length} baris. Baris pertama: tanggal ${escapeHtml(parsed[0]?.date||"-")}, Close ${parsed[0]?.close ?? "-"}. Cek jarak antar tanggal di JSON mentah — untuk mode "${escapeHtml(period)}" jaraknya seharusnya mingguan/bulanan, bukan harian, kalau period-nya benar-benar berpengaruh di sisi server.</span>`
    : `<span style="color:var(--down);">❌ Formatnya tidak dikenali parseStockbitHistorical() untuk mode "${escapeHtml(period)}" — kemungkinan besar nama parameter period salah tebak. Cek JSON mentah di bawah lalu beri tahu saya strukturnya.</span>`;
  resultEl.innerHTML = `
    <div style="font-size:11.5px;margin-bottom:6px;">${verdict}</div>
    <details><summary style="cursor:pointer;font-size:11px;color:var(--teal);">Lihat JSON mentah</summary>
      <pre style="font-size:10.5px;background:rgba(0,0,0,0.3);padding:8px;border-radius:6px;overflow-x:auto;max-height:200px;">${escapeHtml(JSON.stringify(res.raw, null, 2))}</pre>
    </details>`;
}

// Uji Endpoint Broker Summary — dibuat khusus untuk mengecek pertanyaan
// "kenapa kolom Lot selalu kosong di broker_summary". Baca endpoint LANGSUNG
// dari kotak input (sama seperti dua tester di atas), supaya bisa coba-coba
// ganti data_type=..._VALUE jadi ..._VOLUME di URL tanpa perlu Simpan &
// Reload dulu. Verdict di bawah secara eksplisit mengecek ada/tidaknya nilai
// Lot pada baris yang berhasil diparse -- itu jawaban langsung ke pertanyaan
// "apakah cabang by_volume memang tidak dikirim Stockbit, atau ada tapi
// gagal dibaca parser".
async function testStockbitBrokerEndpoint(){
  const resultEl = document.getElementById("testStockbitBrokerResult");
  const tickerEl = document.getElementById("testStockbitBrokerTicker");
  const dateEl = document.getElementById("testStockbitBrokerDate");
  const epEl = document.getElementById("setStockbitBrokerEndpoint");
  const tokenEl = document.getElementById("setStockbitToken");
  if(!resultEl || !tickerEl || !epEl) return;
  const ticker = (tickerEl.value||"").trim().toUpperCase();
  if(!ticker){ resultEl.innerHTML = `<div style="font-size:11.5px;color:var(--down);">Isi ticker uji dulu (mis. BBCA).</div>`; return; }
  const dateStr = (dateEl?.value||"").trim() || todayLocalISO();

  const prevEndpoint = state.stockbitBrokerEndpoint;
  const prevToken = state.stockbitToken;
  state.stockbitBrokerEndpoint = (epEl.value||"").trim() || STOCKBIT_DEFAULT_BROKER_EP;
  if(tokenEl && tokenEl.value.trim()) state.stockbitToken = tokenEl.value.trim();
  // Simpan URL yang BENAR-BENAR ditembak (sesudah {ticker}/{date} diisi)
  // supaya kalau gagal, bisa dicek persis apa yang salah dari URL-nya
  // sendiri (placeholder ke-skip, salah taruh parameter, dll) — bukan cuma
  // pesan error generik dari Stockbit.
  const resolvedUrl = state.stockbitBrokerEndpoint
    .replaceAll("{ticker}", encodeURIComponent(ticker))
    .replaceAll("{date}", dateStr);
  resultEl.innerHTML = `<div style="font-size:11.5px;color:var(--muted);">Menguji ${escapeHtml(ticker)} tanggal ${escapeHtml(dateStr)}...</div>`;
  const res = await stockbitFetchMarketDetector(ticker, dateStr, dateStr, 1);
  state.stockbitBrokerEndpoint = prevEndpoint;
  state.stockbitToken = prevToken;

  if(res.error){
    const rawPreview = res.raw != null ? (typeof res.raw === "string" ? res.raw : JSON.stringify(res.raw, null, 2)) : null;
    resultEl.innerHTML = `
      <div style="font-size:11.5px;color:var(--down);margin-bottom:6px;">⚠️ ${escapeHtml(res.error)}</div>
      <div style="font-size:10.5px;color:var(--muted);margin-bottom:6px;word-break:break-all;">URL yang ditembak: ${escapeHtml(resolvedUrl)}</div>
      ${rawPreview ? `<details open><summary style="cursor:pointer;font-size:11px;color:var(--teal);">Lihat respons error mentah</summary>
        <pre style="font-size:10.5px;background:rgba(0,0,0,0.3);padding:8px;border-radius:6px;overflow-x:auto;max-height:200px;">${escapeHtml(rawPreview)}</pre>
      </details>` : ""}`;
    return;
  }
  const byDate = parseStockbitMarketDetector(res.raw, dateStr);
  const dayRows = byDate ? byDate[dateStr] : null;
  const buy = dayRows?.buy || [];
  const sell = dayRows?.sell || [];
  const allRows = [...buy, ...sell];
  const withLot = allRows.filter(r => r.lot != null && r.lot > 0);
  const withType = allRows.filter(r => r.investor_type);

  let verdict;
  if(!allRows.length){
    verdict = `<span style="color:var(--down);">❌ Tidak ada baris Top Buy/Sell yang terbaca sama sekali untuk ${escapeHtml(dateStr)} — coba tanggal hari bursa lain (bukan Sabtu/Minggu/libur), atau kemungkinan skema respons berubah lagi. Cek JSON mentah di bawah.</span>`;
  } else if(withLot.length){
    verdict = `<span style="color:var(--up);">✅ Terbaca ${buy.length} broker Top Buy, ${sell.length} Top Sell — ${withLot.length}/${allRows.length} baris PUNYA Lot terisi (contoh: ${escapeHtml(withLot[0].broker_code)} = ${withLot[0].lot} lot), dan ${withType.length}/${allRows.length} baris PUNYA Tipe Investor terisi${withType.length ? ` (contoh: ${escapeHtml(withType[0].broker_code)} = ${escapeHtml(withType[0].investor_type)})` : ""}. Kalau salah satu dari dua ini masih 0/${allRows.length}, kemungkinan skema respons endpoint yang sedang dites ini memang tidak menyertakan field itu — cek JSON mentah di bawah untuk pastikan nama field aslinya.</span>`;
  } else {
    verdict = `<span style="color:var(--gold);">⚠️ Terbaca ${buy.length} broker Top Buy, ${sell.length} Top Sell, TAPI semua baris Lot-nya kosong/null (cuma value_idr yang terisi, tipe investor: ${withType.length}/${allRows.length} terisi). Untuk endpoint /order-trade/broker/distribution ini biasanya berarti cabang by_volume memang tidak dikirim Stockbit untuk data_type yang sedang dites — coba timpa data_type di kotak endpoint jadi BROKER_DISTRIBUTION_DATA_TYPE_VOLUME lalu tes ulang. Untuk endpoint /marketdetectors, cek JSON mentah untuk nama field lot yang sebenarnya (mis. blot/slot).</span>`;
  }

  resultEl.innerHTML = `
    <div style="font-size:11.5px;margin-bottom:6px;">${verdict}</div>
    <details><summary style="cursor:pointer;font-size:11px;color:var(--teal);">Lihat JSON mentah</summary>
      <pre style="font-size:10.5px;background:rgba(0,0,0,0.3);padding:8px;border-radius:6px;overflow-x:auto;max-height:200px;">${escapeHtml(JSON.stringify(res.raw, null, 2))}</pre>
    </details>`;
}

// ==========================================
// PENGATURAN UI KONEKSI
// ==========================================
async function openSettings() {
  let urlDisp = SUPABASE_URL;
  if(urlDisp.endsWith("/rest/v1")) urlDisp = urlDisp.replace("/rest/v1", "");
  document.getElementById("setSupaUrl").value = urlDisp;
  document.getElementById("setSupaKey").value = SUPABASE_KEY;
  const freqEl = document.getElementById("setFreqAnalyzerCol");
  if(freqEl) freqEl.value = state.freqAnalyzerCol;
  const stbToken = document.getElementById("setStockbitToken");
  if(stbToken) stbToken.value = state.stockbitToken || "";
  const stbQuote = document.getElementById("setStockbitQuoteEndpoint");
  if(stbQuote) stbQuote.value = state.stockbitQuoteEndpoint || STOCKBIT_DEFAULT_QUOTE_EP;
  const stbBroker = document.getElementById("setStockbitBrokerEndpoint");
  if(stbBroker) stbBroker.value = state.stockbitBrokerEndpoint || STOCKBIT_DEFAULT_BROKER_EP;
  const stbHistorical = document.getElementById("setStockbitHistoricalEndpoint");
  if(stbHistorical) stbHistorical.value = state.stockbitHistoricalEndpoint || STOCKBIT_DEFAULT_HISTORICAL_EP;
  const stbProxy = document.getElementById("setStockbitProxyUrl");
  if(stbProxy) stbProxy.value = state.stockbitProxyUrl || "";
  const geminiKeyEl = document.getElementById("setGeminiApiKey");
  if(geminiKeyEl) geminiKeyEl.value = state.geminiApiKey || "";
  const geminiModelEl = document.getElementById("setGeminiModel");
  if(geminiModelEl) geminiModelEl.value = state.geminiModel || GEMINI_DEFAULT_MODEL;
  document.getElementById("settingsModalOverlay").classList.add("open");
  updateStockbitTokenStatusUI();
  updateStockbitLastSuccessStatusUI();
  // Coba tarik token terbaru dari Supabase di background — kalau berhasil,
  // timpa field token yang baru saja ditampilkan supaya selalu yang terbaru.
  // (syncStockbitTokenFromSupabase() sendiri akan no-op kalau token yang
  // aktif sekarang datang dari extension — lihat catatan di fungsi itu.)
  const synced = await syncStockbitTokenFromSupabase();
  if(synced && stbToken) stbToken.value = state.stockbitToken;
  updateStockbitTokenStatusUI();

  // --- Notifikasi Telegram ---  const tgFnEl = document.getElementById("setTelegramFunctionUrl");
  if(tgFnEl) tgFnEl.value = state.telegramFunctionUrl || ""; // isi awal dari localStorage, sambil menunggu fetch di bawah
  await Promise.all([refreshCustomPresets(), loadTelegramSettingsFromSupabase()]);
  // Timpa lagi setelah fetch selesai — kalau Supabase punya function_url tersimpan,
  // itu yang dipakai (lihat loadTelegramSettingsFromSupabase), bukan cuma localStorage.
  if(tgFnEl) tgFnEl.value = state.telegramFunctionUrl || "";
  if(geminiKeyEl) geminiKeyEl.value = state.geminiApiKey || "";
  if(geminiModelEl) geminiModelEl.value = state.geminiModel || GEMINI_DEFAULT_MODEL;
  const tgTokenEl = document.getElementById("setTelegramBotToken");
  if(tgTokenEl) tgTokenEl.value = state.telegramBotToken || "";
  const tgChatEl = document.getElementById("setTelegramChatId");
  if(tgChatEl) tgChatEl.value = state.telegramChatId || "";
  const tgEnabledEl = document.getElementById("setTelegramEnabled");
  if(tgEnabledEl) tgEnabledEl.checked = !!state.telegramEnabled;
  const tgHoursEl = document.getElementById("setTelegramOnlyMarketHours");
  if(tgHoursEl) tgHoursEl.checked = state.telegramOnlyMarketHours !== false;
  renderTelegramPresetChecklist();
  const tgLastRunEl = document.getElementById("telegramLastRunStatus");
  if(tgLastRunEl){
    tgLastRunEl.textContent = state.telegramLastRunAt
      ? `Terakhir cek server: ${new Date(state.telegramLastRunAt).toLocaleString("id-ID")} — ${state.telegramLastRunNote || ""}`
      : "Belum pernah dijalankan Cron server (atau tabel telegram_settings belum dibuat).";
  }
}
function updateStockbitTokenStatusUI(){
  const el = document.getElementById("stockbitTokenStatus");
  if(!el) return;
  const st = stockbitTokenStatus();
  el.textContent = st.text;
  el.style.color = st.color;
}

function closeSettings() {
  document.getElementById("settingsModalOverlay").classList.remove("open");
}

function saveSettings() {
  let supaUrlInput = document.getElementById("setSupaUrl").value.trim();
  // Validasi URL dan otomatisasi append path /rest/v1
  if (supaUrlInput) {
    if (supaUrlInput.endsWith("/")) supaUrlInput = supaUrlInput.slice(0, -1);
    if (!supaUrlInput.endsWith("/rest/v1")) supaUrlInput += "/rest/v1";
  }
  
  SUPABASE_URL = supaUrlInput;
  SUPABASE_KEY = document.getElementById("setSupaKey").value.trim();

  localStorage.setItem("ihsg_supa_url", SUPABASE_URL);
  localStorage.setItem("ihsg_supa_key", SUPABASE_KEY);

  const freqColInput = (document.getElementById("setFreqAnalyzerCol")?.value || "").trim();
  state.freqAnalyzerCol = freqColInput || "freq_ma20";
  localStorage.setItem(LS_FREQ_ANALYZER_COL, state.freqAnalyzerCol);

  state.stockbitToken = sanitizeStockbitToken(document.getElementById("setStockbitToken")?.value);
  state.stockbitTokenSource = "manual"; // ditimpa balik ke "auto"/"extension" oleh sync yang berjalan otomatis kalau memang datang dari situ
  state.stockbitTokenSyncedAt = Date.now();
  try{
    localStorage.setItem(LS_STOCKBIT_TOKEN_SOURCE, "manual");
    localStorage.setItem(LS_STOCKBIT_TOKEN_SYNCED_AT, String(state.stockbitTokenSyncedAt));
  }catch(e){}
  state.stockbitQuoteEndpoint = (document.getElementById("setStockbitQuoteEndpoint")?.value || "").trim() || STOCKBIT_DEFAULT_QUOTE_EP;
  state.stockbitBrokerEndpoint = (document.getElementById("setStockbitBrokerEndpoint")?.value || "").trim() || STOCKBIT_DEFAULT_BROKER_EP;
  state.stockbitHistoricalEndpoint = (document.getElementById("setStockbitHistoricalEndpoint")?.value || "").trim() || STOCKBIT_DEFAULT_HISTORICAL_EP;
  state.stockbitProxyUrl = (document.getElementById("setStockbitProxyUrl")?.value || "").trim();
  localStorage.setItem(LS_STOCKBIT_TOKEN, state.stockbitToken);
  localStorage.setItem(LS_STOCKBIT_QUOTE_EP, state.stockbitQuoteEndpoint);
  localStorage.setItem(LS_STOCKBIT_BROKER_EP, state.stockbitBrokerEndpoint);
  localStorage.setItem(LS_STOCKBIT_HISTORICAL_EP, state.stockbitHistoricalEndpoint);
  localStorage.setItem(LS_STOCKBIT_PROXY, state.stockbitProxyUrl);

  state.geminiApiKey = (document.getElementById("setGeminiApiKey")?.value || "").trim();
  state.geminiModel = (document.getElementById("setGeminiModel")?.value || "").trim() || GEMINI_DEFAULT_MODEL;
  localStorage.setItem(LS_GEMINI_API_KEY, state.geminiApiKey);
  localStorage.setItem(LS_GEMINI_MODEL, state.geminiModel);

  state.telegramFunctionUrl = (document.getElementById("setTelegramFunctionUrl")?.value || "").trim();
  localStorage.setItem(LS_TELEGRAM_FUNCTION_URL, state.telegramFunctionUrl);
  state.telegramBotToken = (document.getElementById("setTelegramBotToken")?.value || "").trim();
  state.telegramChatId = (document.getElementById("setTelegramChatId")?.value || "").trim();
  state.telegramEnabled = !!document.getElementById("setTelegramEnabled")?.checked;
  state.telegramOnlyMarketHours = !!document.getElementById("setTelegramOnlyMarketHours")?.checked;
  saveTelegramSettingsToSupabase();

  closeSettings();
  
  if(SUPABASE_URL && SUPABASE_KEY) {
    loadLive();
  } else {
    document.getElementById("content").innerHTML = `<div class="empty-box">Koneksi belum diatur. Klik "⚙️ Pengaturan" di pojok kanan atas.</div>`;
  }
}

// ==========================================
// NOTIFIKASI TELEGRAM (tabel telegram_settings di Supabase)
//
// Dipantau & dikirim oleh Edge Function `telegram-notifier` yang jalan
// di server lewat Cron (lihat sql/06_telegram_notifikasi.sql) — bagian
// di sini hanya UI untuk mengisi/menyimpan konfigurasinya dan tombol
// uji-kirim manual.
// ==========================================
async function loadTelegramSettingsFromSupabase(){
  if(!SUPABASE_URL || !SUPABASE_KEY) return;
  try{
    const res = await fetch(`${SUPABASE_URL}/telegram_settings?id=eq.1&select=*`, { headers: getSupaHeaders(), cache: "no-store" });
    if(!res.ok) return; // tabel belum ada (belum jalankan sql/06_telegram_notifikasi.sql) — biarkan default
    const rows = await res.json();
    const row = Array.isArray(rows) ? rows[0] : null;
    if(!row) return;
    state.telegramBotToken = row.bot_token || "";
    state.telegramChatId = row.chat_id || "";
    state.telegramEnabled = !!row.enabled;
    state.telegramOnlyMarketHours = row.only_market_hours !== false;
    state.telegramPresetIds = Array.isArray(row.preset_ids) ? row.preset_ids.map(String) : [];
    state.telegramLastRunAt = row.last_run_at || null;
    state.telegramLastRunNote = row.last_run_note || null;
    // API key Gemini juga dititipkan di tabel telegram_settings (kolom
    // gemini_api_key/gemini_model) supaya tidak perlu diisi ulang tiap
    // buka aplikasi di device/browser lain — sebelumnya cuma di localStorage.
    if(row.gemini_api_key){
      state.geminiApiKey = row.gemini_api_key;
      try{ localStorage.setItem(LS_GEMINI_API_KEY, state.geminiApiKey); }catch(e){}
    }
    if(row.gemini_model){
      state.geminiModel = row.gemini_model;
      try{ localStorage.setItem(LS_GEMINI_MODEL, state.geminiModel); }catch(e){}
    }
    // function_url disimpan di Supabase (kolom telegram_settings.function_url)
    // supaya tidak perlu diisi ulang tiap buka Pengaturan di device/browser lain.
    // Kalau kolomnya belum pernah diisi (null), tetap pakai nilai localStorage lama.
    if(row.function_url){
      state.telegramFunctionUrl = row.function_url;
      try{ localStorage.setItem(LS_TELEGRAM_FUNCTION_URL, state.telegramFunctionUrl); }catch(e){}
    }
    // --- Field tambahan (sebelumnya CUMA localStorage, jadi hilang tiap
    // ganti device/browser): kolom Frequency Analyzer, 3 endpoint Stockbit,
    // dan proxy URL Stockbit. Sama seperti gemini_api_key/function_url di
    // atas: kalau kolomnya null (migration belum dijalankan / belum pernah
    // disimpan dari device manapun), biarkan nilai localStorage lama dipakai.
    if(row.freq_analyzer_col){
      state.freqAnalyzerCol = row.freq_analyzer_col;
      try{ localStorage.setItem(LS_FREQ_ANALYZER_COL, state.freqAnalyzerCol); }catch(e){}
    }
    if(row.stockbit_quote_ep){
      state.stockbitQuoteEndpoint = row.stockbit_quote_ep;
      try{ localStorage.setItem(LS_STOCKBIT_QUOTE_EP, state.stockbitQuoteEndpoint); }catch(e){}
    }
    if(row.stockbit_broker_ep){
      state.stockbitBrokerEndpoint = row.stockbit_broker_ep;
      try{ localStorage.setItem(LS_STOCKBIT_BROKER_EP, state.stockbitBrokerEndpoint); }catch(e){}
    }
    if(row.stockbit_historical_ep){
      state.stockbitHistoricalEndpoint = row.stockbit_historical_ep;
      try{ localStorage.setItem(LS_STOCKBIT_HISTORICAL_EP, state.stockbitHistoricalEndpoint); }catch(e){}
    }
    // Proxy URL boleh sengaja dikosongkan (mis. user hapus proxy), jadi cek
    // key-nya ada di row (bukan cuma truthy) supaya string kosong dari
    // Supabase tetap menimpa nilai localStorage lama, bukan diabaikan.
    if(Object.prototype.hasOwnProperty.call(row, "stockbit_proxy_url") && row.stockbit_proxy_url !== null){
      state.stockbitProxyUrl = row.stockbit_proxy_url;
      try{ localStorage.setItem(LS_STOCKBIT_PROXY, state.stockbitProxyUrl); }catch(e){}
    }
  }catch(e){ /* offline / tabel belum ada — abaikan, form tetap terisi default */ }
}

async function saveTelegramSettingsToSupabase(){
  if(!SUPABASE_URL || !SUPABASE_KEY) return;
  try{
    await supaFetch(`${SUPABASE_URL}/telegram_settings?id=eq.1`, {
      method: "PATCH",
      headers: { ...getSupaHeaders(), "Prefer": "return=minimal" },
      body: JSON.stringify({
        bot_token: state.telegramBotToken,
        chat_id: state.telegramChatId,
        enabled: state.telegramEnabled,
        only_market_hours: state.telegramOnlyMarketHours,
        preset_ids: state.telegramPresetIds,
        function_url: state.telegramFunctionUrl,
        gemini_api_key: state.geminiApiKey,
        gemini_model: state.geminiModel,
        // Field tambahan supaya ikut tersimpan di Supabase (lihat catatan
        // di loadTelegramSettingsFromSupabase() di atas) — tanpa ini,
        // 4 field berikut cuma hidup di localStorage dan hilang tiap
        // pindah device/browser.
        freq_analyzer_col: state.freqAnalyzerCol,
        stockbit_quote_ep: state.stockbitQuoteEndpoint,
        stockbit_broker_ep: state.stockbitBrokerEndpoint,
        stockbit_historical_ep: state.stockbitHistoricalEndpoint,
        stockbit_proxy_url: state.stockbitProxyUrl,
        updated_at: new Date().toISOString()
      })
    });
  }catch(e){
    showError("Gagal menyimpan Pengaturan Notifikasi Telegram: " + e.message + " — pastikan sudah menjalankan sql/06_telegram_notifikasi.sql di Supabase.");
  }
}

// Centang/hapus centang 1 preset di daftar "preset yang dipantau" —
// langsung disimpan ke Supabase supaya Edge Function di server melihat
// perubahan ini di cron berikutnya, tidak perlu klik "Simpan & Reload".
function toggleTelegramPreset(id){
  const key = String(id);
  const idx = state.telegramPresetIds.indexOf(key);
  if(idx === -1) state.telegramPresetIds.push(key); else state.telegramPresetIds.splice(idx, 1);
  renderTelegramPresetChecklist();
  saveTelegramSettingsToSupabase();
}

function renderTelegramPresetChecklist(){
  const el = document.getElementById("telegramPresetChecklist");
  if(!el) return;

  // Grup 1: 9 Preset DSI bawaan. Kunci disimpan dengan prefix "dsi:" (mis.
  // "dsi:bagger") supaya Edge Function bisa bedakan dari id Preset Kustom
  // (angka polos, tanpa prefix) — lihat functions/telegram-notifier/index.ts.
  const dsiKeys = Object.keys(PRESET_LABELS);
  const dsiHtml = dsiKeys.map(key => {
    const fullId = `dsi:${key}`;
    return `
    <label style="display:grid;grid-template-columns:16px 1fr;align-items:center;gap:8px;font-size:12.5px;padding:6px 0;cursor:pointer;">
      <input type="checkbox" class="custom-checkbox" style="margin:0;justify-self:start;" ${state.telegramPresetIds.includes(fullId) ? "checked" : ""} onchange="toggleTelegramPreset('${fullId}')">
      <span style="text-align:left;">${escapeHtml(PRESET_LABELS[key])}</span>
    </label>`;
  }).join("");

  // Grup 2: Preset Kustom (id polos angka, TANPA prefix — sama seperti
  // sebelumnya, supaya query custom_presets?id=in.(...) di Edge Function
  // tidak perlu diubah untuk yang ini).
  const customHtml = state.customPresets.length
    ? state.customPresets.map(p => `
      <label style="display:grid;grid-template-columns:16px 1fr;align-items:center;gap:8px;font-size:12.5px;padding:6px 0;cursor:pointer;">
        <input type="checkbox" class="custom-checkbox" style="margin:0;justify-self:start;" ${state.telegramPresetIds.includes(String(p.id)) ? "checked" : ""} onchange="toggleTelegramPreset('${p.id}')">
        <span style="text-align:left;">${escapeHtml(p.name)}</span>
      </label>`).join("")
    : `<div style="font-size:11.5px;color:var(--muted);padding:4px 0;">Belum ada Preset Kustom tersimpan. Buat dulu lewat "+ Tambah Rule" di tab Screener, lalu "💾 Simpan sebagai Preset…".</div>`;

  el.innerHTML = `
    <div style="font-size:10.5px;color:var(--muted);text-transform:uppercase;letter-spacing:.04em;margin-bottom:2px;">Preset DSI Bawaan</div>
    ${dsiHtml}
    <div style="font-size:10.5px;color:var(--muted);text-transform:uppercase;letter-spacing:.04em;margin:10px 0 2px;border-top:1px solid var(--border);padding-top:8px;">Preset Kustom Saya</div>
    ${customHtml}
  `;
}

async function testTelegramNotification(){
  const statusEl = document.getElementById("telegramTestStatus");
  const fnUrl = (document.getElementById("setTelegramFunctionUrl")?.value || state.telegramFunctionUrl || "").trim();
  if(!fnUrl){
    if(statusEl){ statusEl.textContent = "Isi dulu \"URL Edge Function\" di bawah."; statusEl.style.color = "var(--down)"; }
    return;
  }
  // Simpan dulu token/chat_id/preset yang sedang diketik supaya Edge
  // Function di server (yang membaca dari Supabase, bukan dari body
  // request ini) memakai nilai terbaru saat mengirim test.
  state.telegramBotToken = (document.getElementById("setTelegramBotToken")?.value || "").trim();
  state.telegramChatId = (document.getElementById("setTelegramChatId")?.value || "").trim();
  state.telegramFunctionUrl = fnUrl;
  localStorage.setItem(LS_TELEGRAM_FUNCTION_URL, state.telegramFunctionUrl);
  await saveTelegramSettingsToSupabase();

  state.telegramTesting = true;
  if(statusEl){ statusEl.textContent = "Mengirim test..."; statusEl.style.color = "var(--muted)"; }
  try{
    const res = await fetch(fnUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ test: true }) });
    const body = await res.json().catch(()=>({}));
    if(!res.ok) throw new Error(body.message || `HTTP ${res.status}`);
    if(statusEl){ statusEl.textContent = "✅ Test terkirim — cek chat Telegram kamu."; statusEl.style.color = "var(--up)"; }
  }catch(e){
    if(statusEl){ statusEl.textContent = "❌ Gagal: " + e.message; statusEl.style.color = "var(--down)"; }
  }
  state.telegramTesting = false;
}

// ==========================================
// APLIKASI UTAMA
// ==========================================
const LS_WATCHLIST = "ihsg_watchlist", LS_BACKTEST = "ihsg_backtest", LS_PORTO = "ihsg_portofolio", LS_STOCK_CACHE = "ihsg_stock_cache";
const LS_FREQ_ANALYZER_COL = "ihsg_freq_analyzer_col";
const LS_CUSTOM_RULES = "ihsg_custom_rules_v1";
const LS_STOCKBIT_TOKEN = "ihsg_stockbit_token", LS_STOCKBIT_QUOTE_EP = "ihsg_stockbit_quote_ep",
      LS_STOCKBIT_BROKER_EP = "ihsg_stockbit_broker_ep", LS_STOCKBIT_PROXY = "ihsg_stockbit_proxy",
      LS_STOCKBIT_HISTORICAL_EP = "ihsg_stockbit_historical_ep";
// Menyimpan SUMBER token (bukan cuma token-nya sendiri) supaya label status
// ("🧩 Auto dari extension" vs "✍️ Diisi manual") tetap akurat setelah
// halaman di-reload — bukan cuma benar selama tab masih terbuka.
const LS_STOCKBIT_TOKEN_SOURCE = "ihsg_stockbit_token_source", LS_STOCKBIT_TOKEN_SYNCED_AT = "ihsg_stockbit_token_synced_at";
const LS_STOCKBIT_AUTOREFRESH = "ihsg_stockbit_autorefresh", LS_STOCKBIT_AUTOREFRESH_SEC = "ihsg_stockbit_autorefresh_sec";
const STOCKBIT_AUTOREFRESH_MIN_SEC = 30; // batas bawah supaya tidak membombardir Stockbit dengan token pribadi
const STOCKBIT_AUTOREFRESH_MAX_TICKERS = 30; // di atas ini auto-refresh otomatis nonaktif sendiri (lihat maybeAutoRefreshStockbit)
// Notifikasi Telegram — cuma URL Edge Function yang perlu disimpan lokal
// (dipakai tombol "Uji Kirim Notifikasi" di browser). Bot token, chat ID,
// status aktif, dan preset yang dipantau disimpan di Supabase (tabel
// telegram_settings), bukan localStorage — supaya Edge Function di server
// (dipanggil Cron, bukan dari browser ini) bisa membacanya juga.
const LS_TELEGRAM_FUNCTION_URL = "ihsg_telegram_function_url";
// Analisis AI (Gemini) — API key & nama model disimpan lokal di browser
// (LS_GEMINI_*), dipanggil LANGSUNG dari sini ke Google (tidak lewat
// Supabase/proxy manapun) pakai API key milik user sendiri. Model default
// "gemini-flash-latest" adalah ALIAS resmi Google yang otomatis mengarah ke
// rilis Flash stabil terbaru — supaya tidak perlu diupdate manual tiap kali
// Google merilis versi baru (lihat https://ai.google.dev/gemini-api/docs/models).
const LS_GEMINI_API_KEY = "ihsg_gemini_api_key", LS_GEMINI_MODEL = "ihsg_gemini_model";
const GEMINI_DEFAULT_MODEL = "gemini-flash-latest";
const STOCKBIT_DEFAULT_QUOTE_EP = "https://exodus.stockbit.com/stream/v3/symbol/{ticker}";
// NOTE (25 Agu 2026): endpoint di atas TERBUKTI SALAH — itu API "Stream"
// (linimasa komentar komunitas), bukan API harga. Endpoint quote/orderbook
// yang benar belum ketemu (sempat ditelusuri sampai ke WebSocket Primus
// ws-gen.stockbit.com, tapi dihentikan karena rawan trigger rate-limit kalau
// dipakai ganti-ganti ticker cepat). Dibiarkan seperti ini dulu — field
// "Endpoint Quote/Orderbook" di Pengaturan tetap bisa ditimpa manual kalau
// endpoint yang benar sudah ketemu.
const STOCKBIT_DEFAULT_BROKER_EP = "https://exodus.stockbit.com/order-trade/broker/distribution?date={date}&symbol={ticker}&investor_type=INVESTOR_TYPE_ALL&market_board=MARKET_TYPE_REGULER&data_type=BROKER_DISTRIBUTION_DATA_TYPE_VALUE&period=TB_PERIOD_LAST_1_DAY";// Endpoint Historical Data (tabel Date/Close/Change/Value/Volume di halaman
// detail saham Stockbit — toggle Daily/Weekly/Monthly). Sudah diverifikasi
// dari traffic asli lewat DevTools (30 Agu 2026) — beda dengan marketdetectors,
// endpoint ini SUDAH mendukung rentang tanggal beneran lewat start_date/end_date
// + pagination lewat limit/page, jadi tidak perlu trik "tarik semua lalu saring"
// seperti broker summary. Placeholder {period} diisi lewat
// stockbitHistoricalPeriodParam() (map "daily"/"weekly"/"monthly" ->
// HS_PERIOD_DAILY/HS_PERIOD_WEEKLY/HS_PERIOD_MONTHLY — dua yang terakhir baru
// tebakan pola penamaan, belum dicek manual; kalau salah, field Endpoint di
// Pengaturan bisa ditimpa manual). Bentuk JSON response-nya SENDIRI belum
// dikonfirmasi — parseStockbitHistorical() di bawah menebak nama field secara
// defensif, jadi kalau muncul pesan "formatnya tidak dikenali", tinggal cek
// console (F12) untuk lihat JSON asli dan tambah alias field yang cocok.
const STOCKBIT_DEFAULT_HISTORICAL_EP = "https://exodus.stockbit.com/company-price-feed/historical/summary/{ticker}?period={period}&start_date={start_date}&end_date={end_date}&limit={limit}&page={page}";
function stockbitHistoricalPeriodParam(period){
  if(period === "weekly") return "HS_PERIOD_WEEKLY";
  if(period === "monthly") return "HS_PERIOD_MONTHLY";
  return "HS_PERIOD_DAILY";
}
// Diverifikasi manual dari DevTools tanggal 25 Agu 2026 (menu "Bandar
// Detector" stockbit.com) — {ticker} di path URL, {from}/{to} format
// YYYY-MM-DD. limit dinaikkan dari default Stockbit (25) ke 200 supaya lebih
// besar peluang semua hari dalam rentang 10 hari kebagian baris; kalau ada
// saham yang sangat aktif dan masih ada hari kosong, naikkan lagi manual di
// Pengaturan (field ini bisa ditimpa, defaultnya cuma dipakai kalau kosong).

let state = {
  demoMode: false, stocks: [], watchlist: new Set(), backtests: [],
  selectedForBacktest: new Set(),
  // ==========================================
  // "Simpan ke Backtest" GENERIK — dipakai oleh tab-tab selain 📋 Screener
  // (yang sudah punya mekanismenya sendiri lewat selectedForBacktest di
  // atas) supaya SETIAP menu yang menghasilkan daftar kandidat saham —
  // 🎯 Entry Price Scanner, ⬢ Kraken Flow (ORCA), 🌆 BSJP, ✨ Smart Pick —
  // juga bisa mengirim hasilnya ke tab 🔬 Backtest dengan harga & tanggal
  // entry yang sama-sama terkunci begitu tersimpan (lihat saveToBacktest
  // untuk pola aslinya, dan saveGenericListToBacktest di bawah untuk
  // versi generiknya). Satu namespace ("eps"/"orca"/"bsjp"/"smartpick")
  // = satu Set centang independen, supaya centang di satu tab tidak
  // tercampur dengan tab lain.
  genericBacktestSelections: {}, // { [namespace]: Set<ticker> }
  genericBacktestItems: {},      // { [namespace]: Array<{ticker, price, kriteria, keterangan}> } — snapshot item yang SEDANG tampil di render terakhir, dipakai wiring select-all/save

  portfolio: [], portoEditId: null, portoModalOpen: false, portoPrefill: null, selectedPorto: new Set(),
  tab: "screener", search: "", activePreset: null,
  visibleCols: new Set(), // diisi loadSettings() dari localStorage atau DEFAULT_VISIBLE_COLS
  colPickerOpen: false,
  filters: {sektor:[], syariahLabel:[], cekHarga:[], cekRsi:[], statusRsi:[], cekMacd:[], band:[], sinyalVolume:[], sinyalFrekuensi:[], keyakinanNaik:[], trendHarga:[], polaCandle:[], uangGedeMasuk:[], isBBSqueeze:[], valuasi:[], capTier:[], lq45:[]},
  showAdvancedFilters: false,
  // Collapsible untuk 3 blok filter utama (Klasifikasi Emiten / Trend & Sinyal
  // Teknikal / Momentum, Volume & Keyakinan) — pola sama seperti "Filter
  // Lanjutan" (adv-toggle/adv-body), default terbuka supaya tidak mengubah
  // tampilan yang sudah ada; wiring klik ada di attachContentEvents.
  showFilterKlasifikasi: true,
  showFilterTrend: true,
  showFilterMomentum: true,
  rangeFilters: {
    bbWidth:{min:"",max:""},
    atr14:{min:"",max:""},
    clv:{min:"",max:""},
    rsi7:{min:"",max:""},
    rsi21:{min:"",max:""},
    frequency:{min:"",max:""},
    marketCap:{min:"",max:""},
    week52ChangePct:{min:"",max:""},
    ytdPct:{min:"",max:""}
  },
  openDropdown: null, 
  sort: { col: null, asc: true },
  page: 1, limit: 10,
  expanded: new Set(),
  selectedTicker: null, chartData: [], chartLoading: false, selectedLevels: null, loading:false, chartSearch: "",
  chartRange: "all", chartSeries: { close:true, support:true, resistance:true, fib:true, bb:false, emaHL:false, ema89:false, sar:false, supertrend:false, pc:false, bandar:false, vol:false, stochrsi:false, rsi721:false, foreignflow:false, macd:false, netforeign:false },
  detailTicker: null, detailTab: "teknikal",
  // Modal "detail metrik Dashboard": dibuka saat kartu ringkasan (Total
  // Saham, Undervalued, dst) diklik. key = metrik, lihat DASH_METRIC_DEFS.
  dashMetricKey: null, dashMetricSort: {key:"score", asc:false}, dashMetricSearch: "",
  // Tab Sektoral: sektor mana yang sedang di-expand untuk melihat daftar
  // sahamnya, dan urutan sortir daftar saham di dalam tiap sektor.
  sektorExpanded: new Set(), sektorSearch: "", sektorSort: "changeDesc",
  // Sub-tab aktif di panel "🔥 Top Movers" (bagian atas tab Sektoral):
  // gainer / loser / value / volume / frequency.
  topMoversTab: "gainer",
  // Tab BSJP (Beli Sore, Jual Pagi): threshold kustom (diisi loadBsjpParams()
  // saat init), ticker yang expanded untuk lihat Trade Plan, panel info,
  // dan state export watchlist ke format broker.
  bsjpParams: null, bsjpExpanded: null, bsjpInfoOpen: false,
  bsjpSearch: "", bsjpOnlyLolos: true, bsjpSort: "score",
  bsjpExportOpen: false, bsjpExportFormat: "stockbit",
  bsjpPreset: "strict", bsjpParamsOpen: false, bsjpSimulator: false,
  // "Frequency Analyzer" = kolom baseline (rata-rata Frekuensi) di DB yang
  // dipakai sebagai pembanding di rule builder, namanya bisa beda-beda
  // tergantung skema tiap orang — jadi dibuat konfigurasi lewat Pengaturan,
  // bukan di-hardcode. Default "freq_ma20" (isi lewat "⚙️ Pengaturan").
  freqAnalyzerCol: "freq_ma20",
  // Rules kustom ala "Edit Screener" Stockbit: {id, aKey, op, mult, bType, bKey, bConst}
  customRules: [],
  ruleBuilderOpen: true, // collapsible panel Rules Kustom — auto-collapse setelah "Muat" preset
  // Panel-panel lain di tab Screener yang juga bisa dibuka/tutup (klik
  // judulnya) — lihat sectionHeader() di renderScreener(). Default semua
  // TERBUKA supaya tampilan tidak berubah untuk user lama sebelum fitur ini
  // ada; state-nya sengaja TIDAK disimpan ke localStorage (reset ke terbuka
  // tiap reload), sama seperti ruleBuilderOpen.
  screenerRingkasanOpen: true, screenerFilterOpen: true, screenerTableOpen: true,
  // Preset Screener kustom (disimpan di tabel custom_presets Supabase):
  // {id, name, rules, created_at}. selectedPresetId = preset yang dipilih
  // di dropdown (belum tentu sudah "dimuat" ke customRules).
  customPresets: [],
  selectedPresetId: "",
  presetsLoading: false,
  // Data Top 3 Broker Beli/Jual per saham (dari broker_summary, hari
  // trading terakhir yang tercatat) — dipakai rule kustom "Top 3 Broker
  // (Beli/Jual) contains <kode>" untuk cari saham yang didominasi broker
  // tertentu. Bentuk: { TICKER: { buy:["AK","YP","PD"], sell:[...] } }.
  top3BrokerData: {},
  top3BrokerDate: null,
  top3BrokerLoading: false,
  // Dashboard Market Overview dan Broker Stalker.
  dashboardBrokerRows: [], dashboardBrokerDate: null, dashboardBrokerLoading: false,
  brokerStalkerMode: "stock", brokerStalkerQuery: "", brokerStalkerRows: [],
  brokerStalkerDate: null, brokerStalkerLoading: false, brokerStalkerMsg: "",
  // ==========================================
  // Field tambahan untuk tampilan Broker Stalker versi baru (Periode,
  // Urutkan, Filter Asing/Lokal, cari broker di hasil, toggle grafik).
  // brokerStalkerRawRows menyimpan hasil AGREGAT MENTAH (belum difilter/
  // diurutkan) dari searchBrokerStalker() — brokerStalkerRows (di atas)
  // dihitung ulang dari sini secara instan tiap Urutkan/Filter/cari
  // berubah, TANPA fetch ulang ke Supabase. brokerStalkerDailyNet dipakai
  // untuk grafik batang akumulasi harian ("Tampilkan Grafik Akumulasi
  // Broker") — net gabungan SEMUA broker per hari dalam rentang tanggal
  // yang sedang dilihat.
  // ==========================================
  brokerStalkerRawRows: [],
  brokerStalkerDailyNet: [], // [{date, net}], urut lama->baru
  brokerStalkerPeriod: "today", // "today" | "1w" | "1m" | "3m" | "range"
  brokerStalkerRangeFrom: "", brokerStalkerRangeTo: "",
  brokerStalkerDateFrom: null, brokerStalkerDateTo: null, // rentang tanggal AKTUAL yang dipakai query terakhir
  brokerStalkerSort: "net", // "net" | "buy" | "sell" | "vol"
  brokerStalkerFilterType: null, // null (semua) | "asing" | "lokal"
  brokerStalkerResultSearch: "", // cari broker/saham di dalam hasil (client-side)
  brokerStalkerChartOpen: false,
  // Tab Broker Summary: top 5 broker buy/sell per saham per tanggal.
  // Data diisi MANUAL (dari screenshot akun Stockbit sendiri) lewat
  // form atau tempel CSV — bukan hasil scraping otomatis.
  bsStockCode: "", bsDate: todayLocalISO(),
  bsRows: [], bsEditRows: [], bsLoading: false,
  bsEditorOpen: false, bsMsg: "", bsMsgError: false, bsCsvText: "",
  // Mode "Periode" (rentang tanggal) — sama seperti versi di modal Detail
  // Emiten (detailBsRangeMode dkk.), tapi untuk tab Broker Summary utama ini
  // yang tidak terkunci ke satu ticker. Murni untuk MELIHAT agregasi Top 5
  // Buy/Sell selama rentang tanggal; edit manual tetap lewat mode tanggal
  // tunggal di atas.
  bsRangeMode: false, bsDateFrom: "", bsDateTo: "",
  bsRangeAgg: null, bsRangeDatesCount: 0,
  // Broker Summary versi di dalam modal Detail Emiten (terkunci ke
  // ticker yang sedang dibuka, tabel Supabase sama dengan di atas).
  detailBsDate: todayLocalISO(),
  detailBsRows: [], detailBsEditRows: [], detailBsLoading: false,
  detailBsEditorOpen: false, detailBsMsg: "", detailBsMsgError: false, detailBsCsvText: "",
  // Mode "Periode" (rentang tanggal) untuk Broker Summary di modal Detail —
  // lihat loadDetailBrokerSummary(). Beda dengan mode tanggal tunggal di atas
  // (yang juga dipakai untuk edit manual per hari), mode ini murni untuk
  // MELIHAT agregasi Top 5 Buy/Sell selama rentang tanggal (tidak bisa diedit
  // di sini — editor manual tetap lewat mode tanggal tunggal).
  detailBsRangeMode: false, detailBsDateFrom: "", detailBsDateTo: "",
  detailBsRangeAgg: null, detailBsRangeDatesCount: 0,
  // ==========================================
  // Tab "🎯 Target Bandar": dibangun DI ATAS data broker_summary yang
  // sudah ada (top 5 buy/sell manual per hari). Tiga bagian:
  // 1) Top 5 Bandar per emiten (agregat & klasifikasi selama N hari)
  // 2) Kalkulator Target Harga (Avg Bandar + ATR14 -> R1 / Max)
  // 3) Summary & Performance (hit-rate dari riwayat kalkulasi vs
  //    histori harga close asli di tabel `flows`)
  // ==========================================
  targetStockCode: "", targetWindowDays: 20,
  targetLoading: false, targetMsg: "", targetMsgError: false,
  targetBandarRows: [], targetTopBandar: [], targetWindowActualDays: 0,
  targetAvgBandar: null, targetCurrentPrice: null, targetAtr14: null, targetLevels: null,
  targetSummaryScope: "ticker", // "ticker" = emiten ini saja, "all" = semua emiten
  targetHistory: [], targetHistoryLoading: false,
  // ==========================================
  // Tab "🎯 Entry Price Scanner" — dibangun DI ATAS data broker_summary
  // yang sama (bukan tabel baru), tapi dipakai LINTAS SEMUA saham
  // sekaligus (bukan 1 ticker seperti Target Bandar). Lihat blok komentar
  // besar "ENTRY PRICE SCANNER" di dekat fungsi runEntryPriceScan() untuk
  // penjelasan lengkap logika & keterbatasannya.
  // ==========================================
  epsScanning: false, epsMsg: "", epsMsgError: false,
  epsRaw: null, // hasil scan mentah (per saham, per hari, per tipe broker) — lihat runEntryPriceScan()
  epsResults: [], // hasil scan yang SUDAH kena filter+urut aktif — dihitung ulang instan dari epsRaw
  epsFilters: {
    periode: "1w",          // "1w" | "2w" | "1m"
    broker: "both",         // "asing" | "lokal" | "both"
    konvergensi: "all",     // "all" | "menyatu" | "diam" | "menjauh"
    tanjakan: "all",        // "all" | "menanjak" | "menyalip"
    minMutu: 0,             // 0 = semua; situs: 64 | 72 | 80
    minAkum: 0,             // Rp, 0 = semua; hanya net buy positif
    minGap: "all",          // "all" | "minus2" | "minus5" | "minus10" | "minus15"
    urut: new Set(["konvergensi","tanjakan"])  // bisa digabung; lihat EPS_SORTERS
  },
  epsInfoOpen: false,
  // ==========================================
  // Tab "⬢ Kraken Flow (ORCA)" — order-flow/bandarmology screener yang
  // meniru fitur "ORCA System" di ihsgscreener.com. BEDA dari Entry Price
  // Scanner: tidak butuh scan/fetch terpisah — semua sinyalnya dihitung
  // LANGSUNG dari snapshot EOD yang sudah ada di state.stocks (bid,
  // bidVolume, offer, offerVolume, avgTicket, crossingPct, frequency,
  // cClose/cHigh, foreignNet1D/5D/20D — semua kolom ini SUDAH dipetakan
  // di loadLive(), lihat komentar "Antrian bid/offer terbaik" & "Bandarmologi
  // ASLI dari IDX" di atas). Jadi tab ini reaktif — tidak ada tombol "Scan",
  // hasil langsung update tiap filter diubah (lihat computeOrcaResults()).
  //
  // UPDATE: bid/offer sekarang disimpan HISTORIS per hari di `flows`
  // (lihat sync-idx-full.mjs & sql/07_flows_bid_offer.sql) — jadi
  // "Durasi" di bawah bisa benar-benar mengagregasi SEMUA parameter
  // (Bid/Offer, ATS, Non-Regular, Frequency, dst) lewat jendela N hari,
  // bukan cuma Foreign+ seperti sebelumnya. Datanya ditarik LAZY (sekali,
  // 7 hari bursa terakhir) lewat ensureOrcaHistoryLoaded() begitu tab ini
  // dibuka — lihat orcaHistory* di bawah & loadOrcaHistory(). Selama
  // masih loading atau untuk tanggal SEBELUM migration 07 dijalankan
  // (bid/offer historis masih NULL), filter otomatis jatuh balik ke
  // snapshot hari terakhir dari state.stocks supaya tab tetap terpakai.
  // ==========================================
  orcaFilters: new Set(), // subset dari ORCA_FILTER_DEFS: bidOffer, ats, noSell, closeHigh, nonRegular, topVolume, frequency, foreignPlus, offerSlender
  orcaDuration: 3,        // 1..7 "hari" — jendela agregasi utk semua filter (lihat computeOrcaResults()) + Foreign+ (1D/5D/20D)
  orcaMarketCap: "all",   // all | 1t | 5t | 10t | 50t | 100t | custom
  orcaCustomCapT: "",     // dipakai kalau orcaMarketCap === "custom" (nilai dalam Triliun Rupiah)
  orcaMinAts: 0,          // 0 | 2e9 | 5e9 — "Filter Kuat" khusus Offer's Slender
  orcaMinFreq: 0,         // 0 | 2000 | 5000 — "Filter Kuat" khusus Offer's Slender
  orcaSearch: "",
  orcaInfoOpen: false,
  // Histori mentah dari `flows` (7 hari bursa terakhir, SEMUA emiten),
  // ditarik sekali lewat ensureOrcaHistoryLoaded() — map ticker -> array
  // baris harian terurut TERBARU dulu. computeOrcaResults() menghitung
  // ulang agregat jendela N-hari dari sini secara instan tiap render,
  // tanpa fetch ulang tiap kali Durasi diubah.
  orcaHistoryByTicker: null,
  orcaHistoryLoading: false,
  orcaHistoryError: null,
  orcaHistoryLoadedAt: null,
  // ==========================================
  // Live Data Stockbit (opsional, via token extension Chrome milik user).
  // stockbitLive: map ticker -> {loading, error, raw, mapped, fetchedAt}
  // Hanya diisi kalau user menekan tombol "Tarik" — tidak otomatis, supaya
  // tidak menghabiskan rate limit/kena banned dari akun Stockbit sendiri.
  // ==========================================
  stockbitToken: "", stockbitQuoteEndpoint: STOCKBIT_DEFAULT_QUOTE_EP,
  stockbitBrokerEndpoint: STOCKBIT_DEFAULT_BROKER_EP, stockbitProxyUrl: "",
  stockbitHistoricalEndpoint: STOCKBIT_DEFAULT_HISTORICAL_EP,
  detailHistoricalPeriod: "daily", detailHistoricalRows: [],
  detailHistoricalLoading: false, detailHistoricalMsg: "", detailHistoricalMsgError: false,
  // Panel "Bandingkan dengan IDX (flows)" di tab Historical Data — lihat
  // loadDetailCompare(). Cuma dihitung on-demand (klik tombol), tidak
  // otomatis, karena butuh 1 fetch tambahan ke tabel `flows`.
  detailCompareRows: [], detailCompareLoading: false, detailCompareMsg: "", detailCompareOpen: false,
  stockbitTokenExpiresAt: null, stockbitTokenSyncedAt: null, stockbitTokenSource: "manual",
  // Waktu (Date.now()) request Stockbit APA SAJA (quote, broker summary,
  // historical) terakhir kali benar-benar sukses — lihat stockbitRawRequest().
  // Dipakai buat banner status supaya user tahu data live basi sejak kapan
  // tanpa harus buka console. null = belum pernah berhasil sama sekali.
  stockbitLastSuccessAt: null,
  stockbitLive: {}, stockbitBulkLoading: false, stockbitBulkProgress: null,
  stockbitAutoRefresh: false, stockbitAutoRefreshIntervalSec: 60,
  // Riwayat Value (Rp) harian dari Stockbit per ticker, dipakai Smart Pick —
  // lihat catatan lengkap di loadLive() dan spStockbitValueRatio().
  stockbitValueHistory: {},
  // Riwayat OHLC harian untuk kalkulasi harga tertinggi selama periode backtest.
  stockbitPriceHistory: {},
  // Tarik otomatis Top 5 Broker Buy/Sell (jumlah hari bursa bisa diatur
  // lewat input di UI, default 10) HANYA untuk ticker yang dicentang
  // (state.selectedForBacktest) — lihat fetchAndSaveBrokerSummaryBulk().
  stockbitBrokerBulkLoading: false, stockbitBrokerBulkProgress: null, stockbitBrokerBulkResults: [],
  bsAutoBulkDays: 10,
  // Periode Tarik Otomatis sekarang dipilih lewat tanggal Dari–Sampai (bukan cuma "N hari
  // terakhir"), supaya bisa ambil rentang tanggal bebas di masa lalu, bukan cuma mundur dari
  // hari ini. Default diisi otomatis saat pertama render (lihat renderBrokerSummary) mengikuti
  // bsAutoBulkDays lama supaya perilaku awal tetap sama.
  bsAutoBulkFrom: null, bsAutoBulkTo: null,
  bsBulkResultsOpen: true, // status buka/tutup panel hasil Tarik Otomatis (accordion panah)
  // Tarik otomatis Historical Data (Daily) HANYA untuk ticker yang dicentang
  // di tab Screener — lihat fetchAndSaveHistoricalBulk(). Beda dengan broker
  // summary, endpoint historical TIDAK menerima rentang tanggal (cuma
  // {ticker}+{period}), jadi tiap ticker cukup 1x request lalu hasilnya
  // disaring ke rentang Dari-Sampai yang dipilih di UI.
  stockbitHistoricalBulkLoading: false, stockbitHistoricalBulkProgress: null, stockbitHistoricalBulkResults: [],
  hdAutoBulkFrom: null, hdAutoBulkTo: null,
  hdBulkResultsOpen: true,
  // Daftar ticker custom dari upload .txt (lihat parseTickerListTxt() &
  // resolveBulkTickers()) -- kalau diisi, dipakai sebagai target untuk
  // SEMUA tombol bulk (Live Stockbit, Broker Summary, Historical Data),
  // menggantikan sementara centang baris/filter tabel. Dikosongkan lagi
  // lewat tombol "✕" di sebelah label jumlah ticker.
  uploadedBulkTickers: [], uploadedBulkTickersFileName: null,
  // ==========================================
  // 🧪 WS DEBUG — buffer traffic WebSocket Stockbit yang direkam ekstensi
  // Chrome (inject.js -> content_stockbit.js -> background.js ->
  // content_screener.js -> window.postMessage 'FROM_EXTENSION_WS_TRAFFIC').
  // Lihat listener globalnya & renderWsDebug(). HANYA terisi kalau
  // wsDebugRecording true -- lihat catatan lengkap di listenernya.
  // ==========================================
  wsDebugRecording: false,
  wsDebugFrames: [], // {ts, direction:"send"|"recv", url, data}
  wsDebugMaxFrames: 500,
  wsDebugFilterDir: "all", // "all" | "send" | "recv"
  wsDebugFilterUrl: "",
  // ==========================================
  // Notifikasi Telegram (tabel telegram_settings di Supabase, dieksekusi
  // oleh Edge Function `telegram-notifier` yang dijadwalkan Cron server —
  // lihat sql/06_telegram_notifikasi.sql). State di sini cuma cerminan
  // untuk ditampilkan/diedit di ⚙️ Pengaturan, sumber kebenarannya tetap
  // tabel telegram_settings.
  // ==========================================
  telegramBotToken: "", telegramChatId: "", telegramEnabled: false,
  telegramOnlyMarketHours: true, telegramPresetIds: [],
  telegramFunctionUrl: "", telegramLoading: false,
  // ==========================================
  // Analisis AI (Gemini) — dipanggil langsung dari browser ke Google pakai
  // API key milik user (lihat ⚙️ Pengaturan). geminiAnalysis/geminiError
  // di-cache per ticker (Map) supaya tidak minta ulang ke Gemini tiap kali
  // modal Detail Emiten dibuka/ditutup untuk ticker yang sama — user tetap
  // bisa klik "🔄 Analisis Ulang" untuk memaksa refresh.
  // ==========================================
  geminiApiKey: "", geminiModel: GEMINI_DEFAULT_MODEL,
  geminiLoading: new Set(), geminiAnalysis: new Map(), geminiError: new Map(), geminiLevels: new Map(),
  telegramLastRunAt: null, telegramLastRunNote: null,
  telegramTestMsg: "", telegramTestMsgError: false, telegramTesting: false,
  // ==========================================
  // Tab "✨ Smart Pick": 5 sinyal siap-pakai (Area Demand, Throwback/Retest
  // Breakout, Liquidity Sweep, Bull Divergence, Early Breakout) dihitung
  // dari data live yang SUDAH ADA di enriched() — bukan model AI beneran,
  // cuma scoring rule-based dikemas mirip "AI Screener" ala Stockbit.
  // Hasil di kartu = live/hari-ini saja (bisa berubah tiap refresh).
  // Begitu "✓ Finalisasi Signal (EOD)" ditekan (idealnya setelah market
  // close), snapshot hari itu (ticker+signal+harga entry) dikunci ke
  // tabel Supabase `smart_pick_signals` supaya performanya (win rate,
  // rata-rata return) bisa dilacak dari waktu ke waktu — lihat
  // sql/07_smart_pick.sql.
  // ==========================================
  spOpenCriteria: null, // id sinyal yang panel "Kriteria"-nya sedang terbuka
  spRecapCollapsed: (localStorage.getItem("ihsg_sp_recap_collapsed") === "1"),
  spFinalizing: false, spMsg: "", spMsgError: false,
  spFilterType: "all", spFrom: "", spTo: "",
  spHistory: [], spHistoryLoading: false,
  spListOpenDefId: null
};

function fmtNum(n){ if(n===null||n===undefined) return "-"; return new Intl.NumberFormat("id-ID").format(n); }
function fmtDateID(iso){ // "2026-08-24" atau timestamp -> "24/08/2026"
  if(!iso) return "-";
  const raw = String(iso).slice(0, 10);
  const [y,m,d] = raw.split("-");
  if(!y||!m||!d || y.length !== 4) return iso;
  return `${d}/${m}/${y}`;
}
// ==========================================
// HARI SEJAK TANGGAL ENTRY — dipakai kolom "Hari" di tab Backtest.
// Dihitung dari tanggal kalender lokal (bukan selisih ms mentah, supaya
// tidak kepengaruh jam/timezone — lihat catatan toLocalISODate di atas).
// Menerima "YYYY-MM-DD"; kalau kosong/tidak valid, return null (dirender "-").
// ==========================================
function daysSinceEntry(entryDateIso){
  if(!entryDateIso) return null;
  const parts = String(entryDateIso).slice(0, 10).split("-").map(Number);
  if(parts.length !== 3 || parts.some(isNaN)) return null;
  const [y,m,d] = parts;
  const entry = new Date(y, m-1, d);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffDays = Math.round((today - entry) / 86400000);
  return diffDays < 0 ? 0 : diffDays;
}
function numOrNull(n){ if(n===null||n===undefined||n==="") return null; const v=parseFloat(n); return isNaN(v) ? null : v; }
function boolLabel(v){
  if(v===true || v==="true" || v==="Ya" || v===1 || v==="1") return "Ya";
  if(v===false || v==="false" || v==="Tidak" || v===0 || v==="0") return "Tidak";
  return v ?? "-";
}
function pillHtml(text, tone){ return `<span class="pill pill-${tone}">${text}</span>`; }
function trendTone(t){
  t = String(t||"");
  if(t.indexOf("Bullish")===0) return "up";
  if(t.indexOf("Bearish")===0) return "down";
  if(t.indexOf("Sideways")===0) return "gold";
  return "muted";
}
function polaTone(p){
  p = String(p||"");
  if(p==="-"||!p) return "muted";
  if(p.indexOf("Bullish")>=0 || p.indexOf("Hammer")===0 || p.indexOf("Inverted Hammer")>=0) return "up";
  if(p.indexOf("Bearish")>=0 || p.indexOf("Shooting Star")>=0 || p.indexOf("Hanging Man")>=0) return "down";
  if(p.indexOf("Doji")>=0) return "gold";
  return "muted";
}
function valuasiTone(v){
  v = String(v||"");
  if(/murah|undervalued/i.test(v)) return "up";
  if(/mahal|overvalued/i.test(v)) return "down";
  if(/wajar|fair/i.test(v)) return "gold";
  return "muted";
}
function rsiGaugeHtml(value){
  if(value===null||value===undefined||isNaN(value)) return `<span class="mono" style="color:var(--muted);font-size:11px;">-</span>`;
  const pct=Math.max(0,Math.min(100,value));
  const angle=(pct/100)*180-90;
  const color = pct<=30 ? "var(--down)" : pct>=70 ? "var(--up)" : "var(--gold)";
  const cx=15+11*Math.sin(angle*Math.PI/180), cy=16-11*Math.cos(angle*Math.PI/180);
  return `<div class="gauge-wrap">
    <svg width="30" height="18" viewBox="0 0 30 18">
      <path d="M2,16 A13,13 0 0 1 28,16" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="3" stroke-linecap="round"/>
      <path d="M2,16 A13,13 0 0 1 28,16" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-dasharray="${(pct/100)*40.8} 40.8"/>
      <circle cx="${cx}" cy="${cy}" r="1.6" fill="${color}" style="filter: drop-shadow(0 0 2px ${color});"/>
    </svg>
    <span class="mono" style="color:${color};font-size:11.5px;font-weight:700;">${value.toFixed(1)}</span>
  </div>`;
}

function loadSettings(){
  try{ const wl=JSON.parse(localStorage.getItem(LS_WATCHLIST)||"[]"); state.watchlist=new Set(wl); }catch(e){}
  try{ state.backtests=JSON.parse(localStorage.getItem(LS_BACKTEST)||"[]"); }catch(e){}
  try{ state.portfolio=JSON.parse(localStorage.getItem(LS_PORTO)||"[]"); }catch(e){}
  try{
    const saved = JSON.parse(localStorage.getItem(LS_VISIBLE_COLS)||"null");
    state.visibleCols = new Set(Array.isArray(saved) ? saved : DEFAULT_VISIBLE_COLS);
  }catch(e){ state.visibleCols = new Set(DEFAULT_VISIBLE_COLS); }
  try{ state.freqAnalyzerCol = localStorage.getItem(LS_FREQ_ANALYZER_COL) || "freq_ma20"; }catch(e){ state.freqAnalyzerCol = "freq_ma20"; }
  state.bsjpParams = loadBsjpParams();
  try{
    state.stockbitToken = sanitizeStockbitToken(localStorage.getItem(LS_STOCKBIT_TOKEN) || "");
    state.stockbitQuoteEndpoint = localStorage.getItem(LS_STOCKBIT_QUOTE_EP) || STOCKBIT_DEFAULT_QUOTE_EP;
    // Guard: endpoint lama (marketdetectors dengan {from}/{to}) tidak punya
    // placeholder {date} yang wajib dipakai fetcher sekarang — kalau masih
    // tersimpan di localStorage, paksa balik ke default terverifikasi.
    const savedBrokerEp = localStorage.getItem(LS_STOCKBIT_BROKER_EP) || "";
    state.stockbitBrokerEndpoint = (savedBrokerEp && savedBrokerEp.includes("{date}")) ? savedBrokerEp : STOCKBIT_DEFAULT_BROKER_EP;
    state.stockbitHistoricalEndpoint = localStorage.getItem(LS_STOCKBIT_HISTORICAL_EP) || STOCKBIT_DEFAULT_HISTORICAL_EP;
    state.stockbitProxyUrl = localStorage.getItem(LS_STOCKBIT_PROXY) || "";
    const savedSrc = localStorage.getItem(LS_STOCKBIT_TOKEN_SOURCE);
    if(savedSrc === "extension" || savedSrc === "manual") state.stockbitTokenSource = savedSrc;
    const savedSyncedAt = parseInt(localStorage.getItem(LS_STOCKBIT_TOKEN_SYNCED_AT), 10);
    if(Number.isFinite(savedSyncedAt)) state.stockbitTokenSyncedAt = savedSyncedAt;
  }catch(e){}
  try{
    state.stockbitAutoRefresh = localStorage.getItem(LS_STOCKBIT_AUTOREFRESH) === "1";
    const savedSec = parseInt(localStorage.getItem(LS_STOCKBIT_AUTOREFRESH_SEC), 10);
    state.stockbitAutoRefreshIntervalSec = (Number.isFinite(savedSec) && savedSec >= STOCKBIT_AUTOREFRESH_MIN_SEC) ? savedSec : 60;
  }catch(e){}
  try{
    const savedRules = JSON.parse(localStorage.getItem(LS_CUSTOM_RULES)||"[]");
    state.customRules = Array.isArray(savedRules) ? savedRules : [];
  }catch(e){ state.customRules = []; }
  try{ state.telegramFunctionUrl = localStorage.getItem(LS_TELEGRAM_FUNCTION_URL) || ""; }catch(e){}
  try{
    state.geminiApiKey = localStorage.getItem(LS_GEMINI_API_KEY) || "";
    state.geminiModel = localStorage.getItem(LS_GEMINI_MODEL) || GEMINI_DEFAULT_MODEL;
  }catch(e){}
}
function saveVisibleCols(){ localStorage.setItem(LS_VISIBLE_COLS, JSON.stringify([...state.visibleCols])); }
function toggleColumn(key){
  if(state.visibleCols.has(key)) state.visibleCols.delete(key); else state.visibleCols.add(key);
  saveVisibleCols(); render();
}
function setColumnPreset(preset){
  if(preset === "ringkas") state.visibleCols = new Set(DEFAULT_VISIBLE_COLS);
  else if(preset === "semua") state.visibleCols = new Set(SCREENER_COLUMNS.map(c=>c.key));
  else if(preset === "kosong") state.visibleCols = new Set();
  saveVisibleCols(); render();
}
function saveWatchlist(){ localStorage.setItem(LS_WATCHLIST, JSON.stringify([...state.watchlist])); }
function saveBacktests(){ localStorage.setItem(LS_BACKTEST, JSON.stringify(state.backtests)); }
function savePortoLocal(){ localStorage.setItem(LS_PORTO, JSON.stringify(state.portfolio)); }

function bandarmologi(row, ratio){
  const naik = row.cClose>row.cOpen;
  if(ratio>=1.5 && naik) return {label:"Indikasi Akumulasi", tone:"up"};
  if(ratio>=1.5 && !naik) return {label:"Indikasi Distribusi", tone:"down"};
  if(ratio>=1.0 && naik) return {label:"Minat Beli Naik", tone:"up"};
  if(ratio>=1.0 && !naik) return {label:"Tekanan Jual", tone:"down"};
  return {label:"Netral", tone:"muted"};
}
function volumeSignal(row, ratio){
  let label, tone;
  if(ratio>=2)      { label="Sangat Tinggi"; tone="up"; }
  else if(ratio>=1.5){ label="Tinggi"; tone="up"; }
  else if(ratio>=0.8){ label="Normal"; tone="muted"; }
  else               { label="Rendah"; tone="down"; }
  return { ratio, label, tone };
}
// ==========================================
// FREQUENCY ANALYZER (mirip kolom "Frequency" di screener Stockbit)
//
// "Frekuensi" = jumlah transaksi (kali matched) suatu saham dalam sehari —
// beda dari Volume (jumlah lembar/lot). Frekuensi tinggi dengan volume
// relatif kecil sering menandakan banyak investor ritel aktif keluar-masuk
// (bukan satu order besar), jadi dianalisis terpisah dari Volume.
//
// Rasio dihitung dari `frequency / freqAnalyzer` kalau backend sudah mengirim
// rata-rata 20 hari (freq_ma20); kalau kolom itu belum ada di skema DB,
// ratio-nya null dan UI menampilkan "-" (bukan 0) — sama seperti pola
// avgVolume3m/vol_ma20 di atas.
// ==========================================
function frequencySignal(ratio){
  if(ratio===null || ratio===undefined || isNaN(ratio)) return { ratio:null, label:"-", tone:"muted" };
  let label, tone;
  if(ratio>=2.5)      { label="Sangat Ramai"; tone="up"; }
  else if(ratio>=1.5) { label="Ramai"; tone="up"; }
  else if(ratio>=0.7) { label="Normal"; tone="muted"; }
  else                { label="Sepi"; tone="down"; }
  return { ratio, label, tone };
}
function keyakinanNaik(row, vol){
  let score=0;
  if(row.cekHarga && row.cekHarga.includes("crossup")) score+=25;
  else if(row.cekHarga && row.cekHarga.includes("diatas ema 21 L")) score+=10;
  if(row.cekRsi && row.cekRsi.includes("cross up")) score+=20;
  if(row.statusRsi==="bullish") score+=15;
  else if(row.statusRsi==="netral") score+=5;
  if(row.cekMacd && (row.cekMacd.includes("Buy")||row.cekMacd.includes("Bullish"))) score+=25;
  if((vol.label==="Tinggi"||vol.label==="Sangat Tinggi") && row.cClose>row.cOpen) score+=15;
  score = Math.min(100, score);
  let label, tone;
  if(score>=70)      { label="Tinggi"; tone="up"; }
  else if(score>=40) { label="Sedang"; tone="gold"; }
  else                { label="Rendah"; tone="down"; }
  return { score, label, tone };
}
function keyakinanToneFromLabel(label){
  const l = String(label||"");
  if(/^Sangat Tinggi|^Tinggi/.test(l)) return "up";
  if(/^Sedang/.test(l)) return "gold";
  if(/^Waspada|^Sangat Waspada/.test(l)) return "down";
  if(/^Rendah/.test(l)) return "down";
  return "muted";
}

// ==========================================
// SKOR BAGGER — implementasi persis dari formula_screening_saham_bagger.md
//
// Composite score 0-100 = Fundamental (40) + Momentum Teknikal (35) +
// Volume/Smart Money (25). Tiap sub-kriteria pass/fail sesuai section 2
// file .md tsb (tidak ada nilai parsial), supaya hasilnya bisa diaudit
// satu-satu lewat breakdown di Detail Emiten > tab Analisa.
//
// ≥75 = kandidat kuat, 50-74 = menarik tunggu konfirmasi, <50 = skip.
// Red flag (section 4 file .md) dihitung terpisah dari skor — dipakai
// sebagai peringatan tambahan, bukan pengurang skor.
// ==========================================
function computeBaggerScore(s){
  const num = v => (v===null || v===undefined || v==="" || isNaN(v)) ? null : Number(v);
  const rsi14 = num(s.rsi14);
  const rsiCrossUp = String(s.cekRsi||"").toLowerCase().includes("cross up");

  const fundItems = [
    { label:"Revenue Growth > 15%", pass: num(s.revenueGrowth) > 15, points:10 },
    { label:"Earnings Growth > 20%", pass: num(s.earningsGrowth) > 20, points:10 },
    { label:"ROE > 15%", pass: num(s.roe) > 15, points:10 },
    { label:"DER < 0,8", pass: num(s.der) != null && num(s.der) < 0.8, points:5 },
    { label:"PEG < 1", pass: num(s.peg) != null && num(s.peg) > 0 && num(s.peg) < 1, points:5 },
  ];

  const momItems = [
    { label:"RSI7 cross up RSI21 (RSI14 < 70)", pass: rsiCrossUp && rsi14 != null && rsi14 < 70, points:10 },
    { label:"MACD Histogram negatif → positif", pass: num(s.prevMacdHist) != null && num(s.hist) != null && num(s.prevMacdHist) <= 0 && num(s.hist) > 0, points:10 },
    { label:"Harga > MA21 > MA50 > MA200", pass: [s.cClose,s.ma21,s.ma50,s.ma200].every(v=>v!=null) && s.cClose > s.ma21 && s.ma21 > s.ma50 && s.ma50 > s.ma200, points:10 },
    { label:"Stoch K cross up Stoch D dari oversold", pass: [s.prevStochK,s.prevStochD,s.stochK,s.stochD].every(v=>v!=null) && s.prevStochK < s.prevStochD && s.stochK > s.stochD && s.prevStochK <= 30, points:5 },
  ];

  const volItems = [
    { label:"Volume Ratio > 1,5x", pass: num(s.volRatio) > 1.5, points:10 },
    { label:"Foreign Net 5D > 0 & Hari Asing+ ≥ 3", pass: num(s.foreignNet5D) > 0 && num(s.foreignUpDays) >= 3, points:10 },
    { label:"BB Squeeze lalu breakout EMA21 H", pass: String(s.isBBSqueeze||"").includes("Ya") && s.cClose != null && s.ema21H != null && s.cClose > s.ema21H, points:5 },
  ];

  const sum = items => items.reduce((a,i)=> a + (i.pass ? i.points : 0), 0);
  const fundScore = sum(fundItems), momScore = sum(momItems), volScore = sum(volItems);
  const total = fundScore + momScore + volScore;

  let tier, tone;
  if (total >= 75) { tier = "Kandidat Kuat"; tone = "up"; }
  else if (total >= 50) { tier = "Menarik, Tunggu Konfirmasi"; tone = "gold"; }
  else { tier = "Skip"; tone = "down"; }

  // Red flag — section 4 formula.md
  const flags = [];
  if (String(s.valuasi||"").includes("Kemahalan") && rsi14 != null && rsi14 > 80) {
    flags.push("Valuasi Overvalued + RSI14 > 80 → rawan profit taking, hati-hati entry baru (pola ini persis kasus AADI di contoh formula).");
  }
  const der = num(s.der), currentRatio = num(s.currentRatio);
  if (der != null && der > 1 && currentRatio != null && currentRatio < 1) {
    flags.push("DER tinggi (>1) & Current Ratio < 1 → risiko keuangan, gain teknikal bisa berbalik cepat kalau ada bad news.");
  }
  const fn5 = num(s.foreignNet5D), fn20 = num(s.foreignNet20D);
  if (num(s.volRatio) > 1.5 && fn5 != null && fn5 < 0 && fn20 != null && fn20 < 0) {
    flags.push("Volume breakout tapi Net Asing negatif terus → kemungkinan cuma ritel/bandar lokal, lebih rawan distribusi.");
  }
  const pola = String(s.polaCandle||"");
  if (/bearish|shooting star|hanging man/i.test(pola) && s.resistance != null && s.cClose != null && s.cClose >= s.resistance*0.98) {
    flags.push("Pola candle bearish reversal di area resisten kuat → tunda entry meski skor fundamental tinggi.");
  }

  return { total, fundScore, momScore, volScore, fundItems, momItems, volItems, tier, tone, flags };
}

// ==========================================
// SKOR GABUNGAN (Fundamental 0–60 + Teknikal 0–40)
//
// Screener publik acuan menampilkan skor gabungan dengan struktur
// "Fundamental X/60 · Teknikal Y/40" tetapi tidak mempublikasikan rumus
// pastinya. Versi di bawah adalah rekonstruksi TRANSPARAN: tiap
// sub-kriteria punya poin tetap & bisa dilihat breakdown-nya di UI.
// Kriteria fundamental dipinjam dari preset Deep Value/Multibagger/Growth
// yang terlihat publik; teknikal dari indikator standar yang sudah ada
// di DB (trend MA, MACD hist, RSI, stoch, posisi 52W).
// Null diperlakukan netral (poin tidak didapat, bukan didiskon ekstra).
// ==========================================
function computeFundTekScore(s){
  const num = v => (v===null || v===undefined || v==="" || isNaN(v)) ? null : Number(v);
  const per = num(s.per), pbv = num(s.pbv), roe = num(s.roe), der = num(s.der);
  const npm = num(s.npm), roa = num(s.roa);
  const revG = num(s.revenueGrowth), earnG = num(s.earningsGrowth);
  const divY = num(s.divYield);

  // --- Fundamental 60 poin ---
  // Setiap kelompok memakai tier yang saling eksklusif. Bobot maksimum:
  // ROE 15 + NPM 10 + DER 10 + PER 8 + PBV 5 + ROA 4 + Growth 4 + Dividen 4 = 60.
  const fundItems = [
    { label:"ROE ≥ 15%", pass: roe != null && roe >= 15, points:15 },
    { label:"ROE 8–15%", pass: roe != null && roe >= 8 && roe < 15, points:8 },
    { label:"NPM ≥ 10%", pass: npm != null && npm >= 10, points:10 },
    { label:"NPM 5–10%", pass: npm != null && npm >= 5 && npm < 10, points:5 },
    { label:"DER ≤ 1", pass: der != null && der <= 1, points:10 },
    { label:"DER 1–2", pass: der != null && der > 1 && der <= 2, points:5 },
    { label:"PER ≤ 15 & > 0", pass: per != null && per > 0 && per <= 15, points:8 },
    { label:"PER 15–25", pass: per != null && per > 15 && per <= 25, points:4 },
    { label:"PBV ≤ 1.5 & > 0", pass: pbv != null && pbv > 0 && pbv <= 1.5, points:5 },
    { label:"ROA ≥ 5%", pass: roa != null && roa >= 5, points:4 },
    { label:"Revenue Growth > 10%", pass: revG != null && revG > 10, points:2 },
    { label:"Earnings Growth > 10%", pass: earnG != null && earnG > 10, points:2 },
    { label:"Dividend Yield ≥ 2%", pass: divY != null && divY >= 2, points:4 },
  ];

  // --- Teknikal 40 poin ---
  const trendBull = String(s.trendHarga||"").indexOf("Bullish") === 0;
  const macdUp = num(s.prevMacdHist) != null && num(s.hist) != null && num(s.prevMacdHist) <= 0 && num(s.hist) > 0;
  const macdPos = num(s.hist) != null && num(s.hist) > 0;
  const rsiSehat = num(s.rsi7) != null && num(s.rsi7) >= 50 && num(s.rsi7) <= 75;
  const stochCross = [s.prevStochK,s.prevStochD,s.stochK,s.stochD].every(v=>v!=null) && s.prevStochK < s.prevStochD && s.stochK > s.stochD;
  const pos52 = num(s.pos52w) ?? spPos52w(s);
  const priceVsMa50 = s.cClose != null && num(s.ma50) != null ? s.cClose > num(s.ma50) : null;

  const techItems = [
    { label:"Trend Bullish (MA)", pass: trendBull, points:10 },
    { label:"MACD Histogram positif", pass: macdPos, points:5 },
    { label:"MACD cross up (neg → pos)", pass: macdUp, points:5 },
    { label:"RSI 7 di 50–75", pass: rsiSehat, points:5 },
    { label:"Stoch K cross up D", pass: stochCross, points:5 },
    { label:"Harga > MA50", pass: priceVsMa50 === true, points:5 },
    { label:"Posisi 52W ≤ 60%", pass: pos52 != null && pos52 <= 60, points:5 },
  ];

  const sum = items => items.reduce((a,i)=> a + (i.pass ? i.points : 0), 0);
  const fund = Math.min(60, sum(fundItems));
  const tech = Math.min(40, sum(techItems));
  const total = fund + tech;

  let label, tone;
  if (total >= 80) { label = "Sangat Kuat"; tone = "up"; }
  else if (total >= 65) { label = "Kuat"; tone = "up"; }
  else if (total >= 50) { label = "Cukup Baik"; tone = "gold"; }
  else { label = "Lemah"; tone = "down"; }

  return { total, fund, tech, fundItems, techItems, label, tone };
}

// ==========================================
// BSJP — "Beli Sore, Jual Pagi" ENGINE
//
// Terinspirasi struktur strategi momentum institusional ala
// idx-bsjp-screener: entry di jendela Pre-Closing/Post-Closing Auction
// (15:50–16:15 WIB), exit di jendela liquidity surge sesi berikutnya
// (09:00–09:30 WIB). Filter deterministik 8 kriteria + skor komposit
// 0–100, lalu trade plan otomatis (Entry/TP1/TP2/Stop-loss/R:R).
//
// Semua threshold BISA DIUBAH lewat panel di tab BSJP (state.bsjpParams),
// disimpan ke localStorage supaya tidak hilang setelah reload.
// ==========================================
const BSJP_DEFAULT_PARAMS = {
  minTurnover: 5e9,        // Kriteria 1: turnover harian minimum (Rp)
  minVolRatio: 1.5,        // Kriteria 2: vs 20-day Average Daily Volume
  minChangePct: 2.0,       // Kriteria 3: kenaikan harian minimum
  maxChangePct: 15.0,      // Kriteria 3: kenaikan harian maksimum (hindari ARA)
  closeProximity: 0.25,    // Kriteria 4: Close harus di top X% dari range hari itu
  minBidAskRatio: 1.10,    // Kriteria 7: rasio antrian bid/offer minimum
  tp1Pct: 2.0, tp2Pct: 3.4, slPct: 2.5 // Trade plan default (%)
};
const LS_BSJP_PARAMS = "ihsg_bsjp_params_v1";

function loadBsjpParams(){
  try{
    const raw = localStorage.getItem(LS_BSJP_PARAMS);
    return raw ? { ...BSJP_DEFAULT_PARAMS, ...JSON.parse(raw) } : { ...BSJP_DEFAULT_PARAMS };
  }catch(e){ return { ...BSJP_DEFAULT_PARAMS }; }
}
function saveBsjpParams(){
  try{ localStorage.setItem(LS_BSJP_PARAMS, JSON.stringify(state.bsjpParams)); }catch(e){}
}

// Proxy Top-3 Buyer vs Top-3 Seller (CR3) — data broker_summary asli kalau
// tersedia (state.top3BrokerData, sama yang dipakai rule kustom "Top 3
// Broker"), fallback ke sinyal band.tone (proxy volume) + arah Net Asing
// 1D kalau broker_summary belum disinkron untuk emiten ini hari itu.
function bsjpCr3Proxy(s){
  const t3 = state.top3BrokerData && state.top3BrokerData[s.ticker];
  if (t3 && (t3.buy?.length || t3.sell?.length)) {
    // Tidak ada volume per-broker di top3BrokerData (hanya daftar kode),
    // jadi dipakai sebagai sinyal biner: broker Top-3 Beli tercatat & tidak
    // overlap penuh dengan Top-3 Jual → indikasi akumulasi net oleh pihak berbeda.
    const buySet = new Set(t3.buy||[]), sellSet = new Set(t3.sell||[]);
    const overlap = [...buySet].filter(b=>sellSet.has(b)).length;
    return { value: null, pass: buySet.size > 0 && overlap < buySet.size, source: "broker_summary" };
  }
  const bandUp = s.band && s.band.tone === "up";
  const foreignUp = (s.foreignNet1D || 0) > 0;
  return { value: null, pass: bandUp || foreignUp, source: "proxy" };
}

function computeBsjpEngine(s, params){
  const p = params || BSJP_DEFAULT_PARAMS;
  const num = v => (v===null || v===undefined || v==="" || isNaN(v)) ? null : Number(v);
  const turnover = num(s.turnover) ?? num(s.valueTraded);
  const volRatio = num(s.volRatio);
  const changePct = num(s.changePct);
  const cClose = num(s.cClose), cHigh = num(s.cHigh), cLow = num(s.cLow);
  const emaFast = num(s.ema20) ?? num(s.ma21);
  const emaSlow = num(s.ema50) ?? num(s.ma50);
  const bidVol = num(s.bidVolume), offerVol = num(s.offerVolume);
  const hasOrderbook = bidVol != null && offerVol != null && offerVol > 0;
  const bidAskRatio = hasOrderbook ? bidVol / offerVol : null;
  const cr3 = bsjpCr3Proxy(s);
  // Notasi Khusus / Papan Pemantauan Khusus (FCA) belum ada kolomnya di
  // skema stocks_screener saat ini — kalau suatu hari ditambahkan
  // (r.notasi_khusus / r.papan_pemantauan), otomatis ikut dicek di sini.
  const hasNotasiData = s.notasiKhusus !== undefined && s.notasiKhusus !== null;
  const isClean = !hasNotasiData || (!/[XBEM]/i.test(String(s.notasiKhusus)) && !/fca|watchlist/i.test(String(s.papanPemantauan||"")));

  const closeProximityOk = (cClose!=null && cHigh!=null && cLow!=null)
    ? cClose >= (cHigh - p.closeProximity * (cHigh - cLow))
    : null;
  const trendOk = (cClose!=null && emaFast!=null && emaSlow!=null) ? (cClose > emaFast && cClose > emaSlow) : null;

  const checks = [
    { label:`Turnover ≥ Rp ${fmtNum(p.minTurnover)}`, pass: turnover != null && turnover >= p.minTurnover, na: turnover == null },
    { label:`Volume Ratio > ${p.minVolRatio}x (vs 20-ADV)`, pass: volRatio != null && volRatio > p.minVolRatio, na: volRatio == null },
    { label:`Gain harian ${p.minChangePct}%–${p.maxChangePct}% (hindari ARA)`, pass: changePct != null && changePct >= p.minChangePct && changePct <= p.maxChangePct, na: changePct == null },
    { label:`Close di top ${(p.closeProximity*100).toFixed(0)}% range hari ini`, pass: !!closeProximityOk, na: closeProximityOk == null },
    { label:"Trend Alignment (Close > EMA20 & EMA50)", pass: !!trendOk, na: trendOk == null },
    { label:"Bandar Accumulation Proxy (CR3 / Net Asing)", pass: !!cr3.pass, na: false },
    { label:`Orderbook: Bid/Offer ≥ ${p.minBidAskRatio}x`, pass: hasOrderbook ? bidAskRatio >= p.minBidAskRatio : false, na: !hasOrderbook },
    { label:"Bebas Notasi Khusus / Papan Pemantauan Khusus", pass: isClean, na: !hasNotasiData }
  ];
  // Lolos filter deterministik: semua kriteria yang PUNYA DATA harus pass.
  // Kriteria tanpa data (na:true) tidak menggugurkan (dihitung netral),
  // supaya fitur tetap berjalan meski sebagian kolom belum tersinkron.
  const passedCount = checks.filter(c=>c.pass).length;
  const naCount = checks.filter(c=>c.na).length;
  const lolos = checks.every(c=>c.pass || c.na);

  // --- Skor komposit 0-100 ---
  const volSurgeScore = volRatio != null ? 25 * clamp01((volRatio - 1) / 3) : 12.5;
  const proximity = (cClose!=null && cHigh!=null && cLow!=null && (cHigh-cLow) > 0) ? (cClose - cLow) / (cHigh - cLow) : null;
  const priceStructScore = proximity != null ? 20 * clamp01(proximity) : 10;
  const bandarScore = (cr3.pass ? 15 : 0) + 10 * clamp01((num(s.foreignNet1D) || 0) / 5e9);
  const orderbookScore = hasOrderbook ? 15 * clamp01((bidAskRatio - 1) / 1) : 7.5;
  const trendTurnoverScore = (trendOk ? 8 : 0) + (turnover != null ? 7 * clamp01(turnover / 20e9) : 3.5);
  const score = Math.round(volSurgeScore + priceStructScore + bandarScore + orderbookScore + trendTurnoverScore);

  let signal, signalTone;
  if (changePct != null && changePct > p.maxChangePct) { signal = "OVEREXTENDED"; signalTone = "gold"; }
  else if (!lolos && naCount < checks.length) { signal = "AVOID"; signalTone = "down"; }
  else if (score >= 80) { signal = "STRONG_BUY"; signalTone = "up"; }
  else if (score >= 65) { signal = "BUY"; signalTone = "up"; }
  else if (score >= 50) { signal = "WATCH"; signalTone = "gold"; }
  else { signal = "AVOID"; signalTone = "down"; }

  // --- Trade Plan otomatis: Entry saat closing auction, exit besok pagi ---
  const entry = cClose;
  const tp1 = entry != null ? entry * (1 + p.tp1Pct/100) : null;
  const tp2 = entry != null ? entry * (1 + p.tp2Pct/100) : null;
  const sl = entry != null ? entry * (1 - p.slPct/100) : null;
  const rr = (entry != null && sl != null && tp1 != null && (entry - sl) > 0) ? (tp1 - entry) / (entry - sl) : null;

  return {
    checks, passedCount, naCount, totalChecks: checks.length, lolos,
    score: Math.max(0, Math.min(100, score)),
    breakdown: { volSurgeScore, priceStructScore, bandarScore, orderbookScore, trendTurnoverScore },
    signal, signalTone,
    tradePlan: { entry, tp1, tp2, sl, rr }
  };
}

function supabaseFetchJson(path, label){
  const url = `${SUPABASE_URL}/${path}`;
  return fetch(url, { headers: getSupaHeaders(), cache: "no-store" })
    .then(async r => {
      const text = await r.text();
      let data;
      try { data = text ? JSON.parse(text) : null; } catch(e) { data = text; }
      if(!r.ok){
        const msg = data && typeof data === "object" ? (data.message || data.error || `HTTP ${r.status}`) : `HTTP ${r.status}`;
        throw new Error(`${label}: ${msg}`);
      }
      return data;
    })
    .catch(e => {
      // Browser menampilkan "Failed to fetch" tanpa detail untuk CORS/DNS/offline.
      // Tambahkan endpoint yang gagal agar sumber masalah bisa langsung diketahui.
      if(String(e.message).toLowerCase().includes("failed to fetch")){
        throw new Error(`${label}: Failed to fetch (${url}) — cek URL Supabase, koneksi, dan CORS`);
      }
      throw e;
    });
}

async function loadLive(){
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    openSettings();
    return;
  }

  state.loading = true; showError(""); render();
  try {
    const [stocksRes, portoRes, backtestRes, wlRes, presetsRes, stockbitHistRes, orcaSnapshotRes] = await Promise.all([
      // Ambil dari VIEW gabungan, bukan tabel stocks mentah: stocks_screener
      // sudah menggabungkan fundamental+teknikal (tabel stocks) dengan
      // bandarmologi asli dari IDX (view flow_summary), lewat left join.
      supabaseFetchJson("stocks_screener?select=*", "stocks_screener"),
      supabaseFetchJson("portfolios?select=*", "portfolios"),
      supabaseFetchJson("backtest_sessions?select=*,backtest_items(*)", "backtest_sessions"),
      supabaseFetchJson("watchlists?select=ticker", "watchlists"),
      supabaseFetchJson("custom_presets?select=*&order=created_at.desc", "custom_presets"),
      // Riwayat Value (Rp) harian dari Stockbit (tabel price_history_stockbit,
      // diisi lewat tombol "📅 Historical" di Screener / tab Historical Data
      // di modal Detail Emiten) — dipakai Smart Pick (Area Demand & Liquidity
      // Sweep) untuk memvalidasi volume spike pakai NILAI transaksi riil,
      // bukan cuma rasio volume lembar dari `flows`. Kolom high & close juga
      // diambil untuk Backtest (harga tertinggi + P/L sejak tanggal entry).
      // Cuma ticker yang PERNAH ditarik manual yang akan punya data di sini —
      // untuk ticker lain, Smart Pick tetap fallback ke volRatio seperti
      // biasa (lihat spStockbitValueRatio()). .catch(()=>[]) supaya kalau
      // tabelnya belum dibuat (migration 08 belum dijalankan), loadLive()
      // tidak ikut gagal.
      fetch(`${SUPABASE_URL}/price_history_stockbit?period=eq.daily&select=stock_code,trade_date,value_idr,high,close&order=trade_date.desc&limit=4000`, { headers: getSupaHeaders(), cache: "no-store" })
        .then(r => r.ok ? r.json() : [])
        .catch(() => []),
      // Baris `flows` hari bursa TERBARU (semua emiten) — sumber fallback
      // ATS (value/frequency), net asing (foreign_buy/sell), & Non-Regular%
      // (nonreg_value) untuk tab Kraken Flow (ORCA) kalau kolom ringkasan
      // di stocks_screener (avg_ticket, crossing_pct, foreign_net_1d) tidak
      // tersedia. .catch(()=>[]) supaya kalau tabel flows kosong/belum ada,
      // loadLive() tidak ikut gagal.
      fetch(`${SUPABASE_URL}/flows?select=ticker,value,frequency,nonreg_value,foreign_buy,foreign_sell,close&order=date.desc&limit=1200`, { headers: getSupaHeaders(), cache: "no-store" })
        .then(r => r.ok ? r.json() : [])
        .catch(() => [])
    ]);

    if (stocksRes.message) throw new Error(stocksRes.message);

    // Baris flows terbaru per ticker (fallback bandarmologi utk ORCA) —
    // dibangun jadi map sebelum mapping stocks supaya bisa diakses inline.
    const orcaFlowSnap = {};
    if (Array.isArray(orcaSnapshotRes)) {
      orcaSnapshotRes.forEach(fr => {
        const t = String(fr.ticker || "").toUpperCase();
        if (!t || orcaFlowSnap[t]) return; // baris pertama = tanggal terbaru
        orcaFlowSnap[t] = fr;
      });
    }

    state.stocks = stocksRes.map(r => {
      // Fallback ORCA: kalau kolom ringkasan (avg_ticket/crossing_pct/
      // foreign_net_1d) tidak ada di view, hitung dari baris flows
      // terbaru. Semua null-safe — kalau ticker tidak ada di flows,
      // hasilnya null dan ORCA menampilkan "-".
      const fbRow = orcaFlowSnap[String(r.ticker || "").toUpperCase()] || null;
      const fbFreq = fbRow ? numOrNull(fbRow.frequency) : null;
      const fbValue = fbRow ? numOrNull(fbRow.value) : null;
      const flowAvgTicket = (fbValue != null && fbFreq != null && fbFreq > 0) ? fbValue / fbFreq : null;
      const flowCrossingPct = (fbRow && fbValue != null && fbValue > 0 && numOrNull(fbRow.nonreg_value) != null) ? (numOrNull(fbRow.nonreg_value) / fbValue) * 100 : null;
      const flowForeignNet = (fbRow && (numOrNull(fbRow.foreign_buy) != null || numOrNull(fbRow.foreign_sell) != null))
        ? ((numOrNull(fbRow.foreign_buy) || 0) - (numOrNull(fbRow.foreign_sell) || 0)) * (numOrNull(fbRow.close) || 0)
        : null;
      return {
        ticker: r.ticker, sektor: r.sector, name: r.name, industry: r.industry,
      // Kolom `syariah` di DB dipakai kalau sudah diisi; kalau masih
      // kosong (belum dilabeli backend), fallback ke daftar statis
      // SYARIAH_TICKERS di atas supaya filter tetap bisa dipakai.
      syariah: (r.syariah === null || r.syariah === undefined || r.syariah === "") ? isSyariah(r.ticker) : r.syariah,
      // Catatan mapping: skema gabungan tidak lagi punya c_high/c_low/c_vol
      // terpisah — dipetakan ke kolom fundamental yang sudah ada supaya
      // tidak ada dua kolom untuk hal yang sama (day_high dulu diisi Yahoo
      // quote, sekarang jadi satu-satunya sumber High hari ini).
      cOpen: r.c_open, cHigh: r.day_high, cLow: r.day_low, cClose: r.price, cVol: r.volume,
      changePct: r.change_pct, turnover: r.turnover, valueTraded: numOrNull(r.value_traded), vwap20: r.vwap20,
      volRatio: numOrNull(r.vol_ratio), volMA20: numOrNull(r.vol_ma20), avgVolume3m: numOrNull(r.avg_volume_3m),
      // Frekuensi transaksi (jumlah kali matched, bukan jumlah lembar) —
      // nama kolom di beberapa skema IDX kadang "frequency", kadang
      // "frekuensi", jadi dua-duanya dicoba.
      // "freqAnalyzer" = baseline rata-rata Frekuensi (mirip "Volume MA 100"
      // punya Volume) yang dipakai rule builder, misal "Frequency > 5 *
      // Frequency Analyzer" — nama kolomnya di DB dikonfigurasi lewat
      // Pengaturan (state.freqAnalyzerCol) karena bisa beda tiap skema.
      frequency: numOrNull(r.frequency ?? r.frekuensi),
      freqAnalyzer: numOrNull(r[state.freqAnalyzerCol] ?? r.freq_ma20 ?? r.frequency_ma20),
      avgFrequency3m: numOrNull(r.avg_frequency_3m ?? r.avg_frekuensi_3m),
      // Antrian bid/offer terbaik — snapshot EOD dari sync-idx-full.mjs
      // (bukan live order book, lihat catatan di skrip). Null kalau
      // memang tidak ada antrian tercatat hari itu.
      bid: numOrNull(r.bid), bidVolume: numOrNull(r.bid_volume),
      offer: numOrNull(r.offer), offerVolume: numOrNull(r.offer_volume),
      per: r.per, forwardPer: numOrNull(r.forward_per), pbv: r.pbv, roe: r.roe, divYield: r.dividend_yield,
      bookValue: numOrNull(r.book_value), psr: numOrNull(r.psr), peg: numOrNull(r.peg),
      roa: numOrNull(r.roa), npm: numOrNull(r.npm), opm: numOrNull(r.opm), eps: numOrNull(r.eps),
      revenueGrowth: numOrNull(r.revenue_growth), earningsGrowth: numOrNull(r.earnings_growth),
      dividendRate: numOrNull(r.dividend_rate), payoutRatio: numOrNull(r.payout_ratio),
      beta: numOrNull(r.beta), der: numOrNull(r.der), currentRatio: numOrNull(r.current_ratio),
      support: r.support, resistance: r.resistance, high52w: r.week52_high, low52w: r.week52_low,
      week52ChangePct: numOrNull(r.week52_change_pct),
      // Field tambahan untuk paritas screener publik: beberapa deployment
      // memakai nama kolom berbeda, jadi normalisasi dilakukan dengan fallback.
      ytdPct: numOrNull(r.ytd_pct ?? r.ytd_change_pct ?? r.ytd),
      indexLq45: r.lq45 ?? r.is_lq45 ?? r.idx_lq45 ?? r.index_lq45 ?? null,
      ema21H: r.ema21h, ema21L: r.ema21l, ma21: r.ma21, ma50: r.ma50, ma100: r.ma100, ma200: r.ma200,
      rsi7: r.rsi7, rsi21: r.rsi21, hist: r.macd_hist, histPrev: 0,
      fib: r.fibonacci, 
      cekHarga: r.cek_harga, cekRsi: r.cek_rsi, statusRsi: r.status_rsi, cekMacd: r.cek_macd, cekVolume: r.cek_volume,
      keyakinanNaik: r.keyakinan_naik,
      trendHarga: r.trend_harga, candleKemarin: r.candle_kemarin, candleHariIni: r.candle_hari_ini, polaCandle: r.pola_candle,
      uangGedeMasuk: boolLabel(r.uang_gede_masuk), bbWidth: numOrNull(r.bb_width),
      isBBSqueeze: boolLabel(r.is_bb_squeeze), atr14: numOrNull(r.atr14), valuasi: r.valuasi ?? "-", clv: numOrNull(r.clv),
      ema89: numOrNull(r.ema89), prevHigh: numOrNull(r.prev_high), prevLow: numOrNull(r.prev_low), prevVol: numOrNull(r.prev_vol),
      stochK: numOrNull(r.stoch_k), stochD: numOrNull(r.stoch_d), prevStochK: numOrNull(r.prev_stoch_k), prevStochD: numOrNull(r.prev_stoch_d),

      // --- Sudah ada di DB tapi sebelumnya belum pernah dipetakan ---
      prevClose: numOrNull(r.prev_close), macd: numOrNull(r.macd), signal: numOrNull(r.signal),
      changeAbs: numOrNull(r.change_abs),
      // Kapan baris ini terakhir diupdate sync-idx-full.mjs — dipakai untuk
      // indikator "data seberapa fresh" di UI (mis. badge "diupdate 2j lalu"
      // atau warning kalau data lebih tua dari 1 hari bursa).
      updatedAt: r.updated_at,

      // --- Perluasan indikator dari stock_indicators_ext (via stocks_screener) ---
      priceMa5: numOrNull(r.price_ma5), priceMa10: numOrNull(r.price_ma10), priceMa20: numOrNull(r.price_ma20),
      prevPriceMa5: numOrNull(r.prev_price_ma5), prevPriceMa10: numOrNull(r.prev_price_ma10),
      prevPriceMa20: numOrNull(r.prev_price_ma20), prevPriceMa50: numOrNull(r.prev_price_ma50),
      prevPriceMa100: numOrNull(r.prev_price_ma100), prevPriceMa200: numOrNull(r.prev_price_ma200),
      volumeMa5: numOrNull(r.volume_ma5), volumeMa10: numOrNull(r.volume_ma10),
      volumeMa50: numOrNull(r.volume_ma50), volumeMa100: numOrNull(r.volume_ma100), volumeMa200: numOrNull(r.volume_ma200),
      prevVolumeMa5: numOrNull(r.prev_volume_ma5), prevVolumeMa10: numOrNull(r.prev_volume_ma10),
      prevVolumeMa20: numOrNull(r.prev_volume_ma20), prevVolumeMa50: numOrNull(r.prev_volume_ma50),
      prevVolumeMa100: numOrNull(r.prev_volume_ma100),
      valueMa5: numOrNull(r.value_ma5), valueMa10: numOrNull(r.value_ma10), valueMa20: numOrNull(r.value_ma20),
      valueMa50: numOrNull(r.value_ma50), valueMa100: numOrNull(r.value_ma100), valueMa200: numOrNull(r.value_ma200),
      frequencyMa50: numOrNull(r.frequency_ma50), freqSpike: r.freq_spike,
      rsi14: numOrNull(r.rsi14), prevRsi14: numOrNull(r.prev_rsi14),
      prevMacd: numOrNull(r.prev_macd), prevSignal: numOrNull(r.prev_signal), prevMacdHist: numOrNull(r.prev_macd_hist),
      bbUpper: numOrNull(r.bb_upper), bbLower: numOrNull(r.bb_lower),
      adr14: numOrNull(r.adr14), prevAtr14: numOrNull(r.prev_atr14), prevAdr14: numOrNull(r.prev_adr14),
      vwap: numOrNull(r.vwap),
      ema5: numOrNull(r.ema5), ema10: numOrNull(r.ema10), ema20: numOrNull(r.ema20),
      ema50: numOrNull(r.ema50), ema100: numOrNull(r.ema100), ema200: numOrNull(r.ema200),
      prevEma200: numOrNull(r.prev_ema200),
      fibP: numOrNull(r.fib_p), fibR1: numOrNull(r.fib_r1), fibR2: numOrNull(r.fib_r2), fibR3: numOrNull(r.fib_r3),
      fibS1: numOrNull(r.fib_s1), fibS2: numOrNull(r.fib_s2), fibS3: numOrNull(r.fib_s3),

      // --- Bandarmologi ASLI dari IDX (bukan proxy volume) ---
      // Null berarti "belum ditransaksikan" (suspensi dsb), bukan nol —
      // lihat catatan flow_summary di database. Jangan format null jadi 0.
      capCategory: r.cap_category ?? null, pos52w: numOrNull(r.pos_52w),
      // Market Cap: dipakai kalau kolom `market_cap` sudah ada di
      // stocks_screener. Kalau belum, coba turunkan dari
      // `shares_outstanding` x harga. Kalau dua-duanya belum ada di
      // skema, nilainya null dan UI menampilkan "-" (bukan 0) —
      // lihat catatan di README/SQL soal menambah kolom ini.
      sharesOutstanding: numOrNull(r.shares_outstanding),
      marketCap: numOrNull(r.market_cap) ?? (numOrNull(r.shares_outstanding) != null ? numOrNull(r.shares_outstanding) * (numOrNull(r.price) || 0) : null),
      vsMa50Pct: numOrNull(r.vs_ma50_pct), vsMa200Pct: numOrNull(r.vs_ma200_pct),
      avgTicket: numOrNull(r.avg_ticket) ?? flowAvgTicket,
      crossingPct: numOrNull(r.crossing_pct) ?? flowCrossingPct,
      foreignNet1D: numOrNull(r.foreign_net_1d) ?? flowForeignNet,
      foreignNet5D: numOrNull(r.foreign_net_5d),
      foreignNet20D: numOrNull(r.foreign_net_20d), foreignUpDays: numOrNull(r.foreign_up_days),
      flowSeries: Array.isArray(r.flow_series) ? r.flow_series : null,
      flowDate: r.flow_date, flowDays: numOrNull(r.flow_days),
      };
    });

    // Kalau salah satu dari ketiga fetch ini gagal (mis. RLS menolak),
    // Supabase membalas objek {message:...}, bukan array — dulu ini
    // dilewati diam-diam tanpa pemberitahuan apa pun ke user. Sekarang
    // dikumpulkan jadi peringatan yang ditampilkan di errorMsg supaya
    // kelihatan kalau porto/backtest/watchlist gagal dimuat.
    const warnings = [];

    if (Array.isArray(portoRes)) {
       state.portfolio = portoRes.map(p => ({
         id: p.id, ticker: p.ticker, status: p.status,
         tglBeli: p.tgl_beli, hargaBeli: p.harga_beli, lotBeli: p.lot_beli, feeBeliPct: p.fee_beli_pct, totalBeli: p.total_beli,
         support: p.support, resistance: p.resistance, fib618: p.fib618, targetTP: p.target_tp, cutLoss: p.cut_loss,
         tglJual: p.tgl_jual, hargaJual: p.harga_jual, lotJual: p.lot_jual, feeJualPct: p.fee_jual_pct, netJual: p.net_jual,
         jangkaWaktu: p.jangka_waktu, persenPL: p.persen_pl, nilaiPL: p.nilai_pl, catatan: p.catatan,
         entries: p.entries 
       }));
       savePortoLocal();
    } else {
       console.warn("Gagal memuat portfolios:", portoRes);
       warnings.push("Portofolio gagal dimuat" + (portoRes && portoRes.message ? ` (${portoRes.message})` : ""));
    }

    if (Array.isArray(backtestRes)) {
       state.backtests = backtestRes.map(b => ({
         id: b.id, date: b.session_date,
         // Guard Array: sesi tanpa relasi backtest_items (null/undefined)
         // tidak boleh membuat seluruh loadLive() gagal — perlakukan
         // saja sebagai sesi kosong.
         items: (Array.isArray(b.backtest_items) ? b.backtest_items : []).map(it => ({
            ticker: it.ticker, entryPrice: it.entry_price, filterStr: it.notes, sumber: it.source, kriteria: it.criteria,
            // it.entry_date butuh kolom `entry_date` di backtest_items (lihat
            // catatan migrasi di syncBacktestToSupabase). Selama kolom itu
            // belum ada di server, it.entry_date akan undefined — fallback ke
            // tanggal sesi (b.session_date, format "YYYY-MM-DD" dari Supabase)
            // supaya kolom "Tanggal Entry"/"Hari" tetap menampilkan sesuatu
            // yang masuk akal, bukan kosong.
            entryDate: it.entry_date || b.session_date || null
         }))
       })).sort((a,b) => String(b.id).localeCompare(String(a.id)));
       saveBacktests();
    } else {
       console.warn("Gagal memuat backtest_sessions:", backtestRes);
       warnings.push("Backtest gagal dimuat" + (backtestRes && backtestRes.message ? ` (${backtestRes.message})` : ""));
    }

    if (Array.isArray(wlRes)) {
        state.watchlist = new Set(wlRes.map(w => w.ticker));
        saveWatchlist();
    } else {
        console.warn("Gagal memuat watchlists:", wlRes);
        warnings.push("Watchlist gagal dimuat" + (wlRes && wlRes.message ? ` (${wlRes.message})` : ""));
    }

    if (Array.isArray(presetsRes)) {
       state.customPresets = presetsRes;
    } else {
       console.warn("Gagal memuat custom_presets:", presetsRes);
       warnings.push("Preset screener gagal dimuat" + (presetsRes && presetsRes.message ? ` (${presetsRes.message})` : ""));
    }

    if (warnings.length) showError(warnings.join(" · "));

    // Susun state.stockbitValueHistory: { TICKER: [{date, value_idr}, ...] }
    // Tidak perlu warning kalau kosong — ini fitur opsional (fallback ke
    // volRatio biasa kalau tidak ada), bukan data wajib.
    if(Array.isArray(stockbitHistRes) && stockbitHistRes.length){
      const grouped = {};
      const priceGrouped = {};
      stockbitHistRes.forEach(r => {
        const ticker = String(r.stock_code || "").trim().toUpperCase();
        if(!ticker) return;
        if(r.value_idr != null){
          (grouped[ticker] ||= []).push({ date: r.trade_date, value_idr: Number(r.value_idr) || 0 });
        }
        // Simpan OHLC yang sudah tersedia dari historical Stockbit. Data ini
        // dipakai Backtest untuk menghitung high dan P/L sepanjang periode.
        if(r.high != null || r.close != null){
          (priceGrouped[ticker] ||= []).push({
            date: r.trade_date, high: numOrNull(r.high), close: numOrNull(r.close)
          });
        }
      });
      state.stockbitValueHistory = grouped;
      state.stockbitPriceHistory = priceGrouped;
    } else {
      state.stockbitValueHistory = {};
      state.stockbitPriceHistory = {};
    }

  } catch (e) {
    showError("Gagal terhubung ke Database Supabase: " + e.message);
  }
  state.loading = false; render();

  // Top 3 Broker Beli/Jual dimuat terpisah (tidak di-await bareng fetch di
  // atas) supaya screener utama tetap cepat tampil — begitu selesai, dia
  // render() ulang sendiri untuk mengisi filter "Top 3 Broker".
  loadTop3BrokerData();
}

// Ambil top 3 broker BELI dan top 3 broker JUAL per saham, dari trade_date
// PALING BARU yang tercatat di tabel broker_summary (bukan per-saham,
// karena kolomnya diisi manual/bulk — kalau ditarik per saham query bisa
// sangat banyak). Asumsinya sama seperti logic skip-fetch broker summary:
// hari trading terakhir dianggap representatif untuk "kondisi terkini".
async function loadTop3BrokerData(){
  if(!SUPABASE_URL || !SUPABASE_KEY) return;
  state.top3BrokerLoading = true;
  try{
    const dateRes = await fetch(`${SUPABASE_URL}/broker_summary?select=trade_date&order=trade_date.desc&limit=1`, { headers: getSupaHeaders(), cache: "no-store" });
    const dateRows = await dateRes.json();
    const latestDate = Array.isArray(dateRows) && dateRows[0] ? dateRows[0].trade_date : null;
    if(!latestDate){
      state.top3BrokerData = {}; state.top3BrokerDate = null;
      state.top3BrokerLoading = false; render();
      return;
    }

    const res = await fetch(`${SUPABASE_URL}/broker_summary?select=stock_code,side,rank,broker_code&trade_date=eq.${latestDate}&rank=lte.3&order=stock_code.asc,side.asc,rank.asc`, { headers: getSupaHeaders(), cache: "no-store" });
    const rows = await res.json();
    const map = {};
    if(Array.isArray(rows)){
      rows.forEach(r => {
        const ticker = String(r.stock_code || "").trim().toUpperCase();
        const code = String(r.broker_code || "").trim().toUpperCase();
        if(!ticker || !code) return;
        if(!map[ticker]) map[ticker] = { buy: [], sell: [] };
        if(r.side === "buy") map[ticker].buy.push(code);
        else if(r.side === "sell") map[ticker].sell.push(code);
      });
    }
    state.top3BrokerData = map;
    state.top3BrokerDate = latestDate;
  }catch(e){
    console.warn("Gagal memuat Top 3 Broker:", e);
  }
  state.top3BrokerLoading = false;
  render();
}

function showError(msg){
  const el=document.getElementById("errorMsg");
  el.style.display = msg ? "block" : "none";
  el.textContent = msg;
}

async function toggleFav(ticker){
  const isFav = state.watchlist.has(ticker);
  isFav ? state.watchlist.delete(ticker) : state.watchlist.add(ticker);
  if(!isFav) {
    try { const p=JSON.parse(localStorage.getItem("ihsg_watchlist_meta")||"{}"); const s=state.stocks.find(x=>x.ticker===ticker); p[ticker]={entry:Number(s?.cClose)||null,date:todayLocalISO()}; localStorage.setItem("ihsg_watchlist_meta",JSON.stringify(p)); } catch(e) {}
  } else {
    try { const p=JSON.parse(localStorage.getItem("ihsg_watchlist_meta")||"{}"); delete p[ticker]; localStorage.setItem("ihsg_watchlist_meta",JSON.stringify(p)); } catch(e) {}
  }
  saveWatchlist();
  render();

  try{ 
    if(!isFav) {
      await supaFetch(`${SUPABASE_URL}/watchlists`, { method: "POST", headers: { ...getSupaHeaders(), "Prefer": "resolution=merge-duplicates" }, body: JSON.stringify({ticker}) });
    } else {
      await supaFetch(`${SUPABASE_URL}/watchlists?ticker=eq.${ticker}`, { method: "DELETE", headers: getSupaHeaders() });
    }
  } catch(e){
    // Gagal sinkron ke Supabase — batalkan perubahan lokal supaya UI
    // tidak "berbohong" bahwa item sudah tersimpan, dan beri tahu user
    // alasannya (bukan diam-diam gagal seperti sebelumnya).
    isFav ? state.watchlist.add(ticker) : state.watchlist.delete(ticker);
    saveWatchlist();
    showError(`Gagal menyimpan watchlist ke Supabase: ${e.message}`);
    render();
  }
}

function openDetail(ticker){
  state.detailTicker = ticker;
  state.detailTab = "teknikal";
  state.detailBsRows = []; state.detailBsEditRows = [];
  state.detailBsMsg = ""; state.detailBsMsgError = false;
  state.detailBsEditorOpen = false; state.detailBsCsvText = "";
  state.detailBsRangeMode = false; state.detailBsDateFrom = ""; state.detailBsDateTo = "";
  state.detailBsRangeAgg = null; state.detailBsRangeDatesCount = 0;
  state.detailHistoricalRows = []; state.detailHistoricalMsg = ""; state.detailHistoricalMsgError = false;
  state.detailCompareRows = []; state.detailCompareMsg = ""; state.detailCompareOpen = false;
  render();
}
function closeDetail(){
  state.detailTicker = null;
  render();
}
function setDetailTab(tab){
  state.detailTab = tab;
  // Auto-muat Historical Data dari database (tabel price_history_stockbit)
  // begitu tab dibuka, kalau belum ada baris & tidak sedang loading — supaya
  // user tidak harus klik apa pun untuk lihat histori yang sudah pernah
  // ditarik lewat Stockbit sebelumnya (lihat loadDetailHistoricalFromDb()).
  if(tab === "historical" && !(state.detailHistoricalRows && state.detailHistoricalRows.length) && !state.detailHistoricalLoading){
    loadDetailHistoricalFromDb();
    return; // loadDetailHistoricalFromDb() sudah memanggil render()
  }
  render();
}

function openSmartPickList(defId){
  state.spListOpenDefId = defId;
  render();
}
function closeSmartPickList(){
  state.spListOpenDefId = null;
  render();
}

function dItem(label, valueHtml, isText){
  return `<div class="detail-item"><div class="lbl">${label}</div><div class="val ${isText?'text':''}">${valueHtml==null||valueHtml===""?'-':valueHtml}</div></div>`;
}
function baggerBreakdownRows(items){
  return items.map(i => `<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:3px 0;font-size:11.5px;line-height:1.3;">
    <span style="color:${i.pass?'var(--up)':'var(--muted)'};">${i.pass?'✅':'▫️'} ${i.label}</span>
    <span class="mono" style="color:${i.pass?'var(--up)':'var(--muted)'};white-space:nowrap;">${i.pass?'+':''}${i.pass?i.points:0}/${i.points}</span>
  </div>`).join("");
}
function dNum(n, opts){
  opts = opts || {};
  if(n===null||n===undefined||n==="") return "-";
  const num = Number(n);
  if(isNaN(num)) return String(n);
  return (opts.plusSign && num>=0 ? "+" : "") + fmtNum(opts.decimals!=null ? +num.toFixed(opts.decimals) : num) + (opts.suffix||"");
}

function renderImbalanceBar(bidVol, offerVol) {
    const tb = Number(bidVol) || 0;
    const to = Number(offerVol) || 0;
    const total = tb + to;
    if(total === 0) return '';
    const bidPct = (tb / total) * 100;
    const offerPct = 100 - bidPct;
    return `
    <div style="margin-top:12px; margin-bottom:12px; padding: 12px; background: rgba(0,0,0,0.2); border-radius: 8px; border: 1px solid var(--border);">
        <div style="font-size:11px; color:var(--muted); text-transform:uppercase; margin-bottom:8px; text-align:center;">⚖️ Tekanan Orderbook (Bid vs Offer)</div>
        <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:4px; font-weight:bold;">
            <span style="color:var(--up);">Bid Power: ${bidPct.toFixed(1)}%</span>
            <span style="color:var(--down);">Offer Power: ${offerPct.toFixed(1)}%</span>
        </div>
        <div style="height:8px; background:var(--down); border-radius:4px; display:flex; overflow:hidden; box-shadow: inset 0 1px 3px rgba(0,0,0,0.5);">
            <div style="width:${bidPct}%; background:var(--up); height:100%;"></div>
        </div>
    </div>`;
}

function renderDetailTeknikal(s){
  return `
    <div class="detail-subtitle">Harga & Volume Hari Ini</div>
    <div class="detail-grid">
      ${dItem("Open", dNum(s.cOpen))}
      ${dItem("High", dNum(s.cHigh))}
      ${dItem("Low", dNum(s.cLow))}
      ${dItem("Close", dNum(s.cClose))}
      ${dItem("Perubahan%", `<span style="color:${(s.changePct??0)>=0?'var(--up)':'var(--down)'}">${s.changePct!=null?dNum(s.changePct,{plusSign:true,decimals:2,suffix:'%'}):'-'}</span>`, true)}
      ${dItem("Volume", dNum(s.cVol))}
      ${dItem("Turnover (Rp)", dNum(s.turnover))}
      ${dItem("Value Traded IDX (Rp)", dNum(s.valueTraded))}
      ${dItem("VWAP 20D", dNum(s.vwap20))}
      ${dItem("Avg Volume 3M", dNum(s.avgVolume3m))}
    </div>

    <div class="detail-subtitle">Antrian Bid / Offer (snapshot EOD)</div>
    <div class="detail-grid">
      ${dItem("Bid", `<span style="color:var(--up)">${dNum(s.bid)}</span>`, true)}
      ${dItem("Bid Vol (Lot)", dNum(s.bidVolume ? s.bidVolume / 100 : 0))}
      ${dItem("Offer", `<span style="color:var(--down)">${dNum(s.offer)}</span>`, true)}
      ${dItem("Offer Vol (Lot)", dNum(s.offerVolume ? s.offerVolume / 100 : 0))}
    </div>
    ${renderImbalanceBar(s.bidVolume, s.offerVolume)}

    <div class="detail-subtitle">Hari Sebelumnya (Pembanding)</div>
    <div class="detail-grid">
      ${dItem("Prev Close", dNum(s.prevClose))}
      ${dItem("Prev High", dNum(s.prevHigh))}
      ${dItem("Prev Low", dNum(s.prevLow))}
      ${dItem("Prev Volume", dNum(s.prevVol))}
      ${dItem("Perubahan Volume 1D%", s.volChangePct!=null?dNum(s.volChangePct,{plusSign:true,decimals:2,suffix:'%'}):"-", true)}
    </div>

    <div class="detail-subtitle">Level Support / Resisten & Fibonacci Retracement</div>
    <div class="detail-grid">
      ${dItem("Support", `<span style="color:var(--down)">${dNum(s.support)}</span>`, true)}
      ${dItem("Resisten", `<span style="color:var(--up)">${dNum(s.resistance)}</span>`, true)}
      ${dItem("52W Tinggi", dNum(s.high52w))}
      ${dItem("52W Rendah", dNum(s.low52w))}
      ${dItem("52W Change%", s.week52ChangePct!=null?dNum(s.week52ChangePct,{plusSign:true,decimals:2,suffix:'%'}):"-", true)}
      ${dItem("YTD%", s.ytdPct!=null?dNum(s.ytdPct,{plusSign:true,decimals:2,suffix:'%'}):"-", true)}
      ${dItem("Posisi dalam 52W%", s.pos52w!=null?dNum(s.pos52w,{decimals:1,suffix:'%'}):"-", true)}
      ${dItem("Fib 23.6%", dNum(s.fib?.f236))}
      ${dItem("Fib 38.2%", dNum(s.fib?.f382))}
      ${dItem("Fib 50%", dNum(s.fib?.f50))}
      ${dItem("Fib 61.8%", dNum(s.fib?.f618))}
    </div>

    <div class="detail-subtitle">Pivot Point Fibonacci Klasik</div>
    <div class="detail-grid">
      ${dItem("Pivot (P)", dNum(s.fibP))}
      ${dItem("Resisten 1", dNum(s.fibR1))}
      ${dItem("Resisten 2", dNum(s.fibR2))}
      ${dItem("Resisten 3", dNum(s.fibR3))}
      ${dItem("Support 1", dNum(s.fibS1))}
      ${dItem("Support 2", dNum(s.fibS2))}
      ${dItem("Support 3", dNum(s.fibS3))}
    </div>

    <div class="detail-subtitle">Moving Average Harga & Trend</div>
    <div class="detail-grid">
      ${dItem("MA5", dNum(s.priceMa5))}
      ${dItem("MA10", dNum(s.priceMa10))}
      ${dItem("MA20", dNum(s.priceMa20))}
      ${dItem("MA21", dNum(s.ma21))}
      ${dItem("MA50", dNum(s.ma50))}
      ${dItem("MA100", dNum(s.ma100))}
      ${dItem("MA200", dNum(s.ma200))}
      ${dItem("Trend Harga (MA)", pillHtml(s.trendHarga||"-", trendTone(s.trendHarga)), true)}
      ${dItem("Prev MA5", dNum(s.prevPriceMa5))}
      ${dItem("Prev MA10", dNum(s.prevPriceMa10))}
      ${dItem("Prev MA20", dNum(s.prevPriceMa20))}
      ${dItem("Prev MA50", dNum(s.prevPriceMa50))}
      ${dItem("Prev MA100", dNum(s.prevPriceMa100))}
      ${dItem("Prev MA200", dNum(s.prevPriceMa200))}
    </div>

    <div class="detail-subtitle">Exponential Moving Average (EMA)</div>
    <div class="detail-grid">
      ${dItem("EMA5", dNum(s.ema5))}
      ${dItem("EMA10", dNum(s.ema10))}
      ${dItem("EMA20", dNum(s.ema20))}
      ${dItem("EMA21 High", dNum(s.ema21H))}
      ${dItem("EMA21 Low", dNum(s.ema21L))}
      ${dItem("EMA50", dNum(s.ema50))}
      ${dItem("EMA89", dNum(s.ema89))}
      ${dItem("EMA100", dNum(s.ema100))}
      ${dItem("EMA200", dNum(s.ema200))}
      ${dItem("Prev EMA200", dNum(s.prevEma200))}
      ${dItem("vs MA50%", s.vsMa50Pct!=null?dNum(s.vsMa50Pct,{plusSign:true,decimals:2,suffix:'%'}):"-", true)}
      ${dItem("vs MA200%", s.vsMa200Pct!=null?dNum(s.vsMa200Pct,{plusSign:true,decimals:2,suffix:'%'}):"-", true)}
    </div>

    <div class="detail-subtitle">Momentum: RSI, Stochastic & MACD</div>
    <div class="detail-grid">
      ${dItem("RSI 7", rsiGaugeHtml(s.rsi7), true)}
      ${dItem("RSI 14", s.rsi14!=null?Number(s.rsi14).toFixed(1):"-")}
      ${dItem("RSI 21", s.rsi21!=null?Number(s.rsi21).toFixed(1):"-")}
      ${dItem("Prev RSI 14", s.prevRsi14!=null?Number(s.prevRsi14).toFixed(1):"-")}
      ${dItem("Stoch K", s.stochK??"-")}
      ${dItem("Stoch D", s.stochD??"-")}
      ${dItem("Prev Stoch K", s.prevStochK??"-")}
      ${dItem("Prev Stoch D", s.prevStochD??"-")}
      ${dItem("MACD", s.macd!=null?Number(s.macd).toFixed(3):"-")}
      ${dItem("MACD Signal", s.signal!=null?Number(s.signal).toFixed(3):"-")}
      ${dItem("MACD Histogram", s.hist!=null?Number(s.hist).toFixed(3):"-")}
      ${dItem("Prev MACD", s.prevMacd!=null?Number(s.prevMacd).toFixed(3):"-")}
      ${dItem("Prev MACD Signal", s.prevSignal!=null?Number(s.prevSignal).toFixed(3):"-")}
      ${dItem("Prev MACD Hist", s.prevMacdHist!=null?Number(s.prevMacdHist).toFixed(3):"-")}
    </div>

    <div class="detail-subtitle">Volatilitas: ATR, ADR & Bollinger Bands</div>
    <div class="detail-grid">
      ${dItem("ATR 14", s.atr14??"-")}
      ${dItem("Prev ATR 14", s.prevAtr14??"-")}
      ${dItem("ADR 14", s.adr14??"-")}
      ${dItem("Prev ADR 14", s.prevAdr14??"-")}
      ${dItem("BB Width", s.bbWidth??"-")}
      ${dItem("BB Upper", dNum(s.bbUpper))}
      ${dItem("BB Lower", dNum(s.bbLower))}
      ${dItem("CLV", s.clv??"-")}
      ${dItem("VWAP (Raw)", dNum(s.vwap))}
    </div>

    <div class="detail-subtitle">Volume, Value & Frekuensi Historis</div>
    <div class="detail-grid">
      ${dItem("Vol Ratio (vs MA20)", s.volRatio!=null?Number(s.volRatio).toFixed(2)+"x":"-", true)}
      ${dItem("Volume MA5", dNum(s.volumeMa5))}
      ${dItem("Volume MA10", dNum(s.volumeMa10))}
      ${dItem("Volume MA20", dNum(s.volMA20))}
      ${dItem("Volume MA50", dNum(s.volumeMa50))}
      ${dItem("Volume MA100", dNum(s.volumeMa100))}
      ${dItem("Volume MA200", dNum(s.volumeMa200))}
      ${dItem("Prev Volume MA5", dNum(s.prevVolumeMa5))}
      ${dItem("Prev Volume MA10", dNum(s.prevVolumeMa10))}
      ${dItem("Prev Volume MA20", dNum(s.prevVolumeMa20))}
      ${dItem("Prev Volume MA50", dNum(s.prevVolumeMa50))}
      ${dItem("Prev Volume MA100", dNum(s.prevVolumeMa100))}
      ${dItem("Value MA5 (Rp)", dNum(s.valueMa5))}
      ${dItem("Value MA10 (Rp)", dNum(s.valueMa10))}
      ${dItem("Value MA20 (Rp)", dNum(s.valueMa20))}
      ${dItem("Value MA50 (Rp)", dNum(s.valueMa50))}
      ${dItem("Value MA100 (Rp)", dNum(s.valueMa100))}
      ${dItem("Value MA200 (Rp)", dNum(s.valueMa200))}
      ${dItem("Frekuensi Transaksi", dNum(s.frequency))}
      ${dItem("Frequency Analyzer", dNum(s.freqAnalyzer))}
      ${dItem("Frequency MA50", dNum(s.frequencyMa50))}
      ${dItem("Avg Frekuensi 3M", dNum(s.avgFrequency3m))}
      ${dItem("Freq Spike", s.freqSpike||"-", true)}
    </div>

    <div class="detail-subtitle">Candlestick</div>
    <div class="detail-grid">
      ${dItem("Candle Kemarin", s.candleKemarin||"-", true)}
      ${dItem("Candle Hari Ini", s.candleHariIni||"-", true)}
      ${dItem("Pola Candle", pillHtml(s.polaCandle||"-", polaTone(s.polaCandle)), true)}
      ${dItem("BB Squeeze (6B)", pillHtml(s.isBBSqueeze||"-", s.isBBSqueeze==="Ya"?"gold":"muted"), true)}
    </div>
  `;
}

function renderDetailFundamental(s){
  const graham = grahamFairValue(s);
  const marginOfSafetyPct = (graham!=null && s.cClose) ? ((graham - s.cClose) / s.cClose) * 100 : null;
  const grahamTone = marginOfSafetyPct==null ? "muted" : marginOfSafetyPct>=15 ? "up" : marginOfSafetyPct<=-15 ? "down" : "gold";

  return `
    <div class="detail-subtitle">Klasifikasi</div>
    <div class="detail-grid">
      ${dItem("Nama Perusahaan", s.name||"-", true)}
      ${dItem("Sektor", s.sektor||"-", true)}
      ${dItem("Industri", s.industry||"-", true)}
      ${dItem("Syariah", s.syariahLabel==="Ya"?"✅ Ya":(s.syariahLabel||"-"), true)}
      ${dItem("Valuasi", pillHtml(s.valuasi||"-", valuasiTone(s.valuasi)), true)}
      ${dItem("Kategori Cap", s.capCategory||"-", true)}
      ${dItem("LQ45", s.indexLq45!=null ? (isLq45(s)?"✅ Ya":"Tidak") : "-", true)}
      ${dItem("Market Cap", s.marketCap!=null ? `Rp ${fmtCap(s.marketCap)}` : "-", true)}
      ${dItem("Saham Beredar (Shares Outstanding)", dNum(s.sharesOutstanding), true)}
    </div>

    <div class="detail-subtitle">Rasio Valuasi & Profitabilitas</div>
    <div class="detail-grid">
      ${dItem("PER", s.per??"-")}
      ${dItem("Forward PER", s.forwardPer??"-")}
      ${dItem("PBV", s.pbv??"-")}
      ${dItem("PSR", s.psr??"-")}
      ${dItem("PEG", s.peg??"-")}
      ${dItem("Book Value", dNum(s.bookValue))}
      ${dItem("ROE%", s.roe!=null?dNum(s.roe,{decimals:2,suffix:'%'}):"-")}
      ${dItem("ROA%", s.roa!=null?dNum(s.roa,{decimals:2,suffix:'%'}):"-")}
      ${dItem("NPM%", s.npm!=null?dNum(s.npm,{decimals:2,suffix:'%'}):"-")}
      ${dItem("OPM%", s.opm!=null?dNum(s.opm,{decimals:2,suffix:'%'}):"-")}
      ${dItem("Dividend Yield%", s.divYield!=null?dNum(s.divYield,{decimals:2,suffix:'%'}):"-")}
      ${dItem("Dividend Rate", dNum(s.dividendRate))}
    </div>

    <div class="detail-subtitle">Pertumbuhan & Kesehatan Keuangan</div>
    <div class="detail-grid">
      ${dItem("Revenue Growth%", s.revenueGrowth!=null?dNum(s.revenueGrowth,{plusSign:true,decimals:2,suffix:'%'}):"-", true)}
      ${dItem("Earnings Growth%", s.earningsGrowth!=null?dNum(s.earningsGrowth,{plusSign:true,decimals:2,suffix:'%'}):"-", true)}
      ${dItem("Payout Ratio%", s.payoutRatio!=null?dNum(s.payoutRatio,{decimals:2,suffix:'%'}):"-")}
      ${dItem("Beta", s.beta??"-")}
      ${dItem("DER", s.der??"-")}
      ${dItem("Current Ratio", s.currentRatio??"-")}
    </div>

    <div class="detail-subtitle">Nilai Wajar (Graham Number)</div>
    <div class="detail-grid" style="border-left: 3px solid var(--${grahamTone}); padding-left: 10px;">
      ${dItem("Nilai Wajar", graham!=null ? dNum(graham,{decimals:0}) : "-", true)}
      ${dItem("Harga Saat Ini", dNum(s.cClose), true)}
      ${dItem("Margin of Safety", marginOfSafetyPct!=null ? `<span style="color:var(--${grahamTone})">${marginOfSafetyPct>=0?'+':''}${marginOfSafetyPct.toFixed(1)}%</span>` : "-", true)}
    </div>

    <div class="detail-narrative">
      ${s.per!=null && s.pbv!=null
        ? `Berdasarkan PER ${s.per} dan PBV ${s.pbv}, valuasi saham ini saat ini tergolong <b>${(s.valuasi||"-").toLowerCase()}</b>.
           ${s.divYield ? `Emiten ini memberikan dividend yield sekitar ${dNum(s.divYield,{decimals:2})}% pada harga saat ini.` : "Belum ada data dividend yield untuk emiten ini."}
           ${graham!=null
             ? ` Dihitung dengan formula Graham Number (√(22,5 × EPS × BVPS), EPS & BVPS diturunkan dari PER/PBV saat ini), nilai wajarnya sekitar ${dNum(graham,{decimals:0})} — ${marginOfSafetyPct>=0 ? `harga saat ini ${Math.abs(marginOfSafetyPct).toFixed(1)}% di bawah nilai wajar` : `harga saat ini ${Math.abs(marginOfSafetyPct).toFixed(1)}% di atas nilai wajar`}. Graham Number cocok untuk saham dengan EPS & ekuitas positif (umumnya sektor non-cyclical); kurang relevan untuk emiten rugi, bank, atau komoditas yang labanya fluktuatif.`
             : " PER atau PBV emiten ini negatif/tidak tersedia, sehingga Nilai Wajar (Graham Number) tidak bisa dihitung secara valid."}`
        : "Data fundamental (PER/PBV) untuk emiten ini belum lengkap di database, sehingga valuasi maupun nilai wajar belum bisa dihitung."}
    </div>
  `;
}

function renderStockbitPanel(s){
  const live = state.stockbitLive[s.ticker];
  const hasToken = !!state.stockbitToken;
  let body;
  if(!hasToken){
    body = `<div style="font-size:12px;color:var(--muted);">Token Stockbit belum diisi. Buka <button type="button" onclick="closeDetail();openSettings();" style="background:none;border:none;color:var(--teal);text-decoration:underline;cursor:pointer;padding:0;font-size:12px;">⚙️ Pengaturan</button> untuk mengisi token dari extension Chrome-mu.</div>`;
  } else if(!live){
    body = `<button type="button" class="btn btn-outline" data-stockbit-live="${s.ticker}" style="color:#f87171;border-color:rgba(239,68,68,0.4);">🔴 Tarik Live Sekarang</button>`;
  } else if(live.loading){
    body = `<div style="font-size:12px;color:var(--muted);">Menarik data dari Stockbit...</div>`;
  } else if(live.error){
    body = `<div style="font-size:12px;color:var(--down);margin-bottom:8px;">⚠️ ${escapeHtml(live.error)}</div>
      <button type="button" class="btn btn-outline" data-stockbit-live="${s.ticker}" style="color:#f87171;border-color:rgba(239,68,68,0.4);">↻ Coba Lagi</button>`;
  } else {
    const m = live.mapped || {};
    const secAgo = Math.max(0, Math.round((Date.now()-live.fetchedAt)/1000));
    body = `
      <div class="detail-grid" style="margin-bottom:8px;">
        ${dItem("Last Price", m.last!=null ? fmtNum(m.last) : "-", true)}
        ${dItem("Open", m.open!=null ? fmtNum(m.open) : "-", true)}
        ${dItem("High", m.high!=null ? fmtNum(m.high) : "-", true)}
        ${dItem("Low", m.low!=null ? fmtNum(m.low) : "-", true)}
        ${dItem("Prev Close", m.prevClose!=null ? fmtNum(m.prevClose) : "-", true)}
        ${dItem("Bid", m.bid!=null ? fmtNum(m.bid) : "-", true)}
        ${dItem("Offer", m.offer!=null ? fmtNum(m.offer) : "-", true)}
        ${dItem("Volume", m.volume!=null ? fmtNum(m.volume) : "-", true)}
      </div>
      <div style="font-size:10.5px;color:var(--muted);margin-bottom:8px;">Ditarik ${secAgo} detik lalu · field yang tidak muncul berarti nama field-nya belum cocok dengan skema respons Stockbit (lihat JSON mentah).</div>
      <details style="margin-bottom:8px;">
        <summary style="cursor:pointer;font-size:11px;color:var(--teal);">Lihat JSON mentah</summary>
        <pre style="font-size:10.5px;background:rgba(0,0,0,0.3);padding:8px;border-radius:6px;overflow-x:auto;max-height:200px;">${escapeHtml(JSON.stringify(live.raw, null, 2))}</pre>
      </details>
      <button type="button" class="btn btn-outline" data-stockbit-live="${s.ticker}" style="font-size:11px;color:#f87171;border-color:rgba(239,68,68,0.4);">↻ Refresh</button>
    `;
  }
  const liveStatus = stockbitLiveDataStatus();
  return `
    <div style="background: linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95)); border: 1px solid rgba(239,68,68,0.35); border-radius: 12px; padding: 16px; margin-bottom: 16px;">
      <div style="display:flex; align-items:center; gap: 8px; margin-bottom: 4px;">
        <span style="font-size: 18px;">🔴</span>
        <div style="font-size: 12.5px; font-weight: 700; color: var(--text);">Live Data Stockbit <span style="font-weight:400;color:var(--muted);font-size:10.5px;">(tidak resmi — pakai token akunmu sendiri)</span></div>
      </div>
      <div style="font-size:10.5px; color:${liveStatus.color}; margin: 0 0 10px 26px;">${liveStatus.text}</div>
      ${body}
    </div>
  `;
}

function renderDetailAnalisa(s){
  const bandLabel = s.band ? s.band.label : "-";
  const bandTone = s.band ? s.band.tone : "muted";
  
  // 1. Kalkulasi Trading Plan
  const entry = s.cClose;
  const tpFromResistance = !!s.resistance;
  const tp = s.resistance || (entry * 1.05); 
  const slFromSupport = !!(s.support && entry - s.support < (s.atr14 || entry * 0.05));
  const sl = slFromSupport ? s.support : entry - (s.atr14 || entry * 0.03); 
  const risk = entry - sl;
  const reward = tp - entry;
  const rrr = risk > 0 ? (reward / risk).toFixed(2) : 0;
  const tpPct = entry ? ((tp - entry) / entry) * 100 : null;
  const slPct = entry ? ((sl - entry) / entry) * 100 : null;
  
  let tradeTone = "muted"; let tradeStatus = "Netral";
  if (rrr >= 1.5 && s.keyakinanTone === "up" && s.volTone === "up") { tradeTone = "up"; tradeStatus = "🔥 Highly Recommended"; } 
  else if (rrr >= 1) { tradeTone = "gold"; tradeStatus = "⭐ Layak Pantau"; } 
  else { tradeTone = "down"; tradeStatus = "⚠️ High Risk"; }

  // --- Target TP & SL Versi RSI (jarak EMA21 Low <-> harga sekarang, rasio 1:1) ---
  // Tiga sinyal yang jadi kriteria (field sama dengan label pill Sinyal
  // Harga / Sinyal RSI / Keyakinan Naik di stocks_screener):
  //   1. Sinyal Harga = crossup EMA 21 H (harga breakout di atas EMA21 H & L)
  //   2. Sinyal RSI   = RSI 7 cross up RSI 21
  //   3. Keyakinan Naik di tier "Tinggi"/"Sangat Tinggi" (tone "up")
  // Kalau ketiganya terpenuhi -> status "confirmed" (setup penuh).
  // Kalau EMA21 Low ada tapi baru sebagian sinyal yang terpenuhi -> tetap
  // ditampilkan, statusnya "partial" (belum full-konfirmasi) supaya
  // kelihatan progress-nya, bukan langsung disembunyikan.
  // Kalau EMA21 Low belum ada di data sama sekali, ATAU tidak ada satupun
  // dari 3 sinyal yang match, blok ini disembunyikan total — jatuh balik
  // ke Trading Plan resistance/support/ATR di atas saja. Sesuaikan
  // substring di bawah kalau format teks cek_harga/cek_rsi berubah.
  //
  // Perhitungan (rasio 1:1, ukur dari EMA21 Low ke harga sekarang):
  //   jarak    = entry - EMA21 Low
  //   SL       = EMA21 Low (dipakai apa adanya untuk target & RRR, supaya
  //              box-nya persis simetris 1:1 seperti acuan/referensi)
  //   TP       = entry + jarak
  //   slOrder  = EMA21 Low - buffer (1-2 tik harga IDX) — HANYA saran
  //              penempatan order stop aktual (margin eksekusi), tidak
  //              dipakai untuk hitung RRR/Target supaya rasio tetap 1:1.
  const cekHargaLower = String(s.cekHarga || "").toLowerCase();
  const cekRsiLower = String(s.cekRsi || "").toLowerCase();
  const hargaCrossEma21 = cekHargaLower.includes("crossup") && cekHargaLower.includes("ema 21 h");
  const rsiCrossUp = cekRsiLower.includes("cross up");
  const keyakinanTinggi = keyakinanToneFromLabel(s.keyakinanNaik) === "up";
  const emaTersedia = s.ema21L != null && entry > s.ema21L;
  const sinyalCocok = [hargaCrossEma21, rsiCrossUp, keyakinanTinggi].filter(Boolean).length;
  const rsiSetupTampil = emaTersedia && sinyalCocok > 0;
  const rsiSetupConfirmed = hargaCrossEma21 && rsiCrossUp && keyakinanTinggi && emaTersedia;

  // Tabel tik harga resmi IDX (fraksi harga), dipakai untuk saran buffer SL.
  function idxTickSize(price){
    if (price == null) return 1;
    if (price < 200) return 1;
    if (price < 500) return 2;
    if (price < 2000) return 5;
    if (price < 5000) return 10;
    return 25;
  }

  let rsiSetup = null;
  if (rsiSetupTampil) {
    const jarak = entry - s.ema21L;                // jarak EMA21 Low -> harga sekarang
    const slRsi = s.ema21L;                          // SL = EMA21 Low apa adanya (rasio 1:1 persis)
    const tpRsi = entry + jarak;                     // TP = entry + jarak, rasio 1:1
    const tick = idxTickSize(s.ema21L);
    const slBuffer = tick * 2;
    const slOrder = s.ema21L - slBuffer;              // saran harga order stop aktual (2 tik di bawah SL)
    const rrrLive = 1;                                // by design selalu 1:1 (risk = reward = jarak)
    const tpRsiPct = entry ? ((tpRsi - entry) / entry) * 100 : null;
    const slRsiPct = entry ? ((slRsi - entry) / entry) * 100 : null;
    const missing = [];
    if (!hargaCrossEma21) missing.push("Sinyal Harga belum crossup EMA21 H");
    if (!rsiCrossUp) missing.push("RSI 7 belum cross up RSI 21");
    if (!keyakinanTinggi) missing.push("Keyakinan Naik belum di tier Tinggi/Sangat Tinggi");
    rsiSetup = { slRsi, tpRsi, jarak, rrrLive, tpRsiPct, slRsiPct, slOrder, confirmed: rsiSetupConfirmed, missing };
  }

  // 2. Sintesis AI (Teknikal, Fundamental, Bandarmologi)
  let aiScore = 0;
  let techDesc = ""; let fundDesc = ""; let bandDesc = "";

  // Evaluasi Teknikal
  if (s.keyakinanTone === "up" || s.trendHarga.includes("Bullish")) { aiScore += 2; techDesc = "Tren dan momentum positif. MACD/RSI mendukung pergerakan naik."; }
  else if (s.keyakinanTone === "gold" || s.trendHarga.includes("Sideways")) { aiScore += 1; techDesc = "Pergerakan konsolidasi. Menunggu konfirmasi breakout atau pantulan support."; }
  else { aiScore -= 1; techDesc = "Tekanan jual teknikal masih kuat atau sedang downtrend."; }

  // Evaluasi Fundamental
  if (s.valuasi && s.valuasi.includes("Murah")) { aiScore += 2; fundDesc = "Valuasi menarik (Undervalued) dengan margin of safety yang baik."; }
  else if (s.valuasi && s.valuasi.includes("Wajar")) { aiScore += 1; fundDesc = "Valuasi tergolong wajar (Fair Value) berdasarkan kinerja saat ini."; }
  else if (s.valuasi && s.valuasi.includes("Kemahalan")) { aiScore -= 1; fundDesc = "Valuasi relatif mahal (Overvalued) dibandingkan historis atau sektornya."; }
  else { fundDesc = "Data rasio fundamental tidak memadai untuk evaluasi valuasi."; }

  // Evaluasi Bandarmologi (Volume & Squeeze)
  if (s.band && s.band.tone === "up" && (s.volRatio || 0) >= 1.5) { aiScore += 2; bandDesc = `Adanya akumulasi kuat (Uang Gede) dengan lonjakan volume ${(s.volRatio || 0).toFixed(1)}x.`; }
  else if (s.band && s.band.tone === "up") { aiScore += 1; bandDesc = "Minat beli terpantau stabil dengan volume normal."; }
  else if (s.band && s.band.tone === "down") { aiScore -= 1; bandDesc = "Terdeteksi adanya distribusi atau aksi buang barang dari institusi."; }
  else { bandDesc = "Aktivitas transaksi normal, tidak ada anomali bandarmologi yang mencolok."; }

  // Keputusan Akhir AI
  let aiVerdict = ""; let aiTone = "muted";
  if (aiScore >= 5) { aiVerdict = "🟢 STRONG BUY (Sangat Menarik)"; aiTone = "up"; }
  else if (aiScore >= 3) { aiVerdict = "🟢 BUY (Menarik)"; aiTone = "up"; }
  else if (aiScore >= 1) { aiVerdict = "🟡 HOLD / WAIT & SEE"; aiTone = "gold"; }
  else { aiVerdict = "🔴 AVOID / SELL (Hindari)"; aiTone = "down"; }

  // Link Pencarian Berita Otomatis
  const newsUrl = `https://www.google.com/search?q=saham+${s.ticker}+berita+terbaru&tbm=nws`;

  // --- SKOR GABUNGAN ala screener publik (Fundamental 0–60 + Teknikal 0–40) ---
  // Formula skor situs acuan TIDAK dipublikasikan; ini rekonstruksi
  // transparan dari skema bobot yang terlihat di UI mereka. Semua
  // sub-kriteria ditampilkan apa adanya supaya bisa diaudit user.
  const ft = computeFundTekScore(s);

  return `
    <!-- LIVE DATA STOCKBIT (opsional, tidak resmi) -->
    ${renderStockbitPanel(s)}

    <!-- SKOR BAGGER — formula_screening_saham_bagger.md -->
    <div style="background: linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95)); border: 1px solid var(--${s.bagger.tone}); border-radius: 12px; padding: 16px; margin-bottom: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
      <div style="display:flex; align-items:center; gap: 8px; margin-bottom: 12px; border-bottom: 1px dashed var(--border); padding-bottom: 12px;">
        <span style="font-size: 20px;">🎯</span>
        <div>
          <div style="font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Skor Bagger (Formula Multibagger)</div>
          <div style="font-size: 20px; font-weight: 800; color: var(--${s.bagger.tone});">${s.bagger.total}<span style="font-size:12px;color:var(--muted);font-weight:500;"> /100 · ${s.bagger.tier}</span></div>
        </div>
      </div>
      <div style="display:flex; flex-wrap:wrap; gap: 16px;">
        <div style="flex:1; min-width:180px;">
          <div style="font-size:10.5px; color:var(--muted); text-transform:uppercase; letter-spacing:.04em; margin-bottom:2px;">Fundamental (40%) — <b class="mono" style="color:var(--text);">${s.bagger.fundScore}/40</b></div>
          ${baggerBreakdownRows(s.bagger.fundItems)}
        </div>
        <div style="flex:1; min-width:180px;">
          <div style="font-size:10.5px; color:var(--muted); text-transform:uppercase; letter-spacing:.04em; margin-bottom:2px;">Momentum Teknikal (35%) — <b class="mono" style="color:var(--text);">${s.bagger.momScore}/35</b></div>
          ${baggerBreakdownRows(s.bagger.momItems)}
        </div>
        <div style="flex:1; min-width:180px;">
          <div style="font-size:10.5px; color:var(--muted); text-transform:uppercase; letter-spacing:.04em; margin-bottom:2px;">Volume/Smart Money (25%) — <b class="mono" style="color:var(--text);">${s.bagger.volScore}/25</b></div>
          ${baggerBreakdownRows(s.bagger.volItems)}
        </div>
      </div>
      ${s.bagger.flags.length ? `
      <div style="margin-top: 12px; padding-top: 12px; border-top: 1px dashed var(--border);">
        <div style="font-size: 11px; color: var(--down); font-weight: 700; margin-bottom: 6px;">⚠️ Red Flag (Bagian 4 Formula)</div>
        ${s.bagger.flags.map(f=>`<div style="font-size:11.5px; color:var(--down); margin-bottom:4px; line-height:1.4;">• ${f}</div>`).join("")}
      </div>` : ""}
      <div style="margin-top:10px; font-size:10.5px; color:var(--muted); line-height:1.4;">
        ≥75 kandidat kuat (worth watchlist utama) · 50–74 menarik tapi tunggu konfirmasi tambahan · &lt;50 skip, belum ada "bahan bakar" cukup. Sesuai <i>formula_screening_saham_bagger.md</i>.
      </div>
    </div>

    <!-- SKOR GABUNGAN ala screener publik: Fundamental 0–60 + Teknikal 0–40 -->
    <div style="background: linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95)); border: 1px solid var(--${ft.tone}); border-radius: 12px; padding: 16px; margin-bottom: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
      <div style="display:flex; align-items:center; gap: 8px; margin-bottom: 12px; border-bottom: 1px dashed var(--border); padding-bottom: 12px;">
        <span style="font-size: 20px;">🧮</span>
        <div>
          <div style="font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Skor Gabungan (Fundamental + Teknikal)</div>
          <div style="font-size: 20px; font-weight: 800; color: var(--${ft.tone});">${ft.total}<span style="font-size:12px;color:var(--muted);font-weight:500;"> /100 · ${ft.label} — Fundamental ${ft.fund}/60 · Teknikal ${ft.tech}/40</span></div>
        </div>
      </div>
      <div style="display:flex; flex-wrap:wrap; gap: 16px;">
        <div style="flex:1; min-width:180px;">
          <div style="font-size:10.5px; color:var(--muted); text-transform:uppercase; letter-spacing:.04em; margin-bottom:2px;">Fundamental — <b class="mono" style="color:var(--text);">${ft.fund}/60</b></div>
          ${baggerBreakdownRows(ft.fundItems)}
        </div>
        <div style="flex:1; min-width:180px;">
          <div style="font-size:10.5px; color:var(--muted); text-transform:uppercase; letter-spacing:.04em; margin-bottom:2px;">Teknikal — <b class="mono" style="color:var(--text);">${ft.tech}/40</b></div>
          ${baggerBreakdownRows(ft.techItems)}
        </div>
      </div>
      <div style="margin-top:10px; font-size:10.5px; color:var(--muted); line-height:1.4;">
        Skema bobot mengikuti struktur yang terlihat di screener publik (Fundamental maks 60 poin, Teknikal maks 40 poin). Formula asli situs acuan tidak dipublikasikan — komposisi poin di atas adalah versi transparan milik aplikasi ini, bisa diaudit baris per baris. ≥80 sangat kuat · 65–79 kuat · 50–64 cukup · &lt;50 lemah.
      </div>
    </div>

    <!-- PANEL AI BARU -->
    <div style="background: linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95)); border: 1px solid var(--${aiTone}); border-radius: 12px; padding: 16px; margin-bottom: 24px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
      <div style="display:flex; align-items:center; gap: 8px; margin-bottom: 12px; border-bottom: 1px dashed var(--border); padding-bottom: 12px;">
        <span style="font-size: 20px;">🤖</span>
        <div>
          <div style="font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Kesimpulan Asisten AI</div>
          <div style="font-size: 16px; font-weight: 700; color: var(--${aiTone});">${aiVerdict}</div>
        </div>
      </div>
      <div style="display:grid; gap: 8px; font-size: 12.5px; color: var(--text);">
        <div><b style="color:var(--teal);">📈 Teknikal:</b> ${techDesc}</div>
        <div><b style="color:var(--gold);">🏦 Fundamental:</b> ${fundDesc}</div>
        <div><b style="color:#a78bfa;">🐋 Bandarmologi:</b> ${bandDesc}</div>
      </div>
      <div style="margin-top: 16px; display: flex; gap: 8px;">
        <a class="btn btn-outline" href="${newsUrl}" target="_blank" rel="noopener" style="flex:1; justify-content:center; color:#38bdf8; border-color:rgba(56,189,248,0.3);">
          📰 Cek Sentimen Berita/News Terkini
        </a>
      </div>
    </div>

    <!-- TRADING PLAN (Dipertahankan) -->
    <div class="detail-subtitle">Trading Plan Otomatis (Risk/Reward)</div>
    <<!-- KALKULATOR POSITION SIZING -->
    <div class="calc-box">
      <div style="font-size: 13px; font-weight: 700; color: var(--up);">🧮 Kalkulator Money Management (Position Sizing)</div>
      <div style="font-size: 11px; color: var(--muted); margin-bottom: 8px;">Hitung maksimal Lot yang boleh dibeli agar kerugian tidak melebihi batas risiko Anda jika terkena Stop Loss.</div>
      <div class="calc-input-grid">
        <div>
          <label style="font-size: 11px; color: var(--muted);">Modal Tersedia (Rp)</label>
          <input type="number" id="calcCapital" value="10000000" oninput="calculatePositionSizing(${entry}, ${sl})">
        </div>
        <div>
          <label style="font-size: 11px; color: var(--muted);">Risiko per Trade (%)</label>
          <input type="number" id="calcRiskPct" value="1" step="0.1" oninput="calculatePositionSizing(${entry}, ${sl})">
        </div>
      </div>
      <div class="calc-result" id="calcResultStr">
        Maksimal Pembelian: 0 Lot
      </div>
    </div>

    ${rsiSetup ? `
    <!-- TARGET TP & SL VERSI RSI (Breakout EMA21, rasio 1:1) -->
    <div class="detail-subtitle">🎯 Target TP & SL — Versi RSI (Breakout EMA21) ${rsiSetup.confirmed ? pillHtml("Confirmed", "up") : pillHtml("Belum Full-Konfirmasi", "gold")}</div>
    <div class="detail-grid" style="border-left: 3px solid var(--${rsiSetup.confirmed ? "teal" : "gold"}); padding-left: 10px; margin-bottom: 8px;">
      ${dItem("Stop Loss (EMA21 Low)", '<span style="color:var(--down)">' + dNum(rsiSetup.slRsi) + ' <span style="font-size:11px;opacity:0.8;">(' + rsiSetup.slRsiPct.toFixed(1) + '%)</span></span>', true)}
      ${dItem("Take Profit (Proyeksi 1:1)", '<span style="color:var(--up)">' + dNum(rsiSetup.tpRsi) + ' <span style="font-size:11px;opacity:0.8;">(' + (rsiSetup.tpRsiPct>=0?'+':'') + rsiSetup.tpRsiPct.toFixed(1) + '%)</span></span>', true)}
      ${dItem("Jarak EMA21 Low → Harga Sekarang", dNum(rsiSetup.jarak), true)}
      ${dItem("Risk/Reward Ratio", '<span style="color:var(--up)">' + rsiSetup.rrrLive.toFixed(2) + 'x</span>', true)}
    </div>
    <div class="detail-narrative" style="margin-bottom: 16px;">
      ${rsiSetup.confirmed
        ? `Setup breakout EMA21 <b>terkonfirmasi penuh</b>: harga crossup EMA21 H &amp; L, RSI 7 cross up RSI 21, dan Keyakinan Naik di tier Tinggi/Sangat Tinggi.`
        : `Setup breakout EMA21 <b>belum full-konfirmasi</b> — masih menunggu: ${rsiSetup.missing.join("; ")}.`}
      Jarak dihitung dari EMA21 Low ke harga sekarang. Stop Loss = EMA21 Low, Take Profit = harga sekarang + jarak tersebut, sehingga rasio persis 1:1.
      Untuk eksekusi order aktual, disarankan taruh stop sedikit di bawah level SL di atas — sekitar ${dNum(rsiSetup.slOrder)} (buffer ±2 tik harga) — supaya tidak kena stop karena noise/wick tipis, tanpa mengubah target TP.
      ${!rsiSetup.confirmed ? " Level ini indikatif — pertimbangkan menunggu konfirmasi penuh sebelum entry." : ""}
    </div>
    ` : ``}

    <div class="detail-subtitle">Detail Parameter</div>
    <div class="detail-grid">
      ${dItem("Sinyal MACD", pillHtml(s.cekMacd||"-", ((s.cekMacd||"").includes("Buy")||(s.cekMacd||"").includes("Bullish"))?"up":(s.cekMacd||"").includes("Sell")?"down":"muted"), true)}
      ${dItem("Sinyal Volume", pillHtml(s.sinyalVolume||"-", s.volTone), true)}
      ${dItem("Frekuensi Transaksi", s.frequency!=null ? fmtNum(s.frequency) + (s.freqRatio!=null ? ` <span style="font-size:11px;opacity:0.8;">(${s.freqRatio.toFixed(2)}x)</span>` : "") : "-", true)}
      ${dItem("Sinyal Frekuensi", pillHtml(s.sinyalFrekuensi||"-", s.freqTone), true)}
      ${dItem("Bandarmologi", pillHtml(bandLabel, bandTone), true)}
      ${dItem("Keyakinan Naik", pillHtml(s.keyakinanNaik||"-", s.keyakinanTone), true)}
    </div>
  `;
}

function fmtRp(n){
  if(n===null||n===undefined) return "-";
  const num = Number(n);
  if(isNaN(num)) return "-";
  const abs = Math.abs(num);
  const sign = num<0 ? "-" : "+";
  if(abs>=1e12) return sign+(abs/1e12).toFixed(2)+" T";
  if(abs>=1e9)  return sign+(abs/1e9).toFixed(2)+" M";
  if(abs>=1e6)  return sign+(abs/1e6).toFixed(1)+" jt";
  return sign+fmtNum(abs);
}
// Sama seperti fmtRp tapi tanpa tanda +/- di depan — dipakai untuk
// kuantitas non-arah seperti Market Cap (bukan Net Asing yang berarah).
function fmtCap(n){
  if(n===null||n===undefined) return "-";
  const num = Number(n);
  if(isNaN(num)) return "-";
  const abs = Math.abs(num);
  if(abs>=1e12) return (num/1e12).toFixed(2)+" T";
  if(abs>=1e9)  return (num/1e9).toFixed(2)+" M";
  if(abs>=1e6)  return (num/1e6).toFixed(1)+" jt";
  return fmtNum(num);
}
// Nilai Wajar (Graham Number) = sqrt(22.5 x EPS x BVPS).
// EPS dan BVPS tidak disimpan mentah di DB, tapi bisa diturunkan dari
// rasio yang sudah ada: PER = harga/EPS -> EPS = harga/PER,
// PBV = harga/BVPS -> BVPS = harga/PBV. Jadi Graham Number bisa
// dihitung tanpa perlu kolom baru, selama PER & PBV positif (EPS/BVPS
// negatif membuat akar tidak valid secara matematis -> null / "-").
function grahamFairValue(s){
  const per = numOrNull(s.per), pbv = numOrNull(s.pbv), price = numOrNull(s.cClose);
  if(per==null || pbv==null || price==null || per<=0 || pbv<=0) return null;
  return price * Math.sqrt(22.5 / (per * pbv));
}

function flowBarsHtml(series){
  if(!Array.isArray(series) || !series.length){
    return `<div class="empty-box" style="padding:20px;font-size:12px;">Belum ada riwayat 20 hari untuk emiten ini.</div>`;
  }
  const max = Math.max(1, ...series.map(v=>Math.abs(Number(v)||0)));
  const bars = series.map(v=>{
    const val = Number(v)||0;
    const h = Math.max(4, Math.round(Math.abs(val)/max*48));
    const color = val>=0 ? "var(--up)" : "var(--down)";
    return `<div title="${fmtRp(val)}" style="width:6px;height:${h}px;background:${color};border-radius:2px;align-self:${val>=0?'flex-end':'flex-start'};"></div>`;
  }).join("");
  return `<div style="display:flex;align-items:center;gap:3px;height:56px;padding:4px 0;">${bars}</div>`;
}

function renderDetailBandarmologi(s){
  const belumAdaData = s.foreignNet20D==null && s.foreignNet5D==null && s.foreignNet1D==null;
  if(belumAdaData){
    return `<div class="empty-box" style="padding:24px;">
      Emiten ini belum punya data aliran dana IDX (kemungkinan suspensi atau nyaris tidak diperdagangkan
      dalam 20 hari terakhir). Kosong di sini artinya "tidak ada transaksi untuk dinilai", bukan nol.
    </div>`;
  }
  return `
    <div class="detail-subtitle">Net Beli Asing (Rupiah)</div>
    <div class="detail-grid">
      ${dItem("1 Hari", `<span style="color:${(s.foreignNet1D??0)>=0?'var(--up)':'var(--down)'}">${fmtRp(s.foreignNet1D)}</span>`, true)}
      ${dItem("5 Hari", `<span style="color:${(s.foreignNet5D??0)>=0?'var(--up)':'var(--down)'}">${fmtRp(s.foreignNet5D)}</span>`, true)}
      ${dItem("20 Hari", `<span style="color:${(s.foreignNet20D??0)>=0?'var(--up)':'var(--down)'}">${fmtRp(s.foreignNet20D)}</span>`, true)}
      ${dItem("Hari Asing Positif", s.foreignUpDays!=null ? `${s.foreignUpDays} / ${s.flowDays??20} hari` : "-", true)}
    </div>

    <div class="detail-subtitle">Grafik Aliran Dana 20 Hari (hijau = net beli, merah = net jual)</div>
    ${flowBarsHtml(s.flowSeries)}

    <div class="detail-subtitle">Karakter Transaksi</div>
    <div class="detail-grid">
      ${dItem("Rata-rata Tiket", s.avgTicket!=null ? fmtRp(s.avgTicket)+"/transaksi" : "-", true)}
      ${dItem("Transaksi Negosiasi", s.crossingPct!=null ? dNum(s.crossingPct,{decimals:1,suffix:'%'}) : "-", true)}
      ${dItem("Update Terakhir", s.flowDate || "-", true)}
    </div>

    <div class="detail-narrative">
      <b>Data asing bukan data bandar.</b> Ini proksi, dan proksi yang kasar — institusi lokal besar
      (dana pensiun, asuransi, manajer investasi dalam negeri) tidak muncul sebagai "asing" sama sekali,
      sementara sebagian dana lokal yang dititipkan lewat kustodian asing justru tercatat sebagai asing.
      Data ini juga harian (bukan real-time) — angka di atas adalah data ${s.flowDate || "hari perdagangan terakhir"},
      berguna untuk pola berminggu-minggu, bukan keputusan intraday. Sumber: IDX resmi, terpisah dari
      indikator "BPJS" di tab Analisa yang murni proxy dari lonjakan volume — dua hal ini tidak sama.
    </div>
  `;
}

function emptyDbsRow(side, rank){ return { side, rank, broker_code:"", lot:"", value_idr:"" }; }

function renderDetailBrokerSummary(s){
  const ticker = s.ticker;
  const rangeMode = !!state.detailBsRangeMode;

  const modeToggle = `
    <div class="bs-mode-toggle" style="display:flex;gap:6px;">
      <button type="button" class="btn btn-outline" data-bs-period-mode="single" style="${!rangeMode?'background:var(--gold);color:#111;border-color:var(--gold);':''}">🗓️ Tanggal</button>
      <button type="button" class="btn btn-outline" data-bs-period-mode="range" style="${rangeMode?'background:var(--gold);color:#111;border-color:var(--gold);':''}">📊 Periode</button>
    </div>`;

  const toolbarInputs = rangeMode ? `
      <input id="dbsDateFrom" class="bs-input" type="date" value="${state.detailBsDateFrom||""}" title="Dari tanggal">
      <span style="color:var(--muted);">–</span>
      <input id="dbsDateTo" class="bs-input" type="date" value="${state.detailBsDateTo||""}" title="Sampai tanggal">
    ` : `<input id="dbsDate" class="bs-input" type="date" value="${state.detailBsDate||""}">`;

  return `
    <div class="bs-wrap">
      <div class="bs-toolbar" style="flex-wrap:wrap;gap:8px;">
        <span class="mono" style="font-weight:700;font-size:14px;">${escapeHtml(ticker)}</span>
        ${modeToggle}
        ${toolbarInputs}
        <button class="btn btn-outline" id="dbsLoadBtn" ${state.detailBsLoading?"disabled":""}>${state.detailBsLoading?"Memuat...":"Muat Data"}</button>
      </div>

      ${state.detailBsMsg ? `<div class="bs-msg ${state.detailBsMsgError?"bs-msg-error":"bs-msg-ok"}">${escapeHtml(state.detailBsMsg)}</div>` : ""}

      ${rangeMode ? renderDetailBrokerSummaryRangeBody() : renderDetailBrokerSummarySingleBody()}
    </div>`;
}

// Mode tanggal tunggal: tampilan Top 5 Buy/Sell untuk SATU hari + editor
// manual (input/edit dari screenshot Stockbit / tempel CSV). Ini perilaku
// asli renderDetailBrokerSummary(), dipisah ke fungsi sendiri supaya bisa
// ditukar dengan renderDetailBrokerSummaryRangeBody() lewat mode toggle.
function renderDetailBrokerSummarySingleBody(){
  const editRows = state.detailBsEditRows && state.detailBsEditRows.length ? state.detailBsEditRows : [];
  const buyEdit = [0,1,2,3,4].map(i => editRows.find(r=>r.side==="buy" && r.rank===i+1) || emptyDbsRow("buy", i+1));
  const sellEdit = [0,1,2,3,4].map(i => editRows.find(r=>r.side==="sell" && r.rank===i+1) || emptyDbsRow("sell", i+1));

  const editRowsHtml = (rows, label) => rows.map((r,i)=>`
    <div class="bs-row">
      <input class="bs-cell" id="dbs${label}Broker${i}" placeholder="Kode" maxlength="6" style="text-transform:uppercase" value="${escapeHtml(r.broker_code||"")}">
      <input class="bs-cell" id="dbs${label}Lot${i}" type="number" placeholder="Lot" value="${r.lot ?? ""}">
      <input class="bs-cell" id="dbs${label}Value${i}" type="number" placeholder="Nilai (Rp)" value="${r.value_idr ?? ""}">
    </div>`).join("");

  const dRows = state.detailBsRows || [];
  const dBuy = dRows.filter(r=>r.side==="buy").sort((a,b)=>a.rank-b.rank);
  const dSell = dRows.filter(r=>r.side==="sell").sort((a,b)=>a.rank-b.rank);
  const maxVal = Math.max(1, ...dRows.map(r=> Number(r.value_idr)||0));
  const barHtml = (r, cls) => `
    <div class="bs-bar-row">
      <span class="bs-bar-broker mono">${escapeHtml(r.broker_code)}${r.investor_type ? ` <span style="font-size:9px;color:var(--muted);font-weight:400;">(${escapeHtml(r.investor_type)})</span>` : ""}</span>
      <div class="bs-bar-track"><div class="bs-bar-fill ${cls}" style="width:${(Number(r.value_idr)/maxVal)*100}%"></div></div>
      <span class="bs-bar-value mono">${fmtNum(r.value_idr)}</span>
    </div>`;

  return `
      ${bsStatusRowHtml(dRows)}

      <div class="bs-display-grid">
        <div>
          <div class="bs-col-title bs-buy">Top 5 Buy</div>
          ${dBuy.length ? dBuy.map(r=>barHtml(r,"bs-fill-buy")).join("") : `<div class="empty-box" style="padding:16px;font-size:12px;">Belum ada data untuk tanggal ini.</div>`}
        </div>
        <div>
          <div class="bs-col-title bs-sell">Top 5 Sell</div>
          ${dSell.length ? dSell.map(r=>barHtml(r,"bs-fill-sell")).join("") : `<div class="empty-box" style="padding:16px;font-size:12px;">Belum ada data untuk tanggal ini.</div>`}
        </div>
      </div>

      <details class="bs-editor-panel" id="dbsEditorPanel" ${state.detailBsEditorOpen?"open":""}>
        <summary>✏️ Input / Edit Manual (dari screenshot Stockbit Anda)</summary>
        <div class="bs-editor-grid">
          <div>
            <div class="bs-col-title bs-buy">Top 5 Buy</div>
            <div class="bs-header-row"><span>Broker</span><span>Lot</span><span>Nilai (Rp)</span></div>
            ${editRowsHtml(buyEdit,"Buy")}
          </div>
          <div>
            <div class="bs-col-title bs-sell">Top 5 Sell</div>
            <div class="bs-header-row"><span>Broker</span><span>Lot</span><span>Nilai (Rp)</span></div>
            ${editRowsHtml(sellEdit,"Sell")}
          </div>
        </div>
        <div class="bs-toolbar" style="margin-top:12px;">
          <button class="btn btn-primary" id="dbsSaveBtn">Simpan ke Database</button>
        </div>
        <div class="bs-csv-panel">
          <label>Atau tempel CSV (format per baris: side,rank,broker_code,lot,value_idr)</label>
          <textarea id="dbsCsvInput" rows="6" placeholder="buy,1,YP,1200000,45000000000">${escapeHtml(state.detailBsCsvText||"")}</textarea>
          <button class="btn btn-outline" id="dbsCsvFillBtn">Isi ke Form dari CSV</button>
        </div>
      </details>`;
}

// Mode periode (rentang tanggal): agregasi Top 5 Buy/Sell (jumlah Lot &
// Nilai) SELAMA rentang "Dari"–"Sampai", dihitung dari baris broker_summary
// harian yang sudah ada di database (data yang sama dengan mode tanggal
// tunggal, cuma dijumlahkan per broker lintas hari). Murni tampilan — tidak
// ada editor manual di sini (edit tetap lewat mode 🗓️ Tanggal per hari).
function renderDetailBrokerSummaryRangeBody(){
  const agg = state.detailBsRangeAgg || { buy: [], sell: [] };
  const allVals = [...agg.buy, ...agg.sell].map(r => Number(r.value_idr) || 0);
  const maxVal = Math.max(1, ...allVals);
  const barHtml = (r, cls) => `
    <div class="bs-bar-row">
      <span class="bs-bar-broker mono">${escapeHtml(r.broker_code)}${r.investor_type ? ` <span style="font-size:9px;color:var(--muted);font-weight:400;">(${escapeHtml(r.investor_type)})</span>` : ""}</span>
      <div class="bs-bar-track"><div class="bs-bar-fill ${cls}" style="width:${(Number(r.value_idr)/maxVal)*100}%"></div></div>
      <span class="bs-bar-value mono">${fmtNum(r.value_idr)} <span style="color:var(--muted);font-size:10px;">· ${r.days}h</span></span>
    </div>`;

  return `
      <div class="bs-display-grid">
        <div>
          <div class="bs-col-title bs-buy">Top 5 Buy (akumulasi periode)</div>
          ${agg.buy.length ? agg.buy.map(r=>barHtml(r,"bs-fill-buy")).join("") : `<div class="empty-box" style="padding:16px;font-size:12px;">Belum ada data untuk periode ini. Isi dulu lewat mode 🗓️ Tanggal, atau pakai "Tarik Otomatis Broker Summary" di tab Screener.</div>`}
        </div>
        <div>
          <div class="bs-col-title bs-sell">Top 5 Sell (akumulasi periode)</div>
          ${agg.sell.length ? agg.sell.map(r=>barHtml(r,"bs-fill-sell")).join("") : `<div class="empty-box" style="padding:16px;font-size:12px;">Belum ada data untuk periode ini. Isi dulu lewat mode 🗓️ Tanggal, atau pakai "Tarik Otomatis Broker Summary" di tab Screener.</div>`}
        </div>
      </div>
      <div style="font-size:10.5px;color:var(--muted);margin-top:10px;">
        Nilai = total akumulasi Lot/Nilai broker tsb selama periode yang dipilih (bukan rata-rata harian). "h" = jumlah hari broker itu masuk Top 5 pada rentang ini. Mode Periode hanya untuk melihat ringkasan — untuk input/edit data manual per hari, beralih ke mode 🗓️ Tanggal.
      </div>`;
}

async function loadDetailBrokerSummary(){
  const ticker = state.detailTicker;
  if(!SUPABASE_URL || !SUPABASE_KEY){ openSettings(); return; }

  if(state.detailBsRangeMode) return loadDetailBrokerSummaryRange();

  const dateEl = document.getElementById("dbsDate");
  const date = dateEl?.value || "";
  state.detailBsDate = date;
  if(!ticker || !date){ state.detailBsMsg = "Tanggal belum diisi."; state.detailBsMsgError = true; render(); return; }

  state.detailBsLoading = true; state.detailBsMsg = ""; render();
  try {
    const qs = new URLSearchParams({ stock_code: `eq.${ticker}`, trade_date: `eq.${date}`, order: "side.asc,rank.asc" });
    const res = await fetch(`${SUPABASE_URL}/broker_summary?${qs}`, { headers: getSupaHeaders(), cache: "no-store" });
    if(!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    const rows = await res.json();
    state.detailBsRows = rows;
    state.detailBsEditRows = rows.map(r=>({ side:r.side, rank:r.rank, broker_code:r.broker_code, lot:r.lot, value_idr:r.value_idr }));
    state.detailBsMsg = rows.length ? `Menampilkan ${rows.length} baris.` : "Belum ada data untuk tanggal ini.";
    state.detailBsMsgError = false;
  } catch(e) {
    state.detailBsMsg = "Gagal memuat: " + e.message;
    state.detailBsMsgError = true;
  }
  state.detailBsLoading = false;
  render();
}

// Mode periode: tarik SEMUA baris broker_summary ticker ini dalam rentang
// tanggal Dari–Sampai (inklusif di kedua ujung, dua filter trade_date lewat
// URLSearchParams.append supaya PostgREST membacanya sebagai AND: gte + lte
// pada kolom yang sama — kalau dibuat lewat object biasa, key kedua akan
// menimpa key pertama karena namanya sama), lalu jumlahkan Lot & Nilai per
// broker+side lintas hari untuk dapat Top 5 Buy/Sell akumulasi periode.
async function loadDetailBrokerSummaryRange(){
  const ticker = state.detailTicker;
  const fromEl = document.getElementById("dbsDateFrom");
  const toEl = document.getElementById("dbsDateTo");
  const from = fromEl?.value || state.detailBsDateFrom || "";
  const to = toEl?.value || state.detailBsDateTo || "";
  state.detailBsDateFrom = from;
  state.detailBsDateTo = to;

  if(!ticker || !from || !to){ state.detailBsMsg = 'Tanggal "Dari" dan "Sampai" belum diisi.'; state.detailBsMsgError = true; render(); return; }
  if(from > to){ state.detailBsMsg = 'Tanggal "Dari" harus sebelum atau sama dengan "Sampai".'; state.detailBsMsgError = true; render(); return; }

  state.detailBsLoading = true; state.detailBsMsg = ""; render();
  try {
    const qs = new URLSearchParams();
    qs.append("stock_code", `eq.${ticker}`);
    qs.append("trade_date", `gte.${from}`);
    qs.append("trade_date", `lte.${to}`);
    qs.append("order", "trade_date.asc,side.asc,rank.asc");
    const res = await fetch(`${SUPABASE_URL}/broker_summary?${qs.toString()}`, { headers: getSupaHeaders(), cache: "no-store" });
    if(!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    const rows = await res.json();

    if(!rows.length){
      state.detailBsRangeAgg = { buy: [], sell: [] };
      state.detailBsRangeDatesCount = 0;
      state.detailBsMsg = `Belum ada data broker summary untuk ${ticker} pada periode ${from} s/d ${to}.`;
      state.detailBsMsgError = true;
    } else {
      const datesSet = new Set(rows.map(r=>r.trade_date));
      const agg = {};
      rows.forEach(r=>{
        const key = r.side + "|" + r.broker_code;
        if(!agg[key]) agg[key] = { side: r.side, broker_code: r.broker_code, lot: 0, value_idr: 0, days: 0, investor_type: r.investor_type || null };
        agg[key].lot += Number(r.lot) || 0;
        agg[key].value_idr += Number(r.value_idr) || 0;
        agg[key].days += 1;
        if(!agg[key].investor_type && r.investor_type) agg[key].investor_type = r.investor_type;
      });
      const aggArr = Object.values(agg);
      const buy = aggArr.filter(a=>a.side==="buy").sort((a,b)=>b.value_idr-a.value_idr).slice(0,5);
      const sell = aggArr.filter(a=>a.side==="sell").sort((a,b)=>b.value_idr-a.value_idr).slice(0,5);
      state.detailBsRangeAgg = { buy, sell };
      state.detailBsRangeDatesCount = datesSet.size;
      state.detailBsMsg = `Menampilkan agregasi ${rows.length} baris dari ${datesSet.size} hari trading (${from} s/d ${to}).`;
      state.detailBsMsgError = false;
    }
  } catch(e) {
    state.detailBsMsg = "Gagal memuat: " + e.message;
    state.detailBsMsgError = true;
    state.detailBsRangeAgg = { buy: [], sell: [] };
  }
  state.detailBsLoading = false;
  render();
}

function readDbsEditorRows(side, code, date){
  const label = side === "buy" ? "Buy" : "Sell";
  const rows = [];
  for(let i=0;i<5;i++){
    const brokerEl = document.getElementById(`dbs${label}Broker${i}`);
    const lotEl = document.getElementById(`dbs${label}Lot${i}`);
    const valEl = document.getElementById(`dbs${label}Value${i}`);
    const broker_code = (brokerEl?.value||"").trim().toUpperCase();
    const value_idr = valEl?.value;
    if(!broker_code || !value_idr) continue;
    const lot = lotEl?.value ? Number(lotEl.value) : null;
    rows.push({
      stock_code: code, trade_date: date, side, rank: i+1,
      broker_code, lot,
      value_idr: Number(value_idr),
      avg_price: calcAvgPrice(value_idr, lot)
    });
  }
  return rows;
}

async function saveDetailBrokerSummaryRows(){
  const code = state.detailTicker;
  const date = state.detailBsDate || document.getElementById("dbsDate")?.value;
  if(!code || !date){ state.detailBsMsg = "Tanggal belum diisi."; state.detailBsMsgError = true; render(); return; }
  if(!SUPABASE_URL || !SUPABASE_KEY){ openSettings(); return; }

  const rows = [...readDbsEditorRows("buy", code, date), ...readDbsEditorRows("sell", code, date)];
  if(!rows.length){ state.detailBsMsg = "Belum ada baris terisi."; state.detailBsMsgError = true; render(); return; }

  try {
    await supaFetch(`${SUPABASE_URL}/broker_summary?on_conflict=stock_code,trade_date,side,rank`, {
      method: "POST",
      headers: { ...getSupaHeaders(), "Prefer": "resolution=merge-duplicates,return=representation" },
      body: JSON.stringify(rows)
    });
    state.detailBsMsg = `Tersimpan ${rows.length} baris.`;
    state.detailBsMsgError = false;
    state.detailBsEditorOpen = true;
    render();
    loadDetailBrokerSummary();
  } catch(e) {
    state.detailBsMsg = "Gagal menyimpan: " + e.message;
    state.detailBsMsgError = true;
    render();
  }
}

function fillDbsFromCsv(){
  const textEl = document.getElementById("dbsCsvInput");
  const text = textEl?.value || "";
  state.detailBsCsvText = text;
  try {
    const lines = text.trim().split("\n").filter(Boolean);
    const rows = lines.map(line=>{
      const [side, rank, broker_code, lot, value_idr] = line.split(",").map(s=>s.trim());
      if(side!=="buy" && side!=="sell") throw new Error(`side harus 'buy'/'sell', dapat: "${side}"`);
      return {
        side, rank: Number(rank),
        broker_code: (broker_code||"").toUpperCase(),
        lot: lot ? Number(lot) : null,
        value_idr: Number(value_idr)
      };
    });
    state.detailBsEditRows = rows;
    state.detailBsEditorOpen = true;
    state.detailBsMsg = "CSV berhasil dibaca ke form. Cek lagi lalu klik Simpan.";
    state.detailBsMsgError = false;
  } catch(e) {
    state.detailBsMsg = "Format CSV tidak valid: " + e.message;
    state.detailBsMsgError = true;
  }
  render();
}

function renderDetailHistorical(s){
  const ticker = s.ticker;
  const rows = state.detailHistoricalRows || [];
  const periodBtn = (key, label) => `<button type="button" class="btn ${state.detailHistoricalPeriod===key?'btn-primary':'btn-outline'}" data-hist-period="${key}" ${state.detailHistoricalLoading?"disabled":""}>${label}</button>`;

  const tableRows = rows.map(r => `
    <tr>
      <td class="mono">${escapeHtml(r.date)}</td>
      <td class="mono" style="text-align:right;">${r.close!=null?fmtNum(r.close):"-"}</td>
      <td class="mono" style="text-align:right;color:${(r.change??0)>=0?'var(--up)':'var(--down)'}">${r.change!=null?dNum(r.change,{plusSign:true}):"-"}${r.changePct!=null?` (${dNum(r.changePct,{plusSign:true,decimals:2,suffix:'%'})})`:""}</td>
      <td class="mono" style="text-align:right;">${r.value!=null?fmtNum(r.value):"-"}</td>
      <td class="mono" style="text-align:right;">${r.volume!=null?fmtNum(r.volume):"-"}</td>
      <td class="mono" style="text-align:right;color:${r.netForeign==null?'inherit':(r.netForeign>=0?'var(--up)':'var(--down)')}" title="Foreign Buy: ${r.foreignBuy!=null?fmtNum(r.foreignBuy):'-'} · Foreign Sell: ${r.foreignSell!=null?fmtNum(r.foreignSell):'-'}">${r.netForeign!=null?dNum(r.netForeign,{plusSign:true}):"-"}</td>
    </tr>`).join("");

  return `
    <div class="bs-wrap">
      <div class="bs-toolbar" style="flex-wrap:wrap;gap:8px;">
        <span class="mono" style="font-weight:700;font-size:14px;">${escapeHtml(ticker)}</span>
        ${periodBtn("daily","Daily")}
        ${periodBtn("weekly","Weekly")}
        ${periodBtn("monthly","Monthly")}
        <button class="btn btn-outline" id="dhistDbBtn" ${state.detailHistoricalLoading?"disabled":""} title="Baca dari tabel price_history_stockbit di Supabase (data yang sudah pernah ditarik dari Stockbit) — tidak memanggil Stockbit sama sekali.">${state.detailHistoricalLoading?"Memuat...":"🔄 Muat dari Database"}</button>
        <button class="btn btn-outline" id="dhistLoadBtn" ${state.detailHistoricalLoading?"disabled":""} title="Panggil langsung endpoint Stockbit (live) lalu simpan manual ke database.">${state.detailHistoricalLoading?"Menarik data...":"⬇️ Tarik Data dari Stockbit"}</button>
        ${rows.length ? `<button class="btn btn-outline" id="dhistSaveBtn">💾 Simpan ke Database</button>` : ""}
        ${rows.length ? `<button class="btn btn-outline" id="dhistCompareBtn" ${state.detailCompareLoading?"disabled":""} style="color:#a78bfa;border-color:rgba(167,139,250,0.4);">${state.detailCompareLoading?"Membandingkan...":"🔍 Bandingkan dengan IDX"}</button>` : ""}
      </div>

      ${state.detailHistoricalMsg ? `<div class="bs-msg ${state.detailHistoricalMsgError?"bs-msg-error":"bs-msg-ok"}">${escapeHtml(state.detailHistoricalMsg)}</div>` : ""}

      ${!rows.length ? `<div class="empty-box" style="margin-top:12px;">Belum ada data. Klik "🔄 Muat dari Database" di atas kalau sudah pernah ditarik sebelumnya (lewat sini atau "Tarik Otomatis" di tab Screener), atau klik "⬇️ Tarik Data dari Stockbit" untuk menariknya langsung (butuh Token Stockbit &amp; Endpoint Historical Data terisi di ⚙️ Pengaturan).</div>` : `
      <div style="overflow-x:auto;margin-top:12px;">
        <table style="width:100%;border-collapse:collapse;font-size:12.5px;">
          <thead>
            <tr style="color:var(--muted);text-align:right;">
              <th style="text-align:left;padding:6px 8px;">Date</th>
              <th style="padding:6px 8px;">Close</th>
              <th style="padding:6px 8px;">Change</th>
              <th style="padding:6px 8px;">Value</th>
              <th style="padding:6px 8px;">Volume</th>
              <th style="padding:6px 8px;" title="Net Foreign (Buy - Sell asing), hover baris untuk lihat rincian Buy/Sell">Net Foreign</th>
            </tr>
          </thead>
          <tbody>${tableRows}</tbody>
        </table>
      </div>`}

      ${state.detailCompareMsg || (state.detailCompareRows && state.detailCompareRows.length) ? `
      <div style="margin-top:16px;">
        <details id="dhistComparePanel" ${state.detailCompareOpen?"open":""}>
          <summary style="cursor:pointer; font-size:12px; color:var(--muted); user-select:none;">
            🔍 Bandingkan dengan IDX (flows) ${state.detailCompareMsg ? `— ${escapeHtml(state.detailCompareMsg)}` : ""}
          </summary>
          ${state.detailCompareRows && state.detailCompareRows.length ? `
          <div style="overflow-x:auto;margin-top:10px;">
            <table style="width:100%;border-collapse:collapse;font-size:11.5px;">
              <thead>
                <tr style="color:var(--muted);text-align:right;">
                  <th style="text-align:left;padding:6px 8px;">Date</th>
                  <th style="padding:6px 8px;" colspan="2">Close (SB / IDX)</th>
                  <th style="padding:6px 8px;" colspan="2">Value (SB / IDX)</th>
                  <th style="padding:6px 8px;" colspan="2">Volume (SB / IDX)</th>
                  <th style="padding:6px 8px;" colspan="2">Net Foreign (SB / IDX)</th>
                </tr>
              </thead>
              <tbody>
                ${state.detailCompareRows.map(r => {
                  const pctDiff = (a,b) => (a==null||b==null||b===0) ? null : Math.abs((a-b)/b);
                  const cellPair = (a,b,fmt=fmtNum) => {
                    const diff = pctDiff(a,b);
                    const warn = diff != null && diff > 0.01; // beda >1% -> tandai kuning
                    const color = a==null||b==null ? 'var(--muted)' : (warn ? 'var(--gold)' : 'inherit');
                    return `<td class="mono" style="text-align:right;color:${color};">${a!=null?fmt(a):"-"}</td><td class="mono" style="text-align:right;color:var(--muted);">${b!=null?fmt(b):"-"}</td>`;
                  };
                  return `<tr>
                    <td class="mono">${escapeHtml(r.date)}</td>
                    ${cellPair(r.closeSb, r.closeIdx)}
                    ${cellPair(r.valueSb, r.valueIdx)}
                    ${cellPair(r.volumeSb, r.volumeIdx)}
                    ${cellPair(r.netForeignSb, r.netForeignIdx, (v)=>dNum(v,{plusSign:true}))}
                  </tr>`;
                }).join("")}
              </tbody>
            </table>
            <div style="font-size:10.5px;color:var(--muted);margin-top:6px;">
              Kolom kiri tiap pasangan = Stockbit, kanan = IDX (<code>flows</code>). Angka <span style="color:var(--gold);">kuning</span> = beda &gt;1% antar sumber (bukan error — dua penyedia data independen, wajar sedikit beda metodologi/timing).
            </div>
          </div>` : ""}
        </details>
      </div>` : ""}
    </div>`;
}

// Sumber UTAMA untuk tab Historical Data di modal Detail: baca dari tabel
// `price_history_stockbit` di Supabase (diisi lewat "⬇️ Tarik Data dari
// Stockbit" di sini ATAU lewat "Tarik Otomatis" bulk di toolbar Screener).
// Dipanggil otomatis tiap kali tab historical dibuka / tombol period
// diganti (lihat setDetailTab & wiring data-hist-period), TIDAK memanggil
// Stockbit sama sekali — jadi tidak kena limitasi/parameter endpoint live
// (mis. "HTTP 400 — Invalid parameter" yang terjadi kalau endpoint historical
// Stockbit tidak menerima kombinasi period+tanggal tertentu). Kalau memang
// perlu data ter-baru yang belum ada di database, pakai tombol "⬇️ Tarik Data
// dari Stockbit" (loadDetailHistorical, live ke Stockbit lalu simpan sendiri).
async function loadDetailHistoricalFromDb(period){
  const ticker = state.detailTicker;
  if(period) state.detailHistoricalPeriod = period;
  if(!ticker) return;
  if(!SUPABASE_URL || !SUPABASE_KEY){ openSettings(); return; }

  state.detailHistoricalLoading = true; state.detailHistoricalMsg = ""; render();
  try {
    const qs = new URLSearchParams({
      stock_code: `eq.${ticker}`,
      period: `eq.${state.detailHistoricalPeriod}`,
      order: "trade_date.asc",
      select: "trade_date,close,change,change_pct,value_idr,volume,open,high,low,frequency,foreign_buy,foreign_sell,net_foreign"
    });
    const res = await fetch(`${SUPABASE_URL}/price_history_stockbit?${qs}`, { headers: getSupaHeaders(), cache: "no-store" });
    if(!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    const rows = await res.json();
    state.detailHistoricalRows = rows.map(r => ({
      date: r.trade_date, close: r.close, change: r.change, changePct: r.change_pct,
      value: r.value_idr, volume: r.volume, open: r.open, high: r.high, low: r.low,
      frequency: r.frequency, foreignBuy: r.foreign_buy, foreignSell: r.foreign_sell, netForeign: r.net_foreign
    }));
    state.detailHistoricalMsg = rows.length
      ? `Menampilkan ${rows.length} baris dari database (${state.detailHistoricalPeriod}).`
      : `Belum ada data ${state.detailHistoricalPeriod} tersimpan di database untuk ${ticker}. Klik "⬇️ Tarik Data dari Stockbit" di bawah, atau pakai "Tarik Otomatis" di tab Screener untuk mengisi database dulu.`;
    state.detailHistoricalMsgError = !rows.length;
  } catch(e) {
    state.detailHistoricalMsg = "Gagal memuat dari database: " + e.message;
    state.detailHistoricalMsgError = true;
    state.detailHistoricalRows = [];
  }
  state.detailHistoricalLoading = false;
  render();
}

// Sumber ALTERNATIF (manual/live): tarik langsung dari Stockbit lewat
// endpoint yang diisi di ⚙️ Pengaturan. Dipicu tombol "⬇️ Tarik Data dari
// Stockbit" — bukan lagi jalur otomatis tab historical (lihat
// loadDetailHistoricalFromDb di atas untuk itu). Hasilnya TIDAK otomatis
// tersimpan; klik "💾 Simpan ke Database" setelahnya (saveDetailHistoricalRows)
// supaya ikut muncul lewat loadDetailHistoricalFromDb lain kali.
async function loadDetailHistorical(period){
  const ticker = state.detailTicker;
  if(period) state.detailHistoricalPeriod = period;
  if(!ticker) return;
  state.detailHistoricalLoading = true; state.detailHistoricalMsg = ""; render();
  const res = await stockbitFetchHistorical(ticker, state.detailHistoricalPeriod);
  if(res.error){
    state.detailHistoricalMsg = res.error;
    state.detailHistoricalMsgError = true;
    state.detailHistoricalRows = [];
  } else {
    const parsed = parseStockbitHistorical(res.raw);
    if(!parsed){
      state.detailHistoricalMsg = "Response diterima tapi formatnya tidak dikenali. Cek console (F12) untuk lihat JSON mentahnya, lalu sesuaikan parseStockbitHistorical() di app.js.";
      state.detailHistoricalMsgError = true;
      state.detailHistoricalRows = [];
      console.log("Stockbit historical raw response:", res.raw);
    } else {
      state.detailHistoricalRows = parsed;
      state.detailHistoricalMsg = `Berhasil menarik ${parsed.length} baris (${state.detailHistoricalPeriod}) langsung dari Stockbit. Klik "💾 Simpan ke Database" supaya tersimpan permanen dan muncul lagi lewat "🔄 Muat dari Database".`;
      state.detailHistoricalMsgError = false;
    }
  }
  state.detailHistoricalLoading = false;
  render();
}

async function saveDetailHistoricalRows(){
  const ticker = state.detailTicker;
  const rows = state.detailHistoricalRows || [];
  if(!ticker || !rows.length) return;
  if(!SUPABASE_URL || !SUPABASE_KEY){ openSettings(); return; }
  try{
    const payload = rows.map(r => ({
      stock_code: ticker, trade_date: r.date, period: state.detailHistoricalPeriod,
      close: r.close, change: r.change, change_pct: r.changePct, value_idr: r.value, volume: r.volume,
      open: r.open, high: r.high, low: r.low, frequency: r.frequency,
      foreign_buy: r.foreignBuy, foreign_sell: r.foreignSell, net_foreign: r.netForeign
    }));
    await supaFetch(`${SUPABASE_URL}/price_history_stockbit?on_conflict=stock_code,trade_date,period`, {
      method: "POST",
      headers: { ...getSupaHeaders(), "Prefer": "resolution=merge-duplicates,return=representation" },
      body: JSON.stringify(payload)
    });
    state.detailHistoricalMsg = `Tersimpan ${payload.length} baris ke tabel price_history_stockbit.`;
    state.detailHistoricalMsgError = false;
  } catch(e){
    state.detailHistoricalMsg = "Gagal menyimpan: " + e.message + " (pastikan sudah jalankan sql/08_price_history_stockbit.sql)";
    state.detailHistoricalMsgError = true;
  }
  render();
}

// ==========================================
// PANEL "BANDINGKAN DENGAN IDX" — validasi silang angka Stockbit
// (price_history_stockbit) vs angka IDX resmi (tabel `flows`, hasil
// sync-idx-full.mjs) untuk ticker & rentang tanggal yang sama. Dua sumber
// ini independen (lihat diskusi sebelumnya) — TIDAK saling menimpa di
// stocks_screener, tapi angkanya bisa sedikit beda karena metodologi/timing
// pencatatan tiap penyedia data. Panel ini murni buat verifikasi manual,
// tidak mengubah data apa pun.
// ==========================================
async function loadDetailCompare(){
  const ticker = state.detailTicker;
  const rows = state.detailHistoricalRows || [];
  if(!ticker || !rows.length){
    state.detailCompareMsg = 'Tarik data Stockbit dulu (tombol "⬇️ Tarik Data dari Stockbit" di atas) sebelum membandingkan.';
    render(); return;
  }
  state.detailCompareLoading = true; state.detailCompareMsg = ""; render();
  try{
    const dates = rows.map(r => r.date).filter(Boolean);
    const qs = new URLSearchParams({
      ticker: `eq.${ticker}`,
      date: `in.(${dates.join(",")})`,
      select: "date,close,value,volume,foreign_buy,foreign_sell",
    });
    const res = await fetch(`${SUPABASE_URL}/flows?${qs}`, { headers: getSupaHeaders(), cache: "no-store" });
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    const flowsRows = await res.json();
    const idxByDate = {};
    flowsRows.forEach(r => { idxByDate[r.date] = r; });

    const combined = rows.map(r => {
      const idx = idxByDate[r.date];
      return {
        date: r.date,
        closeSb: r.close, closeIdx: idx?.close ?? null,
        valueSb: r.value, valueIdx: idx?.value ?? null,
        volumeSb: r.volume, volumeIdx: idx?.volume ?? null,
        netForeignSb: r.netForeign,
        netForeignIdx: (idx?.foreign_buy != null && idx?.foreign_sell != null) ? (idx.foreign_buy - idx.foreign_sell) : null,
      };
    });
    state.detailCompareRows = combined;
    const matchedCount = combined.filter(r => r.closeIdx != null).length;
    state.detailCompareMsg = matchedCount
      ? `${matchedCount}/${combined.length} hari ditemukan juga di \`flows\` (IDX).`
      : `Tidak ada tanggal yang cocok di \`flows\` untuk ${ticker} — kemungkinan sync-idx-full.mjs belum pernah menjangkau ticker/periode ini.`;
    state.detailCompareOpen = true;
  }catch(e){
    state.detailCompareMsg = "Gagal membandingkan: " + e.message;
    state.detailCompareRows = [];
  }
  state.detailCompareLoading = false;
  render();
}

// ==========================================
// TARIK OTOMATIS (BULK) — Historical Data untuk banyak ticker sekaligus,
// dipicu dari toolbar tab Screener (mirip Tarik Otomatis Broker Summary).
// Beda dengan broker summary: endpoint historical TIDAK menerima rentang
// tanggal ({ticker}+{period} saja), jadi per ticker cukup SATU request,
// lalu hasilnya disaring ke rentang Dari-Sampai yang dipilih di UI.
// ==========================================
async function fetchExistingHistoricalDates(ticker, dates){
  if(!dates.length) return new Set();
  try{
    const qs = new URLSearchParams({
      stock_code: `eq.${ticker}`, period: "eq.daily",
      trade_date: `in.(${dates.join(",")})`,
      select: "trade_date",
    });
    const res = await fetch(`${SUPABASE_URL}/price_history_stockbit?${qs}`, { headers: getSupaHeaders(), cache: "no-store" });
    if(!res.ok) return new Set();
    const rows = await res.json();
    return new Set(rows.map(r => r.trade_date));
  }catch(e){
    return new Set();
  }
}

async function fetchAndSaveHistoricalBulk(tickers, rangeFrom, rangeTo){
  if(state.stockbitHistoricalBulkLoading) return;
  if(!tickers || !tickers.length){
    state.stockbitHistoricalBulkResults = [{ ticker:"-", date:"-", ok:false, msg:"Centang minimal 1 saham di tab Screener dulu." }];
    render(); return;
  }
  if(!state.stockbitToken){ openSettings(); return; }
  if(!state.stockbitHistoricalEndpoint){
    state.stockbitHistoricalBulkResults = [{ ticker:"-", date:"-", ok:false, msg:'Isi dulu "Endpoint Historical Data" di ⚙️ Pengaturan.' }];
    render(); return;
  }
  if(!SUPABASE_URL || !SUPABASE_KEY){ openSettings(); return; }

  const tradingDates = tradingDaysInRange(rangeFrom, rangeTo);
  if(!tradingDates.length){
    state.stockbitHistoricalBulkResults = [{ ticker:"-", date:"-", ok:false, msg:'Periode tanggal tidak valid atau tidak ada hari bursa di rentang itu — cek lagi tanggal "Dari" dan "Sampai".' }];
    render(); return;
  }
  const fromDate = tradingDates[0];
  const toDate = tradingDates[tradingDates.length - 1];
  const latestDate = toDate; // hari bursa paling baru — tetap ditarik ulang walau sudah ada, sama seperti broker summary

  state.stockbitHistoricalBulkLoading = true;
  state.stockbitHistoricalBulkProgress = { done: 0, total: tickers.length };
  state.stockbitHistoricalBulkResults = [];
  render();

  for(const ticker of tickers){
    const existingDates = await fetchExistingHistoricalDates(ticker, tradingDates);
    const neededDates = tradingDates.filter(d => !existingDates.has(d) || d === latestDate);

    if(!neededDates.length){
      state.stockbitHistoricalBulkResults.push({ ticker, date: `${fromDate}..${toDate}`, ok:true, msg: `Semua ${tradingDates.length} hari sudah ada di database, dilewati (tidak ada request ke Stockbit).` });
      state.stockbitHistoricalBulkProgress.done++;
      render();
      continue;
    }

    const res = await stockbitFetchHistorical(ticker, "daily", { startDate: fromDate, endDate: toDate, limit: Math.max(tradingDates.length + 5, 30), page: 1 });
    if(res.error){
      state.stockbitHistoricalBulkResults.push({ ticker, date: `${fromDate}..${toDate}`, ok:false, msg: res.error });
    } else {
      const parsed = parseStockbitHistorical(res.raw);
      if(!parsed){
        state.stockbitHistoricalBulkResults.push({ ticker, date: `${fromDate}..${toDate}`, ok:false, msg: "Response diterima tapi formatnya tidak dikenali (cek console)." });
        console.log(`Stockbit historical raw response (${ticker}):`, res.raw);
      } else {
        const inRange = parsed.filter(r => r.date >= fromDate && r.date <= toDate);
        if(!inRange.length){
          state.stockbitHistoricalBulkResults.push({ ticker, date: `${fromDate}..${toDate}`, ok:false, msg: `Endpoint mengembalikan ${parsed.length} baris tapi tidak ada yang jatuh di rentang ${fromDate}..${toDate} — kemungkinan start_date/end_date/limit di endpoint belum sesuai skema aslinya (cek raw JSON di console).` });
        } else {
          try{
            const payload = inRange.map(r => ({
              stock_code: ticker, trade_date: r.date, period: "daily",
              close: r.close, change: r.change, change_pct: r.changePct, value_idr: r.value, volume: r.volume,
              open: r.open, high: r.high, low: r.low, frequency: r.frequency,
              foreign_buy: r.foreignBuy, foreign_sell: r.foreignSell, net_foreign: r.netForeign
            }));
            await supaFetch(`${SUPABASE_URL}/price_history_stockbit?on_conflict=stock_code,trade_date,period`, {
              method: "POST",
              headers: { ...getSupaHeaders(), "Prefer": "resolution=merge-duplicates,return=representation" },
              body: JSON.stringify(payload)
            });
            const gotDates = new Set(inRange.map(r=>r.date));
            const missing = neededDates.filter(d => !gotDates.has(d));
            state.stockbitHistoricalBulkResults.push({ ticker, date: `${fromDate}..${toDate}`, ok:true,
              msg: `Tersimpan ${payload.length} baris${missing.length ? ` (${missing.length} hari tidak ada di respons endpoint: ${missing.join(", ")})` : ""}.` });
          } catch(e){
            state.stockbitHistoricalBulkResults.push({ ticker, date: `${fromDate}..${toDate}`, ok:false, msg: "Gagal simpan ke DB: " + e.message });
          }
        }
      }
    }
    state.stockbitHistoricalBulkProgress.done++;
    render();
    await new Promise(r => setTimeout(r, 300)); // jeda antar-ticker, jaga rate limit Stockbit
  }

  state.stockbitHistoricalBulkLoading = false;
  render();
}

function renderDetailVsSektor(s){
  const peers = enriched().filter(x=>x.sektor && x.sektor===s.sektor && x.ticker!==s.ticker);
  const metrics = [{key:'roe',label:'ROE',suffix:'%'},{key:'roa',label:'ROA',suffix:'%'},{key:'npm',label:'NPM',suffix:'%'},{key:'der',label:'DER',suffix:'x',lower:true},{key:'per',label:'PER',suffix:'x',lower:true},{key:'pbv',label:'PBV',suffix:'x',lower:true}];
  const avg = key => {const vals=peers.map(x=>Number(x[key])).filter(v=>isFinite(v)); return vals.length?vals.reduce((a,v)=>a+v,0)/vals.length:null;};
  return `<div class="detail-subtitle">Perbandingan dengan ${escapeHtml(s.sektor||'sektor sejenis')} <span class="pill pill-teal">${peers.length} peer</span></div><div class="sector-compare-list">${metrics.map(m=>{const value=Number(s[m.key]), sector=avg(m.key), max=Math.max(Math.abs(value)||0,Math.abs(sector)||0,1), good=!isFinite(value)||!isFinite(sector)?null:(m.lower?value<=sector:value>=sector); return `<div class="sector-compare-row"><div class="sector-compare-label"><strong>${m.label}</strong><span>${good===null?'':good?'✓ di atas sektor':'△ di bawah sektor'}</span></div><div class="sector-bar-pair"><div class="sector-bar-track"><div class="sector-bar-stock ${good===true?'good':good===false?'bad':''}" style="width:${Math.min(100,Math.abs(value)/max*100)}%"></div></div><div class="sector-bar-values"><span>Emiten <b>${isFinite(value)?value.toFixed(2):'-'}${m.suffix}</b></span><span>Sektor <b>${sector!=null?sector.toFixed(2):'-'}${m.suffix}</b></span></div></div></div>`}).join('')}</div><div class="empty-box" style="margin-top:14px;font-size:11px;">Interpretasi memakai rata-rata peer yang tersedia di universe screener, bukan rekomendasi investasi.</div>`;
}

function renderDetailTradingPlan(s){
  return `<div class="detail-subtitle">Trading Plan berbasis level teknikal</div>${renderDetailAnalisa(s)}
    ${bsjpTradePlanCard(s)}`;
}

// ==========================================
// ANALISIS AI (GEMINI)
//
// Beda dengan "🧠 Analisa" (renderDetailAnalisa) yang skornya rule-based
// murni di app.js — tab ini benar-benar memanggil model Gemini (Google)
// lewat REST API generateContent, dipanggil LANGSUNG dari browser pakai
// API key milik user sendiri (lihat ⚙️ Pengaturan → "Analisis AI (Gemini)"),
// bukan lewat Supabase/proxy manapun. Data yang dikirim ke Gemini sebagai
// konteks HANYA field yang sudah ada & terlihat di screener (bukan data
// baru) — jadi kualitas analisisnya seasli/semutakhir data screener itu
// sendiri, bukan riset independen Gemini.
// ==========================================
function buildGeminiPrompt(s){
  const num = (v, suffix="") => (v===null||v===undefined||isNaN(v)) ? "tidak tersedia" : `${fmtNum(Number(v).toFixed ? Number(Number(v).toFixed(2)) : v)}${suffix}`;
  const bandLabel = s.band ? s.band.label : "tidak tersedia";
  const lines = [
    `Ticker: ${s.ticker}`,
    `Sektor: ${s.sektor || "tidak diketahui"}`,
    `Harga terakhir: ${num(s.cClose)} (${s.changePct!=null ? (s.changePct>=0?'+':'')+Number(s.changePct).toFixed(2)+'%' : 'tidak tersedia'} dari hari sebelumnya)`,
    `Market Cap: ${s.marketCap!=null ? fmtCap(s.marketCap) : "tidak tersedia"} — Kategori: ${marketCapTier(s.marketCap)}`,
    `Turnover: Rp ${num(s.turnover)}`,
    `--- Fundamental ---`,
    `PER: ${num(s.per)}x, PBV: ${num(s.pbv)}x, ROE: ${num(s.roe)}%, ROA: ${num(s.roa)}%, DER: ${num(s.der)}x`,
    `Dividend Yield: ${num(s.divYield)}%, Valuasi (heuristik screener): ${s.valuasi || "tidak tersedia"}`,
    `--- Teknikal ---`,
    `Trend Harga (MA): ${s.trendHarga || "tidak tersedia"}`,
    `RSI 7: ${num(s.rsi7)}, RSI 21: ${num(s.rsi21)}, Status RSI: ${s.statusRsi || "tidak tersedia"}`,
    `Sinyal MACD: ${s.cekMacd || "tidak tersedia"}`,
    `Rasio Volume vs rata-rata: ${num(s.volRatio)}x (${s.sinyalVolume || "tidak tersedia"})`,
    `Support terdekat: ${num(s.support)}, Resistance terdekat: ${num(s.resistance)}`,
    `--- Bandarmologi ---`,
    `Sinyal proxy volume+harga: ${bandLabel}`,
    `Net Asing 20 Hari (data resmi IDX): ${s.foreignNet20D!=null ? fmtRp(s.foreignNet20D) : "tidak tersedia"}`,
    `Hari Asing Net Beli: ${s.foreignUpDays!=null ? `${s.foreignUpDays}/${s.flowDays??20} hari` : "tidak tersedia"}`,
    `Uang Gede Masuk: ${s.uangGedeMasuk || "tidak tersedia"}`,
    `--- Ringkasan Screener (rule-based, BUKAN dari AI) ---`,
    `Keyakinan Naik: ${s.keyakinanNaik || "tidak tersedia"}`,
    `Rekomendasi Setup: ${s.rekomendasi && s.rekomendasi!=="-" ? s.rekomendasi : "tidak ada"}`,
  ];
  return `Kamu adalah asisten riset saham untuk investor ritel di Bursa Efek Indonesia (BEI). Berdasarkan data screener saham berikut untuk ticker ${s.ticker}, buat analisis singkat berbahasa Indonesia dengan format:

1. **Ringkasan** (2-3 kalimat kondisi saat ini)
2. **Kekuatan** (poin-poin positif dari data yang ada)
3. **Risiko / Hal yang Perlu Diwaspadai** (poin-poin negatif/peringatan dari data yang ada)
4. **Catatan Penutup** (satu kalimat netral, TANPA rekomendasi beli/jual/hold eksplisit)
5. **Level Ilustratif** (1-2 kalimat singkat menjelaskan DASAR penentuan level entry/TP/SL di bawah, misalnya mengacu ke support/resistance/MA/ATR dari data teknikal di atas — bukan angka baru di luar data yang diberikan)

Data screener (semua angka berasal dari data historis/heuristik, BUKAN prediksi):
${lines.join("\n")}

PENTING: Ini BUKAN saran/rekomendasi investasi finansial. Jangan menyebut diri sebagai penasihat keuangan, jangan memberi instruksi eksplisit "beli"/"jual"/"hold", dan ingatkan secara implisit bahwa keputusan akhir tetap di tangan pembaca. Gunakan bahasa Indonesia yang natural dan ringkas (maksimal ~250 kata) untuk poin 1-5 di atas.

SETELAH poin 1-5 selesai, WAJIB tambahkan tepat SATU baris baru paling akhir (tanpa markdown code fence, tanpa teks apapun setelahnya) persis berformat:
LEVELS_JSON: {"entry": <angka>, "tp1": <angka>, "tp2": <angka atau null>, "sl": <angka>, "basis": "<alasan singkat, maks 12 kata>"}
Aturan angka level ini: harus turunan wajar dari Harga Terakhir/Support/Resistance/Trend yang sudah ada di data di atas (bukan mengarang di luar itu), entry mendekati harga terakhir/area support, tp1 < tp2 (kalau ada) di atas entry, sl di bawah entry/support terdekat. Kalau data teknikal terlalu minim untuk membuat level yang wajar, isi entry/tp1/sl dengan angka Harga Terakhir apa adanya dan jelaskan keterbatasannya di "basis".`;
}

// Ekstrak baris "LEVELS_JSON: {...}" dari akhir respons teks Gemini (lihat
// instruksi format di buildGeminiPrompt). Mengembalikan {cleanText, levels}
// — levels bernilai null kalau baris tidak ada / gagal di-parse, dan
// cleanText selalu berupa teks analisis TANPA baris JSON tsb (supaya tidak
// tampil dobel ke pengguna).
function parseGeminiLevels(rawText){
  const lines = String(rawText||"").split("\n");
  let levels = null;
  let cleanLines = lines;
  for(let i = lines.length - 1; i >= 0; i--){
    const m = lines[i].match(/^\s*LEVELS_JSON:\s*(\{.*\})\s*$/);
    if(m){
      try{
        const parsed = JSON.parse(m[1]);
        const num = v => (v===null || v===undefined || v==="" || isNaN(Number(v))) ? null : Number(v);
        levels = {
          entry: num(parsed.entry),
          tp1: num(parsed.tp1),
          tp2: num(parsed.tp2),
          sl: num(parsed.sl),
          basis: (parsed.basis || "").toString().slice(0, 200)
        };
      }catch(e){ levels = null; }
      cleanLines = lines.slice(0, i).concat(lines.slice(i+1));
      break;
    }
  }
  return { cleanText: cleanLines.join("\n").trim(), levels };
}

async function runGeminiAnalysis(ticker){
  if(state.geminiLoading.has(ticker)) return;
  if(!state.geminiApiKey){
    state.geminiError.set(ticker, 'API key Gemini belum diisi. Buka "⚙️ Pengaturan" → bagian "🤖 Analisis AI (Gemini)".');
    render();
    return;
  }
  const s = enriched().find(x => x.ticker === ticker);
  if(!s){ state.geminiError.set(ticker, `Data untuk ${ticker} tidak ditemukan.`); render(); return; }

  state.geminiLoading.add(ticker);
  state.geminiError.delete(ticker);
  render();
  try{
    const model = state.geminiModel || GEMINI_DEFAULT_MODEL;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(state.geminiApiKey)}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: buildGeminiPrompt(s) }] }],
        generationConfig: { temperature: 0.4 }
      })
    });
    const data = await res.json().catch(()=>null);
    if(!res.ok){
      const msg = data?.error?.message || `HTTP ${res.status}`;
      throw new Error(msg);
    }
    const candidate = data?.candidates?.[0];
    const rawText = (candidate?.content?.parts || []).map(p => p.text || "").join("").trim();
    if(!rawText){
      const blockReason = data?.promptFeedback?.blockReason;
      throw new Error(blockReason ? `Diblokir oleh safety filter Gemini (${blockReason}).` : "Respons kosong dari Gemini.");
    }
    const { cleanText, levels } = parseGeminiLevels(rawText);
    state.geminiAnalysis.set(ticker, { text: cleanText, model, at: Date.now() });
    if(levels) state.geminiLevels.set(ticker, levels); else state.geminiLevels.delete(ticker);
  }catch(e){
    state.geminiError.set(ticker, e.message || String(e));
  }finally{
    state.geminiLoading.delete(ticker);
    render();
  }
}

// Card Entry/TP/SL dari hasil parse LEVELS_JSON Gemini (lihat parseGeminiLevels).
// Gaya visual disamakan dengan bsjpTradePlanCard() supaya konsisten dengan
// Trading Plan rule-based yang sudah ada.
function geminiLevelsCard(levels){
  if(!levels) return "";
  const row = (label, val, tone) => `<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px dashed var(--border);"><span style="color:var(--muted);font-size:12px;">${label}</span><span class="mono" style="font-weight:700;color:${tone||'var(--text)'};">${val}</span></div>`;
  const rp = v => v!=null ? "Rp "+fmtNum(Math.round(v)) : "-";
  const rr = (levels.entry!=null && levels.tp1!=null && levels.sl!=null && (levels.entry - levels.sl) > 0)
    ? ((levels.tp1 - levels.entry) / (levels.entry - levels.sl)).toFixed(2)
    : null;
  return `
    <div style="background:rgba(167,139,250,0.06);border:1px solid rgba(167,139,250,0.25);border-radius:10px;padding:14px;margin-top:10px;">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--muted);font-weight:700;margin-bottom:8px;">🎯 Level Ilustratif dari AI (Entry / TP / SL)</div>
      ${row("Entry", rp(levels.entry))}
      ${row("Target Profit 1", rp(levels.tp1), "var(--up)")}
      ${levels.tp2!=null ? row("Target Profit 2", rp(levels.tp2), "var(--up)") : ""}
      ${row("Stop Loss", rp(levels.sl), "var(--down)")}
      ${rr!=null ? row("Risk : Reward (ke TP1)", "1 : "+rr) : ""}
      ${levels.basis ? `<div style="margin-top:10px;padding-top:10px;border-top:1px dashed var(--border);font-size:11px;color:var(--muted);"><b>Dasar:</b> ${escapeHtml(levels.basis)}</div>` : ""}
      <div style="margin-top:8px;font-size:10px;color:var(--muted);">⚠️ Angka ini dihasilkan model AI dari data yang sama seperti di atas — BUKAN rekomendasi/jaminan, dan bisa saja tidak masuk akal. Selalu cek ulang manual (support/resistance, orderbook, berita) sebelum dipakai.</div>
    </div>`;
}

function renderDetailAiGemini(s){
  const ticker = s.ticker;
  const loading = state.geminiLoading.has(ticker);
  const cached = state.geminiAnalysis.get(ticker);
  const error = state.geminiError.get(ticker);
  const levels = state.geminiLevels.get(ticker);
  const hasKey = !!state.geminiApiKey;

  const analysisHtml = cached
    ? `<div class="empty-box" style="text-align:left;white-space:pre-wrap;line-height:1.6;font-size:13px;background:rgba(167,139,250,0.06);border-color:rgba(167,139,250,0.25);">${escapeHtml(cached.text)}</div>
       <div style="font-size:11px;color:var(--muted);margin-top:6px;">Model: <code>${escapeHtml(cached.model)}</code> · Dihasilkan ${new Date(cached.at).toLocaleString("id-ID")}</div>
       ${geminiLevelsCard(levels)}`
    : "";
  const errorHtml = error
    ? `<div class="empty-box" style="text-align:left;color:#f87171;background:rgba(239,68,68,0.08);border-color:rgba(239,68,68,0.3);">⚠️ ${escapeHtml(error)}</div>`
    : "";

  return `
    <div class="detail-subtitle">🤖 Analisis AI (Gemini) — ${escapeHtml(ticker)}</div>
    <div style="font-size:11.5px;color:var(--muted);margin-bottom:12px;line-height:1.5;">
      Ringkasan berbahasa natural dari model Gemini (Google), berdasarkan data fundamental/teknikal/Bandarmologi
      yang sudah tampil di screener ini sebagai konteks — <b>bukan rekomendasi/nasihat investasi</b>, dan bukan
      riset independen di luar data yang tersedia di sini. Termasuk level Entry/TP/SL ilustratif di bawah.
    </div>
    ${!hasKey ? `<div class="empty-box" style="text-align:left;">API key Gemini belum diisi. Buka <button type="button" onclick="closeDetail();openSettings();" style="background:none;border:none;color:var(--teal);text-decoration:underline;cursor:pointer;padding:0;font-size:12px;">⚙️ Pengaturan</button> → bagian "🤖 Analisis AI (Gemini)" untuk mengisi API key gratis dari Google AI Studio.</div>` : ""}
    <button type="button" class="btn btn-outline" data-gemini-run="${escapeHtml(ticker)}" ${loading || !hasKey ? "disabled" : ""} style="margin-bottom:12px;">
      ${loading ? "⏳ Menganalisis..." : cached ? "🔄 Analisis Ulang" : "🤖 Buat Analisis AI"}
    </button>
    ${errorHtml}
    ${analysisHtml}
  `;
}


function renderDetailModalContent(){
  const s = enriched().find(x => x.ticker === state.detailTicker);
  if(!s){
    return `<div class="empty-box">Data untuk ${state.detailTicker} tidak ditemukan di database.</div>`;
  }
  const tabs = [
    { key:"teknikal", label:"📊 Teknikal" },
    { key:"fundamental", label:"💰 Fundamental" },
    { key:"bandarmologi", label:"🐋 Bandarmologi (IDX)" },
    { key:"brokersum", label:"🏦 Broker Summary" },
    { key:"historical", label:"📅 Historical Data" },
    { key:"analisa", label:"🧠 Analisa" },
    { key:"aiGemini", label:"🤖 AI (Gemini)" },
    { key:"vssektor", label:"⚖️ vs Sektor" },
    { key:"plan", label:"📋 Trading Plan" }
  ];
  const tabBtns = tabs.map(t => `<button type="button" class="detail-tab-btn ${state.detailTab===t.key?'active':''}" data-detail-tab="${t.key}">${t.label}</button>`).join("");
  let body = "";
  if(state.detailTab === "teknikal") body = renderDetailTeknikal(s);
  else if(state.detailTab === "fundamental") body = renderDetailFundamental(s);
  else if(state.detailTab === "bandarmologi") body = renderDetailBandarmologi(s);
  else if(state.detailTab === "brokersum") body = renderDetailBrokerSummary(s);
  else if(state.detailTab === "historical") body = renderDetailHistorical(s);
  else if(state.detailTab === "aiGemini") body = renderDetailAiGemini(s);
  else if(state.detailTab === "vssektor") body = renderDetailVsSektor(s);
  else if(state.detailTab === "plan") body = renderDetailTradingPlan(s);
  else body = renderDetailAnalisa(s);

  return `
    <div class="detail-head">
      <div>
        <div class="detail-head-price">${dNum(s.cClose)} <span style="font-size:15px;font-weight:600;color:${(s.changePct??0)>=0?'var(--up)':'var(--down)'}">${s.changePct!=null?dNum(s.changePct,{plusSign:true,decimals:2,suffix:'%'}):''}</span></div>
        <div class="detail-head-sub">${s.sektor||"Sektor tidak diketahui"} ${s.syariahLabel==="Ya" ? "· Syariah" : ""}</div>
      </div>
      <div style="display:flex;gap:10px;">
        <a class="btn btn-outline" href="#/chart/${encodeURIComponent(s.ticker)}" data-chart="${s.ticker}">Lihat Grafik</a>
        <a class="btn btn-outline btn-tradingview" href="${tvChartPageUrl(s.ticker)}" target="_blank" rel="noopener">TV</a>
        <a class="btn btn-outline btn-stockbit" href="${stockbitUrl(s.ticker)}" target="_blank" rel="noopener">SB</a>
      </div>
    </div>
    <div class="detail-tabs">${tabBtns}</div>
    ${body}
  `;
}


async function loadChart(ticker){
  state.selectedTicker=ticker; state.tab="chart";
  syncHashFromState();
  // Setiap kali buka/ganti ticker, reset tampilan chart ke default yang
  // sudah terbukti paling kepake: rentang 1 bulan, overlay Close/Support/
  // Resisten/EMA21 High-Low/EMA89 aktif (Fibonacci, Bollinger Bands, SAR,
  // SuperTrend, Price Channel dimatikan biar tidak penuh), dan semua panel
  // bawah (Bandar Volume, Volume 20, Stoch RSI, RSI 7&21, Foreign Flow,
  // MACD, Net Foreign Buy/Sell) aktif. User tetap bisa toggle manual
  // sesudahnya lewat checkbox — ini cuma titik awal tiap ganti ticker.
  state.chartRange = "1m";
  state.chartSeries = {
    close:true, support:true, resistance:true, fib:false, bb:false,
    emaHL:true, ema89:true, sar:false, supertrend:false, pc:false,
    bandar:true, vol:true, stochrsi:true, rsi721:true, foreignflow:true, macd:true, netforeign:true
  };
  const stock = enriched().find(s=>s.ticker===ticker);
  state.selectedLevels = stock ? {
    support:stock.support, resistance:stock.resistance,
    ema21H:stock.ema21H, ema21L:stock.ema21L, fib:stock.fib
  } : null;

  // Histori harga ASLI dari tabel `flows` (diisi sync-idx-full.mjs dari
  // IDX), bukan lagi deret acak (genDemoSeries lama). `flows` disimpan
  // sampai ~450 hari kalender terakhir per ticker — lihat MAX_DAYS di
  // sync-idx-full.mjs. Sekarang tarik OHLC penuh + foreign_buy/foreign_sell
  // (bukan cuma close/volume) supaya panel chart custom (SAR, SuperTrend,
  // Price Channel, Bandar Volume, Foreign Flow, Net Foreign Buy/Sell) bisa
  // dihitung -- semuanya butuh high/low atau data asing harian.
  state.chartData = [];
  state.chartLoading = true;
  render();
  try{
    const rows = await fetch(
      `${SUPABASE_URL}/flows?ticker=eq.${encodeURIComponent(ticker)}&select=date,open_price,high,low,close,volume,foreign_buy,foreign_sell&order=date.asc`,
      { headers: getSupaHeaders() }
    ).then(r=>r.json());

    if (Array.isArray(rows) && rows.length){
      state.chartData = rows
        .filter(r => r.close != null)
        .map(r => ({
          date: r.date,
          open: r.open_price == null ? null : Number(r.open_price),
          high: r.high == null ? null : Number(r.high),
          low: r.low == null ? null : Number(r.low),
          close: Math.round(r.close),
          volume: r.volume == null ? null : Number(r.volume),
          foreignBuy: r.foreign_buy == null ? null : Number(r.foreign_buy),
          foreignSell: r.foreign_sell == null ? null : Number(r.foreign_sell),
        }));
    }
  } catch(e){
    state.chartData = [];
  }
  state.chartLoading = false;
  render();
}

// Return true kalau sinkron ke Supabase berhasil, false kalau gagal —
// dulu fungsi ini tidak mengembalikan apa pun sehingga pemanggil
// (saveToBacktest, addManualBacktest) tidak pernah tahu apakah data
// betulan tersimpan di server atau cuma di localStorage.
async function syncBacktestToSupabase(sessionId, sessionDate, items) {
  try {
    // `session_date` di Supabase bertipe kolom `date` (YYYY-MM-DD), tapi
    // `sessionDate` yang dikirim ke fungsi ini adalah string tampilan
    // locale Indonesia (mis. "23/8/2026, 11.29.08" dari
    // toLocaleString('id-ID')) — Postgres tidak bisa parse format itu sama
    // sekali (error: "invalid input syntax for type date"). Daripada
    // ikut-ikutan parse string locale itu (rawan salah locale/format lain
    // di kemudian hari), turunkan tanggal ISO langsung dari sessionId
    // (yang selalu berupa String(Date.now()) — lihat saveToBacktest &
    // addManualBacktest) sehingga selalu valid terlepas dari format
    // tampilan yang dipakai UI.
    const ts = Number(sessionId);
    const sessionDateIso = Number.isFinite(ts)
      ? toLocalISODate(new Date(ts))
      : todayLocalISO();

    await supaFetch(`${SUPABASE_URL}/backtest_sessions`, {
      method: "POST",
      headers: { ...getSupaHeaders(), "Prefer": "resolution=merge-duplicates" },
      body: JSON.stringify({ id: sessionId, session_date: sessionDateIso })
    });
    
    // JANGAN kirim `id` di sini — kolom id di tabel backtest_items adalah
    // GENERATED ALWAYS AS IDENTITY (auto-increment di sisi Supabase), jadi
    // dia MENOLAK kalau client menyertakan nilai id sendiri (error: "cannot
    // insert a non-DEFAULT value into column "id" ... Use OVERRIDING SYSTEM
    // VALUE to override"). Sebelumnya kode ini generate id manual
    // (Date.now()+random) dan selalu gagal di sini — makanya backtest tidak
    // pernah benar-benar tersimpan di Supabase meskipun sukses di
    // localStorage. Tidak ada bagian lain di app yang butuh id ini (hapus
    // item pakai session_id+ticker), jadi aman dihilangkan.
    const payloadItems = items.map(it => ({
      session_id: sessionId, ticker: it.ticker,
      entry_price: it.entryPrice || it.hargaEntry || 0,
      source: it.sumber || "Screener", notes: it.filterStr || it.keterangan || "",
      // Kolom baru — nama preset/rule kustom yang menghasilkan entry ini.
      // Butuh kolom `criteria text` di tabel backtest_items (lihat catatan
      // migrasi SQL di bawah); kalau kolom belum ada, Supabase akan
      // menolak insert dengan error "column ... does not exist" — jalankan
      // dulu migrasinya sebelum mencoba lagi.
      criteria: it.kriteria || null,
      // Kolom baru — tanggal entry PER ITEM (bukan cuma tanggal sesi),
      // dipakai kolom "Tanggal Entry" & "Hari" di tab Backtest. Butuh
      // kolom `entry_date date` di tabel backtest_items:
      //   ALTER TABLE backtest_items ADD COLUMN entry_date date;
      // Kalau kolom belum ada, Supabase menolak insert — jalankan migrasi
      // dulu. Selama itu belum dijalankan, data tetap tersimpan lokal
      // (localStorage) dan UI tetap menampilkan tanggal entry dari sana.
      entry_date: it.entryDate || null
    }));
    
    await supaFetch(`${SUPABASE_URL}/backtest_items`, {
      method: "POST",
      headers: { ...getSupaHeaders(), "Prefer": "resolution=merge-duplicates" },
      body: JSON.stringify(payloadItems)
    });
    return true;
  } catch(e) {
    console.error("Gagal sinkron backtest ke Supabase:", e);
    showError(`Backtest tersimpan lokal, tapi GAGAL sinkron ke Supabase: ${e.message}`);
    return false;
  }
}

async function saveToBacktest(){
  const filtered = getFiltered();
  const toSave = filtered.filter(s => state.selectedForBacktest.has(s.ticker));

  if(toSave.length === 0) return alert("Screener kosong atau tidak ada emiten yang dicentang.");

  // Tangkap preset/rule yang SEDANG AKTIF saat tombol ini diklik, supaya
  // kolom Sumber & Kriteria di tab Backtest menunjukkan preset/filter apa
  // yang menghasilkan emiten-emiten ini (bukan cuma "Screener" generik).
  const ctx = getActiveScreenerContext();
  const sessionId = String(Date.now());
  const tglSesi = new Date().toLocaleString('id-ID');
  // Tanggal entry PER ITEM dikunci ke tanggal hari ini SEKALI SAJA saat
  // disimpan (bukan dihitung ulang tiap render) — inilah yang membuat
  // harga & tanggal entry "terkunci": begitu tersimpan, refresh data live
  // di layar tidak pernah menulis ulang entryPrice/entryDate yang sudah
  // ada (lihat renderBacktest — hanya "Harga Live" yang diambil dari data
  // live, "Harga Entry" & "Tanggal Entry" selalu dari item yang tersimpan).
  const tglEntryIso = todayLocalISO();
  const items = toSave.map(s => ({
    ticker: s.ticker,
    entryPrice: s.cClose,
    entryDate: tglEntryIso,
    sumber: ctx.label,
    kriteria: ctx.criteria,
    keterangan: `Harga: ${s.cekHarga}; RSI: ${s.cekRsi}; Status RSI: ${s.statusRsi}; MACD: ${s.cekMacd}; Rasio Vol: ${(s.volRatio??0).toFixed(2)}x (${s.sinyalVolume}); Keyakinan Naik: ${s.keyakinanNaik}`
  }));

  state.backtests.unshift({
    id: sessionId, date: tglSesi,
    items: items.map(it=>({ ticker: it.ticker, entryPrice: it.entryPrice, entryDate: it.entryDate, filterStr: it.keterangan, kriteria: it.kriteria, sumber: it.sumber }))
  });
  saveBacktests();
  state.selectedForBacktest.clear(); 
  render();

  const synced = await syncBacktestToSupabase(sessionId, tglSesi, items);
  alert(synced
    ? `${toSave.length} emiten yang dipilih berhasil disimpan ke tab Backtest.`
    : `${toSave.length} emiten disimpan lokal, tapi gagal sinkron ke Supabase. Lihat pesan error di atas halaman.`);
}

// ==========================================
// "SIMPAN KE BACKTEST" GENERIK — dipakai tab EPS Scanner, Kraken Flow
// (ORCA), BSJP, dan Smart Pick ("Lihat Daftar Lengkap"). Sengaja dibuat
// terpisah dari saveToBacktest() (yang khusus tab Screener & bergantung
// pada getActiveScreenerContext/getFiltered) supaya tiap tab bisa kirim
// item apa adanya (ticker, harga saat itu, label sumber & keterangan
// sendiri) tanpa perlu berpura-pura datang dari filter Screener.
//
// Cara pakai di sebuah renderXxx(): panggil renderBacktestSaveBar(ns, items)
// di tempat toolbar tabel, dengan items = [{ticker, price, kriteria?, keterangan?}].
// Wiring klik/centangnya otomatis lewat wireBacktestSaveControls() yang
// dipanggil dari attachContentEvents() — lihat di bawah.
// ==========================================
function getBacktestSelection(namespace){
  if(!state.genericBacktestSelections[namespace]) state.genericBacktestSelections[namespace] = new Set();
  return state.genericBacktestSelections[namespace];
}

// Merender toolbar kecil "Pilih semua" + tombol "💾 Simpan ke Backtest" di
// atas/bawah sebuah tabel hasil. SEKALIGUS menyimpan snapshot `items` ke
// state.genericBacktestItems[namespace] — inilah yang dibaca wiring
// (select-all & tombol simpan) saat diklik nanti, supaya tidak perlu
// closure atas array yang mungkin sudah basi setelah render berikutnya.
function renderBacktestSaveBar(namespace, items, opts){
  opts = opts || {};
  state.genericBacktestItems[namespace] = items;
  const sel = getBacktestSelection(namespace);
  const validItems = items.filter(it => it && it.ticker && it.price > 0);
  const selectedCount = validItems.filter(it => sel.has(it.ticker)).length;
  const allChecked = validItems.length > 0 && validItems.every(it => sel.has(it.ticker));
  if(!validItems.length) return "";
  return `
    <div class="bt-savebar" style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin:${opts.margin || "10px 0"};padding:8px 12px;background:rgba(6,182,212,0.06);border:1px solid rgba(6,182,212,0.2);border-radius:8px;">
      <label style="display:flex;align-items:center;gap:6px;font-size:11.5px;color:var(--muted);cursor:pointer;">
        <input type="checkbox" class="custom-checkbox" data-bt-select-all="${namespace}" ${allChecked?"checked":""}> Pilih semua (${validItems.length})
      </label>
      <span style="font-size:11px;color:var(--muted);">${selectedCount} dipilih untuk dikirim ke 🔬 Backtest</span>
      <button type="button" class="btn btn-primary" data-bt-save="${namespace}" ${selectedCount===0?"disabled":""} style="margin-left:auto;padding:6px 14px;font-size:12px;">
        💾 Simpan ke Backtest${selectedCount>0?` (${selectedCount})`:""}
      </button>
    </div>`;
}

// Checkbox per-baris — dipasang di kolom pertama tiap <tr>. `item` dipakai
// hanya untuk validasi (ticker & harga wajib ada, kalau tidak baris ini
// tidak bisa dicentang sama sekali — mis. baris tanpa harga live).
function backtestRowCheckbox(namespace, item){
  if(!item || !item.ticker || !(item.price > 0)) return `<td style="width:28px;"></td>`;
  const checked = getBacktestSelection(namespace).has(item.ticker);
  return `<td style="width:28px;"><input type="checkbox" class="custom-checkbox" data-bt-row="${namespace}::${escapeHtml(item.ticker)}" ${checked?"checked":""}></td>`;
}

async function saveGenericListToBacktest(namespace, contextLabel){
  const items = state.genericBacktestItems[namespace] || [];
  const sel = getBacktestSelection(namespace);
  const toSave = items.filter(it => it && it.ticker && it.price > 0 && sel.has(it.ticker));
  if(!toSave.length) return alert("Tidak ada emiten yang dicentang.");

  const sessionId = String(Date.now());
  const tglSesi = new Date().toLocaleString('id-ID');
  // Sama seperti saveToBacktest(): tanggal & harga entry dikunci SEKALI
  // saat disimpan, tidak pernah ditulis ulang oleh refresh data live
  // berikutnya (lihat renderBacktest).
  const tglEntryIso = todayLocalISO();
  const entryItems = toSave.map(it => ({
    ticker: it.ticker,
    entryPrice: it.price,
    entryDate: tglEntryIso,
    sumber: contextLabel,
    kriteria: it.kriteria || contextLabel,
    keterangan: it.keterangan || contextLabel
  }));

  state.backtests.unshift({
    id: sessionId, date: tglSesi,
    items: entryItems.map(it => ({ ticker: it.ticker, entryPrice: it.entryPrice, entryDate: it.entryDate, filterStr: it.keterangan, kriteria: it.kriteria, sumber: it.sumber }))
  });
  saveBacktests();
  sel.clear();
  render();

  const synced = await syncBacktestToSupabase(sessionId, tglSesi, entryItems);
  alert(synced
    ? `${toSave.length} emiten dari "${contextLabel}" berhasil disimpan ke tab Backtest.`
    : `${toSave.length} emiten disimpan lokal, tapi gagal sinkron ke Supabase. Lihat pesan error di atas halaman.`);
}

// Dipanggil dari attachContentEvents() (untuk area tab utama) dan dari
// render() tepat setelah #spListModalContent diisi (untuk modal "Lihat
// Daftar Lengkap" Smart Pick) — scopeEl membatasi querySelectorAll supaya
// tidak salah pasang handler ke elemen di luar area yang baru di-render.
function wireBacktestSaveControls(scopeEl){
  if(!scopeEl) return;
  scopeEl.querySelectorAll("[data-bt-row]").forEach(chk => {
    chk.onchange = () => {
      const [ns, ticker] = String(chk.dataset.btRow).split("::");
      const sel = getBacktestSelection(ns);
      if(chk.checked) sel.add(ticker); else sel.delete(ticker);
      render();
    };
  });
  scopeEl.querySelectorAll("[data-bt-select-all]").forEach(chk => {
    chk.onchange = () => {
      const ns = chk.dataset.btSelectAll;
      const items = (state.genericBacktestItems[ns] || []).filter(it => it && it.ticker && it.price > 0);
      const sel = getBacktestSelection(ns);
      if(chk.checked) items.forEach(it => sel.add(it.ticker));
      else items.forEach(it => sel.delete(it.ticker));
      render();
    };
  });
  scopeEl.querySelectorAll("[data-bt-save]").forEach(btn => {
    btn.onclick = () => {
      const ns = btn.dataset.btSave;
      const labelByNs = {
        eps: "Entry Price Scanner",
        orca: "Kraken Flow (ORCA)",
        bsjp: "BSJP (Beli Sore, Jual Pagi)",
        smartpick: `Smart Pick — ${spTitleFor(state.spListOpenDefId)}`
      };
      saveGenericListToBacktest(ns, labelByNs[ns] || ns);
    };
  });
}

// Versi single-item dari mekanisme "Simpan ke Backtest" generik, khusus
// tab 🎯 Target Bandar — tab ini menganalisis SATU ticker pada satu waktu
// (bukan tabel banyak baris seperti EPS/ORCA/BSJP/Smart Pick), jadi cukup
// satu tombol langsung tanpa checkbox/select-all.
async function saveTargetBandarToBacktest(){
  const ticker = String(state.targetStockCode||"").trim().toUpperCase();
  const price = Math.round(state.targetCurrentPrice||0);
  const avgB = state.targetAvgBandar, lv = state.targetLevels;
  if(!ticker) return alert("Isi dulu Kode Saham di atas.");
  if(!price) return alert("Harga sekarang belum tersedia — klik \"Muat Data\" dulu.");
  const keterangan = (avgB && lv)
    ? `Avg Bandar: ${fmtNum(Math.round(avgB.avgPrice))}; Target R1: ${fmtNum(Math.round(lv.r1))}; Target Max: ${fmtNum(Math.round(lv.max))}${avgB.isEstimate?' (Avg Bandar estimasi)':''}`
    : "Target Bandar";
  state.genericBacktestItems.targetbandar = [{ ticker, price, kriteria: "Target Bandar", keterangan }];
  getBacktestSelection("targetbandar").add(ticker);
  await saveGenericListToBacktest("targetbandar", "Target Bandar");
}

async function addManualBacktest(sessionId, ticker, entryPrice, keterangan, entryDate){
  ticker = String(ticker || "").trim().toUpperCase().replace(".JK","");
  if(!ticker) return alert("Ticker wajib diisi.");
  entryPrice = parseFloat(entryPrice) || 0;
  if(!entryPrice) return alert("Harga entry wajib diisi.");
  const note = keterangan && keterangan.trim() ? keterangan.trim() : "Input manual (uji di luar screener)";
  // Tanggal entry: pakai yang diisi user di form (kalau ada), fallback ke
  // hari ini. Ini yang dikunci sebagai "Tanggal Entry" item — tidak pernah
  // berubah lagi setelah tersimpan (lihat catatan di saveToBacktest).
  const tglEntryIso = (entryDate && /^\d{4}-\d{2}-\d{2}$/.test(entryDate)) ? entryDate : todayLocalISO();

  let sid = sessionId || "";
  let session = sid ? state.backtests.find(b => String(b.id) === String(sid)) : null;
  if(!session){
    sid = String(Date.now());
    session = { id: sid, date: new Date().toLocaleString('id-ID'), items: [] };
    state.backtests.unshift(session);
  }

  // KUNCI HARGA ENTRY: kalau ticker ini sudah ada di sesi yang sama,
  // JANGAN timpa item lama (baik lokal maupun saat upsert ke Supabase
  // lewat "Prefer: resolution=merge-duplicates" pada session_id+ticker
  // yang sama) — tolak dan minta user hapus dulu item lama kalau memang
  // mau mengganti harga/tanggal entry-nya. Tanpa guard ini, menambahkan
  // ticker yang sama dua kali diam-diam mengganti harga entry yang sudah
  // "terkunci" sebelumnya.
  if(session.items.some(it => it.ticker === ticker)){
    return alert(`${ticker} sudah ada di sesi ini dengan harga entry yang sudah terkunci. Hapus item lama dulu (tombol "Hapus" di baris tabel) kalau memang ingin mengganti harga/tanggal entry-nya.`);
  }

  // Manual entry TIDAK punya kriteria screener (ticker & harga diketik
  // sendiri di luar hasil filter), jadi kolom Kriteria diisi keterangan
  // netral, bukan ikut-ikutan preset yang mungkin kebetulan sedang aktif
  // di tab Screener saat ini (itu tidak relevan untuk entry manual).
  const manualKriteria = "Input manual — tidak melalui filter screener";
  session.items.push({ ticker, entryPrice, entryDate: tglEntryIso, filterStr: note, kriteria: manualKriteria, sumber: "Manual" });
  saveBacktests();
  render();

  await syncBacktestToSupabase(sid, session.date, [{ ticker, entryPrice, entryDate: tglEntryIso, sumber: "Manual", filterStr: note, kriteria: manualKriteria }]);
  // Kalau gagal, showError() di dalam syncBacktestToSupabase sudah
  // menampilkan alasannya di banner atas halaman.
}

async function deleteBacktestSession(id){
  if(!confirm("Hapus sesi backtest ini?")) return;
  state.backtests = state.backtests.filter(b => String(b.id) !== String(id));
  saveBacktests();
  render();
  try{ await supaFetch(`${SUPABASE_URL}/backtest_sessions?id=eq.${id}`, { method: "DELETE", headers: getSupaHeaders() }); }
  catch(e){ showError(`Sesi dihapus lokal, tapi gagal dihapus di Supabase (bisa muncul lagi setelah refresh): ${e.message}`); }
}

async function deleteBacktestItem(sessionId, ticker){
  const session = state.backtests.find(b => String(b.id) === String(sessionId));
  if(session){
    session.items = session.items.filter(it => it.ticker !== ticker);
    if(session.items.length === 0) state.backtests = state.backtests.filter(b => String(b.id) !== String(sessionId));
  }
  saveBacktests();
  render();
  try{ await supaFetch(`${SUPABASE_URL}/backtest_items?session_id=eq.${sessionId}&ticker=eq.${ticker}`, { method: "DELETE", headers: getSupaHeaders() }); }
  catch(e){ showError(`Item dihapus lokal, tapi gagal dihapus di Supabase (bisa muncul lagi setelah refresh): ${e.message}`); }
}

// ==========================================
// EKSPOR EXCEL — TAB SCREENER
//
// Mengekspor hasil screener yang SEDANG TAMPIL (sudah kena filter,
// Rules Kustom, preset DSI, pencarian, dan urutan sort) — bukan cuma
// halaman aktif, tapi SELURUH baris hasil filter. Kolom yang diekspor
// mengikuti kolom yang sedang dipilih lewat panel "🧩 Kolom" (state.visibleCols),
// supaya konsisten dengan apa yang dilihat user di tabel.
// ==========================================
let lastScreenerExport = { rows: [], columns: [] };

// Sebagian kolom nilainya nested (mis. "fib.f382", "band.label") atau
// perlu dibulatkan/diformat supaya enak dibaca di Excel (bukan HTML).
function screenerRawValue(s, col){
  switch(col.key){
    case "fib.f382": return s.fib?.f382 ?? null;
    case "fib.f50": return s.fib?.f50 ?? null;
    case "fib.f618": return s.fib?.f618 ?? null;
    case "band.label": return s.band?.label ?? null;
    case "syariah": return (s.syariah===true||s.syariah==="true"||s.syariah==="Ya") ? "Ya" : "Tidak";
    case "changePct": case "volChangePct": case "week52ChangePct": case "vsMa50Pct": case "vsMa200Pct":
      return s[col.key]!=null ? Number(s[col.key].toFixed ? s[col.key].toFixed(2) : s[col.key]) : null;
    case "freqRatio": case "volRatio":
      return s[col.key]!=null ? Number(Number(s[col.key]).toFixed(2)) : null;
    default: {
      const v = s[col.key];
      if(v === undefined) return null;
      if(typeof v === "number") return Number.isFinite(v) ? v : null;
      return v ?? null;
    }
  }
}

function exportScreenerToExcel(){
  const { rows, columns } = lastScreenerExport;
  if(!rows || !rows.length){
    return alert("Tidak ada data screener untuk diekspor (cek filter/pencarian yang aktif).");
  }

  // Selalu sertakan Ticker + Nama Emiten di depan, lalu kolom-kolom
  // yang sedang tampil di tabel (sesuai urutan SCREENER_COLUMNS).
  const data = rows.map(s => {
    const row = { "Ticker": s.ticker, "Nama Emiten": s.name || "-" };
    columns.forEach(col => { row[col.label] = screenerRawValue(s, col); });
    return row;
  });

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Hasil Screener");

  // Lebar kolom otomatis: dasar dari panjang label, minimum 10 char.
  const headers = Object.keys(data[0]);
  worksheet['!cols'] = headers.map(h => ({ wch: Math.max(10, h.length + 2) }));

  const dateStr = todayLocalISO();
  XLSX.writeFile(workbook, `Screener_IHSG_${dateStr}.xlsx`);
}

function exportBacktestToExcel(id) {
  const session = state.backtests.find(b => String(b.id) === String(id));
  if (!session) return;
  
  // 1. Siapkan data dengan kolom "Tanggal Entry"
  const data = session.items.map(item => {
    const liveData = state.stocks.find(s => s.ticker === item.ticker);
    const currentPrice = liveData ? liveData.cClose : item.entryPrice;
    const period = backtestPeriodMetrics(item, currentPrice);
    const pl = period.endPL ?? (item.entryPrice ? ((currentPrice - item.entryPrice) / item.entryPrice) * 100 : null);
    const hariSejak = daysSinceEntry(item.entryDate);

    return {
      "Tanggal Entry": fmtDateID(item.entryDate) !== "-" ? fmtDateID(item.entryDate) : session.date, // fallback ke waktu tangkap/sesi kalau item lama belum punya tanggal sendiri
      "Ticker": item.ticker,
      "Sumber": item.sumber || "Screener",
      "Kriteria Screener": item.kriteria || "-",
      "Harga Entry": item.entryPrice,
      "Harga Live": currentPrice,
      "Profit/Loss (%)": pl != null ? parseFloat(pl.toFixed(2)) : "-",
      "Harga Tertinggi": period.highPeriod ?? "-",
      "Capai P/L (%)": period.maxPL != null ? parseFloat(period.maxPL.toFixed(2)) : "-",
      "Hari": hariSejak ?? "-",
      "Filter / Keterangan": item.filterStr || "-"
    };
  });

  // 2. Buat Workbook & Worksheet Excel murni
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data Backtest");
  
  // 3. Atur lebar kolom agar rapi
  const wscols = [
    {wch: 14}, // Tanggal Entry
    {wch: 10}, // Ticker
    {wch: 12}, // Sumber
    {wch: 40}, // Kriteria Screener
    {wch: 12}, // Harga Entry
    {wch: 12}, // Harga Live
    {wch: 15}, // Profit/Loss (%)
    {wch: 16}, // Harga Tertinggi
    {wch: 14}, // Capai P/L (%)
    {wch: 8},  // Hari
    {wch: 50}  // Keterangan
  ];
  worksheet['!cols'] = wscols;

  // 4. Unduh file sebagai .xlsx
  XLSX.writeFile(workbook, `Backtest_IHSG_${session.id}.xlsx`);
}

function exportAllBacktestToExcel() {
  if (!state.backtests || state.backtests.length === 0) {
    return alert("Belum ada data backtest untuk diekspor.");
  }

  let allData = [];
  
  // Looping untuk menggabungkan seluruh item dari semua sesi
  state.backtests.forEach(session => {
    session.items.forEach(item => {
      const liveData = state.stocks.find(s => s.ticker === item.ticker);
      const currentPrice = liveData ? liveData.cClose : item.entryPrice;
      const period = backtestPeriodMetrics(item, currentPrice);
      const pl = period.endPL ?? (item.entryPrice ? ((currentPrice - item.entryPrice) / item.entryPrice) * 100 : null);
      const hariSejak = daysSinceEntry(item.entryDate);

      allData.push({
        "Tanggal Entry": fmtDateID(item.entryDate) !== "-" ? fmtDateID(item.entryDate) : session.date,
        "Ticker": item.ticker,
        "Sumber": item.sumber || "Screener",
        "Kriteria Screener": item.kriteria || "-",
        "Harga Entry": item.entryPrice,
        "Harga Live": currentPrice,
        "Profit/Loss (%)": pl != null ? parseFloat(pl.toFixed(2)) : "-",
        "Harga Tertinggi": period.highPeriod ?? "-",
        "Capai P/L (%)": period.maxPL != null ? parseFloat(period.maxPL.toFixed(2)) : "-",
        "Hari": hariSejak ?? "-",
        "Filter / Keterangan": item.filterStr || "-"
      });
    });
  });

  if (allData.length === 0) {
    return alert("Sesi backtest kosong, tidak ada item untuk diekspor.");
  }

  // Buat file Excel
  const worksheet = XLSX.utils.json_to_sheet(allData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Semua Backtest");
  
  // Mengatur lebar kolom agar rapi
  const wscols = [
    {wch: 14}, // Tanggal Entry
    {wch: 10}, // Ticker
    {wch: 12}, // Sumber
    {wch: 40}, // Kriteria Screener
    {wch: 12}, // Harga Entry
    {wch: 12}, // Harga Live
    {wch: 15}, // Profit/Loss (%)
    {wch: 16}, // Harga Tertinggi
    {wch: 14}, // Capai P/L (%)
    {wch: 8},  // Hari
    {wch: 50}  // Keterangan
  ];
  worksheet['!cols'] = wscols;

  // Unduh dengan nama file otomatis memakai tanggal hari ini
  const dateStr = todayLocalISO();
  XLSX.writeFile(workbook, `Semua_Backtest_IHSG_${dateStr}.xlsx`);
}

async function syncPortoToServer_(record) {
  const payload = {
    id: record.id, ticker: record.ticker, status: record.status,
    tgl_beli: record.tglBeli || null, harga_beli: record.hargaBeli || 0,
    lot_beli: record.lotBeli || 0, fee_beli_pct: record.feeBeliPct || 0, total_beli: record.totalBeli || 0,
    support: record.support || null, resistance: record.resistance || null,
    fib618: record.fib618 || null, target_tp: record.targetTP || null, cut_loss: record.cutLoss || null,
    tgl_jual: record.tglJual || null, harga_jual: record.hargaJual || 0,
    lot_jual: record.lotJual || 0, fee_jual_pct: record.feeJualPct || 0, net_jual: record.netJual || 0,
    jangka_waktu: record.jangkaWaktu !== "" ? record.jangkaWaktu : null,
    persen_pl: record.persenPL !== "" ? record.persenPL : null,
    nilai_pl: record.nilaiPL !== "" ? record.nilaiPL : null,
    catatan: record.catatan || "", entries: record.entries || []
  };

  // Menggunakan supaFetch agar error dari Supabase tertangkap dan tidak diam-diam gagal
  await supaFetch(`${SUPABASE_URL}/portfolios?on_conflict=id`, {
    method: "POST",
    headers: { ...getSupaHeaders(), "Prefer": "resolution=merge-duplicates" },
    body: JSON.stringify(payload)
  });
}

async function submitPortoForm(){
  const v = readPortoForm();
  if(!v.ticker) return alert("Nama emiten wajib diisi.");
  if(!v.tglBeli || !v.hargaBeli || !v.lotBeli) return alert("Tanggal beli, harga beli, dan jumlah lot wajib diisi.");
  
  const btn = document.getElementById("pfSubmitBtn");
  if (btn) { btn.disabled = true; btn.textContent = "Menyimpan..."; }

  const c = hitungPorto(v);
  const record = {
    id: state.portoEditId || String(Date.now()),
    ticker: v.ticker, tglBeli: v.tglBeli, hargaBeli: v.hargaBeli, lotBeli: v.lotBeli,
    feeBeliPct: isNaN(v.feeBeliPct) ? 0.15 : v.feeBeliPct, totalBeli: c.totalBeli,
    support: v.support, resistance: v.resistance, fib618: v.fib618, targetTP: v.targetTP, cutLoss: v.cutLoss,
    tglJual: v.tglJual, hargaJual: v.hargaJual, lotJual: v.lotJual,
    feeJualPct: isNaN(v.feeJualPct) ? 0.25 : v.feeJualPct, netJual: c.netJual,
    jangkaWaktu: c.jangkaWaktu, persenPL: c.persenPL, nilaiPL: c.nilaiPL, status: c.status,
    catatan: v.catatan
  };

  try {
    // Coba simpan ke database server dulu
    if (SUPABASE_URL) await syncPortoToServer_(record);
    
    // Jika server menerima, baru simpan secara lokal dan tampilkan
    const idx = state.portfolio.findIndex(p => String(p.id) === String(record.id));
    if(idx >= 0) state.portfolio[idx] = record; else state.portfolio.unshift(record);
    savePortoLocal();
    
    state.portoEditId = null;
    state.portoModalOpen = false;
    state.portoPrefill = null;
    render();
  } catch (e) {
    // Memunculkan pop-up error asli dari server
    alert("GAGAL MENYIMPAN KE DATABASE!\n\n" + e.message);
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = state.portoEditId ? "Update Transaksi" : "Simpan Transaksi"; }
  }
}
async function deletePortoRecord(id){
  if(!confirm("Hapus catatan portofolio ini?")) return;
  state.portfolio = state.portfolio.filter(p => String(p.id) !== String(id));
  state.selectedPorto.delete(String(id));
  savePortoLocal();
  render();
  try { await fetch(`${SUPABASE_URL}/portfolios?id=eq.${id}`, { method: "DELETE", headers: getSupaHeaders() }); } catch(e) {}
}

async function bulkDeletePorto(){
  const ids = [...state.selectedPorto];
  if(ids.length === 0) return alert("Belum ada transaksi yang dicentang. Centang dulu di kolom paling kiri tabel.");
  if(!confirm(`Hapus ${ids.length} transaksi portofolio yang dicentang?`)) return;
  state.portfolio = state.portfolio.filter(p => !ids.includes(String(p.id)));
  state.selectedPorto.clear();
  savePortoLocal();
  render();
  try { await fetch(`${SUPABASE_URL}/portfolios?id=in.(${ids.join(',')})`, { method: "DELETE", headers: getSupaHeaders() }); } catch(e) {}
}

function hitungPorto(v){
  const nilaiBeli = (v.hargaBeli||0) * (v.lotBeli||0) * 100;
  const feeBeliRp = nilaiBeli * ((v.feeBeliPct||0)/100);
  const totalBeli = nilaiBeli > 0 ? Math.round(nilaiBeli + feeBeliRp) : 0;

  const nilaiJual = (v.hargaJual||0) * (v.lotJual||0) * 100;
  const feeJualRp = nilaiJual * ((v.feeJualPct||0)/100);
  const netJual = nilaiJual > 0 ? Math.round(nilaiJual - feeJualRp) : 0;

  let jangkaWaktu = "";
  if(v.tglBeli && v.tglJual){
    const d1 = new Date(v.tglBeli), d2 = new Date(v.tglJual);
    if(!isNaN(d1) && !isNaN(d2)) jangkaWaktu = Math.round((d2-d1)/86400000);
  }

  let persenPL = "", nilaiPL = "", status = "Open";
  if(totalBeli > 0 && netJual > 0){
    nilaiPL = netJual - totalBeli;
    persenPL = +((nilaiPL/totalBeli)*100).toFixed(2);
    status = nilaiPL > 0 ? "Win" : (nilaiPL < 0 ? "Loss" : "BEP");
  }
  return { totalBeli, netJual, jangkaWaktu, persenPL, nilaiPL, status };
}

function readPortoForm(){
  const g = id => document.getElementById(id);
  return {
    ticker: (g("pfTicker").value||"").trim().toUpperCase().replace(".JK",""),
    tglBeli: g("pfTglBeli").value,
    hargaBeli: parseFloat(g("pfHargaBeli").value) || 0,
    lotBeli: parseFloat(g("pfLotBeli").value) || 0,
    feeBeliPct: parseFloat(g("pfFeeBeli").value),
    support: g("pfSupport").value,
    resistance: g("pfResistance").value,
    fib618: g("pfFib618").value,
    targetTP: g("pfTargetTP").value,
    cutLoss: g("pfCutLoss").value,
    tglJual: g("pfTglJual").value,
    hargaJual: parseFloat(g("pfHargaJual").value) || 0,
    lotJual: parseFloat(g("pfLotJual").value) || 0,
    feeJualPct: parseFloat(g("pfFeeJual").value),
    catatan: g("pfCatatan").value
  };
}

function recalcPortoForm(){
  const v = readPortoForm();
  const c = hitungPorto(v);
  document.getElementById("pfTotalBeli").value = c.totalBeli ? fmtNum(c.totalBeli) : "";
  document.getElementById("pfNetJual").value = c.netJual ? fmtNum(c.netJual) : "";
  document.getElementById("pfJangka").value = c.jangkaWaktu !== "" ? c.jangkaWaktu + " hari" : "";
  document.getElementById("pfPersenPL").value = c.persenPL !== "" ? (c.persenPL>0?"+":"") + c.persenPL + "%" : "";
  document.getElementById("pfNilaiPL").value = c.nilaiPL !== "" ? fmtNum(c.nilaiPL) : "";
  const statusEl = document.getElementById("pfStatus");
  statusEl.value = c.status;
  statusEl.className = c.status==="Win" ? "status-win" : c.status==="Loss" ? "status-loss" : "status-open";
}

function resetPortoForm(){
  state.portoEditId = null;
  state.portoModalOpen = false;
  state.portoPrefill = null;
  render();
}

function openPortoModal(id){
  state.portoEditId = id || null;
  state.portoModalOpen = true;
  state.portoPrefill = null;
  render();
}

// ==========================================
// TAMBAH KE PORTOFOLIO DARI TAB BACKTEST — dipicu klik kode emiten
// (ticker) di baris tabel Backtest. Membuka modal "Tambah Transaksi
// Portofolio" dalam mode TAMBAH BARU (bukan edit), dengan Ticker, Tanggal
// Beli, dan Harga Beli sudah terisi dari harga/tanggal entry backtest
// yang SUDAH TERKUNCI (item.entryPrice/item.entryDate — lihat catatan di
// saveToBacktest/addManualBacktest) — bukan dari harga live saat ini,
// supaya entry backtest dan entry portofolio konsisten.
// ==========================================
function addBacktestItemToPortfolio(sessionId, ticker){
  const session = state.backtests.find(b => String(b.id) === String(sessionId));
  const item = session ? session.items.find(it => it.ticker === ticker) : null;
  if(!item) return;
  state.portoEditId = null;
  state.portoPrefill = {
    ticker: item.ticker,
    hargaBeli: item.entryPrice || "",
    tglBeli: item.entryDate || todayLocalISO()
  };
  state.portoModalOpen = true;
  render();
}

function autofillPortoFromScreener(){
  const el = document.getElementById("pfTicker");
  if(!el) return;
  const ticker = (el.value||"").trim().toUpperCase().replace(".JK","");
  const s = enriched().find(x=>x.ticker===ticker);
  if(!s) return;
  const sSupport = document.getElementById("pfSupport");
  const sResistance = document.getElementById("pfResistance");
  const sFib618 = document.getElementById("pfFib618");
  if(sSupport) sSupport.value = s.support ?? "";
  if(sResistance) sResistance.value = s.resistance ?? "";
  if(sFib618) sFib618.value = s.fib?.f618 ?? "";
}

function editPortoRecord(id){
  openPortoModal(id);
}

function enriched(){
  return state.stocks.map(s=>{
    const ratio = (s.volRatio!=null && !isNaN(s.volRatio)) ? s.volRatio : (s.cVol/(s.volMA20||1));
    const band = bandarmologi(s, ratio);
    const vol = volumeSignal(s, ratio);
    const sinyalVolume = s.sinyalVolume ?? vol.label;

    // Rasio frekuensi hanya dihitung kalau ada basis pembandingnya
    // (freqAnalyzer atau avgFrequency3m dari DB) — tidak diakal-akali dari
    // Volume, karena Frekuensi & Volume adalah dua metrik berbeda.
    const freqBase = s.freqAnalyzer ?? s.avgFrequency3m ?? null;
    const freqRatio = (s.frequency!=null && freqBase) ? (s.frequency/freqBase) : null;
    let freq = frequencySignal(freqRatio);
    // Fallback: kalau tabel stocks_screener tidak punya kolom "frequency"
    // (frekuensi transaksi HARI INI, beda dari frequency_ma20/ma50), rasio
    // di atas selalu null. Kalau itu terjadi tapi backend sudah menghitung
    // kolom freq_spike ("Ya"/lainnya) sendiri, pakai itu langsung sebagai
    // sinyal — jangan biarkan filter kosong padahal datanya sebenarnya ada.
    if (freqRatio == null && s.freqSpike != null) {
      const isSpike = String(s.freqSpike).trim().toLowerCase() === "ya";
      freq = isSpike
        ? { ratio: null, label: "Ramai (Spike)", tone: "up" }
        : { ratio: null, label: "Normal", tone: "muted" };
    }
    const sinyalFrekuensi = freq.label;

    // Dipakai rule builder ("1 Day Volume Change") — persentase perubahan
    // Volume hari ini vs Volume kemarin (prevVol).
    const volChangePct = (s.prevVol!=null && s.prevVol!==0 && s.cVol!=null) ? ((s.cVol - s.prevVol)/s.prevVol)*100 : null;

    const conf = keyakinanNaik(s, vol);
    const keyakinan = s.keyakinanNaik ?? conf.label;
    const kTone = s.keyakinanNaik ? keyakinanToneFromLabel(s.keyakinanNaik) : conf.tone;
    
    let rekomendasi = "-";
    let rekTone = "muted";
    
    const isBreakout = s.isBBSqueeze && s.isBBSqueeze.indexOf("Ya") > -1 && ratio >= 1.5 && s.cClose > s.ema21H && (s.changePct || 0) > 0;
    const isPullback = s.trendHarga && s.trendHarga.indexOf("Bullish") === 0 && s.cClose <= s.ema21L * 1.03 && s.cClose >= (s.support || 0) * 0.98 && s.stochK != null && s.stochD != null && s.prevStochK < s.prevStochD && s.stochK > s.stochD;

    if (isBreakout) { rekomendasi = "🚀 Breakout"; rekTone = "up"; } 
    else if (isPullback) { rekomendasi = "🧲 Pullback"; rekTone = "gold"; }

    // Skor Bagger dihitung setelah volRatio "asli" (ratio) sudah dipastikan,
    // karena formula.md butuh vol_ratio yang sama dipakai sinyal Bandarmologi
    // di atas, bukan volRatio mentah dari DB yang bisa null.
    const bagger = computeBaggerScore({ ...s, volRatio: ratio });

    // Skor gabungan transparan ala struktur screener publik (60/40).
    // Disimpan di enriched object supaya tabel, export, dashboard modal, dan
    // detail emiten memakai angka yang sama tanpa menghitung ulang berbeda.
    const fundTech = computeFundTekScore({ ...s, volRatio: ratio });

    const merged = {
      ...s, band, volRatio: ratio, sinyalVolume, volTone: vol.tone,
      freqRatio, sinyalFrekuensi, freqTone: freq.tone, volChangePct,
      keyakinanNaik: keyakinan, keyakinanScore: s.keyakinanScore ?? conf.score,
      keyakinanTone: kTone, syariahLabel: boolLabel(s.syariah),
      rekomendasi, rekTone,
      bagger, baggerScoreTotal: bagger.total, baggerTier: bagger.tier, baggerTone: bagger.tone,
      capTier: marketCapTier(s.marketCap),
      fundTech, fundScore60: fundTech.fund, techScore40: fundTech.tech, fundTechScore: fundTech.total
    };
    // BSJP butuh band.tone (dihitung di atas), makanya dihitung terakhir
    // dari objek `merged`, bukan `s` mentah.
    merged.bsjp = computeBsjpEngine(merged, state.bsjpParams || BSJP_DEFAULT_PARAMS);
    return merged;
  });
}

function getFiltered(){
  const hideGocap = document.getElementById("hideGocapChk")?.checked;
  return enriched().filter(s=>{
    if(hideGocap && (s.cClose <= 50 || !s.cVol)) return false;
    if(state.search && !String(s.ticker || "").toLowerCase().includes(state.search.toLowerCase())) return false;
    
    // --- PRESET DSI ---
    if(state.activePreset === 'bagger') {
      // Skor Bagger — composite formula.md (Fundamental 40% + Momentum 35%
      // + Volume/Smart Money 25%). ≥75 = kandidat kuat.
      if ((s.baggerScoreTotal||0) < 75) return false;
    } else if(state.activePreset === 'eri') {
      if (!(s.rsi7 >= 58 && s.rsi7 <= 70 && s.rsi21 >= 50 && s.rsi21 <= 70 && s.rsi7 > s.rsi21)) return false;
      if (!(s.cClose > s.ema21H && s.cClose <= s.ema21H * 1.03 && s.cClose > s.ema89)) return false;
      if (!(s.cHigh > s.prevHigh && s.cLow > s.prevLow && s.cVol > s.prevVol)) return false;
      if (!(s.prevStochK < s.prevStochD && s.stochK > s.stochD)) return false;
    } else if(state.activePreset === 'rsicross') {
      if (!(s.rsi7 >= 58 && s.rsi7 <= 75 && s.rsi21 >= 50 && s.rsi21 <= 75 && s.rsi7 > s.rsi21)) return false;
      if (!(s.cLow < s.ema21L && s.cClose > s.ema21H && s.cClose > s.cOpen)) return false;
      if (!(s.cClose >= (s.cHigh + s.cLow)/2 && s.turnover > 200000000 && s.cClose > s.ma100)) return false;
    } else if(state.activePreset === 'golden') {
      if (!(s.histPrev <= 0 && s.hist > 0)) return false;
      if (!(s.prevStochK < s.prevStochD && s.stochK > s.stochD)) return false;
    } else if (state.activePreset === 'uptrend') {
      if (!(s.cClose > s.ma21 && s.ma21 > s.ma50 && s.ma50 > s.ma100 && s.ma100 > s.ma200)) return false;
    } else if (state.activePreset === 'breakout') {
      if (s.isBBSqueeze && s.isBBSqueeze.indexOf("Ya") === -1) return false;
      if (s.volRatio == null || s.volRatio < 1.5) return false;
      if (s.cClose <= s.ema21H) return false;
      if ((s.changePct || 0) <= 0) return false;
    } else if (state.activePreset === 'pullback') {
      if (!s.trendHarga || s.trendHarga.indexOf("Bullish") !== 0) return false;
      if (s.cClose == null || s.ema21L == null || s.cClose > s.ema21L * 1.03) return false;
      if (s.support != null && s.cClose < s.support * 0.98) return false;
      if ([s.prevStochK,s.prevStochD,s.stochK,s.stochD].every(v=>v!=null)) {
        if (!(s.prevStochK < s.prevStochD && s.stochK > s.stochD)) return false;
      }
    } else if (state.activePreset === 'custom_bandar') {
      if (!(s.cOpen > s.ma21 && s.cOpen > s.ma50 && s.cOpen > s.ma100 && s.cOpen > s.ma200)) return false;
      if (s.volRatio == null || s.volRatio <= 2) return false;
      if (s.turnover == null || s.turnover < 10000000000) return false;
      if (s.band.tone !== "up" && (!s.uangGedeMasuk || !s.uangGedeMasuk.includes("Akumulasi"))) return false;
    } else if (state.activePreset === 'asing_akumulasi') {
      // Bandarmologi ASLI (data resmi IDX), bukan proxy volume seperti
      // 'custom_bandar' di atas. Syarat sama seperti preset "Akumulasi
      // Asing" di idx-screener: net 20 hari besar, konsisten (>=12/20
      // hari positif), dan cukup likuid untuk ditindaklanjuti.
      if (s.foreignNet20D == null || s.foreignNet20D < 50e9) return false;
      if (s.foreignUpDays == null || s.foreignUpDays < 12) return false;
      if (s.turnover == null || s.turnover < 5e9) return false;
    } else if (state.activePreset === 'freq_spike') {
      // Lonjakan jumlah transaksi vs rata-rata. Prioritas: freqRatio kalau
      // ada (dari frequency & freq_ma20/avg_frequency_3m). Kalau tabel
      // tidak punya kolom "frequency" hari ini (freqRatio selalu null),
      // fallback ke kolom freq_spike yang sudah dihitung backend, supaya
      // preset ini tetap jalan pakai data yang memang tersedia di DB.
      const isSpikeFromRatio = s.freqRatio != null && s.freqRatio >= 1.5;
      const isSpikeFromDb = s.freqRatio == null && s.freqSpike != null
        && String(s.freqSpike).trim().toLowerCase() === "ya";
      if (!isSpikeFromRatio && !isSpikeFromDb) return false;
    } else if (state.activePreset === 'deepvalue') {
      if (s.per == null || s.per <= 0 || s.per > 15 || s.pbv == null || s.pbv <= 0 || s.pbv > 1.5 || s.roe == null || s.roe < 8 || s.der == null || s.der > 2) return false;
    } else if (state.activePreset === 'multibagger') {
      if (s.per == null || s.per <= 0 || s.per > 20 || s.roe == null || s.roe < 12 || s.der == null || s.der > 1.5 || s.npm == null || s.npm < 5) return false;
    } else if (state.activePreset === 'growth') {
      if (s.roe == null || s.roe < 15 || s.npm == null || s.npm < 10) return false;
    } else if (state.activePreset === 'defensive') {
      if (s.roe == null || s.roe < 8 || s.der == null || s.der > 1.5 || s.npm == null || s.npm < 5) return false;
    } else if (state.activePreset === 'smallcap') {
      if (s.roe == null || s.roe < 8 || s.per == null || s.per <= 0 || s.per > 25) return false;
      if (s.marketCap == null || s.marketCap >= 1e12) return false;
    }

    const f=state.filters;
    if(f.sektor.length && !f.sektor.includes(s.sektor)) return false;
    if(f.syariahLabel.length && !f.syariahLabel.includes(s.syariahLabel)) return false;
    if(f.cekHarga.length && !f.cekHarga.includes(s.cekHarga)) return false;
    if(f.cekRsi.length && !f.cekRsi.includes(s.cekRsi)) return false;
    if(f.statusRsi.length && !f.statusRsi.includes(s.statusRsi)) return false;
    if(f.cekMacd.length && !f.cekMacd.includes(s.cekMacd)) return false;
    if(f.band.length && !f.band.includes(s.band.label)) return false;
    if(f.sinyalVolume.length && !f.sinyalVolume.includes(s.sinyalVolume)) return false;
    if(f.sinyalFrekuensi.length && !f.sinyalFrekuensi.includes(s.sinyalFrekuensi)) return false;
    if(f.keyakinanNaik.length && !f.keyakinanNaik.includes(s.keyakinanNaik)) return false;
    if(f.trendHarga.length && !f.trendHarga.includes(s.trendHarga)) return false;
    if(f.polaCandle.length && !f.polaCandle.includes(s.polaCandle)) return false;
    if(f.uangGedeMasuk.length && !f.uangGedeMasuk.includes(s.uangGedeMasuk)) return false;
    if(f.isBBSqueeze.length && !f.isBBSqueeze.includes(s.isBBSqueeze)) return false;
    if(f.valuasi.length && !f.valuasi.includes(s.valuasi)) return false;
    // Filter tambahan ala menu "Filter & Screener" publik: kategori Market Cap,
    // keanggotaan LQ45, dan range 52W/YTD. Data yang belum tersedia di DB
    // diperlakukan netral (filter tidak menggugurkan), supaya fitur tidak
    // "hilang" hanya karena kolomnya belum ada di skema. Tapi kalau user
    // EKSPLISIT memilih "Tidak tersedia" (Cap) / "Tidak" (LQ45), baris tanpa
    // data dihitung masuk kelompok itu — jadi tetap bisa difilter.
    if(f.capTier.length){
      const tier = s.marketCap != null ? marketCapTier(s.marketCap) : "Tidak tersedia";
      if(!f.capTier.includes(tier)) return false;
    }
    if(f.lq45.length){
      const lq = s.indexLq45 != null ? (isLq45(s) ? "Ya" : "Tidak") : "Tidak tersedia";
      if(!f.lq45.includes(lq)) return false;
    }

    const rf = state.rangeFilters;
    if(!inRange(s.bbWidth, rf.bbWidth)) return false;
    if(!inRange(s.atr14, rf.atr14)) return false;
    if(!inRange(s.clv, rf.clv)) return false;
    if(!inRange(s.rsi7, rf.rsi7)) return false;
    if(!inRange(s.rsi21, rf.rsi21)) return false;
    if(!inRange(s.frequency, rf.frequency)) return false;
    if(!inRange(s.marketCap, rf.marketCap)) return false;
    if(!inRange(s.week52ChangePct, rf.week52ChangePct)) return false;
    if(!inRange(s.ytdPct, rf.ytdPct)) return false;

    if(state.customRules && state.customRules.length){
      for(const rule of state.customRules){
        if(!evalCustomRule(s, rule)) return false;
      }
    }

    return true;
  });
}

function marketCapTier(value){
  const n = Number(value);
  if(!Number.isFinite(n) || n <= 0) return "Tidak tersedia";
  if(n > 100e12) return "Mega";
  if(n >= 10e12) return "Big";
  if(n >= 1e12) return "Mid";
  if(n >= 100e9) return "Small";
  return "Micro";
}
function isLq45(s){
  const v = s?.indexLq45;
  const text = String(v ?? "").trim().toUpperCase();
  return v === true || v === 1 || text === "TRUE" || text === "YA" || text === "Y" || text === "YES" || text === "1" || text === "LQ45";
}
function inRange(value, range){
  if(!range) return true;
  const hasMin = range.min !== "" && range.min !== null && range.min !== undefined;
  const hasMax = range.max !== "" && range.max !== null && range.max !== undefined;
  if(!hasMin && !hasMax) return true;
  if(value===null || value===undefined || isNaN(value)) return false;
  if(hasMin && value < parseFloat(range.min)) return false;
  if(hasMax && value > parseFloat(range.max)) return false;
  return true;
}
function getSorted(data) {
  if (!state.sort.col) return data;
  return [...data].sort((a, b) => {
    let valA = a[state.sort.col];
    let valB = b[state.sort.col];
    if (state.sort.col === 'band.label') { valA = a.band.label; valB = b.band.label; }
    if (state.sort.col === 'fib.f382') { valA = a.fib?.f382; valB = b.fib?.f382; }
    if (state.sort.col === 'fib.f50') { valA = a.fib?.f50; valB = b.fib?.f50; }
    if (state.sort.col === 'fib.f618') { valA = a.fib?.f618; valB = b.fib?.f618; }
    if (valA == null) valA = -Infinity;
    if (valB == null) valB = -Infinity;
    if (valA < valB) return state.sort.asc ? -1 : 1;
    if (valA > valB) return state.sort.asc ? 1 : -1;
    return 0;
  });
}
function uniqueOpts(list, key){ return [...new Set(list.map(s=> key==="band" ? s.band.label : s[key]))]; }

// ==========================================================
// ✨ SMART PICK — mesin deteksi & skor 5 sinyal
//
// PENTING soal keterbatasan: ini BUKAN model AI/machine-learning beneran.
// Ini scoring rule-based di atas data teknikal yang sudah ada di
// enriched() (posisi 52W, rasio volume, RSI, MA, dst) — dikemas mirip
// "AI Screener" ala Stockbit supaya gampang dibaca. Threshold di bawah
// heuristik pribadi, silakan disesuaikan lewat konstanta di tiap
// detect() kalau hasilnya kurang cocok dengan gaya trading Anda.
// ==========================================================
function clamp01(x){ return Math.max(0, Math.min(1, x)); }
// Likuiditas harian dipakai sebagai syarat minimum tiap sinyal (supaya
// tidak menyarankan saham yang susah dieksekusi) — pakai value_traded
// kalau ada, fallback ke turnover.
function spLiquidity(s){ return (s.valueTraded!=null ? s.valueTraded : s.turnover) || 0; }
// Posisi harga dalam range 52 minggu (0% = di low52w, 100% = di high52w).
// Pakai kolom pos52w dari DB kalau ada; kalau tidak, turunkan sendiri
// dari cClose/high52w/low52w.
function spPos52w(s){
  if(s.pos52w!=null && !isNaN(s.pos52w)) return s.pos52w;
  if(s.high52w!=null && s.low52w!=null && s.high52w > s.low52w){
    return (s.cClose - s.low52w) / (s.high52w - s.low52w) * 100;
  }
  return null;
}
// Rata-rata Value (Rp) historis dari Stockbit (price_history_stockbit),
// EXCLUDE hari ini (kalau kebawa) supaya tidak membandingkan angka hari ini
// dengan dirinya sendiri. null kalau datanya kurang dari 3 hari (belum
// cukup untuk baseline yang wajar) — caller WAJIB fallback ke volRatio biasa
// kalau null, karena ini fitur opsional (cuma ticker yang pernah ditarik
// manual lewat tombol "📅 Historical" yang akan punya data).
function spStockbitAvgValue(ticker){
  const rows = state.stockbitValueHistory?.[ticker];
  if(!rows || rows.length < 3) return null;
  const today = todayLocalISO();
  const hist = rows.filter(r => r.date !== today && r.value_idr > 0);
  if(hist.length < 3) return null;
  const avg = hist.reduce((a,r)=>a+r.value_idr, 0) / hist.length;
  return avg > 0 ? avg : null;
}
// Rasio Value hari ini (live, dari stocks_screener) vs rata-rata Value
// historis Stockbit — versi "volRatio" tapi pakai NILAI transaksi riil
// (value_idr), bukan cuma jumlah lembar. null kalau tidak ada data Stockbit
// untuk ticker ini (lihat spStockbitAvgValue).
function spStockbitValueRatio(s){
  const avg = spStockbitAvgValue(s.ticker);
  if(!avg) return null;
  return spLiquidity(s) / avg;
}

const SMART_PICK_DEFS = [
  {
    id: "area_demand", icon: "📥", tone: "gold",
    title: "Area Demand",
    shortDesc: "Saham profitabel + volume tinggi di area support 52W — siap bounce.",
    definisi: "Saham fundamental sehat yang harganya masuk ke zona bawah range 52 minggu (area support/demand), tapi belum benar-benar rontok — kandidat pantulan (bounce) dari area akumulasi.",
    filter: "Volume Tinggi: wajib ≥ Rp1 M/hari. Saham Hidup: harga ≥ Rp100 (tidak rugi/gocap), Range 52W ≥ 15%. Profitabel: NPM ≥ 0 & ROE ≥ 0. Posisi ≤ 30% range 52W (zona bawah). Reaksi di Support: perubahan harga hari ini &gt; -4% (bukan dump).",
    scoring: "Skor Zona 100 = Support 25 + Reaksi 20 + Volume 25 (rasio spike ATAU nilai transaksi absolut, mana yang lebih tinggi) + Pullback 15 (toleransi ±10% dari support) + Struktur 15 (bonus multi-minggu).",
    sinyalKuat: "Volume spike 2×–5×+ dari rata-rata (badge otomatis) di dekat area support = smart money mulai serap.",
    detect(s){
      const pos = spPos52w(s);
      const liq = spLiquidity(s);
      const changePct = s.changePct || 0;
      // "Saham profitabel" (klaim di shortDesc/definisi) & "Saham Hidup" —
      // dua syarat ini SEBELUMNYA cuma teks doang, tidak pernah dicek di
      // detect(). Null diperlakukan netral/lolos (bukan otomatis gagal),
      // konsisten dengan gaya defensif di kode lain — cuma yang JELAS
      // negatif/sempit yang digugurkan.
      const npmOk = s.npm == null || s.npm >= 0;
      const roeOk = s.roe == null || s.roe >= 0;
      const range52wPct = (s.high52w != null && s.low52w != null && s.low52w > 0) ? (s.high52w - s.low52w) / s.low52w * 100 : null;
      const rangeOk = range52wPct == null || range52wPct >= 15;
      const match = pos != null && pos <= 30 && (s.cClose||0) >= 100 && changePct > -4 && liq >= 1e9 && npmOk && roeOk && rangeOk;
      if(!match) return { match:false, score:0, strong:false };
      const supportScore = 25 * clamp01((30 - pos) / 30);
      const reaksiScore = 20 * clamp01((changePct + 4) / 8);
      // Kalau ada riwayat Value Stockbit untuk ticker ini, pakai rasio Value
      // riil (bukan cuma volRatio lembar) — ambil yang LEBIH TINGGI di antara
      // keduanya, karena keduanya sama-sama indikasi valid smart money masuk,
      // dan volRatio dari `flows`/Yahoo kadang telat/kurang presisi dibanding
      // Value Stockbit yang ditarik manual.
      const stockbitRatio = spStockbitValueRatio(s);
      const volRatioEffective = stockbitRatio != null ? Math.max(s.volRatio || 0, stockbitRatio) : s.volRatio;
      // Volume Score sekarang diambil dari YANG TERBAIK antara dua cara nilai:
      // (a) rasio spike vs rata-rata (cara lama) — bagus buat nangkep saham
      //     yang tiba-tiba ramai padahal biasanya sepi.
      // (b) nilai transaksi ABSOLUT hari ini (cara ihsgscreener.com) — bagus
      //     buat saham yang MEMANG likuid tiap hari (jadi "Vol Sangat Tinggi"
      //     meski rasio spike-nya kecil, mis. TCPI: Rp14M/hari tapi cuma 1.2x
      //     rata-rata — sebelumnya nyaris nol padahal jelas likuid tinggi).
      // Skala absolut: mulai dari syarat wajib match (Rp1 miliar = baseline
      // 0) sampai Rp20 miliar (skor penuh 25).
      const volumeScoreRatio = volRatioEffective != null ? 25 * clamp01((Math.min(volRatioEffective,6) - 1) / 5) : 12;
      const volumeScoreAbsolute = 25 * clamp01((liq - 1e9) / 19e9);
      const volumeScore = Math.max(volumeScoreRatio, volumeScoreAbsolute);
      // Toleransi jarak ke Support dilonggarkan dari 5% -> 10% dari harga
      // support — 5% ternyata terlalu ketat untuk saham yang sudah mulai
      // bounce tapi belum sangat dekat support (mis. TCPI: 8.4% dari support,
      // sebelumnya skor pullback = 0 padahal secara zona masih wajar disebut
      // "dekat support").
      const pullbackScore = s.support ? 15 * (1 - clamp01(Math.abs(s.cClose - s.support) / (s.support * 0.10))) : 7;
      const strukturScore = s.week52ChangePct != null ? (s.week52ChangePct > -25 ? 15 : 6) : 8;
      const score = supportScore + reaksiScore + volumeScore + pullbackScore + strukturScore;
      const strong = score >= 75 && (volRatioEffective||0) >= 2;
      return { match:true, score, strong, stockbitVerified: stockbitRatio != null };
    }
  },
  {
    id: "throwback", icon: "🔁", tone: "teal",
    title: "Throwback / Retest Breakout",
    shortDesc: "Sudah breakout lalu pullback ke support — bounce dari retest.",
    definisi: "Saham yang sudah breakout dari uptrend menengah, lalu turun kembali (pullback) menguji area breakout sebagai support baru, dan mulai memantul lagi.",
    filter: "Posisi 45–90% range 52W (zona atas). Perubahan hari ini ≥ 0% (hold/hijau). Uptrend & pullback ke area breakout sebagai support baru = BONUS skor (bukan syarat wajib).",
    scoring: "Kekuatan uptrend (MA21&gt;MA50&gt;MA100) + kualitas retest (jarak ke support) + posisi bounce 60–80% dari skor total.",
    sinyalKuat: "Uptrend kuat + retest sehat + posisi bounce ≥60% + kenaikan hari ini &gt;2% = retest berkualitas.",
    detect(s){
      const pos = spPos52w(s);
      const changePct = s.changePct || 0;
      // Sebelumnya ada gate tambahan `cClose > MA50` di sini — dihapus karena
      // di spesifikasi acuan, uptrend/pullback (MA21>MA50>MA100, chg13W/26W/4W)
      // itu BONUS SKOR (lihat uptrendScore di bawah), bukan syarat lolos/gugur.
      // Saham retest sehat yang closing-nya pas sedikit di bawah MA50 dulu
      // otomatis gugur duluan — sekarang tetap lolos dengan skor lebih rendah.
      const match = pos != null && pos >= 45 && pos <= 90 && changePct >= 0;
      if(!match) return { match:false, score:0, strong:false };
      const uptrendScore = (s.ma21 > s.ma50 && s.ma50 > s.ma100) ? 40 : (s.cClose > s.ma50 ? 22 : 8);
      const retestRef = s.support || s.ema21L;
      const retestScore = retestRef ? 30 * (1 - clamp01(Math.abs(s.cClose - retestRef) / (retestRef * 0.05))) : 15;
      const bounceScore = 30 * clamp01(changePct / 4);
      const score = uptrendScore + retestScore + bounceScore;
      const strong = score >= 75 && changePct > 2;
      return { match:true, score, strong };
    }
  },
  {
    id: "liquidity_sweep", icon: "💧", tone: "muted",
    title: "Liquidity Sweep",
    shortDesc: "Sapu bawah support lalu reversal tajam — stop hunt bandar.",
    definisi: "Harga menyapu ke bawah zona low 52 minggu (stop hunt / grab liquidity), lalu berbalik naik tajam dari harga yang sama dengan volume tinggi.",
    filter: "Posisi &lt; 30% range 52W (zona bawah). Perubahan hari ini &gt; +1% (reversal). Volume transaksi ≥ Rp100 jt/hari. Drop lebih dalam dari MA + volume spike = bonus skor.",
    scoring: "Kedalaman sweep (drop vs low sebelumnya) + ketajaman reversal hari ini + kekuatan volume vs median.",
    sinyalKuat: "Drop &gt;15% lalu reversal &gt;5% dengan volume &gt;5× median = sweep + reversal kuat.",
    detect(s){
      const pos = spPos52w(s);
      const liq = spLiquidity(s);
      const changePct = s.changePct || 0;
      const match = pos != null && pos < 30 && changePct > 1 && liq >= 100e6;
      if(!match) return { match:false, score:0, strong:false };
      const deeper = (s.prevLow && s.cLow != null && s.cLow < s.prevLow) ? ((s.prevLow - s.cLow) / s.prevLow) * 100 : 0;
      const depthScore = 35 * clamp01(deeper / 10);
      const reversalScore = 35 * clamp01((changePct - 1) / 6);
      // Sama seperti Area Demand — pakai rasio Value Stockbit kalau tersedia,
      // ambil yang lebih tinggi dibanding volRatio biasa (lihat catatan di
      // spStockbitValueRatio()).
      const stockbitRatio = spStockbitValueRatio(s);
      const volRatioEffective = stockbitRatio != null ? Math.max(s.volRatio || 0, stockbitRatio) : s.volRatio;
      const volSpikeScore = volRatioEffective != null ? 30 * clamp01((volRatioEffective - 1) / 4) : 12;
      const score = depthScore + reversalScore + volSpikeScore;
      const strong = score >= 75 && changePct > 5 && (volRatioEffective||0) >= 5;
      return { match:true, score, strong, stockbitVerified: stockbitRatio != null };
    }
  },
  {
    id: "bull_divergence", icon: "📉", tone: "up",
    title: "Bull Divergence",
    shortDesc: "Harga turun tapi momentum berbalik naik — sinyal reversal.",
    definisi: "Harga masih di zona bawah 52 minggu (oversold/downtrend) tapi hari ini naik dengan volume tinggi — sinyal akumulasi & reversal dini.",
    filter: "Posisi harga &lt; 55% range 52W. Perubahan hari ini positif (hijau). Volume transaksi ≥ Rp100 jt/hari.",
    scoring: "Makin dekat ke low 52W = makin tinggi skor. Ditambah volume spike vs median pasar + kenaikan hari ini (%).",
    sinyalKuat: "Harga &lt;20% dari low 52W + naik &gt;3% + volume &gt;5× median = divergence sangat kuat.",
    detect(s){
      const pos = spPos52w(s);
      const liq = spLiquidity(s);
      const changePct = s.changePct || 0;
      const match = pos != null && pos < 55 && changePct > 0 && liq >= 100e6;
      if(!match) return { match:false, score:0, strong:false };
      const proximityScore = 40 * clamp01((55 - pos) / 55);
      const volSpikeScore = s.volRatio != null ? 30 * clamp01((s.volRatio - 1) / 4) : 12;
      const gainScore = 30 * clamp01(changePct / 4);
      const score = proximityScore + volSpikeScore + gainScore;
      const strong = pos < 20 && changePct > 3 && (s.volRatio||0) >= 5;
      return { match:true, score, strong };
    }
  },
  {
    id: "early_breakout", icon: "🚀", tone: "up",
    title: "Early Breakout",
    shortDesc: "Volume meledak + harga dekat resistance — sinyal breakout awal.",
    definisi: "Harga mendekati/menembus resistance dengan volume tinggi — konfirmasi breakout nyata, bukan fake breakout.",
    filter: "Posisi harga &gt; 50% range 52W. Perubahan hari ini positif (hijau). Volume transaksi ≥ Rp100 jt/hari.",
    scoring: "Makin dekat ke high 52W = makin tinggi skor. Ditambah volume breakout vs median pasar + kenaikan hari ini (%).",
    sinyalKuat: "Posisi &gt;85% dari range 52W + naik &gt;4% + volume &gt;5× median = breakout dikonfirmasi, bukan fake.",
    detect(s){
      const pos = spPos52w(s);
      const liq = spLiquidity(s);
      const changePct = s.changePct || 0;
      const match = pos != null && pos > 50 && changePct > 0 && liq >= 100e6;
      if(!match) return { match:false, score:0, strong:false };
      const proximityScore = 40 * clamp01((pos - 50) / 50);
      const volSpikeScore = s.volRatio != null ? 30 * clamp01((s.volRatio - 1) / 4) : 12;
      const gainScore = 30 * clamp01(changePct / 4);
      const score = proximityScore + volSpikeScore + gainScore;
      const strong = pos > 85 && changePct > 4 && (s.volRatio||0) >= 5;
      return { match:true, score, strong };
    }
  }
];

function spDefById(id){ return SMART_PICK_DEFS.find(d=>d.id===id); }
function spToneFor(id){ return (spDefById(id) || {}).tone || "muted"; }
function spTitleFor(id){ return (spDefById(id) || {}).title || id; }

function getSmartPickMatches(defId){
  const def = spDefById(defId);
  if(!def) return [];
  return enriched()
    .map(s => ({ ticker: s.ticker, ...def.detect(s) }))
    .filter(m => m.match)
    .sort((a,b) => b.score - a.score);
}

// Versi lengkap untuk modal "Daftar Saham" — beda dari getSmartPickMatches
// (yang cuma dipakai chip ringkas di kartu), ini bawa data harga/posisi/vol
// sekalian supaya bisa ditampilkan sebagai tabel data saham per fitur.
function getSmartPickMatchesFull(defId){
  const def = spDefById(defId);
  if(!def) return [];
  return enriched()
    .map(s => {
      const r = def.detect(s);
      if(!r.match) return null;
      return {
        ticker: s.ticker, sektor: s.sektor, name: s.name,
        price: s.cClose, changePct: s.changePct,
        pos52w: spPos52w(s), volRatio: s.volRatio,
        score: r.score, strong: r.strong, stockbitVerified: !!r.stockbitVerified
      };
    })
    .filter(Boolean)
    .sort((a,b) => b.score - a.score);
}

// Gabungkan riwayat sinyal yang sudah difinalisasi (state.spHistory) dengan
// harga live saat ini (state.stocks) untuk menghitung Now / Tertinggi / Δ% /
// P/L / Hari di tabel Rekap & Share Signal.
//
// HARGA TERTINGGI: kolom `highest_price` di tabel smart_pick_signals dipakai
// sebagai "rekor" harga tertinggi yang pernah tercatat sejak sinyal ini
// difinalisasi (diupdate diam-diam oleh syncHighestPrices() tiap kali tab
// ini dibuka & harga live saat itu memecahkan rekor lama). Kalau kolomnya
// belum ada di DB (belum migrasi), fallback-nya adalah max(entry, now) —
// jadi tabel tetap tampil masuk akal, cuma histori tertingginya belum
// "diingat" lintas sesi sampai kolomnya ditambahkan (lihat sql/08_highest_price.sql).
function smartPickRowsWithLive(){
  const priceByTicker = {};
  state.stocks.forEach(s => { priceByTicker[s.ticker] = s.cClose; });
  const today = new Date();
  return state.spHistory
    .filter(h => state.spFilterType === "all" || h.signal_type === state.spFilterType)
    .map(h => {
      const now = priceByTicker[h.stock_code];
      const entry = Number(h.entry_price);
      const chgPct = (now != null && entry) ? ((now - entry) / entry * 100) : null;
      const plRp = (now != null && entry) ? Math.round(now - entry) : null;
      const storedHighest = Number(h.highest_price) || entry;
      const highestPrice = now != null ? Math.max(storedHighest, now, entry) : storedHighest;
      const highestPct = (highestPrice && entry) ? ((highestPrice - entry) / entry * 100) : null;
      const muncul = new Date(h.muncul_date + "T00:00:00");
      const hari = Math.max(0, Math.round((today - muncul) / 86400000));
      return { ...h, nowPrice: now, chgPct, plRp, highestPrice, highestPct, hari };
    });
}

// Simpan diam-diam kalau ada rekor harga tertinggi baru yang lebih tinggi
// dari yang tersimpan di DB, supaya "Harga Tertinggi" tetap akurat lintas
// sesi/browser (bukan cuma dihitung dari harga live sesi ini saja).
// Dicocokkan lewat (stock_code, signal_type, muncul_date) — sama seperti
// unique key yang dipakai saat finalisasi (Prefer: resolution=merge-duplicates)
// — bukan lewat `id`, supaya tidak bergantung nama kolom primary key.
// Gagal diam-diam (mis. kolom highest_price belum ada di DB): tidak
// mengganggu tampilan tabel, cuma histori tertinggi belum "nempel".
async function syncHighestPrices(rows){
  if(!SUPABASE_URL || !SUPABASE_KEY) return;
  const toUpdate = rows.filter(r => Math.round(r.highestPrice) > Math.round(Number(r.highest_price) || r.entry_price));
  if(!toUpdate.length) return;
  await Promise.all(toUpdate.map(r => {
    const qs = new URLSearchParams({
      stock_code: `eq.${r.stock_code}`,
      signal_type: `eq.${r.signal_type}`,
      muncul_date: `eq.${r.muncul_date}`
    });
    return fetch(`${SUPABASE_URL}/smart_pick_signals?${qs.toString()}`, {
      method: "PATCH",
      headers: { ...getSupaHeaders(), "Prefer": "return=minimal" },
      body: JSON.stringify({ highest_price: Math.round(r.highestPrice) })
    }).catch(()=>{}); // diam-diam gagal — lihat komentar di atas
  }));
}

function computeSmartPickStats(rows){
  const withChg = rows.filter(r => r.chgPct != null);
  const wins = withChg.filter(r => r.chgPct > 0).length;
  return {
    winRate: withChg.length ? (wins / withChg.length * 100) : null,
    avg: withChg.length ? (withChg.reduce((a,r) => a + r.chgPct, 0) / withChg.length) : null,
    total: rows.length
  };
}

// "Finalisasi Signal (EOD)": ambil semua saham yang LOLOS hari ini untuk
// tiap sinyal, lalu kunci (ticker, signal_type, tanggal, harga entry) ke
// tabel smart_pick_signals. Pakai Prefer: resolution=merge-duplicates
// supaya klik ulang di HARI YANG SAMA cuma mem-update baris yang sama
// (butuh unique constraint (stock_code,signal_type,muncul_date) di DB —
// lihat sql/07_smart_pick.sql), bukan bikin duplikat. Begitu tanggalnya
// sudah lewat, baris lama TIDAK pernah ditimpa lagi — itulah "dikunci ke
// tanggal data" yang dimaksud di UI.
async function finalizeSmartPickSignals(){
  if(!SUPABASE_URL || !SUPABASE_KEY){ openSettings(); return; }
  state.spFinalizing = true; state.spMsg = ""; render();
  try{
    const today = todayLocalISO();
    const list = enriched();
    const rows = [];
    SMART_PICK_DEFS.forEach(def => {
      list.forEach(s => {
        const r = def.detect(s);
        if(r.match){
          rows.push({
            stock_code: s.ticker,
            signal_type: def.id,
            signal_label: def.title,
            muncul_date: today,
            entry_price: s.cClose,
            score: Math.round(r.score),
            is_strong: !!r.strong
          });
        }
      });
    });
    if(!rows.length){
      state.spMsg = "Tidak ada saham yang lolos kriteria Smart Pick hari ini — belum ada yang difinalisasi.";
      state.spMsgError = true;
    } else {
      const res = await fetch(`${SUPABASE_URL}/smart_pick_signals`, {
        method: "POST",
        headers: { ...getSupaHeaders(), "Prefer": "resolution=merge-duplicates,return=minimal" },
        body: JSON.stringify(rows)
      });
      if(!res.ok){
        const t = await res.text();
        throw new Error(t || `HTTP ${res.status}`);
      }
      state.spMsg = `✅ Finalisasi berhasil: ${rows.length} sinyal dikunci untuk tanggal ${fmtDateID(today)}.`;
      state.spMsgError = false;
      await loadSmartPickHistory();
    }
  }catch(e){
    state.spMsg = "Gagal finalisasi: " + e.message + " — pastikan tabel smart_pick_signals & unique constraint-nya sudah dibuat (lihat sql/07_smart_pick.sql).";
    state.spMsgError = true;
  }
  state.spFinalizing = false;
  render();
}

async function loadSmartPickHistory(){
  if(!SUPABASE_URL || !SUPABASE_KEY) return;
  state.spHistoryLoading = true; render();
  try{
    const qs = new URLSearchParams({ select: "*", order: "muncul_date.desc,score.desc" });
    if(state.spFilterType !== "all") qs.set("signal_type", `eq.${state.spFilterType}`);
    if(state.spFrom) qs.append("muncul_date", `gte.${state.spFrom}`);
    if(state.spTo) qs.append("muncul_date", `lte.${state.spTo}`);
    const res = await fetch(`${SUPABASE_URL}/smart_pick_signals?${qs.toString()}`, { headers: getSupaHeaders(), cache: "no-store" });
    const json = await res.json();
    if(!Array.isArray(json)) throw new Error((json && json.message) || `HTTP ${res.status}`);
    state.spHistory = json;
  }catch(e){
    showError("Gagal memuat riwayat Smart Pick: " + e.message + " — pastikan tabel smart_pick_signals sudah dibuat (lihat sql/07_smart_pick.sql).");
  }
  state.spHistoryLoading = false;
  render();
  // Fire-and-forget: cek & simpan rekor harga tertinggi baru (kalau ada)
  // berdasarkan harga live saat ini. Tidak menunggu/blocking render.
  syncHighestPrices(smartPickRowsWithLive()).catch(()=>{});
}

// Export tabel "Rekap & Share Signal" (mengikuti filter jenis sinyal +
// rentang tanggal yang sedang aktif di UI) ke file .xlsx, dengan pola yang
// sama dengan exportScreenerToExcel/exportBacktestToExcel di atas.
function exportSmartPickToExcel(){
  const rows = smartPickRowsWithLive();
  if(!rows.length){
    return alert("Tidak ada riwayat sinyal untuk diekspor (cek filter jenis signal/rentang tanggal yang aktif).");
  }

  const data = rows.map(r => ({
    "Kode": r.stock_code,
    "Signal": spTitleFor(r.signal_type),
    "Muncul": fmtDateID(r.muncul_date),
    "Entry": Math.round(r.entry_price),
    "Now": r.nowPrice!=null ? Math.round(r.nowPrice) : "",
    "Tertinggi": Math.round(r.highestPrice),
    "Tertinggi vs Entry (%)": r.highestPct!=null ? Number(r.highestPct.toFixed(2)) : "",
    "Δ% (Now vs Entry)": r.chgPct!=null ? Number(r.chgPct.toFixed(2)) : "",
    "P/L (Rp)": r.plRp!=null ? r.plRp : "",
    "Hari": r.hari
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Rekap Signal");

  const headers = Object.keys(data[0]);
  worksheet['!cols'] = headers.map(h => ({ wch: Math.max(10, h.length + 2) }));

  const dateStr = todayLocalISO();
  XLSX.writeFile(workbook, `Rekap_Signal_SmartPick_${dateStr}.xlsx`);
}

// 🧪 WS Debug -- tampilan buffer traffic WebSocket Stockbit (lihat listener
// global 'FROM_EXTENSION_WS_TRAFFIC' & catatan lengkap di inject.js/
// content_stockbit.js/background.js/content_screener.js ekstensi Chrome).
function renderWsDebug(){
  const frames = state.wsDebugFrames || [];
  const dirFilter = state.wsDebugFilterDir || "all";
  const urlFilter = (state.wsDebugFilterUrl || "").trim().toLowerCase();
  const filtered = frames.filter(f => {
    if(dirFilter !== "all" && f.direction !== dirFilter) return false;
    if(urlFilter && !String(f.url||"").toLowerCase().includes(urlFilter)) return false;
    return true;
  });
  const shown = [...filtered].reverse(); // terbaru di atas, lebih enak dipantau saat rekam

  const rowsHtml = shown.length ? shown.map(f => {
    const dirBadge = f.direction === "send"
      ? `<span style="background:rgba(96,165,250,0.15);color:#60a5fa;border:1px solid rgba(96,165,250,0.3);border-radius:5px;padding:1px 6px;font-size:10.5px;white-space:nowrap;">📤 Kirim</span>`
      : f.direction === "recv"
        ? `<span style="background:rgba(52,211,153,0.15);color:#34d399;border:1px solid rgba(52,211,153,0.3);border-radius:5px;padding:1px 6px;font-size:10.5px;white-space:nowrap;">📥 Terima</span>`
        : `<span style="background:rgba(148,163,184,0.15);color:var(--muted);border-radius:5px;padding:1px 6px;font-size:10.5px;">?</span>`;
    const timeStr = f.ts
      ? new Date(f.ts).toLocaleTimeString("id-ID", {hour:"2-digit",minute:"2-digit",second:"2-digit"}) + "." + String(f.ts % 1000).padStart(3,"0")
      : "-";
    const dataStr = typeof f.data === "string" ? f.data : JSON.stringify(f.data);
    const isLong = dataStr.length > 200;
    const preview = isLong ? dataStr.slice(0,200) + "…" : dataStr;
    return `
      <div style="border:1px solid var(--border);border-radius:8px;padding:8px 10px;margin-bottom:6px;background:rgba(255,255,255,0.02);">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;">
          <span class="mono" style="font-size:10.5px;color:var(--muted);white-space:nowrap;">${escapeHtml(timeStr)}</span>
          ${dirBadge}
          <span class="mono" style="font-size:10.5px;color:var(--teal);word-break:break-all;">${escapeHtml(f.url||"")}</span>
        </div>
        <details ${isLong ? "" : "open"}>
          ${isLong ? `<summary style="cursor:pointer;font-size:10.5px;color:var(--muted);">${escapeHtml(preview)}</summary>` : ""}
          <pre class="mono" style="font-size:10.5px;background:rgba(0,0,0,0.25);padding:6px 8px;border-radius:6px;overflow-x:auto;white-space:pre-wrap;word-break:break-all;margin-top:4px;">${escapeHtml(dataStr)}</pre>
        </details>
      </div>`;
  }).join("") : `<div class="empty-box">Belum ada frame ${frames.length ? "yang cocok filter di atas" : "yang terekam"}.</div>`;

  return `
    <div class="card">
      <h3>🧪 WS Debug — Rekam Traffic WebSocket Stockbit</h3>
      <div style="font-size:12px;color:var(--muted);margin-bottom:12px;line-height:1.6;">
        Menangkap traffic WebSocket Stockbit (KEDUA arah: yang dikirim & diterima) lewat ekstensi
        Chrome "Stockbit Token Syncer + WS Debug" -- tujuannya reverse-engineer format subscribe
        Stockbit (misalnya: bagaimana cara "minta data tick BBCA"). <b>Tidak aktif otomatis</b> --
        buffer di bawah cuma terisi kalau kamu tekan "Mulai Rekam".
        <br><br>
        <b>Cara pakai:</b> 1) Pastikan ekstensi terpasang & aktif (ada di chrome://extensions).
        2) Klik "▶ Mulai Rekam" di bawah. 3) Buka tab baru ke stockbit.com, login kalau perlu, lalu
        buka chart/orderbook 2-3 ticker BERBEDA satu-satu (mis. BBCA lalu ganti ke TLKM) supaya
        pesan "subscribe ticker baru" ketangkap jelas (biasanya beda dari pesan "unsubscribe ticker
        lama"). 4) Kembali ke tab ini, klik "⏸ Berhenti Rekam", lalu "📋 Salin" untuk ditempel &
        dianalisis.
      </div>

      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px;">
        <button type="button" class="btn ${state.wsDebugRecording ? "btn-outline" : "btn-primary"}" id="wsDebugToggleBtn"
          style="${state.wsDebugRecording ? "color:#f87171;border-color:rgba(239,68,68,0.4);" : ""}white-space:nowrap;">
          ${state.wsDebugRecording ? `⏸ Berhenti Rekam (${frames.length} frame)` : "▶ Mulai Rekam"}
        </button>
        <button type="button" class="btn btn-outline" id="wsDebugClearBtn" style="white-space:nowrap;" ${frames.length ? "" : "disabled"}>🗑 Bersihkan Buffer</button>
        <button type="button" class="btn btn-outline" id="wsDebugCopyBtn" style="white-space:nowrap;" ${filtered.length ? "" : "disabled"}>📋 Salin (${filtered.length})</button>
        <select id="wsDebugFilterDir" style="background:rgba(0,0,0,0.2);border:1px solid var(--border);color:var(--text);font-size:11.5px;border-radius:6px;padding:6px 8px;">
          <option value="all" ${dirFilter==="all"?"selected":""}>Semua arah</option>
          <option value="send" ${dirFilter==="send"?"selected":""}>📤 Kirim saja</option>
          <option value="recv" ${dirFilter==="recv"?"selected":""}>📥 Terima saja</option>
        </select>
        <input type="text" id="wsDebugFilterUrl" placeholder="Filter URL berisi..." value="${escapeHtml(state.wsDebugFilterUrl||"")}"
          style="background:rgba(0,0,0,0.2);border:1px solid var(--border);color:var(--text);font-size:11.5px;border-radius:6px;padding:6px 8px;min-width:160px;">
        <span style="font-size:10.5px;color:var(--muted);white-space:nowrap;">Menyimpan maksimal ${state.wsDebugMaxFrames} frame terbaru (yang lebih lama otomatis dibuang).</span>
      </div>

      <div style="max-height:600px;overflow-y:auto;">
        ${rowsHtml}
      </div>
    </div>`;
}

function render(){
  // Guard defensif: kalau index.html yang di-deploy ternyata beda versi
  // dengan app.js (elemen tertentu belum ada di HTML), JANGAN biarkan itu
  // menghentikan seluruh render() secara diam-diam — terutama krusial di
  // sini karena render() juga dipanggil dari loadLive() SEBELUM data mulai
  // ditarik (cuma untuk munculkan status loading); kalau baris ini crash,
  // loadLive() berhenti total dan data tidak pernah ditarik sama sekali
  // (persis skenario "screener kosong tanpa error" yang bikin bingung).
  const modePillEl = document.getElementById("modePill");
  if(modePillEl){ modePillEl.className = "pill pill-up"; modePillEl.textContent = "Data Live"; }
  document.querySelectorAll(".tab-btn").forEach(b=> b.classList.toggle("active", b.dataset.tab===state.tab));

  const content = document.getElementById("content");
  try{
    if(state.tab==="dashboard") content.innerHTML = renderDashboard();
    else if(state.tab==="screener") content.innerHTML = renderScreener();
    else if(state.tab==="smartpick") content.innerHTML = renderSmartPick();
    else if(state.tab==="sektoral") content.innerHTML = renderSektoral();
    else if(state.tab==="watchlist") content.innerHTML = renderWatchlist();
    else if(state.tab==="backtest") content.innerHTML = renderBacktest();
    else if(state.tab==="portfolio") content.innerHTML = renderPortfolio();
    else if(state.tab==="chart") content.innerHTML = renderChart();
    else if(state.tab==="brokersum") content.innerHTML = renderBrokerSummary();
    else if(state.tab==="brokerstalker") content.innerHTML = renderBrokerStalker();
    else if(state.tab==="target") content.innerHTML = renderTargetBandar();
    else if(state.tab==="eps") content.innerHTML = renderEntryPriceScanner();
    else if(state.tab==="kraken") content.innerHTML = renderKrakenFlow();
    else if(state.tab==="bsjp") content.innerHTML = renderBsjp();
    else if(state.tab==="wsdebug") content.innerHTML = renderWsDebug();
    else if(state.tab==="about") content.innerHTML = renderPanduan(); // alias lama, redirect ke Panduan
    else if(state.tab==="panduan") content.innerHTML = renderPanduan();
    else if(state.tab==="quanthub"){ /* ditangani quant-hub.js (halaman #qhPage terpisah) */ }
    else content.innerHTML = `<div class="empty-box">Tab tidak dikenal: ${escapeHtml(state.tab)}</div>`;
  }catch(e){
    // Kalau ada error runtime di salah satu tab, JANGAN biarkan gagal diam-diam
    // (dulu ini bikin tab kelihatan "tidak bisa diklik" karena konten tidak
    // pernah terganti). Tampilkan pesannya langsung di area konten.
    console.error("Render error di tab '" + state.tab + "':", e);
    content.innerHTML = `<div class="empty-box">⚠️ Terjadi error saat menampilkan halaman <b>${escapeHtml(state.tab)}</b>: ${escapeHtml(e.message)}<br><span style="font-size:11.5px;color:var(--muted);">Detail lengkap ada di Console (F12). Coba klik "Refresh Data" atau muat ulang halaman.</span></div>`;
  }

  attachContentEvents();
  if(state.tab==="chart" && state.selectedTicker) drawChartSVG();

  document.getElementById("portoModalOverlay").classList.toggle("open", state.portoModalOpen);
  if(state.portoModalOpen){
    document.getElementById("portoModalContent").innerHTML = renderPortoFormFields();
    attachPortoModalEvents();
    recalcPortoForm();
  }

  document.getElementById("detailModalOverlay").classList.toggle("open", !!state.detailTicker);
  if(state.detailTicker){
    document.getElementById("detailModalTitle").textContent = `Detail Emiten · ${state.detailTicker}`;
    document.getElementById("detailModalContent").innerHTML = renderDetailModalContent();
    document.querySelectorAll("[data-detail-tab]").forEach(btn=>{
      btn.onclick = () => setDetailTab(btn.dataset.detailTab);
    });
    document.querySelectorAll("[data-gemini-run]").forEach(btn=>{
      btn.onclick = () => runGeminiAnalysis(btn.dataset.geminiRun);
    });
    document.querySelectorAll("#detailModalContent [data-chart]").forEach(b=> bindInternalLink(b, ()=>{ closeDetail(); loadChart(b.dataset.chart); }));

    // --- Broker Summary di dalam modal Detail Emiten ---
    const dbsDateInput = document.getElementById("dbsDate");
    if(dbsDateInput) dbsDateInput.onchange = (e) => { state.detailBsDate = e.target.value; };
    const dbsDateFromInput = document.getElementById("dbsDateFrom");
    if(dbsDateFromInput) dbsDateFromInput.onchange = (e) => { state.detailBsDateFrom = e.target.value; };
    const dbsDateToInput = document.getElementById("dbsDateTo");
    if(dbsDateToInput) dbsDateToInput.onchange = (e) => { state.detailBsDateTo = e.target.value; };
    // Scoped ke "#detailModalContent" dan pakai "data-bs-period-mode" (bukan
    // "data-bs-mode" — sudah dipakai fitur Broker Stalker yang tidak terkait).
    document.querySelectorAll("#detailModalContent [data-bs-period-mode]").forEach(btn=>{
      btn.onclick = () => {
        state.detailBsRangeMode = btn.dataset.bsPeriodMode === "range";
        state.detailBsMsg = ""; state.detailBsMsgError = false;
        render();
      };
    });
    const dbsLoadBtn = document.getElementById("dbsLoadBtn");
    if(dbsLoadBtn) dbsLoadBtn.onclick = loadDetailBrokerSummary;
    const dbsSaveBtn = document.getElementById("dbsSaveBtn");
    if(dbsSaveBtn) dbsSaveBtn.onclick = saveDetailBrokerSummaryRows;
    const dbsCsvFillBtn = document.getElementById("dbsCsvFillBtn");
    if(dbsCsvFillBtn) dbsCsvFillBtn.onclick = fillDbsFromCsv;
    const dbsEditorPanel = document.getElementById("dbsEditorPanel");
    if(dbsEditorPanel) dbsEditorPanel.ontoggle = (e) => { state.detailBsEditorOpen = e.target.open; };

    // --- Historical Data (Daily/Weekly/Monthly) di dalam modal Detail Emiten ---
    // Klik Daily/Weekly/Monthly -> baca dari database (lihat loadDetailHistoricalFromDb).
    // Tombol "⬇️ Tarik Data dari Stockbit" terpisah untuk yang benar-benar mau live-pull.
    document.querySelectorAll("[data-hist-period]").forEach(btn=>{
      btn.onclick = () => loadDetailHistoricalFromDb(btn.dataset.histPeriod);
    });
    const dhistDbBtn = document.getElementById("dhistDbBtn");
    if(dhistDbBtn) dhistDbBtn.onclick = () => loadDetailHistoricalFromDb();
    const dhistLoadBtn = document.getElementById("dhistLoadBtn");
    if(dhistLoadBtn) dhistLoadBtn.onclick = () => loadDetailHistorical();
    const dhistSaveBtn = document.getElementById("dhistSaveBtn");
    if(dhistSaveBtn) dhistSaveBtn.onclick = saveDetailHistoricalRows;
    const dhistCompareBtn = document.getElementById("dhistCompareBtn");
    if(dhistCompareBtn) dhistCompareBtn.onclick = loadDetailCompare;
    const dhistComparePanel = document.getElementById("dhistComparePanel");
    if(dhistComparePanel) dhistComparePanel.ontoggle = (e) => { state.detailCompareOpen = e.target.open; };
  }

  document.getElementById("spListModalClose").onclick = closeSmartPickList;
  document.getElementById("spListModalOverlay").onclick = (e)=>{ if(e.target.id==="spListModalOverlay") closeSmartPickList(); };
  const dashMetricModalCloseEl = document.getElementById("dashMetricModalClose");
  if(dashMetricModalCloseEl) dashMetricModalCloseEl.onclick = dashMetricClose;
  const dashMetricModalOverlayEl = document.getElementById("dashMetricModalOverlay");
  if(dashMetricModalOverlayEl) dashMetricModalOverlayEl.onclick = (e)=>{ if(e.target.id==="dashMetricModalOverlay") dashMetricClose(); };
  document.getElementById("spListModalOverlay").classList.toggle("open", !!state.spListOpenDefId);
  if(state.spListOpenDefId){
    document.getElementById("spListModalTitle").textContent = `📋 Daftar Saham · ${spTitleFor(state.spListOpenDefId)}`;
    document.getElementById("spListModalContent").innerHTML = renderSmartPickListModalContent();
    document.querySelectorAll("[data-sp-list-detail]").forEach(b=>{
      b.onclick = () => { closeSmartPickList(); openDetail(b.dataset.spListDetail); };
    });
    wireBacktestSaveControls(document.getElementById("spListModalContent"));
  }

  // --- Modal detail metrik Dashboard (klik kartu ringkasan) ---
  // Dibungkus guard elemen (bukan cuma .onclick di atas) karena SELURUH blok
  // modal "Detail Metrik" ini baru ditambahkan belakangan — kalau index.html
  // yang ter-deploy belum sinkron (versi lebih lama, belum punya markup
  // modal ini), render() harus tetap jalan sampai selesai, bukan berhenti
  // di tengah jalan. Lihat catatan di atas fungsi render().
  const dashMetricModalOverlayEl2 = document.getElementById("dashMetricModalOverlay");
  if(dashMetricModalOverlayEl2){
    dashMetricModalOverlayEl2.classList.toggle("open", !!state.dashMetricKey);
    if(state.dashMetricKey){
      const dmTitleEl = document.getElementById("dashMetricModalTitle");
      if(dmTitleEl) dmTitleEl.textContent = (DASH_METRIC_META[state.dashMetricKey]||{}).title || "Detail Metrik";
      const dmContentEl = document.getElementById("dashMetricModalContent");
      if(dmContentEl) dmContentEl.innerHTML = renderDashMetricModal();
      const dms = document.getElementById("dashMetricSearch");
      if(dms) dms.oninput = (e)=>{ state.dashMetricSearch = e.target.value;
        // Render ulang hanya isi modal, jangan seluruh halaman, supaya fokus ketik tidak hilang
        const dmContentEl2 = document.getElementById("dashMetricModalContent");
        if(dmContentEl2) dmContentEl2.innerHTML = renderDashMetricModal();
        bindDashMetricModalEvents();
        const again = document.getElementById("dashMetricSearch");
        if(again){ again.focus(); const p = again.value.length; again.setSelectionRange(p,p); }
      };
      bindDashMetricModalEvents();
    }
  }
}

function bindDashMetricModalEvents(){
  document.querySelectorAll("[data-dash-sort]").forEach(b=>{
    b.onclick = ()=> dashMetricToggleSort(b.dataset.dashSort);
  });
  document.querySelectorAll("[data-dash-detail]").forEach(b=>{
    b.onclick = ()=>{ dashMetricClose(); openDetail(b.dataset.dashDetail); };
  });
  const exportBtn = document.getElementById("dashMetricExportBtn");
  if(exportBtn) exportBtn.onclick = exportDashMetricToExcel;
}

function exportDashMetricToExcel(){
  const key = state.dashMetricKey;
  if(!key) return;
  const all = dashMetricStocks(key);
  const q = state.dashMetricSearch.trim().toUpperCase();
  const rows = all.filter(s=>!q || s.ticker.includes(q) || String(s.name||"").toUpperCase().includes(q));
  const data = [["Kode","Nama","Sektor","Harga","Perubahan %","Skor","Tier","Nilai Transaksi","PER","ROE"]];
  rows.forEach(s=>data.push([s.ticker, s.name||"", s.sektor||"", s.cClose??"", s.changePct??"", s.baggerScoreTotal??"", s.baggerTier||"", Number(s.turnover ?? s.valueTraded ?? 0)||0, s.per??"", s.roe??""]));
  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Dashboard Metric");
  XLSX.writeFile(wb, `dashboard-${key}-${todayLocalISO()}.xlsx`);
}

function attachPortoModalEvents(){
  const portoInputIds = ["pfTicker","pfTglBeli","pfHargaBeli","pfLotBeli","pfFeeBeli","pfSupport","pfResistance","pfFib618","pfTargetTP","pfCutLoss","pfTglJual","pfHargaJual","pfLotJual","pfFeeJual"];
  portoInputIds.forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.oninput = recalcPortoForm;
  });
  const pfTickerEl = document.getElementById("pfTicker");
  if(pfTickerEl) pfTickerEl.addEventListener("change", autofillPortoFromScreener);

  const pfSubmitBtn = document.getElementById("pfSubmitBtn");
  if(pfSubmitBtn) pfSubmitBtn.onclick = submitPortoForm;
  const pfCancelBtn = document.getElementById("pfCancelBtn");
  if(pfCancelBtn) pfCancelBtn.onclick = resetPortoForm;
}

function renderMultiSelect(key, label, options) {
  const selected = state.filters[key];
  const btnText = selected.length === 0 ? "(Semua)" : `${selected.length} dipilih`;
  const isOpen = state.openDropdown === key;
  
  const itemsHtml = options.map(o => `
    <label class="select-item" onclick="event.stopPropagation()">
      <input type="checkbox" value="${o}" data-filter="${key}" ${selected.includes(o) ? 'checked' : ''}>
      <span>${o}</span>
    </label>
  `).join("");

  return `
    <div class="field">
      <label>${label}</label>
      <div class="multi-select">
        <button type="button" class="select-btn" onclick="state.openDropdown = state.openDropdown === '${key}' ? null : '${key}'; render(); event.stopPropagation();">
          <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:100px;">${btnText}</span>
          <span style="font-size:9px;color:var(--muted)">▼</span>
        </button>
        <div class="select-dropdown ${isOpen ? 'open' : ''}" onclick="event.stopPropagation()">
          ${itemsHtml}
        </div>
      </div>
    </div>
  `;
}

function renderRangeFilter(key, label, opts){
  opts = opts || {};
  const rf = state.rangeFilters[key];
  const step = opts.step || "any";
  return `
    <div class="field">
      <label>${label}</label>
      <div style="display:flex;gap:4px;">
        <input type="number" step="${step}" class="range-filter-input mono" data-range="${key}" data-bound="min" placeholder="Min" value="${rf.min}" style="width:64px;background:rgba(0,0,0,0.2);border:1px solid var(--border);color:var(--text);font-size:12px;border-radius:6px;padding:8px 6px;">
        <input type="number" step="${step}" class="range-filter-input mono" data-range="${key}" data-bound="max" placeholder="Max" value="${rf.max}" style="width:64px;background:rgba(0,0,0,0.2);border:1px solid var(--border);color:var(--text);font-size:12px;border-radius:6px;padding:8px 6px;">
      </div>
    </div>`;
}

const FILTER_LABELS = {
  sektor:"Sektor", syariahLabel:"Syariah", trendHarga:"Trend", cekMacd:"MACD", polaCandle:"Pola Candle",
  sinyalVolume:"Sinyal Volume", sinyalFrekuensi:"Sinyal Frekuensi", keyakinanNaik:"Keyakinan Naik", cekHarga:"Sinyal Harga", cekRsi:"Sinyal RSI",
  statusRsi:"Status RSI", band:"Bandarmologi", uangGedeMasuk:"Uang Gede", isBBSqueeze:"BB Squeeze", valuasi:"Valuasi",
  bbWidth:"BB Width", atr14:"ATR 14", clv:"CLV", rsi7:"RSI 7", rsi21:"RSI 21", frequency:"Frekuensi",
  capTier:"Market Cap", lq45:"LQ45", marketCap:"Market Cap (Rp)", week52ChangePct:"52W Change (%)", ytdPct:"YTD (%)"
};
const PRESET_LABELS = { bagger:"Skor Bagger ≥75", eri:"Eri Ginanjar", rsicross:"RSI & Harga Cross", golden:"Golden Cross DSI", uptrend:"Super Uptrend", breakout:"Volatility Breakout", pullback:"Pullback Uptrend", custom_bandar:"BPJS", asing_akumulasi:"Akumulasi Asing (IDX)", freq_spike:"Lonjakan Frekuensi", deepvalue:"Deep Value", multibagger:"Multibagger", growth:"Growth", defensive:"Defensive", smallcap:"Small Cap (<1T)" };
function clearChip(kind, key, value){
  if(kind==="search") state.search="";
  else if(kind==="preset") state.activePreset=null;
  else if(kind==="multi") state.filters[key] = state.filters[key].filter(v=>String(v)!==String(value));
  else if(kind==="range") state.rangeFilters[key] = {min:"",max:""};
  else if(kind==="rules") { state.customRules = []; saveCustomRules(); }
  state.page = 1;
  render();
}

function renderActiveFilterChips(){
  const chips = [];
  if(state.search) chips.push(`<span class="filter-chip">Cari: "${state.search}" <button onclick="clearChip('search')" title="Hapus">✕</button></span>`);
  if(state.activePreset) chips.push(`<span class="filter-chip">Preset: ${PRESET_LABELS[state.activePreset]||state.activePreset} <button onclick="clearChip('preset')" title="Hapus">✕</button></span>`);
  Object.keys(state.filters).forEach(key=>{
    state.filters[key].forEach(val=>{
      chips.push(`<span class="filter-chip">${FILTER_LABELS[key]||key}: ${val} <button onclick="clearChip('multi','${key}','${String(val).replace(/'/g,"\\'")}')" title="Hapus">✕</button></span>`);
    });
  });
  Object.keys(state.rangeFilters).forEach(key=>{
    const r = state.rangeFilters[key];
    if(r.min !== "" || r.max !== ""){
      chips.push(`<span class="filter-chip">${FILTER_LABELS[key]||key}: ${r.min||'…'} - ${r.max||'…'} <button onclick="clearChip('range','${key}')" title="Hapus">✕</button></span>`);
    }
  });
  if(state.customRules && state.customRules.length){
    chips.push(`<span class="filter-chip">Rules Kustom: ${state.customRules.length} aktif <button onclick="clearChip('rules')" title="Hapus semua rule">✕</button></span>`);
  }
  if(chips.length===0) return "";
  return `<div class="active-filters-bar">${chips.join("")}</div>`;
}

function hasActiveFilters(){
  const f = state.filters;
  const anyMulti = Object.keys(f).some(k => f[k].length > 0);
  const rf = state.rangeFilters;
  const anyRange = Object.keys(rf).some(k => rf[k].min !== "" || rf[k].max !== "");
  const anyRules = state.customRules && state.customRules.length > 0;
  return anyMulti || anyRange || !!state.search || anyRules;
}

// Setiap kolom punya "group" supaya bisa dikelompokkan di panel pemilih
// kolom (Harga, Fundamental, Teknikal, Bandarmologi, Analisa) — dengan
// ~50 kolom, tanpa pengelompokan panel pemilihnya sendiri akan berantakan.
const SCREENER_COLUMNS = [
  { key:"sektor", label:"Sektor", group:"Umum", cell:s=>`<td>${s.sektor||"-"}</td>` },
  { key:"syariah", label:"Syariah", group:"Umum", cell:s=>`<td>${s.syariah===true||s.syariah==="true"||s.syariah==="Ya"?"✅":(s.syariah===false||s.syariah==="false"||s.syariah==="Tidak"?"-":(s.syariah??"-"))}</td>` },
  { key:"cOpen", label:"Open", group:"Harga", cell:s=>`<td class="mono">${fmtNum(s.cOpen)}</td>` },
  { key:"cHigh", label:"High", group:"Harga", cell:s=>`<td class="mono">${fmtNum(s.cHigh)}</td>` },
  { key:"cLow", label:"Low", group:"Harga", cell:s=>`<td class="mono">${fmtNum(s.cLow)}</td>` },
  { key:"cClose", label:"Close", group:"Harga", cell:s=>`<td class="mono">${fmtNum(s.cClose)}</td>` },
  { key:"changePct", label:"Perubahan%", group:"Harga", cell:s=>`<td class="mono" style="color:${(s.changePct??0)>=0?'var(--up)':'var(--down)'}">${s.changePct!=null?((s.changePct>=0?'+':'')+s.changePct.toFixed(2)+'%'):'-'}</td>` },
  { key:"cVol", label:"Volume", group:"Harga", cell:s=>`<td class="mono">${fmtNum(s.cVol)}</td>` },
  { key:"volChangePct", label:"1D Vol Change (%)", group:"Harga", cell:s=>`<td class="mono" style="color:${(s.volChangePct??0)>=0?'var(--up)':'var(--down)'}">${s.volChangePct!=null?((s.volChangePct>=0?'+':'')+s.volChangePct.toFixed(1)+'%'):'-'}</td>` },
  { key:"frequency", label:"Frekuensi", group:"Harga", cell:s=>`<td class="mono">${fmtNum(s.frequency)}</td>` },
  { key:"freqAnalyzer", label:"Frequency Analyzer", group:"Harga", cell:s=>`<td class="mono">${fmtNum(s.freqAnalyzer)}</td>` },
  { key:"freqRatio", label:"Rasio Frek.", group:"Harga", cell:s=>`<td class="mono" style="color:${s.freqTone==='up'?'var(--up)':s.freqTone==='down'?'var(--down)':'var(--muted)'}">${s.freqRatio!=null?s.freqRatio.toFixed(2)+'x':'-'}</td>` },
  { key:"sinyalFrekuensi", label:"Sinyal Frekuensi", group:"Harga", cell:s=>`<td>${pillHtml(s.sinyalFrekuensi||"-", s.freqTone)}</td>` },
  { key:"turnover", label:"Turnover", group:"Harga", cell:s=>`<td class="mono">${fmtNum(s.turnover)}</td>` },
  { key:"vwap20", label:"VWAP20", group:"Harga", cell:s=>`<td class="mono">${fmtNum(s.vwap20)}</td>` },
  { key:"per", label:"PER", group:"Fundamental", cell:s=>`<td class="mono">${s.per??"-"}</td>` },
  { key:"pbv", label:"PBV", group:"Fundamental", cell:s=>`<td class="mono">${s.pbv??"-"}</td>` },
  { key:"roe", label:"ROE%", group:"Fundamental", cell:s=>`<td class="mono">${s.roe??"-"}</td>` },
  { key:"divYield", label:"Div Yield%", group:"Fundamental", cell:s=>`<td class="mono">${s.divYield??"-"}</td>` },
  { key:"forwardPer", label:"Forward PER", group:"Fundamental", cell:s=>`<td class="mono">${s.forwardPer??"-"}</td>` },
  { key:"psr", label:"PSR", group:"Fundamental", cell:s=>`<td class="mono">${s.psr??"-"}</td>` },
  { key:"peg", label:"PEG", group:"Fundamental", cell:s=>`<td class="mono">${s.peg??"-"}</td>` },
  { key:"roa", label:"ROA%", group:"Fundamental", cell:s=>`<td class="mono">${s.roa??"-"}</td>` },
  { key:"npm", label:"NPM%", group:"Fundamental", cell:s=>`<td class="mono">${s.npm??"-"}</td>` },
  { key:"opm", label:"OPM%", group:"Fundamental", cell:s=>`<td class="mono">${s.opm??"-"}</td>` },
  { key:"bid", label:"Bid", group:"Harga", cell:s=>`<td class="mono" style="color:var(--up)">${s.bid??"-"}</td>` },
  { key:"bidVolume", label:"Bid Volume", group:"Harga", cell:s=>`<td class="mono">${s.bidVolume??"-"}</td>` },
  { key:"offer", label:"Offer", group:"Harga", cell:s=>`<td class="mono" style="color:var(--down)">${s.offer??"-"}</td>` },
  { key:"offerVolume", label:"Offer Volume", group:"Harga", cell:s=>`<td class="mono">${s.offerVolume??"-"}</td>` },
  { key:"valuasi", label:"Valuasi", group:"Fundamental", cell:s=>`<td>${pillHtml(s.valuasi||"-", valuasiTone(s.valuasi))}</td>` },
  { key:"support", label:"Support", group:"Teknikal", cell:s=>`<td class="mono" style="color:var(--down)">${fmtNum(s.support)}</td>` },
  { key:"resistance", label:"Resisten", group:"Teknikal", cell:s=>`<td class="mono" style="color:var(--up)">${fmtNum(s.resistance)}</td>` },
  { key:"high52w", label:"High 52W", group:"Teknikal", cell:s=>`<td class="mono">${fmtNum(s.high52w)}</td>` },
  { key:"low52w", label:"Low 52W", group:"Teknikal", cell:s=>`<td class="mono">${fmtNum(s.low52w)}</td>` },
  { key:"ema21H", label:"EMA21 H", group:"Teknikal", cell:s=>`<td class="mono">${fmtNum(s.ema21H)}</td>` },
  { key:"ema21L", label:"EMA21 L", group:"Teknikal", cell:s=>`<td class="mono">${fmtNum(s.ema21L)}</td>` },
  { key:"ema89", label:"EMA 89", group:"Teknikal", cell:s=>`<td class="mono">${fmtNum(s.ema89)}</td>` },
  { key:"ma21", label:"MA21", group:"Teknikal", cell:s=>`<td class="mono">${fmtNum(s.ma21)}</td>` },
  { key:"ma50", label:"MA50", group:"Teknikal", cell:s=>`<td class="mono">${fmtNum(s.ma50)}</td>` },
  { key:"ma100", label:"MA100", group:"Teknikal", cell:s=>`<td class="mono">${fmtNum(s.ma100)}</td>` },
  { key:"ma200", label:"MA200", group:"Teknikal", cell:s=>`<td class="mono">${fmtNum(s.ma200)}</td>` },
  { key:"trendHarga", label:"Trend (MA)", group:"Teknikal", cell:s=>`<td>${pillHtml(s.trendHarga||"-", trendTone(s.trendHarga))}</td>` },
  { key:"rsi7", label:"RSI 7", group:"Teknikal", cell:s=>`<td>${rsiGaugeHtml(s.rsi7)}</td>` },
  { key:"rsi21", label:"RSI 21", group:"Teknikal", cell:s=>`<td class="mono">${s.rsi21!=null?Number(s.rsi21).toFixed(1):"-"}</td>` },
  { key:"statusRsi", label:"Status RSI", group:"Teknikal", cell:s=>`<td>${s.statusRsi||"-"}</td>` },
  { key:"cekRsi", label:"Sinyal RSI", group:"Teknikal", cell:s=>`<td>${s.cekRsi||"-"}</td>` },
  { key:"hist", label:"MACD Hist", group:"Teknikal", cell:s=>`<td class="mono">${s.hist!=null?Number(s.hist).toFixed(3):"-"}</td>` },
  { key:"stochK", label:"Stoch K", group:"Teknikal", cell:s=>`<td class="mono">${s.stochK??"-"}</td>` },
  { key:"stochD", label:"Stoch D", group:"Teknikal", cell:s=>`<td class="mono">${s.stochD??"-"}</td>` },
  { key:"cekMacd", label:"MACD", group:"Teknikal", cell:s=>`<td>${pillHtml(s.cekMacd||"-", ((s.cekMacd||"").includes("Buy")||(s.cekMacd||"").includes("Bullish"))?"up":(s.cekMacd||"").includes("Sell")?"down":"muted")}</td>` },
  { key:"cekHarga", label:"Sinyal Harga", group:"Teknikal", cell:s=>`<td>${s.cekHarga||"-"}</td>` },
  { key:"fib.f382", label:"Fib 38.2", group:"Teknikal", cell:s=>`<td class="mono">${fmtNum(s.fib?.f382)}</td>` },
  { key:"fib.f50", label:"Fib 50", group:"Teknikal", cell:s=>`<td class="mono">${fmtNum(s.fib?.f50)}</td>` },
  { key:"fib.f618", label:"Fib 61.8", group:"Teknikal", cell:s=>`<td class="mono">${fmtNum(s.fib?.f618)}</td>` },
  { key:"candleKemarin", label:"Candle Kemarin", group:"Teknikal", sortable:false, cell:s=>`<td style="white-space:normal;max-width:160px;font-size:11px;font-family:'Sora',sans-serif;">${s.candleKemarin||"-"}</td>` },
  { key:"candleHariIni", label:"Candle Hari Ini", group:"Teknikal", sortable:false, cell:s=>`<td style="white-space:normal;max-width:160px;font-size:11px;font-family:'Sora',sans-serif;">${s.candleHariIni||"-"}</td>` },
  { key:"polaCandle", label:"Pola Candle", group:"Teknikal", cell:s=>`<td>${pillHtml(s.polaCandle||"-", polaTone(s.polaCandle))}</td>` },
  { key:"volRatio", label:"Rasio Vol", group:"Teknikal", cell:s=>`<td class="mono" style="color:${s.volTone==='up'?'var(--up)':s.volTone==='down'?'var(--down)':'var(--muted)'}">${(s.volRatio??0).toFixed(2)}x</td>` },
  { key:"sinyalVolume", label:"Sinyal Volume", group:"Teknikal", cell:s=>`<td>${pillHtml(s.sinyalVolume||"-", s.volTone)}</td>` },
  { key:"band.label", label:"Bandarmologi (proxy vol.)", group:"Bandarmologi", cell:s=>`<td>${pillHtml(s.band.label, s.band.tone)}</td>` },
  { key:"foreignNet20D", label:"Net Asing 20H (IDX)", group:"Bandarmologi", cell:s=>`<td class="mono" style="color:${(s.foreignNet20D??0)>=0?'var(--up)':'var(--down)'}">${s.foreignNet20D!=null?fmtRp(s.foreignNet20D):'-'}</td>` },
  { key:"foreignUpDays", label:"Hari Asing +", group:"Bandarmologi", cell:s=>`<td class="mono">${s.foreignUpDays!=null?`${s.foreignUpDays}/${s.flowDays??20}`:'-'}</td>` },
  { key:"uangGedeMasuk", label:"Uang Gede Masuk", group:"Bandarmologi", cell:s=>`<td>${pillHtml(s.uangGedeMasuk||"-", s.uangGedeMasuk==="Ya"?"up":"muted")}</td>` },
  { key:"isBBSqueeze", label:"BB Squeeze", group:"Teknikal", cell:s=>`<td>${pillHtml(s.isBBSqueeze||"-", s.isBBSqueeze==="Ya"?"gold":"muted")}</td>` },
  { key:"bbWidth", label:"BB Width", group:"Teknikal", cell:s=>`<td class="mono">${s.bbWidth??"-"}</td>` },
  { key:"atr14", label:"ATR 14", group:"Teknikal", cell:s=>`<td class="mono">${s.atr14??"-"}</td>` },
  { key:"clv", label:"CLV", group:"Teknikal", cell:s=>`<td class="mono">${s.clv??"-"}</td>` },
  { key:"baggerScoreTotal", label:"🎯 Skor Bagger", group:"Analisa", cell:s=>`<td><div style="display:flex;align-items:center;gap:7px;flex-wrap:wrap;"><span class="mono" style="font-weight:800;font-size:13.5px;color:var(--${s.baggerTone});">${s.baggerScoreTotal}<span style="font-size:10px;font-weight:500;color:var(--muted);">/100</span></span>${pillHtml(s.baggerTier, s.baggerTone)}</div></td>` },
  { key:"fundTechScore", label:"🧮 Skor Gabungan", group:"Analisa", cell:s=>{
      const ft = s.fundTech;
      if(!ft) return `<td>-</td>`;
      return `<td><div style="display:flex;align-items:center;gap:7px;flex-wrap:wrap;"><span class="mono" style="font-weight:800;font-size:13.5px;color:var(--${ft.tone});">${ft.total}<span style="font-size:10px;font-weight:500;color:var(--muted);">/100</span></span>${pillHtml(ft.label, ft.tone)}<span class="mono" style="font-size:10px;color:var(--muted);" title="Fundamental ${ft.fund}/60 · Teknikal ${ft.tech}/40">F${ft.fund} · T${ft.tech}</span></div></td>`;
    } },
  { key:"marketCap", label:"Market Cap", group:"Fundamental", cell:s=>`<td class="mono">${s.marketCap!=null?fmtCap(s.marketCap):"-"}</td>` },
  { key:"capTier", label:"Kategori Cap (Tier)", group:"Umum", cell:s=>`<td>${pillHtml(marketCapTier(s.marketCap), s.marketCap!=null?"teal":"muted")}</td>` },
  { key:"lq45", label:"LQ45", group:"Umum", cell:s=>`<td>${s.indexLq45!=null ? (isLq45(s)?"✅":"-") : "-"}</td>` },
  { key:"ytdPct", label:"YTD%", group:"Teknikal", cell:s=>`<td class="mono" style="color:${(s.ytdPct??0)>=0?'var(--up)':'var(--down)'}">${s.ytdPct!=null?((s.ytdPct>=0?'+':'')+s.ytdPct.toFixed(2)+'%'):'-'}</td>` },
  { key:"stockbitLive", label:"🔴 Live Stockbit", group:"Analisa", sortable:false, cell:s=>{
      const live = state.stockbitLive[s.ticker];
      if(!live) return `<td><button type="button" class="btn btn-outline" data-stockbit-live="${s.ticker}" style="font-size:11px;padding:4px 8px;color:#f87171;border-color:rgba(239,68,68,0.35);">Tarik</button></td>`;
      if(live.loading) return `<td><span class="mono" style="font-size:11px;color:var(--muted);">Menarik...</span></td>`;
      if(live.error) return `<td><span style="font-size:10.5px;color:var(--down);" title="${escapeHtml(live.error)}">⚠️ Error</span> <button type="button" class="btn btn-outline" data-stockbit-live="${s.ticker}" style="font-size:10px;padding:2px 6px;margin-left:4px;">↻</button></td>`;
      const m = live.mapped || {};
      const secAgo = Math.max(0, Math.round((Date.now()-live.fetchedAt)/1000));
      return `<td><div class="mono" style="font-size:11.5px;line-height:1.5;">
        ${m.last!=null ? `Last: <b>${fmtNum(m.last)}</b>` : "-"}
        ${(m.open!=null||m.high!=null||m.low!=null) ? `<br>O/H/L: ${fmtNum(m.open)}/${fmtNum(m.high)}/${fmtNum(m.low)}` : ""}
        ${m.bid!=null||m.offer!=null ? `<br>Bid/Offer: ${fmtNum(m.bid)}/${fmtNum(m.offer)}` : ""}
        <br><span style="color:var(--muted);font-size:10px;">${secAgo}s lalu</span>
        <button type="button" class="btn btn-outline" data-stockbit-live="${s.ticker}" style="font-size:10px;padding:1px 5px;margin-left:4px;">↻</button>
      </div></td>`;
    } },
  { key:"keyakinanNaik", label:"Keyakinan Naik", group:"Analisa", cell:s=>`<td>${pillHtml(s.keyakinanNaik, s.keyakinanTone)}</td>` },
  { key:"rekomendasi", label:"Rekomendasi Setup", group:"Analisa", cell:s=>`<td>${s.rekomendasi !== "-" ? pillHtml(s.rekomendasi, s.rekTone) : '<span style="color:var(--muted)">-</span>'}</td>` }
];

// ==========================================
// RULE BUILDER KUSTOM (mirip "Edit Screener" Stockbit)
//
// Bentuk rule yang didukung, sesuai contoh di Stockbit:
//   1) Metric  <op>  Angka tetap                  → "1 Day Price Returns (%) > -15"
//   2) Metric  <op>  Pengali * Metric lain          → "Frequency > 5 * Frequency Analyzer"
// Rule disimpan sebagai {id, aKey, op, mult, bType:'metric'|'const', bKey, bConst}
// dan diterapkan sebagai filter AND tambahan di getFiltered().
// ==========================================
const RULE_METRICS = [
  { key:"cClose", label:"Price" },
  { key:"changePct", label:"1 Day Price Returns (%)" },
  { key:"cVol", label:"Volume" },
  { key:"prevVol", label:"Previous Volume" },
  { key:"volChangePct", label:"1 Day Volume Change (%)" },
  { key:"volMA20", label:"Volume MA20" },
  { key:"avgVolume3m", label:"Avg Volume 3M" },
  { key:"frequency", label:"Frequency" },
  { key:"freqAnalyzer", label:"Frequency Analyzer" },
  { key:"avgFrequency3m", label:"Avg Frequency 3M" },
  { key:"turnover", label:"Turnover" },
  { key:"ma21", label:"Price MA21" },
  { key:"ma50", label:"Price MA50" },
  { key:"ma100", label:"Price MA100" },
  { key:"ma200", label:"Price MA200" },
  { key:"rsi7", label:"RSI 7" },
  { key:"rsi21", label:"RSI 21" },
  { key:"atr14", label:"ATR 14" },
  { key:"bbWidth", label:"BB Width" },
  { key:"clv", label:"CLV" },
  { key:"support", label:"Support" },
  { key:"resistance", label:"Resistance" },

  // --- Perluasan (lihat stock_indicators_ext) ---
  { key:"cOpen", label:"Open Price" }, { key:"cHigh", label:"High Price" }, { key:"cLow", label:"Low Price" },
  { key:"prevClose", label:"Previous Price" }, { key:"valueTraded", label:"Value" },
  { key:"priceMa5", label:"Price MA 5" }, { key:"priceMa10", label:"Price MA 10" }, { key:"priceMa20", label:"Price MA 20" },
  { key:"prevPriceMa5", label:"Previous Price MA 5" }, { key:"prevPriceMa10", label:"Previous Price MA 10" },
  { key:"prevPriceMa20", label:"Previous Price MA 20" }, { key:"prevPriceMa50", label:"Previous Price MA 50" },
  { key:"prevPriceMa100", label:"Previous Price MA 100" }, { key:"prevPriceMa200", label:"Previous Price MA 200" },
  { key:"volumeMa5", label:"Volume MA 5" }, { key:"volumeMa10", label:"Volume MA 10" },
  { key:"volumeMa50", label:"Volume MA 50" }, { key:"volumeMa100", label:"Volume MA 100" }, { key:"volumeMa200", label:"Volume MA 200" },
  { key:"prevVolumeMa5", label:"Previous Volume MA 5" }, { key:"prevVolumeMa10", label:"Previous Volume MA 10" },
  { key:"prevVolumeMa20", label:"Previous Volume MA 20" }, { key:"prevVolumeMa50", label:"Previous Volume MA 50" },
  { key:"prevVolumeMa100", label:"Previous Volume MA 100" },
  { key:"valueMa5", label:"Value MA 5" }, { key:"valueMa10", label:"Value MA 10" }, { key:"valueMa20", label:"Value MA 20" },
  { key:"valueMa50", label:"Value MA 50" }, { key:"valueMa100", label:"Value MA 100" }, { key:"valueMa200", label:"Value MA 200" },
  { key:"frequencyMa50", label:"Frequency Analyzer MA 50" },
  { key:"rsi14", label:"RSI (14)" }, { key:"prevRsi14", label:"Previous RSI (14)" },
  { key:"macd", label:"MACD (12,26)" }, { key:"prevMacd", label:"Previous MACD (12,26)" },
  { key:"stochK", label:"Stochastic K (14,1,3)" }, { key:"stochD", label:"Stochastic D (14,1,3)" },
  { key:"prevStochK", label:"Previous Stochastic K" }, { key:"prevStochD", label:"Previous Stochastic D" },
  { key:"bbUpper", label:"Bollinger Band Upper (20)" }, { key:"bbLower", label:"Bollinger Band Lower (20)" },
  { key:"adr14", label:"Average Daily Range 14" },
  { key:"prevAtr14", label:"Previous Average True Range 14" }, { key:"prevAdr14", label:"Previous Average Daily Range 14" },
  { key:"vwap", label:"VWAP" },
  { key:"ema5", label:"EMA 5" }, { key:"ema10", label:"EMA 10" }, { key:"ema20", label:"EMA 20" },
  { key:"ema50", label:"EMA 50" }, { key:"ema100", label:"EMA 100" }, { key:"ema200", label:"EMA 200" },
  { key:"prevEma200", label:"Previous EMA 200" },
  { key:"fibP", label:"Fibonacci P" }, { key:"fibR1", label:"Fibonacci R1" }, { key:"fibR2", label:"Fibonacci R2" },
  { key:"fibR3", label:"Fibonacci R3" }, { key:"fibS1", label:"Fibonacci S1" }, { key:"fibS2", label:"Fibonacci S2" },
  { key:"fibS3", label:"Fibonacci S3" },

  // --- Fundamental (PER/PBV/ROE/dst) ---
  { key:"per", label:"PER" }, { key:"forwardPer", label:"Forward PER" }, { key:"pbv", label:"PBV" },
  { key:"eps", label:"EPS" }, { key:"bookValue", label:"Book Value" }, { key:"psr", label:"PSR" },
  { key:"peg", label:"PEG" }, { key:"roe", label:"ROE (%)" }, { key:"roa", label:"ROA (%)" },
  { key:"npm", label:"Net Profit Margin (%)" }, { key:"opm", label:"Operating Margin (%)" },
  { key:"revenueGrowth", label:"Revenue Growth (%)" }, { key:"earningsGrowth", label:"Earnings Growth (%)" },
  { key:"divYield", label:"Dividend Yield (%)" }, { key:"dividendRate", label:"Dividend Rate" },
  { key:"payoutRatio", label:"Payout Ratio (%)" }, { key:"beta", label:"Beta" },
  { key:"der", label:"DER" }, { key:"currentRatio", label:"Current Ratio" },
  { key:"marketCap", label:"Market Cap" }, { key:"sharesOutstanding", label:"Shares Outstanding" },
  { key:"indexLq45", label:"LQ45" }, { key:"ytdPct", label:"YTD (%)" },

  // --- Harga & posisi 52 minggu ---
  { key:"high52w", label:"52 Week High" }, { key:"low52w", label:"52 Week Low" },
  { key:"week52ChangePct", label:"52 Week Change (%)" }, { key:"pos52w", label:"Posisi dalam Range 52W (%)" },
  { key:"changeAbs", label:"Perubahan Harga (Rp)" }, { key:"prevHigh", label:"Previous High" }, { key:"prevLow", label:"Previous Low" },
  { key:"vsMa50Pct", label:"Jarak ke MA50 (%)" }, { key:"vsMa200Pct", label:"Jarak ke MA200 (%)" },

  // --- Bid/Offer & VWAP20 ---
  { key:"bid", label:"Bid" }, { key:"bidVolume", label:"Bid Volume" },
  { key:"offer", label:"Offer" }, { key:"offerVolume", label:"Offer Volume" },
  { key:"vwap20", label:"VWAP 20" }, { key:"volRatio", label:"Volume Ratio" },

  // --- EMA/MACD tambahan ---
  { key:"ema21H", label:"EMA 21 (High)" }, { key:"ema21L", label:"EMA 21 (Low)" }, { key:"ema89", label:"EMA 89" },
  { key:"hist", label:"MACD Histogram" }, { key:"histPrev", label:"MACD Histogram (Prev)" },
  { key:"signal", label:"MACD Signal" }, { key:"prevSignal", label:"Previous MACD Signal" },
  { key:"prevMacdHist", label:"Previous MACD Histogram" },

  // --- Bandarmologi asli (foreign flow dari IDX) ---
  { key:"foreignNet1D", label:"Foreign Net 1 Hari" }, { key:"foreignNet5D", label:"Foreign Net 5 Hari" },
  { key:"foreignNet20D", label:"Foreign Net 20 Hari" }, { key:"foreignUpDays", label:"Foreign Net Positif (Hari)" },
  { key:"avgTicket", label:"Avg Ticket Size Asing" }, { key:"crossingPct", label:"Crossing (%)" },
  { key:"flowDays", label:"Jumlah Hari Data Flow" },

  // --- Field KATEGORI (teks, bukan angka) — dibandingkan pakai "=" / "≠"
  // terhadap salah satu pilihan tetap, bukan angka bebas. Daftar pilihan
  // diambil dari nilai-nilai yang benar-benar muncul di kolom stocks_screener.
  { key:"cekHarga", label:"Sinyal Harga", type:"category", options:[
    "harga crossup ema 21 H dan L", "harga diatas ema 21 L dibawah ema 21 H", "harga belum cross up"
  ]},
  { key:"cekRsi", label:"Sinyal RSI", type:"category", options:[
    "rsi 7 cross up rsi 21", "rsi 7 belum cross up"
  ]},
  { key:"statusRsi", label:"Status RSI", type:"category", options:[
    "over bought", "over sold", "bullish", "netral", "bearish"
  ]},
  { key:"cekMacd", label:"Sinyal MACD", type:"category", options:[
    "Bullish Menguat", "Wait & See / Bearish", "Momentum Buy (Early)", "Buy (Golden Cross)", "Sell (Dead Cross)"
  ]},
  { key:"keyakinanNaik", label:"Keyakinan Naik (kategori)", type:"category", options:[
    "Sedang (Candle Bullish, Volume Belum Konfirmasi)", "Tinggi (Ada Konfirmasi Volume)",
    "Sedang (Belum Ada Konfirmasi Volume)", "Rendah", "Sangat Tinggi (MACD + Volume + RSI/Stoch Konfirmasi)",
    "Sangat Waspada (Distribusi Masif / Guyuran Bandar)", "Waspada (Trend Bearish + Candle Bearish)"
  ]},
  { key:"trendHarga", label:"Trend Harga (MA)", type:"category", options:[
    "Bullish (diatas MA21/50/100/200)", "Sideways/Mixed", "Bearish (dibawah MA21/50/100/200)", "Bearish (dibawah MA yang tersedia)"
  ]},
  { key:"polaCandle", label:"Pola Candle", type:"category", options:[
    "Bullish Engulfing (potensi reversal naik)", "Tidak ada pola signifikan", "Doji (keraguan pasar / potensi pembalikan)",
    "Bearish Engulfing (potensi reversal turun)", "Bearish Harami (tekanan beli mulai melemah)",
    "Hanging Man (waspada reversal turun setelah uptrend)", "Shooting Star (waspada reversal turun)",
    "Bullish Harami (tekanan jual mulai melemah)"
  ]},
  { key:"uangGedeMasuk", label:"Uang Gede Masuk", type:"category", options:[
    "Normal", "Akumulasi Kuat (RVOL>2 & CLV>0.7)", "Guyuran (RVOL>2 & CLV Negatif)"
  ]},
  // Sama dengan filter dropdown "Bandarmologi" di panel Momentum, Volume &
  // Keyakinan (lihat uniqueOpts key "band") — proxy heuristik dari rasio
  // volume + arah harga (fungsi bandarmologi()), BUKAN data transaksi
  // broker asli. Nilainya nested di s.band.label, jadi ditangani khusus di
  // ruleRawValue() (sama pola seperti top3BuyBrokers/top3SellBrokers).
  { key:"band", label:"Bandarmologi (proxy vol.)", type:"category", options:[
    "Indikasi Akumulasi", "Indikasi Distribusi", "Minat Beli Naik", "Tekanan Jual", "Netral"
  ]},
  { key:"valuasi", label:"Valuasi", type:"category", options:[
    "Kemahalan (Overvalued)", "Murah (Undervalued)", "Wajar (Fair)"
  ]},
  { key:"capCategory", label:"Kategori Cap (DB)", type:"category", options:[
    "Mega", "Big", "Mid", "Small", "Micro", "Tidak tersedia"
  ]},
  // capTier = tier hasil KALKULASI dari marketCap (marketCapTier()), bukan
  // kolom DB — sinkron dengan filter multi-select "Market Cap" di Screener.
  // capCategory di atas adalah kolom `cap_category` mentah dari DB; dua-duanya
  // disediakan karena bisa berbeda isi kalau skema DB belum sinkron.
  { key:"capTier", label:"Kategori Cap (Tier)", type:"category", options:[
    "Mega", "Big", "Mid", "Small", "Micro", "Tidak tersedia"
  ]},
  // Metrik turunan baru (paritas screener publik) — angka, sehingga bisa
  // dipakai di rule builder seperti metrik lain. Catatan: ytdPct & indexLq45
  // TIDAK dideklarasikan di sini karena sudah ada di blok Fundamental atas
  // (indexLq45 bernilai boolean true/false → ruleMetricValue mengonversinya
  // jadi 1/0 lewat Number(), jadi rule "LQ45 = 1" tetap valid).
  { key:"fundTechScore", label:"Skor Gabungan (F60+T40)" },
  { key:"fundScore60", label:"Skor Fundamental (0-60)" },
  { key:"techScore40", label:"Skor Teknikal (0-40)" },
  { key:"cekVolume", label:"Sinyal Volume (kategori mentah)", type:"category", options:[
    "Volume Normal", "Volume Spike Kuat", "Volume Sepi", "Volume Spike", "Volume Spike Ekstrem"
  ]},

  // --- Field BROKER (daftar kode broker top 3, bukan angka/kategori
  // tetap) — dibandingkan pakai "contains" / "!contains" terhadap kode
  // broker yang diketik bebas (mis. "AK"), diambil dari top 3 baris
  // broker_summary hari trading terakhir. Dipakai untuk cari saham yang
  // sedang didominasi broker tertentu di sisi beli atau jual.
  { key:"top3BuyBrokers", label:"Top 3 Broker (Beli)", type:"broker" },
  { key:"top3SellBrokers", label:"Top 3 Broker (Jual)", type:"broker" },
];
const RULE_METRICS_BY_KEY = Object.fromEntries(RULE_METRICS.map(m=>[m.key, m]));
function isCategoryMetric(key){ return RULE_METRICS_BY_KEY[key]?.type === "category"; }
function isBrokerMetric(key){ return RULE_METRICS_BY_KEY[key]?.type === "broker"; }

// Label yang ditampilkan di dropdown/autocomplete rule builder — field
// non-angka (kategori/broker) dapat suffix penanda supaya user tetap tahu
// jenisnya walau daftarnya sekarang digabung urut abjad, bukan dikelompokkan
// pakai <optgroup> seperti sebelumnya.
function metricDisplayLabel(m){
  if(m.type === "category") return `${m.label} (Kategori)`;
  if(m.type === "broker") return `${m.label} (Broker)`;
  return m.label;
}
// Daftar metrik untuk dropdown "aKey" (semua field) — diurutkan ABJAD
// (locale "id") berdasarkan label yang tampil ke user.
const RULE_METRICS_ALL_SORTED = RULE_METRICS.slice()
  .sort((a,b)=> metricDisplayLabel(a).localeCompare(metricDisplayLabel(b), "id"));
// Daftar metrik untuk dropdown "bKey" (cuma field ANGKA — bandingkan field
// kategori/broker ke field lain tidak ada artinya) — juga diurutkan abjad.
const RULE_METRICS_NUMERIC_SORTED = RULE_METRICS
  .filter(m=> m.type !== "category" && m.type !== "broker")
  .slice()
  .sort((a,b)=> a.label.localeCompare(b.label, "id"));
// <datalist> statis (dibangun sekali, dipakai berulang) yang memberi
// autocomplete/pencarian bawaan browser untuk kedua dropdown di atas — user
// tinggal mengetik sebagian nama metrik, browser akan menyaring pilihannya.
const RULE_METRIC_DATALIST_ALL_HTML = RULE_METRICS_ALL_SORTED
  .map(m=> `<option value="${escapeHtml(metricDisplayLabel(m))}"></option>`).join("");
const RULE_METRIC_DATALIST_NUMERIC_HTML = RULE_METRICS_NUMERIC_SORTED
  .map(m=> `<option value="${escapeHtml(m.label)}"></option>`).join("");
// Daftar metrik untuk dropdown "Sortir Hasil" di panel Rules Kustom — field
// ANGKA + KATEGORI (kategori diurutkan alfabetis berdasar nilainya) boleh
// dipakai, tapi field BROKER (array kode broker) dikecualikan karena tidak
// ada artinya untuk diurutkan. Diurutkan abjad seperti dropdown lain.
const RULE_METRICS_SORT_SORTED = RULE_METRICS
  .filter(m=> m.type !== "broker")
  .slice()
  .sort((a,b)=> metricDisplayLabel(a).localeCompare(metricDisplayLabel(b), "id"));
const RULE_METRIC_DATALIST_SORT_HTML = RULE_METRICS_SORT_SORTED
  .map(m=> `<option value="${escapeHtml(metricDisplayLabel(m))}"></option>`).join("");
// Field kategori "band" (Bandarmologi proxy vol.) nilainya nested di
// s.band.label, sedangkan kolom tabel yang sama (SCREENER_COLUMNS) dan
// klik-sort di header memakai key "band.label" (lihat getSorted()) — dua
// fungsi ini menjembatani supaya sortir dari panel Rules Kustom tetap
// konsisten/nyambung dengan sort yang dipicu klik header kolom tabel.
function ruleSortKeyToCol(key){ return key === "band" ? "band.label" : key; }
function sortColToRuleKey(col){ return col === "band.label" ? "band" : col; }
// Reverse lookup: teks label (huruf kecil, di-trim) -> key metrik asli.
// Dipakai untuk mengembalikan pilihan/ketikan user di kotak autocomplete
// (yang nilainya berupa teks label) balik ke key aslinya.
const RULE_METRIC_LABEL_TO_KEY = new Map();
RULE_METRICS.forEach(m=>{
  RULE_METRIC_LABEL_TO_KEY.set(metricDisplayLabel(m).trim().toLowerCase(), m.key);
  RULE_METRIC_LABEL_TO_KEY.set(m.label.trim().toLowerCase(), m.key);
});
function metricKeyForLabel(text){
  if(text===null || text===undefined) return null;
  return RULE_METRIC_LABEL_TO_KEY.get(String(text).trim().toLowerCase()) || null;
}
const RULE_OPS = {
  ">": (a,b)=>a>b, "<": (a,b)=>a<b, ">=": (a,b)=>a>=b, "<=": (a,b)=>a<=b, "=": (a,b)=>a===b, "≠": (a,b)=>a!==b,
  // "a" di sini adalah ARRAY kode broker (top 3 beli/jual), "b" adalah
  // kode broker yang diketik user (sudah di-uppercase di ruleRawValue).
  "contains": (a,b)=> Array.isArray(a) && a.includes(b),
  "!contains": (a,b)=> Array.isArray(a) && !a.includes(b),
};
function ruleMetricLabel(key){ const m = RULE_METRICS.find(x=>x.key===key); return m ? m.label : key; }
function ruleMetricValue(s, key){
  const v = s[key];
  if(v===undefined || v===null || v==="" || isNaN(v)) return null;
  return Number(v);
}
// Sama seperti ruleMetricValue, tapi untuk field KATEGORI (teks) — tidak
// dipaksa jadi angka, cukup dikembalikan apa adanya (atau null kalau kosong).
// Juga menangani field BROKER (top3BuyBrokers/top3SellBrokers), yang bukan
// properti langsung di objek saham `s` — datanya diambil dari
// state.top3BrokerData (hasil loadTop3BrokerData(), keyed by ticker).
function ruleRawValue(s, key){
  if(key === "top3BuyBrokers" || key === "top3SellBrokers"){
    const data = state.top3BrokerData[String(s.ticker || "").toUpperCase()];
    if(!data) return null;
    const arr = key === "top3BuyBrokers" ? data.buy : data.sell;
    return (arr && arr.length) ? arr : null;
  }
  // Field "band" (Bandarmologi proxy vol.) nilainya nested di s.band.label,
  // bukan properti langsung s["band"] — ditangani khusus di sini supaya
  // isCategoryMetric/evalCustomRule generik lainnya tetap tidak berubah.
  if(key === "band"){
    return (s.band && s.band.label) ? s.band.label : null;
  }
  const v = s[key];
  return (v===undefined || v===null || v==="") ? null : v;
}
// Deskripsi 1 baris rule kustom dalam bahasa manusia, mis. "Price > 1"
// atau "1 Day Price Returns (%) > -15" atau (bandingkan 2 metrik dengan
// pengali) "Frequency > 5 × Frequency Analyzer".
// Field kategori sekarang boleh punya BEBERAPA nilai terpilih sekaligus
// (checklist), bukan cuma 1 — rule.bConst jadi ARRAY untuk field kategori.
// Helper ini menormalkan bConst (yang mungkin masih berupa string tunggal
// dari data lama/localStorage sebelum fitur multi-pilih ini ada) jadi array,
// supaya semua kode lain (eval, deskripsi, render) tinggal pakai satu bentuk.
function ruleBConstArray(rule){
  if(Array.isArray(rule.bConst)) return rule.bConst.filter(v=>v!==null && v!==undefined && v!=="");
  return (rule.bConst!==null && rule.bConst!==undefined && rule.bConst!=="") ? [rule.bConst] : [];
}
function ruleDescription(rule){
  const aLabel = ruleMetricLabel(rule.aKey);
  if(rule.op === "between"){
    return `${aLabel} antara ${rule.bConstMin} dan ${rule.bConstMax}`;
  }
  if(isCategoryMetric(rule.aKey)){
    const vals = ruleBConstArray(rule);
    if(!vals.length) return `${aLabel} (belum pilih nilai — nonaktif)`;
    const opWord = rule.op === "≠" ? "bukan salah satu dari" : (vals.length > 1 ? "salah satu dari" : rule.op);
    return `${aLabel} ${opWord} [${vals.join(", ")}]`;
  }
  if(rule.bType === "const"){
    return `${aLabel} ${rule.op} ${rule.bConst}`;
  }
  const bLabel = ruleMetricLabel(rule.bKey);
  const mult = Number(rule.mult);
  const multPart = (mult && mult !== 1) ? `${rule.mult} × ` : "";
  return `${aLabel} ${rule.op} ${multPart}${bLabel}`;
}
// Ringkasan screener/preset yang SEDANG AKTIF saat user klik "Simpan ke
// Backtest" — dipakai supaya kolom Sumber & Kriteria di tab Backtest
// menunjukkan preset/rule apa yang menghasilkan tiap entry, bukan cuma
// label generik "Screener" seperti sebelumnya.
function getActiveScreenerContext(){
  const parts = [];
  let label = "Screener";

  if(state.activePreset){
    label = PRESET_LABELS[state.activePreset] || state.activePreset;
    parts.push(`Preset DSI "${label}"`);
  }

  if(state.customRules && state.customRules.length){
    const rulesText = state.customRules.map(ruleDescription).join("; ");
    const customPreset = state.customPresets.find(p => String(p.id) === String(state.selectedPresetId));
    if(customPreset){
      if(!state.activePreset) label = customPreset.name;
      parts.push(`Preset Kustom "${customPreset.name}": ${rulesText}`);
    } else {
      if(!state.activePreset) label = "Rules Kustom";
      parts.push(`Rules Kustom: ${rulesText}`);
    }
  }

  return {
    label,
    criteria: parts.length ? parts.join(" | ") : "Tanpa filter/preset aktif (semua data screener)"
  };
}
function evalCustomRule(s, rule){
  // Field broker (top 3 broker beli/jual) — dibandingkan pakai
  // "contains" / "!contains" terhadap kode broker bebas yang diketik user
  // (rule.bConst), bukan angka atau pilihan tetap.
  if(isBrokerMetric(rule.aKey)){
    const aVal = ruleRawValue(s, rule.aKey); // array kode broker, atau null kalau tidak ada data
    if(aVal===null) return false;
    const cmp = RULE_OPS[rule.op];
    if(!cmp || (rule.op !== "contains" && rule.op !== "!contains")) return false;
    const needle = String(rule.bConst || "").trim().toUpperCase();
    if(!needle) return false;
    return cmp(aVal, needle);
  }
  // Field kategori (teks) — hanya boleh dibandingkan "=" / "≠" terhadap
  // salah satu pilihan tetap (rule.bConst), tidak bisa dikali/dibandingkan
  // ke metrik lain karena tidak ada artinya untuk teks.
  if(isCategoryMetric(rule.aKey)){
    const aVal = ruleRawValue(s, rule.aKey);
    if(aVal===null) return false;
    if(rule.op !== "=" && rule.op !== "≠") return false;
    // bConst untuk field kategori sekarang berupa ARRAY (bisa lebih dari 1
    // pilihan, mis. ["Volume Spike", "Volume Spike Kuat"]) — "=" berarti
    // "cocok salah satu dari daftar" (OR), "≠" berarti "tidak cocok semua".
    const selected = ruleBConstArray(rule);
    // PENTING: kalau user meng-uncheck SEMUA nilai (checklist kosong), rule
    // ini dianggap NONAKTIF (lolos/true, tidak membatasi apa-apa) — BUKAN
    // "tolak semua baris". Sebelumnya checklist kosong bikin seluruh
    // screener jadi 0 baris tanpa error/peringatan apapun, karena rule ini
    // di-AND-kan otomatis ke tabel utama; itu jebakan diam-diam yang
    // membingungkan, jadi sekarang checklist kosong = rule diabaikan.
    if(!selected.length) return true;
    const isIn = selected.some(v => String(v) === String(aVal));
    return rule.op === "=" ? isIn : !isIn;
  }
  const aVal = ruleMetricValue(s, rule.aKey);
  if(aVal===null) return false;
  // "between" (mis. RSI21 antara 50-70, meniru filter "Between" di
  // screener Stockbit) — selalu 2 angka tetap, tidak bisa dibandingkan ke
  // metrik lain, jadi ditangani terpisah dari cmp(a,b) generik di bawah.
  if(rule.op === "between"){
    const lo = parseFloat(rule.bConstMin);
    const hi = parseFloat(rule.bConstMax);
    if(isNaN(lo) || isNaN(hi)) return false;
    return aVal >= Math.min(lo,hi) && aVal <= Math.max(lo,hi);
  }
  const cmp = RULE_OPS[rule.op];
  if(!cmp) return false;
  if(rule.bType === "const"){
    const bVal = parseFloat(rule.bConst);
    if(isNaN(bVal)) return false;
    return cmp(aVal, bVal);
  }
  const bVal = ruleMetricValue(s, rule.bKey);
  if(bVal===null) return false;
  const mult = parseFloat(rule.mult);
  if(isNaN(mult)) return false;
  return cmp(aVal, mult * bVal);
}
function saveCustomRules(){ localStorage.setItem(LS_CUSTOM_RULES, JSON.stringify(state.customRules)); }

// Reset semua Rules Kustom sekaligus (tombol "↺ Reset" di panel rule builder).
// Beda dari clearChip('rules'): ini dipanggil langsung dari dalam panel rule
// builder itu sendiri (bukan dari chip filter aktif), dan selalu minta
// konfirmasi dulu karena aksinya tidak bisa dibatalkan.
function resetCustomRules(){
  if(!state.customRules.length) return;
  if(!confirm(`Reset semua ${state.customRules.length} rule kustom? Ini tidak akan menghapus preset yang sudah tersimpan.`)) return;
  state.customRules = [];
  saveCustomRules();
  state.page = 1;
  render();
}

// ==========================================
// PRESET SCREENER KUSTOM (tabel custom_presets di Supabase)
//
// Beda dengan "Screener DSI" (state.activePreset, hardcoded di kode) —
// ini preset Rules Kustom buatan user sendiri, disimpan ke Supabase
// supaya bisa dipanggil lagi kapan saja / dari device lain, mirip
// fitur "Preset" di Edit Screener Stockbit.
// ==========================================
async function refreshCustomPresets(){
  if(!SUPABASE_URL || !SUPABASE_KEY) return;
  try{
    const res = await fetch(`${SUPABASE_URL}/custom_presets?select=*&order=created_at.desc`, { headers: getSupaHeaders(), cache: "no-store" });
    const data = await res.json();
    if(Array.isArray(data)) state.customPresets = data;
  }catch(e){}
}

// Cek nama preset sudah dipakai preset LAIN atau belum (case-insensitive,
// abaikan spasi di ujung). excludeId dipakai saat update preset yang
// sedang dipilih supaya preset itu sendiri tidak dianggap "bentrok"
// dengan namanya sendiri.
function isPresetNameTaken(name, excludeId){
  const norm = name.trim().toLowerCase();
  return state.customPresets.some(p =>
    String(p.id) !== String(excludeId ?? "") && String(p.name || "").trim().toLowerCase() === norm
  );
}

async function saveCurrentAsPreset(){
  if(!SUPABASE_URL || !SUPABASE_KEY){ openSettings(); return; }
  if(!state.customRules.length){ alert("Belum ada Rule Kustom untuk disimpan. Tambahkan rule dulu lewat \"+ Tambah Rule\"."); return; }
  const name = prompt("Nama preset (mis. \"Breakout Volume + RSI\"):", "");
  if(name === null) return;
  const trimmed = name.trim();
  if(!trimmed){ alert("Nama preset tidak boleh kosong."); return; }
  // Nama harus unik antar preset — kalau sudah dipakai preset lain, tolak
  // di sisi client dulu (lebih cepat & pesannya lebih jelas) sebelum
  // sempat kirim ke Supabase.
  if(isPresetNameTaken(trimmed)){
    alert(`Nama preset "${trimmed}" sudah dipakai. Pilih nama lain, atau kalau maksudnya mengubah preset yang sudah ada, pilih presetnya di dropdown "Preset Tersimpan" lalu klik "🔄 Update Preset".`);
    return;
  }

  state.presetsLoading = true; render();
  try{
    const res = await supaFetch(`${SUPABASE_URL}/custom_presets`, {
      method: "POST",
      headers: { ...getSupaHeaders(), "Prefer": "return=representation" },
      body: JSON.stringify({ name: trimmed, rules: state.customRules })
    });
    const saved = await res.json();
    if(Array.isArray(saved) && saved[0] && saved[0].id){
      state.selectedPresetId = saved[0].id;
    }
    await refreshCustomPresets();
  }catch(e){
    showError("Gagal menyimpan preset: " + e.message);
  }
  state.presetsLoading = false; render();
}

// Simpan ULANG rule kustom yang sedang aktif ke preset yang SEDANG DIPILIH
// di dropdown "Preset Tersimpan" (bukan bikin preset baru). Ini yang
// dipakai kalau user memuat preset lama, menambah/mengubah kriteria, lalu
// mau menimpa preset yang sama — tanpa harus "Simpan sebagai Preset..."
// dengan nama baru setiap kali.
async function updateSelectedPreset(){
  if(!SUPABASE_URL || !SUPABASE_KEY){ openSettings(); return; }
  const preset = state.customPresets.find(p => String(p.id) === String(state.selectedPresetId));
  if(!preset){ alert("Pilih dulu preset yang mau diupdate dari dropdown \"Preset Tersimpan\"."); return; }
  if(!state.customRules.length){ alert("Rules Kustom kosong — tidak ada yang bisa disimpan ke preset."); return; }

  const name = prompt("Nama preset (boleh diganti, atau biarkan sama):", preset.name || "");
  if(name === null) return;
  const trimmed = name.trim();
  if(!trimmed){ alert("Nama preset tidak boleh kosong."); return; }
  if(isPresetNameTaken(trimmed, preset.id)){
    alert(`Nama preset "${trimmed}" sudah dipakai preset lain. Pilih nama lain.`);
    return;
  }

  state.presetsLoading = true; render();
  try{
    await supaFetch(`${SUPABASE_URL}/custom_presets?id=eq.${preset.id}`, {
      method: "PATCH",
      headers: { ...getSupaHeaders(), "Prefer": "return=minimal" },
      body: JSON.stringify({ name: trimmed, rules: state.customRules })
    });
    await refreshCustomPresets();
  }catch(e){
    showError("Gagal mengupdate preset: " + e.message);
  }
  state.presetsLoading = false; render();
}

function loadSelectedPreset(){
  const preset = state.customPresets.find(p => String(p.id) === String(state.selectedPresetId));
  if(!preset) return;
  const rules = Array.isArray(preset.rules) ? preset.rules : [];
  // Deep-clone + pastikan tiap rule punya id lokal (jaga-jaga kalau
  // rule lama disimpan tanpa id, atau dobel id antar-preset).
  state.customRules = rules.map(r => ({ ...r, id: "r" + Date.now() + "_" + (ruleIdCounter++) }));
  saveCustomRules();
  state.page = 1;
  // Otomatis collapse panel Rules Kustom setelah preset dimuat — biar tidak
  // langsung kelihatan 10+ baris rule tiap kali cuma mau pakai preset yang
  // sudah jadi. Tinggal klik header panel buat expand lagi kalau mau edit.
  state.ruleBuilderOpen = false;
  render();
}

async function deleteSelectedPreset(){
  const preset = state.customPresets.find(p => String(p.id) === String(state.selectedPresetId));
  if(!preset) return;
  if(!confirm(`Hapus preset "${preset.name}"? Ini tidak akan menghapus Rules Kustom yang sedang aktif.`)) return;

  state.presetsLoading = true; render();
  try{
    await fetch(`${SUPABASE_URL}/custom_presets?id=eq.${preset.id}`, { method: "DELETE", headers: getSupaHeaders() });
    state.selectedPresetId = "";
    await refreshCustomPresets();
  }catch(e){
    showError("Gagal menghapus preset: " + e.message);
  }
  state.presetsLoading = false; render();
}

let ruleIdCounter = 0;
function addCustomRule(){
  state.customRules.push({
    id: "r" + Date.now() + "_" + (ruleIdCounter++),
    aKey: "cVol", op: ">", mult: "1", bType: "metric", bKey: "volMA20", bConst: ""
  });
  saveCustomRules();
  state.page = 1;
  state.ruleBuilderOpen = true; // biar baris baru langsung kelihatan kalau panel lagi collapsed
  render();
}
function updateCustomRule(id, field, value){
  const rule = state.customRules.find(r=>r.id===id);
  if(!rule) return;
  if(field === "toggleBType"){
    rule.bType = rule.bType === "const" ? "metric" : "const";
  } else {
    rule[field] = value;
  }
  // Kalau field kategori dipilih sebagai aKey, paksa bentuk rule tetap valid:
  // tidak bisa dibandingkan ke metrik lain (bType harus "const"), operator
  // cuma "="/"≠", dan bConst harus salah satu pilihan kategori itu sendiri
  // (bukan sisa angka/teks dari rule sebelumnya).
  if(field === "aKey" && isCategoryMetric(rule.aKey)){
    rule.bType = "const";
    if(rule.op !== "=" && rule.op !== "≠") rule.op = "=";
    const opts = RULE_METRICS_BY_KEY[rule.aKey].options;
    const current = ruleBConstArray(rule).filter(v=>opts.includes(v));
    rule.bConst = current.length ? current : [opts[0]];
  }
  // Kalau field BROKER (Top 3 Broker Beli/Jual) dipilih sebagai aKey: tidak
  // bisa dibandingkan ke metrik lain (bType harus "const"), operator cuma
  // "contains"/"!contains", dan bConst adalah kode broker bebas (teks),
  // bukan angka atau pilihan kategori sisa rule sebelumnya.
  else if(field === "aKey" && isBrokerMetric(rule.aKey)){
    rule.bType = "const";
    if(rule.op !== "contains" && rule.op !== "!contains") rule.op = "contains";
    if(typeof rule.bConst !== "string") rule.bConst = "";
  }
  // Kalau aKey diganti KE field numerik biasa dari kategori/broker
  // sebelumnya, operator "="/"≠"/"contains"/"!contains" sisa boleh tetap
  // dipakai untuk "="/"≠" (valid juga untuk angka), tapi "contains"/
  // "!contains" harus direset karena tidak berlaku untuk angka.
  else if(field === "aKey" && !isCategoryMetric(rule.aKey) && !isBrokerMetric(rule.aKey)){
    if(rule.op === "contains" || rule.op === "!contains") rule.op = ">";
  }
  // Kalau operator diganti JADI "between": paksa bType="const" (antara 2
  // angka tetap, tidak masuk akal dibandingkan ke metrik lain) dan siapkan
  // bConstMin/bConstMax — pakai bConst lama sebagai titik awal biar user
  // tidak mulai dari kosong kalau sebelumnya sudah isi satu angka.
  if(field === "op" && rule.op === "between"){
    rule.bType = "const";
    if(rule.bConstMin === undefined || rule.bConstMin === "") rule.bConstMin = rule.bConst || "";
    if(rule.bConstMax === undefined || rule.bConstMax === "") rule.bConstMax = "";
  }
  saveCustomRules();
  state.page = 1;
  render();
}
function deleteCustomRule(id){
  state.customRules = state.customRules.filter(r=>r.id!==id);
  saveCustomRules();
  state.page = 1;
  render();
}
// Centang/hapus 1 pilihan di checklist nilai kategori sebuah rule (dipanggil
// dari checkbox di dropdown multi-pilih rule builder — lihat renderRuleBuilder).
function toggleRuleCategoryValue(id, value, checked){
  const rule = state.customRules.find(r=>r.id===id);
  if(!rule) return;
  let arr = ruleBConstArray(rule);
  if(checked){
    if(!arr.includes(value)) arr.push(value);
  } else {
    arr = arr.filter(v=>v!==value);
  }
  updateCustomRule(id, "bConst", arr);
}
// Hitung ulang posisi dropdown checklist kategori rule builder (kalau lagi
// terbuka) berdasarkan lokasi tombolnya di viewport SEKARANG — dipanggil
// tiap kali render ulang (lewat attachContentEvents) supaya dropdown-nya
// position:fixed dan selalu nempel pas di bawah (atau di atas, kalau ruang
// bawah tidak cukup) tombolnya, tidak pernah kepotong oleh panel/daftar
// rule yang scroll/overflow.
function repositionRuleDropdown(){
  if(!state.openDropdown || !String(state.openDropdown).startsWith("rule_")) return;
  const btn = document.querySelector(`[data-rule-dd-toggle="${state.openDropdown}"]`);
  const panel = document.querySelector(`[data-rule-dd-panel="${state.openDropdown}"]`);
  if(!btn || !panel) return;
  const rect = btn.getBoundingClientRect();
  const panelWidth = Math.max(rect.width, 200);
  const estHeight = Math.min(panel.scrollHeight || 260, 260);
  let top = rect.bottom + 4;
  if(top + estHeight > window.innerHeight && rect.top - estHeight - 4 > 0){
    top = rect.top - estHeight - 4; // tidak cukup ruang di bawah -> buka ke atas
  }
  let left = rect.left;
  if(left + panelWidth > window.innerWidth - 8) left = Math.max(8, window.innerWidth - panelWidth - 8);
  panel.style.top = `${top}px`;
  panel.style.left = `${left}px`;
  panel.style.width = `${panelWidth}px`;
}
// Reposisi juga saat halaman di-scroll/resize selagi dropdown terbuka,
// supaya panel-nya tidak "lepas" dari tombolnya.
window.addEventListener("scroll", () => repositionRuleDropdown(), true);
window.addEventListener("resize", () => repositionRuleDropdown());
function renderRuleBuilder(){
  // Kotak metrik "aKey"/"bKey" sekarang berupa <input list="..."> yang
  // dipasangkan ke <datalist> statis (RULE_METRIC_DATALIST_ALL_HTML /
  // RULE_METRIC_DATALIST_NUMERIC_HTML, sudah diurutkan abjad) — ini
  // memberi autocomplete/pencarian bawaan browser: user tinggal mengetik
  // sebagian nama metrik dan daftarnya otomatis tersaring, tanpa perlu
  // scroll dropdown panjang. Nilai yang tersimpan di input adalah LABEL
  // metrik (bukan key); key aslinya di-resolve lewat metricKeyForLabel()
  // saat event "change" (lihat attachContentEvents).
  const metricInput = (field, ruleId, selectedKey, includeExtra) => {
    const currentLabel = selectedKey ? (includeExtra ? metricDisplayLabel(RULE_METRICS_BY_KEY[selectedKey] || {label:selectedKey}) : ruleMetricLabel(selectedKey)) : "";
    const listId = includeExtra ? "metricDatalistAll" : "metricDatalistNumeric";
    return `<input type="text" class="rule-select" list="${listId}" autocomplete="off" placeholder="Cari metrik..." data-rule-field="${field}" data-rule-id="${ruleId}" value="${escapeHtml(currentLabel)}">`;
  };
  const metricDatalists = `<datalist id="metricDatalistAll">${RULE_METRIC_DATALIST_ALL_HTML}</datalist><datalist id="metricDatalistNumeric">${RULE_METRIC_DATALIST_NUMERIC_HTML}</datalist><datalist id="metricDatalistSort">${RULE_METRIC_DATALIST_SORT_HTML}</datalist>`;

  // Sortir hasil (Asc/Desc) — memakai state.sort yang sama dengan sort klik
  // header kolom tabel, supaya field yang dipilih di sini benar-benar
  // mengurutkan tabel screener (dan sebaliknya: kalau user sudah sort lewat
  // klik header, field itu otomatis kelihatan terisi di sini juga).
  const currentSortKey = sortColToRuleKey(state.sort.col);
  const currentSortMetric = currentSortKey ? (RULE_METRICS_BY_KEY[currentSortKey] || { label: currentSortKey }) : null;
  const currentSortLabel = currentSortMetric ? metricDisplayLabel(currentSortMetric) : "";
  const opLabels = { "contains":"contains", "!contains":"tidak mengandung", "between":"antara (between)" };
  const opOptions = (selected, categoryOnly, brokerOnly) => {
    const ops = brokerOnly ? ["contains","!contains"] : categoryOnly ? ["=","≠"] : [...Object.keys(RULE_OPS).filter(op=>op!=="contains"&&op!=="!contains"), "between"];
    return ops.map(op=>`<option value="${op}" ${selected===op?'selected':''}>${opLabels[op]||op}</option>`).join("");
  };

  // Checklist multi-pilih untuk field kategori (mis. "Sinyal Volume")
  const ruleCategoryMultiSelect = (r, catOpts) => {
    const selected = ruleBConstArray(r);
    const ddKey = `rule_${r.id}`;
    const isOpen = state.openDropdown === ddKey;
    const btnText = selected.length === 0 ? "⚠️ (belum pilih — nonaktif)" : selected.length === 1 ? selected[0] : `${selected.length} dipilih`;
    const itemsHtml = catOpts.map(o => `
      <label class="select-item" onclick="event.stopPropagation()">
        <input type="checkbox" value="${escapeHtml(o)}" data-rule-cat-id="${r.id}" ${selected.includes(o) ? 'checked' : ''}>
        <span>${escapeHtml(o)}</span>
      </label>
    `).join("");
    return `
      <div class="multi-select rule-const" style="min-width:170px;max-width:220px;flex:1 1 100%;">
        <button type="button" class="select-btn" data-rule-dd-toggle="${ddKey}" style="width:100%;">
          <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:150px;">${escapeHtml(btnText)}</span>
          <span style="font-size:9px;color:var(--muted)">▼</span>
        </button>
        <div class="select-dropdown ${isOpen ? 'open' : ''}" data-rule-dd-panel="${ddKey}" onclick="event.stopPropagation()" style="position:fixed;z-index:99999;max-height:260px;overflow-y:auto;box-shadow:0 8px 24px rgba(0,0,0,0.45);">
          ${itemsHtml}
        </div>
      </div>
    `;
  };

  const rows = state.customRules.map(r => {
    const isCat = isCategoryMetric(r.aKey);
    const isBroker = isBrokerMetric(r.aKey);
    const catOpts = isCat ? RULE_METRICS_BY_KEY[r.aKey].options : [];
    return `
    <div class="rule-row" data-rule-id="${r.id}" style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
      ${metricInput("aKey", r.id, r.aKey, true)}
      <select class="rule-op" data-rule-field="op" data-rule-id="${r.id}">${opOptions(r.op, isCat, isBroker)}</select>
      ${isCat
        ? ruleCategoryMultiSelect(r, catOpts)
        : isBroker
          ? `<input type="text" class="rule-const" data-rule-field="bConst" data-rule-id="${r.id}" value="${escapeHtml(r.bConst||"")}" placeholder="Kode broker, mis. AK" maxlength="6" style="text-transform:uppercase; max-width:150px; width:100%; min-width:0;">`
          : r.op === "between"
            ? `<input type="number" step="any" class="rule-const" data-rule-field="bConstMin" data-rule-id="${r.id}" value="${r.bConstMin ?? ""}" placeholder="dari" style="max-width:80px; width:100%; min-width:0;">
               <span class="rule-times">&ndash;</span>
               <input type="number" step="any" class="rule-const" data-rule-field="bConstMax" data-rule-id="${r.id}" value="${r.bConstMax ?? ""}" placeholder="sampai" style="max-width:80px; width:100%; min-width:0;">`
            : (r.bType === "const"
              ? `<input type="number" step="any" class="rule-const" data-rule-field="bConst" data-rule-id="${r.id}" value="${r.bConst}" placeholder="angka" style="min-width:0;">`
              : `<input type="number" step="any" class="rule-mult" data-rule-field="mult" data-rule-id="${r.id}" value="${r.mult}" style="min-width:0;">
                 <span class="rule-times">&times;</span>
                 ${metricInput("bKey", r.id, r.bKey, false)}`
            )
      }
      ${(isCat || isBroker || r.op === "between") ? "" : `<button type="button" class="rule-btype-toggle" data-rule-field="toggleBType" data-rule-id="${r.id}" title="${r.bType==='const' ? 'Ganti jadi: bandingkan dengan metrik lain' : 'Ganti jadi: bandingkan dengan angka tetap'}">${r.bType==='const' ? '🔢' : '📊'}</button>`}
      <button type="button" class="rule-del" data-rule-del="${r.id}" title="Hapus rule">✕</button>
    </div>
  `;
  }).join("");

  const presetOptions = state.customPresets.map(p =>
    `<option value="${p.id}" ${String(state.selectedPresetId)===String(p.id)?'selected':''}>${escapeHtml(p.name)} (${Array.isArray(p.rules)?p.rules.length:0} rule)</option>`
  ).join("");

  return `
    ${metricDatalists}
    <div class="panel" style="margin-bottom:16px;">
      <div class="filter-section-title" id="ruleBuilderToggle" style="cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:10px;user-select:none;">
        <span style="display:flex;align-items:center;gap:8px;">
          <span style="display:inline-block;transition:transform .15s;transform:rotate(${state.ruleBuilderOpen?90:0}deg);">▶</span>
          Rules Kustom (mirip Edit Screener Stockbit)
        </span>
        <span class="line" style="flex:1;"></span>
        ${state.customRules.length ? `<span style="font-size:11.5px;color:var(--muted);font-weight:400;text-transform:none;letter-spacing:0;white-space:nowrap;">${state.customRules.length} rule aktif</span>` : ""}
      </div>
      ${state.ruleBuilderOpen ? `
      <div class="rule-list">${rows || '<div style="color:var(--muted);font-size:13px;padding:6px 0 2px;">Belum ada rule kustom. Klik "+ Tambah Rule" untuk mulai — misalnya "Frequency &gt; 5 × Frequency Analyzer".</div>'}</div>
      <div style="display:flex;align-items:center;gap:12px;margin-top:12px;flex-wrap:wrap;">
        <button type="button" class="btn btn-outline" id="addRuleBtn">+ Tambah Rule</button>
        <button type="button" class="btn btn-outline" id="savePresetBtn" ${state.presetsLoading?'disabled':''}>💾 Simpan sebagai Preset...</button>
        ${state.customRules.length ? `<button type="button" class="btn btn-outline" id="resetRulesBtn" title="Kosongkan semua rule kustom" style="color:#f87171;border-color:rgba(239,68,68,0.3);">↺ Reset</button>` : ""}
        ${state.customRules.length ? `<span style="font-size:12px;color:var(--muted);">${state.customRules.length} rule aktif — otomatis diterapkan ke tabel di bawah (AND, semua harus terpenuhi).</span>` : ""}
      </div>` : ""}
      <div style="display:flex;align-items:center;gap:10px;margin-top:14px;flex-wrap:wrap;padding-top:12px;border-top:1px solid var(--border);">
        <label style="font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;flex:1 1 100%;">Sortir Hasil (opsional)</label>
        <input type="text" id="ruleSortInput" list="metricDatalistSort" autocomplete="off" placeholder="Cari metrik untuk sortir, mis. Turnover..." value="${escapeHtml(currentSortLabel)}" style="flex:1 1 220px;min-width:0;background:rgba(0,0,0,0.2);border:1px solid var(--border);color:var(--text);font-size:12.5px;border-radius:7px;padding:8px 9px;">
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          <button type="button" class="btn btn-outline" id="ruleSortAscBtn" ${!state.sort.col ? "disabled" : ""} ${state.sort.col && state.sort.asc ? 'style="color:#34d399;border-color:rgba(16,185,129,0.5);"' : ""} title="Urutkan naik (kecil→besar / A→Z)">▲ Naik</button>
          <button type="button" class="btn btn-outline" id="ruleSortDescBtn" ${!state.sort.col ? "disabled" : ""} ${state.sort.col && !state.sort.asc ? 'style="color:#34d399;border-color:rgba(16,185,129,0.5);"' : ""} title="Urutkan turun (besar→kecil / Z→A)">▼ Turun</button>
          ${state.sort.col ? `<button type="button" class="btn btn-outline" id="ruleSortClearBtn" title="Hapus sortir" style="color:#f87171;border-color:rgba(239,68,68,0.3);">✕ Hapus</button>` : ""}
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:10px;margin-top:14px;flex-wrap:wrap;padding-top:12px;border-top:1px solid var(--border);">
        <label style="font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;flex:1 1 100%;">Preset Tersimpan</label>
        
        <!-- PERBAIKAN DI SINI: min-width:0 dan flex:1 1 100% agar responsif -->
        <select id="presetSelect" style="background:rgba(0,0,0,0.2);border:1px solid var(--border);color:var(--text);font-size:12.5px;border-radius:7px;padding:8px 9px;min-width:0;flex:1 1 100%;width:100%;max-width:100%;">
          <option value="">${state.customPresets.length ? '— pilih preset —' : 'Belum ada preset tersimpan'}</option>
          ${presetOptions}
        </select>
        
        <div style="display:flex; gap:10px; flex-wrap:wrap; width:100%;">
          <button type="button" class="btn btn-outline" id="loadPresetBtn" ${!state.selectedPresetId || state.presetsLoading ? 'disabled' : ''} title="Muat rule dari preset ini (menimpa rule kustom yang aktif)" style="flex:1; justify-content:center;">📥 Muat</button>
          <button type="button" class="btn btn-outline" id="updatePresetBtn" ${!state.selectedPresetId || !state.customRules.length || state.presetsLoading ? 'disabled' : ''} title="Timpa preset ini dengan Rules Kustom yang sedang aktif — tidak perlu simpan dengan nama baru" style="color:#34d399;border-color:rgba(16,185,129,0.35); flex:1; justify-content:center;">🔄 Update Preset</button>
          <button type="button" class="btn btn-outline" id="deletePresetBtn" ${!state.selectedPresetId || state.presetsLoading ? 'disabled' : ''} title="Hapus preset ini" style="color:#f87171;border-color:rgba(239,68,68,0.3); flex:1; justify-content:center;">🗑️ Hapus</button>
        </div>
      </div>
    </div>
  `;
}

// Kolom yang tampil DEFAULT — cukup untuk overview cepat tanpa scroll
// horizontal panjang. Sisanya disembunyikan sampai dipilih lewat panel
// "🧩 Kolom", supaya tabel nyaman dilihat begitu halaman dibuka.
const DEFAULT_VISIBLE_COLS = [
  "sektor", "baggerScoreTotal", "stockbitLive", "cClose", "changePct", "cVol", "frequency",
  "per", "pbv", "roe", "divYield", "valuasi",
  "trendHarga", "rsi7", "cekMacd",
  "foreignNet20D", "keyakinanNaik", "rekomendasi"
];
const LS_VISIBLE_COLS = "ihsg_visible_cols_v1";

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100, 200];

function renderScreener(){
  const list = enriched();
  const filtered = getFiltered();
  const sorted = getSorted(filtered);

  // Default Periode Dari–Sampai untuk tombol "Tarik Data Stockbit" di toolbar
  // Screener (state sama dengan yang dipakai tab Broker Summary, jadi kalau
  // diubah di sini otomatis kepakai juga di sana, dan sebaliknya).
  if(!state.bsAutoBulkFrom || !state.bsAutoBulkTo){
    const defaultDates = tradingDaysBack(state.bsAutoBulkDays || 10);
    state.bsAutoBulkFrom = defaultDates[0];
    state.bsAutoBulkTo = defaultDates[defaultDates.length - 1];
  }
  if(!state.hdAutoBulkFrom || !state.hdAutoBulkTo){
    const defaultHdDates = tradingDaysBack(10);
    state.hdAutoBulkFrom = defaultHdDates[0];
    state.hdAutoBulkTo = defaultHdDates[defaultHdDates.length - 1];
  }
  
  const effectiveLimit = state.limit === "all" ? Math.max(sorted.length, 1) : state.limit;
  const totalPages = Math.ceil(sorted.length / effectiveLimit) || 1;
  if (state.page > totalPages) state.page = totalPages;
  const startIndex = (state.page - 1) * effectiveLimit;
  const pagedData = sorted.slice(startIndex, startIndex + effectiveLimit);

  const getOpts = (key) => uniqueOpts(list,key);
  const allFilteredChecked = filtered.length > 0 && filtered.every(s => state.selectedForBacktest.has(s.ticker));
  const visibleColumns = SCREENER_COLUMNS.filter(c => state.visibleCols.has(c.key));
  // Disimpan supaya tombol "Ekspor Excel" (di-wire lewat attachContentEvents,
  // terpisah dari closure render ini) tetap bisa mengambil data hasil
  // filter/sort/kolom-tampil yang PALING BARU tanpa menghitung ulang.
  lastScreenerExport = { rows: sorted, columns: visibleColumns };

  const FREEZE_W = { chk: 36, star: 34, ticker: 104 };
  const FREEZE_LEFT = { chk: 0, star: FREEZE_W.chk, ticker: FREEZE_W.chk + FREEZE_W.star };

  const th = (label, col, sortable, freezeKey) => {
    const freezeStyle = freezeKey ? `width:${FREEZE_W[freezeKey]}px;left:${FREEZE_LEFT[freezeKey]}px;` : "";
    const freezeClass = freezeKey ? `col-freeze${freezeKey==='ticker' ? ' col-freeze-shadow' : ''}` : "";
    if(sortable === false) return `<th class="${freezeClass}" style="${freezeStyle}">${label}</th>`;
    let icon = `<span class="sort-icon"></span>`;
    if (state.sort.col === col) {
      icon = `<span class="sort-icon">${state.sort.asc ? '▲' : '▼'}</span>`;
    }
    return `<th class="sortable ${freezeClass}" data-sort="${col}" style="${freezeStyle}">${label} ${icon}</th>`;
  };

  const nBullish = filtered.filter(s=>trendTone(s.trendHarga)==="up").length;
  const nBearish = filtered.filter(s=>trendTone(s.trendHarga)==="down").length;
  const nSideways = filtered.length - nBullish - nBearish;
  const nHighConf = filtered.filter(s=>s.keyakinanTone==="up").length;
  const topGainer = filtered.length ? filtered.reduce((a,b)=> (b.changePct??-999) > (a.changePct??-999) ? b : a) : null;
  const summaryCards = `
    <div class="summary-grid">
      <div class="summary-card"><div class="summary-lbl">Total Emiten</div><div class="summary-val">${filtered.length}</div></div>
      <div class="summary-card tone-up"><div class="summary-lbl">Trend Bullish</div><div class="summary-val">${nBullish}</div></div>
      <div class="summary-card tone-down"><div class="summary-lbl">Trend Bearish</div><div class="summary-val">${nBearish}</div></div>
      <div class="summary-card tone-gold"><div class="summary-lbl">Sideways/Mixed</div><div class="summary-val">${nSideways}</div></div>
      <div class="summary-card tone-up"><div class="summary-lbl">Keyakinan Tinggi</div><div class="summary-val">${nHighConf}</div></div>
      <div class="summary-card"><div class="summary-lbl">Top Gainer</div><div class="summary-val" style="font-size:16px;">${topGainer ? topGainer.ticker + (topGainer.changePct!=null ? ' <span style="color:var(--up);font-size:13px; text-shadow:0 0 5px rgba(16,185,129,0.5);">+' + topGainer.changePct.toFixed(2) + '%</span>' : '') : "-"}</div></div>
    </div>`;

  // Header klik-untuk-buka/tutup yang dipakai tiap panel collapsible di tab
  // Screener (Ringkasan, Filter & Screener, Hasil Screener) — gaya visualnya
  // sama dengan header "Rules Kustom" (lihat renderRuleBuilder()), supaya
  // konsisten. Wiring klik-nya ada di attachContentEvents ([data-screener-collapse]).
  const sectionHeader = (key, title, isOpen) => `
    <div class="filter-section-title screener-collapse-toggle" data-screener-collapse="${key}" style="cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:10px;user-select:none;${isOpen ? 'margin-bottom:10px;' : ''}">
      <span style="display:flex;align-items:center;gap:8px;">
        <span style="display:inline-block;transition:transform .15s;transform:rotate(${isOpen?90:0}deg);">▶</span>
        ${title}
      </span>
      <span class="line" style="flex:1;"></span>
    </div>`;

  const rows = pagedData.map(s=>{
    const bodyCells = visibleColumns.map(c => c.cell(s)).join("");
   return `
    <tr id="row-${s.ticker}">
      <td class="col-freeze" style="width:${FREEZE_W.chk}px;left:${FREEZE_LEFT.chk}px;"><input type="checkbox" class="custom-checkbox chk-row" data-check="${s.ticker}" ${state.selectedForBacktest.has(s.ticker)?'checked':''}></td>   <td class="col-freeze" style="width:${FREEZE_W.star}px;left:${FREEZE_LEFT.star}px;"><button class="star-btn" data-fav="${s.ticker}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="${state.watchlist.has(s.ticker)?'var(--gold)':'none'}" stroke="${state.watchlist.has(s.ticker)?'var(--gold)':'var(--muted)'}" stroke-width="2.5" style="filter: ${state.watchlist.has(s.ticker)?'drop-shadow(0 0 3px rgba(245,158,11,0.5))':'none'};"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      </button></td>
      <td class="ticker-cell col-freeze col-freeze-shadow" style="width:${FREEZE_W.ticker}px;left:${FREEZE_LEFT.ticker}px;"><button class="ticker-link" data-detail="${s.ticker}" title="Lihat detail ${s.ticker}">${s.ticker}</button>${s.uangGedeMasuk==="Ya" ? ' <span title="Indikasi uang gede masuk">💰</span>' : ''}</td>
      ${bodyCells}
      <td>
        <div style="display:flex; gap: 8px;">
          <a class="link-btn" href="#/chart/${encodeURIComponent(s.ticker)}" data-chart="${s.ticker}">Chart</a>
          <a class="link-btn link-btn-tv" href="${tvChartPageUrl(s.ticker)}" target="_blank" rel="noopener" title="Buka ${s.ticker} di TradingView">TV</a>
          <a class="link-btn link-btn-sb" href="${stockbitUrl(s.ticker)}" target="_blank" rel="noopener" title="Buka ${s.ticker} di Stockbit">SB</a>
        </div>
      </td>
    </tr>`;
  }).join("");

  return `
    <div class="panel" style="flex-direction:column;align-items:stretch;margin-bottom:16px;">
      ${sectionHeader("ringkasan", "📈 Ringkasan Screener", state.screenerRingkasanOpen)}
      ${state.screenerRingkasanOpen ? summaryCards : ""}
    </div>
    ${renderRuleBuilder()}
    <div class="panel" style="flex-direction:column;align-items:stretch;">
      ${sectionHeader("filter", "🔍 Filter & Screener", state.screenerFilterOpen)}
      ${state.screenerFilterOpen ? `
      <div class="filter-toolbar">
        <div class="field" style="flex:1 1 100%;min-width:0;">
          <label>Screener DSI (Preset Siap Pakai)</label>
          <div style="display:flex; gap:10px; flex-wrap:wrap; width:100%;">
            <button class="pill ${state.activePreset === 'bagger' ? 'pill-up' : 'pill-muted'}" onclick="state.activePreset = state.activePreset === 'bagger' ? null : 'bagger'; state.page=1; render();" title="Skor komposit dari formula_screening_saham_bagger.md: Fundamental 40% + Momentum Teknikal 35% + Volume/Smart Money 25%, total ≥75" style="font-weight:700;box-shadow:0 0 10px rgba(16,185,129,0.15);">🎯 Skor Bagger ≥75</button>
            <button class="pill ${state.activePreset === 'eri' ? 'pill-gold' : 'pill-muted'}" onclick="state.activePreset = state.activePreset === 'eri' ? null : 'eri'; state.page=1; render();">Eri Ginanjar</button>
            <button class="pill ${state.activePreset === 'rsicross' ? 'pill-gold' : 'pill-muted'}" onclick="state.activePreset = state.activePreset === 'rsicross' ? null : 'rsicross'; state.page=1; render();">RSI & Harga Cross</button>
            <button class="pill ${state.activePreset === 'golden' ? 'pill-gold' : 'pill-muted'}" onclick="state.activePreset = state.activePreset === 'golden' ? null : 'golden'; state.page=1; render();">Golden Cross DSI</button>
            <button class="pill ${state.activePreset === 'uptrend' ? 'pill-gold' : 'pill-muted'}" onclick="state.activePreset = state.activePreset === 'uptrend' ? null : 'uptrend'; state.page=1; render();">Super Uptrend</button>
            <button class="pill ${state.activePreset === 'breakout' ? 'pill-up' : 'pill-muted'}" onclick="state.activePreset = state.activePreset === 'breakout' ? null : 'breakout'; state.page=1; render();">🚀 Volatility Breakout</button>
            <button class="pill ${state.activePreset === 'pullback' ? 'pill-teal' : 'pill-muted'}" onclick="state.activePreset = state.activePreset === 'pullback' ? null : 'pullback'; state.page=1; render();">🧲 Pullback Uptrend</button>
          <button class="pill ${state.activePreset === 'custom_bandar' ? 'pill-up' : 'pill-muted'}" onclick="state.activePreset = state.activePreset === 'custom_bandar' ? null : 'custom_bandar'; state.page=1; render();" title="Proxy dari lonjakan volume — bukan data asing resmi">🔥 BPJS (proxy volume)</button>
          <button class="pill ${state.activePreset === 'asing_akumulasi' ? 'pill-up' : 'pill-muted'}" onclick="state.activePreset = state.activePreset === 'asing_akumulasi' ? null : 'asing_akumulasi'; state.page=1; render();" title="Net beli asing 20 hari &ge; 50M, konsisten &ge;12/20 hari, likuid &ge;5M/hari — dari data resmi IDX">🐋 Akumulasi Asing (IDX)</button>
          <button class="pill ${state.activePreset === 'freq_spike' ? 'pill-teal' : 'pill-muted'}" onclick="state.activePreset = state.activePreset === 'freq_spike' ? null : 'freq_spike'; state.page=1; render();" title="Rasio Frekuensi &ge; 1.5x rata-rata — butuh kolom frequency/freq_ma20 di DB, kalau belum ada preset ini tidak akan menampilkan hasil">🔊 Lonjakan Frekuensi</button>
          <button class="pill ${state.activePreset === 'deepvalue' ? 'pill-up' : 'pill-muted'}" onclick="state.activePreset = state.activePreset === 'deepvalue' ? null : 'deepvalue'; state.page=1; render();" title="PER &le;15 · PBV &le;1.5 · ROE &ge;8% · DER &le;2 — kriteria Deep Value ala screener publik">💎 Deep Value</button>
          <button class="pill ${state.activePreset === 'multibagger' ? 'pill-up' : 'pill-muted'}" onclick="state.activePreset = state.activePreset === 'multibagger' ? null : 'multibagger'; state.page=1; render();" title="PER &le;20 · ROE &ge;12% · DER &le;1.5 · NPM &ge;5% — kandidat multibagger">📈 Multibagger</button>
          <button class="pill ${state.activePreset === 'growth' ? 'pill-up' : 'pill-muted'}" onclick="state.activePreset = state.activePreset === 'growth' ? null : 'growth'; state.page=1; render();" title="ROE &ge;15% · NPM &ge;10% — bisnis efisien & profitabel">🌱 Growth</button>
          <button class="pill ${state.activePreset === 'defensive' ? 'pill-up' : 'pill-muted'}" onclick="state.activePreset = state.activePreset === 'defensive' ? null : 'defensive'; state.page=1; render();" title="ROE &ge;8% · DER &le;1.5 · NPM &ge;5% — fundamental stabil">🛡️ Defensive</button>
          <button class="pill ${state.activePreset === 'smallcap' ? 'pill-up' : 'pill-muted'}" onclick="state.activePreset = state.activePreset === 'smallcap' ? null : 'smallcap'; state.page=1; render();" title="ROE &ge;8% · PER &le;25 · Market Cap &lt; Rp1 T — butuh kolom market_cap/shares_outstanding di DB">🐜 Small Cap (&lt;1T)</button>
            </div>
        </div>
        <div class="field">
          <label>Cari Ticker</label>
          <div class="search-wrap">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input id="searchInput" value="${state.search}" placeholder="BBCA..." />
          </div>
        </div>
        <div class="field">
          <label>Baris / Hal</label>
          <select id="pageSizeSelect" style="background:rgba(0,0,0,0.2);border:1px solid var(--border);color:var(--text);font-size:13px;border-radius:8px;padding:9.5px 12px; transition:0.2s;">
            ${PAGE_SIZE_OPTIONS.map(n=>`<option value="${n}" ${String(state.limit)===String(n)?'selected':''}>${n}</option>`).join("")}
            <option value="all" ${state.limit==="all"?'selected':''}>Semua</option>
          </select>
        </div>
        <div class="field" style="flex:0 0 auto;">
          <label>&nbsp;</label>
          <button type="button" class="btn btn-outline" id="exportScreenerBtn" style="color:#22d3ee;border-color:rgba(6,182,212,0.4);white-space:nowrap;" title="Ekspor hasil screener yang sedang difilter/diurutkan ke file Excel (.xlsx)">📊 Ekspor Excel (${sorted.length})</button>
        </div>
        <div class="field" style="flex:0 0 auto;">
          <label>&nbsp;</label>
          <div style="display:flex; align-items:center; gap:8px; background:rgba(167,139,250,0.06); border:1px solid rgba(167,139,250,0.25); border-radius:8px; padding:6px 10px;">
            <label for="bulkTickerFileInput" class="btn btn-outline" style="cursor:pointer; margin:0; padding:6px 10px; font-size:11.5px; white-space:nowrap;" title="Upload file .txt berisi daftar kode saham (satu per baris, atau dipisah koma/spasi/baris baru) -- dipakai sebagai target Live Stockbit, Broker Summary & Historical Data di bawah, menggantikan sementara centang baris/filter">
              📄 ${state.uploadedBulkTickers.length ? "Ganti Daftar .txt" : "Upload Daftar Ticker (.txt)"}
            </label>
            <input type="file" id="bulkTickerFileInput" accept=".txt,text/plain" style="display:none;">
            ${state.uploadedBulkTickers.length
              ? `<span style="font-size:11px;color:#a78bfa;white-space:nowrap;" title="${escapeHtml(state.uploadedBulkTickers.join(", "))}">${state.uploadedBulkTickers.length} ticker dari ${escapeHtml(state.uploadedBulkTickersFileName || "file")}</span>
                 <button type="button" id="clearBulkTickerFileBtn" style="background:none;border:none;color:var(--down);cursor:pointer;font-size:14px;line-height:1;padding:0 4px;" title="Hapus daftar upload, kembali pakai centang/filter tabel">✕</button>`
              : `<span style="font-size:10.5px;color:var(--muted);white-space:nowrap;">kosong = pakai centang/filter tabel</span>`}
          </div>
        </div>
        <div class="field" style="flex:0 0 auto;">
          <label>&nbsp;</label>
          <button type="button" class="btn btn-outline" id="stockbitBulkBtn" ${state.stockbitBulkLoading ? "disabled" : ""} style="color:#f87171;border-color:rgba(239,68,68,0.4);white-space:nowrap;" title="${state.uploadedBulkTickers.length ? `Tarik harga/orderbook live dari Stockbit untuk ${state.uploadedBulkTickers.length} ticker dari file yang diupload` : (state.selectedForBacktest.size>0 ? 'Tarik harga/orderbook live dari Stockbit HANYA untuk saham yang dicentang' : 'Tarik harga/orderbook live dari Stockbit untuk semua saham yang lolos filter saat ini (centang baris tertentu untuk membatasi hanya itu saja)')} — butuh Token diisi di Pengaturan">
            ${state.stockbitBulkLoading
              ? `🔴 Menarik ${state.stockbitBulkProgress?.done||0}/${state.stockbitBulkProgress?.total||0}...`
              : (state.uploadedBulkTickers.length ? `🔴 Live Stockbit (${state.uploadedBulkTickers.length} dari file)` : (state.selectedForBacktest.size>0 ? `🔴 Live Stockbit (${state.selectedForBacktest.size} dicentang)` : `🔴 Live Stockbit (${sorted.length} lolos)`))}
          </button>
        </div>
        <div class="field" style="flex:0 0 auto;">
          <label>&nbsp;</label>
          <div style="display:flex; align-items:center; gap:8px; background:rgba(239,68,68,0.06); border:1px solid rgba(239,68,68,0.25); border-radius:8px; padding:6px 10px;">
            <label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer;white-space:nowrap;margin:0;">
              <input type="checkbox" id="stockbitAutoRefreshChk" class="custom-checkbox" style="margin:0;" ${state.stockbitAutoRefresh ? "checked" : ""}>
              🔄 Auto-refresh
            </label>
            <select id="stockbitAutoRefreshSec" style="background:rgba(0,0,0,0.2);border:1px solid var(--border);color:var(--text);font-size:11.5px;border-radius:6px;padding:4px 6px;">
              ${[30,60,120,300].map(s=>`<option value="${s}" ${String(state.stockbitAutoRefreshIntervalSec)===String(s)?'selected':''}>${s<60?s+'d':(s/60)+'m'}</option>`).join("")}
            </select>
          </div>
        </div>
        ${state.stockbitAutoRefresh && (state.selectedForBacktest.size>0 ? state.selectedForBacktest.size : sorted.length) > STOCKBIT_AUTOREFRESH_MAX_TICKERS
          ? `<div class="field" style="flex:0 0 auto;"><label>&nbsp;</label><span style="font-size:11px;color:var(--down);white-space:nowrap;">⚠️ &gt;${STOCKBIT_AUTOREFRESH_MAX_TICKERS} saham lolos filter — auto-refresh dijeda, centang saham tertentu dulu</span></div>`
          : ""}
        ${(state.stockbitQuoteEndpoint||"") === STOCKBIT_DEFAULT_QUOTE_EP
          ? `<div class="field" style="flex:0 0 auto;"><label>&nbsp;</label><span style="font-size:11px;color:var(--gold);white-space:nowrap;" title="Endpoint default diketahui SALAH (API stream/komentar, bukan API harga) — lihat catatan di Pengaturan">⚠️ Endpoint Quote masih default (belum terbukti benar)</span></div>`
          : ""}
        <div class="field" style="flex:0 0 auto;">
          <label>&nbsp;</label>
          <div class="screener-date-action-row" style="display:flex; align-items:center; gap:6px;">
            <input type="date" id="screenerBsFromInput"
              value="${state.bsAutoBulkFrom||""}"
              ${state.stockbitBrokerBulkLoading ? "disabled" : ""}
              style="padding:9.5px 8px; border-radius:8px; border:1px solid var(--border); background:rgba(0,0,0,0.2); color:var(--text); font-size:12px;">
            <span style="color:var(--muted); font-size:11px;">&ndash;</span>
            <input type="date" id="screenerBsToInput"
              value="${state.bsAutoBulkTo||""}"
              ${state.stockbitBrokerBulkLoading ? "disabled" : ""}
              style="padding:9.5px 8px; border-radius:8px; border:1px solid var(--border); background:rgba(0,0,0,0.2); color:var(--text); font-size:12px;">
            <button type="button" class="btn btn-outline" id="screenerBsBulkBtn"
              ${state.stockbitBrokerBulkLoading ? "disabled" : ""}
              style="color:#f87171;border-color:rgba(239,68,68,0.4);white-space:nowrap;"
              title="Tarik data Broker Summary Stockbit ${state.uploadedBulkTickers.length ? `untuk ${state.uploadedBulkTickers.length} ticker dari file yang diupload` : "untuk saham yang dicentang (atau semua hasil filter kalau tidak ada yang dicentang)"}, untuk periode tanggal di samping">
              ${state.stockbitBrokerBulkLoading
                ? `Menarik ${state.stockbitBrokerBulkProgress?.done||0}/${state.stockbitBrokerBulkProgress?.total||0}...`
                : (state.uploadedBulkTickers.length ? `Tarik Data (${state.uploadedBulkTickers.length} dari file)` : (state.selectedForBacktest.size>0 ? `Tarik Data (${state.selectedForBacktest.size} dicentang)` : `Tarik Data (${sorted.length} lolos)`))}
            </button>
          </div>
        </div>
        <div class="field" style="flex:0 0 auto;">
          <label>&nbsp;</label>
          <div class="screener-date-action-row" style="display:flex; align-items:center; gap:6px;">
            <input type="date" id="screenerHdFromInput"
              value="${state.hdAutoBulkFrom||""}"
              ${state.stockbitHistoricalBulkLoading ? "disabled" : ""}
              style="padding:9.5px 8px; border-radius:8px; border:1px solid var(--border); background:rgba(0,0,0,0.2); color:var(--text); font-size:12px;">
            <span style="color:var(--muted); font-size:11px;">&ndash;</span>
            <input type="date" id="screenerHdToInput"
              value="${state.hdAutoBulkTo||""}"
              ${state.stockbitHistoricalBulkLoading ? "disabled" : ""}
              style="padding:9.5px 8px; border-radius:8px; border:1px solid var(--border); background:rgba(0,0,0,0.2); color:var(--text); font-size:12px;">
            <button type="button" class="btn btn-outline" id="screenerHdBulkBtn"
              ${state.stockbitHistoricalBulkLoading ? "disabled" : ""}
              style="color:#a78bfa;border-color:rgba(167,139,250,0.4);white-space:nowrap;"
              title="Tarik Historical Data (Daily) Stockbit ${state.uploadedBulkTickers.length ? `untuk ${state.uploadedBulkTickers.length} ticker dari file yang diupload` : "untuk saham yang dicentang (atau semua hasil filter kalau tidak ada yang dicentang)"}, disaring ke periode tanggal di samping">
              ${state.stockbitHistoricalBulkLoading
                ? `Menarik ${state.stockbitHistoricalBulkProgress?.done||0}/${state.stockbitHistoricalBulkProgress?.total||0}...`
                : (state.uploadedBulkTickers.length ? `📅 Historical (${state.uploadedBulkTickers.length} dari file)` : (state.selectedForBacktest.size>0 ? `📅 Historical (${state.selectedForBacktest.size} dicentang)` : `📅 Historical (${sorted.length} lolos)`))}
            </button>
          </div>
        </div>
      </div>
      ${state.stockbitHistoricalBulkResults && state.stockbitHistoricalBulkResults.length ? `
        <div style="margin:-6px 0 14px;">
          <details class="bs-bulk-results-panel" id="hdBulkResultsPanel" ${state.hdBulkResultsOpen?"open":""}>
            <summary style="cursor:pointer; font-size:11.5px; color:var(--muted); list-style:none; display:flex; align-items:center; gap:6px; user-select:none;">
              <span class="bs-bulk-results-arrow" style="display:inline-block; transition:transform .15s; transform:rotate(${state.hdBulkResultsOpen?90:0}deg);">▶</span>
              Hasil Tarik Historical Data (${state.stockbitHistoricalBulkResults.length} saham)
            </summary>
            <div class="mono" style="margin-top:8px; max-height:220px; overflow-y:auto; font-size:11.5px;">
              ${state.stockbitHistoricalBulkResults.map(r => `
                <div style="padding:4px 0; border-bottom:1px solid var(--border); color:${r.ok ? 'var(--up)' : 'var(--down)'};">
                  ${r.ok ? '✅' : '❌'} ${escapeHtml(r.ticker)} &middot; ${escapeHtml(r.date)} — ${escapeHtml(r.msg||"")}
                </div>`).join("")}
            </div>
          </details>
        </div>` : ""}

      <div class="filter-section">
        <button type="button" class="adv-toggle ${state.showFilterKlasifikasi ? 'open' : ''}" id="filterKlasifikasiToggleBtn">
          <span class="chev">▶</span> Klasifikasi Emiten
        </button>
        <div class="adv-body ${state.showFilterKlasifikasi ? 'open' : ''}">
          <div class="filter-grid">
            ${renderMultiSelect("sektor", "Sektor", getOpts("sektor"))}
            ${renderMultiSelect("syariahLabel", "Syariah", getOpts("syariahLabel"))}
            ${renderMultiSelect("capTier", "Market Cap", ["Mega", "Big", "Mid", "Small", "Micro", "Tidak tersedia"])}
            ${renderMultiSelect("lq45", "LQ45", ["Ya", "Tidak", "Tidak tersedia"])}
          </div>
          <div style="font-size:10.5px;color:var(--muted);margin-top:6px;line-height:1.5;" title="Mega >100T · Big 10–100T · Mid 1–10T · Small 100M–1T · Micro <100M">
            📐 Kategori Cap: Mega &gt;100T · Big 10–100T · Mid 1–10T · Small 100M–1T · Micro &lt;100M (Rp). Kolom "Tidak tersedia" muncul kalau market_cap belum ada di DB — saat itu filter Cap tidak bisa memilah.
          </div>
        </div>
      </div>

      <div class="filter-section">
        <button type="button" class="adv-toggle ${state.showFilterTrend ? 'open' : ''}" id="filterTrendToggleBtn">
          <span class="chev">▶</span> Trend & Sinyal Teknikal
        </button>
        <div class="adv-body ${state.showFilterTrend ? 'open' : ''}">
          <div class="filter-grid">
            ${renderMultiSelect("trendHarga", "Trend Harga (MA)", getOpts("trendHarga"))}
            ${renderMultiSelect("cekMacd", "Sinyal MACD", getOpts("cekMacd"))}
            ${renderMultiSelect("cekHarga", "Sinyal Harga (EMA)", getOpts("cekHarga"))}
            ${renderMultiSelect("cekRsi", "Sinyal RSI", getOpts("cekRsi"))}
            ${renderMultiSelect("statusRsi", "Status RSI", getOpts("statusRsi"))}
            ${renderMultiSelect("polaCandle", "Pola Candle", getOpts("polaCandle"))}
          </div>
        </div>
      </div>

      <div class="filter-section">
        <button type="button" class="adv-toggle ${state.showFilterMomentum ? 'open' : ''}" id="filterMomentumToggleBtn">
          <span class="chev">▶</span> Momentum, Volume & Keyakinan
        </button>
        <div class="adv-body ${state.showFilterMomentum ? 'open' : ''}">
          <div class="filter-grid">
            ${renderMultiSelect("sinyalVolume", "Sinyal Volume", getOpts("sinyalVolume"))}
            ${renderMultiSelect("sinyalFrekuensi", "Sinyal Frekuensi", getOpts("sinyalFrekuensi"))}
            ${renderMultiSelect("keyakinanNaik", "Keyakinan Naik", getOpts("keyakinanNaik"))}
            ${renderMultiSelect("band", "Bandarmologi", getOpts("band"))}
            ${renderMultiSelect("uangGedeMasuk", "Uang Gede Masuk", getOpts("uangGedeMasuk"))}
          </div>
        </div>
      </div>

      <button type="button" class="adv-toggle ${state.showAdvancedFilters ? 'open' : ''}" id="advToggleBtn">
        <span class="chev">▶</span> Filter Lanjutan (Valuasi, BB Squeeze, ATR, CLV, Rentang RSI)
      </button>
      <div class="adv-body ${state.showAdvancedFilters ? 'open' : ''}">
        <div class="filter-section">
          <div class="filter-grid">
            ${renderMultiSelect("valuasi", "Valuasi", getOpts("valuasi"))}
            ${renderMultiSelect("isBBSqueeze", "BB Squeeze", getOpts("isBBSqueeze"))}
            ${renderRangeFilter("bbWidth", "BB Width (%)", {step:"0.01"})}
            ${renderRangeFilter("atr14", "ATR 14", {step:"0.01"})}
            ${renderRangeFilter("clv", "CLV", {step:"0.01"})}
            ${renderRangeFilter("rsi7", "RSI 7", {step:"0.1"})}
            ${renderRangeFilter("rsi21", "RSI 21", {step:"0.1"})}
            ${renderRangeFilter("frequency", "Frekuensi (x transaksi)", {step:"1"})}
            ${renderRangeFilter("marketCap", "Market Cap (Rp)", {step:"1000000000"})}
            ${renderRangeFilter("week52ChangePct", "52W Change (%)", {step:"1"})}
            ${renderRangeFilter("ytdPct", "YTD (%)", {step:"1"})}
          </div>
        </div>
      </div>

      ${renderActiveFilterChips()}

     <div class="toolbar-footer">
        <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
          <span class="count-badge" style="margin:0;">${filtered.length} emiten sesuai filter &middot; ${state.selectedForBacktest.size} dipilih</span>
          <label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer; background:rgba(34,211,238,0.06); border:1px solid rgba(34,211,238,0.3); padding:4px 10px; border-radius:6px; color:var(--teal); font-weight:bold;">
            <input type="checkbox" id="hideGocapChk" class="custom-checkbox" onchange="render()" ${document.getElementById("hideGocapChk")?.checked ? "checked" : ""}>
            🛡️ Sembunyikan Gocap & Suspend
          </label>
        </div>
        <div style="display:flex; gap:12px;">
          ${hasActiveFilters() ? `<button class="btn btn-outline" id="resetFiltersBtn" style="color:#f87171;border-color:rgba(239,68,68,0.3);">Reset Filter</button>` : ""}
          <button class="btn btn-gold-outline" id="saveBacktestBtn">Simpan Pilihan ke Backtest</button>
        </div>
      </div>
      ` : ""}
    </div>

    <div class="col-picker-wrap">
      <button class="btn btn-outline" id="colPickerBtn">🧩 Kolom (${visibleColumns.length}/${SCREENER_COLUMNS.length})</button>
      <div class="col-picker-panel ${state.colPickerOpen ? 'open' : ''}">
        <div class="col-picker-head">
          <span>Pilih kolom yang ditampilkan</span>
          <div style="display:flex;gap:6px;">
            <button class="link-btn" data-col-preset="ringkas">Ringkas</button>
            <button class="link-btn" data-col-preset="semua">Semua</button>
            <button class="link-btn" data-col-preset="kosong">Kosongkan</button>
          </div>
        </div>
        ${["Umum","Harga","Fundamental","Teknikal","Bandarmologi","Analisa"].map(group => {
          const cols = SCREENER_COLUMNS.filter(c=>c.group===group);
          if(!cols.length) return "";
          return `<div class="col-picker-group">
            <div class="col-picker-group-title">${group}</div>
            <div class="col-picker-grid">
              ${cols.map(c=>`<label class="col-picker-item"><input type="checkbox" data-col-toggle="${c.key}" ${state.visibleCols.has(c.key)?'checked':''}> ${c.label}</label>`).join("")}
            </div>
          </div>`;
        }).join("")}
      </div>
    </div>
    
    <div class="panel" style="flex-direction:column;align-items:stretch;">
      ${sectionHeader("table", "📋 Hasil Screener", state.screenerTableOpen)}
      ${state.screenerTableOpen ? `
      <div class="table-wrap">
        <table class="mono">
          <thead><tr>
            <th class="col-freeze" style="width:${FREEZE_W.chk}px;left:${FREEZE_LEFT.chk}px;"><input type="checkbox" id="chkSelectAll" class="custom-checkbox" title="Pilih Semua Hasil Filter" ${allFilteredChecked ? 'checked' : ''}></th>
            <th class="col-freeze" style="width:${FREEZE_W.star}px;left:${FREEZE_LEFT.star}px;">★</th>
            ${th('Ticker', 'ticker', true, 'ticker')}
            ${visibleColumns.map(c => th(c.label, c.key, c.sortable)).join("")}
            <th>Aksi</th>
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>

      <div class="pagination">
        <button class="btn btn-outline" id="prevPage" ${state.page <= 1 ? 'disabled' : ''}>&laquo; Prev</button>
        <span style="font-size:12px;color:var(--text); font-weight: 500;">Halaman <b style="color:var(--gold)">${state.page}</b> dari ${totalPages} (${sorted.length} emiten)</span>
        <button class="btn btn-outline" id="nextPage" ${state.page >= totalPages ? 'disabled' : ''}>Next &raquo;</button>
      </div>
      ` : ""}
    </div>
  `;
}

// ==========================================
// METRIK PERIODE BACKTEST — dipakai kolom "Harga Tertinggi", "Capai P/L"
// dan "Profit / Loss" di tab Backtest.
//
// Sumber data: state.stockbitPriceHistory (daily OHLC dari tabel
// price_history_stockbit, ditarik lewat tombol "📅 Historical" di Screener
// atau tab Historical Data di modal Detail Emiten). Baris yang dihitung
// HANYA yang trade_date-nya >= tanggal entry, jadi harga tertinggi & P/L
// benar-benar mencerminkan periode sejak emiten masuk backtest.
//
// - highPeriod : harga tertinggi (max of high) sejak tanggal entry.
// - maxPL      : P/L maksimum = (highPeriod − entry) / entry × 100 —
//                keuntungan terbaik yang PERNAH bisa dicapai selama
//                memegang saham tersebut (sudah "capai" di suatu hari).
// - endPL      : P/L berdasarkan close TERAKHIR dalam data historical
//                (bukan harga live) — kondisi paling akhir periode.
// - fallbackPrice dipakai kalau ticker sama sekali tidak punya data
//                historical: P/L jatuh ke harga live seperti perilaku lama.
// Kalau entry <= 0 atau tidak ada data, hasilnya null dan UI menampilkan
// "-" (bukan 0) supaya tidak menyesatkan.
// ==========================================
function backtestPeriodMetrics(item, fallbackPrice){
  const entry = Number(item.entryPrice);
  const entryDate = String(item.entryDate || "").slice(0, 10);
  const rows = (state.stockbitPriceHistory?.[String(item.ticker || "").toUpperCase()] || [])
    .filter(r => r.date && (!entryDate || String(r.date).slice(0,10) >= entryDate))
    .sort((a,b) => String(a.date).localeCompare(String(b.date)));
  const highs = rows.map(r => Number(r.high)).filter(Number.isFinite);
  const closes = rows.map(r => Number(r.close)).filter(Number.isFinite);
  const highPeriod = highs.length ? Math.max(...highs) : null;
  const periodEnd = closes.length ? closes[closes.length - 1] : numOrNull(fallbackPrice);
  const maxPL = entry > 0 && highPeriod != null ? ((highPeriod - entry) / entry) * 100 : null;
  const endPL = entry > 0 && periodEnd != null ? ((periodEnd - entry) / entry) * 100 : null;
  return { highPeriod, periodEnd, maxPL, endPL, hasHistory: rows.length > 0 };
}
function plText(value){
  return value == null || !Number.isFinite(value) ? "-" : `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
}

function renderBacktest(){
  const tickerOptions = [...new Set(state.stocks.map(s=>s.ticker))].map(t=>`<option value="${t}">`).join("");
  const sessionOptions = `<option value="">+ Buat sesi baru</option>` +
    state.backtests.map(b=>`<option value="${b.id}">${fmtDateID(b.date)} (${b.items.length} emiten)</option>`).join("");

  const manualForm = `
    <div style="display:flex; justify-content:flex-end; margin-bottom: 16px;">
      <button class="btn btn-primary" id="exportAllBtBtn" style="background:var(--teal-grad); box-shadow:0 4px 12px rgba(6,182,212,0.3); border:none;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right:4px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
        Ekspor Semua Sesi ke Excel
      </button>
    </div>
    <div class="panel" style="flex-direction:column;align-items:stretch;">
      <h3 style="margin:0 0 16px;font-size:14px; font-weight:700;">➕ Tambah Manual ke Backtest</h3>
      <div class="porto-form" style="grid-template-columns:repeat(auto-fill,minmax(180px,1fr));align-items:end;">
        <div class="field"><label>Simpan ke Sesi</label><select id="btManualSession">${sessionOptions}</select></div>
        <div class="field"><label>Ticker</label><input id="btManualTicker" list="btTickerList" placeholder="BBCA" style="text-transform:uppercase;"><datalist id="btTickerList">${tickerOptions}</datalist></div>
        <div class="field"><label>Tanggal Entry</label><input id="btManualDate" type="date" value="${todayLocalISO()}"></div>
        <div class="field"><label>Harga Entry</label><input id="btManualPrice" type="number" placeholder="0"></div>
        <div class="field wide"><label>Keterangan</label><input id="btManualNote" placeholder="Catatan"></div>
        <div class="field"><button class="btn btn-outline" style="border-color:var(--goldDim);color:var(--gold);justify-content:center; padding:10px;" id="btManualAddBtn">+ Tambah</button></div>
      </div>
    </div>`;

  if(state.backtests.length === 0){
    return manualForm + `<div class="empty-box">Belum ada sesi backtest yang disimpan.</div>`;
  }

  const sessions = state.backtests.map(session => {
    let winCount = 0, lossCount = 0, winCountMax = 0, lossCountMax = 0, totalPL = 0, maxPL = -Infinity, minPL = Infinity, validItems = 0;

    const rows = session.items.map(item => {
      const liveData = state.stocks.find(s => s.ticker === item.ticker);
      const currentPrice = liveData ? liveData.cClose : item.entryPrice;
      const period = backtestPeriodMetrics(item, currentPrice);
      const pl = period.endPL ?? (item.entryPrice ? ((currentPrice - item.entryPrice) / item.entryPrice) * 100 : null);
      const periodMaxPL = period.maxPL;
      const plTone = (pl ?? 0) > 0 ? "up" : (pl ?? 0) < 0 ? "down" : "muted";
      const maxTone = (periodMaxPL ?? 0) > 0 ? "up" : (periodMaxPL ?? 0) < 0 ? "down" : "muted";

      if (pl != null) {
        if (pl > 0) winCount++;
        else if (pl < 0) lossCount++;
        totalPL += pl;
        if (pl > maxPL) maxPL = pl;
        if (pl < minPL) minPL = pl;
        validItems++;
      }
      if (periodMaxPL != null) {
        if (periodMaxPL > 0) winCountMax++;
        else if (periodMaxPL < 0) lossCountMax++;
      }

      const tone = plTone;
      const plStr = plText(pl);
      const filterStr = item.filterStr || "-";
      const kriteriaStr = item.kriteria || "-";
      const sumberPill = pillHtml(item.sumber || "Screener", item.sumber === "Manual" ? "gold" : "muted");
      // Tanggal & harga entry di bawah ini SELALU dari item yang sudah
      // tersimpan (terkunci saat pertama kali disimpan — lihat
      // saveToBacktest/addManualBacktest), tidak pernah dihitung ulang
      // dari data live. Hanya "Harga Live", "Harga Tertinggi" & P/L yang
      // ikut data live/historical.
      const tglEntryStr = fmtDateID(item.entryDate);
      const hariSejak = daysSinceEntry(item.entryDate);
      const hariStr = hariSejak === null ? "-" : `${hariSejak}h`;

      return `<tr>
        <td class="ticker-cell"><button class="ticker-link" data-bt-add-porto="${session.id}|${item.ticker}" title="Tambah ${item.ticker} ke Portofolio (harga &amp; tanggal entry otomatis terisi)">${item.ticker}</button> <button type="button" class="link-btn" data-bt-detail="${item.ticker}" title="Buka detail ${item.ticker}">Detail</button></td>
        <td>${sumberPill}</td>
        <td class="mono">${tglEntryStr}</td>
        <td style="white-space:normal; max-width:260px; font-family:'Sora',sans-serif; font-size:12px; line-height:1.6; color:var(--gold); opacity:0.9;">${kriteriaStr}</td>
        <td style="white-space:normal; max-width:320px; font-family:'Sora',sans-serif; font-size:12px; line-height:1.6; color:var(--text); opacity:0.9;">${filterStr}</td>
        <td class="mono" title="Harga entry terkunci sejak disimpan">${fmtNum(item.entryPrice)}</td>
        <td class="mono" title="Harga terakhir di data historical (fallback: harga live)">${fmtNum(currentPrice)}</td>
        <td class="mono" style="color:var(--${tone}); font-weight:700; font-size:14px;" title="P/L berdasarkan harga terakhir periode (close terakhir historical, fallback harga live)">${plStr}</td>
        <td class="mono" title="Harga tertinggi sejak tanggal entry (dari data historical harian)">${fmtNum(period.highPeriod)}</td>
        <td class="mono" style="color:var(--${maxTone}); font-weight:700; font-size:14px;" title="P/L maksimum: (Harga Tertinggi periode − Harga Entry) ÷ Harga Entry">${plText(periodMaxPL)}</td>
        <td class="mono">${hariStr}</td>
        <td><a class="link-btn" href="#/chart/${encodeURIComponent(item.ticker)}" data-chart="${item.ticker}">Chart</a></td>
        <td><button class="link-btn" style="color:#f87171;" data-del-bt-item="${session.id}|${item.ticker}">Hapus</button></td>
      </tr>`;
    }).join("");

    const avgPL = validItems > 0 ? (totalPL / validItems).toFixed(2) : "0.00";
    const winRate = validItems > 0 ? Math.round((winCount / validItems) * 100) : 0;
    const bestPL = maxPL !== -Infinity ? maxPL.toFixed(2) : "0.00";
    const worstPL = minPL !== Infinity ? minPL.toFixed(2) : "0.00";

    const avgTone = avgPL > 0 ? "up" : avgPL < 0 ? "down" : "muted";
    const winTone = winRate >= 50 ? "up" : winRate > 0 ? "gold" : "down";

    const sessionSummary = `
      <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(120px,1fr)); gap:12px; margin-bottom:16px;">
        <div style="background:rgba(0,0,0,0.2); border:1px solid var(--border); border-radius:8px; padding:12px; border-top: 3px solid var(--${winTone});">
          <div style="font-size:10.5px; color:var(--muted); text-transform:uppercase; font-weight:600; margin-bottom:4px;">Win Rate</div>
          <div style="font-size:18px; font-weight:700; font-family:'JetBrains Mono',monospace; color:var(--text);">${winRate}%</div>
          <div style="font-size:11px; margin-top:4px; font-family:'JetBrains Mono',monospace;"><span style="color:var(--up);">${winCount} menang</span> <span style="color:var(--muted);">/</span> <span style="color:var(--down);">${lossCount} kalah</span></div>
        </div>
        <div style="background:rgba(0,0,0,0.2); border:1px solid var(--border); border-radius:8px; padding:12px; border-top: 3px solid var(--${avgTone});">
          <div style="font-size:10.5px; color:var(--muted); text-transform:uppercase; font-weight:600; margin-bottom:4px;">Rata-rata P/L</div>
          <div style="font-size:18px; font-weight:700; font-family:'JetBrains Mono',monospace; color:var(--${avgTone});">${avgPL > 0 ? '+' : ''}${avgPL}%</div>
        </div>
        <div style="background:rgba(0,0,0,0.2); border:1px solid var(--border); border-radius:8px; padding:12px; border-top: 3px solid var(--up);">
          <div style="font-size:10.5px; color:var(--muted); text-transform:uppercase; font-weight:600; margin-bottom:4px;">P/L Tertinggi</div>
          <div style="font-size:18px; font-weight:700; font-family:'JetBrains Mono',monospace; color:var(--up);">${bestPL > 0 ? '+' : ''}${bestPL}%</div>
          <div style="font-size:11px; margin-top:4px; font-family:'JetBrains Mono',monospace;"><span style="color:var(--up);">${winCountMax} menang</span> <span style="color:var(--muted);">/</span> <span style="color:var(--down);">${lossCountMax} kalah</span></div>
        </div>
        <div style="background:rgba(0,0,0,0.2); border:1px solid var(--border); border-radius:8px; padding:12px; border-top: 3px solid var(--down);">
          <div style="font-size:10.5px; color:var(--muted); text-transform:uppercase; font-weight:600; margin-bottom:4px;">P/L Terendah</div>
          <div style="font-size:18px; font-weight:700; font-family:'JetBrains Mono',monospace; color:var(--down);">${worstPL > 0 ? '+' : ''}${worstPL}%</div>
        </div>
      </div>
    `;

    return `
      <div class="panel" style="flex-direction:column; align-items:stretch; margin-bottom: 24px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom: 1px solid var(--border); padding-bottom: 16px; margin-bottom: 16px;">
          <div>
            <h3 style="margin:0; font-size: 15px; font-weight:700;">Waktu Tangkap: ${fmtDateID(session.date)}</h3>
            <div style="font-size: 12px; color: var(--muted); margin-top: 6px; font-weight:500;">${session.items.length} Emiten Disimpan</div>
          </div>
          <div style="display:flex; gap:10px;">
            <button class="btn btn-outline" style="color:#22d3ee; border-color:rgba(6,182,212,0.4);" data-export-bt="${session.id}">Ekspor Excel</button>
            <button class="btn btn-outline" style="color:#f87171; border-color:rgba(239,68,68,0.4);" data-del-bt="${session.id}">Hapus Sesi</button>
          </div>
        </div>
        ${sessionSummary}
        <div class="table-wrap">
          <table class="mono">
            <thead>
              <tr>
                <th>Ticker</th><th>Sumber</th><th>Tanggal Entry</th><th>Kriteria Screener</th><th>Filter / Keterangan</th><th>Harga Entry</th>
                <th title="Harga terakhir di data historical (fallback: harga live)">Harga Live</th><th title="P/L berdasarkan harga terakhir periode">Profit / Loss</th><th title="Harga tertinggi sejak tanggal entry (data historical harian)">Harga Tertinggi</th><th title="P/L maksimum: (Harga Tertinggi − Harga Entry) ÷ Harga Entry">Capai P/L</th><th>Hari</th><th>Aksi</th><th></th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>
    `;
  }).join("");

  return manualForm + sessions;
}

  

// ==========================================
// TAB SEKTORAL — breakdown per sektor (jumlah naik/turun, rata-rata
// %perubahan, breadth) + daftar saham per sektor yang bisa di-expand,
// masing-masing menampilkan %gain/loss dan bisa diklik untuk membuka
// detail emiten (Teknikal/Fundamental/Bandarmologi/Analisa).
// ==========================================
// ==========================================
// TOP MOVERS — 10 Besar Top Gainer / Loser / Value / Volume / Frekuensi
//
// Ditampilkan di bagian atas tab Sektoral supaya kelihatan saham mana yang
// paling aktif/paling bergerak hari ini di seluruh pasar (lintas sektor),
// beda dengan sektor-grid di bawahnya yang dikelompokkan per sektor.
// Data diambil dari enriched() yang sama dipakai Screener/Sektoral, jadi
// selalu sinkron dengan hasil "Refresh Data" terakhir.
// ==========================================
const MOVER_TABS = [
  { key: "gainer",    label: "🚀 Top Gainer",    metricLabel: "%Perubahan" },
  { key: "loser",     label: "🔻 Top Loser",     metricLabel: "%Perubahan" },
  { key: "value",     label: "💰 Top Value",     metricLabel: "Value (Rp)" },
  { key: "volume",    label: "📦 Top Volume",    metricLabel: "Volume (lbr)" },
  { key: "frequency", label: "🔊 Top Frekuensi", metricLabel: "Frekuensi (x)" },
];

function computeTopMovers(){
  const data = enriched();
  const withPrice = data.filter(s => s.cClose != null);

  const byChangeDesc = withPrice.filter(s => s.changePct != null).sort((a,b)=> b.changePct - a.changePct);
  const byChangeAsc  = withPrice.filter(s => s.changePct != null).sort((a,b)=> a.changePct - b.changePct);
  // "Value" = nilai transaksi Rupiah (value_traded kalau ada, fallback ke
  // turnover — dua-duanya representasi nilai transaksi harian di skema DB).
  const byValue = withPrice.filter(s => (s.valueTraded ?? s.turnover ?? 0) > 0)
    .sort((a,b)=> (b.valueTraded ?? b.turnover ?? 0) - (a.valueTraded ?? a.turnover ?? 0));
  const byVolume = withPrice.filter(s => (s.cVol||0) > 0).sort((a,b)=> (b.cVol||0) - (a.cVol||0));
  const byFrequency = withPrice.filter(s => (s.frequency||0) > 0).sort((a,b)=> (b.frequency||0) - (a.frequency||0));

  return {
    gainer: byChangeDesc.slice(0,10),
    loser: byChangeAsc.slice(0,10),
    value: byValue.slice(0,10),
    volume: byVolume.slice(0,10),
    frequency: byFrequency.slice(0,10),
  };
}

function moverMetricValue(s, key){
  if(key === "gainer" || key === "loser") return s.changePct;
  if(key === "value") return s.valueTraded ?? s.turnover ?? null;
  if(key === "volume") return s.cVol ?? null;
  if(key === "frequency") return s.frequency ?? null;
  return null;
}
function moverMetricDisplay(s, key){
  const v = moverMetricValue(s, key);
  if(v === null || v === undefined || isNaN(v)) return "-";
  if(key === "gainer" || key === "loser") return dNum(v, {plusSign:true, decimals:2, suffix:'%'});
  if(key === "value") return "Rp " + fmtCap(v);
  if(key === "volume") return fmtCap(v);
  if(key === "frequency") return fmtNum(Math.round(v)) + "x";
  return fmtNum(v);
}

function renderTopMovers(){
  const movers = computeTopMovers();
  const activeTab = MOVER_TABS.some(t => t.key === state.topMoversTab) ? state.topMoversTab : "gainer";
  const list = movers[activeTab] || [];
  const activeMeta = MOVER_TABS.find(t => t.key === activeTab);
  const metricTone = activeTab === "loser" ? "down" : activeTab === "gainer" ? "up" : "gold";

  const tabsHtml = MOVER_TABS.map(t => `
    <button type="button" class="mover-tab-btn ${activeTab===t.key?'active':''}" data-mover-tab="${t.key}">${t.label}</button>
  `).join("");

  const rows = list.map((s, i) => {
    const changeTone = (s.changePct||0) > 0 ? "up" : (s.changePct||0) < 0 ? "down" : "muted";
    return `
    <div class="mover-row">
      <div class="mover-rank">${i+1}</div>
      <button class="ticker-link mover-ticker" data-detail="${s.ticker}" title="Lihat detail ${s.ticker}">${s.ticker}${s.syariahLabel==="Ya" ? ' <span class="pill pill-teal" style="padding:1px 6px;font-size:9px;vertical-align:middle;">S</span>' : ''}</button>
      <div class="mover-name" title="${escapeHtml(s.name||'-')}">${escapeHtml(s.name||"-")}</div>
      <div class="mover-sektor" title="${escapeHtml(s.sektor||'-')}">${escapeHtml(s.sektor||"-")}</div>
      <div class="mono mover-price">${fmtNum(s.cClose)}</div>
      <div class="mono mover-change" style="color:var(--${changeTone})">${s.changePct!=null?dNum(s.changePct,{plusSign:true,decimals:2,suffix:'%'}):'-'}</div>
      <div class="mono mover-metric" style="color:var(--${metricTone})">${moverMetricDisplay(s, activeTab)}</div>
      <button class="star-btn" data-fav="${s.ticker}" title="${state.watchlist.has(s.ticker)?'Hapus dari watchlist':'Tambah ke watchlist'}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="${state.watchlist.has(s.ticker)?'var(--gold)':'none'}" stroke="${state.watchlist.has(s.ticker)?'var(--gold)':'var(--muted)'}" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      </button>
    </div>`;
  }).join("");

  return `
    <div class="panel" style="flex-direction:column;align-items:stretch;">
      <div class="filter-section-title"><span>🔥 TOP MOVERS — 10 BESAR HARI INI</span><span class="line"></span></div>
      <div class="mover-tabs">${tabsHtml}</div>
      ${list.length ? `
      <div class="mover-list">
        <div class="mover-row mover-row-header">
          <div class="mover-rank">#</div>
          <div>Ticker</div>
          <div>Nama Emiten</div>
          <div>Sektor</div>
          <div>Harga</div>
          <div>%Perubahan</div>
          <div>${activeMeta ? activeMeta.metricLabel : ""}</div>
          <div></div>
        </div>
        ${rows}
      </div>` : `<div class="empty-box" style="padding:20px;">Belum ada data untuk kategori ini.</div>`}
    </div>
  `;
}

function sektorGroups(){
  const data = enriched();
  const q = (state.sektorSearch||"").toLowerCase().trim();
  const groups = {};
  data.forEach(s=>{
    const sek = s.sektor || "Tidak Diketahui";
    if(!groups[sek]) groups[sek] = [];
    groups[sek].push(s);
  });
  return Object.entries(groups).map(([sek, list])=>{
    const withChange = list.filter(s=> s.changePct!=null);
    const avgChange = withChange.length ? withChange.reduce((a,s)=>a+s.changePct,0)/withChange.length : null;
    const gainers = list.filter(s=> (s.changePct||0) > 0).length;
    const losers = list.filter(s=> (s.changePct||0) < 0).length;
    const flat = list.length - gainers - losers;
    const totalTurnover = list.reduce((a,s)=> a + (s.turnover||0), 0);
    const totalMarketCap = list.reduce((a,s)=> a + (s.marketCap||0), 0);

    let sorted = [...list];
    let filteredList = q ? sorted.filter(s=> s.ticker.toLowerCase().includes(q) || String(s.name||"").toLowerCase().includes(q)) : sorted;
    if(state.sektorSort === "changeDesc") filteredList.sort((a,b)=> (b.changePct??-999) - (a.changePct??-999));
    else if(state.sektorSort === "changeAsc") filteredList.sort((a,b)=> (a.changePct??999) - (b.changePct??999));
    else if(state.sektorSort === "turnoverDesc") filteredList.sort((a,b)=> (b.turnover||0) - (a.turnover||0));
    else if(state.sektorSort === "ticker") filteredList.sort((a,b)=> a.ticker.localeCompare(b.ticker));

    const byChange = [...list].sort((a,b)=> (b.changePct??-999) - (a.changePct??-999));
    return {
      sektor: sek, list: filteredList, rawCount: list.length,
      avgChange, gainers, losers, flat, total: list.length,
      totalTurnover, totalMarketCap,
      topGainer: byChange[0] || null, topLoser: byChange[byChange.length-1] || null
    };
  }).filter(g => !q || g.list.length)
    .sort((a,b)=> (b.avgChange ?? -999) - (a.avgChange ?? -999));
}

function renderDashboard(){
  const data = enriched().filter(s => s.ticker);
  if(!data.length) return `<div class="empty-box">Belum ada data saham. Klik "Refresh Data" untuk memuat Market Overview.</div>`;
  const total = data.length;
  const undervalued = data.filter(s => (s.per != null && s.per > 0 && s.per < 10) && (s.roe == null || s.roe >= 15)).length;
  const danger = data.filter(s => (s.baggerScoreTotal||0) < 35 || (s.changePct||0) < -5).length;
  const fair = data.filter(s => (s.per == null || s.per >= 10) && (s.baggerScoreTotal||0) >= 35 && (s.baggerScoreTotal||0) < 75).length;
  const avgScore = data.reduce((a,s)=>a+(Number(s.baggerScoreTotal)||0),0)/total;
  const volume = data.reduce((a,s)=>a+(Number(s.turnover ?? s.valueTraded ?? 0)||0),0);
  const leaders = [...data].sort((a,b)=>(b.baggerScoreTotal||0)-(a.baggerScoreTotal||0)).slice(0,10);
  const gainers = data.filter(s=>(s.changePct||0)>0).length;
  const losers = data.filter(s=>(s.changePct||0)<0).length;
  const breadth = total ? Math.round(gainers/total*100) : 0;
  const top = leaders[0];
  // Kartu metrik jadi tombol — klik membuka modal daftar saham (ala
  // ihsgscreener) sesuai metriknya. Top Candidate langsung buka detail.
  const dashCard = (key, tone, lbl, valHtml, note, extraStyle) => `
    <button type="button" class="summary-card ${tone} dash-card" data-dash-metric="${key}" ${extraStyle?`style="${extraStyle}"`:""} title="Klik untuk lihat detail ${lbl}">
      <div class="summary-lbl">${lbl}</div><div class="summary-val"${extraStyle?` style="${extraStyle}"`:""}>${valHtml}</div><div class="summary-note">${note}</div>
    </button>`;
  return `<div class="dashboard-page">
    <div class="dashboard-hero panel">
      <div><div class="filter-section-title"><span>◈ MARKET OVERVIEW</span><span class="line"></span></div>
      <h2 class="dashboard-title">Peta pasar hari ini</h2><div class="dashboard-subtitle">Snapshot dari ${total} saham dalam universe screener · diperbarui saat Refresh Data</div></div>
      <div class="dashboard-breadth"><div class="dashboard-breadth-label"><span>Market breadth</span><strong>${breadth}% naik</strong></div><div class="breadth-track"><div style="width:${breadth}%"></div></div><div class="dashboard-breadth-foot"><span style="color:var(--up)">▲ ${gainers} naik</span><span style="color:var(--down)">▼ ${losers} turun</span></div></div>
    </div>
    <div class="summary-grid dashboard-summary">
      ${dashCard("total","tone-teal","Total Saham",fmtNum(total),"universe aktif · klik untuk lihat semua")}
      ${dashCard("under","tone-up","Undervalued",fmtNum(undervalued),"PER &lt; 10 · ROE ≥ 15%")}
      ${dashCard("fair","tone-gold","Fair Value",fmtNum(fair),"score 35–74")}
      ${dashCard("danger","tone-down","Danger Zone",fmtNum(danger),"score rendah / turun tajam")}
      ${dashCard("avgscore","","Rata-rata Score",`${avgScore.toFixed(1)}<span style="font-size:12px;color:var(--muted)"> / 100</span>`,"rule-based intelligence")}
      ${dashCard("top","tone-gold","Top Candidate",top?escapeHtml(top.ticker):'-',top?`score ${top.baggerScoreTotal}/100 · klik untuk detail`:'-',"font-size:18px;color:var(--gold)")}
      ${dashCard("value","tone-teal","Total Nilai Transaksi",fmtCap(volume),"estimasi satu sesi · klik untuk peringkat likuiditas","font-size:18px;color:var(--teal)")}
    </div>
    <div class="dashboard-columns">
      <div class="panel"><div class="panel-heading"><h3>IHSG breadth snapshot</h3><span class="pill pill-up">LIVE · EOD</span></div>
        <div class="market-sparkline"><svg viewBox="0 0 620 150" preserveAspectRatio="none" role="img" aria-label="Grafik breadth pasar"><defs><linearGradient id="dashFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#22d3ee" stop-opacity=".35"/><stop offset="1" stop-color="#22d3ee" stop-opacity="0"/></linearGradient></defs><path d="M0 112 L45 104 L90 110 L135 82 L180 91 L225 62 L270 76 L315 52 L360 65 L405 38 L450 55 L495 30 L540 43 L585 22 L620 28 L620 150 L0 150 Z" fill="url(#dashFill)"/><polyline points="0,112 45,104 90,110 135,82 180,91 225,62 270,76 315,52 360,65 405,38 450,55 495,30 540,43 585,22 620,28" fill="none" stroke="#22d3ee" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <div class="dashboard-chart-foot"><span>Sentimen pasar berdasarkan saham aktif</span><strong style="color:var(--teal)">${breadth >= 50 ? 'Risk-on' : 'Risk-off'}</strong></div>
      </div>
      <div class="panel"><div class="panel-heading"><h3>Top candidate</h3><span class="pill pill-gold">AI SCORE</span></div>${leaders.slice(0,5).map((s,i)=>`<div class="mini-leader"><span class="mini-rank">${String(i+1).padStart(2,'0')}</span><button class="ticker-link" data-detail="${escapeHtml(s.ticker)}">${escapeHtml(s.ticker)}</button><span class="mini-name">${escapeHtml(s.name||s.sektor||'-')}</span><strong class="mono" style="color:${s.baggerTone==='up'?'var(--up)':'var(--gold)'}">${s.baggerScoreTotal}</strong></div>`).join('')}</div>
    </div>
    <div class="panel"><div class="panel-heading"><h3>Ultimate Score leaderboard</h3><span class="panel-heading-note">kombinasi fundamental · momentum · smart money</span></div><div class="table-wrap"><table class="data-table dashboard-leaderboard"><thead><tr><th>#</th><th>Saham</th><th>Sektor</th><th>Harga</th><th>Perubahan</th><th>Score</th><th>Tier</th><th></th></tr></thead><tbody>${leaders.map((s,i)=>`<tr><td class="mono">${i+1}</td><td><button class="ticker-link" data-detail="${escapeHtml(s.ticker)}">${escapeHtml(s.ticker)}</button></td><td>${escapeHtml(s.sektor||'-')}</td><td class="mono">${dNum(s.cClose)}</td><td class="mono" style="color:${(s.changePct||0)>=0?'var(--up)':'var(--down)'}">${dNum(s.changePct,{plusSign:true,decimals:2,suffix:'%'})}</td><td class="mono" style="color:var(--gold);font-weight:700">${s.baggerScoreTotal}</td><td>${pillHtml(s.baggerTier||'-',s.baggerTone||'muted')}</td><td><button class="btn btn-outline" data-detail="${escapeHtml(s.ticker)}">Detail</button></td></tr>`).join('')}</tbody></table></div></div>
  </div>`;
}

// ==========================================
// DETAIL KARTU DASHBOARD (ala ihsgscreener) — klik kartu ringkasan →
// modal berisi daftar saham yang memenuhi metrik tsb + filter pencarian,
// sortir kolom, dan tombol "Detail" ke modal Detail Emiten.
// ==========================================
function dashMetricStocks(key){
  const data = enriched().filter(s=>s.ticker);
  switch(key){
    case "total":   return data;
    case "under":   return data.filter(s => (s.per != null && s.per > 0 && s.per < 10) && (s.roe == null || s.roe >= 15));
    case "fair":    return data.filter(s => (s.per == null || s.per >= 10) && (s.baggerScoreTotal||0) >= 35 && (s.baggerScoreTotal||0) < 75);
    case "danger":  return data.filter(s => (s.baggerScoreTotal||0) < 35 || (s.changePct||0) < -5);
    case "value":   return [...data].sort((a,b)=>(Number(b.turnover ?? b.valueTraded ?? 0)||0)-(Number(a.turnover ?? a.valueTraded ?? 0)||0));
    case "avgscore":return [...data].sort((a,b)=>(b.baggerScoreTotal||0)-(a.baggerScoreTotal||0));
    default:        return data;
  }
}
const DASH_METRIC_META = {
  total:    { title:"Semua Saham (Universe Aktif)", desc:"Seluruh saham dalam database screener hari ini." },
  under:    { title:"Undervalued — PER < 10 · ROE ≥ 15%", desc:"Fundamental murah dengan profitabilitas sehat. Bukan rekomendasi beli." },
  fair:     { title:"Fair Value — Skor 35–74", desc:"Valuasi tidak ekstrem & skor komposit menengah. Pantau momentumnya." },
  danger:   { title:"Danger Zone — Skor < 35 / Turun > 5%", desc:"Skor komposit rendah atau jatuh tajam hari ini. Waspada pisau jatuh." },
  avgscore: { title:"Distribusi Skor Komposit", desc:"Rata-rata skor seluruh pasar + peringkat tertinggi. Menunjukkan apakah pasar sedang murah atau mahal secara agregat." },
  value:    { title:"Peringkat Nilai Transaksi (Likuiditas)", desc:"Saham paling likuid hari ini berdasarkan total nilai (turnover). Likuiditas = kemudahan masuk/keluar posisi." }
};
function dashMetricOpen(key){
  state.dashMetricKey = key;
  state.dashMetricSearch = "";
  state.dashMetricSort = { key: key==="value" ? "value" : "score", asc:false };
  render();
}
function dashMetricClose(){
  state.dashMetricKey = null;
  render();
}
function dashMetricToggleSort(key){
  if(state.dashMetricSort.key === key) state.dashMetricSort.asc = !state.dashMetricSort.asc;
  else state.dashMetricSort = { key, asc:true };
  render();
}
function renderDashMetricModal(){
  const key = state.dashMetricKey;
  if(!key) return "";
  const meta = DASH_METRIC_META[key] || { title:key, desc:"" };
  const all = dashMetricStocks(key);
  const q = state.dashMetricSearch.trim().toUpperCase();
  let rows = all.filter(s=>!q || s.ticker.includes(q) || String(s.name||"").toUpperCase().includes(q));
  const dir = state.dashMetricSort.asc ? 1 : -1;
  const sorters = {
    code:  s=>s.ticker, score: s=>s.baggerScoreTotal||0, price: s=>s.cClose,
    chg:   s=>s.changePct, value: s=>Number(s.turnover ?? s.valueTraded ?? 0)||0,
    per: s=>s.per, roe: s=>s.roe
  };
  const sorter = sorters[state.dashMetricSort.key];
  if(sorter) rows = [...rows].sort((a,b)=>{
    const va=sorter(a), vb=sorter(b);
    if(va==null&&vb==null) return 0; if(va==null) return 1; if(vb==null) return -1;
    return typeof va==="string" ? va.localeCompare(vb)*dir : (va-vb)*dir;
  });

  const arrow = k => state.dashMetricSort.key===k ? (state.dashMetricSort.asc?" ▲":" ▼") : "";
  const th = (k,label)=>`<th style="cursor:pointer;user-select:none;" data-dash-sort="${k}">${label}${arrow(k)}</th>`;

  // Statistik tambahan khusus "Rata-rata Score" & "Total Nilai Transaksi"
  let extraHtml = "";
  if(key==="avgscore"){
    const avg = all.length ? all.reduce((a,s)=>a+(Number(s.baggerScoreTotal)||0),0)/all.length : 0;
    const buckets = [0,0,0,0]; // <35, 35-49, 50-74, >=75
    all.forEach(s=>{ const v=Number(s.baggerScoreTotal)||0; if(v>=75) buckets[3]++; else if(v>=50) buckets[2]++; else if(v>=35) buckets[1]++; else buckets[0]++; });
    extraHtml = `
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px;">
        ${[["Skor < 35",buckets[0],"var(--down)"],["35–49",buckets[1],"var(--muted)"],["50–74",buckets[2],"var(--gold)"],["≥ 75",buckets[3],"var(--up)"]].map(([l,v,c])=>`
          <div style="flex:1;min-width:110px;background:rgba(0,0,0,.2);border:1px solid var(--border);border-radius:10px;padding:10px 12px;">
            <div style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;">${l}</div>
            <div style="font-size:20px;font-weight:800;color:${c};font-family:'JetBrains Mono',monospace;">${v}</div>
          </div>`).join("")}
        <div style="flex:1;min-width:110px;background:rgba(0,0,0,.2);border:1px solid var(--border);border-radius:10px;padding:10px 12px;">
          <div style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;">Rata-rata</div>
          <div style="font-size:20px;font-weight:800;font-family:'JetBrains Mono',monospace;">${avg.toFixed(1)}</div>
        </div>
      </div>`;
  } else if(key==="value"){
    const tot = all.reduce((a,s)=>a+(Number(s.turnover ?? s.valueTraded ?? 0)||0),0);
    const top5 = all.slice(0,5).reduce((a,s)=>a+(Number(s.turnover ?? s.valueTraded ?? 0)||0),0);
    extraHtml = `
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px;">
        <div style="flex:1;min-width:140px;background:rgba(0,0,0,.2);border:1px solid var(--border);border-radius:10px;padding:10px 12px;">
          <div style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;">Total Pasar</div>
          <div style="font-size:20px;font-weight:800;color:var(--teal);font-family:'JetBrains Mono',monospace;">${fmtCap(tot)}</div>
        </div>
        <div style="flex:1;min-width:140px;background:rgba(0,0,0,.2);border:1px solid var(--border);border-radius:10px;padding:10px 12px;">
          <div style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;">Konsentrasi Top 5</div>
          <div style="font-size:20px;font-weight:800;font-family:'JetBrains Mono',monospace;">${tot>0?Math.round(top5/tot*100):0}%</div>
        </div>
      </div>`;
  }

  return `
    <div style="margin-bottom:12px;">
      <div style="font-size:16px;font-weight:800;">${escapeHtml(meta.title)}</div>
      <div style="font-size:12px;color:var(--muted);margin-top:2px;">${escapeHtml(meta.desc)}</div>
    </div>
    ${extraHtml}
    <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:10px;">
      <div class="search-wrap" style="flex:1;min-width:200px;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input id="dashMetricSearch" value="${escapeHtml(state.dashMetricSearch)}" placeholder="Cari kode / nama…" />
      </div>
      <span style="font-size:11.5px;color:var(--muted);">${rows.length} saham tampil${q?` (dari ${all.length})`:""}</span>
      <button type="button" class="btn btn-outline" id="dashMetricExportBtn" style="color:#22d3ee;border-color:rgba(6,182,212,0.4);" title="Ekspor daftar ini ke Excel">📊 Ekspor Excel</button>
    </div>
    <div class="table-wrap" style="max-height:55vh;">
      <table class="data-table mono">
        <thead><tr><th>#</th>${th("code","Kode")}<th style="cursor:default;">Sektor</th>${th("price","Harga")}${th("chg","Δ%")}${th("score","Skor")}<th style="cursor:default;">Tier</th>${key==="value"?th("value","Nilai (Rp)"):""}${key==="under"?th("per","PER")+"<th style=\"cursor:default;\">ROE</th>":""}<th style="cursor:default;"></th></tr></thead>
        <tbody>
          ${rows.slice(0,300).map((s,i)=>`
            <tr>
              <td>${i+1}</td>
              <td class="ticker-cell"><button class="ticker-link" data-dash-detail="${escapeHtml(s.ticker)}">${escapeHtml(s.ticker)}</button></td>
              <td style="white-space:normal;max-width:150px;font-family:'Sora',sans-serif;">${escapeHtml(s.sektor||"-")}</td>
              <td>${fmtNum(s.cClose)}</td>
              <td style="font-weight:700;color:${(s.changePct||0)>=0?'var(--up)':'var(--down)'};">${s.changePct!=null?(s.changePct>=0?"+":"")+s.changePct.toFixed(2)+"%":"-"}</td>
              <td style="color:var(--gold);font-weight:700;">${s.baggerScoreTotal||"-"}</td>
              <td>${pillHtml(s.baggerTier||"-", s.baggerTone||"muted")}</td>
              ${key==="value"?`<td>${fmtCap(Number(s.turnover ?? s.valueTraded ?? 0)||0)}</td>`:""}
              ${key==="under"?`<td>${s.per!=null?s.per.toFixed(1)+"x":"-"}</td><td>${s.roe!=null?s.roe.toFixed(1)+"%":"-"}</td>`:""}
              <td><button type="button" class="link-btn" data-dash-detail="${escapeHtml(s.ticker)}">Detail</button></td>
            </tr>`).join("") || `<tr><td colspan="10"><div class="empty-box">Tidak ada saham yang cocok.</div></td></tr>`}
        </tbody>
      </table>
    </div>
    ${rows.length>300?`<div style="font-size:11px;color:var(--muted);margin-top:8px;">Menampilkan 300 teratas dari ${rows.length} — persempit pencarian untuk melihat lainnya, atau ekspor ke Excel.</div>`:""}
  `;
}

// ==========================================================================
// BROKER STALKER v2 — helper: agregasi baris mentah broker_summary jadi
// satu baris per entitas (per broker kalau mode "stock", per saham kalau
// mode "broker") + deret net harian gabungan (untuk grafik akumulasi).
// Dipanggil SEKALI tiap kali searchBrokerStalker() berhasil fetch; hasilnya
// (brokerStalkerRawRows) disimpan lalu Urutkan/Filter/cari di bawah cukup
// dihitung ulang dari sini secara instan (brokerStalkerFilteredSorted()),
// TANPA fetch ulang ke Supabase.
// ==========================================================================
function computeBrokerStalkerAggregation(rawRows, mode){
  const grouped = {};
  const dailyMap = {};
  (rawRows||[]).forEach(r=>{
    const key = mode==='stock' ? r.broker_code : r.stock_code;
    if(!key) return;
    const g = grouped[key] || (grouped[key] = { code:key, stock_code:r.stock_code, broker_code:r.broker_code, buyLot:0, sellLot:0, buyValue:0, sellValue:0 });
    const lot = Number(r.lot)||0, val = Number(r.value_idr)||0;
    const isBuy = String(r.side).toLowerCase()==='buy';
    if(isBuy){ g.buyLot+=lot; g.buyValue+=val; } else { g.sellLot+=lot; g.sellValue+=val; }
    if(r.trade_date){
      const dd = dailyMap[r.trade_date] || (dailyMap[r.trade_date] = { date:r.trade_date, net:0 });
      dd.net += isBuy ? val : -val;
    }
  });
  const rows = Object.values(grouped).map(g=>{
    const net = g.buyValue - g.sellValue;
    return {
      ...g,
      net,
      volTotal: g.buyLot + g.sellLot,
      avgBuy: g.buyLot>0 ? g.buyValue/(g.buyLot*100) : null,
      avgSell: g.sellLot>0 ? g.sellValue/(g.sellLot*100) : null,
      type: mode==='stock' ? epsBrokerType(g.broker_code) : null,
      name: mode==='stock' ? brokerFullName(g.broker_code) : (enriched().find(s=>s.ticker===g.stock_code)?.name || g.stock_code || '-'),
      status: net>=0 ? 'AKUMULASI' : 'DISTRIBUSI'
    };
  });
  const dailyNet = Object.values(dailyMap).sort((a,b)=> a.date<b.date?-1:(a.date>b.date?1:0));
  return { rows, dailyNet };
}

// Urutkan (Net/Buy/Sell/Vol) + Filter (Asing/Lokal, mode Lacak Saham saja) +
// cari di dalam hasil — semua dihitung dari brokerStalkerRawRows, dipanggil
// tiap kali salah satu kontrol itu berubah (lihat attachContentEvents()).
function brokerStalkerFilteredSorted(){
  let rows = (state.brokerStalkerRawRows||[]).slice();
  const modeStock = state.brokerStalkerMode === 'stock';
  if(modeStock && state.brokerStalkerFilterType){
    rows = rows.filter(r=>r.type===state.brokerStalkerFilterType);
  }
  const q = String(state.brokerStalkerResultSearch||'').trim().toUpperCase();
  if(q){
    rows = rows.filter(r=> String(r.code||'').toUpperCase().includes(q) || String(r.name||'').toUpperCase().includes(q));
  }
  const sortKey = state.brokerStalkerSort;
  rows.sort((a,b)=>{
    if(sortKey==='buy') return b.buyValue - a.buyValue;
    if(sortKey==='sell') return b.sellValue - a.sellValue;
    if(sortKey==='vol') return b.volTotal - a.volTotal;
    return b.net - a.net; // default: "net"
  });
  return rows;
}
function applyBrokerStalkerView(){ state.brokerStalkerRows = brokerStalkerFilteredSorted(); render(); }

// Ringkasan "BROKER AKTIF" (kartu Broker/Net Buy Agg/Net Sell Agg/Dominan +
// bar Akumulasi vs Distribusi) — dihitung dari daftar yang SEDANG tampil
// (state.brokerStalkerRows, setelah filter/cari), bukan dari raw, supaya
// kartu ikut berubah kalau Filter Asing/Lokal atau pencarian diubah.
function brokerStalkerSummary(rows){
  let netBuyAgg=0, netSellAgg=0;
  (rows||[]).forEach(r=>{ if(r.net>=0) netBuyAgg+=r.net; else netSellAgg += -r.net; });
  const total = netBuyAgg+netSellAgg;
  const akumulasiPct = total>0 ? Math.round(netBuyAgg/total*100) : 50;
  return {
    brokerCount:(rows||[]).length, netBuyAgg, netSellAgg,
    akumulasiPct, distribusiPct: 100-akumulasiPct,
    dominant: netBuyAgg>=netSellAgg ? 'AKUMULASI' : 'DISTRIBUSI'
  };
}

// Grafik batang sederhana (bukan library chart) untuk toggle "Tampilkan
// Grafik Akumulasi Broker" — satu batang per hari bursa dalam
// brokerStalkerDailyNet (net GABUNGAN semua broker/saham hari itu), hijau
// kalau net beli, merah kalau net jual, tinggi proporsional ke net
// terbesar (absolut) dalam periode yang sedang dilihat.
function renderBrokerStalkerChartHtml(dailyNet){
  if(!dailyNet || dailyNet.length < 2) return '<div class="empty-box" style="margin:8px 0 14px;">Perlu lebih dari 1 hari data untuk grafik akumulasi — coba periode 1W/1M/3M/Range.</div>';
  const maxAbs = Math.max(1, ...dailyNet.map(d=>Math.abs(d.net)));
  const bars = dailyNet.map(d=>{
    const pct = Math.max(4, Math.round(Math.abs(d.net)/maxAbs*100));
    const color = d.net>=0 ? 'var(--up)' : 'var(--down)';
    return `<div class="bs2-chart-bar" title="${fmtDateID(d.date)}: ${fmtRp(d.net)}"><div class="bs2-chart-bar-fill" style="height:${pct}%;background:${color};"></div></div>`;
  }).join('');
  return `<div class="bs2-chart">${bars}</div>`;
}

function renderBrokerStalker(){
  const modeStock = state.brokerStalkerMode === 'stock';
  const rows = state.brokerStalkerRows || [];
  const period = state.brokerStalkerPeriod;
  const rangeOpen = period === 'range';
  const summary = brokerStalkerSummary(rows);
  const dateLabel = (state.brokerStalkerDateFrom && state.brokerStalkerDateTo)
    ? (state.brokerStalkerDateFrom === state.brokerStalkerDateTo ? fmtDateID(state.brokerStalkerDateFrom) : `${fmtDateID(state.brokerStalkerDateFrom)} s/d ${fmtDateID(state.brokerStalkerDateTo)}`)
    : '';
  const periodChips = [["today","Today"],["1w","1W"],["1m","1M"],["3m","3M"]];
  const hasResults = !state.brokerStalkerLoading && (state.brokerStalkerRawRows||[]).length > 0;

  return `<div class="panel broker-stalker-page">
    <style>
      .broker-stalker-page .bs2-tabs{display:flex;gap:8px;margin:10px 0 16px;}
      .broker-stalker-page .bs2-tab{padding:8px 16px;border-radius:8px;border:1px solid var(--border);background:transparent;color:var(--muted);font-weight:700;font-size:12px;cursor:pointer;letter-spacing:.03em;}
      .broker-stalker-page .bs2-tab.active{background:linear-gradient(90deg,#7c5cff,#5b8cff);border-color:transparent;color:#fff;}
      .broker-stalker-page .bs2-card{background:rgba(255,255,255,0.02);border:1px solid var(--border);border-radius:12px;padding:16px;margin-bottom:16px;}
      .broker-stalker-page .bs2-card-title{display:flex;align-items:center;gap:8px;font-weight:800;letter-spacing:.03em;font-size:13px;margin-bottom:14px;}
      .broker-stalker-page .bs2-label{font-size:11px;color:var(--muted);font-weight:700;letter-spacing:.04em;display:block;margin-bottom:6px;}
      .broker-stalker-page .bs2-input-big{width:100%;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:8px;padding:12px 14px;color:var(--text);font-weight:800;font-size:15px;letter-spacing:.03em;text-transform:uppercase;box-sizing:border-box;}
      .broker-stalker-page .bs2-row{display:flex;gap:24px;flex-wrap:wrap;margin-top:16px;}
      .broker-stalker-page .bs2-chipset{display:flex;gap:6px;flex-wrap:wrap;}
      .broker-stalker-page .bs2-chip{padding:6px 12px;border-radius:6px;border:1px solid var(--border);background:transparent;color:var(--muted);font-size:11px;font-weight:700;cursor:pointer;}
      .broker-stalker-page .bs2-chip.active{background:#7c5cff;border-color:#7c5cff;color:#fff;}
      .broker-stalker-page .bs2-range{display:flex;gap:8px;align-items:center;margin-top:8px;}
      .broker-stalker-page .bs2-range input{background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:6px;padding:6px 8px;color:var(--text);font-size:12px;}
      .broker-stalker-page .bs2-select{background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:6px;padding:8px 10px;color:var(--muted);font-size:12px;}
      .broker-stalker-page .bs2-cta{margin-top:18px;width:100%;padding:14px;border:none;border-radius:8px;background:linear-gradient(90deg,#22d3ee,#34d399);color:#04211c;font-weight:800;font-size:13px;letter-spacing:.05em;cursor:pointer;}
      .broker-stalker-page .bs2-cta:disabled{opacity:.6;cursor:wait;}
      .broker-stalker-page .bs2-head{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;}
      .broker-stalker-page .bs2-results-search{background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:6px;padding:6px 10px;color:var(--text);font-size:12px;width:160px;}
      .broker-stalker-page .bs2-summary-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:14px 0;}
      .broker-stalker-page .bs2-summary-card{border:1px solid var(--border);border-radius:8px;padding:10px 12px;text-align:center;}
      .broker-stalker-page .bs2-summary-card .lab{font-size:10px;color:var(--muted);font-weight:700;letter-spacing:.04em;}
      .broker-stalker-page .bs2-summary-card .val{font-size:18px;font-weight:800;margin-top:4px;}
      .broker-stalker-page .bs2-domsplit{display:flex;align-items:center;gap:8px;margin:12px 0 2px;font-size:10px;color:var(--muted);}
      .broker-stalker-page .bs2-domsplit-bar{flex:1;height:8px;border-radius:4px;overflow:hidden;display:flex;background:var(--border);}
      .broker-stalker-page .bs2-chart-toggle{width:100%;text-align:center;padding:8px;border-radius:6px;border:1px solid var(--border);background:transparent;color:var(--teal);font-size:11px;font-weight:700;cursor:pointer;margin:10px 0;}
      .broker-stalker-page .bs2-chart{display:flex;align-items:flex-end;gap:3px;height:90px;margin:6px 0 16px;}
      .broker-stalker-page .bs2-chart-bar{flex:1;height:100%;display:flex;align-items:flex-end;background:rgba(255,255,255,0.03);border-radius:2px;}
      .broker-stalker-page .bs2-chart-bar-fill{width:100%;border-radius:2px;}
      .broker-stalker-page .bs2-broker-row{display:flex;align-items:center;gap:12px;padding:12px 4px;border-bottom:1px solid var(--border);}
      .broker-stalker-page .bs2-broker-row:last-child{border-bottom:none;}
      .broker-stalker-page .bs2-broker-rank{width:18px;color:var(--muted);font-size:12px;font-weight:700;}
      .broker-stalker-page .bs2-broker-code{width:64px;flex-shrink:0;}
      .broker-stalker-page .bs2-broker-code .code{font-size:16px;font-weight:800;display:block;}
      .broker-stalker-page .bs2-broker-mid{flex:1;min-width:0;}
      .broker-stalker-page .bs2-broker-name{font-weight:700;font-size:13px;margin-bottom:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
      .broker-stalker-page .bs2-mini-bar-row{display:flex;align-items:center;gap:6px;font-size:10px;color:var(--muted);margin-bottom:3px;}
      .broker-stalker-page .bs2-mini-bar{flex:1;max-width:140px;height:5px;border-radius:3px;background:var(--border);overflow:hidden;}
      .broker-stalker-page .bs2-mini-bar-fill{height:100%;}
      .broker-stalker-page .bs2-broker-right{text-align:right;min-width:90px;flex-shrink:0;}
      .broker-stalker-page .bs2-broker-net{font-weight:800;font-size:15px;}
      .broker-stalker-page .bs2-broker-avg{font-size:10px;color:var(--muted);margin-top:4px;line-height:1.5;}
    </style>
    <div class="filter-section-title"><span>🛰️ BROKER STALKER</span><span class="line"></span></div>
    <div class="dashboard-subtitle">Lacak aliran akumulasi dan distribusi dari data Broker Summary.</div>

    <div class="bs2-tabs">
      <button class="bs2-tab ${!modeStock?'active':''}" data-bs-mode="broker">◎ Lacak Broker</button>
      <button class="bs2-tab ${modeStock?'active':''}" data-bs-mode="stock">◆ Lacak Saham</button>
    </div>

    <div class="bs2-card">
      <div class="bs2-card-title"><span>${modeStock?'LACAK SAHAM':'LACAK BROKER'}</span><span class="pill pill-teal" style="font-size:9px;">BROKER SCAN</span></div>
      <label class="bs2-label">${modeStock?'KODE SAHAM':'KODE BROKER'}</label>
      <input class="bs2-input-big" id="stalkerQuery" value="${escapeHtml(state.brokerStalkerQuery)}" placeholder="${modeStock?'Mis. BBCA':'Mis. AK'}" maxlength="12">

      <div class="bs2-row">
        <div>
          <label class="bs2-label">PERIODE</label>
          <div class="bs2-chipset">
            ${periodChips.map(([val,lab])=>`<button class="bs2-chip ${period===val?'active':''}" data-bs-period="${val}">${lab}</button>`).join('')}
            <button class="bs2-chip ${period==='range'?'active':''}" data-bs-period="range">Range</button>
          </div>
          ${rangeOpen?`<div class="bs2-range"><input type="date" id="stalkerRangeFrom" value="${escapeHtml(state.brokerStalkerRangeFrom)}"><span style="color:var(--muted)">–</span><input type="date" id="stalkerRangeTo" value="${escapeHtml(state.brokerStalkerRangeTo)}"></div>`:''}
        </div>
        <div>
          <label class="bs2-label">MARKET</label>
          <select class="bs2-select" disabled title="Broker Summary yang tersimpan belum memisahkan papan RG/TN/NG — cuma agregat Reguler yang tersedia saat ini">
            <option>Regular (RG)</option>
          </select>
        </div>
        <div>
          <label class="bs2-label">URUTKAN</label>
          <div class="bs2-chipset">
            <button class="bs2-chip ${state.brokerStalkerSort==='net'?'active':''}" data-bs-sort="net">Net</button>
            <button class="bs2-chip ${state.brokerStalkerSort==='buy'?'active':''}" data-bs-sort="buy">Buy</button>
            <button class="bs2-chip ${state.brokerStalkerSort==='sell'?'active':''}" data-bs-sort="sell">Sell</button>
            <button class="bs2-chip ${state.brokerStalkerSort==='vol'?'active':''}" data-bs-sort="vol">Vol</button>
          </div>
        </div>
        ${modeStock?`<div>
          <label class="bs2-label">FILTER</label>
          <div class="bs2-chipset">
            <button class="bs2-chip ${state.brokerStalkerFilterType==='asing'?'active':''}" data-bs-filtertype="asing">Asing</button>
            <button class="bs2-chip ${state.brokerStalkerFilterType==='lokal'?'active':''}" data-bs-filtertype="lokal">Lokal</button>
          </div>
        </div>`:''}
      </div>

      <button class="bs2-cta" id="stalkerSearchBtn" ${state.brokerStalkerLoading?'disabled':''}>${state.brokerStalkerLoading?'Memuat…':`◆ ${modeStock?'LACAK SAHAM':'LACAK BROKER'}`}</button>
    </div>

    ${state.brokerStalkerLoading ? '<div class="empty-box">Memuat data broker…</div>' : (state.brokerStalkerMsg && !hasResults ? `<div class="empty-box">${escapeHtml(state.brokerStalkerMsg)}</div>` : '')}

    ${hasResults ? `
      <div class="bs2-card">
        <div class="bs2-head">
          <div class="bs2-card-title" style="margin-bottom:0;"><span>BROKER AKTIF — ${escapeHtml(state.brokerStalkerQuery)}</span></div>
          <input class="bs2-results-search" id="stalkerResultSearch" placeholder="Cari broker..." value="${escapeHtml(state.brokerStalkerResultSearch)}">
        </div>
        <div style="font-size:10px;color:var(--muted);margin:2px 0 12px;">${escapeHtml(state.brokerStalkerQuery)} · ${dateLabel} · RG</div>

        <div class="bs2-summary-grid">
          <div class="bs2-summary-card"><div class="lab">BROKER</div><div class="val">${summary.brokerCount}</div></div>
          <div class="bs2-summary-card"><div class="lab">NET BUY AGG</div><div class="val" style="color:var(--up)">${fmtCap(summary.netBuyAgg)}</div></div>
          <div class="bs2-summary-card"><div class="lab">NET SELL AGG</div><div class="val" style="color:var(--down)">${fmtCap(summary.netSellAgg)}</div></div>
          <div class="bs2-summary-card"><div class="lab">DOMINAN</div><div class="val">${pillHtml(summary.dominant, summary.dominant==='AKUMULASI'?'up':'down')}</div></div>
        </div>

        <div class="bs2-domsplit">
          <span>${summary.akumulasiPct}%</span>
          <div class="bs2-domsplit-bar"><div style="width:${summary.akumulasiPct}%;background:var(--up);"></div><div style="width:${summary.distribusiPct}%;background:var(--down);"></div></div>
          <span>${summary.distribusiPct}%</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:9px;color:var(--muted);margin-bottom:6px;"><span>◂ AKUMULASI</span><span>DISTRIBUSI ▸</span></div>

        <button class="bs2-chart-toggle" id="stalkerChartToggle">${state.brokerStalkerChartOpen?'▲ Sembunyikan':'▾ Tampilkan'} Grafik Akumulasi Broker</button>
        ${state.brokerStalkerChartOpen ? renderBrokerStalkerChartHtml(state.brokerStalkerDailyNet) : ''}

        ${rows.length ? rows.map((r,i)=>{
          const buyPct = r.volTotal>0 ? Math.round(r.buyLot/r.volTotal*100) : 0;
          const sellPct = 100-buyPct;
          const codeBlock = modeStock
            ? `<span class="code">${escapeHtml(r.code)}</span>`
            : `<button class="ticker-link code" data-detail="${escapeHtml(r.code)}" style="font-size:16px;font-weight:800;">${escapeHtml(r.code)}</button>`;
          return `<div class="bs2-broker-row">
            <div class="bs2-broker-rank">${i+1}</div>
            <div class="bs2-broker-code">
              ${codeBlock}
              ${modeStock?`<span class="pill ${r.type==='asing'?'pill-teal':'pill-muted'}" style="font-size:9px;">${r.type==='asing'?'ASING':'LOKAL'}</span>`:''}
            </div>
            <div class="bs2-broker-mid">
              <div class="bs2-broker-name" title="${escapeHtml(r.name||'-')}">${escapeHtml(r.name||'-')}</div>
              <div class="bs2-mini-bar-row"><span style="width:10px;color:var(--up)">B</span><div class="bs2-mini-bar"><div class="bs2-mini-bar-fill" style="width:${buyPct}%;background:var(--up);"></div></div><span class="mono">${fmtCap(r.buyValue)}</span></div>
              <div class="bs2-mini-bar-row"><span style="width:10px;color:var(--down)">S</span><div class="bs2-mini-bar"><div class="bs2-mini-bar-fill" style="width:${sellPct}%;background:var(--down);"></div></div><span class="mono">${fmtCap(r.sellValue)}</span></div>
            </div>
            <div class="bs2-broker-right">
              <div class="bs2-broker-net" style="color:${r.net>=0?'var(--up)':'var(--down)'}">${fmtRp(r.net)}</div>
              <div class="bs2-broker-avg">${r.avgBuy!=null?fmtNum(Math.round(r.avgBuy)):'-'} AVG BUY<br>${r.avgSell!=null?fmtNum(Math.round(r.avgSell)):'-'} AVG SELL</div>
            </div>
          </div>`;
        }).join('') : `<div class="empty-box">Tidak ada broker yang cocok dengan filter/pencarian saat ini.</div>`}
      </div>
    ` : ''}
  </div>`;
}

// Resolusi rentang tanggal query berdasarkan Periode yang dipilih:
// - "today": tarik histori terbaru (limit besar), lalu di searchBrokerStalker()
//   difilter ke SATU tanggal trade_date terbaru yang ketemu (sama seperti
//   perilaku lama, supaya tetap benar walau data hari ini belum lengkap).
// - "1w"/"1m"/"3m": gte tanggal N hari kalender ke belakang dari sekarang
//   (pola sama seperti loadTargetWindow()) — tanpa batas atas, jadi otomatis
//   ikut data terbaru yang tersedia.
// - "range": gte Dari + lte Sampai (dua filter trade_date via
//   URLSearchParams.append, pola sama seperti loadDetailBrokerSummaryRange()).
async function searchBrokerStalker(){
  const q = String(state.brokerStalkerQuery||'').trim().toUpperCase();
  if(!q || !SUPABASE_URL || !SUPABASE_KEY){
    state.brokerStalkerMsg = 'Isi pencarian dan pastikan koneksi Supabase tersedia.';
    state.brokerStalkerRawRows=[]; state.brokerStalkerRows=[]; render(); return;
  }
  if(state.brokerStalkerPeriod === 'range' && (!state.brokerStalkerRangeFrom || !state.brokerStalkerRangeTo)){
    state.brokerStalkerMsg = 'Isi tanggal "Dari" dan "Sampai" dulu untuk mode Range.';
    state.brokerStalkerRawRows=[]; state.brokerStalkerRows=[]; render(); return;
  }
  state.brokerStalkerLoading=true; state.brokerStalkerMsg=''; render();
  try{
    const field = state.brokerStalkerMode==='stock' ? 'stock_code' : 'broker_code';
    const qs = new URLSearchParams();
    qs.append(field, `eq.${q}`);
    qs.append('select', 'stock_code,trade_date,side,broker_code,lot,value_idr,investor_type');
    const todayMode = state.brokerStalkerPeriod === 'today';
    if(todayMode){
      qs.append('order', 'trade_date.desc');
      qs.append('limit', '8000');
    } else if(state.brokerStalkerPeriod === 'range'){
      qs.append('trade_date', `gte.${state.brokerStalkerRangeFrom}`);
      qs.append('trade_date', `lte.${state.brokerStalkerRangeTo}`);
      qs.append('order', 'trade_date.asc');
    } else {
      const daysBack = state.brokerStalkerPeriod==='1w' ? 7 : state.brokerStalkerPeriod==='1m' ? 30 : 90;
      const cutoff = new Date(); cutoff.setDate(cutoff.getDate()-daysBack);
      qs.append('trade_date', `gte.${toLocalISODate(cutoff)}`);
      qs.append('order', 'trade_date.asc');
    }
    const res = await fetch(`${SUPABASE_URL}/broker_summary?${qs}`,{headers:getSupaHeaders(),cache:'no-store'});
    let raw = await res.json(); if(!res.ok || !Array.isArray(raw)) throw new Error(raw?.message||`HTTP ${res.status}`);

    if(todayMode && raw.length){
      const latest = raw.reduce((m,r)=>!m||r.trade_date>m?r.trade_date:m,null);
      raw = raw.filter(r=>r.trade_date===latest);
    }

    if(!raw.length){
      state.brokerStalkerRawRows=[]; state.brokerStalkerDailyNet=[];
      state.brokerStalkerDateFrom=null; state.brokerStalkerDateTo=null;
      state.brokerStalkerMsg='Tidak ada data broker untuk pencarian/periode ini.';
    } else {
      const dates = raw.map(r=>r.trade_date).sort();
      state.brokerStalkerDateFrom = dates[0];
      state.brokerStalkerDateTo = dates[dates.length-1];
      state.brokerStalkerDate = state.brokerStalkerDateTo;
      const { rows, dailyNet } = computeBrokerStalkerAggregation(raw, state.brokerStalkerMode);
      state.brokerStalkerRawRows = rows;
      state.brokerStalkerDailyNet = dailyNet;
    }
  }catch(e){
    state.brokerStalkerRawRows=[];
    state.brokerStalkerMsg='Gagal memuat broker summary: '+e.message;
  }
  state.brokerStalkerLoading=false;
  applyBrokerStalkerView(); // sekaligus menghitung brokerStalkerRows (filter/urut default) + render()
}

function renderSektoral(){
  const data = enriched();
  if(!data.length){
    return `<div class="empty-box">Belum ada data saham. Klik "Refresh Data" atau atur koneksi Supabase lewat "⚙️ Pengaturan".</div>`;
  }
  const groups = sektorGroups();

  const withChange = data.filter(s=>s.changePct!=null);
  const overallAvg = withChange.length ? withChange.reduce((a,s)=>a+s.changePct,0)/withChange.length : null;
  const overallGainers = data.filter(s=>(s.changePct||0)>0).length;
  const overallLosers = data.filter(s=>(s.changePct||0)<0).length;
  const overallFlat = data.length - overallGainers - overallLosers;
  const bestSektor = groups.length ? groups[0] : null;
  const worstSektor = groups.length ? groups[groups.length-1] : null;

  return `
    <div class="panel">
      <div class="filter-section-title"><span>📊 RINGKASAN PASAR PER SEKTOR</span><span class="line"></span></div>
      <div class="summary-grid">
        <div class="summary-card tone-up">
          <div class="summary-lbl">Saham Naik</div>
          <div class="summary-val" style="color:var(--up)">▲ ${overallGainers}</div>
        </div>
        <div class="summary-card tone-down">
          <div class="summary-lbl">Saham Turun</div>
          <div class="summary-val" style="color:var(--down)">▼ ${overallLosers}</div>
        </div>
        <div class="summary-card">
          <div class="summary-lbl">Stagnan</div>
          <div class="summary-val">${overallFlat}</div>
        </div>
        <div class="summary-card tone-gold">
          <div class="summary-lbl">Rata-rata Perubahan</div>
          <div class="summary-val" style="color:${overallAvg!=null && overallAvg>=0?'var(--up)':'var(--down)'}">${overallAvg!=null?dNum(overallAvg,{plusSign:true,decimals:2,suffix:'%'}):'-'}</div>
        </div>
        <div class="summary-card">
          <div class="summary-lbl">Sektor Terkuat</div>
          <div class="summary-val" style="font-size:15px;color:var(--up);">${bestSektor ? escapeHtml(bestSektor.sektor) : '-'}</div>
        </div>
        <div class="summary-card">
          <div class="summary-lbl">Sektor Terlemah</div>
          <div class="summary-val" style="font-size:15px;color:var(--down);">${worstSektor ? escapeHtml(worstSektor.sektor) : '-'}</div>
        </div>
      </div>

      <div class="filter-toolbar" style="margin-bottom:0;padding-bottom:0;border-bottom:none;">
        <div class="field">
          <label>Cari Saham dalam Sektor</label>
          <div class="search-wrap">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" id="sektorSearchInput" placeholder="Ticker / nama emiten..." value="${escapeHtml(state.sektorSearch)}" style="width:220px;">
          </div>
        </div>
        <div class="field">
          <label>Urutkan Saham</label>
          <select id="sektorSortSelect" style="background:rgba(0,0,0,0.2);border:1px solid var(--border);color:var(--text);padding:10px 12px;border-radius:8px;font-size:12.5px;">
            <option value="changeDesc" ${state.sektorSort==='changeDesc'?'selected':''}>%Perubahan: Tertinggi</option>
            <option value="changeAsc" ${state.sektorSort==='changeAsc'?'selected':''}>%Perubahan: Terendah</option>
            <option value="turnoverDesc" ${state.sektorSort==='turnoverDesc'?'selected':''}>Turnover Terbesar</option>
            <option value="ticker" ${state.sektorSort==='ticker'?'selected':''}>Ticker (A-Z)</option>
          </select>
        </div>
      </div>
    </div>

    ${renderTopMovers()}

    <div class="sektor-grid">
      ${groups.map(g=> renderSektorCard(g)).join("")}
    </div>
  `;
}

function renderSektorCard(g){
  const isOpen = state.sektorExpanded.has(g.sektor);
  const breadthPct = g.total ? Math.round((g.gainers/g.total)*100) : 0;
  const avgTone = g.avgChange==null ? "muted" : g.avgChange>0 ? "up" : g.avgChange<0 ? "down" : "gold";
  return `
    <div class="sektor-card ${isOpen?'open':''}">
      <div class="sektor-card-head" data-sektor-toggle="${escapeHtml(g.sektor)}">
        <div class="sektor-card-title">
          <div class="sektor-name">${escapeHtml(g.sektor)}</div>
          <div class="sektor-meta">${g.total} emiten · Turnover Rp ${fmtCap(g.totalTurnover)} · Cap Rp ${fmtCap(g.totalMarketCap)}</div>
        </div>
        <div class="sektor-card-mid">
          <div class="sektor-avg-change mono" style="color:var(--${avgTone})">${g.avgChange!=null?dNum(g.avgChange,{plusSign:true,decimals:2,suffix:'%'}):'-'}</div>
          <div class="sektor-breadth-bar"><div class="sektor-breadth-fill" style="width:${breadthPct}%"></div></div>
          <div class="sektor-breadth-lbl"><span style="color:var(--up)">▲${g.gainers}</span> <span style="color:var(--down)">▼${g.losers}</span> <span style="color:var(--muted)">•${g.flat}</span></div>
        </div>
        <div class="sektor-card-extremes">
          ${g.topGainer ? `<div title="Top Gainer">🏆 ${escapeHtml(g.topGainer.ticker)} <span style="color:var(--up)">${g.topGainer.changePct!=null?dNum(g.topGainer.changePct,{plusSign:true,decimals:2,suffix:'%'}):'-'}</span></div>` : ""}
          ${g.topLoser ? `<div title="Top Loser">🔻 ${escapeHtml(g.topLoser.ticker)} <span style="color:var(--down)">${g.topLoser.changePct!=null?dNum(g.topLoser.changePct,{plusSign:true,decimals:2,suffix:'%'}):'-'}</span></div>` : ""}
        </div>
        <button class="sektor-expand-btn" type="button" title="${isOpen?'Tutup':'Lihat semua saham'}">${isOpen?'▲':'▼'}</button>
      </div>
      ${isOpen ? `
      <div class="sektor-card-body">
        ${g.list.length ? `
        <div class="sektor-stock-row sektor-stock-header">
          <div></div>
          <div>Ticker</div>
          <div>Nama Emiten</div>
          <div>Harga</div>
          <div>%Gain/Loss</div>
        </div>
        <div class="sektor-stock-list">
          ${g.list.map(s=> renderSektorStockRow(s)).join("")}
        </div>` : `<div class="empty-box" style="padding:20px;">Tidak ada saham yang cocok dengan pencarian.</div>`}
      </div>` : ``}
    </div>
  `;
}

function renderSektorStockRow(s){
  const tone = (s.changePct||0) > 0 ? "up" : (s.changePct||0) < 0 ? "down" : "muted";
  const barPct = Math.min(100, Math.abs(s.changePct||0) / 10 * 100); // skala visual thd 10%
  return `
    <div class="sektor-stock-row">
      <button class="star-btn" data-fav="${s.ticker}" title="${state.watchlist.has(s.ticker)?'Hapus dari watchlist':'Tambah ke watchlist'}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="${state.watchlist.has(s.ticker)?'var(--gold)':'none'}" stroke="${state.watchlist.has(s.ticker)?'var(--gold)':'var(--muted)'}" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      </button>
      <button class="ticker-link sektor-stock-ticker" data-detail="${s.ticker}" title="Lihat detail ${s.ticker}">${s.ticker}${s.syariahLabel==="Ya" ? ' <span class="pill pill-teal" style="padding:1px 6px;font-size:9px;vertical-align:middle;">S</span>' : ''}</button>
      <div class="sektor-stock-name" title="${escapeHtml(s.name||'-')}">${escapeHtml(s.name||"-")}</div>
      <div class="sektor-stock-price mono">${dNum(s.cClose)}</div>
      <div class="sektor-stock-change-wrap">
        <div class="sektor-change-bar-track"><div class="sektor-change-bar-fill tone-${tone}" style="width:${barPct}%"></div></div>
        <span class="mono sektor-stock-change" style="color:var(--${tone})">${s.changePct!=null?dNum(s.changePct,{plusSign:true,decimals:2,suffix:'%'}):'-'}</span>
      </div>
    </div>
  `;
}

function getWatchlistMeta(){
  try{ return JSON.parse(localStorage.getItem("ihsg_watchlist_meta")||"{}")||{}; }catch(e){ return {}; }
}

function wlStatusBadge(s, plPct){
  if(plPct!=null){
    if(plPct<=-7) return pillHtml("DANGER","down");
    if(plPct<=-3) return pillHtml("WATCH","gold");
  }
  if(s.cekMacd && s.cekMacd.toLowerCase().includes("sell")) return pillHtml("OV","down");
  if((s.baggerScoreTotal||0)>=75) return pillHtml("FAIR","up");
  if((s.baggerScoreTotal||0)<35) return pillHtml("DANGER","down");
  return pillHtml("FAIR","teal");
}

function renderWatchlist(){
  const rows = enriched().filter(s=>state.watchlist.has(s.ticker));
  if(rows.length===0) return `<div class="empty-box">Belum ada saham di watchlist. Klik ikon ★ di tab Screener untuk menambahkan — harga entry otomatis dicatat untuk pelacakan P&L.</div>`;
  const meta = getWatchlistMeta();
  let totEntry=0, totNow=0;
  const cards = rows.map(s=>{
    const m = meta[s.ticker]||{};
    const entry = Number(m.entry);
    const hasEntry = isFinite(entry) && entry>0;
    const plPct = hasEntry && s.cClose ? ((s.cClose-entry)/entry)*100 : null;
    if(hasEntry && s.cClose){ totEntry+=entry; totNow+=s.cClose; }
    const plTone = plPct==null?'muted':plPct>=0?'up':'down';
    return `
    <div class="wl-card">
      <div class="wl-card-top">
        <button class="ticker-link ticker-cell" data-detail="${s.ticker}" title="Lihat detail ${s.ticker}">${s.ticker}</button>
        ${wlStatusBadge(s,plPct)}
        <button class="star-btn" data-fav="${s.ticker}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--gold)" stroke="var(--gold)" stroke-width="2" style="filter: drop-shadow(0 0 4px rgba(245,158,11,0.6));"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </button>
      </div>
      <div class="wl-price mono">${fmtNum(s.cClose)}</div>
      ${hasEntry?`<div class="wl-pl mono" style="color:var(--${plTone})">
        <span>Entry ${fmtNum(entry)} <span style="color:var(--muted);font-size:10px;">· ${m.date?fmtDateID(m.date):'-'}</span></span>
        <strong>${plPct!=null?dNum(plPct,{plusSign:true,decimals:2,suffix:'%'}):'-'}</strong>
      </div>`:`<div class="wl-pl" style="color:var(--muted)"><span>Belum ada harga entry</span><span style="font-size:10px;">hapus & tambah ulang ★ untuk mencatat</span></div>`}
      <div class="wl-pills">
        ${pillHtml(s.cekMacd, s.cekMacd.includes("Buy")?"up":"muted")}
        ${pillHtml(s.band.label, s.band.tone)}
      </div>
      <div class="mono" style="font-size:11.5px;color:var(--muted);display:grid;grid-template-columns:1fr 1fr;gap:6px 12px;margin-bottom:16px;">
        <span>RSI7/21: <span style="color:var(--text); font-weight:600;">${s.rsi7}/${s.rsi21}</span></span>
        <span>EMA21 H/L: <span style="color:var(--text); font-weight:600;">${fmtNum(s.ema21H)}/${fmtNum(s.ema21L)}</span></span>
        <span style="color:#f87171;">Support: <span style="color:var(--text); font-weight:600;">${fmtNum(s.support)}</span></span>
        <span style="color:#34d399;">Resisten: <span style="color:var(--text); font-weight:600;">${fmtNum(s.resistance)}</span></span>
        <span>Fib 50%: <span style="color:var(--text); font-weight:600;">${fmtNum(s.fib?.f50)}</span></span>
        <span>Fib 61.8%: <span style="color:var(--text); font-weight:600;">${fmtNum(s.fib?.f618)}</span></span>
      </div>
      <a class="btn btn-outline" style="width: 100%; justify-content:center; color: var(--teal); border-color: rgba(6,182,212,0.3);" href="#/chart/${encodeURIComponent(s.ticker)}" data-chart="${s.ticker}">Lihat grafik →</a>
    </div>
  `;}).join("");
  const totPl = totEntry>0 ? ((totNow-totEntry)/totEntry)*100 : null;
  const header = rows.some(s=>{const e=Number((meta[s.ticker]||{}).entry); return isFinite(e)&&e>0;}) ? `
    <div class="panel wl-portfolio-header"><div><div class="summary-lbl">Total P&L belum terealisasi (equal-weight)</div><div class="summary-val mono" style="color:${totPl!=null&&totPl>=0?'var(--up)':'var(--down)'}">${totPl!=null?dNum(totPl,{plusSign:true,decimals:2,suffix:'%'}):'-'}</div></div><div style="text-align:right"><div class="summary-lbl">Jumlah saham</div><div class="summary-val">${rows.length}</div></div></div>` : "";
  return header+`<div class="wl-grid">${cards}</div>`;
}

function renderPortoFormFields(){
  const editing = state.portoEditId ? state.portfolio.find(p => String(p.id) === String(state.portoEditId)) : null;
  const prefill = !editing && state.portoPrefill ? state.portoPrefill : null;
  const f = editing || {
    ticker: prefill?.ticker || "", tglBeli: prefill?.tglBeli || "", hargaBeli: prefill?.hargaBeli || "", lotBeli: "", feeBeliPct: 0.15,
    support:"", resistance:"", fib618:"", targetTP:"", cutLoss:"",
    tglJual:"", hargaJual:"", lotJual:"", feeJualPct:0.25, catatan: prefill ? `Dari Backtest — harga entry terkunci ${fmtNum(prefill.hargaBeli)} @ ${fmtDateID(prefill.tglBeli)}` : ""
  };
  const c = editing ? hitungPorto({
    hargaBeli:+f.hargaBeli||0, lotBeli:+f.lotBeli||0, feeBeliPct:+f.feeBeliPct||0,
    hargaJual:+f.hargaJual||0, lotJual:+f.lotJual||0, feeJualPct:+f.feeJualPct||0,
    tglBeli:f.tglBeli, tglJual:f.tglJual
  }) : { totalBeli:"", netJual:"", jangkaWaktu:"", persenPL:"", nilaiPL:"", status:"Open" };

  const tickerOptions = [...new Set(state.stocks.map(s=>s.ticker))].map(t=>`<option value="${t}">`).join("");

  document.getElementById("portoModalTitle") && (document.getElementById("portoModalTitle").textContent = editing ? "✏️ Edit Transaksi Portofolio" : "➕ Tambah Transaksi Portofolio");

  // Kalkulator Averaging (Hanya muncul saat Mode Edit Portofolio)
  const avgCalcHtml = editing ? `
    <div style="grid-column: 1/-1; background: rgba(34,211,238,0.05); border: 1px dashed rgba(34,211,238,0.4); border-radius: 10px; padding: 16px; margin-top: 12px;">
      <div style="font-size: 13px; font-weight: 700; color: var(--teal); margin-bottom: 8px;">⚖️ Kalkulator Averaging (Simulasi)</div>
      <div style="font-size: 11px; color: var(--muted); margin-bottom: 12px;">Masukkan skenario pembelian baru untuk melihat perubahan harga rata-rata Anda.</div>
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
          <div class="field" style="flex:1;"><label>Harga Beli Baru</label><input type="number" id="avgNewPrice" placeholder="Misal: 1200" oninput="calcAveraging(${f.hargaBeli}, ${f.lotBeli})"></div>
          <div class="field" style="flex:1;"><label>Lot Beli Baru</label><input type="number" id="avgNewLot" placeholder="Misal: 50" oninput="calcAveraging(${f.hargaBeli}, ${f.lotBeli})"></div>
      </div>
      <div id="avgResult" style="margin-top: 14px; font-size: 14px; font-weight: bold; color: var(--gold);">Harga Rata-rata Baru: -</div>
    </div>
  ` : '';

  return `
      <div class="porto-form">
        <div class="field"><label>Nama Emiten *</label><input id="pfTicker" list="pfTickerList" value="${f.ticker}" placeholder="BBCA" style="text-transform:uppercase;"><datalist id="pfTickerList">${tickerOptions}</datalist></div>
        <div class="field"><label>Tanggal Beli *</label><input id="pfTglBeli" type="date" value="${f.tglBeli||""}"></div>
        <div class="field"><label>Harga Beli *</label><input id="pfHargaBeli" type="number" value="${f.hargaBeli||""}"></div>
        <div class="field"><label>Jumlah Lot Beli *</label><input id="pfLotBeli" type="number" value="${f.lotBeli||""}"></div>
        <div class="field"><label>Fee Beli (%)</label><input id="pfFeeBeli" type="number" step="0.01" value="${f.feeBeliPct??0.15}"></div>
        <div class="field"><label>Total Beli (Rp)</label><input id="pfTotalBeli" readonly value="${c.totalBeli?fmtNum(c.totalBeli):""}"></div>
        <div class="field"><label>Harga Support</label><input id="pfSupport" type="number" value="${f.support||""}"></div>
        <div class="field"><label>Harga Resistance</label><input id="pfResistance" type="number" value="${f.resistance||""}"></div>
        <div class="field"><label>Fibo 61.8%</label><input id="pfFib618" type="number" value="${f.fib618||""}"></div>
        <div class="field"><label>Target TP</label><input id="pfTargetTP" type="number" value="${f.targetTP||""}"></div>
        <div class="field"><label>Cut Loss</label><input id="pfCutLoss" type="number" value="${f.cutLoss||""}"></div>
        <div class="field"><label>Tanggal Jual</label><input id="pfTglJual" type="date" value="${f.tglJual||""}"></div>
        <div class="field"><label>Harga Jual</label><input id="pfHargaJual" type="number" value="${f.hargaJual||""}"></div>
        <div class="field"><label>Jumlah Lot Jual</label><input id="pfLotJual" type="number" value="${f.lotJual||""}"></div>
        <div class="field"><label>Fee Jual (%)</label><input id="pfFeeJual" type="number" step="0.01" value="${f.feeJualPct??0.25}"></div>
        <div class="field"><label>Net Jual (Rp)</label><input id="pfNetJual" readonly value="${c.netJual?fmtNum(c.netJual):""}"></div>
        <div class="field"><label>Jangka Waktu</label><input id="pfJangka" readonly value="${c.jangkaWaktu!==""?c.jangkaWaktu+" hari":""}"></div>
        <div class="field"><label>Prosentase P/L</label><input id="pfPersenPL" readonly value="${c.persenPL!==""?((c.persenPL>0?'+':'')+c.persenPL+'%'):""}"></div>
        <div class="field"><label>Nilai P/L (Rp)</label><input id="pfNilaiPL" readonly value="${c.nilaiPL!==""?fmtNum(c.nilaiPL):""}"></div>
        <div class="field"><label>Status</label><input id="pfStatus" readonly value="${c.status}" class="${c.status==='Win'?'status-win':c.status==='Loss'?'status-loss':'status-open'}" style="font-weight:700;"></div>
        <div class="field wide" style="grid-column:1/-1;"><label>Catatan</label><textarea id="pfCatatan" rows="2">${f.catatan||""}</textarea></div>
        ${avgCalcHtml}
      </div>
      <div style="display:flex;gap:12px;margin-top:24px;">
        <button class="btn btn-primary" id="pfSubmitBtn" style="border-radius:8px; padding: 12px; font-size: 14px;">${editing?"Update Transaksi":"Simpan Transaksi"}</button>
        <button class="btn btn-outline" id="pfCancelBtn" style="border-radius:8px; padding: 12px; font-size: 14px;">Batal</button>
      </div>`;
}

function renderPortfolioStrategyStats() {
    const closed = state.portfolio.filter(p => p.nilaiPL !== "" && p.nilaiPL !== undefined && p.nilaiPL !== null);
    if(closed.length === 0) return '';
    const strategyStats = {};
    closed.forEach(p => {
        let strat = "Manual / Umum";
        if (p.catatan && p.catatan.includes("Dari Backtest")) strat = "Hasil Screener/Backtest";
        if (!strategyStats[strat]) strategyStats[strat] = { wins: 0, total: 0 };
        strategyStats[strat].total++;
        if (p.status === "Win") strategyStats[strat].wins++;
    });
    const rows = Object.keys(strategyStats).map(key => {
        const s = strategyStats[key];
        const rate = (s.wins / s.total) * 100;
        const tone = rate >= 50 ? "up" : "down";
        return `
        <div style="display:flex; justify-content:space-between; font-size:12px; border-bottom:1px dashed var(--border); padding:8px 0;">
            <span style="color:var(--text);">${escapeHtml(key)}</span>
            <span style="color:var(--${tone}); font-weight:bold;">${rate.toFixed(0)}% <span style="font-size:10px;color:var(--muted)">(${s.wins}/${s.total})</span></span>
        </div>`;
    }).join("");
    return `
    <div class="porto-stat" style="grid-column: 1 / -1; margin-top: 10px;">
        <div class="lbl">📊 Win Rate Berdasarkan Strategi / Tipe Entry</div>
        <div style="margin-top:8px;">${rows}</div>
    </div>`;
}

function renderPortfolio(){
  const closed = state.portfolio.filter(p => p.nilaiPL !== "" && p.nilaiPL !== undefined && p.nilaiPL !== null);
  const totalInvest = state.portfolio.reduce((a,p)=>a+(+p.totalBeli||0),0);
  const totalPL = closed.reduce((a,p)=>a+(+p.nilaiPL||0),0);
  const winCount = closed.filter(p=>p.status==="Win").length;
  const winRate = closed.length ? Math.round((winCount/closed.length)*100) : 0;

  const topBar = `
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:20px;">
      <button class="btn btn-primary" id="pfOpenAddBtn">+ Tambah Transaksi Portofolio</button>
      ${state.selectedPorto.size > 0 ? `<button class="btn btn-outline" style="color:#f87171;border-color:rgba(239,68,68,0.4);" id="pfBulkDeleteBtn">🗑 Hapus ${state.selectedPorto.size} Terpilih</button>` : ""}
    </div>`;

  const summary = `
    <div class="porto-summary">
      <div class="porto-stat"><div class="lbl">Total Transaksi</div><div class="val">${state.portfolio.length}</div></div>
      <div class="porto-stat"><div class="lbl">Total Modal Dibeli</div><div class="val">${fmtNum(totalInvest)}</div></div>
      <div class="porto-stat"><div class="lbl">Total P/L Realisasi</div><div class="val" style="color:${totalPL>=0?'var(--up)':'var(--down)'}">${totalPL>=0?'+':''}${fmtNum(totalPL)}</div></div>
      <div class="porto-stat"><div class="lbl">Win Rate</div><div class="val">${winRate}% <span style="font-size:12px;color:var(--muted); font-weight:500;">(${winCount}/${closed.length})</span></div></div>
      ${renderPortfolioStrategyStats()}
    </div>`;

  if(state.portfolio.length === 0){
    return topBar + summary + `<div class="empty-box">Belum ada transaksi portofolio. Klik "+ Tambah Transaksi Portofolio" untuk mulai mencatat.</div>`;
  }

  const allChecked = state.portfolio.length > 0 && state.portfolio.every(p => state.selectedPorto.has(String(p.id)));

  const rows = state.portfolio.map(p => {
    const statusClass = p.status==="Win" ? "status-win" : p.status==="Loss" ? "status-loss" : "status-open";
    const plStr = p.persenPL!=="" && p.persenPL!=null ? (p.persenPL>0?'+':'')+p.persenPL+'%' : "-";
    return `<tr>
      <td><input type="checkbox" class="custom-checkbox chk-porto-row" data-check-porto="${p.id}" ${state.selectedPorto.has(String(p.id))?'checked':''}></td>
      <td class="ticker-cell"><button class="ticker-link" data-detail="${p.ticker}" title="Lihat detail ${p.ticker}">${p.ticker}</button></td>
      <td class="mono">${p.tglBeli||"-"}</td>
      <td class="mono">${fmtNum(p.hargaBeli)}</td>
      <td class="mono">${p.lotBeli}</td>
      <td class="mono">${fmtNum(p.totalBeli)}</td>
      <td class="mono">${p.tglJual||"-"}</td>
      <td class="mono">${p.hargaJual?fmtNum(p.hargaJual):"-"}</td>
      <td class="mono">${fmtNum(p.netJual)||"-"}</td>
      <td class="mono">${p.jangkaWaktu!==""&&p.jangkaWaktu!=null?p.jangkaWaktu+" hari":"-"}</td>
      <td class="mono" style="color:var(--${p.nilaiPL>0?'up':p.nilaiPL<0?'down':'muted'});font-weight:700;">${plStr}</td>
      <td class="mono">${p.nilaiPL!==""&&p.nilaiPL!=null?fmtNum(p.nilaiPL):"-"}</td>
      <td class="${statusClass}" style="font-weight:700;">${p.status}</td>
      <td style="white-space:normal;max-width:200px;font-size:12px;color:var(--muted);">${p.catatan||"-"}</td>
      <td><button class="link-btn" data-edit-porto="${p.id}">Edit</button></td>
      <td><button class="link-btn" style="color:#f87171;" data-del-porto="${p.id}">Hapus</button></td>
    </tr>`;
  }).join("");

  const table = `
    <div class="table-wrap">
      <table class="mono">
        <thead><tr>
          <th style="width:30px;"><input type="checkbox" id="chkSelectAllPorto" class="custom-checkbox" title="Pilih Semua" ${allChecked ? 'checked' : ''}></th>
          <th>Ticker</th><th>Tgl Beli</th><th>Hrg Beli</th><th>Lot Beli</th><th>Total Beli</th>
          <th>Tgl Jual</th><th>Hrg Jual</th><th>Net Jual</th><th>Jangka</th><th>%P/L</th><th>Nilai P/L</th>
          <th>Status</th><th>Catatan</th><th></th><th></th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;

  return topBar + summary + table;
}

function tvSymbol(ticker){ return `IDX:${ticker}`; }
function tvEmbedUrl(ticker){
  const sym = encodeURIComponent(tvSymbol(ticker));
  return `https://s.tradingview.com/widgetembed/?symbol=${sym}&interval=D&hidesidetoolbar=0&hidetoptoolbar=0&symboledit=1&saveimage=1&toolbarbg=1e293b&studies=%5B%5D&theme=dark&style=1&timezone=Asia%2FJakarta&locale=id&withdateranges=1&hideideas=1`;
}
function tvChartPageUrl(ticker){ return `https://www.tradingview.com/chart/?symbol=${encodeURIComponent(tvSymbol(ticker))}`; }
function stockbitUrl(ticker){ return `https://stockbit.com/symbol/${encodeURIComponent(ticker)}`; }

function renderTickerPicker(){
  const list = enriched();
  const q = (state.chartSearch||"").trim().toUpperCase();
  const tickerOptions = list.map(s=>`<option value="${s.ticker}">`).join("");
  let candidates, hint;
  if(q){
    candidates = list.filter(s=>s.ticker.includes(q)).slice(0,24);
    hint = candidates.length===0
      ? `<div class="hint-text" style="color:var(--muted); font-size:12px;">Tidak ada ticker yang cocok dengan "${state.chartSearch}".</div>`
      : `<div class="hint-text" style="color:var(--teal); font-size:12px;">Menampilkan ${candidates.length} hasil pencarian untuk "${state.chartSearch}".</div>`;
  } else if(state.watchlist.size>0){
    candidates = list.filter(s=>state.watchlist.has(s.ticker));
    hint = `<div class="hint-text" style="color:var(--gold); font-size:12px;">Menampilkan ticker dari Watchlist ⭐. Ketik di kotak pencarian untuk mencari emiten lain.</div>`;
  } else {
    candidates = [];
    hint = `<div class="hint-text" style="color:var(--muted); font-size:12px;">Ketik kode ticker (mis. BBCA) di kotak pencarian di atas untuk menampilkan chart.</div>`;
  }
  const chips = candidates.map(s=>`<a class="chip ${state.selectedTicker===s.ticker?'active':''}" href="#/chart/${encodeURIComponent(s.ticker)}" data-chart="${s.ticker}">${s.ticker}</a>`).join("");
  return `
    <div class="field" style="margin-bottom:16px;max-width:300px;">
      <label>Cari &amp; Pilih Ticker</label>
      <div class="search-wrap">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input id="chartSearchInput" value="${state.chartSearch||""}" placeholder="Ketik BBCA..." list="chartTickerList" style="width:100%;max-width:240px;">
      </div>
      <datalist id="chartTickerList">${tickerOptions}</datalist>
    </div>
    <div class="ticker-chips">${chips}</div>
    ${hint}`;
}

function renderChart(){
  const picker = renderTickerPicker();
  if(!state.selectedTicker){
    return `${picker}<div class="empty-box" style="margin-top: 24px;">Cari &amp; pilih ticker di atas untuk menampilkan grafik.</div>`;
  }
  const t = state.selectedTicker;
  const series = state.chartSeries || {};
  const toggle = (key, label, color) => `<label class="chart-toggle"><input type="checkbox" data-chart-series="${key}" ${series[key]!==false?'checked':''}><span class="chart-swatch" style="background:${color}"></span>${label}</label>`;
  const chartToolbar = `
    <div class="chart-toolbar" style="margin-top: 24px;">
      <span style="color:var(--muted);font-size:13px; font-weight:500;">Chart <b class="mono" style="color:var(--text); font-size:15px;">${t}</b> (dihitung &amp; digambar langsung dari data <code>flows</code>)</span>
      <div class="chart-external-links">
        <a class="btn btn-outline btn-tradingview" href="${tvChartPageUrl(t)}" target="_blank" rel="noopener">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          TradingView
        </a>
        <a class="btn btn-outline btn-stockbit" href="${stockbitUrl(t)}" target="_blank" rel="noopener">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          Stockbit
        </a>
      </div>
    </div>`;

  // Toolbar interaktif ala TradingView: rentang waktu + toggle tiap seri.
  // State-nya disimpan di state.chartRange / state.chartSeries supaya nilai
  // dan checkbox tetap konsisten saat seluruh tab dirender ulang.
  const ranges = [['1m','1B'],['3m','3B'],['6m','6B'],['1y','1T'],['all','Semua']];
  const controls = `<div class="chart-controls">
    <div class="chart-control-group">
      <span class="chart-control-label">Rentang</span>
      ${ranges.map(([v,l])=>`<button class="chart-range-btn ${state.chartRange===v?'active':''}" data-chart-range="${v}">${l}</button>`).join('')}
    </div>
    <div class="chart-control-group chart-series-group">
      <span class="chart-control-label">Overlay Harga</span>
      ${toggle('close','Close','var(--gold)')}
      ${toggle('support','Support','var(--down)')}
      ${toggle('resistance','Resisten','var(--up)')}
      ${toggle('fib','Fibonacci','#94a3b8')}
      ${toggle('bb','Bollinger Bands','#c084fc')}
      ${toggle('emaHL','EMA21 High/Low','#2dd4bf')}
      ${toggle('ema89','EMA89 Close','#f472b6')}
      ${toggle('sar','SAR (0.02,0.02,0.2)','#ef4444')}
      ${toggle('supertrend','SuperTrend (10,3)','#a855f7')}
      ${toggle('pc','Price Channel (20)','#e879f9')}
    </div>
    <div class="chart-control-group chart-series-group">
      <span class="chart-control-label">Panel Bawah</span>
      ${toggle('bandar','Bandar Volume','#22c55e')}
      ${toggle('vol','Volume 20','rgba(148,163,184,.8)')}
      ${toggle('stochrsi','Stoch RSI (14,14,3,3)','#ef4444')}
      ${toggle('rsi721','RSI 7 &amp; 21','#22c55e')}
      ${toggle('foreignflow','Foreign Flow','#60a5fa')}
      ${toggle('macd','MACD (12,26,9)','#60a5fa')}
      ${toggle('netforeign','Net Foreign Buy/Sell','#22c55e')}
    </div>
  </div>`;

  const chartBoxInner = state.chartLoading
    ? `<div class="empty-box" style="height:100%;display:flex;align-items:center;justify-content:center;">Memuat histori harga...</div>`
    : (!state.chartData.length
        ? `<div class="empty-box" style="height:100%;display:flex;align-items:center;justify-content:center;">Belum ada histori harga untuk ${t} di tabel <code>flows</code> — jalankan <code>sync-flow.mjs</code> dulu.</div>`
        : `<div class="chart-svg-wrap"><svg id="chartSvg" width="100%" height="100%" style="display:block" preserveAspectRatio="none"></svg><div id="chartTooltip" class="chart-tooltip"></div></div>`);

  return `${picker}
    ${chartToolbar}
    <div class="chart-section-title">Chart &amp; Indikator (dihitung dari harga close/OHLC asli tabel flows)</div>
    ${controls}
    <div class="chart-box chart-box-expanded">${chartBoxInner}</div>`;
}

function chartSMA(values, period){ return values.map((_,i)=>i+1<period?null:values.slice(i+1-period,i+1).reduce((a,b)=>a+b,0)/period); }
function chartEMA(values, period){ const out=[]; const k=2/(period+1); values.forEach((v,i)=>out.push(i===0?v:(v*k+out[i-1]*(1-k)))); return out; }
function chartStd(values, period, i, mean){ if(i+1<period)return null; const a=values.slice(i+1-period,i+1), m=mean??a.reduce((x,y)=>x+y,0)/period; return Math.sqrt(a.reduce((x,y)=>x+(y-m)**2,0)/period); }
function chartRSI(values, period=14){ const out=values.map(()=>null); let gains=0,losses=0; for(let i=1;i<values.length;i++){const d=values[i]-values[i-1]; if(i<=period){gains+=Math.max(d,0);losses+=Math.max(-d,0);if(i===period)out[i]=losses===0?100:100-100/(1+gains/losses);} else {gains=(gains*(period-1)+Math.max(d,0))/period;losses=(losses*(period-1)+Math.max(-d,0))/period;out[i]=losses===0?100:100-100/(1+gains/losses);}} return out; }
function chartHighest(values, period, i){ if(i+1<period)return null; const a=values.slice(i+1-period,i+1).filter(v=>v!=null); return a.length?Math.max(...a):null; }
function chartLowest(values, period, i){ if(i+1<period)return null; const a=values.slice(i+1-period,i+1).filter(v=>v!=null); return a.length?Math.min(...a):null; }
// ATR Wilder (dipakai SuperTrend) -- true range dihaluskan dengan rumus
// smoothing Wilder yang sama dengan RSI di atas (bukan SMA biasa).
function chartATR(highs, lows, closes, period=10){
  const tr = closes.map((c,i)=> i===0 ? (highs[i]-lows[i]) : Math.max(highs[i]-lows[i], Math.abs(highs[i]-closes[i-1]), Math.abs(lows[i]-closes[i-1])));
  const out = tr.map(()=>null); let sum=0;
  for(let i=0;i<tr.length;i++){
    if(i<period-1){ sum+=tr[i]; continue; }
    if(i===period-1){ sum+=tr[i]; out[i]=sum/period; continue; }
    out[i] = (out[i-1]*(period-1)+tr[i])/period;
  }
  return out;
}
// SuperTrend standar (period, multiplier) -- garis tunggal yang berpindah
// posisi (di bawah harga saat uptrend, di atas saat downtrend), plus arah
// (+1 uptrend / -1 downtrend) supaya bisa diwarnai sesuai TradingView.
function chartSuperTrend(highs, lows, closes, period=10, mult=3){
  const atr = chartATR(highs, lows, closes, period);
  const hl2 = highs.map((h,i)=>(h+lows[i])/2);
  const upperBasic = hl2.map((v,i)=> atr[i]==null?null:v+mult*atr[i]);
  const lowerBasic = hl2.map((v,i)=> atr[i]==null?null:v-mult*atr[i]);
  const upper=[...upperBasic], lower=[...lowerBasic];
  const trendLine=closes.map(()=>null), dir=closes.map(()=>1);
  for(let i=1;i<closes.length;i++){
    if(upper[i]==null||upper[i-1]==null) continue;
    upper[i] = (upperBasic[i]<upper[i-1] || closes[i-1]>upper[i-1]) ? upperBasic[i] : upper[i-1];
    lower[i] = (lowerBasic[i]>lower[i-1] || closes[i-1]<lower[i-1]) ? lowerBasic[i] : lower[i-1];
  }
  for(let i=0;i<closes.length;i++){
    if(upper[i]==null){ continue; }
    if(i===0 || trendLine[i-1]==null){ dir[i]=1; trendLine[i]=lower[i]; continue; }
    if(dir[i-1]===1){
      dir[i] = closes[i] < lower[i] ? -1 : 1;
    } else {
      dir[i] = closes[i] > upper[i] ? 1 : -1;
    }
    trendLine[i] = dir[i]===1 ? lower[i] : upper[i];
  }
  return { line: trendLine, dir };
}
// Parabolic SAR standar Wilder (step/increment/max default 0.02/0.02/0.2 --
// sama seperti label "SAR 0.02 0.02 0.2" di TradingView).
function chartSAR(highs, lows, step=0.02, maxStep=0.2){
  const n=highs.length, out=new Array(n).fill(null);
  if(n<2) return out;
  let uptrend = highs[1] >= highs[0];
  let af = step;
  let ep = uptrend ? highs[0] : lows[0];
  let sar = uptrend ? lows[0] : highs[0];
  out[0]=sar;
  for(let i=1;i<n;i++){
    sar = sar + af*(ep-sar);
    if(uptrend){
      sar = Math.min(sar, lows[i-1], i>1?lows[i-2]:lows[i-1]);
      if(highs[i] > ep){ ep=highs[i]; af=Math.min(maxStep, af+step); }
      if(lows[i] < sar){ uptrend=false; sar=ep; ep=lows[i]; af=step; }
    } else {
      sar = Math.max(sar, highs[i-1], i>1?highs[i-2]:highs[i-1]);
      if(lows[i] < ep){ ep=lows[i]; af=Math.min(maxStep, af+step); }
      if(highs[i] > sar){ uptrend=true; sar=ep; ep=highs[i]; af=step; }
    }
    out[i]=sar;
  }
  return out;
}
// Stochastic RSI (rsiPeriod, stochPeriod, kSmooth, dSmooth) -- dihitung DARI
// deret RSI (bukan dari harga langsung): %K mentah = posisi RSI hari ini
// dalam rentang RSI tertinggi/terendah `stochPeriod` hari, lalu %K & %D
// masing-masing di-SMA-kan (kSmooth/dSmooth).
function chartStochRSI(rsiValues, stochPeriod=14, kSmooth=3, dSmooth=3){
  const rawK = rsiValues.map((v,i)=>{
    if(v==null) return null;
    const hi=chartHighest(rsiValues, stochPeriod, i), lo=chartLowest(rsiValues, stochPeriod, i);
    if(hi==null||lo==null) return null;
    return hi===lo ? 0 : ((v-lo)/(hi-lo))*100;
  });
  const kSma = arr => arr.map((_,i)=>{
    const win=arr.slice(Math.max(0,i-kSmooth+1),i+1).filter(v=>v!=null);
    return win.length===Math.min(kSmooth,i+1) && win.length>0 ? win.reduce((a,b)=>a+b,0)/win.length : null;
  });
  const k = kSma(rawK);
  const dSma = arr => arr.map((_,i)=>{
    const win=arr.slice(Math.max(0,i-dSmooth+1),i+1).filter(v=>v!=null);
    return win.length===Math.min(dSmooth,i+1) && win.length>0 ? win.reduce((a,b)=>a+b,0)/win.length : null;
  });
  const d = dSma(k);
  return { k, d };
}

function drawChartSVG(){
  const svg = document.getElementById("chartSvg");
  if(!svg || !state.chartData.length) return;
  const lv = state.selectedLevels, series = state.chartSeries || {};
  const allData = state.chartData.slice();
  const now = new Date();
  const days = {"1m":31,"3m":92,"6m":183,"1y":365}[state.chartRange];
  const data = days ? allData.filter(d => (now - new Date(d.date)) <= days*86400000) : allData;
  const plotted = data.length ? data : allData;
  const closes = plotted.map(d=>d.close);
  const on = k => series[k] !== false;
  const showBB=on('bb'), showMACD=on('macd'), showVol=on('vol');
  const showEmaHL=on('emaHL'), showEma89=on('ema89'), showSar=on('sar'), showSuperTrend=on('supertrend'), showPC=on('pc');
  const showBandar=on('bandar'), showStochRsi=on('stochrsi'), showRsi721=on('rsi721'), showForeignFlow=on('foreignflow'), showNetForeign=on('netforeign');
  const fullCloses=allData.map(d=>d.close);
  // High/Low dipakai banyak indikator (SAR, SuperTrend, PC) -- kalau baris
  // lama belum punya high/low (flows ditulis sebelum kolom itu ada di
  // sync), fallback ke close supaya tidak NaN, bukan skip total.
  const fullHighs=allData.map(d=>d.high!=null?d.high:d.close), fullLows=allData.map(d=>d.low!=null?d.low:d.close);
  const fullVols=allData.map(d=>d.volume==null?0:Number(d.volume));
  const off=Math.max(0,allData.indexOf(plotted[0]));
  const bbMidAll=chartSMA(fullCloses,20), bbUpAll=bbMidAll.map((m,i)=>m==null?null:m+2*chartStd(fullCloses,20,i,m)), bbLoAll=bbMidAll.map((m,i)=>m==null?null:m-2*chartStd(fullCloses,20,i,m));
  const rsi14All=chartRSI(fullCloses,14), ema12=chartEMA(fullCloses,12), ema26=chartEMA(fullCloses,26), macdAll=ema12.map((v,i)=>v-ema26[i]), macdSigAll=chartEMA(macdAll,9);
  // --- Overlay harga baru ---
  const emaHAll=chartEMA(fullHighs,21), emaLAll=chartEMA(fullLows,21), ema89All=chartEMA(fullCloses,89);
  const sarAll=chartSAR(fullHighs,fullLows,0.02,0.2);
  const stAll=chartSuperTrend(fullHighs,fullLows,fullCloses,10,3);
  const pcHiAll=fullHighs.map((_,i)=>chartHighest(fullHighs,20,i)), pcLoAll=fullLows.map((_,i)=>chartLowest(fullLows,20,i));
  const pcCenterAll=pcHiAll.map((h,i)=>h==null||pcLoAll[i]==null?null:(h+pcLoAll[i])/2), pcAvgAll=chartSMA(fullCloses,20);
  // --- Panel bawah baru ---
  // Bandar Volume: PROKSI volume bertanda (bukan replikasi 1:1 indikator
  // proprietary TradingView, karena formula aslinya tidak publik/tidak bisa
  // diverifikasi tanpa source Pine Script-nya) -- volume hari itu diberi
  // tanda + kalau close > close kemarin, - kalau close < close kemarin,
  // sama seperti prinsip OBV harian. Kalau kamu punya source Pine Script
  // indikator "Bandar Volume" versimu, kirim ke saya supaya bisa disamakan
  // persis.
  const bandarAll=fullCloses.map((c,i)=> i===0?0: (c>fullCloses[i-1]?fullVols[i]: c<fullCloses[i-1]?-fullVols[i]:0));
  const volMA20All=chartSMA(fullVols,20);
  const stochRsiAll=chartStochRSI(rsi14All,14,3,3);
  const rsi7All=chartRSI(fullCloses,7), rsi21All=chartRSI(fullCloses,21);
  // Foreign Flow: kumulatif Net Asing (Rp) sejak data flows paling awal
  // yang tersedia untuk ticker ini -- foreign_buy/foreign_sell dari IDX
  // satuannya LEMBAR, dikali close hari itu supaya jadi Rupiah (sama
  // seperti sumForeignNetRp di orcaWindowAggregate). Net harian dipakai
  // juga untuk panel "Net Foreign Buy/Sell".
  const netForeignAll=allData.map(d=>{
    const fb=d.foreignBuy, fs=d.foreignSell;
    return (fb==null||fs==null) ? null : (fb-fs)*d.close;
  });
  const foreignFlowAll=(()=>{ let acc=0; return netForeignAll.map(v=>{ acc += (v||0); return acc; }); })();

  const pick=arr=>arr.slice(off,off+plotted.length);
  const bbUp=pick(bbUpAll), bbMid=pick(bbMidAll), bbLo=pick(bbLoAll), macd=pick(macdAll), macdSig=pick(macdSigAll);
  const emaH=pick(emaHAll), emaL=pick(emaLAll), ema89=pick(ema89All), sar=pick(sarAll), stLine=pick(stAll.line), stDir=pick(stAll.dir);
  const pcHi=pick(pcHiAll), pcLo=pick(pcLoAll), pcCenter=pick(pcCenterAll), pcAvg=pick(pcAvgAll);
  const bandar=pick(bandarAll), volMA20=pick(volMA20All), stochK=pick(stochRsiAll.k), stochD=pick(stochRsiAll.d);
  const rsi7=pick(rsi7All), rsi21=pick(rsi21All), foreignFlow=pick(foreignFlowAll), netForeign=pick(netForeignAll);

  const levelVals = lv ? [lv.support,lv.resistance,lv.fib?.f382,lv.fib?.f50,lv.fib?.f618].filter(v=>v!=null) : [];
  const priceExtras = [
    showBB ? bbUp.concat(bbLo) : [],
    showEmaHL ? emaH.concat(emaL) : [], showEma89 ? ema89 : [],
    showSar ? sar : [], showSuperTrend ? stLine : [],
    showPC ? pcHi.concat(pcLo) : [],
  ].flat().filter(v=>v!=null);
  const allVals = closes.concat(levelVals, priceExtras), min=Math.min(...allVals), max=Math.max(...allVals), pad=(max-min)*.08||1;
  const yMin=min-pad,yMax=max+pad,T=18,B=38;
  const subH={bandar:70,vol:70,stochrsi:80,rsi721:80,foreignflow:70,macd:80,netforeign:70}, gap=14, mainH=380-T-B;
  const subKeys=[showBandar&&'bandar',showVol&&'vol',showStochRsi&&'stochrsi',showRsi721&&'rsi721',showForeignFlow&&'foreignflow',showMACD&&'macd',showNetForeign&&'netforeign'].filter(Boolean);
  const Htot=T+mainH+gap+subKeys.reduce((a,k)=>a+subH[k],0)+B+6;

  // Tinggi kotak chart = tinggi panel harga (CSS) + tambahan sub-panel aktif
  // (RSI/MACD/Volume) — dikirim lewat CSS var --sub-h agar respons mobile
  // tetap dikontrol penuh dari media query styles.css. Di-set SEBELUM
  // pengukuran di bawah supaya clientHeight yang terbaca sudah benar.
  const box=document.querySelector('.chart-box-expanded');
  if(box) box.style.setProperty('--sub-h', `${subKeys.reduce((a,k)=>a+subH[k]+gap,0)}px`);

  // Lebar viewBox mengikuti rasio kontainer supaya skala X = skala Y —
  // tanpa ini, di HP (kontainer sempit) teks & gari SVG jadi gepeng/miring
  // karena preserveAspectRatio="none" merentangkan 1000 user-unit ke ~340px.
  const wrap = svg.parentElement;
  const cw = Math.max(200, wrap ? wrap.clientWidth : 0), ch = Math.max(200, wrap ? wrap.clientHeight : 0);
  const vScale = ch / Htot;
  const W = Math.round(Htot * cw / ch), plotW = W - (W<640?40:62) - (W<640?58:86);
  const L = W<640?40:62, R = W<640?58:86;
  // Ukuran font user-unit dikompensasi balik supaya hasil render ≈ konstan
  const fs = u => Math.max(8.5, Math.round((u/vScale)*10)/10);

  const xScale=i=>L+(plotted.length<2?plotW/2:i*(plotW/(plotted.length-1||1)));
  const yScale=v=>T+mainH-((v-yMin)/(yMax-yMin))*mainH;
  const linePath=(arr,value)=>arr.map((d,i)=>`${i?'L':'M'}${xScale(i).toFixed(1)},${yScale(value(d,i)).toFixed(1)}`).join(' ');
  let html='';
  for(let i=0;i<=5;i++){ const y=T+i*mainH/5, val=yMax-i*(yMax-yMin)/5; html+=`<line x1="${L}" y1="${y}" x2="${W-R}" y2="${y}" stroke="rgba(255,255,255,.06)" stroke-dasharray="4,4"/><text x="5" y="${y+4}" fill="var(--muted)" font-size="${fs(11)}" font-family="JetBrains Mono,monospace">${fmtNum(Math.round(val))}</text>`; }
  const drawLevel=(val,color,label,dashed,visible)=>{ if(!visible||val==null||isNaN(val))return; const y=yScale(val); html+=`<line x1="${L}" y1="${y}" x2="${W-R}" y2="${y}" stroke="${color}" stroke-width="1.7" ${dashed?'stroke-dasharray="6,5"':''} opacity=".85"/><text x="${W-R+7}" y="${(y+4).toFixed(1)}" fill="${color}" font-size="${fs(10.5)}" font-family="JetBrains Mono,monospace" font-weight="600">${label}</text>`; };
  if(lv){ drawLevel(lv.support,'var(--down)',fmtNum(Math.round(lv.support)),false,on('support')); drawLevel(lv.resistance,'var(--up)',fmtNum(Math.round(lv.resistance)),false,on('resistance')); if(lv.fib){drawLevel(lv.fib.f382,'#94a3b8','Fib38',true,on('fib'));drawLevel(lv.fib.f50,'#94a3b8','Fib50',true,on('fib'));drawLevel(lv.fib.f618,'#94a3b8','Fib61',true,on('fib'));}}

  // Bollinger Bands: area + garis atas/tengah/bawah (bongkar-pasang via toggle BB)
  if(showBB){
    const seg=arr=>arr.map((v,i)=>v==null?'':`${i?'L':'M'}${xScale(i).toFixed(1)},${yScale(v).toFixed(1)}`).filter(Boolean).join(' ');
    const first=bbUp.findIndex(v=>v!=null), last=bbUp.reduce((a,v,i)=>v!=null?i:a,-1);
    if(first>=0&&last>first){
      const area=bbUp.slice(first,last+1).map((v,i)=>`${i?'L':'M'}${xScale(first+i).toFixed(1)},${yScale(v).toFixed(1)}`).join(' ')
        + [...Array(last-first+1).keys()].map(k=>{const i=last-k;return bbLo[i]!=null?`L${xScale(i).toFixed(1)},${yScale(bbLo[i]).toFixed(1)}`:'';}).filter(Boolean).join(' ')+' Z';
      html+=`<path d="${area}" fill="rgba(192,132,252,.07)" stroke="none"/>`;
    }
    html+=`<path d="${seg(bbUp)}" fill="none" stroke="#c084fc" stroke-width="1.2" opacity=".85"/>`;
    html+=`<path d="${seg(bbMid)}" fill="none" stroke="#c084fc" stroke-width="1" stroke-dasharray="4,3" opacity=".55"/>`;
    html+=`<path d="${seg(bbLo)}" fill="none" stroke="#c084fc" stroke-width="1.2" opacity=".85"/>`;
    const lU=[...bbUp].reverse().find(v=>v!=null), lM=[...bbMid].reverse().find(v=>v!=null), lL=[...bbLo].reverse().find(v=>v!=null);
    if(lU!=null)html+=`<text x="${W-R+7}" y="${(yScale(lU)+4).toFixed(1)}" fill="#c084fc" font-size="${fs(10.5)}" font-family="JetBrains Mono,monospace" font-weight="600">BB-U</text>`;
    if(lM!=null)html+=`<text x="${W-R+7}" y="${(yScale(lM)+4).toFixed(1)}" fill="#c084fc" font-size="${fs(10.5)}" font-family="JetBrains Mono,monospace" opacity=".8">BB-M</text>`;
    if(lL!=null)html+=`<text x="${W-R+7}" y="${(yScale(lL)+4).toFixed(1)}" fill="#c084fc" font-size="${fs(10.5)}" font-family="JetBrains Mono,monospace" font-weight="600">BB-L</text>`;
  }

  // --- Overlay harga baru: EMA21 High/Low, EMA89, SAR, SuperTrend, Price Channel ---
  const segPath=arr=>arr.map((v,i)=>v==null?'':`${i?'L':'M'}${xScale(i).toFixed(1)},${yScale(v).toFixed(1)}`).filter(Boolean).join(' ');
  const lastVal=arr=>[...arr].reverse().find(v=>v!=null);
  const labelRight=(val,color,label,weight)=>{ if(val==null)return; html+=`<text x="${W-R+7}" y="${(yScale(val)+4).toFixed(1)}" fill="${color}" font-size="${fs(10)}" font-family="JetBrains Mono,monospace" font-weight="${weight||600}">${label}</text>`; };
  if(showEmaHL){
    html += `<path d="${segPath(emaH)}" fill="none" stroke="#2dd4bf" stroke-width="1.4" opacity=".85"/>`;
    html += `<path d="${segPath(emaL)}" fill="none" stroke="#2dd4bf" stroke-width="1.4" opacity=".85" stroke-dasharray="5,3"/>`;
    labelRight(lastVal(emaH),'#2dd4bf','EMA21H'); labelRight(lastVal(emaL),'#2dd4bf','EMA21L');
  }
  if(showEma89){ html += `<path d="${segPath(ema89)}" fill="none" stroke="#f472b6" stroke-width="1.6" opacity=".9"/>`; labelRight(lastVal(ema89),'#f472b6','EMA89'); }
  if(showPC){
    html += `<path d="${segPath(pcHi)}" fill="none" stroke="#e879f9" stroke-width="1.2" opacity=".7"/>`;
    html += `<path d="${segPath(pcLo)}" fill="none" stroke="#e879f9" stroke-width="1.2" opacity=".7"/>`;
    html += `<path d="${segPath(pcCenter)}" fill="none" stroke="#e879f9" stroke-width="1" stroke-dasharray="3,4" opacity=".55"/>`;
    html += `<path d="${segPath(pcAvg)}" fill="none" stroke="#e879f9" stroke-width="1" opacity=".45"/>`;
    labelRight(lastVal(pcHi),'#e879f9','PC-Hi'); labelRight(lastVal(pcLo),'#e879f9','PC-Lo');
  }
  if(showSuperTrend){
    // Digambar per-segmen supaya warnanya berubah sesuai arah (hijau naik,
    // merah turun) seperti tampilan aslinya di TradingView.
    for(let i=1;i<stLine.length;i++){
      if(stLine[i]==null||stLine[i-1]==null) continue;
      const col = stDir[i]===1 ? 'rgba(16,185,129,.9)' : 'rgba(239,68,68,.9)';
      html += `<line x1="${xScale(i-1).toFixed(1)}" y1="${yScale(stLine[i-1]).toFixed(1)}" x2="${xScale(i).toFixed(1)}" y2="${yScale(stLine[i]).toFixed(1)}" stroke="${col}" stroke-width="2"/>`;
    }
    const lst=lastVal(stLine); if(lst!=null) labelRight(lst, stDir[stDir.length-1]===1?'#10b981':'#ef4444', 'ST');
  }
  if(showSar){
    sar.forEach((v,i)=>{ if(v==null)return; html += `<circle cx="${xScale(i).toFixed(1)}" cy="${yScale(v).toFixed(1)}" r="1.6" fill="#ef4444"/>`; });
    labelRight(lastVal(sar),'#ef4444','SAR');
  }

  const closePath=on('close') ? `<path d="${linePath(plotted,d=>d.close)}" fill="none" stroke="var(--gold)" stroke-width="2.8" stroke-linejoin="round"/>` : '';
  html += `<rect x="${L}" y="${T}" width="${plotW}" height="${mainH}" fill="transparent" data-chart-plot="1"/>${closePath}`;

  // --- Sub-panel bawah (RSI / MACD / Volume), masing2 dengan sumbu & label sendiri
  let sTop=T+mainH+gap;
  subKeys.forEach(k=>{
    const h=subH[k];
    html+=`<line x1="${L}" y1="${sTop+h}" x2="${W-R}" y2="${sTop+h}" stroke="rgba(255,255,255,.10)"/>`;
    if(k==='bandar'){
      const vals=bandar.filter(v=>v!=null&&!isNaN(v));
      const vmax=Math.max(...vals.map(v=>Math.abs(v)))||1;
      const yB=v=>sTop+h/2-(v/vmax)*(h/2-8);
      const bw=Math.max(1.2,plotW/plotted.length*0.6);
      html+=`<line x1="${L}" y1="${sTop+h/2}" x2="${W-R}" y2="${sTop+h/2}" stroke="rgba(255,255,255,.12)"/>`;
      bandar.forEach((v,i)=>{ if(v==null)return; const y0=yB(0),y1=yB(v); html+=`<rect x="${(xScale(i)-bw/2).toFixed(1)}" y="${Math.min(y0,y1).toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(1,Math.abs(y1-y0)).toFixed(1)}" fill="${v>=0?'rgba(16,185,129,.6)':'rgba(239,68,68,.6)'}"/>`; });
      html+=`<text x="5" y="${sTop+12}" fill="#22c55e" font-size="${fs(10)}" font-family="JetBrains Mono,monospace" font-weight="700">BANDAR VOLUME</text>`;
      const lb=lastVal(bandar); if(lb!=null)html+=`<text x="${W-R+7}" y="${sTop+12}" fill="${lb>=0?'#22c55e':'#ef4444'}" font-size="${fs(10)}" font-family="JetBrains Mono,monospace">${fmtNum(Math.round(lb))}</text>`;
    }
    if(k==='vol'){
      const vols=plotted.map(d=>d.volume==null?null:Number(d.volume));
      const vmax=Math.max(...vols.map(v=>v||0), ...volMA20.map(v=>v||0))||1;
      const bw=Math.max(1.2,plotW/plotted.length*0.6);
      const yV=v=>sTop+h-(v/vmax)*(h-14);
      vols.forEach((v,i)=>{if(v==null)return;const hgt=(v/vmax)*(h-14);const up=i===0||plotted[i].close>=plotted[i-1].close;html+=`<rect x="${(xScale(i)-bw/2).toFixed(1)}" y="${(sTop+h-hgt).toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(1,hgt).toFixed(1)}" fill="${up?'rgba(16,185,129,.45)':'rgba(239,68,68,.45)'}"/>`;});
      html+=`<path d="${volMA20.map((v,i)=>v==null?'':`${i?'L':'M'}${xScale(i).toFixed(1)},${yV(v).toFixed(1)}`).filter(Boolean).join(' ')}" fill="none" stroke="#60a5fa" stroke-width="1.6"/>`;
      html+=`<text x="5" y="${sTop+12}" fill="var(--muted)" font-size="${fs(10)}" font-family="JetBrains Mono,monospace" font-weight="700">VOLUME 20</text>`;
      const lv2=lastVal(vols), lm2=lastVal(volMA20);
      if(lv2!=null)html+=`<text x="${W-R+7}" y="${sTop+12}" fill="var(--muted)" font-size="${fs(10)}" font-family="JetBrains Mono,monospace">${fmtNum(Math.round(lv2))}</text>`;
      if(lm2!=null)html+=`<text x="${W-R+7}" y="${(sTop+26)}" fill="#60a5fa" font-size="${fs(10)}" font-family="JetBrains Mono,monospace">MA ${fmtNum(Math.round(lm2))}</text>`;
    }
    if(k==='stochrsi'){
      const yR=v=>sTop+h-((v-0)/100)*h;
      [20,50,80].forEach(g=>{const y=yR(g);html+=`<line x1="${L}" y1="${y}" x2="${W-R}" y2="${y}" stroke="${g===50?'rgba(255,255,255,.06)':'rgba(239,68,68,.25)'}" stroke-dasharray="3,4"/>`;});
      const linePts=arr=>arr.map((v,i)=>v==null?'':`${i?'L':'M'}${xScale(i).toFixed(1)},${yR(v).toFixed(1)}`).filter(Boolean).join(' ');
      html+=`<path d="${linePts(stochD)}" fill="none" stroke="#ef4444" stroke-width="1.6"/>`;
      html+=`<path d="${linePts(stochK)}" fill="none" stroke="#22c55e" stroke-width="1.6"/>`;
      html+=`<text x="5" y="${sTop+12}" fill="var(--text)" font-size="${fs(10)}" font-family="JetBrains Mono,monospace" font-weight="700">STOCH RSI 14,14,3,3</text>`;
      const lk=lastVal(stochK), ld=lastVal(stochD);
      if(lk!=null)html+=`<text x="${W-R+7}" y="${(yR(lk)+4).toFixed(1)}" fill="#22c55e" font-size="${fs(10)}" font-family="JetBrains Mono,monospace">%K ${lk.toFixed(1)}</text>`;
      if(ld!=null)html+=`<text x="${W-R+7}" y="${(yR(ld)+14).toFixed(1)}" fill="#ef4444" font-size="${fs(10)}" font-family="JetBrains Mono,monospace">%D ${ld.toFixed(1)}</text>`;
    }
    if(k==='rsi721'){
      const yR=v=>sTop+h-((v-0)/100)*h;
      [30,50,70].forEach(g=>{const y=yR(g);html+=`<line x1="${L}" y1="${y}" x2="${W-R}" y2="${y}" stroke="${g===50?'rgba(255,255,255,.06)':'rgba(244,114,182,.25)'}" stroke-dasharray="3,4"/>`;});
      const linePts=arr=>arr.map((v,i)=>v==null?'':`${i?'L':'M'}${xScale(i).toFixed(1)},${yR(v).toFixed(1)}`).filter(Boolean).join(' ');
      html+=`<path d="${linePts(rsi21)}" fill="none" stroke="#60a5fa" stroke-width="1.6"/>`;
      html+=`<path d="${linePts(rsi7)}" fill="none" stroke="#22c55e" stroke-width="1.8"/>`;
      html+=`<text x="5" y="${sTop+12}" fill="var(--text)" font-size="${fs(10)}" font-family="JetBrains Mono,monospace" font-weight="700">RSI 7 &amp; 21</text>`;
      const l7=lastVal(rsi7), l21=lastVal(rsi21);
      if(l7!=null)html+=`<text x="${W-R+7}" y="${(yR(l7)+4).toFixed(1)}" fill="#22c55e" font-size="${fs(10)}" font-family="JetBrains Mono,monospace">${l7.toFixed(1)}</text>`;
      if(l21!=null)html+=`<text x="${W-R+7}" y="${(yR(l21)+14).toFixed(1)}" fill="#60a5fa" font-size="${fs(10)}" font-family="JetBrains Mono,monospace">${l21.toFixed(1)}</text>`;
    }
    if(k==='foreignflow'){
      const vals=foreignFlow.filter(v=>v!=null&&!isNaN(v));
      if(vals.length){
        const lo=Math.min(...vals),hi=Math.max(...vals),p2=(hi-lo)*.1||1,yF=v=>sTop+h-((v-(lo-p2))/((hi+p2)-(lo-p2)))*h;
        const linePts=arr=>arr.map((v,i)=>v==null?'':`${i?'L':'M'}${xScale(i).toFixed(1)},${yF(v).toFixed(1)}`).filter(Boolean).join(' ');
        html+=`<path d="${linePts(foreignFlow)}" fill="none" stroke="#60a5fa" stroke-width="1.8"/>`;
        const lf=lastVal(foreignFlow); if(lf!=null)html+=`<text x="${W-R+7}" y="${(yF(lf)+4).toFixed(1)}" fill="#60a5fa" font-size="${fs(10)}" font-family="JetBrains Mono,monospace">${fmtRp(lf)}</text>`;
      }
      html+=`<text x="5" y="${sTop+12}" fill="#60a5fa" font-size="${fs(10)}" font-family="JetBrains Mono,monospace" font-weight="700">FOREIGN FLOW</text>`;
    }
    if(k==='macd'){
      const vals=macd.concat(macdSig).filter(v=>v!=null&&!isNaN(v));
      const lo=Math.min(...vals),hi=Math.max(...vals),p2=(hi-lo)*.1||1,yM=v=>sTop+h-((v-(lo-p2))/((hi+p2)-(lo-p2)))*h;
      const bw=Math.max(1.2,plotW/plotted.length*0.6);
      macd.forEach((m2,i)=>{const hv=m2-macdSig[i];if(m2==null||isNaN(m2)||macdSig[i]==null)return;const y0=yM(0),y1=yM(hv);html+=`<rect x="${(xScale(i)-bw/2).toFixed(1)}" y="${Math.min(y0,y1).toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(1,Math.abs(y1-y0)).toFixed(1)}" fill="${hv>=0?'rgba(16,185,129,.5)':'rgba(239,68,68,.5)'}"/>`;});
      const lp=arr=>arr.map((v,i)=>v==null||isNaN(v)?'':`${i?'L':'M'}${xScale(i).toFixed(1)},${yM(v).toFixed(1)}`).filter(Boolean).join(' ');
      html+=`<line x1="${L}" y1="${yM(0)}" x2="${W-R}" y2="${yM(0)}" stroke="rgba(255,255,255,.12)"/>`;
      html+=`<path d="${lp(macd)}" fill="none" stroke="#60a5fa" stroke-width="1.7"/>`;
      html+=`<path d="${lp(macdSig)}" fill="none" stroke="#fbbf24" stroke-width="1.4"/>`;
      html+=`<text x="5" y="${sTop+12}" fill="#60a5fa" font-size="${fs(10)}" font-family="JetBrains Mono,monospace" font-weight="700">MACD 12/26/9</text>`;
      const lm=[...macd].reverse().find(v=>v!=null&&!isNaN(v)),ls=[...macdSig].reverse().find(v=>v!=null&&!isNaN(v));
      if(lm!=null)html+=`<text x="${W-R+7}" y="${(yM(lm)+4).toFixed(1)}" fill="#60a5fa" font-size="${fs(10)}" font-family="JetBrains Mono,monospace">${lm.toFixed(1)}</text>`;
      if(ls!=null)html+=`<text x="${W-R+7}" y="${(yM(ls)+4).toFixed(1)}" fill="#fbbf24" font-size="${fs(10)}" font-family="JetBrains Mono,monospace">${ls.toFixed(1)}</text>`;
    }
    if(k==='netforeign'){
      const vals=netForeign.filter(v=>v!=null&&!isNaN(v));
      const vmax=Math.max(...vals.map(v=>Math.abs(v)))||1;
      const yN=v=>sTop+h/2-(v/vmax)*(h/2-8);
      const bw=Math.max(1.2,plotW/plotted.length*0.6);
      html+=`<line x1="${L}" y1="${sTop+h/2}" x2="${W-R}" y2="${sTop+h/2}" stroke="rgba(255,255,255,.12)"/>`;
      netForeign.forEach((v,i)=>{ if(v==null)return; const y0=yN(0),y1=yN(v); html+=`<rect x="${(xScale(i)-bw/2).toFixed(1)}" y="${Math.min(y0,y1).toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(1,Math.abs(y1-y0)).toFixed(1)}" fill="${v>=0?'rgba(16,185,129,.6)':'rgba(239,68,68,.6)'}"/>`; });
      html+=`<text x="5" y="${sTop+12}" fill="#22c55e" font-size="${fs(10)}" font-family="JetBrains Mono,monospace" font-weight="700">NET FOREIGN BUY/SELL</text>`;
      const ln=lastVal(netForeign); if(ln!=null)html+=`<text x="${W-R+7}" y="${sTop+12}" fill="${ln>=0?'#22c55e':'#ef4444'}" font-size="${fs(10)}" font-family="JetBrains Mono,monospace">${fmtRp(ln)}</text>`;
    }
    sTop+=h+gap;
  });

  // Label tanggal di bawah panel paling bawah
  [0,Math.floor((plotted.length-1)/2),plotted.length-1].forEach(i=>{ if(plotted[i]) html+=`<text x="${xScale(i)}" y="${Htot-8}" text-anchor="middle" fill="var(--muted)" font-size="${fs(10)}" font-family="JetBrains Mono,monospace">${fmtDateID(plotted[i].date)}</text>`; });

  // Crosshair + titik harga saat hover
  html += `<line id="chartCrossV" x1="0" y1="${T}" x2="0" y2="${T+mainH+(subKeys.length?gap+subKeys.reduce((a,k)=>a+subH[k],0):0)}" stroke="rgba(255,255,255,.25)" stroke-dasharray="3,3" style="display:none"/><circle id="chartCrossDot" r="4" fill="var(--gold)" stroke="#0f172a" stroke-width="1.5" style="display:none"/>`;

  svg.setAttribute('viewBox',`0 0 ${W} ${Htot}`);
  svg.innerHTML=html;

  const plot=svg.querySelector('[data-chart-plot]'), tip=document.getElementById('chartTooltip');
  const crossV=svg.querySelector('#chartCrossV'), dot=svg.querySelector('#chartCrossDot');
  if(plot&&tip){
    plot.addEventListener('mousemove',e=>{
      const prect=plot.getBoundingClientRect(), n2=plotted.length, i=Math.max(0,Math.min(n2-1,Math.round(((e.clientX-prect.left)/prect.width)*(n2-1))));
      const d=plotted[i], x=xScale(i);
      let extra='';
      if(showBB&&bbUp[i]!=null&&bbLo[i]!=null)extra+=`<br><span style="color:#c084fc">BB ${fmtNum(Math.round(bbLo[i]))} – ${fmtNum(Math.round(bbUp[i]))}</span>`;
      if(showRSI&&rsi[i]!=null)extra+=`<br><span style="color:#f472b6">RSI ${rsi[i].toFixed(1)}</span>`;
      if(showMACD&&macd[i]!=null&&macdSig[i]!=null)extra+=`<br><span style="color:#60a5fa">MACD ${macd[i].toFixed(1)} / ${macdSig[i].toFixed(1)}</span>`;
      if(showVol&&d.volume!=null)extra+=`<br><span style="color:#94a3b8">Vol ${fmtNum(Math.round(d.volume))}</span>`;
      tip.innerHTML=`<b>${fmtDateID(d.date)}</b><br>Close: <strong>${fmtNum(d.close)}</strong>${extra}`;
      tip.style.left=`${(x/W)*100}%`; tip.style.top=`${(yScale(d.close)/Htot)*100}%`; tip.classList.add('show');
      if(crossV){crossV.setAttribute('x1',x);crossV.setAttribute('x2',x);crossV.style.display='';}
      if(dot){dot.setAttribute('cx',x);dot.setAttribute('cy',yScale(d.close));dot.style.display='';}
    });
    plot.addEventListener('mouseleave',()=>{tip.classList.remove('show');if(crossV)crossV.style.display='none';if(dot)dot.style.display='none';});
  }
}

function spCriteriaBox(label, html){
  return `<div class="sp-crit-box"><div class="sp-crit-lbl">${label}</div><div class="sp-crit-body">${html}</div></div>`;
}

function renderSmartPickListModalContent(){
  const defId = state.spListOpenDefId;
  const def = spDefById(defId);
  if(!def) return "";
  const list = getSmartPickMatchesFull(defId);
  if(!list.length){
    return `<div class="empty-box">Belum ada saham yang lolos kriteria "${escapeHtml(def.title)}" hari ini.</div>`;
  }
  return `
    <div style="font-size:12px;color:var(--muted);margin-bottom:12px;">
      ${escapeHtml(def.shortDesc)} — <b class="mono">${list.length}</b> saham lolos, diurutkan dari skor tertinggi.
    </div>
    ${renderBacktestSaveBar("smartpick", list.map(s=>({
      ticker: s.ticker, price: Math.round(s.price||0),
      kriteria: `Smart Pick · ${def.title}`,
      keterangan: `Skor: ${s.score.toFixed(0)}${s.strong?' · Sinyal Kuat':''}; Δ%: ${(s.changePct||0)>=0?'+':''}${(s.changePct||0).toFixed(1)}%; Posisi 52W: ${s.pos52w!=null?s.pos52w.toFixed(0)+'%':'-'}; Vol Ratio: ${s.volRatio!=null?s.volRatio.toFixed(1)+'x':'-'}`
    })))}
    <div class="table-wrap" style="max-height:60vh;">
      <table class="mono">
        <thead>
          <tr><th></th><th>#</th><th>Kode</th><th>Sektor</th><th>Harga</th><th>Δ%</th><th>Posisi 52W</th><th>Vol Ratio</th><th>Skor</th><th></th></tr>
        </thead>
        <tbody>
          ${list.map((s,i)=>`
            <tr>
              ${backtestRowCheckbox("smartpick", { ticker: s.ticker, price: Math.round(s.price||0) })}
              <td>${i+1}</td>
              <td class="ticker-cell">${escapeHtml(s.ticker)}${s.strong?' <span title="Sinyal Kuat">🔥</span>':''}${s.stockbitVerified?' <span title="Volume spike tervalidasi Value (Rp) riil dari Stockbit, bukan cuma rasio volume lembar">💠</span>':''}</td>
              <td style="white-space:normal;max-width:160px;font-family:'Sora',sans-serif;">${escapeHtml(s.sektor||"-")}</td>
              <td>Rp${fmtNum(Math.round(s.price||0))}</td>
              <td style="font-weight:700;color:${(s.changePct||0)>=0?'var(--up)':'var(--down)'};">${(s.changePct||0)>=0?"+":""}${(s.changePct||0).toFixed(1)}%</td>
              <td>${s.pos52w!=null?s.pos52w.toFixed(0)+"%":"-"}</td>
              <td>${s.volRatio!=null?s.volRatio.toFixed(1)+"x":"-"}</td>
              <td>${pillHtml(s.score.toFixed(0), s.strong?"gold":"teal")}</td>
              <td><button type="button" class="link-btn" data-sp-list-detail="${s.ticker}">Detail</button></td>
            </tr>`).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderSmartPickCard(def){
  const matches = getSmartPickMatches(def.id);
  const open = state.spOpenCriteria === def.id;
  return `
    <div class="sp-card">
      <div class="sp-card-head">
        <div class="sp-card-title">${def.icon} ${escapeHtml(def.title)}</div>
        <button type="button" class="sp-crit-toggle ${open?'open':''}" data-sp-toggle="${def.id}">Kriteria <span class="chev">▾</span></button>
      </div>
      <div class="sp-card-desc">${escapeHtml(def.shortDesc)}</div>
      <div class="sp-card-count">
        ${matches.length ? `<span class="pill pill-${def.tone}">${matches.length} lolos hari ini</span>` : `<span class="pill pill-muted">Belum ada yang lolos</span>`}
      </div>
      ${matches.length ? `
      <div class="sp-card-tickers">
        ${matches.slice(0,6).map(m=>`<button type="button" class="sp-ticker-chip ${m.strong?'strong':''}" data-sp-ticker="${m.ticker}" title="Skor ${m.score.toFixed(0)}${m.strong?' · Sinyal Kuat 🔥':''}${m.stockbitVerified?' · Value Stockbit terverifikasi 💠':''}">${escapeHtml(m.ticker)}${m.strong?' 🔥':''}${m.stockbitVerified?' 💠':''}</button>`).join("")}
        ${matches.length>6?`<span class="sp-ticker-more">+${matches.length-6} lagi</span>`:""}
      </div>
      <button type="button" class="btn btn-outline sp-viewall-btn" data-sp-viewall="${def.id}">📋 Lihat Daftar Lengkap (${matches.length})</button>` : ""}
      <div class="sp-crit-panel ${open?'open':''}">
        <div class="sp-crit-grid">
          ${spCriteriaBox("Definisi", def.definisi)}
          ${spCriteriaBox("Filter", def.filter)}
          ${spCriteriaBox("Scoring", def.scoring)}
          ${spCriteriaBox("Sinyal Kuat", def.sinyalKuat)}
        </div>
      </div>
    </div>`;
}

function renderSmartPick(){
  const cardsHtml = SMART_PICK_DEFS.map(renderSmartPickCard).join("");

  const rows = smartPickRowsWithLive();
  const stats = computeSmartPickStats(rows);
  const todayStr = todayLocalISO();
  const alreadyToday = state.spHistory.some(h => h.muncul_date === todayStr);

  const tableRows = rows.map(r => `
    <tr>
      <td class="ticker-cell">${escapeHtml(r.stock_code)}</td>
      <td>${pillHtml(escapeHtml(spTitleFor(r.signal_type)), spToneFor(r.signal_type))}</td>
      <td>${fmtDateID(r.muncul_date)}</td>
      <td class="mono">Rp${fmtNum(Math.round(r.entry_price))}</td>
      <td class="mono">${r.nowPrice!=null ? "Rp"+fmtNum(Math.round(r.nowPrice)) : "-"}</td>
      <td class="mono">
        Rp${fmtNum(Math.round(r.highestPrice))}
        ${r.highestPct!=null ? `<div style="font-size:10px;color:var(--up);font-weight:700;">+${r.highestPct.toFixed(1)}%</div>` : ""}
      </td>
      <td class="mono" style="font-weight:700;color:${r.chgPct==null?'var(--muted)':(r.chgPct>=0?'var(--up)':'var(--down)')};">${r.chgPct==null?"-":(r.chgPct>=0?"+":"")+r.chgPct.toFixed(1)+"%"}</td>
      <td class="mono" style="font-weight:700;color:${r.plRp==null?'var(--muted)':(r.plRp>=0?'var(--up)':'var(--down)')};">${r.plRp==null?"-":(r.plRp>=0?"+":"-")+"Rp"+fmtNum(Math.abs(r.plRp))}</td>
      <td class="mono">${r.hari}h</td>
    </tr>`).join("");

  return `
    <div class="panel" style="margin-bottom:16px;">
      <div class="filter-section-title">✨ Smart Pick <span class="pill pill-teal" style="margin-left:8px;">AI SCREENER</span><span class="line"></span></div>
      <div style="font-size:12px;color:var(--muted);margin-bottom:14px;">
        5 sinyal siap pakai, dihitung otomatis dari data live saat ini (rule-based, bukan model AI beneran). Klik "Kriteria" di tiap kartu untuk lihat definisi & cara skornya.
      </div>
      <div class="sp-grid">${cardsHtml}</div>
    </div>

    <div class="panel">
      <button type="button" class="sp-recap-header" id="spRecapHeader">
        <div>
          <div class="filter-section-title" style="margin-bottom:2px;">📌 Rekap &amp; Share Signal</div>
          <div style="font-size:11.5px;color:var(--muted);font-weight:400;">Performa tiap signal sejak finalisasi + lacak win rate</div>
        </div>
        <span class="chev sp-recap-chev ${state.spRecapCollapsed?'':'open'}">▾</span>
      </button>
      <div class="sp-recap-body ${state.spRecapCollapsed?'':'open'}">
        <div class="sp-finalize-bar">
          <div>
            <div style="font-weight:700;font-size:13px;">FINALISASI HARI INI</div>
            <div style="font-size:11px;color:var(--muted);">Klik setelah market close — dikunci ke tanggal data${alreadyToday?" (sudah difinalisasi hari ini)":""}</div>
          </div>
          <button type="button" class="btn btn-primary" id="spFinalizeBtn" ${state.spFinalizing?"disabled":""}>${state.spFinalizing?"Memproses...":"✓ Finalisasi Signal (EOD)"}</button>
        </div>
        ${state.spMsg?`<div class="bs-msg ${state.spMsgError?'bs-msg-error':'bs-msg-ok'}" style="margin-top:8px;">${escapeHtml(state.spMsg)}</div>`:""}

        <div class="sp-toolbar">
          <select id="spFilterType" class="bs-input">
            <option value="all" ${state.spFilterType==="all"?"selected":""}>Semua signal</option>
            ${SMART_PICK_DEFS.map(d=>`<option value="${d.id}" ${state.spFilterType===d.id?"selected":""}>${escapeHtml(d.title)}</option>`).join("")}
          </select>
          <span style="font-size:11px;color:var(--muted);">Dari</span>
          <input type="date" id="spFromInput" class="bs-input" value="${state.spFrom||""}">
          <span style="font-size:11px;color:var(--muted);">s/d</span>
          <input type="date" id="spToInput" class="bs-input" value="${state.spTo||""}">
          <button type="button" class="btn btn-outline" id="spRefreshBtn" title="Muat ulang riwayat">🔄</button>
          <button type="button" class="btn btn-outline" id="spExportBtn" title="Export riwayat yang sedang tampil ke Excel">📥 Export Excel</button>
        </div>

        <div class="summary-grid" style="margin-top:14px;">
          <div class="summary-card tone-up">
            <div class="summary-lbl">Win Rate</div>
            <div class="summary-val">${stats.winRate!=null?stats.winRate.toFixed(0)+"%":"-"}</div>
          </div>
          <div class="summary-card tone-gold">
            <div class="summary-lbl">Rata-rata</div>
            <div class="summary-val" style="color:${stats.avg==null?'var(--text)':(stats.avg>=0?'var(--up)':'var(--down)')};font-size:20px;">${stats.avg!=null?(stats.avg>=0?"+":"")+stats.avg.toFixed(1)+"%":"-"}</div>
          </div>
          <div class="summary-card">
            <div class="summary-lbl">Tercatat</div>
            <div class="summary-val">${stats.total}</div>
          </div>
        </div>

        ${state.spHistoryLoading ? `<div class="empty-box" style="margin-top:14px;">Memuat riwayat...</div>` :
          rows.length ? `
          <div class="table-wrap" style="margin-top:14px;">
            <table class="mono">
              <thead><tr><th>Kode</th><th>Signal</th><th>Muncul</th><th>Entry</th><th>Now</th><th>Tertinggi</th><th>Δ%</th><th>P/L</th><th>Hari</th></tr></thead>
              <tbody>${tableRows}</tbody>
            </table>
          </div>` : `<div class="empty-box" style="margin-top:14px;">Belum ada riwayat sinyal${!SUPABASE_URL?" (Supabase belum dikonfigurasi)":""}. Klik "✓ Finalisasi Signal (EOD)" di atas — idealnya setelah market close — untuk mulai melacak performa.</div>`}
      </div>
    </div>
  `;
}

// ==========================================
// Panduan tab "ℹ️ Info" — SATU sumber kebenaran untuk daftar fitur yang
// ditampilkan ke user. Kalau nambah tab baru atau ubah cakupan fitur
// besar, update array ini juga supaya halaman Info tidak kembali basi
// (versi lama cuma menyebut 6 hal dari puluhan fitur yang sudah ada).
// ==========================================
const ABOUT_TAB_GUIDE = [
  { icon:"📋", title:"Screener", tone:"teal",
    desc:"Tabel utama semua saham IHSG dengan filter teknikal &amp; fundamental siap pakai, preset DSI (Eri Ginanjar, RSI Cross, Golden Cross, Super Uptrend, Volatility Breakout, Pullback Uptrend), plus Rule Builder kustom untuk menyusun kombinasi filter sendiri (mirip \"Edit Screener\" Stockbit) — bisa disimpan sebagai preset pribadi.",
    catatan:"Rule Builder saat ini menggabungkan semua rule dengan AND (seluruh syarat harus terpenuhi bersamaan, belum ada OR/grouping)." },
  { icon:"✨", title:"Smart Pick", tone:"gold",
    desc:"5 sinyal siap pakai — Area Demand, Throwback/Retest Breakout, Liquidity Sweep, Bull Divergence, Early Breakout — dihitung dari data live yang sama dengan Screener. Tombol \"Finalisasi Signal (EOD)\" mengunci snapshot harian ke database supaya win-rate &amp; rata-rata return tiap sinyal bisa dilacak dari waktu ke waktu.",
    catatan:"Ini scoring rule-based dari data yang sudah ada, bukan model AI/machine learning — hasil bisa berubah tiap refresh sebelum difinalisasi." },
  { icon:"🏢", title:"Sektoral", tone:"teal",
    desc:"Saham dikelompokkan per sektor, lengkap dengan panel Top Movers (Gainer / Loser / Value / Volume / Frequency) 10 besar hari ini." },
  { icon:"⭐", title:"Watchlist", tone:"muted",
    desc:"Kumpulan saham yang ditandai bintang dari tab manapun. Tersimpan otomatis di penyimpanan browser (localStorage) perangkat ini, dan disinkronkan ke Supabase kalau koneksi aktif." },
  { icon:"🔬", title:"Backtest", tone:"teal",
    desc:"Catat sesi backtest manual (harga entry, tanggal, keterangan) per saham lalu bandingkan hasilnya dari waktu ke waktu. Bisa diekspor ke Excel per sesi atau digabung semua sekaligus." },
  { icon:"💼", title:"Portofolio", tone:"up",
    desc:"Pencatatan transaksi beli/jual saham nyata beserta kalkulasi P&amp;L. Bisa diisi otomatis dari saham yang lolos Screener atau dari item Backtest." },
  { icon:"📈", title:"Grafik", tone:"teal",
    desc:"Chart harga per saham (digambar langsung di aplikasi ini, tanpa library chart eksternal), plus tautan cepat ke TradingView dan Stockbit untuk analisis lebih lanjut." },
  { icon:"📊", title:"Broker Summary", tone:"gold",
    desc:"Top 5 broker beli/jual per saham per hari — diketik manual atau ditempel dari CSV berdasarkan data akun Stockbit Anda sendiri, lalu disimpan supaya bisa dipakai fitur lain (Target Bandar, Entry Price Scanner).",
    catatan:"BUKAN hasil scraping otomatis dari Stockbit — datanya sepenuhnya bergantung pada apa yang Anda masukkan sendiri, jadi seakurat dan serutin Anda mengisinya." },
  { icon:"🎯", title:"Target Bandar", tone:"up",
    desc:"Dibangun di atas data Broker Summary: agregasi top bandar per emiten, kalkulator target harga (rata-rata harga bandar + ATR14 → level target R1/Max), dan ringkasan hit-rate dari kalkulasi sebelumnya dibanding harga aktual." },
  { icon:"🕵️", title:"Entry Price Scanner", tone:"gold",
    desc:"Menganalisis konvergensi VWAP broker (menyatu / diam / menjauh), tren akumulasi 10 hari (\"tanjakan\"), dan skor \"mutu\" untuk membantu mencari area entry yang dekat dengan harga rata-rata broker besar." },
  { icon:"⬢", title:"Kraken Flow (ORCA)", tone:"gold",
    desc:"Screener order-flow ala fitur \"ORCA System\" — mendeteksi pola antrian bid/offer, ukuran transaksi rata-rata (ATS), transaksi non-reguler, dan aliran dana asing, langsung dari data live tanpa perlu tombol \"Scan\" terpisah — cukup ubah filter, hasil update otomatis." },
];

const ABOUT_INTEGRATION_GUIDE = [
  { title:"Data Teknikal &amp; Fundamental", tone:"teal",
    desc:"Diambil dari Yahoo Finance (data publik) lewat Google Apps Script milik Anda sendiri. Indikator: EMA21 High/Low, RSI7 vs RSI21, MACD histogram, Volume MA20, PER, PBV, ROE, Dividend Yield." },
  { title:"Bandarmologi (kolom Screener)", tone:"down",
    desc:"PENTING: kolom \"Bandarmologi\" di tabel Screener BUKAN data transaksi broker asli — itu PROXY heuristik dari rasio volume hari ini terhadap rata-rata 20 hari, dikombinasikan arah harga. Data bandarmologi yang lebih mendekati transaksi asli (bid/offer, net asing, ATS) ada di tab Kraken Flow (ORCA) dan Target Bandar, yang bersumber dari data resmi IDX / input manual Broker Summary." },
  { title:"Live Data Stockbit", tone:"down",
    desc:"Opsional, pakai token dari extension Chrome Stockbit milik Anda sendiri. Ini API TIDAK RESMI (hasil pengamatan traffic, bukan dokumentasi resmi Stockbit) — endpoint bisa berubah atau berhenti berfungsi kapan saja tanpa pemberitahuan. Token hanya disimpan di Local Storage browser ini." },
  { title:"Notifikasi Telegram", tone:"teal",
    desc:"Opsional — mengirim notifikasi otomatis lewat Cron server (Supabase Edge Function) kalau ada saham baru lolos preset Rules Kustom pilihan Anda, tetap terkirim walau aplikasi ini tidak sedang dibuka. Butuh setup 1x lewat menu ⚙️ Pengaturan." },
  { title:"Penyimpanan Kredensial", tone:"up",
    desc:"Supabase URL/Key, token Stockbit, dan pengaturan Telegram disimpan di Local Storage browser perangkat ini — tidak tertanam di HTML, jadi tetap aman kalau aplikasi ini di-hosting publik. Selalu pakai anon key Supabase, jangan pernah service_role key." },
];

// Catatan: fitur tab "ℹ️ Info" (renderAbout) SUDAH DIHAPUS — isinya
// (ABOUT_TAB_GUIDE & ABOUT_INTEGRATION_GUIDE di atas) sekarang jadi
// bagian "🗂️ Panduan Fitur — Ringkasan Semua Tab" dan "🔌 Sumber Data
// & Integrasi" di dalam Panduan Lengkap (lihat renderPanduan()), supaya
// tidak ada dua halaman terpisah yang isinya tumpang tindih. Kalau masih
// ada tombol nav "Info" (data-tab="about") di index.html, hapus juga
// elemen tombolnya di sana — dispatch di bawah cuma jaring pengaman
// supaya tidak error kalau tombolnya kelewatan kehapus.


// ==========================================
// PANDUAN LENGKAP — helper kecil buat bikin accordion, callout, kartu,
// step bernomor, baris istilah (kv), dan checklist yang bisa dicentang.
// Semua CSS-nya sengaja ditulis inline lewat <style> di dalam HTML yang
// dikembalikan renderPanduan() (bukan di file CSS terpisah) supaya fitur
// ini tetap jalan walau index.html yang dipakai belum sempat diupdate.
// ==========================================
function pndAcc(id, icon, title, sub, open, bodyHtml){
  return `
    <details class="pnd-acc" id="pnd-${id}" ${open ? "open" : ""}>
      <summary class="pnd-acc-summary">
        <span class="pnd-acc-icon">${icon}</span>
        <span class="pnd-acc-titlewrap">
          <span class="pnd-acc-title">${title}</span>
          ${sub ? `<span class="pnd-acc-sub">${sub}</span>` : ""}
        </span>
        <span class="pnd-acc-chev">⌄</span>
      </summary>
      <div class="pnd-acc-body">${bodyHtml}</div>
    </details>`;
}
function pndCard(title, tagText, tagTone, bodyHtml){
  return `
    <div class="pnd-card">
      <div class="pnd-card-head">
        <span class="pnd-card-title">${title}</span>
        ${tagText ? `<span class="pnd-tag pnd-tag-${tagTone||"muted"}">${tagText}</span>` : ""}
      </div>
      <div class="pnd-card-body">${bodyHtml}</div>
    </div>`;
}
function pndCallout(html, tone){
  return `<div class="pnd-callout pnd-${tone||"info"}">${html}</div>`;
}
function pndStep(n, html){
  return `<div class="pnd-step"><div class="pnd-step-num">${n}</div><div class="pnd-step-text">${html}</div></div>`;
}
function pndKv(term, desc){
  return `<div class="pnd-kv"><span class="pnd-kv-term">${term}</span><span class="pnd-kv-desc">${desc}</span></div>`;
}
let PND_CHECK_SEQ = 0;
function pndCheck(text){
  const id = "pndchk_" + (PND_CHECK_SEQ++);
  return `<label class="pnd-check"><input type="checkbox" class="pnd-check-input" data-pnd-check="${id}"><span>${text}</span></label>`;
}
function pndOpenState(id, defaultOpen){
  try{
    const raw = localStorage.getItem("ihsg_panduan_open_pnd-" + id);
    if(raw === null) return defaultOpen;
    return raw === "1";
  }catch(e){ return defaultOpen; }
}
const LS_PANDUAN_CHECKLIST = "ihsg_panduan_checklist_v1";
function loadPanduanChecklist(){
  try{ return JSON.parse(localStorage.getItem(LS_PANDUAN_CHECKLIST) || "{}"); }catch(e){ return {}; }
}
function wirePanduanChecklist(){
  const saved = loadPanduanChecklist();
  document.querySelectorAll("[data-pnd-check]").forEach((el, idx) => {
    // Index berurutan sesuai urutan render (stabil selama struktur halaman
    // tidak berubah) dipakai sebagai key penyimpanan, supaya tidak perlu
    // ngasih id unik manual di tiap baris checklist.
    const key = "item" + idx;
    el.checked = !!saved[key];
    el.onchange = () => {
      const state2 = loadPanduanChecklist();
      state2[key] = el.checked;
      try{ localStorage.setItem(LS_PANDUAN_CHECKLIST, JSON.stringify(state2)); }catch(e){}
    };
  });
  document.querySelectorAll(".pnd-acc").forEach(acc=>{
    acc.addEventListener("toggle", () => {
      try{ localStorage.setItem("ihsg_panduan_open_"+acc.id, acc.open ? "1" : "0"); }catch(e){}
    });
  });
  // Tombol pintasan "Lompat ke bagian" di atas: buka <details>-nya dulu
  // (kalau lagi tertutup) baru scroll, karena klik anchor #id polos tidak
  // otomatis membuka elemen <details> tertutup di semua browser.
  document.querySelectorAll("[data-pnd-jump]").forEach(a=>{
    a.onclick = (e) => {
      e.preventDefault();
      const target = document.getElementById("pnd-" + a.dataset.pndJump);
      if(!target) return;
      if(!target.open){
        target.open = true;
        try{ localStorage.setItem("ihsg_panduan_open_"+target.id, "1"); }catch(err){}
      }
      target.scrollIntoView({ behavior:"smooth", block:"start" });
    };
  });
}

const PANDUAN_STYLES = `
<style>
.pnd-wrap{ display:flex; flex-direction:column; }
.pnd-wrap details.pnd-acc{ border:1px solid var(--border); border-radius:10px; margin-bottom:12px; overflow:hidden; background:rgba(255,255,255,0.02); }
.pnd-acc-summary{ list-style:none; cursor:pointer; display:flex; align-items:center; gap:10px; padding:13px 16px; user-select:none; }
.pnd-acc-summary::-webkit-details-marker{ display:none; }
.pnd-acc-summary::marker{ content:""; }
.pnd-acc-icon{ font-size:16px; flex:0 0 auto; }
.pnd-acc-titlewrap{ display:flex; flex-direction:column; gap:2px; }
.pnd-acc-title{ font-weight:700; font-size:13.5px; color:var(--text); }
.pnd-acc-sub{ font-size:11px; color:var(--muted); font-weight:400; }
.pnd-acc-chev{ margin-left:auto; color:var(--muted); font-size:12px; transition:transform .18s ease; }
details.pnd-acc[open] > .pnd-acc-summary .pnd-acc-chev{ transform:rotate(180deg); }
.pnd-acc-body{ padding:2px 16px 16px; display:flex; flex-direction:column; gap:10px; border-top:1px solid var(--border); padding-top:14px; }
.pnd-card{ border:1px solid var(--border); border-radius:8px; padding:12px 14px; background:rgba(255,255,255,0.015); }
.pnd-card-head{ display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:7px; flex-wrap:wrap; }
.pnd-card-title{ font-weight:700; font-size:13px; color:var(--text); }
.pnd-tag{ font-size:9px; font-weight:700; letter-spacing:.04em; text-transform:uppercase; padding:3px 8px; border-radius:20px; border:1px solid currentColor; white-space:nowrap; }
.pnd-tag-teal{ color:var(--teal); }
.pnd-tag-up{ color:var(--up); }
.pnd-tag-down{ color:var(--down); }
.pnd-tag-gold{ color:var(--gold); }
.pnd-tag-muted{ color:var(--muted); }
.pnd-card-body{ font-size:12.5px; line-height:1.7; color:var(--text); }
.pnd-card-body p{ margin:0 0 8px; }
.pnd-card-body p:last-child{ margin-bottom:0; }
.pnd-callout{ border-left:3px solid; border-radius:6px; padding:9px 12px; font-size:11.8px; line-height:1.6; margin-top:8px; }
.pnd-callout:first-child{ margin-top:0; }
.pnd-info{ border-color:var(--teal); background:rgba(45,212,191,0.08); color:var(--text); }
.pnd-success{ border-color:var(--up); background:rgba(34,197,94,0.08); color:var(--up); }
.pnd-warn{ border-color:var(--gold); background:rgba(234,179,8,0.09); color:var(--gold); }
.pnd-danger{ border-color:var(--down); background:rgba(239,68,68,0.09); color:var(--down); }
.pnd-step{ display:flex; gap:10px; align-items:flex-start; margin-bottom:9px; }
.pnd-step:last-child{ margin-bottom:0; }
.pnd-step-num{ flex:0 0 auto; width:19px; height:19px; margin-top:1px; border-radius:5px; background:rgba(45,212,191,0.15); color:var(--teal); font-size:10.5px; font-weight:700; display:flex; align-items:center; justify-content:center; }
.pnd-step-text{ font-size:12.5px; line-height:1.6; color:var(--text); }
.pnd-kv{ display:flex; gap:12px; padding:6px 0; border-bottom:1px dashed var(--border); font-size:12px; flex-wrap:wrap; }
.pnd-kv:last-child{ border-bottom:none; }
.pnd-kv-term{ flex:0 0 140px; color:var(--teal); font-weight:700; }
.pnd-kv-desc{ flex:1 1 200px; color:var(--text); }
.pnd-list{ margin:0; padding-left:18px; font-size:12.5px; line-height:1.85; color:var(--text); }
.pnd-list li{ margin-bottom:3px; }
.pnd-check{ display:flex; align-items:center; gap:9px; padding:6px 2px; font-size:12.5px; color:var(--text); cursor:pointer; border-bottom:1px dashed var(--border); }
.pnd-check:last-child{ border-bottom:none; }
.pnd-check input{ width:15px; height:15px; accent-color:var(--teal); flex:0 0 auto; }
.pnd-jump{ display:flex; flex-wrap:wrap; gap:6px; margin-bottom:18px; }
.pnd-jump a{ font-size:11px; padding:5px 10px; border-radius:20px; border:1px solid var(--border); color:var(--muted); text-decoration:none; background:rgba(255,255,255,0.02); }
.pnd-jump a:hover{ color:var(--teal); border-color:var(--teal); }
@media (max-width:640px){ .pnd-kv-term{ flex-basis:100%; } }
</style>`;

function renderPanduan(){
  const S = [];

  // ---------- 1. Tutorial Pemula ----------
  S.push(pndAcc("mulai", "🚀", "Tutorial Pemula – Mulai dari Sini", "Alur kerja & peta fitur", pndOpenState("mulai", true), `
    ${pndCard("Apa itu IHSG Screener Pro?", null, null, `
      <p>Ini alat <b>penyaring</b>, bukan robot yang menyuruh beli. Tugasnya menyaring ratusan emiten IDX menjadi belasan yang layak Anda lihat lebih dekat. Keputusan beli/jual tetap 100% di tangan Anda.</p>
    `)}
    ${pndCard("Alur kerja yang disarankan", "URUTAN", "teal", `
      ${pndStep(1, `Buka <b>Dashboard</b> — lihat kondisi pasar hari ini secara umum (jumlah Undervalue vs Danger Zone). Ini menentukan seberapa agresif Anda hari ini.`)}
      ${pndStep(2, `Kumpulkan nama emiten dari fitur pencari: <b>Smart Pick</b>, kolom <b>Bandarmologi</b> di Screener, <b>BSJP</b>, atau <b>Entry Price Scanner</b>. Ambil 3–5 nama yang paling sering muncul.`)}
      ${pndStep(3, `Verifikasi di <b>Broker Stalker → Lacak Saham</b> — masukkan kode emitennya, lihat berapa Buy Lot vs Sell Lot dan broker mana yang dominan. Konfirmasi tambahan: cek juga di <b>Kraken Flow (ORCA)</b>.`)}
      ${pndStep(4, `Analisa mendalam di <b>Detail Emiten</b> (klik kode saham di tabel manapun) — FundTech Score, Trading Plan otomatis (entry/target/stop loss), Broker Summary, dan perbandingan vs Sektor.`)}
      ${pndStep(5, `Simpan ke <b>Watchlist</b> dan pantau pergerakannya keesokan hari — atau beberapa hari — sebelum benar-benar eksekusi.`)}
      ${pndCallout(`Langkah 2 hanya mengumpulkan kandidat, langkah 3 dan 4 yang menyaring. Banyak pemula berhenti di langkah 2 lalu langsung beli — di situlah kesalahan paling sering terjadi.`, "success")}
      ${pndCallout(`Kalau satu nama muncul di lebih dari satu fitur sekaligus (misalnya lolos Smart Pick <i>dan</i> nongol di BSJP), itu konfirmasi ganda — biasanya kandidat yang paling layak diprioritaskan.`, "info")}
    `)}
    ${pndCard("Peta fitur: mana pencari, mana penyaring", "ORIENTASI", "gold", `
      ${pndKv("PENCARI", "Smart Pick · Bandarmologi (kolom Screener) · BSJP · Entry Price Scanner — melempar nama kandidat ke meja Anda.")}
      ${pndKv("PENYARING", "Kraken Flow (ORCA) · Broker Stalker (Lacak Saham) · Detail Emiten — membuktikan apakah kandidat itu layak.")}
      ${pndKv("PEMANTAU", "Watchlist · Sektoral (Top Movers) — menjaga Anda tetap tahu perkembangan.")}
    `)}
    ${pndCard("7 hal yang selalu dicek, apa pun fiturnya", null, null, `
      <ul class="pnd-list">
        <li><b>Likuiditas</b> — di bawah Rp1 M/hari, harga sulit naik dan Anda sulit keluar saat butuh jual.</li>
        <li><b>Posisi harga</b> — di mana harga dalam rentang 52 minggu? Dekat bawah = area beli, dekat atas = hati-hati.</li>
        <li><b>Reaksi hari ini</b> — hijau atau setidaknya bertahan. Jangan menangkap pisau jatuh.</li>
        <li><b>Jejak bandar</b> — ada broker/asing yang mengumpulkan? Cek Broker Stalker / Kraken Flow.</li>
        <li><b>Trading Plan</b> — sudah jelas zona entry, target, dan stop loss-nya? Kalau belum tahu di harga berapa Anda keluar, jangan masuk.</li>
        <li><b>Broker Flow</b> — di tab Detail Emiten, apakah garis net kumulatif broker menanjak konsisten, atau sudah mendatar/menurun? Garis berbalik turun = distribusi mulai jalan.</li>
        <li><b>Support &amp; Resistance</b> — jarak harga ke support (batas rugi) dan ke resistance (batas untung) menentukan apakah risk/reward masuk akal.</li>
      </ul>
      ${pndCallout(`Empat poin terakhir tersedia dalam satu layar di <b>Detail Emiten</b>. Itulah alasan langkah 4 di alur kerja di atas tidak boleh dilewati.`, "success")}
    `)}
  `));

  // ---------- 2. Skor vs Momentum ----------
  S.push(pndAcc("skor-momentum", "⚖️", "FundTech Score vs Momentum – Salah Paham Paling Umum", null, pndOpenState("skor-momentum", false), `
    ${pndCard("Skor hanyalah nilai FUNDAMENTAL + histori teknikal", "PENTING", "down", `
      <p><b>FundTech Score</b> (Fundamental 60 poin + Teknikal 40 poin) hanya menilai kesehatan &amp; kemurahan perusahaan — PER, PBV, ROE, DER, dan posisi harga historis dalam range 52 minggu. Skor ini <b>tidak tahu apa-apa</b> soal ke mana harga akan bergerak minggu ini akibat sentimen atau berita.</p>
      <p>Sebaliknya, emiten yang muncul di <b>BSJP</b>, <b>Smart Pick</b>, <b>Kraken Flow</b>, dan kolom <b>Bandarmologi</b> di Screener adalah emiten yang sedang <i>on trend</i>. Kenyataannya, emiten seperti ini sering bergerak tanpa dasar fundamental yang baik — yang menggerakkannya adalah momentum harga, volume, dan efek FOMO, bukan laporan keuangan.</p>
      ${pndCallout(`Jangan heran kalau ada saham berskor rendah (bahkan Danger Zone di Dashboard) tapi harganya terbang. Itu bukan bug — itu memang dua hal berbeda yang diukur.`, "warn")}
      ${pndCallout(`Kalau Anda masuk ke emiten on-trend berfundamental buruk, Anda sedang <b>ikut momentum, bukan berinvestasi</b>. Momentum bisa berhenti kapan saja tanpa aba-aba, dan tidak ada nilai fundamental yang menahan harga di bawah. Wajib punya stop loss, dan porsinya harus kecil.`, "danger")}
    `)}
    ${pndCard("Dua gaya, jangan dicampur", "RINGKASAN", "teal", `
      ${pndKv("INVESTASI", "Berpegang pada filter Screener (PER/PBV/ROE/DER) &amp; FundTech Score. Horizon bulanan–tahunan. Yang dibeli: perusahaannya.")}
      ${pndKv("MOMENTUM", "Berpegang pada Smart Pick, BSJP, Kraken Flow, Bandarmologi. Horizon harian–mingguan. Yang dibeli: pergerakannya. Wajib stop loss.")}
      ${pndCallout(`Boleh melakukan keduanya — tapi <b>pisahkan modalnya dan pisahkan catatannya</b> (misalnya lewat Backtest terpisah). Masalah muncul ketika seseorang membeli karena momentum, lalu saat rugi berpindah alasan menjadi "tidak apa-apa, ini investasi jangka panjang".`, "success")}
    `)}
  `));

  // ---------- 3. Smart Pick ----------
  S.push(pndAcc("smartpick", "✨", "Smart Pick – 5 Kategori", "Area Demand · Throwback · Bull Divergence · Early Breakout · Liquidity Sweep", pndOpenState("smartpick", false), `
    ${pndCard("Cara pakai", null, null, `
      ${pndStep(1, "Pilih kategori yang cocok dengan gaya Anda di tab Smart Pick.")}
      ${pndStep(2, "Buka detail kriteria tiap kartu untuk tahu persis filter &amp; cara scoring-nya.")}
      ${pndStep(3, "Klik saham mana pun di daftar untuk membuka Detail Emiten lengkapnya.")}
      ${pndCallout(`Jangan pakai kelima kategori sekaligus untuk memilih saham yang sama. Pilih satu yang sesuai karakter risiko Anda, dan konsisten selama beberapa minggu.`, "success")}
    `)}
    ${pndCard("Area Demand", "Paling Aman", "gold", `
      <p>Saham <b>tidak rugi</b> (NPM ≥ 0 &amp; ROE ≥ 0), volume besar, harga sedang di area support bawah. Ibarat beli barang bagus saat diskon.</p>
      <ul class="pnd-list">
        <li>Posisi ≤ 30% dari range 52 minggu (zona bawah)</li>
        <li>Nilai transaksi wajib ≥ Rp1 M/hari</li>
        <li>Harga ≥ Rp100 (menghindari saham gocap/mati suri)</li>
        <li>Range 52 minggu ≥ 15% (bukan saham datar tanpa pergerakan)</li>
        <li>Reaksi hari ini &gt; -4% (bertahan/memantul, bukan anjlok)</li>
      </ul>
    `)}
    ${pndCard("Throwback / Retest Breakout", "Tren Lanjutan", "teal", `
      <p>Sudah breakout dari uptrend menengah, lalu turun sebentar menguji area breakout sebagai support baru, sekarang mulai memantul lagi. Posisi 45–90% range 52W dengan perubahan hari ini ≥ 0%. Uptrend (MA21&gt;MA50&gt;MA100) dan kualitas retest jadi bonus skor, bukan syarat wajib.</p>
    `)}
    ${pndCard("Bull Divergence", "Risiko Sedang", "up", `
      <p>Harga masih di zona bawah (posisi &lt; 55% range 52W) tapi hari ini naik dengan volume tinggi — tanda tenaga jual mulai habis. Makin dekat ke low 52W, makin tinggi skornya.</p>
      ${pndCallout(`Titik balik sering gagal di percobaan pertama. Tunggu konfirmasi: candle hijau kuat disertai volume naik, jangan langsung all-in di percobaan bounce pertama.`, "warn")}
    `)}
    ${pndCard("Early Breakout", "Momentum", "up", `
      <p>Posisi harga &gt; 50% range 52W dan mulai menembus resistance dengan volume tinggi — ikut tren sebelum ramai. Makin dekat ke high 52W, makin tinggi skornya.</p>
      <p>Kalau masuk di kategori ini, <b>wajib punya stop loss</b> di bawah level breakout — early breakout yang gagal (fake breakout) turun cepat.</p>
    `)}
    ${pndCard("Liquidity Sweep", "Agresif", "muted", `
      <p>Harga sempat menyapu ke bawah titik terendah 52 minggu (memancing stop loss orang lain / stop hunt bandar), lalu berbalik naik tajam hari itu juga dengan volume besar.</p>
      ${pndCallout(`Kategori paling berisiko dari kelima Smart Pick. Lewati saja kalau Anda masih baru di dunia trading saham.`, "danger")}
    `)}
  `));

  // ---------- 4. Entry Price Scanner ----------
  S.push(pndAcc("eps", "🎯", "Entry Price Scanner", "Broker trap · konvergensi VWAP", pndOpenState("eps", false), `
    ${pndCard("Logika di baliknya", "Kunci", "teal", `
      <p>Setiap broker punya harga rata-rata beli (<b>VWAP Buy</b>) = total nilai beli ÷ total volume beli.</p>
      <p>Kalau harga sekarang <b>di bawah</b> rata-rata broker itu, broker tersebut sedang rugi. Broker yang rugi cenderung menahan atau menambah posisi, bukan menjual murah. Sebaliknya, kalau harga sudah jauh <b>di atas</b> rata-rata mereka, mereka sudah untung dan rawan ambil untung — saham seperti itu biasanya dilewatkan.</p>
      ${pndKv("NYANGKUT", "Harga di bawah VWAP bandar. Ada dorongan mempertahankan harga.")}
      ${pndKv("DI AREA", "Harga masih dalam ±3% dari VWAP. Level ini biasanya dijaga.")}
    `)}
    ${pndCard("Cara pakai", null, null, `
      ${pndStep(1, `Buka tab <b>Entry Price Scanner</b>, lalu klik "🔄 Scan Sekarang" untuk menarik data broker terbaru (hasil scan sebelumnya tetap tersimpan di cache).`)}
      ${pndStep(2, "Atur filter sesuai kebutuhan: Periode, Broker, Konvergensi, Tanjakan, Min Mutu/Akumulasi/Gap.")}
      ${pndStep(3, "Semua filter berjalan instan begitu diubah — hasil di tabel langsung menyesuaikan.")}
    `)}
    ${pndCard("Arti tiap filter", null, null, `
      ${pndKv("Periode", "Rentang data broker: 1 minggu / 2 minggu / 1 bulan (hari bursa).")}
      ${pndKv("Broker", "Asing, Lokal, atau Keduanya.")}
      ${pndKv("Konvergensi", "Menyatu = harga mendekati VWAP (bagus). Diam = stabil. Menjauh = harga menjauh.")}
      ${pndKv("Tanjakan 10H", "▲ Menanjak = akumulasi broker 10 hari terakhir naik terus. ⇈ Menyalip = harga menyeberang garis VWAP broker (dari di bawah jadi di atas rata-rata beli mereka).")}
      ${pndKv("Min Akumulasi", "Nilai akumulasi bersih (net buy) minimal dalam periode terpilih. Saham net-sell otomatis gugur.")}
      ${pndKv("Min Gap", "Ambang diskon dari VWAP — misal ≤ −5% berarti hanya saham dengan harga minimal 5% di bawah VWAP broker yang ditampilkan.")}
      ${pndKv("Urut", "Bisa digabung beberapa sekaligus. Kombinasi favorit: Terdekat VWAP + Tanjakan 10H.")}
      ${pndCallout(`Saham berharga di bawah ambang minimum dan sektor Properties &amp; Real Estate diblokir otomatis untuk mengurangi jebakan.`, "info")}
    `)}
  `));

  // ---------- 5. Broker Stalker & Target Bandar ----------
  S.push(pndAcc("broker-stalker", "🛰️", "Broker Stalker & Target Bandar – Lacak Bandar", "Dua mode, dua pertanyaan berbeda", pndOpenState("broker-stalker", false), `
    ${pndCard("Dua mode, dua pertanyaan berbeda", "Penting", "down", `
      ${pndKv("Lacak Saham", `"Emiten ini sedang dikumpulkan siapa?" — ini yang dipakai di langkah 3 alur kerja.`)}
      ${pndKv("Lacak Broker", `"Broker ini sedang pegang saham apa saja?" — untuk membuntuti satu broker favorit.`)}
    `)}
    ${pndCard("Mode Lacak Saham – verifikasi kandidat", "Tiap Hari", "teal", `
      ${pndStep(1, "Masukkan kode emiten yang Anda dapat dari Smart Pick / BSJP / Bandarmologi.")}
      ${pndStep(2, "Atur rentang tanggal — mulai dari 5–10 hari terakhir.")}
      ${pndStep(3, "Bandingkan Buy Lot vs Sell Lot dan lihat broker mana yang Dominan.")}
      ${pndStep(4, "Buka juga tab <b>Target Bandar</b> untuk kalkulator harga rata-rata bandar (avg beli + ATR14 → target R1/Max) dan ringkasan hit-rate-nya.")}
      ${pndCallout(`Kalau harga sekarang masih di bawah atau setara harga rata-rata broker yang akumulasi konsisten, posisi Anda relatif sejajar dengan mereka. Kalau harga sudah jauh di atas rata-rata mereka, Anda masuk lebih mahal daripada bandarnya.`, "success")}
    `)}
    ${pndCard("Mode Lacak Broker", null, null, `
      ${pndStep(1, "Masukkan kode broker (contoh: ZP, YP, AK, RX, dll).")}
      ${pndStep(2, "Lihat daftar saham dengan net beli/jual broker itu beserta Buy Lot dan Sell Lot-nya.")}
      ${pndCallout(`Broker konsisten membeli saham yang sama 3–5 hari berturut-turut = akumulasi terencana, bukan kebetulan. Broker asing yang akumulasi biasanya lebih menarik dipantau karena mengindikasikan dana institusional.`, "info")}
    `)}
  `));

  // ---------- 6. Kraken Flow ----------
  S.push(pndAcc("kraken", "⬢", "Kraken Flow (ORCA)", "Screener order-flow", pndOpenState("kraken", false), `
    ${pndCard("Cara pakai", "Penyaring", "gold", `
      ${pndStep(1, "Pilih minimal satu filter dari daftar parameter (bisa digabung).")}
      ${pndStep(2, "Atur durasi jendela agregasi (1–7 hari) dan batas kapitalisasi pasar bila perlu.")}
      ${pndStep(3, "Hasil langsung menampilkan Top 25 saham per filter — tidak perlu tombol scan terpisah.")}
      ${pndCallout(`Makin banyak filter digabung, makin sedikit dan makin selektif hasilnya. Kalau hasilnya kosong, kurangi filternya.`, "warn")}
    `)}
    ${pndCard("Arti tiap parameter", null, null, `
      ${pndKv("High Bid/Offer", "Antrian beli jauh lebih tebal dari antrian jual — ada yang menampung.")}
      ${pndKv("High ATS", "Average Trade Size besar = transaksi per eksekusi besar = pemain besar, bukan ritel.")}
      ${pndKv("No Sell", "Nyaris tidak ada tekanan jual pada periode itu (antrian jual kosong).")}
      ${pndKv("Close High", "Ditutup di harga tertinggi hari itu — tanda kekuatan.")}
      ${pndKv("High Non-Regular", "Banyak transaksi crossing/negosiasi di luar pasar reguler.")}
      ${pndKv("Top Volume / Frequency", "Top 25 saham paling ramai secara volume atau frekuensi transaksi.")}
      ${pndKv("Foreign +", "Asing net beli pada jendela waktu terpilih.")}
      ${pndKv("Offer's Slender", "Antrian jual menipis drastis — sedikit yang mau melepas barang.")}
    `)}
  `));

  // ---------- 7. BSJP ----------
  S.push(pndAcc("bsjp", "🌆", "BSJP – Beli Sore, Jual Pagi", "Strategi momentum & likuiditas", pndOpenState("bsjp", false), `
    ${pndCard("Strategi di baliknya", "Kunci", "teal", `
      <p>Entry di jendela <b>Pre-Closing/Post-Closing Auction (15:50–16:15 WIB)</b> pada saham yang menunjukkan akumulasi kuat sore hari, lalu exit di <b>liquidity surge pagi sesi berikutnya (09:00–09:30 WIB)</b>.</p>
      <p>Untuk lolos rekomendasi BSJP, saham harus lulus 8 kriteria deterministik di bawah, lalu diberi Skor Komposit 0–100 berdasarkan kekuatan tiap sinyal.</p>
    `)}
    ${pndCard("8 kriteria checklist BSJP", null, null, `
      <ul class="pnd-list">
        <li><b>Likuiditas</b> — Turnover ≥ ambang minimum yang diatur di parameter.</li>
        <li><b>Volume Spike</b> — Volume Ratio di atas ambang tertentu (dibanding rata-rata 20 hari).</li>
        <li><b>Range Harga</b> — Gain harian dalam rentang tertentu (hindari saham yang sudah ARA).</li>
        <li><b>Bullish Closing</b> — Close berada di persentase teratas dari range harga hari itu.</li>
        <li><b>Trend Alignment</b> — Close di atas EMA20 &amp; EMA50.</li>
        <li><b>Akumulasi Bandar</b> — Bandar Accumulation Proxy (CR3 / Net Asing).</li>
        <li><b>Kedalaman Orderbook</b> — Rasio Bid/Offer di atas ambang minimum.</li>
        <li><b>Bebas Notasi Khusus</b> — Tidak sedang kena notasi khusus / Papan Pemantauan Khusus.</li>
      </ul>
      ${pndCallout(`Kriteria yang datanya belum tersedia untuk suatu saham dihitung netral (tidak otomatis menggugurkan) — tapi makin banyak kriteria yang benar-benar lolos dengan data lengkap, makin meyakinkan sinyalnya. Semua threshold bisa Anda ubah sendiri lewat panel parameter di tab BSJP.`, "info")}
    `)}
  `));

  // ---------- 8. Detail Emiten ----------
  S.push(pndAcc("detail", "📊", "Detail Emiten (Terminal Analisa)", "9 tab dalam satu layar", pndOpenState("detail", false), `
    ${pndCard("Isi tiap tab", null, null, `
      ${pndKv("📊 Teknikal", "RSI, MACD, EMA, posisi &amp; perubahan 52 minggu, support/resistance.")}
      ${pndKv("💰 Fundamental", "PER, PBV, ROE, ROA, DER, NPM, dividend yield dengan penilaian bahasa Indonesia.")}
      ${pndKv("🐋 Bandarmologi (IDX)", "Proxy heuristik dari rasio volume terhadap rata-rata 20 hari, dikombinasikan arah harga.")}
      ${pndKv("🏦 Broker Summary", "Tabel broker beli/jual lengkap dan grafik Broker Flow — garis net kumulatif menanjak terus = akumulasi konsisten.")}
      ${pndKv("📅 Historical Data", "Riwayat harga &amp; volume harian saham ini.")}
      ${pndKv("🧠 Analisa", "Ringkasan otomatis dari Teknikal + Fundamental + Bandarmologi jadi satu kesimpulan singkat.")}
      ${pndKv("🤖 AI (Gemini)", "Analisis naratif dari AI berdasarkan data fundamental, RSI/MACD/EMA, dan momentum multi-timeframe — butuh API key gratis dari Google AI Studio.")}
      ${pndKv("⚖️ vs Sektor", "Perbandingan tiap metrik dengan rata-rata peer sesektor.")}
      ${pndKv("📋 Trading Plan", "Zona entry, target, stop loss, dan rasio risk/reward yang dihitung otomatis.")}
    `)}
    ${pndCard("Membaca Trading Plan", "Contoh", "teal", `
      <p>Misal tertulis: Zona entry <b>100–112</b>, Target <b>155</b>, Stop loss <b>94</b>, Risk/reward <b>1:3</b>.</p>
      <p>Artinya: beli di rentang 100–112. Kalau naik ke 155, untung sekitar 42%. Kalau turun ke 94, <b>keluar</b> dengan rugi sekitar 14%. Rasio 1:3 artinya potensi untung tiga kali lipat potensi rugi.</p>
      ${pndCallout(`Angka stop loss hanya berguna kalau Anda benar-benar mematuhinya. Trader pemula paling sering rugi besar bukan karena salah pilih saham, tapi karena menolak keluar saat sudah rugi.`, "danger")}
    `)}
    ${pndCard("Kalau tanggal broker terlihat lama", null, null, `
      <p>Data broker mengikuti <b>hari bursa terakhir</b> yang tersedia. Kalau Anda membuka saat akhir pekan atau hari libur, wajar tanggalnya mundur ke hari bursa sebelumnya.</p>
    `)}
  `));

  // ---------- 9. Checklist Sebelum Beli ----------
  S.push(pndAcc("checklist", "✅", "Checklist Sebelum Beli", null, pndOpenState("checklist", false), `
    ${pndCard("Centang satu per satu", "Simpan", "up", `
      ${pndCheck("Nilai transaksi harian ≥ Rp1 miliar?")}
      ${pndCheck("Perusahaan tidak sedang rugi (NPM &amp; ROE positif)?")}
      ${pndCheck("Harga di paruh bawah rentang 52 minggu, bukan sudah di puncak?")}
      ${pndCheck("Ada jejak akumulasi (asing / broker / bandar) di Broker Stalker atau Kraken Flow?")}
      ${pndCheck("Hari ini hijau atau setidaknya bertahan?")}
      ${pndCheck("Sudah tahu harga stop loss saya di angka berapa?")}
      ${pndCheck("Rasio risk/reward minimal 1:2?")}
      ${pndCheck("Nilai posisi ini masih wajar dibanding total modal saya?")}
      ${pndCheck("Tidak ada berita buruk terbaru soal emiten ini?")}
      ${pndCallout(`Kalau ada satu saja kotak yang belum tercentang, tidak apa-apa melewatkan saham itu. Selalu ada kesempatan berikutnya — modal yang habis jauh lebih sulit diganti. Centang tersimpan otomatis di perangkat ini.`, "success")}
    `)}
    ${pndCard("3 kesalahan pemula yang paling mahal", "Hindari", "down", `
      <ul class="pnd-list">
        <li><b>Beli karena skornya tinggi saja</b> — tanpa melihat chart, berita, dan likuiditasnya.</li>
        <li><b>Tidak punya stop loss</b> — lalu "menahan sampai balik modal" selama bertahun-tahun.</li>
        <li><b>Masuk terlalu besar di satu saham</b> — satu kesalahan langsung menghapus banyak keuntungan sebelumnya.</li>
      </ul>
    `)}
  `));

  // ---------- 10. Istilah Fundamental ----------
  S.push(pndAcc("istilah-fundamental", "📖", "Istilah Fundamental", null, pndOpenState("istilah-fundamental", false), `
    ${pndCard("PER (Price to Earnings Ratio)", null, null, `
      <p>Definisi: Harga saham dibagi Earnings Per Share (EPS). Berapa kali investor bersedia membayar per rupiah laba.</p>
      ${pndCallout(`Panduan baca: PER &lt;10x = murah · 10–20x = wajar · &gt;25x = premium. Bandingkan dengan rata-rata sektornya di tab vs Sektor.`, "info")}
    `)}
    ${pndCard("PBV (Price to Book Value)", null, null, `
      <p>Definisi: Harga saham dibagi nilai buku per saham. Apakah harga pasar di atas atau di bawah nilai aset bersih.</p>
      ${pndCallout(`Panduan baca: PBV &lt;1x = di bawah nilai aset · 1–3x = wajar · &gt;3x = premium (perlu ROE tinggi untuk dianggap wajar).`, "info")}
    `)}
    ${pndCard("ROE (Return on Equity)", null, null, `
      <p>Definisi: Laba bersih dibagi ekuitas. Efisiensi manajemen menggunakan modal investor untuk menghasilkan laba.</p>
      ${pndCallout(`Panduan baca: ROE &gt;15% = bagus · &gt;20% = sangat bagus · &lt;8% = lemah. Perhatikan konsistensinya dari tahun ke tahun.`, "info")}
    `)}
    ${pndCard("ROA (Return on Assets)", null, null, `
      <p>Definisi: Laba bersih dibagi total aset. Seberapa efisien perusahaan menggunakan seluruh asetnya.</p>
      ${pndCallout(`Panduan baca: ROA &gt;10% = sangat efisien · 5–10% = baik · &lt;5% = kurang efisien.`, "info")}
    `)}
    ${pndCard("NPM (Net Profit Margin)", null, null, `
      <p>Definisi: Laba bersih dibagi total pendapatan. Berapa persen dari setiap Rp1 penjualan yang menjadi laba bersih.</p>
      ${pndCallout(`Panduan baca: NPM &gt;15% = premium · 5–15% = normal · &lt;5% = tipis · &lt;0% = rugi.`, "info")}
    `)}
    ${pndCard("DER (Debt to Equity Ratio)", null, null, `
      <p>Definisi: Total utang dibagi ekuitas. Seberapa besar perusahaan menggunakan utang untuk membiayai operasinya.</p>
      ${pndCallout(`Panduan baca: DER &lt;1x = konservatif · 1–2x = moderat · &gt;2x = agresif. Sektor perbankan &amp; properti wajar punya DER tinggi.`, "info")}
    `)}
    ${pndCard("Market Cap (Kapitalisasi Pasar)", null, null, `
      <p>Definisi: Harga saham × jumlah saham beredar. Total nilai pasar seluruh perusahaan.</p>
      ${pndCallout(`Panduan baca: &gt;Rp10T = Big Cap · Rp1–10T = Mid Cap · &lt;Rp1T = Small Cap.`, "info")}
    `)}
  `));

  // ---------- 11. Indikator Teknikal ----------
  S.push(pndAcc("indikator-teknikal", "📈", "Indikator Teknikal", null, pndOpenState("indikator-teknikal", false), `
    ${pndCard("RSI (Relative Strength Index)", null, null, `
      <p>Definisi: Indikator momentum 0–100 yang mengukur kecepatan pergerakan harga.</p>
      ${pndCallout(`RSI &gt;70 = Overbought (potensi koreksi) · RSI &lt;30 = Oversold (potensi rebound) · 40–60 = netral.`, "info")}
    `)}
    ${pndCard("MACD", null, null, `
      <p>Definisi: Selisih EMA12 dan EMA26. Histogram positif = momentum naik, negatif = momentum turun.</p>
      ${pndCallout(`Bullish crossover = sinyal beli. Bearish crossover = sinyal jual.`, "info")}
    `)}
    ${pndCard("EMA (Exponential Moving Average)", null, null, `
      <p>Definisi: Rata-rata bergerak dengan bobot lebih besar pada harga terbaru.</p>
      ${pndCallout(`Harga di atas EMA21 &amp; EMA50 = bullish. Di bawah keduanya = bearish. Golden cross = EMA jangka pendek memotong EMA jangka panjang dari bawah.`, "info")}
    `)}
    ${pndCard("Posisi 52 Minggu", null, null, `
      <p>Definisi: Posisi harga sekarang dalam rentang harga tertinggi &amp; terendah 52 minggu terakhir, dinyatakan dalam persen (0% = di titik terendah, 100% = di titik tertinggi).</p>
      ${pndCallout(`Dipakai di hampir semua fitur pencari (Smart Pick, BSJP) sebagai penentu zona: dekat 0% = zona demand/support, dekat 100% = zona breakout/resistance.`, "info")}
    `)}
  `));

  // ---------- 12. Panduan Fitur (ringkasan semua tab) ----------
  S.push(pndAcc("panduan-fitur", "🗂️", "Panduan Fitur — Ringkasan Semua Tab", null, pndOpenState("panduan-fitur", false), `
    ${ABOUT_TAB_GUIDE.map(t => pndCard(`${t.icon} ${t.title}`, null, t.tone, `
      <p>${t.desc}</p>
      ${t.catatan ? pndCallout(`⚠️ ${t.catatan}`, "warn") : ""}
    `)).join("")}
  `));

  // ---------- 13. Sumber Data & Integrasi ----------
  S.push(pndAcc("integrasi", "🔌", "Sumber Data & Integrasi", null, pndOpenState("integrasi", false), `
    ${ABOUT_INTEGRATION_GUIDE.map(g => pndCard(g.title, null, g.tone, `<p>${g.desc}</p>`)).join("")}
  `));

  // ---------- 14. Disclaimer ----------
  S.push(pndAcc("disclaimer", "⚠️", "Disclaimer Penting", null, pndOpenState("disclaimer", false), `
    ${pndCard("Baca sebelum menggunakan data di aplikasi ini", null, "down", `
      <ul class="pnd-list">
        <li>IHSG Screener Pro adalah <b>alat bantu riset</b>, bukan penasihat investasi.</li>
        <li>Data teknikal &amp; fundamental bersumber dari Yahoo Finance (data publik); data broker/bandarmologi bergantung pada input manual atau token Stockbit milik Anda sendiri.</li>
        <li>FundTech Score dan seluruh sinyal (Smart Pick, BSJP, Kraken Flow) dihitung dari <b>data historis</b> — tidak menjamin performa masa depan.</li>
        <li>Investasi saham mengandung risiko. Selalu <b>DYOR</b> (Do Your Own Research) sebelum keputusan investasi.</li>
        <li>Keputusan beli/jual sepenuhnya tanggung jawab Anda sendiri.</li>
      </ul>
    `)}
  `));

  const jumpLinks = [
    ["mulai","🚀 Mulai"], ["skor-momentum","⚖️ Skor vs Momentum"], ["smartpick","✨ Smart Pick"],
    ["eps","🎯 EPS"], ["broker-stalker","🛰️ Broker Stalker"], ["kraken","⬢ Kraken Flow"],
    ["bsjp","🌆 BSJP"], ["detail","📊 Detail Emiten"], ["checklist","✅ Checklist"],
    ["istilah-fundamental","📖 Istilah"], ["indikator-teknikal","📈 Indikator"],
    ["panduan-fitur","🗂️ Semua Fitur"], ["disclaimer","⚠️ Disclaimer"]
  ].map(([id,label]) => `<a href="#pnd-${id}" data-pnd-jump="${id}">${label}</a>`).join("");

  return `
    ${PANDUAN_STYLES}
    <div class="panel panduan-hero" style="flex-direction:column;align-items:stretch;margin-bottom:20px;">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
        <span style="font-size:28px;">📖</span>
        <div>
          <h2 style="margin:0;font-size:18px;font-weight:700;">Panduan Lengkap</h2>
          <p style="margin:4px 0 0;font-size:12px;color:var(--muted);">IHSG Screener Pro — cara pakai tiap fitur, istilah, dan disclaimer</p>
        </div>
      </div>
      <p style="margin:0;font-size:13px;color:var(--text);line-height:1.6;">
        Klik tiap judul di bawah untuk membuka/menutup bagiannya. Ini <b>bukan nasihat/rekomendasi investasi</b> —
        semua sinyal &amp; skor di sini adalah alat bantu keputusan, keputusan akhir tetap di tangan Anda.
      </p>
    </div>
    <div class="pnd-jump">${jumpLinks}</div>
    <div class="pnd-wrap">${S.join("")}</div>
  `;
}

// ==========================================
// BROKER SUMMARY
//
// Menyimpan & menampilkan top 5 broker buy / top 5 broker sell per
// saham per tanggal. Sumber data: diketik manual atau ditempel dari
// CSV oleh pengguna, berdasarkan screenshot akun Stockbit MEREKA
// SENDIRI — bukan hasil scraping otomatis dari Stockbit. Disimpan ke
// tabel `broker_summary` di Supabase yang sama dengan tabel lain.
// ==========================================

// Status Normal/Akumulasi/Distribusi — dihitung dari SELISIH total
// value top 5 broker buy vs top 5 broker sell yang tersimpan (bukan
// dari total transaksi harian saham, karena kita hanya punya data top
// 5). Ambang batas 15% net dari total (buy+sell) dipilih supaya
// selisih kecil/wajar tetap dianggap "Normal" — sesuaikan angka
// BS_STATUS_THRESHOLD_PCT di bawah kalau mau lebih sensitif/longgar.
const BS_STATUS_THRESHOLD_PCT = 15;

function computeBsStatus(rows){
  const buyTotal = rows.filter(r=>r.side==="buy").reduce((a,r)=>a+(Number(r.value_idr)||0),0);
  const sellTotal = rows.filter(r=>r.side==="sell").reduce((a,r)=>a+(Number(r.value_idr)||0),0);
  const total = buyTotal + sellTotal;
  if(total <= 0) return { label:"-", tone:"muted", netPct:0, buyTotal, sellTotal, hasData:false };
  const netPct = ((buyTotal - sellTotal) / total) * 100;
  let label, tone;
  if(netPct >= BS_STATUS_THRESHOLD_PCT){ label = "Akumulasi"; tone = "up"; }
  else if(netPct <= -BS_STATUS_THRESHOLD_PCT){ label = "Distribusi"; tone = "down"; }
  else { label = "Normal"; tone = "gold"; }
  return { label, tone, netPct, buyTotal, sellTotal, hasData:true };
}

function bsStatusRowHtml(rows){
  const st = computeBsStatus(rows);
  if(!st.hasData) return "";
  const sign = st.netPct >= 0 ? "+" : "";
  return `
    <div style="display:flex;align-items:center;flex-wrap:wrap;gap:10px;margin:-4px 0 14px;">
      <span style="font-size:12.5px;color:var(--muted);">Status:</span>
      ${pillHtml(st.label, st.tone)}
      <span class="mono" style="font-size:11.5px;color:var(--muted);">
        Net ${sign}${st.netPct.toFixed(1)}% &middot; Buy ${fmtNum(st.buyTotal)} vs Sell ${fmtNum(st.sellTotal)}
      </span>
    </div>`;
}

function emptyBsRow(side, rank){ return { side, rank, broker_code:"", lot:"", value_idr:"" }; }

function renderBrokerSummary(){
  // Default Periode Dari–Sampai (dipakai kalau user belum pernah mengubahnya) —
  // meniru default lama "10 hari bursa terakhir" supaya perilaku awal tetap sama.
  if(!state.bsAutoBulkFrom || !state.bsAutoBulkTo){
    const defaultDates = tradingDaysBack(state.bsAutoBulkDays || 10);
    state.bsAutoBulkFrom = defaultDates[0];
    state.bsAutoBulkTo = defaultDates[defaultDates.length - 1];
  }
  const editRows = state.bsEditRows && state.bsEditRows.length ? state.bsEditRows : [];
  const buyEdit = [0,1,2,3,4].map(i => editRows.find(r=>r.side==="buy" && r.rank===i+1) || emptyBsRow("buy", i+1));
  const sellEdit = [0,1,2,3,4].map(i => editRows.find(r=>r.side==="sell" && r.rank===i+1) || emptyBsRow("sell", i+1));

  const editRowsHtml = (rows, label) => rows.map((r,i)=>`
    <div class="bs-row">
      <input class="bs-cell" id="bs${label}Broker${i}" placeholder="Kode" maxlength="6" style="text-transform:uppercase" value="${escapeHtml(r.broker_code||"")}">
      <input class="bs-cell" id="bs${label}Lot${i}" type="number" placeholder="Lot" value="${r.lot ?? ""}">
      <input class="bs-cell" id="bs${label}Value${i}" type="number" placeholder="Nilai (Rp)" value="${r.value_idr ?? ""}">
    </div>`).join("");

  const dRows = state.bsRows || [];
  const dBuy = dRows.filter(r=>r.side==="buy").sort((a,b)=>a.rank-b.rank);
  const dSell = dRows.filter(r=>r.side==="sell").sort((a,b)=>a.rank-b.rank);
  const maxVal = Math.max(1, ...dRows.map(r=> Number(r.value_idr)||0));
  const barHtml = (r, cls) => `
    <div class="bs-bar-row">
      <span class="bs-bar-broker mono">${escapeHtml(r.broker_code)}${r.investor_type ? ` <span style="font-size:9px;color:var(--muted);font-weight:400;">(${escapeHtml(r.investor_type)})</span>` : ""}</span>
      <div class="bs-bar-track"><div class="bs-bar-fill ${cls}" style="width:${(Number(r.value_idr)/maxVal)*100}%"></div></div>
      <span class="bs-bar-value mono">${fmtNum(r.value_idr)}</span>
    </div>`;

  const rangeMode = !!state.bsRangeMode;
  const modeToggle = `
    <div class="bs-mode-toggle" style="display:flex;gap:6px;">
      <button type="button" class="btn btn-outline" data-bs-period-mode="single" style="${!rangeMode?'background:var(--gold);color:#111;border-color:var(--gold);':''}">🗓️ Tanggal</button>
      <button type="button" class="btn btn-outline" data-bs-period-mode="range" style="${rangeMode?'background:var(--gold);color:#111;border-color:var(--gold);':''}">📊 Periode</button>
    </div>`;
  const dateInputs = rangeMode ? `
      <input id="bsDateFrom" class="bs-input" type="date" value="${state.bsDateFrom||""}" title="Dari tanggal">
      <span style="color:var(--muted);">–</span>
      <input id="bsDateTo" class="bs-input" type="date" value="${state.bsDateTo||""}" title="Sampai tanggal">
    ` : `<input id="bsDate" class="bs-input" type="date" value="${state.bsDate||""}">`;

  return `
    <div class="bs-wrap">
      <div class="bs-toolbar" style="flex-wrap:wrap;gap:8px;">
        <input id="bsStockCode" class="bs-input" placeholder="Kode saham (mis. BBCA)" maxlength="6" style="text-transform:uppercase" value="${escapeHtml(state.bsStockCode||"")}">
        ${modeToggle}
        ${dateInputs}
        <button class="btn btn-outline" id="bsLoadBtn" ${state.bsLoading?"disabled":""}>${state.bsLoading?"Memuat...":"Muat Data"}</button>
      </div>

      ${state.bsMsg ? `<div class="bs-msg ${state.bsMsgError?"bs-msg-error":"bs-msg-ok"}">${escapeHtml(state.bsMsg)}</div>` : ""}

      <div class="bs-auto-bulk-box" style="margin:14px 0; padding:12px; border:1px solid rgba(239,68,68,0.25); border-radius:10px; background:rgba(239,68,68,0.06);">
        <div class="bs-auto-bulk-inner" style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
          <div class="bs-auto-bulk-desc" style="font-size:12px; color:var(--muted); max-width:560px; line-height:1.5;">
            🔴 Tarik otomatis Top 5 Buy/Sell dari Stockbit untuk
            <b>${state.selectedForBacktest.size} saham yang dicentang</b> di tab 📋 Screener,
            untuk hari bursa dari <b>${escapeHtml(fmtDateID(state.bsAutoBulkFrom))}</b> sampai
            <b>${escapeHtml(fmtDateID(state.bsAutoBulkTo))}</b>
            <span class="bs-auto-bulk-desc-extra">(Senin&ndash;Jumat, libur bursa nasional otomatis dilewati).
            Hari yang datanya sudah ada di database otomatis dilewati (skip) — hanya hari yang belum ada
            dan hari bursa paling baru yang benar-benar ditarik ulang ke Stockbit.
            Butuh "Endpoint Broker Summary" &amp; Token terisi di ⚙️ Pengaturan. Hasil otomatis disimpan
            langsung ke database yang sama seperti input manual di bawah.</span>
          </div>
          <div class="bs-auto-bulk-controls" style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
            <label style="font-size:11.5px; color:var(--muted); display:flex; align-items:center; gap:6px; white-space:nowrap;">
              Dari
              <input type="date" id="bsAutoBulkFromInput"
                value="${state.bsAutoBulkFrom||""}"
                ${state.stockbitBrokerBulkLoading ? "disabled" : ""}
                style="padding:6px 8px; border-radius:8px; border:1px solid var(--border); background:var(--bg2,#0f1420); color:var(--text,#fff); font-size:12px;">
            </label>
            <label style="font-size:11.5px; color:var(--muted); display:flex; align-items:center; gap:6px; white-space:nowrap;">
              Sampai
              <input type="date" id="bsAutoBulkToInput"
                value="${state.bsAutoBulkTo||""}"
                ${state.stockbitBrokerBulkLoading ? "disabled" : ""}
                style="padding:6px 8px; border-radius:8px; border:1px solid var(--border); background:var(--bg2,#0f1420); color:var(--text,#fff); font-size:12px;">
            </label>
            <button type="button" class="btn btn-outline bs-auto-bulk-btn" id="bsAutoBulkBtn"
              ${state.stockbitBrokerBulkLoading || state.selectedForBacktest.size===0 ? "disabled" : ""}
              style="color:#f87171;border-color:rgba(239,68,68,0.4);white-space:nowrap;"
              title="${state.selectedForBacktest.size===0 ? 'Centang minimal 1 saham di tab Screener dulu' : ''}">
              ${state.stockbitBrokerBulkLoading
                ? `Menarik ${state.stockbitBrokerBulkProgress?.done||0}/${state.stockbitBrokerBulkProgress?.total||0}...`
                : `Tarik Otomatis (${state.selectedForBacktest.size} dicentang)`}
            </button>
          </div>
        </div>
        ${state.stockbitBrokerBulkResults && state.stockbitBrokerBulkResults.length ? `
          <details class="bs-bulk-results-panel" id="bsBulkResultsPanel" ${state.bsBulkResultsOpen?"open":""} style="margin-top:10px;">
            <summary style="cursor:pointer; font-size:11.5px; color:var(--muted); list-style:none; display:flex; align-items:center; gap:6px; user-select:none;">
              <span class="bs-bulk-results-arrow" style="display:inline-block; transition:transform .15s; transform:rotate(${state.bsBulkResultsOpen?90:0}deg);">▶</span>
              Hasil (${state.stockbitBrokerBulkResults.length} saham)
            </summary>
            <div class="bs-result-list mono" style="margin-top:8px; max-height:220px; overflow-y:auto; font-size:11.5px;">
              ${state.stockbitBrokerBulkResults.map(r => `
                <div class="bs-result-line" style="padding:4px 0; border-bottom:1px solid var(--border); color:${r.ok ? 'var(--up)' : 'var(--down)'};">
                  ${r.ok ? '✅' : '❌'} ${escapeHtml(r.ticker)} &middot; ${escapeHtml(r.date)} — ${escapeHtml(r.msg||"")}
                </div>`).join("")}
            </div>
          </details>` : ""}
      </div>

      ${rangeMode ? renderBrokerSummaryRangeBody() : `
      ${bsStatusRowHtml(dRows)}

      <div class="bs-display-grid">
        <div>
          <div class="bs-col-title bs-buy">Top 5 Buy</div>
          ${dBuy.length ? dBuy.map(r=>barHtml(r,"bs-fill-buy")).join("") : `<div class="empty-box" style="padding:16px;font-size:12px;">Belum ada data untuk saham/tanggal ini.</div>`}
        </div>
        <div>
          <div class="bs-col-title bs-sell">Top 5 Sell</div>
          ${dSell.length ? dSell.map(r=>barHtml(r,"bs-fill-sell")).join("") : `<div class="empty-box" style="padding:16px;font-size:12px;">Belum ada data untuk saham/tanggal ini.</div>`}
        </div>
      </div>

      <details class="bs-editor-panel" id="bsEditorPanel" ${state.bsEditorOpen?"open":""}>
        <summary>✏️ Input / Edit Manual (dari screenshot Stockbit Anda)</summary>
        <div class="bs-editor-grid">
          <div>
            <div class="bs-col-title bs-buy">Top 5 Buy</div>
            <div class="bs-header-row"><span>Broker</span><span>Lot</span><span>Nilai (Rp)</span></div>
            ${editRowsHtml(buyEdit,"Buy")}
          </div>
          <div>
            <div class="bs-col-title bs-sell">Top 5 Sell</div>
            <div class="bs-header-row"><span>Broker</span><span>Lot</span><span>Nilai (Rp)</span></div>
            ${editRowsHtml(sellEdit,"Sell")}
          </div>
        </div>
        <div class="bs-toolbar" style="margin-top:12px;">
          <button class="btn btn-primary" id="bsSaveBtn">Simpan ke Database</button>
        </div>
        <div class="bs-csv-panel">
          <label>Atau tempel CSV (format per baris: side,rank,broker_code,lot,value_idr)</label>
          <textarea id="bsCsvInput" rows="6" placeholder="buy,1,YP,1200000,45000000000">${escapeHtml(state.bsCsvText||"")}</textarea>
          <button class="btn btn-outline" id="bsCsvFillBtn">Isi ke Form dari CSV</button>
        </div>
      </details>`}
    </div>`;
}

// Mode periode (rentang tanggal) tab Broker Summary utama — sama polanya
// dengan renderDetailBrokerSummaryRangeBody() di modal Detail Emiten, cuma
// dipisah karena state-nya beda (bs* vs detailBs*) dan tab ini tidak
// terkunci ke satu ticker (kode saham diisi manual di toolbar).
function renderBrokerSummaryRangeBody(){
  const agg = state.bsRangeAgg || { buy: [], sell: [] };
  const allVals = [...agg.buy, ...agg.sell].map(r => Number(r.value_idr) || 0);
  const maxVal = Math.max(1, ...allVals);
  const barHtml = (r, cls) => `
    <div class="bs-bar-row">
      <span class="bs-bar-broker mono">${escapeHtml(r.broker_code)}${r.investor_type ? ` <span style="font-size:9px;color:var(--muted);font-weight:400;">(${escapeHtml(r.investor_type)})</span>` : ""}</span>
      <div class="bs-bar-track"><div class="bs-bar-fill ${cls}" style="width:${(Number(r.value_idr)/maxVal)*100}%"></div></div>
      <span class="bs-bar-value mono">${fmtNum(r.value_idr)} <span style="color:var(--muted);font-size:10px;">· ${r.days}h</span></span>
    </div>`;

  return `
      <div class="bs-display-grid">
        <div>
          <div class="bs-col-title bs-buy">Top 5 Buy (akumulasi periode)</div>
          ${agg.buy.length ? agg.buy.map(r=>barHtml(r,"bs-fill-buy")).join("") : `<div class="empty-box" style="padding:16px;font-size:12px;">Belum ada data untuk saham/periode ini.</div>`}
        </div>
        <div>
          <div class="bs-col-title bs-sell">Top 5 Sell (akumulasi periode)</div>
          ${agg.sell.length ? agg.sell.map(r=>barHtml(r,"bs-fill-sell")).join("") : `<div class="empty-box" style="padding:16px;font-size:12px;">Belum ada data untuk saham/periode ini.</div>`}
        </div>
      </div>
      <div style="font-size:10.5px;color:var(--muted);margin-top:10px;">
        Nilai = total akumulasi Lot/Nilai broker tsb selama periode yang dipilih (bukan rata-rata harian). "h" = jumlah hari broker itu masuk Top 5 pada rentang ini. Mode Periode hanya untuk melihat ringkasan — untuk input/edit data manual per hari, beralih ke mode 🗓️ Tanggal.
      </div>`;
}

async function loadBrokerSummary(){
  if(!SUPABASE_URL || !SUPABASE_KEY){ openSettings(); return; }
  if(state.bsRangeMode) return loadBrokerSummaryRange();

  const codeEl = document.getElementById("bsStockCode");
  const dateEl = document.getElementById("bsDate");
  const code = (codeEl?.value||"").trim().toUpperCase();
  const date = dateEl?.value||"";
  state.bsStockCode = code; state.bsDate = date;
  if(!code || !date){ state.bsMsg = "Isi kode saham dan tanggal dulu."; state.bsMsgError = true; render(); return; }

  state.bsLoading = true; state.bsMsg = ""; render();
  try {
    const qs = new URLSearchParams({ stock_code: `eq.${code}`, trade_date: `eq.${date}`, order: "side.asc,rank.asc" });
    const res = await fetch(`${SUPABASE_URL}/broker_summary?${qs}`, { headers: getSupaHeaders(), cache: "no-store" });
    if(!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    const rows = await res.json();
    state.bsRows = rows;
    state.bsEditRows = rows.map(r=>({ side:r.side, rank:r.rank, broker_code:r.broker_code, lot:r.lot, value_idr:r.value_idr }));
    state.bsMsg = rows.length ? `Menampilkan ${rows.length} baris.` : "Belum ada data untuk saham/tanggal ini.";
    state.bsMsgError = false;
  } catch(e) {
    state.bsMsg = "Gagal memuat: " + e.message;
    state.bsMsgError = true;
  }
  state.bsLoading = false;
  render();
}

// Mode periode untuk tab Broker Summary utama — polanya sama dengan
// loadDetailBrokerSummaryRange() di modal Detail Emiten: tarik semua baris
// broker_summary ticker ini di rentang Dari–Sampai (dua filter trade_date
// lewat URLSearchParams.append supaya PostgREST membacanya AND: gte + lte),
// lalu jumlahkan Lot/Nilai per broker+side lintas hari untuk Top 5 akumulasi.
async function loadBrokerSummaryRange(){
  const codeEl = document.getElementById("bsStockCode");
  const fromEl = document.getElementById("bsDateFrom");
  const toEl = document.getElementById("bsDateTo");
  const code = (codeEl?.value || state.bsStockCode || "").trim().toUpperCase();
  const from = fromEl?.value || state.bsDateFrom || "";
  const to = toEl?.value || state.bsDateTo || "";
  state.bsStockCode = code; state.bsDateFrom = from; state.bsDateTo = to;

  if(!code || !from || !to){ state.bsMsg = 'Isi kode saham dan tanggal "Dari"/"Sampai" dulu.'; state.bsMsgError = true; render(); return; }
  if(from > to){ state.bsMsg = 'Tanggal "Dari" harus sebelum atau sama dengan "Sampai".'; state.bsMsgError = true; render(); return; }

  state.bsLoading = true; state.bsMsg = ""; render();
  try {
    const qs = new URLSearchParams();
    qs.append("stock_code", `eq.${code}`);
    qs.append("trade_date", `gte.${from}`);
    qs.append("trade_date", `lte.${to}`);
    qs.append("order", "trade_date.asc,side.asc,rank.asc");
    const res = await fetch(`${SUPABASE_URL}/broker_summary?${qs.toString()}`, { headers: getSupaHeaders(), cache: "no-store" });
    if(!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    const rows = await res.json();

    if(!rows.length){
      state.bsRangeAgg = { buy: [], sell: [] };
      state.bsRangeDatesCount = 0;
      state.bsMsg = `Belum ada data broker summary untuk ${code} pada periode ${from} s/d ${to}.`;
      state.bsMsgError = true;
    } else {
      const datesSet = new Set(rows.map(r=>r.trade_date));
      const agg = {};
      rows.forEach(r=>{
        const key = r.side + "|" + r.broker_code;
        if(!agg[key]) agg[key] = { side: r.side, broker_code: r.broker_code, lot: 0, value_idr: 0, days: 0, investor_type: r.investor_type || null };
        agg[key].lot += Number(r.lot) || 0;
        agg[key].value_idr += Number(r.value_idr) || 0;
        agg[key].days += 1;
        if(!agg[key].investor_type && r.investor_type) agg[key].investor_type = r.investor_type;
      });
      const aggArr = Object.values(agg);
      const buy = aggArr.filter(a=>a.side==="buy").sort((a,b)=>b.value_idr-a.value_idr).slice(0,5);
      const sell = aggArr.filter(a=>a.side==="sell").sort((a,b)=>b.value_idr-a.value_idr).slice(0,5);
      state.bsRangeAgg = { buy, sell };
      state.bsRangeDatesCount = datesSet.size;
      state.bsMsg = `Menampilkan agregasi ${rows.length} baris dari ${datesSet.size} hari trading (${from} s/d ${to}).`;
      state.bsMsgError = false;
    }
  } catch(e) {
    state.bsMsg = "Gagal memuat: " + e.message;
    state.bsMsgError = true;
    state.bsRangeAgg = { buy: [], sell: [] };
  }
  state.bsLoading = false;
  render();
}

function readBsEditorRows(side, code, date){
  const label = side === "buy" ? "Buy" : "Sell";
  const rows = [];
  for(let i=0;i<5;i++){
    const brokerEl = document.getElementById(`bs${label}Broker${i}`);
    const lotEl = document.getElementById(`bs${label}Lot${i}`);
    const valEl = document.getElementById(`bs${label}Value${i}`);
    const broker_code = (brokerEl?.value||"").trim().toUpperCase();
    const value_idr = valEl?.value;
    if(!broker_code || !value_idr) continue; // lewati baris kosong
    const lot = lotEl?.value ? Number(lotEl.value) : null;
    rows.push({
      stock_code: code, trade_date: date, side, rank: i+1,
      broker_code, lot,
      value_idr: Number(value_idr),
      avg_price: calcAvgPrice(value_idr, lot)
    });
  }
  return rows;
}

async function saveBrokerSummaryRows(){
  const code = state.bsStockCode || (document.getElementById("bsStockCode")?.value||"").trim().toUpperCase();
  const date = state.bsDate || document.getElementById("bsDate")?.value;
  if(!code || !date){ state.bsMsg = "Isi kode saham dan tanggal dulu."; state.bsMsgError = true; render(); return; }
  if(!SUPABASE_URL || !SUPABASE_KEY){ openSettings(); return; }

  const rows = [...readBsEditorRows("buy", code, date), ...readBsEditorRows("sell", code, date)];
  if(!rows.length){ state.bsMsg = "Belum ada baris terisi."; state.bsMsgError = true; render(); return; }

  try {
    await supaFetch(`${SUPABASE_URL}/broker_summary?on_conflict=stock_code,trade_date,side,rank`, {
      method: "POST",
      headers: { ...getSupaHeaders(), "Prefer": "resolution=merge-duplicates,return=representation" },
      body: JSON.stringify(rows)
    });
    state.bsMsg = `Tersimpan ${rows.length} baris.`;
    state.bsMsgError = false;
    state.bsEditorOpen = true;
    render();
    loadBrokerSummary();
  } catch(e) {
    state.bsMsg = "Gagal menyimpan: " + e.message;
    state.bsMsgError = true;
    render();
  }
}

function fillBsFromCsv(){
  const textEl = document.getElementById("bsCsvInput");
  const text = textEl?.value || "";
  state.bsCsvText = text;
  try {
    const lines = text.trim().split("\n").filter(Boolean);
    const rows = lines.map(line=>{
      const [side, rank, broker_code, lot, value_idr] = line.split(",").map(s=>s.trim());
      if(side!=="buy" && side!=="sell") throw new Error(`side harus 'buy'/'sell', dapat: "${side}"`);
      return {
        side, rank: Number(rank),
        broker_code: (broker_code||"").toUpperCase(),
        lot: lot ? Number(lot) : null,
        value_idr: Number(value_idr)
      };
    });
    state.bsEditRows = rows;
    state.bsEditorOpen = true;
    state.bsMsg = "CSV berhasil dibaca ke form. Cek lagi lalu klik Simpan.";
    state.bsMsgError = false;
  } catch(e) {
    state.bsMsg = "Format CSV tidak valid: " + e.message;
    state.bsMsgError = true;
  }
  render();
}

// ==========================================
// TARGET BANDAR — dibangun di atas tabel broker_summary yang sudah ada.
//
// PENTING (baca ini dulu): formula di bawah adalah HEURISTIK yang kami
// rancang sendiri berdasarkan data yang tersedia di app ini (Avg Bandar
// dari broker_summary + ATR14 dari stocks_screener + histori close dari
// flows). ITU BUKAN replikasi rumus rahasia aplikasi Adimology (kami
// tidak pernah melihat source code perhitungan mereka) dan BUKAN
// jaminan harga akan benar-benar tercapai — anggap sebagai alat bantu,
// bukan rekomendasi investasi. Semua konstanta (ATR_MULT_R1,
// ATR_MULT_MAX, dst) sengaja dijadikan variabel supaya gampang
// disesuaikan sendiri.
// ==========================================

const TB_ATR_MULT_R1 = 1;    // Target R1 = Avg Bandar + 1x ATR14
const TB_ATR_MULT_MAX = 2;   // Target Max = Avg Bandar + 2x ATR14
const TB_ATR_FALLBACK_PCT = 0.03; // kalau ATR14 kosong, pakai 3% dari Avg Bandar (selaras dg fallback SL di detail modal)
const TB_HIT_HORIZON_DAYS = 20;   // batas hari bursa untuk menilai "belum tercapai" vs "masih berjalan"

// Kelompokkan baris broker_summary (buy+sell, beberapa tanggal) per kode
// broker, lalu klasifikasikan relatif terhadap broker LAIN di jendela
// waktu & saham yang sama (bukan angka Rupiah absolut — skala transaksi
// saham blue-chip vs saham kecil bisa beda jauh).
function aggregateTopBandar(rows){
  const byBroker = {};
  rows.forEach(r=>{
    const code = (r.broker_code||"").trim();
    if(!code) return;
    if(!byBroker[code]) byBroker[code] = { broker_code: code, buyValue:0, sellValue:0, days: new Set() };
    const val = Number(r.value_idr)||0;
    if(r.side === "buy") byBroker[code].buyValue += val;
    else if(r.side === "sell") byBroker[code].sellValue += val;
    byBroker[code].days.add(r.trade_date);
  });

  const totalWindowDays = new Set(rows.map(r=>r.trade_date)).size || 1;

  const list = Object.values(byBroker).map(b=>{
    const netValue = b.buyValue - b.sellValue;
    const totalValue = b.buyValue + b.sellValue;
    const daysAppeared = b.days.size;
    return {
      broker_code: b.broker_code, buyValue: b.buyValue, sellValue: b.sellValue,
      netValue, totalValue, daysAppeared,
      avgPerAppearance: daysAppeared ? totalValue/daysAppeared : 0
    };
  });

  const sortedAvg = list.map(b=>b.avgPerAppearance).sort((a,b)=>a-b);
  const pctile = (p) => sortedAvg.length ? sortedAvg[Math.min(sortedAvg.length-1, Math.floor(p*sortedAvg.length))] : 0;
  const p80 = pctile(0.8), p40 = pctile(0.4);

  list.forEach(b=>{
    const freqRatio = b.daysAppeared / totalWindowDays;
    const consistentDirection = b.totalValue > 0 && (Math.abs(b.netValue)/b.totalValue) >= 0.6;
    if(b.avgPerAppearance > 0 && b.avgPerAppearance >= p80){
      b.type = "Whale"; b.typeIcon = "🐋"; b.typeTone = "gold";
    } else if(freqRatio >= 0.5 && consistentDirection){
      b.type = "Smart Money"; b.typeIcon = "🧠"; b.typeTone = "up";
    } else if(b.avgPerAppearance <= p40){
      b.type = "Ritel"; b.typeIcon = "🐣"; b.typeTone = "muted";
    } else {
      b.type = "Mix"; b.typeIcon = "➖"; b.typeTone = "teal";
    }
  });

  list.sort((a,b)=> Math.abs(b.netValue) - Math.abs(a.netValue));
  return { top5: list.slice(0,5), totalWindowDays };
}

// Avg Bandar = harga beli rata-rata tertimbang dari Top 5 Buy. Sebelumnya
// fungsi ini HANYA mengecek tanggal PALING BARU di rows — kalau tanggal itu
// datang dari Tarik Otomatis (skema baru Stockbit yang cuma mengembalikan
// "amount" sebagai NILAI transaksi, bukan lot/volume — lihat catatan di
// parseStockbitMarketDetector), kolom Lot-nya kosong dan perhitungan gagal
// total meski ada baris Lot terisi di tanggal2 lain (mis. hasil input manual
// sebelumnya). Sekarang: telusuri MUNDUR dari tanggal buy paling baru, pakai
// tanggal PERTAMA yang baris Top Buy-nya punya Lot terisi. Kalau memang tidak
// ada satu pun tanggal dengan Lot terisi, kembalikan null — pemanggil
// (loadTargetWindow) akan coba fallback lain (estimateAvgBandarFromClosePrice).
function computeAvgBandarBuyPrice(rows){
  if(!rows.length) return null;
  const buyDatesDesc = [...new Set(rows.filter(r=>r.side==="buy").map(r=>r.trade_date))].sort().reverse();
  for(const d of buyDatesDesc){
    const buyRows = rows.filter(r=> r.side==="buy" && r.trade_date===d && Number(r.lot)>0);
    if(!buyRows.length) continue;
    const totalValue = buyRows.reduce((a,r)=>a+(Number(r.value_idr)||0), 0);
    const totalShares = buyRows.reduce((a,r)=>a+(Number(r.lot)||0)*100, 0); // 1 lot = 100 lembar
    if(!totalShares) continue;
    return { avgPrice: totalValue/totalShares, latestDate: d, buyRowsCount: buyRows.length, isEstimate: false };
  }
  return null; // tidak ada satu pun tanggal buy dengan Lot terisi
}

// FALLBACK kalau TIDAK ADA satu pun baris broker_summary dengan "Lot" terisi
// — kasus paling umum untuk data hasil Tarik Otomatis (lihat komentar di
// computeAvgBandarBuyPrice). Tanpa Lot, harga rata-rata tertimbang per lembar
// memang tidak bisa dihitung dari broker_summary saja. Sebagai proksi, pakai
// harga PENUTUPAN pasar pada tanggal Top Buy paling baru (price_history_stockbit
// dulu, fallback ke tabel `flows`) — asumsi broker top buy hari itu bertransaksi
// di kisaran harga pasar hari itu. Ini ESTIMASI (avgPrice.isEstimate = true),
// BUKAN harga rata-rata tertimbang broker yang sesungguhnya — wajib ditandai
// jelas di UI, bukan disamarkan seolah-olah hasil hitungan presisi.
async function estimateAvgBandarFromClosePrice(code, rows){
  const buyDates = [...new Set(rows.filter(r=>r.side==="buy").map(r=>r.trade_date))].sort().reverse();
  if(!buyDates.length) return null;
  const latestDate = buyDates[0];
  const buyRowsCount = rows.filter(r=>r.side==="buy" && r.trade_date===latestDate).length;

  try{
    const qs1 = new URLSearchParams({ stock_code:`eq.${code}`, period:"eq.daily", trade_date:`eq.${latestDate}`, select:"close" });
    const res1 = await fetch(`${SUPABASE_URL}/price_history_stockbit?${qs1}`, { headers:getSupaHeaders(), cache:"no-store" });
    if(res1.ok){
      const d1 = await res1.json();
      if(d1.length && d1[0].close != null){
        return { avgPrice: Number(d1[0].close), latestDate, buyRowsCount, isEstimate:true, estimateSource:"price_history_stockbit" };
      }
    }
  }catch(e){ /* coba fallback berikutnya */ }

  try{
    const qs2 = new URLSearchParams({ ticker:`eq.${code}`, date:`eq.${latestDate}`, select:"close" });
    const res2 = await fetch(`${SUPABASE_URL}/flows?${qs2}`, { headers:getSupaHeaders(), cache:"no-store" });
    if(res2.ok){
      const d2 = await res2.json();
      if(d2.length && d2[0].close != null){
        return { avgPrice: Number(d2[0].close), latestDate, buyRowsCount, isEstimate:true, estimateSource:"flows" };
      }
    }
  }catch(e){ /* tidak ada fallback lagi */ }

  return null;
}

function computeTargetLevels(avgBandarPrice, atr14){
  const hasAtr = atr14 !== null && atr14 !== undefined && atr14 > 0;
  const atr = hasAtr ? atr14 : avgBandarPrice * TB_ATR_FALLBACK_PCT;
  return {
    r1: avgBandarPrice + atr * TB_ATR_MULT_R1,
    max: avgBandarPrice + atr * TB_ATR_MULT_MAX,
    atrUsed: atr,
    atrIsFallback: !hasAtr
  };
}

async function loadTargetWindow(){
  const codeEl = document.getElementById("tbStockCode");
  const winEl = document.getElementById("tbWindowDays");
  const code = (codeEl?.value || state.targetStockCode || "").trim().toUpperCase();
  const windowDays = Number(winEl?.value || state.targetWindowDays || 20) || 20;
  state.targetStockCode = code; state.targetWindowDays = windowDays;
  if(!code){ state.targetMsg = "Isi kode saham dulu."; state.targetMsgError = true; render(); return; }
  if(!SUPABASE_URL || !SUPABASE_KEY){ openSettings(); return; }

  state.targetLoading = true; state.targetMsg = ""; render();
  try{
    const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - windowDays);
    const cutoffStr = toLocalISODate(cutoff);
    const qs = new URLSearchParams({
      stock_code: `eq.${code}`, trade_date: `gte.${cutoffStr}`,
      order: "trade_date.asc,side.asc,rank.asc"
    });
    const res = await fetch(`${SUPABASE_URL}/broker_summary?${qs}`, { headers: getSupaHeaders(), cache: "no-store" });
    if(!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    const rows = await res.json();
    if(rows.message) throw new Error(rows.message);
    state.targetBandarRows = rows;

    if(rows.length){
      const agg = aggregateTopBandar(rows);
      state.targetTopBandar = agg.top5;
      state.targetWindowActualDays = agg.totalWindowDays;

      const avgRes = computeAvgBandarBuyPrice(rows) || await estimateAvgBandarFromClosePrice(code, rows);
      state.targetAvgBandar = avgRes;

      const s = enriched().find(x=>x.ticker===code);
      state.targetCurrentPrice = s ? s.cClose : null;
      state.targetAtr14 = s ? s.atr14 : null;

      state.targetLevels = avgRes ? computeTargetLevels(avgRes.avgPrice, state.targetAtr14) : null;

      state.targetMsg = !avgRes
        ? `Ditemukan ${rows.length} baris, tapi tidak ada baris Top Buy dengan kolom "Lot" terisi, dan harga penutupan tanggal Top Buy terbaru juga tidak ditemukan di database (price_history_stockbit / flows) — Avg Bandar tidak bisa dihitung. Lengkapi Lot manual di tab Broker Summary, atau tarik Historical Data untuk saham ini dulu.`
        : avgRes.isEstimate
          ? `Ditemukan ${rows.length} baris dalam ${agg.totalWindowDays} hari bursa. Kolom "Lot" kosong di semua baris Top Buy (lazim untuk data hasil Tarik Otomatis Stockbit) — Avg Bandar diESTIMASI dari harga penutupan tanggal ${avgRes.latestDate} (sumber: ${avgRes.estimateSource === "flows" ? "tabel flows/IDX" : "price_history_stockbit"}), bukan rata-rata tertimbang broker sesungguhnya. Isi Lot manual di tab Broker Summary untuk hasil yang lebih akurat.`
          : `Ditemukan ${rows.length} baris dalam ${agg.totalWindowDays} hari bursa dengan data.`;
      state.targetMsgError = !avgRes;
    } else {
      state.targetTopBandar = []; state.targetAvgBandar = null; state.targetLevels = null;
      state.targetMsg = "Belum ada data broker_summary untuk saham/periode ini. Isi dulu di tab 📊 Broker Summary.";
      state.targetMsgError = true;
    }
  } catch(e){
    state.targetMsg = "Gagal memuat: " + e.message;
    state.targetMsgError = true;
  }
  state.targetLoading = false;
  render();
}

async function saveTargetCalculation(){
  const code = state.targetStockCode;
  if(!code || !state.targetLevels || !state.targetAvgBandar){
    state.targetMsg = "Muat data dulu (perlu Avg Bandar & Target berhasil dihitung).";
    state.targetMsgError = true; render(); return;
  }
  if(!SUPABASE_URL || !SUPABASE_KEY){ openSettings(); return; }

  const today = todayLocalISO();
  const payload = {
    stock_code: code, calc_date: today, window_days: state.targetWindowDays,
    avg_bandar_price: state.targetAvgBandar.avgPrice,
    target_r1: state.targetLevels.r1, target_max: state.targetLevels.max,
    price_at_calc: state.targetCurrentPrice, atr14_at_calc: state.targetAtr14
  };
  try{
    await supaFetch(`${SUPABASE_URL}/target_calculations?on_conflict=stock_code,calc_date`, {
      method: "POST",
      headers: { ...getSupaHeaders(), "Prefer": "resolution=merge-duplicates,return=representation" },
      body: JSON.stringify(payload)
    });
    state.targetMsg = "Perhitungan hari ini tersimpan ke riwayat (Summary & Performance).";
    state.targetMsgError = false;
    render();
    loadTargetHistory();
  } catch(e){
    state.targetMsg = "Gagal menyimpan (jalankan dulu SQL migration 05_target_bandar.sql?): " + e.message;
    state.targetMsgError = true;
    render();
  }
}

// Muat riwayat kalkulasi + cek hit-rate terhadap histori close ASLI di
// tabel `flows`. Flows di-fetch SEKALI per ticker unik (bukan per baris
// riwayat) supaya jumlah request tetap kecil.
async function loadTargetHistory(){
  if(!SUPABASE_URL || !SUPABASE_KEY){ openSettings(); return; }
  state.targetHistoryLoading = true; render();
  try{
    const qs = new URLSearchParams({ order: "calc_date.desc" });
    if(state.targetSummaryScope === "ticker" && state.targetStockCode){
      qs.set("stock_code", `eq.${state.targetStockCode}`);
    }
    const res = await fetch(`${SUPABASE_URL}/target_calculations?${qs}`, { headers: getSupaHeaders(), cache: "no-store" });
    if(!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    const rows = await res.json();
    if(rows.message) throw new Error(rows.message);

    const tickers = [...new Set(rows.map(r=>r.stock_code))];
    const flowsByTicker = {};
    await Promise.all(tickers.map(async (tk)=>{
      const minDate = rows.filter(r=>r.stock_code===tk).reduce((min,r)=> r.calc_date < min ? r.calc_date : min, rows.find(r=>r.stock_code===tk).calc_date);
      const fq = new URLSearchParams({ ticker: `eq.${tk}`, date: `gt.${minDate}`, select: "date,close", order: "date.asc" });
      const frows = await fetch(`${SUPABASE_URL}/flows?${fq}`, { headers: getSupaHeaders(), cache: "no-store" }).then(r=>r.json());
      flowsByTicker[tk] = Array.isArray(frows) ? frows : [];
    }));

    state.targetHistory = rows.map(r=>{
      const closes = (flowsByTicker[r.stock_code]||[]).filter(f=> f.date > r.calc_date && f.close != null);
      let hitR1 = null, hitMax = null, daysToR1 = null, daysToMax = null;
      closes.forEach((f,i)=>{
        if(hitR1===null && r.target_r1!=null && f.close >= r.target_r1){ hitR1 = true; daysToR1 = i+1; }
        if(hitMax===null && r.target_max!=null && f.close >= r.target_max){ hitMax = true; daysToMax = i+1; }
      });
      const elapsedDays = closes.length;
      // null = masih berjalan (belum sampai horizon & belum kena target)
      if(hitR1===null) hitR1 = elapsedDays >= TB_HIT_HORIZON_DAYS ? false : null;
      if(hitMax===null) hitMax = elapsedDays >= TB_HIT_HORIZON_DAYS ? false : null;
      return { ...r, hitR1, hitMax, daysToR1, daysToMax, elapsedDays };
    });
    state.targetMsg = `Riwayat dimuat: ${rows.length} kalkulasi.`;
    state.targetMsgError = false;
  } catch(e){
    state.targetMsg = "Gagal memuat riwayat (jalankan dulu SQL migration 05_target_bandar.sql?): " + e.message;
    state.targetMsgError = true;
  }
  state.targetHistoryLoading = false;
  render();
}

function computeTargetSummaryStats(history){
  const finishedR1 = history.filter(h=>h.hitR1 !== null);
  const finishedMax = history.filter(h=>h.hitMax !== null);
  const hitR1Count = finishedR1.filter(h=>h.hitR1).length;
  const hitMaxCount = finishedMax.filter(h=>h.hitMax).length;
  const daysR1List = history.filter(h=>h.daysToR1!=null).map(h=>h.daysToR1);
  const avgDaysR1 = daysR1List.length ? daysR1List.reduce((a,b)=>a+b,0)/daysR1List.length : null;
  return {
    total: history.length,
    hitRateR1: finishedR1.length ? (hitR1Count/finishedR1.length*100) : null,
    hitRateMax: finishedMax.length ? (hitMaxCount/finishedMax.length*100) : null,
    finishedR1Count: finishedR1.length,
    finishedMaxCount: finishedMax.length,
    avgDaysR1
  };
}

function targetStatusPill(hit){
  if(hit === true) return pillHtml("Tercapai", "up");
  if(hit === false) return pillHtml("Belum Tercapai", "down");
  return pillHtml("Berjalan", "gold");
}

function renderTargetBandar(){
  const rows = state.targetBandarRows;
  const top5 = state.targetTopBandar;
  const avgB = state.targetAvgBandar;
  const lv = state.targetLevels;
  const curPrice = state.targetCurrentPrice;

  const distPct = (target) => (curPrice && target) ? ((target - curPrice) / curPrice * 100) : null;

  const calcSection = avgB && lv ? `
    <div class="porto-summary" style="margin-bottom:8px;">
      <div class="porto-stat"><div class="lbl">Avg Bandar (Beli)${avgB.isEstimate?' <span style="color:var(--gold);font-weight:600;">≈ Estimasi</span>':''}</div><div class="val mono">${fmtNum(Math.round(avgB.avgPrice))}</div></div>
      <div class="porto-stat"><div class="lbl">Harga Sekarang</div><div class="val mono">${curPrice!=null?fmtNum(Math.round(curPrice)):"-"}</div></div>
      <div class="porto-stat tone-up" style="border-top-color:var(--up);"><div class="lbl">Target R1</div><div class="val mono" style="color:var(--up);">${fmtNum(Math.round(lv.r1))}${distPct(lv.r1)!=null?` <span style="font-size:11px;color:var(--muted);">(${distPct(lv.r1)>=0?"+":""}${distPct(lv.r1).toFixed(1)}%)</span>`:""}</div></div>
      <div class="porto-stat tone-gold" style="border-top-color:var(--gold);"><div class="lbl">Target Max</div><div class="val mono" style="color:var(--gold);">${fmtNum(Math.round(lv.max))}${distPct(lv.max)!=null?` <span style="font-size:11px;color:var(--muted);">(${distPct(lv.max)>=0?"+":""}${distPct(lv.max).toFixed(1)}%)</span>`:""}</div></div>
    </div>
    <div style="font-size:11.5px;color:var(--muted);margin-bottom:16px;">
      ${avgB.isEstimate
        ? `Avg Bandar adalah <b style="color:var(--gold);">estimasi</b> dari harga penutupan tanggal <b class="mono">${avgB.latestDate}</b> (sumber: ${avgB.estimateSource === "flows" ? "tabel <code>flows</code>/IDX" : "<code>price_history_stockbit</code>"}) — kolom "Lot" kosong di ${avgB.buyRowsCount} baris Top Buy tanggal itu (lazim untuk data hasil Tarik Otomatis Stockbit, yang skema barunya tidak menyertakan Lot). Isi Lot manual di tab 📊 Broker Summary untuk perhitungan tertimbang yang lebih akurat.`
        : `Avg Bandar dihitung tertimbang dari Top Buy tanggal <b class="mono">${avgB.latestDate}</b> (${avgB.buyRowsCount} baris broker).`}
      ATR14 dipakai: <span class="mono">${fmtNum(lv.atrUsed.toFixed(2))}</span>${lv.atrIsFallback?' <span style="color:var(--gold);">(fallback 3% — ATR14 kosong di stocks_screener)</span>':""}.
      Formula: R1 = Avg Bandar + ${TB_ATR_MULT_R1}×ATR14, Max = Avg Bandar + ${TB_ATR_MULT_MAX}×ATR14 — silakan disesuaikan (konstanta TB_ATR_MULT_* di app.js) sesuai gaya trading Anda.
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;">
      <button class="btn btn-primary" id="tbSaveCalcBtn">💾 Simpan Perhitungan Hari Ini ke Riwayat</button>
      <button class="btn btn-outline" id="tbSaveToBacktestBtn" style="color:#22d3ee;border-color:rgba(6,182,212,0.4);" title="Kirim ${escapeHtml(state.targetStockCode||'-')} ke tab Backtest dengan harga sekarang sebagai harga entry">🔬 Simpan ke Backtest</button>
    </div>
  ` : `<div class="empty-box" style="padding:16px;font-size:12px;">Muat data dulu di atas untuk melihat Avg Bandar & Target.</div>`;

  const maxNet = Math.max(1, ...top5.map(b=>Math.abs(b.netValue)));
  const top5Html = top5.length ? `
    <div class="table-wrap">
      <table class="mono">
        <thead><tr><th>Broker</th><th>Muncul</th><th>Net Value</th><th>Avg/Muncul</th><th>Tipe</th></tr></thead>
        <tbody>
          ${top5.map(b=>`
            <tr>
              <td>${escapeHtml(b.broker_code)}</td>
              <td>${b.daysAppeared}/${state.targetWindowActualDays} hari</td>
              <td style="color:${b.netValue>=0?'var(--up)':'var(--down)'};">${b.netValue>=0?'+':''}${fmtNum(Math.round(b.netValue))}</td>
              <td>${fmtNum(Math.round(b.avgPerAppearance))}</td>
              <td>${pillHtml(b.typeIcon+" "+b.type, b.typeTone)}</td>
            </tr>`).join("")}
        </tbody>
      </table>
    </div>` : `<div class="empty-box" style="padding:16px;font-size:12px;">Belum ada data untuk dianalisis.</div>`;

  const history = state.targetHistory;
  const stats = computeTargetSummaryStats(history);
  const summaryStatsHtml = `
    <div class="porto-summary">
      <div class="porto-stat"><div class="lbl">Total Kalkulasi</div><div class="val mono">${stats.total}</div></div>
      <div class="porto-stat tone-up" style="border-top-color:var(--up);"><div class="lbl">Hit Rate R1</div><div class="val mono">${stats.hitRateR1!=null?stats.hitRateR1.toFixed(0)+"%":"-"}</div></div>
      <div class="porto-stat tone-gold" style="border-top-color:var(--gold);"><div class="lbl">Hit Rate Max</div><div class="val mono">${stats.hitRateMax!=null?stats.hitRateMax.toFixed(0)+"%":"-"}</div></div>
      <div class="porto-stat"><div class="lbl">Rata² Hari ke R1</div><div class="val mono">${stats.avgDaysR1!=null?stats.avgDaysR1.toFixed(1):"-"}</div></div>
    </div>
    <div style="font-size:11px;color:var(--muted);margin-bottom:16px;">
      Hit Rate hanya dihitung dari kalkulasi yang sudah lewat ${TB_HIT_HORIZON_DAYS} hari bursa sejak tanggal kalkulasi (atau sudah kena target lebih cepat) — kalkulasi yang masih baru berstatus "Berjalan" dan belum masuk hitungan.
    </div>`;

  const historyRowsHtml = history.length ? `
    <div class="table-wrap">
      <table class="mono">
        <thead><tr><th>Tgl Kalkulasi</th><th>Emiten</th><th>Avg Bandar</th><th>R1</th><th>Max</th><th>Status R1</th><th>Status Max</th></tr></thead>
        <tbody>
          ${history.map(h=>`
            <tr>
              <td>${escapeHtml(h.calc_date)}</td>
              <td>${escapeHtml(h.stock_code)}</td>
              <td>${fmtNum(Math.round(h.avg_bandar_price))}</td>
              <td>${fmtNum(Math.round(h.target_r1))}</td>
              <td>${fmtNum(Math.round(h.target_max))}</td>
              <td>${targetStatusPill(h.hitR1)}${h.daysToR1!=null?` <span style="font-size:10.5px;color:var(--muted);">(H+${h.daysToR1})</span>`:""}</td>
              <td>${targetStatusPill(h.hitMax)}${h.daysToMax!=null?` <span style="font-size:10.5px;color:var(--muted);">(H+${h.daysToMax})</span>`:""}</td>
            </tr>`).join("")}
        </tbody>
      </table>
    </div>` : `<div class="empty-box" style="padding:16px;font-size:12px;">Belum ada riwayat. Simpan perhitungan dari Kalkulator di atas dulu.</div>`;

  return `
    <div class="panel">
      <div class="filter-section-title">🎯 Target Bandar<span class="line"></span></div>
      <div style="font-size:12px;color:var(--muted);margin-bottom:14px;">
        Dibangun dari data 📊 Broker Summary yang sudah Anda isi. Bukan data resmi otomatis dari Stockbit — dan Target R1/Max adalah heuristik, bukan jaminan.
      </div>
      <div class="bs-toolbar">
        <input id="tbStockCode" class="bs-input" placeholder="Kode saham (mis. BBCA)" maxlength="6" style="text-transform:uppercase" value="${escapeHtml(state.targetStockCode||"")}">
        <input id="tbWindowDays" class="bs-input" type="number" min="5" max="120" placeholder="Hari" value="${state.targetWindowDays}" style="max-width:100px;">
        <button class="btn btn-outline" id="tbLoadBtn" ${state.targetLoading?"disabled":""}>${state.targetLoading?"Memuat...":"Muat Data"}</button>
      </div>
      ${state.targetMsg ? `<div class="bs-msg ${state.targetMsgError?"bs-msg-error":"bs-msg-ok"}">${escapeHtml(state.targetMsg)}</div>` : ""}
    </div>

    <div class="panel">
      <div class="filter-section-title">🐋 Top 5 Bandar (${state.targetWindowActualDays || state.targetWindowDays} hari terakhir)<span class="line"></span></div>
      ${top5Html}
    </div>

    <div class="panel">
      <div class="filter-section-title">🧮 Kalkulator Target Harga<span class="line"></span></div>
      ${calcSection}
    </div>

    <div class="panel">
      <div class="filter-section-title">📈 Summary & Performance<span class="line"></span></div>
      <div class="bs-toolbar" style="margin-bottom:14px;">
        <select id="tbScopeSelect" style="background:rgba(0,0,0,0.2);border:1px solid var(--border);color:var(--text);font-size:13px;border-radius:8px;padding:9.5px 12px;">
          <option value="ticker" ${state.targetSummaryScope==="ticker"?"selected":""}>Emiten ini (${escapeHtml(state.targetStockCode||"-")})</option>
          <option value="all" ${state.targetSummaryScope==="all"?"selected":""}>Semua Emiten</option>
        </select>
        <button class="btn btn-outline" id="tbHistoryBtn" ${state.targetHistoryLoading?"disabled":""}>${state.targetHistoryLoading?"Memuat...":"🔄 Muat Riwayat & Hit Rate"}</button>
      </div>
      ${summaryStatsHtml}
      ${historyRowsHtml}
    </div>
  `;
}

// ==========================================================================
// ENTRY PRICE SCANNER — "broker trap" scanner lintas SEMUA saham sekaligus.
//
// Konsep (mengikuti pola ihsgscreener.com): setiap broker punya harga
// rata-rata beli (VWAP Buy) = total nilai beli ÷ total volume beli, dalam
// suatu jendela waktu. Kalau harga sekarang di BAWAH VWAP Buy itu, broker
// tsb sedang rugi ("NYANGKUT") — orang yang rugi cenderung menahan/menambah,
// bukan jual murah, jadi level itu jadi support psikologis. Kalau harga
// sudah jauh DI ATAS VWAP mereka, mereka sudah untung dan rawan ambil
// untung, jadi level itu dilewati sebagai area entry.
//
// SUMBER DATA: tabel `broker_summary` yang SAMA dengan tab 📊 Broker
// Summary / 🎯 Target Bandar (top 5 broker beli & jual per hari, per
// saham) — BUKAN endpoint baru. Konsekuensinya: hasil scan ini HANYA
// SEBAGUS data broker_summary yang sudah terisi. Kalau broker_summary
// kosong/jarang diisi untuk banyak saham, "Hasil Scan" akan kosong/sedikit
// juga — ini bukan bug, tapi keterbatasan data sumber (top-5 broker/hari,
// bukan seluruh transaksi pasar).
//
// KLASIFIKASI ASING/LOKAL: TIDAK ADA API publik resmi untuk ini, jadi
// dipakai daftar statis best-effort EPS_FOREIGN_BROKER_CODES di bawah
// (sama semangatnya dengan SYARIAH_TICKERS di atas file ini — silakan
// diperbaiki sendiri kalau ada kode yang salah/kurang). Kode yang TIDAK
// ada di daftar itu default dianggap "Lokal".
//
// SEMUA formula (Gap%, Konvergensi, Tanjakan 10H, Mutu, Score) di bawah
// adalah HEURISTIK YANG KAMI RANCANG SENDIRI dari data yang tersedia —
// BUKAN replikasi rumus rahasia ihsgscreener.com (kami tidak pernah
// melihat source code mereka) dan BUKAN jaminan/rekomendasi investasi.
// Semua konstanta sengaja dijadikan variabel (EPS_* di bawah) supaya
// gampang disesuaikan.
// ==========================================================================

const EPS_AREA_PCT = 3;        // ±X% dari VWAP = dianggap "DI AREA"
const EPS_TANJAKAN_WINDOW = 10; // jumlah hari bursa untuk "Tanjakan 10H"
const EPS_MIN_PRICE = 80;       // saham di bawah harga ini diblokir (saham gorengan receh)
const EPS_SCAN_DATA_VERSION = 3; // v3: agregasi server-side eps_scan_daily + fallback client
const EPS_EXCLUDED_SECTOR_KEYWORDS = ["propert", "real estate"]; // dicocokkan case-insensitive, substring

// Daftar kode broker yang UMUM dianggap sekuritas asing/JV asing oleh
// komunitas bandarmologi (BELUM diverifikasi resmi ke daftar anggota
// bursa IDX terbaru — cek ulang sebelum dipakai serius). Kode lain di
// luar daftar ini dianggap "Lokal" secara default.
const EPS_FOREIGN_BROKER_CODES = new Set([
  "AK","BK","CS","DB","KZ","MS","RX","BW","GW","AG","XA","ZP","YU","RS","OD","IF"
]);
function epsBrokerType(brokerCode){
  return EPS_FOREIGN_BROKER_CODES.has(String(brokerCode||"").trim().toUpperCase()) ? "asing" : "lokal";
}

function epsIsExcludedSector(sektor){
  const s = String(sektor||"").toLowerCase();
  return EPS_EXCLUDED_SECTOR_KEYWORDS.some(kw => s.includes(kw));
}

// Ambil ISO date N hari bursa (Senin-Jumat) ke belakang dari hari ini —
// dipakai sebagai cutoff query supaya jendela 1 bulan (20 hari bursa)
// tidak perlu narik seluruh histori broker_summary yang mungkin sudah
// bertahun-tahun.
function epsCutoffDate(tradingDaysBackN){
  const calendarDaysBack = Math.ceil(tradingDaysBackN * 7/5) + 10; // buffer libur bursa
  const d = new Date();
  d.setDate(d.getDate() - calendarDaysBack);
  return toLocalISODate(d);
}

// ==========================================================================
// LANGKAH 1 — tarik SEMUA baris broker_summary (semua saham) dalam jendela
// ~1 bulan bursa, lalu susun jadi struktur harian per saham per tipe
// broker (asing/lokal). Ini query BERAT (bisa ratusan ribu baris kalau
// broker_summary sudah terisi rutin untuk banyak saham) — makanya scan
// ini TIDAK jalan otomatis, harus ditekan manual lewat tombol "🔄 Scan
// Sekarang", dan hasilnya di-cache (localStorage + tabel Supabase
// eps_scan_cache kalau migrasinya sudah dijalankan) supaya sesi
// berikutnya tidak perlu scan ulang.
// ==========================================================================
function epsRawFromDailyRows(rows){
  const byStock = {};
  const allDatesSet = new Set();
  (Array.isArray(rows) ? rows : []).forEach(r=>{
    const code = String(r.stock_code || "").toUpperCase();
    const date = r.trade_date;
    const type = r.broker_type === "asing" ? "asing" : "lokal";
    if(!code || !date) return;
    allDatesSet.add(date);
    if(!byStock[code]) byStock[code] = { days:{} };
    if(!byStock[code].days[date]) byStock[code].days[date] = {
      asing: { buyVal:0, sellVal:0, buyLot:0, sellLot:0, brokerNet:{} },
      lokal: { buyVal:0, sellVal:0, buyLot:0, sellLot:0, brokerNet:{} }
    };
    const bucket = byStock[code].days[date][type];
    bucket.buyVal += Number(r.buy_val) || 0;
    bucket.sellVal += Number(r.sell_val) || 0;
    bucket.buyLot += Number(r.buy_lot) || 0;
    bucket.sellLot += Number(r.sell_lot) || 0;
    if(r.broker_net && typeof r.broker_net === "object"){
      Object.entries(r.broker_net).forEach(([broker, net])=>{
        const bc = String(broker || "").toUpperCase();
        if(bc) bucket.brokerNet[bc] = (bucket.brokerNet[bc] || 0) + (Number(net) || 0);
      });
    }
    const close = Number(r.close_price);
    if(Number.isFinite(close) && close > 0) byStock[code].days[date].close = close;
  });
  return { scannedAt:new Date().toISOString(), dataVersion:EPS_SCAN_DATA_VERSION,
    source:"eps_scan_daily", stockCount:Object.keys(byStock).length,
    tradingDateCount:allDatesSet.size, byStock };
}

// ==========================================================================
// fetchAllPagesParallel — pengganti loop "for(offset...) await fetch(...)"
// yang SEKUENSIAL untuk query paginated (PostgREST limit/offset).
//
// KENAPA INI PERLU: loop sekuensial lama menunggu satu halaman selesai
// sebelum minta halaman berikutnya — kalau datanya 10.000+ baris (limit
// 1000/halaman), itu 10+ round-trip network BERURUTAN, dan tiap OFFSET
// besar juga tetap membuat Postgres men-scan-lalu-buang baris yang
// di-skip (biaya per halaman naik seiring offset makin besar). Total
// waktu tunggu jadi kira-kira jumlah_request × latency, ditambah makin
// lambat di halaman-halaman akhir.
//
// PERBAIKAN: minta beberapa offset SEKALIGUS secara paralel (Promise.all)
// per "gelombang" (default 6 request bersamaan), baru lanjut ke gelombang
// berikutnya kalau gelombang itu masih penuh. Kalau nebak offset yang
// ternyata sudah lewat akhir data, PostgREST cukup membalas array kosong
// (bukan error) — jadi aman ditembak lebih dari yang perlu, tidak bikin
// hasil salah, cuma sedikit request terbuang di gelombang terakhir.
// Hasilnya tetap disusun urut (Promise.all menjaga urutan array input).
// ==========================================================================
async function fetchAllPagesParallel(pageFetcher, pageSize, opts = {}){
  const maxConcurrent = opts.maxConcurrent || 6;
  const rows = [];
  let offset = 0;
  while(true){
    const batchOffsets = [];
    for(let i = 0; i < maxConcurrent; i++) batchOffsets.push(offset + i * pageSize);
    const pages = await Promise.all(batchOffsets.map(off => pageFetcher(off)));
    let hitEnd = false;
    for(const page of pages){
      if(!Array.isArray(page) || !page.length){ hitEnd = true; break; }
      rows.push(...page);
      if(opts.onProgress) opts.onProgress(rows.length);
      if(page.length < pageSize){ hitEnd = true; break; }
    }
    if(hitEnd) break;
    offset += maxConcurrent * pageSize;
  }
  return rows;
}

// ==========================================================================
// v2 — hasil eps_scan_daily_v2 (lihat SQL terpisah): SATU baris per saham,
// kolom `days` JSONB berisi {tanggal: {asing:{...}, lokal:{...}, close}}.
// Beda dari v1 (satu baris per saham/tanggal/tipe broker, butuh paging
// 1.000/halaman karena bisa puluhan ribu baris), v2 sudah digabung
// SEKALI di Postgres jadi <1.000 baris total (jumlah emiten IDX),
// sehingga client cukup SATU request tanpa paging sama sekali.
// Nama field di JSONB (buyVal/sellVal/buyLot/sellLot/brokerNet/close)
// sengaja disamakan dengan struktur byStock[..].days[..] internal supaya
// parser ini tinggal menyalin, bukan menghitung ulang.
// ==========================================================================
function epsRawFromV2Rows(rows){
  const byStock = {};
  const allDatesSet = new Set();
  const emptySide = () => ({ buyVal:0, sellVal:0, buyLot:0, sellLot:0, brokerNet:{} });
  const sanitizeSide = (raw) => {
    const s = emptySide();
    if(raw && typeof raw === "object"){
      s.buyVal = Number(raw.buyVal) || 0;
      s.sellVal = Number(raw.sellVal) || 0;
      s.buyLot = Number(raw.buyLot) || 0;
      s.sellLot = Number(raw.sellLot) || 0;
      if(raw.brokerNet && typeof raw.brokerNet === "object"){
        Object.entries(raw.brokerNet).forEach(([broker, net])=>{
          const bc = String(broker || "").toUpperCase();
          if(bc) s.brokerNet[bc] = Number(net) || 0;
        });
      }
    }
    return s;
  };
  (Array.isArray(rows) ? rows : []).forEach(r=>{
    const code = String(r.stock_code || "").toUpperCase();
    const days = r.days;
    if(!code || !days || typeof days !== "object") return;
    if(!byStock[code]) byStock[code] = { days:{} };
    Object.entries(days).forEach(([date, dayRaw])=>{
      if(!date || !dayRaw || typeof dayRaw !== "object") return;
      allDatesSet.add(date);
      const day = { asing: sanitizeSide(dayRaw.asing), lokal: sanitizeSide(dayRaw.lokal) };
      const close = Number(dayRaw.close);
      if(Number.isFinite(close) && close > 0) day.close = close;
      byStock[code].days[date] = day;
    });
  });
  return { scannedAt:new Date().toISOString(), dataVersion:EPS_SCAN_DATA_VERSION,
    source:"eps_scan_daily_v2", stockCount:Object.keys(byStock).length,
    tradingDateCount:allDatesSet.size, byStock };
}

// Jalur v2: SATU request RPC (tidak pakai fetchAllPagesParallel — tidak
// perlu paging karena hasilnya sudah 1 baris/saham). `limit` dilebihkan
// ke 2000 hanya untuk jaga-jaga kalau suatu saat jumlah emiten > 1000
// (default batas baris PostgREST); tidak berpengaruh kalau hasilnya
// lebih sedikit.
async function tryFastEpsScanV2(cutoff){
  let rows;
  try{
    const res = await fetch(`${SUPABASE_URL}/rpc/eps_scan_daily_v2?limit=2000`, {
      method:"POST", headers:getSupaHeaders(), body:JSON.stringify({p_cutoff:cutoff}), cache:"no-store"
    });
    if(!res.ok){
      let detail = `HTTP ${res.status}`;
      try{ const b = await res.json(); if(b && b.message) detail += ` — ${b.message}`; }catch(e){}
      console.warn("[EPS] RPC eps_scan_daily_v2 gagal:", detail);
      return null;
    }
    rows = await res.json();
  }catch(e){
    console.warn("[EPS] RPC eps_scan_daily_v2 exception:", e);
    return null;
  }
  if(!Array.isArray(rows)){
    if(rows && rows.message) console.warn("[EPS] RPC eps_scan_daily_v2 error:", rows.message);
    return null;
  }
  return rows.length ? epsRawFromV2Rows(rows) : null;
}

async function tryFastEpsScan(cutoff){
  const pageSize = 1000;
  let fetchError = null;
  const rows = await fetchAllPagesParallel(async (offset) => {
    if(fetchError) return null; // gelombang sudah gagal — jangan buang request lagi
    const res = await fetch(`${SUPABASE_URL}/rpc/eps_scan_daily?limit=${pageSize}&offset=${offset}`, {
      method:"POST", headers:getSupaHeaders(), body:JSON.stringify({p_cutoff:cutoff}), cache:"no-store"
    });
    if(!res.ok){
      // Tampilkan penyebabnya di UI — tanpa ini fallback terjadi diam-diam
      // dan user hanya melihat scanner lama berjalan tanpa tahu kenapa.
      let detail = `HTTP ${res.status}`;
      try{ const b = await res.json(); if(b && b.message) detail += ` — ${b.message}`; }catch(e){}
      console.warn("[EPS] RPC eps_scan_daily gagal:", detail);
      fetchError = new Error(detail);
      return null;
    }
    return res.json();
  }, pageSize, { maxConcurrent: 5 });
  if(fetchError){
    state.epsMsg = `RPC eps_scan_daily gagal (${fetchError.message}) — memakai scan kompatibilitas...`;
    state.epsMsgError = true;
    return null;
  }
  return rows.length ? epsRawFromDailyRows(rows) : null;
}

async function runEntryPriceScan(){
  if(!SUPABASE_URL || !SUPABASE_KEY){ openSettings(); return; }
  state.epsScanning = true; state.epsMsg = "Memuat ringkasan Entry Price..."; state.epsMsgError = false; render();

  try{
    const cutoff = epsCutoffDate(EPS_TANJAKAN_WINDOW * 2);
    state.epsMsg = "Memuat ringkasan Entry Price dari server..."; render();

    // Jalur tercepat: eps_scan_daily_v2 — SATU baris per saham, SATU
    // request (tidak ada paging sama sekali). Belum dijalankan migrasinya
    // di Supabase? Turun ke v1 (paginated, tapi tetap agregasi
    // server-side). Kedua-duanya belum ada? Baru turun ke scan
    // kompatibilitas lama (query mentah + agregasi di browser).
    let fastRaw = await tryFastEpsScanV2(cutoff).catch(e=>{
      console.warn("[EPS] RPC v2 exception:", e);
      return null;
    });
    if(!fastRaw){
      state.epsMsg = "Agregasi v2 belum tersedia; mencoba eps_scan_daily (v1)..."; render();
      fastRaw = await tryFastEpsScan(cutoff).catch(e=>{
        console.warn("[EPS] RPC exception:", e);
        state.epsMsg = `RPC eps_scan_daily tidak dapat dipanggil (${e.message}) — memakai scan kompatibilitas...`;
        state.epsMsgError = true;
        return null;
      });
    }
    if(fastRaw){
      state.epsRaw = fastRaw;
      saveEpsCache();
      const sourceLabel = fastRaw.source === "eps_scan_daily_v2" ? "1 request, agregasi server v2" : "agregasi server v1";
      state.epsMsg = `Scan cepat selesai — ${fastRaw.stockCount} saham, ${fastRaw.tradingDateCount} hari bursa (${sourceLabel}).`;
      state.epsMsgError = false;
      await syncEpsCacheToSupabase();
      state.epsScanning = false;
      recomputeEpsResults(); render(); return;
    }

    state.epsMsg = "Agregasi server belum tersedia; memakai scan kompatibilitas..."; render();
    const qs = new URLSearchParams({
      trade_date: `gte.${cutoff}`,
      select: "stock_code,trade_date,side,broker_code,lot,value_idr",
      order: "trade_date.asc,stock_code.asc"
    });

    // PostgREST/Supabase biasanya membatasi respons tanpa sadar ke maksimal
    // 1.000 baris. Query satu kali membuat scanner hanya menerima potongan
    // tanggal paling awal (sekitar 100 saham), sehingga periode terlihat
    // seolah cuma punya satu hari dan semua konvergensi diklasifikasikan
    // "diam". Ambil seluruh halaman dengan Range/offset sebelum menghitung.
    //
    // PARALEL: dulu loop ini AWAIT satu-satu per halaman (sekuensial) —
    // untuk broker_summary yang bisa puluhan ribu baris, itu puluhan
    // round-trip network berurutan dan jadi sumber utama loading lama.
    // Sekarang pakai fetchAllPagesParallel supaya beberapa halaman
    // ditembak bersamaan. Fetch `flows` (harga close) juga TIDAK LAGI
    // menunggu broker_summary selesai dulu — keduanya independen, jadi
    // dijalankan bersamaan lewat Promise.all di bawah.
    const EPS_PAGE_SIZE = 1000;
    let brokerSummaryError = null;
    const brokerSummaryPromise = fetchAllPagesParallel(async (offset) => {
      if(brokerSummaryError) return null;
      const pageQs = new URLSearchParams(qs);
      pageQs.set("limit", String(EPS_PAGE_SIZE));
      pageQs.set("offset", String(offset));
      const res = await fetch(`${SUPABASE_URL}/broker_summary?${pageQs}`, { headers: getSupaHeaders(), cache: "no-store" });
      if(!res.ok){ brokerSummaryError = new Error(`HTTP ${res.status} ${res.statusText}`); return null; }
      const page = await res.json();
      if(page && page.message){ brokerSummaryError = new Error(page.message); return null; }
      return page;
    }, EPS_PAGE_SIZE, {
      maxConcurrent: 5,
      onProgress: (n) => { state.epsMsg = `Menarik data broker_summary... ${n.toLocaleString("id-ID")} baris`; render(); }
    });

    // Ditembak BERSAMAAN dengan broker_summary di atas (bukan setelahnya) —
    // lihat pemakaian closeRowsPromise di bawah, setelah byStock disusun.
    const closeRowsPromise = fetchAllPagesParallel(async (off) => {
      const cq = new URLSearchParams({ date: `gte.${cutoff}`, select: "ticker,date,close", limit: String(EPS_PAGE_SIZE), offset: String(off) });
      const cres = await fetch(`${SUPABASE_URL}/flows?${cq}`, { headers: getSupaHeaders(), cache: "no-store" });
      if(!cres.ok) return null;
      return cres.json();
    }, EPS_PAGE_SIZE, { maxConcurrent: 5 }).catch(() => []); // gagal tarik close -> fallback pakai harga live saat recompute

    const rows = await brokerSummaryPromise;
    if(brokerSummaryError) throw brokerSummaryError;

    if(!rows.length){
      state.epsRaw = null;
      state.epsMsg = "Belum ada data broker_summary sama sekali. Isi dulu di tab 📊 Broker Summary untuk minimal beberapa saham.";
      state.epsMsgError = true;
      state.epsScanning = false; render(); return;
    }

    // Susun: byStock[TICKER].days[TANGGAL].asing / .lokal = {buyVal,sellVal,buyLot,sellLot,brokerNet:{kode:net}}
    const byStock = {};
    const allDatesSet = new Set();
    rows.forEach(r=>{
      const code = String(r.stock_code||"").toUpperCase();
      const date = r.trade_date;
      const type = epsBrokerType(r.broker_code);
      if(!code || !date) return;
      allDatesSet.add(date);
      if(!byStock[code]) byStock[code] = { days: {} };
      if(!byStock[code].days[date]) byStock[code].days[date] = {
        asing: { buyVal:0, sellVal:0, buyLot:0, sellLot:0, brokerNet:{} },
        lokal: { buyVal:0, sellVal:0, buyLot:0, sellLot:0, brokerNet:{} }
      };
      const bucket = byStock[code].days[date][type];
      const val = Number(r.value_idr)||0;
      const lot = Number(r.lot)||0;
      const bc = String(r.broker_code||"").trim().toUpperCase();
      if(r.side === "buy"){ bucket.buyVal += val; bucket.buyLot += lot; }
      else if(r.side === "sell"){ bucket.sellVal += val; bucket.sellLot += lot; }
      if(bc){ bucket.brokerNet[bc] = (bucket.brokerNet[bc]||0) + (r.side==="buy"?val:-val); }
    });

    // Isi harga close harian dari `flows` untuk fallback estimasi lot.
    // Baris broker dari skema Stockbit baru (sejak 8 Sep 2026) tidak
    // membawa `lot` sama sekali, padahal VWAP butuh jumlah lembar. Estimasi
    // yang dipakai: lembar ≈ value_idr / close hari itu. Tanpa ini, saham
    // yang seluruh barisnya tanpa lot akan gugur dari hasil scan.
    try{
      const closeRows = await closeRowsPromise; // sudah ditembak paralel sejak sebelum byStock disusun
      closeRows.forEach(r=>{
        const st = byStock[String(r.ticker||"").toUpperCase()];
        const day = st && st.days[r.date];
        const c = Number(r.close);
        if(day && Number.isFinite(c) && c > 0) day.close = c;
      });
    }catch(e){ /* tidak bisa tarik close -> fallback pakai harga live saat recompute */ }

    // Hanya simpan EPS_TANJAKAN_WINDOW*2 hari bursa TERBARU per saham
    // (cukup untuk 1 bulan + buffer tren), supaya objek yang disimpan ke
    // localStorage tidak membengkak tanpa batas seiring waktu.
    const keepDays = EPS_TANJAKAN_WINDOW * 2;
    Object.values(byStock).forEach(stock=>{
      const dates = Object.keys(stock.days).sort();
      const drop = dates.slice(0, Math.max(0, dates.length - keepDays));
      drop.forEach(d => delete stock.days[d]);
    });

    state.epsRaw = {
      scannedAt: new Date().toISOString(),
      dataVersion: EPS_SCAN_DATA_VERSION,
      stockCount: Object.keys(byStock).length,
      tradingDateCount: allDatesSet.size,
      byStock
    };
    saveEpsCache();
    state.epsMsg = `Scan selesai — ${Object.keys(byStock).length} saham, ${allDatesSet.size} hari bursa dengan data.`;
    state.epsMsgError = false;

    // Simpan salinan ringkas ke Supabase supaya user LAIN (kalau app ini
    // dipakai bersama) tidak perlu scan ulang — opsional, gagal diam-diam
    // kalau tabel `eps_scan_cache` belum dimigrasikan (lihat catatan di
    // saveEpsCache/loadEpsCacheFromServer).
    await syncEpsCacheToSupabase();
  } catch(e){
    state.epsMsg = "Gagal scan: " + e.message;
    state.epsMsgError = true;
  }
  state.epsScanning = false;
  recomputeEpsResults();
  render();
}

function saveEpsCache(){
  try{ localStorage.setItem("ihsg_eps_scan", JSON.stringify(state.epsRaw)); }catch(e){ /* localStorage penuh — abaikan, cache Supabase tetap dicoba */ }
}

function loadEpsCacheFromLocal(){
  try{
    const raw = localStorage.getItem("ihsg_eps_scan");
    if(raw) state.epsRaw = JSON.parse(raw);
  }catch(e){ state.epsRaw = null; }
}

// Tabel `eps_scan_cache` BELUM tentu ada di Supabase Anda — ini fitur
// opsional (biar hasil scan bisa dipakai bareng lintas device/user tanpa
// tiap orang scan ulang). Kalau mau aktifkan, jalankan migrasi:
//   CREATE TABLE eps_scan_cache (
//     id text PRIMARY KEY DEFAULT 'latest',
//     scanned_at timestamptz NOT NULL,
//     payload jsonb NOT NULL
//   );
// Tanpa tabel ini, scan tetap jalan & tersimpan di localStorage browser
// ini saja — cuma tidak otomatis kebagi ke device/user lain.
async function syncEpsCacheToSupabase(){
  if(!state.epsRaw) return;
  try{
    await supaFetch(`${SUPABASE_URL}/eps_scan_cache?on_conflict=id`, {
      method: "POST",
      headers: { ...getSupaHeaders(), "Prefer": "resolution=merge-duplicates" },
      body: JSON.stringify({ id: "latest", scanned_at: state.epsRaw.scannedAt, payload: state.epsRaw })
    });
  } catch(e){
    console.warn("Gagal sinkron eps_scan_cache (tabel mungkin belum dimigrasikan):", e.message);
  }
}

async function loadEpsCacheFromServer(){
  if(!SUPABASE_URL || !SUPABASE_KEY) return false;
  try{
    const res = await fetch(`${SUPABASE_URL}/eps_scan_cache?id=eq.latest&select=scanned_at,payload`, { headers: getSupaHeaders(), cache: "no-store" });
    if(!res.ok) return false;
    const rows = await res.json();
    if(!Array.isArray(rows) || !rows.length) return false;
    const server = rows[0].payload;
    // Pakai hasil server HANYA kalau lebih baru dari cache lokal (atau
    // belum ada cache lokal sama sekali) — supaya scan lokal yang baru
    // saja dijalankan tidak ketimpa data server yang lebih basi.
    if(!state.epsRaw || new Date(server.scannedAt) > new Date(state.epsRaw.scannedAt)){
      state.epsRaw = server;
      saveEpsCache();
    }
    return true;
  } catch(e){ return false; }
}

function ensureEpsDataLoaded(){
  if(state.epsRaw && state.epsRaw.dataVersion === EPS_SCAN_DATA_VERSION){ recomputeEpsResults(); return; }
  // Cache lama (dibuat sebelum pagination / fallback lot) tidak boleh dipakai,
  // karena hasilnya umumnya hanya 1.000 baris pertama dan konvergensi tampak
  // semuanya "diam". Hapus hanya cache scanner, bukan cache aplikasi lain.
  if(state.epsRaw && state.epsRaw.dataVersion !== EPS_SCAN_DATA_VERSION){
    state.epsRaw = null;
    try{ localStorage.removeItem("ihsg_eps_scan"); }catch(e){}
  }
  loadEpsCacheFromLocal();
  if(state.epsRaw && state.epsRaw.dataVersion !== EPS_SCAN_DATA_VERSION){
    state.epsRaw = null;
    try{ localStorage.removeItem("ihsg_eps_scan"); }catch(e){}
  }
  loadEpsCacheFromServer().then(gotServer=>{
    if(state.epsRaw && state.epsRaw.dataVersion !== EPS_SCAN_DATA_VERSION){
      state.epsRaw = null;
      try{ localStorage.removeItem("ihsg_eps_scan"); }catch(e){}
    }
    if(!state.epsRaw && !gotServer){
      state.epsMsg = "Belum ada hasil scan tersimpan. Klik \"🔄 Scan Sekarang\" untuk mulai (scan mengambil seluruh halaman data broker).";
      state.epsMsgError = false;
    }
    recomputeEpsResults();
    render();
  });
}

function clearEpsCache(){
  if(!confirm("Hapus cache hasil scan Entry Price Scanner? Anda perlu \"Scan Sekarang\" lagi setelah ini.")) return;
  state.epsRaw = null; state.epsResults = [];
  try{ localStorage.removeItem("ihsg_eps_scan"); }catch(e){}
  state.epsMsg = "Cache dihapus.";
  state.epsMsgError = false;
  render();
}

// Jumlah hari bursa yang dipakai untuk tiap opsi Periode.
const EPS_PERIODE_DAYS = { "1w": 5, "2w": 10, "1m": 20 };

// ==========================================================================
// LANGKAH 2 — dari epsRaw (mentah, mencakup jendela terpanjang), hitung
// SATU baris hasil per saham sesuai filter yang sedang aktif. Semua
// filter (periode, broker, konvergensi, dst) beroperasi di sini, di
// memori, TANPA fetch ulang — makanya instan.
// ==========================================================================
function computeEpsRowForStock(ticker, stockRaw, filters, stockMap){
  const dates = Object.keys(stockRaw.days).sort(); // ascending
  if(!dates.length) return null;
  const windowDays = EPS_PERIODE_DAYS[filters.periode] || 5;
  const periodeDates = dates.slice(-windowDays);
  if(!periodeDates.length) return null;

  const typesToInclude = filters.broker === "asing" ? ["asing"] : filters.broker === "lokal" ? ["lokal"] : ["asing","lokal"];

  // --- VWAP Buy & Net Buy kumulatif dalam periode terpilih ---
  let cumBuyVal = 0, cumBuyLot = 0, netBuyPeriode = 0;
  const brokerNetTotal = {}; // kode broker -> net value, dalam periode & tipe terpilih
  periodeDates.forEach(d=>{
    const day = stockRaw.days[d];
    typesToInclude.forEach(t=>{
      const b = day[t];
      cumBuyVal += b.buyVal; cumBuyLot += b.buyLot;
      netBuyPeriode += (b.buyVal - b.sellVal);
      Object.entries(b.brokerNet).forEach(([code,net])=>{ brokerNetTotal[code] = (brokerNetTotal[code]||0) + net; });
    });
  });
  // `lot` historis kadang NULL pada data Stockbit terbaru, sedangkan
  // `value_idr` tetap tersedia. Gunakan estimasi jumlah lot dari nilai beli
  // dibagi harga penutupan hari itu agar VWAP tetap dapat dihitung. Estimasi
  // ini hanya fallback; kalau lot asli ada, tetap diprioritaskan.
  // VWAP = total nilai beli / total lembar beli (lot x 100).
  let vwapBuy = cumBuyLot > 0 ? cumBuyVal / (cumBuyLot*100) : null;
  if(vwapBuy === null){
    let estimatedShares = 0;
    periodeDates.forEach(d=>{
      const day = stockRaw.days[d];
      const price = Number(day.close || stockMap.get(ticker)?.cClose) || 0;
      if(price > 0){
        typesToInclude.forEach(t=>{
          const b = day[t];
          estimatedShares += (b.buyVal || 0) / price;
        });
      }
    });
    vwapBuy = estimatedShares > 0 ? cumBuyVal / estimatedShares : null;
  }
  if(vwapBuy === null) return null; // tidak ada transaksi beli sama sekali di periode ini

  const s = stockMap.get(ticker);
  const currentPrice = s ? s.cClose : null;
  if(currentPrice == null) return null; // saham tidak ada di data live saat ini (delisted/berubah kode dsb)
  if(currentPrice < EPS_MIN_PRICE) return null;
  if(epsIsExcludedSector(s.sektor)) return null;

  const gapPct = ((currentPrice - vwapBuy) / vwapBuy) * 100;
  const areaLabel = Math.abs(gapPct) <= EPS_AREA_PCT ? "DI AREA" : (gapPct < 0 ? "NYANGKUT" : "UNTUNG");
  const areaTone = areaLabel === "NYANGKUT" ? "down" : areaLabel === "DI AREA" ? "gold" : "up";

  // --- Konvergensi: bandingkan |gap%| VWAP kumulatif hari demi hari,
  // dalam periode terpilih. "Menyatu" = mengecil, "Menjauh" = membesar,
  // "Diam" = relatif flat (dalam ±0.5 poin persentase). Butuh min. 2 titik.
  let konvergensi = "diam", konvergensiVal = 0;
  if(periodeDates.length >= 2){
    let runBuyVal = 0, runBuyShares = 0;
    const gapSeries = [];
    periodeDates.forEach(d=>{
      const day = stockRaw.days[d];
      typesToInclude.forEach(t=>{
        const b = day[t];
        runBuyVal += b.buyVal;
        const dayPrice = Number(day.close || currentPrice) || 0;
        runBuyShares += b.buyLot > 0 ? b.buyLot * 100 : (dayPrice > 0 ? b.buyVal / dayPrice : 0);
      });
      if(runBuyShares > 0){
        const vwapAtDay = runBuyVal/runBuyShares;
        const priceAtDay = Number(day.close || currentPrice) || 0;
        gapSeries.push(Math.abs((priceAtDay - vwapAtDay)/vwapAtDay*100));
      }
    });
    if(gapSeries.length >= 2){
      konvergensiVal = gapSeries[gapSeries.length-1] - gapSeries[0];
      if(konvergensiVal <= -0.5) konvergensi = "menyatu";
      else if(konvergensiVal >= 0.5) konvergensi = "menjauh";
      else konvergensi = "diam";
    }
  }
  const konvergensiIcon = konvergensi === "menyatu" ? "⇄" : konvergensi === "menjauh" ? "↔" : "▶";

  // --- Salip (untuk urut & filter "⇈ Menyalip"): harga MENYEBRANG garis
  // VWAP buy dalam periode — di awal jendela harga di bawah VWAP broker
  // (gap negatif), di akhir jendela sudah di atas (gap positif). Itu tanda
  // klasik balik arah: para buyer lama sudah balik modal dan harga tetap
  // ditahan di atas harga rata-rata mereka. Situs menyebut ini "Menyalip"
  // (⇈). Skor 0-100: makin baru & makin tegas penyeburangan, makin tinggi.
  // gapSignSeries[i] = tanda (harga - vwapKumulatif) pada hari ke-i.
  let salipScore = 0, salipBaru = false;
  {
    let runBuyVal = 0, runBuyShares = 0;
    const gapSignSeries = [];
    periodeDates.forEach(d=>{
      const day = stockRaw.days[d];
      typesToInclude.forEach(t=>{
        const b = day[t];
        runBuyVal += b.buyVal;
        const dayPrice = Number(day.close || currentPrice) || 0;
        runBuyShares += b.buyLot > 0 ? b.buyLot * 100 : (dayPrice > 0 ? b.buyVal / dayPrice : 0);
      });
      if(runBuyShares > 0){
        const vwapAtDay = runBuyVal/runBuyShares;
        const priceAtDay = Number(day.close || currentPrice) || 0;
        gapSignSeries.push(Math.sign(priceAtDay - vwapAtDay));
      }
    });
    if(gapSignSeries.length >= 2){
      const first = gapSignSeries[0], last = gapSignSeries[gapSignSeries.length-1];
      // Menyalip = sebelumnya di bawah (atau tepat di garis), sekarang di atas.
      salipBaru = first <= 0 && last > 0;
      if(salipBaru){
        // Berapa lama sejak menyalip: makin sedikit hari positif di awal
        // seri, makin baru penyalipannya. Tegas = jarak harga ke VWAP kini.
        const daysAbove = gapSignSeries.filter(x=>x>0).length;
        const recency = 1 - (daysAbove - 1) / gapSignSeries.length; // 1 = baru saja
        const decisiveness = Math.min(1, Math.abs(gapPct) / 5); // 5% di atas VWAP = penuh
        salipScore = Math.round(100 * (0.5 + 0.5*recency) * (0.4 + 0.6*decisiveness));
      }
    }
  }

  // --- Tanjakan 10H: tren net-buy kumulatif selama EPS_TANJAKAN_WINDOW
  // hari bursa TERAKHIR (independen dari filter Periode di atas — selalu
  // 10 hari, sesuai nama fiturnya), dibagi 2 paruh, dibandingkan.
  const tj10Dates = dates.slice(-EPS_TANJAKAN_WINDOW);
  let tanjakan = "diam", tanjakanSlope = 0, tanjakanScore = 0, tanjakanTopBroker = "-";
  if(tj10Dates.length >= 4){
    const dailyNet = tj10Dates.map(d=>{
      const day = stockRaw.days[d];
      return typesToInclude.reduce((a,t)=> a + (day[t].buyVal - day[t].sellVal), 0);
    });
    const half = Math.floor(dailyNet.length/2);
    const firstHalfAvg = dailyNet.slice(0,half).reduce((a,b)=>a+b,0) / (half||1);
    const secondHalfAvg = dailyNet.slice(half).reduce((a,b)=>a+b,0) / (dailyNet.length-half||1);
    const upDays = dailyNet.filter(v=>v>0).length;
    tanjakanScore = Math.round((upDays/dailyNet.length)*100);
    const scale = Math.max(1, Math.abs(firstHalfAvg), Math.abs(secondHalfAvg));
    tanjakanSlope = (secondHalfAvg - firstHalfAvg) / scale;
    // Menyalip pada Tanjakan 10H = garis akumulasi berpindah dari net-sell
    // (atau netral) menjadi net-buy yang cukup material. Ini dibuat terpisah
    // dari sinyal silang VWAP di atas, lalu keduanya boleh memperkuat sorter.
    const akumMenyalip = firstHalfAvg <= 0 && secondHalfAvg > 0 && tanjakanSlope >= 0.25;
    const akumMenguat = tanjakanSlope >= 0.25 && secondHalfAvg > 0;
    if(akumMenyalip){
      tanjakan = "menyalip";
      salipBaru = true;
      salipScore = Math.max(salipScore, Math.round(60 + Math.min(40, tanjakanSlope * 40)));
    } else {
      tanjakan = salipBaru ? "menyalip" : (akumMenguat ? "menanjak" : "diam");
    }

    const tjBrokerNet = {};
    tj10Dates.forEach(d=>{
      const day = stockRaw.days[d];
      typesToInclude.forEach(t=> Object.entries(day[t].brokerNet).forEach(([code,net])=>{ tjBrokerNet[code]=(tjBrokerNet[code]||0)+net; }));
    });
    const tjTop = Object.entries(tjBrokerNet).sort((a,b)=>b[1]-a[1])[0];
    tanjakanTopBroker = tjTop ? tjTop[0] : "-";
  }
  const tanjakanIcon = tanjakan === "menanjak" ? "▲" : tanjakan === "menyalip" ? "⇈" : "▶";

  // --- Top Broker & Tipe (dari total net value periode terpilih) ---
  const topBrokerEntry = Object.entries(brokerNetTotal).sort((a,b)=>b[1]-a[1])[0];
  const topBroker = topBrokerEntry ? topBrokerEntry[0] : "-";
  const topBrokerTipe = topBroker !== "-" ? epsBrokerType(topBroker) : "-";
  const topBrokerShare = topBrokerEntry && netBuyPeriode !== 0 ? Math.min(1, Math.abs(topBrokerEntry[1]) / Math.abs(netBuyPeriode || topBrokerEntry[1])) : 0;

  // --- Mutu (0-100): kombinasi konsistensi arah (net buy positif berapa
  // hari dari total hari yang ada data) + konsentrasi broker dominan.
  // Heuristik sendiri, BUKAN dari sumber luar — lihat catatan di atas.
  const daysWithBuy = periodeDates.filter(d=> typesToInclude.some(t=>stockRaw.days[d][t].buyVal>0)).length;
  const consistencyScore = periodeDates.length ? (daysWithBuy/periodeDates.length)*100 : 0;
  const concentrationScore = Math.min(100, topBrokerShare*100);
  const mutu = Math.round(consistencyScore*0.5 + concentrationScore*0.5);

  // --- Score akhir (0-100): gabungan Mutu, Tanjakan, dan kedekatan ke
  // VWAP (semakin dekat/"DI AREA" semakin bagus untuk entry). ---
  const proximityScore = Math.max(0, 100 - Math.min(100, Math.abs(gapPct) * 5));
  const score = Math.round(mutu*0.4 + tanjakanScore*0.3 + proximityScore*0.3);

  return {
    ticker, nama: s.name || "-", harga: currentPrice, sektor: s.sektor,
    vwapBuy, gapPct, areaLabel, areaTone,
    konvergensi, konvergensiIcon, konvergensiVal,
    tanjakan, tanjakanIcon, tanjakanSlope, tanjakanScore, tanjakanTopBroker,
    salipBaru, salipScore,
    mutu, netBuy: netBuyPeriode, score,
    topBroker, topBrokerTipe
  };
}

function recomputeEpsResults(){
  if(!state.epsRaw){ state.epsResults = []; return; }
  const filters = state.epsFilters;
  // enriched() dibangun SEKALI di sini (bukan per-saham di dalam loop) —
  // dia lumayan berat (dihitung dari seluruh state.stocks), jadi kalau
  // dipanggil ulang per-ticker di dalam computeEpsRowForStock() bisa jadi
  // O(n²) dan bikin filter yang harusnya instan malah lag untuk ratusan saham.
  const stockMap = new Map(enriched().map(x=>[x.ticker, x]));
  const rows = [];
  Object.entries(state.epsRaw.byStock).forEach(([ticker, stockRaw])=>{
    const row = computeEpsRowForStock(ticker, stockRaw, filters, stockMap);
    if(!row) return;
    if(filters.konvergensi !== "all" && row.konvergensi !== filters.konvergensi) return;
    if(filters.tanjakan !== "all" && row.tanjakan !== filters.tanjakan) return;
    if(filters.minMutu > 0 && row.mutu < filters.minMutu) return;
    // Min Akum berarti akumulasi bersih positif; net sell tidak boleh lolos.
    if(filters.minAkum > 0 && row.netBuy < filters.minAkum) return;
    // Threshold situs bernilai negatif: makin negatif berarti harga makin
    // jauh di bawah VWAP (contoh -5% = minimal diskon 5%).
    if(filters.minGap === "minus2" && row.gapPct > -2) return;
    if(filters.minGap === "minus5" && row.gapPct > -5) return;
    if(filters.minGap === "minus10" && row.gapPct > -10) return;
    if(filters.minGap === "minus15" && row.gapPct > -15) return;
    rows.push(row);
  });

  const urutKeys = [...filters.urut];
  const sorters = {
    konvergensi: (a,b) => (a.konvergensi==="menyatu"?0:a.konvergensi==="diam"?1:2) - (b.konvergensi==="menyatu"?0:b.konvergensi==="diam"?1:2) || a.konvergensiVal - b.konvergensiVal,
    tanjakan: (a,b) => (b.tanjakan==="menanjak"?2:b.tanjakan==="menyalip"?1:0) - (a.tanjakan==="menanjak"?2:a.tanjakan==="menyalip"?1:0) || b.tanjakanScore - a.tanjakanScore,
    salip: (a,b) => (b.salipBaru?1:0) - (a.salipBaru?1:0) || b.salipScore - a.salipScore || b.tanjakanScore - a.tanjakanScore,
    mutu: (a,b) => b.mutu - a.mutu,
    terdekat: (a,b) => Math.abs(a.gapPct) - Math.abs(b.gapPct)
  };
  rows.sort((a,b)=>{
    for(const key of (urutKeys.length ? urutKeys : ["mutu"])){
      const fn = sorters[key];
      if(!fn) continue;
      const d = fn(a,b);
      if(d !== 0) return d;
    }
    return b.score - a.score;
  });

  state.epsResults = rows;
}

function toggleEpsSort(key){
  const s = state.epsFilters.urut;
  if(s.has(key)) s.delete(key); else s.add(key);
  recomputeEpsResults();
  render();
}

function setEpsFilter(key, val){
  state.epsFilters[key] = val;
  recomputeEpsResults();
  render();
}

function exportEpsToCsv(){
  const rows = state.epsResults;
  if(!rows.length) return alert("Belum ada hasil scan untuk diekspor.");
  const header = ["Kode","Nama","Harga","VWAP Buy","Gap %","Area","Konvergensi","Tanjakan 10H","Salip","Mutu","Net Buy","Score","Top Broker","Tipe"];
  const lines = [header.join(",")];
  rows.forEach(r=>{
    lines.push([
      r.ticker, `"${(r.nama||"").replace(/"/g,'""')}"`, Math.round(r.harga), Math.round(r.vwapBuy),
      r.gapPct.toFixed(2), r.areaLabel, r.konvergensi, r.tanjakan, (r.salipBaru ? `ya (${r.salipScore})` : "tidak"), r.mutu, Math.round(r.netBuy), r.score, r.topBroker, r.topBrokerTipe
    ].join(","));
  });
  const blob = new Blob([lines.join("\\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `EntryPriceScanner_${todayLocalISO()}.csv`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function epsSegBtn(group, key, label, active){
  return `<button type="button" class="btn ${active?'btn-primary':'btn-outline'}" data-eps-filter="${group}" data-eps-value="${key}" style="padding:8px 12px;font-size:12px;">${label}</button>`;
}
function epsSortBtn(key, label){
  const active = state.epsFilters.urut.has(key);
  return `<button type="button" class="btn ${active?'btn-primary':'btn-outline'}" data-eps-sort="${key}" style="padding:8px 12px;font-size:12px;">${label}</button>`;
}

function renderEntryPriceScanner(){
  const f = state.epsFilters;
  const raw = state.epsRaw;
  const rows = state.epsResults;

  const infoPanel = `
    <details class="panel" id="epsInfoPanel" style="flex-direction:column;align-items:stretch;" ${state.epsInfoOpen?"open":""}>
      <summary style="cursor:pointer;font-weight:700;font-size:14px;list-style:none;display:flex;justify-content:space-between;align-items:center;">
        <span>📖 Logika &amp; Cara Pakai Entry Price Scanner</span><span style="color:var(--muted);font-size:11px;">${state.epsInfoOpen?"▲ Tutup":"▼ Buka"}</span>
      </summary>
      <div style="margin-top:16px;display:flex;flex-direction:column;gap:16px;font-size:12.5px;line-height:1.7;color:var(--text);">
        <div>
          <div style="font-weight:700;margin-bottom:6px;">Logika di baliknya</div>
          <div style="color:var(--muted);">
            Setiap broker punya <b>harga rata-rata beli</b> (VWAP Buy) = total nilai beli ÷ total volume beli.
            Kalau harga sekarang <b>di bawah</b> rata-rata broker itu, broker tersebut sedang rugi. Orang yang rugi cenderung <i>menahan</i> atau <i>menambah</i>, bukan menjual murah.
            Sebaliknya, kalau harga sudah jauh <b>di atas</b> rata-rata mereka, mereka sudah untung dan rawan ambil untung — saham seperti itu dilewati.
          </div>
          <div style="margin-top:8px;"><span style="color:var(--teal);font-weight:700;">NYANGKUT</span> — Harga di bawah VWAP broker. Ada dorongan mempertahankan harga.</div>
          <div><span style="color:var(--teal);font-weight:700;">DI AREA</span> — Harga masih dalam ±${EPS_AREA_PCT}% dari VWAP. Level ini biasanya dijaga.</div>
        </div>
        <div>
          <div style="font-weight:700;margin-bottom:6px;">Cara pakai</div>
          <div style="color:var(--muted);">
            1. Buka tab ini — kalau sudah pernah di-scan, hasil terakhir otomatis tampil.<br>
            2. Atur filter sesuai kebutuhan (periode, broker, konvergensi, tanjakan, min akumulasi, dst).<br>
            3. Semua filter berjalan <b>instan</b> — bebas diutak-atik tanpa scan ulang.
          </div>
          <div style="margin-top:8px;background:rgba(6,182,212,0.08);border:1px solid rgba(6,182,212,0.25);border-radius:8px;padding:10px 12px;">
            Tombol <b>🔄 Scan Sekarang</b> mencoba agregasi server terlebih dahulu (cepat, hanya mengirim data ringkasan per saham/hari). Jika RPC belum dipasang, aplikasi otomatis memakai mode kompatibilitas yang membaca broker_summary bertahap.
          </div>
        </div>
        <div>
          <div style="font-weight:700;margin-bottom:6px;">Arti tiap filter</div>
          <div style="color:var(--muted);">
            <div><b style="color:var(--text);">Periode</b> — Rentang data broker: 1 minggu / 2 minggu / 1 bulan (hari bursa).</div>
            <div><b style="color:var(--text);">Broker</b> — Asing, Lokal, atau Keduanya (klasifikasi best-effort, lihat EPS_FOREIGN_BROKER_CODES di app.js).</div>
            <div><b style="color:var(--text);">Konvergensi</b> — Menyatu = harga mendekati VWAP (bagus). Menjauh = harga menjauh.</div>
            <div><b style="color:var(--text);">Tanjakan 10H</b> — ▲ Menanjak = akumulasi broker 10 hari terakhir naik. ⇈ Menyalip = harga menyeberang garis VWAP broker: dari di bawah rata-rata beli mereka jadi di atas (balik modal buyer lama &amp; harga tetap ditahan).</div>
            <div><b style="color:var(--text);">Min Akum</b> — Nilai akumulasi bersih (net buy) minimal dalam periode terpilih. Saham net-sell otomatis gugur.</div>
            <div><b style="color:var(--text);">Min Gap</b> — Ambang diskon: pilih ≤ −5% artinya hanya saham dengan harga minimal 5% di bawah VWAP broker yang ditampilkan. "Semua" menampilkan satu-dua arah.</div>
            <div><b style="color:var(--text);">Urut</b> — Bisa digabung beberapa sekaligus, diterapkan berurutan.</div>
          </div>
          <div style="margin-top:8px;background:rgba(234,179,8,0.08);border:1px solid rgba(234,179,8,0.2);border-radius:8px;padding:10px 12px;color:var(--gold);">
            Saham berharga di bawah Rp${EPS_MIN_PRICE} dan sektor Properties &amp; Real Estate diblokir otomatis untuk mengurangi jebakan.
          </div>
        </div>
      </div>
    </details>`;

  const filterPanel = `
    <div class="panel" style="flex-direction:column;align-items:stretch;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:14px;">
        <div class="filter-section-title" style="margin:0;">🎯 Entry Price Scanner <span class="pill pill-teal">BROKER TRAP</span><span class="line"></span></div>
        <div style="font-size:11px;color:var(--muted);">
          ${raw ? `Server: ${raw.stockCount} saham · ${raw.tradingDateCount || Object.keys(raw.byStock || {}).reduce((n,t)=>n + Object.keys(raw.byStock[t]?.days || {}).length, 0)} hari · ${escapeHtml(f.periode)} · ${escapeHtml(f.broker)} · ${new Date(raw.scannedAt).toLocaleString('id-ID')}` : "Belum ada data"}
        </div>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:18px;margin-bottom:12px;">
        <div>
          <div style="font-size:10px;color:var(--muted);text-transform:uppercase;font-weight:700;margin-bottom:6px;">Periode</div>
          <div style="display:flex;gap:6px;">
            ${epsSegBtn("periode","1w","1 Minggu",f.periode==="1w")}
            ${epsSegBtn("periode","2w","2 Minggu",f.periode==="2w")}
            ${epsSegBtn("periode","1m","1 Bulan",f.periode==="1m")}
          </div>
        </div>
        <div>
          <div style="font-size:10px;color:var(--muted);text-transform:uppercase;font-weight:700;margin-bottom:6px;">Broker</div>
          <div style="display:flex;gap:6px;">
            ${epsSegBtn("broker","asing","Asing",f.broker==="asing")}
            ${epsSegBtn("broker","lokal","Lokal",f.broker==="lokal")}
            ${epsSegBtn("broker","both","Keduanya",f.broker==="both")}
          </div>
        </div>
        <div>
          <div style="font-size:10px;color:var(--muted);text-transform:uppercase;font-weight:700;margin-bottom:6px;">Konvergensi</div>
          <div style="display:flex;gap:6px;">
            ${epsSegBtn("konvergensi","all","Semua",f.konvergensi==="all")}
            ${epsSegBtn("konvergensi","menyatu","⇄ Menyatu",f.konvergensi==="menyatu")}
            ${epsSegBtn("konvergensi","diam","▶ Diam",f.konvergensi==="diam")}
            ${epsSegBtn("konvergensi","menjauh","↔ Menjauh",f.konvergensi==="menjauh")}
          </div>
        </div>
        <div>
          <div style="font-size:10px;color:var(--muted);text-transform:uppercase;font-weight:700;margin-bottom:6px;">Tanjakan 10H</div>
          <div style="display:flex;gap:6px;">
            ${epsSegBtn("tanjakan","all","Semua",f.tanjakan==="all")}
            ${epsSegBtn("tanjakan","menanjak","▲ Menanjak",f.tanjakan==="menanjak")}
            ${epsSegBtn("tanjakan","menyalip","⇈ Menyalip",f.tanjakan==="menyalip")}
          </div>
        </div>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:18px;align-items:flex-end;">
        <div>
          <div style="font-size:10px;color:var(--muted);text-transform:uppercase;font-weight:700;margin-bottom:6px;">Urut (bisa digabung)</div>
          <div style="display:flex;gap:6px;">
            ${epsSortBtn("konvergensi","Konvergensi")}
            ${epsSortBtn("tanjakan","Tanjakan 10H")}
            ${epsSortBtn("salip","Salip")}
            ${epsSortBtn("mutu","Mutu")}
            ${epsSortBtn("terdekat","Terdekat VWAP")}
          </div>
        </div>
          <div class="field" style="max-width:150px;">
            <label style="font-size:10px;">Min Mutu</label>
            <select id="epsMinMutu" style="background:rgba(0,0,0,0.2);border:1px solid var(--border);color:var(--text);font-size:12.5px;border-radius:8px;padding:8px 10px;">
              <option value="0" ${f.minMutu===0?"selected":""}>Semua</option>
              <option value="64" ${f.minMutu===64?"selected":""}>≥ 64</option>
              <option value="72" ${f.minMutu===72?"selected":""}>≥ 72</option>
              <option value="80" ${f.minMutu===80?"selected":""}>≥ 80</option>
            </select>
          </div>
          <div class="field" style="max-width:150px;">
            <label style="font-size:10px;">Min Akumulasi</label>
            <select id="epsMinAkum" style="background:rgba(0,0,0,0.2);border:1px solid var(--border);color:var(--text);font-size:12.5px;border-radius:8px;padding:8px 10px;">
              <option value="0" ${f.minAkum===0?"selected":""}>Semua</option>
              <option value="100000000" ${f.minAkum===100000000?"selected":""}>≥ 100 Jt</option>
              <option value="500000000" ${f.minAkum===500000000?"selected":""}>≥ 500 Jt</option>
              <option value="1000000000" ${f.minAkum===1000000000?"selected":""}>≥ 1 M</option>
              <option value="5000000000" ${f.minAkum===5000000000?"selected":""}>≥ 5 M</option>
            </select>
          </div>
          <div class="field" style="max-width:170px;">
            <label style="font-size:10px;">Min Gap (maks diskon)</label>
            <select id="epsMinGap" style="background:rgba(0,0,0,0.2);border:1px solid var(--border);color:var(--text);font-size:12.5px;border-radius:8px;padding:8px 10px;">
              <option value="all" ${f.minGap==="all"?"selected":""}>Semua</option>
              <option value="minus2" ${f.minGap==="minus2"?"selected":""}>≤ −2%</option>
              <option value="minus5" ${f.minGap==="minus5"?"selected":""}>≤ −5%</option>
              <option value="minus10" ${f.minGap==="minus10"?"selected":""}>≤ −10%</option>
              <option value="minus15" ${f.minGap==="minus15"?"selected":""}>≤ −15%</option>
            </select>
          </div>
        <div style="display:flex;gap:8px;margin-left:auto;">
          <button class="btn btn-outline" id="epsCsvBtn" style="color:#22d3ee;border-color:rgba(6,182,212,0.4);">CSV</button>
          <button class="btn btn-outline" id="epsClearCacheBtn" style="color:#f87171;border-color:rgba(239,68,68,0.4);">Clear Cache</button>
          <button class="btn btn-primary" id="epsScanBtn" ${state.epsScanning?"disabled":""}>${state.epsScanning?"⏳ Scanning...":"🔄 Scan Sekarang"}</button>
        </div>
      </div>
      ${state.epsMsg ? `<div class="bs-msg ${state.epsMsgError?"bs-msg-error":"bs-msg-ok"}" style="margin-top:12px;">${escapeHtml(state.epsMsg)}</div>` : ""}
    </div>`;

  const resultsPanel = `
    <div class="panel" style="flex-direction:column;align-items:stretch;">
      <div class="filter-section-title">Hasil Scan <span class="count-badge">${rows.length} saham</span><span class="line"></span></div>
      ${!rows.length ? `<div class="empty-box">${raw ? "Tidak ada saham yang lolos kombinasi filter ini — coba longgarkan Min Mutu/Akumulasi/Gap." : "Belum ada hasil. Klik \"🔄 Scan Sekarang\" di atas untuk mulai."}</div>` : `
      ${renderBacktestSaveBar("eps", rows.map(r=>({
        ticker: r.ticker, price: Math.round(r.harga),
        kriteria: "Entry Price Scanner",
        keterangan: `VWAP Buy: ${Math.round(r.vwapBuy)}; Gap: ${r.gapPct>=0?'+':''}${r.gapPct.toFixed(1)}%; Konvergensi: ${r.konvergensi}; Mutu: ${r.mutu}; Score: ${r.score}; Top Broker: ${r.topBroker}`
      })))}
      <div class="table-wrap">
        <table class="mono">
          <thead>
            <tr>
              <tr>
              <th></th><th>#</th><th>Kode</th><th>Nama</th><th>Harga</th><th>VWAP Buy</th><th>Gap %</th><th>Konv</th><th>Tanjakan / Salip</th><th>Mutu</th><th>Net Buy</th><th>Score</th><th>Top Broker</th><th>Tipe</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map((r,i)=>`
              <tr>
                ${backtestRowCheckbox("eps", { ticker: r.ticker, price: Math.round(r.harga) })}
                <td>${i+1}</td>
                <td class="ticker-cell"><button class="ticker-link" data-detail="${r.ticker}" title="Lihat detail ${r.ticker}">${r.ticker}</button></td>
                <td style="white-space:normal;max-width:180px;font-family:'Sora',sans-serif;font-size:12px;">${escapeHtml(r.nama)}</td>
                <td>${fmtNum(Math.round(r.harga))}</td>
                <td style="color:var(--gold);">${fmtNum(Math.round(r.vwapBuy))}</td>
                <td>
                  <span style="color:${r.gapPct>=0?'var(--up)':'var(--down)'};">${r.gapPct>=0?'+':''}${r.gapPct.toFixed(1)}%</span>
                  ${pillHtml(r.areaLabel, r.areaTone)}
                </td>
                <td title="${r.konvergensiVal.toFixed(2)} poin">${r.konvergensiIcon} ${r.konvergensi}</td>
                <td title="Top broker tren: ${escapeHtml(r.tanjakanTopBroker)}">${r.tanjakanIcon} ${r.tanjakanSlope.toFixed(1)}x ${r.tanjakanScore}${r.salipBaru ? ` · ⇈ ${r.salipScore}` : ""}</td>
                <td>${r.mutu}</td>
                <td style="color:${r.netBuy>=0?'var(--up)':'var(--down)'};">${r.netBuy>=0?'+':''}${fmtCap(r.netBuy)}</td>
                <td style="font-weight:700;color:var(--gold);">${r.score}</td>
                <td>${escapeHtml(r.topBroker)}</td>
                <td>${pillHtml(r.topBrokerTipe==="asing"?"ASING":r.topBrokerTipe==="lokal"?"LOKAL":"-", r.topBrokerTipe==="asing"?"teal":"muted")}</td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div>`}
    </div>`;

  return infoPanel + filterPanel + resultsPanel;
}

// ==========================================================================
// KRAKEN FLOW (ORCA) — lihat blok komentar besar di state.orca* di atas
// untuk penjelasan lengkap arsitektur & keterbatasan datanya.
// ==========================================================================
const ORCA_TOP_N = 25;
const ORCA_BID_OFFER_RATIO_MIN = 2;    // bidVolume >= 2x offerVolume
const ORCA_ATS_THRESHOLD = 50000000;   // Rp50 juta/transaksi dianggap "besar" (bukan ritel) untuk toggle umum High ATS
const ORCA_NONREGULAR_PCT_MIN = 30;    // crossingPct >= 30%
const ORCA_OFFER_SLENDER_RATIO_MAX = 0.15; // offerVolume <= 15% bidVolume (tapi offer masih >0, beda dari No Sell)

const ORCA_FILTER_DEFS = [
  { key:"bidOffer",    label:"High Bid/Offer",   desc:"Antrian beli jauh lebih tebal dari antrian jual — ada yang menampung." },
  { key:"ats",         label:"High ATS",         desc:"Average Trade Size besar = transaksi per eksekusi besar = pemain besar, bukan ritel." },
  { key:"noSell",      label:"No Sell",          desc:"Nyaris tidak ada tekanan jual pada periode itu (antrian jual kosong)." },
  { key:"closeHigh",   label:"Close High",       desc:"Ditutup di harga tertinggi hari itu — tanda kekuatan." },
  { key:"nonRegular",  label:"High Non-Regular", desc:"Banyak transaksi crossing/negosiasi di luar pasar reguler." },
  { key:"topVolume",   label:"Top Volume",       desc:`Top ${ORCA_TOP_N} saham paling ramai secara volume transaksi.` },
  { key:"frequency",   label:"Frequency",        desc:`Top ${ORCA_TOP_N} saham paling ramai secara frekuensi transaksi.` },
  { key:"foreignPlus", label:"Foreign +",        desc:"Asing net beli pada jendela waktu terpilih." },
  { key:"offerSlender",label:"Offer's Slender",  desc:"Antrian jual menipis drastis — sedikit yang mau melepas barang." },
];

const ORCA_MARKETCAP_OPTIONS = [
  { key:"all",    label:"Semua", max:null },
  { key:"1t",     label:"≤1T",   max:1e12 },
  { key:"5t",     label:"≤5T",   max:5e12 },
  { key:"10t",    label:"≤10T",  max:10e12 },
  { key:"50t",    label:"≤50T",  max:50e12 },
  { key:"100t",   label:"≤100T", max:100e12 },
  { key:"custom", label:"Custom T", max:null },
];

function orcaForeignWindowField(duration){
  if(duration <= 1) return { field:"foreignNet1D", label:"1 Hari" };
  if(duration <= 5) return { field:"foreignNet5D", label:"5 Hari" };
  return { field:"foreignNet20D", label:"20 Hari" };
}

function orcaMarketCapMax(){
  const opt = ORCA_MARKETCAP_OPTIONS.find(o=>o.key===state.orcaMarketCap);
  if(!opt) return null;
  if(opt.key === "custom"){
    const v = parseFloat(state.orcaCustomCapT);
    return (v > 0) ? v * 1e12 : null;
  }
  return opt.max;
}

// ==========================================================================
// Histori bid/offer/value/frequency/nonreg PER HARI dari `flows`, dipakai
// supaya Durasi (1-7 hari) di Kraken Flow benar-benar mengagregasi semua
// parameter -- bukan cuma Foreign+ seperti sebelum kolom bid/offer di
// `flows` ada (lihat sql/07_flows_bid_offer.sql & sync-idx-full.mjs).
// Ditarik SEKALI (7 hari bursa terakhir, semua emiten) lalu di-cache di
// state.orcaHistoryByTicker -- computeOrcaResults() menghitung ulang
// agregat jendela N-hari dari cache ini tiap render, instan, tanpa fetch
// ulang tiap kali Durasi/filter diubah (pola sama seperti epsRaw di
// Entry Price Scanner).
// ==========================================================================
const ORCA_HISTORY_TRADING_DAYS = 7;

async function loadOrcaHistory(){
  if(!SUPABASE_URL || !SUPABASE_KEY) return;
  state.orcaHistoryLoading = true; state.orcaHistoryError = null; render();
  try{
    const cutoff = epsCutoffDate(ORCA_HISTORY_TRADING_DAYS);
    const qs = new URLSearchParams({
      date: `gte.${cutoff}`,
      // Bid/Offer tidak disimpan di `flows` oleh sync-idx-full.mjs — itu
      // snapshot order book terbaru yang ditulis ke tabel `stocks`. Meminta
      // kolom tersebut dari `flows` membuat PostgREST HTTP 400, sehingga
      // seluruh histori ORCA gagal dimuat dan metrik lain ikut kosong.
      // Histori hanya mengambil kolom yang memang ada di flows.
      select: "ticker,date,value,frequency,nonreg_value,volume,foreign_buy,foreign_sell,close,high",
      order: "date.desc"
    });
    const res = await fetch(`${SUPABASE_URL}/flows?${qs}`, { headers: getSupaHeaders(), cache: "no-store" });
    if(!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    const rows = await res.json();
    if(rows.message) throw new Error(rows.message);

    // Susun per ticker, simpan hanya ORCA_HISTORY_TRADING_DAYS tanggal
    // TERBARU yang benar-benar ada datanya untuk ticker itu (tidak semua
    // saham transaksi tiap hari bursa, mis. suspensi).
    const byTicker = {};
    rows.forEach(r=>{
      const t = String(r.ticker||"").toUpperCase();
      if(!t || !r.date) return;
      if(!byTicker[t]) byTicker[t] = [];
      byTicker[t].push(r);
    });
    Object.keys(byTicker).forEach(t=>{
      byTicker[t].sort((a,b)=> a.date < b.date ? 1 : -1); // terbaru dulu
      byTicker[t] = byTicker[t].slice(0, ORCA_HISTORY_TRADING_DAYS);
    });

    state.orcaHistoryByTicker = byTicker;
    state.orcaHistoryLoadedAt = new Date().toISOString();
  } catch(e){
    state.orcaHistoryError = "Gagal menarik histori Kraken Flow: " + e.message + " (filter tetap jalan pakai snapshot hari terakhir).";
  }
  state.orcaHistoryLoading = false;
  render();
}

function ensureOrcaHistoryLoaded(){
  if(state.orcaHistoryByTicker || state.orcaHistoryLoading) return;
  loadOrcaHistory();
}

// Hitung agregat jendela `duration` hari bursa TERBARU untuk satu ticker
// dari cache histori. Null kalau ticker itu tidak ada di cache sama
// sekali (belum ada baris `flows` sejak migration 07 dijalankan) --
// pemanggil (computeOrcaResults) lalu jatuh balik ke snapshot stocks.
function orcaWindowAggregate(ticker, duration){
  const rowsAll = state.orcaHistoryByTicker ? state.orcaHistoryByTicker[ticker] : null;
  if(!rowsAll || !rowsAll.length) return null;
  const rows = rowsAll.slice(0, Math.max(1, duration));
  const latest = rows[0]; // hari bursa paling baru dalam jendela

  let sumValue = 0, sumFreq = 0, sumNonreg = 0, sumVolume = 0;
  let sumForeignNetRp = 0;
  let hasValue = false, hasFreq = false;
  rows.forEach(r=>{
    if(r.value != null){ sumValue += Number(r.value)||0; hasValue = true; }
    if(r.frequency != null){ sumFreq += Number(r.frequency)||0; hasFreq = true; }
    if(r.nonreg_value != null) sumNonreg += Number(r.nonreg_value)||0;
    if(r.volume != null) sumVolume += Number(r.volume)||0;
    // Net asing harian (Rp) dihitung dari kolom asli `flows`:
    // (foreign_buy - foreign_sell) x close — foreign_buy/sell di IDX
    // berupa LEMBAR, jadi dikali harga close hari itu. Dipakai filter
    // Foreign+ kalau kolom ringkasan 1/5/20 hari di snapshot tidak ada.
    const fb = Number(r.foreign_buy), fs = Number(r.foreign_sell), cl = Number(r.close);
    if(Number.isFinite(fb) && Number.isFinite(fs) && Number.isFinite(cl)){
      sumForeignNetRp += (fb - fs) * cl;
    }
  });

  return {
    // Bid/Offer adalah snapshot antrian (state sesaat), jadi dipakai dari
    // hari PALING BARU dalam jendela -- bukan dijumlah/dirata-rata lintas
    // hari (menjumlah antrian order book beberapa hari tidak bermakna).
    // SUMBERNYA snapshot `stocks`, bukan `flows` (lihat catatan di
    // loadOrcaHistory) -- jadi di sini dibiarkan null dan computeOrcaResults()
    // yang menggabungkannya dengan snapshot via `??`.
    bid: null, bidVolume: null, offer: null, offerVolume: null,
    cClose: latest.close != null ? Number(latest.close) : null,
    cHigh: latest.high != null ? Number(latest.high) : null,
    // ATS & Non-Regular% dihitung dari TOTAL jendela (rata-rata tertimbang),
    // bukan rata-rata dari rata-rata harian -- lebih akurat kalau frekuensi
    // hari-hari dalam jendela tidak sama.
    avgTicket: (hasValue && hasFreq && sumFreq > 0) ? sumValue / sumFreq : null,
    crossingPct: (hasValue && sumValue > 0) ? (sumNonreg / sumValue) * 100 : null,
    frequency: hasFreq ? sumFreq : null,
    cVol: sumVolume,
    // Net asing agregat jendela (Rp) — fallback untuk Foreign+ dan skor
    // komposit kalau kolom ringkasan foreign_net_1d/5d/20d tidak tersedia.
    foreignNetWindow: sumForeignNetRp || null,
    tradingDaysInWindow: rows.length,
  };
}

function computeOrcaResults(){
  const filters = state.orcaFilters;
  if(!filters.size) return { rows:[], ranked:false, universeSize:0 };

  const capMax = orcaMarketCapMax();
  const foreignWin = orcaForeignWindowField(state.orcaDuration);

  // Tempel agregat jendela N-hari (dari cache `flows`, lihat
  // orcaWindowAggregate() di atas) ke tiap saham SEBELUM filter apa pun
  // dijalankan -- jadi Bid/Offer, ATS, Non-Regular%, Frequency & Volume di
  // bawah sudah mengikuti Durasi terpilih. Kalau histori belum ke-load
  // (masih fetch) atau ticker itu belum punya baris histori sama sekali
  // (migration baru dijalankan / belum pernah sync), field snapshot asli
  // dari `stocks` (hari terakhir) dipakai sebagai fallback -- jadi tab
  // tetap terpakai walau data historis belum lengkap.
  const usingHistory = !!state.orcaHistoryByTicker;
  let universe = enriched()
    .map(s=>{
      const w = usingHistory ? orcaWindowAggregate(s.ticker, state.orcaDuration) : null;
      if(!w) return { ...s, orcaWindowDays: null };
      return {
        ...s,
        bid: w.bid ?? s.bid, bidVolume: w.bidVolume ?? s.bidVolume,
        offer: w.offer ?? s.offer, offerVolume: w.offerVolume ?? s.offerVolume,
        avgTicket: w.avgTicket ?? s.avgTicket, crossingPct: w.crossingPct ?? s.crossingPct,
        frequency: w.frequency ?? s.frequency, cVol: w.cVol || s.cVol,
        cClose: w.cClose ?? s.cClose, cHigh: w.cHigh ?? s.cHigh,
        foreignNetWindow: w.foreignNetWindow ?? null,
        orcaWindowDays: w.tradingDaysInWindow,
      };
    })
    .filter(s=>{
      if(s.cClose == null) return false; // suspensi / tanpa harga -> tidak relevan
      if(capMax != null && (s.marketCap == null || s.marketCap > capMax)) return false;
      return true;
    });

  // Rank-based (Top Volume / Frequency) dihitung dari universe SETELAH filter
  // Market Cap, supaya "Top 25" konsisten dengan kategori cap yang dipilih.
  const topVolumeTickers = new Set(
    universe.filter(s=>(s.cVol||0) > 0).sort((a,b)=>(b.cVol||0)-(a.cVol||0)).slice(0, ORCA_TOP_N).map(s=>s.ticker)
  );
  const topFreqTickers = new Set(
    universe.filter(s=>(s.frequency||0) > 0).sort((a,b)=>(b.frequency||0)-(a.frequency||0)).slice(0, ORCA_TOP_N).map(s=>s.ticker)
  );

  function passesAll(s){
    for(const key of filters){
      if(key === "bidOffer"){
        if(!(s.bidVolume > 0 && s.offerVolume != null && (s.offerVolume === 0 || (s.bidVolume / s.offerVolume) >= ORCA_BID_OFFER_RATIO_MIN))) return false;
      } else if(key === "ats"){
        if(!(s.avgTicket != null && s.avgTicket >= ORCA_ATS_THRESHOLD)) return false;
      } else if(key === "noSell"){
        if(!(s.offerVolume != null && s.offerVolume <= 0 && s.bidVolume > 0)) return false;
      } else if(key === "closeHigh"){
        if(!(s.cClose != null && s.cHigh != null && s.cClose >= s.cHigh - 1e-6)) return false;
      } else if(key === "nonRegular"){
        if(!(s.crossingPct != null && s.crossingPct >= ORCA_NONREGULAR_PCT_MIN)) return false;
      } else if(key === "topVolume"){
        if(!topVolumeTickers.has(s.ticker)) return false;
      } else if(key === "frequency"){
        if(!topFreqTickers.has(s.ticker)) return false;
      } else if(key === "foreignPlus"){
        // Utamakan kolom ringkasan snapshot (foreign_net_1d/5d/20d);
        // kalau tidak tersedia (kolom belum ada di DB), pakai net asing
        // yang dihitung dari histori flows dalam jendela terpilih.
        const v = s[foreignWin.field] ?? s.foreignNetWindow ?? null;
        if(!(v != null && v > 0)) return false;
      } else if(key === "offerSlender"){
        if(!(s.offerVolume > 0 && s.bidVolume > 0 && (s.offerVolume / s.bidVolume) <= ORCA_OFFER_SLENDER_RATIO_MAX)) return false;
        if(state.orcaMinAts > 0 && !(s.avgTicket != null && s.avgTicket >= state.orcaMinAts)) return false;
        if(state.orcaMinFreq > 0 && !(s.frequency != null && s.frequency >= state.orcaMinFreq)) return false;
      }
    }
    return true;
  }

  let rows = universe.filter(passesAll);

  if(state.orcaSearch.trim()){
    const q = state.orcaSearch.trim().toUpperCase();
    rows = rows.filter(s => s.ticker.includes(q) || (s.name||"").toUpperCase().includes(q));
  }

  // Skor komposit heuristik v1 — HANYA dipakai untuk urutan tampil, bukan
  // untuk lolos/tidaknya filter (itu murni AND di atas). Bukan dari sumber
  // luar mana pun, dan boleh disetel ulang kalau ada masukan lebih baik.
  rows = rows.map(s=>{
    const bidOfferRatio = (s.bidVolume > 0 && s.offerVolume > 0) ? s.bidVolume / s.offerVolume : (s.bidVolume > 0 && s.offerVolume === 0 ? 999 : null);
    const foreignVal = s[foreignWin.field] ?? s.foreignNetWindow ?? null;
    const score = (bidOfferRatio != null ? Math.min(bidOfferRatio, 20) * 2 : 0)
      + (s.avgTicket ? Math.min(s.avgTicket / 1e9, 10) * 3 : 0)
      + (foreignVal > 0 ? Math.min(foreignVal / 1e9, 20) * 2 : 0)
      + (s.crossingPct ? Math.min(s.crossingPct, 100) * 0.3 : 0)
      + (s.frequency ? Math.min(s.frequency / 1000, 20) : 0)
      + (s.cVol ? Math.min(s.cVol / 1e7, 20) : 0);
    return { ...s, orcaBidOfferRatio: bidOfferRatio, orcaForeignVal: foreignVal, orcaScore: score };
  }).sort((a,b)=> b.orcaScore - a.orcaScore).slice(0, ORCA_TOP_N);

  return { rows, ranked:true, foreignWinLabel: foreignWin.label, universeSize: universe.length, usingHistory };
}

function toggleOrcaFilter(key){
  state.orcaFilters.has(key) ? state.orcaFilters.delete(key) : state.orcaFilters.add(key);
  render();
}

function setOrcaSeg(group, value){
  if(group === "duration") state.orcaDuration = Number(value) || 1;
  else if(group === "cap") state.orcaMarketCap = value;
  else if(group === "minAts") state.orcaMinAts = Number(value) || 0;
  else if(group === "minFreq") state.orcaMinFreq = Number(value) || 0;
  render();
}

function resetOrcaFilters(){
  state.orcaFilters = new Set();
  state.orcaDuration = 3;
  state.orcaMarketCap = "all";
  state.orcaCustomCapT = "";
  state.orcaMinAts = 0;
  state.orcaMinFreq = 0;
  state.orcaSearch = "";
  render();
}

function orcaFilterChip(def){
  const active = state.orcaFilters.has(def.key);
  return `<button type="button" class="btn ${active?'btn-primary':'btn-outline'}" data-orca-filter="${def.key}" title="${escapeHtml(def.desc)}" style="padding:9px 14px;font-size:12px;">${active?'✓ ':''}${def.label}</button>`;
}

function orcaSegBtn(group, key, label, active){
  return `<button type="button" class="btn ${active?'btn-primary':'btn-outline'}" data-orca-seg="${group}" data-orca-value="${key}" style="padding:7px 12px;font-size:11.5px;">${label}</button>`;
}

function renderKrakenFlow(){
  const result = computeOrcaResults();
  const rows = result.rows;

  // Deteksi "data snapshot bid/offer kosong" — kalau TIDAK ADA satu emiten
  // pun yang punya angka antrian, filter berbasis order book (High Bid/Offer,
  // No Sell, Offer's Slender) pasti menghasilkan 0 tanpa terlihat kenapa.
  // Biasanya terjadi karena sync terakhir dijalankan dengan --skip-fetch
  // (lihat catatan di sync-idx-full.mjs) atau nama kolom order book di
  // endpoint IDX berubah. Peringatan ditampilkan di panel filter, bukan
  // cuma diam-diam kosong.
  const bidOfferDataMissing = !state.stocks.some(s => s.bidVolume != null || s.offerVolume != null);

  const infoPanel = `
    <details class="panel" id="orcaInfoPanel" style="flex-direction:column;align-items:stretch;" ${state.orcaInfoOpen?"open":""}>
      <summary style="cursor:pointer;font-weight:700;font-size:14px;list-style:none;display:flex;justify-content:space-between;align-items:center;">
        <span>⬢ Cara Pakai &amp; Arti Parameter — Kraken Flow (ORCA)</span><span style="color:var(--muted);font-size:11px;">${state.orcaInfoOpen?"▲ Tutup":"▼ Buka"}</span>
      </summary>
      <div style="margin-top:16px;display:flex;flex-direction:column;gap:14px;font-size:12.5px;line-height:1.7;color:var(--text);">
        <div>
          <div style="font-weight:700;margin-bottom:6px;">Cara pakai</div>
          <div style="color:var(--muted);">
            1. Pilih <b>minimal satu filter</b> dari daftar parameter (bisa dikombinasikan).<br>
            2. Atur Durasi (1-7 hari) dan batas Kapitalisasi Pasar bila perlu.<br>
            3. Hasil langsung tampil — Top ${ORCA_TOP_N}, tanpa perlu tombol scan.
          </div>
          <div style="margin-top:8px;background:rgba(234,179,8,0.08);border:1px solid rgba(234,179,8,0.2);border-radius:8px;padding:10px 12px;color:var(--gold);">
            Makin banyak filter digabung, makin sedikit dan makin selektif hasilnya (logika AND — harus lolos SEMUA filter aktif). Kalau hasilnya kosong, kurangi filternya.
          </div>
        </div>
        <div>
          <div style="font-weight:700;margin-bottom:6px;">Arti tiap parameter</div>
          <div style="color:var(--muted);display:flex;flex-direction:column;gap:4px;">
            ${ORCA_FILTER_DEFS.map(d=>`<div><b style="color:var(--text);">${d.label}</b> — ${d.desc}</div>`).join("")}
          </div>
        </div>
        <div style="background:rgba(6,182,212,0.08);border:1px solid rgba(6,182,212,0.25);border-radius:8px;padding:10px 12px;">
          <b style="color:var(--teal);">Catatan data:</b> Bid/Offer, ATS, Non-Regular%, Frequency & Volume sekarang mengikuti <b>Durasi (1-7 hari bursa) yang dipilih</b>, dihitung dari histori harian asli di tabel <code>flows</code> (bukan cuma snapshot hari terakhir lagi) — ATS & Non-Regular% dijumlah dulu lalu dibagi (rata-rata tertimbang), Bid/Offer diambil dari hari bursa paling baru dalam jendela (antrian order book tidak dijumlah lintas hari). Foreign+ tetap memakai agregat 1/5/20 hari yang memang sudah ada. Kalau sebuah saham belum punya baris histori sama sekali (mis. baru pertama kali disinkronkan setelah fitur ini aktif), filternya otomatis jatuh balik ke snapshot hari terakhir supaya tidak hilang dari hasil.
          ${state.orcaHistoryLoading ? `<div style="margin-top:6px;color:var(--gold);">⏳ Menarik histori 7 hari bursa terakhir dari <code>flows</code>...</div>` : ""}
          ${state.orcaHistoryError ? `<div style="margin-top:6px;color:#f87171;">${escapeHtml(state.orcaHistoryError)}</div>` : ""}
          ${(!state.orcaHistoryLoading && state.orcaHistoryByTicker) ? `<div style="margin-top:6px;color:var(--muted);">Histori dimuat (${Object.keys(state.orcaHistoryByTicker).length} emiten punya baris <code>flows</code> dalam jendela ini)${state.orcaHistoryLoadedAt ? " — " + new Date(state.orcaHistoryLoadedAt).toLocaleTimeString("id-ID") : ""}. <button type="button" id="orcaHistoryRefreshBtn" style="background:none;border:none;color:var(--teal);text-decoration:underline;cursor:pointer;font-size:11.5px;padding:0;">Muat ulang</button></div>` : ""}
        </div>
      </div>
    </details>`;

  const filterChips = ORCA_FILTER_DEFS.map(orcaFilterChip).join("");

  const strongPanel = `
    <div style="margin-top:14px;padding-top:14px;border-top:1px dashed var(--border);">
      <div style="font-size:10px;color:var(--muted);text-transform:uppercase;font-weight:700;margin-bottom:8px;">Filter Kuat · khusus Offer's Slender</div>
      <div style="display:flex;flex-wrap:wrap;gap:18px;">
        <div>
          <div style="font-size:10px;color:var(--muted);margin-bottom:6px;">Min ATS</div>
          <div style="display:flex;gap:6px;">
            ${orcaSegBtn("minAts","0","Semua",state.orcaMinAts===0)}
            ${orcaSegBtn("minAts","2000000000","≥2M",state.orcaMinAts===2000000000)}
            ${orcaSegBtn("minAts","5000000000","≥5M",state.orcaMinAts===5000000000)}
          </div>
        </div>
        <div>
          <div style="font-size:10px;color:var(--muted);margin-bottom:6px;">Min Freq</div>
          <div style="display:flex;gap:6px;">
            ${orcaSegBtn("minFreq","0","Semua",state.orcaMinFreq===0)}
            ${orcaSegBtn("minFreq","2000","≥2k",state.orcaMinFreq===2000)}
            ${orcaSegBtn("minFreq","5000","≥5k",state.orcaMinFreq===5000)}
          </div>
        </div>
      </div>
      <div style="font-size:11px;color:var(--muted);margin-top:6px;">Nilai mengikuti angka di kartu (ATS dalam Miliar Rp — "M" = Miliar, Freq = jumlah transaksi hari itu). Semua = tak dibatasi. Hanya aktif kalau filter <b>Offer's Slender</b> dinyalakan.</div>
    </div>`;

  const durationBtns = [1,2,3,4,5,6,7].map(d=>orcaSegBtn("duration",String(d),`${d}H`,state.orcaDuration===d)).join("");
  const capBtns = ORCA_MARKETCAP_OPTIONS.map(o=>orcaSegBtn("cap",o.key,o.label,state.orcaMarketCap===o.key)).join("");
  const capLabel = ORCA_MARKETCAP_OPTIONS.find(o=>o.key===state.orcaMarketCap)?.label || "Semua";

  const filterPanel = `
    <div class="panel" style="flex-direction:column;align-items:stretch;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:14px;">
        <div class="filter-section-title" style="margin:0;">⬢ Filter Order Flow — Bandarmology<span class="line"></span></div>
        <input id="orcaSearchInput" type="text" placeholder="Cari emiten (mis. IATA)" value="${escapeHtml(state.orcaSearch)}" style="background:rgba(0,0,0,0.2);border:1px solid var(--border);color:var(--text);font-size:12.5px;border-radius:8px;padding:8px 12px;width:180px;">
      </div>
      <div style="font-size:10px;color:var(--muted);text-transform:uppercase;font-weight:700;margin-bottom:8px;">Parameter · bisa dikombinasikan · Top ${ORCA_TOP_N} hasil</div>
      ${bidOfferDataMissing ? `<div style="margin-bottom:10px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.3);border-radius:8px;padding:10px 12px;font-size:12px;color:#f87171;">⚠️ <b>Snapshot antrian Bid/Offer kosong</b> untuk semua emiten — filter <b>High Bid/Offer</b>, <b>No Sell</b>, dan <b>Offer's Slender</b> tidak akan menghasilkan apa pun sampai data order book tersinkron ulang. Jalankan <code>node sync-idx-full.mjs</code> (TANPA <code>--skip-fetch</code>) dari jaringan rumah, lalu muat ulang halaman. Filter lain (ATS, Non-Regular, Close High, Top Volume, Frequency, Foreign+) tetap bisa dipakai.</div>` : ""}
      <div style="display:flex;flex-wrap:wrap;gap:8px;">${filterChips}</div>
      ${strongPanel}
      <div style="display:flex;flex-wrap:wrap;gap:24px;margin-top:16px;padding-top:14px;border-top:1px dashed var(--border);">
        <div>
          <div style="font-size:10px;color:var(--muted);text-transform:uppercase;font-weight:700;margin-bottom:8px;">Durasi · max 7 hari</div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;">${durationBtns}</div>
        </div>
        <div>
          <div style="font-size:10px;color:var(--muted);text-transform:uppercase;font-weight:700;margin-bottom:8px;">Market Cap · maksimal ${escapeHtml(capLabel)}</div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;">
            ${capBtns}
            ${state.orcaMarketCap==="custom" ? `<input id="orcaCustomCapInput" type="number" min="0" step="0.1" placeholder="mis. 25" value="${escapeHtml(state.orcaCustomCapT)}" style="background:rgba(0,0,0,0.2);border:1px solid var(--border);color:var(--text);font-size:12px;border-radius:8px;padding:7px 10px;width:90px;"> <span style="font-size:11px;color:var(--muted);">Triliun Rp</span>` : ""}
          </div>
        </div>
        <div style="margin-left:auto;display:flex;align-items:flex-end;">
          <button class="btn btn-outline" id="orcaResetBtn" style="color:#f87171;border-color:rgba(239,68,68,0.4);">↺ Reset ORCA</button>
        </div>
      </div>
    </div>`;

  const resultsPanel = `
    <div class="panel" style="flex-direction:column;align-items:stretch;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:14px;">
        <div class="filter-section-title" style="margin:0;">⊙ Hasil ORCA <span class="count-badge">${result.ranked ? rows.length : 0} saham</span><span class="line"></span></div>
        ${rows.length ? `<button class="btn btn-outline" id="orcaCsvBtn" style="color:#22d3ee;border-color:rgba(6,182,212,0.4);">CSV</button>` : ""}
      </div>
      ${!result.ranked
        ? `<div class="empty-box">⬢ Pilih minimal satu filter di atas — hasil akan langsung tampil di sini tanpa perlu scan.<br>${result.usingHistory ? `Data diagregasi dari histori ${ORCA_HISTORY_TRADING_DAYS} hari bursa terakhir (${state.stocks.length} emiten diikuti).` : `Data diambil dari snapshot Bandarmology terakhir (${state.stocks.length} emiten)${state.orcaHistoryLoading ? " — histori sedang dimuat..." : ""}.`}</div>`
        : !rows.length
          ? `<div class="empty-box">Tidak ada saham yang lolos kombinasi filter ini (dari ${result.universeSize} emiten setelah filter Market Cap) — coba kurangi filter atau longgarkan Market Cap.</div>`
          : `${renderBacktestSaveBar("orca", rows.map(r=>({
              ticker: r.ticker, price: Math.round(r.cClose||0),
              kriteria: "Kraken Flow (ORCA)",
              keterangan: `B/O: ${r.orcaBidOfferRatio!=null?(r.orcaBidOfferRatio>=999?'∞':r.orcaBidOfferRatio.toFixed(1)+'x'):'-'}; ATS: ${r.avgTicket!=null?fmtCap(r.avgTicket):'-'}; Non-Reg%: ${r.crossingPct!=null?r.crossingPct.toFixed(1)+'%':'-'}; Foreign: ${r.orcaForeignVal!=null?fmtRp(r.orcaForeignVal):'-'}`
            })))}
            <div class="table-wrap">
        <table class="mono">
          <thead>
            <tr>
              <th></th><th>#</th><th>Kode</th><th>Nama</th><th>Harga</th><th>1D%</th><th>Bid</th><th>Offer</th><th>B/O</th><th>ATS${result.usingHistory?` (${state.orcaDuration}H)`:""}</th><th>Freq${result.usingHistory?` (${state.orcaDuration}H)`:""}</th><th>Non-Reg%${result.usingHistory?` (${state.orcaDuration}H)`:""}</th><th>Foreign (${escapeHtml(result.foreignWinLabel||"")})</th><th>Volume</th><th>Mkt Cap</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map((r,i)=>`
              <tr>
                ${backtestRowCheckbox("orca", { ticker: r.ticker, price: Math.round(r.cClose||0) })}
                <td>${i+1}</td>
                <td class="ticker-cell"><button class="ticker-link" data-detail="${r.ticker}" title="Lihat detail ${r.ticker}">${r.ticker}</button></td>
                <td style="white-space:normal;max-width:160px;font-family:'Sora',sans-serif;font-size:12px;">${escapeHtml(r.name)}</td>
                <td>${fmtNum(r.cClose)}</td>
                <td style="color:${(r.changePct||0)>=0?'var(--up)':'var(--down)'};">${r.changePct!=null?((r.changePct>=0?'+':'')+r.changePct.toFixed(1)+'%'):'-'}</td>
                <td>${fmtNum(r.bidVolume)}</td>
                <td>${fmtNum(r.offerVolume)}</td>
                <td>${r.orcaBidOfferRatio!=null ? (r.orcaBidOfferRatio>=999?'∞':r.orcaBidOfferRatio.toFixed(1)+'x') : '-'}</td>
                <td>${r.avgTicket!=null?fmtCap(r.avgTicket):'-'}</td>
                <td>${fmtNum(r.frequency)}</td>
                <td>${r.crossingPct!=null?r.crossingPct.toFixed(1)+'%':'-'}</td>
                <td style="color:${(r.orcaForeignVal||0)>=0?'var(--up)':'var(--down)'};">${r.orcaForeignVal!=null?fmtRp(r.orcaForeignVal):'-'}</td>
                <td>${fmtCap(r.cVol)}</td>
                <td>${r.marketCap!=null?fmtCap(r.marketCap):'-'}</td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div>`}
    </div>`;

  return infoPanel + filterPanel + resultsPanel;
}

function exportOrcaToCsv(){
  const result = computeOrcaResults();
  const rows = result.rows;
  if(!rows.length) return alert("Belum ada hasil ORCA untuk diekspor.");
  const header = ["Kode","Nama","Harga","1D%","Bid","Offer","B/O Ratio","ATS","Frekuensi","Non-Reg %","Foreign","Volume","Market Cap"];
  const lines = [header.join(",")];
  rows.forEach(r=>{
    lines.push([
      r.ticker, `"${(r.name||"").replace(/"/g,'""')}"`, Math.round(r.cClose||0), (r.changePct||0).toFixed(2),
      Math.round(r.bidVolume||0), Math.round(r.offerVolume||0), r.orcaBidOfferRatio!=null?r.orcaBidOfferRatio.toFixed(2):"",
      Math.round(r.avgTicket||0), Math.round(r.frequency||0), r.crossingPct!=null?r.crossingPct.toFixed(2):"",
      Math.round(r.orcaForeignVal||0), Math.round(r.cVol||0), Math.round(r.marketCap||0)
    ].join(","));
  });
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `KrakenFlowORCA_${todayLocalISO()}.csv`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ==========================================
// TAB BSJP — "Beli Sore, Jual Pagi"
// ==========================================
function bsjpChecklistRows(checks){
  return checks.map(c => `<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:3px 0;font-size:11.5px;line-height:1.3;">
    <span style="color:${c.na?'var(--muted)':c.pass?'var(--up)':'var(--down)'};">${c.na?'▫️':c.pass?'✅':'❌'} ${c.label}</span>
    <span class="mono" style="color:var(--muted);white-space:nowrap;">${c.na?'n/a':c.pass?'lolos':'gagal'}</span>
  </div>`).join("");
}

function bsjpSignalPill(sig, tone){
  const bg = tone==="up" ? "rgba(16,185,129,0.15)" : tone==="down" ? "rgba(239,68,68,0.15)" : "rgba(234,179,8,0.15)";
  const fg = tone==="up" ? "var(--up)" : tone==="down" ? "var(--down)" : "var(--gold)";
  return `<span style="display:inline-block;padding:3px 9px;border-radius:999px;font-size:10.5px;font-weight:700;letter-spacing:.03em;background:${bg};color:${fg};">${sig}</span>`;
}

function bsjpTradePlanCard(s){
  const tp = s.bsjp.tradePlan;
  const row = (label, val, tone) => `<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px dashed var(--border);"><span style="color:var(--muted);font-size:12px;">${label}</span><span class="mono" style="font-weight:700;color:${tone||'var(--text)'};">${val}</span></div>`;
  return `
    <div style="background:rgba(0,0,0,0.15);border:1px solid var(--border);border-radius:10px;padding:14px;margin-top:10px;">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--muted);font-weight:700;margin-bottom:8px;">📋 Trade Plan Otomatis · Entry Pre-Closing (15:50–16:15 WIB) → Exit Sesi Pagi (09:00–09:30 WIB)</div>
      ${row("Entry (closing auction)", tp.entry!=null ? "Rp "+fmtNum(Math.round(tp.entry)) : "-")}
      ${row("Target Profit 1 ("+state.bsjpParams.tp1Pct+"%)", tp.tp1!=null ? "Rp "+fmtNum(Math.round(tp.tp1)) : "-", "var(--up)")}
      ${row("Target Profit 2 ("+state.bsjpParams.tp2Pct+"%)", tp.tp2!=null ? "Rp "+fmtNum(Math.round(tp.tp2)) : "-", "var(--up)")}
      ${row("Stop Loss ("+state.bsjpParams.slPct+"%)", tp.sl!=null ? "Rp "+fmtNum(Math.round(tp.sl)) : "-", "var(--down)")}
      ${row("Risk : Reward (ke TP1)", tp.rr!=null ? "1 : "+tp.rr.toFixed(2) : "-")}
      <div style="margin-top:10px;padding-top:10px;border-top:1px dashed var(--border);font-size:10.5px;color:var(--muted);">Checklist 8 Kriteria BSJP (${s.bsjp.passedCount}/${s.bsjp.totalChecks} lolos${s.bsjp.naCount?`, ${s.bsjp.naCount} tanpa data`:""}):</div>
      ${bsjpChecklistRows(s.bsjp.checks)}
      <div style="margin-top:8px;font-size:10px;color:var(--muted);">⚠️ Bukan rekomendasi finansial — semata alat bantu screening berbasis data historis. Selalu cek ulang orderbook & berita sebelum entry.</div>
    </div>`;
}

// Export watchlist ke format yang bisa langsung ditempel/diimpor ke
// aplikasi broker (mengikuti pola idx-bsjp-screener: Stockbit, Mirae Asset
// Neo HOTS, Mandiri Sekuritas MOST).
function formatBsjpExport(tickers, fmt){
  if (fmt === "mirae") return "Code,Market\n" + tickers.map(t=>`${t},IDX`).join("\n");
  if (fmt === "mandiri") return tickers.map(t=>`${t};RG`).join("\n");
  return tickers.join(", "); // stockbit: daftar dipisah koma
}

// ==========================================
// SESI PASAR BEI (WIB) — dipakai header tab BSJP untuk status
// Pre-Opening/Sesi 1/Istirahat/Sesi 2/Pre-Closing/Post-Closing/Tutup +
// hitung mundur & jendela "Late Session" khusus BSJP (15:50-16:15 WIB).
// Perkiraan jam Senin-Kamis (Jumat sesi sedikit berbeda, tidak dibedakan
// di sini demi kesederhanaan — cukup akurat untuk indikator, bukan
// pengganti jam bursa resmi).
// ==========================================
function getWibNow(){
  // WIB = UTC+7, tidak pakai DST — cukup ambil waktu UTC lalu tambah 7 jam.
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset()*60000;
  return new Date(utcMs + 7*3600000);
}
function computeBsjpMarketPhase(){
  const wib = getWibNow();
  const day = wib.getDay(); // 0=Minggu, 6=Sabtu
  const mins = wib.getHours()*60 + wib.getMinutes();
  const at = (h,m) => h*60+m;
  const fmtClock = `${String(wib.getHours()).padStart(2,'0')}:${String(wib.getMinutes()).padStart(2,'0')}:${String(wib.getSeconds()).padStart(2,'0')}`;

  if (day === 0 || day === 6) {
    return { label:"Pasar Tutup (Akhir Pekan)", tone:"muted", isLateSession:false, closingInMin:null, clock:fmtClock };
  }
  const bounds = [
    { from: at(0,0),   to: at(8,45),  label:"Pasar Tutup", tone:"muted", late:false },
    { from: at(8,45),  to: at(9,0),   label:"Pre-Opening", tone:"gold", late:false },
    { from: at(9,0),   to: at(12,0),  label:"Sesi I", tone:"up", late:false },
    { from: at(12,0),  to: at(13,30), label:"Istirahat", tone:"muted", late:false },
    { from: at(13,30), to: at(15,50), label:"Sesi II", tone:"up", late:false },
    { from: at(15,50), to: at(16,0),  label:"Pre-Closing (Late Session)", tone:"gold", late:true },
    { from: at(16,0),  to: at(16,15), label:"Post-Closing (Late Session)", tone:"gold", late:true },
    { from: at(16,15), to: at(24,0),  label:"Pasar Tutup", tone:"muted", late:false },
  ];
  const cur = bounds.find(b => mins >= b.from && mins < b.to) || bounds[bounds.length-1];
  const closingInMin = (cur.label!=="Pasar Tutup") ? (cur.to - mins) : null;
  return { label: cur.label, tone: cur.tone, isLateSession: cur.late, closingInMin, clock: fmtClock };
}

// Preset "Radar" — mengelompokkan hasil BSJP ke beberapa cara pandang
// cepat (mirip filter chip idx-bsjp-screener), di atas filter/skor yang
// sudah dihitung computeBsjpEngine per saham.
const BSJP_PRESETS = [
  { key:"strict", label:"Strict BSJP Rules", desc:"Lolos SEMUA 8 kriteria deterministik BSJP.",
    filter: s => s.bsjp.lolos },
  { key:"accumulation", label:"Top Accumulation", desc:"Indikasi akumulasi bandar/asing terkuat (skor Bandar & Foreign Flow ≥ 15/25).",
    filter: s => (s.bsjp.breakdown.bandarScore||0) >= 15 },
  { key:"breakout52w", label:"Breakout 52W High", desc:"Harga dalam 3% dari puncak 52 minggu.",
    filter: s => s.high52w != null && s.cClose != null && s.cClose >= s.high52w*0.97 },
  { key:"liquidity", label:"High Liquidity (>10B)", desc:"Turnover harian di atas Rp 10 miliar.",
    filter: s => (s.turnover ?? s.valueTraded ?? 0) > 10e9 },
  { key:"all", label:"All Screened", desc:"Semua saham dalam universe screener, tanpa filter BSJP.",
    filter: () => true },
];

function renderBsjp(){
  const list = enriched();
  const phase = computeBsjpMarketPhase();
  const activePreset = BSJP_PRESETS.find(x=>x.key===state.bsjpPreset) || BSJP_PRESETS[0];

  const q = state.bsjpSearch.trim().toLowerCase();
  let rows = list.filter(s => !q || s.ticker.toLowerCase().includes(q));
  rows = rows.filter(activePreset.filter);
  rows.sort((a,b) => {
    if (state.bsjpSort === "score") return b.bsjp.score - a.bsjp.score;
    if (state.bsjpSort === "changePct") return (b.changePct||0) - (a.changePct||0);
    if (state.bsjpSort === "turnover") return (b.turnover||0) - (a.turnover||0);
    return 0;
  });
  rows = rows.slice(0, 200);

  const p = state.bsjpParams;
  const passedTickers = list.filter(s=>s.bsjp.lolos).map(s=>s.ticker);
  const strongBuyCount = list.filter(s=>s.bsjp.signal==="STRONG_BUY").length;

  // --- Statistik pasar agregat, dihitung dari universe screener aktif ---
  // "IHSG" di sini bukan angka indeks resmi (tidak ada feed indeks di
  // skema DB ini) — dilabeli jelas sebagai ESTIMASI: rata-rata perubahan
  // harga ditimbang Market Cap dari saham yang ada datanya.
  const withCap = list.filter(s=>s.marketCap>0 && s.changePct!=null);
  const totalCap = withCap.reduce((a,s)=>a+s.marketCap,0);
  const ihsgEstChangePct = totalCap>0 ? withCap.reduce((a,s)=>a+s.changePct*s.marketCap,0)/totalCap : null;
  const netForeignSum = list.reduce((a,s)=>a+(s.foreignNet1D||0),0);
  const turnoverSum = list.reduce((a,s)=>a+(s.turnover ?? s.valueTraded ?? 0),0);
  const advancers = list.filter(s=>(s.changePct||0)>0).length;
  const decliners = list.filter(s=>(s.changePct||0)<0).length;
  const unchanged = list.length - advancers - decliners;

  const headerBar = `
    <div class="panel" style="flex-wrap:wrap;gap:10px;align-items:center;">
      <span class="pill pill-up" style="display:inline-flex;align-items:center;gap:6px;">🗄️ Data Riil BEI (${fmtNum(list.length)})</span>
      <span class="pill" style="background:rgba(6,182,212,0.12);color:var(--teal);border:1px solid rgba(6,182,212,0.3);">${phase.isLateSession?"🌆 ":""}${phase.label}${phase.closingInMin!=null?` · tutup ${phase.closingInMin} mnt lagi`:""}</span>
      <span class="pill" style="background:rgba(255,255,255,0.05);color:var(--muted);border:1px solid var(--border);">🕐 ${phase.clock} WIB</span>
      <div style="margin-left:auto;display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
        <label style="display:flex;align-items:center;gap:6px;font-size:11.5px;color:var(--muted);cursor:pointer;" title="Mode Simulator: ubah parameter tanpa menimpa Pengaturan tersimpan">
          <input type="checkbox" id="bsjpSimulatorChk" ${state.bsjpSimulator?"checked":""}> Simulator${state.bsjpSimulator?" (aktif)":""}
        </label>
        <button class="btn btn-outline" id="bsjpExportBtn" ${passedTickers.length?"":"disabled"}>⬇️ Export</button>
        <button class="btn btn-outline" id="bsjpAlertsBtn">🔔 Alerts</button>
        <button class="btn btn-outline" id="bsjpParamsToggleBtn">⚙️ Params</button>
        <button class="btn btn-outline" id="bsjpRefreshBtn" title="Refresh data">🔄</button>
      </div>
    </div>`;

  const statCard = (label, val, tone) => `<div class="summary-card" style="min-width:150px;"><div class="summary-lbl">${label}</div><div class="summary-val" style="${tone?`color:${tone};`:""}font-size:16px;">${val}</div></div>`;
  const statsBar = `
    <div class="summary-grid" style="margin-bottom:0;">
      ${statCard("IHSG (estimasi vs kemarin)", ihsgEstChangePct!=null ? `${ihsgEstChangePct>=0?'▲':'▼'} ${ihsgEstChangePct>=0?'+':''}${ihsgEstChangePct.toFixed(2)}%` : "-", ihsgEstChangePct!=null ? (ihsgEstChangePct>=0?'var(--up)':'var(--down)') : null)}
      ${statCard("Net Foreign (agregat)", fmtRp(netForeignSum), netForeignSum>=0?'var(--up)':'var(--down)')}
      ${statCard("Turnover (agregat)", "Rp "+fmtCap(turnoverSum), "var(--teal)")}
      ${statCard("Market Breadth", `<span style="color:var(--up)">▲${fmtNum(advancers)}</span> <span style="color:var(--down)">▼${fmtNum(decliners)}</span> <span style="color:var(--muted)">•${fmtNum(unchanged)}</span>`)}
      ${statCard("Kandidat BSJP", `${fmtNum(rows.length)}`, "var(--gold)")}
    </div>`;

  const presetsBar = `
    <div class="panel" style="flex-wrap:wrap;gap:8px;align-items:center;">
      <span style="font-size:10.5px;color:var(--muted);text-transform:uppercase;font-weight:700;">Radar Presets:</span>
      ${BSJP_PRESETS.map(pr => {
        const cnt = list.filter(pr.filter).length;
        const active = state.bsjpPreset === pr.key;
        return `<button class="btn ${active?'btn-primary':'btn-outline'}" data-bsjp-preset="${pr.key}" title="${escapeHtml(pr.desc)}">${pr.label} <span class="count-badge" style="margin-left:4px;">${cnt}</span></button>`;
      }).join("")}
      <span style="margin-left:auto;font-size:12px;color:var(--muted);">Menampilkan <b style="color:var(--text);">${fmtNum(rows.length)}</b> kandidat</span>
      ${strongBuyCount ? `<span class="pill pill-up">⭐ ${strongBuyCount} STRONG_BUY</span>` : ""}
    </div>`;

  const infoPanel = `
    <details class="panel" style="flex-direction:column;align-items:stretch;" ${state.bsjpInfoOpen?"open":""}>
      <summary style="cursor:pointer;font-weight:700;font-size:14px;list-style:none;display:flex;justify-content:space-between;align-items:center;">
        <span>🌆 Apa itu BSJP (Beli Sore, Jual Pagi)?</span><span style="color:var(--muted);font-size:11px;">${state.bsjpInfoOpen?"▲ Tutup":"▼ Buka"}</span>
      </summary>
      <div style="margin-top:14px;font-size:12.5px;line-height:1.7;color:var(--muted);">
        Strategi momentum &amp; likuiditas ala institusi: entry di jendela <b style="color:var(--text);">Pre-Closing/Post-Closing Auction (15:50–16:15 WIB)</b> pada saham yang menunjukkan akumulasi kuat sore hari, lalu exit di <b style="color:var(--text);">liquidity surge pagi sesi berikutnya (09:00–09:30 WIB)</b>. Untuk lolos rekomendasi BSJP, saham harus lulus 8 kriteria deterministik di bawah (Likuiditas, Volume Spike, Range Harga, Bullish Closing, Trend, Akumulasi Bandar, Kedalaman Orderbook, Bebas Notasi Khusus), lalu diberi Skor Komposit 0–100 berdasarkan kekuatan tiap sinyal.
      </div>
    </details>`;

  const paramField = (key, label, step) => `<div class="field" style="min-width:140px;"><label style="font-size:10.5px;">${label}</label><input type="number" step="${step||1}" data-bsjp-param="${key}" value="${p[key]}"></div>`;

  const paramsPanel = state.bsjpParamsOpen ? `
    <div class="panel" style="flex-direction:column;align-items:stretch;">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div style="font-weight:700;font-size:13px;">⚙️ Parameter BSJP${state.bsjpSimulator?" — Mode Simulator (tidak disimpan)":""}</div>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:12px;">
        ${paramField("minTurnover","Min Turnover (Rp)", 1e9)}
        ${paramField("minVolRatio","Min Volume Ratio (x)", 0.1)}
        ${paramField("minChangePct","Gain Min (%)", 0.5)}
        ${paramField("maxChangePct","Gain Maks (%)", 0.5)}
        ${paramField("minBidAskRatio","Min Bid/Ask (x)", 0.05)}
        ${paramField("tp1Pct","TP1 (%)", 0.1)}
        ${paramField("tp2Pct","TP2 (%)", 0.1)}
        ${paramField("slPct","Stop Loss (%)", 0.1)}
      </div>
      <div style="margin-top:10px;"><button class="btn btn-outline" id="bsjpResetParamsBtn">↺ Kembalikan ke Default</button></div>
    </div>` : "";

  const toolbar = `
    <div class="panel" style="flex-wrap:wrap;gap:10px;align-items:center;">
      <input id="bsjpSearchInput" type="text" placeholder="Cari kode saham" value="${escapeHtml(state.bsjpSearch)}" style="background:rgba(0,0,0,0.2);border:1px solid var(--border);color:var(--text);font-size:12.5px;border-radius:8px;padding:8px 12px;width:160px;">
      <select id="bsjpSortSelect" style="background:rgba(0,0,0,0.2);border:1px solid var(--border);color:var(--text);font-size:12px;border-radius:8px;padding:7px 10px;">
        <option value="score" ${state.bsjpSort==="score"?"selected":""}>Urutkan: Skor BSJP</option>
        <option value="changePct" ${state.bsjpSort==="changePct"?"selected":""}>Urutkan: Perubahan %</option>
        <option value="turnover" ${state.bsjpSort==="turnover"?"selected":""}>Urutkan: Turnover</option>
      </select>
    </div>`;

  const exportPanel = state.bsjpExportOpen ? `
    <div class="panel" style="flex-direction:column;align-items:stretch;">
      <div style="display:flex;gap:8px;margin-bottom:10px;">
        ${["stockbit","mirae","mandiri"].map(f=>`<button class="btn ${state.bsjpExportFormat===f?'btn-primary':'btn-outline'}" data-bsjp-export-fmt="${f}">${f==="stockbit"?"Stockbit":f==="mirae"?"Mirae HOTS":"Mandiri MOST"}</button>`).join("")}
      </div>
      <textarea readonly style="width:100%;min-height:100px;background:rgba(0,0,0,0.25);border:1px solid var(--border);color:var(--text);border-radius:8px;padding:10px;font-family:'JetBrains Mono',monospace;font-size:12px;" id="bsjpExportText">${escapeHtml(formatBsjpExport(passedTickers, state.bsjpExportFormat))}</textarea>
      <div style="margin-top:8px;"><button class="btn btn-outline" id="bsjpCopyExportBtn">📋 Salin ke Clipboard</button></div>
    </div>` : "";

  const tableRows = rows.map(s => `
    <tr>
      ${backtestRowCheckbox("bsjp", { ticker: s.ticker, price: Math.round(s.cClose||0) })}
      <td class="ticker-cell"><button class="ticker-link" data-detail="${s.ticker}" title="Lihat detail ${s.ticker}">${s.ticker}</button></td>
      <td>${fmtNum(s.cClose)}</td>
      <td style="color:${(s.changePct||0)>=0?'var(--up)':'var(--down)'};">${s.changePct!=null?((s.changePct>=0?'+':'')+s.changePct.toFixed(1)+'%'):'-'}</td>
      <td>${s.volRatio!=null?s.volRatio.toFixed(2)+'x':'-'}</td>
      <td>${s.turnover!=null?fmtCap(s.turnover):'-'}</td>
      <td>${s.bsjp.passedCount}/${s.bsjp.totalChecks}</td>
      <td class="mono" style="font-weight:700;">${s.bsjp.score}</td>
      <td>${bsjpSignalPill(s.bsjp.signal, s.bsjp.signalTone)}</td>
      <td><button class="btn btn-outline" data-bsjp-expand="${s.ticker}" style="padding:4px 10px;font-size:11px;">${state.bsjpExpanded===s.ticker?"Tutup":"Trade Plan"}</button></td>
    </tr>
    ${state.bsjpExpanded===s.ticker ? `<tr><td colspan="10" style="background:rgba(0,0,0,0.1);">${bsjpTradePlanCard(s)}</td></tr>` : ""}
  `).join("");

  const resultsPanel = `
    <div class="panel" style="flex-direction:column;align-items:stretch;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <div class="filter-section-title" style="margin:0;">🌆 Radar BSJP · ${escapeHtml(activePreset.label)} <span class="count-badge">${rows.length} saham</span><span class="line"></span></div>
      </div>
      ${!rows.length ? `<div class="empty-box">Tidak ada saham yang cocok preset "${escapeHtml(activePreset.label)}" ini. Coba preset lain atau ubah parameter di Params.</div>` : `
      ${renderBacktestSaveBar("bsjp", rows.map(s=>({
        ticker: s.ticker, price: Math.round(s.cClose||0),
        kriteria: `BSJP · ${activePreset.label}`,
        keterangan: `Kriteria: ${s.bsjp.passedCount}/${s.bsjp.totalChecks}; Skor: ${s.bsjp.score}; Sinyal: ${s.bsjp.signal}; Vol Ratio: ${s.volRatio!=null?s.volRatio.toFixed(2)+'x':'-'}`
      })))}
      <div class="table-wrap">
        <table class="mono">
          <thead><tr><th></th><th>Kode</th><th>Harga</th><th>1D%</th><th>Vol Ratio</th><th>Turnover</th><th>Kriteria</th><th>Skor</th><th>Sinyal</th><th></th></tr></thead>
          <tbody>${tableRows}</tbody>
        </table>
      </div>`}
    </div>`;

  return headerBar + statsBar + presetsBar + infoPanel + paramsPanel + toolbar + exportPanel + resultsPanel;
}

// ==========================================
// bindSearchInputPreservingCursor — pengganti pola oninput manual lama
// (state.x = e.target.value; render(); ...selectionStart = value.length).
//
// KENAPA INI PERLU: render() mengganti innerHTML tab yang aktif secara
// PENUH tiap kali state berubah, jadi elemen <input> lama "dibuang" dan
// diganti elemen baru — fokus & posisi kursor otomatis hilang. Kode lama
// menutupi ini dengan memaksa fokus balik + kursor SELALU ke UJUNG teks
// (selectionStart = value.length). Akibatnya: begitu user mencoba
// mengedit di TENGAH teks (bukan di ujung), kursor selalu melompat balik
// ke akhir setiap kali mengetik satu huruf — mustahil menyisipkan atau
// menghapus karakter di tengah kata tanpa kursor "kabur".
//
// Fungsi ini menyimpan posisi kursor ASLI (selectionStart/selectionEnd)
// SEBELUM state berubah & re-render, lalu mengembalikan ke posisi yang
// SAMA (di-clamp ke panjang teks baru, bukan otomatis ke ujung) setelah
// elemen input baru terpasang di DOM.
// ==========================================
// Debounce per id: tiap search input yang manggil fungsi ini share map
// timer ini (key = id elemen), supaya ngetik cepat di satu field nggak
// numpuk banyak render() yang saling menimpa.
const _searchDebounceTimers = {};

// Helper untuk semua link internal (ticker/chart) yang sekarang jadi <a
// href="#/..."> beneran: klik KIRI biasa (tanpa Ctrl/Cmd/Shift/klik-tengah)
// tetap di-handle sebagai navigasi SPA (preventDefault + panggil fn),
// supaya tidak nambah 2x history entry / lompat scroll ke hash. Klik
// KANAN (buka tab baru dari context menu), klik TENGAH, dan Ctrl/Cmd-klik
// SENGAJA tidak di-preventDefault — dibiarkan browser yang tangani secara
// native, jadi "Buka di tab baru" beneran jalan.
function bindInternalLink(el, fn){
  el.onclick = (e) => {
    if(e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // biarkan browser (tab baru/klik-tengah)
    e.preventDefault();
    e.stopPropagation();
    fn();
  };
}

function bindSearchInputPreservingCursor(id, onValueChange, delay = 200){
  const el = document.getElementById(id);
  if(!el) return;
  el.oninput = (e) => {
    const start = e.target.selectionStart;
    const end = e.target.selectionEnd;
    const val = e.target.value;
    // Debounce: render() penuh (rebuild seluruh innerHTML + rebind semua
    // listener) baru dipanggil `delay` ms SETELAH user berhenti mengetik,
    // bukan di tiap huruf. Selama jeda itu elemen <input> asli tidak
    // disentuh sama sekali, jadi kursor tetap natural di posisi user
    // mengetik -- render() (dan restore posisi kursor di bawah) cuma
    // jalan sekali di akhir, bukan tiap keystroke.
    clearTimeout(_searchDebounceTimers[id]);
    _searchDebounceTimers[id] = setTimeout(() => {
      onValueChange(val);
      render();
      const newEl = document.getElementById(id);
      if(newEl){
        newEl.focus();
        const pos = Math.min(start, newEl.value.length);
        const posEnd = Math.min(end, newEl.value.length);
        newEl.setSelectionRange(pos, posEnd);
      }
    }, delay);
  };
}

function attachContentEvents(){
  const advToggleBtn = document.getElementById("advToggleBtn");
  if(advToggleBtn) advToggleBtn.onclick = () => { state.showAdvancedFilters = !state.showAdvancedFilters; render(); };
  const filterKlasifikasiToggleBtn = document.getElementById("filterKlasifikasiToggleBtn");
  if(filterKlasifikasiToggleBtn) filterKlasifikasiToggleBtn.onclick = () => { state.showFilterKlasifikasi = !state.showFilterKlasifikasi; render(); };
  const filterTrendToggleBtn = document.getElementById("filterTrendToggleBtn");
  if(filterTrendToggleBtn) filterTrendToggleBtn.onclick = () => { state.showFilterTrend = !state.showFilterTrend; render(); };
  const filterMomentumToggleBtn = document.getElementById("filterMomentumToggleBtn");
  if(filterMomentumToggleBtn) filterMomentumToggleBtn.onclick = () => { state.showFilterMomentum = !state.showFilterMomentum; render(); };

  const addRuleBtn = document.getElementById("addRuleBtn");
  if(addRuleBtn) addRuleBtn.onclick = addCustomRule;

  document.querySelectorAll("[data-rule-del]").forEach(btn=>{
    btn.onclick = () => deleteCustomRule(btn.dataset.ruleDel);
  });

  const savePresetBtn = document.getElementById("savePresetBtn");
  if(savePresetBtn) savePresetBtn.onclick = saveCurrentAsPreset;

  const resetRulesBtn = document.getElementById("resetRulesBtn");
  if(resetRulesBtn) resetRulesBtn.onclick = resetCustomRules;

  const presetSelect = document.getElementById("presetSelect");
  if(presetSelect) presetSelect.onchange = (e) => { state.selectedPresetId = e.target.value; render(); };

  const loadPresetBtn = document.getElementById("loadPresetBtn");
  if(loadPresetBtn) loadPresetBtn.onclick = loadSelectedPreset;
  const ruleBuilderToggle = document.getElementById("ruleBuilderToggle");
  if(ruleBuilderToggle) ruleBuilderToggle.onclick = () => { state.ruleBuilderOpen = !state.ruleBuilderOpen; render(); };

  const updatePresetBtn = document.getElementById("updatePresetBtn");
  if(updatePresetBtn) updatePresetBtn.onclick = updateSelectedPreset;

  const deletePresetBtn = document.getElementById("deletePresetBtn");
  if(deletePresetBtn) deletePresetBtn.onclick = deleteSelectedPreset;

  // Dropdown checklist nilai kategori di rule builder (lihat
  // ruleCategoryMultiSelect() di renderRuleBuilder) — tombolnya membuka/
  // tutup lewat state.openDropdown, sama seperti multi-select panel
  // "Filter & Screener" (klik-di-luar-untuk-tutup di-handle listener
  // document "click" yang sudah ada, karena classnya sama: .select-btn/.select-dropdown).
  document.querySelectorAll("[data-rule-dd-toggle]").forEach(btn=>{
    btn.onclick = (e) => {
      e.stopPropagation();
      const key = btn.dataset.ruleDdToggle;
      state.openDropdown = state.openDropdown === key ? null : key;
      render();
    };
  });
  document.querySelectorAll("[data-rule-cat-id]").forEach(chk=>{
    chk.onclick = (e) => e.stopPropagation();
    chk.onchange = (e) => {
      toggleRuleCategoryValue(e.target.dataset.ruleCatId, e.target.value, e.target.checked);
    };
  });
  repositionRuleDropdown();

  document.querySelectorAll("[data-rule-field]").forEach(el=>{
    const id = el.dataset.ruleId;
    const field = el.dataset.ruleField;
    if(field === "toggleBType"){
      el.onclick = () => updateCustomRule(id, field, null);
    } else if(field === "aKey" || field === "bKey"){
      // Kotak metrik autocomplete: nilai input berupa LABEL (mis. "EMA 10"
      // atau "Sinyal RSI (Kategori)"), bukan key — resolve dulu balik ke
      // key aslinya lewat metricKeyForLabel(). Kalau user mengetik teks
      // yang tidak cocok dengan metrik manapun (belum memilih dari daftar
      // autocomplete-nya), abaikan perubahan dan kembalikan tampilan ke
      // metrik yang masih valid (render ulang dari state apa adanya).
      el.onchange = (e) => {
        const key = metricKeyForLabel(e.target.value);
        if(key) updateCustomRule(id, field, key);
        else render();
      };
    } else {
      el.onchange = (e) => updateCustomRule(id, field, e.target.value);
    }
  });

  // Sortir hasil di panel Rules Kustom — kotak metrik autocomplete sama
  // pola dengan aKey/bKey (nilai input = LABEL, resolve balik ke key lewat
  // metricKeyForLabel()); tombol Naik/Desc tinggal flip state.sort.asc,
  // dan Hapus me-reset ke keadaan tanpa sortir (sama seperti sebelum ada
  // fitur ini). Field BROKER sengaja ditolak karena bukan nilai yang bisa
  // diurutkan (array kode broker).
  const ruleSortInput = document.getElementById("ruleSortInput");
  if(ruleSortInput) ruleSortInput.onchange = (e) => {
    const text = e.target.value.trim();
    if(!text){ state.sort.col = null; state.sort.asc = true; state.page = 1; render(); return; }
    const key = metricKeyForLabel(text);
    if(!key || isBrokerMetric(key)){ render(); return; }
    state.sort.col = ruleSortKeyToCol(key);
    state.sort.asc = true;
    state.page = 1;
    render();
  };
  const ruleSortAscBtn = document.getElementById("ruleSortAscBtn");
  if(ruleSortAscBtn) ruleSortAscBtn.onclick = () => { if(!state.sort.col) return; state.sort.asc = true; state.page = 1; render(); };
  const ruleSortDescBtn = document.getElementById("ruleSortDescBtn");
  if(ruleSortDescBtn) ruleSortDescBtn.onclick = () => { if(!state.sort.col) return; state.sort.asc = false; state.page = 1; render(); };
  const ruleSortClearBtn = document.getElementById("ruleSortClearBtn");
  if(ruleSortClearBtn) ruleSortClearBtn.onclick = () => { state.sort.col = null; state.sort.asc = true; state.page = 1; render(); };

  const colPickerBtn = document.getElementById("colPickerBtn");
  if(colPickerBtn) colPickerBtn.onclick = (e) => { e.stopPropagation(); state.colPickerOpen = !state.colPickerOpen; render(); };

  document.querySelectorAll("[data-col-preset]").forEach(btn => {
    btn.onclick = (e) => { e.stopPropagation(); setColumnPreset(btn.dataset.colPreset); };
  });

  document.querySelectorAll("[data-col-toggle]").forEach(chk => {
    chk.onclick = (e) => e.stopPropagation();
    chk.onchange = (e) => { e.stopPropagation(); toggleColumn(chk.dataset.colToggle); };
  });

  if(state.colPickerOpen){
    const panel = document.querySelector(".col-picker-panel");
    if(panel) panel.onclick = (e) => e.stopPropagation();
    // Klik di luar panel menutupnya — dipasang sekali lewat setTimeout supaya
    // tidak langsung menutup panel yang baru saja dibuka oleh klik yang sama.
    setTimeout(() => {
      document.addEventListener("click", function closeColPicker(){
        state.colPickerOpen = false; render();
        document.removeEventListener("click", closeColPicker);
      }, { once:true });
    }, 0);
  }

  bindSearchInputPreservingCursor("searchInput", (val) => { state.search = val; state.page = 1; });

  // --- Kontrol chart interaktif (rentang waktu + toggle indikator) ---
  document.querySelectorAll("[data-chart-range]").forEach(btn=>{
    btn.onclick = () => { state.chartRange = btn.dataset.chartRange; render(); };
  });
  document.querySelectorAll("[data-chart-series]").forEach(chk=>{
    chk.onchange = () => {
      state.chartSeries = state.chartSeries || {};
      state.chartSeries[chk.dataset.chartSeries] = chk.checked;
      drawChartSVG();
    };
  });

  const chartSearchInput = document.getElementById("chartSearchInput");
  if(chartSearchInput){
    bindSearchInputPreservingCursor("chartSearchInput", (val) => { state.chartSearch = val; });
    chartSearchInput.addEventListener("keydown", (e) => {
      if(e.key === "Enter"){
        const val = (e.target.value||"").trim().toUpperCase();
        const exists = state.stocks.some(st => st.ticker === val);
        if(exists) loadChart(val);
        else if(val) alert(`Ticker "${val}" tidak ditemukan di data screener.`);
      }
    });
  }

  // ":not([data-rule-cat-id])" — checkbox checklist kategori Rule Kustom
  // (lihat ruleCategoryMultiSelect) juga pakai class "select-item" supaya
  // gaya visualnya sama persis dengan multi-select "Filter & Screener", tapi
  // dia PUNYA handler onchange sendiri (lihat blok [data-rule-cat-id] di
  // atas) yang menulis ke rule.bConst, bukan ke state.filters. Tanpa
  // pengecualian ini, query generik di bawah bakal ikut menimpa (overwrite)
  // handler checkbox rule tsb — karena assignment `chk.onchange =` di sini
  // dijalankan BELAKANGAN — sehingga centangnya balik ke tidak-tercentang
  // lagi begitu ada render ulang (baru dicentang, lalu "hilang").
  document.querySelectorAll('.select-item input[type="checkbox"]:not([data-rule-cat-id])').forEach(chk => {
    chk.onchange = (e) => {
      const key = e.target.dataset.filter;
      const val = e.target.value;
      if (e.target.checked) {
        if (!state.filters[key].includes(val)) state.filters[key].push(val);
      } else {
        state.filters[key] = state.filters[key].filter(v => v !== val);
      }
      state.page = 1;
      render(); 
    };
  });

  document.querySelectorAll(".range-filter-input").forEach(inp => {
    inp.onchange = (e) => {
      const key = e.target.dataset.range;
      const bound = e.target.dataset.bound;
      state.rangeFilters[key][bound] = e.target.value;
      state.page = 1;
      render();
    };
  });

  const pageSizeSelect = document.getElementById("pageSizeSelect");
  if(pageSizeSelect) pageSizeSelect.onchange = (e) => {
    const v = e.target.value;
    state.limit = v === "all" ? "all" : parseInt(v, 10);
    state.page = 1;
    render();
  };

  const resetFiltersBtn = document.getElementById("resetFiltersBtn");
  if(resetFiltersBtn) resetFiltersBtn.onclick = () => {
    state.search = "";
    state.activePreset = null;
    Object.keys(state.filters).forEach(k => state.filters[k] = []);
    Object.keys(state.rangeFilters).forEach(k => state.rangeFilters[k] = {min:"", max:""});
    state.customRules = [];
    saveCustomRules();
    state.page = 1;
    render();
  };

  const chkAll = document.getElementById("chkSelectAll");
  if(chkAll) {
    chkAll.onchange = (e) => {
      const filtered = getFiltered();
      if(e.target.checked) {
        filtered.forEach(s => state.selectedForBacktest.add(s.ticker));
      } else {
        filtered.forEach(s => state.selectedForBacktest.delete(s.ticker));
      }
      render(); 
    };
  }

  document.querySelectorAll(".chk-row").forEach(chk => {
    chk.onchange = (e) => {
      const ticker = e.target.dataset.check;
      if(e.target.checked) state.selectedForBacktest.add(ticker);
      else state.selectedForBacktest.delete(ticker);
      
      const allFiltered = getFiltered();
      const allChecked = allFiltered.length > 0 && allFiltered.every(s => state.selectedForBacktest.has(s.ticker));
      const mainChk = document.getElementById("chkSelectAll");
      if(mainChk) mainChk.checked = allChecked;
    };
  });
  
  const saveBt = document.getElementById("saveBacktestBtn");
  if(saveBt) saveBt.onclick = saveToBacktest;
  
  document.querySelectorAll("[data-del-bt]").forEach(btn => {
    btn.onclick = () => deleteBacktestSession(parseInt(btn.dataset.delBt));
  });

  document.querySelectorAll("[data-export-bt]").forEach(btn => {
    btn.onclick = () => exportBacktestToExcel(parseInt(btn.dataset.exportBt));
  });

  const exportAllBtBtn = document.getElementById("exportAllBtBtn");
  if(exportAllBtBtn) exportAllBtBtn.onclick = exportAllBacktestToExcel;

  const exportScreenerBtn = document.getElementById("exportScreenerBtn");
  if(exportScreenerBtn) exportScreenerBtn.onclick = exportScreenerToExcel;
  const bulkTickerFileInput = document.getElementById("bulkTickerFileInput");
  if(bulkTickerFileInput) bulkTickerFileInput.onchange = (e) => {
    const file = e.target.files && e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const list = parseTickerListTxt(String(reader.result || ""));
      state.uploadedBulkTickers = list;
      state.uploadedBulkTickersFileName = file.name;
      render();
    };
    reader.onerror = () => { alert("Gagal membaca file " + file.name); };
    reader.readAsText(file);
    e.target.value = ""; // reset supaya upload file dgn nama sama tetap trigger onchange
  };
  const clearBulkTickerFileBtn = document.getElementById("clearBulkTickerFileBtn");
  if(clearBulkTickerFileBtn) clearBulkTickerFileBtn.onclick = () => {
    state.uploadedBulkTickers = [];
    state.uploadedBulkTickersFileName = null;
    render();
  };
  const stockbitBulkBtn = document.getElementById("stockbitBulkBtn");
  if(stockbitBulkBtn) stockbitBulkBtn.onclick = () => {
    if(!state.stockbitToken){ openSettings(); return; }
    const tickers = resolveBulkTickers();
    if(tickers.length) fetchStockbitLiveBulk(tickers);
  };
  const stockbitAutoRefreshChk = document.getElementById("stockbitAutoRefreshChk");
  if(stockbitAutoRefreshChk) stockbitAutoRefreshChk.onchange = (e) => {
    if(e.target.checked && !state.stockbitToken){ e.target.checked = false; openSettings(); return; }
    state.stockbitAutoRefresh = e.target.checked;
    localStorage.setItem(LS_STOCKBIT_AUTOREFRESH, state.stockbitAutoRefresh ? "1" : "0");
    if(state.stockbitAutoRefresh) stockbitAutoRefreshTick(); // langsung tarik sekali begitu dinyalakan, tidak nunggu interval penuh
  };
  const stockbitAutoRefreshSec = document.getElementById("stockbitAutoRefreshSec");
  if(stockbitAutoRefreshSec) stockbitAutoRefreshSec.onchange = (e) => {
    const sec = parseInt(e.target.value, 10);
    state.stockbitAutoRefreshIntervalSec = (Number.isFinite(sec) && sec >= STOCKBIT_AUTOREFRESH_MIN_SEC) ? sec : 60;
    localStorage.setItem(LS_STOCKBIT_AUTOREFRESH_SEC, String(state.stockbitAutoRefreshIntervalSec));
  };
  const screenerBsFromInput = document.getElementById("screenerBsFromInput");
  if(screenerBsFromInput) screenerBsFromInput.onchange = (e) => { state.bsAutoBulkFrom = e.target.value || state.bsAutoBulkFrom; };
  const screenerBsToInput = document.getElementById("screenerBsToInput");
  if(screenerBsToInput) screenerBsToInput.onchange = (e) => { state.bsAutoBulkTo = e.target.value || state.bsAutoBulkTo; };
  const screenerBsBulkBtn = document.getElementById("screenerBsBulkBtn");
  if(screenerBsBulkBtn) screenerBsBulkBtn.onclick = () => {
    fetchAndSaveBrokerSummaryBulk(resolveBulkTickers(), state.bsAutoBulkFrom, state.bsAutoBulkTo);
  };
  const screenerHdFromInput = document.getElementById("screenerHdFromInput");
  if(screenerHdFromInput) screenerHdFromInput.onchange = (e) => { state.hdAutoBulkFrom = e.target.value || state.hdAutoBulkFrom; };
  const screenerHdToInput = document.getElementById("screenerHdToInput");
  if(screenerHdToInput) screenerHdToInput.onchange = (e) => { state.hdAutoBulkTo = e.target.value || state.hdAutoBulkTo; };
  const screenerHdBulkBtn = document.getElementById("screenerHdBulkBtn");
  if(screenerHdBulkBtn) screenerHdBulkBtn.onclick = () => {
    fetchAndSaveHistoricalBulk(resolveBulkTickers(), state.hdAutoBulkFrom, state.hdAutoBulkTo);
  };
  const hdBulkResultsPanel = document.getElementById("hdBulkResultsPanel");
  if(hdBulkResultsPanel) hdBulkResultsPanel.ontoggle = (e) => { state.hdBulkResultsOpen = e.target.open; };
  
  document.querySelectorAll("[data-sektor-toggle]").forEach(el=>{
    el.onclick = ()=>{
      const sek = el.dataset.sektorToggle;
      state.sektorExpanded.has(sek) ? state.sektorExpanded.delete(sek) : state.sektorExpanded.add(sek);
      render();
    };
  });
  bindSearchInputPreservingCursor("sektorSearchInput", (val) => { state.sektorSearch = val; });
  const sektorSortSelect = document.getElementById("sektorSortSelect");
  if(sektorSortSelect){
    sektorSortSelect.onchange = (e)=>{ state.sektorSort = e.target.value; render(); };
  }
  document.querySelectorAll("[data-mover-tab]").forEach(btn=>{
    btn.onclick = ()=>{ state.topMoversTab = btn.dataset.moverTab; render(); };
  });

  document.querySelectorAll("[data-detail]").forEach(b=> b.onclick=()=>openDetail(b.dataset.detail));

  // --- Tab BSJP (Beli Sore, Jual Pagi) ---
  bindSearchInputPreservingCursor("bsjpSearchInput", (val) => { state.bsjpSearch = val; });
  const bsjpSortSelect = document.getElementById("bsjpSortSelect");
  if(bsjpSortSelect) bsjpSortSelect.onchange = (e) => { state.bsjpSort = e.target.value; render(); };
  document.querySelectorAll("[data-bsjp-preset]").forEach(btn=>{
    btn.onclick = () => { state.bsjpPreset = btn.dataset.bsjpPreset; render(); };
  });
  document.querySelectorAll("[data-bsjp-expand]").forEach(btn=>{
    btn.onclick = () => { state.bsjpExpanded = state.bsjpExpanded === btn.dataset.bsjpExpand ? null : btn.dataset.bsjpExpand; render(); };
  });
  document.querySelectorAll("[data-bsjp-param]").forEach(inp=>{
    inp.onchange = (e) => {
      const v = parseFloat(e.target.value);
      if(!isNaN(v)) state.bsjpParams[inp.dataset.bsjpParam] = v;
      // Mode Simulator: perubahan hanya berlaku di memori (tidak ditulis ke
      // localStorage) — supaya bisa "coba-coba" tanpa menimpa Pengaturan
      // BSJP yang sudah tersimpan.
      if(!state.bsjpSimulator) saveBsjpParams();
      render();
    };
  });
  const bsjpResetParamsBtn = document.getElementById("bsjpResetParamsBtn");
  if(bsjpResetParamsBtn) bsjpResetParamsBtn.onclick = () => {
    state.bsjpParams = { ...BSJP_DEFAULT_PARAMS };
    if(!state.bsjpSimulator) saveBsjpParams();
    render();
  };
  const bsjpParamsToggleBtn = document.getElementById("bsjpParamsToggleBtn");
  if(bsjpParamsToggleBtn) bsjpParamsToggleBtn.onclick = () => { state.bsjpParamsOpen = !state.bsjpParamsOpen; render(); };
  const bsjpSimulatorChk = document.getElementById("bsjpSimulatorChk");
  if(bsjpSimulatorChk) bsjpSimulatorChk.onchange = (e) => {
    state.bsjpSimulator = e.target.checked;
    // Keluar dari Simulator → muat ulang parameter TERSIMPAN (buang
    // percobaan sementara yang belum disimpan).
    if(!state.bsjpSimulator) state.bsjpParams = loadBsjpParams();
    render();
  };
  const bsjpAlertsBtn = document.getElementById("bsjpAlertsBtn");
  if(bsjpAlertsBtn) bsjpAlertsBtn.onclick = () => openSettings();
  const bsjpRefreshBtn = document.getElementById("bsjpRefreshBtn");
  if(bsjpRefreshBtn) bsjpRefreshBtn.onclick = () => loadLive();
  const bsjpExportBtn = document.getElementById("bsjpExportBtn");
  if(bsjpExportBtn) bsjpExportBtn.onclick = () => { state.bsjpExportOpen = !state.bsjpExportOpen; render(); };
  document.querySelectorAll("[data-bsjp-export-fmt]").forEach(btn=>{
    btn.onclick = () => { state.bsjpExportFormat = btn.dataset.bsjpExportFmt; render(); };
  });
  const bsjpCopyExportBtn = document.getElementById("bsjpCopyExportBtn");
  if(bsjpCopyExportBtn) bsjpCopyExportBtn.onclick = () => {
    const ta = document.getElementById("bsjpExportText");
    if(!ta) return;
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(ta.value).then(()=>{ bsjpCopyExportBtn.textContent = "✅ Tersalin!"; setTimeout(()=>{ bsjpCopyExportBtn.textContent = "📋 Salin ke Clipboard"; }, 1500); });
    } else {
      ta.select(); document.execCommand("copy");
    }
  };
  document.querySelectorAll("[data-dash-metric]").forEach(b=> b.onclick=()=>{
    const key=b.dataset.dashMetric;
    if(key==="top"){
      const top=dashMetricStocks("avgscore")[0];
      if(top) openDetail(top.ticker);
    } else dashMetricOpen(key);
  });
  document.querySelectorAll("[data-fav]").forEach(b=> b.onclick=()=>toggleFav(b.dataset.fav));
  document.querySelectorAll("[data-chart]").forEach(b=> bindInternalLink(b, () => loadChart(b.dataset.chart)));
  document.querySelectorAll("[data-stockbit-live]").forEach(b=> b.onclick=(e)=>{ e.stopPropagation(); fetchStockbitLive(b.dataset.stockbitLive); });
  document.querySelectorAll("[data-expand]").forEach(b=> b.onclick=()=>{
    const t = b.dataset.expand;
    state.expanded.has(t) ? state.expanded.delete(t) : state.expanded.add(t);
    render();
  });

  document.querySelectorAll("[data-del-bt-item]").forEach(btn=>{
    btn.onclick = ()=>{ const [sid,tk] = btn.dataset.delBtItem.split("|"); deleteBacktestItem(sid,tk); };
  });
  document.querySelectorAll("[data-bt-add-porto]").forEach(btn=>{
    btn.onclick = ()=>{ const [sid,tk] = btn.dataset.btAddPorto.split("|"); addBacktestItemToPortfolio(sid,tk); };
  });
  document.querySelectorAll("[data-bt-detail]").forEach(btn=>{
    btn.onclick = ()=>openDetail(btn.dataset.btDetail);
  });
  const btManualAddBtn = document.getElementById("btManualAddBtn");
  if(btManualAddBtn) btManualAddBtn.onclick = ()=>{
    addManualBacktest(
      document.getElementById("btManualSession").value,
      document.getElementById("btManualTicker").value,
      document.getElementById("btManualPrice").value,
      document.getElementById("btManualNote").value,
      document.getElementById("btManualDate").value
    );
  };

  const pfOpenAddBtn = document.getElementById("pfOpenAddBtn");
  if(pfOpenAddBtn) pfOpenAddBtn.onclick = ()=> openPortoModal(null);
  document.querySelectorAll("[data-edit-porto]").forEach(btn=>{
    btn.onclick = ()=> editPortoRecord(btn.dataset.editPorto);
  });
  document.querySelectorAll("[data-del-porto]").forEach(btn=>{
    btn.onclick = ()=> deletePortoRecord(btn.dataset.delPorto);
  });
  const pfBulkDeleteBtn = document.getElementById("pfBulkDeleteBtn");
  if(pfBulkDeleteBtn) pfBulkDeleteBtn.onclick = bulkDeletePorto;
  const chkSelectAllPorto = document.getElementById("chkSelectAllPorto");
  if(chkSelectAllPorto) chkSelectAllPorto.onchange = (e)=>{
    if(e.target.checked) state.portfolio.forEach(p=> state.selectedPorto.add(String(p.id)));
    else state.selectedPorto.clear();
    render();
  };
  document.querySelectorAll(".chk-porto-row").forEach(chk=>{
    chk.onchange = (e)=>{
      const id = String(e.target.dataset.checkPorto);
      e.target.checked ? state.selectedPorto.add(id) : state.selectedPorto.delete(id);
      render();
    };
  });
  
  const btnPrev = document.getElementById("prevPage");
  const btnNext = document.getElementById("nextPage");
  if (btnPrev) btnPrev.onclick = () => { if(state.page > 1) { state.page--; render(); } };
  if (btnNext) btnNext.onclick = () => { state.page++; render(); };

  document.querySelectorAll(".sortable").forEach(th => {
    th.onclick = () => {
      const col = th.dataset.sort;
      if (state.sort.col === col) {
        state.sort.asc = !state.sort.asc;
      } else {
        state.sort.col = col;
        state.sort.asc = true;
      }
      state.page = 1;
      render();
    };
  });

  // --- Broker Summary ---
  const bsStockCodeInput = document.getElementById("bsStockCode");
  if(bsStockCodeInput) bsStockCodeInput.onchange = (e) => { state.bsStockCode = e.target.value.trim().toUpperCase(); };
  const bsDateInput = document.getElementById("bsDate");
  if(bsDateInput) bsDateInput.onchange = (e) => { state.bsDate = e.target.value; };
  const bsDateFromInput = document.getElementById("bsDateFrom");
  if(bsDateFromInput) bsDateFromInput.onchange = (e) => { state.bsDateFrom = e.target.value; };
  const bsDateToInput = document.getElementById("bsDateTo");
  if(bsDateToInput) bsDateToInput.onchange = (e) => { state.bsDateTo = e.target.value; };
  // Scoped ke "#content" dan pakai atribut "data-bs-period-mode" (BUKAN
  // "data-bs-mode" — nama itu SUDAH dipakai fitur Broker Stalker yang tidak
  // berhubungan sama sekali, lihat toggle "Lacak Saham/Broker". Memakai nama
  // yang sama akan membuat wiring salah satu fitur menimpa yang lain.
  document.querySelectorAll("#content [data-bs-period-mode]").forEach(btn=>{
    btn.onclick = () => {
      state.bsRangeMode = btn.dataset.bsPeriodMode === "range";
      state.bsMsg = ""; state.bsMsgError = false;
      render();
    };
  });
  const bsLoadBtn = document.getElementById("bsLoadBtn");
  if(bsLoadBtn) bsLoadBtn.onclick = loadBrokerSummary;
  const bsSaveBtn = document.getElementById("bsSaveBtn");
  if(bsSaveBtn) bsSaveBtn.onclick = saveBrokerSummaryRows;
  const bsCsvFillBtn = document.getElementById("bsCsvFillBtn");
  if(bsCsvFillBtn) bsCsvFillBtn.onclick = fillBsFromCsv;
  const bsAutoBulkFromInput = document.getElementById("bsAutoBulkFromInput");
  if(bsAutoBulkFromInput) bsAutoBulkFromInput.onchange = (e) => {
    state.bsAutoBulkFrom = e.target.value || state.bsAutoBulkFrom;
    render();
  };
  const bsAutoBulkToInput = document.getElementById("bsAutoBulkToInput");
  if(bsAutoBulkToInput) bsAutoBulkToInput.onchange = (e) => {
    state.bsAutoBulkTo = e.target.value || state.bsAutoBulkTo;
    render();
  };
  const bsAutoBulkBtn = document.getElementById("bsAutoBulkBtn");
  if(bsAutoBulkBtn) bsAutoBulkBtn.onclick = () => fetchAndSaveBrokerSummaryBulk([...state.selectedForBacktest], state.bsAutoBulkFrom, state.bsAutoBulkTo);
  const bsBulkResultsPanel = document.getElementById("bsBulkResultsPanel");
  if(bsBulkResultsPanel) bsBulkResultsPanel.ontoggle = (e) => { state.bsBulkResultsOpen = e.target.open; };
  const bsEditorPanel = document.getElementById("bsEditorPanel");
  if(bsEditorPanel) bsEditorPanel.ontoggle = (e) => { state.bsEditorOpen = e.target.open; };

  // --- Target Bandar ---
  const tbStockCodeInput = document.getElementById("tbStockCode");
  if(tbStockCodeInput) tbStockCodeInput.onchange = (e) => { state.targetStockCode = e.target.value.trim().toUpperCase(); };
  const tbWindowDaysInput = document.getElementById("tbWindowDays");
  if(tbWindowDaysInput) tbWindowDaysInput.onchange = (e) => { state.targetWindowDays = Number(e.target.value)||20; };
  const tbLoadBtn = document.getElementById("tbLoadBtn");
  if(tbLoadBtn) tbLoadBtn.onclick = loadTargetWindow;
  const tbSaveCalcBtn = document.getElementById("tbSaveCalcBtn");
  if(tbSaveCalcBtn) tbSaveCalcBtn.onclick = saveTargetCalculation;
  const tbSaveToBacktestBtn = document.getElementById("tbSaveToBacktestBtn");
  if(tbSaveToBacktestBtn) tbSaveToBacktestBtn.onclick = saveTargetBandarToBacktest;
  const tbScopeSelect = document.getElementById("tbScopeSelect");
  if(tbScopeSelect) tbScopeSelect.onchange = (e) => { state.targetSummaryScope = e.target.value; };
  const tbHistoryBtn = document.getElementById("tbHistoryBtn");
  if(tbHistoryBtn) tbHistoryBtn.onclick = loadTargetHistory;

  // --- Entry Price Scanner ---
  const epsScanBtn = document.getElementById("epsScanBtn");
  if(epsScanBtn) epsScanBtn.onclick = runEntryPriceScan;
  const epsCsvBtn = document.getElementById("epsCsvBtn");
  if(epsCsvBtn) epsCsvBtn.onclick = exportEpsToCsv;
  const epsClearCacheBtn = document.getElementById("epsClearCacheBtn");
  if(epsClearCacheBtn) epsClearCacheBtn.onclick = clearEpsCache;
  document.querySelectorAll("[data-eps-filter]").forEach(btn=>{
    btn.onclick = () => setEpsFilter(btn.dataset.epsFilter, btn.dataset.epsValue);
  });
  document.querySelectorAll("[data-eps-sort]").forEach(btn=>{
    btn.onclick = () => toggleEpsSort(btn.dataset.epsSort);
  });
  const epsMinMutu = document.getElementById("epsMinMutu");
  if(epsMinMutu) epsMinMutu.onchange = (e)=> setEpsFilter("minMutu", Number(e.target.value)||0);
  const epsMinAkum = document.getElementById("epsMinAkum");
  if(epsMinAkum) epsMinAkum.onchange = (e)=> setEpsFilter("minAkum", Number(e.target.value)||0);
  const epsMinGap = document.getElementById("epsMinGap");
  if(epsMinGap) epsMinGap.onchange = (e)=> setEpsFilter("minGap", e.target.value);
  const epsInfoPanel = document.getElementById("epsInfoPanel");
  if(epsInfoPanel) epsInfoPanel.ontoggle = (e)=> { state.epsInfoOpen = e.target.open; };

  // --- Kraken Flow (ORCA) ---
  document.querySelectorAll("[data-orca-filter]").forEach(btn=>{
    btn.onclick = () => toggleOrcaFilter(btn.dataset.orcaFilter);
  });
  document.querySelectorAll("[data-orca-seg]").forEach(btn=>{
    btn.onclick = () => setOrcaSeg(btn.dataset.orcaSeg, btn.dataset.orcaValue);
  });
  bindSearchInputPreservingCursor("orcaSearchInput", (val) => { state.orcaSearch = val; });
  const orcaCustomCapInput = document.getElementById("orcaCustomCapInput");
  if(orcaCustomCapInput) orcaCustomCapInput.onchange = (e) => { state.orcaCustomCapT = e.target.value; render(); };
  const orcaResetBtn = document.getElementById("orcaResetBtn");
  if(orcaResetBtn) orcaResetBtn.onclick = resetOrcaFilters;
  const orcaCsvBtn = document.getElementById("orcaCsvBtn");
  if(orcaCsvBtn) orcaCsvBtn.onclick = exportOrcaToCsv;
  const orcaInfoPanel = document.getElementById("orcaInfoPanel");
  if(orcaInfoPanel) orcaInfoPanel.ontoggle = (e)=> { state.orcaInfoOpen = e.target.open; };
  const orcaHistoryRefreshBtn = document.getElementById("orcaHistoryRefreshBtn");
  if(orcaHistoryRefreshBtn) orcaHistoryRefreshBtn.onclick = () => { state.orcaHistoryByTicker = null; loadOrcaHistory(); };

  // --- Smart Pick ---
  document.querySelectorAll("[data-sp-toggle]").forEach(btn=>{
    btn.onclick = () => {
      const id = btn.dataset.spToggle;
      state.spOpenCriteria = (state.spOpenCriteria === id) ? null : id;
      render();
    };
  });
  document.querySelectorAll("[data-sp-ticker]").forEach(btn=>{
    btn.onclick = () => openDetail(btn.dataset.spTicker);
  });
  document.querySelectorAll("[data-sp-viewall]").forEach(btn=>{
    btn.onclick = () => openSmartPickList(btn.dataset.spViewall);
  });
  const spRecapHeader = document.getElementById("spRecapHeader");
  if(spRecapHeader) spRecapHeader.onclick = () => {
    state.spRecapCollapsed = !state.spRecapCollapsed;
    localStorage.setItem("ihsg_sp_recap_collapsed", state.spRecapCollapsed ? "1" : "0");
    render();
  };
  const spFinalizeBtn = document.getElementById("spFinalizeBtn");
  if(spFinalizeBtn) spFinalizeBtn.onclick = finalizeSmartPickSignals;
  const spFilterType = document.getElementById("spFilterType");
  if(spFilterType) spFilterType.onchange = (e) => { state.spFilterType = e.target.value; loadSmartPickHistory(); };
  const spFromInput = document.getElementById("spFromInput");
  if(spFromInput) spFromInput.onchange = (e) => { state.spFrom = e.target.value; loadSmartPickHistory(); };
  const spToInput = document.getElementById("spToInput");
  if(spToInput) spToInput.onchange = (e) => { state.spTo = e.target.value; loadSmartPickHistory(); };
  const spRefreshBtn = document.getElementById("spRefreshBtn");
  if(spRefreshBtn) spRefreshBtn.onclick = loadSmartPickHistory;
  const spExportBtn = document.getElementById("spExportBtn");
  if(spExportBtn) spExportBtn.onclick = exportSmartPickToExcel;

  document.querySelectorAll("[data-bs-mode]").forEach(btn=>btn.onclick=()=>{
    state.brokerStalkerMode=btn.dataset.bsMode;
    state.brokerStalkerRawRows=[]; state.brokerStalkerRows=[]; state.brokerStalkerDailyNet=[];
    state.brokerStalkerMsg=""; state.brokerStalkerFilterType=null; state.brokerStalkerResultSearch="";
    render();
  });
  const stalkerQuery = document.getElementById("stalkerQuery");
  if(stalkerQuery) stalkerQuery.oninput = e => { state.brokerStalkerQuery=e.target.value; };
  const stalkerSearchBtn = document.getElementById("stalkerSearchBtn");
  if(stalkerSearchBtn) stalkerSearchBtn.onclick = searchBrokerStalker;
  document.querySelectorAll("[data-bs-period]").forEach(btn=>btn.onclick=()=>{ state.brokerStalkerPeriod=btn.dataset.bsPeriod; render(); });
  const stalkerRangeFrom = document.getElementById("stalkerRangeFrom");
  if(stalkerRangeFrom) stalkerRangeFrom.onchange = e => { state.brokerStalkerRangeFrom = e.target.value; };
  const stalkerRangeTo = document.getElementById("stalkerRangeTo");
  if(stalkerRangeTo) stalkerRangeTo.onchange = e => { state.brokerStalkerRangeTo = e.target.value; };
  document.querySelectorAll("[data-bs-sort]").forEach(btn=>btn.onclick=()=>{ state.brokerStalkerSort=btn.dataset.bsSort; applyBrokerStalkerView(); });
  document.querySelectorAll("[data-bs-filtertype]").forEach(btn=>btn.onclick=()=>{
    const val = btn.dataset.bsFiltertype;
    state.brokerStalkerFilterType = (state.brokerStalkerFilterType===val) ? null : val;
    applyBrokerStalkerView();
  });
  const stalkerChartToggle = document.getElementById("stalkerChartToggle");
  if(stalkerChartToggle) stalkerChartToggle.onclick = () => { state.brokerStalkerChartOpen = !state.brokerStalkerChartOpen; render(); };
  bindSearchInputPreservingCursor("stalkerResultSearch", v => {
    state.brokerStalkerResultSearch = v;
    state.brokerStalkerRows = brokerStalkerFilteredSorted();
  });

  // --- "Simpan ke Backtest" generik (EPS/ORCA/BSJP) — lihat definisi di
  // dekat saveToBacktest/addManualBacktest. Aman dipanggil tanpa syarat
  // tab: querySelectorAll cukup mengembalikan NodeList kosong kalau tab
  // yang sedang aktif tidak punya elemen data-bt-* sama sekali.
  wireBacktestSaveControls(document);

  // --- Panduan Lengkap: checklist "Sebelum Beli" tersimpan di localStorage,
  // dan aman dipanggil tanpa syarat tab (querySelectorAll kosong kalau
  // sedang bukan di tab panduan).
  if(state.tab === "panduan") wirePanduanChecklist();

  // --- 🧪 WS Debug: lihat renderWsDebug() & listener 'FROM_EXTENSION_WS_TRAFFIC'.
  const wsDebugToggleBtn = document.getElementById("wsDebugToggleBtn");
  if(wsDebugToggleBtn) wsDebugToggleBtn.onclick = () => {
    state.wsDebugRecording = !state.wsDebugRecording;
    render();
  };
  const wsDebugClearBtn = document.getElementById("wsDebugClearBtn");
  if(wsDebugClearBtn) wsDebugClearBtn.onclick = () => {
    state.wsDebugFrames = [];
    render();
  };
  const wsDebugCopyBtn = document.getElementById("wsDebugCopyBtn");
  if(wsDebugCopyBtn) wsDebugCopyBtn.onclick = () => {
    const dirFilter = state.wsDebugFilterDir || "all";
    const urlFilter = (state.wsDebugFilterUrl || "").trim().toLowerCase();
    const filtered = state.wsDebugFrames.filter(f => {
      if(dirFilter !== "all" && f.direction !== dirFilter) return false;
      if(urlFilter && !String(f.url||"").toLowerCase().includes(urlFilter)) return false;
      return true;
    });
    const text = filtered.map(f => {
      const t = f.ts ? new Date(f.ts).toISOString() : "-";
      const dataStr = typeof f.data === "string" ? f.data : JSON.stringify(f.data);
      return `[${t}] ${String(f.direction||"?").toUpperCase()} ${f.url}\n${dataStr}\n---`;
    }).join("\n");
    navigator.clipboard.writeText(text).then(() => {
      wsDebugCopyBtn.textContent = "✅ Tersalin!";
      setTimeout(() => { if(state.tab==="wsdebug") render(); }, 1200);
    }).catch(() => { alert("Gagal menyalin ke clipboard — coba salin manual, atau cek izin clipboard browser."); });
  };
  const wsDebugFilterDir = document.getElementById("wsDebugFilterDir");
  if(wsDebugFilterDir) wsDebugFilterDir.onchange = (e) => { state.wsDebugFilterDir = e.target.value; render(); };
  bindSearchInputPreservingCursor("wsDebugFilterUrl", (val) => { state.wsDebugFilterUrl = val; render(); });
}

document.addEventListener("click", (e) => {
  if (!e.target.closest('.select-dropdown') && !e.target.closest('.select-btn')) {
    if (state.openDropdown) {
      state.openDropdown = null;
      render();
    }
  }
});

// ==========================================
// ROUTING BERBASIS HASH URL
//
// Supaya navigasi internal (pindah tab & buka chart ticker) punya URL asli
// yang bisa di-klik-kanan > "Buka di tab baru", di-bookmark, dipakai tombol
// back/forward browser, atau ditempel langsung di address bar. Format:
//   #/screener        -> tab biasa (nama tab apa adanya)
//   #/chart/BBCA      -> tab chart dengan ticker terpilih
//
// PENTING: hash cuma REFLEKSI dari state (state.tab / state.selectedTicker),
// bukan sumber kebenaran. Semua kode lama yang langsung manggil
// selectMainTab(...) atau loadChart(...) tetap jalan seperti biasa — cuma
// dua fungsi itu yang saya tambahi 1 baris syncHashFromState() supaya
// address bar ikut ter-update. history.pushState() TIDAK memicu event
// 'hashchange' (beda dengan set location.hash langsung), jadi tidak ada
// risiko infinite loop antara syncHashFromState() <-> applyRouteFromHash().
// ==========================================
function currentRouteHash(){
  return state.tab === "chart" && state.selectedTicker
    ? `#/chart/${encodeURIComponent(state.selectedTicker)}`
    : `#/${state.tab}`;
}

function syncHashFromState(){
  const target = currentRouteHash();
  if(location.hash !== target) history.pushState(null, "", target);
}

// Dipanggil saat halaman pertama dibuka (kalau URL-nya sudah punya hash,
// misal dari tab baru hasil klik-kanan) & tiap kali user pencet tombol
// back/forward browser (event 'popstate').
function applyRouteFromHash(){
  const raw = (location.hash || "").replace(/^#\/?/, "");
  if(!raw) return; // hash kosong -> biarkan state default (tab "screener") yang sudah ada
  const [tab, ticker] = raw.split("/");
  if(!tab) return;
  if(tab === "chart" && ticker) loadChart(decodeURIComponent(ticker));
  else selectMainTab(tab);
}
window.addEventListener("popstate", applyRouteFromHash);

function selectMainTab(tab){
  if(!tab) return;
  state.tab = tab;
  syncHashFromState();
  state.openDropdown = null; // dropdown filter tidak boleh menggantung saat pindah tab
  // Tutup panel hamburger setelah user memilih menu di mobile.
  const mobileSidebar = document.getElementById("sidebarNav");
  const mobileHamburger = document.getElementById("hamburgerBtn");
  if(mobileSidebar) mobileSidebar.classList.remove("nav-open");
  if(mobileHamburger) mobileHamburger.setAttribute("aria-expanded", "false");
  if(state.tab === "smartpick" && !state.spHistory.length && !state.spHistoryLoading) loadSmartPickHistory();
  if(state.tab === "eps" && !state.epsRaw && !state.epsScanning) ensureEpsDataLoaded();
  if(state.tab === "kraken") ensureOrcaHistoryLoaded();
  render();
}

// Pasang handler langsung pada setiap tombol (bukan hanya delegation di parent).
// Ini tetap bekerja jika ada elemen/overlay lain yang menghentikan bubbling click.
document.querySelectorAll("#tabs .tab-btn").forEach(btn=>{
  bindInternalLink(btn, () => selectMainTab(btn.dataset.tab));
});
document.getElementById("refreshBtn").onclick = ()=> loadLive();

// Tombol hamburger (mobile) — membuka/menutup panel menu navigasi.
// Di desktop tombol ini display:none (CSS), jadi handler tidak berefek.
(function initHamburger(){
  const btn = document.getElementById("hamburgerBtn");
  const sidebar = document.getElementById("sidebarNav");
  if(!btn || !sidebar) return;
  // Posisi panel mengikuti tinggi header aktual (header HP bisa tinggi karena
  // tombol wrap ke bawah) — jauh lebih andal daripada angka 58px di CSS.
  const positionPanel = ()=>{
    const header = document.querySelector(".header");
    if(header) sidebar.style.top = `${Math.round(header.getBoundingClientRect().bottom + 6)}px`;
  };
  btn.addEventListener("click", (e)=>{
    e.stopPropagation();
    const open = sidebar.classList.toggle("nav-open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    if(open) positionPanel();
  });
  // Klik di luar panel menutup menu (hanya relevan saat panel terbuka)
  document.addEventListener("click", (e)=>{
    if(!sidebar.classList.contains("nav-open")) return;
    if(e.target.closest("#sidebarNav") || e.target.closest("#hamburgerBtn")) return;
    sidebar.classList.remove("nav-open");
    btn.setAttribute("aria-expanded", "false");
  });
  // Tutup dengan Esc juga
  document.addEventListener("keydown", (e)=>{
    if(e.key === "Escape" && sidebar.classList.contains("nav-open")){
      sidebar.classList.remove("nav-open");
      btn.setAttribute("aria-expanded", "false");
    }
  });
  window.addEventListener("resize", ()=>{
    if(sidebar.classList.contains("nav-open")) positionPanel();
  });
})();

// Sidebar collapsible — status disimpan di localStorage supaya tetap
// keciut/lebar sama seperti terakhir dipilih user kalau halaman di-reload.
(function initSidebarToggle(){
  const sidebar = document.getElementById("sidebarNav");
  const toggleBtn = document.getElementById("sidebarToggleBtn");
  if(!sidebar || !toggleBtn) return;
  if(localStorage.getItem("ihsg_sidebar_collapsed") === "1") sidebar.classList.add("collapsed");
  toggleBtn.onclick = () => {
    const collapsed = sidebar.classList.toggle("collapsed");
    localStorage.setItem("ihsg_sidebar_collapsed", collapsed ? "1" : "0");
  };
})();

document.getElementById("portoModalClose").onclick = ()=> resetPortoForm();
document.getElementById("portoModalOverlay").onclick = (e)=>{ if(e.target.id==="portoModalOverlay") resetPortoForm(); };
document.getElementById("detailModalClose").onclick = ()=> closeDetail();
document.getElementById("detailModalOverlay").onclick = (e)=>{ if(e.target.id==="detailModalOverlay") closeDetail(); };
document.getElementById("spListModalClose").onclick = ()=> closeSmartPickList();
document.getElementById("spListModalOverlay").onclick = (e)=>{ if(e.target.id==="spListModalOverlay") closeSmartPickList(); };

loadSettings();
// Tarik pengaturan yang disinkron lintas-device (lihat catatan di
// loadTelegramSettingsFromSupabase()) SEBELUM loadLive() jalan — supaya
// device/browser baru langsung dapat freqAnalyzerCol & endpoint Stockbit
// yang benar tanpa harus buka modal Pengaturan dulu.
loadTelegramSettingsFromSupabase();
syncStockbitTokenFromSupabase();
pollExtensionStockbitToken();
setInterval(pollExtensionStockbitToken, 3000); // lihat catatan di pollExtensionStockbitToken() kenapa harus di-poll, bukan cukup event 'storage'
// Token Stockbit bisa diputar kapan saja oleh Stockbit (session baru di
// browser/HP). Karena itu, selama aplikasi terbuka token dari Supabase
// dicek ulang tiap 60 detik — kalau extension menangkap token yang lebih
// baru, aplikasi otomatis mengadopsinya tanpa perlu reload manual.
setInterval(syncStockbitTokenFromSupabase, 60000);
// Kalau halaman dibuka dengan hash di URL (mis. tab baru hasil klik-kanan
// pada link ticker/tab), pulihkan state.tab/state.selectedTicker DULU
// sebelum render pertama — supaya tab baru itu langsung nampilin konten
// yang benar, bukan default tab Screener lalu "lompat" ke konten yang benar.
applyRouteFromHash();
loadLive();

// ==========================================
// AUTO-REFRESH HARGA LIVE — sebelumnya loadLive() cuma dipanggil sekali saat
// page load, jadi tab yang dibiarkan terbuka lama menampilkan harga basi.
// Sekarang dijadwalkan ulang tiap LIVE_REFRESH_INTERVAL_MS, dengan 2 pengaman:
// 1. Diskip kalau tab sedang di background (document.hidden) — hemat request,
//    dan begitu tab dibuka lagi langsung refresh sekali (visibilitychange)
//    supaya tidak perlu nunggu interval penuh.
// 2. Diskip kalau user sedang fokus mengetik di input/textarea/select manapun
//    (search box, form manual Broker Summary, dsb.) — render() replace
//    innerHTML, jadi kalau dipaksa refresh di tengah ketikan akan reset fokus
//    & nilai yang belum ke-commit ke state. Kalau sedang diskip, otomatis
//    dicoba lagi di siklus interval berikutnya (tidak hilang, cuma ditunda).
// ==========================================
const LIVE_REFRESH_INTERVAL_MS = 45000; // 45 detik — cukup sering tanpa membebani Supabase/Stockbit
let liveRefreshInFlight = false;

function shouldSkipAutoRefreshLive(){
  const el = document.activeElement;
  return !!(el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT"));
}

async function autoRefreshLiveTick(){
  if(liveRefreshInFlight || document.hidden || shouldSkipAutoRefreshLive()) return;
  liveRefreshInFlight = true;
  try{ await loadLive(); } finally { liveRefreshInFlight = false; }
}

setInterval(autoRefreshLiveTick, LIVE_REFRESH_INTERVAL_MS);
document.addEventListener("visibilitychange", () => { if(!document.hidden) autoRefreshLiveTick(); });

// ==========================================
// AUTO-REFRESH LIVE STOCKBIT (Screener) — beda dari AUTO-REFRESH HARGA LIVE
// di atas (yang narik dari Supabase). Ini khusus buat kolom "🔴 Live
// Stockbit" di tabel Screener, dan SENGAJA jauh lebih hati-hati karena:
//
// 1. Pakai token pribadi user ke API tidak resmi — tiap siklus bisa memicu
//    N request berurutan (N = jumlah saham dicentang / lolos filter).
// 2. Makanya ada 3 pengaman TAMBAHAN di luar yang sudah dipakai
//    autoRefreshLiveTick() (skip kalau tab background / user sedang ngetik):
//      a. Cuma jalan kalau tab "screener" yang sedang dibuka (state.tab) —
//         tidak berguna narik data ini kalau user sedang di tab lain.
//      b. Interval MINIMAL 30 detik (STOCKBIT_AUTOREFRESH_MIN_SEC), tidak
//         bisa diset lebih cepat dari itu lewat dropdown.
//      c. Kalau jumlah ticker (dicentang, atau semua yang lolos filter
//         kalau tak ada yang dicentang) melebihi STOCKBIT_AUTOREFRESH_MAX_TICKERS,
//         auto-refresh DIJEDA OTOMATIS (bukan dimatikan — toggle tetap ON,
//         tinggal skip siklus itu) sampai user mempersempit filter atau
//         mencentang saham tertentu. Badge peringatan sudah muncul di UI
//         Screener kalau kondisi ini aktif.
// 3. Dipakai clock 5 detik (bukan setInterval langsung sebesar interval
//    pilihan user) supaya ganti pilihan dropdown interval efektif LANGSUNG
//    di siklus berikutnya, tanpa perlu clearInterval/setInterval ulang.
// ==========================================
let stockbitAutoRefreshInFlight = false;
let lastStockbitAutoRefreshAt = 0;

function getStockbitAutoRefreshTickers(){
  const checked = [...state.selectedForBacktest];
  return checked.length ? checked : getSorted(getFiltered()).map(s=>s.ticker);
}

async function stockbitAutoRefreshTick(){
  if(!state.stockbitAutoRefresh || !state.stockbitToken) return;
  if(state.tab !== "screener") return;
  if(document.hidden || shouldSkipAutoRefreshLive()) return;
  if(stockbitAutoRefreshInFlight || state.stockbitBulkLoading) return;

  const tickers = getStockbitAutoRefreshTickers();
  if(!tickers.length || tickers.length > STOCKBIT_AUTOREFRESH_MAX_TICKERS) return;

  stockbitAutoRefreshInFlight = true;
  try{ await fetchStockbitLiveBulk(tickers); }
  finally{ stockbitAutoRefreshInFlight = false; }
}




function stockbitAutoRefreshClockTick(){
  if(!state.stockbitAutoRefresh) return;
  const intervalMs = Math.max(STOCKBIT_AUTOREFRESH_MIN_SEC, state.stockbitAutoRefreshIntervalSec||60) * 1000;
  if(Date.now() - lastStockbitAutoRefreshAt < intervalMs) return;
  lastStockbitAutoRefreshAt = Date.now();
  stockbitAutoRefreshTick();
}

setInterval(stockbitAutoRefreshClockTick, 5000); // "jam" granularitas 5 detik, lihat catatan poin 3 di atas
document.addEventListener("visibilitychange", () => { if(!document.hidden) stockbitAutoRefreshClockTick(); });

// ==========================================
// PWA: daftarkan service worker supaya browser menganggap app ini
// "installable" (syarat "Add to Home Screen"/install prompt di Android
// Chrome; iOS Safari tidak butuh service worker tapi tetap aman didaftarkan).
// Dibungkus try/catch + cek 'serviceWorker' in navigator karena:
//  - Kalau halaman ini masih dibuka lewat file:// (bukan http/https),
//    registrasi service worker akan gagal/ditolak browser — itu WAJAR,
//    bukan bug. Fitur install penuh baru aktif kalau di-hosting via HTTPS
//    (lihat catatan PWA_HOSTING.md).
// ==========================================
if("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")){
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => { /* diamkan — bukan fatal */ });
  });
}

// Gambar ulang chart internal saat orientasi layar berubah / jendela di-resize
// (penting di mobile: viewBox chart dihitung dari rasio kontainer, jadi kalau
// tidak digambar ulang, chart akan kepotong/gepeng setelah rotasi HP).
let chartResizeTimer=null;
window.addEventListener("resize", ()=>{
  if(state.tab!=="chart" || !state.selectedTicker) return;
  clearTimeout(chartResizeTimer);
  chartResizeTimer=setTimeout(()=>drawChartSVG(),150);
});

// Fungsi Pemanis UI: Membuat baris tabel berkedip saat ada data live masuk
window.updateLivePriceUI = function(ticker, currentPrice, prevPrice) {
    if (!Number.isFinite(Number(currentPrice)) || Number(currentPrice) === Number(prevPrice)) return;
    const row = document.getElementById('row-' + String(ticker).toUpperCase());
    if (row) {
        const prev = Number.isFinite(Number(prevPrice)) ? Number(prevPrice) : Number(currentPrice);
        // Hijau jika naik, Merah jika turun
        const flashColor = currentPrice > prev ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)';
        row.style.transition = 'none';
        row.style.backgroundColor = flashColor;
        
        // Hilangkan warna setelah setengah detik
        setTimeout(() => {
            row.style.transition = 'background-color 0.8s ease';
            row.style.backgroundColor = '';
        }, 500);
    }
}

window.calculatePositionSizing = function(entryPrice, slPrice) {
  const capital = parseFloat(document.getElementById('calcCapital').value) || 0;
  const riskPct = parseFloat(document.getElementById('calcRiskPct').value) || 0;
  
  if (!capital || !riskPct || !entryPrice || !slPrice || entryPrice <= slPrice) {
    document.getElementById('calcResultStr').innerHTML = 'Maksimal Pembelian: <span style="color:var(--muted)">- Lot</span>';
    return;
  }

  const riskAmount = capital * (riskPct / 100);
  const lossPerShare = entryPrice - slPrice;
  const lossPerLot = lossPerShare * 100;
  
  const maxLot = Math.floor(riskAmount / lossPerLot);
  const totalValue = maxLot * 100 * entryPrice;
  
  document.getElementById('calcResultStr').innerHTML = 
    `Maksimal Pembelian: <span style="color:var(--up)">${fmtNum(maxLot)} Lot</span><br>
     <span style="font-size: 12px; color: var(--muted); font-weight: 500;">(Total Beli: Rp ${fmtNum(totalValue)} | Potensi Rugi: Rp ${fmtNum(riskAmount)})</span>`;
};

function playAlertSound() {
    // Suara notifikasi singkat (bebas diganti URL audionya)
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'); 
    audio.play().catch(e => console.log("Autoplay diblokir browser, user harus interaksi dengan layar dulu.", e));
}

function showToast(message, tone = "up") {
    let container = document.getElementById('toastContainer');
    if(!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.borderLeftColor = `var(--${tone})`;
    const msgEl = document.createElement('div');
    msgEl.style.fontSize = '11px';
    msgEl.textContent = String(message); // textContent, bukan innerHTML — pesan bisa memuat data eksternal
    const head = document.createElement('div');
    head.style.cssText = 'font-size:12px; font-weight:bold;';
    head.textContent = '🔥 Radar Day Trade';
    toast.appendChild(head);
    toast.appendChild(msgEl);
    
    container.appendChild(toast);
    playAlertSound();
    
    // Hilang otomatis setelah 5 detik
    setTimeout(() => { 
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}



// --- LISTENER UNTUK DATA LIVE WEBSOCKET DARI EKSTENSI ---
// (log awal dipindah ke listener utama di bawah agar tidak dobel)

// ==========================================
// 🥷 WEBSOCKET INTERCEPTOR (DAY TRADE MODE)
// ==========================================

// 1. Fungsi Parser Mentah
// Bertugas menerjemahkan data string ajaib dari Stockbit menjadi JSON (Objek)
function parseStockbitWsMessage(rawString) {
    try {
        let cleanStr = rawString;
        
        // Pipa WebSocket sering menambahkan angka di depan (misal: "42[...]")
        // Kita bersihkan dulu angka di depannya agar bisa di-parse sebagai JSON
        if (/^\d+/.test(cleanStr)) {
            cleanStr = cleanStr.replace(/^\d+/, '');
        }
        
        if (!cleanStr) return null;
        
        const parsed = JSON.parse(cleanStr);
        return parsed; 
    } catch (e) {
        // Jika format bukan JSON, biarkan lewat
        return null;
    }
}

// 2. Fungsi Update Data & Logika Day Trade
function handleLiveTick(parsedData) {
    /* 
       ⚠️ CATATAN UNTUK BESOK: 
       Kita belum tahu pasti nama field yang dipakai Stockbit di WebSocket mereka.
       Asumsi sementara, strukturnya memuat: { symbol: "BBCA", price: 10000, volume: 50000 }
       Besok kita sesuaikan bagian ini setelah melihat data aslinya di Console!
    */
    
    // (Contoh Kerangka) Jika data berupa array, biasanya data ada di index ke-1
    const payload = Array.isArray(parsedData) ? parsedData[1] : parsedData;
    if (!payload) return;

    // Asumsi nama field dari Stockbit (Akan kita revisi besok)
    const ticker = String(payload.symbol || payload.code || '').trim().toUpperCase();
    const currentPrice = Number(payload.price ?? payload.last);
    const currentVol = Number(payload.volume ?? payload.vol);

    if (!ticker || !Number.isFinite(currentPrice) || currentPrice <= 0) return;

    // Pastikan state saham live sudah siap
    if (!state.stockbitLive[ticker]) {
        state.stockbitLive[ticker] = { loading: false, error: null, mapped: {} };
    }

    const prevPrice = state.stockbitLive[ticker].mapped.last;

    // Perbarui State Harga
    state.stockbitLive[ticker].mapped = {
        ...state.stockbitLive[ticker].mapped,
        last: currentPrice,
        volume: Number.isFinite(currentVol) && currentVol >= 0 ? currentVol : state.stockbitLive[ticker].mapped.volume
    };
    state.stockbitLive[ticker].fetchedAt = Date.now();

    // 🔥 LOGIKA DETEKSI VOLUME SPIKE (DAY TRADE)
    const dbData = state.stocks.find(s => s.ticker === ticker);
    if (dbData && dbData.cVol && Number.isFinite(currentVol) && currentVol > 0) {
         // Jika volume lompat 20% dari EOD sebelumnya dengan sangat cepat
         if (currentVol > (dbData.cVol * 1.2)) {
             state.stockbitLive[ticker].intradaySpike = true;
         }
    }

    // Perbarui UI jika saham ini sedang dirender di layar (tanpa me-render seluruh tabel agar tidak lag)
    updateLivePriceUI(ticker, currentPrice, prevPrice);
} // <--- kurung tutup fungsi handleLiveTick

// 3. Fungsi Pemanis UI (Berkedip Hijau/Merah) — dedup: dua versi identik
// sebelumnya saling menimpa (function declaration terakhir menang).
function updateLivePriceUI(ticker, currentPrice, prevPrice) {
    if (!Number.isFinite(Number(currentPrice)) || currentPrice === prevPrice) return;
    const prev = Number.isFinite(Number(prevPrice)) ? Number(prevPrice) : Number(currentPrice);

    // Tabel utama memakai id `row-TICKER`; gunakan selector CSS yang aman
    // agar ticker tidak dapat memecahkan selector dan dukung UI terbaru.
    const row = document.getElementById('row-' + String(ticker).toUpperCase());
    const priceCells = row ? row.querySelectorAll('.price-cell') : document.querySelectorAll(`.ticker-row-${CSS.escape(String(ticker))} .price-cell`);
    
    priceCells.forEach(cell => {
        cell.textContent = fmtNum(currentPrice);
        
        // Efek Kedip Harga (Naik = Hijau, Turun = Merah)
        const flashColor = currentPrice > prev ? 'rgba(16,185,129,0.5)' : 'rgba(239,68,68,0.5)';
        cell.style.transition = 'none';
        cell.style.backgroundColor = flashColor;
        
        setTimeout(() => {
            cell.style.transition = 'background-color 0.5s ease';
            cell.style.backgroundColor = 'transparent';
        }, 300);
    });
}

// 4. Listener Utama Penangkap Sinyal Ekstensi
window.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'FROM_EXTENSION_WS') {
      
      // LOG INI SANGAT PENTING UNTUK BESOK PAGI! 
      // Kita akan cek struktur aslinya dari sini.
      console.log("📥 WS RAW:", event.data.data); 
      
      const parsed = parseStockbitWsMessage(event.data.data);
      if (parsed) {
          handleLiveTick(parsed);
      }
  }
});

window.calcAveraging = function(oldPrice, oldLot) {
    const newPrice = parseFloat(document.getElementById('avgNewPrice').value) || 0;
    const newLot = parseFloat(document.getElementById('avgNewLot').value) || 0;
    const resEl = document.getElementById('avgResult');

    if (!newPrice || !newLot || !oldPrice || !oldLot) {
        resEl.innerHTML = 'Harga Rata-rata Baru: <span style="color:var(--muted)">-</span>';
        return;
    }

    const totalOldValue = oldPrice * oldLot;
    const totalNewValue = newPrice * newLot;
    const totalLot = oldLot + newLot;
    const avgPrice = (totalOldValue + totalNewValue) / totalLot;

    resEl.innerHTML = `Harga Rata-rata Baru: <span style="color:var(--up); font-size:18px;">Rp ${fmtNum(Math.round(avgPrice))}</span> <span style="font-size:12px;color:var(--muted); font-weight:normal;">(Total Kepemilikan: ${totalLot} Lot)</span>`;
}