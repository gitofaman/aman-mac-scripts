//this code needs to be modified in case the 
var showAllClass = 'pt-show-all'
var checkboxClass = `.project-checkbox` //Checkbox which contains both input and label.  
var checkboxListClass = `.col-grid_1rem` //The list which contains every checkox (which contains both input and label)
var viewAlltext = 'All Project'

setTimeout(()=>{
    var ptCheckoxes = document.querySelectorAll(`.w-checkbox${checkboxClass}`)
    var collectionList = document.querySelector(`${checkboxListClass}`)
    
    var showAllBtn = document.querySelector(`${checkboxListClass}`).firstChild.cloneNode(true)
    collectionList.prepend(showAllBtn)
    var newShowAllBtn = collectionList.firstChild
    newShowAllBtn.classList.add(`${showAllClass}`)
    newShowAllBtn.querySelector('.w-form-label').innerText = viewAlltext
    
    var showAllCheckboxes = () => {
        ptCheckoxes.forEach(ptCheckbox => {
            if(ptCheckbox.querySelector('input').checked && !ptCheckbox.classList.contains(`${showAllClass}`)) {
                ptCheckbox.querySelector('input').click()
            }
        })
        if (newShowAllBtn.querySelector('input').checked === false) {
            newShowAllBtn.querySelector('input').checked = true
        }
    }
    
    newShowAllBtn.addEventListener('click', (e) => {
        e.preventDefault()
        var inputShowAll = showAllBtn.querySelector('input')
        if (inputShowAll.checked === false) {
            inputShowAll.checked = true
            showAllCheckboxes()
        }
    })
    
    var preserveCheckboxState = () => {
        var checkedNos = 0
        ptCheckoxes.forEach(ptCheckox => {
            if (ptCheckox.querySelector('input').checked) {
                checkedNos++
            }
        })
        if (checkedNos === 0) {
            newShowAllBtn.querySelector('input').checked = true
        } else {
            newShowAllBtn.querySelector('input').checked = false
        }
        if (checkedNos === ptCheckoxes.length) {
            setTimeout(()=> {
                newShowAllBtn.click()
            }, 200)
        }
    }
    
    ptCheckoxes.forEach( ptCheckbox => {
        ptCheckbox.addEventListener('click', () => {
            preserveCheckboxState()
        })
    })
    
    showAllCheckboxes()
}, 1200)
