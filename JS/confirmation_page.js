const confirmationPrice = document.querySelector(".confirmation__price span");
const confirmationId = document.querySelector(".confirmation__id span");

confirmationPrice.textContent = localStorage.getItem("totalCost") + "$";
confirmationId.textContent = localStorage.getItem("orderId");

// localStorage.clear();