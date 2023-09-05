export interface ItemRequestModel {
  name: string;
  localName: string;
  banglaName: string;
  shortDescription: string;
  description: string;
  imageUrl: string;
  condition: number;
  subCategoryId: string;
  measurementTypeId?: number;
  transactionType: number;
  personId: number;
}

export type ItemCreateRequestModel = ItemRequestModel

export interface ItemUpdateRequestModel extends ItemRequestModel {
  id: string
}

export interface ItemResponseModel {
  name: string;
  localName: string;
  banglaName: string;
  shortDescription: string;
  description: string;
  condition: number;
  subCategoryName: string;
  measurementTypeId?: number;
  measurementTypeName?: string;
  transactionType: number;
}

