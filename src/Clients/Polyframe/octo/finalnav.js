
  // Use GSAP to animate the height
//   gsap.to('.footnav-nav-links', {
//     height: 
//   });
  
  
  
$(document).ready(function () {
    var inquiryShift = (shift) => {
        var isTl = gsap.timeline()
        console.log('shifting buttons')
        if(shift) {
            isTl.to('.footer-nav-col_1', {
                width: 0,
                opacity: 0
            }).to($('.footnav [dr-toggle=2]'), {
                opacity: 0,
                scale: 0
            }, 0).to('.navtoggle-footnav', {
                scale: 1,
                opacity: 1
            }, 0)
        } else {
            isTl.to($('.footnav [dr-toggle=2]'), {
                opacity: 1,
                scale:1
            }, 0).to('.footer-nav-col_1', {
                width: 'auto',
                opacity: 1
            }, 0).to('.navtoggle-footnav', {
                scale: 0,
                opacity: 0
            }, 0)
        }
    }
    var lottieToggle = (elClass = 'navbar-menu-toggle', shouldOpen) => {
        var open = false;
        var $main = $(`.${elClass}`)
        if (shouldOpen) {
            open = shouldOpen
        }

        if (open) {
            console.log('lottie open')
            $main.attr('dr-toggle', '3')
            // navbarOpen = true
            var openTl = gsap.timeline()
            openTl
                // .to('.navbar-menu', {
                //     height: 'auto',
                //     top: 0
                // })
                .fromTo($main.find('.navbar-menu-opener'), {
                    scale: 1,
                    opacity: 1
                }, {
                    scale: 0,
                    opacity: 0
                }, 0).fromTo($main.find(".navbar-menu-closer"), {
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
            $main.attr('dr-toggle', '1')
            var closeTl = gsap.timeline()
            closeTl
                // .to('.navbar-menu', {
                //     height: '1',
                //     top: -1,
                // })
                .fromTo($main.find(".navbar-menu-closer"), {
                    scale: 1,
                    opacity: 1
                }, {
                    scale: 0,
                    opacity: 0
                }, 0).fromTo($main.find('.navbar-menu-opener'), {
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
        var delay = 0
        if(contentToOpen.attr('dr-content') === '2') {
            inquiryShift(true)
                delay = 0.5
        }
        var oDrTl = gsap.timeline({
            defaults: {
                duration: duration
            }
        });
        oDrTl.to(contentToOpen, {
            height: (() => {
                const dvh = window.innerHeight; // 100dvh
                const footNavMain = document.querySelector('.footnav-main');
                const footNavMainHeight = footNavMain.getBoundingClientRect().height;
            
                return window.innerWidth < 768 ? (dvh - footNavMainHeight + 'px') : 'auto';
              })(),
            opacity: 1,
            delay: delay
        }, 0).then(function(){
            contentToOpen.attr('open', 'true');
        });
         // Add open attribute
    }

    // Function to close a content block
    function closeContent(contentToClose, duration) {
        var delay = 0
        if(contentToClose.attr('dr-content') === '1') {
            delay = 0.5
        }
        var oDrTl = gsap.timeline({
            defaults: {
                duration: duration
            }
        });
        oDrTl.to(contentToClose, {
            height: 0,
            opacity: 0,
            delay: 0.5
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
            lottieToggle('navbar-menu-toggle',true)
        } else {
            lottieToggle('navbar-menu-toggle', false)
        }
    });
    $('.footnav-link').each(function() {
        if(!!$(this).attr('aria-current')) {
            $(this).css('display', 'none')
            $('[current-page]').text($(this).text())
        }
    })
    var fnavOpen = false;
    $('.navbar-menu-toggle-1').on('click', function() {
        if(!fnavOpen) {
            lottieToggle('navbar-menu-toggle-1', true)
            gsap.to('.navbar-menu', {
                height: '100%',
                top: 0,
                duration: 0.5
            })
            
            gsap.to('.footnav', {
                height: '0',
                opacity: 0,
                onComplete: function() {
                    $('.footnav').addClass('pointer-events-off')
                }
            })
            fnavOpen = true;
        } else {
            lottieToggle('navbar-menu-toggle-1', false)
            gsap.to('.navbar-menu', {
                height: '1px',
                top: '-1px',
                duration: 0.5
            })
            gsap.to('.footnav', {
                height: 'auto',
                opacity: 1,
                onComplete: function() {
                    $('.footnav').removeClass('pointer-events-off')
                }
            })
            fnavOpen = false;
        }
    })
});