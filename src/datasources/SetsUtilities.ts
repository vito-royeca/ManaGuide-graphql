import camelcaseKeys from "camelcase-keys";

import { MGSectionedSet, MGSectionedSets, MGSet, MGSets, SetByCodeInput } from "../types";

export class SetsUtilities {

    set = (data: any): MGSet => {
        const setData = camelcaseKeys(data, { deep: true });
        let set = Array.isArray(setData) ? setData[0] : setData;
        this.format(set);
        set.children = [];
        return set;
    }

    sets = (data: any[]): MGSets => {
        let setsData = camelcaseKeys(data, { deep: true });
        setsData.forEach((set, _) => {
            this.format(set);
        });
        let newSetsData = this.findChildren(setsData);
        
        return {
            count: newSetsData.length,
            sets: newSetsData
        };
    }

    findChildren = (setsData: MGSet[]): MGSet[] => {
        let newSetsData: MGSet[] = [];

        setsData.forEach((set, _) => {
            if (set.setParent === null) {
                let currentSet = set; 
                let setChildren: MGSet[] = [];

                do {
                    setChildren = this.filterChildren(currentSet, setsData);
                    currentSet.children = setChildren;

                    setChildren.forEach((child, _) => {
                        const childChildren = this.filterChildren(child, setsData);
                        child.children = childChildren;

                        childChildren.forEach((grandChild, _) => {
                            const grandChildChildren = this.filterChildren(grandChild, setsData);
                            grandChild.children = grandChildChildren;
                        });
                    });
                    currentSet = setChildren[0];
                    
                } while (currentSet !== undefined);
                newSetsData.push(set);
            }
        });

        return newSetsData;
    }

    filterChildren = (set: MGSet, setsData: MGSet[]): MGSet[] => {
        const children = setsData.filter(d => d.setParent ? d.setParent.code === set.code : false);
        return children;
    }

    format = (set: MGSet): MGSet => {
        if (set.logoCode === null) {
            set.smallLogoURL = `${process.env.IMAGE_SERVER_URL}/images/sets/default_small.png`;
            set.bigLogoURL = `${process.env.IMAGE_SERVER_URL}/images/sets/default_big.png`;
        } else {
            set.smallLogoURL = `${process.env.IMAGE_SERVER_URL}/images/sets/${set.logoCode}_small.png`;
            set.bigLogoURL = `${process.env.IMAGE_SERVER_URL}/images/sets/${set.logoCode}_big.png`;
        }

        if (set.releaseDate !== null) {
            const year = new Date(set.releaseDate).getFullYear();
            set.yearSection = year.toString();
        } else {
            set.yearSection = "Unknown";
        }

        return set;
    }
    
    setsByName = (data: any[]): MGSectionedSets => {
        const sets = data;
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

    setsByType = (data: any[]): MGSectionedSets => {
        const sets = data;
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

    setsByYear = (data: any[]): MGSectionedSets => {
        const sets = data;
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