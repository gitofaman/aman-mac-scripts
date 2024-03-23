var sSliders = document.querySelectorAll('[desktop-slider]')
sSliders.forEach(sSlider=>{
    comboSwiperBulletName = sSlider.querySelector('.swiper-dot').classList[1]
    sSlider.setAttribute('s-bullet-class', comboSwiperBulletName)
})
$('.swiper-slider').each(function(index){
    const swiper = new Swiper($(this).find('.swiper')[0], {
        slidesPerView: "auto",
        speed: 500,
        keyboard: true,
        pagination: {
            el: $(this).find('.swiper-dot-parent')[0],
            bulletActiveClass: "is-active",
            bulletClass: "swiper-dot",
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
sSliders.forEach(sSlider=>{
    var swiperBullets = sSlider.querySelectorAll('.swiper-dot')
    swiperBullets.forEach(bullet=>{
        bullet.classList.add(sSlider.getAttribute('s-bullet-class'))
        bullet.style.padding = '0px'
    })
})