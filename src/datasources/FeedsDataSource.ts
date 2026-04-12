import { readFile } from "node:fs/promises";
import camelcaseKeys from "camelcase-keys";

import { MGFeeds } from "../types";

export class FeedsDataSource {
    async feeds(): Promise<MGFeeds> {
        const data = await readFile(`${process.cwd()}/src/data/feeds.json`, 'utf8');
        const feeds = camelcaseKeys(JSON.parse(data));

        return {
            count: feeds.length,
            feeds: feeds
        };
    }
}