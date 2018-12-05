const getItemCountUrl = "";
const getLastAddedItemsCountUrl = "";

function httpGetAync(url, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send(null);
}

//Get item count 
httpGetAsync(this.getItemCountUrl, itemCount => {

  console.log("Total item count: " + itemCount);

});


//Get items added last 30 days count 
httpGetAsync(this.getLastAddedItemsCountUrl, itemCount => {

  console.log("Items added last 30 days " + itemCount);

});