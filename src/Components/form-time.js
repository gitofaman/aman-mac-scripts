//To track time for each form submission
var timeForms = document.querySelectorAll('form')
var timeFieldName = 'form-submission-time'
timeForms.forEach(tForm=>{
    var timeField = document.createElement('input')
    timeField.style.display = 'none'
    timeField.name = timeFieldName
    tForm.appendChild(timeField)
    tForm.querySelector(`[name=${timeFieldName}]`).value = new Date().toTimeString().split(" ")[0]
})

