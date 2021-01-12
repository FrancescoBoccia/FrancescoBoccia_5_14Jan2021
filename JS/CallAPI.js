// API call function
function getData() {
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/api/teddies");

    request.onload = function () {
      if (this.status == 200) {
        resolve(this.response);
      } else {
        reject(Error(this.statusText));
      }
    };
    request.send();
  });
}
