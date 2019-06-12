exports.handler = function (req, res, database) {

    database.collection('activitiees').get().then(query => {
  
      var resArray = [];
  
      query.forEach(x => {
  
        var item = {
          id: x.id,
          name: x.data().name,
          type: x.data().type,
          description: x.data().description,
          date: x.data().date,
        };
  
        resArray.push(item);
      });
  
  
      res.set('Access-Control-Allow-Origin', '*');
      res.status(200).send(resArray);
  
    });
  
  }