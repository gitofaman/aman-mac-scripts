// Add a click event listener to the button
$('.layout_block-normal').on('click', function (e) {
    makeActive($(this))
});

var makeActive = (block) => {
    var faActions = $('.fa-actions').clone();
    block.append(faActions);
    block.addClass('state-actions')
}

var makeInActive = (block) => {
    block.removeClass('state-actions')
    block('.fa-actions').remove()
}