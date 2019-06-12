exports.handler = function (req, res, database) {

    res.set('Access-Control-Allow-Origin', '*');

    var docId = req.query.docId;
    var group = req.query.group;

    if (!docId) res.status(500).send("Error, invalid or undefined docId");
    if (!group) res.status(500).send("Error, invalid or undefined group");

    database.collection('participations').where('activity', '==', docId).where('group', '==', group).get().then(query => {

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