$(document).ready(function() {

    $('[select-index]').each(function(){
        var select = () => {
            var index = $(this).attr('select-index'); // Get the 'select-index' value
            var value = $(this).val().toLowerCase(); // Get the current value of the select and convert to lowercase
        
            // Hide all elements that start with 'select-' and have an index attribute
            $('[select-' + index + ']').hide();
        
            // Show elements that match the selected value for this select
            $('[select-' + index + ']').filter(function() {
                return $(this).attr('select-' + index).toLowerCase() === value;
            }).show();
        }

        $('[select-index]').change(function() { // Listen for changes on any select with 'select-index' attribute
            select()
        });
        select()
    })
  });
  