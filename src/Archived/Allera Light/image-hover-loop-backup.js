var productBlocks = document.querySelectorAll('.fixed-image-container');

var transitionTime = 500

var imageShowTime = 500

var easingType = 'easeOutSine'

var opaqueTheEl = (el) => {
    el.style.opacity = 0
    anime({
        targets: el,
        duration: transitionTime,
        opacity: 1,
        easing: easingType
    })
}

var transparentTheEl = (el) => {
    el.style.opacity = 1
    anime({
        targets: el,
        duration: transitionTime,
        opacity: 0,
        easing: easingType
    })
}

var nextForList = (currentNo, givenList) => {
    var nextNo, nextEl
    dataToReturn = {}
    if (currentNo < givenList.length - 1) {
        nextNo = currentNo + 1
        nextEl = givenList[nextNo]
    } else {
        nextNo = 0
        nextEl = givenList[nextNo]
    }
    dataToReturn["nextNo"] = nextNo
    dataToReturn["nextEl"] = nextEl
    return dataToReturn;
}

productBlocks.forEach(productBlock => {
    //setting the opacity of all image except the first one as zero
    var prodImages, currentBlockAutoInterval, currentImageIndex, isPlaying;
    prodImages = [productBlock.querySelector('.product4_image'), ...productBlock.querySelectorAll('.product-full-image')]
    //resets the image to show the first image and sets the current image index to 0
    var resetOpacity = () => {
        prodImages.forEach(prodImage => {
            prodImage.style.opacity = 0
        })
        prodImages[0].style.opacity = 1
        currentImageIndex = 0;
        isPlaying = false;
    }

    resetOpacity()

    if (prodImages.length > 1) {
        //image loop on mouseover
        productBlock.addEventListener('mouseover', () => {
            //show currentImage for imageShowTime then disappear the currentImage, showing the nextImage
            isPlaying = true;
            var nextImage, currentImage, nextImage;

            function showNextImage () {
                if(isPlaying) {
                    currentImage = prodImages[currentImageIndex]
                    nextImage = nextForList(currentImageIndex, prodImages).nextEl
                    setTimeout(() => {
                        if(isPlaying) {
                            transparentTheEl(currentImage)
                            opaqueTheEl(nextImage)
                        }
                    }, imageShowTime)
                    //changing the current image index for next iteration
                    currentImageIndex = nextForList(currentImageIndex, prodImages).nextNo
                }
            }
            showNextImage()
            currentBlockAutoInterval = setInterval(showNextImage, imageShowTime + transitionTime)
        })

        //stop loop on mouseOut
        productBlock.addEventListener('mouseout', () => {
            //isPlaying makes sure to stop the animation to help the reset opacity cause
            isPlaying = false;
            clearInterval(currentBlockAutoInterval)
            //timeout to make sure reset opacity gets triggered after the latest image change
            setTimeout(resetOpacity, transitionTime)
        })
    }
})
