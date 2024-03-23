//to make sure form data shows only the selected checboxes and, to change the checkboxes based on selected services
var docForms = document.querySelectorAll('.gas--heater-form')

if(docForms.length>0) {
    docForms.forEach(docForm=>{
        var selectedSpecials = []
        var selectBoxes = docForm.querySelectorAll('.el-select-box')
        console.log(selectBoxes.length)
        if(selectBoxes.length === 0) {
            console.log('not checking this one')
            return;
        }
        var gasCheckboxFields = docForm.querySelector('.gas--heater-checkboxes')
        var nonGasCheckboxFields = docForm.querySelector('.non--gas-checkboxes')
        var selectEl = docForm.querySelector('.select--element')
    
        function unselectAllCheckboxes(parent) {
            var parentSelectBoxes = parent.querySelectorAll('.el-select-box')
            parentSelectBoxes.forEach(selectBox => {
                deselectCheckbox(selectBox)
            })
        }
    
        function selectToggle(el) {
            var selectCheckbox = el.querySelector('.el-select')
            if(selectCheckbox.classList.contains('checked')) {
                selectCheckbox.classList.remove('checked')
                var removedSpecialIndex = selectedSpecials.indexOf(el.querySelector('.el-text').innerText)
                selectedSpecials.splice(removedSpecialIndex, 1)
            } else {
                selectCheckbox.classList.add('checked')
                selectedSpecials.push(el.querySelector('.el-text').innerText)
            }
            docForm.querySelector('.selected_specials').value = selectedSpecials.join(', ')
        }
    
        function deselectCheckbox(el) {
            var selectCheckbox = el.querySelector('.el-select')
            if(selectCheckbox.classList.contains('checked')) {
                selectCheckbox.classList.remove('checked')
                var removedSpecialIndex = selectedSpecials.indexOf(el.querySelector('.el-text').innerText)
                selectedSpecials.splice(removedSpecialIndex, 1)
            }
            docForm.querySelector('.selected_specials').value = selectedSpecials.join(', ')  
        }
    
        selectEl.addEventListener('change', (e)=>{
            var selectedUserValue = e.target.value;
            if(selectedUserValue==='Gas Room Heater Service') {
                gasCheckboxFields.classList.remove('is--hidden')
                nonGasCheckboxFields.classList.add('is--hidden')
                unselectAllCheckboxes(nonGasCheckboxFields)
            } else {
                gasCheckboxFields.classList.add('is--hidden')
                nonGasCheckboxFields.classList.remove('is--hidden')
                unselectAllCheckboxes(gasCheckboxFields)
            }
        })
        
        selectBoxes.forEach(selectBox=>{
            selectBox.addEventListener('click', ()=>{
                selectToggle(selectBox)
            })
        })
    })
}