var makeInputInvalid = (input, message) => {
    if(!input.classList.contains('invalid')) {
        input.classList.add('invalid')
        var invalidText = document.createElement('div')
        invalidText.classList.add("invalid-text")
        invalidText.innerText = message
        input.parentElement.appendChild(invalidText)
    }
}

var makeInputValid = (input) => {
    input.classList.remove('invalid')
    var invalidText = input.parentElement.querySelector(`.invalid-text`)
    if(!!invalidText) {
        invalidText.remove()
    }
}


var areaServiceAble = (isAddressServiceable) => {
    var addressInput = document.querySelector('[address-input]');
    if(isAddressServiceable) {
        document.querySelectorAll('[next-step-btn]').forEach(btn=>{
            btn.style.display = ''
        })
        makeInputValid(addressInput)
        document.querySelector('[self-link]').style.display = 'none'
    } else {
        document.querySelectorAll('[next-step-btn]').forEach(btn=>{
            btn.style.display = 'none'
            makeInputInvalid(addressInput, 'Sorry, the address you have entered is not serviceable')
        document.querySelector('[self-link]').style.display = 'block'
        })
    }
}

var updateAddress = (lat, long, city, state, country, zipcode) => {
    var updateInputValue = (attr, val) => {
        document.querySelectorAll(`[${attr}]`).forEach(input=>{
            input.value = val;
        })
    }
    updateInputValue('lat', lat)
    updateInputValue('long', long)
    updateInputValue('city', city)
    updateInputValue('state', state)
    updateInputValue('country', country)
    updateInputValue('zipcode', zipcode)
    var isAddressServiceable = postcodeZones.some(item=>item.code === parseInt(zipcode) && item.zone > 0);
    areaServiceAble(isAddressServiceable)
}

var googleDefined = setInterval(() => {
    if (!!google) {
        clearInterval(googleDefined)

        function initMap(address) {
            var latitude, longitude;
            var geocoder = new google.maps.Geocoder();
            var initiateMap = () => {
                // Specify the coordinates or address you want to display
                var location = {
                    lat: latitude,
                    lng: longitude
                }; // San Francisco, CA

                // Create a new map instance
                var map = new google.maps.Map(document.getElementById('map'), {
                    center: location,
                    zoom: 12
                });

                // Add a marker to the specified location
                var marker = new google.maps.Marker({
                    position: location,
                    map: map,
                    title: 'Selected Location'
                });
            }
            function getComponent(result, componentType) {
                const component = result.address_components.find((component) =>
                  component.types.includes(componentType)
                );
                return component ? component.long_name : null;
              }
            geocoder.geocode({
                address: address
            }, function (results, status) {
                if (status === 'OK') {
                    var location = results[0].geometry.location;
                    latitude = location.lat();
                    longitude = location.lng();
                    const city = getComponent(results[0], 'locality');
                    const state = getComponent(results[0], 'administrative_area_level_1');
                    const country = getComponent(results[0], 'country');
                    const zipCode = getComponent(results[0], 'postal_code');
                    
                    console.log('Latitude:', latitude);
                    console.log('Longitude:', longitude);
                    console.log('City:', city);
                    console.log('State:', state);
                    console.log('Country:', country);
                    console.log('Zip Code:', zipCode);
                    updateAddress(latitude, longitude, city, state, country, zipCode)
                    initiateMap()
                } else {
                    latitude = -33.8688197;
                    longitude = 151.2092955;
                    initiateMap()
                }
            });
        }
        $(document).ready(() => {
            console.log('ready')
            addressInput.addEventListener('focusout', (e) => {
                console.log(e.target.value)
                initMap(e.target.value)
            })
        })
    }
}, 300)