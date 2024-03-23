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
    var movingIndex = parseInt(tlDot.getAttribute('int'))
    var tlBlock = tlDot.querySelector('.tl_actual-data')
    var tlText = tlDot.querySelector('.tl_content')
    animateEl(tlBlock, {translateX: - movingIndex * 10}, 0)
    animateEl(tlText, {translateX: - movingIndex * 20, opacity: 0}, 0)
}
var activateDot = (tlDot) => {
    var tlBlock = tlDot.querySelector('.tl_actual-data')
    var tlText = tlDot.querySelector('.tl_content')
    animateEl(tlBlock, {translateX: 0}, 500)
    animateEl(tlText, {translateX: 0, opacity: 1, delay: 250}, 500)
}

tlDots.forEach(tlDot=>{
    var dotIndex = tlDots.indexOf(tlDot)
    if(window.innerWidth > 768) {
        if(dotIndex%2===0) {
            tlDot.setAttribute('int', '-1')
        } else {
            tlDot.setAttribute('int', '1')
        }
    } else {
        tlDot.setAttribute('int', '1')
    }
    var tlText = tlDot.querySelector('.tl_content')
    tlText.firstChild.classList.add('noWidows')
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

$('.noWidows').each(function(i,d){
    $(d).html( $(d).text().replace(/\s(?=[^\s]*$)/g, "&nbsp;") )
 });
 