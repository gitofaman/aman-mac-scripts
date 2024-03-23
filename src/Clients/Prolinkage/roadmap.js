var refBlock = document.querySelector('.roadmap-scroller')
var roadBlocks = Array.from(document.querySelectorAll('.roadmap-block'))

function contentScolledPercentage (div) {
    //the function is favourable for the divs which will be greater than the viewport height
    var topPos = div.getBoundingClientRect().y
    var maxScrollPos = - (div.offsetHeight - window.innerHeight)
    if(topPos > 0) {
        return 0;
    } else if (topPos < 0 && topPos>maxScrollPos) {
        var contentPercentage = Math.abs(topPos/maxScrollPos) * 100;
        console.log(Math.round(contentPercentage))
        return Math.round(contentPercentage);
    } else {
        return 100;
    }

}

var activateRoadblock = (rIndex) => {
    var activateBtn;
    var currRBlock = roadBlocks[rIndex]
    if(currRBlock.getAttribute('block-active') !== 'true') {
        currRBlock.setAttribute('block-active', 'true')
    } else {
        return;
    }
    activateBtn = currRBlock.querySelector('.roadmap-activate')
    activateBtn.click()
}

var deactivateRoadblock = (rIndex) => {
    var deactivateBtn;
    var currRBlock = roadBlocks[rIndex]
    if(currRBlock.getAttribute('block-active') !== 'false') {
        currRBlock.setAttribute('block-active', 'false')
    } else {
        return;
    }
    deactivateBtn = currRBlock.querySelector('.roadmap-deactivate')
    deactivateBtn.click()
}

var manageRoadmapProgress =  (currPercentage) => {
    var percentBase = 100/roadBlocks.length
    roadBlocks.forEach(block=>{
       var minPercentForBlock, maxPercentForBlock, roadmapProgress;
        var currBlockIndex = roadBlocks.indexOf(block)
        roadmapProgress = block.querySelector('.roadmap-progress')
        maxPercentForBlock = percentBase*(currBlockIndex + 1)
        minPercentForBlock = percentBase*(currBlockIndex)
        if(currPercentage >= maxPercentForBlock) {
            deactivateRoadblock(currBlockIndex)
            roadmapProgress.style.width = '100%'
            return;
        }
        if(currPercentage <= minPercentForBlock) {
            deactivateRoadblock(currBlockIndex)
            roadmapProgress.style.width = '0%'
            return;
        }
        var roadmapPercent = (currPercentage-minPercentForBlock)*100/percentBase
        // if(roadmapPercent > 90) {
        //     roadmapPercent = 100;
        // }
        // if(roadmapPercent < 10) {
        //     roadmapPercent = 0;
        // }
        activateRoadblock(currBlockIndex)
        roadmapProgress.style.width = `${roadmapPercent}%`
    })
}
  
window.addEventListener('scroll', ()=>{
    var roadmapScrolled = contentScolledPercentage(refBlock)
    manageRoadmapProgress(roadmapScrolled)
})

roadBlocks.forEach(rBlock => {
    var i = roadBlocks.indexOf(rBlock)
    deactivateRoadblock(i)
})