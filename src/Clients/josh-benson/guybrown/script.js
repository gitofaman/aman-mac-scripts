// Update the settings with the serialized form data
if (("{{wf {&quot;path&quot;:&quot;partners-affiliate-link&quot;,&quot;type&quot;:&quot;Link&quot;\} }}").length <= 0) {
    // run default script
    var finalResponse;

    $(document).ready(function () {

        $('[field]').each(function () {
            $(this).attr('name', $(this).attr('field'))
            $(this).attr('data-name', $(this).attr('field'))
        })

        // Use the form ID to handle form submission
        $('[form-block]').submit(function (event) {
            // Prevent the default form submission
            event.preventDefault();

            // Serialize the form data
            var formData = $(this).serialize();

            formData += '&redirect_form=1&fast_track=1&form_name=ambitionLead';

            console.log(formData)

            // Update the settings with the serialized form data
            var settings = {
                "url": "https://buttonwood.ambitioncloud.com.au/api/inbound",
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/x-www-form-urlencoded", // Use appropriate content type
                    "x-tenant-key": "dabf41524ae53c8714628c32fe783f6aa6ea13d99d37ec1c5f1d4ae7ae18d3bc1b00ef0e5cd41d2ac69f005625c75cd5fd5e"
                },
                "data": formData,
                "redirect_form": '1'
            };

            // Make the AJAX request
            $.ajax(settings)
                .done(function (response) {
                    finalResponse = response
                    window.location.href = finalResponse.app.fast_track_link
                })
                .fail(function (xhr, status, error) {
                    console.log("Error:", error);
                });
        });
    });
    $("[field='partners-name']").val($("[partners-name]").text())
} else {
    // run specified script
    $(document).ready(function () {

        $('[field]').each(function () {
            $(this).attr('name', $(this).attr('field'));
            $(this).attr('data-name', $(this).attr('field'));
        });

        // Use the form ID to handle form submission
        $('[form-block]').submit(function (event) {
            // Prevent the default form submission
            event.preventDefault();

            // Serialize the form data
            var formData = $(this).serialize();

            formData += '&redirect_form=1&fast_track=1&form_name=ambitionLead';

            console.log(formData);

            // Construct the URL with form data as query parameters
            var redirectUrl = "https://buttonwood.ambitioncloud.com.au/s/8zbb8qn1wo?" + formData;

            // Redirect to the constructed URL
            window.location.href = redirectUrl;
        });

        $("[field='partners-name']").val($("[partners-name]").text());
    });

}