allowNavbarCode = false


$(function () {
  const isMobile = $('.mobile-bottom-navigation:visible').length,
    navWrapper = $('.nav-links-wrapper'),
    navContent = $('[nav-link-content]'),
    navToggle = $('[nav-link-toggle]'),
    navigationBtn = $('.navigation-button-cover');
  let currentTween = null,
    isNavOnTopActive = false,
    currentSection = null,
    yChange = window.innerWidth < 768 ? -100 : 100;

  const killTween = () => currentTween && currentTween.kill();

  const animateNav = (props1, props2, props3, pointerEvents, activating) => {
    killTween();
    currentTween = gsap.timeline({
      onComplete: () => {
        navContent.css("pointer-events", pointerEvents);
        currentTween = null;
      },
    })
    if(activating) {
        currentTween.to(navToggle, props3)
      .to(navWrapper, props2)
      .to(navContent, props1)
    } else {
        currentTween.to(navContent, props1)
      .to(navWrapper, props2)
      .to(navToggle, props3);
    }
    
  };

  const activate = () => {
    const dim = isMobile
      ? { w: navContent.outerWidth(), h: navContent.outerHeight() }
      : { w: navContent.outerWidth(), h: null };
    var pointerEvents = 'auto'
    animateNav(
      { opacity: 1, duration: 0.2 },
      isMobile
        ? { width: dim.w, height: dim.h }
        : { width: dim.w, duration: 0.3, ease: "power2.inOut" },
      { opacity: 0, duration: 0.2 },
      pointerEvents,
      true
    );
  };

  const deactivate = () => {
    const dim = isMobile
      ? { w: navToggle.outerWidth(), h: navToggle.outerHeight() }
      : { w: navToggle.outerWidth(), h: null };
    var pointerEvents = 'none'
    animateNav(
      { opacity: 0, duration: 0.2 },
      isMobile
        ? { width: dim.w, height: dim.h }
        : { width: dim.w, duration: 0.3, ease: "power2.inOut" },
      { opacity: 1, duration: 0.2 },
      pointerEvents,
      false
    );
  };

  isMobile
    ? navWrapper.on("click", activate)
    : navWrapper.on({ mouseenter: activate, mouseleave: deactivate });

  deactivate();

  gsap.set(navigationBtn, { y: -yChange, width: 0 });

  const addNavOnTop = (text, link) => {
    const btnLink = navigationBtn.find("a"),
      curText = btnLink.text(),
      curHref = btnLink.attr("href"),
      isVisible = navigationBtn.outerWidth() > 0 && navigationBtn.offset().top >= 0;

    if (isVisible && (curText !== text || curHref !== link)) {
      gsap.timeline()
        .to(navigationBtn, { y: -yChange, duration: 0.2, onComplete: () => btnLink.text(text).attr("href", link) })
        .to(navigationBtn, { y: 0, duration: 0.2, onComplete: () => (isNavOnTopActive = true) });
    } else if (!isVisible) {
      btnLink.text(text).attr("href", link);
      gsap.timeline()
        .to(navigationBtn, { width: "auto", duration: 0.2 })
        .to(navigationBtn, { y: 0, duration: 0.1, onComplete: () => (isNavOnTopActive = true) });
    }
  };

  const hideNav = () => {
    gsap.timeline()
      .to(navigationBtn, { y: -yChange, duration: 0.1 })
      .to(navigationBtn, { width: 0, duration: 0.2, onComplete: () => (isNavOnTopActive = false) });
  };

  const getVisibleHeight = el => {
    const r = el.getBoundingClientRect(),
      wh = window.innerHeight;
    return Math.max(0, Math.min(r.bottom, wh) - Math.max(r.top, 0));
  };

  const checkSection = () => {
    let maxH = 0, mostVisible = null;
    $('[section-link]').each(function () {
      const vh = getVisibleHeight(this);
      if (vh > maxH && vh >= window.innerHeight / 2) maxH = vh, mostVisible = $(this);
    });
    if (mostVisible && (!currentSection || currentSection.get(0) !== mostVisible.get(0))) {
      currentSection = mostVisible;
      const btn = currentSection.find("[section-link-button]");
      addNavOnTop(btn.text(), btn.attr("href") || "#");
    } else if (!mostVisible && (currentSection || isNavOnTopActive)) {
      currentSection = null;
      hideNav();
    }
  };

  $(window).on("scroll resize", checkSection);
  checkSection();
});