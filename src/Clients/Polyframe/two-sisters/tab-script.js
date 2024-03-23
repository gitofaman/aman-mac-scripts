var sp = 'services-parent';
var sl = 'services-link';
var servicesLinks = $(`[${sl}]`);
var servicesParents = $(`[${sp}]`);

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
    servicesLink.addClass('is-active');
    console.log(toActiveServiceParent);
}

servicesLinks.click(function() {
    var slAttr = $(this).attr(sl);
    makeSlActive($(this), slAttr);
});

servicesLinks[0].click()