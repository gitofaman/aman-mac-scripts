
//COUNTDOWN TIMER SCRIPT
// Set the date we're counting down to
var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate()+1);
tomorrow.setHours(0,0,0,0)
var countDownDate = tomorrow.getTime();
var addTextToTimeBlock = (divBlock, timeText) => {
    var timeBlocks = divBlock.querySelectorAll('.nri--time-text-span')
    timeBlocks[0].innerText = timeText[0]
    timeBlocks[1].innerText = timeText[1]
}
var changeTime = (hours, minutes, seconds) => {
    console.log('working')
  var hourBlocks = document.querySelectorAll('[aria-hours]')
  var minBlocks = document.querySelectorAll('[aria-mins]')
  var secBlocks = document.querySelectorAll('[aria-secs]')
  hourBlocks.forEach(hBlock=>{
    var hourText = hours.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    addTextToTimeBlock(hBlock, hourText)
  })
  minBlocks.forEach(mBlock=>{
    var minuteText = minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    addTextToTimeBlock(mBlock, minuteText)
  })
  secBlocks.forEach(sBlock=>{
    var secondText = seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    addTextToTimeBlock(sBlock, secondText)
  })
}
// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element
  changeTime(days*24+hours, minutes, seconds)
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    changeTime(0,0,0)
  }
}, 1000);