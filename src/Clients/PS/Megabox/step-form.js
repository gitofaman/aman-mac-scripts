var formSteps;
formSteps = Array.from(document.querySelectorAll('.form-step'))
var activeStepIndex = 0;
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
    activeStepIndex = formStepIndex
    formSteps.forEach(step=>{
        step.style.display = 'none'
    })
    formSteps[formStepIndex].style.display = ''
}
function isHidden(el) {
    return (el.offsetParent === null)
}
var inputMessages = ['Please fill in this input']

//for changing the steps based on button
formSteps.forEach(step=>{
    
    var formNextBtns = step.querySelectorAll(`[${customAttrs.nextStep}]`)
    var formPrevBtns = step.querySelectorAll(`[${customAttrs.prevStep}]`)
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
    formNextBtns.forEach(formNextBtn=>{
        if(!!formNextBtn) {
            formNextBtn.addEventListener('click', ()=>{
                updateConditon()
                if(currentStepCondition) {
                    makeStepActive(currentStepIndex + 1)                
                }
            })
        }
    })
    formPrevBtns.forEach(formPrevBtn=>{
        if(!!formPrevBtn) {
            formPrevBtn.addEventListener('click', ()=>{
                makeStepActive(currentStepIndex - 1)
            })
        }
    })

    currentStepInputs.forEach(input=>{
        input.addEventListener('change', ()=>{
            makeInputValid(input)
        })
    })
})

makeStepActive(0)