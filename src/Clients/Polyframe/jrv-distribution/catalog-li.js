$('.catalog-item').each(function() {
    var $ci = $(this)
    var specs = [];
    var i = 0;
    $(this).find('[c-specs] h2').each(function() {
        specs.push({
            title: $(this).text(),
            index: i
        });
        i++;
    });

    i = 0;
    $(this).find('[c-specs] p').each(function() {
        specs[i]['spec'] = $(this).text();
        i++;
    });

    var catalogLiCount = $(this).find('.catalog-li').length;
    var specsCount = specs.length;

    // Continue duplicating until the number of catalog-li blocks matches the specs array length
    while (catalogLiCount < specsCount) {
        $(this).find('.catalog-li').first().clone().appendTo($(this).find('.catalog-item-specs'));
        catalogLiCount++;
    }

    console.log(specs);

    $(specs).each(function() {
        var s = $(this)[0];
        console.log(s['index']);
        $ci.find('[specs-head]').eq(s['index']).text(s['title']);
        $ci.find('[specs-spec]').eq(s['index']).text(s['spec']);
    });

    $(this).find('[c-specs]').remove();
});
//catalog expansion code
$('.catalog-item').each(function(){

    var $ciItem = $(this)
    var $ciBtn = $ciItem.find('[expand]')
    var expanded = true;
    var btnTexts = $ciBtn.attr('expand').split(',')
    console.log(btnTexts)

    var expand = () => {
        expanded = true;
        gsap.to($ciItem.find('.catalog-item-2col'), {
            height: 'auto',
            onComplete: function(){
                $ciBtn.text(btnTexts[1])
            }
        })
    }

    var  collapse = () => {
        expanded = false;
        gsap.to($ciItem.find('.catalog-item-2col'), {
            height: 0,
            onComplete: function(){
                $ciBtn.text(btnTexts[0])
            }
        })
    }

    $ciBtn.on('click', function(){
        if (!expanded) {
            expand()
        } else {
            collapse()
        }
    })

    collapse()
});