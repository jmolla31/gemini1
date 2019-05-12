var parentCategoryList = [];


function filterParents(category) {
  var pc = $("#parentCategory");
  pc.empty();
  parentCategoryList.forEach(x => {
    if (x.main === true && x.name != category.name) {
      pc.append(new Option(x.name, x.name));
    }
  });
};

//Load data for main table
Swal.fire({
  title: 'Carregant...'
})
swal.showLoading();


var dataTable = $('#categoriesTable').DataTable({
  "bLengthChange": false,
  "ordering": false,
  "info": false,
  "columns": [
    { "data": "name" },
    { "data": "description" },
    { "data": "parentCategory" },
    {
      "data": null,
      "defaultContent": "<button>Editar</button>"
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


httpGetAsync(getAllCategoriesUrl, data => {
  data = JSON.parse(data);
  parentCategoryList = data;
  this.dataTable.rows.add(data).draw();
  swal.close();
});

document.getElementById('main').addEventListener('change', (event) => {

  if (event.target.checked) {
    document.getElementById("parentCategory").disabled = true;
  } else {
    document.getElementById("parentCategory").disabled = false;
  }
})

document.getElementById("btnSave").addEventListener("click", x => {

  var pc = document.getElementById("parentCategory");

  var categoryObject = {
    id: document.getElementById("categoryId").value,
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    parentCategory: pc.options[pc.options.selectedIndex].value,
    main: document.getElementById("main").checked,
    locked: false
  }

  if (categoryObject.main) categoryObject.parentCategory = "--";

  httpPutAsync(updateCategoryUrl, categoryObject, x => {
    Swal.fire(
      'Pooh!',
      'Categoria actualitzada correctament',
      'success'
    )
  });
});


document.getElementById("btnCreate").addEventListener("click", x => {

  debugger;

  var pc = document.getElementById("parentCategory");

  var categoryObject = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    parentCategory: pc.options[pc.options.selectedIndex].value,
    main: document.getElementById("main").checked,
    locked: false
  }

  if (categoryObject.main) categoryObject.parentCategory = "--";

  Swal.fire({
    title: 'Creant nova categeoria...'
  })
  swal.showLoading();

  httpPostAsync(addCategoryUrl, saveItemObject, x => {

    console.log("newdocument" + x);
    Swal.fire(
      'Pooh!',
      'Categoria creada correctament',
      'success'
    ).then(x => { setTimeout(function () { location.reload(); }, 2000); })
    $('#new-item-modal').modal('hide');
  });
});


document.getElementById("addCategory").addEventListener("click", x => {

  filterParents("DUH");

  document.getElementById("btnCreate").hidden = false;
  document.getElementById("btnSave").hidden = true;
  document.getElementById("modal-title").innerText = "Afegir categoria"

  document.getElementById("name").value = '';
  document.getElementById("description").value = '';
  document.getElementById("main").checked = false;
  document.getElementById("parentCategory").disabled = false;

  $('#category-modal').modal();
});


$('#categoriesTable tbody').on('click', 'button', function () {
  var data = dataTable.row($(this).parents('tr')).data();

  document.getElementById("btnCreate").hidden = true;
  document.getElementById("btnSave").hidden = false;
  document.getElementById("modal-title").innerText = "Editar categoria"

  Swal.fire({
    title: 'Carregant...'
  })
  swal.showLoading();

  var requestUrl = getCategoryDetailsUrl + '?docId=' + data.id

  document.getElementById("categoryId").value = data.id;

  httpGetAsync(requestUrl, data => {

    var categoryDetails = JSON.parse(data);

    if (categoryDetails.main === true) {
      document.getElementById("parentCategory").disabled = true;
    }
    else {
      document.getElementById("parentCategory").disabled = false;
    }


    filterParents(categoryDetails.name);

    document.getElementById("name").value = categoryDetails.name;
    document.getElementById("description").value = categoryDetails.description;
    document.getElementById("main").checked = categoryDetails.main;

    swal.close();

    $('#category-modal').modal();
  })
});



