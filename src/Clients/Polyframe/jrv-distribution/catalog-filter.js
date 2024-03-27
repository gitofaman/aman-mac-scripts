var showAlert = (text) => {
    $('[alert-text]').text(text);
    var alertTl  = gsap.timeline({
        defaults: {
            duration: 0.3
        }
    })
    alertTl.fromTo($('.fixed-alert-parent'), {
        display: 'none',
        opacity: 0
    }, {
        display: 'flex',
        opacity: 1
    }).to($('.fixed-alert-parent'), {
        opacity: 0,
        delay: 1
    }).then(function(){
        $('.fixed-alert-parent').css({
            display: 'none'
        })
    })
}

var popupOpened = false;

var openPopup = (btn) => {
    popupOpened = true
    console.log('clicked')
    var popupBlock = btn.closest('.catalog-popup');
    console.log(popupBlock)
    popupBlock.addClass('is-popup');
    popupBlock.find('*').addClass('is-popup');
    $('.catalog-filter-form').addClass('is-popup');
    $('.catalog-filter-parent').addClass('is-popup');
};

var closePopup = (btn) => {
    if(popupOpened) {
        popupOpened = false
        var popupBlock = btn.closest('.catalog-popup');
        popupBlock.removeClass('is-popup');
        popupBlock.find('*').removeClass('is-popup');
        $('.catalog-filter-form').removeClass('is-popup');
        $('.catalog-filter-parent').removeClass('is-popup');
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
    if(popupOpened) {
        closePopup($(this))
    } else {
        openPopup($(this));
    }
});

var catalogReferesh = () => {
    console.log('catalog ran')
    $('.catalog-item').each(function(){

        var $ciItem = $(this)
        var $ciBtn = $ciItem.find('[expand]')
        var expanded = true;
        var btnTexts = $ciBtn.attr('expand').split(',')
    
        var expand = () => {
            expanded = true;
            gsap.to($ciItem.find('.catalog-item-2col'), {
                height: 'auto',
                onComplete: function(){
                    $ciBtn.text(btnTexts[1])
                }
            })
        }
    
        var  collapse = () => {
            expanded = false;
            gsap.to($ciItem.find('.catalog-item-2col'), {
                height: 0,
                onComplete: function(){
                    $ciBtn.text(btnTexts[0])
                }
            })
        }
    
        $ciBtn.on('click', function(){
            if (!expanded) {
                expand()
            } else {
                collapse()
            }
        })
    
        collapse()
    });
}

$('.catalog-popup-closer').on('click', function(){
    closePopup($(this))
})
catalogReferesh()
$(document).ready(function() {
    $('.catalog-checkbox input[type="checkbox"]').change(function() {
        if ($(this).is(':checked')) {
            var parentDiv = $(this).closest('.w-dyn-item');
            showAlert(`${$(this).parent().text()} : Selected`)
            parentDiv.prependTo(parentDiv.parent());
            setTimeout(catalogReferesh, 300)
        }
    });
});

