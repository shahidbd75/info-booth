export type FamilyMemberRequestModel = {
    personId: string;
    name: string;
    relation: string;
    occupationId: number;
    designationId: string;
    contactNumber: string;
    email: string;
    address: string;
    otherDetail: string;
  };


  export type FamilyMemberCreateRequestModel = FamilyMemberRequestModel;

  export type FamilyMemberUpdateRequestModel = FamilyMemberRequestModel & {
    id: string;
  };

  export type FamilyMemberResponseType = {
    id: string;
    personId: number;
    name: string;
    relation: string;
    occupationId: number;
    designationId: string;
    contactNumber: string;
    email: string;
    address: string;
    otherDetail: string;
    isActive: boolean;
    createdDate: string;
  };

  export type FamilyMemberTableResponseType = {
    id: string;
    name: string;
    relation: string;
    occupation: string;
    designation: string;
    contactNumber: string;
    isActive: boolean;
    createdDate: string;
  }
  
  