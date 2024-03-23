var duration = 600
var easing = 'easeInOutSine'

function fadeIn (el) {
    anime({
        targets: el,
        opacity: 1,
        duration: duration,
        easing: easing
    })
    el.style.zIndex = 15
}

function fadeOut (el) {
    anime({
        targets: el,
        opacity: 0,
        duration: duration,
        easing: easing
    })
    el.style.zIndex = 10
}
var wrappers = document.querySelectorAll('.image--slider-wrapper')


wrappers.forEach(wrapper=>{
    var currentNo = 0
    var wrapperEls = wrapper.querySelectorAll(`.${wrapper.firstChild.classList[0]}`)
    var totalEls = wrapperEls.length

    var resetOpacity = () => {
        wrapperEls.forEach(el=>{
            el.style.opacity = 0
        })
    }

    resetOpacity()
    fadeOut(wrapperEls[0])
    function fadeNext () {
        fadeOut(wrapperEls[currentNo])
        if (currentNo===totalEls-1) {
            nextNo = 0
        } else {
            nextNo = currentNo + 1;
        }
        currentNo = nextNo
        fadeIn(wrapperEls[nextNo])
    }
    var nextSlideAnimate = setInterval(fadeNext, 1000)
})