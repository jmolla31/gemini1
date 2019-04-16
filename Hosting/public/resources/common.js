const getAllItemsUrl = "https://us-central1-gemini1-48753.cloudfunctions.net/getAllItems";
const getItemDetails = "https://us-central1-gemini1-48753.cloudfunctions.net/getItemDetails";
const getAllCategoriesUrl = "https://us-central1-gemini1-48753.cloudfunctions.net/getAllCategories";
const postItemUrl = "https://us-central1-gemini1-48753.cloudfunctions.net/postItem";



function httpGetAsync(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) {
          callback(xmlHttp.responseText);
        }
        else {
          Swal.fire({
            type: 'error',
            title: 'Ups!',
            text: 'Error, no es pot conectar al servei de dades.',
          })
        }
      }
    }
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send(null);
  }
  
  function httpPostAsync(url, data, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) {
          callback(xmlHttp.responseText);
        }
        else {
          Swal.fire({
            type: 'error',
            title: 'Ups!',
            text: 'Error, catapluf!.',
          })
        }
      }
    }
    xmlHttp.open("POST", url, true); // true for asynchronous 
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify(data));
  }