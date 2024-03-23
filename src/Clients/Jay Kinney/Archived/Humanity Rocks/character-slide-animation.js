var characterSlides = document.querySelectorAll('.characters-slide')
var aTime = 500
characterSlides.forEach(characterSlide=>{
    var playBtn, bVideo;
    playBtn = characterSlide.querySelector('.button-custom-1')
    bVideo = characterSlide.querySelector('.bg-videos')

    var isTransforming = false;
    var tTimeout;
    var videoShown = false;

    var transformingTimeout = () => {
        clearTimeout(tTimeout)
        tTimeout = setTimeout(()=>{
            isTransforming = false
            if(videoShown) {
                playBtn.classList.add('is--active')
            } else {
                playBtn.classList.remove('is--active')
            }
        }, aTime)
    }
    var showBvideo = () => {
        isTransforming = true;
        videoShown = true;
        bVideo.style.display = 'block';
        bVideo.style.opacity = '0'
        anime({
            targets: bVideo,
            opacity: 1,
            duration: aTime,
            easing: 'easeOutQuad'
        })
        transformingTimeout()
    }
    var hideBvideo = () => {
        isTransforming = true
        videoShown = false;
        anime({
            targets: bVideo,
            opacity: 0,
            duration: aTime,
            easing: 'easeOutQuad'
        })
        setTimeout(()=>{
            bVideo.style.display = 'block';
        }, aTime)
        transformingTimeout()
    }

    playBtn.addEventListener('click', ()=>{
        if(!isTransforming) {
            if(!videoShown) {
                showBvideo()
            } else {
                hideBvideo()
            }
        } 
    })
})