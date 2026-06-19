/* ============================================================
   main.js — Scanlon Insurance Landing Page
============================================================ */

'use strict';

// ── Scroll-reveal (IntersectionObserver) ──────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // fire once
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// ── Sticky nav shadow ─────────────────────────────────────────
const header = document.getElementById('site-header');
const onScroll = () => {
  if (window.scrollY > 24) {
    header.classList.add('nav-bar--scrolled');
  } else {
    header.classList.remove('nav-bar--scrolled');
  }
};
window.addEventListener('scroll', onScroll, { passive: true });

// ── Mobile hamburger ──────────────────────────────────────────
const hamburger  = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon   = hamburger.querySelector('.material-symbols-outlined');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  mobileMenu.setAttribute('aria-hidden', !isOpen);
  menuIcon.textContent = isOpen ? 'close' : 'menu';
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuIcon.textContent = 'menu';
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!header.contains(e.target) && mobileMenu.classList.contains('open')) {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuIcon.textContent = 'menu';
  }
});

// ── Active nav link on scroll ─────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove('nav-link--active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('nav-link--active');
          }
        });
      }
    });
  },
  { threshold: 0.35 }
);

sections.forEach((s) => sectionObserver.observe(s));

// ── Contact form (client-side demo) ──────────────────────────
const form = document.getElementById('quote-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = document.getElementById('form-submit-btn');
    const originalText = btn.innerHTML;

    // Basic validation
    const required = form.querySelectorAll('[required]');
    let valid = true;
    required.forEach((field) => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#C53030';
        valid = false;
      }
    });
    if (!valid) return;

    // Simulate submission
    btn.innerHTML = `<span class="material-symbols-outlined" style="animation:spin 1s linear infinite">progress_activity</span> Sending…`;
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = `<span class="material-symbols-outlined">check_circle</span> Enquiry Sent!`;
      btn.style.backgroundColor = '#2D6A4F';
      form.reset();
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.backgroundColor = '';
        btn.disabled = false;
      }, 4000);
    }, 1800);
  });
}

// Spin animation for submit button loader
const spinStyle = document.createElement('style');
spinStyle.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
document.head.appendChild(spinStyle);

// ── Smooth scroll for anchor links ───────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const headerOffset = 84;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Hero copy: staggered entrance ────────────────────────────
// Immediately visible (hero is above fold)
document.querySelectorAll('.hero .reveal').forEach((el, i) => {
  setTimeout(() => el.classList.add('visible'), 100 + i * 120);
});
