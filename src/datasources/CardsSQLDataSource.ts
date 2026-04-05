import { BatchedSQLDataSource, BatchedSQLDataSourceProps } from "@nic-jennings/sql-datasource";
import { Knex } from 'knex';
import camelcaseKeys from "camelcase-keys";

import { MGCard } from "../types";

export class CardsSQLDataSource extends BatchedSQLDataSource {
    constructor(config: BatchedSQLDataSourceProps) {
        super(config);
    }

    // async sets(): Promise<MGSets> {
    //     const data = await this.db.query
    //         .select("*")
    //         .from("matv_cmsets")
    //         // .where({ id: 1 })
    //         .cache(10);
    //     const setsData = camelcaseKeys(data, { deep: true });

    //     return {
    //         count: setsData.length,
    //         sets: setsData
    //     };
    // }
    

    // async setsByType(type: string): Promise<MGSets> {
    //     const sets = await this.sets();
    //     const filteredSets = sets.sets.filter(set => set.setType.name === type);

    //     return {
    //         count: filteredSets.length,
    //         sets: filteredSets
    //     };
    // }

    async cardByID(id: string): Promise<MGCard> {
        try {
            const params = [id];
            const sql = "select * from selectCard(?)";
            const data = await this.db.query
                .raw(sql, params)
            const rows = data.rows && data.rows.length >= 1 ? data.rows[0] : null;
            const cardData = camelcaseKeys(rows || data, { deep: true });

            return cardData;
            
        } catch (error) {
            console.error("Error executing raw SQL query:", error);
            throw error;
        }
    }
}