$(document).ready(function(){
    // set an animation timeline
    var navTl = gsap.timeline({
        defaults: {
            duration: 0.5
        }
    })
    //animate lottie
    var openNavbar;
    // openNavbar.reverse()
    
    var navbarOpen = false;
    
    $('.lottie').on('click', function(){
        if(!navbarOpen) {
            navbarOpen = true;
            if(!openNavbar) {
                openNavbar = navTl.to('.lottie-square', {
                    opacity: 0,
                    scale: 0
                }).fromTo('.lottie-cross', {
                    scale: 0,
                    opacity: 0
                }, {
                    scale: 1,
                    opacity: 1
                }, '0').fromTo('.navbar-menu', {
                    opacity: 0,
                    y: '-100%',
                    display: 'flex'
                }, {
                    opacity: 1, 
                    y: '0%'
                }, '0')
            } else {
                openNavbar.play()
            }
        } else {
            navbarOpen = false;
            openNavbar.reverse()
        }
    })
    
    $('[bg-on-hover]').on('mouseover', function(){
        var bgColor = $(this).attr('bg-on-hover');
        console.log(bgColor)
        $(this).closest('.navbar-menu').css({
            "background-color": bgColor
        })
    })
    $('[bg-on-hover]').on('mouseout', function(){
        $(this).closest('.navbar-menu').css({"background-color": ''})
    })
    })