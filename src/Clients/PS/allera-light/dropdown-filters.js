    // this is for dropdown functionality and showing selected filters
    $(document).ready(function () {
        function closeDropdown(dropdownEl, duration = 0.5) {
            var cs = dropdownEl.closest('.custom-multi-select');
            updateSelected(cs);
            gsap.to(dropdownEl, {
                height: 0,
                duration: duration
            });
            cs.data('dropdownOpen', false);
        }

        function updateSelected(cs) {
            var selectVal = cs.find('[select-val]');
            var defaultVal = selectVal.data('default-val');
            var selectedTotal = cs.find('input[type=checkbox]:checked').length;
            if (selectedTotal == 0) {
                selectVal.text(defaultVal);
            } else {
                selectVal.text(selectedTotal + " selected");
            }
        }

        $('.custom-multi-select').each(function () {
            var cs = $(this);
            var selectVal = cs.find('[select-val]');
            selectVal.data('default-val', selectVal.text());
            var toggle = cs.find('.cs-toggle');
            var dropdown = cs.find('.cs-dropdown');

            cs.data('dropdownOpen', false);

            var openDropdown = () => {
                cs.data('dropdownOpen', true);
                gsap.to(dropdown, {
                    height: "auto",
                });
            };

            toggle.on('click', function (event) {
                event.stopPropagation(); // Prevent click from propagating to document
                if (cs.data('dropdownOpen')) {
                    closeDropdown(dropdown);
                } else {
                    // close any other open dropdowns
                    $('.custom-multi-select').each(function () {
                        if ($(this).data('dropdownOpen')) {
                            closeDropdown($(this).find('.cs-dropdown'), 0.5);
                        }
                    });
                    openDropdown();
                }
            });

            cs.find('input').on('change', function () {
                updateSelected(cs);
            });

            cs.find('.close-cms-block').on('click', function () {
                closeDropdown(dropdown, 0.5);
            });

            closeDropdown(dropdown, 0);
        });

        // Close dropdowns if clicking outside of custom-multi-select
        $(document).on('click', function () {
            $('.custom-multi-select').each(function () {
                if ($(this).data('dropdownOpen')) {
                    closeDropdown($(this).find('.cs-dropdown'), 0.5);
                }
            });
        });

        // Prevent closing when clicking inside custom-multi-select
        $('.custom-multi-select').on('click', function (event) {
            event.stopPropagation();
        });
    });

    $(document).ready(function () {
        // Function to update the applied filters
        function updateAppliedFilters() {
            var anyCheckboxSelected = false;

            // Loop through each custom-multi-select block
            $('.custom-multi-select').each(function () {
                var $mainBlock = $(this);
                var filterName = $mainBlock.attr('filter-name');
                var $appliedFiltersBlock = $('.applied-filters');

                // Find or create the applied-block for this filter
                var $appliedBlock = $appliedFiltersBlock.find('.applied-block[data-filter-name="' +
                    filterName + '"]');
                if ($appliedBlock.length === 0) {
                    $appliedBlock = $('<div class="applied-block" data-filter-name="' + filterName +
                        '"></div>');
                    $appliedBlock.append('<div>' + filterName + '</div>');
                    $appliedBlock.append('<div class="applied-checks"></div>');
                    $appliedFiltersBlock.append($appliedBlock);
                }

                var $appliedChecks = $appliedBlock.find('.applied-checks');
                $appliedChecks.empty();

                // Loop through each checkbox in the main block
                $mainBlock.find('input[type="checkbox"]').each(function () {
                    var $checkbox = $(this);
                    var checkboxLabel = $checkbox.siblings('.w-form-label').text();

                    if ($checkbox.is(':checked')) {
                        // Add the checked checkbox label to the applied-checks block
                        var $filterMain = $('<div class="applied-filter-main">' +
                            checkboxLabel + '</div>');
                        $filterMain.data('checkbox', $checkbox);
                        $appliedChecks.append($filterMain);

                        // Mark that at least one checkbox is selected
                        anyCheckboxSelected = true;
                    }
                });

                // Show or hide the applied-block based on the number of applied checks
                if ($appliedChecks.children().length > 0) {
                    $appliedBlock.show();
                } else {
                    $appliedBlock.hide();
                }
            });

            // Show or hide the close-cms-block based on the selection of any checkbox
            if (anyCheckboxSelected) {
                $('.close-cms-block').show();
            } else {
                $('.close-cms-block').hide();
            }
        }

        // Update applied filters on page load
        updateAppliedFilters();

        // Update applied filters on checkbox change
        $(document).on('change', '.custom-multi-select input[type="checkbox"]', function () {
            updateAppliedFilters();
        });

        // Click on checkbox and remove applied-filter-main on click
        $(document).on('click', '.applied-filter-main', function () {
            var $filterMain = $(this);
            var $checkbox = $filterMain.data('checkbox');
            if ($checkbox) {
                $checkbox.click(); // Trigger click on the checkbox to uncheck it
            }
            $filterMain.remove();
            updateAppliedFilters();
        });
    });


    $(document).ready(function () {
        // Function to update the applied filters
        function updateAppliedFilters() {
            var anyCheckboxSelected = false;

            // Loop through each custom-multi-select block
            $('.custom-multi-select').each(function () {
                var $mainBlock = $(this);
                var filterName = $mainBlock.attr('filter-name');
                var $appliedFiltersBlock = $('.applied-filters');

                // Find or create the applied-block for this filter
                var $appliedBlock = $appliedFiltersBlock.find('.applied-block[data-filter-name="' +
                    filterName + '"]');
                if ($appliedBlock.length === 0) {
                    $appliedBlock = $('<div class="applied-block" data-filter-name="' + filterName +
                        '"></div>');
                    $appliedBlock.append('<div>' + filterName + '</div>');
                    $appliedBlock.append('<div class="applied-checks"></div>');
                    $appliedFiltersBlock.append($appliedBlock);
                }

                var $appliedChecks = $appliedBlock.find('.applied-checks');
                $appliedChecks.empty();

                // Loop through each checkbox in the main block
                $mainBlock.find('input[type="checkbox"]').each(function () {
                    var $checkbox = $(this);
                    var checkboxLabel = $checkbox.siblings('.w-form-label').text();

                    if ($checkbox.is(':checked')) {
                        // Add the checked checkbox label to the applied-checks block
                        var $filterMain = $('<div class="applied-filter-main">' +
                            checkboxLabel + '</div>');
                        $filterMain.data('checkbox', $checkbox);
                        $appliedChecks.append($filterMain);

                        // Mark that at least one checkbox is selected
                        anyCheckboxSelected = true;
                    }
                });

                // Show or hide the applied-block based on the number of applied checks
                if ($appliedChecks.children().length > 0) {
                    $appliedBlock.show();
                } else {
                    $appliedBlock.hide();
                }
            });

            // Show or hide the close-cms-block based on the selection of any checkbox
            if (anyCheckboxSelected) {
                $('.close-cms-block').show();
            } else {
                $('.close-cms-block').hide();
            }
        }

        // Update applied filters on page load
        updateAppliedFilters();

        // Update applied filters on checkbox change
        $(document).on('change', '.custom-multi-select input[type="checkbox"]', function () {
            updateAppliedFilters();
        });

        // Click on checkbox and remove applied-filter-main on click
        $(document).on('click', '.applied-filter-main', function () {
            var $filterMain = $(this);
            var $checkbox = $filterMain.data('checkbox');
            if ($checkbox) {
                $checkbox.click(); // Trigger click on the checkbox to uncheck it
            }
            $filterMain.remove();
            updateAppliedFilters();
        });
    });