var createAnewMultiSelect = (inputName, optionNames, className, parentEl) => {
    var newSelect = document.createElement('select')
    newSelect.name = inputName;
    optionNames.forEach(optionName=>{
        domOption = document.createElement('option')
        domOption.setAttribute('value', optionName)
        domOption.innerHTML = optionName
        newSelect.appendChild(domOption)
    })
    newSelect.classList.add(className)
    parentEl.appendChild(newSelect)
}

var multiSelectCheckboxParents = document.querySelectorAll('[multi-select]')
multiSelectCheckboxParents.forEach(parentEl=>{
    var possibleOptionNames = []
    var checkboxes = Array.from(parentEl.querySelectorAll('.checkbox-field'))
    var inputNameToBeUsed = parentEl.getAttribute('multi-select')
    checkboxes.forEach(checkbox=>{
        possibleOptionNames.push(checkbox.querySelector('.w-form-label').innerText)
    })
    createAnewMultiSelect(inputNameToBeUsed, possibleOptionNames, 'is--hidden', parentEl)
    var newMultiSelect = parentEl.querySelector('select')
    newMultiSelect.setAttribute('multiple', 'true')
    var updateMultiSelect = () => {
        for(i=0;i<newMultiSelect.options.length;i++) {
            if(checkboxes[i].querySelector('input').checked) {
                newMultiSelect.options[i].selected = true;
            } else {
                newMultiSelect.options[i].selected = false;
            }
        }
    }
    checkboxes.forEach(checkbox=>{
        checkbox.addEventListener('click',updateMultiSelect)
    })
})