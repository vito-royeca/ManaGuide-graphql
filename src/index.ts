import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { readFileSync } from "fs";
import path from "path";
import { gql } from "graphql-tag";

import { resolvers } from "./resolvers";
import { MGSetsRESTDataSource } from "./datasources/MGSetsRESTDataSource";

const typeDefs = gql(
    readFileSync(path.resolve(__dirname, "./graphql/schema.graphql"), {
        encoding: "utf-8",
    })
);

async function startApolloServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    const { url } = await startStandaloneServer(server, {
        context: async () => {
            const { cache } = server;

            return {
                dataSources: {
                    setsRESTDataSource: new MGSetsRESTDataSource({ cache }),
                },
            };
        },
    });
  
    console.log(`
        🚀  Server is running!
        📭  Query at ${url}
    `);
}

startApolloServer();