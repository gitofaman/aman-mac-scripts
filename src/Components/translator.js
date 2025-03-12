// old script
// $('document').ready(function(){
//     var currLang = 'curr-lang'

//     var spanishLanguage = () => {
//         $('[spanish]').each(function() {
//             $(this).attr('english', $(this).text());
//             $(this).text($(this).attr('spanish'));
//         });
//         Cookies.set(currLang, 'spanish');
//         $('[lang=es]').addClass('is-active')
//         $('[lang=en]').removeClass('is-active')
//         $('[en-block]').css({
//           'display': 'none'
//         })
//         $('[es-block]').css({
//           'display': 'block'
//         })
//     }
    
//     var englishLanguage = () => {
//         $('[english]').each(function() {
//             $(this).attr('spanish', $(this).text());
//             $(this).text($(this).attr('english'));
//         });
//         Cookies.set(currLang, 'english');
//         $('[lang=en]').addClass('is-active')
//         $('[lang=es]').removeClass('is-active')
//         $('[es-block]').css({
//           'display': 'none'
//         })
//         $('[en-block]').css({
//           'display': 'block'
//         })
//     }
    
//     if(Cookies.get(currLang) === 'spanish') {
//         spanishLanguage()
//     } else {
//         englishLanguage()
//     }
    
//     var toggleLanguage = () => {
//         if(Cookies.get(currLang) === 'spanish') {
//             englishLanguage()
//         } else {
//             spanishLanguage()
//         }
//     }
    
//     $('.lang-switch-item').on('click', function(){
//         var i = $(this).index()
//         if(i===0) {
//             englishLanguage()
//         } else {
//             spanishLanguage()
//         }
//     })
// })

$(document).ready(function(){
    var currLang = 'curr-lang';

    var spanishLanguage = () => {
        $('[text-for-es]').each(function() {
            $(this).attr('text-for-en', $(this).text());
            $(this).text($(this).attr('text-for-es'));
        });
        Cookies.set(currLang, 'spanish');
        $('[lang=es]').addClass('is-active');
        $('[lang=en]').removeClass('is-active');
        $('[en-block]').css('display', 'none');
        $('[es-block]').css('display', 'block');
    };

    var englishLanguage = () => {
        $('[text-for-en]').each(function() {
            $(this).attr('text-for-es', $(this).text());
            $(this).text($(this).attr('text-for-en'));
        });
        Cookies.set(currLang, 'english');
        $('[lang=en]').addClass('is-active');
        $('[lang=es]').removeClass('is-active');
        $('[es-block]').css('display', 'none');
        $('[en-block]').css('display', 'block');
    };

    if (Cookies.get(currLang) === 'spanish') {
        spanishLanguage();
    } else {
        englishLanguage();
    }

    $('.lang-switch-item').on('click', function(){
        var i = $(this).index();
        if (i === 0) {
            englishLanguage();
        } else {
            spanishLanguage();
        }
    });
});
