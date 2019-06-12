exports.handler = function (res, database) {

    database.collection('activities').get().then(query => {
  
      var resArray = [];
  
      query.forEach(x => {
  
        var item = {
          id: x.id,
          name: x.data().name,
          type: x.data().type,
          date: x.data().date,
        };
  
        resArray.push(item);
      });
  
  
      res.set('Access-Control-Allow-Origin', '*');
      res.status(200).send(resArray);
  
    });
  }