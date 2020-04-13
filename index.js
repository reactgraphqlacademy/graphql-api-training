require("./src/db");
const functions = require("firebase-functions");
const { createServer } = require("./src/server");

// Set up the server and export it for the GCF API (it requires an endpoint to be exported; in this case, 'api')
exports.graphql = functions.https.onRequest(
  createServer({ playground: true, introspection: true })
);
