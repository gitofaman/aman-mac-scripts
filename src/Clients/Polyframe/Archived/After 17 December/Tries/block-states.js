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