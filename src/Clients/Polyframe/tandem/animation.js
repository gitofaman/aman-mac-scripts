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