$(document).ready(function(){
    var rentOpen = true;
    var rTl;
    var toggleRent = (givenDuration, shouldOpen) => {
        gsap.killTweensOf('.rent-popup');
        gsap.killTweensOf($('.rent-popup').children());
        if(rTl) {
            rTl.pause();
        }
        rTl = gsap.timeline({
            defaults: {
                duration: givenDuration
            }
        });
        if(shouldOpen !== undefined){
            rentOpen = shouldOpen;
        }
        var isMobileView = $(window).innerWidth() < 768;
        
        if(!rentOpen) {
            $('html, body').animate({ scrollTop: 0 }, givenDuration); // Scroll to top
            rTl.fromTo('.rent-popup', {
                display: 'none',
            }, {
                display: 'flex',
                duration: 0
            }).fromTo('.rent-block', {
                y: isMobileView ? '0%' : '100%', // Adjust based on mobile view
                x: isMobileView ? '100%' : '0%', // Adjust based on mobile view
                opacity: 0,
            }, {
                y: '0%',
                x: '0%',
                opacity: 1,
                stagger: givenDuration/4
            }).to('.navbar-parent', {
                backgroundColor: 'black'
            }, 0);
            rentOpen = true;
            $('body').css('overflow', 'hidden');
            lenis.stop();
        } else {
            rTl.to($('.rent-block').get().reverse(), {
                y: isMobileView ? '0%' : '100%', // Adjust based on mobile view
                x: isMobileView ? '100%' : '0%', // Adjust based on mobile view
                opacity: 0,
                stagger: givenDuration/4
            }).to('.navbar-parent', {
                backgroundColor: 'transparent'
            }, 0).then(function(){
                $('.rent-popup').css( "display", "none" );
            });
            rentOpen = false;
            $('body').css('overflow', 'auto');
            lenis.start();
        }
    };
    
    toggleRent(0, true);
    
    $('[open-rent]').on('click', function(){
        toggleRent(0.5);
    });
});
