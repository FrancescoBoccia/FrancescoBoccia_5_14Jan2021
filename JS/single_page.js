"use strict";

const productImg = document.querySelector(".product__img");
const productName = document.querySelector(".product__name");
const productColor = document.querySelector(".product__colors-selection");
const productDetails = document.querySelector(".product__details");
const productPrice = document.querySelector(".product__price");

let cartDetails = JSON.parse(localStorage.getItem("cartDetails")) || [];
const productToLoad = window.location.href.split("=")["1"];
let getProductById = "";

// Call API and store response inside array. Display some results on UI
getData()
  .then(function (response) {
    getProductById = JSON.parse(response).find(
      (element) => element._id === productToLoad
    );
    // Load list only on Homepage
    loadProductPage(JSON.parse(response));
  })
  .catch(function (error) {
    console.error("Failed!", error);
  });

// Load product page with clicked item on homepage
function loadProductPage(apiData) {
  productName.textContent = getProductById.name;
  productDetails.textContent = getProductById.description;
  productPrice.textContent = `${getProductById.price / 100 + ",00 $"}`;
  productImg.setAttribute("src", `${getProductById.imageUrl}`);

  //   Colors Option
  let colorsOption = getProductById.colors;

  colorsOption.forEach((colors) => {
    let newColor = document.createElement("option");
    newColor.setAttribute("value", colors);
    newColor.textContent = colors;
    productColor.appendChild(newColor);
    // console.log(newColor);
  });
}
