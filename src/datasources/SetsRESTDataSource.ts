import { RESTDataSource } from "@apollo/datasource-rest";

import { MGSectionedSets, MGSet, MGSets, SetByIDInput } from "../types";
import { SetsUtilities } from "./SetsUtilities";

export class SetsRESTDataSource extends RESTDataSource {
    baseURL = "https://managuideapp.com/";
    utilities = new SetsUtilities();
    
    async set(input: SetByIDInput): Promise<MGSet> {
        const data = await this.get<MGSet>(`set/${input.setID}/${input.languageID}?json=true&displayAs=image&sortedBy=${input.sortedBy || "name"}&orderBy=${input.orderBy || "asc"}`);
        return this.utilities.set(data, input.languageID);
    }

    async sets(): Promise<MGSets> {
        const data = await this.get<MGSet[]>("sets?json=true");

        return this.utilities.sets(data);
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