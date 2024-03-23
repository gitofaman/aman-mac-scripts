
var parseParameterJson = (givenUrl) => {
    var myUrl = new URL(givenUrl)
    var parametersCache = myUrl.search
    if(parametersCache.indexOf('?')>=0) {
        var paramsJson = {}
        parametersCache = parametersCache.replace('?', '')
        var paramsFirstArray = parametersCache.split('&')
        paramsFirstArray.forEach(ar=>{
            var [pKey, pVal] = ar.split('=')
            paramsJson[pKey] = pVal
        })
        return paramsJson
    }
    return;
}

var updateParameter = (parameName, newVal) => {

}