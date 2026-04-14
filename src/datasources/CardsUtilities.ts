import camelcaseKeys from "camelcase-keys";

import { MGCard, MGCards, MGSet } from "../types";

export class CardsUtilities {
    card = (data: any): MGCard => {
        const cardData = camelcaseKeys(data, { deep: true });
        const card = Array.isArray(cardData) ? cardData[0] : cardData;
        this.formatCard(card, card.set, card.set.language?.code);
        return card;
    }

    formatCard = (card: MGCard, set: MGSet, language = "en"): MGCard => {
        if (card.newId !== null && card.newId !== undefined) {
            const array = card.newId.split("_")
            const number = array.length == 3 ? array[2] : `${array[2]}_${array[3]}`;

            card.artCropUrl = `${process.env.IMAGE_SERVER_URL}/images/cards/${set.code}/${language}/${number}/art_crop.jpg`;
            card.normalUrl = `${process.env.IMAGE_SERVER_URL}/images/cards/${set.code}/${language}/${number}/normal.jpg`;
            card.pngUrl = `${process.env.IMAGE_SERVER_URL}/images/cards/${set.code}/${language}/${number}/png.png`;
        }
        card.displayName = card.language?.code === "en" ? 
            card.name : 
            (card.printedName !== null && card.printedName !== undefined ? card.printedName : card.name);
        
        if (set.code === "tsb") {
            card.keyruneColor = "652978"; // purple
        } else {
            if (card.rarity?.name === "Common") {
                card.keyruneColor = "1A1718"; // black
            } else if (card.rarity?.name === "Uncommon") {
                card.keyruneColor = "707883"; // gray
            } else if (card.rarity?.name === "Rare") {
                card.keyruneColor = "A58E4A"; // gold
            } else if (card.rarity?.name === "Mythic") {
                card.keyruneColor = "BF4427"; // red
            } else if (card.rarity?.name === "Special") {
                card.keyruneColor = "BF4427"; // red
            } else if (card.rarity?.name === "Timeshifted") {
                card.keyruneColor = "652978"; // purple
            } else if (card.rarity?.name === "Basic Land") {
                card.keyruneColor = "000000"; // black
            }
        }

        if (card.faces !== undefined && card.faces !== null) {
            card.faces.forEach((face, _) => {
                this.formatCard(face, set, language);
            });
        }

        if (card.variations !== undefined && card.variations !== null) {
            card.variations.forEach((variation, _) => {
                this.formatCard(variation, set, language);
            });
        }

        if (card.otherPrintings !== undefined && card.otherPrintings !== null) {
            card.otherPrintings.forEach((printing, _) => {
                this.formatCard(printing, set, language);
            });
        }

        return card;
    }
}
            