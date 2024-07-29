import { PagedResponseModel } from 'src/app/shared/models/paged-list-response';
import { PagedRequestModel } from 'src/app/shared/models/paged-request-model';
import { OptionsModel } from 'src/app/shared/models/options-model';
import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TuitionPostCreateRequestModel, TuitionPostUpdateRequestModel, TutionPostResponseModel } from '../types/tuition-post';

@Injectable()
export class TuitionPostService {
  selectedTuition: TutionPostResponseModel | null;
  private tuition_post_url = `${API_ENDPOINT_CONST.TUITIONS.TUITIONPOST_BASE}`;
  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<Array<TutionPostResponseModel>> {
    return this.http.get<Array<TutionPostResponseModel>>(this.tuition_post_url);
  }

  saveTuitionPost(requestModel: TuitionPostCreateRequestModel): Observable<void> {
    return this.http.post<void>(this.tuition_post_url, requestModel);
  }

  updateTuitionPost(requestModel: TuitionPostUpdateRequestModel): Observable<void> {
    return this.http.put<void>(this.tuition_post_url, requestModel);
  }

  getTuitionPost(id: string): Observable<TutionPostResponseModel> {
    return this.http.get<TutionPostResponseModel>(`${this.tuition_post_url}/${id}`);
  }

  deleteTuitionPost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.tuition_post_url}/${id}`);
  }

  getTuitionPostOptions(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(`${this.tuition_post_url}/options`);
  }

  getTuitionMedium(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(`${API_ENDPOINT_CONST.TUITIONS.TUITIONPOST_GET_MEDIUMS}`);
  }

  getTuitionMethod(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(`${API_ENDPOINT_CONST.TUITIONS.TUITIONPOST_GET_TEACHING_METHODS}`);
  }

  search(requestModel: PagedRequestModel): Observable<PagedResponseModel<TutionPostResponseModel>> {
    const httpParams = {
      page: requestModel.page,
      pageSize: requestModel.pageSize,
      searchTerm: requestModel.searchTerm ?? '',
      sortColumn: requestModel.sortColumn ?? '',
      sortOrder: requestModel.sortOrder ?? '',
    };
    return this.http.get<PagedResponseModel<TutionPostResponseModel>>(`${this.tuition_post_url}/search`, {
      params: httpParams,
    });
  }
}
