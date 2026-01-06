$(document).ready(function () {

  /* ================================
     DUPLICATE FORM PART
     ================================ */

  $(document).on('click', '[duplicate-form-part]', function () {
    const formPartId = $(this).attr('duplicate-form-part');
    const $allParts = $(`[form-part="${formPartId}"]`);
    const $lastPart = $allParts.last();

    // Determine next suffix safely
    const nextIndex = getNextSuffixIndex($allParts);

    // Clone
    const $clone = $lastPart.clone(true, true);

    // Update inputs inside clone
    $clone.find('input, textarea, select').each(function () {
      const $field = $(this);

      // Handle name
      if ($field.attr('name')) {
        const baseName = stripSuffix($field.attr('name'));
        $field.attr('name', `${baseName}-${nextIndex}`);
      }

      // Handle id
      if ($field.attr('id')) {
        const baseId = stripSuffix($field.attr('id'));
        $field.attr('id', `${baseId}-${nextIndex}`);
      }

      // Clear value
      if ($field.is(':checkbox, :radio')) {
        $field.prop('checked', false);
      } else {
        $field.val('');
      }
    });

        // Insert clone
        // Insert clone
    $clone.insertAfter($lastPart);

    // Re-init flatpickr ONLY inside the clone
    initFlatpickr($clone);
  });

  /* ================================
     DELETE FORM PART
     ================================ */

  $(document).on('click', '.form-part-delete', function () {
    const $formPart = $(this).closest('[form-part]');
    $formPart.remove();
  });

  /* ================================
     HELPERS
     ================================ */

  function getNextSuffixIndex($parts) {
    let maxIndex = 0;

    $parts.each(function () {
      $(this).find('input, textarea, select').each(function () {
        const name = $(this).attr('name');
        if (!name) return;

        const match = name.match(/-(\d+)$/);
        if (match) {
          maxIndex = Math.max(maxIndex, parseInt(match[1], 10));
        }
      });
    });

    return maxIndex + 1;
  }

  function stripSuffix(value) {
    return value.replace(/-\d+$/, '');
  }

});