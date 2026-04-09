import camelcaseKeys from "camelcase-keys";

import { MGCard, MGCards } from "../types";

export class CardsUtilities {
    card = (data: any): MGCard => {
        const cardData = camelcaseKeys(data, { deep: true });
        return Array.isArray(cardData) ? cardData[0] : cardData;
    }    
}
            