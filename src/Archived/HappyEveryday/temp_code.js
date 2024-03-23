
var personalizedData = Cookies.get('personalizedData') || false
var personalizedInput = document.getElementById('personalized_input')
if(!personalizedData) {
    Cookies.set('personalizedData', '{}')
    personalizedData = Cookies.get('personalizedData')
}

var personalizedJSON = JSON.parse(personalizedData)
// btns.forEach(btn=>{
//     btn.addEventListener('click',()=>{
//         personalizationFunc()
//     })
// })

function fillPersonalizationInField(productName, inputField) {
    if(productName in personalizedJSON) {
        inputField.value = personalizedJSON[productName]
    }
}

function updatePersonalizationInCookie(productName, personalization) {
    personalizedJSON[productName] = personalization;
    finalPersonalizedData = JSON.stringify(personalizedJSON)
    Cookies.set('personalizedData', finalPersonalizedData)
    console.log('updated')
}

function deletePersonalizationInCookie(productName) {
    delete personalizedJSON[productName]
    finalPersonalizedData = JSON.stringify(personalizedJSON)
    Cookies.set('personalizedData', finalPersonalizedData)
    console.log('deleted')
}

if(!!personalizedInput) {
    var pageProductName = document.querySelector('.product-name').innerText
    personalizedInput.addEventListener('keyup', (e)=>{
        var personalizedValue = e.target.value
        if(personalizedValue.length>0) {
            var productName = document.querySelector('.product-name').innerText;
            updatePersonalizationInCookie(productName, personalizedValue)
        } else {
            deletePersonalizationInCookie(pageProductName)
        }
    })
    fillPersonalizationInField(pageProductName, personalizedInput)
}