function findNextRandomIndex(arr) {
    // Find the smallest number in the array
    const min = Math.min(...arr);

    // Create an array of indices where the smallest number occurs
    const indicesOfMin = arr.reduce((acc, val, index) => {
        if (val === min) {
            acc.push(index);
        }
        return acc;
    }, []);

    // If there are no occurrences of the smallest number, return -1
    if (indicesOfMin.length === 0) {
        return -1;
    }

    // Choose a random index from the indicesOfMin array
    const randomIndex = indicesOfMin[Math.floor(Math.random() * indicesOfMin.length)];

    // Update the array by incrementing the chosen index by 1
    arr[randomIndex] += 1;

    return randomIndex;
}
$('.card-mainer').css({
    position:'absolute'
})
var animateEl = (el, animateJson, aduration) => {
    console.log(aduration)
    var jsonToAnimate = {
        targets: el,
        duration: aduration,
        easing: `easeOutSine`
    }
    for (key in animateJson) {
        jsonToAnimate[key] = animateJson[key]
    }
    anime(jsonToAnimate)
}

function randomBetween(min, max) {
    if (min >= max) {
        return "Invalid input";
    }
    
    const decimalPlaces = 1; // Number of decimal places
    const randomNumber = Math.random() * (max - min) + min;
    const roundedNumber = Number(randomNumber.toFixed(decimalPlaces));
    
    return roundedNumber;
}

var slideUpAnimation = (div) => {
    var timeToTranslate = randomBetween(0.5, 0.75)

    gsap.fromTo(div, {
        opacity: 0,
        y: 100
    }, {
        opacity: 1,
        y: 0,
        duration: timeToTranslate
    })
}

var possibleClasses = ['rc', 'tmr', 'bml', 'br', 'bl', 'bmr']
var ps = [0,0,0,0,0,0]

var colorClasses = ['is--pink', 'is--yellow', 'is--blue', 'is--green']
var cc = [0,0,0,0]

var updateClass = (b, className) => {
    b.classList.add(className);
    var everyChild = b.querySelectorAll('*')
    everyChild.forEach(ch=>{
        ch.classList.add(className);
    })
}

var cardLength = $('.post-card.w-dyn-item').length;

//Making sure random cards poping will be done in desktop/tablet view only.
if(window.innerWidth > 767) {
    var numberOfDivs = cardLength;

    if (cardLength > 10) {
        numberOfDivs = 10;
    }
    
    
    
    var divMainer = document.createElement('div');
    divMainer.classList.add('card-mainer');
    
    for (var i = 0; i < numberOfDivs - 1; i++) {
        $('.card-container').append(divMainer.cloneNode(true)); // Use proper jQuery to append the element
    }
    
    var numberOfTimesShown = []
    for(i=0;i<cardLength;i++) {
        numberOfTimesShown.push(0)
    }
    
    var postCards = document.querySelectorAll('.post-card')
    
    var updateCard = (div) => {
        var addNextPostCard = () => {
            slideUpAnimation(div);
            $(div).empty();
            var nextIndex = findNextRandomIndex(numberOfTimesShown);
            var nextPostCard = postCards[nextIndex].cloneNode(true);
            updateClass(nextPostCard, `type-${possibleClasses[findNextRandomIndex(ps)]}`);
            nextPostCard.classList.add(colorClasses[findNextRandomIndex(cc)]);
            $(nextPostCard).css({
                left: randomBetween(-15, 16) + '%',
                top: randomBetween(-3, 3) + '%',
                zIndex: Math.floor(randomBetween(0, numberOfDivs)),
                position: 'absolute'
            });
            $(div).append(nextPostCard);
        };
    
        var addNextCardWithRandomInterval = () => {
            addNextPostCard();
            var randomInterval = Math.floor(Math.random() * (8000 - 6000 + 1) + 4500); // Random interval between 4500 and 6000 milliseconds
            setTimeout(addNextCardWithRandomInterval, randomInterval);
        };
    
        addNextCardWithRandomInterval();
    };
    
    $('.card-mainer').each(function(i){
        updateCard(this)
    })
}