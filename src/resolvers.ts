import { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Query: {
    sets: (_, __, { dataSources }) => {
      return dataSources.setsRESTDataSource.sets();
    },
    setsByType: (_, { type }, { dataSources }) => {
      return dataSources.setsRESTDataSource.setsByType(type);
    },
    setByCode: (_, { code }, { dataSources }) => {
      return dataSources.setsRESTDataSource.setByCode(code);
    },
  },
};