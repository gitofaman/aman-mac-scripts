if (window.innerWidth > 768) {

    var setInitialState = () => {
        $('.popup').css({
            opacity: '0',
            display: 'none',
        })
    }

    var modalOpen, openNewsletterSlideModal, closeNewsletterSlideModal, windowIsHalfWay;


    const initiateModal = () => {
        modalOpen = false;

        openNewsletterSlideModal = () => {
            if (!modalOpen && windowIsHalfWay()) {
                setInitialState()
                gsap.to('.popup', {
                    opacity: 1,
                    display: 'flex',
                    duration: 0.5,
                })
                modalOpen = true
            }
        }

        closeNewsletterSlideModal = () => {
            if (modalOpen) {
                gsap.to('.popup', {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                        $('.popup').remove()
                        setInitialState()
                    }
                })
                modalOpen = false;
            }
        }

        windowIsHalfWay = () => {
            const height = document.body.getBoundingClientRect().height
            const scrolled = (document.body.getBoundingClientRect().top) * (-1)
            return scrolled / height >= 0.5;
        }
        $('.popup-close').on('click', closeNewsletterSlideModal)
        window.addEventListener('scroll', openNewsletterSlideModal)
    }

    function popupAllowedCookieSet() {
        var timesPopupOpenedToday = Cookies.get('TimesPopupOpenedToday') || false
        if (timesPopupOpenedToday && timesPopupOpenedToday > 1) {
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
        Cookies.set('PopNotAllowed', true, {
            expires: days
        })
        Cookies.set('TimesPopupOpenedToday', 0)
    }



    //to restrict the subscribe popup modal if user is subscribed
    if (!Cookies.get('PopNotAllowed')) {
        popupAllowedCookieSet();
    } else {
        modalOpen = true;
        document.querySelector('.bpopup--cover').remove()
    }
}