/* navfix-milex.js — v12: Uses milo-shared.js for nav/footer
 * 1. Loads milo-shared.js for global nav + footer
 * 2. Fetches milex-content.html for page body
 * 3. Injects MILEX-scoped CSS
 */
(function() {
  'use strict';

  /* Load shared module (provides nav, footer, scroll-reveal) */
  var shared = document.createElement('script');
  shared.src = 'https://betterbranding.github.io/milo-scripts/milo-shared.js?v=' + Date.now();
  document.head.appendChild(shared);

  /* ── MILEX-SPECIFIC CSS (scoped to #milex-content) ── */
  var css = document.createElement('style');
  css.id = 'milex-styles';
  css.textContent = [
    ':root {',
    '  --green: #288D11; --green-dark: #1C630C; --green-darker: #114709;',
    '  --green-light: #69AF58; --green-lighter: #A9D1A0; --green-bg: #EAF4E7;',
    '  --navy: #074387; --navy-dark: #042244;',
    '  --orange: #FF8200; --blue-light: #50ACE1; --white: #FFFFFF;',
    '  --gray-50: #f9fafb; --gray-100: #f3f4f6; --gray-200: #e5e7eb;',
    '  --gray-300: #d1d5db; --gray-500: #6b7280; --gray-700: #374151; --gray-900: #111827;',
    '  --font-title: "League Spartan", sans-serif;',
    '  --font-body: "Nunito Sans", "Gotham", sans-serif;',
    '  --glass-bg: rgba(255,255,255,0.7);',
    '  --glass-border: rgba(255,255,255,0.3);',
    '  --glass-shadow: 0 8px 32px rgba(0,0,0,0.08);',
    '}',

    /* Base */
    '#milex-content { font-family: var(--font-body); color: var(--gray-900); line-height: 1.6; overflow-x: hidden; }',
    '#milex-content *, #milex-content *::before, #milex-content *::after { box-sizing: border-box; }',
    '#milex-content a { text-decoration: none; color: inherit; }',
    '#milex-content img { max-width: 100%; height: auto; display: block; }',
    '#milex-content ul { list-style: none; margin: 0; padding: 0; }',

    /* Layout */
    '#milex-content .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }',
    '#milex-content .section { padding: 5rem 0; }',
    '#milex-content .text-center { text-align: center; }',
    '#milex-content .max-w-lg { max-width: 720px; margin-left: auto; margin-right: auto; }',
    '#milex-content .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start; }',
    '#milex-content .two-col.align-center { align-items: center; }',

    /* Backgrounds */
    '#milex-content .bg-white { background: var(--white); }',
    '#milex-content .bg-light-green { background: var(--green-bg); }',

    /* Typography */
    '#milex-content .section-tag {',
    '  display: inline-block; font-family: var(--font-title); font-size: 0.85rem;',
    '  font-weight: 700; letter-spacing: 2px; text-transform: uppercase;',
    '  color: var(--green); margin-bottom: 0.75rem; position: relative; padding-bottom: 0.5rem;',
    '}',
    '#milex-content .section-tag::after {',
    '  content: ""; position: absolute; bottom: 0; left: 0;',
    '  width: 40px; height: 3px; background: var(--orange); border-radius: 2px;',
    '}',
    '#milex-content .text-center .section-tag::after { left: 50%; transform: translateX(-50%); }',
    '#milex-content .section-tag.light { color: var(--green-lighter); }',
    '#milex-content .section-tag.light::after { background: var(--orange); }',
    '#milex-content .section-title {',
    '  font-family: var(--font-title); font-size: 2.5rem; font-weight: 800;',
    '  line-height: 1.15; color: var(--gray-900); margin-bottom: 1.25rem; margin-top: 0;',
    '}',
    '#milex-content .section-title.light { color: var(--white); }',
    '#milex-content .sub-heading {',
    '  font-family: var(--font-title); font-size: 1.5rem; font-weight: 700;',
    '  color: var(--green-dark); margin-bottom: 1rem;',
    '}',
    '#milex-content .body-text { font-size: 1.05rem; line-height: 1.75; color: var(--gray-700); margin-bottom: 1rem; }',
    '#milex-content .body-text.light { color: rgba(255,255,255,0.9); }',
    '#milex-content .highlight-text { color: var(--green-lighter) !important; }',

    /* Buttons */
    '#milex-content .btn {',
    '  display: inline-flex; align-items: center; gap: 0.5rem;',
    '  font-family: var(--font-title); font-size: 1rem; font-weight: 700;',
    '  padding: 0.85rem 2rem; border-radius: 50px; border: 2px solid transparent;',
    '  cursor: pointer; transition: all 0.3s ease; letter-spacing: 0.5px;',
    '}',
    '#milex-content .btn i { transition: transform 0.3s ease; }',
    '#milex-content .btn:hover i { transform: translateX(4px); }',
    '#milex-content .btn-orange { background: var(--orange); color: var(--white); border-color: var(--orange); }',
    '#milex-content .btn-orange:hover {',
    '  background: #e67400; border-color: #e67400;',
    '  transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,130,0,0.35);',
    '}',

    /* Glass cards */
    '#milex-content .glass-card {',
    '  background: var(--glass-bg); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);',
    '  border: 1px solid var(--glass-border); border-radius: 16px;',
    '  box-shadow: var(--glass-shadow); padding: 1.25rem 1.5rem;',
    '  transition: transform 0.35s ease, box-shadow 0.35s ease;',
    '}',
    '#milex-content .glass-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.12); }',

    /* Hero */
    '#milex-content .page-hero {',
    '  position: relative; min-height: 50vh; display: flex;',
    '  align-items: center; justify-content: center; background-size: cover; background-position: center;',
    '}',
    '#milex-content .page-hero-overlay {',
    '  position: absolute; inset: 0;',
    '  background: linear-gradient(135deg, rgba(4,34,68,0.85) 0%, rgba(17,71,9,0.75) 100%);',
    '}',
    '#milex-content .page-hero-content { position: relative; z-index: 2; text-align: center; padding: 8rem 2rem 4rem; }',
    '#milex-content .page-hero-content h1 {',
    '  font-family: var(--font-title); font-size: 3.2rem; font-weight: 900; color: var(--white); margin: 0 0 0.75rem;',
    '}',
    '#milex-content .page-hero-content p { font-size: 1.2rem; color: rgba(255,255,255,0.8); margin: 0; }',
    '#milex-content .hero-badge {',
    '  display: inline-block; font-family: var(--font-title); font-size: 0.8rem; font-weight: 700;',
    '  letter-spacing: 2px; text-transform: uppercase; color: var(--orange);',
    '  border: 1.5px solid var(--orange); padding: 0.4rem 1.2rem; border-radius: 50px; margin-bottom: 1.5rem;',
    '}',
    '#milex-content .milex-hero { background-image: url("https://betterbranding.github.io/milo-scripts/milex-hero.jpg"); }',

    /* Process steps */
    '#milex-content .process-visual { display: flex; flex-direction: column; gap: 0.75rem; }',
    '#milex-content .process-step {',
    '  display: flex; align-items: center; gap: 1.25rem; padding: 1.25rem 1.5rem; position: relative;',
    '}',
    '#milex-content .process-num {',
    '  font-family: var(--font-title); font-size: 1.5rem; font-weight: 900; color: var(--green); min-width: 28px; flex-shrink: 0;',
    '}',
    '#milex-content .process-step i:not(.process-num) { font-size: 1.3rem; color: var(--navy); min-width: 28px; text-align: center; flex-shrink: 0; }',
    '#milex-content .process-step h4 {',
    '  font-family: var(--font-title); font-size: 1rem; font-weight: 700; margin: 0 0 0.15rem; white-space: nowrap;',
    '}',
    '#milex-content .process-step p { font-size: 0.85rem; color: var(--gray-500); margin: 0; flex: 1; min-width: 0; }',
    '#milex-content .process-arrow { text-align: center; color: var(--green-light); font-size: 1rem; animation: milex-bounceDown 1.5s ease-in-out infinite; }',
    '@keyframes milex-bounceDown { 0%,100% { transform: translateY(0); } 50% { transform: translateY(5px); } }',

    /* Eco stats */
    '#milex-content .eco-stats { display: flex; gap: 1rem; margin-top: 1.5rem; flex-wrap: wrap; }',
    '#milex-content .eco-stat {',
    '  display: flex; align-items: center; gap: 0.6rem;',
    '  padding: 0.75rem 1.25rem; font-size: 0.9rem; font-weight: 600; color: var(--green-dark);',
    '}',
    '#milex-content .eco-stat i { color: var(--green); font-size: 1.1rem; }',

    /* Sustainability photo */
    '#milex-content .sorghum-large-img {',
    '  width: 400px; height: 400px; border-radius: 50%; object-fit: cover;',
    '  border: 4px solid var(--green); box-shadow: 0 12px 40px rgba(40,141,17,0.2);',
    '  margin: 0 auto; display: block;',
    '}',

    /* Thermal puff section */
    '#milex-content .thermal-puff-section {',
    '  background: linear-gradient(135deg, var(--navy-dark) 0%, var(--green-darker) 60%, var(--navy) 100%);',
    '  position: relative; overflow: hidden;',
    '}',

    /* CTA section */
    '#milex-content .cta-final {',
    '  background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 100%); padding: 5rem 2rem; text-align: center;',
    '}',
    '#milex-content .cta-final .section-tag { color: var(--orange); }',
    '#milex-content .cta-final h2 { color: white; font-family: var(--font-title); font-size: 2.5rem; margin: 1rem 0; }',
    '#milex-content .cta-final p { color: rgba(255,255,255,0.8); max-width: 600px; margin: 0 auto 2rem; }',

    /* Scroll animations */
    '#milex-content .animate-on-scroll { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }',
    '#milex-content .animate-on-scroll.slide-left { transform: translateX(-40px); }',
    '#milex-content .animate-on-scroll.slide-right { transform: translateX(40px); }',
    '#milex-content .animate-on-scroll.visible { opacity: 1; transform: translate(0,0); }',

    /* Responsive */
    '@media (max-width: 768px) {',
    '  #milex-content .two-col { grid-template-columns: 1fr; gap: 2rem; }',
    '  #milex-content .section { padding: 3.5rem 0; }',
    '  #milex-content .section-title { font-size: 2rem; }',
    '  #milex-content .page-hero-content h1 { font-size: 2.2rem; }',
    '  #milex-content .sorghum-large-img { width: 280px; height: 280px; }',
    '}'
  ].join('\n');
  document.head.appendChild(css);

  /* ── INJECT MILEX CONTENT ── */
  function injectContent() {
    var ghlSection = document.querySelector('.section-Lg9u8NXGW-');
    if (ghlSection) ghlSection.style.display = 'none';
    if (document.getElementById('milex-content')) return;
    var container = document.getElementById('preview-container');
    if (!container) return;

    var wrapper = document.createElement('div');
    wrapper.id = 'milex-content';
    var firstChild = container.querySelector('div');
    if (firstChild) {
      container.insertBefore(wrapper, firstChild);
    } else {
      container.appendChild(wrapper);
    }

    var baseUrl = 'https://betterbranding.github.io/milo-scripts/';
    fetch(baseUrl + 'milex-content.html?v=' + Date.now())
      .then(function(r) { return r.text(); })
      .then(function(html) {
        wrapper.innerHTML = html;
        /* Scroll animations for MILEX content */
        var obs = new IntersectionObserver(function(entries) {
          entries.forEach(function(e) { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        wrapper.querySelectorAll('.animate-on-scroll').forEach(function(el) { obs.observe(el); });
      })
      .catch(function(err) { console.error('MILEX content fetch failed:', err); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectContent);
  } else {
    injectContent();
  }
  setTimeout(injectContent, 500);
  setTimeout(injectContent, 1500);
  setTimeout(injectContent, 3000);
})();
