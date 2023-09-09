import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';
import { VillageCreateRequestModel, VillageListResponseModel, VillageUpdateRequestModel } from '../types/village.model';
import { Observable } from 'rxjs';

@Injectable()
export class VillageService {
  private Village_URL: string = API_ENDPOINT_CONST.LOCATION.VILLAGE_BASE;
  constructor(private http: HttpClient) { }

  getVillages(): Observable<VillageListResponseModel[]>
  {
    return this.http.get<VillageListResponseModel[]>(this.Village_URL);
  }

  saveVillage(createModel: VillageCreateRequestModel): Observable<unknown>
  {
    return this.http.post(this.Village_URL, createModel);
  }

  updateVillage(updateModel: VillageUpdateRequestModel): Observable<unknown>
  {
    return this.http.put(this.Village_URL, updateModel);
  }

  getVillage(id: number): Observable<VillageListResponseModel>
  {
    return this.http.get<VillageListResponseModel>(`${this.Village_URL}/${id}`);
  }

  deleteVillage(id: number): Observable<unknown>
  {
    return this.http.delete(`${this.Village_URL}/${id}`);
  }
}
