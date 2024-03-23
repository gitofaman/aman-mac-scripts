$(".grid-4col").addClass('main-block')
$(".main-block").removeClass('grid-4col')

// var mainBlock = document.querySelector('.main-block')

const postCardHeight = 250
const postCardWidth = 300

$('.main-block').css({
    'width': '100%',
    'height': '700px',
    'position': 'relative'
})

$('.post-card').css({
    'width': `${postCardWidth}px`,
    'height': `${postCardHeight}px`,
    'position': 'absolute'
})

var n = $('.post-card').length
var mainWidth = $('.main-block').width()

var r = Math.round(mainWidth/postCardWidth) + 1 // number of postcards in one row
var c = n/r //number of postcards in one column

var x = 0

var yXs = []
$('.post-card').each(function(i){

  var cardPosInCol = i%4
  if(cardPosInCol===0) {
    x++;
  }
  var yCoeff = ((Math.random()/2)+cardPosInCol)
  var xCoeff = ((Math.random()/2)+x - 1)
  var yValue = yCoeff*120 + postCardHeight/2
  var xValue = xCoeff*postCardWidth - postCardWidth/2
  // console.log(`Y coefficient for ${i} is ${yCoeff} and Y Value is ${yValue}`)
  // console.log(`X coefficient for ${i} is ${xCoeff} and X Value is ${xValue}`)
  yXs.push({
    num: i,
    yCoeff: yCoeff,
    yValue: yValue,
    xCoeff: xCoeff,
    xValue: xValue
  })

  $(this).css({
    top: Math.floor(yValue),
    left: Math.floor(xValue)
  })
})

// for(i=0;i<=10;i++) {
//   console.log(Math.random())
// }

