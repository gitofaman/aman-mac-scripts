var dataContainer =document.getElementById('data-container')

var submitBtn = document.querySelector('.button')

submitBtn.addEventListener('click', ()=>{
    var textarea = document.querySelector('.ck.ck-content.ck-editor__editable.ck-rounded-corners.ck-editor__editable_inline.ck-blurred')
    var clonedTextarea = textarea.cloneNode(true);
    clonedTextarea.classList = ''
    dataContainer.prepend(clonedTextarea);
})

var printBtn = document.querySelector('.print-btn')

printBtn.addEventListener('click', ()=>{
    document.querySelector('textarea').parentElement.style.display = 'none'
    window.print()
    document.querySelector('textarea').parentElement.style.display = ''
})