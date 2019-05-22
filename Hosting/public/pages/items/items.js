var mainCategoriesList = [];
var secondaryCategoriesList = [];


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

function updateDatatableRows(firstStart) {
  dataTable.clear().draw();
  //Load all items
  httpGetAsync(getAllItemsUrl, data => {
    data = JSON.parse(data);
    dataTable.rows.add(data).draw();
    if (firstStart) swal.close();
  });
}

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
    { "data": "entryDate" },
    {
      "data": null,
      "defaultContent": '<button type="button" class="btn btn-primary btnRowEdit">Editar</button> <button type="button" id="btnDelete" class="btn btn-danger btnRowDelete">Eliminar</button>'
    }
  ],
  "language": {
    "paginate": {
      "previous": "<--",
      "next": "-->"
    },
    "search": "Buscar"
  }
});


//Load data for main table
Swal.fire({
  title: 'Carregant...'
})
swal.showLoading();

updateDatatableRows(true);




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
  document.getElementById("entryDate").value = new Date(Date.now()).toLocaleDateString();
  document.getElementById("locked").checked = false;
});

document.getElementById("entryDate").value = new Date(Date.now()).toLocaleDateString();

// document.getElementById("btnDelete").addEventListener("click", x=> {




// })

document.getElementById("btnSave").addEventListener("click", x => {

  var mc = document.getElementById("mainCategory");
  var sc = document.getElementById("secondaryCategory");

  var updateItemObject = {
    id: document.getElementById("itemId").value,
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    mainCategory: mc.options[mc.options.selectedIndex].value,
    secondaryCategory: (sc.options[sc.options.selectedIndex] === undefined) ? "" : sc.options[sc.options.selectedIndex].value,
    entryDate: document.getElementById("entryDate").value,
    locked: document.getElementById("locked").checked
  }

  Swal.fire({
    title: 'Actualitzant item...'
  })
  swal.showLoading();

  httpPutAsync(updateItemUrl, updateItemObject, x => {
    Swal.fire(
      'Pooh!',
      'Item actualitzat correctament',
      'success'
    );

    this.updateDatatableRows(false);
  })

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

  httpPostAsync(addItemUrl, saveItemObject, x => {

    console.log("newdocument" + x);
    Swal.fire(
      'Pooh!',
      'Item creat correctament',
      'success'
    );
    updateDatatableRows(false);
    $('#new-item-modal').modal('hide');
  });
});



$('#itemsTable tbody').on('click', 'button.btnRowEdit', function () {
  var data = dataTable.row($(this).parents('tr')).data();

  Swal.fire({
    title: 'Carregant...'
  })
  swal.showLoading();

  var requestUrl = getItemDetails + '?docId=' + data.id

  document.getElementById("itemId").value = data.id;

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



$('#itemsTable tbody').on('click', 'button.btnRowDelete', function () {
  var data = dataTable.row($(this).parents('tr')).data();

  Swal.fire({
    title: 'Borrar item?',
    text: data.name,
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si!'
  }).then(() => {
    var requestUrl = getItemDetails + '?docId=' + data.id

    httpDeleteAsync(deleteItemUrl, x => {
      Swal.fire(
        'Pooh!',
        'Item borrat correctament.',
        'success'
      )
      updateDatatableRows(false);
    });
  })
});

