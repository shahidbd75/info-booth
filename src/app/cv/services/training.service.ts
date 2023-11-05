import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';
import { BaseHttpService } from 'src/app/shared/services/base.service';
import { TrainingResponseTypes } from '../types/training-types';

@Injectable()
export class TrainingService extends BaseHttpService {

  constructor(http: HttpClient) {
    super(http);
    this.setBaseUrl(API_ENDPOINT_CONST.CV.TRAINING_BASE)
  }

  getListsByPersonId(personId: string) : Observable<Array<TrainingResponseTypes>>{
    return this.http.get<Array<TrainingResponseTypes>>(API_ENDPOINT_CONST.CV.GET_TRAININGS_BY_PERSON(personId));
  }
}
