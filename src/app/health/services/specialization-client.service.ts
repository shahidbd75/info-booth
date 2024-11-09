import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';
import { HttpClient } from "@angular/common/http";
import { BaseHttpService } from "src/app/shared/services/base.service";
import { Injectable } from '@angular/core';
import { SpecializationResponseModel } from '../types/specialization-model';

@Injectable()
export class SpecializationClientService extends BaseHttpService {
  selectedItem: SpecializationResponseModel;
  protected override BASE_URL: string = API_ENDPOINT_CONST.HEALTH.SPECIALIZATION_BASE;
  constructor(http: HttpClient) {
    super(http);
  }  
}