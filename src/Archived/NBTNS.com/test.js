var formToSubmit;
formToSubmit.setAttribute('onsubmit', 'myFunction()')
function myFunction () {
    var submittngFormInputs = formToSubmit.querySelectorAll('input')
    submittngFormInputs.forEach(submittngFormInput=>{
        var isNotAbandonedInput = submittngFormInput.hasAttribute('name')
        var isSubmitInput = submittngFormInput.getAttribute('type') === 'submit'
        if(!isNotAbandonedInput && !isSubmitInput) {
            submittngFormInput.remove()
        }
    })
    return true;
}