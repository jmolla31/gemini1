exports.handler = function (req, res, database) {

    console.log("Function processed");
    
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    // Send response to OPTIONS requests and terminate the function execution
    if (req.method == 'OPTIONS') {
      res.status(200).send('');
    }
    
    
    let recievedBody = req.body;
    console.log(recievedBody);

    database.collection('items').add({

        name: recievedBody.name,
        description: recievedBody.description,
        mainCategory: recievedBody.mainCategory,
        secondaryCategory: recievedBody.secondaryCategory,
        entryDate: recievedBody.entryDate,
        locked: recievedBody.locked
    })
    .then(function(docRef) {
    res.status(200).send(docRef.id);
    });
};