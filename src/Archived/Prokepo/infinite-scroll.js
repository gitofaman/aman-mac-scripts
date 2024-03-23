var infiniteScrollElements = document.querySelectorAll('[infinite-scroll]')
infiniteScrollElements.forEach(currentIel=>{
    var childs = Array.from(currentIel.childNodes);
    var isPaused = false;
    var slideDuration = 3;
    currenSlideDuration = slideDuration
    var isSlidingPositionLeft = currentIel.getAttribute('sliding-pos-left')
    childs.forEach(child=>{
        var clonedChild = child.cloneNode(true);
        currentIel.appendChild(clonedChild)
    })
    childs = Array.from(currentIel.childNodes)
    currentIel.addEventListener('mouseover',()=>{
        isPaused = true;
    })
    currentIel.addEventListener('mouseout',()=>{
        isPaused = false;
    })
    if(isSlidingPositionLeft === 'true') {
        var referenceValue = -childs[childs.length/2].getBoundingClientRect().x;
    } else {
        var referenceValue = childs[0].getBoundingClientRect().x;
    }
    var movedBy = referenceValue;
    var autoInterval = setInterval(()=>{
        if(!isPaused) {
            if(isSlidingPositionLeft === 'true') {
                var movedTotally = childs[0].getBoundingClientRect().x >= 0
                if(!movedTotally) {
                    currentIel.style.transform = `translateX(${movedBy}px)`
                } else {
                    currentIel.style.transform = `translateX(${referenceValue}px)`
                    movedBy = referenceValue;
                }
                movedBy++;
            } else {
                var movedTotally = childs[childs.length/2].getBoundingClientRect().x <= 0
                if(!movedTotally) {
                    currentIel.style.transform = `translateX(${-movedBy}px)`
                } else {
                    currentIel.style.transform = `translateX(${referenceValue}px)`
                    movedBy = referenceValue
                }
                movedBy++;
            }
        }
    }, currenSlideDuration)
})



