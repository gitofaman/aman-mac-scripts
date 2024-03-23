var aBlocks, closeBtn;
closeBtn = document.querySelector('.v2-close')
aBlocks = Array.from(document.querySelectorAll('.v3-block'))
var constants = {
    'easing' :  `easeInOutExpo`,
    'animationTime' : 1500
}
var transforming = false;
var aTime = constants.animationTime
var activeBlockIndex = -1;

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

// starting values assignment start
var startValues = (time, timeOutValues) => {
    setTimeout(()=>{
        animateEl(aBlocks[0],{width: '50%', height: '33.3%', top: '0%', left: '0%'},time)
    }, timeOutValues[0])
    setTimeout(()=>{
    animateEl(aBlocks[1],{width: '25%', height: '33.3%', left: '0%', top: '33.3%'},time)
    }, timeOutValues[1])
    setTimeout(()=>{
    animateEl(aBlocks[2],{width: '25%', height: '33.3%', left: '25%', top: '33.3%'},time)
    }, timeOutValues[2])
    setTimeout(()=>{
    animateEl(aBlocks[3],{width: '50%', height: '33.3%', bottom: '0%', left: '0%'},time)
    }, timeOutValues[3])
    setTimeout(()=>{
    animateEl(aBlocks[4],{width: '50%', height: '100%', right: '0%', },time)
    }, timeOutValues[4])
}
// assignment end

// reset animation functions start
var blockResetAnimations = (blockIndex) => {
    if(blockIndex===2) {
        startValues(aTime/2, [aTime/2, aTime/2, 0, aTime/2, 0])
    }
    if(blockIndex === 4) {
        startValues(aTime/2, [aTime/2, aTime/2, aTime/2, aTime/2, 0])
    }
    if(blockIndex === 0) {
        startValues(aTime/4, [0, aTime/4, aTime/4, aTime/2, aTime/4 + aTime/2])
    }
    if(blockIndex === 1) {
        startValues(aTime/4, [0, 0, aTime/4, aTime/2, 0])
    }
    if(activeBlockIndex===blockIndex) {
        activeBlockIndex = -1
    }
    disappearCloseBtn()
}

var makeBlockActive = (blockIndex) => {
    if(blockIndex===2) {
        animateEl([aBlocks[0], aBlocks[3]], {'width': '25%'}, 2*aTime/3)
        setTimeout(()=>{
            animateEl(aBlocks[2], {'height': '100%', 'top': '0%'}, aTime/3)
        }, aTime/3)
        setTimeout(()=> {
            animateEl(aBlocks[2], {'width': '50%'}, aTime/3)
            animateEl(aBlocks[4], {'width': '25%'}, aTime/3)
        }, 2*aTime/3)
    }
    if(blockIndex===4) {
            // block 0 width to 25%
            animateEl(aBlocks[0], {'width': '25%'}, aTime/3)
            // block 1 width to 12.5% and block 2 width to 12.5%
            animateEl([aBlocks[1], aBlocks[2]], {'width': '12.5%'}, aTime/2.5)
            animateEl(aBlocks[2], {'left': '12.5%'}, aTime/2.5)
            // block 2 width to 25%
            animateEl(aBlocks[3], {'width': '25%'}, aTime/2)
            // block 4 width to 75%
            setTimeout(()=>{
                animateEl(aBlocks[4], {'width': '75%'}, aTime/2)
            }, aTime/2)
    }
    if(blockIndex===0) {
        // block 0 width to 75% while block 4 width to 25%
        animateEl(aBlocks[0], {width: '75%'}, aTime/4)
        animateEl(aBlocks[4], {width: '25%'}, aTime/4)
        // block 3 width to 25% while left going to 50%
        setTimeout(()=>{
            animateEl(aBlocks[3], {width: '25%', left: '50%'}, aTime/4)
        }, aTime/4)
        // block 1 and 2 top going to 66.6%
        setTimeout(()=>{
            animateEl([aBlocks[1], aBlocks[2]], {top: '66.6%'}, aTime/4)
        }, aTime/2)
        // block 0 height to 66.6%
        setTimeout(()=>{
            animateEl(aBlocks[0], {height: '66.6%'}, aTime/4)
        }, aTime/2 + aTime/4)
    }
    if(blockIndex===1) {
        //block 3 width to 25%
        animateEl(aBlocks[3], {width: '25%'}, aTime/4)
        //then block 2 top to 66%
        setTimeout(()=>{
            animateEl(aBlocks[2], {top: '66.6%'}, aTime/4)
            animateEl(aBlocks[0], {'height': '25%'}, aTime/4)
            var newWidthVal = 66.6 - 25
            animateEl(aBlocks[1], {height: `${newWidthVal}%`, top: '25%'}, aTime/4)
        }, aTime/4)
        //block 1 width to 50%
        setTimeout(()=>{
            animateEl(aBlocks[1], {width: '50%'}, aTime/1.5)
        }, aTime/2)
        //block 0 height to 25% while block 1 height to 33.3 - 25 + 33.3 while top to 25%
    }
    appearCloseBtn()
    activeBlockIndex = blockIndex
}

var blockAnimations = (blockIndex) => {
    if(!transforming) {
        transforming = true;
        if (activeBlockIndex !== -1) {
            var isSameBlockClicked = blockIndex===activeBlockIndex
            if(isSameBlockClicked) {

            } else {
                blockResetAnimations(activeBlockIndex)
                setTimeout(()=>{
                    makeBlockActive(blockIndex)
                }, aTime)
            }
        } else {
            makeBlockActive(blockIndex)
        }
        setTimeout(()=>{
            transforming = false;
        }, aTime)
    }
}

closeBtn.addEventListener('click', ()=>{
    blockResetAnimations(activeBlockIndex)
})
// reset animation functions end

aBlocks.forEach(animateBlock=>{
    animateBlock.addEventListener('click', ()=> {
        var currentBlockIndex = aBlocks.indexOf(animateBlock)
        blockAnimations(currentBlockIndex)
    })
})

disappearCloseBtn()

startValues(0, [0,0,0,0,0])