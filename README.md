# GraphQL API Fundamentals

This exercise is part of the [React GraphQL Academy](http://reactgraphql.academy) learning material. The goal of this exercise is to help you understand how Relay Cursor Connections work.

## Learning objectives

- Understand Relay Cursor Connections
- Learn how and when to use GraphQL interfaces, unions, and fragments

## To get started

### Step 1

If you haven't already set up your project, head here and follow the instructions https://github.com/reactgraphqlacademy/graphql-api-training/blob/master/README.md

### Step 2

```console
git checkout relay
```

### Step 3

```console
yarn
```

## Exercise

- [ ] 1. Create in interface called INode with a field ID that can't be null.
  - [ ] 1.1 Character should implement the INode interface
  - [ ] 1.1 Episode should implement the INode interface. Hint, the ID type in Episode is not correct so you need to update it to comply with the interface
- [ ] 2. Create a union of Character and Episode called Node

### Bonus

- Create the field connectionCharacters in the Episode to return a CharactersConnection

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
