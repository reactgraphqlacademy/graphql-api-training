# GraphQL API Fundamentals

This exercise is part of the [React GraphQL Academy](http://reactgraphql.academy) training material. The goal of the exercise is to help you get started transitioning from REST to GraphQL.

## Our teaching method

1. Collaborative learning environment & pair programming.
   - Rooms with small groups
   - Work with your peers, discuss, help each other.
2. We try to foster critical thinking.
   - ⬆️ Discovery ⬇️ Instruction
3. We don’t explain everything you need to know before the exercise:
   - The exercise is meant to help you come up with conclusions.
   - Learn by doing and build a mental model.

More on our [teaching method](https://reactgraphql.academy/blog/react-graphql-academy-teaching-method/)

## Learning objectives

- Understand the main functionalities and responsibilities of a GraphQL server
- Learn how to migrate an existing REST API to GraphQL and start “thinking in graphs”
- Start identifying potential problems when running real-world GraphQL APIs

## Exercise part 1

🎯 The goal of this exercise part 1 is to get familiar with GraphQL queries and the in-browser IDE Playground.

Given the following [GraphQL API](https://us-central1-rga-mocked-apis.cloudfunctions.net/graphql):

- Query a list with all the training and retrieve the title and language for each
- Query a single discount by id (try id equals `dis:422`) and get its name
- Query how many languages are in the system?
- How many types do we have in the system?

## Exercise part 2

We are going to create our own GraphQL API on top of this [REST API](https://api.reactgraphql.academy/rest/trainings)

- `git clone https://github.com/reactgraphqlacademy/graphql-api-training.git`
- `cd graphql-api-training`
- `git checkout fundamentals-v2`
- `yarn install` or `npm install`
- `yarn start` or `npm start`

### 🥑 Before we start

- Don't forget to checkout the `fundamentals-v2` branch, and install the dependencies.
- We use nodemon in the `start` script, so every time you save, the server will restart automatically.
- The `src/index.js` is the [getting started tutorial](https://www.apollographql.com/docs/apollo-server/getting-started/) from Apollo. Let me walk you through our code.
- Let's do a small exercise to warm up, let's replace in the schema:

```graphql
type Query {
  books: [Book]
}
```

with

```graphql
type Query {
  avocados: [Book]
}
```

🏋️‍♀️ Mini exercise. What do we need to change so the field avocados returns the array of books when we run the query? You have 2 minutes to fix it.

### Tasks

🎯 The goal of this exercise part 2 is to get familiar with the Schema Definition Language (SDL) and the resolvers.

⚠️ Some info before you start the tasks:

- You can define an array using square brackets and the type, example `[Book]`
- You can use the scalar type `ID` for ids.
- In GraphQL types are nullable by default. If you want to make a type non-nullable use `!` (exclamation mark). Example:

```graphql
type Book {
  id: ID!
}
```

To complete the tasks you'll use the mock data and helper functions that are at the bottom of the file `src/index.js`.

- [ ] 1. Create a `Training` type in your schema. Define the following fields `title`, `id`, `objectives`, `curriculum`. Have a look at the mock training data in `src/index.js` to identify the types of each field.

  - [ ] 1.1. Add a `trainings` field to the `Query` type. You can replace the `books` field from Query type with `trainings` since we won't use books. The `trainings` field in the `Query` type should return an array of training. .
  - [ ] 1.2. Add a `trainings` resolver to the Query's resolvers. You can replace the `books` field from Query type with `trainings` since we won't use books. You can return the trainingMockData array (which is in the scope and defined at the bottom of the file index.js) in the resolver function.
  - [ ] 1.3 You should be able to manually test the `trainings` query in Playground at [http://localhost:4000/](http://localhost:4000/)

- [ ] 2. Create a `Discount` type in your schema. Define only the fields `code`, `id`, and `discountPercentage`. Have a look at the discount mock data in `src/index.js` to identify the types of each field.

  - [ ] 2.1. Add a `discounts` field to the `Query` type. The `discounts` field should return an array of discounts.
  - [ ] 2.2. Add a `discounts` resolver to the Query's resolvers. You can return the mock discounts array (which is in the scope and defined at the bottom of the file index.js) in the resolver function.
  - [ ] 2.3 You should be able to manually test the `discounts` query in Playground at [http://localhost:4000/](http://localhost:4000/)

- [ ] 3. Replace the mock data with real data using the following endpoints:
  - [https://api.reactgraphql.academy/rest/trainings](https://api.reactgraphql.academy/rest/trainings)
  - [https://api.reactgraphql.academy/rest/discounts](https://api.reactgraphql.academy/rest/discounts)

🛠 Helper. You can use the `fetchTrainings` and `fetchDiscounts` defined at the bottom of this file `src/index.js`

- You'll need to replace mock data in 2 different places:
  - Query discounts
  - Query trainings

Note on mocking. In the next session, we'll use the automocking feature of Apollo Server. The only thing you need to do is `mocks:true` in your Apollo Server configuration. More info [here](https://www.apollographql.com/docs/apollo-server/testing/mocking/).

```js
const server = new ApolloServer({
  typeDefs,
  mocks: true, // ⬅️⬅️⬅️⬅️
});
```

#### 🏋️‍♀️ Bonus exercise part 2

Congratulations, you've completed part 2! You've learned how to create object types in GraphQL and add fields to them using scalar types (`String`,`Int`, `ID`) or your own object types (`Training`, `Discount`). You've also learned how to create a relationship between two object types.

In GraphQL you can also create your custom scalars types, like [Date](https://graphql.org/learn/schema/#scalar-types).

Bonus task, add a field called `startDate` to the `Training` object type using a `DateTime` scalar type. GraphQL doesn't provide a DateTime type. Instead of creating a custom `DateTime` scalar type you are going to use [https://github.com/excitement-engineer/graphql-iso-date](https://github.com/excitement-engineer/graphql-iso-date). Note, the package is already installed in package.json.

## Exercise part 3

### 🥑 Before we start

Resolvers are functions that have 4 arguments `(parent, args, context, info)`. In this exercise, we are only going to use the first 2 arguments: `parent` and `args`.

#### The first argument of the resolver

The first argument, often called `parent`, points to the parent object. For instance, we could override the default resolver of the title field in the Training and return an upper case version of the title.

⚠️ Trainer implements:

```js
const resolvers = {
  Query: {
    //...
  },
  Training: {
    title: (parent) {
      return parent.title.toUpperCase()
    }
  }
};
```

We could also create a new field that returns the upper case version of the title without changing the title field. Example:

⚠️ Learners implement (⏳ only 5 minutes to implement and write a query to test it!):

```graphql
type Training {
  title: String!
  upperCaseTitle: String!
  # the rest remains the same
}
```

```js
const resolvers = {
  Query: {
    //...
  },
  Training: {
    upperCaseTitle: (parent) {
      return parent.title.toUpperCase()
    }
  }
};
```

🏋️‍♀️Bonus exercise, return all the URLs of the discounts field in upper case.

#### The second argument of the resolver

The second argument of the resolver (we are calling it `args`) points to the arguments passed to the field. In the following example `args` contains `id`:

```js
const schema = gql`
  type Query {
    author(id: ID!): Author
  }
`;
const resolvers = {
  Query: {
    author(parent, args) {
      console.log(args); // { id: 3 } based on the query below
    },
  },
};
```

```graphql
query authorName {
  author(id: 3) {
    name
  }
}
```

### Tasks

🎯 The goal of the exercise part 3 is to understand how arguments and relationships work in GraphQL.

To complete the tasks you'll use the helper functions that are at the bottom of the file `src/index.js`

- [ ] 4. Implement a new field in the `Query` type that returns a single training given an id. You need to fetch the training from this endpoint `https://api.reactgraphql.academy/rest/trainings/` + `id`. 🕵️‍♂️ Hint, you need to pass [arguments](https://graphql.org/graphql-js/passing-arguments/) to the field, and then use the second argument in the resolver. There is a helper function at the bottom of `src/index.js`.

Once implemented you should be able to run the following query:

```graphql
query getTraining {
  training(id: "tra:22") {
    title
  }
}
```

- [ ] 5. Create the following relationship between the Training type and the Discount type in your schema:

```graphql
type Training {
  discounts: [Discount]
  # the rest of the fields remain the same
}
```

- You need to add a `Training` key in the resolvers object and an object with a `discounts` key in `Training`. Similar to the Author type and books field in the [Apollo documentation](https://www.apollographql.com/docs/apollo-server/essentials/data#resolver-map)
- You need to use the **first argument of the resolver**: the 'parent'. In this case, the parent of the `discounts` field is the `Training`. `parent.discounts` gives you the array of URLs that you can use to fetch each discount from the REST API.
- You can use the helper function `fetchDiscountByUrl` defined at the bottom of this file `src/index.js`.
- Heads up! We want our Training type to have a field called `discounts` that returns an array of `Discount` types not an array of `String`
- Once implemented, you should be able to run the following query:

```graphql
query getTraining {
  training(id: "tra:22") {
    title
    discounts {
      code
    }
  }
}
```

#### 🏋️‍♀️ Bonus exercise part 3

- [ ] Bonus 1. Create the types and resolvers so the following query works:

```graphql
query getPotentiallyDangerousDiscount {
  discount(id: "dis:421") {
    code
    training {
      title
      discounts {
        code
        # why this type of query could be potentially dangerous?
      }
    }
  }
}
```

- Once the getPotentiallyDangerousDiscount query is implemented, do you see any problem/ vulnerability issues on that type of query?
- Should the relationship Discount to Training be non-nullable? Meaning `training: Training` or `training: Training!`

* [ ] Bonus 2. If we run the following query, is the GraphQL Server fetching the training from the rest API (you can use a console.log in the resolver)?

```graphql
query {
  discount(id: "dis:421") {
    code
    # with the training field commented out, is the training resolver invoked on the API?
    # training {
    #  title
    # }
  }
}
```

- [ ] Bonus 3. Add a `first` argument to the field discounts in the `Training` object type. The `first` argument is an integer that makes the field `discounts` return the first N discounts, being N the value of the argument. Once implemented, you should be able to run the following query

```graphql
query getTraining {
  training(id: "tra:22") {
    title
    discounts(first: 2) {
      code
    }
  }
}
```

🤸🏾Do you want some extra workout? Create an [enumeration](https://graphql.org/learn/schema/#enumeration-types) for the languages. Add field language to the Training object type that uses the language enum.

## 🧘‍♀️Homework

You are going to build a GraphQL API on top of an existing REST API. Steps:

1- Choose a public API. You have a list of public APIs [here](https://github.com/public-apis/public-apis). Suggestion, choose an API that doesn't require authentication and has decent documentation.

2- Create a GraphQL server to validate and execute the GraphQL queries. You can get started using the [getting started tutorial](https://www.apollographql.com/docs/apollo-server/getting-started/) from Apollo Server.

3- Create the GraphQL schema using the [Schema Definition Language (SDL)](https://www.prisma.io/blog/graphql-sdl-schema-definition-language-6755bcb9ce51) . You'll define types and relationships between those types.

4- Add the resolvers to your schema. We are following a SDL-first approach to build our schema. It's the most popular approach in the GraphQL JavaScript community, but be aware that it's not the only one. You can read more about it and other alternatives in this [article](https://www.prisma.io/blog/the-problems-of-schema-first-graphql-development-x1mn4cb0tyl3).

## Articles and links

- http://graphql.org/learn/
- http://graphql.org/learn/thinking-in-graphs/
- https://dev-blog.apollodata.com/graphql-vs-rest-5d425123e34b
- https://dev-blog.apollodata.com/graphql-explained-5844742f195e
- https://facebook.github.io/relay/docs/thinking-in-graphql.html
- https://dev-blog.apollodata.com/the-anatomy-of-a-graphql-query-6dffa9e9e747
- https://github.com/apollographql/apollo-server
- https://www.youtube.com/watch?v=PHabPhgRUuU
- https://facebook.github.io/relay/graphql/connections.htm
- https://dev-blog.apollodata.com/introducing-launchpad-the-graphql-server-demo-platform-cc4e7481fcba
- https://dev-blog.apollodata.com/
- http://dev.apollodata.com
- https://astexplorer.net/

## License

This material is available for private, non-commercial use under the [GPL version 3](http://www.gnu.org/licenses/gpl-3.0-standalone.html).

```

```
