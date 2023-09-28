import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';
import { ToLetCreateRequestModel, ToLetUpdateRequestModel } from '../types/tolet-request-model';
import { ToLetDetailResponseModel } from '../types/tolet-response-model';

@Injectable()
export class ToletService {
  TOLET_BASE_URL: string = API_ENDPOINT_CONST.TOLET.TOLET_BASE;
  constructor(private http: HttpClient) { }

  saveToLet(requestModel: ToLetCreateRequestModel): Observable<unknown> {
    return this.http.post(this.TOLET_BASE_URL, requestModel);
  }

  updateToLet(requestModel: ToLetUpdateRequestModel): Observable<unknown> {
    return this.http.put(this.TOLET_BASE_URL, requestModel);
  }

  getToLetById(id: string): Observable<ToLetDetailResponseModel> {
    return this.http.get<ToLetDetailResponseModel>(`${this.TOLET_BASE_URL}/${id}`);
  }

  getToLets(): Observable<unknown> {
    return this.http.get(`${this.TOLET_BASE_URL}`);
  }

  removeToLetById(id: string): Observable<unknown> {
    return this.http.delete(`${this.TOLET_BASE_URL}/${id}`);
  }
}
