const getAllItemsUrl = "https://us-central1-gemini1-48753.cloudfunctions.net/getAllItems";
const getItemDetails = "https://us-central1-gemini1-48753.cloudfunctions.net/getItemDetails";
const getAllCategoriesUrl = "https://us-central1-gemini1-48753.cloudfunctions.net/getAllCategories";
const addItemUrl = "https://us-central1-gemini1-48753.cloudfunctions.net/addItem";
const updateItemUrl = "https://us-central1-gemini1-48753.cloudfunctions.net/updateItem";
const deleteItemUrl = "https://us-central1-gemini1-48753.cloudfunctions.net/deleteItem";
const getCategoryDetailsUrl = "https://us-central1-gemini1-48753.cloudfunctions.net/getCategoryDetails";
const addCategoryUrl = "https://us-central1-gemini1-48753.cloudfunctions.net/addCategory";
const updateCategoryUrl = "https://us-central1-gemini1-48753.cloudfunctions.net/updateCategory";
const deleteCategoryUrl = "https://us-central1-gemini1-48753.cloudfunctions.net/deleteCategory";



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

  function httpDeleteAsync(url, callback) {
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
    xmlHttp.open("DELETE", url, true); // true for asynchronous 
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

  function httpPutAsync(url, data, callback) {
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
    xmlHttp.open("PUT", url, true); // true for asynchronous 
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify(data));
  }