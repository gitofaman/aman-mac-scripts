var swipers = {};
$('.swiper-slider').each(function () {
  const baseConfig = {
    slidesPerView: 'auto',
    speed: 500,
    keyboard: true,
    mousewheel: { forceToAxis: true },
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
    slideToClickedSlide: true,
  };

  // Extract the extras-json attribute
  const extrasJsonKey = $(this).attr('extras-json');
  let extrasConfig = {};

  if (extrasJsonKey && window[extrasJsonKey]) {
    try {
      extrasConfig = window[extrasJsonKey];
    } catch (error) {
      console.error(`Invalid extras-json reference: ${extrasJsonKey}`, error);
    }
  }

  console.log(extrasConfig);

  // Ensure Swiper element exists
  const swiperElement = $(this).find('.swiper')[0];
  if (!swiperElement) {
    console.warn('Swiper element not found in:', this);
    return;
  }

  const swiper = new Swiper(swiperElement, { ...baseConfig, ...extrasConfig });

  var swiperName = $(this).attr('swiper-name');
  if (swiperName) {
    if (swipers[swiperName]) {
      console.warn(`Duplicate swiper-name detected: ${swiperName}`);
    }
    swipers[swiperName] = swiper;
  }
});
