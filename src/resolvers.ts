import { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Query: {
    sets: (_, __, { dataSources }) => {
      // return dataSources.setsRESTDataSource.sets();
      return dataSources.setsSQLDataSource.sets();
    },
    setsByType: (_, { type }, { dataSources }) => {
      // return dataSources.setsRESTDataSource.setsByType(type);
      return dataSources.setsSQLDataSource.setsByType(type);
    },
    setByCode: (_, { code }, { dataSources }) => {
      // return dataSources.setsRESTDataSource.setByCode(code);
      return dataSources.setsSQLDataSource.setByCode(code);
    },
  },
};