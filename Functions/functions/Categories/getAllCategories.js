exports.handler = function (req, res, database) {

  console.log("Function processed");

  database.collection('categories').get().then(query => {

    var resArray = [];

    query.forEach(x => {

      var item = {
        id: x.id,
        name: x.data().name,
        description: x.data().description,
        locked: x.data().locked,
        parentCategory: x.data().parentCategory,
		main: x.data().main
      };

      resArray.push(item);
    });


    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).send(resArray);

  });

}