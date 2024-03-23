//PLEASE MAKE SURE YOU SELECT THE TBODY BEFORE PROCEEDING WITH THE CODE
//UPDATE FOR FUTURE - 1) AUTO TODAY DATE 2) AUTO TITLE CHANGE FOR PDF NAME CHANGE
var currentInvoiceNo = 61
var invoiceCounter = 1
var invoiceDataName = $0.querySelector('.css-1thp6wa')
var invoiceNumberEls = document.querySelectorAll('[data-selector="invoice-number-value"]')

var trDatas = [
    {
        "trName": "Fwd: Blueline Plumbing & Gas - Suburbs serviced [WEBSITE SUPPORT] - 926147956",
        "trPrice": "$40.00"
    },
    {
        "trName": "Fwd: Hero Plumbing Webflow - New Lead Email Form [WEBSITE SUPPORT] - 931081502",
        "trPrice": "$35.00"
    },
    {
        "trName": "HOTT Electrics - Buttons not working [WEBSITE SUPPORT] - 938707080",
        "trPrice": "$10.00"
    },
    {
        "trName": "Fwd: FW: Successfully unsubscribed from form notifications. [WEBSITE SUPPORT] - 941959043",
        "trPrice": "$15.00"
    },
    {
        "trName": "Kineo Courses - Form Fix [WEBSITE SUPPORT] - 940594835",
        "trPrice": "$15.00"
    },
    {
        "trName": "Tropical Coast Roofing Site",
        "trPrice": "$150.00"
    },
    {
        "trName": "Discovery Tours NT - Add Phone Number and Google Ads budget and Copy - READ NOTES AND WATCH VIDEO [WEBSITE SUPPORT] - 945439610",
        "trPrice": "$10.00"
    },
    {
        "trName": "EJ Electrical - Website Changes - Watch Video [WEBSITE SUPPORT] - 946858128",
        "trPrice": "$70.00"
    },
    {
        "trName": "Fix Medium Field On Webflow Contact Form [WEBSITE SUPPORT] - 953093422",
        "trPrice": "$40.00"
    },
    {
        "trName": "Hcroof [WEBSITE SUPPORT] - 953336130",
        "trPrice": "$10.00"
    },
    {
        "trName": "Supreme Skips - Button fix [WEBSITE SUPPORT] - 956129631",
        "trPrice": "$10.00"
    },
    {
        "trName": "Kaystone Replica Development Cost",
        "trPrice": "$750.00"
    }
]

var setPrice = (price) =>{
    var invoiceAmountEls = document.querySelectorAll('[data-selector="currency-amount"]')
    invoiceAmountEls.forEach(invoiceAmountEl=>{
        invoiceAmountEl.innerText = price;
    })
}

trDatas.forEach(trData=>{
    console.log(invoiceCounter)
    invoiceNumberEls.forEach(invoiceNumberEl=>{
        invoiceNumberEl.innerText = `INV00${currentInvoiceNo}-${invoiceCounter}`
    })
    invoiceCounter++;
    setPrice(trData.trPrice)
    invoiceDataName.innerText = trData.trName;
    window.print()
})