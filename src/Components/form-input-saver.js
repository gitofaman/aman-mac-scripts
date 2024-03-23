//to copy data
var formElement = $0
var namedInputs = formElement.querySelectorAll('[name]') 
var namedSaveData = {}
namedInputs.forEach(nameInput=>{
    namedSaveData[nameInput.name] = nameInput.value;
})
copy(namedSaveData)
//after the data is copied add it as saveData


//to paste data
var formElement = $0
var namedInputs = formElement.querySelectorAll('[name]') 
function pasteInputs(data) {
    namedInputs.forEach(namedInput=>{
        namedInput.value = data[namedInput.name]
    })
}

var saveData = {
    "name": "Customer Customer",
    "email": "customer@mastercard.com",
    "cardnum": "5555555555554444",
    "expmonth": "11",
    "expyear": "35",
    "cvc": "123"
}

pasteInputs(saveData)

