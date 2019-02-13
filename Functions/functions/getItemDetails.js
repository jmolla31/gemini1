exports.handler = function (req, res, database, cors) {

  cors(req, res, () => {
    console.log("Function processed");
  })

  var docId = req.query.docId;

  if (!docId) res.status(500).send("Error, invalid or undefined docId");


  database.doc('items/' + docId).get().then(x => {

    var item = {

      id: x.id,
      name: x.data().name,
      description: x.data().description,
      entryDate: x.data().entryDate,
      locked: x.data().locked,
      mainCategory: x.data().mainCategory,
      secondaryCategory: x.data().secondaryCategory

    };

    res.status(200).send(JSON.stringify(item));
  },
    error => {
      res.status(500).send(JSON.stringify(error));
    });
}