var mapDots = document.querySelectorAll('.map-dot')

var slideUpAnimate = (el) => {
    el.style.opacity = 0;
    el.style.transform = `translateY(40px)`
    anime({
        targets: el,
        translateY: 0,
        opacity: 1,
        easing: `easeOutSine`,
        duration: 400,
    })
}

var updateMapData = (markerAlphabet, mapDetails, providedImage) => {
    var mapMarker = document.querySelector('[aria-map-marker]')
    var mapDetailBlock = document.querySelector('[aria-map-data]')
    var imageBlock = document.querySelector('[aria-map-image]')
    slideUpAnimate(mapMarker.parentElement)
    slideUpAnimate(mapDetailBlock)
    slideUpAnimate(imageBlock)
    mapMarker.innerText = markerAlphabet;
    mapDetailBlock.innerHTML = mapDetails;
    imageBlock.removeAttribute('srcset')
    imageBlock.removeAttribute('src')
    imageBlock.setAttribute('src', providedImage)
}

var activateMapDot = (givenMapDot) => {
    mapDots.forEach(mapDot=>{
        mapDot.classList.remove('is-active')
    })
    givenMapDot.classList.add('is-active')
    var markerAlphabet = givenMapDot.querySelector('.alphabet-marker').innerText
    var mapDetails = givenMapDot.querySelector('.map-data').innerHTML
    var providedImage = givenMapDot.querySelector('img.map-image').getAttribute('src')
    updateMapData(markerAlphabet, mapDetails, providedImage)
}

mapDots.forEach(mapDot=>{
    mapDot.addEventListener('click', ()=>{
        activateMapDot(mapDot)
    })
})

activateMapDot(mapDots[0])