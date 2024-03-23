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
    const utmSourceParam = thisSiteUrl.searchParams.get('utm_source')
    const utmMediumParam = thisSiteUrl.searchParams.get('utm_medium')
    const utmCampaignParam = thisSiteUrl.searchParams.get('utm_campaign')
    var valueToInput = ''
    if (!!utmSourceParam) { //checks if utm_source param exists, !!utmSourceParam gives true if exists
        valueToInput += ` utm_source=${utmSourceParam},`
    }
    if (!!utmMediumParam) { //checks if utm_medium param exists, !!utmMediumParam gives true if exists
        valueToInput += ` utm_medium=${utmMediumParam}`
    }
    if (!!utmCampaignParam) {
        valueToInput += ` utm_campaign=${utmCampaignParam}`
    }
    mediumField.value = valueToInput;
})