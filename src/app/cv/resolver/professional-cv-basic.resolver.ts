import { ResolveFn } from '@angular/router';
import { ProfessionalBasicResponseModel } from '../types/professional-basic-types';
import { inject } from '@angular/core';
import { ProfessionalBasicService } from '../services/professional-basic.service';
import { ProfessionalCvDataService } from '../services/professional-cv-data.service';
import { Observable } from 'rxjs';

export const professionalCvBasicResolver: ResolveFn<Observable<ProfessionalBasicResponseModel> | null> = (route, state) => {
  const personId = inject(ProfessionalCvDataService).selectedPersonId.value;
  if(personId) {
    return inject(ProfessionalBasicService).getById<ProfessionalBasicResponseModel>(personId);
  }
  return null;
};
