$(document).ready(function() {
    //code to replace image with a div duplicating the same view
    $('[div-replace]').each(function() {
        var imgSrc = $(this).attr('src');
        var imgHeight = $(this).height();
        var imgWidth = $(this).width();
        
        // Get the class of the original image
        var imgClass = $(this).attr('class');
        
        // Create a div element to wrap the new div
        var wrapperDiv = $('<div class="image-wrapper"></div>');
        
        // Create a div element to replace the image and add the same class
        var div = $('<div class="reveal-div ' + imgClass + '"></div>');
        div.css({
            'height': '100%',
            'width': '100%',
            'background-image': 'url("' + imgSrc + '")',
            'background-size': '100% 100%' // Ensure background image size is 100%
        });
        wrapperDiv.css({
            'height': imgHeight + 'px',
            'width': imgWidth + 'px',
        });
        
        // Append the new div inside the wrapper div
        wrapperDiv.append(div);
        
        // Replace the image with the wrapper div
        $(this).replaceWith(wrapperDiv);
    }); 

    //code to animate the underlined texts
    $('[u-text]').each(function(){
        var relatedRevealDiv = $(this).parent().find('.reveal-div')
        gsap.to(relatedRevealDiv, {
            width: '0%',
            duration: 0
        })
        $(this).on('mouseover', function(){
            gsap.to(relatedRevealDiv, {
                width: '100%'
            })
        })
        $(this).on('mouseout', function(){
            gsap.to(relatedRevealDiv, {
                width: '0%'
            })
        })
    })
});