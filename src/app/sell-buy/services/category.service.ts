import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';
import { OptionsModel } from 'src/app/shared/models/options-model';

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.BUY_SELL.GET_CATEGORIES_OPTIONS);
  }
}
