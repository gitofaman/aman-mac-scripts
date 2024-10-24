var cmsItems = [];
$(document).ready(function() {
    $('.filter-form').hide()
    var currentPage = 1;
    var baseUrl = window.location.pathname;
    var filterBrands = [];
    var filterColors = [];

    function fetchPage(page) {
        var url = page === 1 ? baseUrl : baseUrl + '?90147b29_page=' + page;

        $.ajax({
            url: url,
            type: 'GET',
            success: function(data) {
                var $html = $(data);
                var $items = $html.find('[fs-cmsfilter-element] .collection-item-12.w-dyn-item');
                var $nextPageButton = $html.find('.w-pagination-next');

                // Add the found items to the cmsItems array
                cmsItems = cmsItems.concat($items.toArray());

                // Collect filter brands and colors
                $items.each(function() {
                    var brandText = $(this).find('.filter-brand-text').text().trim();
                    var colorText = $(this).find('.filter-color-text').text().trim();

                    if (brandText) {
                        filterBrands.push(brandText);
                    }
                    if (colorText) {
                        filterColors.push(colorText);
                    }
                });

                // Check if there is a next page
                if ($nextPageButton.length) {
                    fetchPage(page + 1);
                } else {
                    // All pages have been fetched
                    console.log('All items:', cmsItems);
                    processFilters();
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error fetching the page:', textStatus, errorThrown);
            }
        });
    }

    function processFilters() {
        // Remove duplicates
        filterBrands = [...new Set(filterBrands)];
        filterColors = [...new Set(filterColors)];

        // Process filter-brand-item
        $('.filter-brand-item').each(function() {
            var brandText = $(this).text().trim();
            if (filterBrands.includes(brandText)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });

        // Process filter-finish-color-item
        $('.filter-finish-color-item').each(function() {
            var colorText = $(this).text().trim();
            if (filterColors.includes(colorText)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
        $('.filter-form').show()
    }

    // Start fetching from the first page
    fetchPage(currentPage);
});