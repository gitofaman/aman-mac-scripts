var selectedCountry = 'USA'
var countries = []
var countryDropdownToggle = document.getElementById('country-toggle')
var countryListBlocks = document.querySelectorAll('.nri--country-item')
var countryShowBlocks = document.querySelectorAll('[country-show]')
var countryDropdownOpen = false;
var countryHideList = []

countryShowBlocks.forEach(hideBlock=>{
    var countriesToHideOn = hideBlock.getAttribute('country-show').split(',').map(t=>{return t.trim()})
    countryHideList.push({
        'codes' : countriesToHideOn,
        'block' : hideBlock
    })
})

countryListBlocks.forEach(countryBlock=>{
    countries.push({
        'country-code' : countryBlock.querySelector('[aria-code]').innerText,
        'country-image' : countryBlock.querySelector('[aria-img]').getAttribute('src')
    })
})

var selectCountry = (countryCode) => {
    var thisCountry = countries.filter(country=>{return country['country-code'].toLowerCase() === countryCode.toLowerCase()})[0]
    console.log()
    document.getElementById('country_code').innerText = thisCountry['country-code']
    document.getElementById('country_img').setAttribute('src', thisCountry['country-image'])
    //make contents visible
    countryHideList.forEach(item=>{
        if(item['codes'].includes(countryCode)) {
            item['block'].classList.remove('is--hidden')
        } else {
            item['block'].classList.add('is--hidden')
        }
    })
    var openDefaultTab = true
    countryHideList.forEach(countryHides=>{
        if(!countryHides['block'].classList.contains('is--hidden')) {
            openDefaultTab = false
        }
    })
    if(openDefaultTab) {
        document.querySelector('[country-show="IN"]').classList.remove('is--hidden')
    }
}

countryListBlocks.forEach(listBlock=>{
    listBlock.addEventListener('click', ()=> {
        //select country
        selectCountry(listBlock.querySelector('[aria-code]').innerText)
        //close popup
        countryDropdownToggle.click()
    })
})

countryDropdownToggle.addEventListener('click', ()=>{
    countryDropdownOpen = !countryDropdownOpen
})

window.addEventListener('click', (e)=> {
    if(countryDropdownOpen) {
        if (document.getElementById('country-dropdown').contains(e.target)){
            // Clicked in box
        } else{
            // Clicked outside the box
            countryDropdownToggle.click()
        }
    }
})

//checks which country user is from and selects from dropdown
$.get("https://ipinfo.io", function(response) {
    selectCountry(response.country)
}, "jsonp");