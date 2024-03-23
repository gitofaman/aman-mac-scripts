function giveRandomNumbers(startVal, endVal, startExcludeVal, endExcludeVal) {
    if (startVal >= endVal || startExcludeVal >= endExcludeVal) {
      return "Invalid input ranges";
    }
  
    // Calculate the range outside the exclusion
    var range1 = [startVal, startExcludeVal];
    var range2 = [endExcludeVal, endVal];
  
    // Calculate the total range size
    var totalRangeSize = range1[1] - range1[0] + range2[1] - range2[0];
  
    // Generate a random number within the total range size
    var randomWithinTotalRange = Math.random() * totalRangeSize;
  
    // Determine which range the random number belongs to
    var result;
    if (randomWithinTotalRange < range1[1] - range1[0]) {
      result = range1[0] + Math.floor(randomWithinTotalRange);
    } else {
      result = range2[0] + Math.floor(randomWithinTotalRange - (range1[1] - range1[0]));
    }
  
    return result;
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

$('.post-card').css({
    'position': 'absolute'
})
var movingClasses = ['moving-div','moving-div-1','moving-div-2']
var n = $('.post-card').length;
var w = document.querySelector('.post-card').offsetWidth;

var c = 5
var r = 3

function findPartitions(numberOfRows, numberOfColumns) {
    if (numberOfRows <= 0 || numberOfColumns <= 0) {
      return "Invalid input";
    }
  
    const partitionWidth = Math.round(100 / numberOfColumns);
    const partitionHeight = Math.round(100 / numberOfRows);
  
    const partitions = [];
  
    for (let i = 0; i < numberOfColumns; i++) {
      for (let j = 0; j < numberOfRows; j++) {
        const x = i * partitionWidth;
        const y = j * partitionHeight;
        partitions.push([x, y]);
      }
    }
  
    return partitions;
  }

var partitions = findPartitions(r, c);
var buffer = 14; //percentage to be included for coordinate

var xBuffer = (buffer/r).toFixed(2)
var yBuffer = (buffer/r).toFixed(2)

$('.post-card.w-dyn-item').each(function(i){
    if(i>partitions.length-1) {
        $(this).hide();
        return;
    }
    var startX = partitions[i][0]
    var startY = partitions[i][1]
    var coeff = -1
    if(startX>30) {
        startX = startX-randomBetween(0, 4)
    }
    if(startY>30) {
        startY = startY-randomBetween(0,3)
    }
    // $(this).addClass(movingClasses[i%3])

    var xChosen = randomBetween(startX, startX+parseFloat(xBuffer))
    // console.log({startX, xChosen})
    var yChosen = randomBetween(startY, startY+parseFloat(yBuffer))
    // console.log({startY, yChosen})
    // console.log(partitions[i])
    $('.post-card.w-dyn-item').eq(i).css({
        left: xChosen + '%',
        top: yChosen + '%',
        zIndex: giveRandomNumbers(0, 10, 4,5)
    })
})