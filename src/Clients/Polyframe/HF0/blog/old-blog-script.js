

$('.back-button').hide()
var checkIfElInSpace = (el, percentVal) => {
    var windowHeight = window.innerHeight
    var spaceToCover = Math.round(windowHeight * percentVal / 100)
    var spaceFromEachSides = (windowHeight - spaceToCover) / 2;
    var elTop = el.getBoundingClientRect().top
    // var elBottom = el.getBoundingClientRect().bottom
    if (elTop + el.offsetHeight > spaceFromEachSides && elTop < windowHeight - spaceFromEachSides) {
        return true;
    }
    return false
}

var updateBlogInViewActive = () => {
    $('.current-blog-text-wrap *:not(.current-blog-text)').remove()
    $('.current-blog-text').show()
    let maxVisibleHeight = 0;
    let activeElement = null;

    $('.blog-post-content').each(function () {
        let elementTop = $(this).offset().top;
        let elementBottom = elementTop + $(this).outerHeight();
        let viewportTop = $(window).scrollTop();
        let viewportBottom = viewportTop + $(window).height();

        let visibleHeight = Math.min(elementBottom, viewportBottom) - Math.max(elementTop, viewportTop);

        if (visibleHeight > maxVisibleHeight && visibleHeight > 0) {
            maxVisibleHeight = visibleHeight;
            activeElement = $(this);
        }
    });

    if (activeElement && !activeElement.hasClass('is-active')) {
        console.log(activeElement.index())
        $('.blog-post-content.is-active').removeClass('is-active');
        activeElement.addClass('is-active');
        var blogId = activeElement.attr('id');
        console.log(blogId)
        $('.blog-text.is-active').removeClass('is-active')
        $(`[href="#${blogId}"]`).addClass('is-active')
        $('.current-blog-text').text($(`[href="#${blogId}"]`).text())
        
        // Update the URL hash without jumping
        history.replaceState(null, null, `#${blogId}`);
    }
}

$(window).on('scroll', updateBlogInViewActive);


$('.blog-text').hide()

$('.blog-item').each(function (i) {
    var isLastItem = i === $('.blog-item').length - 1
    var blockIndex = i;
    var blogLink = $(this).find('a[blog-link]').attr('href');
    var loadingSvg = $(this).find('.loading-svg')
    var blogText = $(this).find('.blog-text')
    var blogItemId = blogLink.replace('/post/', '').replaceAll('/')
    // add this as the link to the current item a link
    blogText.attr('href', `#${blogItemId}`)
    //loading screen is going to be there by default
    var mainItem = $(this)
    // Ensure the link is valid
    if (blogLink) {
        // Use AJAX to fetch the content
        $.ajax({
            url: blogLink,
            method: 'GET',
            success: function (response) {
                var postItem = $(response).find('.blog-post-content')
                // add the id to postItem to ensure peaple can go to this post
                postItem.attr('id', blogItemId)
                postItem.css('order', blockIndex)
                // when we get the item, we want to add it in the blog-post-container
                $('.blog-post-container').append(postItem)
                // if it's the last item, the "blog-post-loading-container" should be removed

                // when item is loaded we wan to remove the loading of this particular block and then show blog text link
                loadingSvg.remove()
                blogText.show()

            },
            error: function () {
                console.error('Failed to load the blog post content.');
            }
        });
    } else {
        console.error('No blog link found.');
    }
})

var blogItemLoadedInterval = setInterval(function () {
    if ($('.blog-post-content').length === $('.blog-item').length) {
        $('.blog-post-loading-container').remove()
        clearInterval(blogItemLoadedInterval)
        updateBlogInViewActive()
    }
}, 500)

// only for dropdown
var mobileView = $(window).width() < 768
if(mobileView) {
    var open = false;
    
    var closeDropdown = () => {
        var cdTl = gsap.timeline({
            onComplete: function() {
                open = false;
            }
        })
        cdTl
        .to('.blog-list-wrapper', {
            height: '0px'
        }, 0).to('.arrow-expand-collapse', {
            rotate: 0
        }, 0)
    }
    var openDropdown = () => {
        // console.log('openend')
        var odTl = gsap.timeline({
            onComplete: function() {
                open = true;
            }
        })
        odTl
        .to('.blog-list-wrapper', {
            height: 'auto'
        }, 0).to('.arrow-expand-collapse', {
            rotate: 180
        }, 0)
    }
    $('.blog-item').on('click', function(){
        closeDropdown()
    })
    $('.category-toggle-wrap').on('click', function(){
        if(open) {
            closeDropdown()
        } else {
            openDropdown()
        }
    })
    closeDropdown()
    $(document).on('click', function(event) {
        // Check if the clicked element is inside an element with the class "category-wrapper"
        if (!$(event.target).closest(".category-toggle-wrap").length) {
            // Click was outside the .category-wrapper element
            console.log('Click was outside of the category-wrapper');
            // Add your custom logic here
            closeDropdown()
        }
    });
}

