var hSlides, currentSlideNo;
hSlides = Array.from(document.querySelectorAll('.hero-slide'))
currentSlideNo = 0
var transitionDuration = 600;
var waitTime = 1000;
var intervalTime = 4000;
var customClasses = {
    'slideImage' : `c-slide-image`,
    'slideContent' : `c-slide-content`
}

var zIndexes = []

var setZIndex = (el, indexVal) => {
    el.style.zIndex = indexVal;
}

hSlides.forEach(hSlide=>{
    var nextZIndex = hSlides.length - hSlides.indexOf(hSlide)
    setZIndex(hSlide, nextZIndex)
    zIndexes.push(nextZIndex)
})

var rearrangedArrays = (startNumber, totalNumbers) => {
    var oldArray = Array.from(Array(totalNumbers).keys())
    var newArray = oldArray.splice(oldArray.indexOf(startNumber), totalNumbers)
    newArray.push(...oldArray)
    return newArray
}

var endSlide = (givenSlide) => {
    anime({
        targets: givenSlide,
        opacity: 0,
        duration: transitionDuration,
        easing: `easeOutSine`
    })
}

var startSlide = (givenSlide) => {
    var slideImage = givenSlide.querySelector(`.${customClasses['slideImage']}`)
    var slideContent = givenSlide.querySelector(`.${customClasses['slideContent']}`)
    slideContent.style.transform = `translateY(40px)`
    slideImage.style.transform = `scale(1.3, 1.3)`
    anime({
        targets: slideImage,
        scale: 1,
        duration: transitionDuration + waitTime,
        easing: `easeOutSine`
    })
    anime({
        targets: slideContent,
        translateY: 0,
        duration: transitionDuration,
        easing: `easeOutSine`
    })
}

var showSlide = (slideIndex) => {
    var consecutiveSlideIndexes = rearrangedArrays(slideIndex, hSlides.length)
    endSlide(hSlides[currentSlideNo])
    startSlide(hSlides[slideIndex])
    setTimeout(()=>{
        var zCounter = 0;
        consecutiveSlideIndexes.forEach(cIndex=>{
            setZIndex(hSlides[cIndex], zIndexes[zCounter])
            zCounter++;
        })
        currentSlideNo = slideIndex
        hSlides.forEach(hSlide=>{
            hSlide.style.opacity = 1;
        })
    }, transitionDuration)
}

var showNextSlide = () => {
    console.log(`showing next slide`)
    if(currentSlideNo === hSlides.length - 1) {
        showSlide(0)
    } else {
        showSlide(currentSlideNo+1)
    }
}

setInterval(showNextSlide, intervalTime)