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

$(document).ready(function() {
    $('[maid-central]').on('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        var baseUrl = 'https://peakcleaningco.maidcentral.net/external/estimate/index?scId=357&sstgId=998';
        var params = [];

        // Iterate over each form field and add its name and value to the params array
        $(this).find('[name]').each(function() {
            var name = $(this).attr('name');
            var value = $(this).val();
            if (name && value) {
                params.push(encodeURIComponent(name) + '=' + encodeURIComponent(value));
            }
        });

        // Construct the final URL
        var finalUrl = baseUrl + '&' + params.join('&');

        // Set a timeout to redirect to the constructed URL after 3 seconds
        setTimeout(function() {
            window.location.href = finalUrl;
        }, 3000);
    });
});

