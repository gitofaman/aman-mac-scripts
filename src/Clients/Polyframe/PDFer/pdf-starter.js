$(document).ready(function () {

    $('.text-size-regular, h1, h2, h3, h4, h5, h6').attr("contenteditable", 'true')
    var contentEditableElements = document.querySelectorAll('[contenteditable][sc]');
  
    // Add an input event listener to each contenteditable element
    contentEditableElements.forEach(function(element) {
      element.addEventListener('keyup', function() {
        // Get the 'sc' attribute value of the changed element
        console.log('changed')
        var scValue = element.getAttribute('sc');

        // Get the new value of the changed element
        var newValue = element.textContent;

        // Update the values of all elements with the same 'sc' attribute
        contentEditableElements.forEach(function(e) {
          if (e !== element && e.getAttribute('sc') === scValue) {
            e.textContent = newValue;
          }
        });
      });
    });
});