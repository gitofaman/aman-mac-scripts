var pEls = document.querySelectorAll('[class*="lt-"]')
var finalPEls = []
pEls.forEach(pEl=>{
    var closestLtParent = pEl.parentNode.closest('[class*="lt-"]')
    // console.log(!!closestLtParent)
    if(!!closestLtParent) {
        finalPEls.push(pEl)
    }
})

finalPEls.forEach((el, index) => {
    const height = el.getBoundingClientRect().height;
    const moveAmount = height * 0.13;
    // const direction = index % 2 === 0 ? 1 : -1; // Move down for even indices, up for odd indices

    gsap.to(el, {
        y: 0, // Start at the original position
        scrollTrigger: {
            trigger: el,
            start: "top bottom", // Trigger animation when 70% of the element is in the viewport
            end: "bottom top", // End animation when 30% of the element is in the viewport
            scrub: true, // Smoothly animate as you scroll
        },
        y: - moveAmount, // Move the element based on the calculated amount and direction
        ease: "power1.out", // Choose an easing function
    });
});