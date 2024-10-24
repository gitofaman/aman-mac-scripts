// helper functions start --->
function mergeJSON(obj1, obj2) {
    var merged = {
        ...obj1,
        ...obj2
    };
    return merged;
}
function findValue(partialKey, jsonObj) {
    for (let key in jsonObj) {
        if (key.includes(partialKey)) {
            return jsonObj[key];
        }
    }
    return null; // Return null if no matching key is found
}
var updateVisibility = (arrEl, blockOrNone) => {
    arrEl.forEach(el => {
        el.style.display = blockOrNone;
    })
}
function findKeyMatchingString(inputString, jsonObj) {
    for (let key in jsonObj) {
        if (key.includes(inputString)) {
            return key;
        }
    }
    return null; // Return null if no match is found
}
var showPromotion = (arg, numberOfMegaboxes) => {
    if(arg) {
        updateVisibility(promotionTextEl, '')
        console.log(numberOfMegaboxes)
        updateText(numberOfMegaboxes*99, promotionPriceEl)
    } else {
        updateVisibility(promotionTextEl, 'none')
    }
} 
// helper functions end --->

var adminFee = 50



var updateUserForm = (fieldsJson, attr) => {
    var form = document.querySelector(`[${attr}]`)
    // Iterate through the fieldsJson object
    if(!!form.querySelector('[added-text]')) {
        form.querySelector('[added-text]').remove()
    }
    if(!!form.querySelector('[added-email]')) {
        form.querySelector('[added-email]').remove()
    }

    var mName = fieldsJson.customerName
    var mEmail = fieldsJson.customerEmail
    var mNumber = fieldsJson.phone
    var mSpace = fieldsJson.neededSpace
    var mStorage = fieldsJson.timeToStore
    var mMonthPrice = fieldsJson['monthly-rate']
    var mTotalPrice = fieldsJson['total-price']



    var message;

    if(parseInt(mStorage) > 2) {
        var actualMonthlyPrice = mMonthPrice;
        mMonthPrice = `${99 * parseInt(mSpace)} for First 3 Months, then $${actualMonthlyPrice}/Month`
    }

    if(attr === 'dlr-form') {
        var mAddress = fieldsJson.address
        var mDeliveryPrice = fieldsJson['delivery-rate']
        var mReDeliveryPrice = fieldsJson['redelivery-rate']
        var mService = fieldsJson.serviceYouAreAfter
        var mServicePrice = fieldsJson['service-price']
        // var mZonePrice = fieldsJson['zone-fee']



        message = 
        `
        Name: ${mName}
        Email: ${mEmail} 
        Mobile Number: ${mNumber}
        Address: ${mAddress}
        Space Required: ${mSpace}
        Storage Duration: ${mStorage}
        Service: ${mService}
        Delivery Type: To Door
        Per Month Price: $${mMonthPrice}
        Delivery Price: $${mDeliveryPrice}
        Re Delivery Price: $${mReDeliveryPrice}
        Service Price: $${mServicePrice}
        Admin Fee: $${adminFee}
        Total Price Upfront: $${mTotalPrice}`
    } else {
        message = 
        `
        Name: ${mName}
        Email: ${mEmail} 
        Mobile Number: ${mNumber}
        Space Required: ${mSpace}
        Storage Duration: ${mStorage}
        Delivery Type: Self Move
        Per Month Price: $${mMonthPrice}
        Admin Fee: $${adminFee}
        Total Price Upfront: $${mTotalPrice}`
    }
    console.log(message)


    var quoteTextArea = document.createElement('textarea')
    quoteTextArea.setAttribute('disabled', 'true')
    quoteTextArea.setAttribute('name', 'Quote Data')
    quoteTextArea.setAttribute('added-text', 'true')
    quoteTextArea.style.height = '300px'
    quoteTextArea.style.resize = 'vertical'
    quoteTextArea.innerHTML = message
    form.appendChild(quoteTextArea)
    var emailField = document.createElement('input')
    emailField.setAttribute('disabled', 'true')
    emailField.setAttribute('name', 'Customeremail')
    emailField.setAttribute('added-email', 'true')
    emailField.value = mEmail
    form.appendChild(emailField)
}

var boxPrices = [{
        "monthly-rate": 179,
        "delivery-rates": [{
            "delivery-rate": 349,
            "redelivery-rate": 349
        }, {
            "delivery-rate": 349,
            "redelivery-rate": 349
        }, {
            "delivery-rate": 0,
            "redelivery-rate": 349
        }]
    }, //1megabox
    {
        "monthly-rate": 338,
        "delivery-rates": [{
            "delivery-rate": 549,
            "redelivery-rate": 549
        }, {
            "delivery-rate": 549,
            "redelivery-rate": 549
        }, {
            "delivery-rate": 0,
            "redelivery-rate": 549
        }]
    }, //2megabox
    {
        "monthly-rate": 477,
        "delivery-rates": [{
            "delivery-rate": 749,
            "redelivery-rate": 749
        }, {
            "delivery-rate": 749,
            "redelivery-rate": 749
        }, {
            "delivery-rate": 0,
            "redelivery-rate": 749
        }]
    }, //3megabox
    {
        "monthly-rate": 636,
        "delivery-rates": [{
            "delivery-rate": 949,
            "redelivery-rate": 949
        }, {
            "delivery-rate": 949,
            "redelivery-rate": 949
        }, {
            "delivery-rate": 0,
            "redelivery-rate": 949
        }]
    }, //4megabox
]

var zonePrices = [{
        "zone": 1,
        "kmStartRange": 0,
        "kmEndRange": 5,
        "charge": 0
    }, //zone:1
    {
        "zone": 2,
        "kmStartRange": 5.1,
        "kmEndRange": 10,
        "charge": 50
    }, //zone:2
    {
        "zone": 3,
        "kmStartRange": 10.1,
        "kmEndRange": 15,
        "charge": 75
    }, //zone:3
    {
        "zone": 4,
        "kmStartRange": 15.1,
        "kmEndRange": 20,
        "charge": 100
    }, //zone:4
    {
        "zone": 5,
        "kmStartRange": 20.1,
        "kmEndRange": 50,
        "charge": 125
    } //zone:5
]

// to show prices values
var tpEl = document.querySelectorAll('[tp]') // to show total price
var paceEl = document.querySelectorAll('[pace]') //to show space name
var dlEl = document.querySelectorAll('[dl]') // to show delivery rate
var rdlEl = document.querySelectorAll('[rdl]') // to show redelivery rate
var zoneEl = document.querySelectorAll('[zone]') //to show zone fee added caution
var mrEl = document.querySelectorAll('[mr]') //to show monthly rates
var zoneFeeEl = document.querySelectorAll('[zone-fee]') //to show zone fee
var monthsEl = document.querySelectorAll('[nm]') //to show number of months
var zoneCodeEl = document.querySelectorAll('[zone-code]') // to show zone code
var servicePriceEl = document.querySelectorAll('[sp]') // to show service price
var serviceNameEl = document.querySelectorAll('[snm]') // to show service price
var totalTextEl = document.querySelectorAll('[tt]') // to change total text
var promotionTextEl = document.querySelectorAll('[promotion]') //to show promotion text
var promotionPriceEl = document.querySelectorAll('[p-price]') //to show number of free months



var updateText = (textToWrite, arrEl) => {
    if (textToWrite === 0) {
        textToWrite = 'Free'
    }
    arrEl.forEach(el => {
        el.innerText = textToWrite;
    })
}


var newValuesObj;

var servicePrices = [0, 99, 149, 450]



function getRadioInputValues(inputName, formName) {
    console.log(formName)
    var form = document.querySelector(`[name=${formName}]`)
    const radioInputs = form.querySelectorAll(`input[type="radio"][name="${inputName}"]`);
    const values = [];

    radioInputs.forEach((input) => {
        values.push(input.value);
    });

    return values;
}

function findValuesByForm(nameToFind, jsonArray) {
    for (let i = 0; i < jsonArray.length; i++) {
        if (jsonArray[i].name === nameToFind) {
            return jsonArray[i].values;
        }
    }
    return null; // Return null if the name is not found
}



var showPrice = (arg) => {
    var tpParentEl = []
    tpEl.forEach(tp=>{
        tpParentEl.push(tp.parentElement)
    })
    if(arg) {
        updateVisibility(tpParentEl, '')
        updateText('Total', totalTextEl)
    } else {
        updateVisibility(tpParentEl, 'none')
        updateText('Total Payable Upfront', totalTextEl)
    }
}

function zoneAndPrice(postcodeCode) {
    // Find the zone number based on the postcode code
    const postcodeZone = postcodeZones.find((zoneData) => zoneData.code === parseInt(postcodeCode));

    if (!postcodeZone) {
        return "Postcode code not found in the postcodeZones array.";
    }

    const zoneNumber = postcodeZone.zone;

    // Find the price based on the zone number
    const priceData = zonePrices.find((zoneData) => zoneData.zone === zoneNumber);

    if (!priceData) {
        return "Zone number not found in the zonePrices array.";
    }

    return {
        'price': priceData.charge,
        'zone': zoneNumber
    };
}

function pricingCalculator(service, neededSpace, timeToStore, postcode, valuesObj, formName) {
    var codePriceZone = zoneAndPrice(postcode)
    var postCodePrice = codePriceZone.price
    var spaceInputName = findKeyMatchingString('pace', valuesObj)
    var spaces = getRadioInputValues(spaceInputName, formName)
    var storeTimeInputName = findKeyMatchingString('tore', valuesObj)
    var storeTimes = getRadioInputValues(storeTimeInputName, formName)
    var serviceInputName = findKeyMatchingString('ervice', valuesObj)
    var services = getRadioInputValues(serviceInputName, formName)
    var servicePrice = 0
    var spaceIndex = spaces.indexOf(neededSpace) // 0 means 1megabox, 1 means 2megabox etc
    var storeIndex = storeTimes.indexOf(timeToStore) // 0 means 0-5 months, 1 means 6-12, 2 means more than 12
    var serviceIndex = services.indexOf(service) // 0 means drop off, 1 means wait service, 2 means one man service, 3 means premium service


    if (spaceIndex >= 0 && storeIndex >= 0 && serviceIndex >= 0) {
        var numberOfMegaboxes = spaceIndex + 1

        var monthlyRate, zoneFee;
        var totalPrice = 0
        monthlyRate = boxPrices[spaceIndex]["monthly-rate"];
        if (serviceIndex === 0) {
            zoneFee = postCodePrice * numberOfMegaboxes;
        } else {
            zoneFee = (postCodePrice * ((numberOfMegaboxes - numberOfMegaboxes % 2) / 2));
            servicePrice = servicePrices[serviceIndex] * numberOfMegaboxes
            if(serviceIndex === 3) {
                // for premium service, the price is expected to be 450 for first megabox and 180 for additionals so
                servicePrice = servicePrices[serviceIndex] + (numberOfMegaboxes - 1)*180
            }
            // for services other than drop off, truck can take 2 megaboxes so, postcodePrice is supposed to be multiplied in that manner.
            // service price is expected to be multiplied by number of megaboxes.
        }
        //zone fee is set 0 as of 16 oct according to client request to not include this, 
        //just removing the zone fee = 0 code as below will revert it to show zone fee
        // also show this in the updateUserForm
        zoneFee = 0
        var moveRates = boxPrices[spaceIndex]["delivery-rates"][storeIndex]
        var deliveryRate = moveRates["delivery-rate"]
        var redeliveryRate = moveRates["redelivery-rate"]

        if(serviceIndex>0) { //if selected service is not drop off then no delivery or redelivery charge
            deliveryRate = 0
            redeliveryRate = 0
        }

        var numOfMonths = 1
        if (storeIndex > 0) {
            numOfMonths = storeIndex * 6;
        }
        
        totalPrice = monthlyRate + zoneFee + deliveryRate + redeliveryRate + adminFee + servicePrice;

        return {
            "zone": codePriceZone.zone || 0,
            "monthly-rate": monthlyRate,
            "months": numOfMonths,
            "zone-fee": zoneFee || 0,
            "service-index": serviceIndex,
            "delivery-rate": deliveryRate,
            "redelivery-rate": redeliveryRate,
            "total-price": totalPrice,
            "service-price": servicePrice,
            "store-index": storeIndex,
            "admin-fee": adminFee
        }
    } else {
        return false;
    }
}

function pricingCalculatorSelf(neededSpace, timeToStore, valuesObj, formName) {
    var spaceInputName = findKeyMatchingString('pace', valuesObj)
    var spaces = getRadioInputValues(spaceInputName, formName)
    var storeTimeInputName = findKeyMatchingString('tore', valuesObj)
    var storeTimes = getRadioInputValues(storeTimeInputName, formName)
    var spaceIndex = spaces.indexOf(neededSpace) // 0 means 1megabox, 1 means 2megabox etc
    var storeIndex = storeTimes.indexOf(timeToStore) // 0 means 0-5 months, 1 means 6-12, 2 means more than 12

    if (spaceIndex >= 0 && storeIndex >= 0) {
        var totalPrice = 0
        monthlyRate = boxPrices[spaceIndex]["monthly-rate"];

        var numOfMonths = 1
        if (storeIndex > 0) {
            numOfMonths = storeIndex * 6;
        }
        totalPrice = monthlyRate + adminFee

        return {
            "monthly-rate": monthlyRate,
            "months": numOfMonths,
            "total-price": totalPrice,
            "store-index": storeIndex,
            "admin-fee": adminFee
        }
    } else {
        return false;
    }
}


var updatePrice = (formName) => {
    var jsonDataToSend = {};
    var valuesObj = findValuesByForm(formName, savedFormDatas)
    newValuesObj = valuesObj;
    var postcode = findValue('code', valuesObj)
    var neededSpace = findValue('pace', valuesObj)
    var timeToStore = findValue('tore', valuesObj)
    var numberOfMegaboxes = parseInt(neededSpace)
    var serviceYouAreAfter = findValue('ervice', valuesObj)
    jsonDataToSend.neededSpace = neededSpace
    jsonDataToSend.timeToStore = timeToStore
    jsonDataToSend.phone = findValue('hone', valuesObj)
    jsonDataToSend.customerName = findValue('ame', valuesObj) + ' ' + findValue('ast-', valuesObj)
    jsonDataToSend.customerEmail = findValue('mail', valuesObj)
    jsonDataToSend['date'] = findValue('')
    var selectedStoreIndex = 0;
    if (!!serviceYouAreAfter) {
        var priceData = pricingCalculator(serviceYouAreAfter, neededSpace, timeToStore, postcode, valuesObj, formName)
        jsonDataToSend.postcode = postcode
        jsonDataToSend.serviceYouAreAfter = serviceYouAreAfter;
        jsonDataToSend.address = findValue('ddress', valuesObj)
        jsonDataToSend = mergeJSON(jsonDataToSend, priceData);
        updateUserForm(jsonDataToSend, 'dlr-form')
        if (priceData) {
            var deliveryRate, redeliveryRate, serviceRate;
            if (priceData["delivery-rate"] > 0) {
                deliveryRate = '$' + priceData["delivery-rate"]
            } else {
                deliveryRate = 0
            }
            if (priceData["redelivery-rate"] > 0) {
                redeliveryRate = "$" + priceData["redelivery-rate"]
            } else {
                redeliveryRate = 0
            }
            if (priceData['service-price'] > 0) {
                serviceRate = "$" + priceData['service-price']
            } else {
                serviceRate = 0
            }
            updateText(priceData["monthly-rate"], mrEl)
            updateText(priceData["zone-fee"], zoneFeeEl)
            if (priceData["zone-fee"] > 0) {
                updateText(priceData["zone-fee"], zoneFeeEl)
                updateText(priceData['zone'], zoneCodeEl)
                updateVisibility(zoneEl, 'block')
            } else {
                updateVisibility(zoneEl, 'none')
            }
            updateText(deliveryRate, dlEl)
            updateText(redeliveryRate, rdlEl)
            updateText(priceData["months"], monthsEl)
            updateText(neededSpace, paceEl)
            updateText(priceData["total-price"], tpEl)
            updateText(serviceYouAreAfter, serviceNameEl)
            updateText(serviceRate, servicePriceEl)
            selectedStoreIndex = priceData['store-index']
        }
    } else {
        var priceData = pricingCalculatorSelf(neededSpace, timeToStore, valuesObj, formName)
        jsonDataToSend = mergeJSON(jsonDataToSend, priceData);
        updateUserForm(jsonDataToSend, 'self-form')
        if (priceData) {
            updateText(priceData["monthly-rate"], mrEl)
            updateText(priceData["months"], monthsEl)
            updateText(neededSpace, paceEl)
            updateText(priceData["total-price"], tpEl)
            selectedStoreIndex = priceData['store-index']
        }
    }

    // to make sure price doesn't show up for more than 1 month quote
    if(selectedStoreIndex > 0) {
        showPrice(false)
    } else {
        showPrice(true)
    }

    //to show promotion
    switch (selectedStoreIndex) {
        case 0: 
            showPromotion(false, numberOfMegaboxes)
            break;
        case 1:
            showPromotion(true, numberOfMegaboxes)
            break;
        case 2: 
            showPromotion(true, numberOfMegaboxes)
        default:
            break;
    }
}

//postcode
//megabox space
//storing time
//services that you're being offered

var savedFormDatas = []
var allFormsToSave = Array.from(document.querySelectorAll('[save-forms]'))

function updateSavedData(formName, values) {
    const existingFormIndex = savedFormDatas.findIndex(item => item.name === formName);

    if (existingFormIndex !== -1) {
        savedFormDatas[existingFormIndex].values = {
            ...savedFormDatas[existingFormIndex].values,
            ...values
        };
    }
    updatePrice(formName)
}

allFormsToSave.forEach(formToSave => {
    var formName = formToSave.getAttribute('name')
    var formInSavedDatas = false;
    var savedData = {}
    savedData.name = formName
    // Function to update the formInputValues object
    function updateFormInputValues() {
        const formInputValues = {};
        const inputs = formToSave.elements;

        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            const inputName = input.name;

            if (input.type === 'radio') {
                if (input.checked) {
                    formInputValues[inputName] = input.value;
                }
            } else if (input.type === 'checkbox') {
                formInputValues[inputName] = input.checked;
            } else {
                formInputValues[inputName] = input.value;
            }
        }
        if (!formInSavedDatas) {
            formInSavedDatas = true;
            savedData.values = formInputValues;
            savedFormDatas.push(savedData)
        } else {
            savedData.values = formInputValues
            updateSavedData(formName, savedData)
        }
    }

    // Function to handle input changes
    function handleInputChange(event) {
        updateFormInputValues();
    }

    // Attach change event listeners to form inputs
    formToSave.addEventListener('change', handleInputChange);

    // Initialize formInputValues
    updateFormInputValues();
})