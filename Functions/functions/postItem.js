exports.handler = function (req, res, database, cors) {

    console.log("Function processed");
    let recievedBody = req.body;

    database.collection('items').add({

        name: recievedBody.name,
        description: recievedBody.description,
        mainCategory: recievedBody.mainCategory,
        secondaryCategory: recievedBody.secondaryCategory,
        entryDate: recievedBody.entryDate,
        locked: recievedBody.locked
    })
    .then(function(docRef) {

        
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).send(docRef.id);
    });
};