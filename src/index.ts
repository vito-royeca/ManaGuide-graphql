import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { readFileSync } from "node:fs";
import path from "node:path";
import { gql } from "graphql-tag";

import { resolvers } from "./resolvers";
import { SetsRESTDataSource } from "./datasources/SetsRESTDataSource";
import { SetsSQLDataSource } from "./datasources/SetsSQLDataSource";
import { CardsSQLDataSource } from "./datasources/CardsSQLDataSource";
import { CardsRESTDataSource } from "./datasources/CardsRESTDataSource";

const typeDefs = gql(
    readFileSync(path.resolve(__dirname, "./graphql/schema.graphql"), {
        encoding: "utf-8",
    })
);

// In terminal, run:
// export PG_CONNECTION_STRING=postgres://[user]:[password]@[host]:[port]/[database]
// export DATASOURCE_TYPE=SQL | REST
// export NODE_ENV=qa |development | production
// export PORT=4000
// or set these environment variables in a .env file and use dotenv to load them

function createDataSources(cache: any) {
    if (process.env.DATASOURCE_TYPE === "SQL") {
        const knexConfig = {
            client: "pg",
            connection: process.env.PG_CONNECTION_STRING,
        };
        return {
            dataSources: {
                cardsDataSource: new CardsSQLDataSource({ knexConfig, cache }),
                setsDataSource: new SetsSQLDataSource({ knexConfig, cache }),
            },
        };
    } else {
        return {
            dataSources: {
                cardsDataSource: new CardsRESTDataSource({ cache }),
                setsDataSource: new SetsRESTDataSource({ cache }),
            },
        };
    }
}

async function startApolloServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        introspection: process.env.NODE_ENV !== "production",
    });

    const { url } = await startStandaloneServer(server, {
        context: async () => {
            const { cache } = server;
            const dataSources = createDataSources(cache).dataSources;

            return {
                dataSources
            };
        },
        listen: { port: Number(process.env.PORT) || 4000 },
    });
  
    console.log(`
        🚀  Server is running!
        📭  Query at ${url}
    `);
}

startApolloServer();