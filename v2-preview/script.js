// ═══════════════════════════════════════════════════════
// MILO INSULATION — V2 Site Script
// SPA navigation, scroll reveals, stat counters
// ═══════════════════════════════════════════════════════

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ===== NAVIGATION =====
function navigateTo(page) {
  if (typeof event !== 'undefined' && event) event.preventDefault();

  // Switch pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');

  // Update nav active state
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.page === page);
  });

  // Close mobile nav
  closeMobileNav();

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Restart header stagger animation for the new page
  restartHeaderAnimation(target);

  // Re-observe reveal elements on the new page
  setTimeout(() => initReveals(), 60);
}

function restartHeaderAnimation(page) {
  if (!page || prefersReducedMotion) return;
  const header = page.querySelector('.page-header');
  if (!header) return;

  // Restart Ken Burns zoom
  const img = header.querySelector('.header-img');
  if (img) {
    img.style.animation = 'none';
    img.offsetHeight; // force reflow
    img.style.animation = '';
  }

  // Restart text stagger
  const items = header.querySelectorAll('.hdr-stagger');
  items.forEach(el => {
    el.style.transition = 'none';
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
  });
  header.offsetHeight; // force reflow
  items.forEach(el => {
    el.style.transition = '';
    el.style.opacity = '';
    el.style.transform = '';
  });
}

// ===== MOBILE NAV =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
});

function closeMobileNav() {
  navLinks.classList.remove('open');
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}

// Close mobile nav when clicking outside of it
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !navToggle.contains(e.target)) {
    closeMobileNav();
  }
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
function updateNavbar() {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', updateNavbar, { passive: true });

// ===== SCROLL REVEALS (Intersection Observer) =====
let revealObserver;

function initReveals() {
  if (revealObserver) revealObserver.disconnect();

  const activePage = document.querySelector('.page.active');
  const scopes = [activePage, document.querySelector('.footer')].filter(Boolean);

  if (prefersReducedMotion) {
    scopes.forEach(scope =>
      scope.querySelectorAll('.reveal').forEach(el => el.classList.add('visible')));
    return;
  }

  // Stagger children within each reveal-group (60-90ms steps)
  scopes.forEach(scope => {
    scope.querySelectorAll('.reveal-group').forEach(group => {
      const children = group.querySelectorAll(':scope .reveal');
      children.forEach((el, i) => {
        el.style.setProperty('--stagger', `${Math.min(i * 75, 600)}ms`);
      });
    });
  });

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        startCounters(entry.target);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

  scopes.forEach(scope => {
    scope.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));
  });
}

// ===== STAT COUNTERS =====
function startCounters(root) {
  const counters = root.matches('.count') ? [root] : root.querySelectorAll('.count');
  counters.forEach(el => {
    if (el.dataset.done) return;
    el.dataset.done = 'true';

    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const useComma = el.dataset.format === 'comma';
    const duration = 1400;

    if (prefersReducedMotion) return; // final value is already in markup

    const format = (v) => {
      let num = v.toFixed(decimals);
      if (useComma) num = Number(num).toLocaleString('en-US');
      return prefix + num + suffix;
    };

    const start = performance.now();
    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      el.textContent = format(target * eased);
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = format(target);
    }
    requestAnimationFrame(tick);
  });
}

// ===== SMOOTH SCROLL for internal anchor links =====
document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a[href^="#"]');
  if (anchor && anchor.getAttribute('href').length > 1) {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: prefersReducedMotion ? 'instant' : 'smooth' });
  }
});

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  updateNavbar();
  initReveals();
});
