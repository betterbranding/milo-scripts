/* navfix-home.js — Home page enhancements
 * Loads milo-shared.js for global nav/footer, then adds:
 * - Warranty image swap
 * - CTA mascot swap (SVG Mascot 2.0)
 * - Patented Technology mascot swap (MILO holding Thermal Puff)
 * - Kill pulseGlow orb
 * - Floating thermal puff particles in "Better. Natural. Perfect." section
 * - Hero MILO mascot injection
 * - Lurking section card reorder
 */
(function() {
  'use strict';

  /* Load shared module */
  var s = document.createElement('script');
  s.src = 'https://betterbranding.github.io/milo-scripts/milo-shared.js?v=' + Date.now();
  document.head.appendChild(s);

  /* ── HOME-SPECIFIC ENHANCEMENTS ── */

  /* Replace warranty image */
  function replaceWarrantyImg() {
    var newWarranty = 'https://assets.cdn.filesafe.space/R9iIFpdQnOdHzkj8D4fW/media/48aee2da-7094-41fd-9391-ee54941294f2.png';
    document.querySelectorAll('.warranty-img').forEach(function(img) {
      if (!img.dataset.replaced) {
        img.dataset.replaced = '1';
        img.src = newWarranty;
        img.alt = 'MILO Insulation Lifetime Warranty';
      }
    });
    document.querySelectorAll('img').forEach(function(img) {
      if (img.alt && img.alt.indexOf('Warranty') > -1 && !img.dataset.replaced) {
        img.dataset.replaced = '1';
        img.src = newWarranty;
        img.alt = 'MILO Insulation Lifetime Warranty';
      }
    });
  }

  /* Replace bottom CTA mascot with SVG */
  function replaceCTAMascot() {
    var newMascot = 'https://assets.cdn.filesafe.space/R9iIFpdQnOdHzkj8D4fW/media/56486280-5bf8-459c-aa31-9ee1b40db376.svg';
    document.querySelectorAll('.mascot-contact').forEach(function(c) {
      var img = c.querySelector('img');
      if (img && !img.dataset.replaced) {
        img.dataset.replaced = '1';
        img.src = newMascot;
        img.alt = 'MILO Pointing';
      }
    });
    document.querySelectorAll('img').forEach(function(img) {
      if (img.alt && (img.alt.indexOf('Milo Pointing') > -1 || img.alt.indexOf('farmer-pointing') > -1 || img.alt.indexOf('MILO Pointing') > -1) && !img.dataset.replaced) {
        img.dataset.replaced = '1';
        img.src = newMascot;
        img.alt = 'MILO Pointing';
      }
    });
  }

  /* Replace Patented Technology mascot */
  function replacePatentedMascot() {
    var newMascot = 'https://assets.cdn.filesafe.space/R9iIFpdQnOdHzkj8D4fW/media/90ab675e-ebf4-4629-9b5d-db35af5c6930.png';
    document.querySelectorAll('.mascot-patented').forEach(function(img) {
      if (!img.dataset.replaced) {
        img.dataset.replaced = '1';
        img.src = newMascot;
        img.alt = 'MILO with MILEX Thermal MAX';
      }
    });
    document.querySelectorAll('.mascot-img').forEach(function(img) {
      if (!img.dataset.replaced && img.alt && img.alt.indexOf('Mascot') > -1) {
        img.dataset.replaced = '1';
        img.src = newMascot;
        img.alt = 'MILO with MILEX Thermal MAX';
      }
    });
  }

  /* Kill pulseGlow on Patented Technology section */
  function killPatentedGlow() {
    if (document.getElementById('kill-patented-glow')) return;
    var style = document.createElement('style');
    style.id = 'kill-patented-glow';
    style.textContent =
      '.thermal-puff-section::before{animation:none !important;opacity:0 !important;display:none !important;}' +
      '@keyframes pulseGlow{0%,100%{transform:none;opacity:0}}';
    document.head.appendChild(style);
  }

  /* Reorder Lurking section threat cards */
  function reorderLurkingCards() {
    if (document.body.dataset.lurkingFixed) return;
    var cards = document.querySelectorAll('.threat-card');
    if (cards.length === 0) return;
    var cardMap = {};
    cards.forEach(function(card) {
      var h4 = card.querySelector('h4');
      if (h4) cardMap[h4.textContent.trim()] = card;
    });
    var order = ['Allergens & Toxins', 'Pests & Rodents', 'Money Bleeding Out'];
    var parent = cards[0].parentElement;
    if (!parent) return;
    if (cardMap['Fire Hazards']) cardMap['Fire Hazards'].remove();
    order.forEach(function(title) {
      if (cardMap[title]) parent.appendChild(cardMap[title]);
    });
    document.body.dataset.lurkingFixed = '1';
  }

  /* Floating thermal puff particles */
  function injectPuffs(section, id, count, maxSize) {
    if (!section || document.getElementById(id)) return;
    section.style.position = 'relative';
    section.style.overflow = 'hidden';
    var wrapper = document.createElement('div');
    wrapper.id = id;
    wrapper.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;overflow:hidden;';
    var puffUrl = 'https://betterbranding.github.io/milo-scripts/puff-transparent.png';
    for (var i = 0; i < count; i++) {
      var puff = document.createElement('div');
      var size = 50 + Math.random() * maxSize;
      var left = Math.random() * 95;
      var delay = Math.random() * 12;
      var duration = 12 + Math.random() * 14;
      var opacity = 0.75;
      puff.style.cssText =
        'position:absolute;bottom:-60px;left:' + left + '%;width:' + size + 'px;height:' + size + 'px;' +
        'opacity:' + opacity + ';pointer-events:none;animation:thermalPuffRise ' + duration + 's ease-in-out ' + delay + 's infinite;';
      var img = document.createElement('img');
      img.src = puffUrl;
      img.alt = '';
      img.setAttribute('aria-hidden', 'true');
      img.style.cssText = 'width:100%;height:100%;object-fit:contain;';
      puff.appendChild(img);
      wrapper.appendChild(puff);
    }
    section.appendChild(wrapper);
    var children = section.children;
    for (var j = 0; j < children.length; j++) {
      if (children[j] !== wrapper) {
        children[j].style.position = 'relative';
        children[j].style.zIndex = '2';
      }
    }
  }

  function findSectionByText(searchText) {
    var tags = document.querySelectorAll('.section-tag');
    for (var i = 0; i < tags.length; i++) {
      if (tags[i].textContent.trim().indexOf(searchText) > -1) {
        var el = tags[i];
        while (el && el.tagName !== 'SECTION' && !el.classList.contains('section')) el = el.parentElement;
        if (el) return el;
      }
    }
    var all = document.querySelectorAll('h2, h3, span, p, div');
    for (var j = 0; j < all.length; j++) {
      if (all[j].textContent.trim().indexOf(searchText) > -1) {
        var el2 = all[j];
        while (el2 && el2.tagName !== 'SECTION' && !el2.classList.contains('section')) el2 = el2.parentElement;
        if (el2) return el2;
      }
    }
    return null;
  }

  function addThermalPuffs() {
    if (!document.getElementById('thermal-puff-anim-styles')) {
      var style = document.createElement('style');
      style.id = 'thermal-puff-anim-styles';
      style.textContent =
        '@keyframes thermalPuffRise{' +
        '0%{transform:translateY(0) rotate(0deg) scale(0.4);opacity:inherit}' +
        '15%{opacity:inherit}85%{opacity:inherit}' +
        '100%{transform:translateY(-800px) rotate(360deg) scale(1.1);opacity:0}' +
        '}.thermal-puff-particle{pointer-events:none;}';
      document.head.appendChild(style);
    }
    var betterSection = findSectionByText('Better. Natural. Perfect.');
    if (betterSection) injectPuffs(betterSection, 'puffs-better', 18, 90);
  }

  /* Hero MILO mascot */
  function addMilo() {
    if (document.querySelector('.hero-mascot-injected')) return;
    var hero = document.querySelector('.hero');
    if (!hero) return;

    /* Mobile responsive styles */
    if (!document.getElementById('hero-milo-responsive')) {
      var mStyle = document.createElement('style');
      mStyle.id = 'hero-milo-responsive';
      mStyle.textContent =
        '@keyframes mascotFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}' +
        '@media(max-width:768px){' +
          '.hero-mascot-injected{position:relative !important;right:auto !important;bottom:auto !important;' +
          'display:flex;justify-content:center;margin-top:24px;width:100%;}' +
          '.hero-mascot-injected img{width:200px !important;}' +
        '}';
      document.head.appendChild(mStyle);
    }

    var d = document.createElement('div');
    d.className = 'hero-mascot hero-mascot-injected';
    d.style.cssText = 'position:absolute;right:5%;bottom:4%;z-index:3;animation:mascotFloat 4s ease-in-out infinite';
    var img = document.createElement('img');
    img.src = 'https://assets.cdn.filesafe.space/R9iIFpdQnOdHzkj8D4fW/media/e78c98f9-00e8-4722-890b-5a64084ff1e9.png';
    img.alt = 'MILO - Your Insulation Expert';
    img.style.cssText = 'width:280px;height:auto;filter:drop-shadow(0 20px 40px rgba(0,0,0,0.4));transition:transform 0.4s ease;cursor:pointer';
    img.onclick = function() {
      this.style.transform = 'scale(1.1) rotate(-3deg)';
      var self = this;
      setTimeout(function() { self.style.transform = ''; }, 500);
    };
    d.appendChild(img);
    hero.appendChild(d);
  }

  /* ── RUN ALL ── */
  function runHomeEnhancements() {
    try { killPatentedGlow(); } catch(e) {}
    try { replaceWarrantyImg(); } catch(e) {}
    try { replaceCTAMascot(); } catch(e) {}
    try { replacePatentedMascot(); } catch(e) {}
    try { reorderLurkingCards(); } catch(e) {}
    try { addThermalPuffs(); } catch(e) {}
    try { addMilo(); } catch(e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runHomeEnhancements);
  } else {
    runHomeEnhancements();
  }
  setTimeout(runHomeEnhancements, 500);
  setTimeout(runHomeEnhancements, 1500);
  setTimeout(runHomeEnhancements, 3000);
  setInterval(runHomeEnhancements, 500);
})();
