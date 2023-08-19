import { environment } from "src/app/environments/environment";

const BASE_URL = `${environment.baseUrl}`;

export const API_ENDPOINT_CONST : APIEndPoints = {
  BUY_SELL : {
    GET_CATEGORIES_OPTIONS:`${BASE_URL}ItemCategories/options`,
    GET_SUB_CATEGORY_BY_CATEGORY:(categoryId: string) => `${BASE_URL}ItemSubCategories/options/${categoryId}`,
    ITEM_BASE:`${BASE_URL}Items`
  }
}



export interface APIEndPoints {
  BUY_SELL: BuySell;
}

export interface BuySell {
  ITEM_BASE: string;
  GET_CATEGORIES_OPTIONS: string;
  GET_SUB_CATEGORY_BY_CATEGORY(categoryId: string): string;
}
