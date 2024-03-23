var navbarTransparentTimeout, navbar;
navbar = document.querySelector('[navbar-el]')

window.addEventListener('scroll', ()=>{
    clearTimeout(navbarTransparentTimeout)
    if(!navbar.classList.contains('look-on-scroll')) {
        navbar.classList.add('look-on-scroll')
    }
    navbarTransparentTimeout = setTimeout(()=>{
        navbar.classList.remove('look-on-scroll')
    }, 100)
})