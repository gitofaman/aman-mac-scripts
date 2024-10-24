// helper functions start
function findRandomCoordinates(cXy, radius, givenSafeDistance, numCoordinates) {
    const [centerX, centerY] = cXy;
    const coordinates = [];
    const coordinatesPerQuadrant = Math.ceil(numCoordinates / 4);
  
    function randomAngle(quadrant) {
      const baseAngle = quadrant * (Math.PI / 2);
      return baseAngle + Math.random() * (Math.PI / 2);
    }
  
    function randomRadius() {
      return radius + (Math.random() * 2 - 1) * givenSafeDistance;
    }
  
    for (let quadrant = 0; quadrant < 4; quadrant++) {
      for (let i = 0; i < coordinatesPerQuadrant; i++) {
        const angle = randomAngle(quadrant);
        const distance = randomRadius();
  
        const x = centerX + distance * Math.cos(angle);
        const y = centerY + distance * Math.sin(angle);
  
        coordinates.push([x, y]);
        if (coordinates.length >= numCoordinates) break;
      }
      if (coordinates.length >= numCoordinates) break;
    }
  
    return coordinates;
  }
  
  // Example usage:
  // const cXy = [0, 0];
  // const radius = 50;
  // const safeDistance = 5;
  // const numCoordinates = 12;
  // const coords = findRandomCoordinates(cXy, radius, safeDistance, numCoordinates);
  // console.log(coords);
  // Example usage:
  // const coords = findRandomCoordinates(5, 'mainBlockId');
  // console.log(coords);
  

function findCoordinate(refXy, mainXy, s) {
const [refX, refY] = refXy;
const [mainX, mainY] = mainXy;

// If the coordinates are the same, return a point on the x-axis of mainXy, s distance away
if (refX === mainX && refY === mainY) {
    return [mainX + s, mainY];
}

// Calculate the distance between refXy and mainXy
const deltaX = mainX - refX;
const deltaY = mainY - refY;
const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

// Calculate the unit vector (direction) from refXy to mainXy
const unitX = deltaX / distance;
const unitY = deltaY / distance;

// Calculate the new coordinate, s pixels away from mainXy in the opposite direction
const newX = mainX + s * unitX;
const newY = mainY + s * unitY;

return [newX, newY];
}
// var fc = 
function moveBlock(fc, tc, divToMove) {
    // Ensure the block starts at the initial position (fc)
    divToMove.css({
      left: fc[0],
      top: fc[1]
    });
  
    // Animate the block to the target position (tc) using GSAP
    gsap.to(divToMove, {
      x: tc[0], // Change in x from fc to tc
      y: tc[1], // Change in y from fc to tc
      duration: 2, // Duration of the animation in seconds
      ease: "power1.inOut" // Easing function for a smooth animation
    });
  }
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
var possibleClasses = ['rc', 'tmr', 'bml', 'br', 'bl', 'bmr']
var ps = [0,0,0,0,0,0]

var colorClasses = ['is--pink', 'is--yellow', 'is--blue', 'is--green']
var cc = [0,0,0,0]
//helper functions end


$('.page-wrapper').css('height', '100dvh')
$('.page-wrapper').css('overflow-y', 'auto')

// var safeDistance = ($(window).width()/2 + $(window).height()/2)/2
var wW = $(window).width()
var wH = $(window).height()
var safeDistance = wW >= wH ? wW/2 : wH/2

var ratio = 1.5
var refXy = [wW/2 - $('.post-card').width()*ratio, wH/2 + $('.post-card').height()*ratio]
var xYs = findRandomCoordinates(refXy, 100, 50, $('.post-card').length)

$('.post-card').each(function(){
    var index = $('.post-card').index($(this))
    var tW = $(this).width()
    var tH = $(this).height()
    $(this).addClass(possibleClasses[findNextRandomIndex(ps)]).addClass(colorClasses[findNextRandomIndex(cc)])
    $(this).css({
        position: 'absolute'
    })
    // $(this).addClass()
    $(this).appendTo($('.aposs-cards-container'))
    var mainXy = xYs[index]
    mainXy = [mainXy[0] + tW, mainXy[1] + tH]
    var fc = findCoordinate(refXy, mainXy, safeDistance)
    moveBlock(fc, mainXy, $(this))
})
alert('working')