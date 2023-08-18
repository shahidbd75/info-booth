import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';
import { OptionsModel } from 'src/app/shared/models/options-model';

@Injectable()
export class SubCategoryService {

  constructor(private httpClient: HttpClient) { }

  getByCategoryId(categoryId: string): Observable<OptionsModel[]>{
    return this.httpClient.get<OptionsModel[]>(API_ENDPOINT_CONST.BUY_SELL.GET_SUB_CATEGORY_BY_CATEGORY(categoryId));
   }
}
