var heroSection = document.querySelector('.section-layout-hero1')
var nextSectionChilds = heroSection.nextElementSibling.childNodes;
animatedTimeLine = gsap.timeline({defaults:{
    ease: 'power1.out',
    duration: 0.5
}})
var startJson = {
    opacity: 0,
    y: 100
}
var endJson = {
    opacity: 1,
    y: 0
}
animatedTimeLine
.fromTo(heroSection.querySelector('.hero-layout-bg-image + .padding-global'), startJson, endJson)
.fromTo(heroSection.querySelector('.hero-layout-bg-image'), startJson, endJson, '<0.25')
.fromTo(nextSectionChilds, startJson, endJson, '<0.25')