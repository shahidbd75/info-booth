export type PersonResponseModel = {
  id:                 string;
  name:               string;
  nickName:           string;
  fatherName:         string;
  motherName:         string;
  spouseName:         string;
  phone:              string;
  alternativeContact: string;
  address:            string;
  email:              string;
  religion:           number;
  postalCode:         string;
  dateOfBirth:        string;
  nId:                string;
  gender:             number;
  age:                string;
  occupationId:       number;
  occupationName:     string;
  villageId:          string;
  villageName:        string;
  upazilaName:        string;
  upazilaId:          number;
  districtId:         number;
  districtName:       string;
  degreeName:         string;
};

export type PersonCreateRequestModel = PersonResponseModel;

export type PersonUpdateRequestModel = PersonResponseModel & { id: string};