// $('.section').removeClass('hide')
// var filtersBtn = $('.aq-filter-field')
// var swiper;

// $(document).ready(function() {
//     var totalClicks = 0
//     var pastTotalClicks = 0
//     var targetNode = $('[fs-cmsfilter-element="list"]')[0];

//     var callback = function(mutationsList, observer) {
//         if (pastTotalClicks != totalClicks) {
//             pastTotalClicks = totalClicks;
//             swiper.update()
//         }
//     };

//     var observer = new MutationObserver(callback);
//     observer.observe(targetNode, {
//         childList: true,
//         subtree: false
//     });

//     filtersBtn.on('click', function(){
//         totalClicks++;
//     })

//     $('.swiper-slider').each(function(){
//         swiper = new Swiper($(this).find('.swiper')[0], {
//             slidesPerView: "auto",
//             navigation: {
//                 nextEl: $(this).find('.swiper-next')[0],
//                 prevEl: $(this).find('.swiper-prev')[0]
//             },
//             loop: false,
//             autoplay: {
//                 delay: 2500,
//                 pauseOnMouseEnter: true
//             }
//         });
//     });
// });