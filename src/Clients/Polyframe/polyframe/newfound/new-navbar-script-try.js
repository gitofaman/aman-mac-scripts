$(document).ready(function() {
// Global variables
var navWrapper = $('.nav-links-wrapper');
var navToggle  = navWrapper.find('[nav-link-toggle]');
var navContent = navWrapper.find('[nav-link-content]');
var unTl; // will hold the current timeline
var isMobile = $(window).width() < 991;
var navOpen = true; // <-- Global variable
var navigationBtn = $('.navigation-button-cover');
navigationBtn.css('overflow', 'hidden')
var navCloseMobile = $('.nav-block-close')

function isNearBottom(threshold = 200) {
  const scrollPosition = window.scrollY + window.innerHeight;
  const pageHeight = document.documentElement.scrollHeight;

  return pageHeight - scrollPosition <= threshold;
}
// Set initial pointer-events
navWrapper.css('pointer-events', 'auto');
navToggle.css('pointer-events', 'auto');
navContent.css('pointer-events', 'none');

function expandNavbar() {
  if (navOpen) return; // prevent re-triggering
  navOpen = true;
  console.log('expanding navbar');

  if (unTl) unTl.kill();
  unTl = gsap.timeline({
    defaults: { duration: 0.35, ease: "power2.out" },
    onComplete: () => {
      navContent.css('pointer-events', 'auto');
    }
  });

  unTl.to(navWrapper, {
    width: () => navContent.outerWidth(),
  }, 0)
  .to(navContent, { opacity: 1 }, 0)
  .to(navToggle,  { opacity: 0 }, 0)
  .to(navCloseMobile, { opacity: 1, pointerEvents: 'auto' }, 0);
  if(isMobile) {
  hideSectionLink()

  }
}

function collapseNavbar() {
  if (!navOpen) return; // prevent re-triggering
  navOpen = false;
  console.log('collapsing navbar');
  navContent.css('pointer-events', 'none')

  if (unTl) unTl.kill();
  unTl = gsap.timeline({
    defaults: { duration: 0.3, ease: "power2.inOut" },
    onComplete: () => {
      navToggle.css('pointer-events', 'auto');
      if(isMobile) {
        refreshSectionLink()
      }
    }
  });

  unTl.to(navWrapper, {
    width: () => navToggle.outerWidth(),
  }, 0)
  .to(navContent, { opacity: 0 }, 0)
  .to(navToggle,  { opacity: 1 }, 0)
  .to(navCloseMobile, { opacity: 0, pointerEvents: 'none' }, 0);
}

// initial state
collapseNavbar();

if (!isMobile) {
  navWrapper.on('mouseenter', expandNavbar);
  navWrapper.on('mouseleave', collapseNavbar);
} else {
  navWrapper.on('click', function() {
    if (!navOpen) expandNavbar();
    else collapseNavbar();
  });
  navCloseMobile.on('click', function() {
    collapseNavbar()
  })
  
}

gsap.registerPlugin(ScrollTrigger);

const sections = $('[section-link="true"]');


function showSectionLink(link, text) {
  navigationBtn.find('a').attr('href', link);
  navigationBtn.find('.nav-page-link div').text(text);
  gsap.to(navigationBtn, {
    width: 'auto',
    y: 0,
    duration: 0.2
  });
  if(navOpen && isMobile) {
    collapseNavbar()
  }
}

function hideSectionLink() {
  return gsap.to(navigationBtn, {
    width: '0',
    y: 100,
    duration: 0.2
  }).then(() => {
    isAnimating = false;
    activeSection = null;
  });
}
let activeSection = null;
let isAnimating = false;

function refreshSectionLink() {
  if (isAnimating) return;

  const viewportHeight = window.innerHeight;
  const sections = document.querySelectorAll('[section-link]');
  let visibleSection = null;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();

    // Calculate visible height within viewport
    const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);

    // If more than 50% of viewport height is covered
    if (visibleHeight > viewportHeight * 0.5) {
      visibleSection = section;
    }
  });

  if (visibleSection && visibleSection !== activeSection) {
    const button = visibleSection.querySelector('[section-link-button]');
    const link = button?.getAttribute('href') || '#';
    const text = button?.textContent?.trim() || '';

    isAnimating = true;
    hideSectionLink().then(() => {
      showSectionLink(link, text);
      activeSection = visibleSection;
      isAnimating = false;
    });
  }

  // No section currently meets the >50% condition
  else if (!visibleSection && activeSection) {
    isAnimating = true;
    hideSectionLink().then(() => {
      activeSection = null;
      isAnimating = false;
    });
  }
}
var closedNavByReevaluation = false;
var reevaluateNavbar = () => {
  refreshSectionLink()
  if(isNearBottom() && !navOpen) {
    expandNavbar()
    gsap.to(navWrapper, {
      y: -$(window).height()/2 + 100
    })
    closedNavByReevaluation = false;
    navCloseMobile.css('display', 'none')
  }
  if(!isNearBottom() && navOpen && !closedNavByReevaluation) {
    collapseNavbar()
    closedNavByReevaluation = true;
    gsap.to(navWrapper, {
      y: 0,
      onComplete: function () {
        navCloseMobile.css('display', '')
      }
    })
  }
}

// Trigger when scrolling or resizing
window.addEventListener('scroll', reevaluateNavbar);
window.addEventListener('resize', reevaluateNavbar);

hideSectionLink()

})
