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
const getItemCount = require('./Items/getItemCount');
const getLastItemsCount = require('./Items/getLastItemsCount');
const getAllItems = require('./Items/getAllItems');
const addItem = require('./Items/addItem');
const getItemDetails = require('./Items/getItemDetails');

const getAllCategories = require('./Categories/getAllCategories');
const getCategoryCount = require('./Categories/getCategoryCount');
const getCategoryDetails = require('./Categories/getCategoryDetails');


exports.getItemDetails = functions.https.onRequest((req, res) => { getItemDetails.handler(req, res, db, cors); });
exports.getItemCount = functions.https.onRequest((req, res) => { getItemCount.handler(req, res, db, cors); });
exports.getCategoryCount = functions.https.onRequest((req, res) => { getCategoryCount.handler(req, res, db, cors); });
exports.getLastItemsCount = functions.https.onRequest((req, res) => { getLastItemsCount.handler(req, res, db, cors); });
exports.getAllItems = functions.https.onRequest((req, res) => { getAllItems.handler(req, res, db); });
exports.getAllCategories = functions.https.onRequest((req, res) => { getAllCategories.handler(req, res, db); });
exports.getCategoryDetails = functions.https.onRequest((req, res) => { getCategoryDetails.handler(req, res, db); });
exports.addItem = functions.https.onRequest((req, res) => { addItem.handler(req, res, db); });

