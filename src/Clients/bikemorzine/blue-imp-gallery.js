// alert('working')
$(document).ready(function() {
    $('.acm--tab-pane').each(function() {
        var $div = $(this);
        
        // Create a new anchor element
        var $a = $('<a/>');
        $a.attr('href', $div.find('img').attr('src'))
        
        // Copy attributes from the div to the anchor
        $.each(this.attributes, function() {
            $a.attr(this.name, this.value);
        });
        
        // Move all children from the div to the anchor
        $a.append($div.contents());
        
        // Replace the div with the anchor
        $div.replaceWith($a);
    });
});
$(document).ready(function(){
    var ic = `.acm--tabs-content`

    $(`${ic}`).each(function(){
        var main = $(this)

        main.on('click', 'a', function(event) {
            event.preventDefault();
            var target = event.target || event.srcElement;
            var link = target.src ? $(target).parent() : $(target);
            // console.log(link)
            var links = main.find('a');
            var liIndex = links.index(link)
            var options = { index: liIndex, event: event };
            // console.log(links.attr('href'))
            blueimp.Gallery(links, options);
        });
    })
    var gallery = $('#blueimp-gallery').data('gallery')
    $('#blueimp-gallery').on('open', function (event) {
      // Gallery open event handler
      console.log('opening')
    }).on('opened', function (event) {
      // Gallery opened event handler
      console.log('opened')
    })
})