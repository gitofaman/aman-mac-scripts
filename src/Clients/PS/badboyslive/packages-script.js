$(document).ready(function () {
    // checkboxFunctionality();

    function addCheckbox(checkboxName, elToAppendTo) {
        // Create the checkbox container div
        var checkboxContainer = $('<div>', {
            class: 'custom-checkbox'
        });

        // Create the icon div and apply attributes from attributeJson
        var checkboxIcon = $('<div>', {
            class: 'form_crbox-icon'
        });

        // Create the label div with the checkboxName
        var checkboxLabel = $('<div>').text(checkboxName);

        // Append the icon and label to the checkbox container
        checkboxContainer.append(checkboxIcon).append(checkboxLabel);
        checkboxContainer.on('click', function() {
            var thisCrbox = $(this).find('.form_crbox-icon');
            
            // Remove 'is-checked' from all except thisCrbox
            $('[options-for]').find('.form_crbox-icon').not(thisCrbox).removeClass('is-checked');
            
            // Add 'is-checked' to thisCrbox
            thisCrbox.addClass('is-checked');
            removeRedBorder(checkboxContainer.closest('[required-block]'))
        });
        
        // checkboxHandlerCreator(checkboxContainer)

        // Append the checkbox container to the given element
        elToAppendTo.append(checkboxContainer);
        // return checkboxContainer;
    }

    function getUrlParameter(name) {
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
        var results = regex.exec(window.location.href);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    // this will make sure value comes out in form submission
    function setInputVal(inputName, val, afterBlock) {
        // Find the input element with the given name attribute
        let $input = $(`input[name="${inputName}"]`);

        // If the input does not exist, create one
        if ($input.length === 0) {
            // Find the form with class 'contact4_form'
            const $form = $('.packages-list');

            // If the form exists, create and append the new input element
            if ($form.length > 0) {
                $input = $('<input>', {
                    type: 'hidden',
                    name: inputName,
                });
                afterBlock.after($input); // Append the input to the form
            } else {
                console.error('Form with class "packages-list" not found.');
                return;
            }
        }

        // Set the value of the input element
        $input.val(val);
    }


    var packagesLink = window.location.origin + '/packages';
    // make ajax request to this link
    function fetchAndGetContent(link, selector) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: link,
                type: 'GET',
                success: function (response) {
                    // Parse the response HTML
                    var htmlContent = $('<div>').html(response);

                    // Find the element with class 'section_product-header3'
                    var section = htmlContent.find(selector);

                    // Resolve the promise with the section or false if not found
                    if (section.length > 0) {
                        resolve(section);
                    } else {
                        console.log(`Element with selector ${selector} not found.`);
                        resolve(false);
                    }
                },
                error: function (xhr, status, error) {
                    console.log('Error fetching the content:', error);
                    reject(error);
                }
            });
        });
    }

    var pdSelector = '.package-dropdown';
    var $packagesContainer = $('.packages-list');

    // Store the base dropdown template before the loop starts
    var $dropdownTemplate = $(pdSelector).first().clone();

    // Remove the base template only after storing it
    $(pdSelector).remove();

    fetchAndGetContent(packagesLink, '[package-section]').then(function (packageSection) {
        if (packageSection) {
            var $plans = packageSection.find('.pricing20_plan');

            $plans.each(function () {
                var planName = $(this).find('.plan-name').text();
                var planContent = $(this).find('.pricing20-top').clone();
                var planPrice = $(this).find('.plan-price').text();
                var planId = `plan-${planName.toLowerCase().replaceAll(' ', '-')}`
                // Remove unwanted elements from planContent
                planContent.find('.pricing20-bottom, .plan-name').remove();

                // Clone the stored dropdown template for each plan
                var $packageDropdown = $dropdownTemplate.clone(true, true);

                // Update dropdown with plan details
                $packageDropdown.find('[plan-name]').text(`${planName} - ${planPrice}`);
                $packageDropdown.find('[plan-content]').html(planContent.html());
                $packageDropdown.attr('id', planId)

                var packageOptions = $packageDropdown.find('[or-option]');
                $packageDropdown.click(function () {
                    if ($(this).find('.package-radio').hasClass('is-checked')) {
                        // extra options can only be added if there are extra options
                        if (packageOptions.length > 0) {
                            // if it has got the class of is-checked, we'll add the new checkboxes after it
                            // we'll use ID to track where to add
                            console.log('clicked on a plan option')
                            var checkboxesTexts = packageOptions.text().toLowerCase().split('or')
                            // for this specific radio box, we want to track the changes in the block with class 
                            if ($(`[options-for="${planId}"]`).length > 0) { // this means we already have options there so no need to add

                            } else {
                                var optionsWrapper = $('<div>', {
                                    "required-block": 'checkbox',
                                    "options-for": planId,
                                    "class": "form_radio-2col",
                                    "radio-group": "Extra Options"
                                });
                                // var createdRadios = []
                                $.each(checkboxesTexts, function (index, text) {
                                    // createdRadios.push()
                                    addCheckbox(text, optionsWrapper)
                                });
                                // optionsWrapper.find('.form_cbox-icon').attr('checkbox-pair', planId)
                                // finally after adding the checbkoxes inside the 
                                optionsWrapper.click(function () {
                                    setTimeout(function () {
                                        var selectedOptions = optionsWrapper.find('.is-checked')
                                        if (selectedOptions.length > 0) {
                                            setInputVal("Extra Options", optionsWrapper.find('.is-checked').parent().text(), $(`#${planId}`))
                                        }
                                    }, 200)
                                })
                                $(`#${planId}`).after(optionsWrapper);

                                // createdRadios.forEach(function(radio) {
                                //     // console.log('adding radios')
                                //     radioboxHandlerCreator(radio)
                                // })
                            }
                        } else {
                            // that means the current checked package doesn't have options, in this case, we'll remove extra options field
                            $(`[name="Extra Options"]`).remove()
                        }

                        // the fact that this is checked means extra options for other packages should be removed
                        $("[options-for]").each(function () {
                            if ($(this).attr('options-for') != planId) {
                                $(this).remove();
                            }
                        })


                    }
                })

                // Append the populated dropdown to the container
                $packagesContainer.append($packageDropdown);
            });
        }

        // Set the dropdown and radio functionality after elements are appended
        $(pdSelector).each(function () {
            var currentPackage = $(this)
            var toggle = $(this).find('[dtoggle]');
            var content = $(this).find('[dcontent]');
            var arrow = $(this).find('[darrow]');
            var radioCheck = $(this).find('[custom-radio-check]');
            var currentUpgradeOptions = $(this).find('[au-options]')
            var dOpen = false;

            // dropdown function starts

            // Initialize a separate GSAP timeline for each dropdown
            var dTl = gsap.timeline({
                paused: true
            });

            dTl.to(content, {
                height: 0,
            }).to(arrow, {
                rotate: 180
            }, 0);

            toggle.click(function (event) {
                // Check if the clicked target is outside the [radio-check] element
                if (!$(event.target).closest(radioCheck).length) {
                    if (dOpen) {
                        dTl.reverse();
                    } else {
                        dTl.play();
                    }
                    dOpen = !dOpen;
                }
            });

            // Trigger the close state initially
            toggle.click();

            // dropdown function ends

            // radio function starts
            var planName = $(this).find('[plan-name]').text()
            var packageRadio = $(this).find('.package-radio')
            $("[package]").attr('disabled', 'true').css({
                opacity: '0.7'
            })
            radioCheck.click(function () {
                $('.package-radio').removeClass('is-checked')
                packageRadio.addClass('is-checked')
                $("[package]").val(planName)
                // befoer showing the additional upgrades input we'll add the additional upgrade info
                $('[au-info]').html('')
                $('[au-info]').append(currentUpgradeOptions)
                scrollToPx(currentPackage, 200)
                // since one is already selected the package upgrade options will show up anyhow
                // $().show()
                showBlockOn($("[block-on='package-select']"))
            })
        });

        // once everything is set, now is the time to select the package
        var selectedPackage = getUrlParameter('package')
        if (!!selectedPackage) {
            // user came from packages, we need to select the package already
            $('.goforpackage').click()
            $('.package-radio-wrap').eq(parseInt(selectedPackage)).click()
        }
    });
    
})