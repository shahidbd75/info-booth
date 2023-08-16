import { environment } from "src/app/environments/environment";

const BASE_URL = `${environment.baseUrl}`;

export const API_ENDPOINT_CONST : APIEndPoints = {
  BUY_SELL : {
    GET_CATEGORIES_OPTIONS:`${BASE_URL}ItemCategories/options`,
  }
}



export interface APIEndPoints {
  BUY_SELL: BuySell;
}

export interface BuySell {
  GET_CATEGORIES_OPTIONS: string;
}