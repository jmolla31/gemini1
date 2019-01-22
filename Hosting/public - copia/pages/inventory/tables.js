const getAllUsersUrl = "https://us-central1-gemini1-48753.cloudfunctions.net/getAllUsers";

var tableData = null;

function httpGetAsync(url, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send(null);
}

var table = $('#maintable').DataTable({
  "bLengthChange": false,
  "ordering": false,
  "info": false,
  "columns": [
      { "data": "id" },
      { "data": "name" },
      { "data": "enabled"  }
    ]
});

httpGetAsync(getAllUsersUrl, data => {

  console.log(data);

  data = JSON.parse(data);

  this.table.rows.add(data).draw();
});







