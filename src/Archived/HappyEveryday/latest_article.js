
var products,
  orders,
  block,
  productList,
  blocks,
  popUpBtn,
  productItems,
  editBtn,
  popUpCloseArea;

var startPopup = setInterval(() => {
  var orderName = document.querySelector(
    ".order-item .order-item-name"
  ).innerText;
  if (orderName.length) {
    initiatePopup();
    clearInterval(startPopup);
  }
}, 100);

var popUp = document.querySelector(".personalization--cover");


popUp.style.display = "none";

function initiatePopup() {
    popUpCloseArea = document.querySelector('.popup--close-area')
    popUpCloseArea.addEventListener('click', closePopup)
  products = [];
  openPopup();
  //to collect the added products to show in pop up

  orders = document.querySelectorAll(".order-item");
  orders.forEach((order) => {
    var imageSrc = order
      .querySelector(".order-item-thumbnail")
      .getAttribute("src");
    var name = order.querySelector(".order-item-name").innerText;
    var price = order.querySelector(".order-item-price").innerText;
    var thisProduct = {
      name: name,
      price: price,
      imageSrc: imageSrc,
    };
    products.push(thisProduct);
  });

  //creating element based on the products
  block = document.querySelector(".product--item");
  productList = document.querySelector(".product--list");
  for (i = 0; i < products.length - 1; i++) {
    var clonedBlock = block.cloneNode(true);
    productList.appendChild(clonedBlock);
  }
  blocks = document.querySelectorAll(".product--item");

  for (i = 0; i < products.length; i++) {
    blocks[i].querySelector(".order--image").removeAttribute("src");
    blocks[i].querySelector(".order--image").removeAttribute("srcset");
    blocks[i]
      .querySelector(".order--image")
      .setAttribute("src", products[i].imageSrc);
    blocks[i].querySelector(".product--item-name").innerText = products[i].name;
    blocks[i].querySelector(".product--item-price").innerText =
      products[i].price;
  }

  //to collect the value from the pop up and add it to note and update visible data
  popUpBtn = document.querySelector(".is--pop-up-btn");
  productItems = document.querySelectorAll(".product--item");
  popUpBtn.addEventListener("click", () => {
    var input = "";
    productItems.forEach((item) => {
      var inputValue = item.querySelector(".personalization--field").value;
      var name = item.querySelector(".product--item-name").innerText;
      var thisProductIndex = products.findIndex((product) => {
        return product.name === name;
      });
      if (inputValue.length) {
        products[thisProductIndex].personalization = inputValue;
        input = input + " [ " + name + " : " + inputValue + " ]\n";
      } else {
        delete products[thisProductIndex].personalization;
      }
    });
    document.getElementById("note").value = input;
    closePopup()
  });

  //to update the personalization data in order items
  function updateVisibleData() {
    var visibleOrderedItems = document.querySelectorAll(".order-item");
    visibleOrderedItems.forEach((order) => {
      var productName = order.querySelector(".order-item-name").innerText;

      var thisProductIndex = products.findIndex((product) => {
        return product.name === productName;
      });

      var thisProduct = products[thisProductIndex];
      if ("personalization" in thisProduct) {
        order.querySelector(".ps--grid").style.display = "grid";
        order.querySelector(".personalization--txt").innerText =
          thisProduct.personalization;
      } else {
        order.querySelector(".ps--grid").style.display = "none";
      }
    });
  }

  editBtn = document.getElementById('editbtn');
  editBtn.addEventListener("click", openPopup);
  function openPopup() {
    popUp.style.display = "none";
    popUp.style.opacity = "0";
    popUp.style.display = "flex";
    setTimeout(()=>{
        popUp.style.opacity = "1";
    }, 100) 
  }
  function closePopup() {
    popUp.style.display = "flex";
    popUp.style.opacity = "1";
    popUp.style.opacity = "0";
    setTimeout(()=>{
        popUp.style.display = "none";
    }, 550) 
    updateVisibleData();
  }

}