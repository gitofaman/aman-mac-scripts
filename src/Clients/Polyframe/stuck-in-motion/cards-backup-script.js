function isFullyInViewport(el) {
    var rect = el.getBoundingClientRect();
    var windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    var windowWidth = (window.innerWidth || document.documentElement.clientWidth);

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= windowHeight &&
        rect.right <= windowWidth
    );
}
$(document).ready(function () {
    // ensuring same number of dots as step
    var totalCards = $('.card_step.w-dyn-item').length;
    var dotContainer = $('.our-process-steps'); // adjust selector as needed
    var allDots = dotContainer.find('.our-process-dot');
    var currentDots = allDots.length;

    // If dots are fewer -> clone needed amount
    if (currentDots < totalCards) {
        var cloneCount = totalCards - currentDots;
        var template = allDots.first(); // base element to clone

        for (var i = 0; i < cloneCount; i++) {
            template.clone().appendTo(dotContainer);
        }
    }

    // If dots are more -> remove extras
    if (currentDots > totalCards) {
        var removeCount = currentDots - totalCards;
        allDots.slice(-removeCount).remove();
    }

    // actual animation
    gsap.set('.our-process-dot', {
        opacity: 0.5
    })
    var cardStepsWrapper = $('.card_steps-component-wrapper')
    var cardStepsComponent = $('.card_steps-component')
    var sectionWrapper = $('.section-steps-wrapper')

    var totalDistanceToMove = cardStepsComponent.outerWidth() - cardStepsWrapper.outerWidth()

    let cards = $('.card_step.w-dyn-item');
    let dots  = $('.our-process-dot');

    function isFullyInViewport($el) {
    var rect = $el[0].getBoundingClientRect();
    var windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.top >= 0 && rect.bottom <= windowHeight;
    }

    gsap.to(cardStepsComponent, {
    marginLeft: -totalDistanceToMove,
    scrollTrigger: {
        trigger: sectionWrapper,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: function () {
            // console.log('workingsasfasfd')
        let activeIndex = -1;
            console.log(cards.length)
        cards.each(function (index) {
            console.log(index)
            if (isFullyInViewport($(this))) {
            activeIndex = index;
            return false; // stop at first fully visible card
            }
        });

        if (activeIndex === -1) return;

        dots.each(function (i) {
            // insta set, no tween spam
            $(this).css('opacity', i <= activeIndex ? 1 : 0);
        });
        }
    }
    });
})