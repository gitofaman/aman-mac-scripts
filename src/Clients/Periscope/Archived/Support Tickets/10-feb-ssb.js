$(document).ready(function () {
    var disabledDates = [{
            from: "December 22, 2022",
            to: "January 2, 2023"
        },
        {
            from: "April 16, 2022",
            to: "April 18, 2022"
        },
        "January 26, 2023", "March 13, 2023", "April 07, 2023", "April 08, 2023", "April 10, 2023", "April 25, 2023", "June 12, 2023",
        "October 2, 2023", "December 24, 2023", "December 25, 2023", "December 26, 2023", "December 31, 2023"
    ]
    // Set parent code
    var parentCode = "{{wf {&quot;path&quot;:&quot;slug&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}";

    // Hide Addons and adress fields
    $("#addons").hide();
    $('#adress-fields-div').hide();
    $("#popup").hide();

    //populate suburb field
    $("#postal-and-suburb").val("{{wf {&quot;path&quot;:&quot;suburb-name&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }} {{wf {&quot;path&quot;:&quot;postcode&quot;,&quot;type&quot;:&quot;Number&quot;\} }}");
    $("#postal-and-suburb").prop("disabled", true);
    // Populate Waste Type options
    $("#waste-types .waste-type").each(function () {
        var name = $(this).find(".waste-type-name").text();
        $("#waste-type-select").append('<option value="' + name + '">' + name + '</option>');
    });

    // Populate Bin Size options on Waste Type select change
    $("#waste-type-select").on('change', function () {
        $("#addons select").prop('selectedIndex', 0);
        initDynamicPrice();
        var chosenWasteType = $(this).val();
        $("#bin-size-select option:not(:first-child)").remove();
        $("#waste-types .waste-type").each(function () {
            var name = $(this).find(".waste-type-name").text();
            var addons = $(this).find(".waste-type-addons:not(.w-condition-invisible)").text();
            if ((chosenWasteType == name) && (addons == 'Yes')) {
                $("#addons").show();
            } else if ((chosenWasteType == name) && (addons == 'No')) {
                $("#addons").hide();
            }

            if (chosenWasteType == "Mixed Waste") {
                $("#popup").show();
                $("#bin-size").hide();
                $(".hidden").hide();
            } else {
                $("#popup").hide();
                $("#bin-size").show();
                $(".hidden").show();
            }
        });


        $("#bins .bin").each(function (index) {
            var size = $(this).find(".bin-size").text();
            var type = $(this).find(".bin-type").text();
            var price = $(this).find(".bin-price").text();
            var binSizeList = $("#waste-types .bin-size-list");
            var binSizeName = binSizeList[index];
            var binSizeAvailability = binSizeList[index];
            console.log(size);
            console.log("name", binSizeName);
            console.log("availability", binSizeAvailability);
            if ((chosenWasteType == type) && (price != '')) {
                $("#bin-size-select").append('<option value="' + size + '{p:' + price + '}">' + size + '</option>');
            }
        });
    });

    $('.counter-button.up').click(function () {
        var $input = $(this).parents('.counter-block').find('.item-qty');
        var val = parseInt($input.val(), 10);
        $input.val(val + 1);
        initDynamicPrice();
    });

    $('.counter-button.down').click(function () {
        var $input = $(this).parents('.counter-block').find('.item-qty');
        var val = parseInt($input.val(), 10);
        $input.val(Math.max(val - 1, 0));
        initDynamicPrice();
    })
    // Bin Size functionality
    $("#bin-size-select").on('change', function () {
        initDynamicPrice();
    });

    //dates
    var ausDate = new Date().toLocaleString("en-US", {
        timeZone: "Australia/Adelaide"
    });
    var holydays = [];
    var today = new Date(ausDate);
    var isSaturday = (today.getDay() === 6);
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var passed = 10 * 60;
    var time = today.getHours() * 60 + today.getMinutes();
    var minDate = "today";
    var deliveryDate = null;

    function disableDate(date) {
        var currentMonthDay = date.getDate();
        if (isSaturday && date.getDate() === today.getDate()) {
            return (date.getDay() === 0 || date.getDay() === 6 || (holydays.indexOf(currentMonthDay) !== -1 && date.getMonth() === 9));
        } else {
            return (date.getDay() === 0 || (holydays.indexOf(currentMonthDay) !== -1 && date.getMonth() === 9));
        }
    }
    if (time > passed) {
        minDate = tomorrow;
    }
    $("#Delivery_Date").flatpickr({
        altInput: true,
        altFormat: 'F j, Y',
        allowInput: true,
        onOpen: function (selectedDates, dateStr, instance) {
            $(instance.altInput).prop('readonly', true);
        },
        onClose: function (selectedDates, dateStr, instance) {
            $(instance.altInput).prop('readonly', false);
            $(instance.altInput).blur();
        },
        dateFormat: "F j, Y",
        minDate: minDate,

        locale: {
            "firstDayOfWeek": 1
        },
        disable: [
            function (date) {
                var thursTueActivePlaces = []
                if (thursTueActivePlaces.includes('{{wf {&quot;path&quot;:&quot;suburb-name&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}')) {
                    document.getElementById('noteTueThurs').style.display = 'block';
                    return (disableDate(date) || date.getDay() === 0 || date.getDay() === 1 || date.getDay() === 3 || date.getDay() === 5 || date.getDay() === 6)
                } else {
                    return disableDate(date);
                }
            }, ...disabledDates
        ],
        onChange: function (selectedDates, dateStr, instance) {
            deliveryDate = new Date(dateStr);
            deliveryDate.setDate(deliveryDate.getDate() + 1);
            $("#Pickup_Date").flatpickr({
                altInput: true,
                altFormat: 'F j, Y',
                allowInput: true,
                onOpen: function (selectedDates, dateStr, instance) {
                    $(instance.altInput).prop('readonly', true);
                },
                onClose: function (selectedDates, dateStr, instance) {
                    $(instance.altInput).prop('readonly', false);
                    $(instance.altInput).blur();
                    $('#adress-fields-div').show();
                },
                dateFormat: "F j, Y",
                minDate: deliveryDate || minDate,
                maxDate: new Date(deliveryDate).fp_incr(6),
                locale: {
                    "firstDayOfWeek": 1
                },
                disable: [
                    function (date) {
                        return disableDate(date)
                    }, ...disabledDates
                ],
            });
        },
    });
    $("#Pickup_Date").flatpickr({
        altInput: true,
        altFormat: 'F j, Y',
        allowInput: true,
        onOpen: function (selectedDates, dateStr, instance) {
            $(instance.altInput).prop('readonly', true);
        },
        onClose: function (selectedDates, dateStr, instance) {
            $(instance.altInput).prop('readonly', false);
            $(instance.altInput).blur();
            $('#adress-fields-div').show();
        },
        dateFormat: "F j, Y",
        minDate: deliveryDate || minDate,
        locale: {
            "firstDayOfWeek": 1
        },
        disable: [
            function (date) {
                return disableDate(date)
            }, ...disabledDates
        ],
    });
    // Set Quantity field default values
    $('input[name="quantity"]').val("0").attr("min", "0");

    // Assign addons product number
    $("#addons .w-dyn-item").each(function (i) {
        $(this).find("input[name='name']").attr('name', i + 1 + ':name');
        $(this).find("input[name='price']").attr('name', i + 1 + ':price');
        $(this).find("input[name='quantity']").attr('name', i + 1 + ':quantity');
        $(this).find("input[name='parent_code']").attr('name', i + 1 + ':parent_code').val(parentCode);
    });

});