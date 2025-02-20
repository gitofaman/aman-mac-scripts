$(document).ready(function () {
    $('.swiper-slider').each(function () {
      // Default base configuration for Swiper
      const baseConfig = {
        slidesPerView: 'auto',
        speed: 500,
        keyboard: true,
        mousewheel: {
          forceToAxis: true,
        },
        pagination: {
          el: $(this).find('.swiper-bullet-wrapper')[0],
          bulletActiveClass: 'is-active',
          bulletClass: 'swiper-bullet',
          clickable: true,
        },
        navigation: {
          nextEl: $(this).find('.swiper-next')[0],
          prevEl: $(this).find('.swiper-prev')[0],
          disabledClass: 'is-disabled',
        },
        scrollbar: {
          el: $(this).find('.swiper-drag-wrapper')[0],
          draggable: true,
          dragClass: 'swiper-drag',
          snapOnRelease: true,
        },
      };
  
      // Extract the extras-json attribute
      const extrasJsonKey = $(this).attr('extras-json');
      let extrasConfig = {};
  
      // If the extras-json key is defined, evaluate it to get the referenced variable
      if (extrasJsonKey && window[extrasJsonKey]) {
        try {
          extrasConfig = window[extrasJsonKey]; // Get the variable from the global window object
        } catch (error) {
          console.error(`Invalid extras-json reference: ${extrasJsonKey}`, error);
        }
      }
      
      console.log(extrasConfig)

      // Merge baseConfig with extrasConfig and initialize Swiper
      const swiper = new Swiper($(this).find('.swiper')[0], {
        ...baseConfig,
        ...extrasConfig,
      });
    });
  });