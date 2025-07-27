// 12 july updated script for About Us. 

$(document).ready(function () {

    var scrubbing = false;
    var duration = 1;

    if (scrubbing) {
        duration = 3
    }

    var stickySectionWrapper = $('.section-wrapped-for-sticky')
    var stickySection = $('.section-rotating-sticky-item')
    var tsParents = stickySection.find('.is-ts')
    let maxHeight = 0;
    var totalItems;


    $('.section-scrub-testimonials').each(function () {
        const $section = $(this);
        const $items = $section.find('.padding-global.is-ts');
        totalItems = $items.length
        // Calculate max height
        $items.each(function () {
            const thisHeight = $(this).outerHeight();
            if (thisHeight > maxHeight) maxHeight = thisHeight;
        });

        // Apply styling
        $items.css({
            height: maxHeight + 'px',
            position: 'absolute',
        });


        // First testimonial is relative
        $items.eq(0).css('position', 'relative');

        // Split lines inside this section only
        $section.find('[ts]').each(function () {
            splitTextToLines($(this));
        });

    });
    
    stickySectionWrapper.css({
        height: maxHeight * (totalItems - 1) + "px"
    })

    var tsSrubber = gsap.timeline({
        scrollTrigger: {
            trigger: stickySectionWrapper,
            start: "top top",
            end: "bottom bottom",
            scrub: scrubbing,
        },
        onComplete: function () {
            if (!scrubbing) {
                tsSrubber.restart()
            }
        },
        defaults: {
            duration: duration
        }
    })

    tsParents.each(function (index) {
        var tsParent = $(this)
        var isLastItem = index === tsParents.length - 1;
        tsSrubber.to(tsParent.find('.line-span div'), {
            y: 0
        })
        if (!isLastItem) {
            tsSrubber.to(tsParent.find('.line-span div'), {
                y: '100%',
                delay: duration
            })
        }
        if (!scrubbing && isLastItem) {
            tsSrubber.to(tsParent.find('.line-span div'), {
                y: '100%',
                delay: duration
            })
        }
    })

});
