$(document).ready(function () {
    function getCurrentIndex(currentPercentage, length) {
        let step = 100 / length; // Calculate step size
        return Math.min(Math.floor(currentPercentage / step), length - 1);
    }

    function activateCurrentElement(els, currentPercentage) {
        let currentIndex = getCurrentIndex(currentPercentage, els.length);
        let currElement = $(els[currentIndex]);

        if (!currElement.hasClass('is-active')) {
            els.removeClass('is-active');
            currElement.addClass('is-active');
        }
    }

    var updateProgess = (percentage) => {
        percentage = Math.max(0, Math.min(percentage, 100));

        var possiblePadding = $('.about-what_scroll').outerWidth() - $('.about-what_scroll-fill').outerWidth();
        $('.about-what_scroll').css({
            'padding-left': percentage * 0.01 * possiblePadding
        });

        activateCurrentElement($('.about-what_right-item-middle'), percentage);
    };

    let parent = $(".about-what_right");
    let wrapper = $(".about-what_right-wrapper");

    let parentWidth = parent.outerWidth();
    let wrapperWidth = wrapper.outerWidth();
    let moveDistance = wrapperWidth - parentWidth;

    let isMobile = window.matchMedia("(max-width: 768px)").matches; // Check if mobile

    if (!isMobile) {
        // **Desktop Behavior (Hover + Manual Scroll)**
        let tl = gsap.timeline({ paused: true });
        tl.to(wrapper, { x: -moveDistance, ease: "none", duration: 1 });

        parent.on("mouseenter", function () {
            $("body").css("overflow", "hidden"); // Disable body scroll

            let scrollProgress = 0;

            parent.on("wheel.aboutWhat", function (event) {
                event.preventDefault();

                let delta = event.originalEvent.deltaY;
                scrollProgress += delta * 0.002;
                scrollProgress = Math.max(0, Math.min(1, scrollProgress));

                tl.progress(scrollProgress);

                let percentage = Math.round(scrollProgress * 100);
                console.log("Animation Progress: " + percentage + "%");
                updateProgess(percentage);
            });
        });

        parent.on("mouseleave", function () {
            $("body").css("overflow", "auto");
            parent.off("wheel.aboutWhat");
        });

    } else {
        // **Mobile Behavior (ScrollTrigger)**
        gsap.to(wrapper, {
            x: -moveDistance,
            ease: "none",
            scrollTrigger: {
                trigger: $('.about-what_wrapper'),
                start: "center center",
                // end: "bottom bottom",
                scrub: 0.5, // Smooth scrolling effect
                pin: true // Pin the section
            },
            onUpdate: function () {
                let progress = this.progress(); // GSAP animation progress (0-1)
                let percentage = Math.round(progress * 100);
                updateProgess(percentage);
            }
        });
    }
});
