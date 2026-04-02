import { Inject, Service } from "typedi";
import camelcaseKeys from "camelcase-keys";
import { readFile } from "node:fs/promises";

import { type NewMGSetInput } from "./MGSetInput.js";
import { MGLanguage, MGSet, MGSetBlock, MGSetType } from "./MGSet.js";

@Service()
export class MGSetService {
    private blocks: MGSetBlock[];
    private types: MGSetType[];
    private languages: MGLanguage[];

    constructor(
        @Inject("SETS")
        private readonly sets: MGSet[]
    ) {
        this.blocks = [];
        this.types = [];
        this.languages = [];
        this.readSets();
    }

    private async readSets() {
      const data = await readFile('./sets.json', 'utf8');
      const setsData = camelcaseKeys(JSON.parse(data));
      this.blocks = setsData.map((set: any) => set.setBlock);
      this.types = setsData.map((set: any) => set.setType);
      this.languages = setsData.flatMap((set: any) => set.languages);
    }

    async findAll() {
        return this.sets;
    }

    async findByCode(code: string) {
        return this.sets.find(it => it.code === code);
    }

    async add(data: NewMGSetInput) {
        const set = this.createSet(data);
        this.sets.push(set);

        return set;
    }

    async remove(code: string) {
        const index = this.sets.findIndex(set => set.code === code);
        if (index !== -1) {
            this.sets.splice(index, 1);
        }
    }

    private createSet(setData: Partial<MGSet>): MGSet {
        const set = Object.assign(new MGSet(), setData);

        return set;
    }
}
