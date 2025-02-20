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
  
  var numbersArr = []
  
  $('.h-img').each(function () {
    numbersArr.push(0)
  })
  
  setInterval(function () {
    var i = 0
    $('.hero-column-background').each(function () {
      // var clTimeline = gsap.timeline()
      var $main = $(this)
      var delay = 0.1*i
      gsap.to($(this), {
        opacity: 0,
        duration: 0.2,
        delay: delay,
        onComplete: function(){
          $main.removeAttr('src')
          $main.removeAttr('srcset')
          $main.attr('src', $('.h-img').eq(findNextRandomIndex(numbersArr)).attr('src'))
        }
      })
      gsap.to($(this), {
        opacity: 1,
        duration: 0.2,
        delay: 0.2 + delay
      })
      i++;
    })
  }, 3000)