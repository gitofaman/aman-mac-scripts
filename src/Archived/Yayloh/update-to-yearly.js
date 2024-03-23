var ymToggles = document.querySelectorAll('.toggle-text')
var calculatorToggle = document.querySelector('.text-block-15')
var switchSessions = (planBasePrices, priceForTenReturns, addOnPrices, isOfferActive) => {
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
updateToMonthly()

ymToggles[0].addEventListener('click', ()=> {
    updateToYearly()
})
ymToggles[1].addEventListener('click', ()=> {
    updateToMonthly()
})