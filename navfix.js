/* navfix.js — Homeowners & Builders pages
 * Loads milo-shared.js for global nav/footer + scroll-reveal.
 * Rewrites body CTA links from # to /free-inspection.
 */
(function() {
  var s = document.createElement('script');
  s.src = 'https://betterbranding.github.io/milo-scripts/milo-shared.js?v=' + Date.now();
  document.head.appendChild(s);

  function fixCTALinks() {
    var formUrl = (window.MILO_LOCATION_CONFIG && window.MILO_LOCATION_CONFIG.formUrl)
      || (window.MiloLocationConfig && window.MiloLocationConfig.formUrl)
      || '/free-inspection';
    document.querySelectorAll('a').forEach(function(a) {
      if (a.dataset.ctaFixed) return;
      var href = a.getAttribute('href');
      if (href === '#' || (href && href.endsWith('#') && !href.includes('#section'))) {
        a.dataset.ctaFixed = '1';
        a.href = formUrl;
      }
    });
  }

  function hidePhoneLine() {
    document.querySelectorAll('p, span, div').forEach(function(el) {
      if (el.textContent.indexOf('Give Us a Call') !== -1 || el.textContent.indexOf('give us a call') !== -1) {
        el.style.display = 'none';
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { fixCTALinks(); hidePhoneLine(); });
  } else {
    fixCTALinks();
    hidePhoneLine();
  }
  setTimeout(function() { fixCTALinks(); hidePhoneLine(); }, 500);
  setTimeout(function() { fixCTALinks(); hidePhoneLine(); }, 1500);
  setTimeout(function() { fixCTALinks(); hidePhoneLine(); }, 3000);
})();
