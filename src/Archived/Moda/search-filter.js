var searchInput, richTextBlocks;
searchInput = document.querySelector('.glossary-search-field.w-input')
richTextBlocks = Array.from(document.querySelectorAll('.glossary-rich-text.w-richtext'))
var customWrapperClass = 'rich-text-wrap-content'

var prepareRichTextForSearch = (richTextBlock) => {
    var richTextChilds = Array.from(richTextBlock.childNodes);
    var wrapGivenHtmlInsideADiv = (arrayOfHTML) => {
        var newDiv = document.createElement('div')
        newDiv.classList.add(customWrapperClass)
        arrayOfHTML.forEach(html=>{
            newDiv.appendChild(html)
        })
        return newDiv;
    }
    var richTextContents = []
    var richTextHeaderTwoContent = []
    richTextChilds.forEach(richTextChild => {
        if(richTextChild.tagName.toLowerCase()==='h2') {
            if(richTextHeaderTwoContent.length) {
                richTextContents.push(richTextHeaderTwoContent)
            }
            richTextHeaderTwoContent = []
        }
        richTextHeaderTwoContent.push(richTextChild)
        if(richTextChilds.indexOf(richTextChild)===richTextChilds.length-1) {
            richTextContents.push(richTextHeaderTwoContent)
        }
    })
    richTextBlock.innerHTML = ''
    richTextContents.forEach(richTextContent=>{
        var wrappedContent = wrapGivenHtmlInsideADiv(richTextContent)
        richTextBlock.appendChild(wrappedContent)
    })
}

richTextBlocks.forEach(richTextBlock=>{
    prepareRichTextForSearch(richTextBlock)
})

var searchBlocks = document.querySelectorAll(`.${customWrapperClass}`)

var slideUpAnimate = (el) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(30px)'
    anime({
        targets: el,
        opacity: 1,
        translateY: 0,
        duration: 500,
        easing: 'easeOutSine'
    })
}

searchInput.addEventListener('keyup', (e)=>{
    var searchQuery = e.target.value.toLowerCase();
    searchBlocks.forEach(searchBlock => {
        var headerTwo = searchBlock.querySelector('h2')
        if(headerTwo.innerText.toLowerCase().includes(searchQuery)) {
            searchBlock.style.display = ''
        } else {
            searchBlock.style.display = 'none'
        }
        slideUpAnimate(searchBlock)
    })
    richTextBlocks.forEach(richTextBlock => {
        var childSearchBlocks = richTextBlock.querySelectorAll(`.${customWrapperClass}`)
        var totalVisible = 0
        childSearchBlocks.forEach(childSearchBlock => {
            if(childSearchBlock.style.display !== 'none') {
                totalVisible += 1;
            }
        })
        var glossaryItem = richTextBlock.closest('.w-dyn-item')
        if(totalVisible) {
            glossaryItem.style.display = ''
        } else {
            glossaryItem.style.display = 'none'
        }
    })
})
