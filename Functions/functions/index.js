const admin = require('firebase-admin');
const functions = require('firebase-functions');
const serviceAccount = require("./secrets/serviceAccount.json");
const cors = require('cors')({ origin: true });

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https//gemini1-48753.firebaseio.com',
});
admin.firestore().settings({ timestampsInSnapshots: true });
var db = admin.firestore();

//Import all functions
const getItemCount = require('./getItemCount');
const getLastItemsCount = require('./getLastItemsCount');
const getAllItems = require('./getAllItems');
const getAllCategories = require('./getAllCategories');
const postItem = require('./postItem');
const getCategoryCount = require('./getCategoryCount');
const getItemDetails = require('./getItemDetails');
const getCategoryDetails = require('./getCategoryDetails');


exports.getItemDetails = functions.https.onRequest((req, res) => { getItemDetails.handler(req, res, db, cors); });
exports.getItemCount = functions.https.onRequest((req, res) => { getItemCount.handler(req, res, db, cors); });
exports.getCategoryCount = functions.https.onRequest((req, res) => { getCategoryCount.handler(req, res, db, cors); });
exports.getLastItemsCount = functions.https.onRequest((req, res) => { getLastItemsCount.handler(req, res, db, cors); });
exports.getAllItems = functions.https.onRequest((req, res) => { getAllItems.handler(req, res, db); });
exports.getAllCategories = functions.https.onRequest((req, res) => { getAllCategories.handler(req, res, db); });
exports.getCategoryDetails = functions.https.onRequest((req, res) => { getCategoryDetails.handler(req, res, db); });
exports.postItem = functions.https.onRequest((req, res) => { postItem.handler(req, res, db, cors); });

