var blockInsides = Array.from(document.querySelectorAll('.block-inside-1'))

var rearrangeBlocks = (indexOfBlock) => {
    blockInsides.forEach(blockInside=>{
        blockInside.classList.remove('active-block')
    })
    blockInsides[indexOfBlock].classList.add('active-block')
}

blockInsides.forEach(blockInside=>{
    var thisBlockIndex = blockInsides.indexOf(blockInside)
    blockInside.addEventListener('click', ()=>{
        rearrangeBlocks(thisBlockIndex)
    })
})