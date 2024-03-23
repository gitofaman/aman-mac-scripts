gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: '.div2',
        markers: true,
        start: "top top",
        pin: true,
        scrub: 2
    }
})

tl.fromTo('.square2', {x: '-100%', scale: 0.5}, {x: '0%', scale: 1, duration: 2}).fromTo('.square', {x: '100%'}, {x: '0%'})