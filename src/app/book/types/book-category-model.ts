export type BookCategoryResponseModel = {
    id:          string;
    name:        string;
    banglaName:  string;
    createdDate: Date;
    isActive:    boolean;
}

export type BookCategoryRequestModel = {
    name:        string;
    banglaName:  string;
}

export type BookCategoryCreateRequestModel = BookCategoryRequestModel;

export type BookCategoryUpdateRequestModel = BookCategoryRequestModel & {
    id:          string;
}