var disableScroll = () => {
    document.body.style.overflow = 'hidden'
}
var enableScroll = () => {
    document.body.style.overflow = '';
}

document.querySelectorAll('[enable-scroll]').forEach(el=>{
    el.addEventListener('click', enableScroll)
})
document.querySelectorAll('[disable-scroll]').forEach(el=>{
    el.addEventListener('click', disableScroll)
})

document.querySelectorAll('.close-btn').forEach(closeBtn=>{
    closeBtn.addEventListener('click', enableScroll)
})