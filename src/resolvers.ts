import { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Query: {
    cardByID: (_, { id }, { dataSources }) => {
      return dataSources.cardsSQLDataSource.cardByID(id);
    },
    sets: (_, __, { dataSources }) => {
      // return dataSources.setsRESTDataSource.sets();
      return dataSources.setsSQLDataSource.sets();
    },
    setsByType: (_, { type }, { dataSources }) => {
      // return dataSources.setsRESTDataSource.setsByType(type);
      return dataSources.setsSQLDataSource.setsByType(type);
    },
    setByCode: (_, { input }, { dataSources }) => {
      // return dataSources.setsRESTDataSource.setByCode(code);
      if (!input) {
          throw new Error("input is required");
      }
      return dataSources.setsSQLDataSource.setByCode(input);
    }
  },
};