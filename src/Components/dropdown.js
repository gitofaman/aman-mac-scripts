var dropdowns = document.querySelectorAll('[aria-dropdown]');
//add classes to define what will happen on click

dropdowns.forEach(dropdown=>{

    var dropdownToggle, dropdownContent, dropdownContentHeight;

    dropdownToggle = dropdown.querySelector('[aria-dropdown-toggle]')
    dropdownContent = dropdown.querySelector('[aria-dropdown-content]')
    dropdownContentHeight = dropdownContent.offsetHeight;

    var dropdownOpen = true;

    var openDropdown = (duration) =>{
        anime({
            targets: dropdownContent,
            height: dropdownContentHeight,
            opacity: 1,
            duration: duration,
            easing: 'easeOutSine'
        })
        dropdownOpen = true
    }

    var closeDropdown = (duration) => {
        anime({
            targets: dropdownContent,
            height: 0,
            opacity: 0,
            duration: duration,
            easing: 'easeOutSine'
        })
        dropdownOpen = false
    }

    closeDropdown(0)

    dropdownToggle.addEventListener('click', ()=>{
        if(dropdownOpen) {
            closeDropdown(500)
        } else {
            openDropdown(500)
        }
    })

})