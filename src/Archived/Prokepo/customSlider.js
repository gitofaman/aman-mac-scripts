var createFunctioningSlider = (slider) => {
    var sliderWrppr = slider.querySelector("[aria-wrpr=true]");
    var sliderNextArrow = slider.querySelector("[aria-next=true]");
    var sliderPrevArrow = slider.querySelector("[aria-prev = true]");
    var sliderElements = sliderWrppr.querySelectorAll(
        "." + sliderWrppr.firstChild.classList[0]
    );
    var currentSliderNo = 0;
    var slideSliderDots = {
        sliderDotsArray: [],
        class: '',
        activeClass: 'is--active'
    }

    //going to a certain slide using this function
    var goToSlide = (i) => {

        var sliderElementsAreaWidth =
            sliderElements[1].getBoundingClientRect().x -
            sliderElements[0].getBoundingClientRect().x;
        //smooth transition to given slide
        anime({
            targets: sliderWrppr,
            translateX: -i * sliderElementsAreaWidth,
            duration: 500,
            easing: 'easeOutSine'
        })
        currentSliderNo = i;

        if(slideSliderDots.sliderDotsArray.length) {
            for(p=0;p<sliderElements.length;p++) {
                if(p===currentSliderNo) {
                    slideSliderDots.sliderDotsArray[p].classList.add(slideSliderDots.activeClass)
                } else {
                    slideSliderDots.sliderDotsArray[p].classList.remove(slideSliderDots.activeClass)
                }
            }
        }

    };

    var goToNextSlide = () => {
        if (currentSliderNo === sliderElements.length - 1) {
            goToSlide(0);
        } else {
            goToSlide(currentSliderNo + 1);
        }
    };

    var goToPrevSlide = () => {
        if (currentSliderNo === 0) {
            goToSlide(sliderElements.length - 1);
        } else {
            goToSlide(currentSliderNo - 1);
        }
    };

    sliderNextArrow.addEventListener("click", () => {
        goToNextSlide();
    });

    sliderPrevArrow.addEventListener("click", () => {
        goToPrevSlide();
    });

    //auto function
    if (slider.hasAttribute('auto-slide-duration')) {
        var playCondition = 1
        var isPaused = false;
        var autoSlideTime = parseInt(slider.getAttribute('auto-slide-duration'))
        var pauseTime = 3 * autoSlideTime
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
    //slider dots function
    if (slider.hasAttribute('slider-dots-class')) {
        slideSliderDots.class = slider.getAttribute('slider-dots-class')
        slideSliderDots.sliderDotsArray = Array.from(slider.querySelectorAll('.' + slideSliderDots.class))
        slideSliderDots.sliderDotsArray.forEach(sliderDot => {
            sliderDot.addEventListener('click', () => {
                var toGoToSlide = slideSliderDots.sliderDotsArray.indexOf(sliderDot)
                goToSlide(toGoToSlide)
                pauseInterval()
            })
        })
        slideSliderDots.sliderDotsArray[0].classList.add('.' + slideSliderDots.activeClass)
    }
};

var sliders = document.querySelectorAll("[aria-slider=true]");
sliders.forEach((slider) => {
    createFunctioningSlider(slider);
});