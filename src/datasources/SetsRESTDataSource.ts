import { RESTDataSource } from "@apollo/datasource-rest";
import camelcaseKeys from "camelcase-keys";

import { MGSet, MGSets } from "../types";

export class SetsRESTDataSource extends RESTDataSource {
    baseURL = "https://managuideapp.com/";

    async set(code: string): Promise<MGSet> {
        const data = await this.get<MGSet>(`set/${code}/en?json=true&displayAs=image&sortedBy=name&orderBy=asc`);
        const setData = camelcaseKeys(data, { deep: true });

        return Array.isArray(setData) ? setData[0] : setData;
    }

    async sets(): Promise<MGSets> {
        const data = await this.get<MGSet[]>("sets?json=true");
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
}