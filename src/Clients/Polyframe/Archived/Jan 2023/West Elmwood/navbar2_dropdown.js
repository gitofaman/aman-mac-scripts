var startingWindowSize = window.innerWidth;
var isDropdownColored = false;
function recolorDropdowns () {
    isDropdownColored = true;
    var navDropdowns, firstSection;
    navDropdowns = document.querySelectorAll('.navbar2_dropdown')
    firstSection = document.querySelector('.section-layout-hero1')
    function getStringInBetween(string, start , end) {
        // start and end will be excluded
        var indexOfStart = string.indexOf(start)
        indexOfStart = indexOfStart + start.length;
        var newString = string.slice(indexOfStart)
        var indexOfEnd = newString.indexOf(end)
        return newString.slice(0, indexOfEnd)
    }
    var getBackgroundColor = (heroSection) => {
        var backgroundTxt = (window.getComputedStyle( heroSection ,null).getPropertyValue('background'))
        var backgroundColor = getStringInBetween(backgroundTxt, 'linear-gradient(', ', rgb')
        return backgroundColor;
    }
    var firstSectionColor = getBackgroundColor(firstSection)
    var textColorToUse = window.getComputedStyle(document.querySelector('.navbar2_link'), null).getPropertyValue('color')
    navDropdowns.forEach(navDropdown=> {
        var dropLinks = document.querySelectorAll('.nav-dropdown-link')
        navDropdown.querySelector('.navbar2_dropdown-el').style.backgroundColor = firstSectionColor 
        dropLinks.forEach(dropLink=>{
            dropLink.style.color = textColorToUse;
        })
    })
}
function decolorDropdowns () {
    isDropdownColored = false;
    var navDropdowns;
    navDropdowns = document.querySelectorAll('.navbar2_dropdown')
    navDropdowns.forEach(navDropdown=> {
        var dropLinks = document.querySelectorAll('.nav-dropdown-link')
        navDropdown.querySelector('.navbar2_dropdown-el').style.backgroundColor = ''
        dropLinks.forEach(dropLink=>{
            dropLink.style.color = ''
        })
    })
}
function adjustColorsBasedOnSize () {
    var windowWidth = window.innerWidth;
    if(windowWidth > 991 && !isDropdownColored) {
        recolorDropdowns()
        return;
    }
    if(windowWidth < 991 && isDropdownColored) {
        decolorDropdowns()
        return;
    }
}
window.addEventListener('resize', ()=>{
    adjustColorsBasedOnSize()
})