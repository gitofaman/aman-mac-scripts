// Animate From
$(".section-superior-nutrition").each(function (index) {
    let triggerElement = $(this);
    let targetElement = $(".try-block");
    let noOpacityelements = document.querySelectorAll('.section-superior-nutrition .flex-horizontal :not(.try-block, .lt-8-1)')
  
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
    .to('.lt-8-1', {
        color: '#033534'
    }, 0);
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