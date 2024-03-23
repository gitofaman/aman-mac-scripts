var donatePopup;
var checkForDonatePopup = setInterval(()=>{
    donatePopup = document.getElementById('gl-widget-modal')
    if(!!donatePopup) {
        clearInterval(checkForDonatePopup)
        var notePopup = document.getElementById('note-popup')
        var notePopupCloseBtns = notePopup.querySelectorAll('[close-btn]')
        var formFilled = false;
        
        function isVisible(el) {
            return (el.offsetParent !== null)
        }
        
        var openPopup = () => {
            notePopup.querySelector('[open-btn]').click()
        }
        var closePopup = () => {
            if (!notePopup.hasAttribute('popup-filled')) {
                donatePopup.querySelector('.gl-modal__overlay').click()
            }
        }
        
        var formSp = notePopup.querySelector('form'); 
        formSp.addEventListener('submit', ()=>{
            var formError = formSp.parentElement.querySelector('.w-form-fail')
            var formSuccess = formSp.parentElement.querySelector('.w-form-done')
            var checkResult = setInterval(()=>{
                if(isVisible(formSuccess)) {
                    notePopup.setAttribute('popup-filled', 'true')
                    formFilled = true;
                    notePopupCloseBtns[0].click()
                    clearInterval(checkResult)
                    notePopup.remove()
                }
                if(isVisible(formError)) {
                    clearInterval(checkResult)
                }
            }, 100)
        })
        
        notePopupCloseBtns.forEach(noteCloseBtn => {
            noteCloseBtn.addEventListener('click', () => {
                closePopup()
            })
        })
        
        const observer = new MutationObserver(mutations=>{
            if(donatePopup.getAttribute('aria-hidden') === 'false') {
                openPopup()
            } else {
                if(formFilled) {
                    window.location.href = window.location.href
                }
            }
        })
        
        observer.observe(donatePopup, {characterData: false, attributes: true, childList: false, subtree: false})
        
        var donateBtn = document.querySelector('.gl-widget__donation-submit-button')
        
        const buttonObserver = new MutationObserver(mutations=>{
            var amountInput = formSp.querySelector('[amount-filled]')
            amountInput.value = donateBtn.innerText.replace('DONATE', '')
            amountInput.setAttribute('disabled', 'true')
        })
        
        buttonObserver.observe(donateBtn, {characterData: false, attributes: false, childList: true, subtree: true})
    }
}, 200)
