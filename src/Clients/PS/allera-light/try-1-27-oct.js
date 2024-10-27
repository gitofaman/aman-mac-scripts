
var filterBrands = []
var filterColors = []

function startProcessingFilters () {
    filterBrands = []
    filterColors = []
    $('.product-item-cat').each(function () {

        var currBrand = $(this).find('.filter-brand-text').text()
        if (!filterBrands.includes(currBrand)) {
            filterBrands.push(currBrand)
        }

        var currColors = $(this).find('[fs-cmsfilter-field="color"].nclass')
        // console.log(currColors.length)
        currColors.each(function() {
            var currColor = $(this).text()
            if(!filterColors.includes(currColor)) {
                filterColors.push(currColor)
            }
        })

    })
    // console.log(filterColors)
    // console.log(filterBrands)
    $('.filter-finish-color-item').each(function() {
        var thisItem = $(this)
        var thisColor = $(this).text()
        if (!filterColors.includes(thisColor)) {
            thisItem.hide()
        }
    })
    $('.filter-brand-item').each(function() {
        var thisItem = $(this)
        var thisBrand = $(this).text()
        if(!filterBrands.includes(thisBrand)) {
            thisItem.hide()
        }
    })

    gsap.to('.loading-animation', {
        opacity: 0,
        onComplete: function () {
            $('.loading-animation').hide()
            $('.filter-form').show()
        }
    })

}

$(document).ready(function () {
    // we'll be using a different collection list for relevant filters

    var loadingScreen = $('.loading-animation')
    loadingScreen.css('display', 'flex')
    $('.filter-form').hide()


    var waitForColors = setInterval(function() {
        var colorsLength = $('.product4_component [fs-cmsfilter-field="color"].nclass').length
        if (colorsLength > 0) {
            console.log(colorsLength)
            startProcessingFilters()
            clearInterval(waitForColors)
        }
    }, 100)


})