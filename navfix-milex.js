// navfix-milex.js — Full MILEX page content injection + nav fix
// v7: Properly scoped CSS, circle mask sustainability photo, dark CTA
(function() {
  'use strict';

  // ═══════════════════════════════════════════════════════
  // 1. NAV LINK FIX
  // ═══════════════════════════════════════════════════════
  var linkMap = {
    home: '/home',
    homeowners: '/homeowners',
    builders: '/builders',
    milex: '/milex'
  };

  function fixNav() {
    document.querySelectorAll('a[onclick]').forEach(function(a) {
      var oc = a.getAttribute('onclick') || '';
      var match = oc.match(/navigateTo\('(\w+)'\)/);
      if (match && linkMap[match[1]]) {
        a.removeAttribute('onclick');
        a.href = linkMap[match[1]];
        a.addEventListener('click', function(e) {
          e.stopImmediatePropagation();
          window.location.href = linkMap[match[1]];
        });
      }
    });
  }

  // ═══════════════════════════════════════════════════════
  // 2. INJECT FONTS + FONTAWESOME
  // ═══════════════════════════════════════════════════════
  function loadResource(tag, attrs) {
    var el = document.createElement(tag);
    for (var k in attrs) el.setAttribute(k, attrs[k]);
    document.head.appendChild(el);
  }
  loadResource('link', {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;500;600;700;800;900&family=Nunito+Sans:wght@300;400;600;700;800&display=swap'
  });
  loadResource('link', {
    rel: 'stylesheet',
    href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
  });

  // ═══════════════════════════════════════════════════════
  // 3. INJECT CSS (all scoped to #milex-content)
  // ═══════════════════════════════════════════════════════
  var style = document.createElement('style');
  style.id = 'milex-injected-styles';
  style.textContent = "/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n   MILEX PAGE \u2014 Scoped CSS (all rules under #milex-content)\n   Brand: Green #288D11, Navy #074387, Orange #FF8200, Light Blue #50ACE1\n   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n:root {\n  --green: #288D11;\n  --green-dark: #1C630C;\n  --green-darker: #114709;\n  --green-light: #69AF58;\n  --green-lighter: #A9D1A0;\n  --green-bg: #EAF4E7;\n  --navy: #074387;\n  --navy-dark: #042244;\n  --orange: #FF8200;\n  --blue-light: #50ACE1;\n  --white: #FFFFFF;\n  --gray-50: #f9fafb;\n  --gray-100: #f3f4f6;\n  --gray-200: #e5e7eb;\n  --gray-300: #d1d5db;\n  --gray-500: #6b7280;\n  --gray-700: #374151;\n  --gray-900: #111827;\n  --font-title: 'League Spartan', sans-serif;\n  --font-body: 'Nunito Sans', 'Gotham', sans-serif;\n  --glass-bg: rgba(255, 255, 255, 0.7);\n  --glass-border: rgba(255, 255, 255, 0.3);\n  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);\n}\n\n/* BASE */\n#milex-content {\n  font-family: var(--font-body);\n  color: var(--gray-900);\n  line-height: 1.6;\n  overflow-x: hidden;\n}\n#milex-content *, #milex-content *::before, #milex-content *::after {\n  box-sizing: border-box;\n}\n#milex-content a { text-decoration: none; color: inherit; }\n#milex-content img { max-width: 100%; height: auto; display: block; }\n#milex-content ul { list-style: none; margin: 0; padding: 0; }\n\n/* LAYOUT */\n#milex-content .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }\n#milex-content .section { padding: 5rem 0; }\n#milex-content .text-center { text-align: center; }\n#milex-content .max-w-lg { max-width: 720px; margin-left: auto; margin-right: auto; }\n\n#milex-content .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start; }\n#milex-content .two-col.align-center { align-items: center; }\n\n/* BACKGROUNDS */\n#milex-content .bg-white { background: var(--white); }\n#milex-content .bg-light-green { background: var(--green-bg); }\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 TYPOGRAPHY \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n#milex-content .section-tag {\n  display: inline-block;\n  font-family: var(--font-title);\n  font-size: 0.85rem;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--green);\n  margin-bottom: 0.75rem;\n  position: relative;\n  padding-bottom: 0.5rem;\n}\n#milex-content .section-tag::after {\n  content: '';\n  position: absolute;\n  bottom: 0; left: 0;\n  width: 40px; height: 3px;\n  background: var(--orange);\n  border-radius: 2px;\n}\n#milex-content .text-center .section-tag::after { left: 50%; transform: translateX(-50%); }\n#milex-content .section-tag.light { color: var(--green-lighter); }\n#milex-content .section-tag.light::after { background: var(--orange); }\n\n#milex-content .section-title {\n  font-family: var(--font-title);\n  font-size: 2.5rem;\n  font-weight: 800;\n  line-height: 1.15;\n  color: var(--gray-900);\n  margin-bottom: 1.25rem;\n  margin-top: 0;\n}\n#milex-content .section-title.light { color: var(--white); }\n\n#milex-content .sub-heading {\n  font-family: var(--font-title);\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: var(--green-dark);\n  margin-bottom: 1rem;\n}\n\n#milex-content .body-text {\n  font-size: 1.05rem;\n  line-height: 1.75;\n  color: var(--gray-700);\n  margin-bottom: 1rem;\n}\n#milex-content .body-text.light { color: rgba(255,255,255,0.9); }\n#milex-content .highlight-text { color: var(--green-dark) !important; }\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 BUTTONS \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n#milex-content .btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-family: var(--font-title);\n  font-size: 1rem;\n  font-weight: 700;\n  padding: 0.85rem 2rem;\n  border-radius: 50px;\n  border: 2px solid transparent;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  letter-spacing: 0.5px;\n}\n#milex-content .btn i { transition: transform 0.3s ease; }\n#milex-content .btn:hover i { transform: translateX(4px); }\n\n#milex-content .btn-primary {\n  background: var(--green);\n  color: var(--white);\n  border-color: var(--green);\n}\n#milex-content .btn-primary:hover {\n  background: var(--green-dark);\n  border-color: var(--green-dark);\n  transform: translateY(-2px);\n  box-shadow: 0 8px 24px rgba(40, 141, 17, 0.3);\n}\n#milex-content .btn-orange {\n  background: var(--orange);\n  color: var(--white);\n  border-color: var(--orange);\n}\n#milex-content .btn-orange:hover {\n  background: #e67400;\n  border-color: #e67400;\n  transform: translateY(-2px);\n  box-shadow: 0 8px 24px rgba(255, 130, 0, 0.35);\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 GLASS CARDS \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n#milex-content .glass-card {\n  background: var(--glass-bg);\n  backdrop-filter: blur(16px);\n  -webkit-backdrop-filter: blur(16px);\n  border: 1px solid var(--glass-border);\n  border-radius: 16px;\n  box-shadow: var(--glass-shadow);\n  padding: 2rem;\n  transition: transform 0.35s ease, box-shadow 0.35s ease;\n}\n#milex-content .glass-card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 NAVBAR \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n#milex-navbar {\n  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;\n  padding: 1rem 2rem;\n  display: flex; align-items: center; justify-content: space-between;\n  background: transparent;\n  transition: all 0.3s ease;\n}\n#milex-navbar.scrolled {\n  background: rgba(255,255,255,0.98);\n  box-shadow: 0 2px 20px rgba(0,0,0,0.1);\n  padding: 0.5rem 2rem;\n}\n#milex-navbar .nav-logo img {\n  height: 50px;\n  transition: all 0.3s;\n  filter: brightness(0) invert(1);\n}\n#milex-navbar.scrolled .nav-logo img { height: 40px; filter: none; }\n#milex-navbar .nav-links {\n  display: flex; gap: 2rem; list-style: none;\n  align-items: center; margin: 0; padding: 0;\n}\n#milex-navbar .nav-links a {\n  color: white; text-decoration: none;\n  font-family: var(--font-body); font-weight: 600; font-size: 0.95rem;\n  transition: color 0.3s;\n}\n#milex-navbar.scrolled .nav-links a { color: #1a1a2e; }\n#milex-navbar .nav-links a:hover { color: var(--green); }\n#milex-navbar .nav-links a.active { color: var(--orange); }\n#milex-navbar .nav-cta {\n  background: var(--orange); color: white !important;\n  padding: 0.6rem 1.5rem; border-radius: 50px;\n  font-weight: 700; transition: all 0.3s;\n}\n#milex-navbar .nav-cta:hover { background: #e67300; transform: translateY(-2px); }\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 HERO \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n#milex-content .page-hero {\n  position: relative;\n  min-height: 50vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-size: cover;\n  background-position: center;\n}\n#milex-content .page-hero-overlay {\n  position: absolute;\n  inset: 0;\n  background: linear-gradient(135deg, rgba(4, 34, 68, 0.85) 0%, rgba(17, 71, 9, 0.75) 100%);\n}\n#milex-content .page-hero-content {\n  position: relative;\n  z-index: 2;\n  text-align: center;\n  padding: 8rem 2rem 4rem;\n}\n#milex-content .page-hero-content h1 {\n  font-family: var(--font-title);\n  font-size: 3.2rem;\n  font-weight: 900;\n  color: var(--white);\n  margin: 0 0 0.75rem;\n}\n#milex-content .page-hero-content p {\n  font-size: 1.2rem;\n  color: rgba(255,255,255,0.8);\n  margin: 0;\n}\n#milex-content .hero-badge {\n  display: inline-block;\n  font-family: var(--font-title);\n  font-size: 0.8rem;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--orange);\n  border: 1.5px solid var(--orange);\n  padding: 0.4rem 1.2rem;\n  border-radius: 50px;\n  margin-bottom: 1.5rem;\n}\n#milex-content .milex-hero {\n  background-image: url('https://betterbranding.github.io/milo-scripts/milex-hero.jpg');\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 PROCESS VISUAL \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n#milex-content .process-visual { display: flex; flex-direction: column; gap: 0.75rem; }\n#milex-content .process-step {\n  display: flex;\n  align-items: center;\n  gap: 1.25rem;\n  padding: 1.25rem 1.5rem;\n}\n#milex-content .process-num {\n  font-family: var(--font-title);\n  font-size: 1.5rem;\n  font-weight: 900;\n  color: var(--green);\n  min-width: 28px;\n}\n#milex-content .process-step i:not(.process-num) { font-size: 1.3rem; color: var(--navy); min-width: 28px; text-align: center; }\n#milex-content .process-step h4 {\n  font-family: var(--font-title);\n  font-size: 1rem;\n  font-weight: 700;\n  margin: 0 0 0.15rem;\n}\n#milex-content .process-step p { font-size: 0.85rem; color: var(--gray-500); margin: 0; }\n#milex-content .process-arrow { text-align: center; color: var(--green-light); font-size: 1rem; animation: milex-bounceDown 1.5s ease-in-out infinite; }\n@keyframes milex-bounceDown {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(5px); }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 ECO STATS \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n#milex-content .eco-stats { display: flex; gap: 1rem; margin-top: 1.5rem; flex-wrap: wrap; }\n#milex-content .eco-stat {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  padding: 0.75rem 1.25rem;\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: var(--green-dark);\n}\n#milex-content .eco-stat i { color: var(--green); font-size: 1.1rem; }\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SUSTAINABILITY PHOTO \u2014 CIRCLE MASK \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n#milex-content .sorghum-large-img {\n  width: 400px;\n  height: 400px;\n  border-radius: 50%;\n  object-fit: cover;\n  border: 4px solid var(--green);\n  box-shadow: 0 12px 40px rgba(40, 141, 17, 0.2);\n  margin: 0 auto;\n  display: block;\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 THERMAL PUFF SECTION \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n#milex-content .thermal-puff-section {\n  background: linear-gradient(135deg, var(--navy-dark) 0%, var(--green-darker) 60%, var(--navy) 100%);\n  position: relative;\n  overflow: hidden;\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 CTA SECTION \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n#milex-content .cta-final {\n  background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 100%);\n  padding: 5rem 2rem;\n  text-align: center;\n}\n#milex-content .cta-final .section-tag { color: var(--orange); }\n#milex-content .cta-final h2 {\n  color: white;\n  font-family: var(--font-title);\n  font-size: 2.5rem;\n  margin: 1rem 0;\n}\n#milex-content .cta-final p {\n  color: rgba(255,255,255,0.8);\n  max-width: 600px;\n  margin: 0 auto 2rem;\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 FOOTER \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n#milex-footer {\n  background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 100%);\n  color: rgba(255,255,255,0.8);\n  padding: 4rem 2rem 2rem;\n  font-family: var(--font-body);\n}\n#milex-footer .footer-content {\n  max-width: 1200px; margin: 0 auto;\n  display: grid; grid-template-columns: 1fr 1fr; gap: 3rem;\n}\n#milex-footer .footer-brand img { height: 50px; margin-bottom: 1rem; filter: brightness(0) invert(1); }\n#milex-footer .footer-tagline { color: var(--green); font-weight: 700; margin-bottom: 0.5rem; }\n#milex-footer .footer-desc { font-size: 0.9rem; line-height: 1.6; color: rgba(255,255,255,0.6); }\n#milex-footer h4 { color: white; font-family: var(--font-title); margin-bottom: 1rem; margin-top: 0; }\n#milex-footer .footer-links { list-style: none; padding: 0; margin: 0; }\n#milex-footer .footer-links a { color: rgba(255,255,255,0.7); text-decoration: none; display: block; padding: 0.3rem 0; transition: color 0.3s; }\n#milex-footer .footer-links a:hover { color: var(--green); }\n#milex-footer .footer-contact p { display: flex; align-items: center; gap: 0.5rem; margin: 0.5rem 0; font-size: 0.9rem; }\n#milex-footer .footer-contact i { color: var(--green); }\n#milex-footer .footer-bottom { text-align: center; padding-top: 2rem; margin-top: 2rem; border-top: 1px solid rgba(255,255,255,0.1); font-size: 0.85rem; color: rgba(255,255,255,0.4); }\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SCROLL ANIMATIONS \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n#milex-content .animate-on-scroll {\n  opacity: 0;\n  transform: translateY(30px);\n  transition: opacity 0.7s ease, transform 0.7s ease;\n}\n#milex-content .animate-on-scroll.slide-left { transform: translateX(-40px); }\n#milex-content .animate-on-scroll.slide-right { transform: translateX(40px); }\n#milex-content .animate-on-scroll.visible {\n  opacity: 1;\n  transform: translate(0, 0);\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 RESPONSIVE \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n@media (max-width: 768px) {\n  #milex-content .two-col { grid-template-columns: 1fr; gap: 2rem; }\n  #milex-content .section { padding: 3.5rem 0; }\n  #milex-content .section-title { font-size: 2rem; }\n  #milex-content .page-hero-content h1 { font-size: 2.2rem; }\n  #milex-content .sorghum-large-img { width: 280px; height: 280px; }\n  #milex-footer .footer-content { grid-template-columns: 1fr; }\n  #milex-navbar .nav-links { display: none; }\n}\n";
  document.head.appendChild(style);

  // ═══════════════════════════════════════════════════════
  // 4. HIDE GHL WRAPPER & FETCH + INJECT CONTENT
  // ═══════════════════════════════════════════════════════
  function injectContent() {
    // Hide the GHL section wrapper
    var ghlSection = document.querySelector('.section-Lg9u8NXGW-');
    if (ghlSection) ghlSection.style.display = 'none';

    // Check if we already injected
    if (document.getElementById('milex-content')) return;

    // Find the preview container
    var container = document.getElementById('preview-container');
    if (!container) return;

    // Create our content wrapper
    var wrapper = document.createElement('div');
    wrapper.id = 'milex-content';

    // Insert wrapper into DOM immediately
    var firstChild = container.querySelector('div');
    if (firstChild) {
      container.insertBefore(wrapper, firstChild);
    } else {
      container.appendChild(wrapper);
    }

    // Fetch HTML content from separate file (cache-bust with timestamp)
    var baseUrl = 'https://betterbranding.github.io/milo-scripts/';
    fetch(baseUrl + 'milex-content.html?v=' + Date.now())
      .then(function(r) { return r.text(); })
      .then(function(html) {
        wrapper.innerHTML = html;
        setupScrollAnimations();
        setupNavbar();
        fixNav();
      })
      .catch(function(err) {
        console.error('MILEX content fetch failed:', err);
      });
  }

  // ═══════════════════════════════════════════════════════
  // 5. SCROLL ANIMATIONS (IntersectionObserver)
  // ═══════════════════════════════════════════════════════
  function setupScrollAnimations() {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('#milex-content .animate-on-scroll').forEach(function(el) {
      observer.observe(el);
    });
  }

  // ═══════════════════════════════════════════════════════
  // 6. NAVBAR SCROLL BEHAVIOR
  // ═══════════════════════════════════════════════════════
  function setupNavbar() {
    var nav = document.getElementById('milex-navbar');
    if (!nav) return;
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  // Run injection
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectContent);
  } else {
    injectContent();
  }
  // Also retry after a delay in case GHL hydrates late
  setTimeout(injectContent, 500);
  setTimeout(injectContent, 1500);
  setTimeout(injectContent, 3000);

})();
