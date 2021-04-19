"use script";

const productsContainer = document.querySelector(".products__container");

// Call API
getData()
  .then(function (response) {
    // Load list only on Homepage
    displayList(JSON.parse(response));
  })
  .catch(function (error) {
    console.error("Failed!", error);
  });

// Display list of items on homepage
function displayList(apiData) {
  apiData.forEach((item) => {
    let linkEl = document.createElement("a");
    linkEl.setAttribute("href", `product_page.html?id=${item._id}`);
    linkEl.classList.add("product__container");
    linkEl.innerHTML = `
    <div class="collection__container">

    <div class="collection__box" id="Teddy__Products">
        <div class="collection__data">
            <h2 class="collection__title"><span class="collection__subtitle">Teddy<br></span>${item.name}</h2>
            <div class="new__box">
                <img src="${item.imageUrl}" alt="" class="collection__img">
                <div class="new__link">
                    <a  class="button view__product">VIEW PRODUCT</a>
                </div>
            </div>
        </div>
    </div>`;

    productsContainer.appendChild(linkEl);
  });
}
