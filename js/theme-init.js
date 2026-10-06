/* miau coffee — runs in <head> before the page paints.
   Applies the saved theme and language early so there is no flash of the wrong theme/language. */
(function () {
  'use strict';
  var root = document.documentElement;
  var theme = 'light';
  var lang = 'en';
  try {
    theme = localStorage.getItem('miau-theme') === 'dark' ? 'dark' : 'light';
    lang = localStorage.getItem('miau-lang') === 'mk' ? 'mk' : 'en';
  } catch (e) { /* storage unavailable — fall back to defaults */ }

  root.setAttribute('data-theme', theme);
  root.setAttribute('lang', lang);

  if (lang === 'mk') {
    // body stays hidden until i18n.js has translated it; failsafe in case scripts fail to load
    root.classList.add('i18n-pending');
    setTimeout(function () { root.classList.remove('i18n-pending'); }, 1500);
  }
})();
