function updateShareURL(url, title, blockForShareLinks) {
    if(url.indexOf('/')===0) {
        url = window.location.origin + url
    }
    var facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
    var twitterShareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`
    var redditShareUrl = `http://reddit.com/submit?url=${url}&title=${title}`
    var linkedinUrl = `http://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`
    var onClickPinterest = `javascript:void( (function() {var e=document.createElement('script' );e.setAttribute('type','text/javascript' );e.setAttribute('charset','UTF-8' );e.setAttribute('src','//assets.pinterest.com/js/pinmarklet.js?r='+Math.random()*99999999);document.body.appendChild(e)})());`
    var mwUrl = `https://mewe.com/share?link=${url}`
    var mixUrl = `https://mix.com/mixit?url=${url}`
    var whatsappUrl = `https://api.whatsapp.com/send?text=${title}%20%20${url}`
    var mailUrl = `mailto:?subject=I wanted you to see this site&body=Check out this site ${url}`
    blockForShareLinks.querySelectorAll('[aria-facebook]').forEach(element=>{
        element.setAttribute('href', facebookShareUrl)
    })
    blockForShareLinks.querySelectorAll('[aria-twitter]').forEach(element=>{
        element.setAttribute('href', twitterShareUrl)
    })
    blockForShareLinks.querySelectorAll('[aria-reddit]').forEach(element=>{
        element.setAttribute('href', redditShareUrl)
    })
    blockForShareLinks.querySelectorAll('[aria-linkedin]').forEach(element=>{
        element.setAttribute('href', linkedinUrl)
    })
    blockForShareLinks.querySelectorAll('[aria-mw]').forEach(element=>{
        element.setAttribute('href', mwUrl)
    })
    blockForShareLinks.querySelectorAll('[aria-mix]').forEach(element=>{
        element.setAttribute('href', mixUrl)
    })
    blockForShareLinks.querySelectorAll('[aria-pinterest]').forEach(element=>{
        element.setAttribute('onclick', onClickPinterest)
    })
    blockForShareLinks.querySelectorAll('[aria-whatsapp]').forEach(element=>{
        element.setAttribute('href', whatsappUrl)
    })
    blockForShareLinks.querySelectorAll('[aria-mail]').forEach(element=>{
        element.setAttribute('href', mailUrl)
    })
    
}

document.querySelectorAll('[aria-share]').forEach(shareDiv=>{
    var podcastDataDiv = shareDiv.querySelector('[podcast-link]')
    var podcastLink = podcastDataDiv.getAttribute('href')
    var podcastName = podcastDataDiv.innerText
    updateShareURL(podcastLink, podcastName, shareDiv)
})