function fetchAndGetContent(link, selector) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: link,
            type: 'GET',
            success: function (response) {
                // Parse the response HTML
                var htmlContent = $('<div>').html(response);

                // Find the element with class 'section_product-header3'
                var section = htmlContent.find(selector);

                // Resolve the promise with the section or false if not found
                if (section.length > 0) {
                    resolve(section);
                } else {
                    console.log(`Element with selector ${selector} not found.`);
                    resolve(false);
                }
            },
            error: function (xhr, status, error) {
                console.log('Error fetching the content:', error);
                reject(error);
            }
        });
    });
}