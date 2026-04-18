(function(){
  function initGallery(){
    var grid = document.querySelector('.meme-grid');
    var wrap = document.querySelector('.meme-ticker-wrap');
    if(!grid || !wrap) return;

    var returning = false;
    var returnTimer = null;

    function unfocus(){
      returning = true;
      grid.classList.remove('gallery-focused');
      // block ALL pointer events on cards during return so hover can't interfere
      grid.style.pointerEvents = 'none';
      document.querySelectorAll('.meme-item').forEach(function(c){
        c.classList.remove('ig-focused','ig-left','ig-right');
        c.style.pointerEvents = 'none';
      });
      grid.style.animationPlayState = '';
      clearTimeout(returnTimer);
      returnTimer = setTimeout(function(){
        returning = false;
        grid.style.pointerEvents = '';
        document.querySelectorAll('.meme-item').forEach(function(c){
          c.style.pointerEvents = '';
        });
      }, 520);
    }

    grid.addEventListener('mouseenter', function(){
      if(!returning && !grid.classList.contains('gallery-focused'))
        grid.style.animationPlayState = 'paused';
    });
    grid.addEventListener('mouseleave', function(){
      if(!returning && !grid.classList.contains('gallery-focused'))
        grid.style.animationPlayState = '';
    });

    document.querySelectorAll('.meme-item').forEach(function(card){
      card.addEventListener('click', function(e){
        if(e.target.closest('.ig-act,.ig-dots')) return;
        if(card.classList.contains('ig-focused')) return;

        var cards = Array.from(document.querySelectorAll('.meme-item'));
        var idx = cards.indexOf(card);
        cards.forEach(function(c,i){
          c.classList.remove('ig-focused','ig-left','ig-right');
          if(i < idx) c.classList.add('ig-left');
          else if(i > idx) c.classList.add('ig-right');
        });
        card.classList.add('ig-focused');
        grid.classList.add('gallery-focused');
        grid.style.animationPlayState = 'paused';
      });

      card.addEventListener('mouseleave', function(){
        if(card.classList.contains('ig-focused')) unfocus();
      });
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', initGallery);
  else initGallery();
})();