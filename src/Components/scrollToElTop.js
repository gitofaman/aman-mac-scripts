const getTop = el => el.offsetTop + (el.offsetParent && getTop(el.offsetParent))
const scrollToElementTop = (el, spaceFromTop) => {
    var scrollTo = getTop(el) - spaceFromTop
    window.scrollTo({
        top: scrollTo,
        behavior: 'smooth',
        })   
}