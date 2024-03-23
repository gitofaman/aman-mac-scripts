var snapSections = document.querySelectorAll('[snap-section="true"]')

// function disableScroll(elScrollPos) {
//     window.onscroll = function() {
//         window.scrollTo({
//             top: elScrollPos,
//             behavior: 'smooth',
//         }) 
//     };
//     setTimeout(enableScroll, 500)
// }

// function enableScroll() {
// 	window.onscroll = function() {};
// }

var isElementInView = (t) => {
    var topPos = t.getBoundingClientRect().top
    var tHeight = t.offsetHeight;
    var windowHeight = window.innerHeight;
    if(topPos>windowHeight) {
        return false;
    } 
    if(topPos < 0 && Math.abs(topPos) > tHeight) {
        return false;
    }
    return true;
}

  
const getTop = el => el.offsetTop + (el.offsetParent && getTop(el.offsetParent))
const scrollToElementTop = (el, spaceFromTop) => {
    var scrollTo = getTop(el) - spaceFromTop
    window.scrollTo({
        top: scrollTo,
        behavior: "smooth"
    }) 
}

var snapSectionInteraction = window.addEventListener('scroll', ()=>{
    snapSections.forEach(snapSection=>{
        var sectionShouldSnap = snapSection.getAttribute('snap-section') === 'true'
        if(isElementInView(snapSection) && sectionShouldSnap) {
            snapSection.setAttribute('snap-section', 'false')
            scrollToElementTop(snapSection, 0)
        }
        if(!isElementInView(snapSection) && !sectionShouldSnap) {
            snapSection.setAttribute('snap-section', 'true')
        }
    })
})