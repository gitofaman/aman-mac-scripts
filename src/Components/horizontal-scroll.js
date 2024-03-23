var stickySection, relParentSection;

var scrollAnimateEl = (percent) => {
    var maxTranslatePos;
    var totalWidth = stickySection.offsetWidth;
    var showingWidth = stickySection.closest('.container-large').offsetWidth;
    maxTranslatePos = totalWidth - showingWidth;
    stickySection.style.transform = `translateX(-${Math.round(maxTranslatePos*percent/100)}px)`
}

window.addEventListener('scroll', ()=>{
    var percentageScrolled;
    var currentPageYOffset = window.pageYOffset
    var startPageYOffset = relParentSection.offsetHeight + currentPageYOffset + stickySection.offsetHeight;
    var endPageYOffset = startPageYOffset + relParentSection.offsetHeight - stickySection.offsetHeight;
    if(currentPageYOffset>=startPageYOffset && currentPageYOffset<=endPageYOffset) {
        var pixelsScrolled = currentPageYOffset - startPageYOffset;
        percentageScrolled = Math.round(pixelsScrolled*100/(endPageYOffset - startPageYOffset))
    }
    scrollAnimateEl(percentageScrolled)
})