import { BatchedSQLDataSource, BatchedSQLDataSourceProps } from "@nic-jennings/sql-datasource";

import { MGRule, MGRules } from "../types";
import { RulesUtilities } from "./RulesUtilities";

export class RulesSQLDataSource extends BatchedSQLDataSource {
    utilities = new RulesUtilities();
    
    constructor(config: BatchedSQLDataSourceProps) {
        super(config);
    }

    async rules(id: string | undefined): Promise<MGRules> {
        try {
            const params = id === undefined ? [] : [id];
            const sql = `select * from selectRules(${id === undefined ? "null" : "?"})`;
            const data = await this.db.query
                .raw(sql, params)
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

    async rulesSearch(query: string): Promise<MGRules> {
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

    async glossarySearch(letter: string): Promise<MGRules> {
        try {
            const params = [letter];
            const sql = `SELECT * from searchGlossary(?)`;
            const data = await this.db.query
                .raw(sql, params)
            const rows = data.rows;

            if (rows === undefined) {
                throw new Error(`Glossary with letter ${letter} not found`);
            }
            return this.utilities.ruleArray(rows);
        } catch (error) {
            console.error("Error executing raw SQL query: ", error);
            throw error;
        }
    }
}