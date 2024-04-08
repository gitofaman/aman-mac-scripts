// conditions
// name and email address should be filled
// form should be left not filled for at least 5 seconds

// Issues right now 
// Form filled redirects the page
// Form is not sending any notifications

var formTimeouts = {}

function abandonForm(givenObj) {
    const mustHaveFields = ["name", "mail"];
    let formFieldsAvl = true;

    // Check if every mustHaveField has at least one key in givenObj containing that substring
    $.each(mustHaveFields, function(index, field) {
        let fieldFound = false;
        $.each(givenObj, function(key, value) {
            if (key.toLowerCase().includes(field.toLowerCase())) {
                fieldFound = true;
                return false; // Break out of the loop since we found the field
            }
        });
        if (!fieldFound) {
            formFieldsAvl = false;
            return false; // Break out of the loop since a field is missing
        }
    });

    // If all mustHaveFields are available in givenObj, continue with form abandonment
    if (formFieldsAvl) {
        // Extract form name from givenObj
        const formName = givenObj["form-name"];

        // Create a new form element
        const abandonedForm = $('<form></form>');

        const finalFormName = formName + '-abandoned'

        // Set the name attribute of the form
        abandonedForm.attr('name', finalFormName);
        abandonedForm.attr('method', 'get')

        // Iterate through the keys of givenObj
        $.each(givenObj, function(key, value) {
            if (key !== "form-name") {
                // Create a new input field for each key-value pair
                const inputField = $('<input type="text">');
                
                // Set input name and value based on the key-value pair
                inputField.attr('name', key);
                inputField.val(value);
                
                // Append the input field to the form
                abandonedForm.append(inputField);
            }
        });

        // Append the form to the document body or any other desired location
        $('body').prepend(abandonedForm);
        if(!!formTimeouts[formName]) { //if a timeout is available
            clearTimeout(formTimeouts[formName])
        }
        formTimeouts[formName] = setTimeout(function(){
            $(`[name=${finalFormName}]`).submit();
            console.log('A timeout has started')
        }, 5000)
    } else {
        console.log("Required fields are missing in the given object.");
    }
}


$('form').each(function(){
    var fieldsFilled = {}
    var $mainForm = $(this)
    var $formName = $mainForm.attr('name')

    var updateFields = (fName, value) => {
        fieldsFilled[fName] = value;
        console.log(fieldsFilled)
        abandonForm(fieldsFilled)
    }

    $('[name]').blur(function(){
        var $thisValue = $(this).val()
        var nameAttr = $(this).attr('name')
        if ($thisValue.trim() !== '') {
            updateFields(nameAttr, $thisValue)
            // Perform actions here if the input field is filled
        } else {
            console.log('Input field empty');
            // Perform actions here if the input field is empty
        }
    })
})