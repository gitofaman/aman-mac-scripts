var pageLinks = document.querySelectorAll('a')
var acceptedParams = ['utm_campaign','utm_medium','utm_source','gclid','targetid','utm_term']

function isOriginSameAsLocation(url) {
    var pageLocation = window.location;
    var URL_HOST_PATTERN = /(\w+:)?(?:\/\/)([\w.-]+)?(?::(\d+))?\/?/;
    var urlMatch = URL_HOST_PATTERN.exec(url) || [];
    var urlparts = {
        protocol:   urlMatch[1] || '',
        host:       urlMatch[2] || '',
        port:       urlMatch[3] || ''
    };
  
    function defaultPort(protocol) {
       return {'http:':80, 'https:':443}[protocol];
    }
  
    function portOf(location) {
       return location.port || defaultPort(location.protocol||pageLocation.protocol);
    }
  
    return !!(  (urlparts.protocol  && (urlparts.protocol  == pageLocation.protocol)) &&
                (urlparts.host     && (urlparts.host      == pageLocation.host))     &&
                (urlparts.host     && (portOf(urlparts) == portOf(pageLocation)))
            );
}

var paramSlug = ''
acceptedParams.forEach(param=>{
    var currentUrl = new URL(window.location.href);
    var paramVal = currentUrl.searchParams.get(param)
    if (!!paramVal) {
        if(paramSlug.indexOf('?')>-1) {
            paramSlug = paramSlug + `&${param}=${paramVal}`
        } else {
            paramSlug = `?${param}=${paramVal}`
        }
    }
})

pageLinks.forEach(pagelink=>{
    if (isOriginSameAsLocation(pagelink)) {
        var finalLinkUrl;
        var pageLinkUrl = pagelink.getAttribute('href')
        finalLinkUrl = pageLinkUrl + paramSlug
        pagelink.setAttribute('href', finalLinkUrl)
    }
})