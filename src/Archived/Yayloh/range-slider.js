var ranger = document.querySelector('[aria-ranger]')


var rangeValue = ranger.querySelector('[aria-range-value]')
var rangeFiller = ranger.querySelector('[aria-range-filler]')
var rangeInput = ranger.querySelector('[aria-range-input]')
var rangerImage = ranger.querySelector('.custom-range-end-image')
var modifySliderWithPercentValues = (percent) => {
    rangeValue.innerText = percent*10;
    rangeFiller.style.width = percent + '%';
    rangeValue.parentElement.style.left = - percent*2 + '%';
    rangerImage.style.right = percent/100 - 1 + 'em'; 
    activateTheBestPlan()
}
rangeInput.addEventListener('click', (e)=>{
    modifySliderWithPercentValues(e.target.value)
})
rangeInput.addEventListener('mousemove', (e)=>{
    modifySliderWithPercentValues(e.target.value)
})

modifySliderWithPercentValues(rangeInput.value)
ranger.addEventListener('touchmove', function(event) {
    var x = event.touches[0].clientX - 65
    var width = ranger.getBoundingClientRect().width
    var percent = Math.round(x*100/width)
    if(percent>100) {
        percent = 100
    } else if (percent < 0){
        percent = 0
    }
    modifySliderWithPercentValues(percent)
})