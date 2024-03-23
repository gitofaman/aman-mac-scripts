var swiperSlides = document.querySelectorAll('.swiper-slide.is--popup-1')
var formMover = document.querySelector('.popup-1-form-mover')
var activeSwipeSlide = document.querySelector('.active-swipe-slide')
var backBtnMain = document.querySelector('.back-btn-main')
var popupForm = document.querySelector('.popup-1-form')
var popupSlide = document.querySelector('.popup-1-slides')

var setFormHeight = (heightVal) => {
    anime({
        targets: formMover,
        duration: 200,
        height: heightVal,
        easing: `easeOutSine`
    })
}

var selectForm = (givenData) => {
    formMover.classList.add('is--selected')
    activeSwipeSlide.querySelector('img').setAttribute('src', givenData['imageSrc'])
    activeSwipeSlide.querySelector('.heading-20px').innerText = givenData['heading']
    activeSwipeSlide.querySelector('.swiper-dimension').innerText = givenData['dimension']
    setFormHeight(popupForm.offsetHeight)
    //One new thing
    updateRedirectUrl(null, givenData['dimension'])
}

var deselectForm = () => {
    formMover.classList.remove('is--selected')
    setFormHeight(popupSlide.offsetHeight)
}

swiperSlides.forEach(swiperSlide=>{
    var swiperSlideBtn = swiperSlide.querySelector('.button.is--popup-btn-1')
    var data = {
        'imageSrc' : swiperSlide.querySelector('img').getAttribute('src'),
        'heading' : swiperSlide.querySelector('.heading-20px').innerText,
        'dimension' : swiperSlide.querySelector('.swiper-dimension').innerText
    }
    swiperSlideBtn.addEventListener('click', ()=>{
        selectForm(data)
    })
})
deselectForm()
backBtnMain.addEventListener('click', deselectForm)