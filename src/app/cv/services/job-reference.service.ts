import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from 'src/app/shared/services/base.service';
import { JobReferenceResponseType } from '../types/job-reference-type';
import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';

@Injectable()
export class JobReferenceService extends BaseHttpService {
  protected override BASE_URL: string = API_ENDPOINT_CONST.CV.JOB_REFERENCE_BASE;
  constructor(http: HttpClient) {
    super(http);
  }

  getJobReferenceByPersonId(personId: string): Observable<JobReferenceResponseType[]> {
    return this.http.get<JobReferenceResponseType[]>(API_ENDPOINT_CONST.CV.JOB_REFERENCES_BY_PERSON(personId));
  }
}
