import { BatchedSQLDataSource, BatchedSQLDataSourceProps } from "@nic-jennings/sql-datasource";
import { Knex } from 'knex';
import camelcaseKeys from "camelcase-keys";

import { MGSet, MGSets } from "../types";

export class MGSetsSQLDataSource extends BatchedSQLDataSource {
    constructor(config: BatchedSQLDataSourceProps) {
        super(config);
    }

    async sets(): Promise<MGSets> {
        const data = await this.db.query
            .select("*")
            .from("matv_cmsets")
            // .where({ id: 1 })
            .cache(10);
        const setsData = camelcaseKeys(data, { deep: true });

        return {
            count: setsData.length,
            sets: setsData
        };
    }
    

    async setsByType(type: string): Promise<MGSets> {
        const sets = await this.sets();
        const filteredSets = sets.sets.filter(set => set.setType.name === type);

        return {
            count: filteredSets.length,
            sets: filteredSets
        };
    }

    async setByCode(code: string): Promise<MGSet> {
        try {
            const params = [code, 'en', 'name', 'asc'];
            const sql = "select * from selectSet(?,?,?,?)";
            const data = await this.db.query.raw(sql, params);
            const setData = camelcaseKeys(data, { deep: true });
            return Array.isArray(setData.rows) ? setData.rows[0] : setData;
        } catch (error) {
            console.error("Error executing raw SQL query:", error);
            throw error;
        }
    }
}