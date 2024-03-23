
const timeline = gsap.timeline({defaults:{
    duration: .5,
    ease: 'power2.inOut'
}})

timeline.from('.header', {
    y: '-100%',
}).from('.link', {
    scale: 0.5,
    opacity: 0.5,
    rotate: 360,
    stagger: .1
}).from('.right',{
    x: '-100vw'
}, 0.5).from('.left',{
    x: '-100%',
}, '<0.2').to('.footer',{
    y: '0',
}).fromTo('.button',{
    opacity: 0, 
    scale: 0,
    rotation: 720
}, {
    opacity: 1,
    scale: 1,
    rotation: 0
})

const button = document.querySelector('.button')
button.addEventListener('click', ()=>{
    timeline.timeScale(0.5)
    timeline.reverse()
})