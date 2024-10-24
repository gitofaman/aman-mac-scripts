

$('.checkbox-wrapper').on('click', function() {
    
    var childCheckbox = $(this).find('.checkbox')
    var childLabel = $(this).find('.checkbox-label')

    childCheckbox.toggleClass('is-checked')

    if(childCheckbox.hasClass('is-checked')) {
        childLabel.text('This is checked')
    } else {
        childLabel.text('This is unchecked')
    }

})