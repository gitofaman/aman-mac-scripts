$('document').ready(function () {
    gsap.registerPlugin(ScrollTrigger);
    var currentActiveIndex;

    var playAnimation = (i) => {
        if (currentActiveIndex !== i) {
            $('.main-sectionabout').each(function () {
                $(this).css({
                    opacity: 0
                })
            })

            var mainEl = $('.main-sectionabout').eq(i)
            var colOne = $('.main-sectionabout').eq(i).find('.aboutcelll')
            var colTwo = $('.main-sectionabout').eq(i).find('.aboutcellr')
            var heading = $('.main-sectionabout').eq(i).find('.about-heading').children().eq(1)
            var liner = $('.main-sectionabout').eq(i).find('.reveal-div')
            var sparkle = $('.main-sectionabout').eq(i).find('.about-heading').children().eq(0)
            var content = $('.main-sectionabout').eq(i).find('.about-text')
            var stars = $('.main-sectionabout').eq(i).find('.image-9')
            mainEl.css({
                opacity: 1
            })
            gsap.defaults({
                duration: 0.2
            })
            var aboutTl = gsap.timeline({
                scrollTrigger: {
                    trigger: mainEl,
                    start: 'top center'
                }
            })
            aboutTl.fromTo(colOne, {
                x: -100,
                opacity: 0
            }, {
                x: 0,
                opacity: 1
            }).fromTo(heading, {
                opacity: 0,
                duration: 0.2
            }, {
                opacity: 1
            }).fromTo(liner, {
                width: '0%'
            }, {
                width: '100%',
                duration: 0.2
            }).fromTo(sparkle, {
                scale: 0,
            }, {
                scale: 1,
                duration: 0.2
            }).fromTo(colTwo, {
                x: 100,
                opacity: 0
            }, {
                x: 0,
                opacity: 1
            }).fromTo(stars, {
                opacity: 0
            }, {
                opacity: 1
            }).fromTo(content, {
                opacity: 0
            }, {
                opacity: 1
            }, 0.5)
            currentActiveIndex = i
        }
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
    var scrollSectionReset = () => {
        var refSections = Array.from(document.querySelectorAll('.ref-sec'))
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
            playAnimation(sectionToMakeActive)
        }

    }

    window.addEventListener('scroll', scrollSectionReset)
    scrollSectionReset()
    playAnimation(0)
})