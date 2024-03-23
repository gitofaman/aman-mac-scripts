var heroTextImgs = document.querySelectorAll('.hero-text-img')
var aTime = 1200;
function getRandomFloat(array) {
    const min = Math.min(...array);
    const max = Math.max(...array);
    return Math.random() * (max - min) + min;
  }
  function getRandomInteger(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }
  
var randomChange = (el) =>{
    var scaleValues = [0.9, 1.1]
    var moveYValues = [-100, 100]
    var moveXValues = [-20, 20]
    // var rotateValues = [-15, 15]
    // var animationTime = [aTime, aTime]
    setInterval(() => {
        anime({
            targets: el,
            duration: aTime,
            easing: `linear`,
            scale: getRandomFloat(scaleValues),
            translateX: getRandomFloat(moveXValues),
            translateY: getRandomFloat(moveYValues),
            // rotate: getRandomFloat(rotateValues),
        })        
    }, aTime);
}
heroTextImgs.forEach(heroTextImg => {
    randomChange(heroTextImg)
})