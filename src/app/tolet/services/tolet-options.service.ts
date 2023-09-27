import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';
import { OptionsModel } from 'src/app/shared/models/options-model';

@Injectable()
export class ToletOptionsService {

  constructor(private http: HttpClient) { }

  getAmenities(): Observable<Array<OptionsModel>> {
    return this.http.get<Array<OptionsModel>>(API_ENDPOINT_CONST.TOLET.AMENITY_OPTIONS);
  }

  getFlatTypes(): Observable<Array<OptionsModel>> {
    return this.http.get<Array<OptionsModel>>(API_ENDPOINT_CONST.TOLET.FLAT_TYPE_OPTIONS);
  }

  getFlatViews(): Observable<Array<OptionsModel>> {
    return this.http.get<Array<OptionsModel>>(API_ENDPOINT_CONST.TOLET.FLAT_VIEW_OPTIONS);
  }

  getLandMarks(): Observable<Array<OptionsModel>> {
    return this.http.get<Array<OptionsModel>>(API_ENDPOINT_CONST.TOLET.LANDMARK_OPTIONS);
  }
}
