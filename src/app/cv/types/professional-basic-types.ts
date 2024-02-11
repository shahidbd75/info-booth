export type ProfessionalBasicRequestModel = {
  personId: string;
  careerObjective: string;
  strength: string;
  linkedInProfileLink: string;
  extraCurriculumActivities: string;
  personalCapabilities: string;
  hobby: string[];
  certification: string;
  passportSizePhotoUrl: string;
  signatureUrl: string;
  otherSkills: string;
};

export type ProfessionalBasicResponseModel = {
  personId: string;
  careerObjective: string;
  strength: string;
  linkedInProfileLink: string;
  extraCurriculumActivities: string;
  personalCapabilities: string;
  hobby: string;
  certification: string;
  passportSizePhotoUrl: string;
  signatureUrl: string;
  otherSkills: string;
};

export type ProfessionalTableResponseModel = {
  personId: string;
  careerObjective: string;
  strength: string;
  linkedInProfileLink: string;
  extraCurriculumActivities: string;
  personalCapabilities: string;
  hobby: string;
  certification: string;
  passportSizePhotoUrl: string;
  signatureUrl: string;
  otherSkills: string;
  isActive: boolean;
  createdDate: Date;
  personName: string;
  villageName?: string;
  phone: string;
};
