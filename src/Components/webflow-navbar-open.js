$(document).ready(function(){
    const navOverlay = document.querySelector('.w-nav-overlay')

    const isNavOpenObserver = new MutationObserver(mutations=>{
        if($('.w-nav-overlay').children().length) {
            console.log('navbar opened')
        } else {
            console.log('navbar closed')
        }
    })
    
    isNavOpenObserver.observe(navOverlay, { characterData: false, attributes: false, childList: true, subtree: false })
})