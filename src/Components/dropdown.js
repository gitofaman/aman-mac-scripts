$(document).ready(function() {
    // Define the variables for toggle, content, and arrow SVG
    var faqToggle = ".faq3_question";
    var faqContent = ".faq3_answer";
    var faqIcon = ".faq3_icon-wrapper svg";
  
    // Initially set the height of all faqContent to 0
    gsap.set(faqContent, { height: 0, overflow: "hidden" });
  
    $(faqToggle).click(function() {
      var $answer = $(this).next(faqContent);
      var $icon = $(this).find(faqIcon);
  
      // Close other open answers
      $(faqContent).not($answer).each(function() {
        gsap.to($(this), { height: 0, duration: 0.5 });
        gsap.to($(this).prev(faqToggle).find(faqIcon), { rotate: 0, duration: 0.5 });
      });
  
      // Toggle the clicked answer
      if ($answer.height() === 0) {
        gsap.to($answer, { height: "auto", duration: 0.5, onComplete: function() {
          $answer.css("height", "auto"); // Ensure height is auto after animation
        }});
        gsap.to($icon, { rotate: 180, duration: 0.5 });
      } else {
        gsap.to($answer, { height: 0, duration: 0.5 });
        gsap.to($icon, { rotate: 0, duration: 0.5 });
      }
    });
  });
  