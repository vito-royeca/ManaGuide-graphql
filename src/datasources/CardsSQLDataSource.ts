import { BatchedSQLDataSource, BatchedSQLDataSourceProps } from "@nic-jennings/sql-datasource";

import { MGCard, MGCards } from "../types";
import { CardsUtilities } from "./CardsUtilities";

export class CardsSQLDataSource extends BatchedSQLDataSource {
    utilities = new CardsUtilities();

    constructor(config: BatchedSQLDataSourceProps) {
        super(config);
    }

    async card(id: string): Promise<MGCard> {
        try {
            const params = [id];
            const sql = "select * from selectCard(?)";
            const data = await this.db.query
                .raw(sql, params)
            const rows = data.rows && data.rows.length >= 1 ? data.rows[0] : undefined;
            
            if (rows === undefined) {
                throw new Error(`Card with ID ${id} not found`);
            }
            return this.utilities.card(rows);
        } catch (error) {
            console.error("Error executing raw SQL query:", error);
            throw error;
        }
    }

    async cardPrintings(id: string, languageID: string): Promise<MGCards> {
        try {
            const params = [id, languageID, "set_release", "desc"];
            console.log("Executing SQL query with params:", params);
            const sql = "SELECT * from selectPrintings(?,?,?,?)";
            const data = await this.db.query
                .raw(sql, params)
            const rows = data.rows && data.rows.length >= 1 ? data.rows[0] : undefined;
            console.log(rows);
            if (rows === undefined) {
                throw new Error(`Card with ID ${id} not found`);
            }
            return this.utilities.cards(rows);
        } catch (error) {
            console.error("Error executing raw SQL query:", error);
            throw error;
        }
    }
}