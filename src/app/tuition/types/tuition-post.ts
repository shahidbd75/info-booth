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
  preferredAreas: string[];
  startFrom: Date;
};

export type TuitionPostCreateRequestModel = {
  title: string;
  description: string;
  salary: number;
  isNegotiable: boolean;
  medium: string;
  availability: string[];
  validityInDays: number;
  preferableGender: number;
  preferredAreas: string[];
  address: string;
  teachingMethod: string;
  timeSlot: string;
  tutorId: string;
  startFrom: Date;
};

export type TuitionPostUpdateRequestModel = TuitionPostCreateRequestModel;
