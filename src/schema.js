const { gql } = require("apollo-server-express");
const { fromGlobalId, toGlobalId } = require("graphql-relay");
const { GraphQLDateTime } = require("graphql-iso-date");
const fetch = require("node-fetch");

const typeDefs = gql`
  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  type Training implements Node {
    id: ID!
    title: String!
    objectives: String!
    curriculum: String!
    overview: String
    startDate: DateTime
  }

  type TrainingEdge {
    # https://relay.dev/graphql/connections.htm#sec-Node
    node: Training
    # https://relay.dev/graphql/connections.htm#sec-Cursor
    cursor: String!
  }

  type TrainingConnection {
    # https://relay.dev/graphql/connections.htm#sec-Connection-Types.Fields.PageInfo
    pageInfo: PageInfo!
    # https://relay.dev/graphql/connections.htm#sec-Edges
    edges: [TrainingEdge]
    # total count is not part of GraphQL Cursor Connection Spec, but we can extend the spec
    totalCount: Int
  }

  type Discount implements Node {
    id: ID!
    code: String!
    discountPercentage: Int!
    description: String
    expiresOn: DateTime
  }

  # 🚧 You must use this input
  #   input DiscountFilter {
  #     # 🚧 You must add something here
  #   }

  enum OrderDirection {
    # Specifies an ascending order for a given orderBy argument.
    ASC
    # Specifies a descending order for a given orderBy argument.
    DESC
  }

  enum DiscountOrderField {
    expiresOn
    discountPercentage
    # 🚧 You must add something here
  }

  input DiscountOrder {
    field: String # 🚧 this field should not be a String, add the right type.
    direction: String # 🚧 this field should not be a String, add the right type.
  }

  scalar DateTime

  type Query {
    node(id: ID!): Node
    trainings(
      after: String
      first: Int
      before: String
      last: Int
    ): TrainingConnection

    training(id: ID!): Training

    discounts: [Discount!]

    discount(id: ID!): Discount
  }
`;

const resolvers = {
  Query: {
    trainings: (_, args, { services }) => services.findTrainings(args),
    training: (_, { id }) =>
      // 🕵️‍♀️ hint, use services.findTrainingById
      fetch(`https://api.reactgraphql.academy/rest/trainings/${id}`)
        .then(res => res.json())
        .catch(error => console.log(error)),

    discounts: _ =>
      // 🕵️‍♀️ hint, use services.findDiscounts
      fetch("https://api.reactgraphql.academy/rest/discounts/")
        .then(res => res.json())
        .catch(error => console.log(error)),

    discount: (_, { id }) =>
      // 🕵️‍♀️ hint, use services.findDiscountById
      fetch(`https://api.reactgraphql.academy/rest/discounts/${id}`)
        .then(res => res.json())
        .catch(error => console.log(error))
  },
  DateTime: GraphQLDateTime,
  OrderDirection: {
    DESC: -1,
    ASC: 1
  }
};

module.exports = { typeDefs, resolvers };
