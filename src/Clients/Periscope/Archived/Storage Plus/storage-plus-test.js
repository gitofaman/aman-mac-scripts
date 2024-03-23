var formSp = document.querySelector('[space-calci-form]')
function isVisible(el) {
    return (el.offsetParent !== null)
}
function updateURLParameter(url, param, paramVal)
{
    var TheAnchor = null;
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";

    if (additionalURL) 
    {
        var tmpAnchor = additionalURL.split("#");
        var TheParams = tmpAnchor[0];
            TheAnchor = tmpAnchor[1];
        if(TheAnchor)
            additionalURL = TheParams;

        tempArray = additionalURL.split("&");

        for (var i=0; i<tempArray.length; i++)
        {
            if(tempArray[i].split('=')[0] != param)
            {
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }        
    }
    else
    {
        var tmpAnchor = baseURL.split("#");
        var TheParams = tmpAnchor[0];
            TheAnchor  = tmpAnchor[1];

        if(TheParams)
            baseURL = TheParams;
    }

    if(TheAnchor)
        paramVal += "#" + TheAnchor;

    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
}

//TO DO - Separate length and width form the dimensions
var lengthAndWidth = (dimensions) => {
    var lengthStr = dimensions.split('x')[0]
    var widthStr = dimensions.split('x')[1]
    return [parseFloat(lengthStr.trim()), parseFloat(widthStr.trim())]
}
var redirectUrl = window.location.origin + '/space-calculator'
//TO DO - create redirect url from selected options
var updateRedirectUrl = (locationName, dimensions) => {
    console.log(locationName)
    console.log(dimensions)
    if(locationName!==null) {
        redirectUrl = updateURLParameter(redirectUrl, 'location', locationName)
    }
    if(dimensions!==null) {
        var dimensionSplit = lengthAndWidth(dimensions)
        var lengthVal = dimensionSplit[0]
        var widthVal = dimensionSplit[1]
        console.log(lengthVal)
        console.log(widthVal)
        redirectUrl = updateURLParameter(redirectUrl, 'l', lengthVal)
        redirectUrl = updateURLParameter(redirectUrl, 'w', widthVal)
    }
}
document.querySelector('[postcode]').addEventListener('change', (e)=>{
    updateRedirectUrl(e.target.value, null)
})

formSp.addEventListener('submit', ()=>{
    var formError = formSp.parentElement.querySelector('.w-form-fail')
    var formSuccess = formSp.parentElement.querySelector('.w-form-done')
    var checkResult = setInterval(()=>{
        if(isVisible(formSuccess)) {
            window.location.href = redirectUrl;
            clearInterval(checkResult)
        }
        if(isVisible(formError)) {
            clearInterval(checkResult)
        }
    }, 100)
})
