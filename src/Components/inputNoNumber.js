$(document).ready(function() {
    $('[data-name]').each(function() {
        // to ensure name of form fields are not having numbers at then end
        var originalName = $(this).attr('data-name');
        var newName = originalName.replace(/\s*\d+$/, ''); // Removes numbers at the end of the string
        $(this).attr('data-name', newName);
        var updatedName = newName.replace(' ', '-')
        $(this).attr('name', updatedName)
        $(this).attr('id', updatedName)
    });
});
