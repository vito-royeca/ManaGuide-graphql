import { RESTDataSource } from "@apollo/datasource-rest";
import camelcaseKeys from "camelcase-keys";

import { MGSectionedSet, MGSectionedSets, MGSet, MGSets, SetByCodeInput } from "../types";

export class SetsRESTDataSource extends RESTDataSource {
    baseURL = "https://managuideapp.com/";

    async set(input: SetByCodeInput): Promise<MGSet> {
        const data = await this.get<MGSet>(`set/${input.code}/en?json=true&displayAs=image&sortedBy=${input.sortedBy || "name"}&orderBy=${input.orderBy || "asc"}`);
        const setData = camelcaseKeys(data, { deep: true });

        return Array.isArray(setData) ? setData[0] : setData;
    }

    async sets(): Promise<MGSets> {
        const data = await this.get<MGSet[]>("sets?json=true");
        const setsData = camelcaseKeys(data, { deep: true });
        let newSetsData: MGSet[] = [];

        setsData.forEach((set, _) => {
            if (set.setParent === null) {
                let currentSet = set; 
                let setChildren: MGSet[] = [];

                do {
                    setChildren = this.findChildren(currentSet, setsData);
                    currentSet.children = setChildren;

                    setChildren.forEach((child, _) => {
                        const childChildren = this.findChildren(child, setsData);
                        child.children = childChildren;

                        childChildren.forEach((grandChild, _) => {
                            const grandChildChildren = this.findChildren(grandChild, setsData);
                            grandChild.children = grandChildChildren;
                        });
                    });
                    currentSet = setChildren[0];
                    
                } while (currentSet !== undefined);
                newSetsData.push(set);
            }
        });
        
        return {
            count: newSetsData.length,
            sets: newSetsData
        };
    }

    findChildren = (set: MGSet, setsData: MGSet[]): MGSet[] => {
        const children = setsData.filter(d => d.setParent ? d.setParent.code === set.code : false);
        return children;
    }

    async setsByBlock(): Promise<MGSectionedSets> {
        const sets = (await this.sets()).sets;
        const keys = new Set(sets.flatMap( (d) => 
            d.setBlock ? d.setBlock.name : "").sort()    
        );
        let arrays: MGSectionedSet[] = [];

        keys.forEach(function (item, _) {
            const slice: MGSet[] = sets.filter(d => (d.setBlock ? d.setBlock.name : "") === item);
            arrays.push({ count: slice.length, section: item, sets: slice });
        });

        return {
            count: sets.length,
            sections: Array.from(keys).sort(),
            sectionedSets: arrays
        };
    }

    async setsByName(): Promise<MGSectionedSets> {
        const sets = (await this.sets()).sets;
        const regex = /^[\p{L}]/u;
        const keys = new Set(sets.flatMap( (d) => 
            regex.test(d.name[0]) ? d.name[0].toUpperCase() : "#").sort()    
        );
        let arrays: MGSectionedSet[] = [];

        keys.forEach(function (item, _) {
            let slice: MGSet[] = [];

            if (item === '#') {
                slice = sets.filter(d => !regex.test(d.name[0]))
            } else {
                slice = sets.filter(d => d.name.toUpperCase().startsWith(item))
            }
            arrays.push({ count: slice.length, section: item, sets: slice });
        });

        return {
            count: sets.length,
            sections: Array.from(keys).sort(),
            sectionedSets: arrays
        };
    }

    async setsByType(): Promise<MGSectionedSets> {
        const sets = (await this.sets()).sets;
        const keys = new Set(sets.flatMap( (d) => 
            d.setType.name).sort()    
        );
        let arrays: MGSectionedSet[] = [];

        keys.forEach(function (item, _) {
            const slice: MGSet[] = sets.filter(d => d.setType.name === item);
            arrays.push({ count: slice.length, section: item, sets: slice });
        });

        return {
            count: sets.length,
            sections: Array.from(keys).sort(),
            sectionedSets: arrays
        };
    }

    async setsByYear(): Promise<MGSectionedSets> {
        const sets = (await this.sets()).sets;
        const keys = new Set(sets.flatMap( (d) => d.yearSection).sort().toReversed());
        let arrays: MGSectionedSet[] = [];

        keys.forEach(function (item, _) {
            const slice: MGSet[] = sets.filter(d => d.yearSection === item);
            arrays.push({ count: slice.length, section: item, sets: slice });
        });

        return {
            count: sets.length,
            sections: Array.from(keys).sort().toReversed(),
            sectionedSets: arrays
        };
    }
}