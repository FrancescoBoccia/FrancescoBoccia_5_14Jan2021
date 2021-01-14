// Validation Order

const myForm = document.getElementById("form");
const allFormControls = document.querySelectorAll(".form-data");
const InputsData = document.querySelectorAll(".input-data");
const firstName = document.getElementById("first__name");
const lastName = document.getElementById("last__name");
const addressStreet = document.getElementById("address");
const addressCity = document.getElementById("city");
const email = document.getElementById("email");
const btnValidation = document.querySelector(".form__validate-btn");

// Display error message and red outline input
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-data error";
}

// Display Green Outline Input
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-data success";
}

// Check E-mail is valid
function checkEmail(input) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regex.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "E-mail invalide");
  }
}

// Check Required Fields
function checkRequired(inputArray) {
  inputArray.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, "This section is mandatory");
    } else {
      showSuccess(input);
    }
  });
}

// Check Inputs when Form is Submitted

btnValidation.addEventListener("click", function (e) {
  e.preventDefault();

  checkRequired([firstName, lastName, addressStreet, addressCity]);
  checkEmail(email);

  checkAllFields();
});

// Check all fields. If valid POST request
function checkAllFields() {
  let checkedCount = 0;

  allFormControls.forEach((item) => {
    if (item.classList.contains("success")) {
      checkedCount += 1;
    }
  });

  if (checkedCount == 5) {
    formatRequestData();
  } else {
    window.scrollTo(0, 455);
  }
}

// Format data before POST
let contact = {};
let contactData = {};
let postRequest = {};

function formatRequestData() {
  InputsData.forEach((input) => {
    contactData[input.id] = input.value;
    contact = {
      firstName: contactData.first__name,
      lastName: contactData.last__name,
      address: contactData.address,
      city: contactData.city,
      email: contactData.email,
    };
  });

  // Product_id formatting
  let productsObject = localStorage.getItem("productsInCart");
  let products = [];
  Array.prototype.forEach.call (productsObject, item => {
    products.push(item);
  });
  postRequest = { contact, products };
  console.log(postRequest);
  postData();
}

// POST request function
function postData() {
  var req = new XMLHttpRequest();
  req.open("POST", "http://localhost:3000/api/teddies");
  req.setRequestHeader("Content-Type", "application/json");
  req.send(JSON.stringify(postRequest));

  req.onreadystatechange = (e) => {
    if (req.readyState > 3 && req.status == 201) {
      let response = JSON.parse(req.response);
      localStorage.setItem("orderId", response.orderId);
      window.location.href = "confirmation_page.html";
    }
  };
}
