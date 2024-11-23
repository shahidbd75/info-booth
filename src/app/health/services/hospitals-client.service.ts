import { Injectable } from '@angular/core';
import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';
import { BaseHttpService } from 'src/app/shared/services/base.service';
import { HospitalsResponseModel } from '../types/hospitals-types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HospitalsClientService extends BaseHttpService {
  protected override BASE_URL: string = API_ENDPOINT_CONST.HEALTH.HOSPITAL_BASE;
  selectedItem: HospitalsResponseModel;
  constructor(http: HttpClient) {
    super(http);
  }
}
