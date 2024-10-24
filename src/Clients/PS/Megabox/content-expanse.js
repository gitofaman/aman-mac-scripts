var contentBlocks = Array.from(document.querySelectorAll('[services-block]'))
gsap.registerPlugin(ScrollTrigger);
var servicesParent = document.querySelector('[services-parent]')
servicesParent.style.height = servicesParent.offsetHeight + 'px';
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: '[services-parent]',
        start: "top center",
        end: "bottom bottom",
        scrub: 2,
        duration: 1
    }
})


contentBlocks.forEach(bl=>{
    var currContent = bl.querySelector('.mob-storage-text')
    var finalHeight = currContent.offsetHeight;

    if(!!currContent){
        otherContents = []
        contentBlocks.forEach(content=>{
            if(content !== bl) {
                otherContents.push(content.querySelector('.mob-storage-text'))
            }
        })
        tl.fromTo(currContent, {height: 0}, {height: finalHeight})
        // .to(otherContents, {height: 0})

    }
})