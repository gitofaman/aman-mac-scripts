var onViewEls = []
var onViewFunction = (el, func, percentInView, repeatAnimate) => {
  onViewEls.push({
    el: el,
    func: func,
    percentInView: percentInView,
    repeatAnimate: repeatAnimate //boolean - true or false
  })
}

var viewportContentPercentage = (el) => {
  var windowHeight = window.innerHeight;
  var elTopPos = el.getBoundingClientRect().top;
  var elHeight = el.offsetHeight;
  var elHeightInScreen = windowHeight - elTopPos;
  if (elTopPos <= 0 && elHeight >= windowHeight - elTopPos) {
      elHeightInScreen = windowHeight;
  } else if (elTopPos <= 0 && elHeight < windowHeight - elTopPos) {
      elHeightInScreen = elHeight + elTopPos;
  }
  var contentPercentage = Math.round(elHeightInScreen * 100 / windowHeight);
  if (contentPercentage > 0) {
      return contentPercentage;
  } else {
      return 0;
  }
}

window.addEventListener('scroll', ()=>{
  onViewEls.forEach(el=>{
    let percentage = viewportContentPercentage(el.el);
    let canAnimate = el.repeatAnimate;
    if (percentage >= el.percentInView){
      el.func()
      if(!canAnimate) {
        //if animation has already happened and can't animate again then, remove the element
        onViewEls = onViewEls.filter(item => item.el !== el);
      }
    }
  })
})