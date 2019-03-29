const getAllItemsUrl = "https://us-central1-gemini1-48753.cloudfunctions.net/getAllItems";
const getItemDetails = "https://us-central1-gemini1-48753.cloudfunctions.net/getItemDetails";

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


//Load data for main table
Swal.fire({
  title: 'Carregant...'
})
swal.showLoading();

httpGetAsync(getAllItemsUrl, data => {

  data = JSON.parse(data);
  console.log(data);

  this.dataTable.rows.add(data).draw();

  swal.close();
});


document.getElementById("entryDate").value = new Date(Date.now()).toLocaleDateString();

document.getElementById("btnSave").addEventListener("click", x => {

  var mc = document.getElementById("mainCategory");
  var sc = document.getElementById("secondaryCategory");

  var saveItemObject = {
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

  console.log(saveItemObject);

});


var dataTable = $('#itemsTable').DataTable({
  "bLengthChange": false,
  "ordering": false,
  "info": false,
  "columns": [
    {
      "data": "id",
      "visible": false
    },
    { "data": "name" },
    { "data": "description" },
    { "data": "mainCategory" },
    { "data": "secondaryCategory" },
    { "data": "entryDate" }
    ,
    {
      "data": null,
      "defaultContent": "<button>Editar</button>"
    }
  ]
});


$('#itemsTable tbody').on('click', 'button', function () {
  var data = dataTable.row($(this).parents('tr')).data();

  Swal.fire({
    title: 'Carregant...'
  })
  swal.showLoading();

  var requestUrl = getItemDetails + '?docId=' + data.id

  httpGetAsync(requestUrl, data => {

    var itemDetails = JSON.parse(data);

    document.getElementById("name").value = itemDetails.name;
    document.getElementById("description").value = itemDetails.description;
    //mainCategory: mc.options[mc.options.selectedIndex].value,
    //secondaryCategory: sc.options[sc.options.selectedIndex].value,
    document.getElementById("entryDate").value = itemDetails.entryDate;
    document.getElementById("locked").checked = itemDetails.locked;

    swal.close();

    $('#new-item-modal').modal();
  })
});


