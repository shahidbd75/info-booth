
export type HealthAmenityResponseModel = {
    name:       string;
    banglaName: string;
    id:         string;
    createdDate:Date;
    isActive:   boolean;
}

export type HealthAmenityCreateRequestModel = {
    name:       string;
    banglaName: string;
}

export type HealthAmenityUpdateRequestModel = HealthAmenityCreateRequestModel & {
    id: string;
}