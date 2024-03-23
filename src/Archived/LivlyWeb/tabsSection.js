var smartTabs, smartSections;
smartTabs = document.querySelectorAll('.smart-wrap-link')
smartSections = document.querySelectorAll('.smart-wrap-content-block')

smartTabs.forEach(smartTab=>{
    var smartSectionId = smartTab.getAttribute('href')
    smartTab.setAttribute('open-section', smartSectionId.replace('#',''))
    smartTab.removeAttribute('href')
})

var sectionActiveClassName = 'smart-section-active'
var tabActiveClassName = 'smart-tab-active'

var openSmartSection = (id) => {
    var requestedSection = document.getElementById(id)
    smartSections.forEach(smartSection=> {
        smartSection.classList.remove(sectionActiveClassName)
    })
    requestedSection.classList.add(sectionActiveClassName)
    smartTabs.forEach(smartTab=>{
        smartTab.classList.remove(tabActiveClassName)
        if(smartTab.getAttribute('open-section') === id) {
            smartTab.classList.add(tabActiveClassName)
        }
    })
}

smartTabs.forEach(smartTab=>{
    smartTab.addEventListener('click', ()=>{
        var sectionIdToOpen = smartTab.getAttribute('open-section')
        openSmartSection(sectionIdToOpen)
    })
})

smartTabs[0].click()