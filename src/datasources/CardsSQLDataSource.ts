// import { BatchedSQLDataSource, BatchedSQLDataSourceProps } from "@nic-jennings/sql-datasource";
import camelcaseKeys from "camelcase-keys";

import { MGCard } from "../types";

export class CardsSQLDataSource /*extends BatchedSQLDataSource*/ {
    // constructor(config: BatchedSQLDataSourceProps) {
    //     super(config);
    // }

    // async card(id: string): Promise<MGCard> {
    //     try {
    //         const params = [id];
    //         const sql = "select * from selectCard(?)";
    //         const data = await this.db.query
    //             .raw(sql, params)
    //         const rows = data.rows && data.rows.length >= 1 ? data.rows[0] : undefined;
    //         let cardData = rows ? camelcaseKeys(rows, { deep: true }) : undefined;
            
    //         if (cardData === undefined) {
    //             throw new Error(`Card with ID ${id} not found`);
    //         }
    //         cardData = Array.isArray(cardData) ? cardData[0] : cardData;
    //         return cardData;
    //     } catch (error) {
    //         console.error("Error executing raw SQL query:", error);
    //         throw error;
    //     }
    // }
}