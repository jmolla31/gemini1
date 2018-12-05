exports.handler = function (req, res, database,cors) {
 
  cors(req,res, ()=> {
    console.log("Function processed");
  })

  var today = new Date();

  database.collection('items').where("entryDate").get().then(query => {

    var count = 0;

    query.forEach( x => count++);

    res.status(200).send(count.toString());

  });
  
}