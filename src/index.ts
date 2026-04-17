import { ApolloServer } from "@apollo/server";
import { 
    ApolloServerPluginLandingPageLocalDefault,
    ApolloServerPluginLandingPageProductionDefault
} from '@apollo/server/plugin/landingPage/default';
import { startStandaloneServer } from "@apollo/server/standalone";

import dotenv from "dotenv";
import { readFileSync } from "node:fs";
import path from "node:path";
import { gql } from "graphql-tag";

import { CardsSQLDataSource } from "./datasources/CardsSQLDataSource";
import { CardsRESTDataSource } from "./datasources/CardsRESTDataSource";
import { FeedsDataSource } from "./datasources/FeedsDataSource";
import { resolvers } from "./resolvers";
import { SetsRESTDataSource } from "./datasources/SetsRESTDataSource";
import { SetsSQLDataSource } from "./datasources/SetsSQLDataSource";

dotenv.config();

const typeDefs = gql(
    readFileSync(path.resolve(__dirname, "./graphql/schema.graphql"), {
        encoding: "utf-8",
    })
);

function createDataSources(cache: any) {
    if (process.env.DATASOURCE_TYPE === "SQL") {
        const knexConfig = {
            client: "pg",
            // postgres://[user]:[password]@[host]:[port]/[database]
            connection: process.env.PG_CONNECTION_STRING
        };
        return {
            dataSources: {
                cardsDataSource: new CardsSQLDataSource({ knexConfig, cache }),
                feedsDataSource: new FeedsDataSource(),
                setsDataSource: new SetsSQLDataSource({ knexConfig, cache }),
            },
        };
    } else {
        return {
            dataSources: {
                cardsDataSource: new CardsRESTDataSource({ cache }),
                feedsDataSource: new FeedsDataSource(),
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
        plugins: [
            // Install a landing page plugin based on NODE_ENV
            process.env.NODE_ENV === 'production'
            ? ApolloServerPluginLandingPageProductionDefault({
                graphRef: 'my-graph-id@my-graph-variant',
                footer: false,
                })
            : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
        ],
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