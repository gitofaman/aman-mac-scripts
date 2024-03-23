var dragSection = document.querySelector('aria-drag-section') || $0
var dragSectionEls = dragSection.querySelectorAll('.item')

var startScreenX = 0;
var movingLeft = true;
var prevSessionTranslateXValue = 0;

function getTranslateX(el) {
    var style = window.getComputedStyle(el);
    var matrix = new WebKitCSSMatrix(style.transform);
    return matrix.m41;
}

var updateDragSection = e => {
    var pointerMovedBy = e.screenX - startScreenX;
    if(pointerMovedBy<0) {
        movingLeft = false;
    } else if (pointerMovedBy > 0) {
        movingLeft = true;
    }
    console.log(movingLeft)
    dragSection.style.transform = `translateX(${prevSessionTranslateXValue + pointerMovedBy}px)`
}

var makeElActive = (el) => {
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
    prevSessionTranslateXValue = getTranslateX(dragSection)
}

var showNearestEl = () => {
    prevSessionTranslateXValue = getTranslateX(dragSection)
    var centerPoint = Math.round(window.innerWidth / 2)
    if(movingLeft) {
        indexToCompareWith = 0;
    } else {
        indexToCompareWith = dragSectionEls.length - 1;
    }
    var nearestEl = dragSectionEls[indexToCompareWith]
    var nearestElDistance = Math.abs(centerPoint - dragSectionEls[indexToCompareWith].getBoundingClientRect().x)
    dragSectionEls.forEach(el=>{
        var elX = el.getBoundingClientRect().x
        var currentElDistance = Math.abs(centerPoint - el.getBoundingClientRect().x)
        el.querySelector('.resume-line-circle').classList.remove('is--active')
        if (movingLeft && elX > centerPoint) {
            return;
        } 
        if(!!movingLeft && elX < centerPoint) {
            return;
        }
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
    showNearestEl()
    dragSection.removeEventListener('mousemove', updateDragSection)
})