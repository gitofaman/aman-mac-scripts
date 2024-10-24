
// Page Transition Code

// On page load
// let nextPageLink;
// $(".content-wrapper").addClass("first");

var ajaxBtns = document.querySelectorAll('[ajax-btns] .button')

ajaxBtns.forEach(ajaxBtn =>{
    ajaxBtn.addEventListener('click', ()=>{
        ajaxBtns.forEach(btn=>{
            if(btn===ajaxBtn) {
                btn.style.display='none';
            } else {
                btn.style.display=''
            }
        })
    })
})

ajaxBtns[0].style.display = 'none'

const getTop = el => el.offsetTop + (el.offsetParent && getTop(el.offsetParent))
const scrollToElementTop = (el, spaceFromTop) => {
    var scrollTo = getTop(el) - spaceFromTop
    window.scrollTo({
        top: scrollTo,
        behavior: 'smooth',
        })   
}

// On link click
$("[ajax-btns] .button").on("click", function (e) {
  e.preventDefault();
  nextPageLink = $(this).attr("href");
  $(".products-wrapper").find(".section_home_product-list").remove()
  $.ajax({
    url: nextPageLink,
    success: function (response) {
      let element = $(response).find(".section_home_product-list")
      $(".products-wrapper").prepend(element);
    },
    complete: function () {
      pageTransition();
    }
  });
});

function pageTransition() {
    scrollToElementTop(document.querySelector('.products-wrapper .section_home_product-list'), 0)
}

// function updatePage() {
//   window.location = nextPageLink;
// }
