mainForms.forEach(mainForm=>{
    var formSteps;
    formSteps = Array.from(mainForm.querySelectorAll('.form-step'))
    var activeStepIndex = 0;
    var stepIndicators = mainForm.querySelectorAll('.flow-step')
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
        stepIndicators.forEach(step=>{
            step.classList.remove('is--done')
        })
        stepIndicators[0].classList.add('is--done')
        for (i=1; i<formStepIndex + 1; i++) {
            stepIndicators[i].classList.add('is--done')
        }
    }
    function isHidden(el) {
        return (el.offsetParent === null)
    }
    var inputMessages = ['Please add a value', 'Please select an option', 'Please add correct email']
    var makeInputInvalid = (input, messageIndex) => {
        if(!input.classList.contains(customClasses.invalidInput)) {
            input.classList.add(customClasses.invalidInput)
            var invalidText = document.createElement('div')
            invalidText.classList.add(customClasses.invalidText)
            invalidText.innerText = inputMessages[messageIndex]
            input.parentElement.appendChild(invalidText)
        }
    }
    
    var makeInputValid = (input) => {
        input.classList.remove(customClasses.invalidInput)
        var invalidText = input.parentElement.querySelector(`.${customClasses.invalidText}`)
        if(!!invalidText) {
            invalidText.remove()
        }
    }
    
    var updateConditon = (step) => {
        var currentStepInputs = Array.from(step.querySelectorAll('input, select'))
        var unfilledInputs = []
        var currentStepCondition = true;
        currentStepInputs.forEach(input=>{
            if (input.value.trim() === '' && !input.disabled && !isHidden(input)) {
                unfilledInputs.push(input)
            }
            if(input.getAttribute('type')==='email') {
                if(input.value.indexOf('@') <0 || input.value.indexOf('.') <0) {
                    unfilledInputs.push(input)
                } 
            }
        })
        if (unfilledInputs.length) {
            currentStepCondition = false;
            unfilledInputs.forEach(input=>{
                var messageIndex = 0;
                if(input.getAttribute('type')==='email') {
                    messageIndex = 2;
                }
                makeInputInvalid(input, messageIndex)
            })
        }
        if(step.hasAttribute('radio-var-index')) {
            var radioVarIndex = step.getAttribute('radio-var-index')
            var radioValue = dataInputPairs[parseInt(radioVarIndex)][1]
            if(!!radioValue && radioValue.length>0) {
                currentStepCondition = true;
                console.log('from here 1')
                return currentStepCondition;
            } 
            currentStepCondition = false;
            makeInputInvalid(step.querySelector('input[type="radio"]').parentElement, 1)
            console.log('from here 2')
            return currentStepCondition;
        }
        console.log('from here 3')
        return currentStepCondition
    }
    //for changing the steps based on button
    formSteps.forEach(step=>{
        
        var formNextBtns = step.querySelectorAll(`[${customAttrs.nextStep}]`)
        var formPrevBtns = step.querySelectorAll(`[${customAttrs.prevStep}]`)
        var currentStepInputs = step.querySelectorAll('input, select')
    
        var currentStepIndex = formSteps.indexOf(step)
        var currentStepCondition = true;
    
    
        formNextBtns.forEach(formNextBtn=>{
            if(!!formNextBtn) {
                formNextBtn.addEventListener('click', ()=>{
                    currentStepCondition = updateConditon(step)
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
        step.querySelectorAll('input[type="radio"]').forEach(radio=>{
            radio.addEventListener('click', ()=>{
                makeInputValid(step)
            })
        })
    
    })
    var openPopupBtn = mainForm.querySelector('[open-popup]')
    if(!!openPopupBtn) {
        openPopupBtn.addEventListener('click', ()=>{
            currentStepCondition = updateConditon(formSteps[3])
            console.log(currentStepCondition)
            if(currentStepCondition) {
                openPopup()
            }
        })
    } 
    makeStepActive(0)
    var stepTeleportBtns = mainForm.querySelectorAll('[step-active]')
    stepTeleportBtns.forEach(btn=>{
        var indexToMakeActive = btn.getAttribute('step-active')
        btn.addEventListener('click', ()=>{
            makeStepActive(indexToMakeActive)
        })
    })
})
