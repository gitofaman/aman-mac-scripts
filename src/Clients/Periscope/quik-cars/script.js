$(document).ready(function() {
    $(document).ready(function(){
        $('#yearselect option:not(:first-child)').each(function(){
            $(this).insertBefore($('#yearselect option:first-child'));
        });
    });
});
$(document).ready(function(){
    var selectField = $('#yearselect');
    var firstOption = selectField.find('option:first');
    
    firstOption.insertAfter(selectField.find('option:last'));
    $('[zipcode]').css({
        display: 'none'
    })
    $('#stateselect').on('change', function(){
        if(this.value !== ''){
            $('[zipcode]').css({
                display: 'block'
            })
        } else {
            $('[zipcode]').css({
                display: 'none'
            })
        }
    })
});
