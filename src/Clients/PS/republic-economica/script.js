$(document).ready(function() {
    var addInputValue = (input, valueToSet, shouldDisableAfterFill=true) => {
        input.val(valueToSet)
        input.closest('.form-field_wrapper').find(".form-field_label").addClass('is-active')
        input.closest('.form-field_wrapper').addClass('is-active')
        if (shouldDisableAfterFill) {
            input.closest('.form-field_wrapper').addClass('pointer-events-none')
        }
    }
    
    
    
    
    var openPopup = () => {
        gsap.fromTo('.career-popup', {
            opacity: 0,
            display: 'none'
        },{
            opacity: 1,
            display: 'flex'
        })
    }
    var closePopup = (popup) => {
        gsap.to(popup, {
            opacity: 0,
            display: 'none'
        })
    }
    $('.table-row-dropdown').each(function() {
        var $this = $(this);
        var $jobPosition = $this.find('[job-title]').text()
        var $applyBtn = $this.find('[apply-button]')
        $applyBtn.on('click', function() {
            addInputValue($("[job-name]"), $jobPosition, true)
            openPopup()
        })
    })
    $('.career-popup-close').on('click', function() {
        var $thisPopup = $(this).closest('.career-popup')
        closePopup($thisPopup)
    })
    
    

})