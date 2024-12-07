import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';
import { Injectable } from '@angular/core';
import { BaseHttpService } from 'src/app/shared/services/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DoctorChambersClientService extends BaseHttpService {
  protected override BASE_URL: string = API_ENDPOINT_CONST.HEALTH.DOCTOR_CHAMBERS_BASE;
  constructor(http: HttpClient) {
    super(http);
  }
}
