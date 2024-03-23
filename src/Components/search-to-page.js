//to be placed where search input or search inputs will be
var searchForms = document.querySelectorAll('[search-form]')

searchForms.forEach(searchForm=>{

    var searchInput, searchBtn;
    searchInput = searchForm.querySelector('[search-input]')
    searchBtn = searchForm.querySelector('[search-btn]')
    var searchPageHref = searchBtn.getAttribute('href')
    if(searchPageHref.indexOf('/') === 0) {
        searchPageHref = (window.location.href + searchPageHref).replace(`/${searchPageHref}`,`${searchPageHref}`)
    }
    var searchPage = new URL(searchPageHref)
  
    //changing the url to contain the query based on input
    searchInput.addEventListener('keyup', (e)=>{
        
        searchPage.searchParams.delete('search-query')
        searchPage.searchParams.append('search-query', e.target.value)
        searchBtn.setAttribute('href', searchPage.href)
        //redirecting to page where search values will filter 
        if(e.key === 'Enter') {
            searchBtn.click()
        }
    })

})


//to be placed in the page where search param will filter
var pageUrl = new URL(window.location.href)
var searchQuery = pageUrl.searchParams.get('search-query')
if(!!searchQuery || searchQuery.length) {
    var hiddenSearchHeading = document.querySelector('[search-heading]')
    hiddenSearchHeading.style.display = 'block'
    hiddenSearchHeading.querySelector('[search-query]').innerText = searchQuery
    //function to perform the in page filter with  the query
    filterTeachers(searchQuery)
    var showAllButton = document.querySelector('[show-all-btn]').addEventListener('click',()=>{
        hiddenSearchHeading.style.overflow = 'hidden'
        anime ({
            targets: hiddenSearchHeading,
            height: 0,
            duration: 500,
            margin: 0, 
            easing: 'easeOutSine'
        })
        filterTeachers('')
    })
}
