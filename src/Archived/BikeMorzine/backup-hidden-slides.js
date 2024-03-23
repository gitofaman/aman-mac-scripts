
//script to make sure hidden slides don't interfere with webflow's slider
var wfsliders = document.querySelectorAll('.acco--slider')

function isHidden(el) {
    return (el.offsetParent === null)
}

wfsliders.forEach(wfslider=>{

    var wfSlides, wfNext, wfPrev;

    wfSlides = Array.from(wfslider.querySelectorAll('.w-slide'))

    var visibleSlides = wfSlides.filter(wfSlide=>{
        return !isHidden(wfSlide) //slides that are visible will be returned
    })
    var slideNo = 0;

    var activateSliderEvents = () => {
        wfNext = wfslider.querySelector('[aria-label="next slide"]')
        wfPrev = wfslider.querySelector('[aria-label="previous slide"]')
        wfPrev.addEventListener('click', ()=> {
            slideNo--;
            if(slideNo===visibleSlides.length) {
                wfNext.classList.add('is--hidden')
            } else {
                wfNext.classList.remove('is--hidden')
                wfNext.style.display = 'flex'
            }
        })
        wfNext.addEventListener('click', ()=>{
            slideNo++;
            if(slideNo>=visibleSlides.length-1) {
                wfNext.classList.add('is--hidden')
            } else {
                wfNext.classList.remove('is--hidden')
                wfNext.style.display = 'flex'
            }
        })
    }

    var sliderChildObserver = new MutationObserver(mutations=>{
        activateSliderEvents()
    })


    sliderChildObserver.observe(wfslider, { characterData: false, attributes: false, childList: true, subtree: false })
    activateSliderEvents()

})
