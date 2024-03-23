// FIRST BLOCK STARTS //
var numberOfTimesActivateBest = 0;
var planBlockAttrs = {
    basePrice: 'base-price',
    baseReturns: 'base-returns',
    tenReturnsPrices: 'ten-returns-prices',
    planChilds: {
        planPrice: 'aria-plan-price',
        tenReturnsPrice: 'ten-returns-price',
        addOnPriceText: 'aria-addon-price'
    }
}

var calChildAttrs = {
    dataIsOf: 'addon-data-is-of',
    dataFor: 'data-for',
    prices: 'addon-prices',
    returnsValue: 'aria-range-value',
    possibleDataFor: ['addOn', 'CMS']
}

var customClasses = {
    planActive: 'is--active'
}

var planChoiceBlocks; //use array from
planChoiceBlocks = Array.from(document.querySelectorAll('[base-price]'))
var cmsChoices = []
document.querySelectorAll(`[${calChildAttrs.dataFor}=${calChildAttrs.possibleDataFor[1]}]`).forEach(cms=>{
    cmsChoices.push(cms.parentElement.querySelector('.w-form-label').innerText)
})

var calculatorBlock = document.querySelector('[yayloh-calculator]')

var userBestPlan = (addOns, CMS, returns) => {
    var bestPlanIndex = 0;
    //first applying the basic returns condition
    if(returns <= 50) {
        bestPlanIndex = 0
    } else if (returns>50 && returns<=400) {
        bestPlanIndex = 1
    } else if (returns>400 && returns< 1000) {
        bestPlanIndex = 2
    } else {
        bestPlanIndex = 3
    }
    //if CMS is not shopify and selected plan is still start bright, then user will have to go to atleast Grow Smarter and
    //this next condition makes sure that is the case
    if(CMS.length) {
        CMS.forEach(eachCMS=>{
            if(cmsChoices.indexOf(eachCMS) > 0 && bestPlanIndex === 0) {
                bestPlanIndex = 1
            }
            if(cmsChoices.indexOf(eachCMS) === 2) {
                bestPlanIndex = null;
            }
        })
    }
    //addOns > 1 then no possibility of start bright
    if(addOns.includes('wms') && bestPlanIndex === 0) {
        bestPlanIndex = 1;
    }
    return bestPlanIndex;
}

var setPrice = (planBlock, priceToBeAssigned) => {
    planBlock.querySelectorAll(`[${planBlockAttrs.planChilds.planPrice}]`).forEach(planPrice=>{
        planPrice.innerText = priceToBeAssigned;
    })
}

var resetOtherPlanBlocks = (reqPlanBlock) => {
    planChoiceBlocks.forEach(planBlock => {
        if(planBlock !== reqPlanBlock) {
            var thisPlanIndex = planChoiceBlocks.indexOf(planBlock)
            planBlock.classList.remove(customClasses.planActive)
            var resettedPrice = 0;
            planBlockBasePrice = parseInt(planBlock.getAttribute(planBlockAttrs.basePrice))
            resettedPrice += planBlockBasePrice
            var currentPlanAddons = planBlock.querySelectorAll(`[${calChildAttrs.dataIsOf}]`)
            currentPlanAddons.forEach(addOn=>{
                if(addOn.checked) {
                    var currentAddOnName = addOn.getAttribute(`${calChildAttrs.dataIsOf}`)
                    resettedPrice +=  addOnPrice(currentAddOnName, thisPlanIndex);
                }
            })          
            setPrice(planBlock, resettedPrice)
        }
    })
}

var addOnPrice = (addOnName, planIndex) => {
    var currenAddOnPrice = 0;
    if(addOnName !== null) {
        var currentAddOnBlock = calculatorBlock.querySelector(`[${calChildAttrs.dataIsOf}="${addOnName}"]`)
        var addOnPrices = currentAddOnBlock.getAttribute(calChildAttrs.prices).split(',')
        currenAddOnPrice = parseInt(addOnPrices[planIndex])
    }
    return currenAddOnPrice;
}

var tenReturnPrice = (planIndex, numberOfAddons) => {
    var tenReturnPrices = planChoiceBlocks[planIndex].getAttribute(planBlockAttrs.tenReturnsPrices).split(',')
    return parseInt(tenReturnPrices[numberOfAddons])
}

var deactivateAll = () => {
    planChoiceBlocks.forEach(planBlock=>{
        planBlock.classList.remove(customClasses.planActive)
    })
}

var activateTheBestPlanFromData = (addOns, CMS, returns) => {
    var requestedPlanIndex = userBestPlan(addOns, CMS, returns)
    if(requestedPlanIndex === null) {
        deactivateAll()
    } else {
        var requestedPlanBlock = planChoiceBlocks[requestedPlanIndex];
        //add the class for best plan
        requestedPlanBlock.classList.add(customClasses.planActive)
        //set the price 
        //price setting is for first three blocks only
        if(requestedPlanIndex !== 3) {
            var finalPrice = 0
            var basePrice = parseInt(requestedPlanBlock.getAttribute(planBlockAttrs.basePrice));
            finalPrice += basePrice;
            addOns.forEach(addOnName=> {
                finalPrice += addOnPrice(addOnName, requestedPlanIndex)
            })
            var baseReturns = parseInt(requestedPlanBlock.getAttribute(planBlockAttrs.baseReturns))
            
            //price for extra return is dependent on addon and plan
            var priceForExtraTenReturn = parseInt(tenReturnPrice(requestedPlanIndex, addOns.length))
            var extraReturns = 0;
            returns = parseInt(returns)
            if(returns>baseReturns) {
                extraReturns = returns - baseReturns
            } else {
                extraReturns = 0;
            }
            var totalExtraReturnPrice = (extraReturns * priceForExtraTenReturn)/10;
            finalPrice += totalExtraReturnPrice;
            setPrice(requestedPlanBlock, finalPrice)
            //turn on the toggles based on the addon
            var toggles = requestedPlanBlock.querySelectorAll(`[${calChildAttrs.dataIsOf}]`)
            toggles.forEach(toggle=>{
                var toggleDataIsOf = toggle.getAttribute(calChildAttrs.dataIsOf)
                if(addOns.includes(toggleDataIsOf)) {
                    if(!toggle.checked) {
                        toggle.checked = true;
                    }
                } else {
                    if(toggle.checked) {
                        toggle.checked = false;
                    }
                }
            })
            //update plan ten return price
            updatePlanTenReturnPrice(requestedPlanIndex)
        } 
        //reset the other plans
        resetOtherPlanBlocks(requestedPlanBlock)
    }

    //to show most popular
    if(numberOfTimesActivateBest<=2) {
        planChoiceBlocks.forEach(planBlock=>{
            planBlock.classList.remove('is--active')
        })
        planChoiceBlocks[2].classList.add('is--popular')
    } else {
        planChoiceBlocks[2].classList.remove('is--popular')
    }
    numberOfTimesActivateBest++;
}

//get slider data
var getSliderReturns = () => {
    return calculatorBlock.querySelector(`[${calChildAttrs.returnsValue}]`).innerText
}

var activateTheBestPlan = () => {
    //Get Data from Calculator
    var addOns, CMS, returns;
    addOns = []
    CMS = []
    returns = 0;
    checkboxes = calculatorBlock.querySelectorAll('input[type="checkbox"], input[type="radio"]')
    checkboxes.forEach(checkBox=>{
        var dataFor = checkBox.getAttribute(calChildAttrs.dataFor)
        if(checkBox.checked && dataFor === calChildAttrs.possibleDataFor[0]) { //0 index is for addOn here
            addOns.push(checkBox.getAttribute(calChildAttrs.dataIsOf))
        }
        if(checkBox.checked && dataFor === calChildAttrs.possibleDataFor[1]) { //1 index is for CMS here
            CMS.push(checkBox.parentElement.querySelector('.w-form-label').innerText)
        }
    })
    returns = getSliderReturns();
    //Set Price of Best Plan
    activateTheBestPlanFromData(addOns, CMS, returns)
}

var updatePlanTenReturnPrice = (planIndex) => {
    var currentPlan = planChoiceBlocks[planIndex]
    var checkBoxes = currentPlan.querySelectorAll('input[type="checkbox"]')
    var numberOfAddons = 0
    checkBoxes.forEach(cbox=>{
        if(cbox.checked) {
            numberOfAddons++;
        }
    })
    currentPlan.querySelector(`[${planBlockAttrs.planChilds.tenReturnsPrice}]`).innerText = tenReturnPrice(planIndex, numberOfAddons)
}
// FIRST BLOCK ENDS //
















// SECOND BLOCK STARTS //

//events that will happen on clicking toggles inside plan block.
planChoiceBlocks.forEach(plan=>{
    var checkBoxes = plan.querySelectorAll('input[type="checkbox"]')
    var currentPlanIndex = planChoiceBlocks.indexOf(plan)
    checkBoxes.forEach(checkBox=>{
        checkBox.addEventListener('click', ()=>{
            var isPlanActive = plan.classList.contains(customClasses.planActive)
            if(isPlanActive) { //clicks on the related toggle of calculator if best plan
                var currectCheckBoxDataIsOf = checkBox.getAttribute(calChildAttrs.dataIsOf)
                var toggleToTrigger = calculatorBlock.querySelector(`[${calChildAttrs.dataIsOf}="${currectCheckBoxDataIsOf}"]`)
                if(checkBox.checked !== toggleToTrigger.checked) {
                    toggleToTrigger.click()
                }
            } else { //increases the price if not the best plan
                var basePrice = parseInt(plan.getAttribute(planBlockAttrs.basePrice));
                var finalPrice = 0;
                finalPrice += basePrice
                checkBoxes.forEach(cbox=>{
                    if(cbox.checked) {
                        var currenAddOnName = checkBox.getAttribute(calChildAttrs.dataIsOf);
                        var currentPlanIndex = planChoiceBlocks.indexOf(plan);
                        finalPrice += addOnPrice(currenAddOnName, currentPlanIndex)
                    }
                })
                setPrice(plan, finalPrice)
            }
        })
        checkBox.addEventListener('change', ()=>{
            updatePlanTenReturnPrice(currentPlanIndex)
        })
    })
})

//things that will effect plan choice - range slider
calculatorBlock.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(cbox=>{
    cbox.addEventListener('click', activateTheBestPlan)
})


document.querySelectorAll('.cminput').forEach(cmInput=>{
    var inputField = cmInput.querySelector('input')
    var increaseBtn = cmInput.querySelector('[increase]')
    var decreaseBtn = cmInput.querySelector('[decrease]')
    var correspondingPlanBlock = cmInput.closest('.section-custom-module-parent').querySelector('[base-price]')
    correspondingPlanBlock.setAttribute('added-modules-price', '0')
    inputField.setAttribute('disabled', '')
    var updateInputValue = (inputValue, toAdd) => {
        inputField.value = inputValue + toAdd;
        var basePrice = parseInt(correspondingPlanBlock.getAttribute('base-price'))
        var factorToMultiply = 1
        if(planChoiceBlocks.indexOf(correspondingPlanBlock) === 2) {
            factorToMultiply = 0.8
        }
        var addingModulePrice = factorToMultiply * parseInt(inputField.value)
        var addedModulePrice = parseInt(correspondingPlanBlock.getAttribute('added-modules-price'))
        var finalBasePrice = basePrice + addingModulePrice - addedModulePrice
        correspondingPlanBlock.setAttribute('added-modules-price', addingModulePrice)
        correspondingPlanBlock.setAttribute('base-price', finalBasePrice)
        activateTheBestPlan()
    }
    increaseBtn.addEventListener('click', ()=>{
        var inputValue;
        if (inputField.value.length === 0) {
            inputField.value = 0
        }
        inputValue = parseInt(inputField.value)
        updateInputValue(inputValue, 10)
    })
    decreaseBtn.addEventListener('click', ()=>{
        var inputValue;
        if (inputField.value.length === 0) {
            inputField.value = 0
        }
        inputValue = parseInt(inputField.value)
        if(inputValue !== 0) {
            updateInputValue(inputValue, -10)
        }
    })
})

// SECOND BLOCK ENDS //

















// THIRD BLOCK STARTS
var ranger = document.querySelector('[aria-ranger]')


var rangeValue = ranger.querySelector('[aria-range-value]')
var rangeFiller = ranger.querySelector('[aria-range-filler]')
var rangeInput = ranger.querySelector('[aria-range-input]')
var rangerImage = ranger.querySelector('.custom-range-end-image')
var modifySliderWithPercentValues = (percent) => {
    rangeValue.innerText = percent*10;
    rangeFiller.style.width = percent + '%';
    rangeValue.parentElement.style.left = - percent*2 + '%';
    rangerImage.style.right = percent/100 - 1 + 'em'; 
    activateTheBestPlan()
}
rangeInput.addEventListener('click', (e)=>{
    modifySliderWithPercentValues(e.target.value)
})
rangeInput.addEventListener('mousemove', (e)=>{
    modifySliderWithPercentValues(e.target.value)
})

modifySliderWithPercentValues(rangeInput.value)
ranger.addEventListener('touchmove', function(event) {
    var x = event.touches[0].clientX - 65
    var width = ranger.getBoundingClientRect().width
    var percent = Math.round(x*100/width)
    if(percent>100) {
        percent = 100
    } else if (percent < 0){
        percent = 0
    }
    modifySliderWithPercentValues(percent)
})
// THIRD BLOCK ENDS















// FOURTH BLOCK STARTS
var ymToggles = document.querySelectorAll('.toggle-text')
var calculatorToggle = document.querySelector('.text-block-15')
var switchSessions = (planBasePrices, priceForTenReturns, addOnPrices, isOfferActive) => {
    numberOfTimesActivateBest = 1;
    var addOnBlocks = document.querySelectorAll('[addon-prices]')
    addOnBlocks.forEach(addOn=>{
        addOn.setAttribute('addon-prices', addOnPrices.join(', '))
    })
    planChoiceBlocks.forEach(planBlock => {
        var currentPlanIndex = planChoiceBlocks.indexOf(planBlock)
        if(currentPlanIndex!==3) {
            var planTenReturnsArray = priceForTenReturns[currentPlanIndex]
            console.log(planTenReturnsArray)
            planBlock.setAttribute(planBlockAttrs.tenReturnsPrices, planTenReturnsArray.join(', '))
            planBlock.setAttribute(planBlockAttrs.basePrice, planBasePrices[currentPlanIndex])
            var addOnPriceBlocks = planBlock.querySelectorAll(`[${planBlockAttrs.planChilds.addOnPriceText}]`)
            addOnPriceBlocks.forEach(addOnPriceBlock=>{
                addOnPriceBlock.innerText = addOnPrices[currentPlanIndex]
            })
        }
    })
    if(parseInt(calculatorBlock.style.opacity)) { //if open, close
        calculatorToggle.click()
    }

    //updating the plans
    activateTheBestPlan()
    modifySliderWithPercentValues(5)
    //
    if(isOfferActive) {
        document.querySelector('.pricing-offer').classList.add('is--active')
    } else {
        document.querySelector('.pricing-offer').classList.remove('is--active')
    }
}

//update to yearly - what will change - 1. Base Price, 2. Ten Returns Price for Addons
var updateToYearly = () => {
    var planBasePrices = [50, 160, 375, 1100]
    var priceForTenReturns = [[15, 20], [10, 13, 16], [5, 8, 11]]
    var addOnsPrices = [20, 65, 125]
    switchSessions(planBasePrices, priceForTenReturns, addOnsPrices, true)
    activateAToggle(0)
}

var updateToMonthly = () => {
    var planBasePrices = [60, 190, 450, 1200]
    var priceForTenReturns = [[15, 20], [10, 14, 18], [5, 8, 11]]
    var addOnsPrices = [25, 80, 150]
    switchSessions(planBasePrices, priceForTenReturns, addOnsPrices, false)
    activateAToggle(1)
}

var activateAToggle = (givenIndex) => {
    ymToggles.forEach(ymToggle=>{
        ymToggle.classList.remove('active')
    })
    ymToggles[givenIndex].classList.add('active')
}

ymToggles[0].addEventListener('click', ()=> {
    updateToYearly()
})
ymToggles[1].addEventListener('click', ()=> {
    updateToMonthly()
})
// FORTH BLOCK ENDS

updateToMonthly()