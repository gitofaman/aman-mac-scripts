//To transfer the ad parameters to chariotMove
var allLinks = Array.from(document.querySelectorAll('a'))
var chariotLinks = allLinks.filter(a => {
    if (a.hasAttribute('href')) {
        return (a.getAttribute('href').indexOf('https://lifestyle.chariotmove.com/customer/quote') >= 0)
    }
})

function replaceLinkParameters(link) {
    // Get the current URL parameters
    const urlParams = new URLSearchParams(window.location.search);
  
    // Create a new URL object for the given link
    const url = new URL(link);
  
    // Clear the existing parameters from the link
    url.search = '';
  
    // Add the parameters from the current URL to the link
    for (const [param, value] of urlParams.entries()) {
      url.searchParams.append(param, value);
    }
    url.searchParams.append('short_form', 'true')
    // Return the modified link
    return url.toString();
  }


var updatedLink = replaceLinkParameters('https://lifestyle.chariotmove.com/customer/quote?short_form=true');
chariotLinks.forEach(link=>{
    link.setAttribute('href', updatedLink)
})