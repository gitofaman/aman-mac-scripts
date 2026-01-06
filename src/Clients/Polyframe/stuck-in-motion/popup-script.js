var workPopupFunction = (function () {
  let initialized = false;

  return function ($) {
    if (initialized) return;
    initialized = true;

    let currentRequest = null;

    const $popup = $('.work-popup');
    const $contentInner = $popup.find('.wp-content-inner');
    const $loader = $contentInner.find('.wp-content-load-element');

    function openPopup() {
      $('body').addClass('no-scroll');

      gsap.set($popup, { display: 'block' });
      gsap.fromTo(
        $popup,
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }

    function closePopup() {
      gsap.to($popup, {
        autoAlpha: 0,
        y: 30,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set($popup, { display: 'none' });
          clearPopupContent();
          $('body').removeClass('no-scroll');
        }
      });
    }

    function clearPopupContent() {
      if (currentRequest) {
        currentRequest.abort();
        currentRequest = null;
      }

      const $removed = $contentInner.find('.wp-work-whole');

      if ($removed.length) {
        $(document).trigger('popup-closed', {
          element: $removed[0]
        });
      }

      $removed.remove();

      if ($loader.length) {
        $loader.show();
      }
    }

    function loadWork(slug) {
      const url = `/works/${slug}`;

      clearPopupContent();

      currentRequest = $.ajax({
        url: url,
        method: 'GET',
        dataType: 'html'
      })
        .done(function (response) {
          const $html = $('<div>').append($.parseHTML(response));
          const $workBlock = $html.find('.wp-work-whole').first();

          if (!$workBlock.length) {
            console.warn('wp-work-whole not found for:', slug);
            return;
          }

          if ($loader.length) {
            $loader.hide();
          }

          $contentInner.append($workBlock);
          $(document).trigger('popup-ready', {
            slug: slug,
            element: $workBlock[0]
          });
        })
        .fail(function (err) {
          if (err.statusText !== 'abort') {
            console.error('Failed to load work:', slug);
          }
        });
    }

    $(document).on('click', '.created-item', function () {
      const slug = $(this).attr('data-item-link');
      if (!slug) return;

      openPopup();
      loadWork(slug);
    });

    $(document).on('click', '[close-popup]', function () {
      closePopup();
    });
  };
})();

function initWorkPopup() {
  workPopupFunction(jQuery);
}

if (window.createdGrid && window.createdGrid.isReady) {
  initWorkPopup();
} else {
  $(document).one('work-layout-ready', initWorkPopup);
}
