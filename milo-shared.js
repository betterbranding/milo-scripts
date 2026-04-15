/*
 * milo-shared.js — Global navbar, footer, scroll-reveal, and nav link fix
 * Loaded by all page scripts. Fetches shared-nav-footer.html and injects
 * consistent nav + footer across every page.
 */
(function() {
  'use strict';

  /* ── FONTS & ICONS ── */
  function loadRes(tag, attrs) {
    var el = document.createElement(tag);
    for (var k in attrs) el.setAttribute(k, attrs[k]);
    document.head.appendChild(el);
  }
  loadRes('link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;500;600;700;800;900&family=Nunito+Sans:wght@300;400;600;700;800&display=swap' });
  loadRes('link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css' });

  /* ── CSS ── */
  var css = document.createElement('style');
  css.id = 'milo-shared-styles';
  css.textContent = [
    /* --- NAVBAR --- */
    '.milo-nav {',
    '  position: fixed; top: 0; left: 0; right: 0; z-index: 9999;',
    '  padding: 1rem 2rem; background: transparent; transition: all 0.3s ease;',
    '  font-family: "Nunito Sans", "Gotham", sans-serif;',
    '}',
    '.milo-nav.scrolled {',
    '  background: rgba(255,255,255,0.98); box-shadow: 0 2px 20px rgba(0,0,0,0.1); padding: 0.5rem 2rem;',
    '}',
    '.milo-nav-inner {',
    '  display: flex; align-items: center; justify-content: space-between;',
    '  max-width: 1200px; margin: 0 auto; width: 100%;',
    '}',
    '.milo-nav-logo img { height: 50px; transition: all 0.3s; filter: brightness(0) invert(1); }',
    '.milo-nav.scrolled .milo-nav-logo img { height: 40px; filter: none; }',
    '.milo-nav-links {',
    '  display: flex; gap: 2rem; list-style: none; align-items: center; margin: 0; padding: 0;',
    '}',
    '.milo-nav-links a {',
    '  color: white; text-decoration: none; font-family: "Nunito Sans", sans-serif;',
    '  font-weight: 600; font-size: 0.95rem; transition: color 0.3s;',
    '}',
    '.milo-nav.scrolled .milo-nav-links a { color: #1a1a2e; }',
    '.milo-nav-links a:hover { color: #288D11; }',
    '.milo-nav-links a.active { color: #FF8200; }',
    '.milo-nav-cta {',
    '  background: #FF8200; color: white !important;',
    '  padding: 0.6rem 1.5rem; border-radius: 50px; font-weight: 700 !important; transition: all 0.3s;',
    '}',
    '.milo-nav-cta:hover { background: #e67300; transform: translateY(-2px); }',

    /* --- FOOTER (use ID selector for GHL specificity) --- */
    '#milo-foot {',
    '  background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 100%) !important;',
    '  color: rgba(255,255,255,0.8) !important; padding: 4rem 2rem 2rem !important;',
    '  font-family: "Nunito Sans", "Gotham", sans-serif;',
    '  width: 100%; box-sizing: border-box;',
    '}',
    '#milo-foot .milo-foot-grid {',
    '  max-width: 1200px; margin: 0 auto;',
    '  display: grid !important; grid-template-columns: 2fr 1fr 1fr !important; gap: 3rem;',
    '}',
    '#milo-foot .milo-foot-brand img { height: 50px; margin-bottom: 1rem; filter: brightness(0) invert(1); }',
    '#milo-foot .milo-foot-tagline { color: #288D11 !important; font-weight: 700; margin: 0 0 0.5rem; }',
    '#milo-foot .milo-foot-desc { font-size: 0.9rem; line-height: 1.6; color: rgba(255,255,255,0.6) !important; margin: 0; }',
    '#milo-foot h4 {',
    '  color: white !important; font-family: "League Spartan", sans-serif;',
    '  margin: 0 0 1rem; font-size: 1.1rem;',
    '}',
    '#milo-foot .milo-foot-links ul { list-style: none !important; padding: 0 !important; margin: 0 !important; }',
    '#milo-foot .milo-foot-links a {',
    '  color: rgba(255,255,255,0.7) !important; text-decoration: none !important; display: block;',
    '  padding: 0.3rem 0; transition: color 0.3s;',
    '}',
    '#milo-foot .milo-foot-links a:hover { color: #288D11 !important; }',
    '#milo-foot .milo-foot-contact p {',
    '  display: flex !important; align-items: center; gap: 0.5rem; margin: 0.5rem 0; font-size: 0.9rem;',
    '  color: rgba(255,255,255,0.8) !important;',
    '}',
    '#milo-foot .milo-foot-contact i { color: #288D11 !important; }',
    '#milo-foot .milo-foot-bottom {',
    '  text-align: center; padding-top: 2rem; margin-top: 2rem;',
    '  border-top: 1px solid rgba(255,255,255,0.1); font-size: 0.85rem; color: rgba(255,255,255,0.4) !important;',
    '}',
    '#milo-foot .milo-foot-bottom p { margin: 0; color: rgba(255,255,255,0.4) !important; }',

    /* --- RESPONSIVE --- */
    '@media (max-width: 768px) {',
    '  .milo-nav-links { display: none; }',
    '  .milo-foot-grid { grid-template-columns: 1fr; gap: 2rem; }',
    '}'
  ].join('\n');
  document.head.appendChild(css);

  /* ── DETECT CURRENT PAGE ── */
  function getCurrentPage() {
    var path = window.location.pathname.replace(/^\//, '').replace(/\/$/, '').toLowerCase();
    if (path === 'home' || path === '') return 'home';
    if (path === 'homeowners') return 'homeowners';
    if (path === 'builders') return 'builders';
    if (path === 'milex') return 'milex';
    return 'home';
  }

  /* ── FETCH SHARED HTML ── */
  var BASE = 'https://betterbranding.github.io/milo-scripts/';
  var sharedHTML = null;
  var navHTML = '';
  var footHTML = '';
  var fetchCallbacks = [];
  var fetched = false;

  function fetchShared(cb) {
    if (fetched) { if (cb) cb(); return; }
    fetchCallbacks.push(cb);
    if (fetchCallbacks.length > 1) return; // already fetching

    fetch(BASE + 'shared-nav-footer.html?v=' + Date.now())
      .then(function(r) { return r.text(); })
      .then(function(html) {
        sharedHTML = html;
        // Parse out nav and footer
        var navMatch = html.match(/<!-- NAVBAR -->([\s\S]*?)<!-- END NAVBAR -->/);
        var footMatch = html.match(/<!-- FOOTER -->([\s\S]*?)<!-- END FOOTER -->/);
        navHTML = navMatch ? navMatch[1].trim() : '';
        footHTML = footMatch ? footMatch[1].trim() : '';
        fetched = true;
        fetchCallbacks.forEach(function(fn) { if (fn) fn(); });
        fetchCallbacks = [];
      })
      .catch(function(err) {
        console.error('milo-shared: fetch failed', err);
      });
  }

  /* ── INJECT NAV + FOOTER ── */
  function injectNavFooter() {
    if (!navHTML || !footHTML) return;

    var currentPage = getCurrentPage();

    // --- NAVBAR ---
    var existingNav = document.getElementById('milo-nav');
    if (!existingNav) {
      // Hide GHL native nav
      var ghlNav = document.querySelector('nav.navbar, nav#navbar');
      if (ghlNav) ghlNav.style.display = 'none';

      // Create and inject shared nav
      var navWrapper = document.createElement('div');
      navWrapper.innerHTML = navHTML;
      var navEl = navWrapper.firstElementChild;
      document.body.insertBefore(navEl, document.body.firstChild);

      // Set active link
      var links = navEl.querySelectorAll('[data-page]');
      links.forEach(function(a) {
        if (a.dataset.page === currentPage) a.classList.add('active');
      });

      // Scroll behavior
      window.addEventListener('scroll', function() {
        var nav = document.getElementById('milo-nav');
        if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
      });
      // Check initial scroll position
      if (window.scrollY > 50) navEl.classList.add('scrolled');
    }

    // --- FOOTER ---
    var existingFoot = document.getElementById('milo-foot');
    if (!existingFoot) {
      var footWrapper = document.createElement('div');
      footWrapper.innerHTML = footHTML;
      var footEl = footWrapper.firstElementChild;

      var ghlFoot = document.querySelector('footer.footer');
      if (ghlFoot) {
        // Replace GHL footer with our shared footer (same DOM position)
        ghlFoot.parentNode.replaceChild(footEl, ghlFoot);
      } else {
        // No GHL footer (e.g. MILEX page) — append to body
        document.body.appendChild(footEl);
      }
    }
  }

  /* ── SCROLL-REVEAL ── */
  var scrollObs;
  function initScrollReveal() {
    if (!scrollObs) {
      scrollObs = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            scrollObs.unobserve(e.target);
          }
        });
      }, { threshold: 0.1 });
    }
    document.querySelectorAll('.animate-on-scroll:not(.visible)').forEach(function(el) {
      scrollObs.observe(el);
    });
  }

  /* ── PUBLIC API ── */
  window.MiloShared = {
    fetchShared: fetchShared,
    injectNavFooter: injectNavFooter,
    initScrollReveal: initScrollReveal,
    getCurrentPage: getCurrentPage,
    getNavHTML: function() { return navHTML; },
    getFootHTML: function() { return footHTML; }
  };

  /* ── AUTO-RUN ── */
  function boot() {
    fetchShared(function() {
      injectNavFooter();
      initScrollReveal();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
  // Retry for GHL's slow rendering
  setTimeout(boot, 500);
  setTimeout(boot, 1500);
  setTimeout(boot, 3000);

  // Periodic scroll-reveal check for dynamically added elements
  setInterval(initScrollReveal, 500);
})();
