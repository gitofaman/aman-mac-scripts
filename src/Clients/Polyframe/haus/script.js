$(document).ready(function () {
    const observer = lozad('.lozad', {
      loaded: function (el) {
        const $el = $(el);
        const videoURL = $el.data('background-video');

        if (videoURL) {
          // Clear any background placeholder
          $el.css({
            'background': '',
            'background-color': 'transparent',
            'background-image': `url(${videoURL})`,
            'background-size': 'cover',
            'background-position': 'center',
            'background-repeat': 'no-repeat'
          });
        }

        // Lozad.js recommended video handling
        if ($el.is('video')) {
          const poster = $el.data('poster');
          if (poster) {
            $el.attr('poster', poster);
          }

          $el.find('source').each(function () {
            const $source = $(this);
            const dataSrc = $source.attr('data-src');
            if (dataSrc) {
              $source.attr('src', dataSrc);
            }
          });

          $el[0].load();
        }
      }
    });

    observer.observe();
  });