var stickySection, relParentSection;
stickySection = document.querySelector('.sticky')
relParentSection = document.querySelector('._300vh')

// stickySection.setAttribute('percent-moved', '0')

var scrollAnimateEl = (percent) => {
    var maxTranslatePos;
    var totalWidth = stickySection.offsetWidth;
    var showingWidth = window.innerWidth;
    maxTranslatePos = totalWidth - showingWidth;
    // var changeInPercent = percent - parseInt(stickySection.getAttribute('percent-moved'))
    anime({
        targets: stickySection,
        easing: `easeOutSine`,
        translateX: - Math.round(maxTranslatePos*percent/100)
    })
    // stickySection.setAttribute('percent-moved', percent)
}

window.addEventListener('scroll', ()=>{
    var percentageScrolled = 0;
    var currentPageYOffset = window.pageYOffset
    var startPageYOffset = relParentSection.getBoundingClientRect().top + currentPageYOffset;
    var endPageYOffset = startPageYOffset + relParentSection.offsetHeight - window.innerHeight;
    relParentSection.style.height = stickySection.offsetWidth + 'px';
    if(currentPageYOffset>=startPageYOffset && currentPageYOffset<=endPageYOffset) {
        var pixelsScrolled = currentPageYOffset - startPageYOffset;
        percentageScrolled = Math.round(pixelsScrolled*100/(endPageYOffset - startPageYOffset))
    }
    scrollAnimateEl(percentageScrolled)
    console.log(percentageScrolled)
})