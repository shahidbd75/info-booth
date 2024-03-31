export type AgentRequestModel = {
  name: string;
  phone: string;
  districtId: number;
  upazilaId: number;
};

export type AgentResponseModel = {
  id: string;
  name: string;
  phone: string;
  districtId: number;
  districtName: string;
  upazilaId: number;
  upazilaName: string;
  createdDate: string;
  isActive: boolean;
};

export type AgentUpdateModel = AgentRequestModel & { id: string };
