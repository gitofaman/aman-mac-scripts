// Get all the checkboxes on the page
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

// replaces each checkbox with custom checkbox
checkboxes.forEach((checkbox) => {
  // Create a new div element with the desired structure
  const newDiv = document.createElement('div');
  newDiv.classList.add('el-select-box');
  newDiv.setAttribute('id', checkbox.getAttribute('id'))

  // Create an inner div for the checkbox status
  const innerDiv = document.createElement('div');
  innerDiv.classList.add('el-select');
  if(checkbox.checked) {
    innerDiv.classList.add('checked');
  }

  // Create a div for the label text
  const labelText = document.createElement('div');
  labelText.classList.add('el-text');
  labelText.textContent = checkbox.nextElementSibling.textContent;

  // Append the inner div and label text to the main div
  newDiv.appendChild(innerDiv);
  newDiv.appendChild(labelText);

  // Replace the checkbox with the new div
  checkbox.parentNode.replaceWith(newDiv);
});


//checkbox group name will be the name used for showing in the mail about which boxes are selected. 
//do make sure all checkboxes of one group should stay under a div with attribute checkbox-group-name
var checkboxGroup = document.querySelectorAll('[checkbox-group-name]')

if(checkboxGroup.length>0) {
    checkboxGroup.forEach(group=>{
        var selectedCheckboxes = []
        var selectBoxes = group.querySelectorAll('.el-select-box')
        if(selectBoxes.length === 0) {
            return;
        }
        //creating container for selected checkboxes
        var hiddenTextarea = document.createElement('textarea')
        hiddenTextarea.setAttribute('name', group.getAttribute('checkbox-group-name'))
        hiddenTextarea.style.display = 'none';
        hiddenTextarea.classList.add('hidden-textarea')
        group.appendChild(hiddenTextarea);

        function selectToggle(el) {
            var selectCheckbox = el.querySelector('.el-select')
            if(selectCheckbox.classList.contains('checked')) {
                selectCheckbox.classList.remove('checked')
                var removedSpecialIndex = selectedCheckboxes.indexOf(el.querySelector('.el-text').innerText)
                selectedCheckboxes.splice(removedSpecialIndex, 1)
            } else {
                selectCheckbox.classList.add('checked')
                selectedCheckboxes.push(el.querySelector('.el-text').innerText)
            }
            group.querySelector('.hidden-textarea').value = selectedCheckboxes.join(', ')
        }
        
        selectBoxes.forEach(selectBox=>{
            selectBox.addEventListener('click', ()=>{
                selectToggle(selectBox)
            })
        })
    })
}



const otherCheckbox = document.getElementById('Other');
otherCheckbox.addEventListener("click", () => {
  let styleOther;
  if (otherCheckbox.querySelector('.el-select').classList.contains('checked')) {
    styleOther = 'block';
  } else {
    styleOther = 'none';
  }
  document.getElementById('other-field-wrapper').style.display = styleOther;
});  