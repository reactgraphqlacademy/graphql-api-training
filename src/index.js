const fetch = require("node-fetch");
const { ApolloServer, gql } = require("apollo-server");

const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling"
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton"
  }
];

const trainingMockData = [
  {
    id: "tra:1",
    title: "React Fundamentals",
    objectives: "learning basics of react",
    curriculum:
      "-Thinking in React, Modern JavaScript, Routing & Data Fetching\n-Forms, Authentication, and Hooks\n-Redux Fundamentals, deployment to production"
  },
  {
    id: "tra:2",
    title: "Advanced React",
    objectives: "master react",
    curriculum:
      "-Advanced React patterns and performance.\n-GraphQL 101 & Real-World Testing in React.\n-Building a UI component library"
  }
];

const discountMockData = [
  {
    id: "dis:1",
    code: "sweetpotato60",
    discountPercentage: 60,
    description: null
  },
  {
    id: "dis:2",
    code: "garlic20",
    discountPercentage: 20,
    description: null
  },
  {
    id: "dis:3",
    code: "onion50",
    discountPercentage: 50,
    description: null
  }
];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.
  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: String
  }
  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    books: [Book]
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books
  }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

function fetchTrainings() {
  // More info about the fetch function? https://github.com/bitinn/node-fetch#json
  return fetch("https://restapi.reactgraphql.academy/v1/trainings/")
    .then(res => res.json())
    .catch(error => console.log(error));
}

function fetchTrainingById(id) {
  return fetch(`https://restapi.reactgraphql.academy/v1/trainings/${id}`)
    .then(res => res.json())
    .catch(error => console.log(error));
}

function fetchDiscounts() {
  return fetch("https://restapi.reactgraphql.academy/v1/discounts/")
    .then(res => res.json())
    .catch(error => console.log(error));
}

function fetchTrainingByUrl(url) {
  return fetch(url)
    .then(res => res.json())
    .catch(error => console.log(error));
}

function fetchDiscountById(id) {
  return fetch(`https://restapi.reactgraphql.academy/v1/discounts/${id}`)
    .then(res => res.json())
    .catch(error => console.log(error));
}

function fetchDiscountByUrl(url) {
  return fetch(url)
    .then(res => res.json())
    .catch(error => console.log(error));
}
