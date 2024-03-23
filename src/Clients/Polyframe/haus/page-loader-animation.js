$('document').ready(function(){
    var pageLoaderMain = $('.page-loader')
    var pageLoaderLogo = $('.page-load-logo')
    var pageLoaderTexts = $('.page-load-text')
    var pageLoaderTextParent = $('.page-load-2')
    
    var plTimeline = gsap.timeline()
    
    plTimeline.to(pageLoaderMain, {
        display: 'flex',
        duration: 0
    }).fromTo(pageLoaderLogo, {
        display: 'block'
    }, {
        display: 'none',
        delay: 1
    }).fromTo(pageLoaderTextParent, {
        display: 'none'
    }, {
        display: 'flex',
    })
    
    pageLoaderTexts.get().reverse().forEach(function(el){
        plTimeline.fromTo($(el), {
            opacity: 0,
        }, {
            opacity: 1,
            duration: 0.2
        })
    })
    plTimeline.to(pageLoaderTexts, {
        opacity: 1,
        duration: 0.2
    })
    pageLoaderTexts.get().reverse().forEach(function (el, index, array) {
        var isLastElement = index === array.length - 1;
        if(!isLastElement) {
            plTimeline.to($(el), {
                opacity: 0,
                duration: 0.2,
            });
        }
    });
    plTimeline.fromTo('.plt-inside.is-absolute', {
        opacity: 0
    }, {
        opacity: 1
    }).fromTo('.plt-inside.transparent', {
        opacity: 1
    }, {
        opacity: 0
    })
    plTimeline.to(pageLoaderMain, {
        opacity: 0,
        delay: 0.5
    })
})