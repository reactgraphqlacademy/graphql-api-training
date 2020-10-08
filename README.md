# GraphQL API Fundamentals

This exercise is part of the [React GraphQL Academy](http://reactgraphql.academy) training material.

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

- Learn how to connect your GraphQL API to different data sources such as a REST API or a database.
- Design standard GraphQL schemas compliant with different GraphQL specifications.

## To get started

- `git clone https://github.com/reactgraphqlacademy/graphql-api-training.git`
- `cd graphql-api-training`
- `git checkout relay-v2`
- `yarn install` or `npm install`
- Copy .env.example to .env and ask the coach for the credentials to connect to the DB.
- `yarn start` or `npm start`

## Exercise part 1 - Context

### 🥑 Before we start the exercise

- ⚠️ In `src/server.js` we are passing a `services` object to the ApolloServer using the `context`argument in the constructor.
- We use nodemon in the `start` script, so every time you save, the server will restart automatically.
- This exercise builds on top of [the fundamentals branch](https://github.com/reactgraphqlacademy/graphql-api-training/tree/fundamentals-v2)
- Don't forget to checkout the `relay-v2` branch, install the dependencies, and let me walk you through the code meanwhile.

### Tasks

🎯 The goal of this exercise part 1 is to learn what the context in your resolvers is. The context passed to the resolvers is set in `src/server.js` using the `context` argument in the constructor of the ApolloServer.

- [ ] 1. In `src/schema.js`, replace all the `fetch` functions in all the Query resolvers with the corresponding function from the `services` object in the context. You'll know that it works because all the queries will return ids like this `5e93558ae06e3d37d8f3705f` instead of `dis:421`. You can test it by running the `trainings`, `training`, `discount`, and queries on Playground, e.g.:

```graphql
query {
  trainings {
    edges {
      node {
        id
        title
      }
    }
  }
}
```
Don't query `discounts`, it doesn't work yet. That's what we are going to implement in the next task.

#### 🏋️‍♀️ Bonus exercise part 1

Congratulations, you've completed part 1! You've learned how to use the context for passing things that any resolver might need. In our exercise, we used the context to pass all the functions used to "resolve" data.

In this bonus exercise you are going to use the context to pass the authentication scope to the resolvers. You have an example [here](https://www.apollographql.com/docs/apollo-server/data/resolvers/#the-context-argument). You can use the helper function `authScope` defined at the top of `src/server.js`.

Note, using the authScope in the resolvers is not in the scope of this exercise. We are only practicing how to add something different from our services in the context.

## Exercise part 2 - GraphQL Cursor Connections Specification

### 🥑 Before we start the exercise

There are two reasons for which you might want to use the [GraphQL Cursor Connections Specification](https://relay.dev/graphql/connections.htm):

1. Provide an option for GraphQL clients to consistently handle [pagination best practices](https://graphql.org/learn/pagination/) with support for related metadata via a GraphQL server.
2. Standardize the way those patterns are exposed. This is especially important for public APIs.

### Tasks

🎯 The goal of this exercise part 2 is to implement a GraphQL Cursor Connections Specification for the `discounts` query. The shape of the data returned by the `services.findDiscounts` function from the context complies with the spec. In other words, you don't have to change the resolvers in this exercise part 2. You only need to write the type definitions.

- [ ] 2. Create a DiscountConnection type. Hint, it's very similar to the TrainingConnection.
- [ ] 3. Create a DiscountEdge type. Hint, it's very similar to the TrainingEdge.
- [ ] 4. Do you need to create another PageInfo type?
- [ ] 5. Replace the Query type field `discounts: [Discount!]` with your connection. You know it works because the following query will return data:

```graphql
query {
  discounts {
    edges {
      cursor
      node {
        id
        code
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}
```

- [ ] 6. Update the field `discounts` in the `Query` type to include all the connection [arguments](https://relay.dev/graphql/connections.htm#sec-Arguments). Hint, it's **very similar** to the `trainings` field in the `Query` type. You know it works because the arguments `first`, `last`, `after`, and `before` should work. Example:

```graphql
query {
  discounts(first: 2) {
    edges {
      cursor
      node {
        id
        code
      }
    }
  }
}
```

🤔 Some thoughts about this exercise:

Some implementations of this spec suffix the field with "Connection", example discountsConnection. However, from the official [GraphQL documentation](https://graphql.org/learn/pagination/#plurals):

> The simplest way to expose a connection between objects is with a field that returns a plural type.

GraphQL is a **strongly typed** query language, which means it probably doesn't make much sense to include the `type` on the field name.

#### 🏋️‍♀️ Bonus exercise part 2

A) Add a field to the Training type called `discounts` that returns a "connection" of discounts.

B) Would it make sense to do the same from `Discount` to `Training`?

## Exercise part 3 - Extending the GraphQL Cursor Connections Specification

### 🥑 Before we start the exercise

We can extend the "Connections" to accomodate particular use cases. One example is the `totalCount` field we added to the `TrainingConnection` type.

To complete the next exercise we'll use [GraphQL input types](https://graphql.org/learn/schema/#input-types). Input types are not only used for mutations but also to pass complex objects to our queries.

### Tasks

🎯 The goal of this exercise part 3 is to add filtering and sorting to our `discounts` query. The `service.findDiscounts` is ready to handle our schema modifications. You'll only need to edit the type definitions in this file `src/schema.js`. You don't have to edit the resolvers.

- [ ] 7. We want to be able to filter discounts by training ID. Modify `DiscountFilter` to include the field `trainingId`. You need to add the type to each field of the input type, [example](https://graphql.org/learn/schema/#input-types).
- [ ] 8. Add a field `code` to the `DiscountOrderField` type.
- [ ] 9. Edit the type `DiscountOrder` and add the right types to each field.
- [ ] 10. Update the field `discounts` in the `Query` type to include the `filter` and `orderBy` arguments. Once implemented, the following query should work.

```graphql
query {
  discounts(
    filter: { trainingId: "5e934e68e06e3d37d8f21b5b" }
    orderBy: { field: code, direction: DESC }
  ) {
    totalCount
    edges {
      node {
        id
        code
      }
    }
  }
}
```

🤔 Some thoughts about this exercise:

Some APIs expose a field called `filter` (for instance, [Gatsby](https://www.gatsbyjs.org/docs/graphql-reference/#filter) or GitHub) and others call it `where` (for instance, [Hasura](https://hasura.io/docs/1.0/graphql/manual/queries/query-filters.html)). Either case, it'll be up to you to do define the capabilities (e.g. [OR/ AND operators](https://github.com/graphql/graphql-js/issues/585#issuecomment-262402544)) of that field given your specific use cases.

#### 🏋️‍♀️ Bonus exercise part 3

Update the schema so the following queries work:

```graphql
query future {
  trainings(
    filter: { startDate: future }
    orderBy: { field: title, direction: DESC }
  ) {
    totalCount
    edges {
      node {
        id
        code
      }
    }
  }
}
```

```graphql
query past {
  trainings(
    filter: { startDate: past }
    orderBy: { field: objectives, direction: DESC }
  ) {
    totalCount
    edges {
      node {
        id
        code
      }
    }
  }
}
```

## Exercise part 4 - Interfaces, Fragments, and the Global Object Identification

> Consistent object access enables simple caching and object lookups

https://graphql.org/learn/global-object-identification/

### 🥑 Before we start the exercise

#### Interfaces

An [Interface](https://graphql.org/learn/schema/#interfaces) is an abstract type that includes a certain set of fields that a type must include to implement the interface.

#### Inline Fragment

If you are querying a field that returns an interface (or a union type), you will need to use [inline fragments](https://graphql.org/learn/queries/#inline-fragments) to access data on the underlying concrete type.

#### Real-world Example

The [GitHub API V4](https://developer.github.com/v4/explorer/) implements the Global Object Identification. Let me show you:

```graphql
query {
  node(id: "MDEwOlJlcG9zaXRvcnkyMjM0NTM3NTU=") {
    id
    ... on Repository {
      name
    }
  }
}
```

### Tasks

🎯 The goal of this exercise part 4 is to make our API compliant with the [Global Object Identification](https://relay.dev/graphql/objectidentification.htm) spec. Why is this specification important? Some GraphQL clients, like [Relay](https://relay.dev/docs/en/graphql-server-specification.html#object-identification), require it to be implemented on the GraphQL server

- [ ] 11. Add the following Node interface to your schema

```graphql
interface Node {
  id: ID!
}
```

- [ ] 12. The `Training` and `Discount` types should implement the Node interface. More on how to implement an interface in GraphQL [here](https://graphql.org/learn/schema/#interfaces).
- [ ] 13. Add the following field to the `Query` type (you'll add its resolver in the next task)

```graphql
node(id: ID!): Node
```

- [ ] 14. Implement the resolver for the `node` field in the `Query` type. You need to use two things:

  - [ ] 14.1 Use the `fromGlobalId` function (imported from `graphql-relay` at the top of the file) to get the "local" id before resolving the object.
  - [ ] 14.2 Use the `getObjectById` function from `services` to resolve the `node` field in the `Query` type. Try the following query. You can move to the next task when you get this error "Abstract type Node must resolve to an Object type at runtime for field Query.node with value { \_id: [ObjectID], title: \"Advanced React\", objectives: ... " when running the following query:

```graphql
query {
  node(id: "VHJhaW5pbmc6NWU5MzU1MGVlMDZlM2QzN2Q4ZjM1ZTMx") {
    ... on Training {
      title
    }
  }
}
```

- [ ] 15. To fix the "Abstract type Node must resolve to an Object type at runtime" error, add a resolver for the Node type that implements the `__resolveType(obj){} function`. You can check the `__resolveType` in the [Apollo documentation](https://www.apollographql.com/docs/apollo-server/schema/unions-interfaces/#interface-type). In this case, to infer the types you can consider that if the object has a `title` key, then it's a `Training` type. If the object has a `code` key, then the object is a `Discount` type. You'll know it works when you get `"title": "Advanced React"` when running the following query:

```graphql
query {
  node(id: "VHJhaW5pbmc6NWU5MzU1MGVlMDZlM2QzN2Q4ZjM1ZTMx") {
    ... on Training {
      title
    }
  }
}
```

- [ ] 16. Override the default resolver for the `id` field in the `Training` type so it returns a global ID. Use the `toGlobalId` function for that (already imported from `graphql-rely` at the top of `src/schema.js`). You'll know it probably works because the following query will return ids in this format `VHJhaW5pbmc6NWU5MzRlNjhlMDZlM2QzN2Q4ZjIxYjVi` instead of `5e934e68e06e3d37d8f21b5b`:

```graphql
query {
  trainings {
    edges {
      node {
        id
      }
    }
  }
}
```

To check that it really works, use any of the ids from the previous query (the id should look similar to this `sum6NWU5MzRlNjhlMDU5MzRlNjhlM2QzN2Q4Zj__dont_use_this_one_😜`) in the following query (if it works it should return some title):

```graphql
query {
  node(id: "🔥PUT_A_TRAINING_ID_HERE🔥") {
    ... on Training {
      title
    }
  }
}
```

- [ ] 17.1 Finish the implemention of the `getObjectById` function in `src/services.js`. This function receives two arguments: `type` and `id`, and it invokes the function that retrieves the object based on its id. You need to add a key for `Discount` and its "get by id" function.
- [ ] 17.2 Override the default resolver for the `id` field in the `Discount` type so it returns a global ID. Use the `toGlobalId` function for that. You'll know it probably works because the following query will return ids in this format `VHJhaW5pbmc6NWU5MzRlNjhlMDZlM2QzN2Q4ZjIxYjVi` instead of `5e934e68e06e3d37d8f21b5b`:

```graphql
query {
  discounts {
    edges {
      node {
        id
      }
    }
  }
}
```

To check that task 17 is really completed, use any of the ids from the previous query (the id should look similar to this `sum6NWU5MzRlNjhlMDU5MzRlNjhlM2QzN2Q4Zj__dont_use_this_one_😜`) in the following query (if it works it should return some code):

```graphql
query {
  node(id: "🔥PUT_A_DISCOUNT_ID_HERE🔥") {
    ... on Discount {
      code
    }
  }
}
```

#### 🏋️‍♀️ Bonus exercise part 4

Congratulations! You have completed part 4 🎉

- [ ] Bonus exercise 4.1. Some clients don't need a [cursor on every edge](https://github.com/graphql/graphql-relay-js/issues/27). Since we can extend the spec, nothing stops us from doing:

```graphql
query {
  discounts {
    nodes {
      id
    }
  }
}
```

as long as we also enable the following query so our API is still spec compliant:

```graphql
query {
  discounts {
    edges {
      node {
        id
      }
    }
  }
}
```

Your task is to implement both in our queries GraphQL API.

An example of APIs that implement both queries are [Gatsby](https://www.gatsbyjs.org/docs/graphql-reference/#a-longer-query) and GitHub API V4.

- [ ] Bonus exercise 4.2. There are some commented out [mongoose virtuals](https://mongoosejs.com/docs/tutorials/virtuals.html#your-first-virtual) in `src/db/models/discount.js` and `src/db/models/training.js`. Among other things, they return the `__typename` for each object. Uncomment the virtuals on each model. Your task is to simplify the implementation of the `__resolveType` function in the `Node` field of the `Query` type using the `__typename` virtual from the model.

* [ ] Bonus exercise 4.3. What's best, A) to override the resolver of the field `id` for the `Training` type using the function `toGlobalId`, or B) to use the following virtual instead? You can uncomment the follwing virtual in `src/db/models/training.js`, try, and think about it.

```JavaScript
TrainingSchema.virtual("id").get(function() {
  return toGlobalId(TRAINING_TYPENAME, this._id);
});
```

## License

This material is available for private, non-commercial use under the [GPL version 3](http://www.gnu.org/licenses/gpl-3.0-standalone.html).
