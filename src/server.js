const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const { typeDefs, resolvers } = require("./schema");
//require("./services");

module.exports = {
  createServer: (options) => {
    const app = express();
    const apollo = new ApolloServer({ typeDefs, resolvers, ...options });
    apollo.applyMiddleware({
      app,
      path: `/`,
    });

    return app;
  },
};
