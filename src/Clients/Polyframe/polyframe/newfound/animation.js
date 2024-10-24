

// the hero animation
var eases = ['easeIn', 'easeOut']
$(document).ready(function() {
    var dis = $('#content').offset().top - $('#header-grid').offset().top - $('.section-hero-1').height()
    // $(".home-hero-content").height($('#content').height())
    var gsTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.section-hero-1',
            start: 'top top',
            end: 'bottom top',
            scrub: 'true'
        }
    })
    var toMoveMore = 50
    gsTl.to('.home-hero-content', {
        ease: 'linear',
        y: function() {
            return $(".section-hero-1").height() + toMoveMore
        }
    }).fromTo('.section-hero-addition', {
        y: function() {
            return - $(".section-hero-1").height()
        }
    }, {
        y: function() {
            return - dis + toMoveMore
        },
        ease: 'linear'
    }, '<')
})

var animateOnScroll = (el, startJson, endJson, offset=80) => {
    el.each(function(){
        var stJson = {
            trigger: this,
            start: `top ${offset}%`
        }
        gsap.fromTo(this, startJson, {...endJson, scrollTrigger: stJson})
    })
}

// featured work animation
$(document).ready(function() {
    // ideation
    // featured work should fade in 
    // then the work block parent
    // on scroll the work blocks should slide from left
    animateOnScroll($('.featured-work-header, .home-work-main'), { opacity: 0 }, { opacity: 1 }, 60)

    $(".work-card_1").each(function() {
        var mainEl = $(this)
        var wTl = gsap.timeline({
            scrollTrigger: {
                trigger: mainEl,
                start: 'top 70%'
            }
        })
        wTl.from(mainEl, {
            y: 50,
            opacity: 0
        })
    })

    $('.work-card_content').each(function() {
        gsap.from($(this).children(), {
            y: 10,
            opacity: 0,
            stagger: 0.4,
            scrollTrigger: {
                trigger: this, // Refers to the current .work-card_content
                start: 'top 80%',
            }
        });
    });
    var imgwraps = [".work-card_img-wrap", "[img-scale]"]
    $('.work-card_img-wrap').each(function(){
        var mainEl = $(this)
        var img = mainEl.find('img')
        gsap.from(img, {
            scale: 1.4,
            opacity: 0,
            scrollTrigger: {
                trigger: mainEl,
                start: 'top 75%'
            }
        })
    })

})
gsap.registerPlugin(ScrollTrigger); // Ensure ScrollTrigger is registered




$(".navbar-logo").css('overflow', 'hidden')

gsap.registerPlugin(ScrollTrigger); // Ensure ScrollTrigger is registered

var wn = gsap.timeline({ paused: true }); // Create a paused timeline to control manually
var navbarWrapped = false;

// Wrap Navbar function
var wrapNavbar = () => {
    if (!navbarWrapped) {
        console.log("Navbar wrapped");
        navbarWrapped = true;
        $('.navbar-logo').find('.svg').width($('.navbar-logo').find('.svg').width());

        wn.to($(".navbar-logo").find('path:not(:last-child)'), {
            y: '-170%',
            stagger: 0.01,
            duration: 0.2
        }).to($(".navbar-logo"), {
            padding: "0.3rem",
            borderRadius: "0.2rem",
            width: '1.7rem',
            duration: 0.2
        }, "<").to($(".navbar-logo"), {
            backgroundColor: "#ffe661",
            duration: 0.2
        }).to($('.navbar-logo'), {
            color: 'black',
            duration: 0.2
        }, "<");

        wn.play();
    }
};

// Unwrap Navbar function
var unwrapNavbar = () => {
    if (navbarWrapped) {
        console.log("Navbar unwrapped");

        // Kill any running tweens to avoid animation overlap
        gsap.killTweensOf($(".navbar-logo").find('path:not(:last-child)'));
        gsap.killTweensOf($(".navbar-logo"));

        // wn.clear();  // Clear the timeline before reversing to avoid any delays

        // Reverse the timeline to undo the animations
        wn.reverse(); 

        navbarWrapped = false;
    }
};

// Use ScrollTrigger to detect scroll and trigger animations
ScrollTrigger.create({
    trigger: document.body, // Use the body as the trigger instead of window
    start: "top top", // Start at the very top of the page
    end: "bottom top", // End when scrolling down
    onUpdate: (self) => {
        if (self.direction === 1 && self.progress > 0.02) {
            wrapNavbar();
        }
        if (self.direction === -1 && self.progress <= 0.02) {
            unwrapNavbar();
        }
    }
});
