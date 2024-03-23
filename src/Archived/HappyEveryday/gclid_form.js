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
    const thisSiteUrl = new URL(window.location.href)
    const gclidParam = thisSiteUrl.searchParams.get('gclid')
    if (!!gclidParam) { //checks if gclid param exists, !!gclidParam gives true if exists
        mediumField.value = 'Google Ads'
    }
})