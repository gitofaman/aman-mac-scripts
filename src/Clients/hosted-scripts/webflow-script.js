var attributes = {
    dropdown: {
        'main': 'dropdown',
        'toggle': 'd-toggle',
        'content': 'd-content',
        'arrow': 'd-arrow'
    }
}
var atr = (atrName) => {
    return `[${atrName}]`
}

$(atr(attributes.dropdown.main)).each(function(){
    var $main = $(this)
    var dToggle = $(this).find(atr(attributes.dropdown.toggle));
    var dContent = $(this).find(atr(attributes.dropdown.content));
    var dArrow = $(this).find(atr(attributes.dropdown.arrow));

    dContent.css({
        overflow: 'none',
        display: 'block'
    })

    var dTl = gsap.timeline();

    var dOpen = false;

    var timelineAction = dTl.fromTo(dContent, {
        height: '0',
    }, {
        height: 'auto',
    }).fromTo(dArrow, {
        rotate: 0
    }, {
        rotate: 180
    }, '0')

    var closeDropdown = () => {
        timelineAction.reverse()
    }

    var openDropdown = () => {
        timelineAction.play()
    }

    var toggleDropdown = () => {
        if(dOpen) {
            dOpen = false
            closeDropdown()
        } else {
            dOpen = true
            openDropdown()
        }
    }
    if($(window).width() < 991) {
        dToggle.on('click', ()=>{
            toggleDropdown()
        })
    } else {
        $main.on('mouseover', openDropdown)
        $main.on('mouseout', closeDropdown)   
    }
    
    closeDropdown()

})
