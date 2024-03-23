$('.swiper-slider').each(function(index){
    const swiper = new Swiper($(this).find('.swiper')[0], {
        slidesPerView: "auto",
        speed: 500,
        keyboard: true,
        slideToClickedSlide: true,
        pagination: {
            el: $(this).find('.swiper-bullet-wrapper')[0],
            bulletActiveClass: "is-active",
            bulletClass: "swiper-bullet",
            bulletElement: "button",
            clickable: true
        },
        navigation: {
            nextEl: $(this).find(".swiper-next")[0],
            prevEl: $(this).find(".swiper-prev")[0],
            disabledclass: "is-disabled"
        },
        scrollbar: {
            el: $(this).find(".swiper-drag-wrapper")[0],
            draggable: true,
            dragClass: 'swiper-drag',
            snapOnRelease: true
        }
    })
})