$(document).ready(function() {
    // Get the current page URL
    var url = window.location.href;

    // Check if the URL contains the "page=n" parameter
    var match = url.match(/page=(\d+)/);

    if (match) {
        // Get the current meta title
        var currentTitle = $('title').text();

        // Get the value of 'n' from the URL
        var pageNumber = match[1];

        // Update the meta title
        // $('title').text(currentTitle + ' ' + pageNumber);
        var finalTitle = $('title').text().replace(' ', ` ${pageNumber} `)
        $('title').text(finalTitle)
    }
});
