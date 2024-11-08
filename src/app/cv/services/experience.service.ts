import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';
import { BaseHttpService } from 'src/app/shared/services/base.service';
import { ExperienceResponseType } from '../types/experience-types';

@Injectable()
export class ExperienceService extends BaseHttpService {
  protected override BASE_URL: string = API_ENDPOINT_CONST.CV.EXPERIENCE_BASE;
  constructor(http: HttpClient) {
    super(http);
  }

  getExperiencesByPersonId(personId: string): Observable<Array<ExperienceResponseType>> {
    return this.http.get<Array<ExperienceResponseType>>(API_ENDPOINT_CONST.CV.GET_EXPERIENCE_BY_PERSON(personId));
  }
}
