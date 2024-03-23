//show input only if the product has personalization applied
var cartWrapper = document.querySelector('.cart-wrapper')
function cartOpens() {
    var cartItems = document.querySelectorAll('.cart-item')
    cartItems.forEach(cartItem=>{
        cartProdName = cartItem.querySelector('.cart-product-name').innerText
        var cartInputField = cartItem.querySelector('.cart_personalized_input')
        cartInputField.addEventListener('keyup', (e)=>{
            var cartInputFieldValue = e.target.value
            if(!!pageProductName) {
                if(cartProdName===pageProductName) {
                    personalizedInput.value = cartInputFieldValue
                }
            }
            if(cartInputFieldValue.length>0) {
                updatePersonalizationInCookie(cartProdName, cartInputFieldValue)
            } else {
                deletePersonalizationInCookie(cartProdName)
            }
        })
        if(cartProdName in personalizedJSON) {
            cartInputField.parentElement.style.display = 'block'
        } else {
            cartInputField.parentElement.style.display = 'none'
        }
        fillPersonalizationInField(cartProdName, cartInputField)
    })
    //updating the text in personalization field will update the personalization
    
    //opening the cart will update the personalization again
}

//delete personalization based on what user's cart contains

var cartProdList = document.querySelector('.cart-list')
const cartProductsObserver = new MutationObserver(mutations=>{
    var cartProductsNames = []
    cartProdList.querySelectorAll('.cart-product-name').forEach(prod=>{
        cartProductsNames.push(prod.innerText)
    })
    for(var productName in personalizedJSON) {
        //if product is in personalized but not in cart anymore, then delete the personalization
        if(!cartProductsNames.includes(productName)) {
            deletePersonalizationInCookie(productName)
            if(!!pageProductName) {
                if(pageProductName===productName) {
                    personalizedInput.value = ''
                }
            }
        }        
    }
})

cartProductsObserver.observe(cartProdList, { characterData: false, attributes: false, childList: true, subtree: false })

const observer = new MutationObserver(mutations =>{
    cartOpens()
})

observer.observe(cartWrapper, { characterData: false, attributes: true, childList: false, subtree: false })