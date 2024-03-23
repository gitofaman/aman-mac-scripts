workingHoursBlocks.forEach(workingHourBlock=>{
    var timeInputs, dateCheckbox;
    workingHourBlock.parentElement.setAttribute('time-input-0', '')
    workingHourBlock.parentElement.setAttribute('time-input-1', '')
    dateCheckbox = workingHourBlock.querySelector('input[type="checkbox"]')
    var timeInputs = Array.from(workingHourBlock.querySelectorAll('.is-working-hour-input'))

    //to create a new input for airtable
    var newHiddenInput = document.createElement('input')
    newHiddenInput.classList.add('is--hidden')
    newHiddenInput.setAttribute('name', workingHourBlock.querySelector('.checkbox-label.w-form-label').innerText)
    newHiddenInput.value = '-'
    workingHourBlock.prepend(newHiddenInput)

    var inputWorkingHours = workingHourBlock.querySelector('input.is--hidden')
    var updateNewHiddenInputValue = () => {
        var inputWorkingHours = workingHourBlock.querySelector('.is--hidden')
        inputWorkingHours.value = timeInputs[0].value + timeInputs[1].value
    }

    timeInputs.forEach(timeInput=>{
        timeInput.addEventListener('keyup', (e)=>{
            var thisInputIndex = timeInputs.indexOf(timeInput)
            workingHourBlock.parentElement.setAttribute(`time-input-${thisInputIndex}`, e.target.value)
            updateNewHiddenInputValue()
        })
    })

    //to disable input filling on unchecked block
    var updateDisability = () => {
        timeInputs.forEach(timeInput=>{
            var thisInputIndex = timeInputs.indexOf(timeInput)
            if(dateCheckbox.checked) {
                enableInput(timeInput)
                timeInput.value = workingHourBlock.parentElement.getAttribute(`time-input-${thisInputIndex}`)
            } else {
                disableInput(timeInput)
                timeInput.value = ''
            }
        })
        updateNewHiddenInputValue()
    }

    dateCheckbox.addEventListener('change', updateDisability)
    updateDisability()
})