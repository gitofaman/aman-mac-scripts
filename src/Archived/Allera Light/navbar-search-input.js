var searchNavbar = document.querySelector('[aria-search]')
var closeNavbarSearch = () => {
    searchNavbar.querySelector('.is--hidden').click()
}
window.addEventListener('click', (e)=> {
    if (document.querySelector('[navbar-el]').contains(e.target)){
        // Clicked in box
    } else{
        // Clicked outside the box
        closeNavbarSearch()
    }
}
)