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
  document.querySelectorAll('.mascot-patented').forEach(function(img){
    if(!img.dataset.replaced){
      img.dataset.replaced='1';
      img.src=newMascot;
      img.alt='MILO with MILEX Thermal MAX';
    }
  });
  document.querySelectorAll('.mascot-img').forEach(function(img){
    if(!img.dataset.replaced && img.alt && img.alt.indexOf('Mascot')>-1){
      img.dataset.replaced='1';
      img.src=newMascot;
      img.alt='MILO with MILEX Thermal MAX';
    }
  });
}

/* Kill the pulseGlow animation on Patented Technology section */
function killPatentedGlow(){
  if(document.getElementById('kill-patented-glow')) return;
  var style=document.createElement('style');
  style.id='kill-patented-glow';
  style.textContent=
    '.thermal-puff-section::before{animation:none !important;opacity:0 !important;display:none !important;}'+
    '@keyframes pulseGlow{0%,100%{transform:none;opacity:0}}';
  document.head.appendChild(style);
}

/* Reorder Lurking section threat cards */
function reorderLurkingCards(){
  if(document.body.dataset.lurkingFixed) return;
  var cards=document.querySelectorAll('.threat-card');
  if(cards.length===0) return;

  /* Build a map: title -> card element */
  var cardMap={};
  cards.forEach(function(card){
    var h4=card.querySelector('h4');
    if(h4) cardMap[h4.textContent.trim()]=card;
  });

  /* Desired order (remove Fire Hazards) */
  var order=['Allergens & Toxins','Pests & Rodents','Money Bleeding Out'];
  var parent=cards[0].parentElement;
  if(!parent) return;

  /* Remove Fire Hazards */
  if(cardMap['Fire Hazards']){
    cardMap['Fire Hazards'].remove();
  }

  /* Reorder remaining cards */
  order.forEach(function(title){
    if(cardMap[title]){
      parent.appendChild(cardMap[title]);
    }
  });

  document.body.dataset.lurkingFixed='1';
}

/* Floating thermal puff particles */
function injectPuffs(section, id, count, maxSize){
  if(!section) return;
  if(document.getElementById(id)) return;

  section.style.position='relative';
  section.style.overflow='hidden';

  var wrapper=document.createElement('div');
  wrapper.id=id;
  wrapper.className='puff-particles';
  wrapper.style.cssText='position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;overflow:hidden;';

  var puffUrl='https://betterbranding.github.io/milo-scripts/puff-transparent.png';

  for(var i=0;i<count;i++){
    var puff=document.createElement('div');
    puff.className='thermal-puff-particle';
    var size=25+Math.random()*maxSize;
    var left=Math.random()*95;
    var delay=Math.random()*12;
    var duration=12+Math.random()*14;
    var opacity=0.08+Math.random()*0.15;

    puff.style.cssText=
      'position:absolute;'+
      'bottom:-60px;'+
      'left:'+left+'%;'+
      'width:'+size+'px;'+
      'height:'+size+'px;'+
      'opacity:'+opacity+';'+
      'pointer-events:none;'+
      'animation:thermalPuffRise '+duration+'s ease-in-out '+delay+'s infinite;';

    var img=document.createElement('img');
    img.src=puffUrl;
    img.alt='';
    img.setAttribute('aria-hidden','true');
    img.style.cssText='width:100%;height:100%;object-fit:contain;';
    puff.appendChild(img);
    wrapper.appendChild(puff);
  }

  section.appendChild(wrapper);

  /* Ensure content stays above particles */
  try{
    var children=section.children;
    for(var j=0;j<children.length;j++){
      if(children[j]!==wrapper){
        children[j].style.position='relative';
        children[j].style.zIndex='2';
      }
    }
  }catch(e){}
}

function findSectionByText(searchText){
  /* Method 1: search .section-tag elements */
  var tags=document.querySelectorAll('.section-tag');
  for(var i=0;i<tags.length;i++){
    if(tags[i].textContent.trim().indexOf(searchText)>-1){
      var el=tags[i];
      while(el && el.tagName!=='SECTION' && !el.classList.contains('section')){
        el=el.parentElement;
      }
      if(el) return el;
    }
  }
  /* Method 2: search ALL text nodes for the phrase */
  var all=document.querySelectorAll('h2, h3, span, p, div');
  for(var j=0;j<all.length;j++){
    if(all[j].textContent.trim().indexOf(searchText)>-1){
      var el2=all[j];
      while(el2 && el2.tagName!=='SECTION' && !el2.classList.contains('section')){
        el2=el2.parentElement;
      }
      if(el2) return el2;
    }
  }
  return null;
}

function addThermalPuffs(){
  /* Inject keyframes once — use unique name to avoid conflict with page CSS */
  if(!document.getElementById('thermal-puff-anim-styles')){
    var style=document.createElement('style');
    style.id='thermal-puff-anim-styles';
    style.textContent=
      '@keyframes thermalPuffRise{'+
        '0%{transform:translateY(0) rotate(0deg) scale(0.4);opacity:inherit}'+
        '15%{opacity:inherit}'+
        '85%{opacity:inherit}'+
        '100%{transform:translateY(-800px) rotate(360deg) scale(1.1);opacity:0}'+
      '}'+
      '.thermal-puff-particle{pointer-events:none;}';
    document.head.appendChild(style);
  }

  /* "Better. Natural. Perfect." section — 18 puffs */
  var betterSection=findSectionByText('Better. Natural. Perfect.');
  if(betterSection) injectPuffs(betterSection, 'puffs-better', 18, 45);
}

try{killPatentedGlow()}catch(e){}
try{fixNav()}catch(e){}
try{initScrollReveal()}catch(e){}
try{replaceWarrantyImg()}catch(e){}
try{replaceCTAMascot()}catch(e){}
try{replacePatentedMascot()}catch(e){}
try{reorderLurkingCards()}catch(e){}
try{addThermalPuffs()}catch(e){}
setInterval(function(){
  try{killPatentedGlow()}catch(e){}
  try{fixNav()}catch(e){}
  try{initScrollReveal()}catch(e){}
  try{replaceWarrantyImg()}catch(e){}
  try{replaceCTAMascot()}catch(e){}
  try{replacePatentedMascot()}catch(e){}
  try{reorderLurkingCards()}catch(e){}
  try{addThermalPuffs()}catch(e){}
},500);

/* MILO mascot injection in hero — original position */
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
