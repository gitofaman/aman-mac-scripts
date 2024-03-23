var animateNumber = (stat) => {
    var valueToUse = stat.value;
    console.log(valueToUse)
    anime({
        targets: stat,
        value: [0, valueToUse],
        round: 1,
        easing: 'easeInOutExpo',
        duration: 3500,
        complete: function() {
            stat.value = stat.getAttribute('finalval')
            console.log('animation completed')
        }
      });

}

var statsHead = document.querySelectorAll('input.stats-head')

window.addEventListener('scroll', ()=>{
    statsHead.forEach(stat=>{
        var notAnimated;
        if(stat.hasAttribute('animated')) {
            notAnimated = false;
        } else {
            notAnimated = true;
        }
        if (stat.getBoundingClientRect().top + 100 < window.innerHeight && notAnimated && stat.getBoundingClientRect().top > 100) {
            animateNumber(stat)
            stat.setAttribute('animated', 'true')
        }
    })
})