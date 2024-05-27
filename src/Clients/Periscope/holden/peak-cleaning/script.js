$(document).ready(function() {
    $('.incrementer-field input[type="number"]').prop('disabled', true);

    $('.is-up').on('click', function() {
        var inputField = $(this).closest('.incrementer-field').find('input[type="number"]');
        var currentValue = parseInt(inputField.val()) || 0;
        var newValue = currentValue + 1;
        inputField.val(newValue);
        $('.is-down').removeClass('disabled-btn');
    });

    $('.is-down').on('click', function() {
        var inputField = $(this).closest('.incrementer-field').find('input[type="number"]');
        var currentValue = parseInt(inputField.val()) || 0;
        if (currentValue > 0) {
            var newValue = currentValue - 1;
            inputField.val(newValue);
        } else {
            $(this).addClass('disabled-btn');
        }
    });
});
