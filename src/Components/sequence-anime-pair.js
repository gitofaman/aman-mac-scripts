$(document).ready(function(){
    function splitTextToSpans(blockElement) {
        var htmlContent = blockElement[0].innerHTML;
        var newText = '';
        
        for (var i = 0; i < htmlContent.length; i++) {
            var char = htmlContent[i];
            if (char === '<') {
                // Skip any HTML tags
                while (htmlContent[i] !== '>') {
                    newText += htmlContent[i];
                    i++;
                }
                newText += '>'; // Append the closing bracket of the tag
            } else {
                // Wrap each character in a span tag
                newText += '<span class="spanned-text">' + char + '</span>';
            }
        }
        
        blockElement[0].innerHTML = newText;
    }
    $('[anime-parent]').each(function(){
        var $mainEl = $(this);
        var move = {};
        var moveVal = 40;
        var duration = parseFloat($(this).attr('duration')) || 0.5; // Default duration is 0.5 seconds
        var customMoveVal = $(this).attr('moveVal'); // Custom moveVal if provided
        var percentToAppear = $mainEl.attr('offset') || '75%'
    
        // Update moveVal if customMoveVal is provided
        if (customMoveVal) {
            if (customMoveVal.includes('%')) {
                moveVal = customMoveVal; // If moveVal contains %, use it directly
            } else {
                moveVal = parseFloat(customMoveVal); // Otherwise, parse it as a number
            }
        }
    
        switch ($(this).attr('anime-parent')) {
            case 'x': 
                move.x = -moveVal;       
                break;
            case '-x':
                move.x = moveVal;
                break;
            case 'y': 
                move.y = moveVal;
                break;
            case '-y':
                move.y = -moveVal;
                break;
            default: 
                move.y = moveVal;
                break;
        }
    
        gsap.from($mainEl.children(), {
            ...move,
            opacity: 0,
            stagger: 0.2,
            duration: duration, // Use the provided duration
            ease: "power4",
            scrollTrigger: {
                trigger: $mainEl,
                start: `top ${percentToAppear}`
            }
        });
    });
    
    
    // animate pair elements
    
    $('[animate-pair]').each(function(){
        var $main = $(this)
        var $animateItems = $main.find('[animate]')
        var percentToAppear = $main.attr('offset') || '75%'
        $animateItems.sort(function(a, b) {
            var animateTypeA = $(a).attr('animate');
            var animateTypeB = $(b).attr('animate');
            
            if (animateTypeA === 'text') {
                return -1; // 'text' has higher priority
            } else if (animateTypeB === 'text') {
                return 1; // 'slide-up' has lower priority
            } else if (animateTypeA === 'slide-up') {
                return 1; // 'slide-up' has lower priority
            } else if (animateTypeB === 'slide-up') {
                return -1; // 'text' has higher priority
            } else {
                return 0; // No priority difference
            }
        });
        var apTl = gsap.timeline({
            defaults: {
    
            },
            scrollTrigger: {
                trigger: $main,
                start: `top ${percentToAppear}`
            }
        })
        $animateItems.each(function(){
            var $el = $(this)
            var $val = $(this).attr('animate')
            console.log($val)
            switch ($val) {
                case "text":
                    var text = $el.html(); // Use html() instead of text() to preserve HTML tags
                    var startingHtml = $el.html();
                    var html = '';
                    var isInSpan = false; // Flag to check if current character is inside a span tag
                    var isInBr = false; // Flag to check if current character is inside a br tag
                    for (var i = 0; i < text.length; i++) {
                        if (text[i] === '<' && text[i+1] === 's' && text[i+2] === 'p' && text[i+3] === 'a' && text[i+4] === 'n') {
                            isInSpan = true;
                        } else if (text[i] === '<' && text[i+1] === 'b' && text[i+2] === 'r') {
                            isInBr = true;
                        }
                        if (isInSpan || isInBr) {
                            html += text[i]; // Append the character to HTML without wrapping it in a new span
                        } else {
                            if (text[i] === ' ') {
                                html += '<span class="spanned-text"> </span>'; // Preserve spaces
                            } else {
                                html += '<span class="spanned-text">' + text[i] + '</span>';
                            }
                        }
                        if (text[i] === '>' && text[i-1] === 'n' && text[i-2] === 'a' && text[i-3] === 'p' && text[i-4] === 's') {
                            isInSpan = false;
                        } else if (text[i] === '>' && text[i-1] === 'r' && text[i-2] === 'b') {
                            isInBr = false;
                        }
                    }
                    $el.html(html);
                    $el.find('span[class!=spanned-text]').each(function(){
                        splitTextToSpans($(this))
                    })
                    var mainParent = $el;
                    var totalSpan = $el.find('.spanned-text').length;
                    apTl.from($el.find('.spanned-text'), {
                        top: 100,
                        opacity: 0.4,
                        duration: 0.5,
                        stagger: 1/totalSpan,
                        onComplete: function(){
                            mainParent.html(startingHtml);
                        }
                    }, 0);
                    break;
                case "slide-up":
                    apTl.from($el, {
                        y: '40',
                        opacity: 0,
                        duration: 0.3
                    }, 1)
                    break;
                default: 
                    apTl.from($el, {
                        opacity: 0,
                        duration: 0.3
                    }, 0.5)
                    break;
            }
        })
    })
});