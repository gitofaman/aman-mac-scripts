var cmsItems = [];
var filterBrands = [];
var filterColors = [];
$(document).ready(function() {
    var loadingScreen = $('.loading-animation')
    loadingScreen.css('display', 'flex')
    $('.filter-form').hide()
    var currentPage = 1;
    var baseUrl = window.location.pathname;


    function fetchPage(page) {
        var url = page === 1 ? baseUrl : baseUrl + '?90147b29_page=' + page;

        $.ajax({
            url: url,
            type: 'GET',
            success: function(data) {
                var $html = $(data);
                var $items = $html.find('[fs-cmsfilter-element] .product-item-cat.w-dyn-item');
                var $nextPageButton = $html.find('.w-pagination-next');

                // Add the found items to the cmsItems array
                cmsItems = cmsItems.concat($items.toArray());

                // Sequentially collect filter brands and colors
                processItemsSequentially($items.toArray(), function() {
                    // Check if there is a next page
                    if ($nextPageButton.length) {
                        fetchPage(page + 1);
                    } else {
                        // All pages have been fetched
                        // console.log('All items:', cmsItems);
                        startProcessingFilters();
                    }
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error fetching the page:', textStatus, errorThrown);
            }
        });
    }

    function processItemsSequentially(items, callback) {
        if (items.length === 0) {
            callback();
            return;
        }

        var $item = $(items.shift());
        var filterBrandText = $item.find('.filter-brand-text').text();

        if (!filterBrands.includes(filterBrandText)) {
            filterBrands.push(filterBrandText);
        }

        var thisItemLink = $item.find('.product4_image-link').attr('href');

        // Run AJAX on the individual link to get the .color-item text
        $.ajax({
            url: thisItemLink,
            type: 'GET',
            success: function(data) {
                var $html = $(data);
                var colorItems = $html.find('.color-item');

                if(colorItems.length > 0) {
                    colorItems.each(function(){
                        var colorText = $(this).text()
                        if (colorText && !filterColors.includes(colorText)) {
                            filterColors.push(colorText);
                        }
                    })
                }

                // Process the next item in the list
                processItemsSequentially(items, callback);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error fetching color item:', textStatus, errorThrown);
                // Proceed with the next item even if an error occurs
                processItemsSequentially(items, callback);
            }
        });
    }

    function startProcessingFilters() {
        $('.filter-finish-color-item').each(function() {
            var thisItem = $(this);
            var thisColor = $(this).text();
            if (!filterColors.includes(thisColor)) {
                thisItem.hide();
            }
        });
        $('.filter-brand-item').each(function() {
            var thisItem = $(this);
            var thisBrand = $(this).text();
            if (!filterBrands.includes(thisBrand)) {
                thisItem.hide();
            }
        });

        gsap.to('.loading-animation', {
            opacity: 0,
            onComplete: function() {
                $('.loading-animation').hide();
                $('.filter-form').show();
            }
        });
    }

    // Start fetching from the first page
    fetchPage(currentPage);
});
