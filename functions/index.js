const functions = require("firebase-functions");

const server = require("./server");
const api = functions.https.onRequest(server);

module.exports = {
  api
};
