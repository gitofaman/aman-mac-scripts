var textTypewrites = document.querySelectorAll('.seagreen-span')
textTypewrites.forEach(text=>{
    text.setAttribute('text-inside', text.innerText)
})

var typeWriteAnimation = (t) => {
    var textLength = 0
    t.style.width = t.offsetWidth + 'px'
    t.style.height = t.offsetHeight + 'px'
    t.style.display = 'inline-block'
    t.innerText = ' '
    var typeWriteInterval = setInterval(()=>{
        var actualText = t.getAttribute('text-inside')
        if(t.innerText !== actualText) {
            var currText = actualText.substring(0, textLength)
            t.innerText = currText
            textLength++;
        } else {
            clearInterval(typeWriteInterval)
        }
    }, 100)
}