// Dom Variable
const shopItemButtons = document.querySelectorAll(".shop-item-button");
const cartItems = document.querySelector(".cart-items");
const purchaseButton = document.querySelector(".btn-purchase");


if (shopItemButtons.length > 0) {
  shopItemButtons.forEach(function (singleShopButton) {
    singleShopButton.addEventListener("click", addToCart);
  });
}

function addToCart(event) {
  event.preventDefault();
  const currentElement = event.target;
  const storeItem = currentElement.parentElement.parentElement;
  const shopItemTitle = storeItem.querySelector(".shop-item-title");
  const shopItemImage = storeItem.querySelector(".shop-item-image");
  const shopItemPrice = storeItem.querySelector(".shop-item-price");


  // console.log(shopItem, " STORE ITEM")

  const title = shopItemTitle.innerText;
  const imageUrl = shopItemImage.src;
  const price = shopItemPrice.innerText;

  // console.log(title);
  // console.log(imageUrl);
  // console.log(price);

  // if already exist
  const cartItemsNames = document.querySelectorAll(".cart-item-title");
  if (cartItemsNames.length > 0) {
    for (let index = 0; index < cartItemsNames.length; index++) {
      const cartName = cartItemsNames[index].innerText;
      if (cartName == title) {
        alert("this item is already exist in cart item");
        return;

      }
    }
  }
  // exict end


  addItemToCart(imageUrl, title, price);

  bindAllDeleteButtons();

  updateCartTotal();
  
  bindEventOnQuantity();

}

function addItemToCart(imageUrl, title, price) {
  const create = document.createElement("div");
  create.classList.add("cart-row");
  create.classList.add("cart-items-row");
  const createContent =
    `
  <div class="cart-item cart-column">
  <img class="cart-item-image" src="${imageUrl}" width="100" height="100">
  <span class="cart-item-title">${title}</span>
  </div>
    <span class=" cart-column">$ <span class="cart-price-item-item">${price}</span></span>
    <div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1">
    <button class="btn btn-danger btn-remove" type="button">REMOVE</button>
    </div>`;

  create.innerHTML = createContent;
  cartItems.append(create);

}


function bindAllDeleteButtons() {

  const removeButton = document.querySelectorAll(".btn-remove");
  console.log(removeButton, "work")
  if (removeButton.length > 0) {
    removeButton.forEach(function (singleRemoveButtton) {
      singleRemoveButtton.addEventListener("click", removeButtonInCart)
    });
  }
}

function removeButtonInCart(event) {
  const currentElement = event.target;
  const cartRow = currentElement.parentElement.parentElement;
  if (confirm("are you sure")) {
    cartRow.remove();
    updateCartTotal();
  }
}

function updateCartTotal() {
  const cartItemsRows = document.querySelectorAll(".cart-items-row");
  let total = 0;
  if (cartItemsRows.length > 0) {
    cartItemsRows.forEach(function (singleRowItem) {
      const PriceElement = singleRowItem.querySelector(".cart-price-item-item");
      const quantityElement = singleRowItem.querySelector(".cart-quantity-input");
      const price = parseFloat(PriceElement.innerText);
      const quanity = quantityElement.value;
      total = total + (price * quanity);

    })
   }
   total = Math.round(total * 100) /100
   const priceTotalElement = document.querySelector(".cart-total-price");
   priceTotalElement.innerText = '$' + total;
}

function bindEventOnQuantity(){
  const cartQuantityElement = document.querySelectorAll(".cart-quantity-input");
  if(cartQuantityElement.length > 0){
    cartQuantityElement.forEach(function (singleQuantityElement){
      singleQuantityElement.addEventListener("change", quantityChangeHandler);
    });
  }
 
}

function quantityChangeHandler(event){
  event.preventDefault();
const currentInputElement = event.target
if (currentInputElement.value <= 0) {
  currentInputElement.value = 1;
}
updateCartTotal();
}

purchaseButton.addEventListener("click", purchaseHandler);

function purchaseHandler(event){
event.preventDefault();

if(confirm("purchase Complete")){
  cartItems.innerHTML = "";
  updateCartTotal();
}

}
 



