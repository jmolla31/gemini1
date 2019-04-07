const getAllItemsUrl = "https://us-central1-gemini1-48753.cloudfunctions.net/getAllItems";
const getItemDetails = "https://us-central1-gemini1-48753.cloudfunctions.net/getItemDetails";
const getAllCategoriesUrl = "https://us-central1-gemini1-48753.cloudfunctions.net/getAllCategories";

var mainCategoriesList = [];
var secondaryCategoriesList = [];

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

function filterSecondaries(category) {

  var sc = $("#secondaryCategory");
  sc.empty();
  secondaryCategoriesList.forEach(opt => {
    if (opt.parentCategory === category) sc.append(new Option(opt.name, opt.name))
  });
};


//Load data for main table
Swal.fire({
  title: 'Carregant...'
})
swal.showLoading();

//Load all items
httpGetAsync(getAllItemsUrl, data => {

  data = JSON.parse(data);
  console.log(data);

  this.dataTable.rows.add(data).draw();

  swal.close();
});

//Load category list and map to arrays
httpGetAsync(getAllCategoriesUrl, data => {

  var dataList = JSON.parse(data);
  mainCategoriesList = dataList.filter(x => x.main === true);
  secondaryCategoriesList = dataList.filter(x => x.main === false);

});

document.getElementById("mainCategory").addEventListener("change", x => {

  var element = document.getElementById("mainCategory");
  filterSecondaries(element.value);

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

    var mc = $("#mainCategory");
    var sc = $("#secondaryCategory");

    mc.empty();
    sc.empty();

    mainCategoriesList.forEach(opt => { mc.append(new Option(opt.name, opt.name)) });
    secondaryCategoriesList.forEach(opt => { sc.append(new Option(opt.name, opt.name)) });

    mc.val(itemDetails.mainCategory).change();
    sc.val(itemDetails.secondaryCategory).change();

    document.getElementById("name").value = itemDetails.name;
    document.getElementById("description").value = itemDetails.description;

    document.getElementById("entryDate").value = itemDetails.entryDate;
    document.getElementById("locked").checked = itemDetails.locked;

    swal.close();

    $('#new-item-modal').modal();
  })
});


