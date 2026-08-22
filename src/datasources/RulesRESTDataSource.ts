import { RESTDataSource } from "@apollo/datasource-rest";

import { MGRule, MGRules } from "../types";
import { RulesUtilities } from "./RulesUtilities";

export class RulesRESTDataSource extends RESTDataSource {
    baseURL = "https://manaprobe.com/";
    utilities = new RulesUtilities();

    async rules(id: string | undefined): Promise<MGRules> {
        if (id === undefined) {
            const data = await this.get<MGRule[]>(`rules?json=true`);

            return this.utilities.ruleArray(data);
        } else {
            const data = await this.get<MGRule>(`rule/${id}?json=true`);

            return this.utilities.ruleArray([data]);
        }
    }

    async rulesSearch(query: string): Promise<MGRules> {
        const data = await this.get<MGRule[]>(`rules?query=${encodeURIComponent(query)}&json=true`);

        return this.utilities.ruleArray(data);
    }

    async glossarySearch(letter: string): Promise<MGRules> {
        return {
            count: 0,
            rules: []
        };
    }
}