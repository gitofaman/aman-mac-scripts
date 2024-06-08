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
    "Form Location": "https://peak-cleaning.webflow.io/booking-draft",
    "FirstName": "Test",
    "LastName": "Test",
    "Phone": "0987654321",
    "Email": "test@devtest.com",
    "HomeAddress1": "Test Address",
    "HomeSquareFeet": "23",
    "HomeBedrooms": "2",
    "HomeFullBathrooms": "2",
    "Frequency": "Recurring",
    "Notes": "this is a test please ignore."
}

pasteInputs(saveData)

