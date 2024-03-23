var anchorLinks = Array.from(document.querySelectorAll('a[href^="#"]'))
//to make sure only anchor links going to a section in current page is filtered for further process
anchorLinks = anchorLinks.filter(anchorLink=>{
    return anchorLink.getAttribute('href').length > 2 && anchorLink.getAttribute('href').indexOf('#') >= 0;
})

//to accurately go to a current element with space from top
const getTop = el => el.offsetTop + (el.offsetParent && getTop(el.offsetParent))
const scrollToElementTop = (el, spaceFromTop) => {
    var scrollTo = getTop(el) - spaceFromTop
    window.scrollTo({
        top: scrollTo,
        behavior: 'smooth',
        })   
}

var scrollToElementViewTop = (el) => {
    //adding navbar height since they'll be fixed
    var navbarHeight = document.querySelector('.w-nav').offsetHeight;
    scrollToElementTop(el, navbarHeight + 50)
}

//removing href attribute to make sure that the native go to current section using link won't work
anchorLinks.forEach(anchorLink=>{
    var toScrolltoSectionId = anchorLink.getAttribute('href').slice(anchorLink.getAttribute('href').indexOf('#')+1)
    anchorLink.removeAttribute('href')
    anchorLink.style.cursor = 'pointer'
    anchorLink.addEventListener('click', ()=>{
        var sectionToScrollTo = document.getElementById(toScrolltoSectionId)
        scrollToElementViewTop(sectionToScrollTo)
    })
})

//making sure user coming directly from a different page gets to view of current section
var windowUrl = window.location.href;
var hashIndex = windowUrl.indexOf('#')
if(hashIndex) {
    var sectionId = windowUrl.slice(hashIndex+1)
    setTimeout(()=>{
        scrollToElementViewTop(document.getElementById(sectionId))
    }, 500)
}
