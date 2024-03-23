//Alternate Animations script
var animatedParents = Array.from(document.querySelectorAll('[anime-parent]'))
animatedParents.forEach(animeParent=>{
    if(animeParent) {
        animeParent.childNodes.forEach(childNode=>{
            childNode.setAttribute('anime-child', 'true')
        })
    }
})



var alternateAnimations = arr => {
    duration = 400
    for(i=0;i<arr.length;i++) {
        slideUpAnimate(arr[i], duration, (duration*(i+1))/2, 0, 1)
    }
}

var slideUpAnimate = (el, duration, delay, yTranlate, opacity) => {
    setTimeout(()=>{
        anime({
            targets: el,
            translateY: yTranlate,
            opacity: opacity,
            duration: duration,
            easing: 'easeOutSine'
          });
    }, delay)
}

var isElementInView = (el) => {
    var percentVal = 70;
    var windowHeight = window.innerHeight
    var spaceToCover = Math.round(windowHeight * percentVal/100)
    var spaceFromEachSides = (windowHeight - spaceToCover)/2;
    var elTop = el.getBoundingClientRect().top
    // var elBottom = el.getBoundingClientRect().bottom
    if (elTop + el.offsetHeight > spaceFromEachSides && elTop < windowHeight - spaceFromEachSides) {
        return true;
    }
    return false
}

animatedParents.forEach(parent=>{
    var animatedChilds = parent.querySelectorAll('[anime-child=true]')
    animatedChilds.forEach(child => {
        slideUpAnimate(child, 0, 0, 20, 0)
    })
})

function animateIfParentInView() {
    animatedParents.forEach(parentEl=>{
        if(isElementInView(parentEl)) {
            alternateAnimations(parentEl.querySelectorAll('[anime-child=true]'))
            var thisParentIndex = animatedParents.indexOf(parentEl)
            animatedParents.splice(thisParentIndex, 1)
        }
    })
}

window.addEventListener('scroll', animateIfParentInView)
animateIfParentInView()