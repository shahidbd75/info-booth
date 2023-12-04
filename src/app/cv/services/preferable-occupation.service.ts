import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';
import { PreferableOccupationsType } from '../types/preferable-occupation-type';
import { BaseHttpService } from 'src/app/shared/services/base.service';

@Injectable()
export class PreferableOccupationService extends BaseHttpService{

  constructor(http: HttpClient) { 
    super(http);
    this.setBaseUrl(API_ENDPOINT_CONST.CV.PREFERABLE_OCCUPATION_BASE);
  }

  getOccupationsByPersonId(personId: string): Observable<Array<PreferableOccupationsType>> {
    return this.http.get<Array<PreferableOccupationsType>>(API_ENDPOINT_CONST.CV.PREFERABLE_OCCUPATIONS_BY_PERSON(personId));
  }
}
