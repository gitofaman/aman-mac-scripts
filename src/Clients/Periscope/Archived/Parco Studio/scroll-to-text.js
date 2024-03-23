var splitEverything = (aText) => {
    var aTextWords = aText.innerText.split(' ')
    aText.innerHTML = ''
    console.log(aTextWords)
    aTextWords.forEach(aTextWord => {
        var aWords = aTextWord.split('')
        var wordHtml = ''
        aWords.forEach(aWord=>{
            wordHtml += `<span el="letter">${aWord}</span>`
        })
        aText.innerHTML += `<span el="word">${wordHtml}</span> `
    })
}
var setInitalState = (aText) => {
    var letters = aText.querySelectorAll('[el="letter"]')
    var num = 0
    letters.forEach(letter=>{
        num++
        yValue = `100%`
        // if(num%2 === 0) {
        //     yValue = `-100%`
        // }
        animateEl(letter, {translateY: yValue}, 0)
    })
}
var newStyles = document.createElement('style')
newStyles.innerHTML = `[el="word"] {
    overflow: hidden;
    display: inline-block;
    white-space: nowrap;
}
[el='letter'] {
    display: inline-block;
}`
document.head.appendChild(newStyles)

var aTexts = document.querySelectorAll('h1, h2, h3, h4, h5, h6, [a-text]')
aTexts.forEach(aText => {
    splitEverything(aText)
    setInitalState(aText)
})
var animateAtext = (aText) => {
    var letters = aText.querySelectorAll('[el="letter"]')
    setTimeout(()=>{
        var delayToUse = 0
        letters.forEach(letter=>{
            animateEl(letter, {translateY: '0%', delay: delayToUse}, 400)
            delayToUse += 200/letters.length
            if(delayToUse > 20) {
                delayToUse = 20
            }
        })
    }, 20)
}

var checkIfElInSpace = (el, percentVal) => {
    var windowHeight = window.innerHeight
    var spaceToCover = Math.round(windowHeight * percentVal/100)
    var spaceFromEachSides = (windowHeight - spaceToCover)/2;
    var elTop = el.getBoundingClientRect().top
    // var elBottom = el.getBoundingClientRect().bottom
    if (elTop + el.offsetHeight > spaceFromEachSides && elTop < windowHeight - spaceFromEachSides) {
        return true;
    }
    return false
}

var animateIfElInView = () => {
    aTexts.forEach(aText=>{
        if(!aText.hasAttribute('visited')) {
            if(checkIfElInSpace(aText, 72)) {
                animateAtext(aText)
                aText.setAttribute('visited', true)
            }
        }
    })
}

window.addEventListener('scroll', animateIfElInView)
animateIfElInView()