$(document).ready(function () {
    // Loop through all paragraphs
    $('p').each(function () {
      // Check if the innerText contains '<divider>'
      if ($(this).text().includes('<divider>')) {
        // Replace the paragraph with a div having class 'divider' and 'has-paraller-margin'
        $(this).replaceWith('<div class="divider has-paraller-margin"></div>');
      }
    });
  });