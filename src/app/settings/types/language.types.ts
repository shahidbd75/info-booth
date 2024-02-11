export type LanguageCreateRequestModel = {
  name: string;
};

export type LanguageUpdateRequestModel = {
  id: string;
  name: string;
  isActive: boolean;
};

export type LanguageResponseModel = {
  id: string;
  name: string;
  createdDate: string;
  isActive: boolean;
};
