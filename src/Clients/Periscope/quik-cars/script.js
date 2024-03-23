$(document).ready(function() {
    var paragraphs = $('.w-richtext').find('p');
    var numParagraphs = paragraphs.length;
    var numCTAs = 3;
    var interval = Math.ceil(numParagraphs / (numCTAs + 1));

    for (var i = 0; i < numCTAs; i++) {
        var index = (i + 1) * interval - 1; // -1 because index starts from 0
        if (index < numParagraphs) {
            $(paragraphs[index]).after($('.blog-cta').eq(0).clone());
        } else {
            break; // Break loop if all CTAs are placed
        }
    }
});