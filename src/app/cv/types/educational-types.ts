export type EducationRequestType = {
    id?:            string;
    personId:      string;
    degreeId:      string;
    subjectId:     string;
    instituteName: string;
    startDate:     string;
    endDate:       string;
    group:         string;
    result:        string;
    gpa:           string;
    gpaOutOf:      string;
    passingYear:   string;
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
    gpa:           string;
    gpaOutOf:      string;
    passingYear:   string;
    isActive:      boolean;
    createdDate:   string;
    degreeName:    string;
    subjectName:   string;
};
