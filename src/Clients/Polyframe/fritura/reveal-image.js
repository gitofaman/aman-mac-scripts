$('document').ready(function(){
    $('.reveal-image').each(function(){
        var mainEl = $(this)
        gsap.from($(this), {
            width: '0%',
            scrollTrigger: {
                trigger: mainEl,
                start: 'top 80%',
            }
        })
    })
})