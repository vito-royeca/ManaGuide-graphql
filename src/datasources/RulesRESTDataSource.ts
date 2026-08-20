import { RESTDataSource } from "@apollo/datasource-rest";

import { MGRule, MGRules } from "../types";
import { RulesUtilities } from "./RulesUtilities";

export class RulesRESTDataSource extends RESTDataSource {
    baseURL = "https://manaprobe.com/";
    utilities = new RulesUtilities();

    async rules(id: string): Promise<MGRules> {
        const data = await this.get<MGRule[]>(`rules/${id}?json=true`);

        return this.utilities.rules(data);
    }

    async rule(id: string): Promise<MGRule> {
        const data = await this.get<MGRule>(`rule/${id}?json=true`);

        return this.utilities.rule(data);
    }
    
    async rulesByQuery(query: string): Promise<MGRules> {
        const data = await this.get<MGRule[]>(`rules?query=${encodeURIComponent(query)}&json=true`);

        return this.utilities.rules(data);
    }
}