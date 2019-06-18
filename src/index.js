const fetch = require("node-fetch");
const { ApolloServer, gql } = require("apollo-server");
const {
  fromGlobalId,
  toGlobalId,
  connectionFromArray
} = require("graphql-relay");
const mockedCharacters = require("../mocks/characters.json");

const CHARACTER_TYPE = "Character";
const EPISODE_TYPE = "Episode";

const typeDefs = gql`
  type PageInfo {
    # https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo.Fields
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    totalCount: Int # this is not part of the Relay specification but it's widely used
  }

  type CharacterEdge {
    # https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types
    cursor: String!
    node: Character
  }

  type CharactersConnection {
    # https://facebook.github.io/relay/graphql/connections.htm#sec-Connection-Types.Fields
    pageInfo: PageInfo!
    edges: [CharacterEdge]
  }

  type Character {
    id: ID!
    name: String
    status: String
    episodes: [Episode]
  }

  type Episode {
    id: ID
    name: String
    characters: [Character]
  }

  type Query {
    # TODO: add a node field
    # TODO: add a charactersConnection field
    character(id: Int): Character
    episodes: [Episode]
    episode(id: Int): Episode
  }
`;

const resolvers = {
  Query: {
    // You can use the following commented out code to implement the charactersConnection resolver
    // charactersConnection: async (_, args) => {
    //   const pageInfo = {};
    //   const edges = [];

    //   return {
    //     pageInfo,
    //     edges
    //   };
    // },

    // You can use the following commented out code to implement the node resolver
    // node: (_, args) => null,
    character: (_, args) => fetchCharacterById(args.id),
    episodes: () => fetchEpisodes(),
    episode: (_, args) => fetchEpisodeById(args.id)
  },
  Episode: {
    characters: parent => {
      const { characters = [] } = parent;
      return characters.map(fetchCharacterByUrl);
    }
  },
  Character: {
    id: parent => parent.id, // override the id field to return a global id for the Character type
    episodes: parent => {
      const characterEpisodes = parent.episode || [];
      return characterEpisodes.map(fetchEpisodeByUrl);
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

function getObjectById({ type, id }) {
  const types = {
    // TODO
  };

  return types[type](id);
}

function fetchEpisodesData() {
  return fetch("https://rickandmortyapi.com/api/episode/").then(res =>
    res.json()
  );
}

function fetchEpisodeById(id) {
  return fetch("https://rickandmortyapi.com/api/episode/" + id)
    .then(res => res.json())
    .then(json => json);
}

function fetchEpisodeByUrl(url) {
  return fetch(url)
    .then(res => res.json())
    .then(json => json);
}

function fetchCharactersData() {
  return fetch("https://rickandmortyapi.com/api/character/").then(res =>
    res.json()
  );
}

function fetchCharacterById(id) {
  return fetch("https://rickandmortyapi.com/api/character/" + id)
    .then(res => res.json())
    .then(json => json);
}

function fetchCharacterByUrl(url) {
  return fetch(url)
    .then(res => res.json())
    .then(json => json);
}
