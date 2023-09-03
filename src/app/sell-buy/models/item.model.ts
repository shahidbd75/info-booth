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
}

