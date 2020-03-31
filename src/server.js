const express = require("express");
const fetch = require("node-fetch");
const { ApolloServer, gql } = require("apollo-server-express");
const { GraphQLDateTime } = require("graphql-iso-date");

const typeDefs = gql`
  type Training {
    id: ID!
    title: String!
    objectives: String!
    curriculum: String!
    overview: String
    discounts: [Discount]
    startDate: DateTime
    language: Language
  }

  type Discount {
    id: ID!
    training: Training
    code: String!
    discountPercentage: Int!
    description: String
  }

  scalar DateTime

  enum Language {
    EN
    ES
    FR
    IT
    PT
    NL
    DE
    ZH
    JA
    RU
  }

  type Query {
    trainings: [Training!]
    training(id: ID!): Training
    discounts: [Discount!]
    discount(id: ID!): Discount
  }
`;

const resolvers = {
  Query: {
    trainings: () => fetchTrainings(),
    discounts: () => fetchDiscounts(),
    training: (_, { id }) => fetchTrainingById(id),
    discount: (_, { id }) => fetchDiscountById(id)
  },
  Discount: {
    training: parent => fetchTrainingByUrl(parent.training)
  },
  Training: {
    discounts: ({ discounts }) => discounts.map(fetchDiscountByUrl)
  },
  DateTime: GraphQLDateTime
};

function fetchTrainings() {
  // More info about the fetch function? https://github.com/bitinn/node-fetch#json
  return fetch("https://api.reactgraphql.academy/rest/trainings/")
    .then(res => res.json())
    .catch(error => console.log(error));
}

function fetchTrainingById(id) {
  return fetch(`https://api.reactgraphql.academy/rest/trainings/${id}`)
    .then(res => res.json())
    .catch(error => console.log(error));
}

function fetchDiscounts() {
  return fetch("https://api.reactgraphql.academy/rest/discounts/")
    .then(res => res.json())
    .catch(error => console.log(error));
}

function fetchTrainingByUrl(url) {
  return fetch(url)
    .then(res => res.json())
    .catch(error => console.log(error));
}

function fetchDiscountById(id) {
  return fetch(`https://api.reactgraphql.academy/rest/discounts/${id}`)
    .then(res => res.json())
    .catch(error => console.log(error));
}

function fetchDiscountByUrl(url) {
  return fetch(url)
    .then(res => res.json())
    .catch(error => console.log(error));
}

module.exports = {
  createServer: options => {
    const app = express();
    const apollo = new ApolloServer({ typeDefs, resolvers, ...options });
    apollo.applyMiddleware({
      app,
      path: `/`
    });

    return app;
  }
};
