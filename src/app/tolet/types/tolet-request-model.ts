export type ToLetRequestModel = {
  title: string;
  personId: string;
  rent: number;
  isRentNegotiable: boolean;
  availableFrom: string;
  description: string;
  advanceMoney: number;
  floorNumber: number;
  totalFloor: number;
  numberOfBed: number;
  numberOfBath: number;
  areaInSqFeet: number;
  isBachelorAllowed: boolean;
  hasParking: boolean;
  hasGenerator: boolean;
  amenities: string[];
  landMarkIds: number[];
  preferableReligion: number;
  rentTypeId: number;
  viewId: number;
  careTakerName: string;
  careTakerPhone: string;
  villageId: string;
};

export type ToLetCreateRequestModel = ToLetRequestModel;

export type ToLetUpdateRequestModel = {
  id: string;
} & ToLetRequestModel;
