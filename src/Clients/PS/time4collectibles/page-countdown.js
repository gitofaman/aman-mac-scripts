$(document).ready(function() {
    var mainUrl = "https://us-central1-time-4-winners.cloudfunctions.net/api"
    var getData = (mData) => {
        var data = mData;
        var memberNo, mName, mId, mEntries;
        memberNo = data.customFields["member-no"];
        mName = data.customFields["name"] || data.customFields["first-name"];
        mPlan = 'NO PLAN'
        if(data.planConnections.length) {
            mPlan = data.planConnections[0].planName;
        }
        mEntries = 1
        if(mPlan === 'Hall of Fame') {
            mEntries = 10
        } else if (mPlan === 'Veteran') {
            mEntries = 4
        }
        mEmail = data.auth.email;
        return {memberNo, mName, mPlan, mEntries};
    }

    var displayWinners = (winners, wasAlloted) => {
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
        if(winners.length <= 0) {
            $('#response').append(`<div class="c-item">${finalMessage}</div>`)
        }
        console.log('Winners:', winners);
        $('.success-message-2').remove();
    };

    var fetchWinners = () => {
        $.ajax({
            url: `${mainUrl}/winners`,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                displayWinners(data);
            },
            error: function (jqXHR) {
                var errorMsg = jqXHR.responseJSON ? jqXHR.responseJSON.error : 'An error occurred while fetching winners.';
                $('#response').text(`Error: ${errorMsg}`);
                // $('.success-message-2').remove();
            }
        });
    };

    // Button click for fetching winners
    $('#winners-button').on('click', function() {
        fetchWinners();
    });
    // fetchWinners()
});

// $('[ctext]')

var scaleCounter = (finalNum) => {
    gsap.fromTo('[ctext]', {
        scale: 1,
        opacity: 1
    }, {
        scale: 0,
        opacity: 0,
        delay: 0.5, // Adjust delay if needed
        duration: 0.5,
        onComplete: function() {
            $('[ctext]').text(finalNum);
            gsap.to('[ctext]', {
                scale: 1,
                opacity: 1,
                duration: 0.5
            });
        }
    });
};

var startNumber = 3;
var toRepeat = () => {
    gsap.to('.countdown', {
        opacity: 1,
        onStart: function() {
            $('.countdown').css('display', 'flex');
        }
    });
    scaleCounter(startNumber);
    startNumber--;
}
toRepeat()
var scaleTimer = setInterval(function() {
    if (startNumber >= 0) {
        toRepeat()
    } else {
        // hide counter
        $('[ctext]').fadeOut()
        $('.countdown-bg').click()
        console.log('COUNTDOWN CLICKED')
        setTimeout(function(){
            gsap.to('.countdown', {
                delay: 1,
                opacity: 0,
                duration: 0.5,
                onComplete: function() {
                    $('.countdown').css('display', 'none');
                    $('#winners-button').click()
                }
            });
        }, 1000)
        // stop interval
        clearInterval(scaleTimer);
        //show winners
    }
}, 1000);