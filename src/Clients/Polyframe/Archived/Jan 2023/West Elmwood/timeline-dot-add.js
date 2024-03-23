var tlDots = Array.from(document.querySelectorAll('.tl_dot'))
var usingDotLength = 4;
var constants = {
    easing: `easeOutSine`
}
var checkIfElInSpace = (el, percentVal) => {
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

var animateEl = (el, givenJson, duration) => {
    var useThis = {
        targets: el,
        duration: duration,
        easing: constants.easing
    }
    for(key in givenJson) {
        useThis[key] = givenJson[key]
    }
    anime(useThis)
}

function appendAfter(divToAppend, siblingBefore) {
    if(siblingBefore.nextSibling) {
        siblingBefore.parentNode.insertBefore(divToAppend, siblingBefore.nextSibling);
    } else {
        siblingBefore.parentNode.appendChild(divToAppend);
    }
}

var deactivateDot = (tlDot) => {
    var tlDate = tlDot.querySelector('.tl_year')
    var tlText = tlDot.querySelector('.tl-data-text')
    var moveBy = parseInt(tlDot.getAttribute('int')) * 40
    console.log(moveBy)
    animateEl(tlDot, {width: `1em`, height: `1em`}, 0)
    animateEl(tlDate, {opacity: `0`}, 0)
    animateEl(tlText, {opacity: `0`, translateX: moveBy}, 0)
}
var activateDot = (tlDot) => {
    var tlDate = tlDot.querySelector('.tl_year')
    var tlText = tlDot.querySelector('.tl-data-text')
    animateEl(tlDot, {width: `12em`, height: `12em`}, 250)
    animateEl(tlDate, {opacity: `1`, delay: 500}, 250)
    animateEl(tlText, {opacity: `1`, translateX: 0, delay: 750}, 250)
}

tlDots.forEach(tlDot=>{
    var dotIndex = tlDots.indexOf(tlDot)
    if(dotIndex%2===0) {
        tlDot.setAttribute('int', '1')
    } else {
        tlDot.setAttribute('int', '-1')
    }
    deactivateDot(tlDot)
})

window.addEventListener('scroll', () => {
    tlDots.forEach(tlDot=> {
        if(!tlDot.hasAttribute('el-state')) {
            if(checkIfElInSpace(tlDot, 70)) {
                activateDot(tlDot)
                tlDot.setAttribute('el-state', 'active')
            }
        }
    })
})