export type RequestType = {
    name: string;
    banglaName: string;
}

export type CreateRequestModel = RequestType;

export type UpdateRequestModel = RequestType & {
    id: string;
}