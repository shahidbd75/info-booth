export type VillageRequestModel = {
  name: string;
  banglaName: string;
  upazilaId: number;
};

export type VillageCreateRequestModel = VillageRequestModel;

export type VillageUpdateRequestModel = { id: string } & VillageRequestModel;

export type VillageResponseModel = {
  id:    string;
  name:  string;
  upazilaName:  string;
  districtName: string;
  banglaName:   string;
  upazilaId: number;
  districtId: number;
};

