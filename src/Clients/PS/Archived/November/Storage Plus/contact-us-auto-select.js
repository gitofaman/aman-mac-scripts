var thisPageUrl = new URL(window.location.href)
var selectedOptionParam = thisPageUrl.searchParams.get('selectedoption')
if(!!selectedOptionParam) {
    storageOptions.forEach(storageOption=>{
        var storageOptionSlug = storageOption.querySelector('.is--slug-cs').innerText;
        if(storageOptionSlug===selectedOptionParam) {
            updateSelectValue(storageOption)
        }
    })
}