var navbarShowing = false;
var inqShowing = false;

var showNavbar = (callBackFunc) => {
    navbarShowing = true;
    // show navbar
    gsap.to('[main-nav]', {
        height: 'auto',
        opacity: 1
    })
    // open toggle
}

var hideNavbar = (callBackFunc) => {
    navbarShowing = false
    // hide navbar
    gsap.to('[main-nav]', {
        height: 'auto',
        opacity: 0
    })
    // close toggle
}

var showInq = (callBackFunc) => {
    inqShowing = true;
    // show inquiry
    // hide inq btn
    // open close inq btn
}

var hideInq = (callBackFunc) => {
    inqShowing = false;
    // hide inquiry
    // show inq btn
    // close close inq btn
}

$('[inq]').on('click', function () {
    
})