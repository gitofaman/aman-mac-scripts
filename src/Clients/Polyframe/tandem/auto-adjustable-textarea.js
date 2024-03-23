$(document).ready(function () {
    // Function to adjust textarea height based on content
    function adjustTextareaHeight() {
        var textarea = $('#autoExpandingTextarea');
        textarea.height(0); // Reset height to auto
        var newHeight = textarea.prop('scrollHeight') - 16 + 'px';
        textarea.height(newHeight);
    }

    // Bind the function to the textarea input event
    $('#autoExpandingTextarea').on('input', adjustTextareaHeight);

    // Initial adjustment when the page loads
    adjustTextareaHeight();
});
