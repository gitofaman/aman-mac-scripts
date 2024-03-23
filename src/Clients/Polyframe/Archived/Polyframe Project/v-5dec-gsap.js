var aBlocks, closeBtn;
closeBtn = document.querySelector('.v2-close')
aBlocks = Array.from(document.querySelectorAll('.v3-block'))
var constants = {
    'easing' :  `easeInOutExpo`,
    'animationTime' : 1.25
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

var appearCloseBtn = () => {
    animateEl(closeBtn, {'height': '100%', marginLeft: '1em'}, 500)
}
var disappearCloseBtn = () => {
    animateEl(closeBtn, {'height': '0%', marginLeft: '0em'}, 500)
}
var reverseTimeline = () => {
    aBlocks.forEach(aBlock=>{
        // if(aBlocks.indexOf(aBlock) !== blockIndex) {
            var aArrow = aBlock.querySelector('.corner-arrow')
            animateEl(aArrow, {opacity: 1}, aTime*1000/4)
        // }
    })
    animatedTimeLine.reverse()
    disappearCloseBtn()
    activeBlockIndex = -1
}

var triggerBlockAnimation = (blockIndex) => {
    var cornerArrow = aBlocks[blockIndex].querySelector('.corner-arrow')
    animateEl(cornerArrow, {opacity: 0}, aTime*1000/4)
    animatedTimeLine = gsap.timeline({defaults:{
        ease: 'power4.inOut'
    }})
    if(blockIndex===0) {
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
    appearCloseBtn()
    animatedTimeLine.totalDuration(aTime)
    activeBlockIndex = blockIndex;
}

aBlocks.forEach(animateBlock=>{
    var currentBlockIndex = aBlocks.indexOf(animateBlock)
    clearTimeout(transformingTimeout)
    animateBlock.querySelector('.v3-card').addEventListener('click', ()=> {
        if(!transforming) {
            if(currentBlockIndex===activeBlockIndex) {
                return;
            } else {
                if(activeBlockIndex===-1) {
                    triggerBlockAnimation(currentBlockIndex)
                    transforming = true;
                } else {
                    var timeScaleOnReverse = 2
                    transforming = true;
                    animatedTimeLine.totalDuration(aTime/timeScaleOnReverse)
                    reverseTimeline()
                    setTimeout(()=>{
                        triggerBlockAnimation(currentBlockIndex)
                    }, aTime * 1000)
                }
            }
            transformingTimeout = setTimeout(()=>{
                transforming = false;
            }, aTime * 1500)
        }
    })
})

closeBtn.addEventListener('click', reverseTimeline)

disappearCloseBtn()