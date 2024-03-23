var url = window.location.href
var title = document.title
var facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
  var twitterShareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`
  var redditShareUrl = `http://reddit.com/submit?url=${url}&title=${title}`
  var linkedinUrl = `http://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`
  var onClickPinterest = `javascript:void( (function() {var e=document.createElement('script' );e.setAttribute('type','text/javascript' );e.setAttribute('charset','UTF-8' );e.setAttribute('src','//assets.pinterest.com/js/pinmarklet.js?r='+Math.random()*99999999);document.body.appendChild(e)})());`
  var mwUrl = `https://mewe.com/share?link=${url}`
  var mixUrl = `https://mix.com/mixit?url=${url}`
  var whatsappUrl = `https://api.whatsapp.com/send?text=${title}%20%20${url}`
  var mailUrl = `mailto:?subject=I wanted you to see this site&body=Check out this site ${url}`
  document.querySelectorAll('[aria-facebook]').forEach(element=>{
      element.setAttribute('href', facebookShareUrl)
  })
  document.querySelectorAll('[aria-twitter]').forEach(element=>{
      element.setAttribute('href', twitterShareUrl)
  })
  document.querySelectorAll('[aria-reddit]').forEach(element=>{
      element.setAttribute('href', redditShareUrl)
  })
  document.querySelectorAll('[aria-linkedin]').forEach(element=>{
      element.setAttribute('href', linkedinUrl)
  })
  document.querySelectorAll('[aria-mw]').forEach(element=>{
      element.setAttribute('href', mwUrl)
  })
  document.querySelectorAll('[aria-mix]').forEach(element=>{
      element.setAttribute('href', mixUrl)
  })
  document.querySelectorAll('[aria-pinterest]').forEach(element=>{
      element.setAttribute('onclick', onClickPinterest)
  })
  document.querySelectorAll('[aria-whatsapp]').forEach(element=>{
      element.setAttribute('href', whatsappUrl)
  })
  document.querySelectorAll('[aria-mail]').forEach(element=>{
      element.setAttribute('href', mailUrl)
  })