
gsap.registerPlugin(ScrollTrigger)
  
$(document).ready(function() {

    var style = document.createElement('style');
    style.innerHTML = `
        .line-span {
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
    

    // unwrap-text animation start
    $('[unwrap-text]').each(function() {
        let element = $(this);
        let text = element.text().trim();
        element.empty(); // Clear the original content

        // Step 1: Wrap each letter in a span
        for (let i = 0; i < text.length; i++) {
            let char = text[i];
            let charSpan = $('<span class="char-span"></span>').text(char);
            element.append(charSpan);
        }

        let currentTop = 0;
        let currentLine = 0;

        // Step 2: Assign line numbers based on top position
        $(this).find('.char-span').each(function() {
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
            element.find('.char-span[line="' + lineNumber + '"]').each(function() {
                lineSpan.append($(this).text()); // Append each character to the line span
                $(this).remove(); // Remove the individual char-span after appending
            });
            element.append(lineSpan); // Append the wrapped line-span back to the element
        }
        $(this).find('.line-span').each(function(){
            $(this).html(`
                <div>
                ${$(this).text()}
                </div>
                `)
        })
    });
    $('[unwrap-text]').each(function(){
    
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
    $('.nav-link-text').each(function(){
        gsap.fromTo($(this), {
            y: 30,
        }, {
            y: 0,
            duration: 0.7
        })
    })
});

