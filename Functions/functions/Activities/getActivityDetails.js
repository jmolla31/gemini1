exports.handler = function (req, res, database) {

    console.log("Function processed");
    res.set('Access-Control-Allow-Origin', '*');
  
    var docId = req.query.docId;
  
    if (!docId) res.status(500).send("Error, invalid or undefined docId");
  
  
    database.doc('activities/' + docId).get().then(x => {
  
      var item = {
        id: x.id,
        name: x.data().name,
        type: x.data().type,
        date: x.data().date,
        description = x.data().description
      };
  
      res.status(200).send(JSON.stringify(item));
    },
      error => {
        res.status(500).send(JSON.stringify(error));
      });
  }