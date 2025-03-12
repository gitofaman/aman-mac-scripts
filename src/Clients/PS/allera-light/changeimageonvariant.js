$(document).ready(function () {
    $('.variant-select').on('change', function () {
        var newProductImage = $('.product-image img').attr('src');
        console.log(newProductImage);
        console.log("variant changed");

        var swiperBulletToNavigateTo = $('.swiper-slide.is-product-navigation-wrapper').filter(function() {
            return $(this).find('img.full-image-main').attr('src') === newProductImage;
        });

        if (swiperBulletToNavigateTo.length > 0) {
            // If the slide is already present, navigate to it
            swiperBulletToNavigateTo.click();
        } else {
            // If not present, create a new slide
            var bulletSwiper = swipers["product-slider-bullet"];
            var mainSwiper = swipers["product-main"];

            if (bulletSwiper && mainSwiper) {
                var lastSlide = $('.swiper-slide.is-product-navigation-wrapper').last();

                if (lastSlide.length) {
                    var newSlide = lastSlide.clone();
                    newSlide.find('img.full-image-main').attr('src', newProductImage);
                    bulletSwiper.appendSlide(newSlide);

                    // Wait for the DOM to update before selecting the newly added slide
                    setTimeout(() => {
                        var newBulletSlide = $('.swiper-slide.is-product-navigation-wrapper').filter(function() {
                            return $(this).find('img.full-image-main').attr('src') === newProductImage;
                        });

                        if (newBulletSlide.length > 0) {
                            newBulletSlide.click();
                        }
                    }, 100);
                }
            }
        }
    });
});
