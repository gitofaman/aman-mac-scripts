    // page load animation
    var dfTime = 1
$('.logo-container').css({
    display: 'flex'
})
var heroTimeline = gsap.timeline({
    duration: dfTime,
    ease: 'easeInOut'
})

heroTimeline.to($('.under-logo-text'), {
    opacity: 0,
    delay: 1
}).to($('.logo-container'), {
    fontSize: '1rem',
    left: '0%',
    top: '0%',
    height: `26px`
}).to($('.section-snap.is-hero'), {
    height: '75vh'
}, 2.5)