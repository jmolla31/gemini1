exports.handler = function (req, res, database) {

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

    database.collection('activities').doc(recievedBody.id).set({
        name: recievedBody.name,
        type: recievedBody.type,
        date: recievedBody.date,
        description: recievedBody.description
    })
        .then(function () {
            res.status(200).send();
        })
        .catch(function (error) {
            res.status(400).send("Error writing document: ", error);
        });
};