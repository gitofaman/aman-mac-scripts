// Working

var openPopup = (popupEl) => {
    gsap.fromTo(popupEl, {
        opacity: 0,
        display: 'flex',
    },{
        opacity: 1,
        duration: 0.3
    });
};

var closePopup = (popupEl) => {
    gsap.to(popupEl, {
        opacity: 0,
        duration: .3,
        onComplete: function(){
            popupEl.css({
                'display': 'none'
            });
        }
    });
};

$('.open-sibling').on('click', function() {
    var $siblingPopup = $(this).siblings().filter('.comp-popup');
    openPopup($siblingPopup);
});

$('.comp-close').on('click', function() {
    closePopup($(this).closest('.comp-popup'));
});
$('[open-popup]').on('click', function() {
    var popupNumber = $(this).attr('open-popup');
    openPopup($('[comp-popup=' + popupNumber + ']'));
});
