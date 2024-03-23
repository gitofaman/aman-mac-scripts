
//each of the leaves coming up in a bouncy manner then moving at the same position a little.
gsap.registerPlugin(ScrollTrigger);
var leavesParents = Array.from(document.querySelectorAll('[leave-parent]'))

gsap.defaults({
    duration: 0.7,
    ease: "power3.out"
  });

// const tl = gsap.timeline();
leavesParents.forEach(leavesParent => {
    var leaves = Array.from(leavesParent.querySelectorAll('[class*="lt-1"]'))
    gsap.fromTo(leaves, {
        y: 60, opacity: 0, rotateX: 30
    }, {
        y: 0, opacity: 1, stagger: 0.1, rotateX: 0
    })
})
// Add animations to the timeline