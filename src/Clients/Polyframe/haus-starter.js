var filterLists = document.querySelectorAll('.haus-links')
var centerParent = (child) => {
    var parentElement = child.parentElement;
    // var parentLeftPos = parentElement.getBoundingClientRect().x;
    var movedVal  = 0
    if(parentElement.hasAttribute('moved')) {
        movedVal = parseInt(parentElement.getAttribute('moved'))
    }
    var childLeftPos = child.getBoundingClientRect().x
    var childWidth = child.offsetWidth
    var toMoveParent = window.innerWidth/2 - childLeftPos - childWidth/2 + movedVal
    parentElement.setAttribute('moved', toMoveParent)
    parentElement.style.transform = `translateX(${toMoveParent}px)`
}

filterLists.forEach(filterList=>{
    var childLinks = filterList.querySelectorAll('.haus-link')
    childLinks.forEach(childLink => {
        childLink.addEventListener('click', ()=>{
            centerParent(childLink)
        })
    })
    childLinks[0].click()
})