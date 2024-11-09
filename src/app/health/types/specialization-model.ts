
export type SpecializationResponseModel = {
    name:       string;
    banglaName: string;
    id:         string;
    createdDate:Date;
    isActive:   boolean;
}

export type SpecializationCreateRequestModel = {
    name:       string;
    banglaName: string;
}

export type SpecializationUpdateRequestModel = SpecializationCreateRequestModel & {
    id: string;
}