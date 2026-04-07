import { CardsSQLDataSource } from "./datasources/CardsSQLDataSource";
import { SetsRESTDataSource } from "./datasources/SetsRESTDataSource";
import { SetsSQLDataSource } from "./datasources/SetsSQLDataSource";

export type RESTDataSourceContext = {
    dataSources: {
        setsDataSource: SetsRESTDataSource;
    };
};

export type SQLDataSourceContext = {
    dataSources: {
        cardsDataSource: CardsSQLDataSource;
        setsDataSource: SetsSQLDataSource;
    };
};