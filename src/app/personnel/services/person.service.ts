import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';
import { PersonCreateRequestModel, PersonResponseModel, PersonUpdateRequestModel } from '../types/person.model';
import { OptionsModel } from 'src/app/shared/models/options-model';

@Injectable()
export class PersonService {
  selectedPerson: PersonResponseModel | null;
  private person_url = `${API_ENDPOINT_CONST.PERSONNEL.PERSON_BASE}`;
  constructor(private http: HttpClient) { }

  getAllPersons(): Observable<Array<PersonResponseModel>> {
    return this.http.get<Array<PersonResponseModel>>(this.person_url);
  }

  savePersons(requestModel: PersonCreateRequestModel): Observable<void>{
    return this.http.post<void>(this.person_url, requestModel);
  }

  updatePersons(requestModel: PersonUpdateRequestModel): Observable<void>{
    return this.http.put<void>(this.person_url, requestModel);
  }

  getPersons(id: string): Observable<PersonResponseModel>{
    return this.http.get<PersonResponseModel>(`${this.person_url}/${id}`);
  }

  deletePerson(id: string) : Observable<void> {
    return this.http.delete<void>(`${this.person_url}/${id}`);
  }

  getPersonOptions(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(`${this.person_url}/options`);
  }
}
