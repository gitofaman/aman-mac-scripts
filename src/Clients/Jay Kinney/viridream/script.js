
const rangeSlider = document.getElementById('rangeSlider');

// Function to calculate and update the percentage value
function updateSliderValue() {
    const percentage = (rangeSlider.value / 1000) * 100;
    $('.before-after-block.is-relative').css('width', percentage +'%')
}

// Add an event listener to the range slider for the "input" event
rangeSlider.addEventListener('input', updateSliderValue);

rangeSlider.addEventListener('touchmove', updateSliderValue);

// Initial update of the percentage value
updateSliderValue();