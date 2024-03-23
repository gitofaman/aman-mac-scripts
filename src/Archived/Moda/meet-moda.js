var elementsToTrigger = document.querySelectorAll('[anime-parent]');
var attrName = 'is-el-visited'

var isNodeInView = (t) => {
    var topPos = t.getBoundingClientRect().top
    var tHeight = t.offsetHeight;
    if(tHeight<100) {
        tHeight = 100;
    }
    var offsetPos = 0.5;
    var offsetAttribute = t.getAttribute('offset-pos')
    if(!!offsetAttribute) {
        offsetPos = parseFloat(offsetAttribute)
    }
    var isTargetPosReached = false;
    var topMaxPos = window.innerHeight - Math.round(offsetPos * t.offsetHeight)
    var topMinPos = - Math.round(offsetPos*t.offsetHeight)
    var isTargetPosReached = (topPos < topMaxPos) && (topPos > topMinPos)
    return isTargetPosReached;
}

var fadeInUpElement = (el) => {
    setTimeout(()=>{
        anime({
            targets: el,
            translateY: 0,
            duration: 500,
            easing: 'cubicBezier(.5, .05, .1, .3)',
        })
        anime({
            targets: el,
            opacity: 1,
            duration: 200,
            easing: 'cubicBezier(.5, .05, .1, .3)',
        })
    }, 200)
}

var fadeOutElement = (el) => {
    anime({
        targets: el,
        translateY: 100,
        opacity: 0,
        duration: 0
    })
}

var isElBottomOfWindow = (el) => {
    var decidingValue = el.getBoundingClientRect().top - window.innerHeight
    if(decidingValue>0) {
        return true;
    } else {
        return false;
    }
}

var assignElementVisitedAtributes = () => {
    elementsToTrigger.forEach(el=>{
        if(isElBottomOfWindow(el)) {
            if(el.getAttribute(attrName) !== 'false') {
                el.setAttribute(attrName, 'false')
                fadeOutElement(el)
            }
        } else {
            if(isNodeInView(el) && el.getAttribute(attrName) !== 'true') {
                el.setAttribute(attrName, 'true')
                fadeInUpElement(el)
            }
        }
    })
}

window.addEventListener('scroll', ()=>{
    assignElementVisitedAtributes();
})

assignElementVisitedAtributes()