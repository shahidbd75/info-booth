export type TutionPostResponseModel = {
  title: string;
  description: string;
  salary: number;
  isNegotiable: boolean;
  medium: string;
  availability: string;
  validityInDays: number;
  preferableGender: number;
  address: string;
  teachingMethod: string;
  timeSlot: string;
  tutorId: string;
  tutorName: string;
};

export type TuitionPostCreateRequestModel = {
  title: string;
  description: string;
  salary: number;
  isNegotiable: boolean;
  medium: string;
  availability: string;
  validityInDays: number;
  preferableGender: number;
  address: string;
  teachingMethod: string;
  timeSlot: string;
  tutorId: string;
};

export type TuitionPostUpdateRequestModel = TuitionPostCreateRequestModel;
