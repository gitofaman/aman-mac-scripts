const forms = document.querySelectorAll('form')

forms.forEach(form=>{
    var mediumField = form.querySelector('[name="medium"]')
    if(!mediumField) { //if medium field doesn't exist in the form, proceeds creating medium input
        const mediumInput = document.createElement('input')
        mediumInput.name = 'medium'
        mediumInput.style.display = 'none'
        form.prepend(mediumInput)
        mediumField = form.querySelector('[name="medium"]')
    }
    //Inserts Google Ads as medium if gclid parameter exists
    const urlParams = new URLSearchParams(window.location.search)
    var allParams = urlParams.toString()
    mediumField.value = allParams.replaceAll('&', ' ')
})