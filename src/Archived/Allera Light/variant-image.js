//product image change on variatn selection
var productImage = document.querySelector('[aria-product-image]')
var variantSlide;
var imageGallerySlides;
var addToCartVariantSelects = document.querySelectorAll('.w-commerce-commerceaddtocartform')
//to add the variant image over the slide
function appendProductImage(src, parent) {
    refreshSlideImage()
    var prodImage = document.createElement('img')
    prodImage.classList.add('full-image')
    prodImage.style.backgroundColor = 'white'
    prodImage.setAttribute('src', src)
    parent.appendChild(prodImage)
    variantSlide = parent;
}
//to make sure user see the variant image even if they reselect their selection
addToCartVariantSelects.forEach(variantSelectInput => {
    variantSelectInput.addEventListener('click',()=>{
        updateCurrentVariantImage()
    })
})

var productImageObserver = new MutationObserver(mutations=>{
    //triggers the following function if image attribute changes
    updateCurrentVariantImage()
})
//to show current variant image
var updateCurrentVariantImage = () => {
    var imageGallerySlides = Array.from(document.querySelectorAll('.img-gallery-main-slide'))
    var currentVariantImage = productImage.getAttribute('src')
    var visibleImageSlide = imageGallerySlides.filter(gallerySlide=>{
        return !gallerySlide.getAttribute('aria-hidden')
    })[0]
    //updating the current image with the product variant image
    appendProductImage(currentVariantImage, visibleImageSlide.querySelector('.c-main-img-lightbox'))
    //to observe change in slide to remove the variant image based on that
    var imageSlide = imageGallerySlides[0]

    var imageSlideObserver = new MutationObserver(mutations=>{
        refreshSlideImage()
    })

    imageSlideObserver.observe(imageSlide, { characterData: false, attributes: true, childList: false, subtree: false })
}
//to remove added variant images if any!
var refreshSlideImage = () => {
    if(!!variantSlide) {
        variantSlide.querySelector('.full-image').remove()
        variantSlide = ''
    }
}

//to observe change in variant image
productImageObserver.observe(productImage, { characterData: false, attributes: true, childList: false, subtree: false })
