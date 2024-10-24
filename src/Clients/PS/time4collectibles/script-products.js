$(document).ready(function () {
    var memberPlanType, memberPlanTypeId, memberPlanId;
    var laShowed = false;
    if (!laShowed) {
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
            onComplete: function () {
                $('.loading-animation').css('display', '')
            }
        })
    }
    var removeStrings = (givenText, arrToRemove) => {
        var finalText = givenText;
        arrToRemove.forEach(item => {
            finalText = finalText.replace(item, '');
        });
        return finalText;
    };

    async function main() {

        function smallAndHyphens(givenText) {
            var finalText;
            finalText = givenText.toLowerCase()
            finalText = finalText.replaceAll(' ', '-')
            return finalText;
        }

        function getCapitalCaseNoHyphen(givenWord) {
            var finalWord = givenWord.split('-').map(function (word) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }).join(' ');
            return finalWord
        }

        function getPlanType(planId) {
            // Remove the "pln_" prefix
            var planType = planId.replace('pln_', '');

            // Remove the part after the last dash ("-")
            planType = planType.substring(0, planType.lastIndexOf('-'));

            return planType;
        }

        function updateURLWithSlug(givenURL, additionSlug) {
            // Parse the given URL
            var url = new URL(givenURL);

            // Extract the pathname and search params
            var pathname = url.pathname;
            var searchParams = url.search;

            // Append the slug to the pathname
            var newPathname = pathname + additionSlug;

            // Construct the new URL with the updated pathname and original search params
            var newURL = url.origin + newPathname + searchParams;

            return newURL;
        }
        //helpers end

        const memberstack = window.$memberstackDom;

        let member;
        try {
            member = await memberstack.getCurrentMember();
            memberPlanId = member.data.planConnections[0].planId;
            memberPlanTypeId = getPlanType(memberPlanId) //hall-of-fame
            memberPlanType = getCapitalCaseNoHyphen(memberPlanTypeId) // Hall Of Fame
            if (reqPlanType.toLowerCase() === 'default') {
                window.location.href = updateURLWithSlug(window.location.href, `-${memberPlanTypeId}`)
                hideLoadingAnimation()
                return;
            }
            if (reqPlanType.toLowerCase() !== memberPlanType.toLowerCase()) { // hall of fame = hall of fame
                window.location.href = window.location.href.replace(`-${smallAndHyphens(reqPlanType)}`, `-${memberPlanTypeId}`)
                hideLoadingAnimation()
                // return
            } else {
                //current plan type is where user is expected
                $('.product-header7_price-wrapper').show()
                hideLoadingAnimation()
            }
        } catch (error) {
            console.error('Error getting member:', error);
            var expected = removeStrings(window.location.href, ['-veteran', '-hall-of-fame', '-rookie']);
            if (window.location.href === expected) {
                $('.product-header7_price-wrapper').show()
            } else {
                window.location.href = expected
            }
            hideLoadingAnimation()
            // memberPlanType = "Default"
            return;
            
        }

    }
    main();
});