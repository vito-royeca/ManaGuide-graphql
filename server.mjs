import { createServer } from "node:http";
import { createYoga, createSchema } from "graphql-yoga";
import { readFile } from "node:fs/promises";
import camelcaseKeys from 'camelcase-keys';

const typeDefs = /* GraphQL */ `
  type Set {
    code: String!
    name: String!
    releaseDate: String!
    cardCount: Int!
    isFoilOnly: Boolean!
    isOnlineOnly: Boolean!
    logoCode: String!
    mtgoCode: String
    keyruneUnicode: String!
    keyruneClass: String!
    yearSection: String!
    tcgplayerId: Int!
    setParent: Set
    setBlock: SetBlock
    setType: SetType!
    languages: [Language!]!
  }

  type SetType {
    name: String!
  }

  type Language {
    code: String!
    displayCode: String!
    name: String!
  }

  type SetBlock {
    name: String!
    code: String!
  }

  type SetType {
    name: String!
  }

  type Query {
    sets: [Set!]!
    getSets(category: String): [Set!]!
    getSet(code: String!): Set
    Set: Set
  }  
`;

let sets = [Set];
const readSets = async () => {
  const data = await readFile('./sets.json', 'utf8');
  sets = camelcaseKeys(JSON.parse(data));
};

const resolvers = {
  Query: {
    sets: () => sets,
    getSets: (_, { category }) => {
      const filteredSets = category
        ? sets.filter(set => set.category === category)
        : sets;

      return filteredSets.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    },
    getSet: (_, { code }) => {
      return sets.find(set => set.code === code);
    },
    Set: {
      setParent: (parent, args, context, info) => parent?.code ? sets.find(s => s.code === parent.code) : null
    },
  },
};

const yoga = createYoga({
  schema: createSchema({ typeDefs, resolvers }),
  graphqlEndpoint: "/graphql",
});

const server = createServer(yoga);

await readSets();
server.listen(4000, () => {  
  console.log("🚀 GraphQL ready at http://localhost:4000/graphql");
});