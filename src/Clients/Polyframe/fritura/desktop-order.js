//desktop order button script
$(document).ready(function () {
    $(window).on('scroll', function () {
        if ($(window).width() > 991) {
            var orderCover = $('.order-cover');
            if (orderCover.is(':visible')) {
                $('body').css('overflow', 'hidden');
            } else {
                $('body').css('overflow', 'auto');
            }
        }
    });
    if ($(window).width() > 991) {
        var orderOpen = false;
        $('[order]').css({
            width: $('.div-block-5').width()
        })
        var desktopOrderOpen = (duration) => {
            var orderText = $('[order]').find('.nav-link')
            var ocTl = gsap.timeline({
                defaults: {
                    duration: duration
                }
            })
            ocTl.fromTo('.order-cover', {
                    display: 'flex',
                    opacity: 0,
                    y: '100%'
                }, {
                    opacity: 1,
                    y: '0%'
                }).fromTo('.order-btn-link', {
                    y: '100%',
                    opacity: 0,
                }, {
                    y: '0%',
                    opacity: 1,
                    stagger: 0.1
                }, 0.2)
                .then(function () {
                    orderText.html('CLOSE')
                })
            orderOpen = true;

        }
        var desktopOrderClose = (duration) => {
            var orderText = $('[order]').find('.nav-link')

            var ocTl = gsap.timeline({
                defaults: {
                    duration: duration,
                }
            })
            ocTl.to('.order-btn-link', {
                    y: '100%',
                    opacity: 0,
                }).to('.order-cover', {
                    opacity: 0,
                    y: '100%'
                }, 0.2)
                .then(function () {
                    $('.order-cover').hide();
                    orderText.html('ORDER NOW')
                    $('body').css({
                        'overflow': 'show'
                    })
                })
            orderOpen = false

        }
        $('[order]').on('click', function () {
            if (!orderOpen) {
                desktopOrderOpen(0.4)
            } else {
                desktopOrderClose(0.4)
            }
        })

        desktopOrderClose(0)
    }
});