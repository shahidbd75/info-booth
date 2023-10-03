export type ToLetTableResponseModel = {
    id:                string;
    title:             string;
    personId:          string;
    rent:              number;
    isRentNegotiable:  boolean;
    availableFrom:     string;
    description:       string;
    floorNumber:       number;
    totalFloor:        number;
    numberOfBed:       number;
    numberOfBath:      number;
    areaInSqFeet:      number;
    isBachelorAllowed: boolean;
    hasParking:        boolean;
    hasGenerator:      boolean;
    rentTypeId:        number;
    careTakerName:     null | string;
    careTakerPhone:    null | string;
    amenities:         string;
    flatViewId:        number;
    landMarkId:        number[];
    villageId:         string;
    villageName:       string;
    upazilaId:         number;
    districtId:        number;
    isActive:          boolean;
    owner:             string;
    rentTypeName:      string;
};

export type ToLetDetailResponseModel = {
    id: string;
    title: string;
};