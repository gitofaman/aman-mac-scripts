var dragSection = document.querySelector('aria-drag-section') || $0

var startScreenX = 0;
var prevSessionTranslateXValue = 0;

function getTranslateX(el) {
    var style = window.getComputedStyle(el);
    var matrix = new WebKitCSSMatrix(style.transform);
    return matrix.m41;
  }

var updateDragSection = e => {
    var pointerMovedBy = e.screenX - startScreenX;
    dragSection.style.transform = `translateX(${prevSessionTranslateXValue + pointerMovedBy}px)`
}

dragSection.addEventListener('mousedown', (e)=>{
    startScreenX = e.screenX
    dragSection.addEventListener('mousemove', updateDragSection)
})

dragSection.addEventListener('mouseup', (e)=>{
    prevSessionTranslateXValue = getTranslateX(dragSection)
    
    dragSection.removeEventListener('mousemove', updateDragSection)
})

dragSection.addEventListener('mouseout', (e)=>{
    prevSessionTranslateXValue = getTranslateX(dragSection)
    dragSection.removeEventListener('mousemove', updateDragSection)
})