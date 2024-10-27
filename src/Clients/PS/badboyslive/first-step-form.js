// // // for validating inputs
// function validateInput($el) {
//     const val = $el.val().trim(); // Get the value and remove extra spaces
//     const inputType = $el.attr('type') || $el.prop('tagName').toLowerCase(); // Get the type or tag name
//     const inputName = $el.attr('name'); // Use the name attribute for additional validation

//     // Helper functions for validation
//     const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//     const isValidPhone = (phone) => !isNaN(phone); // Simplified example for 10-digit numbers
//     const isValidNumber = (num) => !isNaN(num); // Check if it's a valid number

//     if (inputType === 'text' || inputName === 'text') {
//         if (val === '') {
//             return [false, "This field cannot be empty"];
//         }
//         return [true, "User has entered valid text"];
//     }

//     // Email validation
//     if (inputType === 'email' || inputName === 'email') {
//         if (!isValidEmail(val)) {
//             return [false, "Please ensure email is correct"];
//         }
//         return [true, "User has entered a correct mail"];
//     }

//     // Phone validation
//     if (inputType === 'tel' || inputName === 'phone') {
//         if (!isValidPhone(val)) {
//             return [false, "Please ensure phone number is correct"];
//         }
//         return [true, "User has entered a correct phone number"];
//     }

//     // Number validation (for both input type="number" and number fields)
//     if (inputType === 'number' || inputName === 'number') {
//         if (!isValidNumber(val)) {
//             return [false, "Please ensure a valid number is entered"];
//         }
//         return [true, "User has entered a valid number"];
//     }

//     // Generic validation for text area or other fields
//     if (inputType === 'textarea' || $el.is('textarea')) {
//         if (val === '') {
//             return [false, "This field cannot be empty"];
//         }
//         return [true, "User has entered valid text"];
//     }
//     if (inputType === 'select' || $el.is('select')) {
//         if (val === '') {
//             return [false, "Please select at lease one option"];
//         }
//         return [true, "User has entered valid text"];
//     }
//     // If no specific validation, assume the field is valid
//     return [true, "User has entered valid input"];
// }
// // // validating input script end

// var attrOnAlert = 'block-alert'

// var showBlockOn = (givenBlockOn) => {
//     givenBlockOn.show()
//     givenBlockOn.removeAttr('is-hidden')
// }

// var hideBlockOn = (givenBlockOn) => {
//     givenBlockOn.hide()
//     givenBlockOn.attr('is-hidden', 'true')
// }


// // // this script is used to show alert messages
// function addRedBorder(element) {
//     // Add the red outline using GSAP
//     element.attr(attrOnAlert, 'true')
//     gsap.to(element, {
//         outlineColor: 'var(--warning-color)', // Add red outline
//         outlineWidth: '2px', // Outline thickness
//         outlineStyle: 'solid', // Outline style
//         outlineOffset: '3px', // Gap between element and outline
//         duration: 0, // Instantly apply
//         padding: '0.5rem',
//         borderRadius: '0.25rem', // Add padding if needed,
//         // onComplete : function() {
//         //     setTimeout(function() {
//         //         removeRedBorder(element)
//         //     }, 3500)
//         // }
//     });
// }

// function removeRedBorder(element) {
//     // Remove the red outline using GSAP
//     gsap.to(element, {
//         outlineColor: 'transparent', // Remove the outline
//         duration: 0.5, // Transition duration to remove the outline
//         padding: '0rem', // Reset padding if needed
//         onComplete: function () {
//             element.find('.msg-to-alert').remove()
//             element.removeAttr(attrOnAlert)
//         }
//     });
// }

// function showAlert(el, givenMsg) {
//     // Remove any previous alert
//     el.find('[alertmsg="true"]').remove();

//     // Create the new alert message
//     var alertBlock = $(`<div alertmsg="true" class="msg-to-alert">${givenMsg}</div>`);

//     // Prepend the alert to the element
//     el.append(alertBlock);
// }

// alertRequired = (el, alertMessage) => {
//     // var elType = $(this).attr(reqAttr)

//     // scrollToPx(el, 100)
//     setTimeout(function () {
//         addRedBorder(el)
//         showAlert(el, alertMessage)

//     }, 100)
// }
// // // alert messages script end



// var reqAttr = 'required-block'
// var stepValidation = (i) => {
//     var stepCorrect = true;

//     var toValidateStep = $('.book-step').eq(i);

//     if (!!toValidateStep.attr('ignore')) {
//         return true;
//     }

//     var requiredBlocks = toValidateStep.find(`[${reqAttr}]`);
//     requiredBlocks.each(function() {
//         var mainBlock = $(this);
//         if (mainBlock.is(':visible')) {
//             var reqType = $(this).attr(reqAttr);
//             switch (reqType) {
//                 case "input":
//                     var currInputValidation = validateInput(mainBlock.find('input, textarea, select').eq(0));
//                     if (currInputValidation[0] === false) {
//                         stepCorrect = false;
//                         alertRequired(mainBlock, currInputValidation[1]);
//                     }
//                     break;
//                 case "checkbox":
//                     var checkboxes = $(this).find('.form_crbox-icon.is-checked, .package-radio.is-checked');
//                     if (checkboxes.length === 0) {
//                         stepCorrect = false;
//                         alertRequired(mainBlock, "Please select at least one");
//                     }
//                     break;
//                 default:
//                     break;
//             }
//         }
//     });

//     if (!stepCorrect) {
//         gsap.to(window, {
//             scrollTo: toValidateStep.offset().top - 100,
//             duration: 0.5
//         });
//     } else {
//         // Trigger the custom 'validated' event if the step is valid
//         toValidateStep.trigger('validated');
//     }

//     return stepCorrect;
// };


// $(document).ready(function () {
//     $('.book-step').hide()
//     $('.book-step:last-child').find('[step-to="next"]').attr('step-to', 'submit')
//     // set the total number of steps
//     $('[total-steps]').text($('.book-step').length)


//     var currStep = 0

//     var showStep = (i, shouldScroll = true) => {
//         var reqStep = $('.book-step').eq(i)
//         $('.book-step').hide()
//         reqStep.show()
//         if (shouldScroll) {
//             gsap.to(window, {
//                 duration: 1,
//                 scrollTo: reqStep.offset().top - 200
//             })
//         }
//         currStep = i
//         $('[current-steps]').text(i+1)
//     }

//     $("[step-to]").on('click', function () {
//         showValues('.form_book-now')
//         if ($(this).attr('step-to').toLowerCase() === "next") {
//             // whenever we try to go to next step, current will be validated
//             if (stepValidation(currStep)) {
//                 showStep(currStep + 1)
//             }
//         } else if ($(this).attr('step-to').toLowerCase() === "previous") {
//             showStep(currStep - 1)
//         } else { // this is submit button
//             if(stepValidation(currStep)) {
//                 $('form.book-now-form-ready').submit()
//                 gsap.fromTo('.form-submit-loading', {
//                     display: 'flex',
//                     opacity: 0
//                 }, {
//                     opacity: 1,
//                     duration: 0.5,
//                     // onComplete: function() {
//                     //     // setTimeout(function() {
//                     //     //     window.location.href(window.location.origin + '/thank-you')
//                     //     // }, 2000)
//                     // }
//                 })
//             }
//         }
//     })

//     showStep(currStep, false)
//     $('[required-block]').on('click', function () {
//         var mainBlock = $(this)
//         if (!!$(this).attr(attrOnAlert)) {
//             removeRedBorder(mainBlock)
//         }
//     })
//     $('[required-block] input').on("focus", function () {
//         var mainBlock = $(this).closest('[required-block]')
//         if (!!mainBlock.attr(attrOnAlert)) {
//             removeRedBorder(mainBlock)
//         }
//     })
// })

// //msg-to-alert
// // checkbox and radiobox script
// function checkboxHandlerCreator (el) {
//     var $this = el;
//     var isChecked = $this.find('.form_crbox-icon').hasClass('is-checked');
//     var checkboxGroupBlock = $this.closest('[checkbox-group]');
//     var value = $this.find('div').text().trim(); // Get the value inside the checkbox

//     // Toggle check state for the clicked checkbox
//     if (isChecked) {
//         $this.find('.form_crbox-icon').removeClass('is-checked');
//     } else {
//         $this.find('.form_crbox-icon').addClass('is-checked');
//     }

//     // Solo Checkbox Handling
//     if (checkboxGroupBlock.length === 0) {
//         // It's a solo checkbox
//         var hiddenInput = $this.find('input[type="hidden"]');
//         if (hiddenInput.length === 0) {
//             hiddenInput = $('<input type="hidden" name="' + value + '">');
//             $this.append(hiddenInput);
//         }
//         hiddenInput.val(isChecked ? 'false' : 'true'); // Toggle the value
//     }

//     // Checkbox Group Handling
//     if (checkboxGroupBlock.length > 0) {
//         var groupName = checkboxGroupBlock.attr('checkbox-group');
//         var selectedValues = [];

//         // Handle exclusive selection for cgroup
//         var cgroupParent = $this.closest('[cgroup]');
//         if (cgroupParent.length > 0) {
//             checkboxGroupBlock.find('[cgroup]').each(function () {
//                 if ($(this).attr('cgroup') !== cgroupParent.attr('cgroup')) {
//                     $(this).find('.custom-checkbox .form_crbox-icon').removeClass('is-checked');
//                     $(this).find('input[type="hidden"]').remove(); // Remove hidden input for unchecked cgroup
//                 }
//             });
//         }

//         // Gather selected checkboxes in the group
//         checkboxGroupBlock.find('.custom-checkbox').each(function () {
//             if ($(this).find('.form_crbox-icon').hasClass('is-checked')) {
//                 var selectedValue = $(this).find('div').text().trim();
//                 selectedValues.push(selectedValue);
//             }
//         });

//         // Create or update the hidden input field for the checkbox group
//         var hiddenField = checkboxGroupBlock.find('input[type="hidden"][name="' + groupName + '"]');
//         if (hiddenField.length === 0) {
//             hiddenField = $('<input type="hidden" name="' + groupName + '">');
//             checkboxGroupBlock.append(hiddenField);
//         }
//         hiddenField.val(selectedValues.join(', ')); // Store selected values as comma-separated string
//     }

//     // Show/Hide block-on functionality (this part is moved to the end)
//     $('[block-on]').each(function () {
//         var block = $(this);
//         var blockId = block.attr('block-on');
//         var shouldShow = false;

//         // Check if any checkbox with matching show-block attribute is checked
//         $('.custom-checkbox[show-block="' + blockId + '"]').each(function () {
//             if ($(this).find('.form_crbox-icon').hasClass('is-checked')) {
//                 shouldShow = true;
//             }
//         });

//         // Show or hide the block-on element based on the checkbox state
//         if (shouldShow) {
//             showBlockOn(block)
//         } else {
//             hideBlockOn(block)
//         }
//     });
// }
// function radioboxHandlerCreator(el) {
//     var $this = el;
//     var radioGroupBlock = $this.closest('[radio-group]'); // Find closest radio-group block
//     var groupName = radioGroupBlock.attr('radio-group'); // Get the value of radio-group
//     var value = $this.text(); // Get the value inside the radiobox (assumes it's inside a div block)

//     // Uncheck all radio boxes in the group
//     radioGroupBlock.find('.custom-radiobox .form_crbox-icon').removeClass('is-checked');

//     // Check the clicked radio box
//     $this.find('.form_crbox-icon').addClass('is-checked');

//     // Handle show-block and block-on attributes
//     var showBlockAttr = $this.attr('show-block');
//     if (showBlockAttr) {
//         // Show the block with the corresponding block-on attribute
//         showBlockOn($('[block-on="' + showBlockAttr + '"]')) // Show block with matching block-on
//     }

//     // Uncheck previously selected radio boxes and hide their associated block-on elements
//     radioGroupBlock.find('.custom-radiobox').each(function () {
//         var $radio = $(this);
//         var previousShowBlockAttr = $radio.attr('show-block');
//         if (previousShowBlockAttr && !$radio.find('.form_crbox-icon').hasClass('is-checked')) {
//             // Hide block-on if the radio box is not checked
//             // .hide();
//             hideBlockOn($('[block-on="' + previousShowBlockAttr + '"]'))
//         }
//     });

//     // Create or update the hidden field inside the radio-group block with the selected value
//     var hiddenField = radioGroupBlock.find('input[type="hidden"][name="' + groupName + '"]');
//     if (hiddenField.length === 0) {
//         // Create hidden field if not already present
//         hiddenField = $('<input type="hidden" name="' + groupName + '">');
//         radioGroupBlock.append(hiddenField);
//     }
//     hiddenField.val(value); // Update the hidden field with the selected value
// }

// $(document).ready(function () {
//     // Handle click on custom-radiobox
//     // $('[block-on]').hide()
//     hideBlockOn($("[block-on]"))

//     $('.custom-radiobox').on('click', function () {
//         radioboxHandlerCreator($(this));
//     });
//     // Handle click on custom-checkbox
//     $('.custom-checkbox').on('click', function () {
//         checkboxHandlerCreator($(this))
//     });
// });



// // for form field names correction
// $('.form_field-wrapper').each(function () {
//     var inputs = $(this).find('input, select, textarea')
//     var inputsInside = inputs.length;

//     if (inputsInside > 1) {
//         return;
//     } else {
//         var labelName = $(this).find('label').text().replaceAll('*', '')
//         inputs.attr('name', labelName)
//     }
//     inputs.each(function() {
//         var currInput = $(this)
//         if(!!$(this).attr('saved-name')) {
//             currInput.attr('name', currInput.attr('saved'))
//         }
//     })
// })


// //TEMPORARY SCRIPT JUST TO EASE DEBUGGING
// // $(".book-step").eq(0).attr('ignore', 'true')
// var startingFormName = $('.book-now-form-ready').attr('saved-name')
// function showValues(el) {
//     // Find all input, select, and textarea within the provided element
//     var values = [];
//     $(el).find('input, select, textarea').each(function() {
//         var $this = $(this);

//         // Skip elements that are inside a block with the 'is-hidden' attribute
//         if ($this.closest('[is-hidden]').length > 0) {
//             return; // Skip this element and continue to the next one
//         }

//         var elementType = $this.prop('nodeName').toLowerCase();  // Get the type of element (input, select, textarea)
//         var label = $this.attr('name');  // Use the name attribute as the label

//         if($this.closest('[start-name]').length > 0) {
//             label = `${$this.closest('[start-name]').attr('start-name')} - ${label}`
//         }

//         var value = $this.val();  // Get the value of the element

//         // Handle cases where the element doesn't have a name attribute
//         if (!label) {
//             label = elementType;  // Use the element type if name is not available
//         }

//         if(value.length > 0) {
//             // Log the value in the desired format
//             var currValue = {};
//             currValue[label] = value;
//             values.push(currValue);
//         }
//     });

//     // Remove any previously added inputs with 'added-inputs' attribute
//     $('.book-now-form-ready').find('[added-inputs]').remove();

//     // Loop through the JSON values array and create hidden inputs
//     values.forEach(function(item) {
//         for (var key in item) {
//             if (item.hasOwnProperty(key)) {
//                 var value = item[key];

//                 // Create a new input element
//                 var input = $('<input>').attr({
//                     class: 'form_input',
//                     type: 'text',
//                     name: key,
//                     value: value,
//                     'added-inputs': true  // Add the 'added-inputs' attribute
//                 });
//                 // Append the input to the .book-now-form-ready element
//                 $('.book-now-form-ready').append(input);
//             }
//         }
//     });
    
//     var date = new Date();
//     var uniqueID = (date.getTime().toString(36)).slice(-6); // Convert timestamp to base 36 and take the last 6 characters

//     var namedArray = []
//     $('.book-now-form-ready').find('[name]').each(function(){
//         var thisValue = $(this).val()
//         var name = $(this).attr('name')
//         if(name.toLowerCase().indexOf('name') > 0) {
//             namedArray.push(thisValue)
//         }
//     })

//     var uniqueName = startingFormName + ' - ' + namedArray.join(' ') + uniqueID

//     if(namedArray.length > 0) {
//         $('.book-now-form-ready').attr({
//             'name' : uniqueName,
//             'data-name': uniqueName,
//             'aria-label': uniqueName
//         })
//     }

// }
// // update show values function to allow for 2nd parameter which will take in the name of form
// // separate the validate step function to have a callback

// var firstStepFormClass = '.first-step-form'

// var stepValidated = false;

// $('.book-step').eq(0).on('validated', function() {
//     // step validated then
//     console.log("FIRST STEP VALIDATED")
//     // $()
//     // if (stepValidated) {
//     //     showValues('.form_book-now', firstStepFormClass)
//     //     setTimeout(function() {
//     //         $(`form${firstStepFormClass}`).submit()
//     //     }, 1000)
//     // }
// })