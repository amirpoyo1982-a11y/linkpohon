/* H4SX stickers + signature. Independent of app.js; uses the same Firebase app. */
(function(){
  'use strict';
  var MAX=40, CACHE='h4sx_data_cache', PATH='gateway_data/settings/stickers';
  var layer=null, wrap=null, ref=null, saved={}, draft=null, selected=null, editing=false, editDevice=null, originalWrapStyle=null;

  function safeUrl(v){
    try{var u=new URL(String(v||'').trim());return u.protocol==='https:'&&!u.username&&!u.password?u.href:'';}catch(e){return '';}
  }
  function num(v,min,max,def){v=Number(v);return isFinite(v)?Math.min(max,Math.max(min,v)):def;}
  function view(s){return {x:num(s.x,-30,130,50),y:num(s.y,-200,6000,120),w:num(s.w,4,90,22),r:num(s.r,-180,180,0),sx:num(s.sx,0.2,4,1),sy:num(s.sy,0.2,4,1),link:String(s.link||''),text:String(s.text||''),textSize:num(s.textSize,8,96,24),textColor:String(s.textColor||'#ffffff'),textStyle:String(s.textStyle||'glow')};}
  function clean(raw){
    var out={},n=0;
    if(!raw||typeof raw!=='object')return out;
    Object.keys(raw).forEach(function(id){
      var s=raw[id],url=s&&safeUrl(s.url),link=s&&safeUrl(s.link),text=String(s&&s.text||'').trim();
      if(s&&s.o&&typeof s.o==='object'){
        ['t','m'].forEach(function(k){
          var o=s.o[k];
          if(!o||typeof o!=='object')return;
          if(!link) link = safeUrl(o.link) || link;
          if(!text) text = String(o.text||'').trim() || text;
        });
      }
      if(!url && !text) return; // Allow text-only stickers
      if(n>=MAX||!/^[\w-]{1,40}$/.test(id))return;
      var order=n++;var item=view(s);item.url=url;item.link=link;item.text=text;item.z=num(s.z,0,10000,order);
      if(s.o&&typeof s.o==='object'){var oo={};['t','m'].forEach(function(k){if(s.o[k]&&typeof s.o[k]==='object')oo[k]=view(s.o[k]);});if(Object.keys(oo).length)item.o=oo;}
      out[id]=item;
    });
    return out;
  }
  /* Device layouts: d = PC (base fields), t = tablet, m = mobile (stored in s.o) */
  var REF_W=720, DEVNAME={d:'PC',t:'Tablet',m:'Phone'}, PREVIEW_W={t:768,m:390};
  function viewportDev(){var w=window.innerWidth;return w>=1024?'d':w>=600?'t':'m';}
  function dev(){return editing&&editDevice?editDevice:viewportDev();}
  function wrapW(){return (wrap&&wrap.getBoundingClientRect().width)||REF_W;}
  function defW(){return dev()==='d'?22:num(22*REF_W/wrapW(),4,90,22);}
  function eff(s){
    var k=dev();if(k==='d')return s;
    var c=s.o&&s.o[k]?view(s.o[k]):view(s);
    if(!s.o||!s.o[k]){
      c.w=num(s.w*REF_W/wrapW(),4,90,s.w);
      c.x=num(s.x,-30,130,50);
      c.y=num(s.y,-200,6000,s.y);
    }
    c.url=s.url;c.z=s.z;
    if(!c.link)c.link=s.link||'';
    if(!c.text)c.text=s.text||'';
    if(!c.textSize)c.textSize=s.textSize||24;
    if(!c.textColor)c.textColor=s.textColor||'#ffffff';
    if(!c.textStyle)c.textStyle=s.textStyle||'glow';
    return c;
  }
  function R(id){return eff(draft[id]);}
  function W(id){
    var s=draft[id];if(!s)return null;
    var k=dev();if(k==='d')return s;
    if(!s.o)s.o={};if(!s.o[k])s.o[k]=view(eff(s));
    return s.o[k];
  }
  function relayout(){
    if(editing||!layer)return;
    layer.querySelectorAll('.h4sx-sticker').forEach(function(el){var s=saved[el.dataset.id];if(s)place(el,eff(s));});
  }
  function place(el,s){
    el.style.left=s.x+'%';el.style.top=s.y+'px';el.style.width=s.w+'%';
    el.style.zIndex=String(s.z||0);
    el.style.transform='translate(-50%,0) rotate('+s.r+'deg) scaleX('+(s.sx||1)+') scaleY('+(s.sy||1)+')';
    el.style.setProperty('--isx',String(1/(s.sx||1)));el.style.setProperty('--isy',String(1/(s.sy||1)));
    if(!editing && (s.link || s.text)){
      el.style.pointerEvents = 'auto';
      el.style.cursor = 'pointer';
    } else if (!editing) {
      el.style.pointerEvents = 'none';
      el.style.cursor = 'default';
    }
  }
  function build(id,s){
    var el = document.createElement( (!editing && s.link) ? 'a' : 'div');
    if(!editing && s.link) {
      el.href = s.link;
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    }
    el.className='h4sx-sticker';el.dataset.id=id;
    
      if(s.url){
      var img=document.createElement('img');
      img.alt='';img.decoding='async';img.loading='lazy';img.draggable=false;img.referrerPolicy='no-referrer';
      img.src=s.url;img.addEventListener('error',function(){img.style.display='none';});
      el.appendChild(img);
    }
    
    if(s.text){
      var txt = document.createElement('span');
      txt.className = 'stk-text stk-text-'+(s.textStyle||'glow');
      txt.textContent = s.text;
      txt.style.fontSize = (s.textSize||24)+'px';
      txt.style.color = s.textColor || '#ffffff';
      el.appendChild(txt);
    }

    if(editing){
      ['l','r','t','b'].forEach(function(k){var h=document.createElement('i');h.className='stk-h '+k;h.dataset.h=k;el.appendChild(h);});
      el.style.pointerEvents = 'auto'; // Pastikan dalam edit mode boleh tekan
    }
    place(el,s);return el;
  }
  function render(data){
    if(!layer)return;
    var frag=document.createDocumentFragment();
    Object.keys(data).forEach(function(id){frag.appendChild(build(id,eff(data[id])));});
    layer.replaceChildren(frag);
    // Hapus aria-hidden bila ada link/text supaya accessible dan clickable
    var hasInteractive = Object.keys(data).some(function(k){ var s=data[k]; return s.link || s.text; });
    if(hasInteractive) layer.removeAttribute('aria-hidden');
    else layer.setAttribute('aria-hidden','true');
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
    var rt=null;window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(function(){if(editing){render(draft);}else relayout();},120);});
    window.addEventListener('orientationchange',function(){setTimeout(relayout,250);});
    // Zoom lock: desktop = 100%, mobile = 90%
    function applyZoomLock(){
      if(window.innerWidth>=1024){
        document.documentElement.style.zoom='1';
      }else if(window.innerWidth<600){
        document.documentElement.style.zoom='0.9';
      }
    }
    applyZoomLock();
    window.addEventListener('resize',applyZoomLock);
    window.addEventListener('wheel',function(e){if(e.ctrlKey){e.preventDefault();}},{ passive:false});
    window.addEventListener('touchstart',function(e){if(e.touches.length>1){e.preventDefault();}},{ passive:false});
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
    panel.innerHTML='<div class="sticker-panel-head" id="stkPanelDrag"><h3>Sticker H4SX</h3><span>⠿ Seret panel</span></div>'+
      '<p class="hint" id="stkDev"></p>'+
      '<label class="device-picker" for="stkDevice">Layout peranti<select class="form-input" id="stkDevice"><option value="d">PC</option><option value="t">Tablet</option><option value="m">Phone</option></select></label>'+
      '<p class="hint">Pilih PC, Tablet atau Phone di sini untuk edit semua layout terus dari PC. Preview akan ikut lebar peranti yang dipilih. Peranti yang belum diedit guna saiz auto.</p>'+
      '<p class="hint">Tampal link HTTPS gambar/GIF/PNG/WebP, tekan Tambah. Seret sticker untuk alih posisi. Pilih sticker, kemudian tarik bulatan biru di tepi untuk regang.</p>'+
      '<div class="row"><input class="form-input" id="stkUrl" type="url" placeholder="https://.../sticker.png"><button type="button" class="btn btn-primary" id="stkAdd">Tambah</button></div>'+
      '<div class="row" style="margin-top:10px"><input class="form-input" id="stkLink" type="url" placeholder="Pautan Link (pilihan)"><input class="form-input" id="stkText" type="text" placeholder="Text Sticker (pilihan)"></div>'+
      '<div class="row"><label class="stk-text-setting">Saiz text <input id="stkTextSize" type="range" min="8" max="96" value="24"><output id="stkTextSizeV">24px</output></label><label class="stk-text-setting">Warna <input id="stkTextColor" type="color" value="#ffffff"></label><select class="form-input" id="stkTextStyle"><option value="glow">Glow</option><option value="solid">Solid</option><option value="outline">Outline</option><option value="gradient">Gradient</option></select></div>'+
      '<div class="sticker-thumbs" id="stkThumbs"></div>'+
      '<label class="sl">Saiz<input id="stkW" type="range" min="4" max="90" step="1"><output id="stkWv"></output><button type="button" class="rs" data-rs="w" title="Reset saiz">↺</button></label>'+
      '<label class="sl">Putar<input id="stkR" type="range" min="-180" max="180" step="1"><output id="stkRv"></output><button type="button" class="rs" data-rs="r" title="Reset putaran">↺</button></label>'+
      '<label class="sl">Regang ↔<input id="stkX" type="range" min="0.2" max="4" step="0.05"><output id="stkXv"></output><button type="button" class="rs" data-rs="sx" title="Reset regang kiri kanan">↺</button></label>'+
      '<label class="sl">Regang ↕<input id="stkY" type="range" min="0.2" max="4" step="0.05"><output id="stkYv"></output><button type="button" class="rs" data-rs="sy" title="Reset regang atas bawah">↺</button></label>'+
      '<div class="acts"><button type="button" class="btn btn-secondary btn-sm" id="stkCopy">Salin</button>'+
      '<button type="button" class="btn btn-secondary btn-sm" id="stkFront" title="Bawa sticker ke depan">Ke depan ↑</button>'+
      '<button type="button" class="btn btn-secondary btn-sm" id="stkBack" title="Hantar sticker ke belakang">Ke belakang ↓</button>'+
      '<button type="button" class="btn btn-secondary btn-sm" id="stkResetAll">Reset semua</button>'+
      '<button type="button" class="btn btn-secondary btn-sm" id="stkResetPos">Reset posisi</button>'+
      '<button type="button" class="btn btn-danger btn-sm" id="stkDel">Padam</button>'+
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
    bindPanelDrag();
    $('#stkDevice').addEventListener('change',function(){
      editDevice=this.value;
      setDevicePreview();
      render(draft);
      syncControls();
    });
    $('#stkUrl').addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();addSticker();}});
    $('#stkW').oninput=function(){var s=selected&&W(selected);if(!s)return;s.w=+this.value;refreshEl(selected);syncControls();};
    $('#stkR').oninput=function(){var s=selected&&W(selected);if(!s)return;s.r=+this.value;refreshEl(selected);syncControls();};
    $('#stkX').oninput=function(){var s=selected&&W(selected);if(!s)return;s.sx=+this.value;refreshEl(selected);syncControls();};
    $('#stkY').oninput=function(){var s=selected&&W(selected);if(!s)return;s.sy=+this.value;refreshEl(selected);syncControls();};
    $('#stkLink').oninput=function(){var s=selected&&W(selected);if(!s)return;s.link=this.value;refreshEl(selected);};
    $('#stkText').oninput=function(){var s=selected&&W(selected);if(!s)return;s.text=this.value;refreshEl(selected);};
    $('#stkTextSize').oninput=function(){var s=selected&&W(selected);if(!s)return;s.textSize=+this.value;$('#stkTextSizeV').textContent=this.value+'px';refreshEl(selected);};
    $('#stkTextColor').oninput=function(){var s=selected&&W(selected);if(!s)return;s.textColor=this.value;refreshEl(selected);};
    $('#stkTextStyle').oninput=function(){var s=selected&&W(selected);if(!s)return;s.textStyle=this.value;refreshEl(selected);};
    $('#stkDel').onclick=function(){if(!selected)return;delete draft[selected];selected=null;render(draft);syncControls();};
    $('#stkCancel').onclick=function(){stopEdit();};
    $('#stkSave').onclick=save;
    panel.addEventListener('click',function(e){var b=e.target.closest('[data-rs]');if(b)resetProp(b.dataset.rs);});
    $('#stkCopy').onclick=copySticker;
    $('#stkFront').onclick=function(){moveLayer(1);};
    $('#stkBack').onclick=function(){moveLayer(-1);};
    $('#stkResetAll').onclick=function(){resetProp('all');};
    $('#stkResetPos').onclick=resetPos;
  }
  function startEdit(){
    if(editing||!panel)return;
    var m=document.getElementById('adminModal');
    if(m&&m.classList.contains('active')){var c=document.getElementById('closeModal');if(c)c.click();}
    draft=JSON.parse(JSON.stringify(saved));selected=null;editDevice=viewportDev();editing=true;
    originalWrapStyle={width:wrap.style.width,maxWidth:wrap.style.maxWidth,boxSizing:wrap.style.boxSizing};
    $('#stkDevice').value=editDevice;setDevicePreview();resetPanelPosition();
    document.body.classList.add('sticker-edit');panel.hidden=false;
    render(draft);syncControls();
  }
  function stopEdit(){
    editing=false;draft=null;selected=null;editDevice=null;
    if(originalWrapStyle){wrap.style.width=originalWrapStyle.width;wrap.style.maxWidth=originalWrapStyle.maxWidth;wrap.style.boxSizing=originalWrapStyle.boxSizing;originalWrapStyle=null;}
    document.body.classList.remove('sticker-edit');if(panel)panel.hidden=true;
    render(saved);
  }
  function setDevicePreview(){
    if(!editing||!wrap)return;
    var width=PREVIEW_W[editDevice];
    if(width){wrap.style.width=width+'px';wrap.style.maxWidth='none';wrap.style.boxSizing='border-box';}
    else if(originalWrapStyle){wrap.style.width=originalWrapStyle.width;wrap.style.maxWidth=originalWrapStyle.maxWidth;wrap.style.boxSizing=originalWrapStyle.boxSizing;}
  }
  function resetPanelPosition(){
    panel.style.left='';panel.style.top='';panel.style.right='';panel.style.bottom='';panel.style.transform='';
  }
  function bindPanelDrag(){
    var handle=$('#stkPanelDrag'),pid=null,startX=0,startY=0,startLeft=0,startTop=0;
    handle.addEventListener('pointerdown',function(e){
      if(e.button!==0)return;
      e.preventDefault();
      var rect=panel.getBoundingClientRect();
      panel.style.left=rect.left+'px';panel.style.top=rect.top+'px';
      panel.style.right='auto';panel.style.bottom='auto';panel.style.transform='none';
      pid=e.pointerId;startX=e.clientX;startY=e.clientY;startLeft=rect.left;startTop=rect.top;
      handle.setPointerCapture(pid);
    });
    handle.addEventListener('pointermove',function(e){
      if(pid!==e.pointerId)return;
      var maxLeft=Math.max(0,window.innerWidth-panel.offsetWidth);
      var maxTop=Math.max(0,window.innerHeight-Math.min(60,panel.offsetHeight));
      panel.style.left=Math.max(0,Math.min(maxLeft,startLeft+e.clientX-startX))+'px';
      panel.style.top=Math.max(0,Math.min(maxTop,startTop+e.clientY-startY))+'px';
    });
    function end(e){if(pid===e.pointerId)pid=null;}
    handle.addEventListener('pointerup',end);handle.addEventListener('pointercancel',end);
  }
  function stackedIds(){
    var ids=Object.keys(draft),order={};
    ids.forEach(function(id,i){order[id]=i;});
    return ids.sort(function(a,b){return draft[a].z-draft[b].z||order[a]-order[b];});
  }
  function topLayer(){
    var ids=stackedIds();
    ids.forEach(function(id,i){draft[id].z=i;});
    return ids.length;
  }
  function moveLayer(direction){
    if(!selected||!draft[selected])return;
    var ids=stackedIds(),from=ids.indexOf(selected),to=from+direction;
    if(to<0||to>=ids.length)return;
    ids.splice(from,1);ids.splice(to,0,selected);
    ids.forEach(function(id,i){draft[id].z=i;});
    render(draft);
    toast(direction>0?'Sticker dibawa ke depan':'Sticker dihantar ke belakang');
  }
  function refreshEl(id){
    var el=layer.querySelector('[data-id="'+id+'"]');if(el&&draft[id])place(el,R(id));
  }
  function syncControls(){
    var box=$('#stkThumbs');box.replaceChildren();
    Object.keys(draft).forEach(function(id){
      var b=document.createElement('button');b.type='button';b.title='Pilih';
      b.style.backgroundImage='url("'+draft[id].url.replace(/"/g,'%22')+'")';
      if(id===selected)b.className='on';
      b.onclick=function(){select(id);};box.appendChild(b);
    });
    var s=draft[selected]?R(selected):null,w=$('#stkW'),r=$('#stkR'),x=$('#stkX'),y=$('#stkY');
    $('#stkDev').textContent='Layout: '+DEVNAME[dev()]+' · Preview '+Math.round(wrapW())+'px';
    w.disabled=r.disabled=x.disabled=y.disabled=$('#stkDel').disabled=!s;
    panel.querySelectorAll('[data-rs],#stkCopy,#stkResetAll,#stkResetPos').forEach(function(b){b.disabled=!s;});
    var ids=stackedIds(),stackIndex=ids.indexOf(selected);
    $('#stkFront').disabled=!s||stackIndex===ids.length-1;
    $('#stkBack').disabled=!s||stackIndex<=0;
    if(s){
      w.value=s.w;r.value=s.r;x.value=s.sx||1;y.value=s.sy||1;
      $('#stkLink').value=s.link||'';
      $('#stkText').value=s.text||'';
      $('#stkTextSize').value=s.textSize||24;
      $('#stkTextSizeV').textContent=(s.textSize||24)+'px';
      $('#stkTextColor').value=/^#[0-9a-f]{6}$/i.test(s.textColor||'')?s.textColor:'#ffffff';
      $('#stkTextStyle').value=['glow','solid','outline','gradient'].includes(s.textStyle)?s.textStyle:'glow';
      $('#stkWv').textContent=Math.round(s.w)+'%';$('#stkRv').textContent=Math.round(s.r)+'\u00b0';$('#stkXv').textContent=Math.round((s.sx||1)*100)+'%';$('#stkYv').textContent=Math.round((s.sy||1)*100)+'%';
    }
    else{$('#stkLink').value='';$('#stkText').value='';$('#stkWv').textContent='';$('#stkRv').textContent='';$('#stkXv').textContent='';$('#stkYv').textContent='';}
    layer.querySelectorAll('.h4sx-sticker').forEach(function(el){el.classList.toggle('selected',el.dataset.id===selected);});
  }
  function select(id){selected=id;syncControls();}
  var RESET=null;
  function resetProp(k){
    var s=selected&&draft&&W(selected);if(!s)return;
    var D={w:defW(),r:0,sx:1,sy:1};
    if(k==='all')Object.keys(D).forEach(function(p){s[p]=D[p];});
    else if(k in D)s[k]=D[k];
    refreshEl(selected);syncControls();
  }
  function resetPos(){
    var s=selected&&draft&&W(selected);if(!s)return;
    s.x=50;s.y=Math.round(Math.max(40,window.scrollY-(wrap.getBoundingClientRect().top+window.scrollY)+140));
    refreshEl(selected);
  }
  function copySticker(){
    var s=selected&&draft&&draft[selected];if(!s)return;
    if(Object.keys(draft).length>=MAX){toast('Maksimum '+MAX+' sticker.','warning');return;}
    var id=uid(),c=JSON.parse(JSON.stringify(s));
    c.z=topLayer();
    function shift(v){v.x=Math.min(130,v.x+5);v.y=Math.min(6000,v.y+30);}
    shift(c);if(c.o)Object.keys(c.o).forEach(function(k){shift(c.o[k]);});
    draft[id]=c;selected=id;render(draft);toast('Sticker disalin');
  }
  function addSticker(){
    var inp=$('#stkUrl'),url=safeUrl(inp.value),link=$('#stkLink').value.trim(),text=$('#stkText').value.trim();
    if(!url && !text){toast('Link gambar atau text mesti diisi.','warning');return;}
    if(Object.keys(draft).length>=MAX){toast('Maksimum '+MAX+' sticker.','warning');return;}
    var id=uid(),top=window.scrollY-(wrap.getBoundingClientRect().top+window.scrollY)+140;
    var s=draft[id]={url:url,link:safeUrl(link),text:text,textSize:+$('#stkTextSize').value||24,textColor:$('#stkTextColor').value||'#ffffff',textStyle:$('#stkTextStyle').value||'glow',x:50,y:Math.round(Math.max(40,top)),w:22,r:0,sx:1,sy:1,z:topLayer()};
    var k=dev();if(k!=='d'){s.o={};s.o[k]={x:50,y:s.y,w:defW(),r:0,sx:1,sy:1,link:s.link,text:s.text};}
    inp.value='';$('#stkLink').value='';$('#stkText').value='';selected=id;render(draft);syncControls();
  }
  function bindDrag(){
    layer.querySelectorAll('.h4sx-sticker').forEach(function(el){
      var id=el.dataset.id,sx,sy,ox,oy,pid=null;
      el.addEventListener('pointerdown',function(e){
        if(e.button>0)return;
        e.preventDefault();pid=e.pointerId;el.setPointerCapture(pid);
        var v=W(id);
        el.classList.add('dragging');sx=e.clientX;sy=e.clientY;ox=v.x;oy=v.y;
        if(selected!==id)select(id);
      });
      el.addEventListener('pointermove',function(e){
        if(pid!==e.pointerId)return;
        var rw=wrap.getBoundingClientRect().width||1,s=W(id);
        s.x=Math.round(Math.min(130,Math.max(-30,ox+(e.clientX-sx)/rw*100))*10)/10;
        s.y=Math.round(Math.min(6000,Math.max(-200,oy+(e.clientY-sy))));
        place(el,s);
      });
      function end(e){if(pid!==e.pointerId)return;pid=null;el.classList.remove('dragging');}
      el.addEventListener('pointerup',end);el.addEventListener('pointercancel',end);
      bindHandles(el,id);
    });
    syncControls();
  }
  function bindHandles(el,id){
    el.querySelectorAll('.stk-h').forEach(function(h){
      var pid=null,sx,sy,s0,W0,H0,rw,c,n,side=h.dataset.h,horiz=side==='l'||side==='r',dir=(side==='r'||side==='b')?1:-1;
      h.addEventListener('pointerdown',function(e){
        e.preventDefault();e.stopPropagation();pid=e.pointerId;h.setPointerCapture(pid);
        if(selected!==id)select(id);
        s0=JSON.parse(JSON.stringify(W(id)));sx=e.clientX;sy=e.clientY;
        W0=Math.max(20,el.offsetWidth);H0=Math.max(20,el.offsetHeight);
        rw=wrap.getBoundingClientRect().width||1;
        var a=s0.r*Math.PI/180;c=Math.cos(a);n=Math.sin(a);
      });
      h.addEventListener('pointermove',function(e){
        if(pid!==e.pointerId)return;
        var dx=e.clientX-sx,dy=e.clientY-sy,s=W(id),base=horiz?W0:H0,k=horiz?'sx':'sy';
        var d=horiz?(dx*c+dy*n):(-dx*n+dy*c);
        var start=s0[k]||1,next=Math.min(4,Math.max(0.2,start+dir*d/base));
        var move=dir*(next-start)*base/2;
        var vx=horiz?c*move:-n*move,vy=horiz?n*move:c*move;
        s[k]=Math.round(next*100)/100;
        s.x=Math.round(Math.min(130,Math.max(-30,s0.x+vx/rw*100))*10)/10;
        s.y=Math.round(Math.min(6000,Math.max(-200,s0.y+vy)));
        place(el,s);syncValues();
      });
      function end(e){if(pid===e.pointerId)pid=null;}
      h.addEventListener('pointerup',end);h.addEventListener('pointercancel',end);
    });
  }
  function syncValues(){
    var s=draft[selected]&&R(selected);if(!s)return;
    $('#stkX').value=s.sx||1;$('#stkY').value=s.sy||1;
    $('#stkXv').textContent=Math.round((s.sx||1)*100)+'%';$('#stkYv').textContent=Math.round((s.sy||1)*100)+'%';
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
