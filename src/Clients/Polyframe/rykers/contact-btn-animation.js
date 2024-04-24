var main = $('.button.is-fixed-btn');
var siblingBtn = $('.is-bg-mirrow');

main.on('mouseover', function () {
    main.addClass('expanded');
    main.find('*').addClass('expanded')
    main.siblings().addClass('expanded');
});

main.on('mouseout', function () {
    main.removeClass('expanded');
    main.find('*').removeClass('expanded')
    main.siblings().removeClass('expanded');
});
