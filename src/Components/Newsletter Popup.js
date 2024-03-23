
if(!!document.getElementById('bpopup--el')) {

    var modalOpen, openNewsletterSlideModal,  closeNewsletterSlideModal, closeModalOnClickOutside, windowIsHalfWay;

    const initiateModal = () => {
        modalOpen = false;

        openNewsletterSlideModal=() => {
            if(!modalOpen && windowIsHalfWay()) {
                document.querySelector('.bpopup--open-btn').click() //clicking this hidden element makes pop up open
                modalOpen = true;
                closeModalOnClickOutside()
            }
        }

        closeNewsletterSlideModal = () => {
            if(modalOpen) {
                document.querySelector('.bpopup--close-img').click()
            }
        }

        closeModalOnClickOutside = () => {
            window.addEventListener('click', (e)=> {
                if (document.getElementById('bpopup--el').contains(e.target)){
                    // Clicked in box
                } else{
                    // Clicked outside the box
                    closeNewsletterSlideModal()
                }
            }
            )
        }


        windowIsHalfWay = () => {
            const height = document.body.getBoundingClientRect().height
            const scrolled = (document.body.getBoundingClientRect().top)* (-1)
            return scrolled/height >= 0.5;
        }

        window.addEventListener('scroll', openNewsletterSlideModal)
    }

    window.addEventListener('scroll', openNewsletterSlideModal)

    function popupAllowedCookieSet() {
        var timesPopupOpenedToday = Cookies.get('TimesPopupOpenedToday') || false
        if (timesPopupOpenedToday && timesPopupOpenedToday>1) {
            setPopupExpire(1)
            return
        } else if (!timesPopupOpenedToday) {
            Cookies.set('TimesPopupOpenedToday', 0)
        } else {
            var btimesPopupOpenedToday = parseInt(Cookies.get('TimesPopupOpenedToday'))
            Cookies.set('TimesPopupOpenedToday', btimesPopupOpenedToday + 1)
        }
        initiateModal()
    }

    function setPopupExpire(days) {
        Cookies.set('PopNotAllowed', true, {expires: days})
        Cookies.set('TimesPopupOpenedToday', 0)
    }

    document.querySelector('.bpopup--parent .bpopup--form').addEventListener('submit', ()=> {
        setPopupExpire(180)
        setTimeout(closeNewsletterSlideModal, 5000)
    })

    //to restrict the subscribe popup modal if user is subscribed
    if(!Cookies.get('PopNotAllowed')){
        popupAllowedCookieSet();
    } else {
        modalOpen= true;
        document.querySelector('.bpopup--cover').remove()
    }

}