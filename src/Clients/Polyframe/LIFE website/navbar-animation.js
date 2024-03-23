var navTimeline;
document.querySelector('.navbar-menu-bg').style.display = 'block';

var navAnimationPlay = () => {
    var navLeaves = document.querySelectorAll('.navbar-leaf')
    var scaleValue = 2;
    var durationValue = 5;
    var timeDiff = 0.1;
    if(!!navTimeline) {
        navTimeline.play()
    }
    navTimeline = gsap.timeline();
    navTimeline.fromTo(navLeaves[0], {
        scale: 0
    }, {
        scale: scaleValue,
        duration: durationValue
    }).fromTo(navLeaves[1], {
        scale: 0
    }, {
        scale: scaleValue,
        duration: durationValue - timeDiff
    }, 0.1).fromTo(navLeaves[2], {
        scale: 0
    }, {
        scale: scaleValue,
        duration: durationValue - timeDiff
    }, 0.2)
}

var navAnimationClose = () => {
    navTimeline.reverse();
}