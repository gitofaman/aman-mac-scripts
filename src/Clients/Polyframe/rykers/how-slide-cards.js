//how card animation
var nextNo = (currentIndex, maxIndex) => {
    if(currentIndex===maxIndex) {
        return 0
    } else {
        return currentIndex + 1;
    }
}

var prevNo = (currentIndex, maxIndex) => {
    if(currentIndex===0) {
        return maxIndex;
    } else {
        return currentIndex - 1;
    }
}
//making the how cards on top of each other
$('.how-card-parent').css('position', 'relative')
$('.how-card').css('position', 'absolute')

//making how-card parent to have the maximum height from the how-card

var maxHeight = 0;

$('.how-card').each(function() {
    var cardHeight = $(this).outerHeight();
    if (cardHeight > maxHeight) {
        maxHeight = cardHeight;
    }
});

// Set the maximum height to the how-card-parent
$('.how-card-parent').css('height', maxHeight);
var currentCard = 0
var showCard = (i) => {
    var hcTl = gsap.timeline()
    hcTl.to('.how-card-head', {
        x: -100,
        opacity: 0
    }).to('.how-card-content', {
        x: 100,
        opacity: 0
    }, 0).to($('.how-card').eq(i).find('.how-card-head'), {
        x: 0,
        opacity: 1
    }).to($('.how-card').eq(i).find('.how-card-content'), {
        x: 0,
        opacity: 1
    }).then(function(){
        currentCard = nextNo(currentCard, $('.how-card').length - 1)
    })
}

setInterval(function(){
    //show current card
    showCard(currentCard)
}, 3500)