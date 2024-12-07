export type DoctorsChambersSummeryResponseModel = {
    id:                   string;
    doctorName:           string;
    hospitalName:         string;
    firstTimeVisitFees:   number;
    firstTimeReportFees:  number;
    secondTimeVisitFees:  number;
    secondTimeReportFees: number;
    hospitalLocation:     string;
    isAvailable:          boolean;
    visitOnline:          boolean;
    giveDiscount:         boolean;
    phoneForSerial1:      string;
    phoneForSerial2:      string;
};

export type DoctorsChambersResponseModel = {
    id:                   string;
    doctorId:             string;
    hospitalId:           string;
    firstTimeVisitFees:   number;
    firstTimeReportFees:  number;
    secondTimeVisitFees:  number;
    secondTimeReportFees: number;
    oldPatientDays:       number;
    isAvailable:          boolean;
    visitOnline:          boolean;
    giveDiscount:         boolean;
    phoneForSerial1:      string;
    phoneForSerial2:      string;
}

export type DoctorsChambersCreateRequestModel = {
    doctorId:             string;
    hospitalId:           string;
    firstTimeVisitFees:   number;
    firstTimeReportFees:  number;
    secondTimeVisitFees:  number;
    secondTimeReportFees: number;
    oldPatientDays:       number;
    isAvailable:          boolean;
    visitOnline:          boolean;
    giveDiscount:         boolean;
    phoneForSerial1:      string;
    phoneForSerial2:      string;
}

export type DoctorsChambersUpdateRequestModel = DoctorsChambersCreateRequestModel & {
    id: string;
}