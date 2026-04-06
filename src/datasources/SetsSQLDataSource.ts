import { BatchedSQLDataSource, BatchedSQLDataSourceProps } from "@nic-jennings/sql-datasource";
import { Knex } from 'knex';
import camelcaseKeys from "camelcase-keys";

import { MGCard, MGLanguage, MGSectionedSet, MGSectionedSets, MGSet, MGSetBlock, MGSets, MGSetType, SetByCodeInput } from "../types";

export class SetsSQLDataSource extends BatchedSQLDataSource {
    constructor(config: BatchedSQLDataSourceProps) {
        super(config);
    }

    async set(input: SetByCodeInput): Promise<MGSet> {
        try {
            let setData: MGSet;

            if (input.sortedBy === "name" && input.orderBy === "asc") {
                const fromClause = `matv_cmset_${input.code}_${input.language}`;
                const data = await this.db.query
                    .select("*")
                    .from(fromClause)
                    .cache(10);
                setData = camelcaseKeys(data, { deep: true });
                console.log(setData);
            } else {
                const params = [input.code, input.language, input.sortedBy || "name", input.orderBy || "asc"];
                const sql = "select * from selectSet(?,?,?,?)";
                const data = await this.db.query
                    .raw(sql, params)
                const rows = data.rows && data.rows.length >= 1 ? data.rows[0] : undefined;
                setData = rows ? camelcaseKeys(rows, { deep: true }) : undefined;
            }

            if (setData === undefined) {
                throw new Error(`Set with code ${input.code} not found`);
            }
            setData = Array.isArray(setData) ? setData[0] : setData;
            return setData;
            
        } catch (error) {
            console.error("Error executing raw SQL query:", error);
            throw error;
        }
    }

    async sets(): Promise<MGSets> {
        const data = await this.db.query
            .select("*")
            .from("matv_cmsets")
            .cache(10);
        const setsData = camelcaseKeys(data, { deep: true });
        
        return {
            count: setsData.length,
            sets: setsData
        };
    }

    async setsByName(): Promise<MGSectionedSets> {
        const sets = (await this.sets()).sets;
        const regex = /^[\p{L}]/u;
        const keys = new Set(sets.flatMap( (d) => 
            regex.test(d.name[0]) ? d.name[0].toUpperCase() : "#").sort()    
        );
        let arrays: MGSectionedSet[] = [];

        keys.forEach(function (item, _) {
            let slice: MGSet[] = [];

            if (item === '#') {
                slice = sets.filter(d => !regex.test(d.name[0]))
            } else {
                slice = sets.filter(d => d.name.toUpperCase().startsWith(item))
            }
            arrays.push({ count: slice.length, section: item, sets: slice });
        });

        return {
            count: sets.length,
            sections: Array.from(keys).sort(),
            sectionedSets: arrays
        };
    }

    async setsByType(): Promise<MGSectionedSets> {
        const sets = (await this.sets()).sets;
        const regex = /^[\p{L}]/u;
        const keys = new Set(sets.flatMap( (d) => 
            regex.test(d.setType.name[0]) ? d.setType.name[0].toUpperCase() : "#").sort()    
        );
        let arrays: MGSectionedSet[] = [];

        keys.forEach(function (item, _) {
            let slice: MGSet[] = [];

            if (item === '#') {
                slice = sets.filter(d => !regex.test(d.setType.name[0]))
            } else {
                slice = sets.filter(d => d.setType.name.toUpperCase().startsWith(item))
            }
            arrays.push({ count: slice.length, section: item, sets: slice });
        });

        return {
            count: sets.length,
            sections: Array.from(keys).sort(),
            sectionedSets: arrays
        };
    }

    async setsByYear(): Promise<MGSectionedSets> {
        const sets = (await this.sets()).sets;
        const regex = /^[\p{L}]/u;
        const keys = new Set(sets.flatMap( (d) => d.yearSection).sort());
        let arrays: MGSectionedSet[] = [];

        keys.forEach(function (item, _) {
            let slice: MGSet[] = sets.filter(d => d.yearSection === item);
            arrays.push({ count: slice.length, section: item, sets: slice });
        });

        return {
            count: sets.length,
            sections: Array.from(keys).sort(),
            sectionedSets: arrays
        };
    }

    // async setBlock(code: string): Promise<MGSetBlock> {
    //     const selectColumns = [
    //         "code",
    //         "name",
    //     ];
    //     const data = await this.db.query
    //         .select(selectColumns)
    //         .from("cmsetblock")
    //         .where({ code: code })
    //         .cache(10);
    //     const setBlockData = camelcaseKeys(data, { deep: true });
    //     return setBlockData;
    // }

    // async setType(name: string): Promise<MGSetType> {
    //     const selectColumns = [
    //         "name",
    //     ];
    //     const data = await this.db.query
    //         .select(selectColumns)
    //         .from("cmsettype")
    //         .where({ name: name })
    //         .cache(10);
    //     const setTypeData = camelcaseKeys(data, { deep: true });
    //     return setTypeData;
    // }

    // async setLanguages(code: string): Promise<MGLanguage[]> {
    //     const selectColumns = [
    //         "cmlanguage.code as code",
    //         "cmlanguage.display_code as displayCode",
    //         "cmlanguage.name as name",
    //     ];
    //     const data = await this.db.query
    //         .select(selectColumns)
    //         .from("cmset_language")
    //         .leftJoin('cmlanguage', function() {
    //             this.on('cmset_language.cmlanguage', '=', 'cmlanguage.code')
    //         })
    //         .where({ "cmset_language.cmset": code })
    //         .cache(10);
    //     const setLanguagesData = camelcaseKeys(data, { deep: true });
    //     return Array.isArray(setLanguagesData) ? setLanguagesData : [setLanguagesData];
    // }

    // async cardsByCode(input: SetByCodeInput): Promise<MGCard[]> {
    //     try {
    //         const params = [input.code, input.language, input.sortedBy || "name", input.orderBy || "asc"];
    //         const sql = "select * from selectCards(?,?,?,?)";
    //         const data = await this.db.query
    //             .raw(sql, params)
    //         const rows = data.rows && data.rows.length >= 1 ? data.rows : null;
    //         const cardData = camelcaseKeys(rows || data, { deep: true });
    //         return Array.isArray(cardData) ? cardData : [cardData];

    //     } catch (error) {
    //         console.error("Error executing raw SQL query:", error);
    //         return [];
    //     }
    // }
}