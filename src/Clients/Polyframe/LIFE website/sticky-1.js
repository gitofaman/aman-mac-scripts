// Animate From

document.querySelector('.section-superior-nutrition').style.height = '300px'

$(".section-superior-nutrition").each(function (index) {
    let triggerElement = $(this);
    let targetElement = $(".combo-1-t-2");
    let noOpacityelements = document.querySelectorAll('.section-superior-nutrition .flex-horizontal :not(.combo-1-t-2, .lt-8-1)')
    let serviceSection = document.querySelector('.section-parallax-rows')
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        // trigger element - viewport
        start: "top -10%",
        end: "bottom 10%",
        scrub: 1
      }
    });
    tl.from(targetElement, {
      x: "0%",
      y: '0%',
      scale: 1,
      duration: 1
    })
    .fromTo(noOpacityelements, {
        opacity: 1,
    }, {
        opacity: 0,
        duration: 2
    }, 0)
    .fromTo(serviceSection, {
        opacity: 0,
    }, {
        opacity: 1
    }, 3)
    // serviceSection.style.opacity = 0
    // tl.eventCallback('onComplete', ()=>{
    //   serviceSection.style.opacity = 1
    // })
    // tl.eventCallback('onReverseComplete', ()=>{
    //   serviceSection.style.opacity = 0
    // })
  });

  $(".section-why-people").each(function (index) {
    let triggerElement = $(this);
    let targetElement = $(".footer-back-block");
    // let noOpacityelements = document.querySelectorAll('.section-why-people .flex-horizontal :not(.footer-back-block, .lt-9-1)')
  
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        // trigger element - viewport
        start: "top -10%",
        end: "bottom 10%",
        scrub: 1
      }
    });
    tl.from(targetElement, {
      x: "0%",
      y: '0%',
      scale: 1,
      duration: 1
    })
    // .fromTo(noOpacityelements, {
    //     opacity: 1
    // }, {
    //     opacity: 0
    // }, 0);
  });