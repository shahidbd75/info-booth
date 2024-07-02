export type TutorResponseModel = {
  id: string;
  degreeId: string;
  institute: string;
  subjectId: string;
  experience: string;
  tutorName: string;
  degreeName: string;
  subjectName: string;
};

type TutorRequestModel = {
  id: string;
  degreeId: string;
  institute: string;
  subjectId: string;
  experience: string;
};

export type TutorCreateRequestModel = TutorRequestModel;
export type TutorUpdateRequestModel = TutorRequestModel;
