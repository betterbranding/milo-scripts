/* navfix.js — Homeowners & Builders pages
 * Loads milo-shared.js for global nav/footer + scroll-reveal.
 * Rewrites body CTA links from # to /free-inspection.
 */
(function() {
  var s = document.createElement('script');
  s.src = 'https://betterbranding.github.io/milo-scripts/milo-shared.js?v=' + Date.now();
  document.head.appendChild(s);

  function fixCTALinks() {
    var formUrl = (window.MILO_LOCATION_CONFIG && window.MILO_LOCATION_CONFIG.formUrl) || '/free-inspection';
    document.querySelectorAll('a[href="#"]').forEach(function(a) {
      if (a.dataset.ctaFixed) return;
      a.dataset.ctaFixed = '1';
      a.href = formUrl;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixCTALinks);
  } else {
    fixCTALinks();
  }
  setTimeout(fixCTALinks, 500);
  setTimeout(fixCTALinks, 1500);
  setTimeout(fixCTALinks, 3000);
})();
