function assignEpisodeNumbers(givenNumber) {
    let totalEpisodes = givenNumber;

    $('.podcast-itm').each(function(index) {
        let episodeNumber = String(totalEpisodes - index).padStart(3, "0"); // Reverse order
        $(this).find("[episode-no-container]").text(`Episode #${episodeNumber}`);
    });

    console.log("Episode numbers assigned successfully.");
}

var checkCountitems = setInterval(function() {
    if (window.fsAttributes && window.fsAttributes.countitems) {
        clearInterval(checkCountitems);
        console.log('countitems is now available!');
        
        var totalPodcasts = parseInt($('[aria-total-blogs="true"]').text())
        assignEpisodeNumbers(totalPodcasts)
    }
}, 50); // check every 50 milliseconds