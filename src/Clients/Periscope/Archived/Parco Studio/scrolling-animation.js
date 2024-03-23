if (window.innerWidth > 767) {
    var scrollingSections = Array.from(document.querySelectorAll('[scroll-animated]'))
    var imageBlocks = Array.from(document.querySelectorAll('.scrolling-img'))
    var currentActiveIndex = -1;
    
    var animateEl = (el, elJson, duration) => {
        var jsonToUse = {
            targets: el,
            duration: duration,
            easing: 'easeOutSine'
        }
        for (key in elJson) {
            jsonToUse[key] = elJson[key]
        }
        anime(jsonToUse)
    }
    
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
    
    var makeImageActive = (i) => {
        imageBlocks.forEach(imageBlock=> {
            if(imageBlock !== imageBlocks[i]) {
                animateEl(imageBlock, {opacity: 0}, 100)
            }
        })
        animateEl(imageBlocks[i], {opacity: 1}, 200)
    }
    
    var makeSectionActive = (scrollSectionIndex) => {
        makeImageActive(scrollSectionIndex)
    }
    
    var scrollSectionReset = () => {
        var sectionToMakeActive;
        var maximumCoverage = 0
        scrollingSections.forEach(scrollSection=>{
            var scrollSectionIndex = scrollingSections.indexOf(scrollSection)
            var currentSectionCoverage = viewportContentPercentage(scrollSection)
            if(currentSectionCoverage>maximumCoverage) {
                sectionToMakeActive = scrollSectionIndex
                maximumCoverage = currentSectionCoverage;
            }
        })
        if(currentActiveIndex !== sectionToMakeActive) {
            makeSectionActive(sectionToMakeActive)
        }
    }
    
    window.addEventListener('scroll', scrollSectionReset)
    scrollSectionReset()
}