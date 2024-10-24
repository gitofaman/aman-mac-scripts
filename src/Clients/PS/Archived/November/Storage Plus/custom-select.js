var storageOptions, sSelectContent, hiddenStorageSelectInput, storageDropdown, storageToggle;
storageToggle = document.querySelector('.cs-toggle')
sSelectContent = document.querySelector('.cs-content')
storageOptions = document.querySelectorAll('.cs-item')
hiddenStorageSelectInput = document.getElementById('Storage-Option')
storageDropdown = document.querySelector('.custom-select')

var selectOpen = false;
var customClasses = {
    'optionName' : `.storage-option-name`,
    'optionImage' : '.storage-option-image'
}
//TODOS
//Open select dropdown script
var openSelect = () => {
    if(!selectOpen) {
        sSelectContent.style.opacity = 0
        sSelectContent.style.display = 'block'
        sSelectContent.style.transform = `translateY(-40px)`
        anime({
            targets: sSelectContent,
            opacity: 1,
            duration: 200,
            translateY: 0,
            easing: `easeOutQuad`
        })
        selectOpen = true;
    }
}
//close dropdown script (includes when click outside the select when open)
var closeSelect = () => {
    if(selectOpen) {
        anime({
            targets: sSelectContent,
            opacity: 0,
            duration: 200,
            translateY: -40,
            easing: `easeOutQuad`
        })
        setTimeout(()=> {
            sSelectContent.style.display = 'none'
        }, 200)
        selectOpen = false;
    }
}
window.addEventListener('click', function(e){   
    if (!storageDropdown.contains(e.target)){
        closeSelect()
    }
});
//update select value 
var updateSelectValue = (storageOption) => {
    var storageOptionName = storageOption.querySelector(customClasses['optionName']).innerText;
    var storageOptionImage = storageOption.querySelector(customClasses['optionImage']).getAttribute('src')
    hiddenStorageSelectInput.value = storageOptionName;
    storageToggle.querySelector(customClasses['optionName']).innerText = storageOptionName;
    storageToggle.querySelector('.active-one').style.display = 'block'
    storageToggle.querySelector(customClasses['optionImage']).removeAttribute('src')
    storageToggle.querySelector(customClasses['optionImage']).removeAttribute('srcset')
    storageToggle.querySelector(customClasses['optionImage']).setAttribute('src', storageOptionImage)
}
//change option value script
storageOptions.forEach(storageOption=> {
    storageOption.addEventListener('click', ()=>{
        updateSelectValue(storageOption)
        closeSelect()
    })
})
storageToggle.addEventListener('click', openSelect)