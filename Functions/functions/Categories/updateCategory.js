exports.handler = function (req, res, database) {

    console.log("Function processed");

    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "PUT");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    // Send response to OPTIONS requests and terminate the function execution
    if (req.method == 'OPTIONS') {
        res.status(200).send('');
    }


    let recievedBody = req.body;
    console.log(recievedBody);

    database.collection('categories').doc(recievedBody.id).set({

        name: recievedBody.name,
        description: recievedBody.description,
        parentCategory: recievedBody.parentCategory,
        main: recievedBody.main,
        locked: recievedBody.locked
    })
        .then(function () {
            res.status(200).send();
        })
        .catch(function (error) {
            res.status(400).send("Error writing document: ", error);
        });
};