// // alert('Running book now test script')

// // FIRST SCRIPT START
// var updateCheckboxResult, hideFormEl, showFormEl;
// var updateOverlayVisibility = () => {
//     $('.submit-button-overlay').hide()
//     var toShowOverlay = false;
//     $('[required-block]').each(function () {
//         if($(this).is(":visible")) {
//             if($(this).find('.is-checked').length === 0) {
//                 toShowOverlay = true;
//             }
//         }
//     })
//     if(toShowOverlay) {
//         $('.submit-button-overlay').show()
//     }
//     // console.log("UPDATING")
// }

// // this code is for hiding or unhiding elements of the page
// // while making sure we don't see unwanted fields in the final form submission
// // it also makes sure we don't miss on important values user is providing
// $(document).ready(function () {

//     // Storing required states
//     $('[required]').each(function () {
//         $(this).attr('data-required', 'true')
//     })

//     // this is used to update input name
//     function normalNoHyphens(input) {
//         return input.replace(/-/g, ' ')
//             .replace(/\b\w/g, function (char) {
//                 return char.toUpperCase();
//             });
//     }

//     var nameFinal = (el, givenName) => {
//         return givenName;
//     }

//     // setting field names to be what's expected
//     $('.form_field-wrapper').each(function () {
//         var inputs = $(this).find('input, select')
//         var inputsInside = inputs.length;
//         if (inputsInside > 1) {
//             return;
//         } else {
//             var labelName = $(this).find('label').text().replaceAll('*', '')
//             inputs.attr('name', nameFinal(inputs, labelName))
//         }
//     })

//     // setting checkbox name to be what's expected.
//     $('input[type=checkbox]').each(function () {
//         var labelName = $(this).parent().find('.w-form-label').text().replaceAll('*', '')
//         $(this).attr('name', nameFinal($(this), labelName))
//     })

//     // setting radio name to be what's expected
//     $('input[type=radio]').each(function () {
//         var radioName = normalNoHyphens($(this).closest('[radio-name]').attr('radio-name').replaceAll('*', ''))
//         var labelName = $(this).parent().find('.w-form-label').text().replaceAll('*', '')

//         $(this).attr('name', nameFinal($(this), radioName))
//         $(this).attr('value', labelName)
//     })

//     // setting data-name to be same as name
//     $('input, select').each(function () {
//         $(this).attr('data-name', $(this).attr('name'))
//     })

//     //saving the form field names 
//     $('[data-name]').each(function () {
//         $(this).attr('saved-name', $(this).attr('data-name'))
//     })

//     showFormEl = (el) => {
//         // Revert the effects of "REMOVING ALL VALUES"
//         el.css('display', 'block');

//         // Restore the names and data-names for elements that had them saved
//         el.find('[saved-name]').each(function () {
//             $(this).attr('data-name', $(this).attr('saved-name'));
//             $(this).attr('name', $(this).attr('saved-name'));
//         });

//         // Re-enable required fields
//         el.find('[data-required]').attr('required', '');

//         // Restore input values for text fields, textareas, and selects
//         el.find('[name]').each(function () {
//             // If the field is an input (not radio or checkbox), textarea, or select, revert to saved value if available
//             if ($(this).is('input') && !$(this).is('[type="radio"], [type="checkbox"]')) {
//                 $(this).val($(this).attr('saved-value') || ''); // Restore saved value or keep empty
//             } else if ($(this).is('textarea')) {
//                 $(this).val($(this).attr('saved-value') || ''); // Restore saved value for textarea
//             } else if ($(this).is('select')) {
//                 $(this).val($(this).attr('saved-value') || ''); // Restore saved value for select
//             }
//         });
//         // updateOverlayVisibility()
//     };

//     hideFormEl = (el) => {
//         el.find('[name]').each(function () {
//             // If the field is an input (not radio or checkbox), textarea, or select, store its value
//             if ($(this).is('input') && !$(this).is('[type="radio"], [type="checkbox"]')) {
//                 $(this).attr('saved-value', $(this).val()); // Save current value
//                 $(this).val(''); // Clear input value
//             } else if ($(this).is('textarea')) {
//                 $(this).attr('saved-value', $(this).val()); // Save current value
//                 $(this).val(''); // Clear textarea value
//             } else if ($(this).is('select')) {
//                 var $select = $(this);
//                 $select.attr('saved-value', $select.val()); // Save current selected value
//                 // Clear select value, add a temporary empty option if necessary
//                 if ($select.find('option[value=""]').length === 0) {
//                     $select.prepend('<option value=""></option>');
//                 }
//                 $select.val(''); // Set value to empty
//             }
//         });

//         // Hide the element and remove required attributes
//         el.css('display', 'none');
//         el.find('[required]').removeAttr('required');
//         el.find('[name]').attr('name', ' ');
//         el.find('[data-name]').attr('data-name', ' ');
//         // updateOverlayVisibility()
//     };

//     // this blocks are basically going to be shown on a specific value of radio check
//     $('[radio-check]').each(function () {
//         var main = $(this);
//         var nameVal = main.attr('radio-check').split('||');
//         var reqName = normalNoHyphens(nameVal[0].trim());
//         var reqVal = nameVal[1].trim();

//         // Initial check to set the visibility based on the current state
//         var checkVisibility = function () {
//             var givenVal = $(`[saved-name="${reqName}"]:checked`).val()
//             var isChecked = givenVal === reqVal;
//             if (isChecked) {
//                 showFormEl(main)
//             } else {
//                 hideFormEl(main)
//             }
//         };

//         // Attach the change event listener
//         $(`[saved-name="${reqName}"]`).on('change', checkVisibility);

//         // Initial call to set the correct state on page load
//         checkVisibility();
//     });

//     hideFormEl($('[check]'))
//     hideFormEl($('[radio-check]'))

//     // service custom checkbox
//     updateCheckboxResult = () => {
//         // what to update - service field, blocks apperance
//         // service field text appear
//         var selectedServices = []
//         $(".service_checkbox.is-custom .form_cbox-icon.is-checked").each(function () {
//             var label = $(this).parent().text()
//             selectedServices.push(label)
//         })
//         $("[service]").val(selectedServices.join(' , '))
//         // to make sure blocks appear
//         $('[check]').each(function () {
//             var main = $(this)
//             var inputName = $(this).attr('check')
//             if (selectedServices.includes(inputName)) {
//                 showFormEl(main)
//             } else {
//                 hideFormEl(main)
//             }
//         })
//     }

//     // this is just for service checkbox showing or hiding form elements 
//     $(".service_checkbox.is-custom").each(function () {

//         $(this).on("click", function () {
//             var isPackage = $(this).hasClass("goforpackage");

//             if (isPackage) { // this is a package checkbox
//                 // Uncheck all other checkboxes
//                 $(".service_checkbox.is-custom").not(this).find('.form_cbox-icon')
//                     .removeClass('is-checked');
//             } else { // this is not a package checkbox
//                 // Uncheck package checkbox
//                 $(".service_checkbox.is-custom.goforpackage").find('.form_cbox-icon')
//                     .removeClass('is-checked');
//             }

//             // Toggle the clicked checkbox
//             $(this).find('.form_cbox-icon').toggleClass('is-checked');
//             updateCheckboxResult();
//         });

//     });


//     // this function makes sure we don't miss on any fields that user is providing
//     function refreshFields() {
//         $('[book-now-form]').find('[saved-name]').each(function () {
//             if ($(this).is(':visible')) {
//                 // Set the name attribute to the value of 'saved-name'
//                 $(this).attr('name', $(this).attr('saved-name'));
//             } else {
//                 // Set the name attribute to a blank space
//                 $(this).attr('name', ' ');
//             }
//         });
//         updateOverlayVisibility()
//         // console.log($('[name=" "]').length)
//     }

//     // Run the refreshFields function every 200 milliseconds
//     setInterval(refreshFields, 200);

// })
// // FIRST SCRIPT END













// // SECOND SCRIPT START
// // this code is just to make sure the form name is updated to be "FORM NAME - USER NAME #UNIQUEID"
// $(document).ready(function () {
//     var prevUserName;
//     var formNameUpdateInterval = setInterval(() => {

//         var userName = '';
//         var names = [];

//         // Collect names from fields with the [name-field] attribute
//         $('[name-field]').each(function () {
//             names.push($(this).val());
//         });

//         userName = names.join(' ');

//         // Generate a unique ID based on the current time and date
//         var date = new Date();
//         var uniqueID = (date.getTime().toString(36)).slice(-6); // Convert timestamp to base 36 and take the last 6 characters

//         // Only update if the user name has changed
//         if (userName !== prevUserName) {
//             console.log(userName);
//             prevUserName = userName;

//             var savedName = $('[main-form]').attr('main-form');
//             var toUpdate = ['name', 'data-name', 'aria-label', 'saved-name'];

//             // Update the main form attributes with savedName, userName, and unique ID
//             toUpdate.forEach(function (attr) {
//                 $('[main-form]').attr(attr, savedName + " - " + userName + " #" + uniqueID.toUpperCase());
//             });
//         }

//     }, 400);
// });
// // SECOND SCRIPT END













// // THIRD SCRIPT START

// // this function is for custom checkboxes validation
// // it also has a function to add event listener to new checkboxes that will be added.
// // it also adds an event listener to form submit button to ensure all custom required inputs are working
// // var checkboxFunctionality;
// // $(document).ready(function () {

// function addRedBorder(element) {
//     // Add the red outline using GSAP
//     gsap.to(element, {
//         outlineColor: 'var(--warning-color)', // Add red outline
//         outlineWidth: '2px', // Outline thickness
//         outlineStyle: 'solid', // Outline style
//         outlineOffset: '3px', // Gap between element and outline
//         duration: 0, // Instantly apply
//         padding: '1rem',
//         borderRadius: '0.25rem' // Add padding if needed
//     });
// }

// function removeRedBorder(element) {
//     // Remove the red outline using GSAP
//     gsap.to(element, {
//         outlineColor: 'transparent', // Remove the outline
//         duration: 0.5, // Transition duration to remove the outline
//         padding: '0rem' // Reset padding if needed
//     });
// }

// function showAlert(givenMsg) {
//     var alTl = gsap.timeline({
//         onComplete: function () {
//             $(".alert-message").hide()
//         }
//     })
//     $('[alert-txt]').text(givenMsg)
//     alTl.fromTo('.alert-message', {
//         opacity: 0,
//         display: "flex",
//     }, {
//         opacity: 1,
//     }).to('.alert-message', {
//         opacity: 0,
//     }, 3)
// }

// alertRequired = (el, alertMessage) => {
//     scrollToPx(el, 100)
//     setTimeout(function () {
//         addRedBorder(el)
//         // setTimeout(()=> {
//         //     removeRedBorder()
//         // }, 2000)
//         showAlert(alertMessage)

//         var waitForCheck = setInterval(function () {
//             if (el.find('.is-checked').length > 0) { // now checkbed
//                 clearInterval(waitForCheck)
//                 removeRedBorder(el)
//             }
//         }, 200)

//     }, 700)
// }

// function rethinkFormSubmit() {
//     var allChecked = true;

//     $('[required-block]').each(function() {
//         if ($(this).find('.is-checked').length === 0) {
//             allChecked = false;
//             return false; // break out of loop if any block doesn't have is-checked
//         }
//     });

//     if (allChecked) {
//         $('.submit-button-overlay').hide();  // Hide overlay if all required blocks are valid
//     } else {
//         $('.submit-button-overlay').show();  // Show overlay if any required block is invalid
//     }
//     // $('[required-block]')
// }

// var checkboxFunctionality = () => {
//     // Handle custom checkboxes
//     $(".form_checkbox.is-custom").each(function () {
//         // Check if the click event has already been added
//         if (!$(this).attr('event-added')) {
//             $(this).attr('event-added', 'true'); // Add the event-added attribute

//             // Attach the click event handler
//             $(this).on('click', function () {
//                 var $checkboxIcon = $(this).find('.form_cbox-icon');
//                 var checkboxPairValue = $checkboxIcon.attr('checkbox-pair');

//                 if (checkboxPairValue) {
//                     // Uncheck other checkboxes with the same checkbox-pair value within the same required block
//                     var $siblings = $(this).closest('[required-block]').find('.form_cbox-icon[checkbox-pair="' + checkboxPairValue + '"]');
//                     $siblings.not($checkboxIcon).removeClass('is-checked'); // Remove is-checked from siblings
//                 }

//                 // Toggle the checked state of the clicked checkbox
//                 $checkboxIcon.toggleClass('is-checked');
//             });
//         }
//     });
//     $('[required-block]').each(function(){
//         if(!$(this).attr('event-added')) {
//             $(this).attr('event-added', 'true');
//             $(this).on('click', rethinkFormSubmit)
//         }
//     })
// }


// // THIRD SCRIPT END













// // FOURHT SCRIPT STARTS
// // this script is just for packages and it's related functionalities
// $(document).ready(function () {
//     checkboxFunctionality();

//     function addCheckbox(checkboxName, elToAppendTo) {
//         // Create the checkbox container div
//         var checkboxContainer = $('<div>', {
//             class: 'form_checkbox is-custom'
//         });

//         // Create the icon div and apply attributes from attributeJson
//         var checkboxIcon = $('<div>', {
//             class: 'form_cbox-icon'
//         });

//         // Create the label div with the checkboxName
//         var checkboxLabel = $('<div>').text(checkboxName);

//         // Append the icon and label to the checkbox container
//         checkboxContainer.append(checkboxIcon).append(checkboxLabel);

//         // Append the checkbox container to the given element
//         elToAppendTo.append(checkboxContainer);
//     }

//     function getUrlParameter(name) {
//         name = name.replace(/[\[\]]/g, "\\$&");
//         var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
//         var results = regex.exec(window.location.href);
//         if (!results) return null;
//         if (!results[2]) return '';
//         return decodeURIComponent(results[2].replace(/\+/g, " "));
//     }

//     // this will make sure value comes out in form submission
//     function setInputVal(inputName, val, afterBlock) {
//         // Find the input element with the given name attribute
//         let $input = $(`input[name="${inputName}"]`);

//         // If the input does not exist, create one
//         if ($input.length === 0) {
//             // Find the form with class 'contact4_form'
//             const $form = $('.contact4_form');

//             // If the form exists, create and append the new input element
//             if ($form.length > 0) {
//                 $input = $('<input>', {
//                     type: 'hidden',
//                     name: inputName,
//                 });
//                 afterBlock.after($input); // Append the input to the form
//             } else {
//                 console.error('Form with class "contact4_form" not found.');
//                 return;
//             }
//         }

//         // Set the value of the input element
//         $input.val(val);
//     }


//     var packagesLink = window.location.origin + '/packages';
//     // make ajax request to this link
//     function fetchAndGetContent(link, selector) {
//         return new Promise((resolve, reject) => {
//             $.ajax({
//                 url: link,
//                 type: 'GET',
//                 success: function (response) {
//                     // Parse the response HTML
//                     var htmlContent = $('<div>').html(response);

//                     // Find the element with class 'section_product-header3'
//                     var section = htmlContent.find(selector);

//                     // Resolve the promise with the section or false if not found
//                     if (section.length > 0) {
//                         resolve(section);
//                     } else {
//                         console.log(`Element with selector ${selector} not found.`);
//                         resolve(false);
//                     }
//                 },
//                 error: function (xhr, status, error) {
//                     console.log('Error fetching the content:', error);
//                     reject(error);
//                 }
//             });
//         });
//     }

//     var pdSelector = '.package-dropdown';
//     var $packagesContainer = $('.packages-list');

//     // Store the base dropdown template before the loop starts
//     var $dropdownTemplate = $(pdSelector).first().clone();

//     // Remove the base template only after storing it
//     $(pdSelector).remove();

//     fetchAndGetContent(packagesLink, '[package-section]').then(function (packageSection) {
//         // first of all we're hiding the adiditional upgrades block, since no option will be selection at start
//         hideFormEl($('[au-block]'))
//         if (packageSection) {
//             var $plans = packageSection.find('.pricing20_plan');

//             $plans.each(function () {
//                 var planName = $(this).find('.plan-name').text();
//                 var planContent = $(this).find('.pricing20-top').clone();
//                 var planPrice = $(this).find('.plan-price').text();
//                 var planId = `plan-${planName.toLowerCase().replaceAll(' ', '-')}`
//                 // Remove unwanted elements from planContent
//                 planContent.find('.pricing20-bottom, .plan-name').remove();

//                 // Clone the stored dropdown template for each plan
//                 var $packageDropdown = $dropdownTemplate.clone(true, true);

//                 // Update dropdown with plan details
//                 $packageDropdown.find('[plan-name]').text(`${planName} - ${planPrice}`);
//                 $packageDropdown.find('[plan-content]').html(planContent.html());
//                 $packageDropdown.attr('id', planId)

//                 var packageOptions = $packageDropdown.find('[or-option]');
//                 $packageDropdown.click(function () {
//                     if ($(this).find('.package-radio').hasClass('is-checked')) {
//                         // extra options can only be added if there are extra options
//                         if (packageOptions.length > 0) {
//                             // if it has got the class of is-checked, we'll add the new checkboxes after it
//                             // we'll use ID to track where to add
//                             console.log('clicked on a plan option')
//                             var checkboxesTexts = packageOptions.text().toLowerCase().split('or')
//                             // for this specific radio box, we want to track the changes in the block with class 
//                             if ($(`[options-for="${planId}"]`).length > 0) { // this means we already have options there so no need to add

//                             } else {
//                                 var optionsWrapper = $('<div>', {
//                                     "required-block": 'Please select your package option',
//                                     "options-for": planId,
//                                     "class": "form_radio-2col service-checkboxes"
//                                 });
//                                 $.each(checkboxesTexts, function (index, text) {
//                                     addCheckbox(text, optionsWrapper);
//                                 });
//                                 optionsWrapper.find('.form_cbox-icon').attr('checkbox-pair', planId)
//                                 // finally after adding the checbkoxes inside the 
//                                 optionsWrapper.click(function () {
//                                     setTimeout(function () {
//                                         var selectedOptions = optionsWrapper.find('.is-checked')
//                                         if (selectedOptions.length > 0) {
//                                             setInputVal("Extra Options", optionsWrapper.find('.is-checked').parent().text(), $(`#${planId}`))
//                                         }
//                                     }, 200)
//                                 })
//                                 $(`#${planId}`).after(optionsWrapper);
//                                 checkboxFunctionality()
//                             }
//                         } else {
//                             // that means the current checked package doesn't have options, in this case, we'll remove extra options field
//                             $(`[name="Extra Options"]`).remove()
//                         }

//                         // the fact that this is checked means extra options for other packages should be removed
//                         $("[options-for]").each(function () {
//                             if ($(this).attr('options-for') != planId) {
//                                 $(this).remove();
//                             }
//                         })


//                     }
//                 })

//                 // Append the populated dropdown to the container
//                 $packagesContainer.append($packageDropdown);
//             });
//         }

//         // Set the dropdown and radio functionality after elements are appended
//         $(pdSelector).each(function () {
//             var currentPackage = $(this)
//             var toggle = $(this).find('[dtoggle]');
//             var content = $(this).find('[dcontent]');
//             var arrow = $(this).find('[darrow]');
//             var radioCheck = $(this).find('[custom-radio-check]');
//             var currentUpgradeOptions = $(this).find('[au-options]')
//             var dOpen = false;

//             // dropdown function starts

//             // Initialize a separate GSAP timeline for each dropdown
//             var dTl = gsap.timeline({
//                 paused: true
//             });

//             dTl.to(content, {
//                 height: 0,
//             }).to(arrow, {
//                 rotate: 180
//             }, 0);

//             toggle.click(function (event) {
//                 // Check if the clicked target is outside the [radio-check] element
//                 if (!$(event.target).closest(radioCheck).length) {
//                     if (dOpen) {
//                         dTl.reverse();
//                     } else {
//                         dTl.play();
//                     }
//                     dOpen = !dOpen;
//                 }
//             });

//             // Trigger the close state initially
//             toggle.click();

//             // dropdown function ends

//             // radio function starts
//             var planName = $(this).find('[plan-name]').text()
//             var packageRadio = $(this).find('.package-radio')
//             $("[package]").attr('disabled', 'true').css({
//                 opacity: '0.7'
//             })
//             radioCheck.click(function () {
//                 $('.package-radio').removeClass('is-checked')
//                 packageRadio.addClass('is-checked')
//                 $("[package]").val(planName)
//                 // befoer showing the additional upgrades input we'll add the additional upgrade info
//                 $('[au-info]').html('')
//                 $('[au-info]').append(currentUpgradeOptions)
//                 // since one package is already checked and assuming all packages have additional upgrades we show au-block
//                 showFormEl($('[au-block]'))
//                 scrollToPx(currentPackage, 200)

//             })
//         });

//         // once everything is set, now is the time to select the package
//         var selectedPackage = getUrlParameter('package')
//         if (!!selectedPackage) {
//             // user came from packages, we need to select the package already
//             $('.goforpackage').click()
//             $('.package-radio-wrap').eq(parseInt(selectedPackage)).click()
//         }
//     });

//     $('.submit-button-overlay').on('click', function (e) {

//         // Iterate through each required block that is visible
//         $('[required-block]').each(function () {
//             var messageToAlert = $(this).attr('required-block');
//             var el = $(this);

//             // Validate if the block is visible
//             if (el.is(':visible')) {
//                 if (el.find('.is-checked').length === 0) {
//                     allValid = false;
//                     alertRequired(el, messageToAlert);
//                 }
//             }
//         });

//     });
    
// })

// // FOURTH SCRIPT END