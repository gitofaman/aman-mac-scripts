const getTop = el => el.offsetTop + (el.offsetParent && getTop(el.offsetParent))
const scrollToElementTop = (el, spaceFromTop) => {
    var scrollTo = getTop(el) - spaceFromTop
    window.scrollTo({
        top: scrollTo,
        behavior: 'smooth',
        })   
}
var sp = 'services-parent';
var sl = 'services-link';
var servicesLinks = $(`[${sl}]`);
var servicesParents = $(`[${sp}]`);
var activated = false;
var slideUpAnimate = (el) => {
    gsap.fromTo(el, {
        opacity: 0,
        y: 100
    }, {
        opacity: 1,
        y: 0
    })
}

var makeSlActive = (servicesLink, slAttr) => {
    servicesParents.hide();
    var toActiveServiceParent = servicesParents.filter(`[${sp}="${slAttr}"]`).show();
    slideUpAnimate(toActiveServiceParent);
    servicesLinks.removeClass('is-active');
    $(`[${sl}="${slAttr}"]`).addClass('is-active');
    console.log(toActiveServiceParent);
    if(!activated) {
        activated = true;
    } else {
        scrollToElementTop(document.querySelector('.services-container'), 120)
    }
    
}

servicesLinks.click(function() {
    var slAttr = $(this).attr(sl);
    makeSlActive($(this), slAttr);
});

servicesLinks[0].click()
$('.services-parent').removeClass('services-parent')