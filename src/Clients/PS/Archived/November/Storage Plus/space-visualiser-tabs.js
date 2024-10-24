var spaceTabs, spaceOptions;
spaceTabs = Array.from(document.querySelectorAll('.sv-tab'));
spaceOptions = Array.from(document.querySelectorAll('.sv-content-parent'));

var addClassToOne = (el, elArray) => {
    elArray.forEach(eachEl=>{
        if(eachEl !== el) {
            eachEl.classList.remove('is--active')
        } else {
            eachEl.classList.add('is--active')
        }
    })
}

spaceTabs.forEach(spaceTab=>{
    var thisSpaceOption = spaceOptions.filter(spaceOption=> {
        return spaceOption.querySelector('.sv-heading').innerText.toLowerCase() === spaceTab.innerText.toLowerCase()
    })[0]
    spaceTab.addEventListener('click', ()=>{
        addClassToOne(spaceTab, spaceTabs)
        addClassToOne(thisSpaceOption, spaceOptions)
    })
})
spaceTabs[0].click()
// var activateTab = (tabIndex, givenSpaceTab) => {
//     spaceOptions.forEach(spaceOption=> {
//         if(spaceOption.classList.contains('is--active')) {
//             spaceOption.classList.remove('is--active')
//         } 
//     })
//     spaceTabs.forEach(spaceTab=> {
//         if(spaceTab.classList.contains('is--active')) {
//             spaceTab.classList.remove('is--active')
//         }
//     })
//     givenSpaceTab.classList.add('is--active')
//     spaceOptions[tabIndex].classList.add('is--active')
// }
// spaceTabs.forEach(spaceTab=> {
//     spaceTab.addEventListener('click', ()=> {
//         var spaceTabName = spaceTab.innerText;
//         spaceOptions.forEach(spaceOption=> {
//             if (spaceOption.querySelector('.sv-heading').innerText.toLowerCase() === spaceTabName.toLowerCase()) {
//                 var optionIndex = spaceOptions.indexOf(spaceOption)
//                 activateTab(optionIndex, spaceTab)
//             }
//         })
//     })
// })
// activateTab(0, spaceTabs[0])