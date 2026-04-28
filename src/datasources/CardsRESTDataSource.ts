import { RESTDataSource } from "@apollo/datasource-rest";

import { MGCard, MGCards } from "../types";
import { CardsUtilities } from "./CardsUtilities";

export class CardsRESTDataSource extends RESTDataSource {
    baseURL = "https://managuideapp.com/";
    utilities = new CardsUtilities();

    async card(id: string): Promise<MGCard> {
        const data = await this.get<MGCard>(`card/${id}?json=true`);

        return this.utilities.card(data);
    }

    async cardPrintings(id: string, languageID: string): Promise<MGCards> {
        const data = await this.get<MGCard[]>(`printings/${id}/${languageID}?sortedBy=set_release&orderBy=desc&json=true`);

        return this.utilities.cardArray(data);
    }

    async cardsByIDs(ids: string[]): Promise<MGCards> {
        return {
            "count": 0,
            "cards": []
        };
    }
}