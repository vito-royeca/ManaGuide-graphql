import { CardsSQLDataSource } from "./datasources/CardsSQLDataSource";
import { SetsRESTDataSource } from "./datasources/SetsRESTDataSource";
import { SetsSQLDataSource } from "./datasources/SetsSQLDataSource";

export type DataSourceContext = {
    dataSources: {
        cardsSQLDataSource: CardsSQLDataSource;
        setsRESTDataSource: SetsRESTDataSource;
        setsSQLDataSource: SetsSQLDataSource;
    };
};