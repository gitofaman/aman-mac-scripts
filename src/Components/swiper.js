$(document).ready(function () {
  var swipers = {};

  $('.swiper-slider').each(function () {
    const $this = $(this);
    const $swiperEl = $this.find('.swiper');

    if ($swiperEl.length === 0) {
      console.warn('Swiper element not found inside:', this);
      return;
    }

    const baseConfig = {
      slidesPerView: 'auto',
      speed: 500,
      keyboard: true,
      mousewheel: {
        forceToAxis: true,
      },
      pagination: {
        el: $this.find('.swiper-bullet-wrapper')[0],
        bulletActiveClass: 'is-active',
        bulletClass: 'swiper-bullet',
        clickable: true,
      },
      navigation: {
        nextEl: $this.find('.swiper-next')[0],
        prevEl: $this.find('.swiper-prev')[0],
        disabledClass: 'is-disabled',
      },
      scrollbar: {
        el: $this.find('.swiper-drag-wrapper')[0],
        draggable: true,
        dragClass: 'swiper-drag',
        snapOnRelease: true,
      },
      slideToClickedSlide: true,
    };

    const extrasJsonKey = $this.attr('extras-json');
    let extrasConfig = {};

    if (extrasJsonKey && window[extrasJsonKey]) {
      try {
        extrasConfig = window[extrasJsonKey];
      } catch (error) {
        console.error(`Invalid extras-json reference: ${extrasJsonKey}`, error);
      }
    }

    try {
      const swiper = new Swiper($swiperEl[0], {
        ...baseConfig,
        ...extrasConfig,
      });

      const swiperName = $this.attr('swiper-name');
      if (swiperName) {
        if (swipers[swiperName]) {
          console.warn(`Duplicate swiper-name detected: ${swiperName}`);
        }
        swipers[swiperName] = swiper;
      }
    } catch (err) {
      console.error('Swiper initialization failed for:', this, err);
    }
  });
});
