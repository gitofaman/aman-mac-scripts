$(document).ready(function() {
    var moveVal = 75
    if($(window).width() < 768) {
        moveVal = 25
    }
    $('.exp-card').each(function() {
        var main = $(this);
        var expTl = gsap.timeline({
            repeat: -1, // Repeat infinitely
            repeatDelay: 0.5 // Optional delay between repeats
        });
        
        var defaultMove = moveVal
        if(!!main.attr('go-down')) {
            defaultMove = -moveVal
                if($(window).width() < 768) {
                    defaultMove = moveVal
                }
        }
        expTl
            .from(main, {
                opacity: 0,
                duration: 0.25
            })
            .from(main, {
                y: defaultMove,
                duration: 3
            })
            .to(main, {
                y: -Math.abs(defaultMove*2),
                opacity: 0,
                duration: 0.25
            });
    });
    
    
    
})