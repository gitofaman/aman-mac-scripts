var checkSection, refreshSectionLink;

function onReturnOrRefresh(callback) {
  // --- Detect refresh or back navigation ---
  const navType = performance.getEntriesByType("navigation")[0].type;

  if (navType === "reload" || navType === "back_forward") {
    callback("navigation", navType);
  }

  // --- Detect restore from bfcache (back/forward cache) ---
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      callback("pageshow", "bfcache");
    }
  });

  // --- Detect when user returns to the tab ---
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      callback("visibility", "visible");
    }
  });
}

$(document).ready(function(){
  gsap.registerPlugin(ScrollTrigger);
  const navWrapper = $('.nav-links-wrapper'),
        navContent = $('[nav-link-content]'),
        navToggle  = $('[nav-link-toggle]'),
        navigationBtn = $('.navigation-button-cover'),
        END_OF_PAGE_THRESHOLD = 150,
        yChange = -100;
    const navBlockClose = $('.nav-block-close');
  
  // function delayTransitioning() {
  //   transitioning = true;
  //   setTimeout(function() {
  //     transitioning = false;
  //   }, 500)
  // }
  checkSection = refreshSectionLink = (force = false, allowWhenNavOpen = false) => {
    // If navbar is actively open, don't change top-nav unless caller forces it
    if (isNavActive && !allowWhenNavOpen && !force) {
      console.log('refreshSectionLink: skipped because navbar is open');
      return;
    }

    let maxH = 0, most = null;
    $('[section-link]').each(function () {
      const vh = visibleH(this);
      if (vh > maxH && vh >= innerHeight / 2) {
        maxH = vh;
        most = $(this);
      }
    });

    if (most) {
      // only update if different or forced
      if (force || !currentSection || currentSection.get(0) !== most.get(0)) {
        currentSection = most;
        const btn = currentSection.find('[section-link-button]');
        // addNavOnTop already deactivates the navbar if needed
        addNavOnTop(btn.text(), btn.attr('href') || '#');
        console.log('refreshSectionLink: SHOW ->', btn.text());
      } else {
        // same section as before; nothing to do
        // but if nav-on-top isn't active, ensure it's shown
        if (!isNavOnTopActive) {
          const btn = currentSection.find('[section-link-button]');
          addNavOnTop(btn.text(), btn.attr('href') || '#');
          console.log('refreshSectionLink: re-showing existing section button');
        }
      }
    } else {
      // no section qualifies — hide if currently shown (unless forced to keep)
      if (!isNavActive) { // avoid hiding while main navbar is open
        currentSection = null;
        if (isNavOnTopActive || force) {
          hideNav();
          console.log('refreshSectionLink: HIDE');
        }
      } else {
        console.log('refreshSectionLink: not hiding because navbar is open');
      }
    }
  }

  let currentTween = null,
      isNavActive = false,
      isNavOnTopActive = false,
      isNavbarOpenAtEnd = false,
      isAtPageEnd = false,
      currentSection = null;
      transitioning = false;

  const killTween = () => { if (currentTween) currentTween.kill(); currentTween = null; };
  const boxProps = w => ({ width: w, duration: 0.3, ease: 'power2.inOut' });
  const fade = o => ({ opacity: o, duration: 0.2 });

  function accurateOuterHeight($el) {
    const vis = $el.css('visibility'), disp = $el.css('display');
    $el.css({ visibility: 'hidden', display: 'block' });
    const h = $el.outerHeight();
    $el.css({ visibility: vis, display: disp });
    return h;
  }

  // --- Top nav button helpers ---
  function hideNav() {
    return gsap.timeline()
      .to(navigationBtn, { y: -yChange, duration: 0.1 })
      .to(navigationBtn, { width: 0, duration: 0.2, onComplete: () => { isNavOnTopActive = false; } });
  }

  function addNavOnTop(text, link) {
    if (isNavActive && isMobile) deactivate();
    const a = navigationBtn.find('a');
    const isVisible = navigationBtn.outerWidth() > 0 && navigationBtn.offset().top >= 0;

    if (isVisible && (a.text() !== text || a.attr('href') !== link)) {
      gsap.timeline()
        .to(navigationBtn, { y: -yChange, duration: 0.2, onComplete: () => a.text(text).attr('href', link) })
        .to(navigationBtn, { y: 0, duration: 0.2, onComplete: () => { isNavOnTopActive = true; } });
    } else if (!isVisible) {
      a.text(text).attr('href', link);
      gsap.timeline()
        .to(navigationBtn, { width: 'auto', duration: 0.2 })
        .to(navigationBtn, { y: 0, duration: 0.1, onComplete: () => { isNavOnTopActive = true; } });
    }
  }

  const visibleH = el => {
    const r = el.getBoundingClientRect(), wh = innerHeight;
    return Math.max(0, Math.min(r.bottom, wh) - Math.max(r.top, 0));
  };



  // --- Navbar open/close ---
  function animate(activating, pointer) {
    isNavActive = !!activating;
    const dim = activating
      ? { w: navContent.outerWidth() }
      : { w: navToggle.outerWidth() };

    killTween();
    currentTween = gsap.timeline({ onComplete: () => { navContent.css('pointer-events', pointer); currentTween = null; } });
    const seq = activating
      ? [[navToggle, fade(0)], [navWrapper, boxProps(dim.w)], [navContent, fade(1)]]
      : [[navContent, fade(0)], [navWrapper, boxProps(dim.w)], [navToggle, fade(1)]];

    seq.forEach(([el, props]) => currentTween.to(el, props));
  }

  function activate() {
    hideNav()
    animate(true, 'auto');
    // Show close button on small screens when navbar opens
    if ($(window).width() <= 991) {
      navBlockClose.show();
    }
  }

  function deactivate() {
    animate(false, 'none');
    // checkSection(true, true);
    // Hide close button when navbar closes
    navBlockClose.hide();
  }

  function bindHover(enable) {
    navWrapper.off('mouseenter mouseleave');
    if (enable) navWrapper.on({ mouseenter: activate, mouseleave: deactivate });
  }

  // Init
  bindHover($(window).width() > 991);
  navWrapper.on('click', () => { if ($(window).width() <= 991) activate(); });
  deactivate();
  gsap.set(navigationBtn, { y: -yChange, width: 0 });
  // Hide close button by default and bind its click to deactivate
  navBlockClose.hide();
  navBlockClose.on('click', deactivate);

  $(window).on('scroll resize', () => {
    bindHover($(window).width() > 991);
    checkSection();
  });

  checkSection();

  ScrollTrigger.create({
    trigger: $('.main-content-wrapper')[0],
    start: "bottom 20%",
    end: "bottom -10%",
    invalidateOnRefresh: true,
    // markers: true, // Uncomment for debugging
    onEnter: () => {
      if (!isNavbarOpenAtEnd) {
        activate();
        isNavbarOpenAtEnd = true;
      }
      if (!isAtPageEnd) {
        isAtPageEnd = true;
        bindHover(false);
      }
      if ($(window).width() <= 991) {
        gsap.to('.navbar-explore-wrapper', { y: -96, duration: 0.3, ease: 'power2.inOut' });
      }
    },
    onLeaveBack: () => {
      if (isNavbarOpenAtEnd) {
        deactivate();
        isNavbarOpenAtEnd = false;
      }
      if (isAtPageEnd) {
        isAtPageEnd = false;
        bindHover(true);
      }
      if ($(window).width() <= 991) {
        gsap.to('.navbar-explore-wrapper', { y: 0, duration: 0.3, ease: 'power2.inOut' });
      }
    }
  });
  onReturnOrRefresh(function() {
      setTimeout(function() {
      refreshSectionLink(true, true)
    }, 500)
  })
});