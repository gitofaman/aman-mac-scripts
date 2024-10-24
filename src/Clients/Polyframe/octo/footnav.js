$(document).ready(function () {
    // $('[dr-content]').css('height', '0')
    var inquiryShift = (shift) => {
        console.log('shifting buttons')
        if(shift) {
            gsap.to($('.footnav [dr-toggle=2]'), {
                x: function() {
                    return $('.footnav [dr-toggle=2]').width() + $('.footer-nav-col_1').width() + 48 - window.innerWidth 
                }
            })
        } else {
            gsap.to($('.footnav [dr-toggle=2]'), {
                x: 0
            })
        }
    }
    var lottieToggle = (shouldOpen) => {
        var open = false;
        if (shouldOpen) {
            open = shouldOpen
        }

        if (open) {
            console.log('lottie open')
            $('.navbar-menu-toggle').attr('dr-toggle', '3')
            // navbarOpen = true
            var openTl = gsap.timeline()
            openTl
                // .to('.navbar-menu', {
                //     height: 'auto',
                //     top: 0
                // })
                .fromTo('.navbar-menu-opener', {
                    scale: 1,
                    opacity: 1
                }, {
                    scale: 0,
                    opacity: 0
                }, 0).fromTo(".navbar-menu-closer", {
                    scale: 0,
                    opacity: 0
                }, {
                    scale: 1,
                    opacity: 1
                }, 0)
            $('body').css('overflow', 'hidden')
        } else {
            inquiryShift(false)
            console.log('lottie close')
            // navbarOpen = false;
            $('.navbar-menu-toggle').attr('dr-toggle', '1')
            var closeTl = gsap.timeline()
            closeTl
                // .to('.navbar-menu', {
                //     height: '1',
                //     top: -1,
                // })
                .fromTo(".navbar-menu-closer", {
                    scale: 1,
                    opacity: 1
                }, {
                    scale: 0,
                    opacity: 0
                }, 0).fromTo('.navbar-menu-opener', {
                    scale: 0,
                    opacity: 0
                }, {
                    scale: 1,
                    opacity: 1
                }, 0).then(function () {
                    $('body').css('overflow', '')
                })
        }

    }
    // Function to open a content block
    function openContent(contentToOpen, duration) {
        var oDrTl = gsap.timeline({
            defaults: {
                duration: duration
            }
        });
        oDrTl.to(contentToOpen, {
            height: 'auto',
            opacity: 1
        }, 0);
        contentToOpen.attr('open', 'true'); // Add open attribute
        if(contentToOpen.attr('dr-content') === '2') {
            inquiryShift(true)
        }
    }

    // Function to close a content block
    function closeContent(contentToClose, duration) {
        var oDrTl = gsap.timeline({
            defaults: {
                duration: duration
            }
        });
        oDrTl.to(contentToClose, {
            height: 0,
            opacity: 0
        });
        contentToClose.removeAttr('open'); // Remove open attribute
    }

    // Set duration for animations
    var duration = 0.5;

    // Add click event listener to all toggle elements
    $('[dr-toggle]').on('click', function () {
        // Get the attribute value of the clicked toggle
        var toggleValue = $(this).attr('dr-toggle');
        var contentToOpen = []
        var contentToClose = []
        // if($(this).attr('dr-toggle') === '2') {
        //     $('dr-toggle-2').show()
        // } else {
        //     $('dr-toggle-2').hide()
        // }
        // Get all content elements
        $('[dr-content]').each(function () {
            // Get the attribute value of the content
            var contentValue = $(this).attr('dr-content');

            if (contentValue === toggleValue) {
                // Check if the content is currently open by checking the open attribute
                if ($(this).attr('open')) {
                    // Close the content if it is already open
                    contentToClose.push($(this))
                    // closeContent($(this), duration);
                } else {
                    // Open the content if it matches the toggle value and is not open
                    contentToOpen.push($(this))
                    // openContent($(this), duration);
                }
            } else {
                contentToClose.push($(this))
                // Close the content if it doesn't match the toggle value
                // closeContent($(this), duration);
            }
        });
        $.each(contentToOpen, function () {
            openContent($(this), duration)
        })
        $.each(contentToClose, function () {
            closeContent($(this), duration)
        })

        if (contentToOpen.length) {
            lottieToggle(true)
        } else {
            lottieToggle(false)
        }
    });
    $('.footnav-link').each(function() {
        if(!!$(this).attr('aria-current')) {
            $(this).css('display', 'none')
            $('[current-page]').text($(this).text())
        }
    })
});