var countrySelects = document.querySelectorAll('[country-select]')

function getUserCountryName() {
    return fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => data.country_name)
      .catch(() => '');
  }


var autoSelectCountryName = () => {
    getUserCountryName().then(countryName=> {
        console.log(countryName)
        countrySelects.forEach(countrySelect=>{
            changeSelectValueByText(countrySelect, countryName)
        })  
    })
}

function changeSelectValueByText(selectElement, searchText) {
      for (let i = 0; i < selectElement.options.length; i++) {
        const optionText = selectElement.options[i].value.toLowerCase();
        if (optionText.includes(searchText.toLowerCase())) {
            console.log(i)
          selectElement.selectedIndex = i;
          break;
        }
      }
}

autoSelectCountryName()