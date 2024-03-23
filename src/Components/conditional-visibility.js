//works in a way that if there is a checbox or radio with attribute 'show-class-when-active' 
//then it will show the el with classes given in the attribute
var customAttrs = {
    showWhenActive: 'show-class-when-active'
}
var conditionalVisibilityToggles = document.querySelectorAll(`[${customAttrs.showWhenActive}]`)

var conditionalForms = document.querySelectorAll('form')
conditionalForms.forEach(conditionalForm => {
    var conditionalVisibilityToggles = conditionalForm.querySelectorAll(`[${customAttrs.showWhenActive}]`)
    var radiosOrCheckBoxes = conditionalForm.querySelectorAll('input[type="checkbox"], input[type="radio"]')
    conditionalVisibilityToggles.forEach(conToggle=>{
        var elClassToMakeActive = conToggle.getAttribute(customAttrs.showWhenActive)
        var elsToMakeActive = document.querySelectorAll(`.${elClassToMakeActive}`)
        elsToMakeActive.forEach(el=>{
            el.style.display = 'none'
        })
    })
    radiosOrCheckBoxes.forEach(toggle=>{
        toggle.addEventListener('click', ()=>{
            conditionalVisibilityToggles.forEach(conToggle=>{
                var elClassToMakeActive = conToggle.getAttribute(customAttrs.showWhenActive)
                var elsToMakeActive = document.querySelectorAll(`.${elClassToMakeActive}`)
                if(conToggle.checked) {
                    elsToMakeActive.forEach(el=>{
                        el.style.display = ''
                    })
                } else {
                    elsToMakeActive.forEach(el=>{
                        el.style.display = 'none'
                    })
                }
            })
        })
    })
})