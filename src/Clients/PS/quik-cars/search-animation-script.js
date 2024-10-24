$(document).ready(function(){
    var searchOpen = false
    var tlJson = {
        defaults: {
            duration: 0.4
        }
    }
    
    var openSearch = () => {
        var tl = gsap.timeline(tlJson)
        searchOpen = true
        // search animation
        tl.to('.nav-close-svg', {
             rotate: 360,
            scale: 1,
            opacity: 1,
        }, '<')
        .to('.nav-search-svg', {
            rotate: 360,
            scale: 0,
            opacity: 0
        }, '<').to('.nav-search-popup', {
            y: '0%',
            opacity: 1,
            display: 'block'
        }, '<')
    }
    var closeSearch = () => {
        var tl = gsap.timeline(tlJson)
        searchOpen = false
        // search animation
        tl.to('.nav-close-svg', {
             rotate: 0,
            scale: 0,
            opacity: 0,
        }, '<')
        .to('.nav-search-svg', {
            rotate: 0,
            scale: 1,
            opacity: 1
        }, '<').to('.nav-search-popup', {
            y: '100%',
            opacity: 0,
            display: 'none'
        }, '<')
    }
    closeSearch()
    $('.nav-search-toggle').on('click', function(){
        // if(!tl.isActive()) { //makes sure animaiton is not playing beforehand
            if(searchOpen) {
                closeSearch()
            } else {
                openSearch()
            }
        // }
    })
})