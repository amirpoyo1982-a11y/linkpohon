/* H4SX stickers + signature. Independent of app.js; uses the same Firebase app. */
(function(){
  'use strict';
  var MAX=40, CACHE='h4sx_data_cache', PATH='gateway_data/settings/stickers';
  var layer=null, wrap=null, ref=null, saved={}, draft=null, selected=null, editing=false;

  function safeUrl(v){
    try{var u=new URL(String(v||'').trim());return u.protocol==='https:'&&!u.username&&!u.password?u.href:'';}catch(e){return '';}
  }
  function num(v,min,max,def){v=Number(v);return isFinite(v)?Math.min(max,Math.max(min,v)):def;}
  function clean(raw){
    var out={},n=0;
    if(!raw||typeof raw!=='object')return out;
    Object.keys(raw).forEach(function(id){
      var s=raw[id],url=s&&safeUrl(s.url);
      if(!url||n>=MAX||!/^[\w-]{1,40}$/.test(id))return;
      n++;out[id]={url:url,x:num(s.x,-30,130,50),y:num(s.y,-200,6000,120),w:num(s.w,4,90,22),r:num(s.r,-180,180,0)};
    });
    return out;
  }
  function place(el,s){
    el.style.left=s.x+'%';el.style.top=s.y+'px';el.style.width=s.w+'%';
    el.style.transform='translate(-50%,0) rotate('+s.r+'deg)';
  }
  function build(id,s){
    var el=document.createElement('div');
    el.className='h4sx-sticker';el.dataset.id=id;
    var img=document.createElement('img');
    img.alt='';img.decoding='async';img.loading='lazy';img.draggable=false;img.referrerPolicy='no-referrer';
    img.src=s.url;img.addEventListener('error',function(){el.style.display='none';});
    el.appendChild(img);place(el,s);return el;
  }
  function render(data){
    if(!layer)return;
    var frag=document.createDocumentFragment();
    Object.keys(data).forEach(function(id){frag.appendChild(build(id,data[id]));});
    layer.replaceChildren(frag);
    if(editing)bindDrag();
  }
  function cached(){
    try{var d=JSON.parse(localStorage.getItem(CACHE)||'null');return clean(d&&d.settings&&d.settings.stickers);}catch(e){return {};}
  }
  function mountLayer(){
    wrap=document.querySelector('.main-wrap');
    if(!wrap)return false;
    layer=document.createElement('div');layer.id='stickerLayer';layer.setAttribute('aria-hidden','true');
    wrap.appendChild(layer);return true;
  }
  function mountSignature(){
    var f=document.querySelector('.footer-text');
    if(!f||document.querySelector('.h4sx-signature'))return;
    var s=document.createElement('div');s.className='h4sx-signature';
    s.innerHTML='<small>Crafted by</small><span class="sig">h4sx</span><i class="sig-line"></i>';
    f.parentNode.insertBefore(s,f);
  }
  function whenFirebase(cb,tries){
    tries=tries||0;
    if(window.firebase&&firebase.apps&&firebase.apps.length)return cb();
    if(tries<80)setTimeout(function(){whenFirebase(cb,tries+1);},150);
  }
  function listen(){
    ref=firebase.database().ref(PATH);
    ref.on('value',function(snap){
      saved=clean(snap.val());
      if(!editing)render(saved);
    },function(){});
    firebase.auth().onAuthStateChanged(function(user){
      document.body.classList.toggle('is-admin',!!user);
      if(!user&&editing)stopEdit(false);
    });
  }
  window.__h4sxStickers={start:function(){startEdit();},_clean:clean};
  function init(){
    if(!mountLayer())return;
    mountSignature();
    saved=cached();render(saved);
    whenFirebase(function(){listen();initEditor();});
  }
  var panel=null, fab=null;
  function $(sel){return panel.querySelector(sel);}
  function uid(){return 's'+Date.now().toString(36)+Math.random().toString(36).slice(2,6);}
  function toast(m,t){var el=document.getElementById('toast');if(!el)return;el.textContent=m;el.className='toast '+(t||'');el.classList.add('show');setTimeout(function(){el.classList.remove('show');},2500);}
  function initEditor(){
    fab=document.createElement('button');fab.type='button';fab.className='h4sx-sticker-fab';
    fab.title='Edit sticker';fab.setAttribute('aria-label','Edit sticker');fab.textContent='\u2728';
    fab.addEventListener('click',startEdit);document.body.appendChild(fab);
    panel=document.createElement('div');panel.className='sticker-panel';panel.hidden=true;
    panel.innerHTML='<h3>Sticker H4SX</h3>'+
      '<p class="hint">Tampal link HTTPS gambar/GIF/PNG/WebP, tekan Tambah. Seret sticker pada halaman untuk alih posisi.</p>'+
      '<div class="row"><input class="form-input" id="stkUrl" type="url" placeholder="https://.../sticker.png"><button type="button" class="btn btn-primary" id="stkAdd">Tambah</button></div>'+
      '<div class="sticker-thumbs" id="stkThumbs"></div>'+
      '<label class="sl">Saiz<input id="stkW" type="range" min="4" max="90" step="1"><output id="stkWv"></output></label>'+
      '<label class="sl">Putar<input id="stkR" type="range" min="-180" max="180" step="1"><output id="stkRv"></output></label>'+
      '<div class="acts"><button type="button" class="btn btn-danger btn-sm" id="stkDel">Padam</button>'+
      '<button type="button" class="btn btn-secondary btn-sm" id="stkCancel">Batal</button>'+
      '<button type="button" class="btn btn-primary btn-sm" id="stkSave">Simpan</button></div>';
    document.body.appendChild(panel);
    var tab=document.getElementById('tab-settings');
    if(tab){
      var b=document.createElement('button');b.type='button';b.className='btn btn-secondary btn-block';
      b.style.marginBottom='14px';b.textContent='\u2728 Edit sticker (letak & alih posisi)';
      b.addEventListener('click',startEdit);tab.insertBefore(b,tab.firstChild);
    }
    $('#stkAdd').onclick=addSticker;
    $('#stkUrl').addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();addSticker();}});
    $('#stkW').oninput=function(){var s=draft[selected];if(!s)return;s.w=+this.value;refreshEl(selected);syncControls();};
    $('#stkR').oninput=function(){var s=draft[selected];if(!s)return;s.r=+this.value;refreshEl(selected);syncControls();};
    $('#stkDel').onclick=function(){if(!selected)return;delete draft[selected];selected=null;render(draft);syncControls();};
    $('#stkCancel').onclick=function(){stopEdit();};
    $('#stkSave').onclick=save;
  }
  function startEdit(){
    if(editing||!panel)return;
    var m=document.getElementById('adminModal');
    if(m&&m.classList.contains('active')){var c=document.getElementById('closeModal');if(c)c.click();}
    draft=JSON.parse(JSON.stringify(saved));selected=null;editing=true;
    document.body.classList.add('sticker-edit');panel.hidden=false;
    render(draft);syncControls();
  }
  function stopEdit(){
    editing=false;draft=null;selected=null;
    document.body.classList.remove('sticker-edit');if(panel)panel.hidden=true;
    render(saved);
  }
  function refreshEl(id){
    var el=layer.querySelector('[data-id="'+id+'"]');if(el&&draft[id])place(el,draft[id]);
  }
  function syncControls(){
    var box=$('#stkThumbs');box.replaceChildren();
    Object.keys(draft).forEach(function(id){
      var b=document.createElement('button');b.type='button';b.title='Pilih';
      b.style.backgroundImage='url("'+draft[id].url.replace(/"/g,'%22')+'")';
      if(id===selected)b.className='on';
      b.onclick=function(){select(id);};box.appendChild(b);
    });
    var s=draft[selected],w=$('#stkW'),r=$('#stkR');
    w.disabled=r.disabled=$('#stkDel').disabled=!s;
    if(s){w.value=s.w;r.value=s.r;$('#stkWv').textContent=Math.round(s.w)+'%';$('#stkRv').textContent=Math.round(s.r)+'\u00b0';}
    else{$('#stkWv').textContent='';$('#stkRv').textContent='';}
    layer.querySelectorAll('.h4sx-sticker').forEach(function(el){el.classList.toggle('selected',el.dataset.id===selected);});
  }
  function select(id){selected=id;syncControls();}
  function addSticker(){
    var inp=$('#stkUrl'),url=safeUrl(inp.value);
    if(!url){toast('Link mesti HTTPS dan sah.','warning');return;}
    if(Object.keys(draft).length>=MAX){toast('Maksimum '+MAX+' sticker.','warning');return;}
    var id=uid(),top=window.scrollY-(wrap.getBoundingClientRect().top+window.scrollY)+140;
    draft[id]={url:url,x:50,y:Math.round(Math.max(40,top)),w:22,r:0};
    inp.value='';selected=id;render(draft);
  }
  function bindDrag(){
    layer.querySelectorAll('.h4sx-sticker').forEach(function(el){
      var id=el.dataset.id,sx,sy,ox,oy,pid=null;
      el.addEventListener('pointerdown',function(e){
        if(e.button>0)return;
        e.preventDefault();pid=e.pointerId;el.setPointerCapture(pid);
        el.classList.add('dragging');sx=e.clientX;sy=e.clientY;ox=draft[id].x;oy=draft[id].y;
        if(selected!==id)select(id);
      });
      el.addEventListener('pointermove',function(e){
        if(pid!==e.pointerId)return;
        var rw=wrap.getBoundingClientRect().width||1,s=draft[id];
        s.x=Math.round(Math.min(130,Math.max(-30,ox+(e.clientX-sx)/rw*100))*10)/10;
        s.y=Math.round(Math.min(6000,Math.max(-200,oy+(e.clientY-sy))));
        place(el,s);
      });
      function end(e){if(pid!==e.pointerId)return;pid=null;el.classList.remove('dragging');}
      el.addEventListener('pointerup',end);el.addEventListener('pointercancel',end);
    });
    syncControls();
  }
  function save(){
    var data=clean(draft),btn=$('#stkSave');btn.disabled=true;
    ref.set(Object.keys(data).length?data:null).then(function(){
      saved=data;
      try{var d=JSON.parse(localStorage.getItem(CACHE)||'null');if(d&&d.settings){d.settings.stickers=data;localStorage.setItem(CACHE,JSON.stringify(d));}}catch(e){}
      toast('Sticker disimpan!');stopEdit();
    }).catch(function(e){
      toast(e&&e.code==='PERMISSION_DENIED'?'Akses simpan ditolak. Login admin dahulu.':'Gagal simpan sticker.','error');
    }).then(function(){btn.disabled=false;});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
