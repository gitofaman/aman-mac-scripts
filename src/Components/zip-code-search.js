
// auto fetch place based on given zip code
$(document).ready(function () {
    let zipTimer; // Timer variable

    // Store default placeholders on page load
    let defaultPlaceholders = {
        city: $('#city').attr('placeholder'),
        state: $('#state').attr('placeholder'),
        country: $('#country').attr('placeholder')
    };

    $('#zip').on('input', function () {
        clearTimeout(zipTimer); // Clear previous timer

        zipTimer = setTimeout(function () {
            let zip = $('#zip').val().trim();

            if (zip.length > 0) {
                // Show "Loading..." in inputs
                $('#city, #state, #country').val('').attr('placeholder', 'Loading...');

                $.ajax({
                    url: `https://api.zippopotam.us/us/${zip}`, // Change 'us' for other countries
                    method: "GET",
                    success: function (data) {
                        let place = data.places[0];
                        $('#city').val(place['place name']).attr('placeholder', defaultPlaceholders.city);
                        $('#state').val(place['state']).attr('placeholder', defaultPlaceholders.state);
                        $('#country').val(data['country']).attr('placeholder', defaultPlaceholders.country);
                    },
                    error: function () {
                        // Set placeholder to "No results for given ZIP"
                        $('#city, #state, #country').val('').attr('placeholder', 'No results for given ZIP');
                    }
                });
            } else {
                // Reset placeholders to stored defaults
                $('#city, #state, #country').val('').each(function () {
                    $(this).attr('placeholder', defaultPlaceholders[$(this).attr('id')]);
                });
            }
        }, 1000); // Wait for 2 seconds
    });
});