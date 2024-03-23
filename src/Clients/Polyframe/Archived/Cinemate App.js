var numberGrid = document.querySelector('.cn-grid')
var numbers = Array.from(numberGrid.querySelectorAll('.cn'))
var notAnimated = true;
numbers.forEach(number=>{
    number.innerText = 23 - numbers.indexOf(number)
})

var moveNumberGrid = (moveValue, duration) => {
    notAnimated = false;
    anime({
        targets: numberGrid,
        duration: duration,
        easing: `easeInOutQuart`,
        translateX: moveValue
    })
    anime({
        targets: numberGrid,
        filter: `blur(1px)`,
        duration: duration/2,
        easing: `easeInQuad`
    })
    setTimeout(()=>{
        anime({
            targets: numberGrid,
            filter: `blur(0px)`,
            duration: duration/2,
            easing: `easeOutQuad`
        })
    }, duration/2)
}


window.addEventListener('scroll', ()=>{
    if (numberGrid.getBoundingClientRect().top + 100 < window.innerHeight && notAnimated && numberGrid.getBoundingClientRect().top > 100) {
        moveNumberGrid(numberGrid.offsetWidth - numbers[0].offsetWidth, 4000)
    }
})