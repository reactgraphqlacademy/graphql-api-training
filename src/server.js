const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const { typeDefs, resolvers } = require("./schema");
const services = require("./services");

// We are using apollo-server-express to integrate our server with Cloud Functions using a middleware.
// https://www.apollographql.com/docs/apollo-server/integrations/middleware/#applying-middleware
module.exports = {
  createServer: (options) => {
    const app = express();
    const apollo = new ApolloServer({
      typeDefs,
      resolvers,
      // TODO ADD THIS TO THE EXERCISE
      context: { services },
      ...options,
    });
    apollo.applyMiddleware({
      app,
      path: `/`,
    });

    return app;
  },
};
