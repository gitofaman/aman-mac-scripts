$(document).ready(function(){
    if($(window).width() < 768) {
        var gtl = gsap.timeline({
            paused: true // Pause the timeline initially
        });
        
        var filtersOpen = false;
        
        function openFilters(duration) {
            console.log('opening filters');
            filtersOpen = true;
            $('.form-filter-content').css('display', 'block');
            gtl.clear(); // Clear any existing animations in the timeline
            gtl.to('.form-filter-content', { height: 'auto', opacity: 1, duration: duration })
            .to('.form-filter-toggle .filter-arrow', {
                rotate: 180,
            }, 0).to('.form-filter-toggle', {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                borderBottomWidth: 0
            }, 0)
            gtl.play(); // Play the timeline
        }
        
        function closeFilters(duration) {
            console.log('closing filters');
            filtersOpen = false;
            gtl.clear(); // Clear any existing animations in the timeline
            gtl.to('.form-filter-content', { height: 0, opacity: 0, duration: duration }).to('.form-filter-toggle .filter-arrow', {
                rotate: 0
            }, 0).to('.form-filter-toggle', {
                borderBottomLeftRadius: `var(--standard-spacing)`,
                borderBottomRightRadius: 'var(--standard-spacing)',
                borderBottomWidth: '1px'
            }, 0)
        }
        
        $('.form-filter-toggle').on('click', function() {
            if (filtersOpen) {
                closeFilters(0.5);
            } else {
                openFilters(0.5);
            }
        });
        closeFilters(0); // Initially close the filters
    }
})