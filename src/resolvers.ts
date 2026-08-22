import { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Query: {
    // Cards
    card: (_, { id }, { dataSources }) => {
      return dataSources.cardsDataSource.card(id);
    },

    cardPrintings: (_, { id, languageID }, { dataSources }) => {
      return dataSources.cardsDataSource.cardPrintings(id, languageID);
    },

    cardsByIDs: (_, { ids }, { dataSources }) => {
      return dataSources.cardsDataSource.cardsByIDs(ids);
    },

    cardsSearch: (_, { query }, { dataSources }) => {
      return dataSources.cardsDataSource.cardsSearch(query);
    },

    // Feeds
    feeds: (_, __, { dataSources }) => {
      return dataSources.feedsDataSource.feeds();
    },

    // Rules

    glossarySearch: (_, { letter }, { dataSources }) => {
      return dataSources.rulesDataSource.glossarySearch(letter);
    },

    rules: (_, { id }, { dataSources }) => {
      return dataSources.rulesDataSource.rules(id);
    },

    rulesSearch: (_, { query }, { dataSources }) => {
      return dataSources.rulesDataSource.rulesSearch(query);
    },

    // Set
    set: (_, { input }, { dataSources }) => {
      if (!input) {
          throw new Error("input is required");
      }
      return dataSources.setsDataSource.set(input);
    },

    // Sets
    sets: (_, __, { dataSources }) => {
      return dataSources.setsDataSource.sets();
    },
    setsByName: (_, __, { dataSources }) => {
      return dataSources.setsDataSource.setsByName();
    },
    setsByType: (_, __, { dataSources }) => {
      return dataSources.setsDataSource.setsByType();
    },
    setsByYear: (_, __, { dataSources }) => {
      return dataSources.setsDataSource.setsByYear();
    },
  }
};