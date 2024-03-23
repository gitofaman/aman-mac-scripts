var tabBlocks = Array.from(document.querySelectorAll('.for-tab'))
var tabs = Array.from(document.querySelectorAll('.card-tab-link'))
var tabChange = (tabIndex) =>{
    tabBlocks.forEach(tabBlock=>{
        tabBlock.style.display = 'none'
    })
    tabBlocks[tabIndex].style.display = 'block'
    gsap.fromTo(tabBlocks[tabIndex], {
        opacity: 0,
        x: 100,
    }, {
        opacity: 1,
        x: 0
    })
}

tabs.forEach(tab=>{
    var currentTabIndex = tabs.indexOf(tab)
    tab.addEventListener('click', ()=>{
        tabChange(currentTabIndex)
    })
})
tabs[0].click()