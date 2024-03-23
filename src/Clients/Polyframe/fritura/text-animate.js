gsap.to('.menu-button.menubuttonbutton', {
    opacity: 0,
    y: 30,
    duration: 0
})
$('[animate-text]').each(function() {
    var text = $(this).text();
    var startingHtml = $(this).html();
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
        top: 100,
        opacity: 0,
        duration: 0.5,
        stagger: 2/totalSpan,
        scrollTrigger: {
            trigger: mainParent,
            start: 'top 50%'
        }, 
        onComplete: function(){
            mainParent.html(startingHtml);
            gsap.to('.menu-button.menubuttonbutton', {
                opacity: 1,
                y: 0
            })
        }
    })
});

