"use script";

/* SHOW MENU */

const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};

showMenu("nav-toggle", "nav-menu");

/* REMOVE MENU MOBILE */

const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  // Active Link
  navLink.forEach((n) => n.classList.remove("active"));
  this.classList.add("active");

  // Remove Menu Mobile
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show");
}

navLink.forEach((n) => n.addEventListener("click", linkAction));

/* CART */

// ADD Cart Button

let carts = document.querySelectorAll(".add__product"); // Add cart button

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers();
    totalCost();
  });
}

function onLoadCartNumber() {
  // Number of products stay the same
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

// Add numbers of products to cart number
function cartNumbers(products) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart span").textContent = 1;
  }

  updateCart();
}

// Set items inside local storage
let cartItems = JSON.parse(localStorage.getItem("productsInCart")) || [];
const productToLoad = window.location.href.split("=")["1"];
let getProductById = "";

function updateCart() {
  let item = {
    name: getProductById.name,
    _id: getProductById._id,
    price: getProductById.price,
    imgUrl: `${getProductById.imageUrl}`,
  };

  cartItems.push(item);
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(productPrice) {
  let cartCost = localStorage.getItem("totalCost");
  let totalPrice = getProductById.price / 100;
  // console.log(totalPrice);

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    // console.log(cartCost / 100);
    localStorage.setItem("totalCost", cartCost + totalPrice);
  } else {
    localStorage.setItem("totalCost", totalPrice);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem("totalCost");

  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
      <div class="product__JS">
        <i class='bx bxs-x-circle'></i>
        <img src="${item.imgUrl}" width= 200>
        <span class = "item__name">${item.name}</span>
        <div class = "price">$${item.price / 100},00</div>
        <div class = "total__cart"> $${item.price / 100},00</div>
        </div>
        `;
    });

    productContainer.innerHTML += `
      <div class = "basketTotalContainer">
        <h4 class = "totalTitle">Basket Total</h4>
        <h4 class = "basketTotal"> $${cartCost},00</h4>
      </div>
    `;
  }
}

onLoadCartNumber(); // Number of products is the same even if refreshed
displayCart(); // Run this function straight away
