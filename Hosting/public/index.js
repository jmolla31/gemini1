const getItemCountUrl = "https://us-central1-gemini1-48753.cloudfunctions.net/getItemCount";
const getLastItemsCountUrl = "https://us-central1-gemini1-48753.cloudfunctions.net/getLastItemsCount";

var httpService = new HttpClient();

window.setInterval(function () {
  //Get items added last 30 days count 
  httpService.get(getLastItemsCountUrl, itemCount => {

    document.getElementById('lastItems').innerHTML = (itemCount.toString() + " items afegits aquest mes.")

  });
}, 2000)


window.setInterval(function () {
  //Get item count 
  httpService.get(getItemCountUrl, itemCount => {

    document.getElementById('totalItems').innerHTML = itemCount.toString();

  });
}, 2000)