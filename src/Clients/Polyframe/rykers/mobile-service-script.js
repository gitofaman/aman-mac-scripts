$(document).ready(function(){
    if ($(window).width() <= 767) {
        $('.section-services-parent').find('[class*=section]').each(function(){
            var header1 = $(this).find('.header_1 .service-content-wrap');
            var content = $(this).find('.grid-3col.space-expanded');
        
            // Move content to header1
            content.appendTo(header1);
        });
    
    
    
        $('.header_1').each(function() {
            var serviceOpen;
            var el = $(this)
            var osTl = gsap.timeline()
        
            var openService = () => {
                serviceOpen = true;
                osTl.to(el.find('.service-content'), {
                    height: 'auto',
                    opacity: 1,
                }).to(el.find('.arrow-down'), {
                    rotate: 180
                })
            }
            var closeService = () => {
            serviceOpen = false;
                osTl.to(el.find('.service-content'), {
                    height: '0',
                    opacity: 0,
                }).to(el.find('.arrow-down'), {
                    rotate: 0
                })
            }
    
            closeService()
    
            el.find('.service-toggle').on('click', function(){
                if(!serviceOpen) {
                    openService()
                } else {
                    closeService()
                }
            })
            
        })
    
        var urlParams = new URLSearchParams(window.location.search);
        var tabIndex = urlParams.get('tab');
    
        if (tabIndex !== null) {
            tabIndex = parseInt(tabIndex);
            $('.service-toggle').eq(tabIndex - 1).click()
            console.log('clicked and scrolling')
            setTimeout(function(){
                scrollToElementTop(document.querySelectorAll('.service-toggle')[tabIndex - 1], 0)
            }, 500)
        } 
    
    }
})
