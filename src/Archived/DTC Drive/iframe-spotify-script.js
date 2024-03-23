var richTextWithSpotifyEmbed = document.querySelector('[spotify-rich-text]')
richTextWithSpotifyEmbed.querySelectorAll('iframe').forEach(iframe=>{
    var iframeSrc = iframe.getAttribute('src')
    if(iframeSrc.indexOf('open.spotify.com') >= 0) {
        iframe.classList.add(richTextWithSpotifyEmbed.getAttribute('spotify-embed-class'))
    }
})