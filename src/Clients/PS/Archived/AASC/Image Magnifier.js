var imgMagnifierBlocks = document.querySelectorAll('.img-magnifier-parent')
imgMagnifierBlocks.forEach(imgMagnifierBlock => {
    var mainImg = imgMagnifierBlock.querySelector('[main-img]')
    var mgGlass = imgMagnifierBlock.querySelector('[mg-glass]')
    imgMagnifierBlock.style.cursor = 'none'
    imgMagnifierBlock.addEventListener('mousemove', e => {
        console.log('e')
    })
})