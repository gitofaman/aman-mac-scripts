function splitTextToLines(element) {
    // Step 1: Clear the original content and wrap each letter in a span
    let text = element.text().trim();
    element.empty(); // Clear the original content

    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        let charSpan = $('<span class="char-span"></span>').text(char);
        element.append(charSpan);
    }

    let currentTop = 0;
    let currentLine = 0;

    // Step 2: Assign line numbers based on top position
    element.find('.char-span').each(function () {
        var thisTop = $(this).position().top;
        if (currentTop != thisTop) {
            currentLine++;
            currentTop = thisTop;
        }
        $(this).attr('line', currentLine);
    });

    // Step 3: Wrap characters with the same line number in a span with class "line-span"
    let totalLines = currentLine;
    for (let lineNumber = 1; lineNumber <= totalLines; lineNumber++) {
        let lineSpan = $('<div class="line-span"></div>'); // Create a new span for each line
        element.find('.char-span[line="' + lineNumber + '"]').each(function () {
            lineSpan.append($(this).text()); // Append each character to the line span
            $(this).remove(); // Remove the individual char-span after appending
        });
        element.append(lineSpan); // Append the wrapped line-span back to the element
    }

    element.find('.line-span').each(function () {
        $(this).html(`
                <div>
                ${$(this).text()}
                </div>
            `);
    });
}

// Function to perform the unwrapping animation
function unwrapText(element, delay = 0) {
    if (!element.attr('unwrapped')) {
        // splitTextToLines(element)
        // Step 4: GSAP animation
        var utTl = gsap.timeline({
            defaults: {
                duration: 0.6
            },
            delay: delay // Set the delay before the animation starts
        });

        utTl.fromTo(element.find('.line-span div'), {
            y: "100%"
        }, {
            y: "0%",
            stagger: 0.2 // Stagger stays as 0.2
        });
        element.attr('unwrapped', 'true')
    }
}

$(document).ready(function () {

    var style = document.createElement('style');
    style.innerHTML = `
    .line-span {
        overflow: hidden;
    }
`;
    document.head.appendChild(style);


    // unwrap-text animation start
    $('[unwrap-text]').each(function () {
        splitTextToLines($(this))
    });
    $('[unwrap-text]').each(function () {

        var mainItem = $(this);

        // Check for the delay attribute
        var delay = mainItem.attr('delay') ? parseFloat(mainItem.attr('delay')) : 0;

        var utTl = gsap.timeline({
            defaults: {
                duration: 0.6
            },
            scrollTrigger: {
                trigger: mainItem,
                start: "top 80%",
            },
            delay: delay // Set the delay before the animation starts
        });

        utTl.fromTo(mainItem.find('.line-span div'), {
            y: "100%"
        }, {
            y: "0%",
            stagger: 0.2 // Stagger stays as 0.2
        });

    });


    //unwrap-text animation end
    $('.nav-link-text').each(function () {
        gsap.fromTo($(this), {
            y: 30,
        }, {
            y: 0,
            duration: 0.7
        })
    })
});

$('[split-text]').each(function () {
    splitTextToLines($(this))
})

$('[rm-block]').each(function () {
    var toShowBlock = $(this).find('[rm-show]')
    splitTextToLines(toShowBlock)
    toShowBlock.hide()
    var trigger = $(this).find('[rm-trigger]')
    trigger.on('click', function () {
        toShowBlock.show()
        trigger.hide()
        unwrapText(toShowBlock)
    })
})