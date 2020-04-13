const { gql } = require("apollo-server-express");
const { fromGlobalId, toGlobalId } = require("graphql-relay");
const { GraphQLDateTime } = require("graphql-iso-date");

const typeDefs = gql`
  interface Node {
    id: ID!
  }

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
    discounts: [Discount]
    startDate: DateTime
    language: Language
  }

  type TrainingEdge {
    node: Training
    cursor: String!
  }

  type TrainingConnection {
    pageInfo: PageInfo!
    edges: [TrainingEdge]
    # total count is not part of GraphQL Cursor Spec, but we can extend the spec
    totalCount: Int
  }

  type Discount {
    id: ID!
    training: Training
    code: String!
    discountPercentage: Int!
    description: String
    expiresOn: DateTime
  }

  type DiscountEdge {
    node: Discount
    cursor: String!
  }

  type DiscountConnection {
    pageInfo: PageInfo!
    edges: [DiscountEdge]
    # total count is not part of GraphQL Cursor Spec, but we can extend the spec
    totalCount: Int
  }

  input DiscountFilter {
    trainingId: ID
  }

  enum OrderDirection {
    # Specifies an ascending order for a given orderBy argument.
    ASC
    # Specifies a descending order for a given orderBy argument.
    DESC
  }

  enum DiscountOrderField {
    expiresOn
    code
    discountPercentage
  }

  input DiscountOrder {
    field: DiscountOrderField
    direction: OrderDirection
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
    node(id: ID!): Node

    # trainings: [Training!]
    trainings(
      after: String
      first: Int
      before: String
      last: Int
    ): TrainingConnection

    training(id: ID!): Training

    # discounts: [Discount!]
    discounts(
      after: String
      first: Int
      before: String
      last: Int
      filter: DiscountFilter
      orderBy: DiscountOrder
    ): DiscountConnection

    discount(id: ID!): Discount
  }
`;

const resolvers = {
  Query: {
    node: (_, { id }, { services: { getObjectById } }) =>
      getObjectById(fromGlobalId(id)),
    trainings: (_, args, { services: { findTrainings } }) =>
      findTrainings(args),
    discounts: (_, args, { services: { findDiscounts } }) =>
      findDiscounts(args),
    training: (_, { id }, { services: { findTrainingById } }) =>
      findTrainingById(id),
    discount: (_, { id }, { services: { findDiscountById } }) =>
      findDiscountById(id),
  },
  //   Node: {
  //     // https://www.apollographql.com/docs/graphql-tools/resolvers/#unions-and-interfaces
  //     __resolveType(obj) {
  //       if (obj.trainingId) {
  //         return "Discount";
  //       }
  //       if (obj.curriculum) {
  //         return "Training";
  //       }

  //       return null;
  //     },
  //   },
  Node: {
    // If possible, it's better to return the typename from the data source
    // We implement it using mongoose virtuals
    __resolveType(obj) {
      return obj.__typename;
    },
  },
  OrderDirection: {
    DESC: -1,
    ASC: 1,
  },
  Discount: {
    training: (parent, _, { services: { findTrainingById } }) =>
      findTrainingById(parent._trainingId),
  },
  Training: {
    // id: (parent) => toGlobalId("Training", parent._id),
    // an alternative to overriding the default resolver for the `id` field we can move the toGlobalId to the data source. See Training model id virtual
    discounts: ({ id }, _, { services: { findDiscountsByTrainingId } }) =>
      findDiscountsByTrainingId(id),
  },
  DateTime: GraphQLDateTime,
};

module.exports = { typeDefs, resolvers };
