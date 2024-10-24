function saveParametersToNewUrl(previousUrl, newUrl) {
    // Create a URL object for the previous URL
    const url = new URL(previousUrl);

    // Create a URL object for the new URL
    const newUrlObj = new URL(newUrl);

    // Loop through all search parameters in the previous URL
    for (const [param, value] of url.searchParams.entries()) {
        // Set the same parameter in the new URL
        newUrlObj.searchParams.set(param, value);
    }

    // Return the new URL with the parameters added or updated
    return newUrlObj.toString();
}

function finalUrl(oldUrl, param, val) {
    // Check if the old URL already contains query parameters
    var separator = oldUrl.includes('?') ? '&' : '?';

    // Encode the parameter name and value to ensure proper URL formatting
    var encodedParam = encodeURIComponent(param);
    var encodedVal = encodeURIComponent(val);

    // Concatenate the old URL with the new parameter
    var newUrl = oldUrl + separator + encodedParam + '=' + encodedVal;

    return newUrl;
}

var redirectBtn = document.querySelector('[redirect]');
var addressInput = document.querySelector('[autocomplete]');

var redirectQuote = () => {
  var locationValue = addressInput.value.trim();

  if (locationValue !== '') {
    var redirectUrl = finalUrl(saveParametersToNewUrl(window.location.href, window.location.origin + '/quote'), 'location', locationValue)
    window.location.href = redirectUrl;
  } else {
    alert('Please enter a location.');
  }
};

var handleKeyDown = (event) => {
  if (event.key === 'Enter') {
    redirectBtn.click();
  }
};

redirectBtn.addEventListener('click', redirectQuote);
addressInput.addEventListener('keydown', handleKeyDown);