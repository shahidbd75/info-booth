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
    CONDITIONS: `${BASE_URL}Options/conditions`
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
  },
  COMMON: {
    LANGUAGE_BASE: `${BASE_URL}Language`
  },
  CV: {
    DEGREE_BASE: `${BASE_URL}Degrees`,
    DESIGNATION_BASE: `${BASE_URL}Designations`,
    AWARD_BASE: `${BASE_URL}Awards`,
    EDUCATION_BASE: `${BASE_URL}Education`,
    SUBJECT_BASE: `${BASE_URL}Subjects`,
    EXPERIENCE_BASE: `${BASE_URL}Experience`,
    PROFESSIONAL_BASIC: `${BASE_URL}ProfessionalCVs`,
    GET_EXPERIENCE_BY_PERSON:(personId: string) =>  `${BASE_URL}Experience/${personId}/get-list`,
    TRAINING_BASE: `${BASE_URL}Training`,
    GET_TRAININGS_BY_PERSON:(personId: string) => `${BASE_URL}Training/${personId}/list`,
    JOB_REFERENCE_BASE: `${BASE_URL}JobReferences`,
    JOB_REFERENCES_BY_PERSON:(personId: string) => `${BASE_URL}JobReferences/${personId}`,
    MATRIMONIAL_BASIC_BASE: `${BASE_URL}MatrimonialCv`,
    FAMILY_MEMBER_BASE: `${BASE_URL}FamilyMember`,
    GET_FAMILY_MEMBERS_BY_PERSON:(personId: string) =>  `${BASE_URL}FamilyMember/getByPersonId/${personId}`,
    FAVORITE_BASE:`${BASE_URL}Favorite`,
    PREFERABLE_BASE: `${BASE_URL}Preferable`,
    PREFERABLE_OCCUPATIONS_BY_PERSON: (personId: string) => `${BASE_URL}PreferableOccupation/${personId}`,
    PREFERABLE_OCCUPATION_BASE: `${BASE_URL}PreferableOccupation`,
  },
  CV_OPTIONS : {
    GET_DEGREES: `${BASE_URL}CvOptions/degrees`,
    GET_DESIGNATIONS: `${BASE_URL}CvOptions/designations`,
    GET_SUBJECTS: `${BASE_URL}CvOptions/subjects`,
    GET_JOB_NATURES: `${BASE_URL}CvOptions/job-natures`,
    GET_JOB_HOBBIES: `${BASE_URL}CvOptions/hobbies`,
  },
  CV_ENUM_OPTIONS: {
    GET_ACCEPTANCES:`${BASE_URL}CvEnumOptions/acceptances`,
    GET_BODY_TYPES:`${BASE_URL}CvEnumOptions/body-types`,
    GET_CASTE:`${BASE_URL}CvEnumOptions/castes`,
    GET_COLORS:`${BASE_URL}CvEnumOptions/colors`,
    GET_COMPLEXIONS:`${BASE_URL}CvEnumOptions/complexions`,
    GET_DIETS:`${BASE_URL}CvEnumOptions/diets`,
    GET_DISABILITIES:`${BASE_URL}CvEnumOptions/disabilities`,
    GET_DREES_STYLES:`${BASE_URL}CvEnumOptions/dress-styles`,
    GET_DRINKS:`${BASE_URL}CvEnumOptions/drinks`,
    GET_COOKINGS:`${BASE_URL}CvEnumOptions/cookings`,
    GET_EMPLOYEE_STATUS:`${BASE_URL}CvEnumOptions/employment-status`,
    GET_EYE_COLORS:`${BASE_URL}CvEnumOptions/eye-colors`,
    GET_FAMILY_TYPES:`${BASE_URL}CvEnumOptions/family-types`,
    GET_FAMILY_VALUES:`${BASE_URL}CvEnumOptions/family-values`,
    GET_GAMES:`${BASE_URL}CvEnumOptions/games`,
    GET_MOVIES:`${BASE_URL}CvEnumOptions/movies`,
    GET_MUSICS:`${BASE_URL}CvEnumOptions/musics`,
    GET_READS:`${BASE_URL}CvEnumOptions/reads`,
    GET_HAIR_COLORS: `${BASE_URL}CvEnumOptions/hair-colors`,
    GET_TV_SHOWS: `${BASE_URL}CvEnumOptions/tv-shows`,
    GET_HAVE_CHILDRENS: `${BASE_URL}CvEnumOptions/have-childrens`,
    GET_LIKES: `${BASE_URL}CvEnumOptions/likes`,
    GET_PARTNER_FAMILY_TYPES: `${BASE_URL}CvEnumOptions/partner-family-types`,
    GET_PERSONAL_VALUES: `${BASE_URL}CvEnumOptions/personal-values`,
    GET_PROFILE_CREATED_BY: `${BASE_URL}CvEnumOptions/profile-created-by`,
    GET_RELIGIOUS_VIEWS: `${BASE_URL}CvEnumOptions/religious-views`,
    GET_RESIDENCY_STATUS: `${BASE_URL}CvEnumOptions/residency-status`,
    GET_SKILLS: `${BASE_URL}CvEnumOptions/skills`,
    GET_SMOKES: `${BASE_URL}CvEnumOptions/smokes`,
    GET_STRENGTHS: `${BASE_URL}CvEnumOptions/strengths`,
    GET_ZODIAC_SIGNS: `${BASE_URL}CvEnumOptions/zodiac-signs`,
    GET_HANDICRAFTS: `${BASE_URL}CvEnumOptions/handicrafts`,
    GET_MARITIAL_STATUS: `${BASE_URL}CvEnumOptions/maritial-status`,
    GET_BODY_HEIGHTS: `${BASE_URL}CvEnumOptions/body-heights`,
  }
}

export interface APIEndPoints {
  CV: Cv;
  BUY_SELL: BuySell;
  PERSONNEL: Personnel;
  OPTIONS: Options;
  LOCATION: Location;
  WORKER: Worker;
  TOLET: Tolet;
  BOOK: Book;
  COMMON:Common;
  CV_OPTIONS: CvOptions;
  CV_ENUM_OPTIONS: CvEnumOptions;
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
  CONDITIONS:string;
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

export interface Common {
  LANGUAGE_BASE: string;
}

export interface Cv {
  MATRIMONIAL_BASIC_BASE: string;
  JOB_REFERENCE_BASE: string;
  PROFESSIONAL_BASIC: string;
  DEGREE_BASE: string;
  DESIGNATION_BASE: string;
  SUBJECT_BASE: string;
  AWARD_BASE: string;
  EDUCATION_BASE: string;
  EXPERIENCE_BASE: string;
  GET_EXPERIENCE_BY_PERSON:(personId: string) => string;
  TRAINING_BASE: string;
  GET_TRAININGS_BY_PERSON:(personId: string) => string;
  JOB_REFERENCES_BY_PERSON:(personId: string) => string;
  FAMILY_MEMBER_BASE: string;
  GET_FAMILY_MEMBERS_BY_PERSON:(personId: string) => string;
  FAVORITE_BASE: string;
  PREFERABLE_BASE: string;
  PREFERABLE_OCCUPATION_BASE: string;
  PREFERABLE_OCCUPATIONS_BY_PERSON:(personId: string) => string;
}

export interface CvOptions {
  GET_JOB_HOBBIES: string;
  GET_DESIGNATIONS: string;
  GET_DEGREES: string;
  GET_SUBJECTS: string;
  GET_JOB_NATURES: string;
}

export interface CvEnumOptions {
  GET_ACCEPTANCES: string;
  GET_BODY_TYPES: string;
  GET_CASTE: string;
  GET_COLORS: string;
  GET_COMPLEXIONS: string;
  GET_DIETS: string;
  GET_DISABILITIES: string;
  GET_DREES_STYLES: string;
  GET_DRINKS: string;
  GET_EMPLOYEE_STATUS: string;
  GET_EYE_COLORS: string;
  GET_FAMILY_TYPES: string;
  GET_FAMILY_VALUES: string;
  GET_GAMES: string;
  GET_COOKINGS: string;
  GET_MOVIES: string;
  GET_MUSICS: string;
  GET_READS: string;
  GET_TV_SHOWS: string;
  GET_HAIR_COLORS: string;
  GET_HAVE_CHILDRENS: string;
  GET_LIKES: string;
  GET_PARTNER_FAMILY_TYPES: string;
  GET_PERSONAL_VALUES: string;
  GET_PROFILE_CREATED_BY: string;
  GET_RELIGIOUS_VIEWS: string;
  GET_RESIDENCY_STATUS: string;
  GET_SKILLS: string;
  GET_SMOKES: string;
  GET_STRENGTHS: string;
  GET_ZODIAC_SIGNS: string;
  GET_HANDICRAFTS: string;
  GET_MARITIAL_STATUS: string;
  GET_BODY_HEIGHTS: string;
}