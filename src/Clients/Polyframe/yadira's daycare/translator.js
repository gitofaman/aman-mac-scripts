
//change language script
var currLang = 'curr-lang'

var spanishLanguage = () => {
    $('[spanish]').each(function() {
        $(this).attr('english', $(this).text());
        $(this).text($(this).attr('spanish'));
    });
    Cookies.set(currLang, 'spanish');
    $('[lang=es]').addClass('is-active')
    $('[lang=en]').removeClass('is-active')
}

var englishLanguage = () => {
    $('[english]').each(function() {
        $(this).attr('spanish', $(this).text());
        $(this).text($(this).attr('english'));
    });
    Cookies.set(currLang, 'english');
    $('[lang=en]').addClass('is-active')
    $('[lang=es]').removeClass('is-active')
}

if(Cookies.get(currLang) === 'spanish') {
    spanishLanguage()
} else {
    englishLanguage()
}

var toggleLanguage = () => {
    if(Cookies.get(currLang) === 'spanish') {
        englishLanguage()
    } else {
        spanishLanguage()
    }
}

$('[lang=en]').on('click', englishLanguage)
$('[lang=es]').on('click', spanishLanguage)