$('a').each(function() {
    var $a = $(this);
    var scrollTo = $a.attr('scroll-to');
    var mainLink = $a.attr('href');

    if (scrollTo) {
        // Check if the link already contains parameters
        var separator = mainLink.includes('?') ? '&' : '?';
        $a.attr('href', mainLink + `${separator}scroll-to=${scrollTo}`);
    }
});

$(document).ready(function() {
    // Function to get URL parameter value
    function getUrlParameter(name) {
        var urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Check if the URL has 'scroll-to' parameter
    var scrollToId = getUrlParameter('scroll-to');

    if (scrollToId) {
        var $target = $('#' + scrollToId);

        // If the target element with the ID exists
        if ($target.length) {
            // Smooth scroll to the section
            $('html, body').animate({
                scrollTop: $target.offset().top
            }, 1000); // Adjust the animation speed as needed (1000ms = 1s)
        }
    }
});
