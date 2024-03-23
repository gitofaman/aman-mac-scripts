var numberGrid = document.querySelector('.cn-grid')
var number = numberGrid.querySelector('.cn')
var currentNo = 23

var moveNumberGrid = (moveValue, duration) => {
    anime({
        targets: numberGrid,
        duration: duration,
        easing: `linear`,
        translateX: moveValue
    })
}

numberMax = parseInt(number.innerText);
for(i=0;i<)