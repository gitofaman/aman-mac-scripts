gsap.registerPlugin(ScrollTrigger);



$('.play-rectangle').each(function(){
// Set up the GSAP animation
var multiply = -1
if(Math.random() > 0.5) {
  multiply = 1
} 
gsap.to($(this), {
  y: Math.random()*200*multiply,
  scrollTrigger: {
      trigger: $(this),
      start: "top bottom", // Start the animation when the top of the element hits the center of the viewport
      end: "bottom top", // End the animation when the bottom of the element hits the center of the viewport
      scrub: true, // Smoothly animate the property changes
  }
});
})