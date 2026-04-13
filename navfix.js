/* Nav fix + scroll-reveal fix for GHL pages */
function fixNav(){
  var map={
    'Home':'/home',
    'Homeowners':'/homeowners',
    'Builders':'/builders'
  };
  document.querySelectorAll('a').forEach(function(a){
    var t=a.textContent.trim();
    var url=null;
    if(map[t]) url=map[t];
    if(t.indexOf('MILEX')>-1) url='/milex';
    if(t.indexOf('Builders')>-1) url='/builders';
    if(url){
      a.href=url;
      if(!a.dataset.navfixed){
        a.dataset.navfixed='1';
        a.addEventListener('click',function(e){
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          window.location.href=url;
        },true);
      }
    }
  });
}

/* Scroll-reveal: observe .animate-on-scroll elements */
var scrollObserver;
function initScrollReveal(){
  if(!scrollObserver){
    scrollObserver=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          scrollObserver.unobserve(entry.target);
        }
      });
    },{threshold:0.1});
  }
  document.querySelectorAll('.animate-on-scroll:not(.visible)').forEach(function(el){
    scrollObserver.observe(el);
  });
}

fixNav();
initScrollReveal();
setInterval(function(){ fixNav(); initScrollReveal(); },500);
