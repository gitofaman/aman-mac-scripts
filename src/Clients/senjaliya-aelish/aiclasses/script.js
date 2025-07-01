$(document).ready(function() {
  $('.home-live_right-image').each(function() {
    $(this).removeAttr('src').removeAttr('srcset').attr('loading', 'eager');
    const itemIndex = $(this).index();
    const width = 1500 + itemIndex;
    const height = 1200 + itemIndex;
    $(this).attr('src', `https://picsum.photos/${width}/${height}`);
  });

  gsap.registerPlugin(ScrollTrigger);

  const items = $('.home-live_item');
  const images = $('.home-live_right-image');

  items.each(function(index, element) {
    ScrollTrigger.create({
      trigger: element,
      start: "top 40%",
      end: "bottom 40%",  // changed from top to bottom
      onToggle: (self) => {
        if (self.isActive) {
          // deactivate all
          items.removeClass('is-active');
          images.removeClass('is-active');
          
          // activate current
          $(element).addClass('is-active');
          images.filter(`.is-${index + 1}`).addClass('is-active');
        }
      },
      // markers: true,
    });
  });
});