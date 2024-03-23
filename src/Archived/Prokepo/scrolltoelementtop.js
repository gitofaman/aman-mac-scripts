
function getViewPercentage(element) {
const viewport = {
    top: window.pageYOffset,
    bottom: window.pageYOffset + window.innerHeight
};

const elementBoundingRect = element.getBoundingClientRect();
const elementPos = {
    top: elementBoundingRect.y + window.pageYOffset,
    bottom: elementBoundingRect.y + elementBoundingRect.height + window.pageYOffset
};

if (viewport.top > elementPos.bottom || viewport.bottom < elementPos.top) {
    return 0;
}

// Element is fully within viewport
if (viewport.top < elementPos.top && viewport.bottom > elementPos.bottom) {
    return 100;
}

// Element is bigger than the viewport
if (elementPos.top < viewport.top && elementPos.bottom > viewport.bottom) {
    return 100;
}

const elementHeight = elementBoundingRect.height;
let elementHeightInView = elementHeight;

if (elementPos.top < viewport.top) {
    elementHeightInView = elementHeight - (window.pageYOffset - elementPos.top);
}

if (elementPos.bottom > viewport.bottom) {
    elementHeightInView = elementHeightInView - (elementPos.bottom - viewport.bottom);
}

const percentageInView = (elementHeightInView / window.innerHeight) * 100;

return Math.round(percentageInView);
}
  
  
getTop = el => el.offsetTop + (el.offsetParent && getTop(el.offsetParent))
const scrollToElementTop = el => {
    var scrollTo = getTop(el) - 200
    if(getViewPercentage(el)<75 || el.getBoundingClientRect().top < 100) {
        window.scrollTo({
            top: scrollTo,
            behavior: 'smooth',
          })   
    }
}
