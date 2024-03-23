function contentScolledPercentage (div) {
    //the function is favourable for the divs which will be greater than the viewport height
    var topPos = div.getBoundingClientRect().y
    var maxScrollPos = - (div.offsetHeight - window.innerHeight)
    if(topPos > 0) {
        return 0;
    } else if (topPos < 0 && topPos>maxScrollPos) {
        var contentPercentage = Math.abs(topPos/maxScrollPos) * 100;
        return Math.round(contentPercentage);
    } else {
        return 100;
    }
}