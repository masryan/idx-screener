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
// PENGATURAN UI KONEKSI
// ==========================================
function openSettings() {
  let urlDisp = SUPABASE_URL;
  if(urlDisp.endsWith("/rest/v1")) urlDisp = urlDisp.replace("/rest/v1", "");
  document.getElementById("setSupaUrl").value = urlDisp;
  document.getElementById("setSupaKey").value = SUPABASE_KEY;
  document.getElementById("setFreqAnalyzerCol").value = state.freqAnalyzerCol;
  document.getElementById("settingsModalOverlay").classList.add("open");
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

  const freqColInput = (document.getElementById("setFreqAnalyzerCol").value || "").trim();
  state.freqAnalyzerCol = freqColInput || "freq_ma20";
  localStorage.setItem(LS_FREQ_ANALYZER_COL, state.freqAnalyzerCol);
  
  closeSettings();
  
  if(SUPABASE_URL && SUPABASE_KEY) {
    loadLive();
  } else {
    document.getElementById("content").innerHTML = `<div class="empty-box">Koneksi belum diatur. Klik "⚙️ Pengaturan" di pojok kanan atas.</div>`;
  }
}

// ==========================================
// APLIKASI UTAMA
// ==========================================
const LS_WATCHLIST = "ihsg_watchlist", LS_BACKTEST = "ihsg_backtest", LS_PORTO = "ihsg_portofolio", LS_STOCK_CACHE = "ihsg_stock_cache";
const LS_FREQ_ANALYZER_COL = "ihsg_freq_analyzer_col";
const LS_CUSTOM_RULES = "ihsg_custom_rules_v1";

let state = {
  demoMode: false, stocks: [], watchlist: new Set(), backtests: [],
  selectedForBacktest: new Set(),
  portfolio: [], portoEditId: null, portoModalOpen: false, selectedPorto: new Set(),
  tab: "screener", search: "", activePreset: null,
  visibleCols: new Set(), // diisi loadSettings() dari localStorage atau DEFAULT_VISIBLE_COLS
  colPickerOpen: false,
  filters: {sektor:[], syariahLabel:[], cekHarga:[], cekRsi:[], statusRsi:[], cekMacd:[], band:[], sinyalVolume:[], sinyalFrekuensi:[], keyakinanNaik:[], trendHarga:[], polaCandle:[], uangGedeMasuk:[], isBBSqueeze:[], valuasi:[]},
  showAdvancedFilters: false,
  rangeFilters: { 
    bbWidth:{min:"",max:""}, 
    atr14:{min:"",max:""}, 
    clv:{min:"",max:""},
    rsi7:{min:"58",max:"72"},  
    rsi21:{min:"58",max:"72"},
    frequency:{min:"",max:""}
  },
  openDropdown: null, 
  sort: { col: null, asc: true },
  page: 1, limit: 10,
  expanded: new Set(),
  selectedTicker: null, chartData: [], chartLoading: false, selectedLevels: null, loading:false, chartSearch: "",
  detailTicker: null, detailTab: "teknikal",
  // "Frequency Analyzer" = kolom baseline (rata-rata Frekuensi) di DB yang
  // dipakai sebagai pembanding di rule builder, namanya bisa beda-beda
  // tergantung skema tiap orang — jadi dibuat konfigurasi lewat Pengaturan,
  // bukan di-hardcode. Default "freq_ma20" (isi lewat "⚙️ Pengaturan").
  freqAnalyzerCol: "freq_ma20",
  // Rules kustom ala "Edit Screener" Stockbit: {id, aKey, op, mult, bType, bKey, bConst}
  customRules: [],
  // Preset Screener kustom (disimpan di tabel custom_presets Supabase):
  // {id, name, rules, created_at}. selectedPresetId = preset yang dipilih
  // di dropdown (belum tentu sudah "dimuat" ke customRules).
  customPresets: [],
  selectedPresetId: "",
  presetsLoading: false
};

function fmtNum(n){ if(n===null||n===undefined) return "-"; return new Intl.NumberFormat("id-ID").format(n); }
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
  try{
    const savedRules = JSON.parse(localStorage.getItem(LS_CUSTOM_RULES)||"[]");
    state.customRules = Array.isArray(savedRules) ? savedRules : [];
  }catch(e){ state.customRules = []; }
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

async function loadLive(){
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    openSettings();
    return;
  }

  state.loading = true; showError(""); render();
  try {
    const [stocksRes, portoRes, backtestRes, wlRes, presetsRes] = await Promise.all([
      // Ambil dari VIEW gabungan, bukan tabel stocks mentah: stocks_screener
      // sudah menggabungkan fundamental+teknikal (tabel stocks) dengan
      // bandarmologi asli dari IDX (view flow_summary), lewat left join.
      fetch(`${SUPABASE_URL}/stocks_screener?select=*`, { headers: getSupaHeaders() }).then(r => r.json()),
      fetch(`${SUPABASE_URL}/portfolios?select=*`, { headers: getSupaHeaders() }).then(r => r.json()),
      fetch(`${SUPABASE_URL}/backtest_sessions?select=*,backtest_items(*)`, { headers: getSupaHeaders() }).then(r => r.json()),
      fetch(`${SUPABASE_URL}/watchlists?select=ticker`, { headers: getSupaHeaders() }).then(r => r.json()),
      fetch(`${SUPABASE_URL}/custom_presets?select=*&order=created_at.desc`, { headers: getSupaHeaders() }).then(r => r.json())
    ]);

    if (stocksRes.message) throw new Error(stocksRes.message);

    state.stocks = stocksRes.map(r => ({
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
      roa: numOrNull(r.roa), npm: numOrNull(r.npm), opm: numOrNull(r.opm),
      revenueGrowth: numOrNull(r.revenue_growth), earningsGrowth: numOrNull(r.earnings_growth),
      dividendRate: numOrNull(r.dividend_rate), payoutRatio: numOrNull(r.payout_ratio),
      beta: numOrNull(r.beta), der: numOrNull(r.der), currentRatio: numOrNull(r.current_ratio),
      support: r.support, resistance: r.resistance, high52w: r.week52_high, low52w: r.week52_low,
      week52ChangePct: numOrNull(r.week52_change_pct),
      ema21H: r.ema21h, ema21L: r.ema21l, ma21: r.ma21, ma50: r.ma50, ma100: r.ma100, ma200: r.ma200,
      rsi7: r.rsi7, rsi21: r.rsi21, hist: r.macd_hist, histPrev: 0,
      fib: r.fibonacci, 
      cekHarga: r.cek_harga, cekRsi: r.cek_rsi, statusRsi: r.status_rsi, cekMacd: r.cek_macd,
      keyakinanNaik: r.keyakinan_naik,
      trendHarga: r.trend_harga, candleKemarin: r.candle_kemarin, candleHariIni: r.candle_hari_ini, polaCandle: r.pola_candle,
      uangGedeMasuk: boolLabel(r.uang_gede_masuk), bbWidth: numOrNull(r.bb_width),
      isBBSqueeze: boolLabel(r.is_bb_squeeze), atr14: numOrNull(r.atr14), valuasi: r.valuasi ?? "-", clv: numOrNull(r.clv),
      ema89: numOrNull(r.ema89), prevHigh: numOrNull(r.prev_high), prevLow: numOrNull(r.prev_low), prevVol: numOrNull(r.prev_vol),
      stochK: numOrNull(r.stoch_k), stochD: numOrNull(r.stoch_d), prevStochK: numOrNull(r.prev_stoch_k), prevStochD: numOrNull(r.prev_stoch_d),

      // --- Sudah ada di DB tapi sebelumnya belum pernah dipetakan ---
      prevClose: numOrNull(r.prev_close), macd: numOrNull(r.macd), signal: numOrNull(r.signal),

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
      capCategory: r.cap_category, pos52w: numOrNull(r.pos_52w),
      // Market Cap: dipakai kalau kolom `market_cap` sudah ada di
      // stocks_screener. Kalau belum, coba turunkan dari
      // `shares_outstanding` x harga. Kalau dua-duanya belum ada di
      // skema, nilainya null dan UI menampilkan "-" (bukan 0) —
      // lihat catatan di README/SQL soal menambah kolom ini.
      sharesOutstanding: numOrNull(r.shares_outstanding),
      marketCap: numOrNull(r.market_cap) ?? (numOrNull(r.shares_outstanding) != null ? numOrNull(r.shares_outstanding) * (numOrNull(r.price) || 0) : null),
      vsMa50Pct: numOrNull(r.vs_ma50_pct), vsMa200Pct: numOrNull(r.vs_ma200_pct),
      foreignNet1D: numOrNull(r.foreign_net_1d), foreignNet5D: numOrNull(r.foreign_net_5d),
      foreignNet20D: numOrNull(r.foreign_net_20d), foreignUpDays: numOrNull(r.foreign_up_days),
      avgTicket: numOrNull(r.avg_ticket), crossingPct: numOrNull(r.crossing_pct),
      flowSeries: Array.isArray(r.flow_series) ? r.flow_series : null,
      flowDate: r.flow_date, flowDays: numOrNull(r.flow_days),
    }));

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
         items: b.backtest_items.map(it => ({
            ticker: it.ticker, entryPrice: it.entry_price, filterStr: it.notes, sumber: it.source
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

  } catch (e) {
    showError("Gagal terhubung ke Database Supabase: " + e.message);
  }
  state.loading = false; render();
}

function showError(msg){
  const el=document.getElementById("errorMsg");
  el.style.display = msg ? "block" : "none";
  el.textContent = msg;
}

async function toggleFav(ticker){
  const isFav = state.watchlist.has(ticker);
  isFav ? state.watchlist.delete(ticker) : state.watchlist.add(ticker);
  saveWatchlist();
  render();

  try{ 
    if(!isFav) {
      await fetch(`${SUPABASE_URL}/watchlists`, { method: "POST", headers: { ...getSupaHeaders(), "Prefer": "resolution=merge-duplicates" }, body: JSON.stringify({ticker}) });
    } else {
      await fetch(`${SUPABASE_URL}/watchlists?ticker=eq.${ticker}`, { method: "DELETE", headers: getSupaHeaders() });
    }
  } catch(e){}
}

function openDetail(ticker){
  state.detailTicker = ticker;
  state.detailTab = "teknikal";
  render();
}
function closeDetail(){
  state.detailTicker = null;
  render();
}
function setDetailTab(tab){
  state.detailTab = tab;
  render();
}

function dItem(label, valueHtml, isText){
  return `<div class="detail-item"><div class="lbl">${label}</div><div class="val ${isText?'text':''}">${valueHtml==null||valueHtml===""?'-':valueHtml}</div></div>`;
}
function dNum(n, opts){
  opts = opts || {};
  if(n===null||n===undefined||n==="") return "-";
  const num = Number(n);
  if(isNaN(num)) return String(n);
  return (opts.plusSign && num>=0 ? "+" : "") + fmtNum(opts.decimals!=null ? +num.toFixed(opts.decimals) : num) + (opts.suffix||"");
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
      ${dItem("Bid Volume", dNum(s.bidVolume))}
      ${dItem("Offer", `<span style="color:var(--down)">${dNum(s.offer)}</span>`, true)}
      ${dItem("Offer Volume", dNum(s.offerVolume))}
    </div>

    <div class="detail-subtitle">Level Support / Resisten & Fibonacci</div>
    <div class="detail-grid">
      ${dItem("Support", `<span style="color:var(--down)">${dNum(s.support)}</span>`, true)}
      ${dItem("Resisten", `<span style="color:var(--up)">${dNum(s.resistance)}</span>`, true)}
      ${dItem("52W Tinggi", dNum(s.high52w))}
      ${dItem("52W Rendah", dNum(s.low52w))}
      ${dItem("52W Change%", s.week52ChangePct!=null?dNum(s.week52ChangePct,{plusSign:true,decimals:2,suffix:'%'}):"-", true)}
      ${dItem("Fib 23.6%", dNum(s.fib?.f236))}
      ${dItem("Fib 38.2%", dNum(s.fib?.f382))}
      ${dItem("Fib 50%", dNum(s.fib?.f50))}
      ${dItem("Fib 61.8%", dNum(s.fib?.f618))}
    </div>

    <div class="detail-subtitle">Moving Average & Trend</div>
    <div class="detail-grid">
      ${dItem("MA21", dNum(s.ma21))}
      ${dItem("MA50", dNum(s.ma50))}
      ${dItem("MA100", dNum(s.ma100))}
      ${dItem("MA200", dNum(s.ma200))}
      ${dItem("EMA21 High", dNum(s.ema21H))}
      ${dItem("EMA21 Low", dNum(s.ema21L))}
      ${dItem("EMA 89", dNum(s.ema89))}
      ${dItem("Trend Harga (MA)", pillHtml(s.trendHarga||"-", trendTone(s.trendHarga)), true)}
    </div>

    <div class="detail-subtitle">Momentum & Volatilitas</div>
    <div class="detail-grid">
      ${dItem("RSI 7", rsiGaugeHtml(s.rsi7), true)}
      ${dItem("RSI 21", s.rsi21!=null?Number(s.rsi21).toFixed(1):"-")}
      ${dItem("MACD Hist", s.hist!=null?Number(s.hist).toFixed(3):"-")}
      ${dItem("Stoch K", s.stochK??"-")}
      ${dItem("Stoch D", s.stochD??"-")}
      ${dItem("ATR 14", s.atr14??"-")}
      ${dItem("BB Width", s.bbWidth??"-")}
      ${dItem("CLV", s.clv??"-")}
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
      ${dItem("Market Cap", s.marketCap!=null ? `Rp ${fmtCap(s.marketCap)}` : "-", true)}
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

  return `
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
    <div class="detail-grid" style="border-left: 3px solid var(--${tradeTone}); padding-left: 10px; margin-bottom: 8px;">
      ${dItem("Asumsi Entry (Harga Live)", dNum(entry), true)}
      ${dItem("Take Profit", '<span style="color:var(--up)">' + dNum(tp) + ' <span style="font-size:11px;opacity:0.8;">(' + (tpPct>=0?'+':'') + tpPct.toFixed(1) + '%)</span></span>', true)}
      ${dItem("Stop Loss", '<span style="color:var(--down)">' + dNum(sl) + ' <span style="font-size:11px;opacity:0.8;">(' + slPct.toFixed(1) + '%)</span></span>', true)}
      ${dItem("Risk/Reward Ratio (RRR)", '<span style="color:var(--' + (rrr >= 1.5 ? 'up' : 'down') + ')">' + rrr + 'x</span>', true)}
      ${dItem("Kualitas Setup", pillHtml(tradeStatus, tradeTone), true)}
    </div>
    <div class="detail-narrative" style="margin-bottom: 16px;">
      Take Profit ${tpFromResistance ? "diambil dari level resisten teknikal terdekat" : "diperkirakan +5% dari harga entry (resisten belum tersedia di data)"}.
      Stop Loss ${slFromSupport ? "diambil dari level support teknikal terdekat" : `dihitung dari ATR-14 (${s.atr14!=null?dNum(s.atr14):"default 3%"} di bawah entry, karena jarak ke support dianggap terlalu jauh untuk risk yang wajar)`}.
      Ini bukan rekomendasi baku — sesuaikan dengan toleransi risiko dan ukuran posisi masing-masing.
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

function renderDetailModalContent(){
  const s = enriched().find(x => x.ticker === state.detailTicker);
  if(!s){
    return `<div class="empty-box">Data untuk ${state.detailTicker} tidak ditemukan di database.</div>`;
  }
  const tabs = [
    { key:"teknikal", label:"📊 Teknikal" },
    { key:"fundamental", label:"💰 Fundamental" },
    { key:"bandarmologi", label:"🐋 Bandarmologi (IDX)" },
    { key:"analisa", label:"🧠 Analisa" }
  ];
  const tabBtns = tabs.map(t => `<button type="button" class="detail-tab-btn ${state.detailTab===t.key?'active':''}" data-detail-tab="${t.key}">${t.label}</button>`).join("");
  let body = "";
  if(state.detailTab === "teknikal") body = renderDetailTeknikal(s);
  else if(state.detailTab === "fundamental") body = renderDetailFundamental(s);
  else if(state.detailTab === "bandarmologi") body = renderDetailBandarmologi(s);
  else body = renderDetailAnalisa(s);

  return `
    <div class="detail-head">
      <div>
        <div class="detail-head-price">${dNum(s.cClose)} <span style="font-size:15px;font-weight:600;color:${(s.changePct??0)>=0?'var(--up)':'var(--down)'}">${s.changePct!=null?dNum(s.changePct,{plusSign:true,decimals:2,suffix:'%'}):''}</span></div>
        <div class="detail-head-sub">${s.sektor||"Sektor tidak diketahui"} ${s.syariahLabel==="Ya" ? "· Syariah" : ""}</div>
      </div>
      <div style="display:flex;gap:10px;">
        <button class="btn btn-outline" data-chart="${s.ticker}">Lihat Grafik</button>
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
  const stock = enriched().find(s=>s.ticker===ticker);
  state.selectedLevels = stock ? {
    support:stock.support, resistance:stock.resistance,
    ema21H:stock.ema21H, ema21L:stock.ema21L, fib:stock.fib
  } : null;

  // Histori harga close ASLI dari tabel `flows` (diisi sync-flow.mjs dari
  // IDX), bukan lagi deret acak (genDemoSeries lama). `flows` disimpan
  // sampai ~200 hari terakhir per ticker — lihat MAX_DAYS di sync-flow.mjs.
  state.chartData = [];
  state.chartLoading = true;
  render();
  try{
    const rows = await fetch(
      `${SUPABASE_URL}/flows?ticker=eq.${encodeURIComponent(ticker)}&select=date,close&order=date.asc`,
      { headers: getSupaHeaders() }
    ).then(r=>r.json());

    if (Array.isArray(rows) && rows.length){
      state.chartData = rows
        .filter(r => r.close != null)
        .map(r => ({ date: r.date, close: Math.round(r.close) }));
    }
  } catch(e){
    state.chartData = [];
  }
  state.chartLoading = false;
  render();
}

async function syncBacktestToSupabase(sessionId, sessionDate, items) {
  try {
    await fetch(`${SUPABASE_URL}/backtest_sessions`, {
      method: "POST",
      headers: { ...getSupaHeaders(), "Prefer": "resolution=merge-duplicates" },
      body: JSON.stringify({ id: sessionId, session_date: sessionDate })
    });
    
    const payloadItems = items.map(it => ({
      id: String(Date.now()) + Math.floor(Math.random()*1000),
      session_id: sessionId, ticker: it.ticker,
      entry_price: it.entryPrice || it.hargaEntry || 0,
      source: it.sumber || "Screener", notes: it.filterStr || it.keterangan || ""
    }));
    
    await fetch(`${SUPABASE_URL}/backtest_items`, {
      method: "POST",
      headers: { ...getSupaHeaders(), "Prefer": "resolution=merge-duplicates" },
      body: JSON.stringify(payloadItems)
    });
  } catch(e) { }
}

async function saveToBacktest(){
  const filtered = getFiltered();
  const toSave = filtered.filter(s => state.selectedForBacktest.has(s.ticker));

  if(toSave.length === 0) return alert("Screener kosong atau tidak ada emiten yang dicentang.");

  const sessionId = String(Date.now());
  const tglSesi = new Date().toLocaleString('id-ID');
  const items = toSave.map(s => ({
    ticker: s.ticker,
    entryPrice: s.cClose,
    sumber: "Screener",
    keterangan: `Harga: ${s.cekHarga}; RSI: ${s.cekRsi}; Status RSI: ${s.statusRsi}; MACD: ${s.cekMacd}; Rasio Vol: ${(s.volRatio??0).toFixed(2)}x (${s.sinyalVolume}); Keyakinan Naik: ${s.keyakinanNaik}`
  }));

  state.backtests.unshift({
    id: sessionId, date: tglSesi,
    items: items.map(it=>({ ticker: it.ticker, entryPrice: it.entryPrice, filterStr: it.keterangan, sumber: it.sumber }))
  });
  saveBacktests();
  state.selectedForBacktest.clear(); 
  render();

  await syncBacktestToSupabase(sessionId, tglSesi, items);
  alert(`${toSave.length} emiten yang dipilih berhasil disimpan ke tab Backtest.`);
}

async function addManualBacktest(sessionId, ticker, entryPrice, keterangan){
  ticker = String(ticker || "").trim().toUpperCase().replace(".JK","");
  if(!ticker) return alert("Ticker wajib diisi.");
  entryPrice = parseFloat(entryPrice) || 0;
  if(!entryPrice) return alert("Harga entry wajib diisi.");
  const note = keterangan && keterangan.trim() ? keterangan.trim() : "Input manual (uji di luar screener)";

  let sid = sessionId || "";
  let session = sid ? state.backtests.find(b => String(b.id) === String(sid)) : null;
  if(!session){
    sid = String(Date.now());
    session = { id: sid, date: new Date().toLocaleString('id-ID'), items: [] };
    state.backtests.unshift(session);
  }
  session.items.push({ ticker, entryPrice, filterStr: note, sumber: "Manual" });
  saveBacktests();
  render();

  await syncBacktestToSupabase(sid, session.date, [{ ticker, entryPrice, sumber: "Manual", filterStr: note }]);
}

async function deleteBacktestSession(id){
  if(!confirm("Hapus sesi backtest ini?")) return;
  state.backtests = state.backtests.filter(b => String(b.id) !== String(id));
  saveBacktests();
  render();
  try{ await fetch(`${SUPABASE_URL}/backtest_sessions?id=eq.${id}`, { method: "DELETE", headers: getSupaHeaders() }); }catch(e){}
}

async function deleteBacktestItem(sessionId, ticker){
  const session = state.backtests.find(b => String(b.id) === String(sessionId));
  if(session){
    session.items = session.items.filter(it => it.ticker !== ticker);
    if(session.items.length === 0) state.backtests = state.backtests.filter(b => String(b.id) !== String(sessionId));
  }
  saveBacktests();
  render();
  try{ await fetch(`${SUPABASE_URL}/backtest_items?session_id=eq.${sessionId}&ticker=eq.${ticker}`, { method: "DELETE", headers: getSupaHeaders() }); }catch(e){}
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

  const dateStr = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(workbook, `Screener_IHSG_${dateStr}.xlsx`);
}

function exportBacktestToExcel(id) {
  const session = state.backtests.find(b => String(b.id) === String(id));
  if (!session) return;
  
  // 1. Siapkan data dengan kolom "Tanggal Entry"
  const data = session.items.map(item => {
    const liveData = state.stocks.find(s => s.ticker === item.ticker);
    const currentPrice = liveData ? liveData.cClose : item.entryPrice;
    const pl = item.entryPrice ? ((currentPrice - item.entryPrice) / item.entryPrice) * 100 : 0;
    
    return {
      "Tanggal Entry": session.date, // Diambil dari waktu tangkap/sesi
      "Ticker": item.ticker,
      "Sumber": item.sumber || "Screener",
      "Harga Entry": item.entryPrice,
      "Harga Live": currentPrice,
      "Profit/Loss (%)": parseFloat(pl.toFixed(2)),
      "Filter / Keterangan": item.filterStr || "-"
    };
  });

  // 2. Buat Workbook & Worksheet Excel murni
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data Backtest");
  
  // 3. Atur lebar kolom agar rapi
  const wscols = [
    {wch: 22}, // Tanggal Entry
    {wch: 10}, // Ticker
    {wch: 12}, // Sumber
    {wch: 12}, // Harga Entry
    {wch: 12}, // Harga Live
    {wch: 15}, // Profit/Loss (%)
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
      const pl = item.entryPrice ? ((currentPrice - item.entryPrice) / item.entryPrice) * 100 : 0;
      
      allData.push({
        "Tanggal Entry": session.date,
        "Ticker": item.ticker,
        "Sumber": item.sumber || "Screener",
        "Harga Entry": item.entryPrice,
        "Harga Live": currentPrice,
        "Profit/Loss (%)": parseFloat(pl.toFixed(2)),
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
    {wch: 22}, // Tanggal Entry
    {wch: 10}, // Ticker
    {wch: 12}, // Sumber
    {wch: 12}, // Harga Entry
    {wch: 12}, // Harga Live
    {wch: 15}, // Profit/Loss (%)
    {wch: 50}  // Keterangan
  ];
  worksheet['!cols'] = wscols;

  // Unduh dengan nama file otomatis memakai tanggal hari ini
  const dateStr = new Date().toISOString().slice(0, 10);
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

  try {
    await fetch(`${SUPABASE_URL}/portfolios`, {
      method: "POST",
      headers: { ...getSupaHeaders(), "Prefer": "resolution=merge-duplicates" },
      body: JSON.stringify(payload)
    });
  } catch (e) { console.error("Gagal sinkron Portofolio:", e); }
}

async function submitPortoForm(){
  const v = readPortoForm();
  if(!v.ticker) return alert("Nama emiten wajib diisi.");
  if(!v.tglBeli || !v.hargaBeli || !v.lotBeli) return alert("Tanggal beli, harga beli, dan jumlah lot wajib diisi.");
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

  await syncPortoToServer_(record);
  
  const idx = state.portfolio.findIndex(p => String(p.id) === String(record.id));
  if(idx >= 0) state.portfolio[idx] = record; else state.portfolio.unshift(record);
  savePortoLocal();
  state.portoEditId = null;
  state.portoModalOpen = false;
  render();
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
  render();
}

function openPortoModal(id){
  state.portoEditId = id || null;
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
    const freq = frequencySignal(freqRatio);
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

    return { 
      ...s, band, volRatio: ratio, sinyalVolume, volTone: vol.tone, 
      freqRatio, sinyalFrekuensi, freqTone: freq.tone, volChangePct,
      keyakinanNaik: keyakinan, keyakinanScore: s.keyakinanScore ?? conf.score, 
      keyakinanTone: kTone, syariahLabel: boolLabel(s.syariah),
      rekomendasi, rekTone
    };
  });
}

function getFiltered(){
  return enriched().filter(s=>{
    if(state.search && !s.ticker.toLowerCase().includes(state.search.toLowerCase())) return false;
    
    // --- PRESET DSI ---
    if(state.activePreset === 'eri') {
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
      if (s.cClose > s.ema21L * 1.03) return false;
      if (s.cClose < (s.support || 0) * 0.98) return false;
      if (s.stochK != null && s.stochD != null) {
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
      // Lonjakan jumlah transaksi vs rata-rata — perlu freqRatio (dari
      // frequency & freq_ma20/avg_frequency_3m). Kalau kolom itu belum
      // ada di DB, freqRatio selalu null → preset ini tidak mengeluarkan
      // hasil, bukan salah menghitung dari Volume.
      if (s.freqRatio == null || s.freqRatio < 1.5) return false;
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

    const rf = state.rangeFilters;
    if(!inRange(s.bbWidth, rf.bbWidth)) return false;
    if(!inRange(s.atr14, rf.atr14)) return false;
    if(!inRange(s.clv, rf.clv)) return false;
    if(!inRange(s.rsi7, rf.rsi7)) return false;
    if(!inRange(s.rsi21, rf.rsi21)) return false;
    if(!inRange(s.frequency, rf.frequency)) return false;

    if(state.customRules && state.customRules.length){
      for(const rule of state.customRules){
        if(!evalCustomRule(s, rule)) return false;
      }
    }

    return true;
  });
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

function render(){
  document.getElementById("modePill").className = "pill pill-up";
  document.getElementById("modePill").textContent = "Data Live";
  document.querySelectorAll(".tab-btn").forEach(b=> b.classList.toggle("active", b.dataset.tab===state.tab));

  const content = document.getElementById("content");
  if(state.tab==="screener") content.innerHTML = renderScreener();
  else if(state.tab==="watchlist") content.innerHTML = renderWatchlist();
  else if(state.tab==="backtest") content.innerHTML = renderBacktest();
  else if(state.tab==="portfolio") content.innerHTML = renderPortfolio();
  else if(state.tab==="chart") content.innerHTML = renderChart();
  else if(state.tab==="about") content.innerHTML = renderAbout();

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
    document.querySelectorAll("#detailModalContent [data-chart]").forEach(b=> b.onclick = ()=>{ closeDetail(); loadChart(b.dataset.chart); });
  }
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
  bbWidth:"BB Width", atr14:"ATR 14", clv:"CLV", rsi7:"RSI 7", rsi21:"RSI 21", frequency:"Frekuensi"
};
const PRESET_LABELS = { eri:"Eri Ginanjar", rsicross:"RSI & Harga Cross", golden:"Golden Cross DSI", uptrend:"Super Uptrend", breakout:"Volatility Breakout", pullback:"Pullback Uptrend", custom_bandar:"BPJS", asing_akumulasi:"Akumulasi Asing (IDX)", freq_spike:"Lonjakan Frekuensi" };
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
];
const RULE_OPS = {
  ">": (a,b)=>a>b, "<": (a,b)=>a<b, ">=": (a,b)=>a>=b, "<=": (a,b)=>a<=b, "=": (a,b)=>a===b
};
function ruleMetricLabel(key){ const m = RULE_METRICS.find(x=>x.key===key); return m ? m.label : key; }
function ruleMetricValue(s, key){
  const v = s[key];
  if(v===undefined || v===null || v==="" || isNaN(v)) return null;
  return Number(v);
}
function evalCustomRule(s, rule){
  const aVal = ruleMetricValue(s, rule.aKey);
  if(aVal===null) return false;
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
    const res = await fetch(`${SUPABASE_URL}/custom_presets?select=*&order=created_at.desc`, { headers: getSupaHeaders() });
    const data = await res.json();
    if(Array.isArray(data)) state.customPresets = data;
  }catch(e){}
}

async function saveCurrentAsPreset(){
  if(!SUPABASE_URL || !SUPABASE_KEY){ openSettings(); return; }
  if(!state.customRules.length){ alert("Belum ada Rule Kustom untuk disimpan. Tambahkan rule dulu lewat \"+ Tambah Rule\"."); return; }
  const name = prompt("Nama preset (mis. \"Breakout Volume + RSI\"):", "");
  if(name === null) return;
  const trimmed = name.trim();
  if(!trimmed){ alert("Nama preset tidak boleh kosong."); return; }

  state.presetsLoading = true; render();
  try{
    const res = await fetch(`${SUPABASE_URL}/custom_presets`, {
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

function loadSelectedPreset(){
  const preset = state.customPresets.find(p => String(p.id) === String(state.selectedPresetId));
  if(!preset) return;
  const rules = Array.isArray(preset.rules) ? preset.rules : [];
  // Deep-clone + pastikan tiap rule punya id lokal (jaga-jaga kalau
  // rule lama disimpan tanpa id, atau dobel id antar-preset).
  state.customRules = rules.map(r => ({ ...r, id: "r" + Date.now() + "_" + (ruleIdCounter++) }));
  saveCustomRules();
  state.page = 1;
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
function renderRuleBuilder(){
  const metricOptions = (selected) => RULE_METRICS.map(m=>`<option value="${m.key}" ${selected===m.key?'selected':''}>${m.label}</option>`).join("");
  const opOptions = (selected) => Object.keys(RULE_OPS).map(op=>`<option value="${op}" ${selected===op?'selected':''}>${op}</option>`).join("");

  const rows = state.customRules.map(r => `
    <div class="rule-row" data-rule-id="${r.id}">
      <select class="rule-select" data-rule-field="aKey" data-rule-id="${r.id}">${metricOptions(r.aKey)}</select>
      <select class="rule-op" data-rule-field="op" data-rule-id="${r.id}">${opOptions(r.op)}</select>
      ${r.bType === "const"
        ? `<input type="number" step="any" class="rule-const" data-rule-field="bConst" data-rule-id="${r.id}" value="${r.bConst}" placeholder="angka">`
        : `<input type="number" step="any" class="rule-mult" data-rule-field="mult" data-rule-id="${r.id}" value="${r.mult}">
           <span class="rule-times">&times;</span>
           <select class="rule-select" data-rule-field="bKey" data-rule-id="${r.id}">${metricOptions(r.bKey)}</select>`
      }
      <button type="button" class="rule-btype-toggle" data-rule-field="toggleBType" data-rule-id="${r.id}" title="${r.bType==='const' ? 'Ganti jadi: bandingkan dengan metrik lain' : 'Ganti jadi: bandingkan dengan angka tetap'}">${r.bType==='const' ? '🔢' : '📊'}</button>
      <button type="button" class="rule-del" data-rule-del="${r.id}" title="Hapus rule">✕</button>
    </div>
  `).join("");

  const presetOptions = state.customPresets.map(p =>
    `<option value="${p.id}" ${String(state.selectedPresetId)===String(p.id)?'selected':''}>${escapeHtml(p.name)} (${Array.isArray(p.rules)?p.rules.length:0} rule)</option>`
  ).join("");

  return `
    <div class="panel" style="margin-bottom:16px;">
      <div class="filter-section-title">Rules Kustom (mirip Edit Screener Stockbit)<span class="line"></span></div>
      <div class="rule-list">${rows || '<div style="color:var(--muted);font-size:13px;padding:6px 0 2px;">Belum ada rule kustom. Klik "+ Tambah Rule" untuk mulai — mis. "Frequency &gt; 5 &times; Frequency Analyzer".</div>'}</div>
      <div style="display:flex;align-items:center;gap:12px;margin-top:12px;flex-wrap:wrap;">
        <button type="button" class="btn btn-outline" id="addRuleBtn">+ Tambah Rule</button>
        <button type="button" class="btn btn-outline" id="savePresetBtn" ${state.presetsLoading?'disabled':''}>💾 Simpan sebagai Preset...</button>
        ${state.customRules.length ? `<span style="font-size:12px;color:var(--muted);">${state.customRules.length} rule aktif — otomatis diterapkan ke tabel di bawah (AND, semua harus terpenuhi).</span>` : ""}
      </div>
      <div style="display:flex;align-items:center;gap:10px;margin-top:14px;flex-wrap:wrap;padding-top:12px;border-top:1px solid var(--border);">
        <label style="font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;">Preset Tersimpan</label>
        <select id="presetSelect" style="background:rgba(0,0,0,0.2);border:1px solid var(--border);color:var(--text);font-size:12.5px;border-radius:7px;padding:8px 9px;min-width:220px;flex:1;max-width:320px;">
          <option value="">${state.customPresets.length ? '— pilih preset —' : 'Belum ada preset tersimpan'}</option>
          ${presetOptions}
        </select>
        <button type="button" class="btn btn-outline" id="loadPresetBtn" ${!state.selectedPresetId || state.presetsLoading ? 'disabled' : ''} title="Muat rule dari preset ini (menimpa rule kustom yang aktif)">📥 Muat</button>
        <button type="button" class="btn btn-outline" id="deletePresetBtn" ${!state.selectedPresetId || state.presetsLoading ? 'disabled' : ''} title="Hapus preset ini" style="color:#f87171;border-color:rgba(239,68,68,0.3);">🗑️ Hapus</button>
      </div>
    </div>
  `;
}

// Kolom yang tampil DEFAULT — cukup untuk overview cepat tanpa scroll
// horizontal panjang. Sisanya disembunyikan sampai dipilih lewat panel
// "🧩 Kolom", supaya tabel nyaman dilihat begitu halaman dibuka.
const DEFAULT_VISIBLE_COLS = [
  "sektor", "cClose", "changePct", "cVol", "frequency",
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

  const rows = pagedData.map(s=>{
    const bodyCells = visibleColumns.map(c => c.cell(s)).join("");
    return `
    <tr>
      <td class="col-freeze" style="width:${FREEZE_W.chk}px;left:${FREEZE_LEFT.chk}px;"><input type="checkbox" class="custom-checkbox chk-row" data-check="${s.ticker}" ${state.selectedForBacktest.has(s.ticker)?'checked':''}></td>
      <td class="col-freeze" style="width:${FREEZE_W.star}px;left:${FREEZE_LEFT.star}px;"><button class="star-btn" data-fav="${s.ticker}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="${state.watchlist.has(s.ticker)?'var(--gold)':'none'}" stroke="${state.watchlist.has(s.ticker)?'var(--gold)':'var(--muted)'}" stroke-width="2.5" style="filter: ${state.watchlist.has(s.ticker)?'drop-shadow(0 0 3px rgba(245,158,11,0.5))':'none'};"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      </button></td>
      <td class="ticker-cell col-freeze col-freeze-shadow" style="width:${FREEZE_W.ticker}px;left:${FREEZE_LEFT.ticker}px;"><button class="ticker-link" data-detail="${s.ticker}" title="Lihat detail ${s.ticker}">${s.ticker}</button>${s.uangGedeMasuk==="Ya" ? ' <span title="Indikasi uang gede masuk">💰</span>' : ''}</td>
      ${bodyCells}
      <td>
        <div style="display:flex; gap: 8px;">
          <button class="link-btn" data-chart="${s.ticker}">Chart</button>
          <a class="link-btn link-btn-tv" href="${tvChartPageUrl(s.ticker)}" target="_blank" rel="noopener" title="Buka ${s.ticker} di TradingView">TV</a>
          <a class="link-btn link-btn-sb" href="${stockbitUrl(s.ticker)}" target="_blank" rel="noopener" title="Buka ${s.ticker} di Stockbit">SB</a>
        </div>
      </td>
    </tr>`;
  }).join("");

  return `
    ${summaryCards}
    ${renderRuleBuilder()}
    <div class="panel">
      <div class="filter-toolbar">
        <div class="field" style="flex:0 0 auto;">
          <label>Screener DSI (Preset Siap Pakai)</label>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <button class="pill ${state.activePreset === 'eri' ? 'pill-gold' : 'pill-muted'}" onclick="state.activePreset = state.activePreset === 'eri' ? null : 'eri'; state.page=1; render();">Eri Ginanjar</button>
            <button class="pill ${state.activePreset === 'rsicross' ? 'pill-gold' : 'pill-muted'}" onclick="state.activePreset = state.activePreset === 'rsicross' ? null : 'rsicross'; state.page=1; render();">RSI & Harga Cross</button>
            <button class="pill ${state.activePreset === 'golden' ? 'pill-gold' : 'pill-muted'}" onclick="state.activePreset = state.activePreset === 'golden' ? null : 'golden'; state.page=1; render();">Golden Cross DSI</button>
            <button class="pill ${state.activePreset === 'uptrend' ? 'pill-gold' : 'pill-muted'}" onclick="state.activePreset = state.activePreset === 'uptrend' ? null : 'uptrend'; state.page=1; render();">Super Uptrend</button>
            <button class="pill ${state.activePreset === 'breakout' ? 'pill-up' : 'pill-muted'}" onclick="state.activePreset = state.activePreset === 'breakout' ? null : 'breakout'; state.page=1; render();">🚀 Volatility Breakout</button>
            <button class="pill ${state.activePreset === 'pullback' ? 'pill-teal' : 'pill-muted'}" onclick="state.activePreset = state.activePreset === 'pullback' ? null : 'pullback'; state.page=1; render();">🧲 Pullback Uptrend</button>
          <button class="pill ${state.activePreset === 'custom_bandar' ? 'pill-up' : 'pill-muted'}" onclick="state.activePreset = state.activePreset === 'custom_bandar' ? null : 'custom_bandar'; state.page=1; render();" title="Proxy dari lonjakan volume — bukan data asing resmi">🔥 BPJS (proxy volume)</button>
          <button class="pill ${state.activePreset === 'asing_akumulasi' ? 'pill-up' : 'pill-muted'}" onclick="state.activePreset = state.activePreset === 'asing_akumulasi' ? null : 'asing_akumulasi'; state.page=1; render();" title="Net beli asing 20 hari &ge; 50M, konsisten &ge;12/20 hari, likuid &ge;5M/hari — dari data resmi IDX">🐋 Akumulasi Asing (IDX)</button>
          <button class="pill ${state.activePreset === 'freq_spike' ? 'pill-teal' : 'pill-muted'}" onclick="state.activePreset = state.activePreset === 'freq_spike' ? null : 'freq_spike'; state.page=1; render();" title="Rasio Frekuensi &ge; 1.5x rata-rata — butuh kolom frequency/freq_ma20 di DB, kalau belum ada preset ini tidak akan menampilkan hasil">🔊 Lonjakan Frekuensi</button>
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
      </div>

      <div class="filter-section">
        <div class="filter-section-title">Klasifikasi Emiten<span class="line"></span></div>
        <div class="filter-grid">
          ${renderMultiSelect("sektor", "Sektor", getOpts("sektor"))}
          ${renderMultiSelect("syariahLabel", "Syariah", getOpts("syariahLabel"))}
        </div>
      </div>

      <div class="filter-section">
        <div class="filter-section-title">Trend & Sinyal Teknikal<span class="line"></span></div>
        <div class="filter-grid">
          ${renderMultiSelect("trendHarga", "Trend Harga (MA)", getOpts("trendHarga"))}
          ${renderMultiSelect("cekMacd", "Sinyal MACD", getOpts("cekMacd"))}
          ${renderMultiSelect("cekHarga", "Sinyal Harga (EMA)", getOpts("cekHarga"))}
          ${renderMultiSelect("cekRsi", "Sinyal RSI", getOpts("cekRsi"))}
          ${renderMultiSelect("statusRsi", "Status RSI", getOpts("statusRsi"))}
          ${renderMultiSelect("polaCandle", "Pola Candle", getOpts("polaCandle"))}
        </div>
      </div>

      <div class="filter-section">
        <div class="filter-section-title">Momentum, Volume & Keyakinan<span class="line"></span></div>
        <div class="filter-grid">
          ${renderMultiSelect("sinyalVolume", "Sinyal Volume", getOpts("sinyalVolume"))}
          ${renderMultiSelect("sinyalFrekuensi", "Sinyal Frekuensi", getOpts("sinyalFrekuensi"))}
          ${renderMultiSelect("keyakinanNaik", "Keyakinan Naik", getOpts("keyakinanNaik"))}
          ${renderMultiSelect("band", "Bandarmologi", getOpts("band"))}
          ${renderMultiSelect("uangGedeMasuk", "Uang Gede Masuk", getOpts("uangGedeMasuk"))}
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
          </div>
        </div>
      </div>

      ${renderActiveFilterChips()}

      <div class="toolbar-footer">
        <span class="count-badge" style="margin:0;">${filtered.length} emiten sesuai filter &middot; ${state.selectedForBacktest.size} dipilih</span>
        <div style="display:flex; gap:12px;">
          ${hasActiveFilters() ? `<button class="btn btn-outline" id="resetFiltersBtn" style="color:#f87171;border-color:rgba(239,68,68,0.3);">Reset Filter</button>` : ""}
          <button class="btn btn-gold-outline" id="saveBacktestBtn">Simpan Pilihan ke Backtest</button>
        </div>
      </div>
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
  `;
}

function renderBacktest(){
  const tickerOptions = [...new Set(state.stocks.map(s=>s.ticker))].map(t=>`<option value="${t}">`).join("");
  const sessionOptions = `<option value="">+ Buat sesi baru</option>` +
    state.backtests.map(b=>`<option value="${b.id}">${b.date} (${b.items.length} emiten)</option>`).join("");

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
        <div class="field"><label>Harga Entry</label><input id="btManualPrice" type="number" placeholder="0"></div>
        <div class="field wide"><label>Keterangan</label><input id="btManualNote" placeholder="Catatan"></div>
        <div class="field"><button class="btn btn-outline" style="border-color:var(--goldDim);color:var(--gold);justify-content:center; padding:10px;" id="btManualAddBtn">+ Tambah</button></div>
      </div>
    </div>`;

  if(state.backtests.length === 0){
    return manualForm + `<div class="empty-box">Belum ada sesi backtest yang disimpan.</div>`;
  }

  const sessions = state.backtests.map(session => {
    let winCount = 0, totalPL = 0, maxPL = -Infinity, minPL = Infinity, validItems = 0;

    const rows = session.items.map(item => {
      const liveData = state.stocks.find(s => s.ticker === item.ticker);
      const currentPrice = liveData ? liveData.cClose : item.entryPrice;
      const pl = item.entryPrice ? ((currentPrice - item.entryPrice) / item.entryPrice) * 100 : 0;
      
      if (item.entryPrice) {
        if (pl > 0) winCount++;
        totalPL += pl;
        if (pl > maxPL) maxPL = pl;
        if (pl < minPL) minPL = pl;
        validItems++;
      }

      const tone = pl > 0 ? "up" : pl < 0 ? "down" : "muted";
      const plStr = (pl > 0 ? "+" : "") + pl.toFixed(2) + "%";
      const filterStr = item.filterStr || "-";
      const sumberPill = pillHtml(item.sumber || "Screener", item.sumber === "Manual" ? "gold" : "muted");

      return `<tr>
        <td class="ticker-cell"><button class="ticker-link" data-detail="${item.ticker}" title="Lihat detail ${item.ticker}">${item.ticker}</button></td>
        <td>${sumberPill}</td>
        <td style="white-space:normal; max-width:320px; font-family:'Sora',sans-serif; font-size:12px; line-height:1.6; color:var(--text); opacity:0.9;">${filterStr}</td>
        <td class="mono">${fmtNum(item.entryPrice)}</td>
        <td class="mono">${fmtNum(currentPrice)}</td>
        <td class="mono" style="color:var(--${tone}); font-weight:700; font-size:14px;">${plStr}</td>
        <td><button class="link-btn" data-chart="${item.ticker}">Chart</button></td>
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
        </div>
        <div style="background:rgba(0,0,0,0.2); border:1px solid var(--border); border-radius:8px; padding:12px; border-top: 3px solid var(--${avgTone});">
          <div style="font-size:10.5px; color:var(--muted); text-transform:uppercase; font-weight:600; margin-bottom:4px;">Rata-rata P/L</div>
          <div style="font-size:18px; font-weight:700; font-family:'JetBrains Mono',monospace; color:var(--${avgTone});">${avgPL > 0 ? '+' : ''}${avgPL}%</div>
        </div>
        <div style="background:rgba(0,0,0,0.2); border:1px solid var(--border); border-radius:8px; padding:12px; border-top: 3px solid var(--up);">
          <div style="font-size:10.5px; color:var(--muted); text-transform:uppercase; font-weight:600; margin-bottom:4px;">P/L Tertinggi</div>
          <div style="font-size:18px; font-weight:700; font-family:'JetBrains Mono',monospace; color:var(--up);">${bestPL > 0 ? '+' : ''}${bestPL}%</div>
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
            <h3 style="margin:0; font-size: 15px; font-weight:700;">Waktu Tangkap: ${session.date}</h3>
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
                <th>Ticker</th><th>Sumber</th><th>Filter / Keterangan</th><th>Harga Entry</th>
                <th>Harga Live</th><th>Profit / Loss</th><th>Aksi</th><th></th>
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

  

function renderWatchlist(){
  const rows = enriched().filter(s=>state.watchlist.has(s.ticker));
  if(rows.length===0) return `<div class="empty-box">Belum ada saham di watchlist. Klik ikon ★ di tab Screener untuk menambahkan.</div>`;
  return `<div class="wl-grid">${rows.map(s=>`
    <div class="wl-card">
      <div class="wl-card-top">
        <button class="ticker-link ticker-cell" data-detail="${s.ticker}" title="Lihat detail ${s.ticker}">${s.ticker}</button>
        <button class="star-btn" data-fav="${s.ticker}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--gold)" stroke="var(--gold)" stroke-width="2" style="filter: drop-shadow(0 0 4px rgba(245,158,11,0.6));"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </button>
      </div>
      <div class="wl-price mono">${fmtNum(s.cClose)}</div>
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
      <button class="btn btn-outline" style="width: 100%; justify-content:center; color: var(--teal); border-color: rgba(6,182,212,0.3);" data-chart="${s.ticker}">Lihat grafik →</button>
    </div>
  `).join("")}</div>`;
}

function renderPortoFormFields(){
  const editing = state.portoEditId ? state.portfolio.find(p => String(p.id) === String(state.portoEditId)) : null;
  const f = editing || {
    ticker:"", tglBeli:"", hargaBeli:"", lotBeli:"", feeBeliPct:0.15,
    support:"", resistance:"", fib618:"", targetTP:"", cutLoss:"",
    tglJual:"", hargaJual:"", lotJual:"", feeJualPct:0.25, catatan:""
  };
  const c = editing ? hitungPorto({
    hargaBeli:+f.hargaBeli||0, lotBeli:+f.lotBeli||0, feeBeliPct:+f.feeBeliPct||0,
    hargaJual:+f.hargaJual||0, lotJual:+f.lotJual||0, feeJualPct:+f.feeJualPct||0,
    tglBeli:f.tglBeli, tglJual:f.tglJual
  }) : { totalBeli:"", netJual:"", jangkaWaktu:"", persenPL:"", nilaiPL:"", status:"Open" };

  const tickerOptions = [...new Set(state.stocks.map(s=>s.ticker))].map(t=>`<option value="${t}">`).join("");

  document.getElementById("portoModalTitle") && (document.getElementById("portoModalTitle").textContent = editing ? "✏️ Edit Transaksi Portofolio" : "➕ Tambah Transaksi Portofolio");

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
      </div>
      <div style="display:flex;gap:12px;margin-top:24px;">
        <button class="btn btn-primary" id="pfSubmitBtn" style="border-radius:8px; padding: 12px; font-size: 14px;">${editing?"Update Transaksi":"Simpan Transaksi"}</button>
        <button class="btn btn-outline" id="pfCancelBtn" style="border-radius:8px; padding: 12px; font-size: 14px;">Batal</button>
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
  const chips = candidates.map(s=>`<button class="chip ${state.selectedTicker===s.ticker?'active':''}" data-chart="${s.ticker}">${s.ticker}</button>`).join("");
  return `
    <div class="field" style="margin-bottom:16px;max-width:300px;">
      <label>Cari &amp; Pilih Ticker</label>
      <div class="search-wrap">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input id="chartSearchInput" value="${state.chartSearch||""}" placeholder="Ketik BBCA..." list="chartTickerList" style="width:240px;">
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
  const chartToolbar = `
    <div class="chart-toolbar" style="margin-top: 24px;">
      <span style="color:var(--muted);font-size:13px; font-weight:500;">Chart live <b class="mono" style="color:var(--text); font-size:15px;">${t}</b> via TradingView (IDX:${t})</span>
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
  const tvBox = `<div class="tv-chart-box"><iframe src="${tvEmbedUrl(t)}" title="TradingView ${t}" allowtransparency="true" scrolling="no"></iframe></div>`;

  const legend = `
    <div style="display:flex;gap:16px;flex-wrap:wrap;font-size:12px;color:var(--muted);margin-bottom:12px; font-weight:500;">
      <span><span style="display:inline-block;width:12px;height:3px;border-radius:2px;background:var(--gold);vertical-align:middle;margin-right:6px;"></span>Harga Close</span>
      <span><span style="display:inline-block;width:12px;height:3px;border-radius:2px;background:var(--down);vertical-align:middle;margin-right:6px;"></span>Support</span>
      <span><span style="display:inline-block;width:12px;height:3px;border-radius:2px;background:var(--up);vertical-align:middle;margin-right:6px;"></span>Resisten</span>
      <span><span style="display:inline-block;width:12px;height:3px;border-radius:2px;background:var(--teal);vertical-align:middle;margin-right:6px;"></span>EMA21 H/L</span>
      <span><span style="display:inline-block;width:12px;height:3px;border-radius:2px;background:#94a3b8;vertical-align:middle;margin-right:6px;border-top:2px dashed #94a3b8;"></span>Fibonacci</span>
    </div>`;

  const chartBoxInner = state.chartLoading
    ? `<div class="empty-box" style="height:100%;display:flex;align-items:center;justify-content:center;">Memuat histori harga...</div>`
    : (!state.chartData.length
        ? `<div class="empty-box" style="height:100%;display:flex;align-items:center;justify-content:center;">Belum ada histori harga untuk ${t} di tabel <code>flows</code> — jalankan <code>sync-flow.mjs</code> dulu.</div>`
        : `<svg id="chartSvg" width="100%" height="100%" viewBox="0 0 800 300" preserveAspectRatio="none"></svg>`);

  return `${picker}
    ${chartToolbar}
    ${tvBox}
    <div class="chart-section-title">Level Teknikal Internal (harga close asli dari tabel flows)</div>
    ${legend}
    <div class="chart-box">${chartBoxInner}</div>`;
}

function drawChartSVG(){
  const svg = document.getElementById("chartSvg");
  if(!svg || !state.chartData.length) return;
  const data = state.chartData;
  const closes = data.map(d=>d.close);
  const lv = state.selectedLevels;

  const levelVals = lv ? [lv.support, lv.resistance, lv.ema21H, lv.ema21L, lv.fib?.f382, lv.fib?.f50, lv.fib?.f618].filter(v=>v!=null) : [];
  const allVals = closes.concat(levelVals);
  const min = Math.min(...allVals), max = Math.max(...allVals);
  const pad = (max-min)*0.08 || 1;
  const yMin = min-pad, yMax = max+pad;
  const W=800, H=300, L=50, R=54, T=10, B=24;
  const xStep = (W-L-R)/(data.length-1 || 1);
  const yScale = v => T + (H-T-B) - ((v-yMin)/(yMax-yMin))*(H-T-B);
  let path = data.map((d,i)=> `${i===0?"M":"L"}${(L+i*xStep).toFixed(1)},${yScale(d.close).toFixed(1)}`).join(" ");

  let gridLines = "";
  for(let i=0;i<=4;i++){
    const y = T + (i/4)*(H-T-B);
    const val = yMax - (i/4)*(yMax-yMin);
    gridLines += `<line x1="${L}" y1="${y}" x2="${W-R}" y2="${y}" stroke="rgba(255,255,255,0.05)" stroke-dasharray="4,4"/>`;
    gridLines += `<text x="4" y="${y+3}" fill="var(--muted)" font-size="10" font-family="JetBrains Mono, monospace">${fmtNum(Math.round(val))}</text>`;
  }

  let levelLines = "";
  const drawLevel = (val, color, label, dashed) => {
    if(val==null || isNaN(val)) return;
    const y = yScale(val);
    levelLines += `<line x1="${L}" y1="${y.toFixed(1)}" x2="${W-R}" y2="${y.toFixed(1)}" stroke="${color}" stroke-width="1.5" ${dashed?'stroke-dasharray="5,4"':''} opacity="0.8"/>`;
    levelLines += `<text x="${W-R+6}" y="${(y+3).toFixed(1)}" fill="${color}" font-size="10" font-family="JetBrains Mono, monospace" font-weight="600">${label}</text>`;
  };
  if(lv){
    drawLevel(lv.support, "var(--down)", fmtNum(Math.round(lv.support)), false);
    drawLevel(lv.resistance, "var(--up)", fmtNum(Math.round(lv.resistance)), false);
    drawLevel(lv.ema21H, "var(--teal)", "E21H", true);
    drawLevel(lv.ema21L, "var(--teal)", "E21L", true);
    if(lv.fib){
      drawLevel(lv.fib.f382, "#94a3b8", "Fib38", true);
      drawLevel(lv.fib.f50, "#94a3b8", "Fib50", true);
      drawLevel(lv.fib.f618, "#94a3b8", "Fib61", true);
    }
  }

  svg.innerHTML = `${gridLines}${levelLines}<path d="${path}" fill="none" stroke="var(--gold)" stroke-width="2.5" style="filter: drop-shadow(0 4px 6px rgba(245,158,11,0.2));"/>`;
}

function renderAbout(){
  const row=(title,tone,desc)=>`<div class="about-row">${pillHtml(title,tone)}<p>${desc}</p></div>`;
  return `
    ${row("Teknikal","teal","Diambil dari Yahoo Finance (data publik, gratis) lewat Google Apps Script Anda sendiri. Indikator: EMA21 High/Low, RSI7 vs RSI21, MACD histogram, Volume MA20 — persis logika di script screener.txt Anda.")}
    ${row("Screener DSI","gold","Terdapat tombol preset yang akan menyaring data secara otomatis berdasarkan kondisi DSI (Eri Ginanjar, RSI Cross, Golden Cross, Super Uptrend, Volatility Breakout, Pullback Uptrend).")}
    ${row("Penyimpanan Koneksi","up","Semua API Key Supabase dan URL Anda sekarang disimpan aman di dalam Local Storage browser perangkat ini. Tidak tertanam di dalam HTML sehingga aman jika di-hosting publik.")}
    ${row("Fundamental","teal","PER, PBV, ROE, dan Dividend Yield dari modul quoteSummary Yahoo Finance.")}
    ${row("Bandarmologi","down","PENTING: ini BUKAN data transaksi broker asli. Yang ditampilkan di sini hanyalah PROXY heuristik: rasio volume hari ini terhadap volume rata-rata 20 hari, dikombinasikan arah harga.")}
    ${row("Watchlist","muted","Disimpan otomatis di penyimpanan browser Anda (localStorage) di perangkat ini. Jika Web App terhubung, tanda bintang juga akan disinkronkan ke Supabase.")}
  `;
}

function attachContentEvents(){
  const advToggleBtn = document.getElementById("advToggleBtn");
  if(advToggleBtn) advToggleBtn.onclick = () => { state.showAdvancedFilters = !state.showAdvancedFilters; render(); };

  const addRuleBtn = document.getElementById("addRuleBtn");
  if(addRuleBtn) addRuleBtn.onclick = addCustomRule;

  document.querySelectorAll("[data-rule-del]").forEach(btn=>{
    btn.onclick = () => deleteCustomRule(btn.dataset.ruleDel);
  });

  const savePresetBtn = document.getElementById("savePresetBtn");
  if(savePresetBtn) savePresetBtn.onclick = saveCurrentAsPreset;

  const presetSelect = document.getElementById("presetSelect");
  if(presetSelect) presetSelect.onchange = (e) => { state.selectedPresetId = e.target.value; render(); };

  const loadPresetBtn = document.getElementById("loadPresetBtn");
  if(loadPresetBtn) loadPresetBtn.onclick = loadSelectedPreset;

  const deletePresetBtn = document.getElementById("deletePresetBtn");
  if(deletePresetBtn) deletePresetBtn.onclick = deleteSelectedPreset;

  document.querySelectorAll("[data-rule-field]").forEach(el=>{
    const id = el.dataset.ruleId;
    const field = el.dataset.ruleField;
    if(field === "toggleBType"){
      el.onclick = () => updateCustomRule(id, field, null);
    } else {
      el.onchange = (e) => updateCustomRule(id, field, e.target.value);
    }
  });

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

  const s = document.getElementById("searchInput");
  if(s) s.oninput = (e)=>{ state.search=e.target.value; state.page=1; render(); document.getElementById("searchInput").focus(); document.getElementById("searchInput").selectionStart = document.getElementById("searchInput").value.length; };

  const chartSearchInput = document.getElementById("chartSearchInput");
  if(chartSearchInput){
    chartSearchInput.oninput = (e) => {
      state.chartSearch = e.target.value;
      render();
      const el = document.getElementById("chartSearchInput");
      if(el){ el.focus(); el.selectionStart = el.selectionEnd = el.value.length; }
    };
    chartSearchInput.addEventListener("keydown", (e) => {
      if(e.key === "Enter"){
        const val = (e.target.value||"").trim().toUpperCase();
        const exists = state.stocks.some(st => st.ticker === val);
        if(exists) loadChart(val);
        else if(val) alert(`Ticker "${val}" tidak ditemukan di data screener.`);
      }
    });
  }

  document.querySelectorAll('.select-item input[type="checkbox"]').forEach(chk => {
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
  
  document.querySelectorAll("[data-detail]").forEach(b=> b.onclick=()=>openDetail(b.dataset.detail));
  document.querySelectorAll("[data-fav]").forEach(b=> b.onclick=()=>toggleFav(b.dataset.fav));
  document.querySelectorAll("[data-chart]").forEach(b=> b.onclick=()=>loadChart(b.dataset.chart));
  document.querySelectorAll("[data-expand]").forEach(b=> b.onclick=()=>{
    const t = b.dataset.expand;
    state.expanded.has(t) ? state.expanded.delete(t) : state.expanded.add(t);
    render();
  });

  document.querySelectorAll("[data-del-bt-item]").forEach(btn=>{
    btn.onclick = ()=>{ const [sid,tk] = btn.dataset.delBtItem.split("|"); deleteBacktestItem(sid,tk); };
  });
  const btManualAddBtn = document.getElementById("btManualAddBtn");
  if(btManualAddBtn) btManualAddBtn.onclick = ()=>{
    addManualBacktest(
      document.getElementById("btManualSession").value,
      document.getElementById("btManualTicker").value,
      document.getElementById("btManualPrice").value,
      document.getElementById("btManualNote").value
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
}

document.addEventListener("click", (e) => {
  if (!e.target.closest('.select-dropdown') && !e.target.closest('.select-btn')) {
    if (state.openDropdown) {
      state.openDropdown = null;
      render();
    }
  }
});

document.getElementById("tabs").addEventListener("click", (e)=>{
  const btn = e.target.closest(".tab-btn");
  if(!btn) return;
  state.tab = btn.dataset.tab;
  render();
});
document.getElementById("refreshBtn").onclick = ()=> loadLive();
document.getElementById("portoModalClose").onclick = ()=> resetPortoForm();
document.getElementById("portoModalOverlay").onclick = (e)=>{ if(e.target.id==="portoModalOverlay") resetPortoForm(); };
document.getElementById("detailModalClose").onclick = ()=> closeDetail();
document.getElementById("detailModalOverlay").onclick = (e)=>{ if(e.target.id==="detailModalOverlay") closeDetail(); };

// -------------------------------------------------------------
// Auto-refresh berkala. Cuma nge-poll ulang loadLive() -- data
// "live"-nya sendiri datang dari job terjadwal di server (mis.
// `node sync-idx-full.mjs --live-price`) yang menulis ke Supabase;
// interval ini cuma bikin browser ikut ambil data terbaru itu tanpa
// user harus klik "Refresh Data" manual.
// Dijeda saat tab tidak aktif (document hidden) supaya tidak boros
// request Supabase saat halaman cuma dibiarkan terbuka di background.
// -------------------------------------------------------------
const AUTO_REFRESH_MS = 60_000; // 60 detik -- sesuaikan sesuai kebutuhan & jatah request Supabase
let autoRefreshTimer = null;

function startAutoRefresh(){
  if (autoRefreshTimer) return;
  autoRefreshTimer = setInterval(() => {
    if (document.hidden) return; // tab di background, skip biar hemat request
    if (state.loading) return;   // masih ada fetch berjalan, jangan tumpuk
    loadLive();
  }, AUTO_REFRESH_MS);
}

function stopAutoRefresh(){
  if (!autoRefreshTimer) return;
  clearInterval(autoRefreshTimer);
  autoRefreshTimer = null;
}

document.addEventListener("visibilitychange", () => {
  // Begitu tab dibuka lagi setelah sempat disembunyikan, langsung
  // refresh sekali supaya data tidak basi menunggu tick interval berikutnya.
  if (!document.hidden) loadLive();
});

startAutoRefresh();

loadSettings();
loadLive();