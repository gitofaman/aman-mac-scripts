$(document).ready(function() {
    var mainUrl = "https://us-central1-time-4-winners.cloudfunctions.net/api"
    var getData = (mData) => {
        var data = mData;
        var memberNo, mName, mId, mEntries;
        memberNo = data.customFields["member-no"];
        mName = data.customFields["name"] || data.customFields["first-name"];
        mPlan = 'Rookie'
        if(data.planConnections.length) {
            mPlan = data.planConnections[0].planName;
        }
        mEntries = 1
        if(mPlan === 'Hall of Fame') {
            mEntries = 10
        } else if (mPlan === 'Veteran') {
            mEntries = 5
        }
        mEmail = data.auth.email;
        return {memberNo, mName, mPlan, mEntries};
    }

    var displayWinners = (winners) => {
        $('#response').html('');
        winners.forEach(function(winner) {
            var winnerData = getData(winner);
            $('#response').append(
                '<div class="c-item">' +
                    '<div class="grid-4col">' +
                        '<div>' + winnerData.memberNo + '</div>' +
                        '<div>' + winnerData.mName + '</div>' +
                        '<div>' + winnerData.mPlan + '</div>' +
                        '<div>' + winnerData.mEntries + '</div>' +
                    '</div>' +
                '</div>'
            );
        });
        console.log('Winners:', winners);
    };

    var fetchWinners = (q) => {
        $.ajax({
            url: `${mainUrl}/winners`,
            type: 'GET',
            data: q ? { q: q } : {},
            dataType: 'json',
            success: function(data) {
                displayWinners(data);
            },
            error: function(jqXHR) {
                var errorMsg = jqXHR.responseJSON ? jqXHR.responseJSON.error : 'An error occurred while fetching winners.';
                $('#response').text(`Error: ${errorMsg}`);
            }
        });
    };

    // Form submission for fetching a specific number of winners
    $('#winnersForm').on('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        var q = $('#q').val();
        fetchWinners(q);
    });

    // Button click for fetching winners without providing a q value
    $('#winners-button').on('click', function() {
        fetchWinners();
    });

    var fetchTotalCount = () => {
        $.ajax({
            url: `${mainUrl}`,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                $('[totalCount]').text(data.totalCount).attr('totalCount', data.totalCount)
            },
            error: function(jqXHR) {
                var errorMsg = jqXHR.responseJSON ? jqXHR.responseJSON.error : 'An error occurred while fetching winners.';
                // $('#response').text(`Error: ${errorMsg}`);
                console.log('fethc total : ' + errorMsg)
            }
        });
    }
    fetchTotalCount()
});
$(document).ready(function() {
    const totalCountSpan = $('#totalCount');
    const totalCount = parseInt(totalCountSpan.attr('totalCount'), 10);
    const numberInput = $('#q');

    numberInput.attr('max', totalCount);

    numberInput.on('input', function() {
        const value = parseInt($(this).val(), 10);

        // If the value is not a number or is less than 0, reset the input
        if (isNaN(value) || value < 0) {
            $(this).val('');
        } 
        // If the value exceeds totalCount, set the value to totalCount
        else if (value > totalCount) {
            $(this).val(totalCount);
        }
    });

    numberInput.on('keypress', function(event) {
        // Ensure only numbers are entered
        if (event.which < 48 || event.which > 57) {
            event.preventDefault();
        }
    });
});