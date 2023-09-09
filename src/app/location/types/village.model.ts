export type VillageRequestModel = {
  name: string;
  banglaName: string;
  upazilaId: number;
};

export type VillageCreateRequestModel = VillageRequestModel;

export type VillageUpdateRequestModel = { id: number } & VillageRequestModel;

export type VillageListResponseModel = {
  villageId:    number;
  villageName:  string;
  upazilaName:  string;
  districtName: string;
  banglaName:   string;
};
