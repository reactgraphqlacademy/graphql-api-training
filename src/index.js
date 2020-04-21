const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Training {
    id: ID!
    title: String!
    objectives: String!
    curriculum: String!
    overview: String
    discounts: [Discount]
  }

  type Discount {
    id: ID!
    training: Training
    code: String!
    discountPercentage: Int!
    description: String
  }

  type Query {
    discounts: [Discount!]
    discount(id: ID!): Discount
  }
`;

const resolvers = {};
const mocks = {};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  mocks,
  mockEntireSchema: false,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
