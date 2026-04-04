import { MGSetsRESTDataSource } from "./datasources/MGSetsRESTDataSource";

export type DataSourceContext = {
    dataSources: {
        setsRESTDataSource: MGSetsRESTDataSource;
    };
};