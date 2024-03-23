const flightPath = {
    curviness: 1.25,
    autoRotate: true,
    values: [
        {x: 100, y: -20},
        {x: 300, y: 10},
        {x: 500, y: 100},
        {x: 750, y: -100},
        {x: 450, y: -50},
        {x: 600, y: 100},
        {x: 800, y: 0},
        {x: window.innerWidth, y: -200}
    ]
}

const tween = new TimelineLite()

tween.add(
    TweenLite.to('.paper-plane', 4, {
        bezier: flightPath,
        ease: Power1.easeInOut
    })
)

const controller = new ScrollMagic.Controller();

var scene = new ScrollMagic.Scene({
    triggerElement: '.animation',
    duration: 2000,
    triggerHook: 0
  })
  .setTween(tween)
  .addIndicators()
  .setPin(".animation")
  .addTo(controller);
