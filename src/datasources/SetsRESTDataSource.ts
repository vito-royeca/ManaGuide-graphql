import { RESTDataSource } from "@apollo/datasource-rest";

import { MGSectionedSets, MGSet, MGSets, SetByCodeInput } from "../types";
import { SetsUtilities } from "./SetsUtilities";

export class SetsRESTDataSource extends RESTDataSource {
    baseURL = "https://managuideapp.com/";

    async set(input: SetByCodeInput): Promise<MGSet> {
        const utilities = new SetsUtilities();
        const data = await this.get<MGSet>(`set/${input.code}/en?json=true&displayAs=image&sortedBy=${input.sortedBy || "name"}&orderBy=${input.orderBy || "asc"}`);
        return utilities.set(data);
    }

    async sets(): Promise<MGSets> {
        const utilities = new SetsUtilities();
        const data = await this.get<MGSet[]>("sets?json=true");

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