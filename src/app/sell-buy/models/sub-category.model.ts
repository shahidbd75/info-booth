export interface SubCategoryRequestModel {
  name: string
  itemCategoryId: string
}

export interface SubCategoryUpdateModel extends SubCategoryRequestModel {
  id: string;
  isActive: boolean;
}
