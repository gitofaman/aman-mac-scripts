gsap.registerPlugin(ScrollTrigger)
var defaults = (animeParentEl) => {
    var defaultsJson = {
        stagger: 0.15,
        duration: 0.6,
        scrollTrigger: {
            trigger: animeParentEl,
            start: 'top center'
        }
    }
    return defaultsJson;
}

var animationJson = {
    'fade-up': {
        y: 40,
        opacity: 0
    },
    'fade-in': {
        opacity: 0
    }
}

$('[anime-parent]').each(function() {
    var currAnimeParent = $(this)
    var currAnimeStyle = $(this).attr('anime-parent')
    var currChilds = $(this).children()
    var animeStyle = animationJson[currAnimeStyle] || animationJson["fade-up"];
    gsap.from(currChilds, {
        ...animeStyle,
        ...defaults(currAnimeParent)
    })
})