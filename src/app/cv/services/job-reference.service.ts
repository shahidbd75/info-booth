import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from 'src/app/shared/services/base.service';
import { JobReferenceResponseType } from '../types/job-reference-type';
import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';

@Injectable()
export class JobReferenceService extends BaseHttpService {

  constructor(http: HttpClient) {
    super(http);
    this.setBaseUrl(API_ENDPOINT_CONST.CV.JOB_REFERENCE_BASE);
  }

  getJobReferenceByPersonId(personId: string): Observable<JobReferenceResponseType[]> {
    return this.http.get<JobReferenceResponseType[]>(API_ENDPOINT_CONST.CV.JOB_REFERENCES_BY_PERSON(personId));
  }
}
