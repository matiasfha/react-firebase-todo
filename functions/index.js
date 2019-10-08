const functions = require("firebase-functions");

const server = require("./server");
const app = functions.https.onRequest(server);

exports.app = functions.https.onRequest(app);
