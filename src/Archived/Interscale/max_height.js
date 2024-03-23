var stickyFoldBlocks = document.querySelectorAll('.layout356_content-item')
if(stickyFoldBlocks.length) {
    var pastWindowHeight = window.innerHeight;

    var updateFoldingPosition = () => {
        console.log('function ran')
        
        stickyFoldBlocks.forEach(stickyFoldBlock => {
            var isFoldingOverflowing = stickyFoldBlock.offsetHeight > pastWindowHeight
            if(isFoldingOverflowing) {
                stickyFoldBlock.style.position = "relative"
                stickyFoldBlock.style.top = "0"
                console.log('now relative')
            } else {
                stickyFoldBlock.style.position = ""
                stickyFoldBlock.style.top = ""
                console.log('now sticky')
            }
        })
    } 
    
    window.addEventListener('scroll',()=>{
        //will check if content overflows 100 vh, if yes then applies css
            if(window.innerHeight !== pastWindowHeight && window.innerWidth > 990) {
                pastWindowHeight = window.innerHeight;
                updateFoldingPosition()
            }
    })
    
    updateFoldingPosition()
}
