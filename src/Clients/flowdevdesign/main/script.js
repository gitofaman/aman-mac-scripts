$(document).ready(function(){
    var navOpen = false;

    var openNav = () => {
        navOpen = true;
        // play nav animation
        var navTl = gsap.timeline()
        $('.nav-menu').css('display', 'block')
        navTl.to('.navburger', {
            rotation: 360,
            opacity: 0
        }).to('.navcloser', {
            rotation: 360,
            opacity: 1
        }, 0)
        navTl.fromTo('.nav-menu', {
            opacity: 0,
            height: 0,
        }, {
            opacity: 1,
            height: 'auto',
        }, 0)
    }
    var closeNav = () => {
        navOpen = false;
        var navTl = gsap.timeline()
        navTl.to('.navburger', {
            rotation: 0,
            opacity: 1
        }).to('.navcloser', {
            rotation: 0,
            opacity: 0
        }, 0)
        navTl.to('.nav-menu', {
            opacity: 0,
            height: 0,
        }, 0).then(function(){
            $('.nav-menu').css('display', 'none')
        })
    }
    
    $('.nav-toggle').on('click', function(){
        if(!navOpen) {
            openNav()
        } else {
            closeNav()
        }
    })
    closeNav()
})