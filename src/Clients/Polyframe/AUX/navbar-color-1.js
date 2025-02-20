gsap.registerPlugin(ScrollTrigger);

var colorDefault = 'var(--palatinate-blue)';
var colorOne = 'var(--brand-white)';

$('.main-wrapper > *').each(function () {
    var section = $(this);
    // var sectionWhite
    var colorToUse = colorDefault
    if (!section.hasClass('hide')) {
        if(!!section.attr('navbar-white')) {
            colorToUse = colorOne
        }
    }
    
    gsap.to('.navbar > *', {
        color: colorToUse,
        scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
        }
    })
});