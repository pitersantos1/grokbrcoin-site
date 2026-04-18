// Hamburger menu (safe if either element is missing)
(function(){
  var hamburger = document.getElementById('hamburger');
  var navMobile = document.getElementById('navMobile');
  if(!hamburger || !navMobile) return;

  function closeMenu(){
    hamburger.classList.remove('open');
    navMobile.style.animation = 'nm-slide-out .32s cubic-bezier(.7,0,.8,1) forwards';
    setTimeout(function(){
      navMobile.classList.remove('open');
      navMobile.style.animation = '';
      document.body.style.overflow = '';
    }, 300);
  }
  // Exposto pra links com onclick="closeMenu()"
  window.closeMenu = closeMenu;

  hamburger.addEventListener('click', function(){
    var open = !navMobile.classList.contains('open');
    if(!open){ closeMenu(); return; }
    navMobile.querySelectorAll('.nm-link,.nm-cta-wrap,.nm-stats,.nm-ticker').forEach(function(el){
      el.style.animation = 'none';
      void el.offsetWidth; // reflow forçado pra reiniciar animação
      el.style.animation = '';
    });
    navMobile.classList.add('open');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  // Fecha com Escape (acessibilidade)
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && navMobile.classList.contains('open')) closeMenu();
  });
})();
