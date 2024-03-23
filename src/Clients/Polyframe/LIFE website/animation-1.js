
//each of the leaves coming up in a bouncy manner then moving at the same position a little.
gsap.registerPlugin(ScrollTrigger);
var leavesParents = Array.from(document.querySelectorAll('[leaves-parent]'))

gsap.defaults({
    duration: 0.7,
    ease: "power3.out"
  });

// const tl = gsap.timeline();

var doAnimation = (parent, func) => {
    var button = parent.querySelector('.button')
    button.addEventListener('click', ()=>{
        func(parent)
    })
}

doAnimation(leavesParents[0], (parent)=>{
    var leaves = Array.from(parent.querySelectorAll('[class*="lt-1"]'))
    gsap.fromTo(leaves, {
        y: 60, opacity: 0, rotateY: 90, rotateZ: 15
    }, {
        y: 0, opacity: 1, stagger: 0.1, rotateY: 0, rotateZ: 0
    })
})
doAnimation(leavesParents[1], (parent)=>{
    var leaves = Array.from(parent.querySelectorAll('[class*="lt-1"]'))
    gsap.fromTo(leaves, {
        y: 60, opacity: 0, rotateX: 30
    }, {
        y: 0, opacity: 1, stagger: 0.1, rotateX: 0
    })
})
doAnimation(leavesParents[2], (parent)=>{
    var leaves = Array.from(parent.querySelectorAll('[class*="lt-1"]'))
    gsap.fromTo(leaves, {
        x: (index) => index % 2 === 0 ? 60 : -60, opacity: 0, rotateX: (index) => index % 2 === 0 ? -60 : 60
    }, {
        x: 0, opacity: 1, stagger: 0.15, rotateX: 0
    })
})
doAnimation(leavesParents[3], (parent)=>{
    var leaves = Array.from(parent.querySelectorAll('[class*="lt-1"]'))
    gsap.fromTo(leaves, {
        x: 40, opacity: 0, rotateY: (index) => index % 2 === 0 ? 60 : -60
    }, {
        x: 0, opacity: 1, stagger: 0.2, rotateY: 0
    })
})
doAnimation(leavesParents[4], (parent)=>{
    var leaves = Array.from(parent.querySelectorAll('[class*="lt-1"]'))
    gsap.fromTo(leaves, {
        y: 20, opacity: 0, scale: 0.6
    }, {
        y: 0, opacity: 1, stagger: 0.2, scale: 1
    })
})