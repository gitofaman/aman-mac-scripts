(function ($) {
  const ACTIVE_VIDEO_CLASS = 'is-video-active';

  function muteAllVideosExcept($current) {
    $('video').each(function () {
      if (this !== $current[0]) {
        this.muted = true;
      }
    });
  }

  function buildVideo($container) {
    if ($container.hasClass(ACTIVE_VIDEO_CLASS)) return;

    const videoSrc = $container.attr('video-item');
    const muteMode = $container.attr('video-mute') || 'true';
    const $img = $container.find('img').first();

    if (!videoSrc || !$img.length) return;

    $container.addClass(ACTIVE_VIDEO_CLASS);

    // Clone loading screen
    const $loader = $('.loading-screen').first().clone(true, true);
    $loader.removeAttr('style').addClass('is-loading');

    $container.append($loader);

    const video = document.createElement('video');
    video.src = videoSrc;
    video.playsInline = true;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.preload = 'auto';

    // Match image sizing
    $(video).css({
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      opacity: 0,
      visibility: 'hidden'
    });

    $container.css('position', 'relative');
    $container.append(video);

    video.addEventListener('canplay', function () {
      $img.hide();
      $loader.hide();

      $(video).css({
        opacity: 1,
        visibility: 'visible'
      });
    });

    if (muteMode === 'toggle') {
      $container.on('click.videoToggle', function () {
        muteAllVideosExcept($(video));
        video.muted = false;
      });
    }
  }

  // Listen for custom event
  $(document).on('show-video', '[video-item]', function () {
    buildVideo($(this));
  });

})(jQuery);


$(document).ready(function () {
  $('[video-item][show-on-scroll]').each(function () {
    const el = this;

    ScrollTrigger.create({
      trigger: el,
      start: 'top 50%',
      once: true,
      onEnter: function () {
        $(el).trigger('show-video');
      }
    });
  });
});

var attachPopupEvents = () => {
  $('.work-popup [video-item]').each(function () {
    $(this).trigger('show-video')
  })

  $('.wp-content').each(function () {
    const $wrap = $(this);
    const $toggle = $wrap.find('.wp-content-toggle');
    const $content = $wrap.find('.wp-content-item');
    const $arrow = $wrap.find('.icon-1x1-small');

    // start closed
    gsap.set($content, {
      height: 0,
      overflow: 'hidden'
    });

    gsap.set($arrow, {
      rotate: 0,
      transformOrigin: '50% 50%'
    });

    $toggle.on('click', function () {
      const isOpen = $wrap.hasClass('is-open');

      if (isOpen) {
        // CLOSE
        gsap.to($content, {
          height: 0,
          duration: 0.4,
          ease: 'power2.inOut'
        });

        gsap.to($arrow, {
          rotate: 0,
          duration: 0.3,
          ease: 'power2.inOut'
        });

        $wrap.removeClass('is-open');
      } else {
        // OPEN
        gsap.to($content, {
          height: 'auto',
          duration: 0.5,
          ease: 'power2.inOut'
        });

        gsap.to($arrow, {
          rotate: 180,
          duration: 0.3,
          ease: 'power2.inOut'
        });

        $wrap.addClass('is-open');
      }
    });
  });
}


$(document).on('popup-ready', attachPopupEvents)