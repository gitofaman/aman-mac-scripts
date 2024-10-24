var casino = document.querySelector('.casino-block-cover')
var images = []
var apeNames = []
var apeCodes = []
var apeColors = []
var apeLinks = []
document.querySelectorAll('[win-ape-img]').forEach(apeImg => {
    images.push(apeImg.getAttribute('src'))
})
document.querySelectorAll('[win-ape-name]').forEach(apeName => {
    apeNames.push(apeName.innerText)
    apeColors.push(apeName.style.color)
})
document.querySelectorAll('[win-ape-prof]').forEach(apeCode => {
    apeCodes.push(apeCode.innerText)
})
document.querySelectorAll('[win-ape-link]').forEach(apeLink => {
    apeLinks.push(apeLink.getAttribute('href'))
})
document.querySelectorAll('[win-ape-prof]')
var casinoNav = casino.querySelectorAll('.casino-nav-btn')
var casinoNext = casinoNav[1]
var casinoPrev = casinoNav[0] 
var currentImageIndex = 0

var setFirstImage = i => {
    currentImageIndex = i
    var j,k;
    if(i===images.length - 1) {
        j = 0
    } else {
        j = i+1;
    }
    if(j===images.length - 1) {
        k = 0
    } else {
        k = j+1;
    }
    //setting images
    document.getElementById('casino-first-image').querySelector('image').setAttribute('xlink:href', images[i])
    document.getElementById('casino-second-image').querySelector('img').removeAttribute('srcset')
    document.getElementById('casino-second-image').querySelector('img').removeAttribute('src')
    document.getElementById('casino-second-image').querySelector('img').setAttribute('src', images[j])
    document.getElementById('casino-last-image').querySelector('image').setAttribute('xlink:href', images[k])
    //setting colors
    document.getElementById('casino-first-image').style.color = apeColors[i]
    document.getElementById('casino-second-image').style.color = apeColors[j]
    document.getElementById('casino-last-image').style.color = apeColors[k]
    //setting texts and link
    document.getElementById('name-code').innerText = apeCodes[j]
    document.getElementById('name-name').innerText = apeNames[j]
    document.getElementById('name-link').setAttribute('href', apeLinks[j])
}

var setNextImage = () => {
    if(currentImageIndex === images.length - 1) {
        setFirstImage(0)
    } else {
        setFirstImage(currentImageIndex+1)
    }
}

var setPrevImage = () => {
    if(currentImageIndex === 0) {
        setFirstImage(images.length - 1)
    } else {
        setFirstImage(currentImageIndex-1)
    }
}

casinoNext.addEventListener('click', setNextImage)
casinoPrev.addEventListener('click', setPrevImage)
setFirstImage(0)