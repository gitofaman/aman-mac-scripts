var stepJson = {
    "moving-assistance": {
        "attr": "ma",
        "steps" : {
            "step-2": {
                "url": "/quote-flow/moving-assistance/step-2",
                "title": "Where are we delivering"
            },
            "step-3": {
                "url": "/quote-flow/moving-assistance/step-3",
                "title": "How much space do you need?"
            },
            "step-4": {
                "url": "/quote-flow/moving-assistance/step-4",
                "title": "How long are you storing for?"
            },
            "step-5": {
                "url": "/quote-flow/moving-assistance/step-4",
                "title": "What service are you after?"
            }
        }
    }
}

function embedUrlInIframe(url) {
    // Check if the URL is relative (starts with '/')
    if (url.startsWith('/')) {
        url = window.location.origin + url; // Convert to absolute URL
    }

    const iframe = $('<iframe>', {
        src: url,
        width: '100%',
        height: '100%',
        frameborder: 0,
        allowfullscreen: true
    }).on('load', function() {
        adjustIframeHeight(this);
        gsap.to('.quote-flow-starter', {
            height: 0
        });
        setupPrevStepButtonListener(this);
    });

    $('.quote-flow-mainer').empty().append(iframe);

    // Function to adjust the iframe height
    function adjustIframeHeight(iframeElement) {
        const iframeDoc = iframeElement.contentDocument || iframeElement.contentWindow.document;
        const iframeHeight = $(iframeDoc).height();
        $('.quote-flow-mainer').height(iframeHeight);
    }

    // Function to set up the previous step button listener
    function setupPrevStepButtonListener(iframeElement) {
        const iframeDoc = iframeElement.contentDocument || iframeElement.contentWindow.document;
        $(iframeDoc).ready(function() {
            // Add click event listener to the button with attribute prev-step-btn
            $(iframeDoc).find('[prev-step-btn]').on('click', function() {
                history.back();
            });
        });
    }

    // Add event listener to monitor changes in the iframe content
    iframe.on('load', function() {
        const iframeWindow = this.contentWindow;
        iframeWindow.addEventListener('resize', () => {
            adjustIframeHeight(this);
        });

        // Monitor for DOM changes within the iframe to adjust height
        const observer = new MutationObserver(() => {
            adjustIframeHeight(this);
        });

        const config = { childList: true, subtree: true };
        observer.observe(iframeDoc.body, config);
    });
}

// for (option in stepJson) {
//     (``)
// }

$('.qfs-option').on('click', function() {
    embedUrlInIframe(stepJson["moving-assistance"].steps["step-2"].url)
})

// alert('all working')

