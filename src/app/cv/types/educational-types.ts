export type EducationRequestType = {
    cvId:          number;
    degreeId:      number;
    subjectId:     number;
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
    cvId:          number;
    degreeId:      number;
    subjectId:     number;
    instituteName: string;
    startDate:     string;
    endDate:       string;
    group:         string;
    result:        string;
    gpa:           string;
    gpaOutOf:      string;
    passing:       string;
    isActive:      boolean;
    createdDate:   string;
    degreeName:    string;
    subjectName:   string;
};
