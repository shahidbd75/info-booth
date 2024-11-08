import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from 'src/app/shared/services/base.service';
import { MatrimonialTableResponse } from '../types/matrimonial-basic-types';
import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';

@Injectable()
export class MatrimonialBasicCvService extends BaseHttpService {
  protected override BASE_URL: string = API_ENDPOINT_CONST.CV.MATRIMONIAL_BASIC_BASE;
  constructor(http: HttpClient) {
    super(http);
  }

  getSummeries(): Observable<MatrimonialTableResponse[]> {
    return this.http.get<MatrimonialTableResponse[]>(`${this.BASE_URL}/list`);
  }
}
