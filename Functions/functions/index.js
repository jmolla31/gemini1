const admin = require('firebase-admin');
const functions = require('firebase-functions');
var serviceAccount = require("./secrets/serviceAccount.json");
const cors = require('cors')({origin: true});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https//gemini1-48753.firebaseio.com',
});
admin.firestore().settings({ timestampsInSnapshots: true });
var db = admin.firestore();

//Import all functions
const getItemCount = require('./getItemCount');


exports.getItemCount = functions.https.onRequest((req, res) => {

  getItemCount.handler(req,res,db, cors);

});

