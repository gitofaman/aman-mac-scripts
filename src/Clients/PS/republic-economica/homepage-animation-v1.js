$(document).ready(function () {
    // Set initial states
    var blocksToShow = $('.unwrap-this-blocks');
    gsap.set(blocksToShow, {
        height: 0,
    });

    // Function to animate the blocks
    var startPage = (func) => {
        var spTl = gsap.timeline();
        func();
        spTl.to(blocksToShow, {
            height: function () {
                return $(window).height();
            },
            duration: 1,
        }).to(blocksToShow, {
            height: "auto",
            duration: 1,
        });
    };

    // Function to disable interactions after animation
    var disableInteractions = () => {
        $(document).off('wheel');
        $(document).off('touchstart touchend');
        console.log('Interactions disabled');
    };

    var pageShouldStart = true;

    // Trigger on button click
    $('[trigger-open]').on('click', function () {
        startPage(disableInteractions);
    });

    // Trigger on mouse wheel (desktop)
    $(document).on('wheel', function (e) {
        if (e.originalEvent.deltaY > 0 && pageShouldStart) {
            startPage(() => {
                disableInteractions();
                pageShouldStart = false;
            });
        }
    });

    // Variables for touch interaction (mobile)
    var touchStartY = 0;
    var touchEndY = 0;

    // Detect swipe up gesture
    $(document).on('touchstart', function (e) {
        touchStartY = e.originalEvent.touches[0].clientY;
    });

    $(document).on('touchend', function (e) {
        touchEndY = e.originalEvent.changedTouches[0].clientY;
        if (touchStartY > touchEndY + 50 && pageShouldStart) { // Swipe up detected
            startPage(() => {
                disableInteractions();
                pageShouldStart = false;
            });
        }
    });
});
