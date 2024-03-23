var dominantInputs = document.querySelectorAll('[dependent-change]')
dominantInputs.forEach(dominantInput=>{
    if(dominantInput.value.toLowerCase() !== 'yes') {
        var dependentInput = document.querySelector(`[dependent-change-input="${dominantInput.getAttribute('dependent-change')}"]`)
        dependentInput.setAttribute('price-cannot-change', 'true')
    } else {
        dependentInput.removeAttribute('price-cannot-change')
    }
})