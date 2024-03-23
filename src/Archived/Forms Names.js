var forms = document.querySelectorAll('form')
forms.forEach(form=>{
    console.log(form.getAttribute('data-name'))
})