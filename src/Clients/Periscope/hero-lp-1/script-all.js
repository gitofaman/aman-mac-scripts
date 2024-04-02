$("[dropdown]").each(function(){

    var dToggle = $(this).find("[d-toggle]");
    var dContent = $(this).find("[d-content]");
    var dArrow = $(this).find("[d-arrow]");

    dContent.css({
        overflow: 'none'
    })

    var dTl = gsap.timeline();

    var dOpen = false;

    var closeDropdown = () => {
        dTl.fromTo(dContent, {
            height: 'auto',
        }, {
            height: '0',
        }).fromTo(dArrow, {
            rotate: 180
        }, {
            rotate: 0
        })
    }

    var openDropdown = () => {
        dTl.fromTo(dContent, {
            height: '0',
        }, {
            height: 'auto',
        }).fromTo(dArrow, {
            rotate: 0
        }, {
            rotate: 180
        })
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

    dToggle.on('click', toggleDropdown)
    
})