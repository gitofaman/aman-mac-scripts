
// simple page loader animation
function fadeInOnLoad() {
    $('.page-overlay-loader').remove();
    var poTl = gsap.timeline({
        onComplete: function() {
            $('.page-loader-block-logo').appendTo('body')
        }
    })
    poTl.to('.aux-logo-background-loader', {
        height: "100%", 
        duration: 0.6,
    }).to('.page-loader-block-logo', {
        opacity: 0,
        display: "none"
    }, ">0.1").to('.page-wrapper', {
        opacity: 1
    })
}

$(document).ready(fadeInOnLoad);

// handle page restore via back/forward navigation
window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
        fadeInOnLoad();
    }
});

// ensuring an animation before going to next page
$(document).on('click', 'a[href]:not([target="_blank"]):not([href^="#"]):not([download])', function (e) {
    const url = $(this).attr('href');
    const linkHost = new URL(url, window.location.origin).hostname;
    if (linkHost !== window.location.hostname) {
        // External link: do not animate, let default behavior occur
        return;
    }
    e.preventDefault();
    var plTl = gsap.timeline({
        onComplete: function () {
            
        },
        onStart: function() {
            window.location.href = url;
            $('.page-loader-block-logo').css({
                'display': 'flex',
                'opacity': 0
            })
            $('.aux-logo-background-loader').css({
                'height': '0%'
            })
        }
    })
    plTl.to('.page-wrapper', {
        opacity: 0,
        duration: 0.1
    }).to('.page-loader-block-logo', {
        opacity: 1,
        duration: 0.1
    }).to('.aux-logo-background-loader', {
        height: "50%",
        duration: 2
    })
});