var savedFormDatas = []
var allFormsToSave = document.querySelectorAll('[save-forms]')

function updateSavedData(formName, values) {
    const existingFormIndex = savedFormDatas.findIndex(item => item.name === formName);

    if (existingFormIndex !== -1) {
        savedFormDatas[existingFormIndex].values = {
            ...savedFormDatas[existingFormIndex].values,
            ...values
        };
        console.log(`Values updated for form "${formName}"`);
    } else {
        console.log(`Form "${formName}" not found.`);
    }
    console.log(savedFormDatas[0].values)
}

allFormsToSave.forEach(formToSave => {
    var formName = formToSave.getAttribute('name')
    var formInSavedDatas = false;
    var savedData = {}
    savedData.name = formName
    // Function to update the formInputValues object
    function updateFormInputValues() {
        const formInputValues = {};
        const inputs = formToSave.elements;

        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            const inputName = input.name;

            if (input.type === 'radio') {
                if (input.checked) {
                    formInputValues[inputName] = input.value;
                }
            } else if (input.type === 'checkbox') {
                formInputValues[inputName] = input.checked;
            } else {
                formInputValues[inputName] = input.value;
            }
        }
        if (!formInSavedDatas) {
            formInSavedDatas = true;
            savedData.values = formInputValues;
            savedFormDatas.push(savedData)
        } else {
            savedData.values = formInputValues
            updateSavedData(formName, savedData)
        }
    }

    // Function to handle input changes
    function handleInputChange(event) {
        updateFormInputValues();
    }

    // Attach change event listeners to form inputs
    formToSave.addEventListener('change', handleInputChange);

    // Initialize formInputValues
    updateFormInputValues();
})