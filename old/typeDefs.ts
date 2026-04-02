const typeDefs = /* GraphQL */ `
  type Language {
    code: String!
    displayCode: String!
    name: String!
  }

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

  type Sets {
    count: Int!
    sets: [Set!]!
  }

  type SetType {
    name: String!
  }

  type SetBlock {
    name: String!
    code: String!
  }

  type Query {
    sets: Sets
    getSets(type: String): Sets
    getSet(code: String!): Set
  }
  
  type Mutation {
    addSet(in: SetInput!): Set!
  }
  
  input SetInput {
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
    setParent: String
    setBlock: String
    setType: String!
    languages: [Language!]!
  }
`;

const resolvers = {
  Query: {
    sets: () => {
      const sortedSets = sets.slice().sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));

      return {
        count: sets.length,
        sets: sortedSets,
      };
    },

    getSets: (_, { type }) => {
      const filteredSets = type
        ? sets.filter(set => set.setType.name === type)
        : sets;

      const sortedSets = filteredSets.slice().sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));

      return {
        count: filteredSets.length,
        sets: sortedSets,
      };
    },

    getSet: (_, { code }) => {
      return sets.find(set => set.code === code);
    }
  },
  Mutation: {
    addSet: (_, { in: setInput }) => {
      if (sets.some(set => set.code === setInput.code)) {
        throw new Error(`Set with code "${setInput.code}" already exists.`);
      }

      const setParent = sets.find(set => set.code === setInput.setParent);
      const setBlock = setBlocks.find(block => block.code === setInput.setBlock);
      const setType = setTypes.find(type => type.name === setInput.setType);
      if (!setType) {
        throw new Error(`Set type "${setInput.setType}" not found.`);
      }

      const setLanguages = setInput.languages.map(langInput => {
        let language = languages.find(lang => lang.code === langInput.code);
        if (!language) {
          language = { ...langInput };
          languages.push(language);
        }
        return language;
      });

      const newSet = {
        ...setInput,
        setParent: setParent ? { ...setParent } : null,
        setBlock: setBlock ? { ...setBlock } : null,
        setType: { ...setType },
        languages: setLanguages,
      };
      sets.push(newSet);
      return newSet;
    },
  }
};