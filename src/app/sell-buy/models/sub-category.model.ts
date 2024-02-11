export interface SubCategoryRequestModel {
  name: string;
  itemCategoryId: string;
}

export interface SubCategoryUpdateModel extends SubCategoryRequestModel {
  id: string;
  isActive: boolean;
}

export type SubCategoryResponse = {
  id: string;
  name: string;
  categoryName: string;
};
