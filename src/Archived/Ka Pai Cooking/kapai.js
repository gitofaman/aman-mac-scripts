var getData = (elSelector) => {
    var el = document.querySelector(`${elSelector}`)
    return el.innerText.replaceAll('\n', ', ')
}

function isHidden(el) {
    return (el.offsetParent === null)
}

var ingredients = getData('[aria-ingredients]')

var nutritions = getData('[aria-nutrition]')

var instruction = getData('[aria-instruction]')

var schemaType = 'Recipe';
var hideRecipeCardEl = document.querySelector('[aria-hide-recipe]')

if (!isHidden(hideRecipeCardEl)) {
    schemaType = 'Article'
}

var updateSchema = (keyName, keyValue) => {
    let structuredData = document.getElementById('schema-google');
    let parsedSD = JSON.parse(structuredData.innerText);
    parsedSD[keyName] = keyValue;
    structuredData.innerText = JSON.stringify(parsedSD);
    console.log(keyName + ' schema updated')
}

updateSchema('@type', schemaType)
updateSchema('recipeIngredient', ingredients)
updateSchema('recipeInstructions', instruction)
updateSchema('nutrition', nutritions)

var reviewEl = document.querySelector('[aria-review]')
var reviewElInterval = setInterval(() => {
    var reviewShadowparent = reviewEl.querySelector('monto-widget')
    console.log(reviewShadowparent)
    if (!!reviewShadowparent) {
        var reviewShadowEl = reviewShadowparent.shadowRoot;
        var reviewCount = parseInt(reviewShadowEl.querySelector('monto-reviews-count').innerText)
        var starSvgs = reviewShadowEl.querySelector('monto-star-rating').querySelectorAll('svg')
        var numberOfStars = 0;

        starSvgs.forEach(starSvg => {
            if (!starSvg.hasAttribute('opacity')) {
                numberOfStars++;
            }
        })

        updateSchema('aggregateRating', numberOfStars)
        updateSchema('ratingCount', reviewCount)
        updateSchema('reviewCount', reviewCount)

        clearInterval(reviewElInterval)
    }
}, 100)