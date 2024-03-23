if(window.innerWidth<768) {
    $(document).ready(function () {
        // Select all divs with attribute 'mobile-slider'
        $('[mobile-slider]').each(function (index) {
            //cloning swiper initial blocks as a sibling
            $(this).hide()
            var contentToClone = $('.swiper-add').eq(0).clone();
            $(this).parent().addClass('swiper-slider')
            $(this).after(contentToClone);
            var $wrapper = $(this).siblings('.swiper-add').find('.swiper-wrapper-add')
            $(this).siblings('.swiper-add').find('.swiper-arrow-add').each(function () {
                if ($(this).index() > 0) {
                    $(this).addClass('swiper-next')
                }
                $(this).addClass('swiper-prev')
            })
            //add the slides inside
            var $cards = $(this).children()
            $cards.each(function () {
                $wrapper.append($(this).clone().addClass('swiper-slide-add'))
                //select what was appended here
            })
        });

        $('[class*="-add"]').each(function () {
            // Get the current element's class
            var currentClass = $(this).attr('class');
    
            // Remove '-add' from the class and add the modified class
            var newClass = currentClass.replace('-add', '');
            $(this).addClass(newClass);
        });

        $('.swiper-slider').each(function (index) {
            console.log('working on this')
            const swiper = new Swiper($(this).find('.swiper')[0], {
                slidesPerView: "auto",
                speed: 500,
                keyboard: true,
                slideToClickedSlide: true,
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
                },
                autoplay: {
                    delay: '3500'
                }
            })
        })
    });
}
