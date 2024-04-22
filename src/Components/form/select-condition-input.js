$(document).ready(function() {
    // To dynamically show an option based on select
    var showAttr = 'show';
    var showIndex = `${showAttr}-index`;
    $(`[${showIndex}]`).each(function(){
        var nearestForm = $(this).closest('form');
        var selectField = $(this);
        var select = () => {
            var index = selectField.attr(showIndex); // Get the 'show-index' value
            var value = selectField.val().toLowerCase(); // Get the current value of the select and convert to lowercase
        
            // Hide all elements that start with 'show-' and have an index attribute
            nearestForm.find(`[${showAttr}-${index}]`).hide();
        
            // Show elements that match the selected value for this select
            nearestForm.find(`[${showAttr}-${index}]`).filter(function() {
                return $(this).attr(`${showAttr}-${index}`).toLowerCase().split(',').includes(value)
            }).show();
        }

        $(this).change(function(){
            select();
        });
        select();
    });

    // To dynamically hide an option based on select
    var hideAttr = 'hide';
    var hideIndex = `${hideAttr}-index`;
    $(`[${hideIndex}]`).each(function(){
        var nearestForm = $(this).closest('form');
        var selectField = $(this);
        var select = () => {
            var index = selectField.attr(hideIndex); // Get the 'hide-index' value
            var value = selectField.val().toLowerCase(); // Get the current value of the select and convert to lowercase
        
            // Show all elements that start with 'hide-' and have an index attribute
            nearestForm.find(`[${hideAttr}-${index}]`).show();
        
            // Hide elements that match the selected value for this select
            nearestForm.find(`[${hideAttr}-${index}]`).filter(function() {
                return $(this).attr(`${hideAttr}-${index}`).toLowerCase().split(',').includes(value)
            }).hide();
        }

        $(this).change(function(){
            select();
        });
        select();
    });
});
