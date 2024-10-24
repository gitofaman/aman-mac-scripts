$('.section').removeClass('hide')

var filtersBtn = $('.aq-filter-field')
var swiper;
$(document).ready(function () {
    // Select the target node based on the attribute fs-cmsfilter-element="list"
    var totalClicks = 0
    var pastTotalClicks = 0
    var targetNode = $('[fs-cmsfilter-element="list"]')[0];

    // Callback function to execute when mutations are observed
    var callback = function (mutationsList, observer) {
        // Check if any mutations involve child list changes
        // for (var mutation of mutationsList) {
        //     if (mutation.type === 'childList') {
        //         console.log("Children changed");
        //     }
        // }
        if (pastTotalClicks != totalClicks) {
            console.log("Children changed");
            pastTotalClicks = totalClicks;
        }



    };

    // Create an observer instance linked to the callback function
    var observer = new MutationObserver(callback);

    // Start observing the target node for changes to its children
    observer.observe(targetNode, {
        childList: true, // Observe changes to the child elements
        subtree: false // Do not observe deeper children
    });


    filtersBtn.on('click', function () {
        console.log('filters clicked')
        totalClicks++;
    })

    $('.aq-slider-parent').each(function(index){
        swiper = new Swiper($(this).find('.swiper')[0], {
            slidesPerView: "auo",
            loop: true,
            speed: 500,
            keyboard: true,
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

});