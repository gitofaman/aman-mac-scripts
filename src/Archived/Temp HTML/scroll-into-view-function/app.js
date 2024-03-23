var targetBlocks = document.querySelectorAll('.full-size')
window.addEventListener('scroll',()=>{
    targetBlocks.forEach(t=>{
        var topPos = t.getBoundingClientRect().top
        var tHeight = t.offsetHeight;
        if(tHeight<100) {
            tHeight = 100;
        }
        var offsetPos = 0.5;
        var offsetAttribute = t.getAttribute('offset-pos')
        if(!!offsetAttribute) {
            offsetPos = parseFloat(offsetAttribute)
        }
        var isTargetPosReached = false;
        var topMaxPos = window.innerHeight - Math.round(offsetPos * t.offsetHeight)
        var topMinPos = - Math.round(offsetPos*t.offsetHeight)
        var isTargetPosReached = (topPos < topMaxPos) && (topPos > topMinPos)
        t.querySelector('.data').innerHTML = `<div>topPos: ${t.getBoundingClientRect().top}
        <br/>
        height: ${t.offsetHeight}
        <br/>
        isTargetPosReached: ${isTargetPosReached}
        <br/>
        topMinPos: ${topMinPos}
        <br/>
        topMaxPos: ${topMaxPos}
        </div>`
        t.querySelector('.marker').style.top = `${offsetPos * 100}%`
    })
})