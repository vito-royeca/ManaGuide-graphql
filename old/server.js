import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { buildSchema } from "type-graphql";

import { MGSetResolver } from "./MGSetResolver.js";

const schema = await buildSchema({
    resolvers: [MGSetResolver],
    // Create 'schema.graphql' file with schema definition in current directory
    emitSchemaFile: path.resolve(__dirname, "schema.graphql"),
});

const yoga = createYoga({
    schema: schema,
    graphqlEndpoint: "/graphql",
});

const server = createServer(yoga);

server.listen(4000, () => {  
    console.log("🚀 GraphQL ready at http://localhost:4000/graphql");
});