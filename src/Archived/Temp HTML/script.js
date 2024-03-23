var heading = document.querySelector('.heading')
var headingTextArray = heading.innerText.split('')
heading.innerHTML = ''
headingTextArray.forEach(t=>{
    heading.innerHTML += `<span>${t}</span>`;
})

var headingSpans = heading.querySelectorAll('span')
var rotatingCounter = 0
var rotationDistance = Math.round(270/headingSpans.length);
headingSpans.forEach(span=>{
  span.style.transform = `rotate(${rotatingCounter}deg)`
  span.style.display = `inline-block`
  rotatingCounter += rotationDistance
})

// var animationCounter = 0;
// var spanTranslateTime = 200;
// setInterval(()=>{
//     var i = 0;
//     headingSpans.forEach(span=> {
//         anime({
//             targets: span,
//             rotate: rotationDistance * i + animationCounter,
//             duration: spanTranslateTime,
//             easing: `linear`
//         })
//         i++;
//         if(animationCounter===270) {
//             animationCounter=0;
//         }
//         animationCounter += 1;
//     })
// }, spanTranslateTime)