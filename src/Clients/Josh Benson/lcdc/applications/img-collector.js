var hImgs = []
$('img').each(function(){
    hImgs.push({
        img: $(this).attr('src'),
        name: hImgs.length
    })
})