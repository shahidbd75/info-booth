export type EnumTableRequestModel = {
  name: string;
  banglaName?: string;
}

export type EnumTableCreateModel  = EnumTableRequestModel;

export type EnumTableUpdateModel = EnumTableRequestModel & {
  id: string | number
};

export type EnumTableResponseModel = EnumTableRequestModel  & {
  id: string | number
};