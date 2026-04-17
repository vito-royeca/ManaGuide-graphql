import { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Query: {
    set: (_, { input }, { dataSources }) => {
      if (!input) {
          throw new Error("input is required");
      }
      return dataSources.setsDataSource.set(input);
    },
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
    
    card: (_, { id }, { dataSources }) => {
      return dataSources.cardsDataSource.card(id);
    },

    cardPrintings: (_, { id, languageID }, { dataSources }) => {
      return dataSources.cardsDataSource.cardPrintings(id, languageID);
    },

    feeds: (_, __, { dataSources }) => {
      return dataSources.feedsDataSource.feeds();
    },
  }
};