
// Function to render members
function prepareForm(members) {
    var container = $('[members-container]');
    container.empty(); // Clear existing content

    // Create download button
    var downloadButton = $('<button class="button">Download CSV</button>');
    container.append(downloadButton);

    // Function to convert object to CSV format
    function convertToCSV(objArray) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';

        // Header row
        var headers = Object.keys(array[0]);
        str += headers.join(',') + '\r\n';

        // Data rows
        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '') line += ',';
                line += array[i][index];
            }
            str += line + '\r\n';
        }
        return str;
    }

    // Function to download CSV file
    function downloadCSV(data) {
        var csv = convertToCSV(data);
        var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, 'members.csv');
        } else {
            var link = document.createElement('a');
            if (link.download !== undefined) {
                var url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', 'members.csv');
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    // Event listener for download button click
    downloadButton.on('click', function () {
        downloadCSV(members.map(member => ({
            'Name': member.customFields['name'] || `${member.customFields['first-name'] || ''} ${member.customFields['last-name'] || ''}`,
            'Email': member.auth.email,
            'Creation Date': member.createdAt,
            'Last Login Date': member.lastLogin,
            'Winner': member.customFields['winner'] || 'Not provided',
            'Over 18': member.customFields['over-18'] || 'Not provided',
            'Member Number': member.customFields['member-no'] || 'Not provided',
            'Favorite Team': member.customFields['favourite-team'] || 'Not provided',
            'Favorite Sport': member.customFields['favourite-sport'] || 'Not provided',
            'Plan Name': member.planConnections.length > 0 ? member.planConnections[0].planName : 'Not subscribed',
            'Plan Status': member.planConnections.length > 0 ? member.planConnections[0].status : 'Not subscribed',
            'Payment Amount': member.planConnections.length > 0 ? member.planConnections[0].payment.amount : 'Not subscribed',
            'Winner For' : $('[data-block-id="giveaway"]').text()
        })));
    });

}

var mainData = []
$(document).ready(function() {
    $('[lblock]').val('9999999')
    var mainUrl = "https://us-central1-time-4-winners.cloudfunctions.net/api";

    // Function to repeat and shuffle winners
    function reArrangeWinners(winners) {
        // Sort the winners array based on the prize number
        return winners.sort((a, b) => {
            // Compare the prize numbers
            return a.customFields.winner - b.customFields.winner;
        });
    }

    var getData = (mData) => {
        var data = mData;
        var memberNo, mName, mPlan, mEntries, mEmail;
        memberNo = data.customFields["member-no"];
        mName = data.customFields["name"] || data.customFields["first-name"];
        mPlan = 'NO PLAN';
        if (data.planConnections.length) {
            mPlan = data.planConnections[0].planName;
        }
        mEntries = 1;
        if (mPlan === 'Hall of Fame') {
            mEntries = 10;
        } else if (mPlan === 'Veteran') {
            mEntries = 4;
        }
        mEmail = data.auth.email;
        mPrizeNo = data.customFields.winner
        return { memberNo, mName, mPlan, mEntries, mPrizeNo};
    };

    var displayWinners = (winners, wasAlloted) => {
        winners = reArrangeWinners(winners)
        doCountdownAnimation(() => {
            var finalMessage = `No Winners yet.`;
            if (wasAlloted) {
                finalMessage = `Not enough plan members to allot winners.`;
                $('.success-message-2').hide();
            }
            $('#response').html('');
            prepareForm(winners);
            winners.forEach(function(winner) {
                var winnerData = getData(winner);
                $('#response').append(
                    `<div class="c-item">` +
                        '<div class="grid-3col">' +
                            '<div>' + winnerData.mPrizeNo + '</div>' +
                            '<div>' + winnerData.mName + '</div>' +
                            '<div>' + winnerData.mPlan + '</div>' +
                            '<div>' + winnerData.memberNo + '</div>' +
                        '</div>' +
                    '</div>'
                );
            });
            if (winners.length <= 0) {
                $('#response').append(`<div class="c-item">${finalMessage}</div>`);
            }
            console.log('Winners:', winners);
            $('.success-message-2').remove();
            $('.allot-winners-form').hide();
        });
    };

    var fetchWinners = (n, l) => {
        var alloted = false;
        var dataJson = {};

        if (!!n) { // n is available, then allot winners
            var ajaxJson = {
                url: `${mainUrl}/`,
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    // const shuffledWinners = shuffleWinners(data);
                    displayWinners(data, alloted);
                },
                error: function (jqXHR) {
                    var errorMsg = jqXHR.responseJSON ? jqXHR.responseJSON.error : 'An error occurred while fetching winners.';
                    $('#response').text(`Error: ${errorMsg}`);
                    $('.success-message-2').remove();
                }
            };
            alloted = true;
            dataJson.n = n;
            console.log("Q IS AVAILABLE");
        } else { // n is not available then show winners
            var ajaxJson = {
                url: `${mainUrl}/winners`,
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    // const shuffledWinners = shuffleWinners(data);
                    displayWinners(data, alloted);
                },
                error: function (jqXHR) {
                    var errorMsg = jqXHR.responseJSON ? jqXHR.responseJSON.error : 'An error occurred while fetching winners.';
                    $('#response').text(`Error: ${errorMsg}`);
                    $('.success-message-2').remove();
                }
            };
            console.log("Q IS NOT AVAILABLE");
        }

        dataJson["l"] = l;
        ajaxJson.data = dataJson;
        console.log(ajaxJson)
        $.ajax(ajaxJson);
    };

    // Form submission for fetching a specific number of winners
    $('#winnersForm').on('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        var n = $('[qblock]').val();
        var l = $('[lblock]').val();
        fetchWinners(n, l);
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
                $('[totalCount]').text(data.totalCount).attr('totalCount', data.totalCount);
            },
            error: function(jqXHR) {
                var errorMsg = jqXHR.responseJSON ? jqXHR.responseJSON.error : 'An error occurred while fetching winners.';
                console.log('fetch total : ' + errorMsg);
            }
        });
    };
    fetchTotalCount();
    
    const totalCountSpan = $('#totalCount');
    const totalCount = parseInt(totalCountSpan.attr('totalCount'), 10);
    const numberInput = $('[qblock]');

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


