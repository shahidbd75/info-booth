export type MatrimonialCreateRequestType = {
    guardianRelation:    string;
    height:              number;
    weight:              number;
    chest:               number;
    passport:            string;
    annualIncome:        number;
    familyWealthDetail:  string;
    selfWealthDetail:    string;
    shortTimeAmbition:   string;
    longTimeAmbition:    string;
    handiCrafts:         string[];
    facebookProfileLink: string;
    presentAddress:      string;
    workAddress:         string;
    expectations:        string;
    otherSkills:         string[];
    skill:               string[];
    dressStyle:          string[];
    bodyType:            string;
    hairColor:           string;
    eyeColor:            string;
    complexion:          string;
    diet:                string[];
    disability:          string;
    familyValue:         string[];
    personalValue:       string[];
    residencyStatus:     string;
    maritalStatus:       number;
    haveChildren:        boolean;
    noOfChildren:        number;
    presentCountry:      string;
    noOfBrother:         number;
    noOfMarriedBrother:  number;
    noOfSister:          number;
    noOfMarriedSister:   number;
    maritialDescription: string;
    smokingStatusId:     number;
    drinkingStatus:      string;
    beardTypeId:         number;
    otherAddiction:      string;
    familyTypeId:        number;
    sleepingDuration:    number;
    startSleep:          string;
    aboutMyself:         string;
    aboutDrowry:         string;
};

export type MatrimonialUpdateRequestType = MatrimonialCreateRequestType & 
{
    id: string;
}

export type MatrimonialReponseType = {
    id: string;
    guardianRelation:    string;
    height:              number;
    weight:              number;
    chest:               number;
    passport:            string;
    annualIncome:        number;
    familyWealthDetail:  string;
    selfWealthDetail:    string;
    shortTimeAmbition:   string;
    longTimeAmbition:    string;
    handiCrafts:         string[];
    facebookProfileLink: string;
    presentAddress:      string;
    workAddress:         string;
    expectations:        string;
    otherSkills:         string[];
    skill:               string[];
    dressStyle:          string[];
    bodyType:            string;
    hairColor:           string;
    eyeColor:            string;
    complexion:          string;
    diet:                string[];
    disability:          string;
    familyValue:         string[];
    personalValue:       string[];
    residencyStatus:     string;
    maritalStatus:       number;
    haveChildren:        boolean;
    noOfChildren:        number;
    presentCountry:      string;
    noOfBrother:         number;
    noOfMarriedBrother:  number;
    noOfSister:          number;
    noOfMarriedSister:   number;
    maritialDescription: string;
    smokingStatusId:     number;
    drinkingStatus:      string;
    beardTypeId:         number;
    otherAddiction:      string;
    familyTypeId:        number;
    sleepingDuration:    number;
    startSleep:          string;
    aboutMyself:         string;
    aboutDrowry:         string;
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