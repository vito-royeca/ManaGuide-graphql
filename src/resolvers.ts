export const resolvers = {
  Query: {
    getSets: (_, __, { dataSources }) => {
      return dataSources.MGSetsAPI.getSets();
    },
  },
};