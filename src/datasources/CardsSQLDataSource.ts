import { BatchedSQLDataSource, BatchedSQLDataSourceProps } from "@nic-jennings/sql-datasource";

import { MGCard, MGCards, SetByCodeInput } from "../types";
import { CardsUtilities } from "./CardsUtilities";

export class CardsSQLDataSource extends BatchedSQLDataSource {
    constructor(config: BatchedSQLDataSourceProps) {
        super(config);
    }

    async card(id: string): Promise<MGCard> {
        try {
            const utilities = new CardsUtilities();
            const params = [id];
            const sql = "select * from selectCard(?)";
            const data = await this.db.query
                .raw(sql, params)
            const rows = data.rows && data.rows.length >= 1 ? data.rows[0] : undefined;
            
            if (rows === undefined) {
                throw new Error(`Card with ID ${id} not found`);
            }
            return utilities.card(rows);
        } catch (error) {
            console.error("Error executing raw SQL query:", error);
            throw error;
        }
    }
}