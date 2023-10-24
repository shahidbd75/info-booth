import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';
import { BaseHttpService } from 'src/app/shared/services/base.service';

@Injectable()
export class SubjectService extends BaseHttpService {

  constructor(http: HttpClient) {
    super(http);
    this.setBaseUrl(API_ENDPOINT_CONST.CV.SUBJECT_BASE);
   }
}
