const getAllItemsUrl = "https://us-central1-gemini1-48753.cloudfunctions.net/getAllItems";
const getItemDetails = "https://us-central1-gemini1-48753.cloudfunctions.net/getItemDetails";
const getAllCategoriesUrl = "https://us-central1-gemini1-48753.cloudfunctions.net/getAllCategories";
const postItemUrl = "https://us-central1-gemini1-48753.cloudfunctions.net/postItem";

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

function filterSecondaries(category) {
  var empty = true;
  var sc = $("#secondaryCategory");
  sc.empty();
  secondaryCategoriesList.forEach(opt => {
    if (opt.parentCategory === category) {
      sc.append(new Option(opt.name, opt.name));
      empty = false;
    }
  });
  if (empty) sc.append(new Option("--", "--"));
};


//Load data for main table
Swal.fire({
  title: 'Carregant...'
})
swal.showLoading();

//Load all items
httpGetAsync(getAllItemsUrl, data => {
  data = JSON.parse(data);
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

document.getElementById("addItem").addEventListener("click", x => {
  //Hide create button, show save changes and set appropiate title to modal
  document.getElementById("btnCreate").hidden = false;
  document.getElementById("btnSave").hidden = true;
  document.getElementById("modal_title").innerText = "Crear nou item"

  var mc = $("#mainCategory");
  var sc = $("#secondaryCategory");
  mc.empty();
  sc.empty();
  mainCategoriesList.forEach(opt => { mc.append(new Option(opt.name, opt.name)) });
  secondaryCategoriesList.forEach(opt => { sc.append(new Option(opt.name, opt.name)) });


  document.getElementById("name").value = '';
  document.getElementById("description").value = '';
  document.getElementById("entryDate").value = new Date(Date.now()).toLocaleDateString();;
  document.getElementById("locked").checked = false;
});

document.getElementById("entryDate").value = new Date(Date.now()).toLocaleDateString();

document.getElementById("btnSave").addEventListener("click", x => {

  var mc = document.getElementById("mainCategory");
  var sc = document.getElementById("secondaryCategory");

  var saveItemObject = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    mainCategory: mc.options[mc.options.selectedIndex].value,
    secondaryCategory: (sc.options[sc.options.selectedIndex].value === undefined) ? sc.options[sc.options.selectedIndex].value : "",
    entryDate: document.getElementById("entryDate").value,
    locked: document.getElementById("locked").checked
  }
  console.log(saveItemObject);
});


document.getElementById("btnCreate").addEventListener("click", x => {

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

  Swal.fire({
    title: 'Creant nou item...'
  })
  swal.showLoading();

  httpPostAsync(postItemUrl, saveItemObject, x => {

    console.log("newdocument" + x);
    Swal.fire(
      'Pooh!',
      'Item creat correctament',
      'success'
    );
    $('#new-item-modal').modal('hide');
  });
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

    //Hide create button, show save changes and set appropiate title to modal
    document.getElementById("btnCreate").hidden = true;
    document.getElementById("btnSave").hidden = false;
    document.getElementById("modal_title").innerText = "Editar item";

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


