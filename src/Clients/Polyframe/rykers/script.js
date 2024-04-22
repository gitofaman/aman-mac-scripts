// function uncheckAllExceptFirst() {
//     // Loop through all checkboxes starting from the second one
//     $('.filter-checkbox input').slice(1).prop('checked', false);
//     // $('.filter-checkbox input')[0].prop('checked', true)
// }

// function allOrFew() {
//     var checks = $('.filter-checkbox input').map(function() {
//         return $(this).prop('checked');
//     });
//     var all = false;
//     // all except first one then all
//     var search = checks.slice(1);
//     // Check if any checkbox other than the first one is unchecked
//     if (search.toArray().includes(false)) {
//         all = false;
//     } else {
//         all = true
//     }
//     if(checks[0]) {
//         all = true;
//     }
//     if (all) {
//         uncheckAllExceptFirst($('.filter-checkbox input'));
//     }
// }

// $('.filter-checkbox input').on('change', function(){
//     // var checked = $(this).prop('checked');
//     allOrFew()
//     // $('.section-services-parent > div')
// });


$(document).ready(function () {
    var checkboxSelector = '.filter-checkbox input'
    // When any checkbox is clicked
    $(checkboxSelector).on("change", function () {
        
        if ($(this).prop("name") === "all") {
            // If "ALL" is checked, uncheck all other checkboxes
            $(checkboxSelector).not(this).prop("checked", false);
        } else {
            // If any other checkbox is checked, uncheck the "ALL" checkbox
            $("input[name='all']").prop("checked", false);

            // Check if all other checkboxes except the first one are checked
            var allOthersChecked = true;
            $(checkboxSelector).not("[name='all']").each(function () {
                if (!$(this).prop("checked")) {
                    allOthersChecked = false;
                    return false; // Exit the loop early if any checkbox is unchecked
                }
            });

            // If all other checkboxes except the first one are checked, check only the first one
            if (allOthersChecked) {
                $(checkboxSelector).eq(0).prop("checked", true);
                $(checkboxSelector).slice(1).prop("checked", false);
            }
        }

        $(checkboxSelector).slice(1).each(function(){
            var i = $(checkboxSelector).slice(1).indexOf(this); 
            var checked = $(this).prop('checked')
            console.log(i, checked)
            // var serviceSections = $('.section-services-parent').find('[class*=section]')
            // if(checked) {
            //     console.log("displaying this")
            //     serviceSections.eq(i).css('display', 'block')
            // } else {
            //     console.log("hiding this")
            //     serviceSections.eq(i).css('display', 'none')
            // }
        })
    });
});