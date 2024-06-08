// Create a new script element
var script = document.createElement('script');

// Set the script source attribute
script.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js";

// Append the script to the head tag
document.head.appendChild(script);

var datas = [];

$('.elementor-widget-wrap.elementor-element-populated').each(function(){
    var aName = $(this).find('.eael-team-member-name').text();
    var aProf = $(this).find('.eael-team-member-position').text();
    
    // Find the anchor tags with the class 'eael-team-member-social-link'

    // Push the data to the datas array
    datas.push({
        'name': aName,
        'profession': aProf,
        'image': $(this).find('.eael-team-image img').attr('src'),
        'description': $(this).find('.eael-team-text').text()
    });
});

// Output the collected datas array
console.log(datas);