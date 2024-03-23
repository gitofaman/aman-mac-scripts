var usingName = $0.innerText;
var galleryImageBlocks = Array.from(document.querySelectorAll('.wonderplugin-gridgallery-item'))
var counter = 1
var galleryImages = galleryImageBlocks.map(block=>{
    var imageSrc = block.querySelector('.wpgridlightbox').getAttribute('href')
    if(imageSrc.length===0) {
        console.log(counter)
    }
    var imageJson = {
        Image: imageSrc,
        Name: block.querySelector('.wonderplugin-gridgallery-item-title').innerText,
        Supplier: usingName
    }
    counter++;
    return imageJson
})
copy(galleryImages)