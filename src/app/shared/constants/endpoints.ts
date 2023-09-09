import { environment } from "src/environments/environment";

const BASE_URL = `${environment.baseUrl}`;

export const API_ENDPOINT_CONST : APIEndPoints = {
  BUY_SELL : {
    GET_CATEGORIES_OPTIONS:`${BASE_URL}ItemCategories/options`,
    GET_SUB_CATEGORY_BY_CATEGORY:(categoryId: string) => `${BASE_URL}ItemSubCategories/options/${categoryId}`,
    ITEM_BASE:`${BASE_URL}Items`,
    SUB_CATEGORY_BASE: `${BASE_URL}ItemSubCategories`,
    CATEGORY_BASE: `${BASE_URL}ItemCategories`,
  },
  PERSONNEL: {
    PERSON_BASE: `${BASE_URL}Persons`,
    OCCUPATION_BASE: `${BASE_URL}Occupations`,
  },
  OPTIONS: {
    OPTION_BASE: `${BASE_URL}Options`
  }
}

export interface APIEndPoints {
  BUY_SELL: BuySell;
  PERSONNEL: Personnel;
  OPTIONS: Options;
}

export interface BuySell {
  CATEGORY_BASE: string;
  ITEM_BASE: string;
  GET_CATEGORIES_OPTIONS: string;
  GET_SUB_CATEGORY_BY_CATEGORY(categoryId: string): string;
  SUB_CATEGORY_BASE: string;
}

export interface Personnel {
  PERSON_BASE: string;
  OCCUPATION_BASE: string;
}

export interface Options {
  OPTION_BASE: string;
}
