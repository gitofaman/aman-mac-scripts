
// alert('working fitlers 232')
$(document).ready(function(){
    // for filters 
    var addedFiltersscript = false;
    var addFilterScript = () => {
        if (!addedFiltersscript) {
            $(document).ready(function () {
                addedFiltersscript = true;
                console.log('filter script added')
                // Cache the blocks for performance
                var $Fblock = $('[fs-cmsfilter-element=filters]');
                var $Lblock = $('[fs-cmsfilter-element=list]');
                var $CItems = $Lblock.children();
    
                // Array to store visible items
                var filteredItems = $CItems.toArray();
    
                // Function to filter items based on selected filters
                function filterItems() {
                    // Get all selected filters
                    var selectedFilters = {};
    
                    // Custom checkbox filters
                    $Fblock.find('[fs-cmsfilter-field]').each(function () {
                        var filterField = $(this)
                        if($(this).parent().find('.is-checked').length > 0) {
                            var identifier = filterField.attr('fs-cmsfilter-field');
                            var filterBy = filterField.attr('filter-by');
    
                            if (filterBy) {
                                var filterValues = filterBy.split(',').map(function (text) {
                                    return text.trim().toLowerCase();
                                });
    
                                if (!selectedFilters[identifier]) {
                                    selectedFilters[identifier] = [];
                                }
                                selectedFilters[identifier] = selectedFilters[identifier].concat(filterValues);
                            }
                        }
                    });
    
    
                    // Filter items
                    filteredItems = $CItems.filter(function () {
                        var match = true;
    
                        for (var identifier in selectedFilters) {
                            var itemField = $(this).find('[fs-cmsfilter-field=' + identifier + ']');
                            if (itemField.length) {
                                var itemText = itemField.text().trim().toLowerCase();
                                var hasMatch = selectedFilters[identifier].some(function (filterValue) {
                                    return itemText.includes(filterValue);
                                });
    
                                if (!hasMatch) {
                                    match = false;
                                    break;
                                }
                            } else {
                                match = false;
                                break;
                            }
                        }
                        return match;
                    }).toArray();
    
                    // Update DOM
                    $Lblock.empty().append(filteredItems);
    
                    initialiseTalentInfo();
                    toRefreshSlider();
                    console.log(selectedFilters);
                    
                    // console.log(filteredItems.length)
                }
    
                // Event listeners for standard checkboxes/radios
                // $Fblock.find('input[type=checkbox], input[type=radio]').on('change', filterItems);
    
                // Event listeners for custom checkboxes
                $Fblock.find('[fs-cmsfilter-field]').each(function(){
                    $(this).parent().on('click', function () {
                        console.log('filter field clicked')
                        // $(this).toggleClass('is-checked');
                        filterItems();
                    })
                })
    
                // Initial filter application (in case of pre-checked filters)
                filterItems();
            });
            console.log('all CMS items now loaded');
        }
    }
    
    
    // talent info open
    var initialiseTalentInfo = () => {
        $('.talent-info').on("click", function () {
            var currContentIndex = $(this).closest('.talent-item').attr('content-index');
            var toShowSection = sections[currContentIndex]
            openPopup(toShowSection, currContentIndex)
        })
    }
    
    
    
    // for selections and popups
    var initialisePhotoChange = () => {
        $('.product-header3_gallery').find('script').remove()
        $('.product-header3_main-image-wrapper').children().unwrap();
        $('.product-header3_lightbox-link').children().unwrap();
    
        $('.product-header3_main-image').removeAttr('srcset')
        $('.product-header3_image').on('click', function () {
            var newImage = $(this).clone()
            newImage.removeClass('product-header3_image').addClass('product-header3_main-image')
            $('.product-header3_main-image').replaceWith(newImage)
            // var productImageSrc = $(this).attr('src')
            // console.log(productImageSrc)
            // $('.product-header3_main-image').attr('src', productImageSrc)
    
        })
    }
    var sections = {};
    
    function updateList() {
        var selectedItems = [];
        $('.talent-check.is-selected').each(function () {
            selectedItems.push($(this).text());
        });
        $('.is-talent-list').val(selectedItems.join(', ')); // Corrected the delimiter
    }
    
    
    
    var openPopup = (contentToAdd, contentIndex) => {
        $('.talent-main-content').html(''); // Clear previous content
        $('.talent-main-content').html(contentToAdd); // Add new content
        $('.product-header3_product-details').find('.button-primary').hide()
        $('.talent-popup').attr('talent-index', contentIndex)
        
    
        var isCurrentItemSelected = $(`[content-index="${contentIndex}"] .talent-check`).hasClass('is-selected')
        if (isCurrentItemSelected) {
            console.log(`${contentIndex} is selected`)
            $('.talent-main-button').addClass('is-selected')
        } else {
            console.log(`${contentIndex} is not selected`)
            $('.talent-main-button').removeClass('is-selected')
    
        }
        if ($('.talent-popup').attr('open') !== undefined) {
            console.log('popup is open')
    
        } else {
            
            $('.talent-popup').attr('open', "")
            console.log('popup is not open')
            gsap.set('.talent-popup', {
                opacity: 0,
                display: "flex"
            });
            gsap.to('.talent-popup', {
                opacity: 1,
                duration: 0.5
            });
        }
        initialisePhotoChange()
        $(`[content-index="${contentIndex}"]`).attr('opened', 'true')
        
    }
    
    var closePopup = () => {
        $('.talent-popup').removeAttr('open')
        gsap.to('.talent-popup', {
            opacity: 0,
            duration: 0.5,
            onComplete: function () {
                $('.talent-popup').hide();
            }
        });
        $('.talent-item').removeAttr('opened')
    }
    
    function fetchAndGetContent(link) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: link,
                type: 'GET',
                success: function (response) {
                    // Parse the response HTML
                    var htmlContent = $('<div>').html(response);
    
                    // Find the element with class 'section_product-header3'
                    var section = htmlContent.find('.section_product-header3 .product-header3_layout');
    
                    // Resolve the promise with the section or false if not found
                    if (section.length > 0) {
                        resolve(section);
                    } else {
                        console.log('Element with class "section_product-header3" not found.');
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
    var totalFetched = 0;
    $('.talent-item').each(function (index) { // Using index directly from .each()
        let mainItem = $(this); // Change to let for block scope
        let talentLink = mainItem.find('a').attr('href');
        mainItem.find('.talent-info').hide();
    
    
        fetchAndGetContent(talentLink).then(content => {
            mainItem.attr('content-index', index); // Use the index from .each() directly
            mainItem.find('.talent-info').show();
            // mainItem.find('.talent-info').on('click', function () {
            //     mainItem.attr('opened', 'true');
            //     openPopup(content, mainItem.attr('content-index'));
            // });
            sections[(index).toString()] = content
            mainItem.find('.for-filter-fields').append(content.find('[fs-cmsfilter-field]').clone())
    
            totalFetched++;
            if (totalFetched === $('.talent-item').length) {
                addFilterScript()
            }
        });
    });
    
    
    $('.talent-popup-close-area').on('click', closePopup);
    
    // to handle in popup function
    var prevSlide, nextSlide;
    // when clicked on next, it should click next "talent-info"
    var toRefreshSlider = () => {
        prevSlide = () => {
            // Find the current talent-item with the "opened" attribute
            var current = $('.talent-item[opened]');
            // Find the previous talent-item; if current is the first, go to the last
            var prev = current.prev('.talent-item');
            if (!prev.length) {
                prev = $('.talent-item').last();
            }
            // Remove the "opened" attribute from the current element
            current.removeAttr('opened');
            // Add the "opened" attribute to the previous element
            prev.attr('opened', true);
            // Trigger a click on the child element with class "talent-info"
            prev.find('.talent-info').click();
        };
        nextSlide = () => {
            // Find the current talent-item with the "opened" attribute
            var current = $('.talent-item[opened]');
            // Find the next talent-item; if current is the last, go to the first
            var next = current.next('.talent-item');
            if (!next.length) {
                next = $('.talent-item').first();
            }
            // Remove the "opened" attribute from the current element
            current.removeAttr('opened');
            // Add the "opened" attribute to the next element
            next.attr('opened', true);
            // Trigger a click on the child element with class "talent-info"
            next.find('.talent-info').click();
        };
        $('.talent-check').on('click', function () {
            var selected = $(this).hasClass('is-selected');
            if (selected) {
                $(this).removeClass('is-selected');
            } else {
                $(this).addClass('is-selected');
            }
            updateList();
        });
    }
    toRefreshSlider()
    // Assign the functions to the arrow elements
    $('.talent-arrow').eq(0).on('click', prevSlide);
    $('.talent-arrow').eq(1).on('click', nextSlide);
    
    
    // if selected the current talent, the button should have class "is-selected"
    // the button should be tied to current 
    
    $('.talent-main-button').on('click', function () {
        var talentIndex = $('.talent-popup').attr('talent-index')
        var currentTalent = $(`[content-index=${talentIndex}]`)
        if ($(this).hasClass('is-selected')) {
            $(this).removeClass('is-selected')
        } else {
            $(this).addClass('is-selected')
        }
        currentTalent.find('.talent-check').click()
    })
    
    
    // $('.for-filter-fields').show()
    })
