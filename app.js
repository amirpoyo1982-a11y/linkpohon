/* H4SX Gateway - Main Application Script */
/* Security: Protected Content - Do Not Redistribute */

(function(){
  'use strict';
  
  // ===== SECURITY: DOMAIN WHITELIST CHECK =====
  const ALLOWED_DOMAINS = ['localhost', '127.0.0.1', 'h4sxmy.xyz', 'www.h4sxmy.xyz', 'link.h4sxmy.xyz'];
  const currentDomain = window.location.hostname;
  
  if (!ALLOWED_DOMAINS.includes(currentDomain)) {
    console.error('Security Alert: Unauthorized domain detected:', currentDomain);
    document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#1a0a1f;color:#fff;font-family:sans-serif;text-align:center;padding:20px;"><div><h1>🔒 Access Denied</h1><p>This content is protected and can only be accessed from authorized domains.</p></div></div>';
    throw new Error('Domain not authorized');
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
    e.preventDefault();
    return false;
  });
  
  // Disable drag-and-drop
  document.addEventListener('dragstart', function(e) {
    e.preventDefault();
    return false;
  });
  
  // Clear console to hide sensitive info
  setInterval(function() {
    console.clear();
    console.log('%c🔒 H4SX Gateway - Protected Content', 'color: #ff6fb5; font-size: 16px; font-weight: bold;');
  }, 5000);
  
  // ===== SECURITY: ANTI-DEBUGGING MEASURES =====
  // Detect debugger
  let _0x1a2b = function() {
    const _0x3c4d = new Date();
    debugger;
    if (new Date() - _0x3c4d > 100) {
      document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#1a0a1f;color:#fff;font-family:sans-serif;text-align:center;padding:20px;"><div><h1>🔒 Debugging Detected</h1><p>Please close your developer tools to continue.</p></div></div>';
      window.location.reload();
    }
  };
  setInterval(_0x1a2b, 1000);
  
  // Detect devtools via window size
  const _0x5e6f = function() {
    const _0x7g8h = window.outerWidth - window.innerWidth > 160 || window.outerHeight - window.innerHeight > 160;
    if (_0x7g8h) {
      console.log('%c⚠️ Developer tools detected', 'color: #ff6fb5; font-size: 14px;');
    }
  };
  setInterval(_0x5e6f, 2000);
  
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
  let appData = JSON.parse(JSON.stringify(DEFAULT_DATA));
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
  
  function initFirebase(){
    renderAll();
    setupBackgroundEffects();
    hideLoading();
    if(!firebaseConfig.apiKey || firebaseConfig.apiKey === 'YOUR_API_KEY'){
      console.warn('Firebase belum disetup. Guna data laluan sahaja.');
      const notice = document.getElementById('firebaseNotice');
      if(notice) notice.style.display = 'block';
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
      }
    }, (error)=>{
      console.error('Firebase read error:', error);
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
  function applyTheme(){
    document.body.setAttribute('data-theme', appData.settings.theme);
    document.documentElement.style.setProperty('--accent', appData.settings.accentColor);
    const hex = appData.settings.accentColor;
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    document.documentElement.style.setProperty('--accent-soft', `rgba(${r},${g},${b},0.2)`);
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
  
  function renderLinks(){
    const container = document.getElementById('linksContainer');
    let filtered = appData.links;
    
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
    
    const grouped = {};
    filtered.forEach(l=>{
      const cat = l.category || 'Lain-lain';
      if(!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(l);
    });
    
    let html = '';
    Object.keys(grouped).forEach((cat, idx)=>{
      if(currentCategory === 'all' && Object.keys(grouped).length > 1){
        html += '<div class="category-title" style="animation-delay:'+(idx*0.1)+'s">'+cat+'</div>';
      }
      grouped[cat].forEach((link, i)=>{
        const iconHtml = link.iconUrl 
          ? '<img src="'+link.iconUrl+'" alt="" onerror="this.parentElement.innerHTML=\''+(link.icon||'')+'\'">'
          : (link.icon || '');
        
        html += `
          <a class="link-btn" href="${link.url}" target="_blank" data-id="${link.id}" style="animation-delay:${(idx*0.1 + i*0.08)+0.2}s">
            <div class="link-icon">${iconHtml}</div>
            <div class="link-text">
              <div class="link-title">${escapeHtml(link.title)}</div>
              ${link.desc ? '<div class="link-desc">'+escapeHtml(link.desc)+'</div>' : ''}
            </div>
            <div class="link-meta">
              ${link.clicks ? '<span class="click-count">'+link.clicks+'</span>' : ''}
              <svg class="link-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </a>
        `;
      });
    });
    
    container.innerHTML = html;
    
    container.querySelectorAll('.link-btn').forEach(btn=>{
      btn.addEventListener('click', function(e){
        const id = this.dataset.id;
        const link = appData.links.find(l=>l.id===id);
        if(link && isFirebaseReady && !this.dataset.clicked){
          this.dataset.clicked = 'true';
          setTimeout(()=>delete this.dataset.clicked, 1000);
          firebaseDb.ref('gateway_data/links/' + id + '/clicks').transaction((currentClicks)=>{
            return (currentClicks || 0) + 1;
          }).catch(()=>{});
        }
        const rect = this.getBoundingClientRect();
        createConfetti(e.clientX, e.clientY);
        const ripple = document.createElement('div');
        ripple.className = 'click-effect';
        this.appendChild(ripple);
        setTimeout(()=>ripple.remove(), 600);
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
      html += `
        <div class="link-list-item">
          <div class="link-list-icon">${link.iconUrl ? '<img src="'+link.iconUrl+'" style="width:100%;height:100%;object-fit:cover;border-radius:8px" onerror="this.parentElement.innerHTML=\''+(link.icon||'')+'\'">' : (link.icon||'')}</div>
          <div class="link-list-info">
            <div class="link-list-title">${escapeHtml(link.title)} ${link.clicks?'<span style="font-size:10px;color:var(--muted);margin-left:6px">'+link.clicks+'</span>':''}</div>
            <div class="link-list-url">${escapeHtml(link.url)}</div>
          </div>
          <div class="link-list-actions">
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
  
  function renderAll(){
    try { applyTheme(); } catch(e) { console.error('applyTheme error:', e); }
    try { renderProfile(); } catch(e) { console.error('renderProfile error:', e); }
    try { renderStats(); } catch(e) { console.error('renderStats error:', e); }
    try { renderCategoryTabs(); } catch(e) { console.error('renderCategoryTabs error:', e); }
    try { renderLinks(); } catch(e) { console.error('renderLinks error:', e); }
    try { renderSocials(); } catch(e) { console.error('renderSocials error:', e); }
    
    if(document.getElementById('adminModal').classList.contains('active')){
      try { renderAdminLinkList(); } catch(e) { console.error('renderAdminLinkList error:', e); }
      try { renderAdminMusicList(); } catch(e) { console.error('renderAdminMusicList error:', e); }
    }
  }
  
  function setupBackgroundEffects(){
    // Floating particles
    const particlesContainer = document.getElementById('particlesContainer');
    for(let i=0;i<25;i++){
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random()*100 + '%';
      particle.style.top = Math.random()*100 + '%';
      particle.style.animationDelay = Math.random()*12 + 's';
      particle.style.animationDuration = (Math.random()*8+10) + 's';
      const size = Math.random()*3+2;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particlesContainer.appendChild(particle);
    }
    
    // 3D Sakura petals
    const sakuraContainer = document.getElementById('sakuraContainer');
    const petalCount = 35;
    for(let j=0;j<petalCount;j++){
      const petal = document.createElement('div');
      petal.className = 'sakura-petal';
      petal.style.left = Math.random()*100 + '%';
      petal.style.animationDuration = (Math.random()*10+12) + 's';
      petal.style.animationDelay = Math.random()*15 + 's';
      const psize = Math.random()*14+12;
      petal.style.width = psize + 'px';
      petal.style.height = psize + 'px';
      // Random hue variation for petals
      const hue = 330 + Math.random()*30;
      petal.style.background = `radial-gradient(ellipse at 30% 30%, hsl(${hue}, 100%, 95%) 0%, hsl(${hue}, 80%, 75%) 30%, hsl(${hue}, 90%, 60%) 60%, hsl(${hue}, 100%, 50%) 100%)`;
      sakuraContainer.appendChild(petal);
    }
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
    document.querySelectorAll('#colorPicker .color-option').forEach(opt=>{
      opt.classList.toggle('active', opt.dataset.color === appData.settings.accentColor);
    });
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
    openLinkModal(true);
  };
  
  window.deleteLink = function(id){
    if(!currentUser){ showToast('Sila login!', 'warning'); return; }
    if(!confirm('Adakah anda pasti mahu memadam pautan ini?')) return;
    firebaseDb.ref('gateway_data/links/' + id).remove()
      .then(()=>showToast('Pautan dipadam dari Firebase!'))
      .catch(e=>showToast('Gagal padam: '+e.message, 'error'));
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

    // 2) Live counters — smooth increment animation
    const wOnline   = document.getElementById('wOnline');
    const wHot      = document.getElementById('wHot');
    const wVisitors = document.getElementById('wVisitors');
    // Session-persistent baselines so numbers feel real, not resetting on refresh
    const seed = () => Math.floor(Math.random()*40)+50; // 50-89
    let online   = Math.floor(Math.random()*18)+8;   // 8-25
    let hot      = parseInt(sessionStorage.getItem('h4sx_hot')   || Math.floor(Math.random()*200+180), 10);
    let visitors = parseInt(sessionStorage.getItem('h4sx_visits')|| Math.floor(Math.random()*900+420), 10);
    // increment visitors on this visit
    visitors += 1;
    sessionStorage.setItem('h4sx_visits', visitors);
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
    animateTo(wOnline, online);
    animateTo(wHot, hot);
    animateTo(wVisitors, visitors);
    // Ticker: online fluctuates, hot creeps up
    setInterval(()=>{
      online = Math.max(4, Math.min(35, online + (Math.random()<0.5?-1:1) * (Math.random()<0.3?2:1)));
      if(Math.random() < 0.55){
        hot += Math.floor(Math.random()*3)+1;
        sessionStorage.setItem('h4sx_hot', hot);
        animateTo(wHot, hot);
      }
      animateTo(wOnline, online);
    }, 6000);

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

  // INIT - Execute immediately (not DOMContentLoaded)
  (function init(){
    initFirebase();
    initSideWidgets();
    
    // Event listeners...
    document.getElementById('globalMusicBtn').addEventListener('click', ()=>{
      if(appData.music.length === 0){ showToast('Tiada muzik tersedia', 'warning'); return; }
      if(currentMusicIndex < 0){ playMusic(0); }
      else if(isPlaying){ pauseMusic(); }
      else{ resumeMusic(); }
    });
    
    window.addEventListener('scroll', ()=>{
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      document.getElementById('scrollProgress').style.width = scrollPercent + '%';
    });
    
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
    
    document.getElementById('searchInput').addEventListener('input', (e)=>{
      searchQuery = e.target.value;
      renderLinks();
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
      const linkData = { title, url, desc: document.getElementById('linkDesc').value.trim(), category: document.getElementById('linkCategory').value.trim() || 'Utama', icon: document.getElementById('linkIcon').value.trim(), iconUrl: document.getElementById('linkIconUrl').value.trim(), clicks: 0 };
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
    
    document.querySelectorAll('#colorPicker .color-option').forEach(opt=>{
      opt.addEventListener('click', ()=>{
        if(!currentUser){ showToast('Sila login admin!', 'warning'); return; }
        document.querySelectorAll('#colorPicker .color-option').forEach(o=>o.classList.remove('active'));
        opt.classList.add('active');
        saveToFirebase('settings/accentColor', opt.dataset.color).catch(()=>{});
      });
    });
    
    document.getElementById('saveSettingsBtn').addEventListener('click', ()=>{
      if(!currentUser){ showToast('Sila login admin!', 'warning'); return; }
      const socials = {
        whatsapp: document.getElementById('socialWA').value.trim() || '#',
        instagram: document.getElementById('socialIG').value.trim() || '#',
        tiktok: document.getElementById('socialTT').value.trim() || '#',
        youtube: document.getElementById('socialYT').value.trim() || '#'
      };
      saveToFirebase('settings/socials', socials);
    });
    
    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape'){
        closeLoginModal(); closeAdminModal(); closeLinkModal();
      }
    });
  })();
})();