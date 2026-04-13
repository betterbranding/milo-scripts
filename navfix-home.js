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
fixNav();
setInterval(fixNav,500);

// MILO mascot injection in hero
function addMilo(){
  if(document.querySelector('.hero-mascot-injected')) return;
  var hero=document.querySelector('.hero');
  if(!hero) return;
  var d=document.createElement('div');
  d.className='hero-mascot hero-mascot-injected';
  d.style.cssText='position:absolute;right:5%;bottom:4%;z-index:3;animation:mascotFloat 4s ease-in-out infinite';
  var img=document.createElement('img');
  img.src='https://assets.cdn.filesafe.space/R9iIFpdQnOdHzkj8D4fW/media/e78c98f9-00e8-4722-890b-5a64084ff1e9.png';
  img.alt='MILO - Your Insulation Expert';
  img.style.cssText='width:280px;height:auto;filter:drop-shadow(0 20px 40px rgba(0,0,0,0.4));transition:transform 0.4s ease;cursor:pointer';
  img.onclick=function(){
    this.style.transform='scale(1.1) rotate(-3deg)';
    var s=this;
    setTimeout(function(){ s.style.transform=''; },500);
  };
  d.appendChild(img);
  hero.appendChild(d);
}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',addMilo)}else{addMilo()}
setTimeout(addMilo,1000);
setTimeout(addMilo,3000);
