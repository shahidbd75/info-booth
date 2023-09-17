import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';
import { WorkerRequestModel, WorkerResponseModel } from '../types/worker-model';
import { OptionsModel } from 'src/app/shared/models/options-model';

@Injectable()
export class WorkerService {
  worker_url = API_ENDPOINT_CONST.WORKER.WORKER_BASE;
  constructor(private http: HttpClient) { }

  getAll():Observable<WorkerResponseModel[]> {
    return this.http.get<WorkerResponseModel[]>(this.worker_url);
  }

  saveWorker(createRequestModel: WorkerRequestModel): Observable<unknown> {
    return this.http.post<unknown>(this.worker_url, createRequestModel)
  }

  updateWorker(updateRequestModel: WorkerRequestModel): Observable<unknown> {
    return this.http.put<unknown>(this.worker_url, updateRequestModel)
  }

  deleteWorker(id: string): Observable<unknown> {
    return this.http.delete<unknown>(`${this.worker_url}/${id}`);
  }

  getWorkerById(id: string): Observable<WorkerResponseModel> {
    return this.http.get<WorkerResponseModel>(`${this.worker_url}/${id}`);
  }

  getGootAts(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(`${this.worker_url}/good-ats`);
  }

  getPreferableDays(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(`${this.worker_url}/preferable-days`);
  }

  getWorkAbilities(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(`${this.worker_url}/work-abilities`);
  }

  getWorkGroups(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(`${this.worker_url}/work-groups`);
  }
}
