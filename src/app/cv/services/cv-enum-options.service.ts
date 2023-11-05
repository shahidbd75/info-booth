import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';
import { OptionsModel } from 'src/app/shared/models/options-model';

@Injectable()
export class CvEnumOptionsService {

  constructor(private http: HttpClient) { }

  getSkills(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_SKILLS);
   }

   getStrengths(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_STRENGTHS);
   }
}
