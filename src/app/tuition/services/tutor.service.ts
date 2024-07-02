import { PagedResponseModel } from 'src/app/shared/models/paged-list-response';
import { PagedRequestModel } from 'src/app/shared/models/paged-request-model';
import { OptionsModel } from 'src/app/shared/models/options-model';
import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';
import { Injectable } from '@angular/core';
import { TutorCreateRequestModel, TutorResponseModel, TutorUpdateRequestModel } from '../types/tutor.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TutorService {
  selectedTutor: TutorResponseModel | null;
  private tutor_url = `${API_ENDPOINT_CONST.TUITIONS.TUTOR_BASE}`;
  constructor(private http: HttpClient) {}

  getAllTutors(): Observable<Array<TutorResponseModel>> {
    return this.http.get<Array<TutorResponseModel>>(this.tutor_url);
  }

  saveTutor(requestModel: TutorCreateRequestModel): Observable<void> {
    return this.http.post<void>(this.tutor_url, requestModel);
  }

  updateTutor(requestModel: TutorUpdateRequestModel): Observable<void> {
    return this.http.put<void>(this.tutor_url, requestModel);
  }

  getTutor(id: string): Observable<TutorResponseModel> {
    return this.http.get<TutorResponseModel>(`${this.tutor_url}/${id}`);
  }

  deleteTutor(id: string): Observable<void> {
    return this.http.delete<void>(`${this.tutor_url}/${id}`);
  }

  getTutorOptions(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(`${this.tutor_url}/options`);
  }

  search(requestModel: PagedRequestModel): Observable<PagedResponseModel<TutorResponseModel>> {
    const httpParams = {
      page: requestModel.page,
      pageSize: requestModel.pageSize,
      searchTerm: requestModel.searchTerm ?? '',
      sortColumn: requestModel.sortColumn ?? '',
      sortOrder: requestModel.sortOrder ?? '',
    };
    return this.http.get<PagedResponseModel<TutorResponseModel>>(`${this.tutor_url}/search`, {
      params: httpParams,
    });
  }
}
