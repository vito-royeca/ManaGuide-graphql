import { BatchedSQLDataSource, BatchedSQLDataSourceProps } from "@nic-jennings/sql-datasource";

import { MGRule, MGRules } from "../types";
import { RulesUtilities } from "./RulesUtilities";

export class RulesSQLDataSource extends BatchedSQLDataSource {
    utilities = new RulesUtilities();
    
    constructor(config: BatchedSQLDataSourceProps) {
        super(config);
    }

    async rules(): Promise<MGRules> {
        try {
            const sql = "select * from selectRules(null)";
            const data = await this.db.query
                .raw(sql)
            const rows = data.rows;

            if (rows === undefined) {
                throw new Error(`Rule Table of Contents not found`);
            }
            return this.utilities.ruleArray(rows);
        } catch (error) {
            console.error("Error executing raw SQL query: ", error);
            throw error;
        }
    }

    async rule(id: string): Promise<MGRule> {
        try {
            const params = [id];
            const sql = "SELECT * from selectRules(?)";
            const data = await this.db.query
                .raw(sql, params)
            const rows = data.rows && data.rows.length >= 1 ? data.rows[0] : undefined;

            if (rows === undefined) {
                throw new Error(`Rule with ID ${id} not found`);
            }
            
            return this.utilities.rule(rows);
        } catch (error) {
            console.error("Error executing raw SQL query: ", error);
            throw error;
        }
    }

    async rulesByQuery(query: string): Promise<MGRules> {
        try {
            const params = [query];
            const sql = `SELECT * from searchRules(?)`;
            const data = await this.db.query
                .raw(sql, params)
            const rows = data.rows;

            if (rows === undefined) {
                throw new Error(`Rules with query ${query} not found`);
            }
            return this.utilities.ruleArray(rows);
        } catch (error) {
            console.error("Error executing raw SQL query: ", error);
            throw error;
        }
    }
}