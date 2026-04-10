import { RESTDataSource } from "@apollo/datasource-rest";

import { MGSectionedSets, MGSet, MGSets, SetByCodeInput } from "../types";
import { SetsUtilities } from "./SetsUtilities";

export class SetsRESTDataSource extends RESTDataSource {
    baseURL = "https://managuideapp.com/";
    utilities = new SetsUtilities();
    
    async set(input: SetByCodeInput): Promise<MGSet> {
        const data = await this.get<MGSet>(`set/${input.code}/en?json=true&displayAs=image&sortedBy=${input.sortedBy || "name"}&orderBy=${input.orderBy || "asc"}`);
        return this.utilities.set(data);
    }

    async sets(): Promise<MGSets> {
        const data = await this.get<MGSet[]>("sets?json=true");

        return this.utilities.sets(data);
    }

    async setsByBlock(): Promise<MGSectionedSets> {
        const sets = (await this.sets()).sets;

        return this.utilities.setsByBlock(sets);
    }

    async setsByName(): Promise<MGSectionedSets> {
        const sets = (await this.sets()).sets;

        return this.utilities.setsByName(sets);
    }

    async setsByType(): Promise<MGSectionedSets> {
        const sets = (await this.sets()).sets;

        return this.utilities.setsByType(sets);
    }

    async setsByYear(): Promise<MGSectionedSets> {
        const sets = (await this.sets()).sets;

        return this.utilities.setsByYear(sets);
    }
}