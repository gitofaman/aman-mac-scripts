var customRangeSliders = document.querySelectorAll('[aria-ranger]')

var createRangeSlider = (ranger) => {
    var rangeValue = ranger.querySelector('[aria-range-value]')
    var rangeFiller = ranger.querySelector('[aria-range-filler]')
    var rangeInput = ranger.querySelector('[aria-range-input]')
    var modifySliderWithPercentValues = (percent) => {
        rangeValue.innerText = percent*10;
        rangeFiller.style.width = percent + '%';
    }
    rangeInput.addEventListener('click', (e)=>{
        modifySliderWithPercentValues(e.target.value)
    })
    rangeInput.addEventListener('mousemove', (e)=>{
        modifySliderWithPercentValues(e.target.value)
    })

    modifySliderWithPercentValues(rangeInput.value)
}

customRangeSliders.forEach(r=>{createRangeSlider(r)})