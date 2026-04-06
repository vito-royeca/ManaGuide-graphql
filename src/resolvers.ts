import { MGLanguage, MGSetType, Resolvers } from "./types";

export const resolvers: Resolvers = {
  Query: {
    set: (_, { input }, { dataSources }) => {
      if (!input) {
          throw new Error("input is required");
      }
      return dataSources.setsSQLDataSource.set(input);
    },
    sets: (_, __, { dataSources }) => {
      return dataSources.setsSQLDataSource.sets();
    },
    setsByName: (_, __, { dataSources }) => {
      return dataSources.setsSQLDataSource.setsByName();
    },
    setsByType: (_, __, { dataSources }) => {
      return dataSources.setsSQLDataSource.setsByType();
    },
    setsByYear: (_, __, { dataSources }) => {
      return dataSources.setsSQLDataSource.setsByYear();
    },
    
    card: (_, { id }, { dataSources }) => {
      return dataSources.cardsSQLDataSource.card(id);
    },
  }
};