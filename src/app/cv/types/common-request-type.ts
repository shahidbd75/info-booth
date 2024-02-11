export type RequestType = {
  name: string;
  banglaName: string;
  order?: number;
};

export type CreateRequestModel = RequestType;

export type UpdateRequestModel = RequestType & {
  id: string;
};
