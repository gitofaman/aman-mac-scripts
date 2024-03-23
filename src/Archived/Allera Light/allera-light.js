var productImageContainers = document.querySelectorAll('.fixed-image-container')

function disappearElement(el, givenDuration) {
    anime({
        targets: el,
        opacity: 0,
        easing: 'easeInOutSine',
        duration: givenDuration
    })
}

function appearElement(el, givenDuration) {
    anime({
        targets: el,
        opacity: 1,
        easing: 'easeInOutSine',
        duration: givenDuration
    })
}
document.querySelectorAll('.product-full-image').forEach(prodExtraImg=>{
    prodExtraImg.style.opacity=0;
})
productImageContainers.forEach(container=>{
    var images = container.querySelectorAll('img')
    if(images.length==2) {
        images[1].style.opacity = 1;
    }
    if(images.length > 2) {
        images[2].style.opacity = 1;
    }
    if(images.length>1) {
        container.addEventListener('mouseover', ()=>{
            disappearElement(images[0], 500)
        })
        container.addEventListener('mouseout', ()=>{
            appearElement(images[0], 500)
        })
    }
    
})