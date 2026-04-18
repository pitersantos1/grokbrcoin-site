// --- TOAST NOTIFICATIONS ---
(function(){
  var H='0123456789abcdef';
  var shown=new Set();
  function rHex(n){var s='';for(var i=0;i<n;i++)s+=H[Math.floor(Math.random()*16)];return s;}
  function rWallet(){return '0x'+rHex(6)+'...'+rHex(4);}
  var CITIES=['São Paulo','Rio de Janeiro','Belo Horizonte','Curitiba','Porto Alegre','Brasília','Salvador','Recife','Fortaleza','Goiânia','Manaus','Florianópolis','Campinas','Santos','Niterói'];
  function rCity(){return CITIES[Math.floor(Math.random()*CITIES.length)];}
  var ACTIONS=['entrou na waitlist','garantiu vaga VIP','entrou no grupo','reservou holder fundador','conectou wallet'];
  var TIMES=['agora mesmo','há 3s','há poucos segundos','há 12s','há 1min'];
  function dismiss(el){
    el.classList.remove('bt-show','bt-hover');
    setTimeout(function(){if(el.parentNode)el.parentNode.removeChild(el);},500);
  }
  function flyAway(el,side){
    el.classList.remove('bt-show','bt-hover');
    el.classList.add('bt-fly-'+side);
    setTimeout(function(){if(el.parentNode)el.parentNode.removeChild(el);},700);
  }
  function createToast(){
    var w=rWallet(),city=rCity();
    var act=ACTIONS[Math.floor(Math.random()*ACTIONS.length)];
    var tm=TIMES[Math.floor(Math.random()*TIMES.length)];
    var key=w+city+rHex(4);
    if(shown.has(key))return;
    shown.add(key);
    if(shown.size>400)shown.clear();
    var side=Math.random()>.5?'right':'left';
    var el=document.createElement('div');
    el.className='buy-toast buy-toast--'+side;
    el.style.cursor='pointer';
    el.innerHTML='<div class="bt-icon">'+String.fromCodePoint(0x1F4F2)+'</div>'
      +'<div class="bt-body">'
      +'<div class="bt-wallet">'+w+' <span style="opacity:0.5">· '+city+'</span></div>'
      +'<div class="bt-action"><b>'+act+'</b></div>'
      +'<div class="bt-time">'+tm+'</div>'
      +'</div>';
    document.body.appendChild(el);
    var ttl=Math.floor(Math.random()*2500)+5500;
    var timer=setTimeout(function(){dismiss(el);},ttl);
    el.addEventListener('mouseenter',function(){
      clearTimeout(timer);
      el.classList.add('bt-hover');
    });
    el.addEventListener('mouseleave',function(){
      el.classList.remove('bt-hover');
      timer=setTimeout(function(){dismiss(el);},2500);
    });
    el.addEventListener('click',function(){
      clearTimeout(timer);
      flyAway(el,side);
    });
    requestAnimationFrame(function(){requestAnimationFrame(function(){el.classList.add('bt-show');});});
  }
  function schedNext(){
    var delay=Math.floor(Math.random()*18000)+4000;
    setTimeout(function(){createToast();schedNext();},delay);
  }
  setTimeout(function(){createToast();schedNext();},3000);
})();