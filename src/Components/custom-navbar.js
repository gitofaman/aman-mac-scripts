var startNavWindowSize =  2000;

if($(window).width() < startNavWindowSize) {
    var updateHam = (move, deg) => {
        var hTl = gsap.timeline()
        hTl.to('.h-part.top', {
            x: `-${move}%`
        }).to('.h-part.bottom', {
            x: `${move}%`
        }, '<').to('.h-full.is-front', {
            rotate: deg
        }, '<').to('.h-full.is-back', {
            rotate: -deg
        }, '<')
    }
    $('.navbar *').addClass('is-wrapped')
    var navOpen = false;
    $('.nav-menu').css({
        display: 'none',
        opacity: 0,
    })
    var onTl = gsap.timeline()
    var openNav = () => {
        navOpen = true
        $('.nav-menu').css('display', '')
        $('body').css('overflow', 'hidden')
        updateHam(100, 45)
        onTl.to('.nav-menu', {
            height: "100vh",
            opacity: 1,
            duration: 0.5
        })
    }
    var closeNav = () => {
        $('body').css('overflow', '')
        updateHam(0, 0)
        onTl.to('.nav-menu', {
            height: 0,
            opacity: 0,
            duration: 0.5,
            onComplete: function() {
                $('.nav-menu').css('display', 'none')
                navOpen = false;
            }
        })
    }
    closeNav()
    $('.hamburger').on('click', function(){
        if(!navOpen) {
            openNav()
        } else {
            closeNav()
        }
    }) 
}

