import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';
import { Injectable } from '@angular/core';
import { HealthAmenityResponseModel } from '../types/health-amenities.types';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from 'src/app/shared/services/base.service';

@Injectable()
export class HealthAmenitiesService extends BaseHttpService {
  selectedItem: HealthAmenityResponseModel;
  protected override BASE_URL: string = API_ENDPOINT_CONST.HEALTH.AMENITIES_BASE;
  constructor(http: HttpClient) {
    super(http);
  }  
}