$('.datepickr').on('change', function() {
    var date = $(this).val();
    var dateParts = date.split('-');
    $(this).val(dateParts.join('/'))
})