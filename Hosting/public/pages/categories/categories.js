const getAllCategoriesUrl = "https://us-central1-gemini1-48753.cloudfunctions.net/getAllCategories";

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

document.getElementById("entryDate").value = new Date(Date.now()).toLocaleDateString();

document.getElementById("btnSave").addEventListener("click", x => {

  console.log("duh!");

  var mc = document.getElementById("mainCategory");
  var sc = document.getElementById("secondaryCategory");

  var itemObject = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    mainCategory: mc.options[mc.options.selectedIndex].value,
    secondaryCategory: sc.options[sc.options.selectedIndex].value,
    entryDate: document.getElementById("entryDate").value,
    locked: document.getElementById("locked").checked
  }

  // Swal.fire({
  //   type: 'success',
  //   title: 'Pooh!',
  //   text: 'Item guardat a la base de dades!',
  // });

  // Swal.fire({
  //   type: 'error',
  //   title: 'Ups!',
  //   text: 'Error: {errorVariablePlaceholder}',
  // })
  //TODO: Post item to firebase!

  console.log(itemObject);

});


var dataTable = $('#itemsTable').DataTable({
  "bLengthChange": false,
  "ordering": false,
  "info": false,
  "columns": [
    { "data": "id" },
    { "data": "name" },
    { "data": "description" },
    { "data": "mainCategory" },
    { "data": "secondaryCategory" },
    { "data": "entryDate" },
  ]
});

httpGetAsync(getAllItemsUrl, data => {

  data = JSON.parse(data);
  console.log(data);

  this.dataTable.rows.add(data).draw();
});


