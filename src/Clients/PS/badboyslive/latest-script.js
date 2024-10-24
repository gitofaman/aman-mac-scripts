$(document).ready(function () {
    var imgClass = "blog43_image-portfolio";

    // Wrap each image with class blog43_image-portfolio inside a div with the same class
    $(`.${imgClass}`).each(function () {
        var $img = $(this); // Store the original img element
        $img.css({
            'zIndex': 10
        })
        var $div = $('<div>').addClass(imgClass); // Create the new div with the same class
        $img.wrap($div); // Wrap the img inside the new div
    });

    // Function to fetch images from a link, excluding those with 'w-dyn-bind-empty'
    function getImagesFromLink(link) {
        return $.ajax({
            url: link,
            type: 'GET',
            dataType: 'html' // Expect HTML content from the response
        }).then(function (response) {
            var $responseHTML = $(response); // Convert the response into a jQuery object
            var imageSrcs = [];

            // Select images with the class 'product-header3_image' but without 'w-dyn-bind-empty'
            $responseHTML.find('img.product-header3_image').not('.w-dyn-bind-empty').each(function () {
                var src = $(this).attr('src'); // Get the src of each image
                if (src) {
                    imageSrcs.push(src); // Add the src to the array if it exists
                }
            });

            return imageSrcs; // Return the array of src values
        });
    }

    // For each .blog43_item, get the image srcs from the link and append the images
    $('.blog43_item').each(function () {
        var startingZindex = 10;
        var thisItemLink = window.location.origin + $(this).find('.blog43_item-link').attr('href'); // Build the link for this item
        var imgContainer = $(this).find(`div.${imgClass}`); // Find the container to append the new images

        // Fetch image sources from the link
        getImagesFromLink(thisItemLink).then(function (images) {
            // Ensure images is an array before proceeding
            if (Array.isArray(images)) {
                // For each src in the fetched images, append a new img element inside imgContainer
                images.forEach(function (src) {
                    var newImg = $('<img>').addClass(imgClass).attr('src', src); // Create new img with class and src
                    newImg.css({
                        'zIndex': startingZindex - 1
                    })
                    startingZindex--;
                    imgContainer.append(newImg); // Append the new image to the container
                });
            }
        }).catch(function (error) {
            console.log('Error fetching images:', error);
        });
    });
})

$(document).ready(function () {
    // For each block with the class "blog43_image-portfolio"
    $('.blog43_item').each(function () {
        let portfolioBlock = $(this); // Current portfolio block

        // Function to handle the fade-in and fade-out animation
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
                        delay: 1.5, // Wait 3 seconds before fade out
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


        // Hover event handler for the current portfolio block
        portfolioBlock.hover(
            function () {
                console.log('it hovered')

                // Re-select the images dynamically when hovering starts
                let images = portfolioBlock.find('img.blog43_image-portfolio');

                // Begin the fade animation for the dynamically selected images
                fadeOutInLoop(images);
            },
            function () {
                // On hover end, re-select the images and stop their animations
                let images = portfolioBlock.find('img.blog43_image-portfolio');
                gsap.killTweensOf(images); // Stop the animation for this block's images
                gsap.to(images, {
                    opacity: 1,
                    duration: 0.5
                }); // Reset to full opacity
            }
        );
    });
});