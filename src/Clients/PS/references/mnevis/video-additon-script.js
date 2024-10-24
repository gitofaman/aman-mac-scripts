$(document).ready(function(){
    var wrapperIndex = 1; // Index counter for the video-wrapper

    // Iterate over each multicolumn section
    $('section[id*="multicolumn"]').each(function(){
        var multicolumnElement = $(this);
        
        // Find all the sibling video sections after the multicolumn element
        var videoElements = multicolumnElement.nextAll('section[id*="video"]');
        
        // Check if there are at least two video elements after the multicolumn element
        if (videoElements.length >= 2) {
            // Set the video-wrapper attribute with the current index
            multicolumnElement.attr('video-wrapper', wrapperIndex);

            // Iterate over all the video elements and set their corresponding video attribute
            videoElements.each(function(){
                $(this).attr('video', wrapperIndex);
            });

            // Increment the index for the next group of multicolumn and video sections
            wrapperIndex++;
        }
    });
});

$(document).ready(function(){
    var i = 0;
    var multicolumnCards = $('#shopify-section-template--18043124252803__multicolumn_KArAbR').find('.multicolumn-card');

    $("[video-wrapper]").each(function(){
        var currIndex = $(this).attr('video-wrapper')
        var placeholders = $(this).find('.multicolumn-card')
        var i = 0
        placeholders.each(function(){
            $(this).replaceWith($(`[video=${currIndex}]`).eq(i).find('.video-section__media'))
            i++;
        })
    })

});