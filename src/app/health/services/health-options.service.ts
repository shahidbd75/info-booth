import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';
import { OptionsModel } from 'src/app/shared/models/options-model';
import { environment } from 'src/environments/environment';

@Injectable()
export class HealthOptionsService {
  private API_URL: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getSpecializations(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(`${API_ENDPOINT_CONST.HEALTH.SPECIALIZATION_BASE}/options`);
  }

  getDoctorTypes(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(`${API_ENDPOINT_CONST.HEALTH.DOCTOR_BASE}/types`);
  }

  getHealthAmenities(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(`${API_ENDPOINT_CONST.HEALTH.AMENITIES_BASE}`);
  }

  getHealthCareTypes(): Observable<OptionsModel[]> {
   return this.http.get<OptionsModel[]>(`${API_ENDPOINT_CONST.HEALTH.HOSPITAL_BASE}/types`);
  }

  getDoctorOptions(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(`${API_ENDPOINT_CONST.HEALTH.DOCTOR_BASE}/options`);
  }

  getHospitalOptions(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(`${API_ENDPOINT_CONST.HEALTH.HOSPITAL_BASE}/options`);
  }
}
