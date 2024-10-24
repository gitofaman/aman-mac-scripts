var imgMagnifierBlocks = document.querySelectorAll('.img-magnifier-parent')
imgMagnifierBlocks.forEach(imgMagnifierBlock => {
    var mainImg = imgMagnifierBlock.querySelector('.img-main')
    var mgGlass = imgMagnifierBlock.querySelector('.mg-glass')
    var mgGlassHalfWidth = mgGlass.offsetWidth/2
    var scaleBy = parseFloat(imgMagnifierBlock.getAttribute('scaling'))
    console.log(scaleBy)
    var glassImg = mgGlass.querySelector('.img-inside')
    glassImg.style.width = `${scaleBy * mainImg.offsetWidth}px`
    glassImg.style.height = `${scaleBy * mainImg.offsetHeight}px`
    imgMagnifierBlock.style.cursor = 'none'
    var imgX = imgMagnifierBlock.getBoundingClientRect().x
    var imgY = imgMagnifierBlock.getBoundingClientRect().y
    var maxFinalX = -mgGlassHalfWidth + imgMagnifierBlock.offsetWidth;
    var minFinalX = -mgGlassHalfWidth
    var maxFinalY = -mgGlassHalfWidth + imgMagnifierBlock.offsetHeight;
    var minFinalY = -mgGlassHalfWidth
    console.log(maxFinalX, minFinalX, maxFinalY, minFinalY)
    imgMagnifierBlock.addEventListener('mousemove', event => {
        var x = event.clientX;
        var y = event.clientY;
        var finalX = x-imgX-mgGlassHalfWidth
        var finalY = y-imgY-mgGlassHalfWidth

        if (finalX < minFinalX) {
            finalX = minFinalX
        }
        if (finalX > maxFinalX) {
            finalX = maxFinalX
        }
        if (finalY < minFinalY) {
            finalY = minFinalY
        }
        if (finalY > maxFinalY) {
            finalY = maxFinalY
        }
        mgGlass.style.top = `${finalY}px`;
        mgGlass.style.left = `${finalX}px`;
        glassImg.style.top = `-${(scaleBy * finalY) + mgGlassHalfWidth}px`;
        glassImg.style.left = `-${(scaleBy * finalX) + mgGlassHalfWidth}px`;
    })
})