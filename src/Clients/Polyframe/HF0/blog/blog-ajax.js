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
if ($(window).width() > 768) {
    var updateBlogInViewActive = () => {
        let maxVisibleHeight = 0;
        let activeElement = null;

        $('.blog-post-content').each(function () {
            // Calculate the visible height of the element within the viewport
            let elementTop = $(this).offset().top;
            let elementBottom = elementTop + $(this).outerHeight();
            let viewportTop = $(window).scrollTop();
            let viewportBottom = viewportTop + $(window).height();

            let visibleHeight = Math.min(elementBottom, viewportBottom) - Math.max(elementTop, viewportTop);

            // Check if the visible height is greater than the current max
            if (visibleHeight > maxVisibleHeight && visibleHeight > 0) {
                maxVisibleHeight = visibleHeight;
                activeElement = $(this);
            }
        });

        // Add the "is-active" class to the most visible element if it's not already added
        if (activeElement && !activeElement.hasClass('is-active')) {
            $('.blog-post-content.is-active').removeClass('is-active');
            activeElement.addClass('is-active');
            var blogId = activeElement.attr('id');
            $('[href*="#blog-item"]').removeClass('is-active')
            $(`[href="#${blogId}"]`).addClass('is-active')
        }
    }
    $(window).on('scroll', updateBlogInViewActive);
}

$('.blog-text').hide()

$('.blog-item').each(function (i) {
    var isLastItem = i === $('.blog-item').length - 1
    var blockIndex = i;
    var blogLink = $(this).find('a[blog-link]').attr('href');
    var loadingSvg = $(this).find('.loading-svg')
    var blogText = $(this).find('.blog-text')
    var blogItemId = `blog-item-${i}`
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



if ($(window).width() < 768) {
    var showBlog = (show) => {
        var swTl = gsap.timeline()
        var x = '-100%'
        if (show) {
            $('.back-button').show()
            // swTl.to('.blog-post-container', {
            //     height: 'auto'
            // })
        } else {
            $('.back-button').hide()
            x = '0%'
            // swTl.to('.blog-post-container', {
            //     height: '50dvh'
            // })
        }
        swTl.to('.blog-halves', {
            x: x,
            onComplete: function() {
                if (!show) {
                    $('.blog-post-content').hide()
                }
            }
        }, 0)
    }
    $('.blog-item').on('click', function () {
        // hide all blogs except current one
        var currentId = $(this).find('.blog-text').attr('href').replace('#', '')
        $('.blog-post-content').hide()
        $(`.blog-post-content[id="${currentId}"]`).show()
        showBlog(true)
    })
    $('.back-button').on('click', function () {
        showBlog(false)
    })
    showBlog(false)
}