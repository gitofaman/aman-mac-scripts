gsap.registerPlugin(ScrollTrigger);
var mapDots = document.querySelectorAll('.map-topplings .map-dot')
var sectionMap = document.querySelector('.section-map')
var movableMap = document.querySelector('.map-map-img')
sectionMap.style.height = `${200+ mapDots.length*30}vh`

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: '.section-map',
        markers: true,
        start: "top center",
        end: "bottom bottom",
        scrub: 2,
        duration: 1
    }
})



if(window.innerWidth>767) {
    tl.fromTo('.map-img-1', {x: '-100%', opacity: 0}, {x: '0%', opacity: 1})
    .fromTo('.map-img-2', {x: '100%', opacity: 0}, {x: '0%', opacity: 1}, 0)
    
    mapDots.forEach(mapDot=>{
        var mapContent = mapDot.querySelector('.map-ts')
        mapContent.style.display = 'flex'
        tl.fromTo(mapDot, {opacity: 0}, {opacity: 1}).fromTo(mapContent, {opacity: 0}, {opacity: 1}).to(mapContent, {opacity: 1, duration: 1.5}).to(mapContent, {opacity: 0})
    })
} else {
    mapDots.forEach(mapDot=>{
        var mapContent = mapDot.querySelector('.map-ts')
        mapContent.style.display = 'flex'
        var mapPosToUse = mapDot.getBoundingClientRect().x
        var mapCenterPos = window.innerWidth/2
        var reqXPos = mapCenterPos - mapPosToUse
        tl.to(movableMap, {x: reqXPos})
        .fromTo(mapDot, {opacity: 0}, {opacity: 1})
        .fromTo(mapContent, {opacity: 0}, {opacity: 1})
        .to(mapContent, {opacity: 1, duration: 1.5})
        .to(mapContent, {opacity: 0})
    })
}