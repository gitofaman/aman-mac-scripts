var aBlocks, closeBtn, topNav, bottomNav;
topNav = document.querySelector('.v2-nav-content-top')
bottomNav = document.querySelector('.v2-nav-bottom')
closeBtn = document.querySelector('.v2-close')
aBlocks = Array.from(document.querySelectorAll('.v3-block'))
var arrowTimeline = null;
var constants = {
    'easing' :  `easeInOutExpo`,
    'animationTime' : 1.25,
    'cardClass' : '.v3-card',
    'vClasses': ['v-25', 'v-50', 'v-75'],
    'stateAttr' : 'el-state'
}

var animatedTimeLine;
var transformingTimeout;
var transforming = false;
var aTime = constants.animationTime
var activeBlockIndex = -1;
var animationTime;

var assignBlockActive = (blockIndex) => {
    var givenBlock = aBlocks[blockIndex]
    givenBlock.setAttribute(constants.stateAttr, 'active')
    givenBlock.querySelector(constants.cardClass).style.cursor = 'default'
    var cornerArrow = givenBlock.querySelector('.corner-arrow')
    animateEl(cornerArrow, {opacity: 0}, aTime*1000/4)
}

var assignBlockInactive = (blockIndex)=> {
    var givenBlock = aBlocks[blockIndex]
    givenBlock.setAttribute(constants.stateAttr, 'inactive')
    givenBlock.querySelector(constants.cardClass).style.cursor = 'pointer'
    var cornerArrow = givenBlock.querySelector('.corner-arrow')
    animateEl(cornerArrow, {opacity: 1}, aTime*1000/4)
}

var assignStates = () => {
    aBlocks.forEach(aBlock=>{
        var currBlockIndex = aBlocks.indexOf(aBlock)
        if(activeBlockIndex === currBlockIndex) {
            assignBlockActive(currBlockIndex)
        } else {
            if(currBlockIndex === 3 && blockPercentWidth(aBlock)=== 50) {
                assignBlockActive(currBlockIndex)
            } else {
                assignBlockInactive(currBlockIndex)
            }
        }
    })
}

var blockPercentWidth = (block) => {
    var blockWidth = Math.round(block.offsetWidth * 100 / block.parentElement.offsetWidth)
    if(blockWidth > 10 && blockWidth < 15) {
        return 12.5;
    }
    if(blockWidth > 20 && blockWidth < 30) { //25
        return 25
    }
    if(blockWidth > 45 && blockWidth < 55) { //50
        return 50
    }
    if(blockWidth > 70 && blockWidth < 80) { //75
        return 75
    }
}

var animateEl = (el, givenJson, duration) => {
    var useThis = {
        targets: el,
        duration: duration,
        easing: constants.easing
    }
    for(key in givenJson) {
        useThis[key] = givenJson[key]
    }
    anime(useThis)
}

var appearCloseBtn = (pos) => {
    arrowTimeline = gsap.timeline({
        defaults: {
            duration: .5,
            ease: 'bounce'
        }
    })
    arrowTimeline.fromTo(topNav, {
        width: '100%'
    }, {
        width: `${pos}%`,
        ease: 'power2.in'
    }).fromTo(bottomNav, {
        width: '100%'
    }, {
        width: `${100-pos}%`, duration: .5,
        ease: 'power2.in'
    }, '<').fromTo('.v2-close', {
        width: '0px',
        y: '-100%'
    }, {
        width: `${topNav.offsetHeight}px`, 
        y: '0%'
    }).fromTo(topNav.querySelector('.v2-nav-content'), {
        borderRightWidth: '0px',
        borderTopRightRadius: '0em',
        borderBottomRightRadius: '0em',
        borderRightStyle: 'none'
    }, {
        borderRightWidth: '1px',
        borderTopRightRadius: '1em',
        borderBottomRightRadius: '1em',
        borderRightStyle: 'solid',
        ease: 'power2.in'
    }, '<').fromTo(bottomNav.querySelector('.v2-nav-content'), {
        borderLeftWidth: '0px',
        borderTopLeftRadius: '0em',
        borderBottomLeftRadius: '0em',
        borderLeftStyle: 'none'
    }, {
        borderLeftWidth: '1px',
        borderTopLeftRadius: '1em',
        borderBottomLeftRadius: '1em',
        borderLeftStyle: 'solid',
        ease: 'power2.in'
    }, '<')
}

var disappearCloseBtn = () => {
    if(arrowTimeline===null) {
        appearCloseBtn(100)
        arrowTimeline.timeScale(0)
    }
    arrowTimeline.reverse()
}

var addContents = () => {
    aBlocks.forEach(aBlock => {
        constants.vClasses.forEach(vClass=>{
            if(aBlock.classList.contains(vClass)) {
                aBlock.classList.remove(vClass)
            }
        })
        aBlock.classList.add(`v-${blockPercentWidth(aBlock)}`)
    })
}

var reverseTimeline = () => {
    // aBlocks.forEach(aBlock=>{
    //     var currIndex = aBlocks.indexOf(aBlock)
    //     revertToDefault(currIndex)
    // })

    animatedTimeLine.reverse()
    disappearCloseBtn()
    activeBlockIndex = -1
}

var animationStarted = () => {
    gsap.fromTo('.v3-card-content', {
        opacity: 1,
        scale: 1
    }, {
        opacity: 0,
        scale: 0.98,
        duration: .5,
        ease: 'power2.out'
    })
    setTimeout(()=>{
        aBlocks.forEach(block=>{
            constants.vClasses.forEach(vClass=>{
                if(block.classList.contains(vClass)) {
                    block.classList.remove(vClass)
                }
            })
        })
    }, 500)
}

var animationStopped = () => {
    aBlocks.forEach(block=>{
        block.classList.add(`v-${blockPercentWidth(block)}`)
    })
    assignStates()

    setTimeout(()=>{
        gsap.fromTo('.v3-card-content', {
            opacity: 0,
            scale: 0.98
        }, {
            opacity: 1,
            scale: 1,
            duration: .5,
            ease: 'power2.out'
        })
    }, 500)
}

var disableAnimationRequestsFor = (time) => {
    clearTimeout(transformingTimeout)
    transforming = true;
    animationStarted()
    transformingTimeout = setTimeout(()=>{
        transforming = false;
        animationStopped()
    }, time)
}



var triggerBlockAnimation = (blockIndex) => {
    animatedTimeLine = gsap.timeline({defaults:{
        ease: 'power4.inOut'
    }})
    if(window.innerWidth>991) {
        var currentBlockEndPos = 100;
        if(blockIndex===0) {
            currentBlockEndPos = 75;
            // animatedTimeLine.totalDuration(aTime)
            animatedTimeLine.to(aBlocks[4], {
                width: '25%'
            }).to(aBlocks[0], {
                width: '75%'
            }, '<').to(aBlocks[3], {
                width: '25%',
                left: '50%',
                duration: 0.5
            }, '<').to([aBlocks[1],aBlocks[2]],{
                top: '66.6%',
                stagger: 0.1,
                duration: 0.2
            }, '<0.25').to(aBlocks[0],{
                height: '66.6%'
            })
        }
        if(blockIndex===1) {
            currentBlockEndPos = 50
            // modifyAnimationTime(3)
            animatedTimeLine.to(aBlocks[3], {
                width: '25%'
            }).to(aBlocks[2], {top: '66.6%'})
            .to(aBlocks[0], {'height': '25%'})
            .to(aBlocks[1], {height: `50%`, top: '25%'}, '<')
            .to(aBlocks[1], {width: '50%'}, '<').to([aBlocks[2], aBlocks[3]],{
                height: '25%'
            }, '<').to(aBlocks[2], {
                top: '75%'
            }, '<')
        }
        if(blockIndex===2) {
            currentBlockEndPos = 75
            animatedTimeLine.to([aBlocks[0], [aBlocks[3]]], {
                width: '25%',
                stagger: 0.2
            }).to(aBlocks[2],{
                height: '100%',
                top: '0%'
            }).to(aBlocks[4],{
                width: '25%'
            }).to(aBlocks[2], {
                width: '50%'
            }, '<')
        }
        if(blockIndex===4) {
            currentBlockEndPos = 100
            animatedTimeLine.to(aBlocks[0], {
                width: '25%',
                duration: 0.5
            }).to([aBlocks[1], aBlocks[2]], {
                width: '12.5%',
                duration: 0.5
            }, '<').to(aBlocks[2], {
                left: '12.5%',
                duration: 0.5
            }, '<').to(aBlocks[3], {
                width: '25%',
                duration: 0.5
            }, '<').to(aBlocks[4], {
                width: '75%',
                duration: 0.5
            }, '<')
        }
        setTimeout(()=>{
            appearCloseBtn(currentBlockEndPos)
        }, aTime*1000)
        animatedTimeLine.totalDuration(aTime)
    }
}

aBlocks.forEach(animateBlock=>{
    var currentBlockIndex = aBlocks.indexOf(animateBlock)
    clearTimeout(transformingTimeout)
    animateBlock.querySelector(constants.cardClass).addEventListener('click', ()=> {
        var blockState = animateBlock.getAttribute(constants.stateAttr)
        if(blockState==='active') {
            return;
        }
        if (currentBlockIndex === 3) {
                reverseTimeline() // aTime
                disappearCloseBtn()
                disableAnimationRequestsFor(aTime * 1000)
                return;
        }
        if(!transforming) {
            if(activeBlockIndex===-1) {
                triggerBlockAnimation(currentBlockIndex)
                disableAnimationRequestsFor(aTime*1000)
            } else {
                var timeScaleOnReverse = 2
                transforming = true;
                animatedTimeLine.totalDuration(aTime/timeScaleOnReverse)
                reverseTimeline()
                setTimeout(()=>{
                    triggerBlockAnimation(currentBlockIndex)
                }, aTime * 1000)
                disableAnimationRequestsFor(aTime*1500)
            }
        }
        activeBlockIndex =currentBlockIndex
    })
    assignStates()
})

closeBtn.addEventListener('click', ()=>{
    if(!transforming) {
        reverseTimeline()
        disableAnimationRequestsFor(aTime*1000)
    }
})

disappearCloseBtn()
addContents()