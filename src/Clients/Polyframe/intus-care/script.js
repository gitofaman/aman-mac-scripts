function isVisible(el) {
    return (el.offsetParent !== null)
}

if (!!Cookies.get('locked-resource')) {
    document.querySelector('.locked-section').remove()
    var overlayStyled = document.createElement('style')
    overlayStyled.innerHTML = `.link-overlay{
        display: block!important;
    }`
    document.head.appendChild(overlayStyled)
}

const formForLocked = document.querySelector('.locked-section form');

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