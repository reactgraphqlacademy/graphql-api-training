const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const { typeDefs, resolvers } = require("./schema");
const services = require("./services");

// helper function for a 🏋️‍♀️ bonus exercise
function authScope(token) {
  return {
    id: "1",
    role: "admin",
  };
}

// We are using apollo-server-express to integrate our server with Cloud Functions using a middleware.
// https://www.apollographql.com/docs/apollo-server/integrations/middleware/#applying-middleware
module.exports = {
  createServer: (options) => {
    const app = express();
    const apollo = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => ({
        services,
        // More info about the context in ApolloServer https://www.apollographql.com/docs/apollo-server/data/resolvers/#the-context-argument
      }),
      ...options,
    });
    apollo.applyMiddleware({
      app,
      path: `/`,
    });

    return app;
  },
};
