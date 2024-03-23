var ohSection = document.querySelector('.roadmap-parent')
var parentElHeight = ohSection.parentElement.parentElement.offsetHeight; //number
window.addEventListener('scroll', ()=>{
    var containerWidth = ohSection.closest('.container-large').offsetWidth
    var toTranslateXValue = ohSection.offsetWidth - containerWidth
    var newParentElementHeight = ohSection.offsetHeight + toTranslateXValue
    if(parentElHeight !== newParentElementHeight) {
        ohSection.parentElement.parentElement.style.height = newParentElementHeight + 'px';
    }
    //start pageYOffset will dictate the change in scrollposition
    var startPageYOffset = window.pageYOffset + ohSection.getBoundingClientRect().top + ohSection.offsetHeight - window.innerHeight;
    var toTranslateValue = window.pageYOffset - startPageYOffset;
    if(toTranslateValue > 0 && toTranslateValue <= toTranslateXValue) {
        ohSection.style.transform = `translateX(-${toTranslateValue}px)`
    }
})