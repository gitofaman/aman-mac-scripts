var getTop = el => el.offsetTop + (el.offsetParent && getTop(el.offsetParent))
var scrollToElementTop = (el, spaceFromTop) => {
    var scrollTo = getTop(el) - spaceFromTop
    window.scrollTo({
        top: scrollTo,
        behavior: 'smooth',
        })   
}

var animateEl = (el, animateJson, aduration) => {
    console.log(aduration)
    var jsonToAnimate = {
        targets: el,
        duration: aduration,
        easing: `easeOutSine`
    }
    for (key in animateJson) {
        jsonToAnimate[key] = animateJson[key]
    }
    anime(jsonToAnimate)
}

var sendFirstStepForm = (formStep) => {
    const inputElements = formStep.querySelectorAll('input');
    let valuePairs = [];

    for (let i = 0; i < inputElements.length; i++) {
        const input = inputElements[i];
        const inputName = input.name;
        const inputValue = input.value;
        valuePairs.push(`${inputName}: ${inputValue}`);
    }
    var firstStepData = valuePairs.join('\n')
    $('[first-step-data]').text(firstStepData)
    setTimeout(()=>{
        $('[first-step-form]').submit()

    }, 3000)
}

var mainForms = document.querySelectorAll('[form-main]')

mainForms.forEach(mainForm => {
    //these variables will contain the input value that comes from users.
    var addressText, moveDate, moveTime, moveSpace, moveStoreTime;
    var addressInput, moveDateInput, moveTimeInput, moveSpaceInput, moveStoreTimeInput;
    var quoteProgressLine = mainForm.querySelector('.quote-progress-line')
    var bookingField = mainForm.querySelector('[booking-field]')
    var finalSubmitBtn = mainForm.querySelector('[final-submit-btn]')
    var dataInputPairs = [
        [addressInput, addressText, 'address-text'],
        [moveDateInput, moveDate, 'move-date'],
        [moveTimeInput, moveTime, 'move-time'],
        [moveSpaceInput, moveSpace, 'move-space'],
        [moveStoreTimeInput, moveStoreTime, 'move-store-time']
    ]

    //this will update the data in the divs with attributes.
    var updateInnerText = (attr, text) => {
        mainForm.querySelectorAll(`[${attr}]`).forEach(el=>{
            el.innerText = text;
        })
    }

    var updateDetails = () => {
        dataInputPairs.forEach(dataInputPair =>{
            if(!dataInputPair[1] && !!dataInputPair[0]) {
                dataInputPair[1] = dataInputPair[0].value
            }
            updateInnerText(dataInputPair[2], dataInputPair[1])
        })
    }

    var updateRadioValue = (inpuAttr, dataInputIndex) => {
        var inputName = mainForm.querySelector(`[${inpuAttr}]`).getAttribute('name')
        var radios = mainForm.querySelectorAll(`[name=${inputName}]`)
        radios.forEach(radio=>{radio.parentElement.addEventListener('click', ()=>{
            dataInputPairs[dataInputIndex][1] = radio.value
        })})
        updateDetails()
    }
    var updateInputValue = (inputAttr, dataInputIndex) => {
        dataInputPairs[dataInputIndex][0] = mainForm.querySelector(`[${inputAttr}]`)
        if(!!dataInputPairs[dataInputIndex][0]) {
            var currInput = dataInputPairs[dataInputIndex][0]
            currInput.addEventListener('focusout', ()=>{
                dataInputPairs[dataInputIndex][1] = currInput.value
            })
            updateDetails()
        }
    }

    updateInputValue('address-input', 0)
    updateInputValue('move-date-input', 1)
    updateRadioValue('move-time-input', 2)
    updateRadioValue('move-space-input', 3)
    updateRadioValue('move-store-time-input', 4)


    var popup = mainForm.querySelector('.popup')

    var openPopup = () => {
        updateDetails()
        popup.style.opacity = 0
        popup.style.transform = `translateY(40px)`
        popup.style.display = 'flex'
        animateEl(popup, {opacity: 1, translateY: 0}, 300)
    }
    var closePopup = () => {
        updateDetails()
        animateEl(popup, {opacity: 0, translateY: 40}, 300)
        setTimeout(()=>{
            popup.style.display = 'none'
        }, 300)
    }
    //for updating written date and opening the time select
    var dateSelect = mainForm.querySelector('[move-date-input]');
    var selectedDate = mainForm.querySelector('[selected-date]');
    var timeSelect = mainForm.querySelector('[time-select]');
    dateSelect.addEventListener('change', function() {
        var inputValue = dateSelect.value;
        var date = new Date(inputValue);
        var output = mainForm.querySelector('[selected-date]')
        if (isNaN(date)) {
            output.textContent = 'Invalid date';
            return;
        }

        var options = { weekday: 'short', month: 'long', day: 'numeric' };
        var formattedDate = date.toLocaleDateString('en-US', options);

        output.textContent = formattedDate;

        timeSelect.style.display = 'block'

    });

    var closePopupBtns = mainForm.querySelectorAll('[close-popup]')
    closePopupBtns.forEach(closePopupBtn=>{
        closePopupBtn.addEventListener('click', closePopup)
    })

    mainForm.querySelector('form').addEventListener('click', ()=>{
        updateDetails()
    })

    //step form

    var formSteps;
    formSteps = Array.from(mainForm.querySelectorAll('.form-step'))
    var activeStepIndex = 0;
    var totalSteps = formSteps.length;
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
    var firstStepDone = false;
    //to make a step active
    var makeStepActive = (formStepIndex) => {
        activeStepIndex = formStepIndex
        if(formStepIndex === 1 && !firstStepDone) {
            firstStepDone = true;
            // console.log('FIRST STEP DONE!')
            sendFirstStepForm(formSteps[0])
        }
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
        quoteProgressLine.style.width = Math.round(((formStepIndex + 1)/totalSteps)*100) + '%';
        scrollToElementTop(formSteps[formStepIndex])
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

    var showDateDetail = (arg) => {
        var dateDetailBlocks = document.querySelectorAll('.date-detail')
        if(arg) {
            dateDetailBlocks.forEach(dateDetailBlock=>{
                dateDetailBlock.style.display = ''
            })
        } else {
            dateDetailBlocks.forEach(dateDetailBlock=>{
                dateDetailBlock.style.display = 'none'
            })
        }
    }

    var openPopupBtns = mainForm.querySelectorAll('[open-popup-with]')
    openPopupBtns.forEach(openPopupBtn=>{
        var yesOrNo = openPopupBtn.getAttribute('open-popup-with')
        if(!!openPopupBtn) {
            openPopupBtn.addEventListener('click', ()=>{
                currentStepCondition = updateConditon(openPopupBtn.closest('.form-step'))
                console.log(currentStepCondition)
                bookingField.value = yesOrNo;
                if(yesOrNo === 'Yes') {
                    finalSubmitBtn.innerText = 'Request Booking'
                    finalSubmitBtn.value = 'Request Booking'
                    if(currentStepCondition) {
                        openPopup()
                    }
                    showDateDetail(true)
                } else if (yesOrNo === 'No') {
                    finalSubmitBtn.innerText = 'Request Quote'
                    finalSubmitBtn.value = 'Request Quote'
                    openPopup()
                    showDateDetail(false)
                }
            })
        } 
    })

    makeStepActive(0)
    var stepTeleportBtns = mainForm.querySelectorAll('[step-active]')
    stepTeleportBtns.forEach(btn=>{
        var indexToMakeActive = btn.getAttribute('step-active')
        btn.addEventListener('click', ()=>{
            makeStepActive(indexToMakeActive)
        })
    })

})