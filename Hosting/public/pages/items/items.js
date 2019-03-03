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

  console.log(itemObject);

});