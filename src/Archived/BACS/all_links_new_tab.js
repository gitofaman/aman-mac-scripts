var pageLinks = document.querySelectorAll('a')
pageLinks.forEach(pageLink=> {
    pageLink.setAttribute('target', '_blank')
})