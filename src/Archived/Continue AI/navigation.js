var tabNavs = Array.from(document.querySelectorAll('.tab-nav-link-menu .tab-nav-link'))
var nextTabNavBtn = document.querySelector('[next-tab]')
var prevTabNavBtn = document.querySelector('[prev-tab]')

var nextNo = (currentIndex, maxIndex) => {
    if(currentIndex===maxIndex) {
        return 0
    } else {
        return currentIndex + 1;
    }
}

var prevNo = (currentIndex, maxIndex) => {
    if(currentIndex===0) {
        return maxIndex;
    } else {
        return currentIndex - 1;
    }
}

var nextNav = () => {
    var activeTabNo = tabNavs.findIndex(tab=> {return tab.classList.contains('w--current')})
    console.log(activeTabNo)
    var nextTabNo = nextNo(activeTabNo, tabNavs.length-1)
    console.log(nextTabNo)
    tabNavs[nextTabNo].click()
}

var prevNav = () => {
    var activeTabNo = tabNavs.findIndex(tab=> {return tab.classList.contains('w--current')})
    console.log(activeTabNo)
    var prevTabNo = prevNo(activeTabNo, tabNavs.length-1)
    console.log(prevTabNo)
    tabNavs[prevTabNo].click()
}

nextTabNavBtn.addEventListener('click', nextNav)
prevTabNavBtn.addEventListener('click', prevNav)