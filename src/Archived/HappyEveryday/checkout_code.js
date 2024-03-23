var checkoutObserver = new MutationObserver(mutations=>{
    function updateNoteData() {
        var clientEndData = ''
        for(var prodName in personalizedJSON) {
            clientEndData += `${prodName} : ${personalizedJSON[prodName]} \n`
        }
        document.getElementById('note').value = clientEndData
    }
    var orderItems = document.querySelectorAll('.order-item')
    orderItems.forEach(orderItem =>{
        var orderItemName = orderItem.querySelector('.order-item-name').innerText
        var orderInputField = orderItem.querySelector('.order-input-field')
        if(orderItemName in personalizedJSON) {
            orderInputField.parentElement.style.display = 'block'
        } else {
            orderInputField.parentElement.style.display = 'none'
        }
        fillPersonalizationInField(orderItemName, orderInputField)
        orderInputField.addEventListener('keyup', e=>{
            var orderInputValue = e.target.value;
            if(orderInputValue.length>0) {
                updatePersonalizationInCookie(orderItemName, orderInputValue)
            } else {
                deletePersonalizationInCookie(orderItemName)
            }
            updateNoteData()
        })
    })
    
    updateNoteData()
})

checkoutObserver.observe(document.querySelector('.order-item-list'), { characterData: false, attributes: false, childList: true, subtree: false })