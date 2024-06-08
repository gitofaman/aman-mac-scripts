$('input[type=checkbox]').each(function(){
    var labelName = $(this).parent().find('.w-form-label').text()
    console.log(labelName)
     $(this).attr('name', labelName)
 })
 $('input[type=radio]').each(function(){
     var radioName = $(this).closest('[radio-name]').attr('radio-name')
    var labelName = $(this).parent().find('.w-form-label').text()
 
     $(this).attr('name', radioName)
     $(this).attr('value', labelName)
  })
 
 
 
 $('[check]').css('display', 'none')
 $('[radio-check]').css('display', 'none')
 
 $('[check]').each(function(){
     var main = $(this)
     var inputName = $(this).attr('check')
     $(`[name="${inputName}"]`).on('change', function(){
         var checked = $(this).prop('checked');;
         if(checked) {
             main.css('display', 'block')
         } else {
             main.css('display', 'none')
         }
     })
 })
 
 $('[radio-check]').each(function() {
     var main = $(this);
     var nameVal = main.attr('radio-check').split('||');
     var reqName = nameVal[0].trim();
     var reqVal = nameVal[1].trim();
     
     // Initial check to set the visibility based on the current state
     var checkVisibility = function() {
         // console.log('checking')
         var givenVal = $(`[name=${reqName}]:checked`).val()
         var isChecked = givenVal === reqVal;
         console.log(givenVal)
         console.log(reqVal)
         if (isChecked) {
             main.css('display', 'block');
         } else {
             main.css('display', 'none');
         }
     };
     
     // Attach the change event listener
     $(`[name=${reqName}]`).on('change', checkVisibility);
 
     // Initial call to set the correct state on page load
     checkVisibility();
 });
 