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
const updateItem = require('./Items/updateItem');
const deleteItem = require('./Items/deleteItem');

const getAllCategories = require('./Categories/getAllCategories');
const addCategory = require('./Categories/addCategory');
const getCategoryCount = require('./Categories/getCategoryCount');
const getCategoryDetails = require('./Categories/getCategoryDetails');
const updateCategory = require('./Categories/updateCategory');
const deleteCategory = require('./Categories/deleteCategory');

const getAllActivities = require('./Activities/getAllActivities.js');
const getActivityDetails = require('./Activities/getActivityDetails.js');
const addActivity = require('./Activities/addActivity.js');
const deleteActivity = require('./Activities/deleteActivity.js');
const updateActivity = require('./Activities/updateActivity.js');
const getActivityParticipations = require('./Activities/getActivityParticipations.js');
const addParticipation = require('./Activities/addParticipation.js');
const deleteParticipation = require('./Activities/deleteParticipation.js');

exports.getItemDetails = functions.https.onRequest((req, res) => { getItemDetails.handler(req, res, db, cors); });
exports.getItemCount = functions.https.onRequest((req, res) => { getItemCount.handler(req, res, db, cors); });
exports.getCategoryCount = functions.https.onRequest((req, res) => { getCategoryCount.handler(req, res, db, cors); });
exports.getLastItemsCount = functions.https.onRequest((req, res) => { getLastItemsCount.handler(req, res, db, cors); });
exports.getAllItems = functions.https.onRequest((req, res) => { getAllItems.handler(req, res, db); });
exports.getAllCategories = functions.https.onRequest((req, res) => { getAllCategories.handler(req, res, db); });
exports.getCategoryDetails = functions.https.onRequest((req, res) => { getCategoryDetails.handler(req, res, db); });
exports.addItem = functions.https.onRequest((req, res) => { addItem.handler(req, res, db); });
exports.addCategory = functions.https.onRequest((req, res) => { addCategory.handler(req, res, db); });
exports.updateCategory = functions.https.onRequest((req, res) => { updateCategory.handler(req, res, db); });
exports.updateItem = functions.https.onRequest((req, res) => { updateItem.handler(req, res, db); });
exports.deleteItem = functions.https.onRequest((req, res) => { deleteItem.handler(req, res, db); });
exports.deleteCategory = functions.https.onRequest((req, res) => { deleteCategory.handler(req, res, db); });

exports.getAllActivities = functions.https.onRequest((req, res) => { getAllActivities.handler(res, db); });
exports.getActivityDetails = functions.https.onRequest((req, res) => { getActivityDetails.handler(req, res, db); });
exports.addActivity = functions.https.onRequest((req, res) => { addActivity.handler(req, res, db); });
exports.deleteActivity = functions.https.onRequest((req, res) => { deleteActivity.handler(req, res, db); });
exports.updateActivity = functions.https.onRequest((req, res) => { updateActivity.handler(req, res, db); });
exports.getActivityParticipations = functions.https.onRequest((req, res) => { getActivityParticipations.handler(req, res, db); });
exports.addParticipation = functions.https.onRequest((req, res) => { addParticipation.handler(req, res, db); });
exports.deleteParticipation = functions.https.onRequest((req, res) => { deleteParticipation.handler(req, res, db); });