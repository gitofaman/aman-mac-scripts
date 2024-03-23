function isVisible(el) {
    return (el.offsetParent !== null)
}

if (!!Cookies.get('locked-resource')) {
    document.querySelectorAll('.resources-btn')[3].click()
    setTimeout(()=>{
        var linkForLockedResources = document.querySelectorAll('[r-type="locked"]')
        var lockedOverlays = document.querySelectorAll('[locked-overlay]')
        linkForLockedResources.forEach(link=> {
            link.style.display = 'block'
        })
        lockedOverlays.forEach(overlay => {
            overlay.style.display = 'none'
        })
    }, 700)
}

const formForLocked = document.querySelector('[for-locked-form]');

formForLocked.addEventListener('submit', ()=>{
    var formError = formForLocked.parentElement.querySelector('.w-form-fail')
    var formSuccess = formForLocked.parentElement.querySelector('.w-form-done')
    var checkResult = setInterval(()=>{
        if(isVisible(formSuccess)) {
            clearInterval(checkResult)
            Cookies.set('locked-resource', 'true', {expires: 999999})
            setTimeout(()=>{
                window.location.href = window.location.href;
            }, 3000)
        }
        if(isVisible(formError)) {
            clearInterval(checkResult)
        }
    }, 100)
})