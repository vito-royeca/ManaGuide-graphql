import camelcaseKeys from "camelcase-keys";

import fs  from "fs";

import { MGRule, MGRules } from "../types";

export class RulesUtilities {
    ruleArray = (data: any[]): MGRules => {
        let rulesData: any[] = [];

        data.forEach((rule, _) => {
            let ruleData = camelcaseKeys(rule, { deep: true });
            rulesData.push(ruleData);
        });
        
        return {
            count: rulesData.length,
            rules: rulesData
        };
    }   
}
            