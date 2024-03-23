var dragSection = document.querySelector('[aria-drag-section]') 
var dragSectionEls = Array.from(dragSection.querySelectorAll('.item'))
var activeEL;
var startScreenX = 0;
var prevSessionTranslateXValue = 0;

var mouseDown = 0;
document.body.onmousedown = function() { 
  ++mouseDown;
}
document.body.onmouseup = function() {
  --mouseDown;
}

var updateSessionValue = () => {
    prevSessionTranslateXValue = getTranslateX(dragSection)
}

function getTranslateX(el) {
    var style = window.getComputedStyle(el);
    var matrix = new WebKitCSSMatrix(style.transform);
    return matrix.m41;
  }

var updateDragSection = e => {
    var pointerMovedBy = e.screenX - startScreenX;
    if(pointerMovedBy>0 && activeEL === dragSectionEls[0] ) {
        return;
    } else if (pointerMovedBy < 0 && activeEL === dragSectionEls[dragSectionEls.length - 1]) {
        return;
    }
    if(Math.abs(pointerMovedBy) < 10) {
        return;
    }
    dragSection.style.transform = `translateX(${prevSessionTranslateXValue + pointerMovedBy}px)`
}

var makeElActive = (el) => {
    activeEL = el;
    dragSectionEls.forEach(dragEl=>{
        dragEl.querySelector('.resume-line-circle').classList.remove('is--active')
    })
    var elCurrentPos = el.getBoundingClientRect().x + Math.round(el.offsetWidth / 2)
    var extraMoveToMakeItCenter = Math.round(window.innerWidth/2) - elCurrentPos;
    var newTranslateXPos = prevSessionTranslateXValue + extraMoveToMakeItCenter
    el.querySelector('.resume-line-circle').classList.add('is--active')
    anime({
        targets: dragSection,
        translateX: newTranslateXPos,
        duration: 500,
        easing: 'easeOutSine'
    })
    setTimeout(updateSessionValue, 500)
}

dragSectionEls.forEach(el=> {
    var circle = el.querySelector('.resume-line-circle')
    circle.addEventListener('click', ()=>{
        makeElActive(el)
    })
})

var showNearestEl = () => {
    updateSessionValue()
    var centerPoint = Math.round(window.innerWidth / 2)
    var nearestEl = dragSectionEls[0]
    var nearestElDistance = Math.abs(centerPoint - dragSectionEls[0].getBoundingClientRect().x)
    dragSectionEls.forEach(el=>{
        var currentElDistance = Math.abs(centerPoint - el.getBoundingClientRect().x)
        if(currentElDistance < nearestElDistance) {
            nearestElDistance = currentElDistance
            nearestEl = el
        }
    })
    makeElActive(nearestEl)
}

dragSection.addEventListener('mousedown', (e)=>{
    startScreenX = e.screenX
    dragSection.addEventListener('mousemove', updateDragSection)
})

dragSection.addEventListener('mouseup', (e)=>{
    showNearestEl()
    dragSection.removeEventListener('mousemove', updateDragSection)
})

dragSection.addEventListener('mouseout', (e)=>{
    if(!mouseDown) {
        showNearestEl()
        dragSection.removeEventListener('mousemove', updateDragSection)
    }
})

makeElActive(dragSectionEls[dragSectionEls.length - 1])

dragSection.addEventListener('touchstart', e=> {
    startScreenX = e.touches[0].screenX
})

dragSection.addEventListener('touchmove', e=>{
    var elValuesComesFrom = e.touches[0]
    // console.log(elValuesComesFrom)
    updateDragSection(elValuesComesFrom)
})

dragSection.addEventListener('touchend', e=> {
    showNearestEl()
})