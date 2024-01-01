import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from 'src/app/shared/services/base.service';
import { ReligionParametersType } from '../types/religion-parameter-type';
import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';

@Injectable()
export class ReligionInformationService extends BaseHttpService {

  constructor(http: HttpClient) { 
    super(http);
    this.setBaseUrl(API_ENDPOINT_CONST.CV.RELIGION_INFO_BASE);
  }

  getReligionParameters(personId: string): Observable<ReligionParametersType[]> {
    return this.http.get<ReligionParametersType[]>(API_ENDPOINT_CONST.CV_OPTIONS.GET_RELIGION_PARAMETERS(personId))
  }
}
