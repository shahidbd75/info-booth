import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';
import { OptionsModel } from 'src/app/shared/models/options-model';

@Injectable()
export class CvOptionsService {

  constructor(private http: HttpClient) {

   }

   getDegrees(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_OPTIONS.GET_DEGREES);
   }

   getDesignations(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_OPTIONS.GET_DESIGNATIONS);
   }

   getSubjects(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_OPTIONS.GET_SUBJECTS);
   }
}
