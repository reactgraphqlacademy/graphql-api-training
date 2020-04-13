require("dotenv").config();
require("./src/db");

const { createServer } = require("./src/server");

const server = createServer({ playground: true, introspection: true }).listen(
  4000,
  () => {
    const { address, port } = server.address();
    console.log(`🚀  Server ready at ${address}:${port}`);
  }
);
