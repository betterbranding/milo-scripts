/* MILO V3 location helper (GHL per-page mode)
   Reads window.MILO_LOCATION, fetches locations/{id}.json from the milo-scripts repo,
   then rewrites CTA links, footer phone and footer city. Safe no-op on failure. */
(function () {
  var BASE = 'https://betterbranding.github.io/milo-scripts/';
  var loc = (window.MILO_LOCATION || '').trim();
  if (!loc || loc.indexOf('__') === 0) loc = 'tulia';

  function apply(cfg) {
    if (!cfg) return;
    var formUrl = cfg.formUrl || '/free-inspection';
    document.querySelectorAll('[data-cta]').forEach(function (a) {
      var h = a.getAttribute('href');
      if (!h || h === '#' || h === '') a.setAttribute('href', formUrl);
    });
    var ph = document.getElementById('footerPhone');
    if (ph && cfg.phone) {
      ph.innerHTML = '<a href="tel:' + cfg.phone.replace(/[^0-9+]/g, '') + '" style="color:inherit;text-decoration:none">' + cfg.phone + '</a>';
    }
    var city = document.getElementById('footerCity');
    if (city && cfg.locationLabel) city.textContent = cfg.locationLabel;
    if (cfg.metaPixelId && !window.fbq) {
      try {
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
        window.fbq('init', cfg.metaPixelId);
        window.fbq('track', 'PageView');
      } catch (e) {}
    }
  }

  function run() {
    fetch(BASE + 'locations/' + loc + '.json?v=' + Math.floor(Date.now() / 600000))
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(apply)
      .catch(function () { apply({ formUrl: '/free-inspection' }); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
