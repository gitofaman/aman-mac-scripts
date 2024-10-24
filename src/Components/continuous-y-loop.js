// version 1
// alert('working')
var loopDivs = document.querySelectorAll('.loop-y-div')
function isHidden(el) {
    return (el.offsetParent === null)
}
//making sure loop div covers whole width of window

loopDivs.forEach(loopParentDiv=>{
    if(!isHidden(loopParentDiv)) {
        var loopDiv = loopParentDiv.firstChild
        var loopDivHeight = loopDiv.offsetHeight
        var loopDivCopyTimes = Math.round(loopParentDiv.offsetHeight * 2/loopDivHeight)
        for(i=0;i<=loopDivCopyTimes;i++) {
            var copiedDiv = loopDiv.cloneNode(true)
            loopParentDiv.appendChild(copiedDiv)
        }
    }
})

loopDivs.forEach(loopParentDiv=>{
    if(!isHidden(loopParentDiv)) {
        var moveDistance = 0;
        var isPaused = false;
        var timeToMove1000px = parseInt(loopParentDiv.getAttribute('move-1000-time')) || 10000
        var timeToMove = Math.round(timeToMove1000px/1000)
        var moveFrom = 'right'
        var moveSum = '+'
        if(!!loopParentDiv.getAttribute('move-from')) {
            moveFrom = loopParentDiv.getAttribute('move-from');
        }
        if(moveFrom==='left') {
            loopParentDiv.style.justifyContent = 'flex-end'
            moveSum = ''
        } else {
            loopParentDiv.style.justifyContent = 'flex-start'
            moveSum = '-'
        }
        // console.log(moveFrom)
        //justify content right and left
        setInterval(()=>{
            if(!isPaused) {
                // console.log('moving')
                console.log(moveDistance)
                loopParentDiv.style.transform = `translateY(${moveSum}${moveDistance}px)`
                var distanceBetween = loopParentDiv.childNodes[1].getBoundingClientRect().y - loopParentDiv.childNodes[0].getBoundingClientRect().y
                moveDistance++;
                if(moveDistance>=distanceBetween) {
                    moveDistance = 0;
                }
            }
        }, timeToMove)
        loopParentDiv.addEventListener('mouseover', ()=>{
            isPaused = true;
        })
        loopParentDiv.addEventListener('mouseout', ()=>{
            isPaused = false;
        })
    }
})