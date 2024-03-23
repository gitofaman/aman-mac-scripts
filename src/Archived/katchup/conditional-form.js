var formSteps, workingHoursBlocks;
workingHoursBlocks = Array.from(document.querySelectorAll('.working-hours_parent'))
formSteps = Array.from(document.querySelectorAll('.form-step'))

// $0.querySelectorAll('input, select').forEach(inp=>{inp.setAttribute('disabled', '')})

var customAttrs = {
    nextStep: 'next-step-btn',
    prevStep: 'prev-step-btn',
    showWhenActive: 'show-class-when-active'
}
var customClasses = {
    invalidInput: 'invalid',
    invalidText: 'invalid-text'
}
//to make a step active
var makeStepActive = (formStepIndex) => {
    formSteps.forEach(step=>{
        step.style.display = 'none'
    })
    formSteps[formStepIndex].style.display = ''
    if(formStepIndex===1) {
        var givenRestaurantName = document.querySelector('[data-name="Restaurant Name"]').value;
        document.querySelector('[restaurant-name]').innerText = givenRestaurantName;
    }
}
function isHidden(el) {
    return (el.offsetParent === null)
}
var inputMessages = ['Please fill in this input']

//for changing the steps based on button
formSteps.forEach(step=>{
    
    var formNextBtn = step.querySelector(`[${customAttrs.nextStep}]`)
    var formPrevBtn = step.querySelector(`[${customAttrs.prevStep}]`)
    var currentStepIndex = formSteps.indexOf(step)
    var currentStepCondition = true;
    var currentStepInputs = step.querySelectorAll('input, select')

    var makeInputInvalid = (input, messageIndex) => {
        if(!input.classList.contains(customClasses.invalidInput)) {
            input.classList.add(customClasses.invalidInput)
            var invalidText = document.createElement('div')
            invalidText.classList.add(customClasses.invalidText)
            invalidText.innerText = inputMessages[messageIndex]
            input.parentElement.prepend(invalidText)
        }
    }

    var makeInputValid = (input) => {
        input.classList.remove(customClasses.invalidInput)
        var invalidText = input.parentElement.querySelector(`.${customClasses.invalidText}`)
        if(!!invalidText) {
            invalidText.remove()
        }
    }

    var updateConditon = () => {
        var unfilledInputs = []
        currentStepCondition = true;
        currentStepInputs.forEach(input=>{
            if (input.value.trim() === '' && !input.disabled && !isHidden(input)) {
                unfilledInputs.push(input)
            }
        })
        if (unfilledInputs.length) {
            currentStepCondition = false;
            unfilledInputs.forEach(input=>{
                makeInputInvalid(input, 0)
            })
            
        }
    }
    
    if(!!formNextBtn) {
        formNextBtn.addEventListener('click', ()=>{
            updateConditon()
            if(currentStepCondition) {
                makeStepActive(currentStepIndex + 1)                
            }
        })
    }

    if(!!formPrevBtn) {
        formPrevBtn.addEventListener('click', ()=>{
            makeStepActive(currentStepIndex - 1)
        })
    }

    currentStepInputs.forEach(input=>{
        input.addEventListener('click', ()=>{
            makeInputValid(input)
        })
    })
})

var disableInput = (input) => {
    input.setAttribute('disabled', '')
}

var enableInput = (input) => {
    input.removeAttribute('disabled', '')
}

var conditionalVisibilityToggles = document.querySelectorAll(`[${customAttrs.showWhenActive}]`)

var checkboxesAndRadios = document.querySelectorAll('input[type="radio"], input[type="checkbox"]')

var updateToggleVisibility = () => {
    conditionalVisibilityToggles.forEach(toggle=>{
        var elClassToMakeActive = toggle.getAttribute(customAttrs.showWhenActive)
        var elsToMakeActive = document.querySelectorAll(`.${elClassToMakeActive}`)
        var updateRelatedCheckVisibility = () => {
            if(toggle.checked) {
                elsToMakeActive.forEach(el=>{
                    el.style.display = ''
                })
            } else {
                elsToMakeActive.forEach(el=>{
                    el.style.display = 'none'
                })
            }
        }
        updateRelatedCheckVisibility()
    })
}

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

checkboxesAndRadios.forEach(cr=>{
    cr.parentElement.addEventListener('click', ()=>{
        updateToggleVisibility()
    })
})

updateToggleVisibility()
makeStepActive(0)