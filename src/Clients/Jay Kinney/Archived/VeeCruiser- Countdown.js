
//COUNTDOWN TIMER SCRIPT
// Set the date we're counting down to
var counterStepParents = document.querySelectorAll('.counter-step-parent')
var countDownDate = new Date('2023-05-25').getTime();
var updateParent = (i, twoDigitVal) => {
  var splitVal = twoDigitVal.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}).split('')
  var num = 0
  counterStepParents[i].querySelectorAll('[step-num]').forEach(step=>{
    step.innerText = splitVal[num]
    num++
  })
}
var changeTime = (days, hours, minutes, seconds) => {
  updateParent(0, days)
  updateParent(1, hours)
  updateParent(2, minutes)
  updateParent(3, seconds)
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
  changeTime(days, hours, minutes, seconds)
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    changeTime(0,0,0,0)
  }
}, 1000);
