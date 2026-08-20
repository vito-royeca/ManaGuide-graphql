import camelcaseKeys from "camelcase-keys";

import fs  from "fs";

import { MGRule, MGRules } from "../types";

export class RulesUtilities {
    rule = (data: any): MGRule => {
        const ruleData = camelcaseKeys(data, { deep: true });
        const rule = Array.isArray(ruleData) ? ruleData[0] : ruleData;
        return rule;
    }

    rules = (data: any[]): MGRules => {
        let rulesData = camelcaseKeys(data, { deep: true });
        
        return {
            count: rulesData.length,
            rules: rulesData
        };
    }

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
            