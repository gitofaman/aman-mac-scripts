
const scrollToElementTop = (el, spaceFromTop) => {
    var scrollTo = $(el).offset().top - spaceFromTop;
    $('html, body').animate({
        scrollTop: scrollTo
    }, 500); // 500 is the duration of the animation in milliseconds
}
