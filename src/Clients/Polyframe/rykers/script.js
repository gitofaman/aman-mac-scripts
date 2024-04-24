$(document).ready(function () {
    if ($(window).width() <= 767) {
        var urlParams = new URLSearchParams(window.location.search);
        var tabIndex = urlParams.get('tab');

        if (tabIndex !== null) {
            tabIndex = parseInt(tabIndex);
            $('.service-toggle').eq(tabIndex - 1).click()
            console.log('clicked and scrolling')
            setTimeout(function () {
                scrollToElementTop(document.querySelectorAll('.service-toggle')[tabIndex - 1], 0)
            }, 500)
        }
    }
});