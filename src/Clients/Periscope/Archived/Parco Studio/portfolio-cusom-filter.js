setTimeout(()=>{
    var ptCheckoxes = document.querySelectorAll('.w-checkbox.pt-field')
    var collectionList = document.querySelector('.collection-flex-list')
    
    var showAllBtn = document.querySelector('.collection-flex-list').firstChild.cloneNode(true)
    collectionList.prepend(showAllBtn)
    var newShowAllBtn = collectionList.firstChild
    newShowAllBtn.querySelector('.pt-field').classList.add('pt-show-all')
    newShowAllBtn.querySelector('.w-form-label').innerText = 'All Projects'
    
    var showAllCheckboxes = () => {
        ptCheckoxes.forEach(ptCheckbox => {
            if(ptCheckbox.querySelector('input').checked && !ptCheckbox.classList.contains('pt-show-all')) {
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
