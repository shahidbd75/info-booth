export type PersonResponseModel = {
  id: string;
  name: string,
  fatherName: string,
  motherName: string,
  spouseName: string,
  phone: string,
  alternativeContact: string,
  address: string,
  email: string,
  religion: number,
  postalCode: string,
  dateOfBirth: string,
  nId: string,
  gender: number,
};

export type PersonCreateRequestModel = PersonResponseModel;

export type PersonUpdateRequestModel = PersonResponseModel & { id: string};