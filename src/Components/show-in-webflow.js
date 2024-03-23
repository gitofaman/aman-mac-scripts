var showInWebflowIos = document.querySelectorAll('[show-in-webflow]')
var showInWebflowLinkOnly = (el) => {
    if(window.location.href.indexOf('webflow.io') < 0) {
        el.style.display = 'none'
    }
}
var hideInWebflowLinkOnly = (el) => {
    if(window.location.href.indexOf('webflow.io') >= 0) {
        el.style.display = 'none'
    }   
}
showInWebflowIos.forEach(el=>{
    if(el.getAttribute('show-in-webflow') === 'true') {
        showInWebflowLinkOnly(el)
    } else {
        
        hideInWebflowLinkOnly(el)
    }
})

