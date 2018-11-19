const admin = require('firebase-admin');
const functions = require('firebase-functions');
var serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https//gemini1-48753.firebaseio.com',
});
admin.firestore().settings({ timestampsInSnapshots: true });
var db = admin.firestore();

//Import all functions
const getAllUsers = require('./getAllUsers');


exports.getAllUsers = functions.https.onRequest((req, res) => {

  getAllUsers.handler(req,res,db);

});

