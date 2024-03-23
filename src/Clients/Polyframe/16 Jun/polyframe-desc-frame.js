var projBlocks = document.querySelectorAll('.t-project-block')

var animateEl = (el, givenJson, duration) => {
    var useThis = {
        targets: el,
        duration: duration,
        easing: 'easeOutSine'
    }
    for(key in givenJson) {
        useThis[key] = givenJson[key]
    }
    anime(useThis)
}


var checkIfElInSpace = (el, percentVal) => {
    var windowHeight = window.innerHeight
    var spaceToCover = Math.round(windowHeight * percentVal/100)
    var spaceFromEachSides = (windowHeight - spaceToCover)/2;
    var elTop = el.getBoundingClientRect().top
    // var elBottom = el.getBoundingClientRect().bottom
    if (elTop + el.offsetHeight > spaceFromEachSides && elTop < windowHeight - spaceFromEachSides) {
        return true;
    }
    return false
}

projBlocks.forEach(projBlock => {
    var projHoverTl = gsap.timeline({defaults:{
        duration: .5,
        ease: 'power2.inOut'
    }})
    var projHoverTriggers = [projBlock.querySelector('.t-project-heading'), projBlock.querySelector('a')]
    var descBox = projBlock.querySelector('.description-box')
    var descText = descBox.querySelector('.desc-text-cover')
    var descCover = descBox.querySelector('.description-cover')
    descText.style.opacity = '0'
    descCover.style.opacity = '0'
    descCover.style.width = '2.25em'
    descCover.style.height = '2.25em'
    var openDesc = () => {
        projHoverTl.to(descCover, {height: '100%', opacity: 1})
        .to(descCover, {width: '100%'})
        .to(descText, {opacity: 1})
        projHoverTl.play()
    }
    var closeDesc = () => {
        projHoverTl.reverse();
    }
    projHoverTriggers.forEach(projTriggerBlock=> {
        if(window.innerWidth>991) {
            projTriggerBlock.addEventListener('mouseover', openDesc)
            projTriggerBlock.addEventListener('mouseout', closeDesc)
        }
    })
    projBlock.querySelector('.d-open').addEventListener('click', openDesc)
    projBlock.querySelector('.d-close').addEventListener('click', closeDesc)
})

if(window.innerWidth<991) {
    window.addEventListener('scroll', ()=>{
        projBlocks.forEach(projBlock=> {
            if(projBlock.hasAttribute('el-entered')) {
                return;
            }
            if(checkIfElInSpace(projBlock.querySelector('.description-box'), 80)) {
                projBlock.querySelector('.d-open').click()
                projBlock.setAttribute('el-entered', 'true')
            }
        })
    })
}