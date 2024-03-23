$('document').ready(function(){
    var clientVimeos = [];

    $('[client-videos] h2').each(function() {
        var video = {
            'video-name': $(this).text(),
            'link': $(this).next('p').find('a').attr('href'), // Regular video link
            'bg-video-link': $(this).next('p').next('p').find('a').attr('href') // Background video link
        };
        clientVimeos.push(video);
    });
    
    console.log(clientVimeos);
    
    
    // to create the same number of lightbox as there are clientVimeo length
    var numDuplicates = clientVimeos.length;
    var parentContainer = $('[client-work]').parent();
    var originalClientWork = $('[client-work]');
    for (var i = 1; i < numDuplicates; i++) {
        var clonedClientWork = originalClientWork.clone();
        parentContainer.append(clonedClientWork);
    }
    
    // to update the background video
    $('[client-work]').each(function(){
        var i = $(this).index()
        $(this).find('video source').attr('src', clientVimeos[i]['bg-video-link'])
        $(this).find('h2').text(clientVimeos[i]['video-name'])
        var videoData = clientVimeos[i];
    
        // Update the JSON content with the video link from 'clientVimeos'
        var jsonContent = {
            "items": [
                {
                    "url": videoData.link,
                    "originalUrl": videoData.link,
                    "width": 1920,
                    "height": 1080,
                    "thumbnailUrl": "https://example.com/thumbnail.jpg", // You may update this with a valid thumbnail URL
                    "html": "<iframe class=\"embedly-embed\" src=\"//cdn.embedly.com/widgets/media.html?src=" + encodeURIComponent(videoData.link) + "&dntp=1&display_name=Vimeo&url=" + encodeURIComponent(videoData.link) + "&image=https://example.com/thumbnail.jpg&key=c4e54deccf4d4ec997a64902e9a30300&type=text%2Fhtml&schema=vimeo\" width=\"1920\" height=\"1080\" scrolling=\"no\" title=\"Vimeo embed\" frameborder=\"0\" allow=\"autoplay; fullscreen; encrypted-media; picture-in-picture;\" allowfullscreen=\"true\"></iframe>",
                    "type": "video"
                }
            ],
            "group": ""
        };
    
        // Update the JSON content inside the 'client-work' block
        $(this).find('.w-json').text(JSON.stringify(jsonContent));
        $(this).addClass('pointer-events-off')
    })
    
    $("[client-videos]").hide()
})