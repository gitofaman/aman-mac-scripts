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
    "medium": "",
    "Form Location": "https://mega-box.webflow.io/quote",
    "Latitude": "-33.8030827",
    "Longitude": "151.211041",
    "City": "Willoughby",
    "state": "New South Wales",
    "Country": "Australia",
    "Address": "1 Warners Avenue, Willoughby NSW, Australia",
    "First-Name": "Periscope",
    "Last-Name": "Test",
    "Phone": "97987878",
    "Email": "ptest@testp.com",
    "Location": "location",
    "Postcode": "2068",
    "Needed-Space": "4+ MegaBoxes",
    "Time-to Store": "6+ months",
    "service-you-are-after": "Premium Service",
    "Drop-Off Date": "",
    "Drop-Off-Time": "10:30 AM",
    "Is-it a booking?": ""
}

pasteInputs(saveData)

