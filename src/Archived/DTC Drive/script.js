var observer = new MutationObserver(mutations=>{
    shareBtnsHoverAnimation()
})

var observingListItems = []

function shareBtnsHoverAnimation () {
    var shareBtns = document.querySelectorAll('.share-button')
    var animationTime = 500;
    var disapperTimeout;
    var appearElement = (duration, el) => {
        el.style.display = ''
        clearTimeout(disapperTimeout)
        anime({
            targets: el,
            duration: duration,
            opacity: 1,
            easing: 'easeOutSine'
        })
    }
    
    var disappearElement = (duration, el) => {
        clearTimeout(disapperTimeout)
        anime({
            targets: el,
            duration: duration,
            opacity: 0,
        })
        disapperTimeout = setTimeout(()=>{
            el.style.display = 'none'
        }, duration)
    }
    
    shareBtns.forEach(shareBtn=>{
        var shareItems = shareBtn.querySelector('.share-popup')
        if(!shareItems && shareBtn.hasAttribute('interaction-added')) {
            return;
        }
        shareBtn.setAttribute('interaction-added', 'true')
        disappearElement(0, shareItems)
        shareBtn.addEventListener('mouseover', ()=>{
            appearElement(animationTime, shareItems)
        })
        shareBtn.addEventListener('mouseout', ()=>{
            disappearElement(animationTime, shareItems)
        })
        //to make sure if new share buttons are added, they have animations
        var newParentToObserve = shareBtn.closest('.w-dyn-item').parentElement
        if(!observingListItems.includes(newParentToObserve)) {
            console.log('adding observer function')
            observingListItems.push(newParentToObserve)
            observer.observe(newParentToObserve, { characterData: false, attributes: false, childList: true, subtree: false })
        }
    })
}

shareBtnsHoverAnimation()