const getAllItemsUrl = "https://us-central1-gemini1-48753.cloudfunctions.net/getAllItems";
const getItemCount = "https://us-central1-gemini1-48753.cloudfunctions.net/getItemCount";
const getCategoryCount = "https://us-central1-gemini1-48753.cloudfunctions.net/getCategoryCount";
const getLoanCount = "https://us-central1-gemini1-48753.cloudfunctions.net/getLoanCount";
const getTicketCount = "https://us-central1-gemini1-48753.cloudfunctions.net/getTicketCount";

//const Swal = require('sweetalert2');


function httpGetAsync(url, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  }
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.send(null);
}

httpGetAsync(getAllItemsUrl, data => {

  data = JSON.parse(data);

  console.log(data);


  var tableRef = document.getElementById('itemsTable').getElementsByTagName('tbody')[0];

  var loop = 1;

  data.forEach(x => {

    var newRow = tableRef.insertRow(tableRef.rows.length);
    var countCell = newRow.insertCell(0);
    countCell.innerHTML = loop; loop++;

    var nameCell = newRow.insertCell(1);
    nameCell.innerHTML = x.name;

    var descriptionCell = newRow.insertCell(2);
    descriptionCell.innerHTML = x.description;

    var categoryCell = newRow.insertCell(3);
    categoryCell.innerHTML = x.mainCategory;

    var sCategoryCell = newRow.insertCell(4);
    sCategoryCell.innerHTML = x.secondaryCategory;

    var dateCell = newRow.insertCell(5);
    dateCell.innerHTML = x.entryDate;

  });
});

httpGetAsync(getItemCount, itemCount => {

  var htmlItem = document.getElementById("totalitems");

  htmlItem.innerHTML = itemCount;

});


httpGetAsync(getCategoryCount, categoryCount => {

  var htmlItem = document.getElementById("totalcategories");

  htmlItem.innerHTML = categoryCount;

});

document.getElementById("search").addEventListener("click", x => {

  Swal(
    'The Internet?',
    'That thing is still around?',
    'question'
  )

  var text = document.getElementById("searchtext").value;

  console.log("Searching for: " + text);

});