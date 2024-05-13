var navInView = false;
var navTl = gsap.timeline()
var appearnav = () => {
    navInView = true
    $('.navbar-parent').addClass('appear-sticky').addClass('in-view')
}
var disappearnav = () => {
    navInView = false
    $('.navbar-parent').removeClass('in-view').removeClass('appear-sticky')
}

$(document).ready(function(){
    var lastScrollTop = 0;
    $navbar = $('#nav-bar')
    $(window).scroll(function(event){
        var st = $(this).scrollTop();
        // console.log(st)
        if (st < lastScrollTop && st > $navbar.height()) {
            // Scrolling up
            console.log('conditions met')
            if(!navInView) {
                appearnav()
            }

        } else {
            console.log('conditions didnt met')
            disappearnav()
        }
        lastScrollTop = st;
    });
});