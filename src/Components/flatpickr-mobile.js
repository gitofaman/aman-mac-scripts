var pInterval = setInterval(()=>{
    var dateMob = document.querySelector('.flatpickr-mobile')
    if(!!dateMob) {
        var hInterval = setInterval(()=>{
            var typeHiddenInput = dateMob.parentElement.querySelector('input[type=hidden]')
            if(!!typeHiddenInput) {
                typeHiddenInput.setAttribute('type', 'text')
                clearInterval(hInterval)
            }
        }, 100)
        clearInterval(pInterval)
    }
}, 100)