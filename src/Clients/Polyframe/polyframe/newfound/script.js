/**
 * Minimal page-transition router with two hooks:
 *   window.onEnterPage()
 *   window.onLeavePage(nextUrl, done)
 *
 * Requirements: jQuery + (optionally) GSAP
 */
(function () {
    function isInternal(href) {
        const u = new URL(href, window.location.origin);
        return u.hostname === window.location.hostname;
    }

    function runEnter() {
        if (typeof window.onEnterPage === 'function') {
            try {
                window.onEnterPage();
            } catch (e) {
                console.error('onEnterPage error:', e);
            }
        }
    }

    function runLeave(url) {
        const navigate = () => {
            window.location.href = url;
        };

        if (typeof window.onLeavePage !== 'function') {
            return navigate();
        }

        let finished = false;
        const done = () => {
            if (finished) return;
            finished = true;
            navigate();
        };

        try {
            const maybePromise = window.onLeavePage(url, done);
            // If you ever return a Promise from onLeavePage, we’ll respect it
            if (maybePromise && typeof maybePromise.then === 'function') {
                maybePromise.then(done).catch(done);
            }
        } catch (e) {
            console.error('onLeavePage error:', e);
            done();
        }

        // Safety timeout so you never get stuck (optional)
        setTimeout(done, 8000);
    }

    // Run enter hook on load
    $(document).ready(runEnter);

    // Run enter hook again on bfcache restore (back/forward)
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) runEnter();
    });

    // Intercept internal links
    $(document).on(
        'click',
        'a[href]:not([target="_blank"]):not([href^="#"]):not([download])',
        function (e) {
            // Respect modifier keys / middle click
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

            const url = $(this).attr('href');
            if (!isInternal(url)) return; // external → let it go

            e.preventDefault();
            runLeave(url);
        }
    );
})();

// var easing = 
var defaults = {
    ease: "expo.inOut",
    duration: 0.4
}
var pageWiper = '.page-wiper'
var mainWrapper = ".main-wrapper"
var loaderBlock = '.loader-block'
var loaderCover = ".loader-block-cover"
var pageTransitionDisplacement = 150
var percentageToLeaveOn = 60


window.onEnterPage = function () {

    gsap.set(pageWiper, {
        top: 0,
        bottom: 'auto'
    })
    oep = gsap.timeline({
        defaults: defaults,
        onComplete: function () {
            ScrollTrigger.refresh()
            window.scrollTo(0, 0);
        }
    })
    oep.to(pageWiper, {
        height: 0
    }).from(mainWrapper, {
        y: pageTransitionDisplacement
    }, "<")

};

window.onLeavePage = function (nextUrl, done) {

    gsap.set(pageWiper, {
        top: "auto",
        bottom: '0'
    })
    // Your leave animations
    olp = gsap.timeline({
        onComplete: done,
        defaults: defaults
    })
    olp.to(pageWiper, {
        height: "100%"
    }).to(mainWrapper, {
        y: -pageTransitionDisplacement,
        duration: 0.5,
        opacity: 0
    }, "<")

};