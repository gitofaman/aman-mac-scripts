$(document).ready(function() {
    // to hide sections with empty collections
    $('[empty-block]').each(function() {
        var sectionAttr = $(this).attr('empty-block')
        var section = $(`[section="${sectionAttr}"]`)
        if($(this).is(':visible')) {
            section.hide()
        }
    })
})