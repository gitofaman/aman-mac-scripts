
// allowNavbarCode = false





$('[line="symbol"]').each(function() {
    var symbol = $(this)
    var starter = $(this).find('[line="left"]');
    var line = $(this).find('[line="line"]');
    var ender = $(this).find('[line="right"]');

    var sleTl = gsap.timeline({
        scrollTrigger: {
            trigger: symbol,
            start: "top bottom",
            // end: "top 50%",
            // scrub: true,
        }
    });

    sleTl.from(starter, {
        opacity: 0,
        x: -100,
        duration: 0.5
    }).from(ender, {
        opacity: 0,
        x: 100,
        duration: 0.5
    }, "<0.1").from(line, {
        scaleX: 0,
        duration: 1.5
    }, "<")

})


