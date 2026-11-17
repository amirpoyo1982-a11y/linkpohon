/* H4SX profile style: name colour + badges. Independent of app.js. */
(function(){
  'use strict';
  var PATH='gateway_data/settings/profileStyle', CACHE='h4sx_profile_style';
  var DEF={nameOn:false,a:'#ff6fb5',b:'#72e8ff',grad:true,frameUrl:'https://i.postimg.cc/3xg258tL/image.png',badges:{owner:true,dev:true,html:true,css:true}};
  var SVG={
    owner:'<svg viewBox="0 0 24 24" fill="#3b2300"><path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5L3 8z"/><rect x="5" y="20" width="14" height="2" rx="1"/></svg>',
    dev:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/></svg>',
    html:'<svg viewBox="0 0 24 24" fill="#f16529"><path d="M3 2h18l-1.6 18L12 22l-7.4-2L3 2z"/><path d="M8 8h8M8.4 12h7M9 16l3 1 3-1" stroke="#fff" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    css:'<svg viewBox="0 0 24 24" fill="#2196f3"><path d="M3 2h18l-1.6 18L12 22l-7.4-2L3 2z"/><path d="M16 8H8.6l.4 4h6.4l-.5 4-2.9 1-2.9-1" stroke="#fff" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };
  var LABEL={owner:'Owner',dev:'Developer',html:'HTML',css:'CSS'};
  var ORDER=['owner','dev','html','css'];
  var cur=null, ref=null, box=null, form=null;

  function hex(v,d){return /^#[0-9a-f]{6}$/i.test(String(v||''))?String(v).toLowerCase():d;}
  function safeUrl(v){
    try{var u=new URL(String(v||'').trim());return u.protocol==='https:'&&!u.username&&!u.password?u.href:'';}catch(e){return '';}
  }
  function clean(raw){
    var r=raw&&typeof raw==='object'?raw:{},b=r.badges&&typeof r.badges==='object'?r.badges:{};
    var out={nameOn:r.nameOn===true,a:hex(r.a,DEF.a),b:hex(r.b,DEF.b),grad:r.grad!==false,
      frameUrl:r.frameUrl===undefined?DEF.frameUrl:safeUrl(r.frameUrl),badges:{}};
    ORDER.forEach(function(k){out.badges[k]=(k in b)?b[k]===true:DEF.badges[k];});
    return out;
  }
  function applyName(s){
    var el=document.getElementById('profileName');if(!el)return;
    el.classList.toggle('has-name-color',s.nameOn&&!s.grad);
    el.classList.toggle('has-name-gradient',s.nameOn&&s.grad);
    el.style.setProperty('--name-a',s.a);el.style.setProperty('--name-b',s.b);
  }
  function applyFrame(s){
    var frame=document.getElementById('avatarFrame');if(!frame)return;
    var img=frame.querySelector('img');
    if(!img){
      img=document.createElement('img');img.alt='';img.referrerPolicy='no-referrer';
      img.addEventListener('error',function(){img.dataset.failedSrc=img.dataset.src;frame.hidden=true;});
      frame.appendChild(img);
    }
    if(s.frameUrl&&img.dataset.src!==s.frameUrl){img.dataset.failedSrc='';img.dataset.src=s.frameUrl;img.src=s.frameUrl;}
    frame.hidden=!s.frameUrl||img.dataset.failedSrc===s.frameUrl;
  }
  function renderBadges(s){
    if(!box)return;
    var frag=document.createDocumentFragment();
    ORDER.forEach(function(k){
      if(!s.badges[k])return;
      var d=document.createElement('span');d.className='h4sx-badge '+k;
      d.innerHTML='<span class="bi" aria-hidden="true">'+SVG[k]+'</span><span>'+LABEL[k]+'</span>';
      frag.appendChild(d);
    });
    box.replaceChildren(frag);
  }
  function apply(s){cur=s;applyName(s);applyFrame(s);renderBadges(s);}
  function mount(){
    var anchor=document.querySelector('.profile-copy .profile-badges');
    if(!anchor)return false;
    box=document.createElement('div');box.className='h4sx-badges';box.setAttribute('aria-label','Lencana profil');
    anchor.insertAdjacentElement('afterend',box);return true;
  }
  function whenFirebase(cb,n){
    n=n||0;
    if(window.firebase&&firebase.apps&&firebase.apps.length)return cb();
    if(n<80)setTimeout(function(){whenFirebase(cb,n+1);},150);
  }
  function toast(m,t){var el=document.getElementById('toast');if(!el)return;el.textContent=m;el.className='toast '+(t||'');el.classList.add('show');setTimeout(function(){el.classList.remove('show');},2500);}
  window.__h4sxProfile={_clean:clean};
  function init(){
    if(!mount())return;
    var c=null;try{c=JSON.parse(localStorage.getItem(CACHE)||'null');}catch(e){}
    apply(clean(c));
    whenFirebase(function(){
      ref=firebase.database().ref(PATH);
      ref.on('value',function(snap){
        var s=clean(snap.val());apply(s);
        try{localStorage.setItem(CACHE,JSON.stringify(s));}catch(e){}
        if(form)fillForm(s);
      },function(){});
      buildForm();
    });
  }
  function buildForm(){
    var tab=document.getElementById('tab-profile');
    if(!tab||form)return;
    form=document.createElement('div');form.className='h4sx-pstyle';
    var checks=ORDER.map(function(k){
      return '<label class="ck"><input type="checkbox" data-b="'+k+'"> Badge '+LABEL[k]+'</label>';
    }).join('');
    form.innerHTML='<h4>Warna nama, bingkai &amp; badge</h4>'+
      '<label class="ck"><input type="checkbox" id="pnOn"> Guna warna nama custom</label>'+
      '<div class="pr"><label>Warna 1 <input type="color" id="pnA"></label><label>Warna 2 <input type="color" id="pnB"></label></div>'+
      '<label class="ck"><input type="checkbox" id="pnGrad"> Gradient bergerak (guna 2 warna)</label>'+
      '<label class="frame-label" for="pnFrame">URL bingkai profil</label>'+
      '<input class="frame-url form-input" type="url" id="pnFrame" placeholder="https://.../bingkai.png">'+
      '<small class="frame-help">Guna link terus HTTPS. Kosongkan URL untuk buang bingkai.</small>'+
      '<div class="pr" style="flex-direction:column;align-items:flex-start;gap:2px">'+checks+'</div>'+
      '<button type="button" class="btn btn-primary" id="pnSave">Simpan gaya profil</button>';
    tab.insertBefore(form,document.getElementById('saveProfileBtn'));
    form.addEventListener('input',function(){apply(read());});
    form.querySelector('#pnSave').onclick=save;
    fillForm(cur||clean(null));
  }
  function fillForm(s){
    form.querySelector('#pnOn').checked=s.nameOn;
    form.querySelector('#pnA').value=s.a;form.querySelector('#pnB').value=s.b;
    form.querySelector('#pnGrad').checked=s.grad;
    form.querySelector('#pnFrame').value=s.frameUrl;
    ORDER.forEach(function(k){form.querySelector('[data-b="'+k+'"]').checked=!!s.badges[k];});
  }
  function read(){
    var b={};
    ORDER.forEach(function(k){b[k]=form.querySelector('[data-b="'+k+'"]').checked;});
    return clean({nameOn:form.querySelector('#pnOn').checked,a:form.querySelector('#pnA').value,
      b:form.querySelector('#pnB').value,grad:form.querySelector('#pnGrad').checked,
      frameUrl:form.querySelector('#pnFrame').value,badges:b});
  }
  function save(){
    var frameValue=form.querySelector('#pnFrame').value.trim();
    if(frameValue&&!safeUrl(frameValue)){toast('URL bingkai mesti link HTTPS yang sah.','error');return;}
    var btn=form.querySelector('#pnSave'),s=read();btn.disabled=true;
    ref.set(s).then(function(){
      try{localStorage.setItem(CACHE,JSON.stringify(s));}catch(e){}
      toast('Gaya profil disimpan!');
    }).catch(function(e){
      toast(e&&e.code==='PERMISSION_DENIED'?'Akses simpan ditolak. Login admin dahulu.':'Gagal simpan.','error');
    }).then(function(){btn.disabled=false;});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
