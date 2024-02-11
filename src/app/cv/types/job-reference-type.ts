export type JobReferenceResponseType = {
  id: string;
  referencePersonId: string;
  personName: string;
  occupation: string;
  designation: string;
  mobile: string;
  relation: string;
  institute: string;
  personId: string;
  designationId: string;
  isActive: boolean;
};

export type JobReferenceCreateRequestType = {
  personId: string;
  referencePersonId: string;
  designationId: string;
  institute: string;
  relation: string;
};

export type JobReferenceUpdateRequestType = JobReferenceCreateRequestType & {
  id: string;
};
