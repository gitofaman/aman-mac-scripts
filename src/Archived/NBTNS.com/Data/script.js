function contains(parent, child) {
    //checks if an element is a child of parent
    return parent !== child && parent.contains(child);
  }
  
var radioOptionFormContainer = document.getElementById('radio-options-container')
var radioOptionHiddenContainer = document.getElementById('radio-option-hidden-container')

function removeRadioOption(block) {
    block.style.display = 'none'
    $(block).appendTo(radioOptionHiddenContainer)
}

function addRadioOption(block) {
    block.style.display = 'block'
    $(block).appendTo(radioOptionFormContainer)
}

var radioBtnOne = document.getElementById('radio1')
var radioBtnTwo = document.getElementById('radio2');
var radioOptionOneBlock = document.querySelector('.radio-option-1-fields');
var radioOptionTwoBlock = document.querySelector('.radio-option-2-fields');
radioOptionTwoBlock.style.display = 'none';
radioOptionOneBlock.style.display = 'none';

function refreshDependentInputs () {
    var dominantInputs = document.querySelectorAll('[dependent-change]')

    dominantInputs.forEach(dominantInput=>{
        function updateInputOnChange() {
            var dependentInput = document.querySelector(`[dependent-change-input="${dominantInput.getAttribute('dependent-change')}"]`)
            if(dominantInput.value.toLowerCase() !== 'yes') {
                dependentInput.setAttribute('price-cannot-change', 'true')
            } else {
                dependentInput.removeAttribute('price-cannot-change')
            }
            if(contains(radioOptionOneBlock, dependentInput)) {
                priceUpdateWithInput(dependentInput, radioOptionOneBlock)
            } else {
                priceUpdateWithInput(dependentInput, radioOptionTwoBlock)
            }
        }
        dominantInput.addEventListener('change', ()=>{
            updateInputOnChange()
        })
        updateInputOnChange()
    })
}

radioBtnOne.addEventListener('click', ()=>{
    addRadioOption(radioOptionOneBlock)
    removeRadioOption(radioOptionTwoBlock)
    refreshDependentInputs()
})

radioBtnTwo.addEventListener('click', ()=>{
    addRadioOption(radioOptionTwoBlock)
    removeRadioOption(radioOptionOneBlock)
    refreshDependentInputs()
})

var changePrice = (priceChange, block) => {
    var priceValue = parseFloat(priceChange)
    var priceTexts = block.querySelectorAll('[aria-price]')
    var newPriceValue = 0;
    priceTexts.forEach(priceText=>{
        newPriceValue = parseFloat(priceText.innerText) + priceValue;
        priceText.innerText = newPriceValue
    })
    var priceInput = block.querySelector('[aria-price-input]')
    priceInput.value = newPriceValue
}

function priceUpdateWithInput(inputBlock, parentRadioBlock) {
    //removes the amount if it was added because of any options selected previously
    if(inputBlock.hasAttribute('price-change-options')) {
        var optionWithAmountIncrease = inputBlock.getAttribute('price-change-options')
        var amountToDecrese = - inputBlock.getAttribute(optionWithAmountIncrease)
        changePrice(amountToDecrese, parentRadioBlock)
        inputBlock.removeAttribute('price-change-options')
    }
    //adds the amount if selected option is supposed to
    var selectedIndex = inputBlock.selectedIndex
    var optionName = `option${selectedIndex}`;
    var isPriceChangeDependent = inputBlock.getAttribute('price-cannot-change')
    if(!!isPriceChangeDependent) {
        return;
    }
    if(inputBlock.hasAttribute(optionName)) {
        var amountToIncrease = inputBlock.getAttribute(optionName)
        changePrice(amountToIncrease, parentRadioBlock)
        inputBlock.setAttribute('price-change-options', optionName)
    }
}

function priceChangeBlockFunction(block) {
    //setting the price and adding an input with price based on the block data
    var priceTexts = block.querySelectorAll('[aria-price]')
    priceTexts.forEach(priceText=>{
        var blockPriceValue = block.getAttribute('start-price-value')
        priceText.innerText = blockPriceValue
        var priceInput = document.createElement('input')
        priceInput.style.display = 'none'
        priceInput.value = blockPriceValue
        priceInput.setAttribute('aria-price-input','true')
        priceInput.setAttribute('disabled','true')
        priceInput.setAttribute('name','Quote-Price')
        block.appendChild(priceInput)
    })
    //price change funciton
    var priceChangeBlocks = Array.from(block.querySelectorAll('[price-change-block]'))
    priceChangeBlocks.forEach(priceChangeBlock=>{
        priceChangeBlock.addEventListener('change', (e)=>{
            priceUpdateWithInput(priceChangeBlock, block)
        })
    })
}

priceChangeBlockFunction(radioOptionOneBlock)
priceChangeBlockFunction(radioOptionTwoBlock)