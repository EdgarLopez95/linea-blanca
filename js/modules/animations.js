/**
 * GSAP animations module.
 * initAnimations() must be called after DOM is ready.
 */
export function initAnimations() {
  if (typeof window.gsap === 'undefined') {
    console.error('GSAP is not loaded. Animations will not run.');
    return;
  }

  const gsap = window.gsap;
  const topbar = document.querySelector('.topbar');
  const headerInner = document.querySelector('.header__inner');
  if (!headerInner) return;

  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

  if (topbar) {
    tl.from(topbar, {
      opacity: 0,
      y: -16,
      duration: 0.45,
    });
    tl.addLabel('whiteBarStart', '-=0.42');
    tl.addLabel('afterTopbar', '-=0.25');
    const topbarItems = topbar.querySelectorAll('.topbar__item');
    const topbarTextChars = [];
    topbarItems.forEach((item) => {
      const textEl = item.querySelector('.topbar__text');
      if (!textEl) return;
      const text = textEl.textContent;
      const chars = text.split('').map((c) => {
        const span = document.createElement('span');
        span.className = 'topbar__char';
        span.textContent = c;
        gsap.set(span, { opacity: 0 });
        return span;
      });
      textEl.textContent = '';
      chars.forEach((c) => textEl.appendChild(c));
      topbarTextChars.push(chars);
    });
    topbarTextChars.forEach((chars) => {
      if (chars.length === 0) return;
      tl.to(chars, {
        opacity: 1,
        duration: 0.02,
        stagger: 0.02,
        ease: 'power2.out',
      }, 'afterTopbar');
    });
  }

  tl.from(headerInner, {
    opacity: 0,
    y: -12,
    duration: 0.5,
  }, topbar ? 'whiteBarStart' : 0);

  const brand = headerInner.querySelector('.brand');
  const navLinks = headerInner.querySelectorAll('.drawer__links a');
  const ctaBlock = headerInner.querySelector('.nav__actions');
  const staggerTargets = [brand, ...navLinks, ctaBlock].filter(Boolean);

  if (staggerTargets.length > 0) {
    tl.from(staggerTargets, {
      opacity: 0,
      y: 10,
      duration: 0.4,
      stagger: 0.04,
    }, '-=0.28');
  }

  const hero = document.querySelector('.hero');
  if (hero) {
    const heroContent = hero.querySelector('.hero__content');
    const heroTitle = hero.querySelector('.hero__title');
    const heroSubtitle = hero.querySelector('.hero__subtitle');
    const heroBadges = hero.querySelectorAll('.hero__badges li');
    const heroCta = hero.querySelector('.hero__cta');
    const heroCtaPrimary = hero.querySelector('.hero__cta .btn--primary');
    const heroCtaSecondary = hero.querySelector('.hero__cta .btn--ghost');
    const heroAnswer = hero.querySelector('.hero__answer');
    const heroVerMas = hero.querySelector('.hero__answer-toggle');

    if (heroTitle) {
      tl.from(heroTitle, {
        clipPath: 'inset(100% 0 0 0)',
        y: 12,
        duration: 0.65,
        ease: 'power2.out',
      }, '-=0.45');
    }
    if (heroSubtitle) {
      tl.from(heroSubtitle, { opacity: 0, y: 18, duration: 0.45 }, '-=0.35');
    }
    if (heroBadges.length) {
      tl.from(heroBadges, {
        opacity: 0,
        y: 10,
        scale: 0.96,
        duration: 0.45,
        stagger: 0.1,
        ease: 'power2.out',
      }, '-=0.25');
    }
    if (heroCtaPrimary) {
      tl.from(heroCtaPrimary, { opacity: 0, scale: 0.97, duration: 0.55 }, '-=0.3');
    }
    if (heroCtaSecondary) {
      tl.from(heroCtaSecondary, { opacity: 0, duration: 0.35 }, '-=0.12');
    }
    if (heroAnswer) {
      tl.from(heroAnswer, { opacity: 0, y: 12, duration: 0.35 }, '-=0.2');
    }
    if (heroVerMas) {
      tl.from(heroVerMas, { opacity: 0, y: 12, duration: 0.35 }, '>+0.06');
    }

    if (heroVerMas && window.matchMedia('(hover: hover)').matches) {
      heroVerMas.addEventListener('mouseenter', () => {
        gsap.to(heroVerMas, { y: -1, duration: 0.18, ease: 'power2.out' });
      });
      heroVerMas.addEventListener('mouseleave', () => {
        gsap.to(heroVerMas, { y: 0, duration: 0.2, ease: 'power2.out' });
      });
    }

    if (heroContent) {
      let ticking = false;
      const updateHeroContent = () => {
        const range = hero.offsetHeight * 0.55;
        const progress = Math.min(1, Math.max(0, window.scrollY / range));
        const eased = progress * progress;
        gsap.set(heroContent, {
          opacity: 1 - eased,
          y: -24 * eased,
        });
        ticking = false;
      };
      const onScroll = () => {
        if (!ticking) {
          ticking = true;
          updateHeroContent();
          requestAnimationFrame(() => { ticking = false; });
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      updateHeroContent();
    }
  }

  const headerCta = headerInner.querySelector('.nav__actions a');
  if (headerCta && window.matchMedia('(hover: hover)').matches) {
    headerCta.addEventListener('mouseenter', () => {
      gsap.to(headerCta, { y: -2, scale: 1.02, duration: 0.22, ease: 'power2.out' });
    });
    headerCta.addEventListener('mouseleave', () => {
      gsap.to(headerCta, { y: 0, scale: 1, duration: 0.25, ease: 'power2.out' });
    });
  }

  if (window.matchMedia('(hover: hover)').matches) {
    headerInner.querySelectorAll('.drawer__links a').forEach((link) => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, { y: -2, scale: 1.01, duration: 0.2, ease: 'power2.out' });
      });
      link.addEventListener('mouseleave', () => {
        gsap.to(link, { y: 0, scale: 1, duration: 0.22, ease: 'power2.out' });
      });
    });
  }

  const brandsSection = document.querySelector('.brands');
  if (brandsSection && gsap) {
    const brandsTitle = brandsSection.querySelector('.brands__title');
    const brandsSubtitle = brandsSection.querySelector('.brands__subtitle');
    const brandsTrack = brandsSection.querySelector('.brands__track');
    const brandsMicrocopy = brandsSection.querySelector('.brands__microcopy');
    let brandsAnimated = false;

    // Estado inicial: ocultos hasta que el observer dispare la animación
    if (brandsTitle) gsap.set(brandsTitle, { opacity: 0, y: 18 });
    if (brandsSubtitle) gsap.set(brandsSubtitle, { opacity: 0, y: 14 });
    if (brandsTrack) gsap.set(brandsTrack, { opacity: 0, y: 14 });
    if (brandsMicrocopy) gsap.set(brandsMicrocopy, { opacity: 0, y: 12 });

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting || brandsAnimated) return;
        brandsAnimated = true;
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
        if (brandsTitle) tl.to(brandsTitle, { opacity: 1, y: 0, duration: 0.55 }, 0);
        if (brandsSubtitle) tl.to(brandsSubtitle, { opacity: 1, y: 0, duration: 0.5 }, 0.3);
        if (brandsTrack) tl.to(brandsTrack, { opacity: 1, y: 0, duration: 0.55 }, 0.75);
        if (brandsMicrocopy) tl.to(brandsMicrocopy, { opacity: 1, y: 0, duration: 0.5 }, 1.2);
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.35 }
    );
    observer.observe(brandsSection);

    if (window.matchMedia('(hover: hover)').matches) {
      brandsSection.querySelectorAll('.brands__logo').forEach((logo) => {
        logo.addEventListener('mouseenter', () => {
          gsap.to(logo, { y: -1, scale: 1.01, duration: 0.2, ease: 'power2.out' });
        });
        logo.addEventListener('mouseleave', () => {
          gsap.to(logo, { y: 0, scale: 1, duration: 0.22, ease: 'power2.out' });
        });
      });
    }
  }

  const videoReelSection = document.querySelector('.video-reel');
  if (videoReelSection && gsap) {
    const playerWrap = videoReelSection.querySelector('.video-reel__player-wrap');
    const videoReelTitle = videoReelSection.querySelector('.video-reel__title');
    const videoReelCards = videoReelSection.querySelectorAll('.video-reel__card');
    const sectionLinkWrap = videoReelSection.querySelector('.video-reel__section-link');
    const videoReelCta = videoReelSection.querySelector('.video-reel__cta');
    const videoReelCtaBtn = videoReelSection.querySelector('.video-reel__cta-btn');
    let videoReelAnimated = false;

    if (playerWrap) gsap.set(playerWrap, { opacity: 0, y: 16 });
    if (videoReelTitle) gsap.set(videoReelTitle, { opacity: 0, y: 12 });
    videoReelCards.forEach((card) => gsap.set(card, { opacity: 0, y: 14 }));
    if (sectionLinkWrap) gsap.set(sectionLinkWrap, { opacity: 0, y: 10 });
    if (videoReelCta) gsap.set(videoReelCta, { opacity: 0, y: 12 });

    const videoReelObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting || videoReelAnimated) return;
        videoReelAnimated = true;
        const vTl = gsap.timeline({ defaults: { ease: 'power2.out' } });
        if (playerWrap) vTl.to(playerWrap, { opacity: 1, y: 0, duration: 0.5 }, 0);
        if (videoReelTitle) vTl.to(videoReelTitle, { opacity: 1, y: 0, duration: 0.4 }, 0.6);
        if (videoReelCards.length) vTl.to(videoReelCards, { opacity: 1, y: 0, duration: 0.42, stagger: 0.12 }, 1.1);
        if (sectionLinkWrap) vTl.to(sectionLinkWrap, { opacity: 1, y: 0, duration: 0.35 }, 1.75);
        if (videoReelCta) vTl.to(videoReelCta, { opacity: 1, y: 0, duration: 0.45 }, 2.25);
      },
      { rootMargin: '0px 0px 0px 0px', threshold: 0.18 }
    );
    videoReelObserver.observe(videoReelSection);

    if (window.matchMedia('(hover: hover)').matches) {
      videoReelCards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { y: -2, duration: 0.2, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { y: 0, duration: 0.22, ease: 'power2.out' });
        });
      });
      const sectionLink = videoReelSection.querySelector('.video-reel__section-link a');
      if (sectionLink) {
        sectionLink.addEventListener('mouseenter', () => {
          gsap.to(sectionLink, { y: -1, duration: 0.18, ease: 'power2.out' });
        });
        sectionLink.addEventListener('mouseleave', () => {
          gsap.to(sectionLink, { y: 0, duration: 0.2, ease: 'power2.out' });
        });
      }
      if (videoReelCtaBtn) {
        videoReelCtaBtn.addEventListener('mouseenter', () => {
          gsap.to(videoReelCtaBtn, { y: -2, scale: 1.02, duration: 0.22, ease: 'power2.out' });
        });
        videoReelCtaBtn.addEventListener('mouseleave', () => {
          gsap.to(videoReelCtaBtn, { y: 0, scale: 1, duration: 0.25, ease: 'power2.out' });
        });
      }
    }
  }

  const processSection = document.querySelector('.process');
  if (processSection && gsap) {
    const processTitle = processSection.querySelector('.process__title');
    const processSubtitle = processSection.querySelector('.process__subtitle');
    const processItems = processSection.querySelectorAll('.process__item');
    const processNodes = processSection.querySelectorAll('.process__node');
    const processCta = processSection.querySelector('.process__cta');
    const processCtaBtn = processSection.querySelector('.process__cta .btn');
    let processAnimated = false;

    if (processTitle) gsap.set(processTitle, { opacity: 0, y: 14 });
    if (processSubtitle) gsap.set(processSubtitle, { opacity: 0, y: 12 });
    processItems.forEach((item) => gsap.set(item, { opacity: 0, y: 14 }));
    processNodes.forEach((node) => gsap.set(node, { scale: 0.96 }));
    if (processCta) gsap.set(processCta, { opacity: 0, y: 12 });

    const processObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting || processAnimated) return;
        processAnimated = true;
        const pTl = gsap.timeline({ defaults: { ease: 'power2.out' } });
        if (processTitle) pTl.to(processTitle, { opacity: 1, y: 0, duration: 0.45 }, 0);
        if (processSubtitle) pTl.to(processSubtitle, { opacity: 1, y: 0, duration: 0.4 }, 0.5);
        processItems.forEach((item, i) => {
          pTl.to(item, { opacity: 1, y: 0, duration: 0.45 }, 1 + i * 0.55);
          const node = processNodes[i];
          if (node) pTl.to(node, { scale: 1, duration: 0.4 }, 1 + i * 0.55);
        });
        if (processCta) pTl.to(processCta, { opacity: 1, y: 0, duration: 0.45 }, 2.7);
      },
      { rootMargin: '0px 0px 0px 0px', threshold: 0.18 }
    );
    processObserver.observe(processSection);

    if (window.matchMedia('(hover: hover)').matches) {
      processSection.querySelectorAll('.process__content').forEach((content) => {
        content.addEventListener('mouseenter', () => {
          gsap.to(content, { y: -2, duration: 0.2, ease: 'power2.out' });
        });
        content.addEventListener('mouseleave', () => {
          gsap.to(content, { y: 0, duration: 0.22, ease: 'power2.out' });
        });
      });
      if (processCtaBtn) {
        processCtaBtn.addEventListener('mouseenter', () => {
          gsap.to(processCtaBtn, { y: -2, scale: 1.02, duration: 0.22, ease: 'power2.out' });
        });
        processCtaBtn.addEventListener('mouseleave', () => {
          gsap.to(processCtaBtn, { y: 0, scale: 1, duration: 0.25, ease: 'power2.out' });
        });
      }
    }
  }

  const servicesSection = document.querySelector('.services');
  if (servicesSection && gsap) {
    const servicesTitle = servicesSection.querySelector('.services__title');
    const servicesSubtitle = servicesSection.querySelector('.services__subtitle');
    const servicesIntro = servicesSection.querySelector('.services__intro');
    const servicesCards = servicesSection.querySelectorAll('.services__card');
    let servicesAnimated = false;

    if (servicesTitle) gsap.set(servicesTitle, { opacity: 0, y: 14 });
    if (servicesSubtitle) gsap.set(servicesSubtitle, { opacity: 0, y: 12 });
    if (servicesIntro) gsap.set(servicesIntro, { opacity: 0, y: 12 });
    servicesCards.forEach((card) => gsap.set(card, { opacity: 0, y: 14 }));

    const servicesObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting || servicesAnimated) return;
        servicesAnimated = true;
        const sTl = gsap.timeline({ defaults: { ease: 'power2.out' } });
        if (servicesTitle) sTl.to(servicesTitle, { opacity: 1, y: 0, duration: 0.4 }, 0);
        if (servicesSubtitle) sTl.to(servicesSubtitle, { opacity: 1, y: 0, duration: 0.35 }, 0.4);
        if (servicesIntro) sTl.to(servicesIntro, { opacity: 1, y: 0, duration: 0.35 }, 0.8);
        servicesCards.forEach((card, i) => {
          const isFridge = card.classList.contains('services__card--fridge');
          const start = isFridge ? 1.15 : 1.35 + (i - 1) * 0.08;
          const dur = isFridge ? 0.5 : 0.4;
          sTl.to(card, { opacity: 1, y: 0, duration: dur }, start);
        });
      },
      { rootMargin: '0px 0px 0px 0px', threshold: 0.18 }
    );
    servicesObserver.observe(servicesSection);

    if (window.matchMedia('(hover: hover)').matches) {
      servicesCards.forEach((card) => {
        const media = card.querySelector('.services__media img');
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { y: -3, duration: 0.2, ease: 'power2.out' });
          if (media) gsap.to(media, { scale: 1.03, duration: 0.35, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { y: 0, duration: 0.22, ease: 'power2.out' });
          if (media) gsap.to(media, { scale: 1, duration: 0.3, ease: 'power2.out' });
        });
      });
      servicesSection.querySelectorAll('.services__details-summary').forEach((summary) => {
        summary.addEventListener('mouseenter', () => {
          gsap.to(summary, { y: -1, duration: 0.18, ease: 'power2.out' });
        });
        summary.addEventListener('mouseleave', () => {
          gsap.to(summary, { y: 0, duration: 0.2, ease: 'power2.out' });
        });
      });
      servicesSection.querySelectorAll('.services__body .btn').forEach((btn) => {
        btn.addEventListener('mouseenter', () => {
          gsap.to(btn, { y: -2, scale: 1.02, duration: 0.2, ease: 'power2.out' });
        });
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { y: 0, scale: 1, duration: 0.22, ease: 'power2.out' });
        });
      });
    }
  }
}
