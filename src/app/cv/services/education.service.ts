import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';
import { BaseHttpService } from 'src/app/shared/services/base.service';
import { EducationalResponseType } from '../types/educational-types';

@Injectable()
export class EducationService extends BaseHttpService {
  constructor(http: HttpClient) {
    super(http);
    this.setBaseUrl(API_ENDPOINT_CONST.CV.EDUCATION_BASE);
  }

  getAllByPersonId(personId: string): Observable<EducationalResponseType[]> {
    return this.http.get<EducationalResponseType[]>(`${this.BASE_URL}/${personId}/get-list`);
  }
}
