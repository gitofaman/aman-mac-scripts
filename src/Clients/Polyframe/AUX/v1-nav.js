if($(window).width() > 991) {
    var animationWaitTimeout;
    var activeTl; // To store the currently active timeline
    $("[appear-on]").css("opacity", "0");
    
    var showNavOverlay = () => {
        var noTl = gsap.timeline();
        noTl.to(".navbar", {
            background: "white",
            duration: 0.3
        }).to(".page-overlay", {
            opacity: 1,
            duration: 0.3
        });
    };
    
    var collapseDropdowns = () => {
        if (activeTl) activeTl.kill(); // Kill any active timeline
        activeTl = gsap.timeline();
        activeTl
            .to("[appear-on]", {
                opacity: 0,
                duration: 0.3
            }, "<")
            .to(".navdrops-wrapper", {
                height: 0,
                duration: 0.3
            })
            .to(".page-overlay", {
                opacity: 0,
                duration: 0.3
            })
            .to(".navbar", {
                background: "transparent",
                duration: 0.3
            });
    };
    
    var showBlock = (toShow) => {
        const elToShow = $(`[appear-on="${toShow}"]`);
        if (activeTl) activeTl.kill(); // Kill any active timeline
        activeTl = gsap.timeline({
            onStart: function () {
                showNavOverlay();
            }
        });
    
        activeTl
            .to("[appear-on]", {
                opacity: 0,
                duration: 0.3,
                pointerEvents: 'none'
            })
            .to(".navdrops-wrapper", {
                height: function () {
                    return elToShow.innerHeight();
                },
                duration: 0.3
            })
            .to(elToShow, {
                opacity: 1,
                duration: 0.3,
                pointerEvents: 'auto'
            }, "<");
    };
    
    var activeBlock;
    
    // Event Handlers
    $("[to-show]").on("mouseover", function () {
        const toShow = $(this).attr("to-show");
        clearTimeout(animationWaitTimeout); // Prevent collapse timeout
        if(activeBlock !== toShow) {
            activeBlock = toShow
            showBlock(toShow);
        }
    });
    
    $("[to-show]").on("mouseout", function () {
        clearTimeout(animationWaitTimeout); // Prevent immediate collapse
        animationWaitTimeout = setTimeout(function () {
            collapseDropdowns();
        }, 300);
    });
    
    $('[appear-on]').on("mouseover", function () {
        clearTimeout(animationWaitTimeout)
    })
    
    $('[appear-on]').on("mouseout", function () {
        clearTimeout(animationWaitTimeout); // Prevent immediate collapse
        animationWaitTimeout = setTimeout(function () {
            collapseDropdowns();
        }, 300);
    })
}