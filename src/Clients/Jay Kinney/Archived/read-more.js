var parentWrap, readMores, navWrap;
parentWrap = document.querySelector('.characters-slider')
readMores = parentWrap.querySelectorAll('.read-more-btn')
navWrap = parentWrap.querySelector('.talent-slide-arrows')
readMores.forEach(readMore=>{
    readMore.setAttribute('opened', 'false')
    readMore.addEventListener('click', ()=>{
        if(readMore.getAttribute('opened') === 'false') {
            readMore.setAttribute('opened', 'true')
        } else {
            readMore.setAttribute('opened', 'false')
        }
    })
})
navWrap.addEventListener('click', ()=>{
    readMores.forEach(readMore=>{
        if(readMore.getAttribute('opened') === 'true') {
            readMore.click()
        }
    })
})