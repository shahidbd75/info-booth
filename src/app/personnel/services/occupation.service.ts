import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';
import { EnumTableCreateModel, EnumTableResponseModel, EnumTableUpdateModel } from 'src/app/shared/models/enum-table-model';

@Injectable()
export class OccupationService {
  private Occupation_URL: string = API_ENDPOINT_CONST.PERSONNEL.OCCUPATION_BASE;
  constructor(private http: HttpClient) { }

  getOccupations(): Observable<EnumTableResponseModel[]>
  {
    return this.http.get<EnumTableResponseModel[]>(this.Occupation_URL);
  }

  saveOccupation(createModel: EnumTableCreateModel): Observable<unknown>
  {
    return this.http.post(this.Occupation_URL, createModel);
  }

  updateOccupation(updateModel: EnumTableUpdateModel): Observable<unknown>
  {
    return this.http.put(this.Occupation_URL, updateModel);
  }

  getOccupation(id: number): Observable<EnumTableResponseModel>
  {
    return this.http.get<EnumTableResponseModel>(`${this.Occupation_URL}/${id}`);
  }

  deleteOccupation(id: number): Observable<unknown>
  {
    return this.http.delete(`${this.Occupation_URL}/${id}`);
  }
}
