var wheelLines= Array.from(document.querySelectorAll('.wheel-wheel_line'))
var rotatingTime = 400;
var rotatingIndexAttribute = 'rotatingIndex'
var activeWheelLine;
var activeWheelLineIndex;

//components 
var nextNo = (currentIndex, maxIndex) => {
    if(currentIndex===maxIndex) {
        return 0
    } else {
        return currentIndex + 1;
    }
}

var prevNo = (currentIndex, maxIndex) => {
    if(currentIndex===0) {
        return maxIndex;
    } else {
        return currentIndex - 1;
    }
}

var rotateEl = (el, deg, duration) => {
    //30 deg rotation will be one rotation and rotatingIndex will decide the time to rotate
    if(deg!==0) {
        el.classList.add('not-active')
        el.classList.remove('active')
    } else {
        el.classList.add('active')
        el.classList.remove('not-active')
        activeWheelLine = el;
        activeWheelLineIndex = wheelLines.indexOf(el)
    }
    el.setAttribute(rotatingIndexAttribute, Math.abs(deg)/30)
    anime({
        targets: el,
        rotate: deg,
        duration: duration,
        easing: 'easeOutSine'
    })
}

var getWheelIndex = (wheelLine) => {
    return parseInt(wheelLine.getAttribute(rotatingIndexAttribute))
}

var rotateWheel = (indexToActive) => {
    //when index is 3, and active is 2
    var activeLine = wheelLines[indexToActive] //4th line
    //rotating index is just to calculate time for wheel movement
    var activeLineRotatingIndex = getWheelIndex(activeLine)
    var timeToWheelMove = rotatingTime*activeLineRotatingIndex
    rotateEl(activeLine, 0, timeToWheelMove)
    wheelLines.forEach(wheelLine=>{
        //lets say iterating on 0
        if(wheelLine!==activeLine) { //true
            var currentLineIndex = wheelLines.indexOf(wheelLine)
            var rotateBy = (currentLineIndex - indexToActive)*30 //3 to active and 0 then, 3 - 0 = 3
            rotateEl(wheelLine, rotateBy, timeToWheelMove)
        }
    })
}

wheelLines.forEach(wheelLine=>{
    rotateEl(wheelLine, wheelLines.indexOf(wheelLine)*30, 0)
    var wheelActiveSelectors = ['.wheel-wheel_dot.for-biggest-circle', '.wheel-wheel_number']
    wheelActiveSelectors.forEach(selector=>{
        var el = wheelLine.querySelector(selector)
        el.addEventListener('click', ()=> {
            rotateWheel(wheelLines.indexOf(wheelLine))
        })  
    })
})

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

document.addEventListener('keydown', (e)=> {
    if(isNodeInView(activeWheelLine)) {
        var pressedKey = e.key;
        console.log(pressedKey)
        if (pressedKey === 'ArrowRight') {
            //will go to next wheel line
            var nextWheelIndex = nextNo(activeWheelLineIndex, wheelLines.length-1)
            rotateWheel(nextWheelIndex)
        } else if (pressedKey === 'ArrowLeft') {
            var prevWheelIndex = prevNo(activeWheelLineIndex, wheelLines.length-1)
            rotateWheel(prevWheelIndex)
        }
    }
})