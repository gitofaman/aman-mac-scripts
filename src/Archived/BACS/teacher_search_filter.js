var teacherBlocks, searchInput, searchBtnTxt, spinnerTimeout, btnNormalTxt, btnSearchingTxt;

teacherBlocks = document.querySelectorAll('.staff--item')
searchInput = document.querySelector('.staff-input')
searchBtnTxt = document.querySelector('.btn-text')
btnNormalTxt = ''
btnSearchingTxt = ''

searchInput.addEventListener('input', e => {
    filterTeachers(e.target.value)
})

var slideUpAnimate = (el) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(30px)'
    anime({
        targets: el,
        opacity: 1,
        translateY: 0,
        duration: 500,
        easing: 'easeOutSine'
    })
}

var filterTeachers = (keyWord) => {
    teacherBlocks.forEach(block=>{
        var teacherName = block.querySelector('.heading-m').innerText.toLowerCase()
        if(teacherName.includes(keyWord.toLowerCase())) {
            block.style.display = ''
            slideUpAnimate(block)
        } else {
            block.style.display = 'none';
        }
    })
    clearTimeout(spinnerTimeout)
    searchBtnTxt.innerText = btnSearchingTxt
    searchBtnTxt.classList.add('spinner')
    spinnerTimeout = setTimeout(()=>{
        searchBtnTxt.classList.remove('spinner')
        searchBtnTxt.innerText = btnNormalTxt
    }, 2500)
}