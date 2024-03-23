var datas = [];

$('.elementor-widget-wrap.elementor-element-populated').each(function(){
    var aName = $(this).find('.eael-team-member-name').text();
    var aProf = $(this).find('.eael-team-member-position').text();
    
    // Find the anchor tags with the class 'eael-team-member-social-link'
    var socialLinks = $(this).find('.eael-team-member-social-link a');
    
    var mail = "";
    var linkedin = "";
    
    // Iterate through each anchor tag to determine mail and linkedin
    socialLinks.each(function() {
        var href = $(this).attr('href');
        
        // Check if href contains 'mailto:' for mail
        if (href && href.includes('mailto:')) {
            mail = href.replace('mailto:', '');
        }
        
        // Check if href contains 'linkedin.com' for linkedin
        if (href && href.includes('linkedin.com')) {
            linkedin = href;
        }
    });

    // Push the data to the datas array
    datas.push({
        'name': aName,
        'profession': aProf,
        'image': $(this).find('.eael-team-image img').attr('src'),
        'mail': mail,
        'linkedin': linkedin,
        'btn-link': $(this).find('a.elementor-button').attr('href') || ''
    });
});

// Output the collected datas array
console.log(datas);