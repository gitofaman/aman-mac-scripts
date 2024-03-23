var changePageBlocks = document.querySelectorAll('[change-page]')
changePageBlocks.forEach(changePageBlock => {
    changePageBlock.addEventListener('click', (e)=>{
        e.preventDefault();
        window.location.href = changePageBlock.getAttribute('change-page')
    })
})