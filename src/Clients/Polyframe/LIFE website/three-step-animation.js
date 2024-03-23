var theCover = document.querySelector('[the-cover]');
var theLeaf = document.querySelector('[the-leaf]');
var coverBlocks = Array.from(theCover.querySelectorAll('.covered-animation'))
var leafBlocks = Array.from(theLeaf.querySelectorAll('.covered-animation'))
var clTimeline = gsap.timeline({ paused: true });
//this class is added just to prepare the animation structure
theLeaf.classList.add('main-cover-leaves')
theCover.classList.add('main-cover-leaves')


if (window.innerWidth > 767) {
    var coverBlocks = Array.from(theCover.querySelectorAll('.covered-animation'))
    var leafBlocks = Array.from(theLeaf.querySelectorAll('.covered-animation'))
    leafBlocks.forEach(leaf => {
        //this class is added just to prepare the animation structure
        leaf.classList.add('is--leave-block')
    })
    var theCover = document.querySelector('[the-cover]');
    var theLeaf = document.querySelector('[the-leaf]');
    gsap.defaults({
        ease: "power2.out",
        duration: 0.3
    });
    //this class is added just to prepare the animation structure
    theLeaf.classList.add('main-cover-leaves')
    var scrollingSections = Array.from(theCover.querySelectorAll('.covered-animation'))
    var imageBlocks = Array.from(theLeaf.querySelectorAll('.covered-animation'))
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
        if (elTopPos <= 0 && elHeight >= windowHeight - elTopPos) {
            elHeightInScreen = windowHeight;
        } else if (elTopPos <= 0 && elHeight < windowHeight - elTopPos) {
            elHeightInScreen = elHeight + elTopPos;
        }
        var contentPercentage = Math.round(elHeightInScreen * 100 / windowHeight);
        if (contentPercentage > 0) {
            return contentPercentage;
        } else {
            return 0;
        }
    }

    var makeImageActive = (i) => {
        imageBlocks.forEach(imageBlock => {
            if (imageBlock !== imageBlocks[i]) {
                animateEl(imageBlock, {
                    opacity: 0
                }, 100)
            }
        })
    
        // Kill any ongoing animations on the leaves and block-content elements
        gsap.killTweensOf(leaves); // Kills the animations on leaves
        gsap.killTweensOf(document.querySelectorAll('.block-content')); // Kills the animations on block-content elements
    
        animateEl(imageBlocks[i], {
            opacity: 1
        }, 200)
    
        clTimeline.clear(); // Clear the previous timeline
        clTimeline = gsap.timeline(); // Create a new timeline
    
        var leaves = Array.from(imageBlocks[i].querySelectorAll('[class*="lt-"]'));
    
        clTimeline
            .fromTo(leaves, {
                y: 20,
                opacity: 0,
                scale: 0.6
            }, {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                scale: 1
            }).to(
                document.querySelectorAll('.block-content'), {
                    opacity: 0,
                    duration: 0.2
                }, 0
            ).to(
                scrollingSections[i].querySelector('.block-content'), {
                    opacity: 1,
                    duration: 0.4
                }, 0.2
            )
        clTimeline.timeScale(1)
    }

    var makeSectionActive = (scrollSectionIndex) => {
        if(currentActiveIndex !== scrollSectionIndex) {
            currentActiveIndex = scrollSectionIndex;
            makeImageActive(scrollSectionIndex)
        } else {
            return;
        }
    }

    var scrollSectionReset = () => {
        var refSections = Array.from(document.querySelectorAll('.el-sc'))
        var sectionToMakeActive = 0;
        var maximumCoverage = 0
        refSections.forEach(scrollSection => {
            var scrollSectionIndex = refSections.indexOf(scrollSection)
            var currentSectionCoverage = viewportContentPercentage(scrollSection)
            if (currentSectionCoverage > maximumCoverage) {
                sectionToMakeActive = scrollSectionIndex
                maximumCoverage = currentSectionCoverage;
            }
        })
        if (currentActiveIndex !== sectionToMakeActive) {
            makeSectionActive(sectionToMakeActive)
        }

    }

    window.addEventListener('scroll', scrollSectionReset)
    scrollSectionReset()
}