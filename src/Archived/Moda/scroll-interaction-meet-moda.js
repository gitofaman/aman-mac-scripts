var interactiveSections = document.querySelectorAll('[content-color]')
var mainSection = document.querySelector('.section-color-changer_meet-moda')
var spanWhites = mainSection.querySelectorAll('.span-white');
var ccArrows = mainSection.querySelectorAll('.cc-arrow')
var texts = mainSection.querySelectorAll('h2, p')
var isBodyNotAnimated = true;
var easingType = 'easeOutSine'
var easingTime = 500;
var activeSection;
var colorBlack = 'rgb(18,18,18)'
var colorWhite = 'rgb(255,255,255)'

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

interactiveSections.forEach(iSection=> {
    var sectionBackgroundColor = window.getComputedStyle( iSection , null).getPropertyValue( 'background-color' );
    iSection.setAttribute('bgColor', sectionBackgroundColor);
    iSection.style.backgroundColor = 'transparent'
})

var seamLessTransition = (spanColor, textColor, arrowFilter, contentBackgroundColor) => {
    anime({
        targets: spanWhites,
        color: spanColor,
        duration: easingTime,
        easing: easingType
    })
    anime({
        targets: texts,
        color: textColor,
        duration: easingTime,
        easing: easingType
    })
    anime({
        targets: ccArrows,
        filter: arrowFilter,
        duration: easingTime,
        easing: easingType
    })
    anime({
        targets: document.body,
        backgroundColor: contentBackgroundColor,
        duration: easingTime,
        easing: easingType
    })
}

var makeSectionActive = (el) => {
    isBodyNotAnimated = true;
    activeSection = el;
    var spanColor, textColor;
    var contentColor = el.getAttribute('content-color')
    var contentBackgroundColor = el.getAttribute('bgColor')
    if(contentColor==='white') {
        arrowFilter = 'invert(100%)'
        spanColor = contentBackgroundColor
        textColor = 'rgb(255,255,255)'
    } else {
        arrowFilter = 'invert(0%)'
        spanColor = contentColor;
        textColor = contentColor
    }
    seamLessTransition(spanColor, textColor, arrowFilter, contentBackgroundColor)
}

window.addEventListener('scroll', ()=> {
    if(viewportContentPercentage(mainSection) > 40) {
        var sectionWithMaxCoverage = activeSection;
        var maxCoverage = 0;
        interactiveSections.forEach(iSection => {
            var coverage = viewportContentPercentage(iSection)
            if(coverage > 0 && coverage>=maxCoverage) {
                maxCoverage = coverage
                sectionWithMaxCoverage = iSection
            }
        })
        if(sectionWithMaxCoverage!==activeSection) {
            makeSectionActive(sectionWithMaxCoverage)
        }
    } else {
        if(isBodyNotAnimated) {
            seamLessTransition(colorBlack, colorBlack, 'invert(0%)', colorWhite)
            isBodyNotAnimated = false;
            activeSection = ''
        }
    }
})