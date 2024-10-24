$(document).ready(function() {
    var products, planIndex;
    var laShowed = false;
    if(!laShowed) {
        $('.loading-animation').css('display', 'flex')
        gsap.fromTo('.loading-animation', {
            opacity: 0,
        }, {
            opacity: 1,
        })
        laShowed = true
    }
    var hideLoadingAnimation = () => {
        gsap.fromTo('.loading-animation', {
            opacity: 1,
        }, {
            opacity: 0,
            onComplete: function() {
                $('.loading-animation').css('display', '')
            }
        })
    }
    async function main() {
        // helpers start
        function ascPrice(slug) {
            var prices = [];
        
            // Loop through each item in the products array
            products.items.forEach(function(item) {
                // Check if the slug matches
                if (item.product.fieldData.slug === slug) {
                    // Loop through each sku in the item
                    item.skus.forEach(function(sku) {
                        // Push the price value to the prices array
                        prices.push(sku.fieldData.price.value);
                    });
                }
            });
        
            // Sort the prices array in ascending order
            prices.sort(function(a, b) {
                return a - b;
            });
        
            return prices;
        }

        function findLastSlug(url) {
            var segments = url.split('/');
            return segments.pop() || segments.pop();  // handle potential trailing slash
        }

        function priceFormat(number, format) {
            // Extract the currency symbol and unit from the format
            var currencySymbol = format.match(/^[^\d]+/)[0].trim();
            var currencyUnit = format.match(/[^\d]+$/)[0].trim();
        
            // Convert the number to a string with two decimal places
            var priceString = (number / 100).toFixed(2);
        
            // Construct the final formatted price
            var formattedPrice = `${currencySymbol} ${priceString} ${currencyUnit}`;
        
            return formattedPrice;
        }
        //helpers end

        const memberstack = window.$memberstackDom;

        var plans = ["pln_hall-of-fame-bdq0woe", "pln_veteran-qtm0rdn", "pln_rookie-s5130b71"];

        let member;
        try {
            member = await memberstack.getCurrentMember();
            var memberPlanId = member.data.planConnections[0].planId;
            planIndex = plans.indexOf(memberPlanId)
            console.log(planIndex)
        } catch (error) {
            console.error('Error getting member:', error);
            hideLoadingAnimation()
            return;
        }

        var updatePrice = () => {
            $('.product8_text-link').each(function(){
                var mainProduct = $(this).closest('.product8_item');
                var price  = mainProduct.find('.text-price');

                var slug = findLastSlug($(this).attr('href'));
                var productPrices = ascPrice(slug);

                if (productPrices.length > 0) {
                    price.text(priceFormat(productPrices[planIndex], price.text()));
                }
            });
        }

        $.ajax({
            url: 'https://us-central1-time-4-winners.cloudfunctions.net/api/products',
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                products = response;
                console.log(products)
            },
            error: function(xhr, status, error) {
                console.error('AJAX Error: ' + status + error);
            }
        });


        var priceUpdateInterval = setInterval(function() {
            if(!!products && planIndex >= 0) {
                console.log('updating price now')
                updatePrice() // function depends on both plan index and products json to be available
                clearInterval(priceUpdateInterval)
                hideLoadingAnimation()
            } else {               
                console.log('Waiting for plan index and products json...')
            }
        }, 100)

    }
    // Call the async function
    main();
});
