// conditions
// name and email address should be filled
// form should be left not filled for at least 5 seconds

// Issues right now -
// Form filled redirects the page
// Form is not sending any notifications even after cloning

// Possible resolutions
// Add a form that will stay at the top just for receiving abandaned forms

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

        // Clone the parent element of the original form
        const abandonedForm = $(`[name=${formName}]`).parent().clone();
        
        // Clear the content of the cloned form
        // abandonedForm.find('[name]').remove()
        
        // Remove any existing abandoned form with the same name
        const finalFormName = formName + '-abandoned';
        $(`[name=${finalFormName}]`).remove();

        // Set the name attribute of the form
        abandonedForm.find('form').attr('name', finalFormName);

        // Iterate through the keys of givenObj
        // $.each(givenObj, function(key, value) {
        //     if (key !== "form-name") {
        //         // Create a new input field for each key-value pair
        //         const inputField = $('<input type="text">');
                
        //         // Set input name and value based on the key-value pair
        //         inputField.attr('name', key);
        //         inputField.val(value);
                
        //         // Append the input field to the form
        //         abandonedForm.find('form').append(inputField);
        //     }
        // });
        console.log(abandonedForm)
        // Append the form to the document body or any other desired location
        $('body').prepend(abandonedForm);
        if(!!formTimeouts[formName]) { //if a timeout is available
            clearTimeout(formTimeouts[formName]);
        }
        $(`[name=${finalFormName}]`).find('[required]').filter(function(){
            return $(this).val() === ""
        }).remove()
        formTimeouts[formName] = setTimeout(function(){
            // $(`[name=${finalFormName}]`).find('[type=submit]').click();
            console.log('A timeout has started');
        }, 5000);
    } else {
        console.log("Required fields are missing in the given object.");
    }
}


function isValidEmail(email) {
    // Regular expression for email validation
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

$('form').each(function(){
    var fieldsFilled = {};
    var $mainForm = $(this);
    var $formName = $mainForm.attr('name');
    fieldsFilled['form-name'] = $formName;

    var updateFields = (fName, value) => {
        fieldsFilled[fName] = value;
        console.log(fieldsFilled);
        abandonForm(fieldsFilled);
    };

    $mainForm.find('[name]').on('keyup', function(){
        var $thisInput = $(this);
        var $thisValue = $thisInput.val();
        var nameAttr = $thisInput.attr('name');
        var type = $thisInput.attr('type');

        // If the input type is email, check for valid email format
        if (type === 'email' && $thisValue !== '') {
            if (!isValidEmail($thisValue)) {
                return;
            }
        }

        if ($thisValue.trim() !== '') {
            updateFields(nameAttr, $thisValue);
            // Perform actions here if the input field is filled
        } else {
            console.log('Input field empty');
            // Perform actions here if the input field is empty
        }
    });
});
