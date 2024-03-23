var emailInput, telInput, textArea;

emailInput = document.getElementById('wf-ecom-email')
telInput = document.getElementById('wf-ecom-telephone')
textArea = document.getElementById('wf-ecom-notes')

var updateTextArea = () => {
    textArea.value = `Email: ${emailInput.value} , Tel: ${telInput.value}`
}

emailInput.addEventListener('keyup', updateTextArea)

telInput.addEventListener('keyup', updateTextArea)

setInterval(updateTextArea, 200)