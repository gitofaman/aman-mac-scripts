const getTop = el => el.offsetTop + (el.offsetParent && getTop(el.offsetParent))
const scrollToElementTop = (el, spaceFromTop) => {
    var scrollTo = getTop(el) - spaceFromTop
    window.scrollTo({
        top: scrollTo,
        behavior: 'smooth',
        })   
}

$(document).ready(function() {
    // Select all anchor elements
    $('a').each(function() {
        var href = $(this).attr('href');
        
        // Check if the href attribute contains '#' followed by any text
        if (href && href.match(/#(.+)/)) {
            var sectionId = href.match(/#(.+)/)[1];
            if(!$(`#${sectionId}`).length) {
                $(this).attr('href', href.replace(`#${sectionId}`, `?scroll-to=${sectionId}`));
            }
        }
    });
});

$(document).ready(function() {
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    var scrollToValue = getParameterByName('scroll-to');
    if (scrollToValue) {
        var elementToScrollTo = document.querySelector('#' + scrollToValue);
        if (elementToScrollTo) {
            scrollToElementTop(elementToScrollTo, 0);
        }
    }
});
