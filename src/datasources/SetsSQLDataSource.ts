import { BatchedSQLDataSource, BatchedSQLDataSourceProps } from "@nic-jennings/sql-datasource";

import { MGSectionedSets, MGSet, MGSets, SetByCodeInput } from "../types";
import { SetsUtilities } from "./SetsUtilities";

export class SetsSQLDataSource extends BatchedSQLDataSource {
    constructor(config: BatchedSQLDataSourceProps) {
        super(config);
    }

    async set(input: SetByCodeInput): Promise<MGSet> {
        try {
            const utilities = new SetsUtilities();
            const setsData = (await this.sets()).sets;

            if (input.sortedBy === "name" && input.orderBy === "asc") {
                const fromClause = `matv_cmset_${input.code}_${input.language}`;
                const data = await this.db.query
                    .select("*")
                    .from(fromClause)
                    .cache(10);
                return utilities.set(data);
            } else {
                const params = [input.code, input.language, input.sortedBy || "name", input.orderBy || "asc"];
                const sql = "select * from selectSet(?,?,?,?)";
                const data = await this.db.query
                    .raw(sql, params)
                const setsData = data.rows && data.rows.length >= 1 ? data.rows[0] : undefined;

                if (setsData === undefined) {
                    throw new Error(`Set with code ${input.code} not found`);
                }
                return utilities.set(setsData);
            }
        } catch (error) {
            console.error("Error executing raw SQL query:", error);
            throw error;
        }
    }

    async sets(): Promise<MGSets> {
        const utilities = new SetsUtilities();
        const data = await this.db.query
            .select("*")
            .from("matv_cmsets")
            .cache(10);

        return utilities.sets(data);
    }

    async setsByBlock(): Promise<MGSectionedSets> {
        const utilities = new SetsUtilities();
        const sets = (await this.sets()).sets;

        return utilities.setsByBlock(sets);
    }

    async setsByName(): Promise<MGSectionedSets> {
        const utilities = new SetsUtilities();
        const sets = (await this.sets()).sets;

        return utilities.setsByName(sets);
    }

    async setsByType(): Promise<MGSectionedSets> {
        const utilities = new SetsUtilities();
        const sets = (await this.sets()).sets;

        return utilities.setsByType(sets);
    }

    async setsByYear(): Promise<MGSectionedSets> {
        const utilities = new SetsUtilities();
        const sets = (await this.sets()).sets;

        return utilities.setsByYear(sets);
    }
}