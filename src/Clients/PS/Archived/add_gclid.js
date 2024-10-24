var gForms = document.querySelectorAll('form')
gForms.forEach(gForm=>{
    var newField = document.createElement('input')
    newField.setAttribute('type', 'hidden')
    newField.setAttribute('id', 'gclid_field')
    newField.setAttribute('name', 'gclid_field')
    newField.setAttribute('value', '')
    gForm.prepend(newField)
})