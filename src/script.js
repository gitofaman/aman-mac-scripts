var pb = 'product-btn'
var ps = 'products'
var p = 'product'

var productBtns = document.querySelectorAll(`[${pb}]`)
var productBlocks = document.querySelectorAll(`[${ps}]`)
var products = document.querySelectorAll(`[${p}]`)

var getOtherIndex = (i) => {
  var otherIndex;
  if(i===0) {
    otherIndex = 1
  } else {
    otherIndex = 0
  }
  return otherIndex;
}

var makeProductActive = (i) => {
  var otherIndex = getOtherIndex(i);
  productBlocks[otherIndex].remove()
  productBtns[i].remove()
}

var url = new URLSearchParams(window.location.search);

var productIndex = url.get('product-index')

if(!productIndex) { //if product index is not present
  productIndex = 0
} else {
  productIndex = parseInt(productIndex)
}
makeProductActive(productIndex)

document.querySelector(`[${pb}]`).addEventListener('click', ()=>{
  var link = window.location.origin + window.location.pathname + `?product-index=${getOtherIndex(productIndex)}`
  window.location.href = link;
})


