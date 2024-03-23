var productImage;
var productImageContainers = document.querySelectorAll('.fixed-image-container')
var imageTransitionDuration = 500;
var imageShowTime = 500;

function disappearElement(el, givenDuration) {
    anime({
        targets: el,
        opacity: 0,
        easing: 'easeInOutSine',
        duration: givenDuration
    })
}

function appearElement(el, givenDuration) {
    el.style.opacity = 0;
    anime({
        targets: el,
        opacity: 1,
        easing: 'easeInOutSine',
        duration: givenDuration
    })
}

productImageContainers.forEach(container => {
    var containerImages = container.querySelectorAll('img')
    var imageAutoInterval;
    if(containerImages.length>1) {
        container.addEventListener('mouseover', () => {
            var i = 0;
            imageAutoInterval = setInterval(()=>{
                var currentImage = containerImages[i]
                disappearElement(currentImage, 200)
                if(i<containerImages.length-1) {
                    i++;
                } else {
                    containerImages.forEach(image=>{
                        appearElement(image, 200)
                        i = 0;
                    })
                }
            }, 200)
        })
        container.addEventListener('mouseout', ()=>{
            containerImages.forEach(containerImage=>{
                appearElement(containerImage, 0)
            })
            clearInterval(imageAutoInterval)
        })
    }
})


