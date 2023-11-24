export type MatrimonialCreateRequestType = {
    guardianRelation:    string;
    height:              string;
    weight:              string;
    chest:               string;
    passport:            string;
    annualIncome:        number;
    familyWealthDetail:  string;
    selfWealthDetail:    string;
    shortTimeAmbition:   string;
    longTimeAmbition:    string;
    handiCrafts:         string;
    facebookProfileLink: string;
    presentAddress:      string;
    expectations:        string;
    otherSkills:         string;
    skill:               string;
    dressStyle:          string;
    bodyType:            string;
    hairColor:           string;
    eyeColor:            string;
    complexion:          string;
    diet:                string;
    disability:          string;
    familyValue:         string;
    personalValue:       string;
    residencyStatus:     string;
    haveChildren:        boolean;
    caste:               string;
    noOfBrother:         number;
    noOfMarriedBrother:  number;
    noOfSister:          number;
    noOfMarriedSister:   number;
};

export type MatrimonialUpdateRequestType = MatrimonialCreateRequestType & 
{
    id: string;
}

export type MatrimonialReponseType = {
    id: string;
    guardianRelation:    string;
    height:              string;
    weight:              string;
    chest:               string;
    passport:            string;
    annualIncome:        number;
    familyWealthDetail:  string;
    selfWealthDetail:    string;
    shortTimeAmbition:   string;
    longTimeAmbition:    string;
    handiCrafts:         string;
    facebookProfileLink: string;
    presentAddress:      string;
    expectations:        string;
    otherSkills:         string;
    skill:               string;
    dressStyle:          string;
    bodyType:            string;
    hairColor:           string;
    eyeColor:            string;
    complexion:          string;
    diet:                string;
    disability:          string;
    familyValue:         string;
    personalValue:       string;
    residencyStatus:     string;
    haveChildren:        boolean;
    caste:               string;
    noOfBrother:         number;
    noOfMarriedBrother:  number;
    noOfSister:          number;
    noOfMarriedSister:   number; 
    createdDate:         Date;
}

export type MatrimonialTableResponse = {
  id: string
  personName: string
  phone: string
  villageName: string
  guardianRelation: string
  height: string
  weight: string
  chest: string
  passport: string
  annualIncome: number
  familyWealthDetail: string
  selfWealthDetail: string
  shortTimeAmbition: string
  longTimeAmbition: string
  handiCrafts: string
  facebookProfileLink: string
  presentAddress: string
  expectations: string
}