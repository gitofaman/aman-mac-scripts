var lottieToggle = (shouldOpen) => {
    var open = false;
    if(shouldOpen) {
        open = shouldOpen
    }

    if(open) {
        // navbarOpen = true
        var openTl = gsap.timeline()
        openTl
        // .to('.navbar-menu', {
        //     height: 'auto',
        //     top: 0
        // })
        .fromTo('.navbar-menu-opener', {
            scale: 1,
            opacity: 1
        }, {
            scale: 0,
            opacity: 0
        }, 0).fromTo(".navbar-menu-closer", {
            scale: 0,
            opacity: 0
        }, {
            scale: 1,
            opacity: 1
        }, 0)
        $('body').css('overflow', 'hidden')
    } else {
        // navbarOpen = false;
        var closeTl = gsap.timeline()
        closeTl
        // .to('.navbar-menu', {
        //     height: '1',
        //     top: -1,
        // })
        .fromTo(".navbar-menu-closer", {
            scale: 1,
            opacity: 1
        }, {
            scale: 0,
            opacity: 0
        }, 0).fromTo('.navbar-menu-opener', {
            scale: 0,
            opacity: 0
        }, {
            scale: 1,
            opacity: 1
        }, 0).then(function(){
            $('body').css('overflow', '')
        })
    }

}

var atr = {
    dr: 'dr',
    drToggle: 'dr-toggle',
    drContent: 'dr-content'
}
var getAtr = (givenAtr) => {
    return `[${givenAtr}]`
}

var openDr = () => {
    var contentToOpen = []
    var contentToClose = []
    main.find(`[${atr.drContent}]`).each(function(){
        var thisContent = $(this)
        var shouldOpen = $(this).attr(getAtr(atr.drContent)) === givenIndex && !$(this).attr('opened')
        // console.log(hasAttr)
        if(shouldOpen) {
            contentToOpen.push(thisContent)
        } else {
            contentToClose.push(thisContent)
        }
    })
    var oDrTl = gsap.timeline({
        defaults: {
            duration: duration
        }
    })
    oDrTl.to(contentToClose, {
        height: 0,
        opacity: 0,
    }).to(contentToOpen, {
        height: 'auto',
        opacity: 1
    }, 0)
}

$('[dr-toggle]').on('click', function() {
    openDr($(this))
})