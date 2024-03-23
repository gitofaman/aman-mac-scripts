var createFunctioningSlider = (slider) => {
  slider.style.overflow = 'hidden'
  var cssStyle = document.createElement("style");
  var sliderWrppr = slider.querySelector("[aria-wrpr=true]");
  var sliderNextArrow = slider.querySelector("[aria-next=true]");
  var sliderPrevArrow = slider.querySelector("[aria-prev = true]");
  cssStyle.innerHTML =
  `.` +
  sliderWrppr.classList[0] +
  `.slider---card {
      display: grid;
      grid-auto-flow: column;
      grid-template-rows: auto;
      transition-property: all;
      transition-duration: 500ms;
      transition-timing-function: cubic-bezier(.39, .575, .565, 1);
      }`;
  sliderWrppr.classList.add("slider---card");
  sliderPrevArrow.style.display = "hidden";
  document.head.appendChild(cssStyle);
  var sliderElements = sliderWrppr.querySelectorAll(
  "." + sliderWrppr.firstChild.classList[0]
  );
  var currentSliderNo = 0;

  var goToSlide = (i, goingPos) => {
  var sliderElementsAreaWidth =
      sliderElements[1].getBoundingClientRect().x -
      sliderElements[0].getBoundingClientRect().x;
  var lastElement = sliderElements[sliderElements.length - 1];
  var lastElementPos =
      lastElement.getBoundingClientRect().x + lastElement.offsetWidth;
  var isLastElementInView = lastElementPos < window.innerWidth
  if (isLastElementInView > 0 && goingPos === "next") {
      i = 0;
  }
  sliderWrppr.style.transform =
      "translateX(" + "-" + i * sliderElementsAreaWidth + "px" + ")";
  currentSliderNo = i;
  };

  var goToNextSlide = () => {
      if (currentSliderNo === sliderElements.length - 1) {
          goToSlide(0, "next");
      } else {
          goToSlide(currentSliderNo + 1, "next");
      }
  };

  var goToPrevSlide = () => {
      if (currentSliderNo === 0) {
          goToSlide(sliderElements.length - 1, "prev");
      } else {
          goToSlide(currentSliderNo - 1, "prev");
      }
  };

  sliderNextArrow.addEventListener("click", () => {
      goToNextSlide();
  });

  sliderPrevArrow.addEventListener("click", () => {
      goToPrevSlide();
  });
  //auto function
  if(slider.hasAttribute('auto-slide-duration')) {
      var playCondition = 1
      var isPaused = false;
      var autoSlideTime = parseInt(slider.getAttribute('auto-slide-duration'))
      var pauseTime = 6*autoSlideTime
      if(slider.hasAttribute('pause-time')) {
          pauseTime = parseInt(slider.getAttribute('pause-time'))
      }
      function autoIntervalFunction(time, func) {
          //playCondition => 0 means stop, 1 means play
          var autoInterval = setInterval(()=>{
              if(!isPaused) { 
                  if(playCondition === 1) {
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
          autoSliderTimeout = setTimeout(()=> {
              isPaused = false;
          }, pauseTime)
      }
      autoIntervalFunction(autoSlideTime, goToNextSlide)
      //pause on hover
      sliderWrppr.addEventListener('mouseover',()=>{isPaused=true;})
      sliderWrppr.addEventListener('mouseout',()=>{isPaused=false;})
      //pause on arrow click for a certain time
      sliderNextArrow.addEventListener('click',pauseInterval)
      sliderPrevArrow.addEventListener('click',pauseInterval)
  }
};

var sliders = document.querySelectorAll("[aria-slider=true]");
sliders.forEach((slider) => {
  createFunctioningSlider(slider);
});
