var viewportContentPercentage = (el) => {
    var windowHeight = window.innerHeight;
    var elTopPos = el.getBoundingClientRect().top;
    var elHeight = el.offsetHeight;
    var elHeightInScreen = windowHeight - elTopPos;
    if(elTopPos <= 0 && elHeight >=  windowHeight - elTopPos) {
        elHeightInScreen = windowHeight;
    } else if (elTopPos<=0 && elHeight < windowHeight - elTopPos) {
        elHeightInScreen = elHeight + elTopPos;
    }
    var contentPercentage = Math.round(elHeightInScreen*100/windowHeight);
    if(contentPercentage>0) {
        return contentPercentage;
    } else {
        return 0;
    }
}