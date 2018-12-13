exports.handler = function (req, res, database,cors) {

  const momentjs = require('moment');

  cors(req,res, ()=> {
    console.log("Function processed");
  })

  var compareDate = momentjs().subtract(30, 'days');

 database.collection('items').get().then(query => {

    var count = 0;

    query.forEach( item => {
      
      var itemDate = momentjs(item.data().entryDate);

      if (momentjs(itemDate).isSameOrAfter(compareDate)) count++

    });

    res.status(200).send(count.toString());
  });
}