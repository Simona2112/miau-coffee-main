/* miau coffee — shared site behaviour */
(function () {
  'use strict';

  // translation helper from i18n.js (falls back to English if it is missing)
  function t(en) { return window.miauI18n ? window.miauI18n.t(en) : en; }
  function onLangChange(fn) { document.addEventListener('miau:langchange', fn); }

  /* ---------- dark / light theme ---------- */
  var THEME_KEY = 'miau-theme';
  var themeToggle = document.getElementById('theme-toggle');
  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }
  function updateThemeToggle() {
    if (!themeToggle) return;
    var dark = currentTheme() === 'dark';
    var label = t(dark ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggle.setAttribute('aria-pressed', dark ? 'true' : 'false');
    themeToggle.setAttribute('aria-label', label);
    themeToggle.setAttribute('title', label);
  }
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* storage unavailable */ }
      updateThemeToggle();
    });
  }
  updateThemeToggle();
  onLangChange(updateThemeToggle);

  /* ---------- sticky header ---------- */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  var hamburger = document.querySelector('.hamburger');
  var mobileMenu = document.querySelector('.mobile-menu');
  function setMenu(open) {
    hamburger.classList.toggle('active', open);
    mobileMenu.classList.toggle('active', open);
    if (header) header.classList.toggle('menu-open', open);
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      setMenu(!mobileMenu.classList.contains('active'));
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        setMenu(false);
        hamburger.focus();
      }
    });
    // close the menu if the window grows past the mobile breakpoint
    window.addEventListener('resize', function () {
      if (getComputedStyle(hamburger).display === 'none' && mobileMenu.classList.contains('active')) setMenu(false);
    });
  }

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- hero video sequence ---------- */
  var heroMedia = document.querySelector('.hero-media');
  if (heroMedia) {
    var videos = Array.prototype.slice.call(heroMedia.querySelectorAll('video'));
    if (videos.length) {
      var current = 0;
      videos[0].classList.add('active');
      var playCurrent = function () {
        var v = videos[current];
        v.currentTime = 0;
        var p = v.play();
        if (p && p.catch) p.catch(function () {});
      };
      playCurrent();
      videos.forEach(function (v, i) {
        v.addEventListener('ended', function () {
          videos[current].classList.remove('active');
          current = (current + 1) % videos.length;
          videos[current].classList.add('active');
          playCurrent();
        });
      });
      // Safety: if video fails to load/play (e.g. slow network), fall back to poster only.
      videos.forEach(function (v) {
        v.addEventListener('error', function () {
          heroMedia.classList.add('video-error');
        });
      });
    }
  }

  /* ---------- gallery lightbox ---------- */
  var lightboxItems = document.querySelectorAll('[data-lightbox]');
  if (lightboxItems.length) {
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML =
      '<button type="button" class="lightbox-close" aria-label="Close">' + iconClose() + '</button>' +
      '<button type="button" class="lightbox-prev" aria-label="Previous image">' + iconChevron('left') + '</button>' +
      '<img src="" alt="">' +
      '<button type="button" class="lightbox-next" aria-label="Next image">' + iconChevron('right') + '</button>' +
      '<div class="lightbox-caption" data-i18n-skip></div>';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Gallery');
    document.body.appendChild(lb);
    if (window.miauI18n) window.miauI18n.register(lb);
    var lastFocus = null;
    var lbImg = lb.querySelector('img');
    var lbCaption = lb.querySelector('.lightbox-caption');
    var items = Array.prototype.slice.call(lightboxItems);
    var idx = 0;

    function openLightbox(i) {
      idx = i;
      var el = items[idx];
      var full = el.getAttribute('data-full') || el.querySelector('img').src;
      lbImg.src = full;
      lbImg.alt = el.querySelector('img').alt || '';
      lbCaption.textContent = el.getAttribute('data-caption') || el.querySelector('img').alt || '';
      if (!lb.classList.contains('active')) lastFocus = document.activeElement;
      lb.classList.add('active');
      document.body.style.overflow = 'hidden';
      lb.querySelector('.lightbox-close').focus();
    }
    function closeLightbox() {
      lb.classList.remove('active');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    }
    function show(delta) {
      idx = (idx + delta + items.length) % items.length;
      openLightbox(idx);
    }
    items.forEach(function (el, i) {
      el.addEventListener('click', function () { openLightbox(i); });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(i); }
      });
    });
    lb.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lb.querySelector('.lightbox-prev').addEventListener('click', function () { show(-1); });
    lb.querySelector('.lightbox-next').addEventListener('click', function () { show(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') show(-1);
      if (e.key === 'ArrowRight') show(1);
    });
  }

  function iconClose() {
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="4" x2="20" y2="20"/><line x1="20" y1="4" x2="4" y2="20"/></svg>';
  }
  function iconChevron(dir) {
    var d = dir === 'left' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6';
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="' + d + '"/></svg>';
  }

  /* ---------- generic modal open/close (event reservation) ---------- */
  var modalOpener = null;
  function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    if (modalOpener) { modalOpener.focus(); modalOpener = null; }
  }
  // the event name shown in the modal is kept in English and translated on display
  var modalEventName = 'Choose an event to reserve.';
  function renderModalEventName() {
    document.querySelectorAll('[data-event-name-field]').forEach(function (el) {
      el.textContent = t(modalEventName);
    });
  }
  document.querySelectorAll('[data-modal-open]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-modal-open');
      var modal = document.getElementById(id);
      if (!modal) return;
      var eventName = btn.getAttribute('data-event-name');
      if (eventName) {
        modalEventName = eventName;
        renderModalEventName();
        var hiddenInput = modal.querySelector('input[name="event"]');
        if (hiddenInput) hiddenInput.value = eventName;
      }
      modalOpener = btn;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      var firstInput = modal.querySelector('input:not([type="hidden"]), select, textarea');
      if (firstInput) setTimeout(function () { firstInput.focus(); }, 50);
    });
  });
  document.querySelectorAll('[data-modal-close]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var modal = btn.closest('.modal-overlay');
      if (modal) closeModal(modal);
    });
  });
  document.querySelectorAll('.modal-overlay').forEach(function (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal(modal);
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = document.querySelector('.modal-overlay.active');
    if (open) closeModal(open);
  });
  renderModalEventName();
  onLangChange(renderModalEventName);

  /* ---------- form validation (contact + reservation) ---------- */
  function validateField(field) {
    var wrap = field.closest('.form-field');
    if (!wrap) return true;
    var errorEl = wrap.querySelector('.field-error');
    var value = field.value.trim();
    var valid = true;
    var message = '';

    if (field.hasAttribute('required') && !value) {
      valid = false;
      message = 'This field is required.';
    } else if (field.type === 'email' && value) {
      var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(value)) { valid = false; message = 'Please enter a valid email address.'; }
    } else if (field.type === 'tel' && value) {
      var reTel = /^[0-9+()\-\s]{6,}$/;
      if (!reTel.test(value)) { valid = false; message = 'Please enter a valid phone number.'; }
    }

    wrap.classList.toggle('error', !valid);
    field.setAttribute('aria-invalid', valid ? 'false' : 'true');
    if (errorEl) errorEl.textContent = valid ? '' : t(message);
    return valid;
  }

  document.querySelectorAll('form[data-validate]').forEach(function (form) {
    // error messages are filled in by JS, so link them to their fields for screen readers
    form.querySelectorAll('.form-field').forEach(function (wrap) {
      var field = wrap.querySelector('input, textarea, select');
      var errorEl = wrap.querySelector('.field-error');
      if (!field || !errorEl || !field.id) return;
      errorEl.id = field.id + '-error';
      errorEl.setAttribute('aria-live', 'polite');
      errorEl.setAttribute('data-i18n-skip', '');
      field.setAttribute('aria-describedby', errorEl.id);
    });
    var fields = form.querySelectorAll('input, textarea, select');
    fields.forEach(function (field) {
      field.addEventListener('blur', function () { validateField(field); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var allValid = true;
      fields.forEach(function (field) {
        if (!validateField(field)) allValid = false;
      });
      if (!allValid) {
        var firstError = form.querySelector('.form-field.error input, .form-field.error textarea');
        if (firstError) firstError.focus();
        return;
      }
      // No backend: the message is not sent anywhere, the visitor just gets a confirmation on the page.
      var successEl = form.parentElement.querySelector('.form-success') || document.getElementById(form.getAttribute('data-success-target'));
      form.reset();
      form.style.display = 'none';
      if (successEl) {
        successEl.classList.add('active');
        if (successEl.hasAttribute('tabindex')) successEl.focus();
      }
    });
  });
  // re-translate any visible validation messages when the language changes
  onLangChange(function () {
    document.querySelectorAll('form[data-validate] .form-field.error').forEach(function (wrap) {
      var field = wrap.querySelector('input, textarea, select');
      if (field) validateField(field);
    });
  });

  /* ---------- cookie consent ---------- */
  var CONSENT_KEY = 'miau-cookie-consent';
  var CONSENT_COOKIE = 'miau_cookie_consent';
  var banner = document.getElementById('cookie-banner');

  function getConsent() {
    try {
      var v = localStorage.getItem(CONSENT_KEY);
      if (v === 'accepted' || v === 'rejected') return v;
    } catch (e) { /* storage unavailable */ }
    var m = document.cookie.match(/(?:^|;\s*)miau_cookie_consent=(accepted|rejected)/);
    return m ? m[1] : null;
  }
  function setConsentCookie(value, maxAge) {
    try {
      document.cookie = CONSENT_COOKIE + '=' + value + '; max-age=' + maxAge + '; path=/; SameSite=Lax';
    } catch (e) { /* cookies unavailable */ }
  }
  function saveConsent(value) {
    try {
      localStorage.setItem(CONSENT_KEY, value);
      localStorage.setItem(CONSENT_KEY + '-date', new Date().toISOString());
    } catch (e) { /* storage unavailable */ }
    setConsentCookie(value, 60 * 60 * 24 * 365);
    renderConsent();
  }
  function resetConsent() {
    try {
      localStorage.removeItem(CONSENT_KEY);
      localStorage.removeItem(CONSENT_KEY + '-date');
    } catch (e) { /* storage unavailable */ }
    setConsentCookie('', 0);
    renderConsent();
  }
  function renderConsent() {
    var consent = getConsent();
    if (banner) banner.hidden = !!consent;
    document.querySelectorAll('[data-cookie-status]').forEach(function (el) {
      el.textContent = t(consent === 'accepted' ? 'Accepted' : consent === 'rejected' ? 'Rejected' : 'Not set yet');
    });
  }
  document.querySelectorAll('[data-cookie-choice]').forEach(function (btn) {
    btn.addEventListener('click', function () { saveConsent(btn.getAttribute('data-cookie-choice')); });
  });
  document.querySelectorAll('[data-cookie-reset]').forEach(function (btn) {
    btn.addEventListener('click', resetConsent);
  });
  renderConsent();
  onLangChange(renderConsent);
  // other scripts can check consent before using optional cookies
  window.miauCookieConsent = { get: getConsent, reset: resetConsent };

  /* ---------- gallery category filter ---------- */
  var filterBadges = document.querySelectorAll('[data-filter]');
  if (filterBadges.length) {
    filterBadges.forEach(function (badge) {
      badge.addEventListener('click', function () {
        filterBadges.forEach(function (b) { b.classList.remove('active'); });
        badge.classList.add('active');
        var filter = badge.getAttribute('data-filter');
        document.querySelectorAll('[data-category]').forEach(function (item) {
          var match = filter === 'all' || item.getAttribute('data-category') === filter;
          item.style.display = match ? '' : 'none';
        });
      });
    });
  }

  /* ---------- set active nav link ---------- */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === currentPage) a.classList.add('active');
  });

  /* ---------- footer year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
