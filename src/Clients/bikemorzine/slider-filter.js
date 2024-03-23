function isHidden(el) {
    return (el.offsetParent === null)
}

var goToNextSlide;
var goToPrevSlide;
var goToSlide;

var createFunctioningSlider = (slider) => {
    var sliderDots, sliderDotActiveClassName;
    sliderDots = []
    var sliderDotActiveClassName = 'slider-dot-acitve';
    var sliderWrppr = slider.querySelector("[aria-wrpr=true]");
    var sliderNextArrow = slider.querySelector("[aria-next=true]");
    var sliderPrevArrow = slider.querySelector("[aria-prev = true]");
    var slideMoveDuration = 500
    var timeToMove = parseInt(slider.getAttribute('move-time'))
    var sliderElements = []
    var assignSliderEls = () => {
        if (!!timeToMove) {
            slideMoveDuration = timeToMove
        }
        var allSliderElements = sliderWrppr.querySelectorAll(
            "." + sliderWrppr.firstChild.classList[0]
        );

        allSliderElements.forEach(sliderEl => {
            if (!isHidden(sliderEl)) {
                sliderElements.push(sliderEl)
            }
        })
    }
    var intervalSliderEls = setInterval(()=>{
        if(sliderElements.length < 1) {
            assignSliderEls();
        } else {
            clearInterval(intervalSliderEls);
        }
    }, 200)
    var currentSliderNo = 0;

    //going to a certain slide using this function
    goToSlide = (i, goingPos) => {
        var sliderElementsAreaWidth =
            sliderElements[1].getBoundingClientRect().x -
            sliderElements[0].getBoundingClientRect().x;
        var lastElement = sliderElements[sliderElements.length - 1];
        var lastElementPos =
            lastElement.getBoundingClientRect().x + lastElement.offsetWidth;
        var isLastElementInView = lastElementPos < window.innerWidth
        if (goingPos !== "dont-use") {
            if (isLastElementInView > 0 && goingPos === "next") {
                i = 0;
            }
        }

        anime({
            targets: sliderWrppr,
            translateX: -i * sliderElementsAreaWidth,
            duration: slideMoveDuration,
            easing: 'easeOutSine'
        })
        currentSliderNo = i;
        if (sliderDots.length) {
            sliderDots.forEach(sliderDot => {
                var currentSlideDotIndex = sliderDots.indexOf(sliderDot)
                if (currentSlideDotIndex === i) {
                    sliderDot.classList.add(sliderDotActiveClassName)
                } else {
                    sliderDot.classList.remove(sliderDotActiveClassName)
                }
            })
        }
    };

    goToNextSlide = () => {
        if (currentSliderNo === sliderElements.length - 1) {
            goToSlide(0, "next");
        } else {
            goToSlide(currentSliderNo + 1, "next");
        }
    };

    goToPrevSlide = () => {
        if (currentSliderNo === 0) {
            goToSlide(sliderElements.length - 1, "prev");
        } else {
            goToSlide(currentSliderNo - 1, "prev");
        }
    };

    sliderNextArrow.addEventListener("click", goToNextSlide);

    sliderPrevArrow.addEventListener("click", goToPrevSlide);
    //auto function
    if (slider.hasAttribute('auto-slide-duration')) {
        var playCondition = 1
        var isPaused = false;
        var autoSlideTime = parseInt(slider.getAttribute('auto-slide-duration'))
        var pauseTime = 6 * autoSlideTime
        if (slider.hasAttribute('pause-time')) {
            var pauseTime = parseInt(slider.getAttribute('pause-time'))
        }

        function autoIntervalFunction(time, func) {
            //playCondition => 0 means stop, 1 means play
            var autoInterval = setInterval(() => {
                if (!isPaused) {
                    if (playCondition === 1) {
                        func()
                    } else {
                        clearInterval(autoInterval)
                    }
                }
            }, time)
        }
        //to pause for a certain time
        var autoSliderTimeout;
        var pauseInterval = () => {
            isPaused = true;
            clearTimeout(autoSliderTimeout)
            autoSliderTimeout = setTimeout(() => {
                isPaused = false;
            }, pauseTime)
        }
        autoIntervalFunction(autoSlideTime, goToNextSlide)
        //pause on hover
        sliderWrppr.addEventListener('mouseover', () => {
            isPaused = true;
        })
        sliderWrppr.addEventListener('mouseout', () => {
            isPaused = false;
        })
        //pause on arrow click for a certain time
        sliderNextArrow.addEventListener('click', pauseInterval)
        sliderPrevArrow.addEventListener('click', pauseInterval)
        sliderElements.forEach(slideElement => {
            slideElement.addEventListener('click', () => {
                isPaused = true
            })
        })
    }

    goToSlide(0, 'dont-use')
};

var slider = document.querySelector(".aq-slider-parent");
createFunctioningSlider(slider)

$('[fs-cmsfilter-match]').on('click', function(){
    goToSlide(0, 'dont-use')
    setTimeout(() => {
    createFunctioningSlider(slider)
        
    }, 1000);
})
