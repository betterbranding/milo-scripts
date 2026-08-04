// ═══════════════════════════════════════════════════════════
// MILO INSULATION — V3 "Editorial Material"
// Hash SPA navigation · scroll reveals · count-ups · scrollytelling
// ═══════════════════════════════════════════════════════════

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const PAGES = ['home', 'milex', 'homeowners', 'builders'];

  // ───── SPA NAVIGATION (hash-based) ─────
  function currentPageFromHash() {
    const hash = window.location.hash.replace(/^#\/?/, '');
    return PAGES.includes(hash) ? hash : 'home';
  }

  function showPage(page, scrollTop = true) {
    document.querySelectorAll('.page').forEach((p) => {
      p.classList.toggle('active', p.dataset.page === page);
    });
    document.querySelectorAll('.nav-link, .menu-link').forEach((link) => {
      link.classList.toggle('active', link.dataset.page === page);
    });
    closeMenu();
    if (scrollTop) window.scrollTo({ top: 0, behavior: 'instant' });
    restartHeroAnimation(document.querySelector('.page.active'));
    // Re-arm observers for the newly shown page
    setTimeout(() => {
      initReveals();
      initScrolly();
    }, 60);
  }

  window.addEventListener('hashchange', () => showPage(currentPageFromHash()));

  function restartHeroAnimation(page) {
    if (!page || prefersReducedMotion) return;
    page.querySelectorAll('.hero-stagger').forEach((el) => {
      el.style.animation = 'none';
    });
    const media = page.querySelector('.hero-media img');
    if (media) media.style.animation = 'none';
    void page.offsetHeight; // force reflow
    page.querySelectorAll('.hero-stagger').forEach((el) => {
      el.style.animation = '';
    });
    if (media) media.style.animation = '';
  }

  // ───── MOBILE OVERLAY MENU ─────
  const navToggle = document.getElementById('navToggle');
  const menuOverlay = document.getElementById('menuOverlay');

  function openMenu() {
    menuOverlay.classList.add('open');
    navToggle.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
    menuOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menuOverlay.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    menuOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', () => {
    menuOverlay.classList.contains('open') ? closeMenu() : openMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOverlay.classList.contains('open')) closeMenu();
  });

  // ───── NAVBAR SCROLL STATE ─────
  const navbar = document.getElementById('navbar');
  function updateNavbar() {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }
  window.addEventListener('scroll', updateNavbar, { passive: true });

  // ───── SCROLL REVEALS ─────
  let revealObserver = null;

  function initReveals() {
    if (revealObserver) revealObserver.disconnect();

    const activePage = document.querySelector('.page.active');
    const scopes = [activePage, document.querySelector('.footer')].filter(Boolean);

    if (prefersReducedMotion) {
      scopes.forEach((scope) =>
        scope.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'))
      );
      startCounters(document);
      return;
    }

    // Stagger siblings within each reveal-group
    scopes.forEach((scope) => {
      scope.querySelectorAll('.reveal-group').forEach((group) => {
        group.querySelectorAll(':scope .reveal').forEach((el, i) => {
          el.style.setProperty('--stagger', Math.min(i * 80, 560) + 'ms');
        });
      });
    });

    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            startCounters(entry.target);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );

    scopes.forEach((scope) => {
      scope.querySelectorAll('.reveal:not(.visible)').forEach((el) => revealObserver.observe(el));
    });
  }

  // ───── COUNT-UP STATS ─────
  function startCounters(root) {
    const counters =
      root.nodeType === 1 && root.matches('.count') ? [root] : root.querySelectorAll('.count');
    counters.forEach((el) => {
      if (el.dataset.done) return;
      el.dataset.done = 'true';
      if (prefersReducedMotion) return; // final value already in markup

      const target = parseFloat(el.dataset.count);
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const useComma = el.dataset.format === 'comma';
      const duration = 1500;

      const format = (v) => {
        let num = v.toFixed(decimals);
        if (useComma) num = Number(num).toLocaleString('en-US');
        return prefix + num + suffix;
      };

      const start = performance.now();
      (function tick(now) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = format(target * eased);
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = format(target);
      })(start);
    });
  }

  // ───── SCROLLYTELLING (field to wall) ─────
  let scrollyObserver = null;

  function initScrolly() {
    if (scrollyObserver) scrollyObserver.disconnect();

    const scrolly = document.querySelector('.page.active #scrolly');
    if (!scrolly) return;

    const images = scrolly.querySelectorAll('.scrolly-img');
    const dots = scrolly.querySelectorAll('.scrolly-progress i');
    const steps = scrolly.querySelectorAll('.scrolly-step');

    function activate(index) {
      images.forEach((img) => img.classList.toggle('active', img.dataset.step === String(index)));
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
      steps.forEach((s) => s.classList.toggle('active', s.dataset.step === String(index)));
    }

    activate(0);

    scrollyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activate(parseInt(entry.target.dataset.step, 10));
          }
        });
      },
      { rootMargin: '-42% 0px -42% 0px', threshold: 0 }
    );

    steps.forEach((step) => scrollyObserver.observe(step));
  }

  // ───── CTA PLACEHOLDERS ─────
  // All [data-cta] links point to "#" for now (rewritten to formUrl later).
  document.addEventListener('click', (e) => {
    const cta = e.target.closest('[data-cta]');
    if (cta && cta.getAttribute('href') === '#') {
      e.preventDefault();
    }
  });

  // ───── INIT ─────
  document.addEventListener('DOMContentLoaded', () => {
    updateNavbar();
    showPage(currentPageFromHash(), false);
  });
})();
