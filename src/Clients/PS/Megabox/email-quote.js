//to open popup on email quote button click
var emailQuoteBtns = document.querySelectorAll('[email-quote]')
emailQuoteBtns.forEach(emailQuoteBtn =>{
    var correspondingQuoteForm = document.querySelector(`[${emailQuoteBtn.getAttribute('email-quote')}]`)
    emailQuoteBtn.addEventListener('click', ()=>{
        correspondingQuoteForm.parentElement.classList.add('show-flex')
        setTimeout(()=>{
            correspondingQuoteForm.querySelector('input[type="submit"]').click()
        }, 4000)
    })
})

var quoteForms = document.querySelectorAll('.blank-form')
quoteForms.forEach(quoteForm => {
    quoteForm.querySelector('.close-blank').addEventListener('click', ()=>{
        quoteForm.classList.remove('show-flex')
    })
})