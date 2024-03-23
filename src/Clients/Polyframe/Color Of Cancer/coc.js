// function findNextRandomIndex(arr) {
//     // Find the smallest number in the array
//     const min = Math.min(...arr);

//     // Create an array of indices where the smallest number occurs
//     const indicesOfMin = arr.reduce((acc, val, index) => {
//         if (val === min) {
//             acc.push(index);
//         }
//         return acc;
//     }, []);

//     // If there are no occurrences of the smallest number, return -1
//     if (indicesOfMin.length === 0) {
//         return -1;
//     }

//     // Choose a random index from the indicesOfMin array
//     const randomIndex = indicesOfMin[Math.floor(Math.random() * indicesOfMin.length)];

//     // Update the array by incrementing the chosen index by 1
//     arr[randomIndex] += 1;

//     return randomIndex;
// }

// var animateEl = (el, animateJson, aduration) => {
//     console.log(aduration)
//     var jsonToAnimate = {
//         targets: el,
//         duration: aduration,
//         easing: `easeOutSine`
//     }
//     for (key in animateJson) {
//         jsonToAnimate[key] = animateJson[key]
//     }
//     anime(jsonToAnimate)
// }

// function randomBetween(min, max) {
//     if (min >= max) {
//         return "Invalid input";
//     }
    
//     const decimalPlaces = 1; // Number of decimal places
//     const randomNumber = Math.random() * (max - min) + min;
//     const roundedNumber = Number(randomNumber.toFixed(decimalPlaces));
    
//     return roundedNumber;
// }

// var slideMoveAnimation = (div) => {
//     div.setAttribute('moved-already', 'true')
//     gsap.fromTo(div, {
//         opacity: 0,
//         y: 0
//     }, {
//         opacity: 1,
//         y: 100,
//         duration: 0.2
//     })
// }

// var possibleClasses = ['rc', 'tmr', 'bml', 'br', 'bl', 'bmr']
// var ps = [0,0,0,0,0,0]


// var colorClasses = ['is--pink', 'is--yellow', 'is--blue', 'is--green']
// var cc = [0,0,0,0]

// var updateClass = (b, className) => {
//     b.classList.add(className);
//     var everyChild = b.querySelectorAll('*')
//     everyChild.forEach(ch=>{
//         ch.classList.add(className);
//     })
// }
// function refresh(){
//     window.location.href = window.location.href
// }
// console.log('ALl working')
// if(window.innerWidth<768) {
//     var cardLength = $('.post-card.w-dyn-item').length;
//     var cards = Array.from(document.querySelectorAll('.post-card.w-dyn-item'))
//     var mobileClasses = ['bl', 'bml','bmr', 'br']
    
//     var movePreviousCards = (currIndex) => {
//         for(let i=currIndex-1 ;i>=0;i--){
            
//         }
//     }

//     // add arrows at the bottom 
//     $('.post-card.w-dyn-item').each(function(i){
//         var thisClass = `type-${mobileClasses[i%4]}`
//         $(this).addClass(thisClass)
//         $(this).find('*').addClass(thisClass)
//         $(this).css({
//             zIndex: cardLength-i
//         })
//     })
//     var updateCardLayout = () => {
//         var parentTop = document.querySelector('.div-block').top
//         cards.forEach(card=>{
//             var cardIndex = cards.indexOf(card)
//             var cardTop = card.getBoundingClientRect().top
//             if(cardTop <= parentTop && cardTop > (parentTop - 10)) {
//                 if(!card.hasAttribute('moved-already')) {
                    
//                 }
//             }
//         })
//     }
//     window.addEventListener('scroll')
// }