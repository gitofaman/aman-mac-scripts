
var deactivateNavbar = () => {
    var toggleWidth = $('[nav-link-toggle]').outerWidth();
    var gtl = gsap.timeline({
        onComplete: function () {
            $('[nav-link-content]').css({
                "pointer-events": 'none'
            })
        }
    });
    gtl.to('[nav-link-content]', {
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
    var contentWidth = $('[nav-link-content]').outerWidth();
    var tl = gsap.timeline({
        onComplete: function () {
            $('[nav-link-content]').css({
                "pointer-events": 'auto'
            })
        }
    });
    tl.to('.nav-links-wrapper', {
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