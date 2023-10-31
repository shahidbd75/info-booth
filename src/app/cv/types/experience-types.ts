export type ExperienceRequestModel = {
    id:               string;
    personId:         string;
    companyName:      string;
    companyAddress:   string;
    companyUrl:       string;
    startDate:        string;
    endDate:          string;
    designationId:    string;
    responsibilities: string;
    jobNature:        number;
    description:      string;
};


export type ExperienceResponseType = {
    id:               string;
    personId:         string;
    companyName:      string;
    companyAddress:   string;
    companyUrl:       string;
    startDate:        string;
    endDate:          string;
    designationId:    string;
    designationName:  string;
    responsibilities: string;
    jobNature:        number;
    description:      string;
    isActive:         boolean;
    createdDate:      string;
    jobNatureName:    string;
}