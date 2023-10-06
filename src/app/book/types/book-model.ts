export type BookResponseModel = {
    title:             string;
    author:            string;
    publisher:         string;
    publicationDate:   string;
    coverPhoto:        string;
    price:             number;
    quantity:          number;
    availability:      boolean;
    detail:            string;
    condition:         number;
    editionId:         number;
    languageId:        number;
    categoryId:        number;
    categoryName:      string;
    edition:           string;
    language:          string;
    isPriceNegotiable: boolean;
    personId:          string;
    personName:        string;
    villageName:       string;
    villageId:         number;
    isActive:          boolean;
    id:                string;
}

export type BookRequestModel = {
    title:             string;
    author:            string;
    publisher:         string;
    publicationDate:   string;
    coverPhoto:        string;
    price:             number;
    quantity:          number;
    availability:      boolean;
    detail:            string;
    condition:         number;
    editionId:         number;
    languageId:        number;
    categoryId:        number;
    isPriceNegotiable: boolean;
    personId:          string;
}

export type BookCreateRequestModel = BookRequestModel;

export type BookUpdateRequestModel = BookRequestModel & {
    id:    string;
}