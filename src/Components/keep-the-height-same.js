var heightEqualBlocks = document.querySelectorAll('.section-custom-module-parent')
var maxHeight = 0

heightEqualBlocks.forEach(heightEqualBlock => {
    var thisElHeight = heightEqualBlock.offsetHeight
    if(thisElHeight>maxHeight) {
        maxHeight = thisElHeight
    }
})

heightEqualBlocks.forEach(heightEqualBlock=>{
    heightEqualBlock.style.height = maxHeight + 'px'
})

var observer = new MutationObserver()