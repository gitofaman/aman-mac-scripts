$(document).ready(function(){
    $('.block-image.is-rotation').each(function(){
        var currentNumber = 0;
        var duration = parseFloat($(this).attr('duration'))
        if(duration) {
            //go ahead
        } else {
            duration = 1
        }
        function giveNextNumber(maximum) {
            if (currentNumber >= maximum) {
                currentNumber = 0;
            } else {
                currentNumber++;
            }
            return currentNumber;
        }
        var blockImages = $(this).find('img')
        var resetOpacity = (i) => {
            blockImages.each(function(){
                var thisIndex = $(this).index()
                if (thisIndex != i){
                    gsap.to($(this), {
                        opacity: 0,
                        duration: 0
                    })
                }
            })
        }
        var showImage = (i) => {
            resetOpacity(i)
            gsap.to(blockImages.eq(i), {
                opacity: 1,
                duration: 0
            })
        }
        setInterval(()=>{
            showImage(giveNextNumber(blockImages.length - 1))
        }, duration*1000)
    })
})
