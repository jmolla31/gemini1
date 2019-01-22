exports.handler = function (req, res, database) {
 
    console.log("Function processed");

  database.collection('items').get().then(query => {

    var resArray = [];

    query.forEach( x => {

      var item = {

        id: x.id,
        name: x.data().name,
        description: x.data().description,
        entryDate: x.data().entryDate,
        locked: x.data().locked,
        mainCategory: x.data().mainCategory,
        secondaryCategory: x.data().secondaryCategory

      };

      var duh = item.id;

      resArray.push(item);
    });


    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).send(resArray);

  });
  
}