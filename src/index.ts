import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { readFileSync } from "fs";
import path from "path";
import { gql } from "graphql-tag";

import { resolvers } from "./resolvers";
import { SetsRESTDataSource } from "./datasources/SetsRESTDataSource";
import { SetsSQLDataSource } from "./datasources/SetsSQLDataSource";
import { CardsSQLDataSource } from "./datasources/CardsSQLDataSource";

const typeDefs = gql(
    readFileSync(path.resolve(__dirname, "./graphql/schema.graphql"), {
        encoding: "utf-8",
    })
);

// In terminal, run: export PG_CONNECTION_STRING=postgres://[user]:[password]@[host]:[port]/[database]
const knexConfig = {
  client: "pg",
  connection: process.env.PG_CONNECTION_STRING,
};

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
                    cardsSQLDataSource: new CardsSQLDataSource({
                        knexConfig,
                        cache
                    }),
                    setsRESTDataSource: new SetsRESTDataSource({ cache }),
                    setsSQLDataSource: new SetsSQLDataSource({
                        knexConfig,
                        cache
                    }),
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