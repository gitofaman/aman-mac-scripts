$(document).ready(function(){
    var spOpened = false;
    var openSp = () => {
        spOpened = true
        var tl = gsap.timeline()
        tl.to('.sp-embed', {
            display: 'block',
            y: 0,
            opacity: 1
        }).to('.sp-close', {
            rotate: 360,
            scale: 1,
            opacity: 1
        }, '<').to('.sp-svg', {
            rotate: 360,
            scale: 0,
            opacity: 0
        }, '<')
    }
    var closeSp = () => {
        spOpened = false
        var tl = gsap.timeline()
        tl.to('.sp-embed', {
            y: 40,
            opacity: 0
        }).to('.sp-close', {
            rotate: 0,
            scale: 0,
            opacity: 0
        }, '<').to('.sp-svg', {
            rotate: 0,
            scale: 1,
            opacity: 1
        }, '<').then(function(){
            $('.sp-embed').css({
                display: 'none'
            })
        })
    }
    $('.sp-toggle').on('click', function(){
        if(spOpened) {
            closeSp()
        } else {
            openSp()
        }
    })
    closeSp()
})