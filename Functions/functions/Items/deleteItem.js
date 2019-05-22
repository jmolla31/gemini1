exports.handler = function (req, res, database) {

    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "DELETE");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    // Send response to OPTIONS requests and terminate the function execution
    if (req.method == 'OPTIONS') {
        res.status(200).send('');
    }
    else {
        var docId = req.query.docId;

        if (!docId) res.status(500).send("Error, invalid or undefined docId");
    
    
        database.doc("items/" + docId).delete().then(x => {
            res.status(200).send();
        },
            error => {
                res.status(500).send(JSON.stringify(error));
            });
    }
}