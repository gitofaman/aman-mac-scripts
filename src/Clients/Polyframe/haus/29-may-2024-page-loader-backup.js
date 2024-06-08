$('document').ready(function(){
    var pageLoaderMain = $('.page-loader');
    var pageLoaderLogo = $('.page-load-logo');
    var pageLoaderTexts = $('.page-load-text');
    var pageLoaderTextParent = $('.page-load-2');

    // Check if the cookie exists
    var cookieName = 'pageLoaderCount';
    var count = Cookies.get(cookieName) || 0;
    var maxCount = 1; // Change this to set the maximum number of times per day

    // Check if the code should run based on the count
    if (count < maxCount) {
        var plTimeline = gsap.timeline();
        $('.page-wrapper').css('height', '100vh');

        plTimeline.to(pageLoaderMain, {
            display: 'flex',
            duration: 0
        }).fromTo(pageLoaderLogo, {
            display: 'block'
        }, {
            display: 'none',
            delay: 1
        }).fromTo(pageLoaderTextParent, {
            display: 'none'
        }, {
            display: 'flex',
        });

        pageLoaderTexts.get().reverse().forEach(function(el){
            plTimeline.fromTo($(el), {
                opacity: 0,
            }, {
                opacity: 1,
                duration: 0.2
            });
        });

        plTimeline.to(pageLoaderTexts, {
            opacity: 1,
            duration: 0.2
        });

        pageLoaderTexts.get().reverse().forEach(function (el, index, array) {
            var isLastElement = index === array.length - 1;
            if(!isLastElement) {
                plTimeline.to($(el), {
                    opacity: 0,
                    duration: 0.2,
                });
            }
        });

        plTimeline.fromTo('.plt-inside.is-absolute', {
            opacity: 0
        }, {
            opacity: 1
        }).fromTo('.plt-inside.transparent', {
            opacity: 1
        }, {
            opacity: 0
        });

        plTimeline.to($('.page-loader'), {
            backgroundColor: 'transparent',
            duration: 1
        });


        plTimeline.to('.page-loader', {
            position: 'absolute',
            duration: 0
        }).to('.page-wrapper', {
            height: 'auto'
        })

        // $('.page-loader').css('position', 'absolute')
        // $('.page-wrapper').css('height', 'auto');

        plTimeline.to(pageLoaderMain, {
            opacity: 0,
            delay: 1.5
        });

        plTimeline.to(pageLoaderMain, {
            display: 'none'
        }).then(function(){
            $('.page-wrapper').css('height', 'auto');
        });

        // Increment the count and update the cookie
        count++;
        Cookies.set(cookieName, count, { expires: 1 }); // Expires in 1 day
    } else {
        // If the code should not run, hide the loader immediately
        $('.page-loader').hide();
        $('.page-wrapper').css('height', 'auto');
    }
});