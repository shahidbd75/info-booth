import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedRequestModel } from '../models/paged-request-model';
import { PagedResponseModel } from '../models/paged-list-response';

@Injectable()
export abstract class BaseHttpService {
  protected abstract BASE_URL: string;
  constructor(protected http: HttpClient) {}

  getById<TDetailResponseModel>(id: string | number): Observable<TDetailResponseModel> {
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

  search<T extends PagedRequestModel, R>(requestModel: T): Observable<PagedResponseModel<R>> {
    return this.http.get<PagedResponseModel<R>>(`${this.BASE_URL}`, {
      params: this.setParameter(requestModel),
    });
  }

  private setParameter<T extends PagedRequestModel>(requestModel: T): HttpParams {
    const { page, pageSize, searchTerm, sortColumn, sortOrder, ...restParams } = requestModel;

    const httpParams = new HttpParams();

    httpParams.append('page', page);
    httpParams.append('pageSize', pageSize);
    httpParams.append('searchTerm', searchTerm ?? '');
    httpParams.append('sortColumn', sortColumn ?? '');
    httpParams.append('sortOrder', sortOrder ?? '');

    return httpParams;
  }
}
