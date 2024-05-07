function addStylesToHead(styles) {
    // Create a <style> element
    var styleElement = $('<style></style>');

    // Add CSS styles to the <style> element
    styleElement.text(styles);

    // Append the <style> element to the <head> section
    $('head').append(styleElement);
}
