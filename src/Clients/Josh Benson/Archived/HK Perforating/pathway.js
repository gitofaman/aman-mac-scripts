var journeySteps = Array.from(document.querySelectorAll('.journey-blocks'))
var journeyLineProgress = document.querySelector('.journey-line-progres')
var journeyLineWrap = document.querySelector('.journey-line')
var journeyLineHeights = []
var translationTime = 200;

var refreshJourneyLineHeights = () => {
    journeyLineHeights = []
    journeySteps.forEach(journeyStep=>{
        var journeyDot = journeyStep.querySelector('.journey-dot')
        var journeyDotPos = journeyLineWrap.getBoundingClientRect().y - journeyDot.getBoundingClientRect().y
        journeyLineHeights.push(Math.abs(journeyDotPos))
    })
}
refreshJourneyLineHeights()

var heightModifyJourneyLine = (providedHeight) => {
    providedHeight = Math.abs(providedHeight)
    anime({
        targets: journeyLineProgress,
        height: providedHeight,
        duration: translationTime,
        easing: `easeOutQuad`
    })
}

var makeStepAppear = (indexOfjourney) => {
    var journeyStep = journeySteps[indexOfjourney]
    if(!journeyStep.hasAttribute('appeared')) {
        journeyStep.querySelector('.interaction-click').click()
        journeyStep.setAttribute('appeared', '')
    } 
}

var makeStepDisappear = (indexOfjourney) => {
    var journeyStep = journeySteps[indexOfjourney]
    if(journeyStep.hasAttribute('appeared')) {
        journeyStep.querySelector('.interaction-click').click()
        journeyStep.removeAttribute('appeared')
    }
}

var updateLineBehaviours = (pixelsMoved) => {
    if(pixelsMoved>0) {
        var heightToUse = pixelsMoved + window.innerHeight - window.innerHeight/3
        var possibleTotalHeight = journeyLineWrap.offsetHeight
        if(pixelsMoved + window.innerHeight > possibleTotalHeight - 50) {
            heightToUse = possibleTotalHeight

        }
        heightModifyJourneyLine(heightToUse)
        journeyLineHeights.forEach(lh=>{
            var currentLhIndex = journeyLineHeights.indexOf(lh)
            if(heightToUse >= lh) {
                makeStepAppear(currentLhIndex)
            } else {
                makeStepDisappear(currentLhIndex)
            }
        })
    }
}
updateLineBehaviours(40)

window.addEventListener('scroll', ()=>{
    var journeyLineY = journeyLineWrap.getBoundingClientRect().y
    var positiveJourneyLineY = Math.abs(journeyLineY)
    if(journeyLineY<0) {
        updateLineBehaviours(positiveJourneyLineY)
    }
})