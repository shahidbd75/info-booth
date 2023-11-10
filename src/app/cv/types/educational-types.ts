export type EducationRequestType = {
    id?:           string | null;
    personId:      string;
    degreeId:      string;
    subjectId?:    string | null;
    instituteName: string;
    startDate?:    Date | null;
    endDate?:      Date | null;
    group?:        string | null;
    result?:       string | null;
    gpa:           number | null;
    gpaOutOf:      number | null;
    passingYear:   number;
}

export type EducationalResponseType = {
    id:            string;
    personId:      string;
    degreeId:      string;
    subjectId:     string;
    instituteName: string;
    startDate:     string;
    endDate:       string;
    group:         string;
    result:        string;
    gpa:           number;
    gpaOutOf:      number;
    passingYear:   number;
    isActive:      boolean;
    createdDate:   string;
    degreeName:    string;
    subjectName:   string;
};
