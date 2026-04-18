(function(){
  var frame=document.getElementById("aboutFrame");
  var hotspot=document.getElementById("chartHotspot");
  var txt=document.getElementById("bubbleText");
  if(!frame||!hotspot||!txt)return;
  var fired=false;
  var frases=[
    "Ent\u00e3o voc\u00ea quer se tornar um Jogador?",
    "Lucro \u00e9 pra quem compra cedo. Voc\u00ea chegou na hora?",
    "1000x n\u00e3o vem batendo na porta... ele j\u00e1 entrou.",
    "Voc\u00ea veio passear ou veio ficar rico?",
    "O gr\u00e1fico s\u00f3 sobe pra quem t\u00e1 dentro.",
    "This ain't gambling. This is street smart.",
    "Seu futuro t\u00e1 esperando voc\u00ea apertar o bot\u00e3o.",
    "A carteira n\u00e3o enche sozinha, parceiro.",
    "N\u00e3o \u00e9 sorte. \u00c9 estrat\u00e9gia.",
    "No risk, no reward. No balls, no gains.",
    "Voc\u00ea ainda t\u00e1 de fora? Corre!",
    "O pr\u00f3ximo bull run come\u00e7a com uma decis\u00e3o.",
    "Voc\u00ea quer esperar mais ou entrar agora?",
    "O gr\u00e1fico n\u00e3o mente. Voc\u00ea ainda duvida?",
    "T\u00e1 esperando o qu\u00ea? A lua n\u00e3o espera.",
    "Every second out is a pump missed.",
    "Memecoin n\u00e3o \u00e9 brincadeira. \u00c9 revolu\u00e7\u00e3o.",
    "GrokBRCoin: a IA que fala a l\u00edngua do povo.",
    "Enquanto voc\u00ea hesita, outro est\u00e1 comprando.",
    "Zero BS. 100% real pump energy.",
    "Voc\u00ea t\u00e1 aqui por acaso? Acho que n\u00e3o.",
    "Os early adopters sempre riem por \u00faltimo."
  ];
  var timer1,timer2;
  hotspot.addEventListener("mouseenter",function(){
    if(fired)return;
    fired=true;
    frame.classList.add("chart-active");
    txt.style.opacity="1";
    txt.textContent="...";
    timer1=setTimeout(function(){
      txt.style.transition="opacity 0.8s ease";
      txt.style.opacity="0";
      timer2=setTimeout(function(){
        var frase=frases[Math.floor(Math.random()*frases.length)];
        txt.textContent=frase;
        txt.style.opacity="1";
      },800);
    },5000);
  });
  hotspot.addEventListener("mouseleave",function(){
    if(!fired)return;
    frame.classList.remove("chart-active");
    clearTimeout(timer1);clearTimeout(timer2);
  });
})();

(function(){
  // Reveal uma única vez (evita flicker quando o usuário rola pra cima de novo).
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  },{threshold:.12,rootMargin:'0px 0px -40px 0px'});

  function addReveal(sel,cls,stagger){
    document.querySelectorAll(sel).forEach(function(el,i){
      el.classList.add(cls);
      if(stagger)el.classList.add('stagger-'+Math.min(i+1,5));
      obs.observe(el);
    });
  }

  addReveal('.section-h2','reveal',false);
  addReveal('.section-label','reveal',false);
  addReveal('.section-lead','reveal',false);
  addReveal('.cta-h2','reveal',false);
  addReveal('.cta-sub','reveal',false);
  addReveal('.tok-card','reveal',true);
  addReveal('.htb-card','reveal',true);
  addReveal('.feat','reveal-left',true);
  addReveal('.about-img-frame','reveal-right',false);
  addReveal('.meme-item','reveal',true);
  addReveal('.distrib-wrap','reveal',false);
  addReveal('.hero-tag','reveal',false);
  addReveal('.hero-tagline','reveal',false);
  addReveal('.hero-desc','reveal',false);
  addReveal('.hero-actions','reveal',false);
  addReveal('.hero-pills','reveal',false);
  addReveal('.tok-header','reveal',false);
  addReveal('.meme-header','reveal',false);
  addReveal('#chat .section-h2','reveal',false);
  addReveal('#chat .section-label','reveal',false);
  addReveal('#chat .section-lead','reveal',false);
  addReveal('.chat-wrap','reveal',false);
})();


// ─── HERO TITLE: float hover (mobile/tablet only) ───
(function(){
  var h1 = document.querySelector('.hero-h1');
  if(!h1) return;
  // no desktop o h1 já tem animação contínua via CSS — não interfere
  if(window.innerWidth >= 961) return;
  var ANIM = 'float-title 2s ease-in-out infinite';
  var returning = false;

  h1.addEventListener('mouseenter', function(){
    if(returning){
      clearTimeout(h1._returnTimer);
      h1.style.transition = '';
      h1.style.transform  = '';
      returning = false;
    }
    h1.style.animation = ANIM;
  });

  h1.addEventListener('mouseleave', function(){
    var cur = getComputedStyle(h1).transform;
    h1.style.animation  = 'none';
    h1.style.transform  = cur;
    void h1.offsetWidth;
    returning = true;
    h1.style.transition = 'transform 0.65s cubic-bezier(0.25,1,0.5,1)';
    h1.style.transform  = 'translateY(0) rotate(0deg) scale(1)';
    h1._returnTimer = setTimeout(function(){
      h1.style.transition = '';
      h1.style.transform  = '';
      returning = false;
    }, 680);
  });
})();

(function(){
  const btn = document.getElementById('sticky-uni');
  if(!btn) return;
  window.addEventListener('scroll', function(){
    if(window.scrollY > 400) btn.classList.add('show');
    else btn.classList.remove('show');
  }, {passive:true});
})();

// Web3 Connect Wallet (nav button)
(function(){
  const btn = document.getElementById('navConnect');
  if(!btn) return;
  const savedWallet = localStorage.getItem('grokbr_wallet');
  if(savedWallet){
    btn.innerHTML = '✅ ' + savedWallet.slice(0,6) + '...' + savedWallet.slice(-4);
    btn.classList.add('nav-connected');
  }
  window.navConnectWallet = async function(){
    if(savedWallet){
      window.location.href = 'chat.html';
      return;
    }
    if(!window.ethereum){
      alert('MetaMask não detectado. Instale em metamask.io');
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const wallet = accounts[0].toLowerCase();
      localStorage.setItem('grokbr_wallet', wallet);
      btn.innerHTML = '✅ ' + wallet.slice(0,6) + '...' + wallet.slice(-4);
      btn.classList.add('nav-connected');
      const walletInput = document.getElementById('walletInput');
      if(walletInput) walletInput.value = wallet;
    } catch(e){
      console.warn('wallet connect cancelled', e);
    }
  };
})();

// Referral system
(function(){
  const params = new URLSearchParams(window.location.search);
  const incomingRef = params.get('ref');
  if(incomingRef){
    const used = localStorage.getItem('grokbr_referred_by');
    if(!used){
      localStorage.setItem('grokbr_referred_by', incomingRef);
      // increment the counter for the referrer (local demo)
      const allRefs = JSON.parse(localStorage.getItem('grokbr_ref_counts') || '{}');
      allRefs[incomingRef] = (allRefs[incomingRef] || 0) + 1;
      localStorage.setItem('grokbr_ref_counts', JSON.stringify(allRefs));
    }
  }

  function getOrCreateMyCode(){
    let code = localStorage.getItem('grokbr_my_ref');
    if(!code){
      code = 'GR' + Math.random().toString(36).substring(2, 8).toUpperCase();
      localStorage.setItem('grokbr_my_ref', code);
    }
    return code;
  }

  function updateRefUI(){
    const myCode = getOrCreateMyCode();
    const link = window.location.origin + window.location.pathname + '?ref=' + myCode;
    const linkEl = document.getElementById('refLink');
    if(linkEl) linkEl.textContent = link;
    const allRefs = JSON.parse(localStorage.getItem('grokbr_ref_counts') || '{}');
    const myCount = allRefs[myCode] || 0;
    const countEl = document.getElementById('refCount');
    const bonusEl = document.getElementById('refBonus');
    if(countEl) countEl.textContent = myCount;
    if(bonusEl) bonusEl.textContent = (myCount * 100000).toLocaleString('pt-BR');
  }
  updateRefUI();

  window.copyRef = function(){
    const link = document.getElementById('refLink').textContent;
    const btn = document.getElementById('refCopyBtn');
    const icon = btn.querySelector('.rc-icon');
    const txt = btn.querySelector('.rc-text');
    navigator.clipboard.writeText(link).then(() => {
      icon.textContent = '✓';
      txt.textContent = 'Copiado!';
      btn.classList.add('copied');
      setTimeout(() => {
        icon.textContent = '⧉';
        txt.textContent = 'Copiar';
        btn.classList.remove('copied');
      }, 2000);
    });
  };

  window.shareRef = function(platform){
    const link = document.getElementById('refLink').textContent;
    const text = 'Acabei de entrar no airdrop do $GROKBR 🚀 Cola comigo e ganhe 1M tokens grátis no launch:';
    const urls = {
      twitter: 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text + ' ' + link),
      telegram: 'https://t.me/share/url?url=' + encodeURIComponent(link) + '&text=' + encodeURIComponent(text),
      whatsapp: 'https://wa.me/?text=' + encodeURIComponent(text + ' ' + link)
    };
    if(urls[platform]) window.open(urls[platform], '_blank', 'noopener,noreferrer');
  };

  window.switchAirdropTab = function(tab){
    document.querySelectorAll('.at-tab').forEach(t => t.classList.remove('at-active'));
    document.querySelectorAll('.at-content').forEach(c => c.classList.remove('at-visible'));
    document.querySelector('.at-tab[data-tab="'+tab+'"]').classList.add('at-active');
    document.getElementById(tab === 'email' ? 'atEmail' : 'atRef').classList.add('at-visible');
  };
})();

// Airdrop email submit — saves to Firestore
window.submitAirdrop = async function(){
  const emailInput = document.getElementById('emailInput');
  const walletInput = document.getElementById('walletInput');
  const errEl = document.getElementById('emailError');
  const btn = document.getElementById('airdropBtn');
  const email = emailInput.value.trim().toLowerCase();
  const wallet = walletInput.value.trim().toLowerCase();

  errEl.textContent = '';
  errEl.className = 'at-hint';

  if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    errEl.textContent = 'Email inválido. Digita um email que funcione.';
    errEl.className = 'at-hint at-hint-err';
    return;
  }
  if(wallet && !/^0x[a-fA-F0-9]{40}$/.test(wallet)){
    errEl.textContent = 'Wallet inválida (deve começar com 0x e ter 42 caracteres).';
    errEl.className = 'at-hint at-hint-err';
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Salvando...';

  const payload = {
    email,
    wallet: wallet || null,
    ref: localStorage.getItem('grokbr_referred_by') || null,
    myRef: localStorage.getItem('grokbr_my_ref') || null,
    ts: Date.now(),
    date: new Date().toISOString(),
    userAgent: navigator.userAgent.substring(0, 120)
  };

  try {
    const { initializeApp, getApps } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js');
    const { getFirestore, doc, setDoc, getDoc } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');
    const config = {
      apiKey: "AIzaSyAe4U7a9EhgBl0u4Ku_k7m3QLIcUmFKfcc",
      authDomain: "projeto-8c65b.firebaseapp.com",
      projectId: "projeto-8c65b"
    };
    const app = getApps().length ? getApps()[0] : initializeApp(config);
    const db = getFirestore(app);
    const ref = doc(db, 'waitlist', email.replace(/[^a-z0-9]/g, '_'));
    const existing = await getDoc(ref);
    if(existing.exists()){
      errEl.textContent = 'Esse email já tá na lista 😎';
      errEl.className = 'at-hint at-hint-ok';
      btn.disabled = false;
      btn.textContent = '🚀 Garantir Meus 1M Tokens';
      return;
    }
    await setDoc(ref, payload);
  } catch(err) {
    // Fallback: localStorage only
    console.warn('Firebase save failed, using localStorage:', err);
    const waitlist = JSON.parse(localStorage.getItem('grokbr_waitlist') || '[]');
    waitlist.push(payload);
    localStorage.setItem('grokbr_waitlist', JSON.stringify(waitlist));
  }

  // Always store locally too (so thank-you page can show the email)
  localStorage.setItem('grokbr_signup_email', email);
  localStorage.setItem('grokbr_signup_ts', String(Date.now()));

  btn.disabled = false;
  btn.textContent = '✅ Vaga Garantida!';
  btn.classList.add('at-submitted');
  emailInput.value = '';
  // Redirect to thank you page
  setTimeout(() => {
    window.location.href = 'obrigado.html';
  }, 800);
};

// Live stats widget (pausa quando aba está oculta pra economizar CPU/bateria)
(function(){
  const holdersEl = document.getElementById('lsHolders');
  const lastEl = document.getElementById('lsLast');
  const onlineEl = document.getElementById('lsOnline');
  if(!holdersEl) return;

  let holders = parseInt(localStorage.getItem('grokbr_holders') || '847', 10);
  let lastSignupAt = Date.now() - 3000;
  let online = 73;
  let tickIv = null, onlineIv = null, signupTo = null;

  function render(){
    holdersEl.textContent = holders.toLocaleString('pt-BR');
    const diff = Math.floor((Date.now() - lastSignupAt) / 1000);
    lastEl.textContent = diff < 60 ? diff + 's atrás'
                       : diff < 3600 ? Math.floor(diff/60) + 'min atrás'
                       : 'há mais de 1h';
    onlineEl.textContent = online;
  }

  function scheduleSignup(){
    const delay = 15000 + Math.random() * 30000;
    signupTo = setTimeout(() => {
      holders += 1;
      lastSignupAt = Date.now();
      localStorage.setItem('grokbr_holders', String(holders));
      holdersEl.classList.add('ls-bump');
      setTimeout(() => holdersEl.classList.remove('ls-bump'), 600);
      scheduleSignup();
    }, delay);
  }

  function start(){
    if(tickIv) return;
    render();
    tickIv = setInterval(render, 1000);
    onlineIv = setInterval(() => {
      const delta = Math.floor(Math.random() * 7) - 3;
      online = Math.max(45, Math.min(120, online + delta));
    }, 6000);
    scheduleSignup();
  }

  function stop(){
    clearInterval(tickIv); tickIv = null;
    clearInterval(onlineIv); onlineIv = null;
    clearTimeout(signupTo); signupTo = null;
  }

  document.addEventListener('visibilitychange', () => {
    document.hidden ? stop() : start();
  });
  start();
})();

window.toggleLiveStats = function(){
  const w = document.getElementById('liveStats');
  if(!w) return;
  w.classList.toggle('ls-minimized');
  const btn = w.querySelector('.ls-toggle');
  if(btn) btn.textContent = w.classList.contains('ls-minimized') ? '+' : '−';
};

// Sound ambient toggle
(function(){
  const btn = document.getElementById('soundToggle');
  const icon = document.getElementById('soundIcon');
  if(!btn) return;
  let audio = null;
  let playing = false;
  window.toggleSound = function(){
    if(!audio){
      audio = document.createElement('audio');
      audio.loop = true;
      audio.volume = 0.15;
      audio.src = 'https://cdn.pixabay.com/audio/2023/03/21/audio_f5ed76a1a4.mp3';
      document.body.appendChild(audio);
    }
    if(playing){
      audio.pause();
      icon.textContent = '🔇';
      btn.classList.remove('playing');
    } else {
      audio.play().then(() => {
        icon.textContent = '🔊';
        btn.classList.add('playing');
      }).catch(() => {
        icon.textContent = '🔇';
      });
    }
    playing = !playing;
  };
})();

// Launch countdown banner
(function(){
  const target = localStorage.getItem('grokbr_launch_target') || (() => {
    const t = Date.now() + (14 * 86400000); // 14 days from now
    localStorage.setItem('grokbr_launch_target', String(t));
    return String(t);
  })();
  const targetTime = parseInt(target, 10);
  const banner = document.getElementById('launchBanner');
  if(localStorage.getItem('grokbr_launch_closed') === '1' && banner) banner.style.display = 'none';
  const dEl = document.getElementById('lcDays');
  const hEl = document.getElementById('lcHours');
  const mEl = document.getElementById('lcMins');
  const sEl = document.getElementById('lcSecs');
  function pad(n){return n < 10 ? '0' + n : '' + n}
  function tick(){
    const diff = Math.max(0, targetTime - Date.now());
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    if(dEl) dEl.textContent = pad(days);
    if(hEl) hEl.textContent = pad(hours);
    if(mEl) mEl.textContent = pad(mins);
    if(sEl) sEl.textContent = pad(secs);
  }
  tick(); setInterval(tick, 1000);
})();

window.closeLaunchBanner = function(){
  const b = document.getElementById('launchBanner');
  if(b) b.style.display = 'none';
  localStorage.setItem('grokbr_launch_closed', '1');
};

// Exit intent popup
(function(){
  let shown = localStorage.getItem('grokbr_exit_shown') === '1';
  const overlay = document.getElementById('exitOverlay');
  if(!overlay) return;
  function show(){
    if(shown) return;
    shown = true;
    localStorage.setItem('grokbr_exit_shown', '1');
    overlay.classList.add('open');
  }
  document.addEventListener('mouseleave', function(e){
    if(e.clientY < 10 && !shown) show();
  });
  // Mobile fallback: show after 45s of scrolling
  let scrolled = false;
  window.addEventListener('scroll', function(){
    if(!scrolled && window.scrollY > 800){
      scrolled = true;
      setTimeout(show, 45000);
    }
  }, {passive:true});
  overlay.addEventListener('click', function(e){
    if(e.target === overlay) window.closeExit();
  });
})();

window.closeExit = function(){
  const o = document.getElementById('exitOverlay');
  if(o) o.classList.remove('open');
};

// ─── Copy-to-clipboard genérico ───
// Cobre os dois botões de CA (card detalhado e strip) via config.
async function copyToClipboard(text){
  if(!text) return false;
  try {
    if(navigator.clipboard && window.isSecureContext){
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch(_){ /* fallback abaixo */ }
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly','');
  ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch(_){}
  ta.remove();
  return ok;
}

function wireCaCopy(opts){
  const { addrId, btnId, labelSel, iconSel, originalLabel, originalIcon } = opts;
  const addr = document.getElementById(addrId);
  const btn = document.getElementById(btnId);
  if(!addr || !btn) return;
  // Placeholder pendente: desabilita copiar até CA real estar publicado
  if(addr.dataset.pending === '1'){
    btn.disabled = true;
    return;
  }
  btn.addEventListener('click', async () => {
    if(btn.disabled) return;
    const text = (addr.textContent || '').trim();
    const ok = await copyToClipboard(text);
    const label = labelSel ? btn.querySelector(labelSel) : null;
    const icon = iconSel ? btn.querySelector(iconSel) : null;
    btn.classList.toggle('copied', ok);
    if(label) label.textContent = ok ? 'Copiado!' : 'Erro';
    if(icon) icon.textContent = ok ? '✓' : '✕';
    btn.setAttribute('aria-label', ok ? 'Endereço copiado' : 'Falha ao copiar');
    setTimeout(() => {
      btn.classList.remove('copied');
      if(label) label.textContent = originalLabel;
      if(icon) icon.textContent = originalIcon;
      btn.setAttribute('aria-label','Copiar endereço do contrato');
    }, 2000);
  });
}

wireCaCopy({ addrId:'contractAddress', btnId:'copyCaBtn',
             labelSel:'.copy-text', iconSel:'.copy-icon',
             originalLabel:'Copiar', originalIcon:'⧉' });
wireCaCopy({ addrId:'caStripAddress', btnId:'caStripCopyBtn',
             labelSel:'.ca-strip-copy-text', iconSel:null,
             originalLabel:'Copiar CA', originalIcon:null });

// Legacy inline onclick handlers (mantém compat com HTML existente).
window.copyCa = function(){ document.getElementById('copyCaBtn')?.click(); };
window.copyCaTop = function(){ document.getElementById('caStripCopyBtn')?.click(); };