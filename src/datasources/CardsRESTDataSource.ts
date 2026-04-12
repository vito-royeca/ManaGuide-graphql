import { RESTDataSource } from "@apollo/datasource-rest";

import { MGCard } from "../types";
import { CardsUtilities } from "./CardsUtilities";

export class CardsRESTDataSource extends RESTDataSource {
    baseURL = "https://managuideapp.com/";
    utilities = new CardsUtilities();

    async card(id: string): Promise<MGCard> {
        const data = await this.get<MGCard>(`card/${id}?json=true`);

        return this.utilities.card(data);
    }
    
}