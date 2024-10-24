$(document).ready(function() {
    var products, memberPlanType;
    var laShowed = false;
    if(!laShowed) {
        $('.loading-animation').css('display', 'flex')
        gsap.fromTo('.loading-animation', {
            opacity: 0,
        }, {
            opacity: 1,
        })
        laShowed = true
    }
    var hideLoadingAnimation = () => {
        gsap.fromTo('.loading-animation', {
            opacity: 1,
        }, {
            opacity: 0,
            onComplete: function() {
                $('.loading-animation').css('display', '')
            }
        })
    }
    async function main() {
        // helpers start

        function findLastSlug(url) {
            var segments = url.split('/');
            return segments.pop() || segments.pop();  // handle potential trailing slash
        }

        function getPlanType(planId) {
            // Remove the "pln_" prefix
            var planType = planId.replace('pln_', '');
            
            // Remove the part after the last dash ("-")
            planType = planType.substring(0, planType.lastIndexOf('-'));
            
            // Remove hyphens and capitalize each word
            planType = planType.split('-').map(function(word) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }).join(' ');
            
            return planType;
        }
        
        //helpers end

        const memberstack = window.$memberstackDom;
        
        var plans = ["pln_hall-of-fame-bdq0woe", "pln_veteran-qtm0rdn", "pln_rookie-s5130b71"];

        var showProducts = () => {
            $('.w-radio').each(function() {
                var label = $(this).find('.w-form-label').text()
                if(label.toLowerCase() === memberPlanType.toLowerCase()) {
                    $(this).click()
                }
            })
            setTimeout(function() {
                $('.product8_list-wrapper').show()
            }, 500)
        }


        var productShowInterval = setInterval(function() {
            if(!!memberPlanType) {
                showProducts()
                clearInterval(productShowInterval)
                hideLoadingAnimation()
            } else {               
                console.log('Waiting for plan index and products json...')
            }
        }, 100)

        let member;
        try {
            member = await memberstack.getCurrentMember();
            memberPlanId = member.data.planConnections[0].planId;
            memberPlanType = getPlanType(memberPlanId)
            
            // hideLoadingAnimation()
        } catch (error) {
            console.error('Error getting member:', error);
            hideLoadingAnimation()
            memberPlanType = "Default"
            return;
        }

    }
    main();
});