$(document).ready(function () {
    if($(window).width() > 768) {
        var aboutTl = gsap.timeline({
            paused: true,
            reversed: true, // Set reversed to true initially
            scrollTrigger: {
                trigger: '.section-about-hero',
                pin: true,
                scrub: true
            }, 
        });
    
        aboutTl.to('.video-img.is-center', {
                width: $(".section-about-hero").width() + 100, // Directly setting the value
                height: $(".section-about-hero").height() + 100,
                duration: 1,
            }, "<")
            .to('.video-overlay', {
                opacity: 0.5,
                scale: 1.25
            })
    }
});