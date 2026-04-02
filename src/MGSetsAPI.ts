import { RESTDataSource } from "@apollo/datasource-rest";

export class MGSetsAPI extends RESTDataSource {
    baseURL = "https://managuideapp.com/";


    getSets() {
        return this.get<any[]>("sets?json=true");
    }
}