import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';
import { OptionsModel } from 'src/app/shared/models/options-model';
import { ItemSubCategoryDetailResponseModel, SubCategoryRequestModel, SubCategoryResponse, SubCategoryUpdateModel } from '../models/sub-category.model';
import { MatTableDataSource } from '@angular/material/table';

@Injectable()
export class SubCategoryService {
  constructor(private http: HttpClient) {}

  getByCategoryId(categoryId: string): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.BUY_SELL.GET_SUB_CATEGORY_BY_CATEGORY(categoryId));
  }

  addSubcategory(requestModel: SubCategoryRequestModel): Observable<void> {
    return this.http.post<void>(API_ENDPOINT_CONST.BUY_SELL.SUB_CATEGORY_BASE, requestModel);
  }

  updateSubcategory(requestModel: SubCategoryUpdateModel): Observable<void> {
    return this.http.put<void>(API_ENDPOINT_CONST.BUY_SELL.SUB_CATEGORY_BASE, requestModel);
  }

  removeSubcategory(id: string): Observable<void> {
    return this.http.delete<void>(`${API_ENDPOINT_CONST.BUY_SELL.SUB_CATEGORY_BASE}/${id}`);
  }

  getSubcategoryById(id: string): Observable<ItemSubCategoryDetailResponseModel> {
    return this.http.get<ItemSubCategoryDetailResponseModel>(`${API_ENDPOINT_CONST.BUY_SELL.SUB_CATEGORY_BASE}/${id}`);
  }

  getAllSubCategories(): Observable<Array<SubCategoryResponse>> {
    return this.http.get<Array<SubCategoryResponse>>(API_ENDPOINT_CONST.BUY_SELL.SUB_CATEGORY_BASE);
  }
}
