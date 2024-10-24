var slideAutoDuration = 2.5
const swiper = new Swiper('.swiper', {
    direction: 'vertical',
    loop: true,
    centeredSlides: true,
    slidesPerView: 3,
    
    pagination: {
      el: '.swiper-pagination',
    },
    
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  
    autoplay: {
      delay: slideAutoDuration*1000,
      disableOnInteraction: false,
    },
    
    // Event listener for slide change
    // on: {
    //   slideChange: function() {

    //   }
    // }
});
var currIndex;
swiper.on('slideChange', function(){
  const activeIndex = swiper.realIndex; // Get the index of the active slide
  // const images = document.querySelectorAll();

  // Reset opacity for all images
  if(currIndex !== activeIndex) {
      currIndex = activeIndex
      console.log(activeIndex)
      var sTl = gsap.timeline({
          defaults: {
              duration: slideAutoDuration/4
          }
      })
  
      sTl.to('.img-show-img', {
          opacity: 0
      }).to($('.img-show-img').eq(activeIndex), {
          opacity: 1
      })
  }
})