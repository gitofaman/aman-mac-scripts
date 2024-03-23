var wfsliders = document.querySelectorAll('.acco--slider')

function isHidden(el) {
    return (el.offsetParent === null)
}

wfsliders.forEach(wfslider=>{
    var wfSlides, wfNext;
    var currentSlideNo = 0;
    wfSlides = Array.from(wfslider.querySelectorAll('.w-slide'))

    var visibleSlides = wfSlides.filter(wfSlide=>{
        return !isHidden(wfSlide) //slides that are visible will be returned
    })

    var toggleNextVisibility = (arg) => { //greater than 0 will show and 0 will hide
        wfNext = wfslider.querySelector('[aria-label="next slide"]')
        if(arg) {
            wfNext.classList.remove('is--hidden')
            wfNext.style.display = 'flex'
        } else {
            wfNext.classList.add('is--hidden')
        }
    }

    var updateSlideNo = () => {
        wfSlides.forEach(wfSlide=>{
            var isThisActive = wfSlide.getAttribute('aria-hidden')
            if(!isThisActive) {
                currentSlideNo = wfSlides.indexOf(wfSlide)
            }
        })
        if(currentSlideNo >= visibleSlides.length - 1) {
            toggleNextVisibility(0)
        } else {
            toggleNextVisibility(1)
        }
    }

    var sliderMoveObserver = new MutationObserver(mutations=> {
           updateSlideNo()
    })

    sliderMoveObserver.observe(visibleSlides[0], { characterData: false, attributes: true, childList: false, subtree: false })
})