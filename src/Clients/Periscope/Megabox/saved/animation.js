    // Delay before animation starts
    gsap.delayedCall(1, function() {
        // GSAP animation timeline
        var timeline = gsap.timeline();
  
        // Animation for loader-text-mover
        timeline.to(".loader-text-mover", { y: '-1.2em', duration: 0.6 })
               .to(".loader-text-mover", { y: '-2.4em', duration: 0.6 })
               .to(".loader-text-mover", { y: '-3.6em', duration: 0.6 });
  
        // Animation for loader2_component
        timeline.to(".loader2_component", { opacity: 0, duration: 0.5, delay: 0.3 });
  
        // Hide loader-wrapper
        timeline.set(".loader-wrapper", { display: "none" });
      });