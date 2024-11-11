export type DoctorsResponseModel = {
    id: string;
    name:             string;
    banglaName:       string;
    nationality:      string;
    bmdcRegNo:        string;
    degrees:          string;
    facebookLink:     string;
    youtubeLink:      string;
    linkedInLink:     string;
    currentInstitute: string;
    details:          string;
    doctorsType:      number;
    createdDate: Date;
    isActive: boolean;
}

export type DoctorsUpdateRequestModel = {

}

export type DoctorsCreateRequestModel = DoctorsUpdateRequestModel & {
    id: string;
}

