import { RESTDataSource } from "@apollo/datasource-rest";

import { MGCard, MGCards, SetByCodeInput } from "../types";
import { CardsUtilities } from "./CardsUtilities";

export class CardsRESTDataSource extends RESTDataSource {
    baseURL = "https://managuideapp.com/";

    async card(id: string): Promise<MGCard> {
        const utilities = new CardsUtilities();
        const data = await this.get<MGCard>(`card/${id}?json=true`);

        return utilities.card(data);
    }
    
    
}