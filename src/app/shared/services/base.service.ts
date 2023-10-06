import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class BaseHttpService {
  protected BASE_URL: string;
  constructor(protected http: HttpClient) { 
  }

  setBaseUrl(baseUrl: string): void {
    this.BASE_URL = baseUrl;
  }

  getById<TDetailResponseModel>(id: (string | number)): Observable<TDetailResponseModel> {
    return this.http.get<TDetailResponseModel>(`${this.BASE_URL}/${id}`);
  }

  save<TCreateRequestModel, TResponseModel>(requestModel: TCreateRequestModel): Observable<TResponseModel> {
    return this.http.post<TResponseModel>(this.BASE_URL, requestModel);
  }

  update<TUpdateRequestModel, TResponseModel>(body: TUpdateRequestModel): Observable<TResponseModel> {
    return this.http.put<TResponseModel>(this.BASE_URL, body);
  }

  remove<TResponseModel>(id: string | number): Observable<TResponseModel> {
    return this.http.delete<TResponseModel>(`${this.BASE_URL}/${id}`);
  }

  getAll<TResponseModel>(): Observable<TResponseModel[]> {
    return this.http.get<TResponseModel[]>(this.BASE_URL);
  }
}
