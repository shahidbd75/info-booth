import { environment } from "src/environments/environment";

const BASE_URL = `${environment.baseUrl}`;

export const API_ENDPOINT_CONST : APIEndPoints = {
  BUY_SELL: {
    GET_CATEGORIES_OPTIONS: `${BASE_URL}ItemCategories/options`,
    GET_SUB_CATEGORY_BY_CATEGORY: (categoryId: string) => `${BASE_URL}ItemSubCategories/options/${categoryId}`,
    ITEM_BASE: `${BASE_URL}Items`,
    SUB_CATEGORY_BASE: `${BASE_URL}ItemSubCategories`,
    CATEGORY_BASE: `${BASE_URL}ItemCategories`,
  },
  PERSONNEL: {
    PERSON_BASE: `${BASE_URL}Persons`,
    OCCUPATION_BASE: `${BASE_URL}Occupations`,
  },
  OPTIONS: {
    OPTION_BASE: `${BASE_URL}Options`,
    RELIGIONS: `${BASE_URL}Options/religions`,
  },
  LOCATION: {
    VILLAGE_BASE: `${BASE_URL}Villages`
  },
  WORKER: {
    WORKER_BASE: `${BASE_URL}Worker`
  },
  TOLET: {
    TOLET_BASE: `${BASE_URL}ToLets`,
    AMENITY_OPTIONS: `${BASE_URL}ToLetsOptions/amenities`,
    FLAT_TYPE_OPTIONS: `${BASE_URL}ToLetsOptions/rent-types`,
    FLAT_VIEW_OPTIONS: `${BASE_URL}ToLetsOptions/flat-views`,
    LANDMARK_OPTIONS: `${BASE_URL}ToLetsOptions/land-marks`,
  },
  BOOK: {
    BOOK_CATEGORIES_BASE:`${BASE_URL}BookCategory`,
    BOOK_BASE: `${BASE_URL}Books`,
    EDITION_BASE: `${BASE_URL}Edition`,
  }
}

export interface APIEndPoints {
  BUY_SELL: BuySell;
  PERSONNEL: Personnel;
  OPTIONS: Options;
  LOCATION: Location;
  WORKER: Worker;
  TOLET: Tolet;
  BOOK: Book;
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
  RELIGIONS:string;
}

export interface Location {
  VILLAGE_BASE: string;
}

export interface Worker {
  WORKER_BASE: string;
}

export interface Tolet {
  TOLET_BASE: string;
  AMENITY_OPTIONS: string;
  FLAT_VIEW_OPTIONS: string;
  LANDMARK_OPTIONS: string;
  FLAT_TYPE_OPTIONS: string;
}

export interface Book {
  BOOK_BASE: string;
  BOOK_CATEGORIES_BASE: string;
  EDITION_BASE: string;
}