var aBlocks, closeBtn, topNav, bottomNav;
topNav = document.querySelector('.v2-nav-content-top')
bottomNav = document.querySelector('.v2-nav-bottom')
closeBtn = document.querySelector('.v2-close')
aBlocks = Array.from(document.querySelectorAll('.v3-block'))
var arrowTimeline = null;
var constants = {
    'easing' :  `easeInOutExpo`,
    'animationTime' : 1.25,
    'cardClass' : '.v3-card'
}
var animatedTimeLine;
var transformingTimeout;
var transforming = false;
var aTime = constants.animationTime
var activeBlockIndex = -1;
var animationTime;

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
var reverseTimeline = () => {
    aBlocks.forEach(aBlock=>{
        var currIndex = aBlocks.indexOf(aBlock)
        revertToDefault(currIndex)
    })

    animatedTimeLine.reverse()
    disappearCloseBtn()
    activeBlockIndex = -1
}

var animationStopped = () => {
    
}

var disableAnimationRequestsFor = (time) => {
    clearTimeout(transformingTimeout)
    transforming = true;
    transformingTimeout = setTimeout(()=>{
        transforming = false;
        animationStopped()
    }, time)
}

var revertToDefault = (blockIndex) =>{
    var givenBlock = aBlocks[blockIndex]
    givenBlock.querySelector(constants.cardClass).style.cursor = 'default'
    var cornerArrow = givenBlock.querySelector('.corner-arrow')
    animateEl(cornerArrow, {opacity: 1}, aTime*1000/4)
    givenBlock.querySelector(constants.cardClass).style.cursor = 'pointer'
}

var changesOnActiveBlock = (blockIndex) => {
    var fBlock = aBlocks[blockIndex]
    fBlock.querySelector(constants.cardClass).style.cursor = 'default'
    var cornerArrow = fBlock.querySelector('.corner-arrow')
    animateEl(cornerArrow, {opacity: 0}, aTime*1000/4)
    aBlocks.forEach(aBlock=>{
        var currIndex = aBlocks.indexOf(aBlock)
        if(currIndex!==blockIndex) {
            revertToDefault(currIndex)
        }
    })
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
        changesOnActiveBlock(blockIndex)
        animatedTimeLine.totalDuration(aTime)
        activeBlockIndex = blockIndex;   
    }
}

aBlocks.forEach(animateBlock=>{
    var currentBlockIndex = aBlocks.indexOf(animateBlock)
    clearTimeout(transformingTimeout)
    animateBlock.querySelector(constants.cardClass).addEventListener('click', ()=> {
        if(!transforming) {
            if(currentBlockIndex===activeBlockIndex) {
                return;
            } else {
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
        }
    })
})

closeBtn.addEventListener('click', ()=>{
    if(!transforming) {
        reverseTimeline()
        disableAnimationRequestsFor(aTime*1000)
    }
})

disappearCloseBtn()