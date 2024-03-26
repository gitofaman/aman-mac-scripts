var popupOpened = false;

var openPopup = (btn) => {
    popupOpened = true
    console.log('clicked')
    var popupBlock = btn.closest('.catalog-popup');
    console.log(popupBlock)
    popupBlock.addClass('is-popup');
    popupBlock.find('*').addClass('is-popup');
};

var closePopup = (btn) => {
    if(popupOpened) {
        popupOpened = false
        var popupBlock = btn.closest('.catalog-popup');
        popupBlock.removeClass('is-popup');
        popupBlock.find('*').removeClass('is-popup');
    }
};

// // Event delegation for click event
// $(document).on('click', '.catalog-filter-block.is-popup', function(event) {
//     if ($(event.target).closest('.catalog-filter-block.is-popup').length && popupOpened) {
//         // Run your function here
//         closePopup($(event.target));
//     }
// });

$('.is-button-more').on('click', function() {
    openPopup($(this));
});

$('.catalog-popup-closer').on('click', function(){
    closePopup($(this))
})
