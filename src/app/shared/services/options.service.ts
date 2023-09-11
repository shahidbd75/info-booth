import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OptionsModel } from '../models/options-model';
import { API_ENDPOINT_CONST } from '../constants/endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  constructor(private http: HttpClient) { }

  getDistricts(): Observable<Array<OptionsModel>>{
    return this.http.get<Array<OptionsModel>>(`${API_ENDPOINT_CONST.OPTIONS.OPTION_BASE}/districts`);
  }

  getUpazilas(districtId: number): Observable<Array<OptionsModel>>{
    return this.http.get<Array<OptionsModel>>(`${API_ENDPOINT_CONST.OPTIONS.OPTION_BASE}/upazilas/${districtId}`);
  }

  getVillages(upazilaId: string): Observable<Array<OptionsModel>>{
    return this.http.get<Array<OptionsModel>>(`${API_ENDPOINT_CONST.OPTIONS.OPTION_BASE}/vilages/${upazilaId}`);
  }
}
