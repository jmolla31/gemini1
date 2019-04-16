const getAllCategoriesUrl = "https://us-central1-gemini1-48753.cloudfunctions.net/getAllCategories";
const getCategoryDetailsUrl = "https://us-central1-gemini1-48753.cloudfunctions.net/getCategoryDetails";

//Load data for main table
Swal.fire({
  title: 'Carregant...'
})
swal.showLoading();

httpGetAsync(getAllCategoriesUrl, data => {
  data = JSON.parse(data);
  this.dataTable.rows.add(data).draw();
  swal.close();
});


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
});


var dataTable = $('#categoriesTable').DataTable({
  "bLengthChange": false,
  "ordering": false,
  "info": false,
  "columns": [
    { "data": "id" },
    { "data": "name" },
    { "data": "description" },
    { "data": "parentCategory" },
    {
      "data": null,
      "defaultContent": "<button>Editar</button>"
    }
  ]
});



$('#categoriesTable tbody').on('click', 'button', function () {
  var data = dataTable.row($(this).parents('tr')).data();

  Swal.fire({
    title: 'Carregant...'
  })
  swal.showLoading();

  var requestUrl = getCategoryDetailsUrl + '?docId=' + data.id

  httpGetAsync(requestUrl, data => {

    var itemDetails = JSON.parse(data);

    debugger;

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



