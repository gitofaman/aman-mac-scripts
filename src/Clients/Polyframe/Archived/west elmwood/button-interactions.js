var buttons = document.querySelectorAll('.button')

buttons.forEach(button=>{
    var usingBg = '#111111'
    var buttonChevron = button.querySelector('.button-chevron-wrap')
    if (!!buttonChevron) {
        if(button.classList.contains('is-secondary')) {
            usingBg = '#ffffff'
        }
        button.addEventListener('mousedown', ()=> {
            buttonChevron.style.color = usingBg
        })
        button.addEventListener('mouseup', ()=> {
            buttonChevron.style.color = ''
        })   
    }
})