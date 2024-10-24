function fadeOutInLoop(images) {
    // Step 1: Stack images by setting zIndex initially
    images.each(function (index, img) {
        $(img).css('z-index', images.length - index); // Higher index means on top
    });

    // Function to handle the fade out-in loop
    function startLoop() {
        let activeIndex = 0; // Start with the first image as active

        function fadeNext() {
            let nextIndex = (activeIndex + 1) % images.length; // Get the next image in line

            // Set zIndex and opacity for all images
            images.each(function (index, img) {
                if (index === activeIndex) {
                    $(img).css({
                        'z-index': images.length, // Active image gets the highest z-index
                        'opacity': 1 // Active image visible
                    });
                } else if (index === nextIndex) {
                    $(img).css({
                        'z-index': images.length - 1, // Next image gets second highest z-index
                        'opacity': 1 // Next image visible
                    });
                } else {
                    $(img).css({
                        'z-index': index, // Inactive images get lower z-index
                        'opacity': 0 // Inactive images hidden
                    });
                }
            });

            // GSAP fade out for the active image
            gsap.to(images[activeIndex], {
                opacity: 0,
                duration: 0.5, // 1 second fade out
                delay: 1, // Wait 3 seconds before fade out
                onComplete: function () {
                    // After fade out, move the active image to the lowest stack
                    $(images[activeIndex]).css('z-index', 1);

                    activeIndex = nextIndex; // Move to the next image
                    fadeNext(); // Recursively call for the next round
                }
            });
        }

        fadeNext(); // Start the first round
    }

    startLoop(); // Kick off the loop
}