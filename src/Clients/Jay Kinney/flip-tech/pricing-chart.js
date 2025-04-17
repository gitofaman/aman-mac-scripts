$(document).ready(function() {
    $('[pricing-selected-products]').css({
        'background-color': 'rgba(255, 255, 255, 0.1)', // white with 0.2 opacity
        'pointer-events': 'none'
    });
    

    let checkedQueue = [];
    var planDetailsPlanOne = $("[plan-id=plan-1]").attr('open-pricing-popup')

    function activatePlan(values) {
        console.log("Activating plan with:", values);
        $("[plan-id=plan-1]").removeClass('is-disabled')
        $("[plan-id=plan-1]").attr('open-pricing-popup', `${planDetailsPlanOne} ; Selected Products: ${values.join(",")}`)
    }   
    
    function deactivatePlan(values) {
        console.log("Deactivating plan with:", values);
        $("[plan-id=plan-1]").addClass('is-disabled')
        // Your logic here
    }
    
    function updatePlanState() {
        const values = checkedQueue.map($el => $el.closest('.custom-checkbox').attr('name'));
    
        if (checkedQueue.length === 2) {
            activatePlan(values);
        } else {
            deactivatePlan(values);
        }
    }
    
    $('.custom-checkbox').each(function () {
        const indicator = $(this).find('.indicator-checkbox');
        indicator.removeClass('is-checked');
    
        indicator.on('click', function () {
            const $this = $(this);
            const isChecked = $this.hasClass('is-checked');
    
            if (isChecked) {
                // Uncheck and remove from queue
                $this.removeClass('is-checked');
                checkedQueue = checkedQueue.filter(item => item[0] !== $this[0]);
            } else {
                if (checkedQueue.length >= 2) {
                    // Uncheck the oldest one
                    const oldest = checkedQueue.shift();
                    $(oldest).removeClass('is-checked');
                }
    
                // Check current and add to queue
                $this.addClass('is-checked');
                checkedQueue.push($this);
            }
    
            updatePlanState();
        });
    });
    
    
    
    var openPricingPopup = () => {
        gsap.set('.pricing-popup', {
            display: "flex"
        });
    
        gsap.fromTo('.pricing-popup', {
            opacity: 0,
            y: 100
        }, {
            opacity: 1, 
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
        });
    }
    
    var closePricingPopup = () => {
        gsap.to('.pricing-popup', {
            opacity: 0,
            y: 100,
            duration: 0.4,
            ease: 'power2.in',
            onComplete: () => {
                gsap.set('.pricing-popup', {
                    display: "none"
                });
            }
        });
    }
    
    // Attach open popup to elements with the attribute
    $('[open-pricing-popup]').each(function() {
        $(this).on('click', function() {
            var planDetails = $(this).attr('open-pricing-popup');
            $('[pricing-selected-products]').val(planDetails)
            openPricingPopup()
        });
    });
    
    // Close button
    $('.is-p-close').on("click", function() {
        console.log("CLOSING POPUP")
        closePricingPopup()
    });
    
})
