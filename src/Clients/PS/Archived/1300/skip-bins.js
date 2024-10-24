var optionRadios = document.querySelectorAll('.p-radio')
var options = []
var selectElement = document.querySelector(`[skip-bin-size]`);

//gathering all options
for (var i = 0; i < selectElement.options.length; i++) {
  var optionVal = selectElement.options[i].innerText
  options.push(optionVal)
}

function hideOptionByIndex(optionIndex) {
  selectElement.options[optionIndex].remove()
  selectElement.selectedIndex = 0;
}

function showAllOptions() {
  if (selectElement) {
    selectElement.innerHTML = ''; // Clear existing options
    for (var i = 0; i < options.length; i++) {
      var option = document.createElement('option');
      option.text = options[i];
      option.value = i === 0 ? '' : options[i];
      selectElement.appendChild(option);
    }
  }
}



optionRadios.forEach(optionRadio => {
  optionRadio.addEventListener('click', () => {
    showAllOptions()
    optionRadios.forEach(radio => {
      var radioInput = radio.querySelector('input')
      if (radioInput.checked) {
        var optionToDisable = parseInt(radio.getAttribute('disable-option'))
        hideOptionByIndex(optionToDisable)
      }
    })
  })
})