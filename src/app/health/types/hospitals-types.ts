export type HospitalsSummeryResponseModel = {
    id:             string;
    name:           string;
    banglaName:     string;
    healthCareType: string;
    totalDoctor:    number;
    departments:    string;
    village: string;
}

export type HospitalsCreateRequestModel = {
    name:                string;
    banglaName:          string;
    healthCareTypeId:    number;
    numberOfBed:         number;
    totalDoctor:         number;
    totalStaff:          number;
    departments:         string;
    phoneNumber:         string;
    phoneNumber2:        string;
    mobileNumber:        string;
    mobileNumber2:       string;
    hotlineNumber:       string;
    contactPersonName:   string;
    contactPersonNumber: string;
    villageId:           string;
    amenities:           string[];
}

export type HospitalsUpdateRequestModel = HospitalsCreateRequestModel & {
    id: string;
}

export type HospitalsResponseModel = {
    id:                  string;
    name:                string;
    banglaName:          string;
    healthCareTypeId:    number;
    numberOfBed:         number;
    totalDoctor:         number;
    totalStaff:          number;
    departments:         string;
    phoneNumber:         string;
    phoneNumber2:        string;
    mobileNumber:        string;
    mobileNumber2:       string;
    hotlineNumber:       string;
    contactPersonName:   string;
    contactPersonNumber: string;
    villageId:           string;
    upazilaId:           number;
    districtId:          number;
    amenityIds:          string[];
};
