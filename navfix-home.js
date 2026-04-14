/* Nav fix + scroll-reveal fix + image replacements for Home page */
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

/* Replace warranty image */
function replaceWarrantyImg(){
  var newWarranty='https://assets.cdn.filesafe.space/R9iIFpdQnOdHzkj8D4fW/media/48aee2da-7094-41fd-9391-ee54941294f2.png';
  var imgs=document.querySelectorAll('.warranty-img');
  imgs.forEach(function(img){
    if(!img.dataset.replaced){
      img.dataset.replaced='1';
      img.src=newWarranty;
      img.alt='MILO Insulation Lifetime Warranty';
    }
  });
  document.querySelectorAll('img').forEach(function(img){
    if(img.alt && img.alt.indexOf('Warranty')>-1 && !img.dataset.replaced){
      img.dataset.replaced='1';
      img.src=newWarranty;
      img.alt='MILO Insulation Lifetime Warranty';
    }
  });
}

/* Replace bottom CTA mascot with SVG */
function replaceCTAMascot(){
  var newMascot='https://assets.cdn.filesafe.space/R9iIFpdQnOdHzkj8D4fW/media/56486280-5bf8-459c-aa31-9ee1b40db376.svg';
  var containers=document.querySelectorAll('.mascot-contact');
  containers.forEach(function(c){
    var img=c.querySelector('img');
    if(img && !img.dataset.replaced){
      img.dataset.replaced='1';
      img.src=newMascot;
      img.alt='MILO Pointing';
    }
  });
  document.querySelectorAll('img').forEach(function(img){
    if(img.alt && (img.alt.indexOf('Milo Pointing')>-1 || img.alt.indexOf('farmer-pointing')>-1 || img.alt.indexOf('MILO Pointing')>-1) && !img.dataset.replaced){
      img.dataset.replaced='1';
      img.src=newMascot;
      img.alt='MILO Pointing';
    }
  });
}

/* Replace Patented Technology mascot with MILO holding Thermal Puff */
function replacePatentedMascot(){
  var newMascot='https://assets.cdn.filesafe.space/R9iIFpdQnOdHzkj8D4fW/media/90ab675e-ebf4-4629-9b5d-db35af5c6930.png';
  /* Find by .mascot-patented class */
  document.querySelectorAll('.mascot-patented').forEach(function(img){
    if(!img.dataset.replaced){
      img.dataset.replaced='1';
      img.src=newMascot;
      img.alt='MILO with MILEX Thermal MAX';
    }
  });
  /* Fallback: find by .mascot-img class */
  document.querySelectorAll('.mascot-img').forEach(function(img){
    if(!img.dataset.replaced && img.alt && img.alt.indexOf('Mascot')>-1){
      img.dataset.replaced='1';
      img.src=newMascot;
      img.alt='MILO with MILEX Thermal MAX';
    }
  });
}

fixNav();
initScrollReveal();
replaceWarrantyImg();
replaceCTAMascot();
replacePatentedMascot();
setInterval(function(){ fixNav(); initScrollReveal(); replaceWarrantyImg(); replaceCTAMascot(); replacePatentedMascot(); },500);

/* MILO mascot injection in hero */
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
