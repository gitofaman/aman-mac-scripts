        // slide in view animation
        var animationSpeed = 1;
$('.block-3rd').each(function (i) {
  $(this).find('.block-3rd-mid').css({
    display: 'block'
  })
  $(this).css({
    overflow: 'hidden'
  })
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: $(this),
      start: 'top 80%',
      end: 'bottom bottom',
      scrub: true
    }
  })
  tl.fromTo($(this).find('.block-3rd-mid'),{
    y: `0%`
  }, {
    y: `-100%`,
    duration: 1*animationSpeed,
    delay: 0.2*i*animationSpeed
  }).fromTo($(this).find('.block-3rd-bg'),{
    y: '50%',
    scale: 1.25
  }, {
    y: '0%',
    scale: 1,
    duration: .8*animationSpeed, 
    delay: 0.2*i*animationSpeed
  }, 0)
})