var hSlides, hSlideWrapper, hSlideContainer;
hSlideContainer = document.querySelector('.gallery24_component')
hSlideWrapper = document.querySelector('.gallery24_horizontal-scroll-content')
hSlides = document.querySelectorAll(`.${hSlideWrapper.firstChild.classList[0]}`)
window.addEventListener('scroll', ()=>{
    var lastXPos = document.querySelector('.container-large').getBoundingClientRect().x
    var lasthSlide = hSlides[hSlides.length - 1];
    var maxScrollAllowed = hSlideWrapper.offsetWidth - lasthSlide.offsetWidth;
    var slideContainerHeight = hSlideWrapper.offsetWidth;
    hSlideContainer.style.height = slideContainerHeight + 'px';
    var hSlideContainerYpos = hSlideContainer.getBoundingClientRect().y
    var shouldScroll =true;
    if(-hSlideContainerYpos > maxScrollAllowed) {
        shouldScroll = false;
    } else {
        shouldScroll = true;
    }
    if (hSlideContainerYpos<=0 && shouldScroll) {
        hSlideWrapper.style.transform = `translateX(${hSlideContainerYpos}px)`
    }
})