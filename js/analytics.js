/**
 * Analytics CRO – eventos de conversión (WA, llamar, scroll, FAQ).
 * No depende del dominio; sin hardcodes a dominios antiguos.
 */
(function () {
  'use strict';

  window.dataLayer = window.dataLayer || [];

  function trackEvent(name, params) {
    var payload = { event: name };
    if (params && typeof params === 'object') {
      for (var key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
          payload[key] = params[key];
        }
      }
    }
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, params || {});
    } else {
      window.dataLayer.push(payload);
    }
    // Descomentar para validar eventos en consola:
    // if (typeof console !== 'undefined' && console.log) { console.log('[Analytics]', name, payload); }
  }

  function getPlacement(el) {
    if (!el || !el.closest) return 'unknown';
    if (el.closest('#inicio') || el.closest('.hero')) return 'hero';
    if (el.closest('.sticky-cta')) return 'sticky';
    if (el.closest('#services')) return 'services';
    if (el.closest('#problems')) return 'problems';
    if (el.closest('#faq')) return 'faq';
    if (el.closest('#location')) return 'location';
    return 'unknown';
  }

  function getLinkText(el) {
    if (!el) return '';
    var text = (el.textContent || '').trim();
    return text.slice(0, 200);
  }

  function initCtaTracking() {
    document.addEventListener(
      'click',
      function (e) {
        var target = e.target && e.target.closest ? e.target.closest('a') : null;
        if (!target || !target.href) return;

        var href = target.getAttribute('href') || target.href || '';

        if (href.indexOf('wa.me') !== -1 || href.indexOf('api.whatsapp.com') !== -1) {
          trackEvent('cta_whatsapp_click', {
            placement: getPlacement(target),
            href: href,
            text: getLinkText(target)
          });
        } else if (href.indexOf('tel:') === 0) {
          trackEvent('cta_call_click', {
            placement: getPlacement(target),
            href: href,
            text: getLinkText(target)
          });
        }
      },
      true
    );
  }

  function initScrollTracking() {
    var scroll50Done = false;
    var scroll90Done = false;
    var ticking = false;

    function checkScroll() {
      if (scroll50Done && scroll90Done) return;
      var doc = document.documentElement;
      var scrollTop = window.pageYOffset || doc.scrollTop;
      var scrollHeight = doc.scrollHeight - doc.clientHeight;
      if (scrollHeight <= 0) return;
      var pct = scrollTop / scrollHeight;

      if (!scroll50Done && pct >= 0.5) {
        scroll50Done = true;
        trackEvent('scroll_50', { depth: 50 });
      }
      if (!scroll90Done && pct >= 0.9) {
        scroll90Done = true;
        trackEvent('scroll_90', { depth: 90 });
      }
      ticking = false;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(checkScroll);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    checkScroll();
  }

  function initFaqTracking() {
    var faqList = document.querySelector('#faq .faq__list');
    if (!faqList) return;

    faqList.addEventListener('toggle', function (e) {
      var details = e.target;
      if (!details.open || !details.classList.contains('faq-item')) return;

      var questionEl = details.querySelector('.faq-item__question');
      var question = questionEl ? questionEl.textContent.trim() : '';
      var items = faqList.querySelectorAll('.faq-item');
      var index = 0;
      for (var i = 0; i < items.length; i++) {
        if (items[i] === details) {
          index = i + 1;
          break;
        }
      }
      trackEvent('faq_open', { question: question, index: index });
    });
  }

  function init() {
    if (window.__analyticsCROInit) return;
    window.__analyticsCROInit = true;

    initCtaTracking();
    initScrollTracking();
    initFaqTracking();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
