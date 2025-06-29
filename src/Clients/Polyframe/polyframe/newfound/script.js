
var isMobileNavigation = $('.mobile-bottom-navigation:visible').length

let currentNavbarTween = null;

let isNavigationOnTopActive = false;
if(!isMobileNavigation) {
    var deactivateNavbar = () => {
        // Kill any running tween
        if (currentNavbarTween) currentNavbarTween.kill();
        var toggleWrapper = ''
        if($(window).width() < 768) {
            toggleWrapper = '.mobile-bottom-navigation'
        }

        var toggleWidth = $(`[nav-link-toggle]:visible`).outerWidth();
        console.log(toggleWidth)

        currentNavbarTween = gsap.timeline({
            onComplete: function () {
                $('[nav-link-content]').css({
                    "pointer-events": 'none'
                });
                currentNavbarTween = null;
            }
        });

        currentNavbarTween.to('[nav-link-content]', {
            opacity: 0,
            duration: 0.2
        }).to('.nav-links-wrapper', {
            width: toggleWidth,
            duration: 0.3,
            ease: 'power2.inOut'
        }).to('[nav-link-toggle]', {
            opacity: 1,
            duration: 0.2
        });
        }

    var activateNavbar = () => {
        // Kill any running tween
        if (currentNavbarTween) currentNavbarTween.kill();

        var contentWidth = $('[nav-link-content]').outerWidth();

        currentNavbarTween = gsap.timeline({
            onComplete: function () {
                $('[nav-link-content]').css({
                    "pointer-events": 'none'
                });
                currentNavbarTween = null;
            }
        });

        currentNavbarTween.to('.nav-links-wrapper', {
            width: contentWidth,
            duration: 0.3,
            ease: 'power2.inOut'
        }).to('[nav-link-toggle]', {
            opacity: 0,
            duration: 0.2
        }).to('[nav-link-content]', {
            opacity: 1,
            duration: 0.2
        });
    }

    $('.nav-links-wrapper').on('mouseenter', activateNavbar);
    $('.nav-links-wrapper').on('mouseleave', deactivateNavbar);

    $(document).ready(function () {
        deactivateNavbar();
    });
} else {
    
    var activateNavbar = () => {
        var heightToAttain = $('[nav-link-content]:visible').outerHeight()
        var widthToAttain = $('[nav-link-content]:visible').outerWidth()

        if (currentNavbarTween) currentNavbarTween.kill();
        currentNavbarTween = gsap.timeline({
            onComplete: function () {
                $('[nav-link-content]').css({
                    "pointer-events": 'none'
                });
                currentNavbarTween = null;
            }
        });
        currentNavbarTween.to($('.nav-links-wrapper'), {
            height: heightToAttain,
            width: widthToAttain,
        }).to('[nav-link-content]', {
            opacity: 1
        }).to('[nav-link-toggle]', {
            opacity: 0
        })
        
    }
    var deactivateNavbar = () => {
        var heightToAttain = $('[nav-link-toggle]:visible').outerHeight()
        var widthToAttain = $('[nav-link-toggle]:visible').outerWidth()
        if (currentNavbarTween) currentNavbarTween.kill();

        currentNavbarTween = gsap.timeline({
            onComplete: function () {
                $('[nav-link-content]').css({
                    "pointer-events": 'none'
                });
                currentNavbarTween = null;
            }
        });

        currentNavbarTween.to($('.nav-links-wrapper'), {
            height: heightToAttain,
            width: widthToAttain
        }).to('[nav-link-content]', {
            opacity: 0
        }).to('[nav-link-toggle]', {
            opacity: 1
        })
    }
    $('.nav-links-wrapper').on('click', activateNavbar);
    // $('.nav-links-wrapper').on('click', deactivateNavbar);

    $(document).ready(function () {
        deactivateNavbar();
    });
}




var yChange = 100

if(window.innerWidth < 768) {
    yChange = -100
}

const navigationBtn = $('.navigation-button-cover');

gsap.set(navigationBtn, {
    y: -yChange,
    width: 0
});

const addNavigationOnTop = (text, link) => {
    const currentText = navigationBtn.find('a').text();
    const currentLink = navigationBtn.find('a').attr('href');
    const isVisible = navigationBtn.outerWidth() > 0 && navigationBtn.offset().top >= 0;

    // If already showing and content is different, slide up and replace
    if (isVisible && (currentText !== text || currentLink !== link)) {
        const transitionTl = gsap.timeline();
        transitionTl.to(navigationBtn, {
            y: -yChange,
            duration: 0.2,
            onComplete: () => {
                navigationBtn.find('a').text(text).attr('href', link);
            }
        }).to(navigationBtn, {
            y: 0,
            duration: 0.2,
            onComplete: () => { isNavigationOnTopActive = true; }
        });
    } else if (!isVisible) {
        navigationBtn.find('a').text(text).attr('href', link);
        const anotTl = gsap.timeline();
        anotTl.to(navigationBtn, {
            width: 'auto',
            duration: 0.2
        }).to(navigationBtn, {
            y: 0,
            duration: 0.1,
            onComplete: () => { isNavigationOnTopActive = true; }
        });
    }
};

const hideNavigation = () => {
    const hnTl = gsap.timeline();
    hnTl.to(navigationBtn, {
        y: -yChange,
        duration: 0.1
    }).to(navigationBtn, {
        width: "0",
        duration: 0.2,
        onComplete: () => { isNavigationOnTopActive = false; }
    });
};

// 👇 Helper to get visible height of an element in the viewport
const getVisibleHeight = (el) => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const visibleTop = Math.max(rect.top, 0);
    const visibleBottom = Math.min(rect.bottom, windowHeight);
    return Math.max(0, visibleBottom - visibleTop);
};

// 👇 Track current active section to avoid re-triggering unnecessarily
let currentSection = null;

// 👇 Scroll listener
const checkSectionInView = () => {
    let maxVisibleHeight = 0;
    let mostVisibleSection = null;

    $('[section-link]').each(function () {
        const rect = this.getBoundingClientRect();
        if (rect.bottom <= 0 || rect.top >= window.innerHeight) return; // not on screen

        const visibleHeight = getVisibleHeight(this);

        if (visibleHeight > maxVisibleHeight && visibleHeight >= window.innerHeight / 2) {
            maxVisibleHeight = visibleHeight;
            mostVisibleSection = $(this);
        }
    });

    if (mostVisibleSection && currentSection?.get(0) !== mostVisibleSection.get(0)) {
        currentSection = mostVisibleSection;

        const buttonText = currentSection.find('[section-link-button]').text()
        const buttonLink = currentSection.find('[section-link-button]').attr('href') || '#';

        addNavigationOnTop(buttonText, buttonLink);
    } else if (!mostVisibleSection) {
        if (currentSection !== null || isNavigationOnTopActive) {
            currentSection = null;
            hideNavigation();
        }
    }
};

// ✅ Attach on scroll & resize
$(window).on('scroll resize', checkSectionInView);

// ✅ Initial check
$(document).ready(checkSectionInView);