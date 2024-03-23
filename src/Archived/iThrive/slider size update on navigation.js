var gsSliders = document.querySelectorAll('[height-constant-slider]')
gsSliders.forEach(gsSlider=>{
    var gsSlides = Array.from(gsSlider.querySelectorAll('.w-slide'))
    gsSlider.style.transitionDuration = '400ms'
    gsSlider.style.transitionTimingFunction = 'ease'
    const updateSliderHeight = () =>{
        var currentGsSlideIndex = gsSlides.findIndex(gsSlide=>{return !gsSlide.hasAttribute('aria-hidden')})
        gsSlider.style.height = gsSlides[currentGsSlideIndex].firstChild.offsetHeight + 'px';
    }
    var observer = new MutationObserver(mutations =>{
        //updates slider height
        updateSliderHeight()
    })
    observer.observe(gsSlides[0], { characterData: false, attributes: true, childList: false, subtree: false })
    updateSliderHeight()
})

// $0.setAttribute('aria-height-constant-slider', 'true')