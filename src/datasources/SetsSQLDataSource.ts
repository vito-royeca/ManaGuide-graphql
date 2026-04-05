import { BatchedSQLDataSource, BatchedSQLDataSourceProps } from "@nic-jennings/sql-datasource";
import { Knex } from 'knex';
import camelcaseKeys from "camelcase-keys";

import { MGSet, MGSets, SetByCodeInput } from "../types";

export class SetsSQLDataSource extends BatchedSQLDataSource {
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

    async setByCode(input: SetByCodeInput): Promise<MGSet> {
        try {
            let setData: MGSet[];
            
            if (input.sortedBy === "name" && input.orderBy === "asc") {
                const fromClause = `matv_cmset_${input.code}_${input.language}`;
                const data = await this.db.query
                    .select("*")
                    .from(fromClause)
                    .cache(10);
                setData = camelcaseKeys(data, { deep: true });
                
            } else {
                const params = [input.code, input.language, input.sortedBy || "name", input.orderBy || "asc"];
                const sql = "select * from selectSet(?,?,?,?)";
                const data = await this.db.query
                    .raw(sql, params)
                const rows = data.rows && data.rows.length >= 1 ? data.rows[0] : null;
                setData = camelcaseKeys(rows || data, { deep: true });
            }
            return Array.isArray(setData) ? setData[0] : setData;
            
        } catch (error) {
            console.error("Error executing raw SQL query:", error);
            throw error;
        }
    }
}