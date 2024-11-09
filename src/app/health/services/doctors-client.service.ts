import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';
import { BaseHttpService } from 'src/app/shared/services/base.service';
import { DoctorsResponseModel } from '../types/doctors-types';

@Injectable()
export class DoctorsClientService extends BaseHttpService {
  protected override BASE_URL: string = API_ENDPOINT_CONST.HEALTH.DOCTOR_BASE;
  selectedItem: DoctorsResponseModel;
  constructor(http: HttpClient) {
    super(http);
  }
}
