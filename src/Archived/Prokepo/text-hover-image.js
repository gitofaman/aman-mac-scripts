var actionTexts = Array.from(document.querySelectorAll('[image-to-show]'))
var actionImages = Array.from(document.querySelectorAll('[image-number]'))
var actionCounter;

var activateActionPair = (x) => {
    actionCounter = x;
    var currentActionText = actionTexts[x]
    actionTexts.forEach(actionText=>{
        actionText.classList.remove('green')
    })
    if(currentActionText.hasAttribute('pair-block')) {
        actionTexts.forEach(actionText=>{
            var isRequestedText = actionText.getAttribute('pair-block') === currentActionText.getAttribute('pair-block')
            if(!!isRequestedText) {
                actionText.classList.add('green')
            }
        })
    }
    currentActionText.classList.add('green')
    actionImages.forEach(actionImage=>{
        var isRequestedImage = actionImage.getAttribute('image-number') === currentActionText.getAttribute('image-to-show')
        if(!!isRequestedImage) {
            actionImage.style.opacity = 1;
        } else {
            actionImage.style.opacity = 0;
        }
    })
}

activateActionPair(0)
actionTexts.forEach(actionText=>{
    actionText.addEventListener('mouseover',()=>{
        var currentActionIndex = actionTexts.findIndex(text=>{return actionText === text})
        activateActionPair(currentActionIndex);
    })
})

setInterval(()=>{
    if(window.innerWidth < 991) {
        if(actionCounter<actionTexts.length-1) {
            actionCounter++;
        } else {
            actionCounter = 0;
        }
        activateActionPair(actionCounter)
    }
}, 2000)