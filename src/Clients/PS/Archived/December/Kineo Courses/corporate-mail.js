// var visibilityFormErrorState = (formInstance, visibility) => {
//     var errorMessage = formInstance.parentElement.querySelector(".error--message");
//     errorMessage.style.display = visibility;
// };

function updatedLinkWithAttributes(providedLink) {
    var finalUrl = providedLink;
    if (!!srcParam && !!refParam) {
        finalUrl = addParam(providedLink, "src", srcParam);
        finalUrl = addParam(providedLink, "ref", refParam);
    } else {
        if (!!srcParam) {
            finalUrl = addParam(providedLink, "src", srcParam);
        }
        if (!!refParam) {
            finalUrl = addParam(providedLink, "ref", refParam);
        }
    }
    return finalUrl;
}

var freeEmailProviders = [
    "aim.com",
    "aol.com",
    "gmail.com",
    "gmx.com",
    "gmx.us",
    "hotmail.com",
    "icloud.com",
    "mail.com",
    "outlook.com",
    "protonmail.com",
    "yahoo.com",
    "yandex.com",
    "zoho.com",
];

const isValidEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
var usingForm = document.querySelector('form')
usingForm.querySelector('input[type="submit"]').addEventListener('click', e=>{
    var formEmailInput = usingForm.querySelector('input[type="email"]')
    var emailValue = formEmailInput.value;
    if(!!isValidEmail(emailValue)) {
        var emailLink = emailValue.split('@')[1]
        if(freeEmailProviders.includes(emailLink)) {
            e.preventDefault();
            alert('Please enter your business mail')
        } else {
        }
    }
})