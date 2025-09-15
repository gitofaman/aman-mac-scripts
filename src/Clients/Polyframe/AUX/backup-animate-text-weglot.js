$(document).ready(function () {
    $('[animate-text="true"]').each(function (i) {
        const $orig = $(this);
        const num = i; // unique number starting at 0

        // Update original attribute only
        $orig.attr('animate-text', num);

        // Create a div clone
        const $cloneDiv = $('<div/>')
            .html($orig.html()) // copy inner content
            .attr('animate-text', num) // same number
            .addClass('hide'); // add hide class

        // Insert clone right after original
        $orig.after($cloneDiv);
    });

    var animateAllSpannedTexts = () => {
        $('[animate-text]:not(.hide)').each(function () {
            var atId = $(this).attr('animate-text')
            var hiddenCounterPart = $(`[animate-text=${atId}].hide`)
            var text = hiddenCounterPart.text();
            var startingHtml = hiddenCounterPart.html();
            var html = '';
            for (var i = 0; i < text.length; i++) {
                if (text[i] === ' ') {
                    html += '<span class="spanned-text"> </span>'; // Preserve spaces
                } else {
                    html += '<span class="spanned-text">' + text[i] + '</span>';
                }
            }
            $(this).html(html);
            var mainParent = $(this)
            var totalSpan = $(this).find('span').length;
            gsap.from($(this).find('span'), {
                // top: 100,
                opacity: 0.15,
                duration: 0.5,
                stagger: 1 / totalSpan,
                scrollTrigger: {
                    trigger: mainParent,
                    start: 'top 80%'
                },
                onComplete: function () {
                    mainParent.html(startingHtml);
                }
            })
        });
    }

    $('[weglot-ignore]').removeClass('hide')
    var langChanged = false;

    Weglot.on("initialized", function () {
        Weglot.on("languageChanged", function (newLang, prevLang) {
            console.log("The language on the page just changed to (code): " + newLang)
            console.log("The full name of the language is: " + Weglot.getLanguageName(newLang))
            langChanged = true
            animateAllSpannedTexts()
        })

        if (!langChanged) {
            animateAllSpannedTexts()
        }
    })
})