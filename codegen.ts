import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: "./src/graphql/schema.graphql",
    watch: true,
    generates: {
        "./src/types.ts": {
            plugins: ["typescript", "typescript-resolvers"],
            config: {
                namingConvention: 'keep',
                contextType: "./context#DataSourceContext",
            },
        },
    },
};

export default config;