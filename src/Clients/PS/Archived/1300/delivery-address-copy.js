var inputOne = document.querySelector('[input-one]')
var inputTwo = document.querySelector('[input-two]')

var selectOne = document.querySelector('[select-one]')
var selectTwo = document.querySelector('[select-two]')

var checkbox = document.querySelector('[copy-address]')

var updateAddress = () => {
    inputTwo.value = inputOne.value;
    selectTwo.value = selectOne.value;
}

checkbox.addEventListener('click', ()=>{
    var checkboxInput = checkbox.querySelector('input')
    if(checkboxInput.checked) {
        updateAddress()
        selectOne.addEventListener('change', updateAddress)
        inputOne.addEventListener('change', updateAddress)
        selectTwo.setAttribute('disabled', 'true')
        inputTwo.setAttribute('disabled', 'true')
    } else {
        selectTwo.value = ''
        inputTwo.value = ''
        selectTwo.removeEventListener('change', updateAddress)
        inputTwo.removeEventListener('change', updateAddress)
        selectTwo.removeAttribute('disabled')
        inputTwo.removeAttribute('disabled')
    }
})