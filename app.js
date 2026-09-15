/* H4SX Gateway - Main Application Script */
/* Security: Protected Content - Do Not Redistribute */

(function(){
  'use strict';
  
  // ===== SECURITY: DOMAIN WHITELIST CHECK =====
  const ALLOWED_DOMAINS = ['localhost', '127.0.0.1', 'h4sxmy.xyz', 'www.h4sxmy.xyz', 'link.h4sxmy.xyz'];
  const currentDomain = window.location.hostname;
  
  if (!ALLOWED_DOMAINS.includes(currentDomain)) {
    console.warn('H4SX Gateway is running on an unlisted preview domain:', currentDomain);
  }
  
  // ===== SECURITY: ANTI-COPYING PROTECTIONS =====
  // Disable right-click
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  });
  
  // Disable keyboard shortcuts for inspecting
  document.addEventListener('keydown', function(e) {
    // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
      (e.ctrlKey && e.key === 'U')
    ) {
      e.preventDefault();
      return false;
    }
  });
  
  // Disable text selection
  document.addEventListener('selectstart', function(e) {
    if(e.target.closest('input,textarea,[data-order-id]')) return;
    e.preventDefault();
    return false;
  });
  
  // Disable drag-and-drop
  document.addEventListener('dragstart', function(e) {
    if(e.target.closest('[data-order-id]')) return;
    e.preventDefault();
    return false;
  });
  
  // Browser-side anti-debugging cannot protect source code and can freeze
  // lower-end devices, so the previous repeating debugger checks were removed.
  
  // ===== SECURITY: SCRIPT INTEGRITY VALIDATION =====
  const _0x9i0j = document.querySelector('script[src*="app.js"]');
  if (_0x9i0j) {
    const _0xk1l = _0x9i0j.src;
    if (!_0xk1l.includes('secured-1')) {
      console.error('Security Alert: Invalid script version detected');
      document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#1a0a1f;color:#fff;font-family:sans-serif;text-align:center;padding:20px;"><div><h1>🔒 Security Violation</h1><p>Invalid script version. Please refresh the page.</p></div></div>';
    }
  }
  
  // ===== SECURITY: LICENSE/VALIDATION SYSTEM =====
  const _0xm2n = localStorage.getItem('h4sx_license');
  const _0xo3p = 'H4SX-LICENSE-KEY-2024';
  
  if (!_0xm2n) {
    localStorage.setItem('h4sx_license', _0xo3p);
  } else if (_0xm2n !== _0xo3p) {
    console.error('Security Alert: Invalid license detected');
    document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#1a0a1f;color:#fff;font-family:sans-serif;text-align:center;padding:20px;"><div><h1>🔒 License Invalid</h1><p>Please contact the administrator.</p></div></div>';
  }
  
  // ===== SECURITY: ENCRYPTED CONFIG STORAGE =====
  const _0xq4r = function(_0xs5t, _0xu6v) {
    let _0xw7x = '';
    for (let _0xy8z = 0; _0xy8z < _0xs5t.length; _0xy8z++) {
      _0xw7x += String.fromCharCode(_0xs5t.charCodeAt(_0xy8z) ^ _0xu6v.charCodeAt(_0xy8z % _0xu6v.length));
    }
    return btoa(_0xw7x);
  };
  
  const _0xa1b = function(_0xc2d, _0xe3f) {
    const _0xg4h = atob(_0xc2d);
    let _0xi5j = '';
    for (let _0xk6l = 0; _0xk6l < _0xg4h.length; _0xk6l++) {
      _0xi5j += String.fromCharCode(_0xg4h.charCodeAt(_0xk6l) ^ _0xe3f.charCodeAt(_0xk6l % _0xe3f.length));
    }
    return _0xi5j;
  };
  
  const _0xm7n = 'H4SX-ENCRYPTION-KEY-2024';
  const _0xo8p = localStorage.getItem('h4sx_config');
  
  if (!_0xo8p) {
    const _0xq9r = JSON.stringify({ timestamp: Date.now(), version: '1.0' });
    localStorage.setItem('h4sx_config', _0xq4r(_0xq9r, _0xm7n));
  } else {
    try {
      const _0xr0s = _0xa1b(_0xo8p, _0xm7n);
      const _0xt1u = JSON.parse(_0xr0s);
      if (_0xt1u.version !== '1.0') {
        console.error('Security Alert: Invalid config version');
      }
    } catch (e) {
      console.error('Security Alert: Config decryption failed');
      localStorage.removeItem('h4sx_config');
    }
  }
  
  // Firebase Config (Encoded for basic obfuscation)
  const _0x4f2a = ['AIzaSyCvTJPb1ExWlRPNvO34ofcVOA4NRdFV0lc', 'mxioa-a487b.firebaseapp.com', 'https://mxioa-a487b-default-rtdb.asia-southeast1.firebasedatabase.app', 'mxioa-a487b', 'mxioa-a487b.firebasestorage.app', '454316244317', '1:454316244317:web:c636db8eba76662243fcb4', 'G-ERGGR2JT02'];
  const firebaseConfig = {
    apiKey: _0x4f2a[0],
    authDomain: _0x4f2a[1],
    databaseURL: _0x4f2a[2],
    projectId: _0x4f2a[3],
    storageBucket: _0x4f2a[4],
    messagingSenderId: _0x4f2a[5],
    appId: _0x4f2a[6],
    measurementId: _0x4f2a[7]
  };
  
  // DEFAULT DATA
  const DEFAULT_DATA = {
    profile: {
      name: 'H4SX Gateway',
      handle: '@h4sx.official',
      bio: 'Free Fire Sensitivity Generator | Pro Player Presets | Official website | Support whatsapp',
      avatar: 'https://i.imgur.com/cLPulXQ.png',
      location: 'Kedah, Malaysia'
    },
    settings: {
      accentColor: '#ff6fb5',
      gradientA: '#ff6fb5',
      gradientB: '#ba55d3',
      theme: 'dark',
      socials: {
        whatsapp: '#',
        instagram: '#',
        tiktok: '#',
        youtube: '#'
      }
    },
    links: [
      { id: '1', title: 'Website Rasmi', url: 'https://www.h4sxmy.xyz/', desc: 'H4SX Store Official Website', category: 'Utama', icon: '', iconUrl: 'https://i.imgur.com/cLPulXQ.png', clicks: 0 },
      { id: '2', title: 'Generate Sensi', url: 'https://h4sxsensiff.vercel.app', desc: 'Nak aim gacor ikut device klik sini', category: 'Utama', icon: '', iconUrl: 'https://i.postimg.cc/wMC3PLWg/image.png', clicks: 0 },
      { id: '3', title: 'Customer Support', url: 'https://wa.me/60193263016', desc: 'Bantuan & pertanyaan terus ke WhatsApp', category: 'Sokongan', icon: '', iconUrl: '', clicks: 0 }
    ],
    music: []
  };
  
  // STATE
  const DATA_CACHE_KEY = 'h4sx_data_cache';
  function loadCachedData(){
    try{
      const raw = localStorage.getItem(DATA_CACHE_KEY);
      if(!raw) return null;
      const parsed = JSON.parse(raw);
      // Minimal shape check so a corrupt/old cache never breaks first paint
      if(parsed && parsed.profile && Array.isArray(parsed.links)){
        parsed.settings = parsed.settings || DEFAULT_DATA.settings;
        parsed.music = Array.isArray(parsed.music) ? parsed.music : [];
        return parsed;
      }
    }catch(e){}
    return null;
  }
  function cacheData(data){
    try{ localStorage.setItem(DATA_CACHE_KEY, JSON.stringify(data)); }catch(e){}
  }
  // 🆕 Fast render: if we have a cached copy of the last real data (from
  // a previous visit), use it as the STARTING state instead of the
  // generic DEFAULT_DATA — so the very first paint already shows the
  // real logo/links, not a placeholder that then flashes to the real one.
  // A fresh Firebase snapshot always arrives shortly after and silently
  // replaces this (see loadDataFromFirebase), so this is purely cosmetic.
  const _cachedStartData = loadCachedData();
  let appData = _cachedStartData || JSON.parse(JSON.stringify(DEFAULT_DATA));
  let _usingCachedData = !!_cachedStartData;
  let currentCategory = 'all';
  let searchQuery = '';
  let firebaseApp = null;
  let firebaseDb = null;
  let firebaseAuth = null;
  let currentUser = null;
  let isFirebaseReady = false;
  let currentMusicIndex = -1;
  let isPlaying = false;
  let audioElement = null;
  let authReadyResolve;
  const authReady = new Promise(res => { authReadyResolve = res; });
  
  // Toast
  function showToast(msg, type='success'){
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.className = 'toast ' + (type !== 'success' ? type : '');
    toast.classList.add('show');
    setTimeout(()=>toast.classList.remove('show'), 3000);
  }
  
  // Init Firebase
  function hideLoading(){
    const ov = document.getElementById('loadingOverlay');
    if(ov) ov.style.display = 'none';
  }
  function showSyncIndicator(){
    const bar = document.getElementById('syncBar');
    if(bar){ bar.classList.remove('done'); bar.classList.add('active'); }
  }
  function hideSyncIndicator(){
    const bar = document.getElementById('syncBar');
    if(!bar) return;
    bar.classList.remove('active');
    bar.classList.add('done');
    setTimeout(()=>{ bar.classList.remove('done'); bar.style.width=''; bar.style.transition=''; }, 650);
  }
  
  function initFirebase(){
    renderAll();
    setupBackgroundEffects();
    hideLoading();
    // 🆕 Fast render: we're showing cached data from last visit right now —
    // flash a thin top bar so it's clear fresh data is still being confirmed
    // in the background (fades out the moment real data arrives).
    if(_usingCachedData) showSyncIndicator();
    // 🆕 Gamification: first-visit / night-owl / returning-visitor checks,
    // plus the live countdown ticker for any link with a countdown set.
    window.checkAchievements('visit');
    setInterval(tickCountdowns, 1000);
    if(!firebaseConfig.apiKey || firebaseConfig.apiKey === 'YOUR_API_KEY'){
      console.warn('Firebase belum disetup. Guna data laluan sahaja.');
      const notice = document.getElementById('firebaseNotice');
      if(notice) notice.style.display = 'block';
      hideSyncIndicator();
      authReadyResolve(null);
      return false;
    }
    try{
      firebaseApp = firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);
      firebaseDb = firebase.database();
      firebaseAuth = firebase.auth();
      isFirebaseReady = true;
      let authResolved = false;
      firebaseAuth.onAuthStateChanged((user)=>{
        currentUser = user;
        updateLoginUI();
        if(!authResolved){ authResolved = true; authReadyResolve(user); }
      });
      loadDataFromFirebase();
      return true;
    }catch(e){
      console.error('Firebase init error:', e);
      showToast('Gagal sambung ke Firebase: ' + (e.message || e), 'error');
      hideSyncIndicator();
      authReadyResolve(null);
      return false;
    }
  }
  
  function loadDataFromFirebase(){
    const ref = firebaseDb.ref('gateway_data');
    ref.on('value', (snapshot)=>{
      const data = snapshot.val();
      if(data){
        appData = {
          profile:  data.profile  || DEFAULT_DATA.profile,
          settings: data.settings || DEFAULT_DATA.settings,
          links: Array.isArray(data.links)
            ? data.links.map((val, idx)=>({ id: val.id || ('link_' + idx), ...val }))
            : (data.links ? Object.entries(data.links).map(([id, val])=>({ id: val.id || id, ...val })) : []),
          music: Array.isArray(data.music)
            ? data.music.map((val, idx)=>({ id: val.id || ('music_' + idx), ...val }))
            : (data.music ? Object.entries(data.music).map(([id, val])=>({ id: val.id || id, ...val })) : [])
        };
        // 🆕 Fresh data confirmed — cache it for next visit's instant paint,
        // and fade out the "syncing" bar if it was showing.
        cacheData(appData);
        _usingCachedData = false;
        hideSyncIndicator();
        renderAll();
        // Removed auto-play to comply with browser autoplay policy
        // User must click play button first
      }else{
        const rtdbData = {
          profile:  DEFAULT_DATA.profile,
          settings: DEFAULT_DATA.settings,
          links:    Object.fromEntries(DEFAULT_DATA.links.map(l=>{ const {id,...rest}=l; return [id||Date.now().toString(), rest]; })),
          music:    {}
        };
        ref.set(rtdbData).catch(e=>console.error('Write default error:', e));
        hideSyncIndicator();
      }
    }, (error)=>{
      console.error('Firebase read error:', error);
      hideSyncIndicator();
      const errMsg = error.code === 'PERMISSION_DENIED'
        ? 'Akses ditolak — semak Firebase Realtime Database Rules'
        : 'Gagal baca data: ' + (error.message || error.code || error);
      showToast(errMsg, 'error');
    });
  }
  
  function saveToFirebase(path, data){
    if(!isFirebaseReady){
      showToast('Firebase belum bersedia.', 'warning');
      return Promise.reject('Firebase not ready');
    }
    return authReady.then(()=>{
      if(!currentUser){
        showToast('Sila login admin terlebih dahulu!', 'warning');
        return Promise.reject('Not logged in');
      }
      return firebaseDb.ref('gateway_data/' + path).set(data)
        .then(()=>{ showToast('Berjaya disimpan!'); })
        .catch(e=>{
          console.error('[Save Error]', e.code, e.message);
          const msg = e.code === 'PERMISSION_DENIED'
            ? 'Akses ditolak — semak Firebase Rules (write: auth != null)'
            : 'Gagal simpan: ' + (e.message || e.code);
          showToast(msg, 'error');
          throw e;
        });
    });
  }
  
  // RENDER FUNCTIONS
  function normalizeHex(v){
    if(!v) return null;
    v = v.trim();
    if(v[0] !== '#') v = '#' + v;
    return /^#[0-9A-Fa-f]{6}$/.test(v) ? v.toUpperCase() : null;
  }
  function hexToRgbStr(hex){
    const h = normalizeHex(hex) || '#ff6fb5';
    const r = parseInt(h.slice(1,3),16), g = parseInt(h.slice(3,5),16), b = parseInt(h.slice(5,7),16);
    return r + ',' + g + ',' + b;
  }
  function hexToHue(hex){
    const h = normalizeHex(hex) || '#ff6fb5';
    let r = parseInt(h.slice(1,3),16)/255, g = parseInt(h.slice(3,5),16)/255, b = parseInt(h.slice(5,7),16)/255;
    const max = Math.max(r,g,b), min = Math.min(r,g,b);
    let hue = 0;
    if(max !== min){
      const d = max - min;
      if(max === r) hue = ((g-b)/d + (g<b?6:0));
      else if(max === g) hue = (b-r)/d + 2;
      else hue = (r-g)/d + 4;
      hue *= 60;
    }
    return hue;
  }
  function updateThemePreview(a, b){
    const bar = document.getElementById('themePreviewBar');
    if(bar){ bar.style.setProperty('--tp-a', a); bar.style.setProperty('--tp-b', b); }
  }
  function populateThemePicker(){
    const gradA = appData.settings.gradientA || '#ff6fb5';
    const gradB = appData.settings.gradientB || '#ba55d3';
    const accentC = appData.settings.accentColor || '#ff6fb5';
    document.getElementById('pickGradA').value = gradA;
    document.getElementById('hexGradA').value = gradA.toUpperCase();
    document.getElementById('pickGradB').value = gradB;
    document.getElementById('hexGradB').value = gradB.toUpperCase();
    document.getElementById('pickAccent').value = accentC;
    document.getElementById('hexAccent').value = accentC.toUpperCase();
    updateThemePreview(gradA, gradB);
    document.querySelectorAll('.theme-preset-btn').forEach(btn=>{
      btn.classList.toggle('active', btn.dataset.a.toLowerCase()===gradA.toLowerCase() && btn.dataset.b.toLowerCase()===gradB.toLowerCase());
    });
  }
  function applyTheme(){
    document.body.setAttribute('data-theme', appData.settings.theme);
    document.documentElement.style.setProperty('--accent', appData.settings.accentColor);
    const hex = appData.settings.accentColor;
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    document.documentElement.style.setProperty('--accent-soft', `rgba(${r},${g},${b},0.2)`);
    // Custom background gradient — this is what actually paints the
    // page background, so it's what makes the theme feel fully custom
    // instead of only the accent color changing.
    const gradA = appData.settings.gradientA || appData.settings.accentColor || '#ff6fb5';
    const gradB = appData.settings.gradientB || '#ba55d3';
    document.documentElement.style.setProperty('--grad-a-rgb', hexToRgbStr(gradA));
    document.documentElement.style.setProperty('--grad-b-rgb', hexToRgbStr(gradB));
  }
  
  function renderProfile(){
    const nameEl = document.getElementById('profileName');
    const badgeEl = nameEl.querySelector('.verified-badge');
    nameEl.childNodes[0].nodeType === 3
      ? (nameEl.childNodes[0].textContent = (appData.profile.name || 'H4SX Gateway') + ' ')
      : nameEl.insertBefore(document.createTextNode((appData.profile.name || 'H4SX Gateway') + ' '), badgeEl);
    document.getElementById('profileHandle').textContent = appData.profile.handle || '@h4sx';
    const avatarImg = document.getElementById('avatarImg');
    const logoBannerImg = document.getElementById('logoBannerImg');
    // Prioritize Firebase avatar, fallback to default if not set
    const avatarUrl = appData.profile.avatar || 'https://i.postimg.cc/FR4p6BYD/Gambar-Bocil-Anime-(6).png';
    avatarImg.src = avatarUrl;
    logoBannerImg.src = avatarUrl;
    document.title = (appData.profile.name || 'H4SX Gateway') + ' | Official Links';
    // Location — fallback-safe: kalau Firebase belum load / field kosong, guna default
    const locEl = document.getElementById('profileLocation');
    const locTextEl = document.getElementById('profileLocationText');
    if(locEl && locTextEl){
      const loc = (appData.profile.location && String(appData.profile.location).trim()) || 'Kedah, Malaysia';
      locTextEl.textContent = loc;
      locEl.style.display = 'inline-flex';
    }
    // Typing effect for bio
    if(window._typingInterval){ clearInterval(window._typingInterval); window._typingInterval = null; }
    if(window._typingTimeout)  { clearTimeout(window._typingTimeout);  window._typingTimeout  = null; }
    const bioEl  = document.getElementById('profileBio');
    const bioText = appData.profile.bio || '';
    window._typingTimeout = setTimeout(()=>{
      let i = 0;
      bioEl.innerHTML = '<span class="typing-cursor"></span>';
      window._typingInterval = setInterval(()=>{
        if(i < bioText.length){
          bioEl.innerHTML = escapeHtml(bioText.substring(0, ++i)) + '<span class="typing-cursor"></span>';
        }else{
          clearInterval(window._typingInterval);
          window._typingInterval = null;
          bioEl.textContent = bioText;
        }
      }, 40);
    }, 300);
  }
  
  function renderStats(){
    document.getElementById('totalLinks').textContent = appData.links.length;
    const totalClicks = appData.links.reduce((sum,l)=>sum+(l.clicks||0),0);
    document.getElementById('totalClicks').textContent = totalClicks;
    const cats = [...new Set(appData.links.map(l=>l.category).filter(Boolean))];
    document.getElementById('totalCats').textContent = cats.length;
  }
  
  function renderCategoryTabs(){
    const container = document.getElementById('categoryTabs');
    const cats = [...new Set(appData.links.map(l=>l.category).filter(Boolean))];
    let html = '<button class="tab-btn '+(currentCategory==='all'?'active':'')+'" data-category="all">Semua</button>';
    cats.forEach(cat=>{
      html += '<button class="tab-btn '+(currentCategory===cat?'active':'')+'" data-category="'+cat+'">'+cat+'</button>';
    });
    container.innerHTML = html;
    
    container.querySelectorAll('.tab-btn').forEach(btn=>{
      btn.addEventListener('click',()=>{
        currentCategory = btn.dataset.category;
        renderCategoryTabs();
        renderLinks();
      });
    });
    
    const datalist = document.getElementById('categoryList');
    datalist.innerHTML = cats.map(c=>'<option value="'+c+'">').join('');
  }
  
  let _linksRenderedOnce = false;
  function isLinkScheduleActive(link){
    const now = Date.now();
    if(link.scheduleStart){
      const start = new Date(link.scheduleStart).getTime();
      if(!isNaN(start) && now < start) return false;
    }
    if(link.scheduleEnd){
      const end = new Date(link.scheduleEnd).getTime();
      if(!isNaN(end) && now > end) return false;
    }
    return true;
  }

  function formatCountdown(ms){
    if(ms <= 0) return null;
    const s = Math.floor(ms/1000);
    const days = Math.floor(s/86400);
    const hrs = Math.floor((s%86400)/3600);
    const mins = Math.floor((s%3600)/60);
    const secs = s%60;
    if(days > 0) return days + 'h ' + hrs + 'j';
    if(hrs > 0) return hrs + 'j ' + mins + 'm ' + secs + 's';
    return mins + 'm ' + secs + 's';
  }

  function tickCountdowns(){
    document.querySelectorAll('.countdown-badge[data-end]').forEach(el=>{
      const end = parseInt(el.dataset.end, 10);
      const remain = end - Date.now();
      if(remain <= 0){
        el.textContent = '⏰ Tamat!';
        el.classList.remove('ending-soon');
        delete el.dataset.end;
        return;
      }
      el.classList.toggle('ending-soon', remain < 3600000);
      el.textContent = '⏳ ' + formatCountdown(remain);
    });
  }

  // ──────────────────────────────────────────
  // 🆕 LINK REDIRECT TRANSITION
  // Instead of jumping straight out to the destination, show a short,
  // cancellable "Membuka X..." screen — feels intentional/premium and
  // gives misclicks an escape hatch. Click tracking + achievement credit
  // only fire once the redirect actually completes (not on cancel).
  // ──────────────────────────────────────────
  const REDIRECT_DURATION = 1300; // ms
  let _redirectTimer = null;
  let _redirectTarget = null;

  function openRedirectOverlay(link){
    _redirectTarget = link;
    const overlay = document.getElementById('redirectOverlay');
    const iconEl = document.getElementById('redirectIcon');
    const titleEl = document.getElementById('redirectTitle');
    const ring = document.getElementById('redirectRingFg');
    if(!overlay || !iconEl || !titleEl || !ring) return;

    iconEl.innerHTML = link.iconUrl
      ? '<img src="'+link.iconUrl+'" alt="" onerror="this.parentElement.textContent=\''+(link.icon||'🔗')+'\'">'
      : (link.icon || '🔗');
    titleEl.textContent = 'Membuka ' + link.title + '...';

    overlay.classList.add('active');

    ring.style.transition = 'none';
    ring.style.strokeDashoffset = '283';
    void ring.offsetWidth; // force reflow so the transition below actually animates
    ring.style.transition = 'stroke-dashoffset ' + REDIRECT_DURATION + 'ms linear';
    ring.style.strokeDashoffset = '0';

    clearTimeout(_redirectTimer);
    _redirectTimer = setTimeout(completeRedirect, REDIRECT_DURATION);
  }

  function completeRedirect(){
    const link = _redirectTarget;
    closeRedirectOverlay();
    if(!link) return;
    if(isFirebaseReady){
      firebaseDb.ref('gateway_data/links/' + link.id + '/clicks').transaction((c)=>(c||0)+1).catch(()=>{});
      pushActivity('click', link.title);
    }
    trackLinkClickAchievement(link.id);
    window.open(link.url, '_blank');
  }

  function closeRedirectOverlay(){
    clearTimeout(_redirectTimer);
    _redirectTimer = null;
    _redirectTarget = null;
    const overlay = document.getElementById('redirectOverlay');
    if(overlay) overlay.classList.remove('active');
  }

  function buildLinkCardHtml(link, delay, isPinned){
    const iconHtml = link.iconUrl 
      ? '<img src="'+link.iconUrl+'" alt="" onerror="this.parentElement.innerHTML=\''+(link.icon||'')+'\'">'
      : (link.icon || '');
    const maintOverlay = link.maintenance ? `
        <div class="maintenance-badge">🚧 Maintenance</div>
        <div class="maintenance-overlay">
          <div class="maintenance-tape t1"><span>⚠ MAINTENANCE ⚠ MAINTENANCE ⚠ MAINTENANCE ⚠ MAINTENANCE ⚠</span></div>
          <div class="maintenance-tape t2"><span>⚠ MAINTENANCE ⚠ MAINTENANCE ⚠ MAINTENANCE ⚠ MAINTENANCE ⚠</span></div>
        </div>` : '';

    let countdownHtml = '';
    if(link.countdown){
      const end = new Date(link.countdown).getTime();
      const remain = end - Date.now();
      if(!isNaN(end) && remain > 0){
        countdownHtml = '<div class="countdown-badge'+(remain<3600000?' ending-soon':'')+'" data-end="'+end+'">⏳ '+formatCountdown(remain)+'</div>';
      }
    }

    return `
      <a class="link-btn${link.maintenance ? ' maintenance' : ''}${isPinned ? ' pinned' : ''}" href="${link.url}" target="_blank" data-id="${link.id}" data-maintenance="${!!link.maintenance}" style="animation-delay:${delay}s">
        <div class="link-icon">${iconHtml}</div>
        <div class="link-text">
          <div class="link-title">${escapeHtml(link.title)}</div>
          ${link.desc ? '<div class="link-desc">'+escapeHtml(link.desc)+'</div>' : ''}
          ${countdownHtml}
        </div>
        <div class="link-meta">
          ${link.clicks ? '<span class="click-count">'+link.clicks+'</span>' : ''}
          <svg class="link-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </div>
        ${maintOverlay}
      </a>
    `;
  }

  function renderLinks(){
    const container = document.getElementById('linksContainer');
    let filtered = orderedLinks().filter(isLinkScheduleActive);
    
    if(currentCategory !== 'all'){
      filtered = filtered.filter(l=>l.category === currentCategory);
    }
    
    if(searchQuery.trim()){
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(l=>
        l.title.toLowerCase().includes(q) ||
        (l.desc||'').toLowerCase().includes(q) ||
        l.url.toLowerCase().includes(q)
      );
    }
    
    if(filtered.length === 0){
      container.innerHTML = '<div class="no-results"><div style="font-size:40px;margin-bottom:8px">Tiada pautan dijumpai</div></div>';
      return;
    }

    // Featured/pinned links get their own spotlight section — only on the
    // "Semua" tab with no active search, so they don't duplicate or vanish
    // confusingly while filtering.
    const showPinnedSection = currentCategory === 'all' && !searchQuery.trim();
    const pinned = showPinnedSection ? filtered.filter(l=>l.pinned) : [];
    const rest = showPinnedSection ? filtered.filter(l=>!l.pinned) : filtered;

    let html = '';
    if(pinned.length){
      html += '<div class="featured-link-wrap">';
      pinned.forEach((link, i)=>{ html += buildLinkCardHtml(link, i*0.08, true); });
      html += '</div>';
    }
    
    const grouped = {};
    rest.forEach(l=>{
      const cat = l.category || 'Lain-lain';
      if(!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(l);
    });
    
    Object.keys(grouped).forEach((cat, idx)=>{
      if(currentCategory === 'all' && Object.keys(grouped).length > 1){
        html += '<div class="category-title" style="animation-delay:'+(idx*0.1)+'s">'+cat+'</div>';
      }
      grouped[cat].forEach((link, i)=>{
        html += buildLinkCardHtml(link, (idx*0.1 + i*0.08)+0.2, false);
      });
    });
    
    container.innerHTML = html;
    // Only play the staggered fade-up entrance on the very first paint —
    // re-running it on every search keystroke/filter click just adds
    // jank for no visual benefit.
    container.classList.toggle('no-entrance', _linksRenderedOnce);
    _linksRenderedOnce = true;
    
    container.querySelectorAll('.link-btn').forEach(btn=>{
      btn.addEventListener('click', function(e){
        e.preventDefault();
        const id = this.dataset.id;
        const link = appData.links.find(l=>l.id===id);
        if(!link) return;
        if(link.maintenance){
          showToast('🚧 "'+link.title+'" sedang dalam penyelenggaraan. Sila cuba sebentar lagi.', 'warning');
          return;
        }
        // Tactile feedback right away, then the cancellable "Membuka X..."
        // transition — actual navigation + click/achievement tracking
        // happens in completeRedirect() only if it isn't cancelled.
        createConfetti(e.clientX, e.clientY);
        const ripple = document.createElement('div');
        ripple.className = 'click-effect';
        this.appendChild(ripple);
        setTimeout(()=>ripple.remove(), 600);
        openRedirectOverlay(link);
      });
    });
  }
  
  function renderSocials(){
    const container = document.getElementById('socialRow');
    const s = appData.settings.socials;
    let html = '';
    
    if(s.whatsapp && s.whatsapp !== '#'){
      html += '<a href="'+s.whatsapp+'" class="social-btn" target="_blank" title="WhatsApp"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg></a>';
    }
    if(s.instagram && s.instagram !== '#'){
      html += '<a href="'+s.instagram+'" class="social-btn" target="_blank" title="Instagram"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>';
    }
    if(s.tiktok && s.tiktok !== '#'){
      html += '<a href="'+s.tiktok+'" class="social-btn" target="_blank" title="TikTok"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a8 8 0 0 1-5-1.5z"></path></svg></a>';
    }
    if(s.youtube && s.youtube !== '#'){
      html += '<a href="'+s.youtube+'" class="social-btn" target="_blank" title="YouTube"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg></a>';
    }
    
    container.innerHTML = html;
    container.querySelectorAll('.social-btn').forEach(btn=>{
      btn.addEventListener('click', ()=>{ if(typeof checkAchievements === 'function') checkAchievements('social'); });
    });
  }
  
  function renderAdminLinkList(){
    const container = document.getElementById('linkListAdmin');
    if(!currentUser){
      container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">Sila login untuk menguruskan pautan</div></div>';
      return;
    }
    if(appData.links.length === 0){
      container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">Belum ada pautan. Tekan butang di atas untuk tambah!</div></div>';
      return;
    }
    let html = '';
    appData.links.forEach(link=>{
      const scheduleBadge = (link.scheduleStart || link.scheduleEnd)
        ? (isLinkScheduleActive(link) ? '<span class="maintenance-chip" style="background:#38bdf8">🗓️ Aktif</span>' : '<span class="maintenance-chip" style="background:#9ca3af">🗓️ Luar jadual</span>')
        : '';
      const pinBadge = link.pinned ? '<span class="maintenance-chip" style="background:#ff6fb5;color:#fff">📌 Pinned</span>' : '';
      const countdownBadge = link.countdown ? '<span class="maintenance-chip" style="background:#ef4444;color:#fff">⏳ Countdown</span>' : '';
      html += `
        <div class="link-list-item${link.maintenance ? ' is-maintenance' : ''}">
          <div class="link-list-icon">${link.iconUrl ? '<img src="'+link.iconUrl+'" style="width:100%;height:100%;object-fit:cover;border-radius:8px" onerror="this.parentElement.innerHTML=\''+(link.icon||'')+'\'">' : (link.icon||'')}</div>
          <div class="link-list-info">
            <div class="link-list-title">${escapeHtml(link.title)} ${link.maintenance ? '<span class="maintenance-chip">🚧 Maintenance</span>' : ''}${pinBadge}${scheduleBadge}${countdownBadge} ${link.clicks?'<span style="font-size:10px;color:var(--muted);margin-left:6px">'+link.clicks+'</span>':''}</div>
            <div class="link-list-url">${escapeHtml(link.url)}</div>
          </div>
          <div class="link-list-actions">
            <button class="btn btn-sm btn-maint-toggle${link.maintenance ? ' is-active' : ''}" onclick="window.toggleMaintenance('${link.id}')" title="Toggle maintenance">🚧</button>
            <button class="btn btn-secondary btn-sm" onclick="window.editLink('${link.id}')">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="window.deleteLink('${link.id}')">Padam</button>
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  }
  
  function renderAdminMusicList(){
    const container = document.getElementById('musicListAdmin');
    if(!currentUser){
      container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">Sila login untuk menguruskan muzik</div></div>';
      return;
    }
    if(appData.music.length === 0){
      container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">Belum ada muzik. Tekan butang di atas untuk tambah!</div></div>';
      return;
    }
    let html = '';
    appData.music.forEach((music, idx)=>{
      html += `
        <div class="link-list-item">
          <div class="link-list-icon">${music.cover ? '<img src="'+music.cover+'" style="width:100%;height:100%;object-fit:cover;border-radius:8px" onerror="this.parentElement.innerHTML=\'\'">' : ''}</div>
          <div class="link-list-info">
            <div class="link-list-title">${escapeHtml(music.title)}</div>
            <div class="link-list-url">${escapeHtml(music.artist || 'Unknown')}</div>
          </div>
          <div class="link-list-actions">
            <button class="btn btn-secondary btn-sm" onclick="window.playMusic(${idx})">Main</button>
            <button class="btn btn-secondary btn-sm" onclick="window.editMusic('${music.id}')">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="window.deleteMusic('${music.id}')">Padam</button>
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  }
  
  function updateLoginUI(){
    const loginBtn = document.getElementById('loginBtn');
    if(currentUser){
      loginBtn.classList.add('logged-in');
      loginBtn.innerHTML = '<span class="dot"></span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
      loginBtn.title = 'Log Keluar: ' + currentUser.email;
      document.getElementById('userEmailDisplay').textContent = currentUser.email;
      document.getElementById('loginForm').style.display = 'none';
      document.getElementById('loggedInView').style.display = 'block';
    }else{
      loginBtn.classList.remove('logged-in');
      loginBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>';
      loginBtn.title = 'Login Admin';
      document.getElementById('loginForm').style.display = 'block';
      document.getElementById('loggedInView').style.display = 'none';
    }
  }
  
  function escapeHtml(str){
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }
  
  function createConfetti(x, y){
    const existing = document.querySelectorAll('.confetti');
    if(existing.length > 60) existing.forEach(c=>c.remove());
    const colors = ['#ff6fb5','#ff85c2','#ffb6c1','#ffd1e8','#ff1493','#ff69b4'];
    for(let i = 0; i < 15; i++){
      const el = document.createElement('div');
      el.className = 'confetti';
      el.style.cssText = `left:${x}px;top:${y}px;background:${colors[i%colors.length]};transform:translateX(${(Math.random()-0.5)*200}px);animation-duration:${(Math.random()*1+2)}s`;
      document.body.appendChild(el);
      setTimeout(()=>el.remove(), 3000);
    }
  }
  
  // ──────────────────────────────────────────
  // 🆕 REAL VISITOR PRESENCE + VISIT COUNTER + ACTIVITY FEED
  // Replaces the old fake Math.random() counters with real Firebase data
  // shared across every visitor. Needs Firebase RTDB rules that allow
  // public write to gateway_data/presence, gateway_data/stats and
  // gateway_data/activity — see chat notes for the exact rules to paste.
  // Every call is wrapped so a missing rule just means the counter stays
  // at 0 instead of breaking the page.
  // ──────────────────────────────────────────
  let _activityInitialized = false;
  let _lastActivityItems = [];
  window._h4sxAnimateTo = null;

  function setupPresenceAndVisits(animateTo, wOnlineEl, wVisitorsEl){
    if(!isFirebaseReady) return;
    try{
      const presenceRef = firebaseDb.ref('gateway_data/presence').push();
      presenceRef.set(true).then(()=>{ presenceRef.onDisconnect().remove(); }).catch(()=>{});

      firebaseDb.ref('gateway_data/presence').on('value', (snap)=>{
        animateTo(wOnlineEl, snap.exists() ? snap.numChildren() : 0);
      }, ()=>{ /* rules not set yet — leave counter at 0 */ });

      firebaseDb.ref('gateway_data/stats/totalVisits').on('value', (snap)=>{
        animateTo(wVisitorsEl, snap.val() || 0);
      }, ()=>{});

      if(!sessionStorage.getItem('h4sx_visit_counted')){
        sessionStorage.setItem('h4sx_visit_counted', '1');
        firebaseDb.ref('gateway_data/stats/totalVisits').transaction(cur=>(cur||0)+1).catch(()=>{});
        pushActivity('visit', null);
      }
    }catch(e){ /* best-effort only, never block the page */ }
  }

  function updateHotCounter(){
    const wHot = document.getElementById('wHot');
    if(!wHot) return;
    const total = appData.links.reduce((sum,l)=>sum+(l.clicks||0),0);
    if(window._h4sxAnimateTo) window._h4sxAnimateTo(wHot, total);
    else wHot.textContent = total.toLocaleString();
  }

  function pushActivity(type, label){
    if(!isFirebaseReady) return;
    try{
      const ref = firebaseDb.ref('gateway_data/activity').push();
      ref.set({ type: type, label: label || null, ts: firebase.database.ServerValue.TIMESTAMP }).catch(()=>{});
      // Occasionally trim old entries so the log doesn't grow forever
      if(Math.random() < 0.1){
        firebaseDb.ref('gateway_data/activity').orderByKey().limitToLast(200).once('value').then(snap=>{
          const keys = [];
          snap.forEach(c=>{ keys.push(c.key); });
          const toRemove = keys.slice(0, Math.max(0, keys.length - 50));
          toRemove.forEach(k=>{ firebaseDb.ref('gateway_data/activity/'+k).remove().catch(()=>{}); });
        }).catch(()=>{});
      }
    }catch(e){}
  }

  function timeAgo(ts){
    if(!ts) return '';
    const diff = Math.max(0, Date.now() - ts);
    const mins = Math.floor(diff/60000);
    if(mins < 1) return 'baru saja';
    if(mins < 60) return mins + ' minit lalu';
    const hrs = Math.floor(mins/60);
    if(hrs < 24) return hrs + ' jam lalu';
    return Math.floor(hrs/24) + ' hari lalu';
  }

  function renderActivityFeed(items){
    const container = document.getElementById('activityFeed');
    if(!container) return;
    if(!items || !items.length){
      container.innerHTML = '<div class="activity-empty">Belum ada aktiviti...</div>';
      return;
    }
    container.innerHTML = items.map(it=>{
      const text = it.type === 'click'
        ? 'Seseorang klik <b>' + escapeHtml(it.label || 'pautan') + '</b>'
        : 'Pelawat baru melayari laman';
      return '<div class="activity-item"><span class="a-dot"></span><span class="a-text">' + text + '<span class="a-time">' + timeAgo(it.ts) + '</span></span></div>';
    }).join('');
  }

  function setupActivityFeedListener(){
    if(!isFirebaseReady || _activityInitialized) return;
    _activityInitialized = true;
    try{
      firebaseDb.ref('gateway_data/activity').orderByKey().limitToLast(8).on('value', (snap)=>{
        const items = [];
        snap.forEach(c=>{ items.push(c.val()); });
        items.reverse();
        _lastActivityItems = items;
        renderActivityFeed(items);
      }, ()=>{ renderActivityFeed([]); });
      setInterval(()=>{ renderActivityFeed(_lastActivityItems); }, 30000);
    }catch(e){}
  }

  // ──────────────────────────────────────────
  // 🆕 GAMIFICATION — visitor achievement badges
  // Tracked entirely client-side (localStorage) since it's about
  // recognising an individual visitor's own behaviour, not shared data.
  // ──────────────────────────────────────────
  const ACHV_DEFS = [
    { id:'first_visit',   icon:'👋', name:'Pelawat Pertama', desc:'Lawat laman kali pertama' },
    { id:'explorer',      icon:'🔗', name:'Explorer',        desc:'Klik 3 pautan berbeza' },
    { id:'power_click',   icon:'🚀', name:'Power Clicker',   desc:'Klik 6 pautan berbeza' },
    { id:'night_owl',     icon:'🌙', name:'Night Owl',       desc:'Lawat antara 12am - 5am' },
    { id:'curious',       icon:'🔍', name:'Pencari',         desc:'Guna kotak carian' },
    { id:'loyal',         icon:'📅', name:'Pelawat Setia',   desc:'Kembali pada hari berbeza' },
    { id:'socialite',     icon:'💬', name:'Socialite',       desc:'Klik salah satu ikon sosial' },
    { id:'completionist', icon:'💯', name:'Completionist',   desc:'Klik semua pautan aktif' }
  ];

  function loadAchvState(){
    try{
      const raw = localStorage.getItem('h4sx_achv');
      if(raw){
        const parsed = JSON.parse(raw);
        return Object.assign({ unlocked:{}, clickedLinks:[], visitDates:[], searched:false, viewedAt:0 }, parsed);
      }
    }catch(e){}
    return { unlocked:{}, clickedLinks:[], visitDates:[], searched:false, viewedAt:0 };
  }
  function saveAchvState(){
    try{ localStorage.setItem('h4sx_achv', JSON.stringify(achvState)); }catch(e){}
  }
  let achvState = loadAchvState();

  function unlockAchievement(id){
    if(achvState.unlocked[id]) return;
    const def = ACHV_DEFS.find(a=>a.id===id);
    if(!def) return;
    achvState.unlocked[id] = Date.now();
    saveAchvState();
    showToast('🏆 Badge Baru: ' + def.name + '!', 'achievement');
    try{
      createConfetti(window.innerWidth/2, window.innerHeight/2.5);
      setTimeout(()=>createConfetti(window.innerWidth/2, window.innerHeight/2.5), 200);
    }catch(e){}
    updateAchvUI();
  }

  window.checkAchievements = function(context){
    const now = new Date();
    const hour = now.getHours();
    const today = now.toISOString().slice(0,10);

    if(context === 'visit'){
      unlockAchievement('first_visit');
      if(hour >= 0 && hour < 5) unlockAchievement('night_owl');
      if(achvState.visitDates.indexOf(today) === -1){
        achvState.visitDates.push(today);
        saveAchvState();
      }
      if(achvState.visitDates.length >= 2) unlockAchievement('loyal');
    }
    if(context === 'click'){
      const uniqueCount = achvState.clickedLinks.length;
      if(uniqueCount >= 3) unlockAchievement('explorer');
      if(uniqueCount >= 6) unlockAchievement('power_click');
      const activeLinks = appData.links.filter(l=>!l.maintenance && isLinkScheduleActive(l));
      if(activeLinks.length > 0 && uniqueCount >= activeLinks.length) unlockAchievement('completionist');
    }
    if(context === 'search'){
      if(!achvState.searched){ achvState.searched = true; saveAchvState(); }
      unlockAchievement('curious');
    }
    if(context === 'social'){
      unlockAchievement('socialite');
    }
    updateAchvUI();
  };

  function trackLinkClickAchievement(linkId){
    if(achvState.clickedLinks.indexOf(linkId) === -1){
      achvState.clickedLinks.push(linkId);
      saveAchvState();
    }
    window.checkAchievements('click');
  }

  function updateAchvUI(){
    const total = ACHV_DEFS.length;
    const earned = Object.keys(achvState.unlocked).length;
    const pct = total ? Math.round(earned/total*100) : 0;

    const fill = document.getElementById('achvProgressFill');
    const label = document.getElementById('achvProgressLabel');
    if(fill) fill.style.width = pct + '%';
    if(label) label.textContent = earned + ' / ' + total + ' badge diperoleh';

    const sideFill = document.getElementById('sideAchvFill');
    const sideLabel = document.getElementById('sideAchvLabel');
    if(sideFill) sideFill.style.width = pct + '%';
    if(sideLabel) sideLabel.textContent = earned + ' / ' + total + ' badge';

    const dot = document.getElementById('achvBtnDot');
    if(dot) dot.style.display = (earned > 0 && !achvState.viewedAt) ? 'block' : 'none';

    const grid = document.getElementById('achvGrid');
    if(grid){
      grid.innerHTML = ACHV_DEFS.map(def=>{
        const unlockedAt = achvState.unlocked[def.id];
        const cls = unlockedAt ? 'unlocked' : 'locked';
        const dateStr = unlockedAt ? new Date(unlockedAt).toLocaleDateString('ms-MY') : '';
        return '<div class="achv-badge ' + cls + '">' +
          '<div class="achv-badge-icon">' + (unlockedAt ? def.icon : '🔒') + '</div>' +
          '<div class="achv-badge-name">' + def.name + '</div>' +
          '<div class="achv-badge-desc">' + def.desc + '</div>' +
          (unlockedAt ? '<div class="achv-badge-date">' + dateStr + '</div>' : '') +
          '</div>';
      }).join('');
    }
  }

  function openAchvModal(){
    updateAchvUI();
    document.getElementById('achvModal').classList.add('active');
    achvState.viewedAt = Date.now();
    saveAchvState();
    const dot = document.getElementById('achvBtnDot');
    if(dot) dot.style.display = 'none';
  }

  function renderAll(){
    try { renderFeatures(); } catch(e) { console.error('Features:', e); }
    try { applyTheme(); } catch(e) { console.error('applyTheme error:', e); }
    try { renderProfile(); } catch(e) { console.error('renderProfile error:', e); }
    try { renderStats(); } catch(e) { console.error('renderStats error:', e); }
    try { renderCategoryTabs(); } catch(e) { console.error('renderCategoryTabs error:', e); }
    try { renderLinks(); } catch(e) { console.error('renderLinks error:', e); }
    try { renderSocials(); } catch(e) { console.error('renderSocials error:', e); }
    try { updateHotCounter(); } catch(e) { console.error('updateHotCounter error:', e); }
    
    if(document.getElementById('adminModal').classList.contains('active')){
      try { renderAdminLinkList(); } catch(e) { console.error('renderAdminLinkList error:', e); }
      try { renderAdminMusicList(); } catch(e) { console.error('renderAdminMusicList error:', e); }
    }
  }
  
  function setupBackgroundEffects(){
    // Fewer floating decorations on small/low-power screens — this is the
    // biggest visual-effect cost on phones, so scale it down there.
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const particleCount = prefersReduced ? 0 : (isMobile ? 10 : 25);
    const petalCount = prefersReduced ? 0 : (isMobile ? 14 : 35);

    // Floating particles
    const particlesContainer = document.getElementById('particlesContainer');
    const particleFrag = document.createDocumentFragment();
    for(let i=0;i<particleCount;i++){
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random()*100 + '%';
      particle.style.top = Math.random()*100 + '%';
      particle.style.animationDelay = Math.random()*12 + 's';
      particle.style.animationDuration = (Math.random()*8+10) + 's';
      const size = Math.random()*3+2;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particleFrag.appendChild(particle);
    }
    particlesContainer.appendChild(particleFrag);
    
    // 3D Sakura petals
    const sakuraContainer = document.getElementById('sakuraContainer');
    const sakuraFrag = document.createDocumentFragment();
    for(let j=0;j<petalCount;j++){
      const petal = document.createElement('div');
      petal.className = 'sakura-petal';
      petal.style.left = Math.random()*100 + '%';
      petal.style.animationDuration = (Math.random()*10+12) + 's';
      petal.style.animationDelay = Math.random()*15 + 's';
      const psize = Math.random()*14+12;
      petal.style.width = psize + 'px';
      petal.style.height = psize + 'px';
      // Petal hue now follows the admin's chosen Gradient 1 color instead
      // of being locked to pink — so a custom theme reaches everything,
      // not just the accent buttons.
      const baseHue = hexToHue(appData.settings.gradientA || '#ff6fb5');
      const hue = baseHue + (Math.random()*30 - 15);
      petal.style.background = `radial-gradient(ellipse at 30% 30%, hsl(${hue}, 100%, 95%) 0%, hsl(${hue}, 80%, 75%) 30%, hsl(${hue}, 90%, 60%) 60%, hsl(${hue}, 100%, 50%) 100%)`;
      sakuraFrag.appendChild(petal);
    }
    sakuraContainer.appendChild(sakuraFrag);

    // Pause the whole decorative layer while the tab/app is in the
    // background — no point burning CPU/battery on an invisible screen.
    const bgWrap = document.getElementById('bgWrap');
    document.addEventListener('visibilitychange', ()=>{
      if(bgWrap) bgWrap.style.animationPlayState = document.hidden ? 'paused' : 'running';
      document.querySelectorAll('.particle, .sakura-petal').forEach(el=>{
        el.style.animationPlayState = document.hidden ? 'paused' : 'running';
      });
    });
  }
  
  // MODAL CONTROL
  function openLoginModal(){ document.getElementById('loginModal').classList.add('active'); }
  function closeLoginModal(){ document.getElementById('loginModal').classList.remove('active'); }
  function openAdminModal(){
    // SEMAK: Firebase login
    if(!currentUser){
      openLoginModal();
      showToast('Sila login admin terlebih dahulu', 'warning');
      return;
    }
    document.getElementById('adminModal').classList.add('active');
    renderAdminLinkList();
    renderAdminMusicList();
    document.getElementById('editName').value = appData.profile.name;
    document.getElementById('editHandle').value = appData.profile.handle;
    document.getElementById('editBio').value = appData.profile.bio;
    document.getElementById('editAvatar').value = appData.profile.avatar;
    document.getElementById('editLocation').value = appData.profile.location || '';
    document.getElementById('socialWA').value = appData.settings.socials.whatsapp || '';
    document.getElementById('socialIG').value = appData.settings.socials.instagram || '';
    document.getElementById('socialTT').value = appData.settings.socials.tiktok || '';
    document.getElementById('socialYT').value = appData.settings.socials.youtube || '';
    populateThemePicker();
  }
  function closeAdminModal(){ document.getElementById('adminModal').classList.remove('active'); }
  function openLinkModal(isEdit=false){
    document.getElementById('linkModal').classList.add('active');
    document.getElementById('linkModalTitle').textContent = isEdit ? 'Edit Pautan' : 'Tambah Pautan Baru';
    if(!isEdit){
      document.getElementById('editLinkId').value = '';
      document.getElementById('linkTitle').value = '';
      document.getElementById('linkUrl').value = '';
      document.getElementById('linkDesc').value = '';
      document.getElementById('linkCategory').value = currentCategory === 'all' ? 'Utama' : currentCategory;
      document.getElementById('linkIcon').value = '';
      document.getElementById('linkIconUrl').value = '';
      document.getElementById('linkMaintenance').checked = false;
      document.getElementById('linkPinned').checked = false;
      document.getElementById('linkScheduleStart').value = '';
      document.getElementById('linkScheduleEnd').value = '';
      document.getElementById('linkCountdown').value = '';
    }
  }
  function closeLinkModal(){ document.getElementById('linkModal').classList.remove('active'); }
  
  window.editLink = function(id){
    const link = appData.links.find(l=>l.id===id);
    if(!link) return;
    document.getElementById('editLinkId').value = id;
    document.getElementById('linkTitle').value = link.title;
    document.getElementById('linkUrl').value = link.url;
    document.getElementById('linkDesc').value = link.desc || '';
    document.getElementById('linkCategory').value = link.category || 'Utama';
    document.getElementById('linkIcon').value = link.icon || '';
    document.getElementById('linkIconUrl').value = link.iconUrl || '';
    document.getElementById('linkMaintenance').checked = !!link.maintenance;
    document.getElementById('linkPinned').checked = !!link.pinned;
    document.getElementById('linkScheduleStart').value = link.scheduleStart || '';
    document.getElementById('linkScheduleEnd').value = link.scheduleEnd || '';
    document.getElementById('linkCountdown').value = link.countdown || '';
    openLinkModal(true);
  };
  
  window.deleteLink = function(id){
    if(!currentUser){ showToast('Sila login!', 'warning'); return; }
    if(!confirm('Adakah anda pasti mahu memadam pautan ini?')) return;
    firebaseDb.ref('gateway_data/links/' + id).remove()
      .then(()=>showToast('Pautan dipadam dari Firebase!'))
      .catch(e=>showToast('Gagal padam: '+e.message, 'error'));
  };

  // Quick flip a link in/out of maintenance mode without opening the
  // full edit modal — handy when you just need to pause one link fast.
  window.toggleMaintenance = function(id){
    if(!currentUser){ showToast('Sila login!', 'warning'); return; }
    const link = appData.links.find(l=>l.id===id);
    if(!link) return;
    const next = !link.maintenance;
    firebaseDb.ref('gateway_data/links/' + id + '/maintenance').set(next)
      .then(()=>showToast(next ? '🚧 Pautan ditandakan maintenance' : '✅ Pautan aktif semula'))
      .catch(e=>showToast('Gagal kemaskini: '+e.message, 'error'));
  };
  
  // MUSIC PLAYER FUNCTIONS
  function formatTime(seconds){
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return mins + ':' + (secs < 10 ? '0' : '') + secs;
  }
  
  function updateMusicPlayerUI(){
    const player = document.getElementById('musicPlayer');
    const globalBtn = document.getElementById('globalMusicBtn');
    const globalIcon = document.getElementById('globalMusicIcon');
    if(currentMusicIndex < 0 || currentMusicIndex >= appData.music.length){
      player.classList.remove('active'); player.classList.add('hidden');
      globalBtn.classList.remove('music-active');
      globalIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
      return;
    }
    const music = appData.music[currentMusicIndex];
    player.classList.remove('hidden'); player.classList.add('active');
    document.getElementById('musicTitle').textContent = music.title;
    document.getElementById('musicArtist').textContent = music.artist || 'Unknown';
    const thumb = document.getElementById('musicThumb');
    if(music.cover){ thumb.innerHTML = '<img src="'+music.cover+'" alt="">'; }
    else{ thumb.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>'; }
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    if(isPlaying){
      playIcon.style.display = 'none'; pauseIcon.style.display = 'block';
      globalBtn.classList.add('music-active');
      globalIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
    }else{
      playIcon.style.display = 'block'; pauseIcon.style.display = 'none';
      globalBtn.classList.remove('music-active');
      globalIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
    }
  }
  
  function playMusic(index){
    if(index < 0 || index >= appData.music.length) return;
    currentMusicIndex = index;
    const music = appData.music[index];
    if(!audioElement){ audioElement = document.getElementById('audioElement'); }
    audioElement.src = music.url;
    audioElement.play().then(()=>{ isPlaying = true; updateMusicPlayerUI(); })
      .catch(e=>{ console.error('Play error:', e); showToast('Gagal main muzik: ' + e.message, 'error'); });
  }
  
  function pauseMusic(){
    if(audioElement && isPlaying){ audioElement.pause(); isPlaying = false; updateMusicPlayerUI(); }
  }
  
  function resumeMusic(){
    if(audioElement && !isPlaying && currentMusicIndex >= 0){
      audioElement.play().then(()=>{ isPlaying = true; updateMusicPlayerUI(); })
        .catch(e=>console.error('Resume error:', e));
    }
  }
  
  function nextMusic(){
    if(appData.music.length === 0) return;
    currentMusicIndex = (currentMusicIndex + 1) % appData.music.length;
    playMusic(currentMusicIndex);
  }
  
  function prevMusic(){
    if(appData.music.length === 0) return;
    currentMusicIndex = (currentMusicIndex - 1 + appData.music.length) % appData.music.length;
    playMusic(currentMusicIndex);
  }
  
  window.playMusic = function(index){ playMusic(index); };
  
  window.editMusic = function(id){
    const music = appData.music.find(m=>m.id===id);
    if(!music) return;
    document.getElementById('editMusicId').value = id;
    document.getElementById('musicTitleInput').value = music.title;
    document.getElementById('musicArtistInput').value = music.artist || '';
    document.getElementById('musicUrlInput').value = music.url;
    document.getElementById('musicCoverInput').value = music.cover || '';
    document.getElementById('musicModalTitle').textContent = 'Edit Muzik';
    document.getElementById('musicModal').classList.add('active');
  };
  
  window.deleteMusic = function(id){
    if(!currentUser){ showToast('Sila login!', 'warning'); return; }
    if(!confirm('Adakah anda pasti mahu memadam muzik ini?')) return;
    firebaseDb.ref('gateway_data/music/' + id).remove()
      .then(()=>showToast('Muzik dipadam dari Firebase!'))
      .catch(e=>showToast('Gagal padam: '+e.message, 'error'));
  };
  
  // ===== SIDE WIDGETS (desktop only) =====
  function initSideWidgets(){
    // 1) Kedah Clock — Asia/Kuala_Lumpur timezone, ticks every second
    const clockEl = document.getElementById('kdhClock');
    const dateEl  = document.getElementById('kdhDate');
    const tickClock = () => {
      try{
        const now = new Date();
        const time = new Intl.DateTimeFormat('en-GB', {
          timeZone:'Asia/Kuala_Lumpur', hour:'2-digit', minute:'2-digit', hour12:false
        }).format(now);
        const date = new Intl.DateTimeFormat('en-GB', {
          timeZone:'Asia/Kuala_Lumpur', weekday:'short', day:'2-digit', month:'short'
        }).format(now);
        if(clockEl) clockEl.textContent = time;
        if(dateEl)  dateEl.textContent  = date.toUpperCase();
      }catch(e){
        if(clockEl) clockEl.textContent = new Date().toTimeString().slice(0,5);
      }
    };
    tickClock();
    setInterval(tickClock, 1000);

    // 2) Live counters — REAL data from Firebase (not simulated).
    // "Online" = live presence, "Pelawat" = real shared visit count,
    // "Jumlah Klik" = real sum of link clicks (kept in sync via renderAll).
    const wOnline   = document.getElementById('wOnline');
    const wHot      = document.getElementById('wHot');
    const wVisitors = document.getElementById('wVisitors');
    const animateTo = (el, target) => {
      if(!el) return;
      const from = parseInt(el.textContent.replace(/,/g,''),10) || 0;
      const steps = 24, dur = 900;
      let i = 0;
      const timer = setInterval(()=>{
        i++;
        const v = Math.round(from + (target - from) * (i/steps));
        el.textContent = v.toLocaleString();
        if(i >= steps) clearInterval(timer);
      }, dur/steps);
    };
    window._h4sxAnimateTo = animateTo;
    updateHotCounter();
    if(isFirebaseReady){
      setupPresenceAndVisits(animateTo, wOnline, wVisitors);
      setupActivityFeedListener();
    }

    // 3) QR code for current page URL
    const qrImg = document.getElementById('pageQR');
    if(qrImg){
      const pageUrl = encodeURIComponent(window.location.href.split('#')[0]);
      qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?data=${pageUrl}&size=200x200&margin=8&color=1a0f1e&bgcolor=ffffff`;
      qrImg.onerror = () => { qrImg.style.display='none'; };
    }

    // 4) Featured link card — auto-pick top link (highest clicks) once data loads
    const refreshFeatured = () => {
      const links = (appData && Array.isArray(appData.links)) ? appData.links : [];
      if(links.length === 0) return;
      const top = [...links].sort((a,b)=>(b.clicks||0)-(a.clicks||0))[0];
      const titleEl = document.getElementById('sideFeaturedTitle');
      const descEl  = document.getElementById('sideFeaturedDesc');
      const btnEl   = document.getElementById('sideFeaturedBtn');
      if(top && titleEl){
        titleEl.textContent = top.title || 'Featured Link';
        if(descEl) descEl.textContent = top.description || top.subtitle || 'Explore now';
        if(btnEl){
          btnEl.onclick = () => {
            if(top.url) window.open(top.url, '_blank', 'noopener');
          };
        }
      }
    };
    // Refresh on data load + periodic
    refreshFeatured();
    setInterval(refreshFeatured, 3000);
  }

  // Admin-managed features. Stored below settings to preserve the existing schema.
  function featureConfig(){
    const s = appData.settings || {};
    return {
      banner: {enabled:false,text:'',color:'#ff6fb5',end:'',...s.banner},
      promo: {enabled:false,title:'',text:'',image:'',label:'Lihat tawaran',url:'',frequency:'session',...s.promo},
      store: {enabled:false,mode:'auto',open:'09:00',close:'23:30',...s.store},
      faq: {enabled:false,items:[],...s.faq},
      effects: {sakura:true,animation:true,glow:true,lite:false,...s.effects}
    };
  }
  function malaysiaDay(now=new Date()){
    return new Date(now.getTime()+8*3600000).toISOString().slice(0,10);
  }
  function storeIsOpen(s, now=new Date()){
    if(s.mode !== 'auto') return s.mode === 'open';
    const minutes=t=>Number(t.slice(0,2))*60+Number(t.slice(3));
    const current=(now.getUTCHours()*60+now.getUTCMinutes()+480)%1440;
    const start=minutes(s.open),end=minutes(s.close);
    return start===end || (start<end ? current>=start && current<end : current>=start || current<end);
  }
  function featureUrl(value){
    try { const u=new URL(value); return ['https:','http:'].includes(u.protocol) ? u.href : ''; } catch(e){return '';}
  }
  function orderedLinks(){
    const order=Array.isArray(appData.settings.linkOrder)?appData.settings.linkOrder:[];
    const ranks=new Map(order.map((id,i)=>[String(id),i]));
    return [...appData.links].sort((a,b)=>(ranks.get(String(a.id))??order.length)-(ranks.get(String(b.id))??order.length));
  }
  let promoShown = new Set(), promoFocus = null, featureFaqKey = '', orderDraft = [];
  function renderFeatures(){
    const c=featureConfig(), b=document.getElementById('featureBanner');
    if(!b) return;
    b.hidden=!(c.banner.enabled && c.banner.text && (!c.banner.end || Date.now()<Date.parse(c.banner.end)));
    b.textContent=c.banner.text;
    b.style.borderColor=normalizeHex(c.banner.color)||'#ff6fb5';
    b.style.backgroundColor=(normalizeHex(c.banner.color)||'#ff6fb5')+'22';
    const status=document.getElementById('storeStatus');
    status.hidden=!c.store.enabled;
    const open=storeIsOpen(c.store);
    status.dataset.open=String(open);
    status.textContent=(open?'Kedai buka':'Kedai tutup')+' · '+(c.store.mode==='auto' ? c.store.open+' – '+c.store.close+' (MYT)' : 'Status ditetapkan admin');
    const faq=document.getElementById('publicFaq');
    const items=Array.isArray(c.faq.items)?c.faq.items:[];
    faq.hidden=!(c.faq.enabled && items.length);
    const key=JSON.stringify(items);
    if(featureFaqKey!==key){
      featureFaqKey=key;
      faq.innerHTML='<h2>Soalan lazim</h2>'+items.map(x=>'<details><summary>'+escapeHtml(x.question||'')+'</summary><p>'+escapeHtml(x.answer||'')+'</p></details>').join('');
    }
    document.body.classList.toggle('effects-no-sakura',!c.effects.sakura || c.effects.lite);
    document.body.classList.toggle('effects-no-motion',!c.effects.animation || c.effects.lite);
    document.body.classList.toggle('effects-no-glow',!c.effects.glow || c.effects.lite);
    document.body.classList.toggle('effects-lite',!!c.effects.lite);
    const dialog=document.getElementById('promoDialog');
    const p=c.promo, identity=JSON.stringify(p);
    if(dialog.open && (dialog.dataset.campaign!==identity || !p.enabled)) dialog.close();
    if(!p.enabled || !p.title || document.querySelector('.modal-overlay.active') || dialog.open) return;
    const keyStore='h4sx_promo_'+identity;
    const seenIdentity=identity+(p.frequency==='daily'?malaysiaDay():'');
    let seen=promoShown.has(seenIdentity);
    try { seen=seen || (p.frequency==='daily' ? localStorage.getItem(keyStore)===malaysiaDay() : sessionStorage.getItem(keyStore)==='seen'); } catch(e){}
    if(seen) return;
    document.getElementById('promoHeading').textContent=p.title;
    document.getElementById('promoText').textContent=p.text;
    const img=document.getElementById('promoImage'), url=featureUrl(p.image);
    img.hidden=!url; if(url) img.src=url; else img.removeAttribute('src');
    const link=document.getElementById('promoAction'), target=featureUrl(p.url);
    link.hidden=!target; if(target)link.href=target; else link.removeAttribute('href');
    link.textContent=p.label||'Lihat tawaran';
    promoFocus=document.activeElement;
    dialog.dataset.campaign=identity; dialog.showModal();
    promoShown.add(seenIdentity);
    try { if(p.frequency==='daily')localStorage.setItem(keyStore,malaysiaDay());else sessionStorage.setItem(keyStore,'seen'); } catch(e){}
  }
  function initFeatures(){
    const el=id=>document.getElementById(id), esc=escapeHtml;
    const field=(id,label,type='text')=>'<label class="feature-field">'+label+'<input class="form-input" id="'+id+'" type="'+type+'"></label>';
    const toggle=(id,label)=>'<label class="feature-toggle"><input id="'+id+'" type="checkbox"> '+label+'</label>';
    const select=(id,label,options)=>'<label class="feature-field">'+label+'<select class="form-select" id="'+id+'">'+options.map(([v,t])=>'<option value="'+v+'">'+t+'</option>').join('')+'</select></label>';
    el('profileCard').insertAdjacentHTML('beforebegin','<div id="featureBanner" class="feature-banner" hidden></div>');
    el('profileCard').insertAdjacentHTML('afterend','<div id="storeStatus" class="store-status" role="status" hidden></div>');
    el('socialRow').insertAdjacentHTML('beforebegin','<section id="publicFaq" class="public-faq" hidden></section>');
    document.body.insertAdjacentHTML('beforeend','<dialog id="promoDialog" class="promo-dialog" aria-labelledby="promoHeading"><button type="button" id="closePromo" class="modal-close" aria-label="Tutup promosi">✕</button><img id="promoImage" alt="Promosi H4SX" hidden><h2 id="promoHeading"></h2><p id="promoText"></p><a id="promoAction" class="btn btn-primary" target="_blank" rel="noopener noreferrer" hidden></a></dialog>');
    el('closePromo').onclick=()=>el('promoDialog').close();
    el('promoDialog').addEventListener('click',e=>{if(e.target===el('promoDialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}});
    el('promoDialog').addEventListener('close',()=>{if(promoFocus?.isConnected)promoFocus.focus();});
    el('promoImage').onerror=()=>{el('promoImage').hidden=true;};
    el('adminModal').querySelector('.tabs').insertAdjacentHTML('beforeend','<button class="tab-btn-modal" data-tab="features">Features</button>');
    el('tab-settings').insertAdjacentHTML('afterend','<div id="tab-features" class="tab-content" style="display:none"><form id="featuresForm">'+
      '<fieldset><legend>📣 Pengumuman</legend>'+toggle('bannerEnabled','Aktifkan banner')+field('bannerText','Teks pengumuman')+field('bannerColor','Warna banner','color')+field('bannerEnd','Tamat pada (waktu Malaysia; kosong = tiada tamat)','datetime-local')+'</fieldset>'+
      '<fieldset><legend>🎁 Popup promosi</legend>'+toggle('promoEnabled','Aktifkan popup')+field('promoTitle','Tajuk')+field('promoBody','Teks promosi')+field('promoImg','URL gambar (pilihan)','url')+field('promoLabel','Teks butang')+field('promoUrl','URL butang (pilihan)','url')+select('promoFrequency','Kekerapan',[['session','Sekali setiap sesi tab'],['daily','Sekali sehari (waktu Malaysia)']])+'</fieldset>'+
      '<fieldset><legend>🕘 Status kedai</legend>'+toggle('storeEnabled','Papar status kedai')+select('storeMode','Mod',[['auto','Automatik — setiap hari'],['open','Manual: buka'],['closed','Manual: tutup']])+field('storeOpen','Waktu buka (Malaysia)','time')+field('storeClose','Waktu tutup (Malaysia)','time')+'<p class="feature-help">Waktu sama = 24 jam. Jadual merentas tengah malam disokong.</p></fieldset>'+
      '<fieldset><legend>💬 FAQ</legend>'+toggle('faqEnabled','Papar soalan lazim')+'<div id="faqEditor"></div><button type="button" class="btn btn-secondary" id="addFaq">+ Tambah soalan</button></fieldset>'+
      '<fieldset><legend>✨ Efek</legend>'+toggle('effectSakura','Kelopak sakura')+toggle('effectAnimation','Animasi')+toggle('effectGlow','Glow')+toggle('effectLite','Mod ringan — matikan animasi, sakura, glow dan blur')+'</fieldset><button type="submit" id="saveFeatures" class="btn btn-primary btn-block">Simpan semua features</button><p id="featureSaveStatus" role="status" class="feature-help"></p></form></div>');
    el('tab-links').insertAdjacentHTML('afterbegin','<details class="order-editor"><summary>↕ Susun pautan</summary><p class="feature-help">Drag kad atau guna ↑ ↓. Urutan digunakan dalam kategori masing-masing; pautan pinned kekal di atas.</p><div id="orderList"></div><button type="button" id="saveOrder" class="btn btn-primary">Simpan susunan</button></details>');
    function addFaq(question='',answer=''){
      const row=document.createElement('div');row.className='faq-edit-row';
      row.innerHTML='<label class="feature-field">Soalan<input class="form-input faq-question" required maxlength="200" value="'+esc(question)+'"></label><label class="feature-field">Jawapan<textarea class="form-textarea faq-answer" required maxlength="3000">'+esc(answer)+'</textarea></label><button type="button" class="btn btn-danger">Padam soalan</button>';
      row.querySelector('button').onclick=()=>row.remove();el('faqEditor').appendChild(row);
    }
    el('addFaq').onclick=()=>addFaq();
    function loadForm(){
      const c=featureConfig();
      const checks={bannerEnabled:c.banner.enabled,promoEnabled:c.promo.enabled,storeEnabled:c.store.enabled,faqEnabled:c.faq.enabled,effectSakura:c.effects.sakura,effectAnimation:c.effects.animation,effectGlow:c.effects.glow,effectLite:c.effects.lite};
      for(const [id,v] of Object.entries(checks))el(id).checked=!!v;
      let end='';if(c.banner.end && Number.isFinite(Date.parse(c.banner.end)))end=new Date(Date.parse(c.banner.end)+8*3600000).toISOString().slice(0,16);
      const values={bannerText:c.banner.text,bannerColor:c.banner.color,bannerEnd:end,promoTitle:c.promo.title,promoBody:c.promo.text,promoImg:c.promo.image,promoLabel:c.promo.label,promoUrl:c.promo.url,promoFrequency:c.promo.frequency,storeMode:c.store.mode,storeOpen:c.store.open,storeClose:c.store.close};
      for(const [id,v] of Object.entries(values))el(id).value=v||'';
      el('faqEditor').replaceChildren();(Array.isArray(c.faq.items)?c.faq.items:[]).forEach(x=>addFaq(x.question,x.answer));
      el('featureSaveStatus').textContent='';orderDraft=orderedLinks().map(l=>String(l.id));renderOrder();
    }
    new MutationObserver(()=>{if(el('adminModal').classList.contains('active'))loadForm();}).observe(el('adminModal'),{attributes:true,attributeFilter:['class']});
    el('featuresForm').onsubmit=async e=>{
      e.preventDefault();if(!currentUser){showToast('Sila login admin!','warning');return;}
      const value=id=>el(id).value.trim(),checked=id=>el(id).checked;
      for(const id of ['promoImg','promoUrl'])if(value(id)&&!featureUrl(value(id))){showToast('URL mesti bermula dengan https:// atau http://','error');el(id).focus();return;}
      if(checked('bannerEnabled')&&!value('bannerText') || checked('promoEnabled')&&!value('promoTitle')){showToast('Isi teks banner / tajuk promosi sebelum aktifkan.','warning');return;}
      if(!value('storeOpen')||!value('storeClose')){showToast('Isi kedua-dua waktu kedai.','warning');return;}
      const data={
        banner:{enabled:checked('bannerEnabled'),text:value('bannerText'),color:value('bannerColor'),end:value('bannerEnd')?new Date(value('bannerEnd')+':00+08:00').toISOString():''},
        promo:{enabled:checked('promoEnabled'),title:value('promoTitle'),text:value('promoBody'),image:value('promoImg'),label:value('promoLabel'),url:value('promoUrl'),frequency:value('promoFrequency')},
        store:{enabled:checked('storeEnabled'),mode:value('storeMode'),open:value('storeOpen'),close:value('storeClose')},
        faq:{enabled:checked('faqEnabled'),items:[...el('faqEditor').children].map(row=>({question:row.querySelector('.faq-question').value.trim(),answer:row.querySelector('.faq-answer').value.trim()}))},
        effects:{sakura:checked('effectSakura'),animation:checked('effectAnimation'),glow:checked('effectGlow'),lite:checked('effectLite')}
      };
      el('saveFeatures').disabled=true;el('featureSaveStatus').textContent='Menyimpan…';
      try{
        await authReady;if(!currentUser||!isFirebaseReady)throw new Error('Sila login dan pastikan sambungan tersedia.');
        await firebaseDb.ref('gateway_data/settings').update(data);
        Object.assign(appData.settings,data);cacheData(appData);renderFeatures();el('featureSaveStatus').textContent='Semua features berjaya disimpan.';
      }catch(err){el('featureSaveStatus').textContent='Gagal simpan. Input dikekalkan; cuba semula. '+(err.message||'');}
      finally{el('saveFeatures').disabled=false;}
    };
    let dragged=null;
    function move(id,target){const from=orderDraft.indexOf(id),to=orderDraft.indexOf(target);if(from<0||to<0)return;orderDraft.splice(to,0,orderDraft.splice(from,1)[0]);renderOrder();}
    function renderOrder(){
      el('orderList').replaceChildren();
      orderDraft.forEach((id,i)=>{
        const link=appData.links.find(x=>String(x.id)===id);if(!link)return;
        const row=document.createElement('div');row.className='order-row';row.draggable=true;row.dataset.orderId=id;
        row.innerHTML='<span>⠿ '+esc(link.title)+'</span><button type="button" class="btn btn-secondary" aria-label="Naik" '+(i===0?'disabled':'')+'>↑</button><button type="button" class="btn btn-secondary" aria-label="Turun" '+(i===orderDraft.length-1?'disabled':'')+'>↓</button>';
        row.querySelectorAll('button')[0].onclick=()=>move(id,orderDraft[i-1]);row.querySelectorAll('button')[1].onclick=()=>move(id,orderDraft[i+1]);
        row.ondragstart=e=>{dragged=id;e.dataTransfer.setData('text/plain',id);e.dataTransfer.effectAllowed='move';row.classList.add('dragging');};
        row.ondragend=()=>{dragged=null;row.classList.remove('dragging');};row.ondragover=e=>e.preventDefault();row.ondrop=e=>{e.preventDefault();if(dragged)move(dragged,id);};
        el('orderList').appendChild(row);
      });
    }
    el('saveOrder').onclick=async()=>{
      const btn=el('saveOrder');btn.disabled=true;
      try{await saveToFirebase('settings/linkOrder',orderDraft);appData.settings.linkOrder=[...orderDraft];cacheData(appData);renderLinks();}catch(e){showToast('Susunan belum disimpan. Cuba semula.','error');}finally{btn.disabled=false;}
    };
    setInterval(()=>{if(!document.hidden)renderFeatures();},15000);
  }

  // INIT - Execute immediately (not DOMContentLoaded)
  (function init(){
    initFeatures();
    initFirebase();
    initSideWidgets();
    
    // Event listeners...
    document.getElementById('globalMusicBtn').addEventListener('click', ()=>{
      if(appData.music.length === 0){ showToast('Tiada muzik tersedia', 'warning'); return; }
      if(currentMusicIndex < 0){ playMusic(0); }
      else if(isPlaying){ pauseMusic(); }
      else{ resumeMusic(); }
    });
    
    let _scrollTicking = false;
    window.addEventListener('scroll', ()=>{
      if(_scrollTicking) return;
      _scrollTicking = true;
      requestAnimationFrame(()=>{
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        document.getElementById('scrollProgress').style.width = scrollPercent + '%';
        _scrollTicking = false;
      });
    }, { passive: true });
    
    document.getElementById('loginBtn').addEventListener('click', ()=>{
      if(currentUser){
        if(confirm('Log keluar dari admin?')){
          firebaseAuth.signOut().then(()=>showToast('Berjaya log keluar'));
        }
      }else{ openLoginModal(); }
    });
    
    document.getElementById('closeLoginModal').addEventListener('click', closeLoginModal);
    document.getElementById('loginModal').addEventListener('click', (e)=>{ if(e.target.id === 'loginModal') closeLoginModal(); });
    
    document.getElementById('loginSubmitBtn').addEventListener('click', ()=>{
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;
      if(!email || !password){ showToast('Sila isi email & kata laluan', 'warning'); return; }
      const btn = document.getElementById('loginSubmitBtn');
      const btnText = document.getElementById('loginBtnText');
      btn.disabled = true; btnText.textContent = 'Memproses...';
      firebaseAuth.signInWithEmailAndPassword(email, password)
        .then(()=>{ showToast('Berjaya login!'); closeLoginModal(); openAdminModal(); })
        .catch(e=>{ showToast('Login gagal: ' + e.message, 'error'); })
        .finally(()=>{ btn.disabled = false; btnText.textContent = 'Login'; });
    });
    
    document.getElementById('loginGoogleBtn').addEventListener('click', ()=>{
      const provider = new firebase.auth.GoogleAuthProvider();
      firebaseAuth.signInWithPopup(provider)
        .then(()=>{ showToast('Berjaya login dengan Google!'); closeLoginModal(); openAdminModal(); })
        .catch(e=>{ if(e.code !== 'auth/popup-closed-by-user'){ showToast('Google login gagal: ' + e.message, 'error'); } });
    });
    
    document.getElementById('logoutBtn').addEventListener('click', ()=>{
      firebaseAuth.signOut().then(()=>{ showToast('Berjaya log keluar'); closeLoginModal(); });
    });
    
    document.getElementById('openAdminFromLogin').addEventListener('click', ()=>{
      closeLoginModal(); openAdminModal();
    });
    
    document.getElementById('openAdminBtn').addEventListener('click', openAdminModal);
    document.getElementById('closeModal').addEventListener('click', closeAdminModal);
    document.getElementById('adminModal').addEventListener('click', (e)=>{ if(e.target.id === 'adminModal') closeAdminModal(); });
    document.getElementById('adminLogoutBtn').addEventListener('click', ()=>{
      firebaseAuth.signOut().then(()=>{ showToast('Berjaya log keluar'); closeAdminModal(); });
    });
    
    document.getElementById('themeToggle').addEventListener('click', ()=>{
      const newTheme = appData.settings.theme === 'dark' ? 'light' : 'dark';
      appData.settings.theme = newTheme;
      applyTheme();
      if(currentUser && isFirebaseReady){ saveToFirebase('settings/theme', newTheme).catch(()=>{}); }
    });
    
    let _searchDebounce = null;
    let _searchAchvFired = false;
    document.getElementById('searchInput').addEventListener('input', (e)=>{
      const val = e.target.value;
      if(val.trim() && !_searchAchvFired){
        _searchAchvFired = true;
        window.checkAchievements('search');
      }
      clearTimeout(_searchDebounce);
      _searchDebounce = setTimeout(()=>{
        searchQuery = val;
        renderLinks();
      }, 180);
    });
    
    const shareBtn = document.getElementById('shareBtn');
    const shareMenu = document.getElementById('shareMenu');
    const rawUrl = window.location.href;
    const rawTitle = document.title; // FIXED: rawTitle was undefined
    document.getElementById('shareWA').href = `https://wa.me/?text=${encodeURIComponent(rawTitle + ' ' + rawUrl)}`;
    document.getElementById('shareTG').href = `https://t.me/share/url?url=${encodeURIComponent(rawUrl)}&text=${encodeURIComponent(rawTitle)}`;
    shareBtn.addEventListener('click', (e)=>{ e.stopPropagation(); shareMenu.classList.toggle('active'); });
    document.addEventListener('click', ()=>shareMenu.classList.remove('active'));
    document.getElementById('copyLink').addEventListener('click', ()=>{
      navigator.clipboard.writeText(window.location.href).then(()=>{ showToast('Pautan disalin!'); shareMenu.classList.remove('active'); });
    });

    // 🆕 QR Code modal
    document.getElementById('showQrBtn').addEventListener('click', (e)=>{
      e.stopPropagation();
      shareMenu.classList.remove('active');
      document.getElementById('qrModal').classList.add('active');
      const canvas = document.getElementById('qrCanvas');
      const qrUrl = window.location.href.split('#')[0];
      if(window.QRCode && canvas){
        QRCode.toCanvas(canvas, qrUrl, { width: 240, margin: 2, color: { dark: '#1a0f1e', light: '#ffffff' } }, function(err){
          if(err) showToast('Gagal jana kod QR', 'error');
        });
      }
    });
    document.getElementById('closeQrModal').addEventListener('click', ()=>{ document.getElementById('qrModal').classList.remove('active'); });
    document.getElementById('qrModal').addEventListener('click', (e)=>{ if(e.target.id === 'qrModal') document.getElementById('qrModal').classList.remove('active'); });
    document.getElementById('qrDownloadBtn').addEventListener('click', ()=>{
      const canvas = document.getElementById('qrCanvas');
      if(!canvas) return;
      const a = document.createElement('a');
      a.download = 'h4sx-qr.png';
      a.href = canvas.toDataURL('image/png');
      a.click();
      showToast('Kod QR dimuat turun!');
    });
    document.getElementById('qrCopyBtn').addEventListener('click', ()=>{
      navigator.clipboard.writeText(window.location.href).then(()=>showToast('Pautan disalin!'));
    });

    // 🆕 Achievements modal
    document.getElementById('achvBtn').addEventListener('click', openAchvModal);
    document.getElementById('sideAchvWidget').addEventListener('click', openAchvModal);
    document.getElementById('closeAchvModal').addEventListener('click', ()=>{ document.getElementById('achvModal').classList.remove('active'); });
    document.getElementById('achvModal').addEventListener('click', (e)=>{ if(e.target.id === 'achvModal') document.getElementById('achvModal').classList.remove('active'); });

    // 🆕 Link redirect transition — cancel button + click outside to abort
    document.getElementById('redirectCancelBtn').addEventListener('click', closeRedirectOverlay);
    document.getElementById('redirectOverlay').addEventListener('click', (e)=>{
      if(e.target.id === 'redirectOverlay') closeRedirectOverlay();
    });
    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape' && document.getElementById('redirectOverlay').classList.contains('active')) closeRedirectOverlay();
    });
    
    document.querySelectorAll('.tab-btn-modal').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        document.querySelectorAll('.tab-btn-modal').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.tab-content').forEach(c=>c.style.display='none');
        document.getElementById('tab-'+btn.dataset.tab).style.display='block';
      });
    });
    
    document.getElementById('addLinkBtn').addEventListener('click', ()=>{
      if(!currentUser){ showToast('Sila login admin!', 'warning'); return; }
      openLinkModal(false);
    });
    document.getElementById('closeLinkModal').addEventListener('click', closeLinkModal);
    document.getElementById('cancelLinkBtn').addEventListener('click', closeLinkModal);
    document.getElementById('linkModal').addEventListener('click', (e)=>{ if(e.target.id === 'linkModal') closeLinkModal(); });
    
    document.getElementById('addMusicBtn').addEventListener('click', ()=>{
      if(!currentUser){ showToast('Sila login admin!', 'warning'); return; }
      document.getElementById('editMusicId').value = '';
      document.getElementById('musicTitleInput').value = '';
      document.getElementById('musicArtistInput').value = '';
      document.getElementById('musicUrlInput').value = '';
      document.getElementById('musicCoverInput').value = '';
      document.getElementById('musicModalTitle').textContent = 'Tambah Muzik Baru';
      document.getElementById('musicModal').classList.add('active');
    });
    document.getElementById('closeMusicModal').addEventListener('click', ()=>{ document.getElementById('musicModal').classList.remove('active'); });
    document.getElementById('cancelMusicBtn').addEventListener('click', ()=>{ document.getElementById('musicModal').classList.remove('active'); });
    document.getElementById('musicModal').addEventListener('click', (e)=>{ if(e.target.id === 'musicModal') document.getElementById('musicModal').classList.remove('active'); });
    
    document.getElementById('saveMusicBtn').addEventListener('click', ()=>{
      if(!currentUser){ showToast('Sila login admin!', 'warning'); return; }
      const title = document.getElementById('musicTitleInput').value.trim();
      const url = document.getElementById('musicUrlInput').value.trim();
      if(!title || !url){ showToast('Tajuk dan URL Audio wajib diisi!', 'warning'); return; }
      const editId = document.getElementById('editMusicId').value;
      const musicData = { title, artist: document.getElementById('musicArtistInput').value.trim(), url, cover: document.getElementById('musicCoverInput').value.trim() };
      const btn = document.getElementById('saveMusicBtn');
      btn.disabled = true; btn.textContent = 'Menyimpan...';
      authReady.then(()=>{
        if(!currentUser){ showToast('Sila login admin!', 'warning'); return; }
        const doSave = ()=>{
          if(editId){ 
            musicData.id = editId;
            return firebaseDb.ref('gateway_data/music/' + editId).set(musicData); 
          }
          else{ 
            const newId = 'music_' + Date.now().toString(); 
            musicData.id = newId;
            return firebaseDb.ref('gateway_data/music/' + newId).set(musicData); 
          }
        };
        doSave().then(()=>{
          showToast(editId ? 'Muzik dikemaskini!' : 'Muzik ditambah!');
          document.getElementById('musicModal').classList.remove('active');
        }).catch(e=>{
          console.error('[SaveMusic Error]', e.code, e.message);
          showToast(e.code === 'PERMISSION_DENIED' ? 'Akses ditolak — semak Firebase Rules' : 'Gagal simpan: ' + (e.message || e.code), 'error');
        }).finally(()=>{ btn.disabled = false; btn.textContent = 'Simpan ke Firebase'; });
      });
    });
    
    document.getElementById('playPauseBtn').addEventListener('click', ()=>{
      if(isPlaying){ pauseMusic(); } else { resumeMusic(); }
    });
    document.getElementById('nextBtn').addEventListener('click', nextMusic);
    document.getElementById('prevBtn').addEventListener('click', prevMusic);
    
    audioElement = document.getElementById('audioElement');
    audioElement.addEventListener('timeupdate', ()=>{
      if(audioElement.duration){
        const progress = (audioElement.currentTime / audioElement.duration) * 100;
        document.getElementById('musicProgressBar').style.width = progress + '%';
        document.getElementById('musicTime').textContent = formatTime(audioElement.currentTime) + ' / ' + formatTime(audioElement.duration);
      }
    });
    audioElement.addEventListener('ended', nextMusic);
    audioElement.addEventListener('play', ()=>{ isPlaying = true; updateMusicPlayerUI(); });
    audioElement.addEventListener('pause', ()=>{ isPlaying = false; updateMusicPlayerUI(); });
    
    document.getElementById('musicProgress').addEventListener('click', (e)=>{
      if(audioElement && audioElement.duration){
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percent = x / rect.width;
        audioElement.currentTime = percent * audioElement.duration;
      }
    });
    document.getElementById('volumeSlider').addEventListener('input', (e)=>{ if(audioElement){ audioElement.volume = e.target.value; } });
    
    document.getElementById('saveLinkBtn').addEventListener('click', ()=>{
      if(!currentUser){ showToast('Sila login admin!', 'warning'); return; }
      const title = document.getElementById('linkTitle').value.trim();
      const url = document.getElementById('linkUrl').value.trim();
      if(!title || !url){ showToast('Tajuk dan URL wajib diisi!', 'warning'); return; }
      const editId = document.getElementById('editLinkId').value;
      const linkData = { title, url, desc: document.getElementById('linkDesc').value.trim(), category: document.getElementById('linkCategory').value.trim() || 'Utama', icon: document.getElementById('linkIcon').value.trim(), iconUrl: document.getElementById('linkIconUrl').value.trim(), maintenance: document.getElementById('linkMaintenance').checked, pinned: document.getElementById('linkPinned').checked, scheduleStart: document.getElementById('linkScheduleStart').value || null, scheduleEnd: document.getElementById('linkScheduleEnd').value || null, countdown: document.getElementById('linkCountdown').value || null, clicks: 0 };
      const btn = document.getElementById('saveLinkBtn');
      btn.disabled = true; btn.textContent = 'Menyimpan...';
      const doSave = ()=>{
        if(editId){
          const existing = appData.links.find(l=>l.id===editId);
          if(existing) linkData.clicks = existing.clicks || 0;
          linkData.id = editId;
          return firebaseDb.ref('gateway_data/links/' + editId).set(linkData);
        }else{
          const newId = 'link_' + Date.now().toString();
          linkData.id = newId;
          return firebaseDb.ref('gateway_data/links/' + newId).set(linkData);
        }
      };
      const resetBtn = ()=>{ btn.disabled = false; btn.textContent = 'Simpan ke Firebase'; };
      authReady.then(()=>{
        if(!currentUser){ showToast('Sila login admin!', 'warning'); resetBtn(); return; }
        return doSave().then(()=>{
          showToast(editId ? 'Pautan dikemaskini!' : 'Pautan ditambah!');
          closeLinkModal();
        }).catch(e=>{
          console.error('[SaveLink Error]', e.code, e.message);
          showToast(e.code === 'PERMISSION_DENIED' ? 'Akses ditolak — semak Firebase Rules' : 'Gagal simpan: ' + (e.message || e.code), 'error');
        }).finally(resetBtn);
      }).catch(resetBtn);
    });
    
    document.getElementById('saveProfileBtn').addEventListener('click', ()=>{
      if(!currentUser){ showToast('Sila login admin!', 'warning'); return; }
      const profileData = {
        name: document.getElementById('editName').value.trim() || 'H4SX Gateway',
        handle: document.getElementById('editHandle').value.trim() || '@h4sx',
        bio: document.getElementById('editBio').value.trim(),
        avatar: document.getElementById('editAvatar').value.trim(),
        location: document.getElementById('editLocation').value.trim()
      };
      saveToFirebase('profile', profileData);
    });
    
    // Custom theme picker: color <-> hex sync + live preview
    ['GradA','GradB','Accent'].forEach(key=>{
      const colorInput = document.getElementById('pick'+key);
      const hexInput = document.getElementById('hex'+key);
      const syncFromColor = ()=>{
        hexInput.value = colorInput.value.toUpperCase();
        updateThemePreview(document.getElementById('pickGradA').value, document.getElementById('pickGradB').value);
        document.querySelectorAll('.theme-preset-btn').forEach(b=>b.classList.remove('active'));
      };
      const syncFromHex = ()=>{
        const norm = normalizeHex(hexInput.value);
        if(norm){
          colorInput.value = norm;
          updateThemePreview(document.getElementById('pickGradA').value, document.getElementById('pickGradB').value);
          document.querySelectorAll('.theme-preset-btn').forEach(b=>b.classList.remove('active'));
        }
      };
      colorInput.addEventListener('input', syncFromColor);
      hexInput.addEventListener('input', syncFromHex);
    });

    document.querySelectorAll('.theme-preset-btn').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        document.getElementById('pickGradA').value = btn.dataset.a;
        document.getElementById('hexGradA').value = btn.dataset.a.toUpperCase();
        document.getElementById('pickGradB').value = btn.dataset.b;
        document.getElementById('hexGradB').value = btn.dataset.b.toUpperCase();
        document.getElementById('pickAccent').value = btn.dataset.accent;
        document.getElementById('hexAccent').value = btn.dataset.accent.toUpperCase();
        updateThemePreview(btn.dataset.a, btn.dataset.b);
        document.querySelectorAll('.theme-preset-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    document.getElementById('saveSettingsBtn').addEventListener('click', ()=>{
      if(!currentUser){ showToast('Sila login admin!', 'warning'); return; }
      const gradA    = normalizeHex(document.getElementById('hexGradA').value)   || appData.settings.gradientA   || '#ff6fb5';
      const gradB    = normalizeHex(document.getElementById('hexGradB').value)   || appData.settings.gradientB   || '#ba55d3';
      const accentC  = normalizeHex(document.getElementById('hexAccent').value)  || appData.settings.accentColor || '#ff6fb5';
      const socials = {
        whatsapp: document.getElementById('socialWA').value.trim() || '#',
        instagram: document.getElementById('socialIG').value.trim() || '#',
        tiktok: document.getElementById('socialTT').value.trim() || '#',
        youtube: document.getElementById('socialYT').value.trim() || '#'
      };
      const newSettings = {
        ...appData.settings,
        theme: appData.settings.theme || 'dark',
        accentColor: accentC,
        gradientA: gradA,
        gradientB: gradB,
        socials: socials
      };
      appData.settings = newSettings;
      applyTheme();
      saveToFirebase('settings', newSettings);
    });
    
    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape'){
        closeLoginModal(); closeAdminModal(); closeLinkModal();
      }
    });
  })();
})();
