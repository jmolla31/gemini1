exports.handler = function (req, res, database) {
 
  database.collection('users').get().then(query => {
    var output = [];
    query.forEach(doc => output.push(
      {
        id: doc.id,
        name: doc.data().name,
        enabled: doc.data().enabled
      }
    ));
    res.send(200, output);
  });
  
}