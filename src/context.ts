import { MGSetsRESTDataSource } from "./datasources/MGSetsRESTDataSource";
import { MGSetsSQLDataSource } from "./datasources/MGSetsSQLDataSource";

export type DataSourceContext = {
    dataSources: {
        setsRESTDataSource: MGSetsRESTDataSource;
        setsSQLDataSource: MGSetsSQLDataSource;
    };
};