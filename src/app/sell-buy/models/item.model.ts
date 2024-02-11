export interface ItemRequestModel {
  name: string;
  localName: string;
  banglaName: string;
  shortDescription: string;
  description: string;
  imageUrl: string;
  condition?: number;
  subCategoryId: string;
  measurementTypeId?: number;
  transactionType: number;
  personId: number;
}

export type ItemCreateRequestModel = ItemRequestModel;

export interface ItemUpdateRequestModel extends ItemRequestModel {
  id: string;
}

export interface ItemResponseModel {
  id: string;
  name: string;
  localName: string;
  imageUrl: string;
  banglaName: string;
  shortDescription: string;
  description: string;
  condition: number;
  measurementTypeId: number;
  transactionType: number;
  subCategoryId: string;
  personId: string;
  personName: string;
  measurementTypeName: string;
  subCategoryName: string;
  categoryId: string;
}
