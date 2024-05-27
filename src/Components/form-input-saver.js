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
    "First-Name": "Dev",
    "Last-Name": "Test",
    "Phone": "0987654321",
    "name-2": "devtest@test.com",
    "Address": "21 Dev Test Street",
    "Square-Feet": "21m",
    "Number-of-Bedrooms": "3",
    "Number-of-Bathrooms": "2",
    "Frequency": "One Time",
    "Notes-Comments": "This is a dev test, please ignore"
}

pasteInputs(saveData)

