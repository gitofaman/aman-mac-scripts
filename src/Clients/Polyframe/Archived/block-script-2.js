var blockSide = document.querySelector('.block-main-side')
var blockMain = document.querySelectorAll('.block-main')[1]
var blockInsides = Array.from(blockMain.querySelectorAll('.block-inside-1'))
var blockOnSides = Array.from(blockSide.querySelectorAll('.block-inside-1'))

var animationValues = {
    duration: 200,
    easing: `easeInQuad`,
    easingTwo: `easeInQuad`,
    intervalTime: 100,
    focusTimeout: 1500
}

var classes = {
    'inactive': `in-active`,
    'unhover': `unhovered`
}

//helpers -start
var alternateMoveX = (arr, xValues) => {
    arr.forEach(el => {
        var indexOfEl = arr.indexOf(el)
        setTimeout(() => {
            anime({
                targets: el,
                translateX: xValues[indexOfEl],
                duration: animationValues.duration,
                easing: animationValues.easing
            })
        }, animationValues.intervalTime * indexOfEl)
    })
}

var moveOutSideWithoutOverlap = (chosenBlock, arr) => {
    var comparingCentrePos = chosenBlock.getBoundingClientRect().x + chosenBlock.offsetWidth / 2
    var arrValues = []
    arr.forEach(el => {
        var thisCentrePos = el.getBoundingClientRect().x + el.offsetWidth / 2
        if (thisCentrePos < comparingCentrePos) {
            arrValues.push(`-100vw`)
        } else {
            arrValues.push(`100vw`)
        }
    })
    alternateMoveX(arr, arrValues)
}

var chosenAndRemaining = (givenBlockIndex) => {
    var chosenBlock = blockInsides[givenBlockIndex]
    var remainingBlocks = []
    blockInsides.forEach(blockInside => {
        if (blockInside !== chosenBlock) {
            remainingBlocks.push(blockInside)
        }
        return;
    })
    return [chosenBlock, remainingBlocks]
}

var scaleBlock = (el, scaleVal, givenDuration) => {
    anime({
        targets: el,
        scale: scaleVal,
        duration: givenDuration,
        easing: animationValues.easingTwo
    })
    anime({
        targets: el,
        opacity: scaleVal,
        duration: givenDuration/3,
        easing: animationValues.easingTwo
    })
}

var fadeBlock = (el, opacityValue, givenDuration) => {
    anime({
        targets: el,
        opacity: opacityValue,
        duration: givenDuration,
        easing: animationValues.easingTwo
    })
}

//helpers -end

var sideBlockAppears = () => {
    blockMain.classList.add(classes['inactive'])
    blockSide.classList.remove(classes['inactive'])
}

var sideBlockDissappears = () => {
    blockMain.classList.remove(classes['inactive'])
    blockSide.classList.add(classes['inactive'])
}



var activateBlock = (givenBlockIndex) => {
    var [chosenBlock, remainingBlocks] = chosenAndRemaining(givenBlockIndex)
    scaleBlock(chosenBlock, 0, animationValues.duration)
    setTimeout(() => {
        moveOutSideWithoutOverlap(chosenBlock, remainingBlocks)
        setTimeout(() => {
            chosenBlock.classList.add('active-block')
            scaleBlock(chosenBlock, 1, animationValues.duration * 2)
            setTimeout(sideBlockAppears, 1200)
        }, animationValues.intervalTime * blockInsides.length + 1000)
    }, animationValues.duration)
    blockOnSides.forEach(blockOnSide=>{
        blockOnSide.style.display = ''
    })
    blockOnSides[givenBlockIndex].style.display = 'none'
}

var focusBlock = (givenBlockIndex) => {
    var [chosenBlock, remainingBlocks] = chosenAndRemaining(givenBlockIndex)
    remainingBlocks.forEach(block => {
        fadeBlock(block, 0.75, 500)
    })
}

var unfocusBlocks = () => {
    blockInsides.forEach(blockInside => {
        fadeBlock(blockInside, 1, 200)
    })
}

var resetBlocks = () => {
    var zeroArray = []
    for (i = 0; i < blockInsides.length; i++) {
        zeroArray.push(0)
    }
    alternateMoveX(blockInsides, zeroArray)
    blockInsides.forEach(blockInside => {
        blockInside.classList.remove('active-block')
    })
    sideBlockDissappears()
}

blockInsides.forEach(blockInside => {
    var blockIndex = blockInsides.indexOf(blockInside)
    var blockFocusTimeout;
    blockInside.addEventListener('click', () => {
        //main block 80%
        //left block appears
        //every other block except the clicked on will go to right i.e, outside of view.
        activateBlock(blockIndex)
    })
    blockInside.addEventListener('mouseover', () => {
        //every other block except the one that is hovered will have half opacity down
        blockFocusTimeout = setTimeout(() => {
            focusBlock(blockIndex)
        }, animationValues.focusTimeout)
    })
    blockInside.addEventListener('mouseout', () => {
        clearTimeout(blockFocusTimeout)
        unfocusBlocks()
    })
})

blockOnSides.forEach(blockOnSide=>{
    var currentBlockIndex = blockOnSides.indexOf(blockOnSide)
    blockOnSide.addEventListener('click', ()=>{
        resetBlocks()
        setTimeout(()=>{
            blockInsides[currentBlockIndex].click()
        }, 2000)
    })
})

document.querySelector('.close-button').addEventListener('click', resetBlocks)