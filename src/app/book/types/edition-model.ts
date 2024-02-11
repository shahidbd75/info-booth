export type EditionResponseModel = {
  id: string;
  name: string;
  createdDate: Date;
  isActive: boolean;
};

export type EditionRequestModel = {
  name: string;
};

export type EditionCreateRequestModel = EditionRequestModel;

export type EditionUpdateRequestModel = EditionRequestModel & {
  id: string;
};
